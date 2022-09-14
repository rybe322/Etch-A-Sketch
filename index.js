let numOfEvents = 0; // keep track of mouse events

const sizeButton = document.querySelector('#sizeButton')
sizeButton.addEventListener('click', handleButtonClick)

function removeAllChildNodes() {
  const root = document.querySelector('#grid')
  while (root.firstChild) root.removeChild(root.firstChild)
}

function createGrid(size=16) {
  removeAllChildNodes()
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
  console.log('enter')
  numOfEvents += 1
  if (this.style.backgroundColor === 'white'){  
    if (numOfEvents % 10 === 0) {
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      colorString = `#${randomColor}`
      this.style.backgroundColor = colorString;
    }
    else {
      this.style.backgroundColor = 'black';
    }
  }
  else {
    return;
  }
}

function handleButtonClick() {
  let newSize = Number(prompt('Enter you new grid size.  Less than 100'))
  if (isNaN(newSize)) console.log('nan')
  while(isNaN(newSize) || newSize < 0) {
    newSize = Number(prompt('Enter you new grid size.  Less than 100'))
  }


  createGrid(newSize)
}


createGrid()