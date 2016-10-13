Scorpius Exporter
==============

**Forked from `nicolaslopezj:orion-exporter`**

Export and import all your Scorpius data.

It can export all the collections and the dictionary.

When importing it will remove all documents stored.

The ids of the documents will be kept.

### Installing

```
meteor add exporter:scorpius-exporter
```

By default the tab is not shown, but you can navigate to ```/export```.

If you wan't to make the tab visible, call:

```js
Options.set('showExportTab', true);
```

#### Security

Scorpius Exportes uses [```exporter:roles```](http://github.com/exporter/roles) to secure the import and export. The name of the action is ```exporter.scorpiusExport```.
