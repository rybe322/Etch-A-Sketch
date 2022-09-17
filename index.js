
let numOfEvents = 0; // keep track of mouse events
let currentGridSize = 16;
let currentColor = 'black'


const sizeButton = document.querySelector('#sizeButton')
sizeButton.addEventListener('click', handleNewGridSizeClick)

const colorChooseButton = document.querySelector('#chooseColorButton')
colorChooseButton.addEventListener('click', handleChooseColor)

const deleteDrawingButton = document.querySelector('#deleteDrawing')
deleteDrawingButton.addEventListener('click', handleDeleteDrawing)

const eraserButton = document.querySelector('#eraserButton')
eraserButton.addEventListener('click', handleEraserButtonClick)

const gridSizeTextElement = document.querySelector('#gridSize')
gridSizeTextElement.textContent = `Current Grid: ${currentGridSize} X ${currentGridSize}`

function handleEraserButtonClick() {
  currentColor = 'white';
  const currentColorElement = document.querySelector('#currentColorElement')
  currentColorElement.style.color = currentColor;
  currentColorElement.textContent = `Your current color is: ${currentColor}`
}


function updater(newSize = 16) {
  removeAllChildNodes() // Start with a fresh grid
  currentGridSize = newSize // Update the grid size
  // Update the Current Grid Size
  const gridSizeTextElement = document.querySelector('#gridSize')
  gridSizeTextElement.textContent = `Current Grid: ${currentGridSize} X ${currentGridSize}`

  const currentColorElement = document.querySelector('#currentColorElement')
  currentColorElement.style.color = currentColor
  currentColorElement.textContent = `Your current color is: ${currentColor}`
}

function removeAllChildNodes() {
  const root = document.querySelector('#grid')
  while (root.firstChild) root.removeChild(root.firstChild)
}

function createGrid(size=16) {
  removeAllChildNodes()
  updater(size);
  const grid = document.querySelector('#grid')
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for(let i = 0; i < size * size; i++) {
    let gridElement = document.createElement('div')
    gridElement.addEventListener('mouseenter', handleMouseEnter)
    gridElement.setAttribute('class','gridElement')
    gridElement.style.backgroundColor = 'white';
    grid.appendChild(gridElement)
  }
}

function handleMouseEnter() {
 this.style.backgroundColor = currentColor;
}

function handleChooseColor() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  colorString = `#${randomColor}`
  currentColor = colorString
  const currentColorElement = document.querySelector('#currentColorElement')
  currentColorElement.style.color = currentColor
  currentColorElement.textContent = `Your current color is: ${currentColor}`
}

function handleNewGridSizeClick() {
  let newSize = Number(prompt('Enter you new grid size.  Less than 100'))
  while(isNaN(newSize) || newSize < 0) {
    newSize = Number(prompt('Enter you new grid size.  Less than 100'))
  }
  createGrid(newSize)
}

function handleDeleteDrawing() {
  createGrid(currentGridSize)
  const grid = document.querySelector('#grid')  
  grid.classList.add('shake')
  grid.addEventListener('animationend', () => grid.classList.remove('shake'))
}

createGrid()



