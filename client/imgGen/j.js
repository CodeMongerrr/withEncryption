const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const n = document.getElementById('name')
const down = document.getElementById('download-btn')

var image = new Image()
image.src = "data:image/jpeg;base64,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"
image.crossOrigin = "anonymous"
image.onload = function () {
    drawImage()
}

function drawImage() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.font = '30px monotype corsiva'
    ctx.fillStyle = '#29e'
    ctx.fillText(n.value, 40, 180)
}

n.addEventListener('input', function () {
    drawImage()
})

down.addEventListener('click', function () {
    down.href = canvas.toDataURL("img/png", 1.0)
    console.log(down.href)
    down.download = true
    console.log("hi")
})