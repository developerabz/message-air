
// Frontend

const messageForm = document.querySelector('.message-form');

const messageContainer = document.querySelector('.message-container')
if (messageForm !== null) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = (<HTMLFormElement>e.target).querySelector('[name=\'message\']') as HTMLInputElement
    fetch('/chat/addmessage', {
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
    /*
    .catch(err => {
      console.trace(err)
    })*/
  })

} else {
  console.error("message form is null")
}

const updateMessageContainer = () => {
  if (messageContainer !== null) {
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
  } else {
    console.error("Message container is null")
  }
}

const menuIcon = document.querySelector('.menu-icon')
const usersNav = document.querySelector('.users-nav')
if (menuIcon !== null) {
  menuIcon.addEventListener('click', () => {
    const bar1 = menuIcon.querySelector('.bar-1')
    if (bar1 === null) {
      console.error("Bar 1 is null")
      return
    }
    const bar2 = menuIcon.querySelector('.bar-2')
    if (bar2 === null) {
      console.error("Bar 2 is null")
      return
    }

    const bar3 = menuIcon.querySelector('.bar-3')
    if (bar3 === null) {
      console.error("Bar 3 is null")
      return
    }

    bar2.classList.toggle("opacity-0")
    bar1.classList.toggle("translate-y-2")
    bar3.classList.toggle("-translate-y-2")
    bar1.classList.toggle("rotate-45")
    bar3.classList.toggle("-rotate-45")
    if (usersNav === null) {
      console.error("Users nav is null")
      return
    }
    usersNav.classList.toggle("hidden")
    usersNav.classList.toggle("flex")
  })
} else {
  console.error("Menu icon is null")
}



