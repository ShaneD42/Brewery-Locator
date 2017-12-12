//
// let $xhr = $.getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.4484,-112.0740&radius=50000&type=bar&keyword=brew&key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU');
//
// $xhr.done(function(data) {
//   console.log(data)
//
// })


// let btn = $("#findBreweries")
// btn.click(function() {
//
// }

// <--ajax hero-->
//$.get("http://www.omdbapi.com/?apikey=702b3bb5&t=" + $('#search').val(), function(data)
//#

// <----Phoenix map below---->
// function initMap() {
//   var uluru = {lat: -33.8665433, lng: 151.1956316};
//   // Phoenix = {lat: 33.4484, lng: -112.0740}
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 10,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   })
// };

// let finder = $('#findBreweries')
// finder.click(function(e) {
//
// }


var map;
var infowindow;

function initMap() {
  var phoenix = {
    lat: 33.4484,
    lng: -112.0740
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: phoenix,
    zoom: 10
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: phoenix,
    radius: 50000,
    type: ['bar']
    // keyword: 'brew'
  }, callback);
}

// $(document).ready(function() {
// $('#findBreweries').click(function() {
// $(this)
//
//  })
// })


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i].name + " " + results[i].vicinity)
      
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
