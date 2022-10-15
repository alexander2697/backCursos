module.exports = (req, res, next) => 
{

    const { nueva_contraseña } = req.body;

    if(nueva_contraseña !== undefined && nueva_contraseña !== null && typeof(nueva_contraseña) === 'string'){
        next();
    }
    else res.status(500).end('NO SE PERMITE LA CONTRASEÑA');
};