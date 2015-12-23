var smsFunctionLibrary;
AppWorkshop = AppWorkshop || {};

Meteor.startup(function () {
  // initialise our endpoints
  smsFunctionLibrary = new RestEndpoints();


  /**
   * Sends an SMS from the server using ClickSend. Couldn't get much simpler. NOTE: Won't allow sending from the client.
   * The return object is the result of the HTTP.call. The data property is probably what you're interested in. It looks like:
   * <pre>
   {
         statusCode: 200,
         content: '{"recipientcount":1,"messages":[{"to":"+61 (0)431-939-709","messageid":"8E76C2C1-BF0B-EAD1-E093-FDC02574B5AC","result":"0000","errortext":"Success","price":"0.0770","currency_symbol":"$","currency_type":"AUD"}]}',
         headers: {
           'cache-control': 'no-cache="set-cookie"',
           'content-type': 'application/json',
           date: 'Tue, 08 Dec 2015 07:45:50 GMT',
           server: 'Apache/2.2.29 (Amazon)',
           'set-cookie': ['AWSELB=4D0BF9310E10459636C32FE316F0202AC7EE4DE8C4B04555DB67C989B51121186F44E3E96442B3B563341AA2F0AE4A78B43A2AB748C1BFBD93E22948AB5D911FBCE87886E5;PATH=/'],
           'x-powered-by': 'PHP/5.3.29',
           'content-length': '211',
           connection: 'keep-alive'
         },
         data: {
           "recipientcount":"1",
           "messages":[
             {
               "to":"+61431939709",
               "messageid":"8E76C2C1-BF0B-EAD1-E093-FDC02574B5AC",
               "result":"0000",
               "errortext":"Success",
               "price":"0.0770",
               "currency_symbol":"$",
               "currency_type":"AUD"
             }
           ]
         }
       } </pre>
   * @param {string} recipient - the number to send to.
   * @param {string} message - the message to send.
   * @returns {object} the object returned by ClickSend.
   */
  AppWorkshop.sendSMS = function (recipient, message) {
    var user = Meteor.user();


    //ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to send SMS");
    }

    var senderID = "";
    if (Meteor.settings.appworkshop && Meteor.settings.appworkshop.SMSSenderID) {
      senderID = Meteor.settings.appworkshop.SMSSenderID;
    }

    if (!smsFunctionLibrary.sendSMS) {
      // refresh our rest endpoints.
      smsFunctionLibrary = new RestEndpoints();
    }
    var smsResult;
    try {
      smsResult = smsFunctionLibrary.sendSMS(
        {
          to: recipient,
          message: message,
          senderid: senderID
        }
      )
    } catch (e) {
      // rethrow
      console.error(e);
      console.trace("clicksend error: " + e);

      throw new Meteor.Error(e);
    }
    return smsResult;
  };
});


