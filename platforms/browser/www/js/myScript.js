var map;
var infowindow;
var watchID = null;
var service;
var places;
$(document).ready(function(){
 
    //check if browser support geolocation service or not
	if(navigator.geolocation)
	{
		var optn = {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0	
		};
		var watchID = navigator.geolocation.watchPosition(onSuccess, onFail, optn);
	}
	else
	 $("p").html("HTML5 Not Supported");
 

//stop event
$(".stopBtn").click(function(){
 
	if(watchID)
	 navigator.geolocation.clearWatch(watchID);
 
	watchID = null;
	return false;
});



});

function onSuccess(position)
{

	//passing latitude and longitude to google maps 
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latlong = new google.maps.LatLng(latitude,longitude)
    var mapOptions = {
    	center: latlong,
    	zoom: 13,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"),mapOptions)
    var marker = new google.maps.Marker({
    	position: latlong,
    	map: map,
    	title: 'my location',
    	animation: google.maps.Animation.BOUNCE
    })
    var pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};
    infowindow = new google.maps.InfoWindow();
    
    service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 5000,
          type: ['establishment']
        }, callback);    
     
}

 function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        
         

        }

      }


 function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        
        service.getDetails({placeId: place.place_id})
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.vicinity + '</div>');
          infowindow.open(map, this);
        });
        //Adding place into list
        //places = '<p>'+place.name+'</p>'
        places = "<div class='col s12 m6'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>"+place.name+"</span><p>"+place.vicinity+"</p></div></div></div>"
        $("div.row").append(places); 
      }

// if browser doesn't found a location 
function onFail(error)
{
	var errorType = {
						0: "Unknown Error",
						1: "Permission denied by the user",
						2: "Position of the user not available",
						3: "Request timed out"
					};
 
	var errMsg = errorType[error.code];
 
	if(error.code == 0 || error.code == 2){
		errMsg = errMsg+" - "+error.message;
	}
 
	$("p").html(errMsg);
}