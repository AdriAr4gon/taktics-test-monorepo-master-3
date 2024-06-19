const loopback = require('loopback');
const boot = require('loopback-boot');
const cors = require('cors');

const app = module.exports = loopback();

// Habilitar CORS (permisos para solicitudes desde otros dominios)
app.use(cors());

// Montar las rutas REST bajo /api
app.use('/api', loopback.rest());

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // Iniciar el servidor
  const server = app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
});
