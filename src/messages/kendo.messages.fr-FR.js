

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Est égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "neq": "N’est pas égal à"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Est égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "neq": "N’est pas égal à"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colonnes",
  "sortAscending": "Tri croissant",
  "sortDescending": "Tri décroissant",
  "settings": "Paramètres de colonne",
  "done": "Done",
  "lock": "Bloquer",
  "unlock": "Ouvrir"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "jour(s)",
    "repeatEvery": "Répéter chaque:"
  },
  "end": {
    "after": " Après",
    "occurrence": "occurrence(s)",
    "label": "Finir:",
    "never": "Jamais",
    "on": "Sur",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Une fois par jour",
    "monthly": "Une fois par mois",
    "never": "Jamais",
    "weekly": "Une fois par semaine",
    "yearly": "Une fois par an"
  },
  "monthly": {
    "day": "Jour",
    "interval": "mois",
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:"
  },
  "offsetPositions": {
    "first": "premier",
    "fourth": "quatrième",
    "last": "dernier",
    "second": "second",
    "third": "troisième"
  },
  "weekly": {
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "semaine(s)"
  },
  "yearly": {
    "of": "de",
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "année(ans)"
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de week-end"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Insérer",
    "destroy": "Effacer",
    "canceledit": "Annuler",
    "update": "Mettre à jour",
    "edit": "Éditer",
    "select": "Sélectionner",
    "cancel": "Annuler les modifications",
    "save": "Enregistrer les modifications"
  },
  "editable": {
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "cancelDelete": "Annuler",
    "confirmDelete": "Effacer"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "Page",
  "display": "Afficher les items {0} - {1} de {2}",
  "of": "de {0}",
  "empty": "Aucun enregistrement à afficher.",
  "refresh": "Actualiser",
  "first": "Aller à la première page",
  "itemsPerPage": "articles par page",
  "last": "Aller à la dernière page",
  "next": "Aller à la page suivante",
  "previous": "Aller à la page précédente",
  "morePages": "Plusieurs pages"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Filtrer",
  "clear": "Effacer filtre",
  "isFalse": "est fausse",
  "isTrue": "est vrai",
  "operator": "Opérateur"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filtrer",
  "and": "Et",
  "clear": "Effacer filtre",
  "info": "Afficher les lignes avec la valeur qui",
  "selectValue": "-Sélectionner-",
  "isFalse": "est fausse",
  "isTrue": "est vrai",
  "or": "Ou",
  "cancel": "Annuler",
  "operator": "Opérateur",
  "value": "Valeur"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Gras",
  "createLink": "Insérer un lien hypertexte",
  "fontName": "Police",
  "fontNameInherit": "(police héritée)",
  "fontSize": "Taille de police",
  "fontSizeInherit": "(taille héritée)",
  "formatBlock": "Style du paragraphe",
  "indent": "Augmenter le retrait",
  "insertHtml": "Insérer HTML",
  "insertImage": "Insérer image",
  "insertOrderedList": "Liste numérotée",
  "insertUnorderedList": "Liste à puces",
  "italic": "Italique",
  "justifyCenter": "Centrer",
  "justifyFull": "Justifier",
  "justifyLeft": "Aligner le texte à gauche",
  "justifyRight": "Aligner le texte à droite",
  "outdent": "Diminuer le retrait",
  "strikethrough": "Barré",
  "styles": "Styles",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Souligné",
  "unlink": "Supprimer le lien hypertexte",
  "deleteFile": "Êtes-vous sûr de vouloir supprimer \"{0}\"?",
  "directoryNotFound": "Un répertoire avec ce nom n'a pas été trouvé.",
  "emptyFolder": "Vider le dossier",
  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers supportés sont {1}.",
  "orderBy": "Organiser par:",
  "orderByName": "Nom",
  "orderBySize": "Taille",
  "overwriteFile": "Un fichier avec le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous le remplacer?",
  "uploadFile": "Télécharger",
  "backColor": "Couleur de fond",
  "foreColor": "Couleur",
  "dialogButtonSeparator": "Ou",
  "dialogCancel": "Fermer",
  "dialogInsert": "Insérer",
  "imageAltText": "Alternate text",
  "imageWebAddress": "Adresse Web",
  "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
  "linkText": "Text",
  "linkToolTip": "Info-bulle",
  "linkWebAddress": "Adresse Web",
  "search": "Search",
  "createTable": "Insérer un tableau",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "dropFilesHere": "drop files here to upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Annuler",
  "dropFilesHere": "déposer les fichiers à télécharger ici",
  "remove": "Retirer",
  "retry": "Réessayer",
  "select": "Sélectionner...",
  "statusFailed": "échoué",
  "statusUploaded": "téléchargé",
  "statusUploading": "téléchargement",
  "uploadSelectedFiles": "Télécharger des fichiers",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "toute la journée",
  "cancel": "Annuler",
  "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?",
  "date": "Date",
  "destroy": "Effacer",
  "editor": {
    "allDayEvent": "Toute la journée",
    "description": "Description",
    "editorTitle": "Event",
    "end": "Fin",
    "endTimezone": "End timezone",
    "repeat": "Répéter",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Début",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Time zone",
    "timezoneEditorTitle": "Timezones",
    "title": "Titre",
    "noTimezone": "No timezone"
  },
  "event": "Event",
  "recurrenceMessages": {
    "deleteRecurring": "Voulez-vous supprimer seulement cet événement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Do you want to edit only this event occurrence or the whole series?",
    "editWindowOccurrence": "Edit current occurrence",
    "editWindowSeries": "Edit the series",
    "editWindowTitle": "Edit Recurring Item"
  },
  "save": "Sauvegarder",
  "time": "Time",
  "today": "Aujourd'hui",
  "views": {
    "agenda": "Agenda",
    "day": "Jour",
    "month": "Mois",
    "week": "Semaine",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Suppression de l'élément",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables"
});
}
