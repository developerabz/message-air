
// Frontend


const button = document.querySelector('button')

button.addEventListener('click', (e) => {
  console.log(e.target.value)
})


fetch('/posts').then(res => {
  res.json().then(r => {
    console.log(r)

    const body = document.querySelector('body')
    for (const item of r) {
      const li = document.createElement('li')
      li.textContent = item
      body.append(li)
    }
  })
}).catch(err => {
  console.log(err)
})
