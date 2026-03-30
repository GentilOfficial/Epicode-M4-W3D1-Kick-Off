const params = new URLSearchParams(window.location.search)
const artistId = params.get("artist_id")
const artistName = params.get("artist_name")

const tracksList = document.querySelector("#artistSection .list-group")

const getArtistDetails = async (artist) => {
  try {
    const rawData = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist}/top?limit=25`,
    )
    return await rawData.json()
  } catch (error) {
    console.error(error)
  } finally {
    hideSpinner()
  }
}

const generateTrackListItem = ({ title, duration }) => {
  const listItem = document.createElement("li")
  listItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "list-group-item-dark",
  )

  const titleEl = document.createElement("span")
  titleEl.innerText = title

  const durationEl = document.createElement("span")
  durationEl.innerText = duration
  durationEl.classList.add("badge", "badge-success", "badge-pill")

  listItem.append(titleEl, durationEl)

  return listItem
}

const populareTracksList = (tracks) => {
  hideSpinner()
  tracks.forEach((track) => {
    tracksList.appendChild(generateTrackListItem(track))
  })
}

window.onload = () => {
  if (artistName) {
    populateArtistName(artistName)
  }
  showSpinner()
  getArtistDetails(artistId).then(({ data }) => populareTracksList(data))
}
