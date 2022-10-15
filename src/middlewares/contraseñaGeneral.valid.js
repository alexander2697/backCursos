module.exports = (contraseña) => {

    if(contraseña !== undefined && contraseña !== null && typeof(contraseña) === 'string' && contraseña !== ""){
        return true;
    }
    else return false;
}