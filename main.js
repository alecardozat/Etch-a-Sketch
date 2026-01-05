const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
const input = document.getElementById('input');
const form = document.querySelector('form');
const span = document.querySelector('span');
let size = 16;
let isPainting = false;
let isErasing = false;

input.addEventListener('click', () => {
    span.textContent = input.value;
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    size = input.value;
    createGrid(size);
    span.textContent = input.value;
});


window.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') isErasing = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') isErasing = false;
});

const handlePaint = (e) => {
    const item = e.target;
    if (!isPainting || !item.classList.contains('item')) return;

    let intensity = parseInt(item.dataset.intensity || 0);

    if (isErasing) {
        intensity = Math.max(0, intensity - 1);
    } else {
        intensity = Math.min(10, intensity + 1);
    }
    item.dataset.intensity = intensity;
    updateColor(item, intensity);
}

function updateColor(item, level) {
    if (level === 0) {
        item.style.backgroundColor = 'aliceblue';
        return;
    }

    if (!item.dataset.hue) {
        item.dataset.hue = Math.floor(Math.random() * 360);
    }

    const hue = item.dataset.hue;
    const lightness = 100 - (level * 10);
    item.style.backgroundColor = `hsl(${hue}, 70%, ${lightness}%)`;
}

function generateRandomColor() {
    // FFFFFF hex = 16777215
    const randomNumber = Math.floor(Math.random() * 16777215);
    let hexColor = randomNumber.toString(16);
    hexColor = hexColor.padStart(6, '0');
    return `#${hexColor}`;
}

container.addEventListener('dragstart', (e) => e.preventDefault());

container.addEventListener('mousedown', () => isPainting = true);
container.addEventListener('mouseup', () => isPainting = false);
container.addEventListener('mouseleave', () => isPainting = false);
container.addEventListener('mousemove', handlePaint);

container.addEventListener('touchmove', handleTouch);
container.addEventListener('touchend', () => isPainting = false);
container.addEventListener('touchstart', (e) => {
    isPainting = true;
    handleTouch(e);
});

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element) handlePaint({ target: element });
}




function setDefaultGrid() {
    createGrid(size);
}

function createGrid(size) {
    container.style.setProperty('--columns', size);
    container.replaceChildren();
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const div = document.createElement('div');
        div.className = "item";
        div.dataset.intensity = 0;
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
}

function paintDiv(item) {
    item.classList.toggle('painted');

}

setDefaultGrid();