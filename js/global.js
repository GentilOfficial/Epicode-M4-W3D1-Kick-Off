const artistSection = document.getElementById("artistSection")
const artistNameEl = document.querySelector("#artist h2")
const spinner = document.querySelector(`#artist .spinner`)

const searchField = document.getElementById("searchField")
const searchButton = document.getElementById("button-search")

const showSpinner = () => {
  spinner.classList.remove("d-none")
}

const hideSpinner = () => {
  spinner.classList.add("d-none")
}

const populateArtistName = (artist) => {
  artistNameEl.innerText = artist
}
