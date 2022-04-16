module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(403).send("Lütfen önce çıkış yapınız.")
    }else{
        next()
    }
}