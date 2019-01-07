function autocomplete(input, latitudeInput, longitudeInput) {
    if (!input) { return }
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace()
        latitudeInput.value = place.geometry.location.lat()
        longitudeInput.value = place.geometry.location.lng()
    })

    input.on('keydown', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
        }
    })
}

export default autocomplete