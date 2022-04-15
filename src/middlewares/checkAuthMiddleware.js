module.exports = (req, res, next) => {
    if(!req.isAuthenticated()){
        res.status(401).send("Lütfen giriş yapınız.")
    }else{
        next()
    }
}