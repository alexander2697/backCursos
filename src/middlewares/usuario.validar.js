module.exports = (req, res, next) => 
{

    const { nuevo_nombre } = req.body;
    const _regex = /[A-Za-z]/g;
    const _valid = _regex.test(nuevo_nombre)


    if(nuevo_nombre !== undefined && nuevo_nombre !== null && typeof(nuevo_nombre) === 'string'){
        next();
    }
    else res.status(500).end('NO SE PERMITE EL TIPO O EL VALOR DEL USUARIO');
};