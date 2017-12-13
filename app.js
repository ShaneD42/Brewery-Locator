//
// $.getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.4484,-112.0740&radius=50000&type=bar&keyword=brew&key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU');
//
// $xhr.done(function(data) {
//   console.log(data)
//
// })


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


let locations = [];
let map;
let infowindow;

function initMap(url) {
  const endpoint = url || "https://maps.googleapis.com/maps/api/geocode/json?address=Phoenix&key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU"
  $.get(endpoint, function(coords) {
    // console.log(coords);
    let uluru = coords.results[0].geometry.location;

// <--Marker for current location-->
    let homeMarker = new google.maps.Marker({
        position: uluru,
        title:"TEST"
    });

    // To add the marker to the map, call setMap();
    homeMarker.setMap(map);


    map = new google.maps.Map(document.getElementById('map'), {
      center: uluru,
      zoom: 10
    });

    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: uluru,
      // radius: 50000,
      type: ['bar'],
      keyword: ['brewery'],
      rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
  })
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      let p = $('<p></p>')
      p.text(results[i].name + " " + results[i].vicinity)
      $('#listings').append(p)
      locations.push();
      locations = []
    }

  }
}

let finder = $('#findBreweries')
finder.click(function(e) {
  initMap("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU&address=" + $('#search').val())
  // $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU&address=" + $('#search').val(), function(results) {
  //   for (let i = 0; i < results.length; i++) {
  //     let names = results[i].name;
  //     let address = results[i].vicinity;
  //     let p = $('<p></p>')
  //     p.text(names + " " + address)
  //     $('#listings').append(p)
  //   }
  // })
})


function createMarker(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
