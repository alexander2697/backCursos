const controlador = require('../controllers/Users.controller');

module.exports = (app) => {
    app.get("/api/obtenerUsuarios",  controlador.consultar );
    app.get("/api/obtenerUsuarios/:id",  controlador.consultarUsuario);
    app.post("/api/agregarUsuario", controlador.agregar );
    app.put("/api/actualizarUsuario/:id", controlador.actualizarNombre);
    app.put("/api/actualizarPass/:id", controlador.actualizarContraseña);
    app.put("/api/actualizarRol/:id", controlador.actualizarRol);
    app.put("/api/actualizarArea/:id", controlador.actualizarArea);
    app.delete("/api/eliminarUsuario/:id", controlador.eliminar);


};