const api = "https://striveschool-api.herokuapp.com/api/deezer/search"

const getLastArtist = () => {
  return localStorage.getItem("artist")
}

const setLastArtist = (artist) => {
  localStorage.setItem("artist", artist)
}

const defaultArtist = getLastArtist() ?? "eminem"

const clearArtistSection = () => {
  artistSection.innerHTML = ""
  showSpinner()
}

const getTracks = async (artist = defaultArtist) => {
  try {
    const rawTracks = await fetch(`${api}?q=${artist}`)
    return await rawTracks.json()
  } catch (error) {
    console.error(error)
  } finally {
    hideSpinner()
  }
}

const generateTrackCard = ({
  title,
  artist: { id: artist_id, name: artist_name },
  album: { cover: album_cover },
}) => {
  const card = document.createElement("div")
  card.classList.add("p-3")

  const linkWrapper = document.createElement("a")
  linkWrapper.href = `./details.html?artist_id=${artist_id}&artist_name=${artist_name}`

  const imageEl = document.createElement("img")
  imageEl.src = album_cover
  imageEl.alt = title
  imageEl.classList.add("mb-2", "rounded", "img-fluid", "w-100")

  const titleEl = document.createElement("h3")
  titleEl.innerText = title
  titleEl.classList.add("h6")

  linkWrapper.appendChild(imageEl)

  card.append(linkWrapper, titleEl)

  return card
}

const showArtistTracks = (tracks, artist) => {
  populateArtistName(artist)

  tracks.forEach((track) => {
    artistSection.appendChild(generateTrackCard(track))
  })
}

const searchArtist = (artist = defaultArtist) => {
  setLastArtist(artist)
  clearArtistSection()
  getTracks(artist).then(({ data }) => showArtistTracks(data, artist))
}

searchButton.addEventListener("click", () => {
  const artist = searchField.value
  if (artist.length > 0) searchArtist(artist)
})

window.onload = () => {
  searchArtist()
}
