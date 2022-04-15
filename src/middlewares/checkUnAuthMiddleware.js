module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(401).send("Lütfen önce çıkış yapınız.")
    }else{
        next()
    }
}