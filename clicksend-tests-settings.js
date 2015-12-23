/**
 * Created by mikecunneen on 9/12/15.
 */
Meteor.startup(function () {
  Meteor.settings = {
    "appworkshop": {
      "restendpoints": [
        {
          "actionName": "sendSMS",
          "httpMethod": "post",
          "endpoint": "https://api.clicksend.com/rest/v2/send.json",
          "auth": {
            "username": "myClickSendUsername",
            "password": "myClickSendAPIKey"
          }
        }
      ],
      "SMSSenderID": "MyApp"
    }
  };

});