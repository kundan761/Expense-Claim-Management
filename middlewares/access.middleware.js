const access =(...permittedRoles) =>(req, res, next) =>{
    try {
        const role = req.body.role;
        if(permittedRoles.includes(role)){
            next();
        }else{
            res.status(200).json({msg:'You are not authorized to access this part'});
        }
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = {
    access
};