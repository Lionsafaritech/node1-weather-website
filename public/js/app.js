console.log("client side script is loading");
const weatherForm=document.querySelector("form")
const search=document.querySelector("input")
const messageOne=document.querySelector("#msg")
const messageTwo=document.querySelector("#msg-two")
// const weatherStatus=document.querySelector("#weathercon")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=search.value;
    messageOne.textContent="loading"
    messageTwo.textContent=""
    fetch("http://localhost:3000/weather?address="+location)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                messageOne.textContent=data.error 
            }else{
                //console.log(data.location)
                messageOne.textContent=`Country Code : ${data.location} and Location- ${location} `
                //console.log(data.forecast)
                messageTwo.textContent=data.forecast
                // weatherStatus.textContent="hello"
            }
        })
    })
})