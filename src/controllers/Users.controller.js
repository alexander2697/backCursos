const bcrypt = require('bcrypt');
const index = require('../models');

const usuarios = index.usuarios; 
const usuarioValid = require('../middlewares/usuarioGeneral.valid');
const passValid = require('../middlewares/contraseñaGeneral.valid');
const areaValid = require('../middlewares/areaGeneral.valid');
const rolValid = require('../middlewares/rolGeneral.valid');
const idValid = require('../middlewares/idGeneral.valid');

exports.consultar = async (req, res) => {
    const todos = await usuarios.findAll();
    res.send(todos);
}

exports.consultarUsuario = async (req, res) => {
    const { id } = req.params;

    const _valid = idValid(id);
    if(_valid==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('No existe');
    }
    res.send(usuario);
}

exports.agregar = async(req, res) => {
    const { usuario, contraseña, rol, area } = req.body;
    const _validName = usuarioValid(usuario);
    const _validPass = passValid(contraseña);
    const _validRol = rolValid(rol);
    const _validArea = areaValid(area);
    


    if(!_validName || !_validPass || !_validRol || !_validArea){
        if(_validName==false){
            return res.status(401).end('NO SE PERMITE EL NOMBRE DE USUARIO');
        }
        else if(_validPass==false){
            return res.status(401).end('NO SE PERMITE LA CONTRASEÑA');
        }
        else if(_validRol==false){
            return res.status(401).end('NO SE PERMITE EL ROL');
        }
        else if(_validArea==false){
            return res.status(401).end('NO SE PERMITE EL AREA');
        }
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(contraseña, salt, function(err, hash) {
            // Store hash in your password DB.
            usuarios.create({
                usuario, 
                contraseña: hash, 
                rol, 
                area
            }).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500);
                console.log(err);
            });
            
        });
    });

}

exports.actualizarNombre = async (req, res) => {
    const { nuevo_nombre } = req.body;
    const { id } = req.params;

    const _validId = idValid(id);
    if(_validId==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('No existe el usuario');
    }

    const _valid = usuarioValid(nuevo_nombre);
    if(_valid==false){
        return res.status(401).end('NO SE PERMITE EL NOMBRE DE USUARIO');
    }

    await usuarios.update({
        usuario: nuevo_nombre
    }, {where: {id}}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500);
        console.log(err);
    });
}

exports.actualizarContraseña = async (req, res) => {
    const { contraseña_actual, nueva_contraseña } = req.body;
    const { id } = req.params;

    const _validId = idValid(id);
    if(_validId==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('No existe el usuario');
    }

    const _validPass = passValid(contraseña_actual);
    if(_validPass==false){
        return res.status(401).end('NO SE PERMITE LA CONTRASEÑA');
    }

    const _validPass2 = passValid(nueva_contraseña);
    if(_validPass2==false){
        return res.status(401).end('NO SE PERMITE LA CONTRASEÑA');
    }

    const saltRounds = 10;
    const contraseña = usuario.contraseña;
    bcrypt.compare(contraseña_actual, contraseña, function(err, result) {  // Compara la contraseña ingresada, con la guardada
        // Si la contraseña coincide...
        if (result) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(nueva_contraseña, salt, function(err, hash) {
                    // Se guarda la nueva contraseña.
                    usuarios.update({
                        contraseña: hash
                     }, {where: {id}}).then(data => {
                        res.send(data);
                     }).catch(err => {
                        res.status(500);
                        console.log(err);
                    });
                });
            });
            return res.status(200).end("CONTRASEÑA ACTUALIZADA CORRECTAMENTE");
        }
        // Si la contraseña no coincide
        else {
            return res.status(500).end("LA CONTRASEÑA NO COINCIDE");
        }
      });
}

exports.actualizarRol = async (req, res) => {
    const { nuevo_rol } = req.body;
    const { id } = req.params;

    const _validId = idValid(id);
    if(_validId==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('No existe el usuario');
    }

    const _valid = rolValid(nuevo_rol);
    if(_valid==false){
        return res.status(401).end('NO SE PERMITE EL ROL');
    }

    await usuarios.update({
            rol: nuevo_rol
        }, {where: {id}}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500);
            console.log(err);
        });
}

exports.actualizarArea = async (req, res) => {
    const { nueva_area } = req.body;
    const { id } = req.params;

    const _validId = idValid(id);
    if(_validId==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('NO EXISTE EL USUARIO');
    }

    const _valid = areaValid(nueva_area);
    if(_valid==false){
        return res.status(401).end('NO SE PERMITE EL AREA');
    }

    await usuarios.update({
            area: nueva_area
        }, {where: {id}}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500);
            console.log(err);
        });
}

exports.eliminar = async (req, res) => {
    const { id } = req.params;

    const _valid = idValid(id);
    if(_valid==false){
        return res.status(401).end('EL ID ES INCORRECTO');
    }

    const usuario = await usuarios.findByPk(id);
    if(!usuario){
        return res.status(404).end('NO EXISTE EL USUARIO');
    }

    await usuarios.destroy({
        where: {id}
    });
    return res.status(200).end('USUARIO ELIMINADO');
}