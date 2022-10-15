module.exports = (id) => {    
    const _reg = /[A-Za-z!"#$%&/()=?*¨_:;^~`¬+]/g;
    const _valid = _reg.test(id);

    if(id !== undefined && id !== null && !_valid && id !== ""){
        return true;
    }
    else return false;

};