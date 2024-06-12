'use strict'

var gElCanvas
var gCtx
let gStartPos
var gIsDrawing
var gCurrShape
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // console.log(gCtx);
    resizeCanvas()
    addListeners()
    loadFromStorage()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    localStorage.removeItem('canvasData');
}

function onSetShape(shape) {
    gCurrShape = shape
}

//for one click
function onDraw(ev) {
    const { offsetX, offsetY } = ev
    // console.log('Drawing at:', offsetX, offsetY)

    switch (gCurrShape) {
        case 'pen':
            drawDot(offsetX, offsetY)
            break
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
    }
}


function onDown(ev) {

    gIsDrawing = true
    const pos = getEvPos(ev)
    
    gCtx.beginPath()
    gCtx.moveTo(pos.x, pos.y)

    // gCurrShape.pos = pos
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gIsDrawing) return
    const pos = getEvPos(ev)
    const {x, y} = pos
  
    switch (gCurrShape) {
        case 'pen':
            drawDot(x, y)
            break
        case 'triangle':
            drawTriangle(x, y)
            break
        case 'rect':
            drawRect(x, y)
            break
        case 'circle':
            drawArc(x, y)
            break
    }
    //* Calc the delta, the diff we moved

    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y

    gStartPos = pos
}


function onUp() {
    gIsDrawing = false
    // document.body.style.cursor = 'grab'
}