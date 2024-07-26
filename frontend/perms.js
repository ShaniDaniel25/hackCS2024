// Request location permission
navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      // You can use the position to fetch the country using a reverse geocoding API
    },
    (error) => console.error(error)
  );
  
  // Request contact permission - Note: Accessing contacts is not available on web browsers
  // and generally needs mobile-specific APIs or plugins.
  