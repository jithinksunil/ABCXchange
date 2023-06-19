function updateTime() {
    const currentTime = new Date();
    let hours=currentTime.getHours()
    const minutes=currentTime.getMinutes()
    const stamp=hours>=12?'PM':'AM'
    hours=hours%12
    const formattedTime = hours+ ":" +minutes+" " ;
    const banner=document.getElementById('time')
    banner.innerHTML = formattedTime;
    const amPm=document.createElement('span')
    amPm.setAttribute('id','stamp')
    amPm.innerHTML=stamp
    banner.appendChild(amPm)

  }

setInterval(updateTime,1000);