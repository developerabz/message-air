
// Frontend


const form = document.querySelector('form')
console.log(form)

const messageContainer = document.querySelector('.message-container')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.querySelector('[name=\'message\']')

  fetch('/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message.value })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      console.log("Hello")
      message.value = ""
      updateMessageContainer()
    })
    .catch(err => {
      console.error(err)
    })
})

const updateMessageContainer = () => {
  fetch('/posts')
    .then(res => {
      res.json()
        .then(r => {
          console.log(r)
          messageContainer.replaceChildren()
          for (const item of r) {
            const li = document.createElement('li')
            li.textContent = item
            messageContainer.append(li)
          }
        })
    })
    .catch(err => {
      console.log(err)
    })

}
