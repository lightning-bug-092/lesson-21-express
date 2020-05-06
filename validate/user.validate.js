module.exports.postCreate = function(req,res,next){
  var errors = [];
  if(req.body.name.length>30)
    errors.push('name cannot exceed 30 characters')
  if(!req.body.name||!req.body.phoneNumber)
    errors.push('Enter the data fields')
  if(errors.length)
    {
       res.render("./users/create.pug",{
         errors:errors
       });
      return;
    };
  next();
}
