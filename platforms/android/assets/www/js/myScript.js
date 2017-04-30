var watchID = null;
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
$("button").click(function(){
 
	if(watchID)
	 navigator.geolocation.clearWatch(watchID);
 
	watchID = null;
	return false;
});



});


function onSuccess(position)
{
	$("p").html("Latitude: "+position.coords.latitude+
	            "<br />Longitude: "+position.coords.longitude+
				"<br />Accuracy: "+position.coords.accuracy);


	//passing latitude and longitude to google maps 
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latlong = new google.maps.LatLng(latitude,longitude)
    var mapOptions = {
    	center: latlong,
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),mapOptions)
    var marker = new google.maps.Marker({
    	position: latlong,
    	map: map,
    	title: 'my location',
    	animation: google.maps.Animation.BOUNCE
    })

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