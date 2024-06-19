module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.get('/', server.loopback.status());

  // Agregar tus nuevas rutas aquí
  router.get('/nueva-ruta', function(req, res) {
    res.send('Hola, esta es la nueva ruta!');
  });

  router.get('/nueva-ruta', function(req, res) {
    var MiModelo = server.models.MiModelo;
    MiModelo.find(function(err, datos) {
      if (err) return res.status(500).send(err);
      return res.status(200).send(datos);
    });
  });

  server.use(router);
};