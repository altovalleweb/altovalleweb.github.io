(function(win, doc) {

      var olview = new ol.View({
        //center: [-7582964, -4714849],
        projection: 'EPSG:3857',
        center: ol.proj.transform([-68.10752,-38.94265], 'EPSG:4326','EPSG:3857'),
        //projection: 'EPSG:3587',
        //center: ol.proj.fromLonLat([-38.94265,-68.10752]),
        //extent: [ -68.43040,-38.84773,-67.78496,-39.03732],
        extent: ol.proj.transformExtent([ -68.43040,-38.84773,-67.78496,-39.03732], 'EPSG:4326','EPSG:3857'),
        zoom: 12.5,
        minZoom: 2,
        maxZoom: 20,
      }),
      
      //Establecimientos Educativos    
       wmsSource = new ol.source.ImageWMS({
        url: 'http://geoeducacion.neuquen.gov.ar/proxy/http://geoeducacion.neuquen.gov.ar/geoserver/establecimientos_edu/wms',
        params: {'LAYERS': 'establecimientos_edu:com_sec_tec_y_agrop',
                 'STYLES': 'establecimientos_edu:com_sec_tec_y_agrop_etiqueta'
                 },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      }),

       wmsLayer = new ol.layer.Image({
        source: wmsSource
      }),
      

      // Polygonos de Relleno
      _myStroke = new ol.style.Stroke({
        color : 'rgba(255,0,0,1.0)',
        width : 1    
     });
     
     _myFill = new ol.style.Fill({
        color: 'rgba(255,0,0,1.0)'
     });
     
     myStyle = new ol.style.Style({
        stroke : _myStroke,
        fill : _myFill
      });



        
   

      // A GeoJSON layer
 CapaVector =  new ol.layer.Vector({
  source: new ol.source.Vector({
    url:'http://geoeducacion.neuquen.gov.ar/proxy/http://geoeducacion.neuquen.gov.ar/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
    'typename=establecimientos_edu:ra_nqn_tec&outputFormat=application/json&srsname=EPSG:3857&',
    // If you want to use a static file, change the previous row to
    // url: 'data/bptlandmarks.json',
    format: new ol.format.GeoJSON()
  }),
  style: myStyle,
  opacity: 0.1
});



      

      // wmsSource = new TileWMS({
      //   url: 'http://geoeducacion.neuquen.gov.ar/geoserver/establecimientos_edu/wms',
      //   params: {'LAYERS': 'establecimientos_edu:Estab_agosto', 'TILED': true},
      //   serverType: 'geoserver',
      //   crossOrigin: 'anonymous',
      // });
      
      // wmsLayer = new TileLayer({
      //   source: wmsSource,
      // });




      
      baseLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      map = new ol.Map({
        target: doc.getElementById('map'),
        view: olview,
        layers: [baseLayer, wmsLayer, CapaVector],
      }),
      popup = new ol.Overlay.Popup();
  
    //Instantiate with some options and add the Control
    var geocoder = new Geocoder('nominatim', {
      provider: 'osm',
      countrycodes:'AR',
      boundingbox:  ['-38.84773', '-68.43040','-39.03732','-67.78496'],
      
      targetType: 'text-input',
      lang: 'es',
      placeholder: 'Calle a Buscar ...',
      limit: 15,
      keepOpen: false,
    });
  
    map.addControl(geocoder);
    map.addOverlay(popup);



   

    var vectorSource = new ol.source.Vector({
    });
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    map.addLayer(vectorLayer);



    
    map.on('singleclick', function (evt) {

      //coordenadas = ol.proj.transform(evt.coordinate, 'EPSG:4326', 'EPSG:3587'),
      //console.log(coordenadas)
      //popup.show();
            
       //console.log('By Click:')
       //console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))
       //popup.show(evt.coordinate, ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
      


       var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
          return feature;
        });
      if (feature) {
          
          var geometry = feature.getGeometry();
          var coord = geometry.getCoordinates();
          

          var content = '<h3>' + feature.get('ESTABLECIM') + '</h3>';
          content += '<h4>' + feature.get('ETIQUETA') + '</h4>';
          let coordTransform= ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')          
          content += '<h5>' + coordTransform + '</h5>';          
          console.log(evt.coordinate)
          simpleReverseGeocoding(coordTransform[0],coordTransform[1])
          $('#mi_escuela').html(`${feature.get('ESTABLECIM')}`);
          popup.show(evt.coordinate, content);
          
      }
   
       
    });
  
    //Listen when an address is chosen
    geocoder.on('addresschosen', function(evt) {
      window.setTimeout(function() {
        popup.show(evt.coordinate, evt.address.formatted);
        console.log('By Geocoder:')
        console.log(evt.coordinate)        
        console.log(evt.address.formatted)
        console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))
       
        $('#mi_direccion').html(`${evt.address.original.details.road} ${evt.address.original.details.house_number|| ''}, ${evt.address.original.details.quarter || evt.address.original.details.suburb}, ${evt.address.original.details.city} `);
        
      }, 3000);
    });


    function simpleReverseGeocoding(lon, lat) {
      fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon).then(function(response) {
        return response.json();
      }).then(function(json) {
        //document.getElementById('address').innerHTML = json.display_name;
       $('#mi_direccion').html(`${json.display_name} `);
        console.log(json)
      })
    }

  })(window, document);


