// Frontend
console.log("stuff")
if (!localStorage.getItem("userSession") || localStorage.getItem("userSession") === "undefined") {
  console.error("You are not able to access this page, please log in");
  location.replace("/403");
} else {
  const messageForm = document.querySelector('.message-form');
  const messageContainer = document.querySelector('.message-container')
  if (messageForm !== null) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const message = (<HTMLInputElement>document.querySelector('[name=\'message\']'))
      console.log(message.value)
      fetch("/chat/addmessage", {
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
    console.log(messageContainer)
    if (messageContainer !== null) {
      console.log(messageContainer)
      fetch(`/posts/${["authguy", "otherguy"].sort().join("-")}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => {
          //console.log(res)
          messageContainer.replaceChildren()

          for (const item of res) {
            const chatSide = document.createElement('div')
            chatSide.className = 'chat chat-end'
            const p = document.createElement('p')
            console.log(item)

            p.textContent = item.messageInfo
            p.className = 'chat-bubble'
            chatSide.append(p)
            messageContainer.append(chatSide)
          }
          scrollToBottom()
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


  const scrollToBottom = () => {
    const lastMessageRef = document.querySelectorAll('.chat');


    if (!lastMessageRef || lastMessageRef.length == 0) {
      return
    }


    lastMessageRef[lastMessageRef.length - 1].scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  }
}
