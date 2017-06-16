/* $.ajax({
  dataType: "xml",
  contentType: "application/atom+xml",
  async: true,
  crossDomain: true,
  url:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom",
  cache: false,
  success:function(data) {
    console.log(data);
  }
});
*/

$.get('http://www.geophysics.geol.uoa.gr/stations/maps/seismicity.xml', function (data) {
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
        var data = $(this);
        var magnValue='',timeValue='',depthValue='',LatitudeValue='',LongitudeValue='';
        var descriptionData = data.find('description').text();
//         var texDescription = data.find("description").text();
        var magn = descriptionData.search('M '),
        depth = descriptionData.search('Depth: '),
        time = descriptionData.search('Time: '),
        Latitude = descriptionData.search('Latitude: '),
        Longitude = descriptionData.search('Longitude: ');

        // Find Magnitude Value
        for (var i=1; i <= 4; i++) {
          var magnValue = magnValue + descriptionData[magn+i];
        }

        // Find Depth Value
        var stringSize = ('Depth: ').length;
        for (var i = stringSize ; i <= stringSize + 3  ; i++) {
           var depthValue = depthValue + descriptionData[depth+i];
        }

        // Find Time Value
        stringSize = ('Time: ').length;
        for (var i = stringSize ; i <=stringSize + 20 ; i++) {
           var timeValue = timeValue + descriptionData[time+i];
        }

        // Find Latitude Value
        stringSize = ('Latitude: ').length;
        for (var i = stringSize; i <=stringSize + 4 ; i++) {
           var LatitudeValue = LatitudeValue + descriptionData[Latitude+i];
        }

        // Find Longitude Value
        stringSize = ('Longitude: ').length;
        for (var i = stringSize; i <=stringSize + 4 ; i++) {
           var LongitudeValue = LongitudeValue + descriptionData[Longitude+i];
        }
        console.log('------------------------------') ;
        console.log('The Magnitude is : '+ magnValue) ;
        console.log('The Depth is : '+ depthValue) ;
        console.log('The Time was : ' + timeValue);
        console.log('The Latitude was : ' + LatitudeValue);
        console.log('The Longitude was : ' + LongitudeValue);


//         console.log(texDescription);
//         console.log(textTitle);

    });
});
