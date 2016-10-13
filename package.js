Package.describe({
  name: 'rwatts:scorpiusjs-exporter',
  summary: 'Export and import all your Scorpius data',
  version: '0.1.0',
  git: 'https://github.com/rwatts3/scorpiusjs-exporter'
});

Npm.depends({
  'body-parser': '1.13.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['meteor-platform', 'scorpiusjs:base@0.3.0', 'scorpiusjs:dictionary@0.3.0', 'scorpiusjs:collections@0.3.0', 'nicolaslopezj:roles@1.2.0', 'meteorhacks:picker@1.0.3', 'http']);

  api.use(['scorpiusjs:bootstrap@0.3.0', 'scorpiusjs:materialize@0.3.0', 'scorpiusjs:pages@0.3.0'], 'client', { weak: true });

  api.addFiles('exporter.js');
  api.addFiles('exporter_server.js', 'server');
  api.addFiles(['exporter_bootstrap.html', 'exporter_materialize.html', 'exporter_client.js'], 'client');
});
