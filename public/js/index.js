console.log('this is client side js code')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    if(!location){
        console.log('provide a location')
    }

    messageOne.textContent= 'Loading...'
    messageTwo.textContent= ''

    fetch(/weather?address='+location).then((Response) => {
    Response.json().then((data) =>  {
        if(data.error){
            messageOne.textContent= data.error
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
        }
    })
})


})