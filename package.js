Package.describe({
  name: 'rwatts:scorpiusjs-exporter',
  summary: 'Export and import all your Scorpius data',
  version: '0.2.0',
  git: 'https://github.com/rwatts3/scorpiusjs-exporter'
});

Npm.depends({
  'body-parser': '1.13.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use(['meteor-platform', 'scorpiusjs:base@0.3.1_2', 'scorpiusjs:dictionary@0.3.1', 'scorpiusjs:collections@0.3.1', 'nicolaslopezj:roles@2.6.2', 'meteorhacks:picker@1.0.3', 'http']);

  api.use(['scorpiusjs:bootstrap@0.3.1', 'scorpiusjs:materialize@0.3.1', 'scorpiusjs:pages@0.3.1'], 'client', { weak: true });

  api.addFiles('exporter.js');
  api.addFiles('exporter_server.js', 'server');
  api.addFiles(['exporter_bootstrap.html', 'exporter_materialize.html', 'exporter_client.js'], 'client');
});
