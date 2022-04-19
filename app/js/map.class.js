class Map{

    map;

    constructor(){   
        this.initMap()
    }
        
    initMap(){
       this.map = L.map('map').setView([38.572122306730996, -0.0702209653455989], 15);

       L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    attribution: 'Datos del mapa &copy; 2022 <img src="https://lh3.googleusercontent.com/PoTrayfCHVcgWMLP9wryR37V2VUjVX8AQZEnGChDGu5MMHQLH2w_Fs4MlT4SsEF-Hq4Qca-J7yIpr3Q-u1mkOtnn1VoeKV7IL2ae=h128" width=10px > <a href="http://www.google.com/">Google Satellite</a> <a href="https://www.google.com/intl/es-419_ar/help/terms_maps">Terminos de Uso</a>',
    maxZoom: 18,        
    }).addTo(this.map);

   this.initDrawControls()
    }


    initDrawControls(){
        this.map.pm.addControls({  
            position: 'topleft',              
            drawMarker  : false,
            drawCircleMarker:false,
            drawRectangle:false,
            drawPolyline:false,
            rotateMode:false,
            cutPolygon:false,
            dragMode:false
          });

          this.map.pm.setLang('es');

          this.map.pm.Draw.getShapes()

        this.map.on('pm:create', (e) => {
            console.log(e.layer.toGeoJSON())
          });
          
    }

    /**
     * @return lista de capas del mapa
     */
    getCapas(){       

       const capas = this.map.pm.getGeomanLayers(false)
      return capas.map( layer=> { return this.transformLayerToJson(layer) }); 
     
    }

    transformLayerToJson(layer) {
        const json = layer.toGeoJSON();
      
        if (layer instanceof L.Circle) {
          json.properties.radius = layer.getRadius();
        }
      
        return json;
      }
    

}