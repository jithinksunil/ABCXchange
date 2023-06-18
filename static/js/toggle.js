const toggleMode = () => {
    const element = document.getElementById('myStyle')
    if (element.getAttribute('href') === "./static/css/night.css") {
        element.href = "./static/css/day.css"
    } else {
        element.href = "./static/css/night.css"
    }
}