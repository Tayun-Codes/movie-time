let star = document.getElementsByClassName("fa-star")
let edit = document.getElementsByClassName("fa-pencil-square-o")
let publish = document.getElementsByClassName("fa-cloud-upload");
let del = document.getElementsByClassName("fa-trash-o");
// let title = document.getElementsByClassName("title");

Array.from(star).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log(this.parentNode.parentNode.childNodes)
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const date = this.parentNode.parentNode.childNodes[3].innerText
    const rating = this.classList[2]
    fetch('rating', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': title,
        'date': date,
        'star': rating
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })
  });
});

Array.from(edit).forEach(function (element) {
  element.addEventListener('click', function () {
    const original = this.parentNode.parentNode.childNodes[5].innerText
    const comment = prompt("Edit your comment", `${original}`);
    this.parentNode.parentNode.childNodes[5].innerText = comment;
    const title = this.parentNode.parentNode.childNodes[1].innerText;
    const date = this.parentNode.parentNode.childNodes[3].innerText
    fetch('edit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'user': user,
        'title': title,
        'date': date,
        'comment': comment
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })
  });
});

Array.from(publish).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log('CLICK publish')
    console.log(this.parentNode.parentNode.childNodes[5].childNodes[0].innerText)
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const href = title.replace(' ', '_')
    const date = this.parentNode.parentNode.childNodes[3].innerText
    const comment = this.parentNode.parentNode.childNodes[5].childNodes[0].innerText
    const rating = this.parentNode.parentNode.childNodes[17].innerText
    const star = Number(rating[0])
    fetch('publishRating', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': title,
        'href': href,
        'date': date,
        'comment': comment,
        'rating': rating,
        'star': star
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })
  });
});

Array.from(del).forEach(function (element) {
  element.addEventListener('click', function () {
    //need to add a way to delete the reviews from the public forums too
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const date = this.parentNode.parentNode.childNodes[3].innerText
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': title,
        'date': date
      })
    }).then(data => {
      console.log(data)
      window.location.reload()
    })
  });
});
