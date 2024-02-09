const signUpForm = document.querySelector('form');

const signUpButton = document.querySelector('.signup-button');
const guestButton = document.querySelector('.guest-button');

signUpForm?.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  const formData: any = new FormData(signUpForm);
  const form: any = {};
  for (const entry of formData.entries()) {
    const [key, value] = entry;
    form[key] = value
  }
  console.log(form)
  fetch('/user/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then((res: any) => {
      console.log(res, form)
      goToDashboard()

    })
    .catch(err => {
      console.log(err)
    })

})

guestButton?.addEventListener('click', () => {
  goToDashboard()
})

const goToDashboard = () => {
  location.replace('/dashboard')
}
