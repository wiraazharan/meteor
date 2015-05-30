Contacts = new Mongo.Collection('contacts');

if (Meteor.isClient) {
  //   ]

   Template.contacts.helpers({
    contacts: function(){
        return Contacts.find({});
    }
  });
  
  Template.new_contact.events({
  "submit .contactForm": function(event){
    console.log('form submitted!');
    return false;
    }
  });
}
