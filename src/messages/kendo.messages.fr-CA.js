(function($, undefined) {
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
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
    },
    "number": {
      "eq": "Est égal à",
      "gte": "Est supérieur ou égal à",
      "gt": "Est supérieur à",
      "lte": "Est inférieur ou égal à",
      "lt": "Est inférieur à",
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
    },
    "string": {
      "endswith": "Se termine par",
      "eq": "Est égal à",
      "neq": "N’est pas égal à",
      "startswith": "Commence par",
      "contains": "Contient",
      "doesnotcontain": "Ne contient pas",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle",
      "isempty": "Est vide",
      "isnotempty": "N’est pas vide",
      "isnullorempty": "Est vide ou nulle",
      "isnotnullorempty": "A une valeur"
    },
    "enums": {
      "eq": "Est égal à",
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
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
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
    },
    "number": {
      "eq": "Est égal à",
      "gte": "Est supérieur ou égal à",
      "gt": "Est supérieur à",
      "lte": "Est inférieur ou égal à",
      "lt": "Est inférieur à",
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
    },
    "string": {
      "endswith": "Se termine par",
      "eq": "Est égal à",
      "neq": "N’est pas égal à",
      "startswith": "Commence par",
      "contains": "Contient",
      "doesnotcontain": "Ne contient pas",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle",
      "isempty": "Est vide",
      "isnotempty": "N’est pas vide",
      "isnullorempty": "Est vide ou nulle",
      "isnotnullorempty": "A une valeur"
    },
    "enums": {
      "eq": "Est égal à",
      "neq": "N’est pas égal à",
      "isnull": "Est nulle",
      "isnotnull": "N’est pas nulle"
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
    "done": "Fini",
    "lock": "Bloquer",
    "unlock": "Ouvrir",
    "filter": "Filtrer",
    "column": "Colonne",
    "columnVisibility": "Colonne visible",
    "clear": "Vider",
    "cancel": "Annuler"
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
      "mobileLabel": "Fin"
    },
    "frequencies": {
      "daily": "Une fois par jour",
      "monthly": "Une fois par mois",
      "never": "Jamais",
      "weekly": "Une fois par semaine",
      "yearly": "Une fois par an",
      "hourly": "Une fois par heure"
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
    },
    "hourly": {
      "repeatEvery": "Répéter chaque: ",
      "interval": " heure(s)"
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
      "excel": "Exporter vers Excel",
      "pdf": "Exporter vers PDF",
      "select": "Sélectionner",
      "cancel": "Annuler les modifications",
      "save": "Enregistrer les modifications"
    },
    "editable": {
      "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
      "cancelDelete": "Annuler",
      "confirmDelete": "Effacer"
    },
    "noRecords": "Aucun enregistrement disponible.",
    "search": "Rechercher...",
    "expandCollapseColumnHeader": "",
    "groupHeader": "Pressez ctrl + espace pour grouper",
    "ungroupHeader": "Pressez ctrl + espace pour dégrouper"
  });
}

/* TreeList messages */

if (kendo.ui.TreeList) {
  kendo.ui.TreeList.prototype.options.messages =
  $.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Aucun enregistrement à afficher",
    "loading": "Chargement...",
    "requestFailed": "La requête a échoué.",
    "retry": "Réessayer",
    "commands": {
        "edit": "Modifier",
        "update": "Mettre à jour",
        "canceledit": "Annuler",
        "create": "Créer",
        "createchild": "Créer un élément enfant",
        "destroy": "Supprimer",
        "excel": "Export Excel",
        "pdf": "Export PDF"
    }
  });
}

/* Pager messages */

if (kendo.ui.Pager) {
  kendo.ui.Pager.prototype.options.messages =
  $.extend(true, kendo.ui.Pager.prototype.options.messages,{
    "allPages": "Tous",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
  kendo.ui.TreeListPager.prototype.options.messages =
  $.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
    "allPages": "Tous",
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
    "title": "Afficher les lignes avec la valeur qui",
    "selectValue": "-Sélectionner-",
    "isFalse": "est fausse",
    "isTrue": "est vrai",
    "or": "Ou",
    "cancel": "Annuler",
    "operator": "Opérateur",
    "value": "Valeur",
    "done": "Terminé",
    "into": "dans"
  });
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
  kendo.ui.FilterMultiCheck.prototype.options.messages =
  $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
    "checkAll": "Choisir toutes",
    "clear": "Effacer filtre",
    "filter": "Filtrer",
    "search": "Recherche",
    "selectedItemsFormat": "{0} items(s) sélectionné(s)",
    "clearAll": "Effacer tout",
    "cancel": "Annuler",
    "done": "Terminé",
    "into": "dans"
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
    "style": "Styles",
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
    "uploadFile": "Téléverser",
    "backColor": "Couleur de fond",
    "foreColor": "Couleur",
    "dialogButtonSeparator": "Ou",
    "dialogCancel": "Annuler",
    "dialogInsert": "Insérer",
    "imageAltText": "Le texte de remplacement",
    "imageWebAddress": "Adresse Web",
    "imageWidth": "Largeur (px)",
    "imageHeight": "Hauteur (px)",
    "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
    "linkText": "Texte",
    "linkToolTip": "Info-bulle",
    "linkWebAddress": "Adresse Web",
    "createTable": "Insérer un tableau",
    "addColumnLeft": "Ajouter colonne à gauche",
    "addColumnRight": "Ajouter colonne à droite",
    "addRowAbove": "Ajouter ligne au-dessus",
    "addRowBelow": "Ajouter ligne au-dessous",
    "deleteColumn": "Supprimer colonne",
    "deleteRow": "Supprimer ligne",
    "formatting": "Format",
    "viewHtml": "Visualiser le HTML",
    "dialogUpdate": "Mise à jour",
    "insertFile": "Insérer fichier",
    "dialogOk": "OK",
    "tableWizard": "Assistant de tableau",
    "tableTab": "Table",
    "cellTab": "Cellule",
    "accessibilityTab": "Accessibilité",
    "caption": "Sous-titre",
    "summary": "Sommaire",
    "width": "Largeur",
    "height": "Hauteur",
    "cellSpacing": "Espacement des cellules",
    "cellPadding": "Rembourrage des cellules",
    "cellMargin": "Marge des cellules",
    "alignment": "Alignement",
    "background": "Fond",
    "cssClass": "CSS Classe",
    "id": "Id",
    "border": "Bordure",
    "borderStyle": "Style de bordure",
    "collapseBorders": "Rétracter bordures",
    "wrapText": "Renvoi à la ligne",
    "associateCellsWithHeaders": "Entêtes associées",
    "alignLeft": "Aligner à gauche",
    "alignCenter": "Aligner le centre",
    "alignRight": "Aligner à droite",
    "alignLeftTop": "Aligner à gauche et haut",
    "alignCenterTop": "Aligner le centre et haut",
    "alignRightTop": "Aligner à droite et haut",
    "alignLeftMiddle": "Aligner à gauche et milieu",
    "alignCenterMiddle": "Aligner le centre et milieu",
    "alignRightMiddle": "Aligner à droite et milieu",
    "alignLeftBottom": "Aligner à gauche et bas",
    "alignCenterBottom": "Aligner le centre et bas",
    "alignRightBottom": "Aligner à droite et bas",
    "alignRemove": "Retirer alignement",
    "columns": "Colonnes",
    "rows": "Lignes",
    "selectAllCells": "Sélectionner toutes les cellules",
    "overflowAnchor": "Plus d'outils",
    "fileWebAddress": "Adresse Web",
    "fileTitle": "Titre",
    "units": "Unités",
    "cleanFormatting": "Retirer le format",
    "print": "Imprimer",
    "headerRows": "Entête de ligne",
    "headerColumns": "Entête de colonne",
    "tableSummaryPlaceholder": "L'attribut Summary n'est pas compatible HTML5.",
    "associateNone": "Aucun",
    "associateScope": "Associer avec l'attribut 'scope'",
    "associateIds": "Associer en utilisant l'Id",
    "copyFormat": "Copier format",
    "applyFormat": "Appliquer format"
  });
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
  kendo.ui.FileBrowser.prototype.options.messages =
  $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
    "uploadFile": "Televerser",
    "orderBy": "Trier par",
    "orderByName": "Nom",
    "orderBySize": "Taille",
    "directoryNotFound": "Aucun répertoire portant ce nom n'a été trouvé.",
    "emptyFolder": "Repertoire vide",
    "deleteFile": 'Etes-vous sûr de vouloir supprimer le fichier "{0}"?',
    "invalidFileType": "Le fichier sélectionné \"{0}\" est non valide. Les fichiers supportés sont {1}.",
    "overwriteFile": "Un fichier portant le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous l'écraser?",
    "dropFilesHere": "Glissez un fichier ici pour téléverser",
    "search": "Recherche"
  });
}

/* Upload messages */

if (kendo.ui.Upload) {
  kendo.ui.Upload.prototype.options.localization =
  $.extend(true, kendo.ui.Upload.prototype.options.localization,{
    "cancel": "Annuler",
    "dropFilesHere": "déposer les fichiers à téléverser ici",
    "remove": "Retirer",
    "retry": "Réessayer",
    "select": "Sélectionner...",
    "statusFailed": "échoué",
    "statusUploaded": "téléversé",
    "statusUploading": "téléversement",
    "uploadSelectedFiles": "Téléverser des fichiers",
    "headerStatusUploaded": "Complété",
    "headerStatusUploading": "Téléversement...",
    "clearSelectedFiles": "Vider",
    "statusWarning": "avertissement",
    "invalidMaxFileSize": "Taille du fichier trop grande.",
    "invalidMinFileSize": "Taille du fichier trop petite.",
    "invalidFileExtension": "Type de fichier non permis."
  });
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
  kendo.ui.Scheduler.prototype.options.messages =
  $.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
    "allDay": "toute la journée",
    "cancel": "Annuler",
    "editable": {
      "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?"
    },
    "date": "Date",
    "destroy": "Effacer",
    "editor": {
      "allDayEvent": "Toute la journée",
      "description": "Description",
      "editorTitle": "Évènement",
      "end": "Fin",
      "endTimezone": "Fuseau horaire de fin",
      "repeat": "Répéter",
      "separateTimezones": "Utiliser des fuseaux horaire différent pour le début et la fin",
      "start": "Début",
      "startTimezone": "Fuseau horaire de début",
      "timezone": " ",
      "timezoneEditorButton": "Fuseau horaire",
      "timezoneEditorTitle": "Fuseaux horaires",
      "title": "Titre",
      "noTimezone": "Pas de fuseau horaire",
      "timezoneTitle": "Fuseaux horaires"
    },
    "event": "Évènement",
    "recurrenceMessages": {
      "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série ?",
      "deleteWindowOccurrence": "Suppression de l'élément courant",
      "deleteWindowSeries": "Suppression de toute la série",
      "deleteWindowTitle": "Suppression d'un élément récurrent",
      "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série ?",
      "editWindowOccurrence": "Modifier l'occurrence courante",
      "editWindowSeries": "Modifier la série",
      "editWindowTitle": "Modification de l'élément courant",
      "resetSeriesWindowTitle": "Réinitialiser la série",
      "deleteRecurringConfirmation": "Êtes-vous sûr de vouloir supprimer cet occurence d'évènement ?",
      "deleteSeriesConfirmation": "Êtes-vous sûr de vouloir supprimer toute la série ?"
    },
    "time": "Heure",
    "today": "Aujourd'hui",
    "views": {
      "agenda": "Agenda",
      "day": "Jour",
      "month": "Mois",
      "week": "Semaine",
      "workWeek": "Semaine de travail"
    },
    "deleteWindowTitle": "Supprimer événement",
    "showFullDay": "Montrer toute la journée",
    "showWorkDay": "Montrer les heures ouvrables",
    "save": "Sauvegarder",
    "resetSeries": "Réinitialiser la série",
    "ariaSlotLabel": "Sélectionner de {0:t} à {1:t}",
    "ariaEventLabel": "{0} le {1:D} à {2:t}"
  });
}

/* Validator messages */

if (kendo.ui.Validator) {
  kendo.ui.Validator.prototype.options.messages =
  $.extend(true, kendo.ui.Validator.prototype.options.messages,{
    "required": "{0} est requis",
    "pattern": "{0} n'est pas valide",
    "min": "{0} doit être plus grand ou égal à {1}",
    "max": "{0} doit être plus petit ou égal à {1}",
    "step": "{0} n'est pas valide",
    "email": "{0} n'est pas un courriel valide",
    "url": "{0} n'est pas une adresse web valide",
    "date": "{0} n'est pas une date valide",
    "dateCompare": "La date de fin doit être postérieure à la date de début"
  });
}

/* Dialog */

if (kendo.ui.Dialog) {
  kendo.ui.Dialog.prototype.options.messages =
  $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
    "close": "Fermer"
  });
}

/* Alert */

if (kendo.ui.Alert) {
  kendo.ui.Alert.prototype.options.messages =
  $.extend(true, kendo.ui.Alert.prototype.options.localization, {
    "okText": "OK"
  });
}

/* Confirm */

if (kendo.ui.Confirm) {
  kendo.ui.Confirm.prototype.options.messages =
  $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
    "okText": "OK",
    "cancel": "Annuler"
  });
}

/* Prompt */
if (kendo.ui.Prompt) {
  kendo.ui.Prompt.prototype.options.messages =
  $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
    "okText": "OK",
    "cancel": "Annuler"
  });
}

/* ListBox messages */

if (kendo.ui.ListBox) {
  kendo.ui.ListBox.prototype.options.messages =
  $.extend(true, kendo.ui.ListBox.prototype.options.messages,{
    "tools": {
      "remove": "Supprimer",
      "moveUp": "Monter",
      "moveDown": "Descendre",
      "transferTo": "Transférer vers",
      "transferFrom": "Transférer de",
      "transferAllTo": "Transférer tout vers",
      "transferAllFrom": "Transférer tout de"
    }
  });
}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
  kendo.ui.FlatColorPicker.prototype.options.messages =
  $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
      "apply": "Appliquer",
      "cancel": "Annuler",
      "noColor": "aucune couleur",
      "clearColor": "Supprimer la couleur"
  });
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
  kendo.ui.ColorPicker.prototype.options.messages =
  $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
      "apply": "Appliquer",
      "cancel": "Annuler",
      "noColor": "aucune couleur",
      "clearColor": "Supprimer la couleur"
  });
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
  kendo.ui.NumericTextBox.prototype.options =
  $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
    "upArrowText": "Augmenter valeur",
    "downArrowText": "Diminuer valeur"
  });
}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
  kendo.ui.DateRangePicker.prototype.options.messages =
  $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
    "startLabel": "Départ",
    "endLabel": "Fin"
  });
}

/* Gantt messages */

if (kendo.ui.Gantt) {
  kendo.ui.Gantt.prototype.options.messages =
  $.extend(true, kendo.ui.Gantt.prototype.options.messages,{
    "actions": {
      "addChild": "Ajouter un enfant",
      "append": "Ajouter une tâche",
      "insertAfter": "Ajouter avant",
      "insertBefore": "Ajouter après",
      "pdf": "Exporter en PDF"
    },
    "cancel": "Annuler",
    "deleteDependencyWindowTitle": "Supprimer les dépendances",
    "deleteTaskWindowTitle": "Supprimer une tâche",
    "destroy": "Supprimer",
    "editor": {
      "assingButton": "Assigner",
      "editorTitle": "Tâche",
      "end": "Fin",
      "percentComplete": "Complet",
      "resources": "Ressources",
      "resourcesEditorTitle": "Ressources",
      "resourcesHeader": "Ressources",
      "start": "Départ",
      "title": "Titre",
      "unitsHeader": "Unités"
    },
    "save": "Sauvegarder",
    "views": {
      "day": "Jour",
      "end": "Fin",
      "month": "Mois",
      "start": "Départ",
      "week": "Semaine",
      "year": "Année"
    }
  });
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
  kendo.ui.MediaPlayer.prototype.options.messages =
  $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
    "pause": "Pause",
    "play": "Jouer",
    "mute": "Muet",
    "unmute": "Rétablir le son",
    "quality": "Qualité",
    "fullscreen": "Plein écran"
  });
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
  kendo.ui.PivotGrid.prototype.options.messages =
  $.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
    "measureFields": "Déposer champs de données ici",
    "columnFields": "Déposer colonne de données ici",
    "rowFields": "Déposer une ligne de données ici"
  });
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
  kendo.ui.PivotFieldMenu.prototype.options.messages =
  $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
    "info": "Afficher les items avec une valeur comme:",
    "filterFields": "Filtrer les champs",
    "filter": "Filtrer",
    "include": "Inclure les champs...",
    "title": "Champs à inclure",
    "clear": "Vider",
    "ok": "Ok",
    "cancel": "Annuler",
    "operators": {
      "contains": "Contient",
      "doesnotcontain": "Ne contient pas",
      "startswith": "Commence par",
      "endswith": "Termine par",
      "eq": "Est égal à",
      "neq": "N'est pas égal à"
    }
  });
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
  kendo.spreadsheet.messages.borderPalette =
  $.extend(true, kendo.spreadsheet.messages.borderPalette,{
    "allBorders": "Toutes les bordures",
    "insideBorders": "Bordure interne",
    "insideHorizontalBorders": "Bordure horizontale interne",
    "insideVerticalBorders": "Bordure verticale interne",
    "outsideBorders": "Bordure extérieure",
    "leftBorder": "Bordure gauche",
    "topBorder": "Bordure du haut",
    "rightBorder": "Bordure de droite",
    "bottomBorder": "Bordure du bas",
    "noBorders": "Aucune bordure",
    "reset": "Réinitialiser couleur",
    "customColor": "Couleur personnalisée...",
    "apply": "Appliquer",
    "cancel": "Annuler"
  });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
  kendo.spreadsheet.messages.dialogs =
  $.extend(true, kendo.spreadsheet.messages.dialogs,{
    "apply": "Appliquer",
    "save": "Sauvegarder",
    "cancel": "Annuler",
    "remove": "Retirer",
    "retry": "Réesayer",
    "revert": "Défaire",
    "okText": "OK",
    "formatCellsDialog": {
      "title": "Format",
      "categories": {
        "number": "Nombre",
        "currency": "Monétaire",
        "date": "Date"
        }
    },
    "fontFamilyDialog": {
      "title": "Police"
    },
    "fontSizeDialog": {
      "title": "Taille police"
    },
    "bordersDialog": {
      "title": "Bordures"
    },
    "alignmentDialog": {
      "title": "Alignement",
      "buttons": {
       "justtifyLeft": "Aligner à gauche",
       "justifyCenter": "Centrer",
       "justifyRight": "Aligner à droite",
       "justifyFull": "Justifier",
       "alignTop": "Aligner en haut",
       "alignMiddle": "Aligner au centre",
       "alignBottom": "Aligner au bas"
      }
    },
    "mergeDialog": {
      "title": "Fusionner cellules",
      "buttons": {
        "mergeCells": "Fusionner toutes",
        "mergeHorizontally": "Fusionner horizontalement",
        "mergeVertically": "Fusionner verticalement",
        "unmerge": "Spérarer"
      }
    },
    "freezeDialog": {
      "title": "Figer les panneaux",
      "buttons": {
        "freezePanes": "Figer les panneaux",
        "freezeRows": "Figer les lignes",
        "freezeColumns": "Figer les colonnes",
        "unfreeze": "Séparer les panneaux"
      }
    },
    "confirmationDialog": {
      "text": "Êtes-vous sûr de vouloir retirer cette feuille ?",
      "title": "Retirer feuille"
    },
    "validationDialog": {
      "title": "Validation",
      "hintMessage": "S'il vous plait entrez une valeur valide entre {0} et {1}.",
      "hintTitle": "Validation {0}",
      "criteria": {
        "any": "N'importe quelle valeur",
        "number": "Nombre",
        "text": "Texte",
        "date": "Date",
        "custom": "Formule personnalisée",
        "list": "Liste"
      },
      "comparers": {
        "greaterThan": "plus grand que",
        "lessThan": "plus petit que",
        "between": "entre",
        "notBetween": "pas entre",
        "equalTo": "égal à",
        "notEqualTo": "pas égal à",
        "greaterThanOrEqualTo": "plus grand ou égal à",
        "lessThanOrEqualTo": "plus petit ou égal à"
      },
      "comparerMessages": {
        "greaterThan": "plus grand que {0}",
        "lessThan": "plus petit que {0}",
        "between": "entre {0} et {1}",
        "notBetween": "pas entre {0} et {1}",
        "equalTo": "égal à {0}",
        "notEqualTo": "pas égal à {0}",
        "greaterThanOrEqualTo": "plus grand ou égal à {0}",
        "lessThanOrEqualTo": "plus petit ou égal à {0}",
        "custom": "satisfait la formule: {0}"
      },
      "labels": {
        "criteria": "Critère",
        "comparer": "Comparer",
        "min": "Min",
        "max": "Max",
        "value": "Valeur",
        "start": "Départ",
        "end": "Fin",
        "onInvalidData": "Sur valeur invalide",
        "rejectInput": "Entrée rejetée",
        "showWarning": "Afficher avertissement",
        "showHint": "Afficher astuce",
        "hintTitle": "Titre astuce",
        "hintMessage": "Message astuce",
        "ignoreBlank": "Ignorer le espaces"
      },
      "placeholders": {
        "typeTitle": "Entrer le titre",
        "typeMessage": "Entrer le message"
      }
    },
    "exportAsDialog": {
      "title": "Exporter...",
      "labels": {
        "fileName": "Nom fichier",
        "saveAsType": "Sauvegarder sous",
        "exportArea": "Exporter",
        "paperSize": "Taille du papier",
        "margins": "Marges",
        "orientation": "Orientation",
        "print": "Imprimer",
        "guidelines": "Guides",
        "center": "Centrer",
        "horizontally": "Horizontalement",
        "vertically": "Verticalement"
      }
    },
    "modifyMergedDialog": {
      "errorMessage": "Impossible de modifier une partie de cellule fusionnée."
    },
    "useKeyboardDialog": {
      "title": "Copier et coller",
      "errorMessage": "Cet action ne peut pas être appelée du menu. S'il vous plait utiliser le raccourci clavier à la place:",
      "labels": {
        "forCopy": "pour copier",
        "forCut": "pour couper",
        "forPaste": "pour coller"
      }
    },
    "unsupportedSelectionDialog": {
      "errorMessage": "Cette action ne peut être exécutée sur une sélection multiple."
    },
    "insertCommentDialog": {
      "title": "Insérer un commentaire",
      "labels": {
        "comment": "Commentaire",
        "removeComment": "Retirer commentaire"
      }
    },
    "insertImageDialog": {
      "title": "Insérer image",
      "info": "Déposer une image ici, ou cliquer pour sélectionner",
      "typeError": "S'il vous plait sélectionnez une image JPEG, PNG ou GIF"
    }
  });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
  kendo.spreadsheet.messages.filterMenu =
  $.extend(true, kendo.spreadsheet.messages.filterMenu,{
    "sortAscending": "Trier de A à Z",
    "sortDescending": "Trier de Z à A",
    "filterByValue": "Filtrer par valeur",
    "filterByCondition": "Filtrer par condition",
    "apply": "Appliquer",
    "search": "Recherche",
    "addToCurrent": "Ajouter à la sélection",
    "clear": "Vider",
    "blanks": "(Espaces)",
    "operatorNone": "Aucun",
    "and": "ET",
    "or": "OU",
    "operators": {
      "string": {
        "contains": "Texte contient",
        "doesnotcontain": "Texte ne contient pas",
        "startswith": "Texte commence par",
        "endswith": "Texte finit par"
      },
      "date": {
        "eq":  "Date est",
        "neq": "Date n'est pas",
        "lt":  "Date avant",
        "gt":  "Date après"
      },
      "number": {
        "eq": "Est égal à",
        "neq": "N'est pas égal à",
        "gte": "Est plus grand ou égal à",
        "gt": "Est plus grand que",
        "lte": "Est plus petit ou égal à",
        "lt": "Est plus petit que"
      }
    }
  });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
  kendo.spreadsheet.messages.colorPicker =
  $.extend(true, kendo.spreadsheet.messages.colorPicker,{
    "reset": "Réinitialiser couleur",
    "customColor": "Couleur personnalisée...",
    "apply": "Appliquer",
    "cancel": "Annuler"
  });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
  kendo.spreadsheet.messages.toolbar =
  $.extend(true, kendo.spreadsheet.messages.toolbar,{
    "addColumnLeft": "Ajouter colonne à gauche",
    "addColumnRight": "Ajouter colonne à droite",
    "addRowAbove": "Ajouter ligne au dessus",
    "addRowBelow": "Ajouter ligne en dessous",
    "alignment": "Alignement",
    "alignmentButtons": {
      "justtifyLeft": "Aligner à gauche",
      "justifyCenter": "Centrer",
      "justifyRight": "Aligner à droite",
      "justifyFull": "Justifier",
      "alignTop": "Aligner en haut",
      "alignMiddle": "Aligner au centre",
      "alignBottom": "Aligner en bas"
    },
    "backgroundColor": "Fond",
    "bold": "Gras",
    "borders": "Bordures",
    "colorPicker": {
      "reset": "Annuler couleur",
      "customColor": "Couleur personnalisée..."
    },
    "copy": "Copier",
    "cut": "Couper",
    "deleteColumn": "Supprimer colonne",
    "deleteRow": "Supprimer ligne",
    "excelImport": "Importer d'Excel...",
    "filter": "Filtrer",
    "fontFamily": "Police",
    "fontSize": "Taille police",
    "format": "Format personnalisé...",
    "formatTypes": {
      "automatic": "Automatique",
      "number": "Nombre",
      "percent": "Pourcentage",
      "financial": "Financier",
      "currency": "Monétaire",
      "date": "Date",
      "time": "Heure",
      "dateTime": "Date heure",
      "duration": "Durée",
      "moreFormats": "Plus de formats..."
    },
    "formatDecreaseDecimal": "Décrémenter décimale",
    "formatIncreaseDecimal": "Incrémenter décimale",
    "freeze": "Figer les panneaux",
    "freezeButtons": {
      "freezePanes": "Figer les panneaux",
      "freezeRows": "Figer les lignes",
      "freezeColumns": "Figer les colonnes",
      "unfreeze": "Défiger les panneaux"
    },
    "insertComment": "Insérer commentaire",
    "insertImage": "Insérer image",
    "italic": "Italique",
    "merge": "Fusionner cellules",
    "mergeButtons": {
      "mergeCells": "Fusionner toutes",
      "mergeHorizontally": "Fusionner horizontalement",
      "mergeVertically": "Fusionner verticalement",
      "unmerge": "Dé-fusionner"
    },
    "open": "Ouvrir...",
    "paste": "Coller",
    "quickAccess": {
      "redo": "Refaire",
      "undo": "Défaire"
    },
    "saveAs": "Sauvegarder sous...",
    "sortAsc": "Tri croissant",
    "sortDesc": "Tri décroissant",
    "sortButtons": {
      "sortSheetAsc": "Trier les pages de A à Z",
      "sortSheetDesc": "Trier les pages de Z à A",
      "sortRangeAsc": "Plage de tri de A à Z",
      "sortRangeDesc": "Plage de tri de Z à A"
    },
    "textColor": "Couleur texte",
    "textWrap": "Habillage de texte",
    "underline": "Souligner",
    "validation": "Validation..."
  });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
  kendo.spreadsheet.messages.view =
  $.extend(true, kendo.spreadsheet.messages.view,{
    "errors": {
      "shiftingNonblankCells": "Impossible d'ajouter des cellules a cause d'une possible perte de données. Sélectionnez une autre zone d'insertion ou supprimez les données de la fin de votre feuille de calcul.",
      "filterRangeContainingMerges": "Impossible de créer un filtre dans une plage contenant des fusions",
      "validationError": "La valeur que vous avez entrée enfreint les règles de validation définies sur la cellule."
    },
    "tabs": {
      "home": "Accueil",
      "insert": "Insérer",
      "data": "Donnée"
    }
  });
}

/* Slider messages */

if (kendo.ui.Slider) {
  kendo.ui.Slider.prototype.options =
  $.extend(true, kendo.ui.Slider.prototype.options,{
    "increaseButtonTitle": "Augmenter",
    "decreaseButtonTitle": "Diminuer"
  });
}

/* TreeView messages */

if (kendo.ui.TreeView) {
  kendo.ui.TreeView.prototype.options.messages =
  $.extend(true, kendo.ui.TreeView.prototype.options.messages,{
    "loading": "Chargement...",
    "requestFailed": "La requête à échoué.",
    "retry": "Réessayer"
  });
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
  kendo.ui.progress.messages =
  $.extend(true, kendo.ui.progress.messages, {
      loading: "Chargement..."
  });
}

/* Calendar */
if (kendo.ui.Calendar) {
  kendo.ui.Calendar.prototype.options.messages =
  $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
    "weekColumnHeader": ""
  });
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
  $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
    "year": "année",
    "month": "mois",
    "day": "jour",
    "weekday": "jour de semaine",
    "hour": "heures",
    "minute": "minutes",
    "second": "secondes",
    "dayperiod": "AM/PM"
  });
}

/* List messages */

if (kendo.ui.List) {
  kendo.ui.List.prototype.options.messages =
  $.extend(true, kendo.ui.List.prototype.options.messages,{
    "clear": "vider",
    "noData": "Aucune donnée trouvée."
  });
}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
  kendo.ui.DropDownTree.prototype.options.messages =
  $.extend(true, kendo.ui.DropDownTree.prototype.options.messages,{
    "singleTag": "items(s) selectionné(s)",
    "clear": "vider",
    "deleteTag": "supprimer",
    "noData": "Aucune donnée trouvée."
  });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
  kendo.ui.MultiSelect.prototype.options.messages =
  $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
    "singleTag": "item(s) sélectionné(s)",
    "clear": "vider",
    "deleteTag": "supprimer",
    "noData": "Aucune donnée trouvée."
  });
}

/* Chat messages */

if (kendo.ui.Chat) {
  kendo.ui.Chat.prototype.options.messages =
  $.extend(true, kendo.ui.Chat.prototype.options.messages,{
    "placeholder": "Entrer un message...",
    "toggleButton": "Basculer la barre d'outils",
    "sendButton": "Envoyer message"
  });
}

})(window.kendo.jQuery);
