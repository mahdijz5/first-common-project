exports.getHomePage = (req,res) => {
    res.render("home" , {
        pageTitle : "test"
    })
}