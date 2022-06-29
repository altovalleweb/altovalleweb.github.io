# ACCESO AL SERVICIO
el acceso al servicio de mapa requiere los siguientes parametros en la url:
- modo: 0-visualizacion | 1-alta
- zona



Ejemplo
http://127.0.0.1:5500/?modo=0&zona=2

## Modo Visualización

El modo visualización solo precarga de manera automática la capa correspondiente a la zona indicada por parametro (zona)
http://127.0.0.1:5500/?modo=0&zona=2

## Modo Alta

El modo carga permite crear una nueva capa la cual estará asociada a la zona indicada por el parametro (zona)
http://127.0.0.1:5500/?modo=1&zona=2




