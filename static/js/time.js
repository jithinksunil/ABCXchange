function updateTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    minutes=minutes<10?'0'+minutes:minutes
    const stamp = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    const finalTime = hours + ":" + minutes + " ";
    const banner = document.getElementById('time')
    banner.innerHTML = finalTime;
    const amPm = document.createElement('span')
    amPm.setAttribute('id', 'stamp')
    amPm.innerHTML = stamp
    banner.appendChild(amPm)
}

setInterval(updateTime, 1000);