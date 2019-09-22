// contactController.js
// Import contact model
Contact = require('./contactModel');

exports.authUser =  (id, password, callback) =>{
    console.log('input id :' + id.toString() + '  :  pw : ' + password);
 
    //cmd 에서 db.users  로 썻던 부분이 있는데 이때 이 컬럼(테이블)에 접근은 다음처럼 한다
    Contact.get((err, contacts)=>{
        var data = contacts.map(result=>
           {
               if(id === result.email){
                   console.log('That is')
                   if(password === result.password){
                       console.log('that is correct')
                   }
                   console.log("That is incorrect")
               }

               else{
                   console.log("There is no users")
               }
           }
            )
    
    })
    //찾고자 하는 정보를 입력해준다
    //var result = users.find({ name: id, passwords: password });
    //var result = users.find({ "name": id, "passwords":password });
    //var result = users.find({ "name": id , "passwords": password });
    //var result = users.find({});
 
    // var result = users.find({ "name": id, "email": password });
 
    result.toArray(
        function (err, docs) {
            if (err) {
                callback(err, null);
                return;
            }
 
            if (docs.length > 0) {
                console.log('find user [ ' + docs + ' ]');
                callback(null, docs);
            }
            else {
                console.log('can not find user [ ' + docs + ' ]');
                callback(null, null);
            }
        }
 
    );
 
};

// Handle index actions
exports.index = async (req, res)=> {
   
   Contact.get((err, contacts)=> {

        
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};


// Handle create contact actions
exports.new = (req, res)=> {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.password = req.body.password;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save((err) =>{
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New contact created!',
                data: contact
            });
    });
};

// Handle login

exports.login = (req, res)=>{
    email = req.body.id
    password = req.body.passwords
    Contact.find({"email":req.body.id , "password":req.body.passwords},  (err, contact) =>{
        console.log(contact)
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
}
// Handle view contact info
exports.view =  (req, res)=> {
    Contact.findById(req.params.contact_id,  (err, contact) =>{
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update =  (req, res)=> {
    Contact.findById(req.params.contact_id,  (err, contact)=> {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.password = req.body.password;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save( (err)=> {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete =  (req, res)=> {
    Contact.remove({
        _id: req.params.contact_id
    },  (err, contact)=>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};