var features = [];

function initMap() {
  var greece = {
    lat: 37.9722781,
    lng: 24.1055779
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: greece,
    streetViewControl: false,
    mapTypeId: 'hybrid',
    heading: 90,
    tilt: 65,
    minZoom: 7
  });

  var iconBase = 'assets/images/';
  var icons = {
    max36: {
      icon: iconBase + 'm1.png'
    },
    max46: {
      icon: iconBase + 'm2.png'
    },
    max58: {
      icon: iconBase + 'm3.png'
    },
    max65: {
      icon: iconBase + 'm4.png'
    },
    maxNO: {
      icon: iconBase + 'm5.png'
    }
  };
  $.get('http://www.geophysics.geol.uoa.gr/stations/maps/seismicity.xml', function(data) {

    $(data).find("item").each(function() { // or "item" or whatever suits your feed
      var data = $(this);
      var magnValue = '',
        timeValue = '',
        depthValue = '',
        LatitudeValue = '',
        LongitudeValue = '';
      var descriptionData = data.find('description').text();
      var magn = descriptionData.search('M '),
        depth = descriptionData.search('Depth: '),
        time = descriptionData.search('Time: '),
        Latitude = descriptionData.search('Latitude: '),
        Longitude = descriptionData.search('Longitude: ');

      // Find Magnitude Value ------------------------------------------------------
      for (var i = 1; i <= 4; i++) {
        var magnValue = magnValue + descriptionData[magn + i];
      }

      // Find Depth Value ------------------------------------------------------
      var stringSize = ('Depth: ').length;
      for (var i = stringSize; i <= stringSize + 3; i++) {
        var depthValue = depthValue + descriptionData[depth + i];
      }

      // Find Time Value ------------------------------------------------------
      stringSize = ('Time: ').length;
      for (var i = stringSize; i <= stringSize + 20; i++) {
        var timeValue = timeValue + descriptionData[time + i];
      }

      // Find Latitude Value ------------------------------------------------------
      stringSize = ('Latitude: ').length;
      for (var i = stringSize; i <= stringSize + 5; i++) {
        var LatitudeValue = LatitudeValue + descriptionData[Latitude + i];
      }

      // Find Longitude Value ------------------------------------------------------
      stringSize = ('Longitude: ').length;
      for (var i = stringSize; i <= stringSize + 5; i++) {
        var LongitudeValue = LongitudeValue + descriptionData[Longitude + i];
      }
      // Push data into array features ------------------------------------------------------
      //      features.push({
      //        magnitute: magnValue,
      //        depth: depthValue,
      //        time: timeValue,
      //        latitude: LatitudeValue,
      //        longitude: LongitudeValue
      //      });
      /*  Debugging --------- KEPT just incase ------------

          console.log('------------------------------');
          console.log('The Magnitude is : ' + magnValue);
          console.log('The Depth is : ' + depthValue);
          console.log('The Time was : ' + timeValue);
          console.log('The Latitude was : ' + LatitudeValue);
          console.log('The Longitude was : ' + LongitudeValue);
      */
      var theImage;
      if (magnValue <= 3.6) {
        theImage = icons['max36'].icon;
      } else if (magnValue <= 4.6) {
        theImage = icons['max46'].icon;
      } else if (magnValue <= 5.8) {
        theImage = icons['max58'].icon;
      } else if (magnValue < 6.5) {
        theImage = icons['max65'].icon;
      } else {
        theImage = icons['maxNO'].icon;
      }
      var marker = new google.maps.Marker({
        position: {
          lat: parseInt(LatitudeValue),
          lng: parseInt(LongitudeValue)
        },
        //        label: timeValue + " Place : " + LatitudeValue + LongitudeValue,
        icon: theImage,
        map: map
      });
    });
  });
}
