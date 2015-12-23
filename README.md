# ClickSend SMS

Send SMS easily from your meteor server via ClickSend's REST API. See the [ClickSend docs](http://developers.clicksend.com/api/rest/).

## Usage

***NOTE*** : For security reasons, you can only send SMS directly from the server. To send from the client, wrap the call in your own method.

```
try {
  var result = AppWorkshop.sendSMS('+61411111111', "G'day Homer!");
  console.log("result:");
  console.log(result);
} catch (error) {
  console.log("error:");
  console.log(error);
}
```

If you want to send SMS from the client, create a method:

```
Meteor.methods({
  sendSMSFromServer: function (recipient) {
    var result = AppWorkshop.sendSMS(recipient, "Test SMS!");
    return result;
  }
});

```

## Configuration

Configure your settings.json with the following items,
which also defines who the sender ID of the SMS will appear to be:

```
{
...
"appworkshop": {
    "restendpoints": [
      {
        "actionName": "sendSMS",
        "httpMethod": "post",
        "endpoint": "https://api.clicksend.com/rest/v2/send.json",
        "auth": {
          "username": "YOUR_CLICKSEND_USERNAME",
          "password": "YOUR_CLICKSEND_API_KEY"
        }
      }
    ],
    "SMSSenderID": "MyApp"
    ...
  },
...
}
```

*** Note: The sender ID can't be more that 11 characters. ***

## Response

Result will be the result of the HTTP.call, with the data
property containing the response from ClickSend as per
[ClickSend's REST Documentation](http://developers.clicksend.com/api/rest/):

```js
{
  statusCode: 200,
  content: '{"recipientcount":1,"messages":[{"to":"+61 (0)431-939-709","messageid":"8E76C2C1-BF0B-EAD1-E093-FDC02574B5AC","result":"0000","errortext":"Success","price":"0.0770","currency_symbol":"$","currency_type":"AUD"}]}',
  headers: {
    'cache-control': 'no-cache="set-cookie"',
    'content-type': 'application/json',
    date: 'Tue, 08 Dec 2015 07:45:50 GMT',
    server: 'Apache/2.2.29 (Amazon)',
    'set-cookie': ['AAAAA=BBBBBBBBBBBBBBBBB;PATH=/'],
    'x-powered-by': 'PHP/5.3.29',
    'content-length': '211',
    connection: 'keep-alive'
  },
  data: {
    "recipientcount":"1",
    "messages":[
      {
        "to":"+61411111111",
        "messageid":"AAAAAA-BBBBB-CCCC-DDDD-EEEEEEEEEEEE",
        "result":"0000",
        "errortext":"Success",
        "price":"0.0770",
        "currency_symbol":"$",
        "currency_type":"AUD"
      }
    ]
  }
}
```
