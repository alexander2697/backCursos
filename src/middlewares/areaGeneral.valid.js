module.exports = (area) => {

    if(area !== undefined && area !== null && typeof(area) === 'string' && area !== ""){
        return true;
    }
    else return false;

};