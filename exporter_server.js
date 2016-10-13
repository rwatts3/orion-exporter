var bodyParser = Npm.require('body-parser'); // using meteorhacks:npm package
Picker.middleware(bodyParser.json({ limit: '100mb' }));

Picker.route('/admin/download-export/:key', function(params, req, res, next) {
  var userId = Roles.keys.getUserId(params.key);
  if (!userId || !Roles.userHasPermission(userId, 'exporter.scorpiusExport')) {
    throw new Meteor.Error('unauthorized', 'The user is not authorized to perform this action');
  }

  var data = {};

  data.dictionary = scorpius.dictionary.findOne();
  if (exportPages) {
    data.pages = pages.find().fetch();
  }
  data.collections = {};

  _.each(collections, function(collection) {
    data.collections[collection._name] = collection.find().fetch();
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=backup.scorpiusexport');

  var json = JSON.stringify(data);
  res.end(json);
});

Picker.route('/admin/import-data/:key', function(params, req, res, next) {
  var userId = Roles.keys.getUserId(params.key);
  if (!userId || !Roles.userHasPermission(userId, 'exporter.scorpiusExport')) {
    throw new Meteor.Error('unauthorized', 'The user is not authorized to perform this action');
  }

  try {
    var json = req.body.json;
    var data = JSON.parse(json);

    // import dictionary
    scorpius.dictionary.remove({});
    scorpius.dictionary.insert(data.dictionary);

    // import pages
    if (exportPages) {
      scorpius.pages.collection.remove({});
      data.pages.forEach(function(page) {
        scorpius.pages.collection.insert(page);
      });
    }

    // import collections
    _.each(collections, function(collection) {
      var collectionData = data.collections[collection._name];
      if (_.isArray(collectionData)) {
        collection.remove({});
        _.each(collectionData, function(doc) {
          collection.insert(doc, { validate: false });
        });
      }
    });
  } catch (e) {
    console.log(e);
    throw new Meteor.Error('parse-error', 'Error parsing the file');
  }
  res.end('ok');
});
