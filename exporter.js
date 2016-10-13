Options.init('showExportTab', false);
exportPages = _.has(Package, 'scorpiusjs:pages');
collections = [];

scorpius.collections.onCreated(function(collection) {
  collections.push(this);
})

if (exportPages) {
  pages = scorpius.pages.collection;
}


/**
 * Init the template name variable
 */
ReactiveTemplates.request('scorpiusExport', 'exporter_scorpiusExporter_bootstrap');

if (_.has(Package, 'scorpiusjs:materialize')) {
  ReactiveTemplates.set('scorpiusExport', 'exporter_scorpiusExporter_materialize');
}

/**
 * Init the role action
 */
Roles.registerAction('exporter.scorpiusExport', true);

/**
 * Register the route
 */
RouterLayer.route('/admin/export', {
  layout: 'layout',
  template: 'scorpiusExport',
  name: 'exporter.scorpiusExport',
  reactiveTemplates: true
});

/**
 * Ensure user is logged in
 */
scorpius.accounts.addProtectedRoute('exporter.scorpiusExport');
