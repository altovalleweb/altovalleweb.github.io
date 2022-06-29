class MapService {

  static async saveLayer(zonaId, zonaLayer) {
    try {
      const stringLayer = JSON.stringify(zonaLayer);
      const bodyRequest = JSON.stringify({
        ZonaId: zonaId,
        ZonaJson: stringLayer
      });

      const result = await fetch(
        "https://api.codetabs.com/v1/proxy?quest=www.foodchoice.es/foodchoicebe/rest/WSGuardaZona",
        {
          method: "POST",
          body: bodyRequest,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return result.status;
    } catch (error) {
      alert("ha ocurrido un error al realizar la operación");
      console.log(error);
    }
  }

 static getLayer(zonaId) {
    const bodyRequest = JSON.stringify({
      ZonaId: zonaId,
    });

    return fetch("https://api.codetabs.com/v1/proxy?quest=www.foodchoice.es/foodchoicebe/rest/WSDevuelveZonas", {
      method: "POST",
      body: bodyRequest,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
