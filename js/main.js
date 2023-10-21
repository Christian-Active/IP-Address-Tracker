// Add all your JS here

let form = document.getElementById("form")
let ipInfo = document.getElementById("ip-info")
let ipText = document.getElementById("address")
let locate = document.getElementById("location")
let zone = document.getElementById("zone")
let isp = document.getElementById("isp")
let error = document.querySelector(".error")

let updateUI = async (data) => {
  if(data.code === 422){
     ipInfo.style.display= "none";
     throw new Error("Invalid iPv4 or iPv6 address")
   } else {
     error.style.display = "none"
     ipInfo.style.display= "grid";
     ipText.innerText = data.ip
     
     const {country, city, region, timezone, lat, lng} = data.location
     
     locate.innerText = `${region}, ${country}`
     zone.innerText = timezone
     isp.innerText = data.isp

     return {
      lat, lng,country, region, city
     }
   }
}

form.addEventListener("submit", e => {
   e.preventDefault(); 
   let ip = form.ipText.value
  
   getIp(ip)
    .then(data => updateUI(data))
    .then(data => getPosition(data))
    .catch(err => {
      error.style.display = "block"
      error.innerText = err.message
    })
    
    form.reset();
})