module.exports=function(func) {
    try {
        return func;
    } catch (error) {
        alert(error);
    }
}