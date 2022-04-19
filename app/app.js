var mapa;

window.onload = function () {
    initApp();
  };


  /**
   * Iniciamos el mapa
   * @return 
   */

  function initApp(){
    mapa = new Map();
  }

  function onObtenerCapa(){
    var layerDom = document.getElementById("layers")

    while (layerDom.hasChildNodes()) {
        layerDom.removeChild(layerDom.firstChild);
      }
   
  const capas =   mapa.getCapas()

  capas.forEach(capa => {
    var para = document.createElement("p");
    para.innerHTML = JSON.stringify(capa);
      layerDom.appendChild(para)
  });
  }
  