Tinytest.addAsync('SMS', function (test, next) {
  Meteor.user = function () {
    return true;
  }; // mock meteor.user

  Meteor.call('sendSMS', '+61411111111', "Test SMS!", function (error, result) {
    test.matches(error.error.stack, /"result":"2022","errortext":"Invalid credentials"/, "Credentials should be invalid");
    next();
  });

});