
// Frontend


const form = document.querySelector('form')

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
            const p = document.createElement('p')
            p.textContent = item
            p.className = 'p-2 m-1 bg-green-50 w-min'
            messageContainer.append(p)
          }
        })
    })
    .catch(err => {
      console.log(err)
    })

}

const menuIcon = document.querySelector('.menu-icon')
const usersNav = document.querySelector('.users-nav')

menuIcon.addEventListener('click', () => {
  const bar1 = menuIcon.querySelector('.bar-1')
  const bar2 = menuIcon.querySelector('.bar-2')
  const bar3 = menuIcon.querySelector('.bar-3')
  bar2.classList.toggle("opacity-0")
  bar1.classList.toggle("translate-y-2")
  bar3.classList.toggle("-translate-y-2")
  bar1.classList.toggle("rotate-45")
  bar3.classList.toggle("-rotate-45")
  usersNav.classList.toggle("hidden")
  usersNav.classList.toggle("flex")
})



