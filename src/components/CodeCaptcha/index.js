import { Component } from "react"
import ReactHtmlParser from "react-html-parser"

let captcha_value = ""
let captcha_number = ""
let canvas_width = 190
let canvas_height = 50
let backgroundColor_value = ""
let LoadCanvasTemplate_HTML = '<div><canvas id="canv"></canvas><div><a id="reload_href"  style="cursor: pointer; color: blue">Reload Captcha</a></div></div>'
let LoadCanvasTemplateNoReload_HTML = '<div><canvas id="canv"></canvas><div><a id="reload_href"  style="cursor: pointer; color: blue"></a></div></div>'

export const loadCaptchaEngine = (numberOfCharacters, backgroundColor = "white", width, height) => {
  backgroundColor_value = backgroundColor
  captcha_number = numberOfCharacters

  let length = parseInt(numberOfCharacters)

  let showNum = []
  let canvas_width = width || 150
  let canvas_height = height || 30
  let canvas = document.getElementById("canv")
  let context = canvas.getContext("2d")
  canvas.width = canvas_width
  canvas.height = canvas_height
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.textBaseline = "middle"
  context.font = "italic 20px Arial"
  let sCode = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,!,@,#,$,%,^,&,*,(,)"
  let saCode = sCode.split(",")
  let saCodeLen = saCode.length

  /* create array code */
  for (let i = 0; i < length; i++) {
    let sIndex = Math.floor(Math.random() * saCodeLen)
    let cTxt = saCode[sIndex]
    showNum[i] = cTxt
  }

  /* random uppercase */
  for (let i = 0; i < length; i++) {
    let sIndex = Math.floor(Math.random() * 6)
    const text = showNum[sIndex].toLowerCase()
    showNum[sIndex] = text
  }

  /* draw text on canvas */
  for (let i = 0; i < length; i++) {
    let sDeg = (Math.random() * 30 * Math.PI) / 180
    let x = 10 + i * 20
    let y = 20 + Math.random() * 8
    context.font = "bold 23px arial"
    context.translate(x, y)
    context.rotate(sDeg)

    context.fillStyle = randomColor()
    context.fillText(showNum[i], 0, 0)

    context.rotate(-sDeg)
    context.translate(-x, -y)
  }

  /* draw line background */
  let line_count = 8
  for (let i = 0; i <= line_count; i++) {
    context.strokeStyle = randomColor()
    context.beginPath()
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.stroke()
  }

  /* draw dot background */
  let dot_count = 200
  for (let i = 0; i < dot_count; i++) {
    context.strokeStyle = randomColor()
    context.beginPath()
    let x = Math.random() * canvas_width
    let y = Math.random() * canvas_height
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }
  captcha_value = showNum.join("")

  document.getElementById("reload_href").onclick = function () {
    loadCaptchaEngine(captcha_number, backgroundColor, canvas_width, canvas_height)
  }
}

export const validateCaptcha = (userValue, reload = true) => {
  if (userValue != captcha_value) {
    if (reload == true) {
      loadCaptchaEngine(captcha_number, backgroundColor_value, canvas_width, canvas_height)
    }

    return false
  } else {
    return true
  }
}

export class LoadCanvasTemplate extends Component {
  render() {
    let reload_text = ""
    let reload_color = ""
    LoadCanvasTemplate_HTML = '<div><canvas id="canv" style="background-color: blue;"></canvas><div><a id="reload_href"  style="cursor: pointer; color: blue">Reload Captcha</a></div></div>'

    if (this.props.reloadText) {
      reload_text = this.props.reloadText
    }

    if (this.props.reloadColor) {
      reload_color = this.props.reloadColor
    }

    if (reload_text == "") {
      reload_text = "Reload Captcha"
    }

    if (reload_color == "") {
      reload_color = "blue"
    }

    LoadCanvasTemplate_HTML = '<div><canvas id="canv"></canvas><div><a id="reload_href"  style="cursor: pointer; color: ' + reload_color + '">' + reload_text + "</a></div></div>"

    return ReactHtmlParser(LoadCanvasTemplate_HTML)
  }
}

export class LoadCanvasTemplateNoReload extends Component {
  render() {
    return ReactHtmlParser(LoadCanvasTemplateNoReload_HTML)
  }
}
/* random color */
function randomColor() {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  return "rgb(" + r + "," + g + "," + b + ")"
}
