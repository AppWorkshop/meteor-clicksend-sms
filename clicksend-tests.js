Meteor.startup(function () {
  if (Meteor.isServer) {
    Meteor.user = function () {
      return true;
    }; // mock meteor.user
    Meteor.methods({
      sendSMSFromServer: function () {
        var result = AppWorkshop.sendSMS('+61411111111', "Test SMS!");
        return result;
      }
    });
  }

  if (Meteor.isClient) {
    Tinytest.addAsync('SMSFromClient', function (test, next) {

      try {
        var result = AppWorkshop.sendSMS('+61411111111', "Test SMS!");

      } catch (error) {
        // error should be like "AppWorkshop is not defined"
        test.matches(error.message, /AppWorkshop is not defined/, "You shouldn't be able to send messages directly from the client");
        next();
      }

    });


    Tinytest.addAsync('SMSFromServer', function (test, next) {

      Meteor.call('sendSMSFromServer', function (error, result) {
        test.matches(error.error.stack, /"result":"2022","errortext":"Invalid credentials"/, "Credentials should be invalid");
        next();
      });

    });
  }


});