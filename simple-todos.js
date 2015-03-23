//simple-todos.js
Tasks = new Mongo.Collection("tasks");



if (Meteor.isClient) {
  //This code only runs on the client
    Template.body.helpers({
        tasks: function(){
        return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-task": function(event){
            var toDoText = event.target.text.value;

        Tasks.insert({
            text: toDoText,
            createdAt: new Date() // current time
        });

        //clear form
        event.target.text.value = "";

        //prevent default form submit
        return false
        }
    });

    Template.task.events({
        "click .toggle-checked": function(){
            Tasks.update(this._id, {$set: {checked: ! this.checked}});
        },
        "click .delete": function(){
            Tasks.remove(this._id);
        }
    });
}
