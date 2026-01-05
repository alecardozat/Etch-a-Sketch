const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
const input = document.getElementById('input');
const form = document.querySelector('form');
const span = document.querySelector('span');
let size = 16;
let isErasing = false;

input.addEventListener('click', () => {
    span.textContent = input.value;
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    size = input.value;
    createGrid(size)
});

const handlePaint = (e) => {
    if(e.buttons === 1 && e.target.classList.contains('item')){
        if(e.type === 'mousedown'){
            isErasing = e.target.classList.contains('painted');
        }
        if(isErasing){
            e.target.classList.remove('painted');
        }else{
            e.target.classList.add('painted');
        }
    }
}

['mouseover','mousedown'].forEach(e =>{
    container.addEventListener(e, handlePaint);
});

container.addEventListener('dragstart', (e) => e.preventDefault());

function setDefaultGrid() {
    createGrid(size);
}

function createGrid(size) {
    container.style.setProperty('--columns', size);
    container.replaceChildren();
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const div = document.createElement('div');
        div.className = "item";
        div.onclick = (div) => paintDiv(div);
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
}

function paintDiv(item) {
    item.classList.toggle('painted');

}

setDefaultGrid();