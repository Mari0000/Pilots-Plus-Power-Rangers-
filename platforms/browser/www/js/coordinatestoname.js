// Demo: http://jsfiddle.net/1yom6brx/1/
$(document).ready(function(){
   
   if( navigator.geolocation )
     navigator.geolocation.getCurrentPosition(success);

});

function success(pos){
  
  var latlng;
latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); // New York, US
//latlng = new google.maps.LatLng(37.990849233935194, 23.738339349999933); // Athens, GR
//latlng = new google.maps.LatLng(48.8567, 2.3508); // Paris, FR
//latlng = new google.maps.LatLng(47.98247572667902, -102.49018710000001); // New Town, US
//latlng = new google.maps.LatLng(35.44448406385493, 50.99001635390618); // Parand, Tehran, IR
//latlng = new google.maps.LatLng(34.66431108560504, 50.89113940078118); // Saveh, Markazi, IR

new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            var country = null, countryCode = null, city = null, cityAlt = null;
            var c, lc, component;
            for (var r = 0, rl = results.length; r < rl; r += 1) {
                var result = results[r];

                if (!city && result.types[0] === 'locality') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'locality') {
                            city = component.long_name;
                            break;
                        }
                    }
                }
                else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'administrative_area_level_1') {
                            cityAlt = component.long_name;
                            break;
                        }
                    }
                } else if (!country && result.types[0] === 'country') {
                    country = result.address_components[0].long_name;
                    countryCode = result.address_components[0].short_name;
                }

                if (city && country) {
                    break;
                }
            }
            //.$("div#plants").append("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
            $(".plants-all").attr("src",'http://powo.science.kew.org/?q='+country+'')
            //console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
        }
    }
});

}