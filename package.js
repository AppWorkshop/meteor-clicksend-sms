Package.describe({
  name: 'appworkshop:clicksend',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Easily send SMS messages using the ClickSend REST API',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('appworkshop:rest-api-wrapper',['server']);
  api.addFiles('clicksend.js', ['server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.addFiles('clicksend-tests-settings.js');
  api.use('appworkshop:rest-api-wrapper',['server']);
  api.addFiles('clicksend.js', ['server']);
  api.addFiles('clicksend-tests.js');
});


