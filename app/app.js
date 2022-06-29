var mapa;
var modoApp; // 0-visualizacion || 1-alta
var idZona;
var notification;

window.onload = function () {
  initApp();
};

/**
 * Iniciamos la aplicación
 * @return
 */

function initApp() {
  notification = new NotificationClass();
  getModoZonaApp();
  initMap();

  if(existenParametrosDeEntrada()){
    setModo();
  }else{
    // solo mostramos el mapa sin ninguna funcionalidad
    habilitarModoVisualizacion()
  }
  
}

function getModoZonaApp(){
  //obtenemos los datos enviados en la url
  modoApp =UtilClass.getUrlParameter("modo");
  idZona = UtilClass.getUrlParameter("zona");
}


function existenParametrosDeEntrada() {
  if (!modoApp || !idZona) {
    alert(
      "No se detectaron los parámetros de entrada! Deberá ingresarlos para asegurar el correcto funcionamiento del servicio."
    );
    return false;
  }

  return true;
}


function initMap(){
  mapa = new Map();
}

function setModo(){
  // si el modo es visualización debo cargar la capa
  if(+modoApp==0){
    habilitarModoVisualizacion()
    // obtengo la capa que debo previsualizar por defecto
    precargarCapa();
  }

}


/// ********************* MODO VISUALIZACION ****************************//

// solo se permiten visualizar capas. La capa la obtenemos en base al enviado por url
function habilitarModoVisualizacion(){

  // modo visualizacion
  // oculto el boton que me permite guardar la zona
   document.getElementById("guardarZonaBtn").style.visibility = "hidden";
  
   // oculto los controles que permiten crear una nueva capa
   mapa.hideDrawControls()

}

function precargarCapa() {
// precargo la capa teniendo en cuenta los identificadores enviados por url
MapService
  .getLayer(
    idZona
  )
  .then(function (response) {
    return response.json();
  })
  .then(function (capa) {        
    mapa.loadCapa(JSON.parse(capa.ZonaJson)) 
  })
  .catch(function (error) {
    alert("ha ocurrido un error al obtener los datos de la capa!");
    console.log(error);
  });
}


/// ********************* FIN MODO VISUALIZACION ****************************//

/**
 * @description Obtenemos la capa dibujada en pantalla
 * @returns capa
 */

 async function  onGuardarZona() {  

  const capa = mapa.getCapas()[0];


  if(capa){
    const result = await MapService.saveLayer(idZona,capa)
    if (+result === 200) {
      notification.loadNotification(
        "La zona ha sido guarda satisfactoriamente!",
        "is-success"
      );
    } else {
      notification.loadNotification(
        "Ocurrio un error mientras se realizada la operación!",
        "is-danger"
      );
    }

  }else{
    alert('Zona no identificada o delimitada!')
  }
  

}
