'use strict'



function drawDot(x, y) {
    gCtx.beginPath()

    gCtx.moveTo(x, y)
    gCtx.arc(x, y, 4, 0, 2 * Math.PI)

    gCtx.closePath()
    gCtx.fillStyle = getColor()
    gCtx.fill()
}

function drawTriangle(x, y,m) {
    var diff = m * 3

    gCtx.beginPath()

    gCtx.moveTo(x, y)
    gCtx.lineTo(x + diff + 40, y + diff + 30);
    gCtx.lineTo(x - diff - 40, y + diff + 30);
    gCtx.closePath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle =getStrokeColor()
    gCtx.stroke()
    gCtx.fillStyle = getColor()
    gCtx.fill()

}

function drawRect(x, y,m) {
    const length = m * 4

    gCtx.beginPath()

    gCtx.lineWidth = 3
    gCtx.rect(x, y, length, length)
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke()
    gCtx.fillStyle = getColor()
    gCtx.fill()


}


function drawArc(x, y,m) {
    const radius = m * 2

    gCtx.beginPath()
    gCtx.lineWidth = 3

    gCtx.arc(x, y,radius, 0, Math.PI * 2) //* draws a circle
    // gCtx.fillStyle = getColor()
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke()
    gCtx.fillStyle = getColor()
    gCtx.fill()

}


function getStrokeColor() {
    return document.getElementById('stroke-color').value
}
function getColor() {
    return document.getElementById('color').value
}


//util
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //* Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        //* Calc the center of the canvas
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        //* Create the circle in the center
        // renderCanvas()
    })
}

//util
function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

//util
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


//util
function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse ev
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}

//util but not using it here
function moveShape(dx, dy) {
    gCurrShape.pos.x += dx
    gCurrShape.pos.y += dy
}


function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    // console.log('dataUrl:', dataUrl)
    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-img'
}


function onSaveImg() {
    const canvasData = gElCanvas.toDataURL()
    localStorage.setItem('canvasData', canvasData)
}

function loadFromStorage() {
    if (localStorage.getItem('canvasData')) {
        const canvasData = localStorage.getItem('canvasData')
        const img = new Image()
        img.src = canvasData
        img.onload = () => gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}


function getMovement(ev) {

    if (TOUCH_EVS.includes(ev.type)) {
        const touch = ev.touches[0];

        if (gPreviousTouch) {
            const touch = ev.touches[0];
            ev.movementX = touch.pageX - gPreviousTouch.pageX;
            ev.movementY = touch.pageY - gPreviousTouch.pageY;
        }
        gPreviousTouch = touch
    }
    var mX = (ev.movementX >= 0) ? ev.movementX : -1 * ev.movementX
    var mY = (ev.movementY >= 0) ? ev.movementY : -1 * ev.movementY
    var m = (mX + mY) / 2
    return m
}