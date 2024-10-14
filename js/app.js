document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const destination = document.getElementById('destination-input').value;
    const checkIn = document.getElementById('checkIn-date').value;
    const checkOut = document.getElementById('checkOut-date').value;

    // Construct query parameters
    const queryParams = new URLSearchParams({
        destination: destination,
        checkIn: checkIn,
        checkOut: checkOut
    });

    // Fetch search results from the backend
    fetch(`/api/hotels?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length > 0) {
                data.forEach(hotel => {
                    const hotelDiv = document.createElement('div');
                    hotelDiv.className = 'hotel-result';
                    hotelDiv.innerHTML = `
                        <h3>${hotel.name}</h3>
                        <p>${hotel.description}</p>
                        <p>Price: $${hotel.price}</p>
                    `;
                    resultsContainer.appendChild(hotelDiv);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found for the selected destination and dates.</p>';
            }
        })
        .catch(error => console.error('Error fetching search results:', error));
});
