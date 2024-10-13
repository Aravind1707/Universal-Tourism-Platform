// app.js
document.querySelector('.search-button').addEventListener('click', function() {
  const destination = document.querySelector('.search-input[type="text"]').value;
  const checkIn = document.querySelectorAll('.search-input[type="date"]')[0].value;
  const checkOut = document.querySelectorAll('.search-input[type="date"]')[1].value;

  if (destination && checkIn && checkOut) {
      fetch(`/api/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`)
          .then(response => response.json())
          .then(data => {
              // Display the search results dynamically
              console.log('Search results:', data);
              // Add logic to display results on the frontend
          })
          .catch(error => console.error('Error fetching data:', error));
  } else {
      alert('Please fill out all fields');
  }
});
