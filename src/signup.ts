const signUpForm = document.querySelector('form');

const signUpButton = document.querySelector('.signup-button');
const guestButton = document.querySelector('.guest-button');
console.log(guestButton)

signUpForm?.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  const emailInput: HTMLInputElement | null = signUpForm.querySelector('input[name="email"]')
  console.log(emailInput?.value)
  const formData = {
    email: (<HTMLInputElement>signUpForm.querySelector('input[name="email"]')).value,
    name: (<HTMLInputElement>signUpForm.querySelector('input[name="name"]')).value,
    username: (<HTMLInputElement>signUpForm.querySelector('input[name="username"]')).value,
    password: (<HTMLInputElement>signUpForm.querySelector('input[name="password"]')).value,
  }
  console.log(formData)
  fetch('/user/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then((res: any) => {
      console.log(res, formData)
      createDefaultChatRoom()
        .then(() => goToDashboard())
        .catch(err => console.error(err))

    })
    .catch(err => {
      console.log(err)
    })

})

guestButton?.addEventListener('click', () => {
  console.log("hello")

  createDefaultChatRoom()
    .then(() => {
      goToDashboard()
    })
    .catch(err => console.error(err))
})

const goToDashboard = () => {
  location.replace('/dashboard');


}

const createDefaultChatRoom = () => {
  const users = {
    authUser: "authguy",
    otherUser: "otherguy"
  }
  console.log(users)
  return fetch('/chat/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(users)
  });

}
