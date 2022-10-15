module.exports = (rol) => {

    if(rol !== undefined && rol !== null && typeof(rol) === 'string' && rol !== ""){
        return true;
    }
    else return false;

};