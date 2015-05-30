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
    
    Contacts.insert({
      name: event.target.name.value,
      number: event.target.number.value,
      email: event.target.email.value,
      address: event.target.address.value,
      createdAt: new Date()
    });

    event.target.name.value = "";
    event.target.number.value = "";
    event.target.email.value = "";
    event.target.address.value = "";

    console.log('form submitted!');
    return false;
    }
  });


  var checked = [];

  Template.contact.events({
  "click .toggle-checked": function () {
    var index = checked.indexOf(this._id);
    if (index > -1) {
      checked.splice(index, 1);
    }else{
      checked.push(this._id);
    }
  }
  });


  
  Template.contacts.events({
  "click th": function(event){
    var order = $(event.target).text().toLowerCase();
    Session.set('sortby', order);
  },
  "click .delete": function () {
    console.log('delete');
    $.each(checked, function(index, value) {
      Contacts.remove(value);
    });
    checked = [];
  }
  });

  Template.contacts.helpers({
  contacts: function(){
    var filter = {sort: {}};
    var query = Session.get('query');
    filter.sort[Session.get('sortby')] = 1;

    return Contacts.find({ name: new RegExp(query, 'i') }, filter);
  }
  });

  Template.navbar.events({
    "click .delete": function () {
    console.log('delete');
    $.each(checked, function(index, value) {
      Contacts.remove(value);
    });
    checked = [];
  },

  
  "keyup .searchbox": function(event){
  var query = event.target.value;
  Session.set('query', query);
  }


  })


}
