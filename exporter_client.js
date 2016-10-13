/**
 * Register the link
 */
Tracker.autorun(function() {
  var index = Options.get('showExportTab') ? 110 : undefined; // null to hide from the tabs
  scorpius.links.add({
    index: index,
    identifier: 'scorpius-export',
    title: 'Export/Import',
    routeName: 'exporter.scorpiusExport',
    activeRouteRegex: 'exporter.scorpiusExport',
    permission: 'exporter.scorpiusExport'
  });
});


ReactiveTemplates.onRendered('scorpiusExport', function() {
  Session.set('scorpiusExport_error', null);
  Session.set('scorpiusExport_isLoading', false);
});

ReactiveTemplates.helpers('scorpiusExport', {
  currentError: function() {
    return Session.get('scorpiusExport_error');
  },
  isLoading: function() {
    return Session.get('scorpiusExport_isLoading');
  }
});

ReactiveTemplates.events('scorpiusExport', {
  'click .btn-export': function(event, template) {
    var key = Roles.keys.request(Meteor.userId());
    var url = '/admin/download-export/' + key;
    window.open(url);
  },
  'change .input-import': function(event, template) {
    Session.set('scorpiusExport_isLoading', true);
    var key = Roles.keys.request(Meteor.userId());
    var url = '/admin/import-data/' + key;
    var file = event.currentTarget.files[0];

    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function () {
        HTTP.post(url, {
          data: {
            json: reader.result
          }
        }, function(error, result) {
          if (error) {
            console.log(error);
            Session.set('scorpiusExport_error', error);
          } else {
            if (result.content != 'ok') {
              Session.set('scorpiusExport_error', new Meteor.Error('unknown-error', 'A unknown error has ocurred'));
            }
          }
          Session.set('scorpiusExport_isLoading', false);
        })
      }
      reader.onerror = function (_event) {
        console.log(_event);
        Session.set('scorpiusExport_error', _event);
        Session.set('scorpiusExport_isLoading', false);
      }
    }
  }
});
