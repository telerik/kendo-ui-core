(function ($, undefined) {
/* FilterCell operators */

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
    "isnullorempty": "A une valeur",
    "isnotnullorempty": "N'a pas de valeur"
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
    "isnullorempty": "A une valeur",
    "isnotnullorempty": "N'a pas de valeur"
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
  "done": "Terminé",
  "lock": "Bloquer",
  "unlock": "Ouvrir",
  "filter": "Filtre",
  "column": "Colonne",
  "columnVisibility": "Visibilité de la colonne",
  "clear": "Effacer",
  "cancel": "Annuler",
  "stick" : "Figer colonne",
  "unstick": "Libérer colonne",
  "setColumnPosition": "Définir position de la colonne"
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
    "repeatOn": "Répéter l'opération sur:",
    "date": "Date"
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
    "interval": "année(ans)",
    "month": "mois",
    "day": "jour",
    "date": "date"
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de fin de semaine"
  },
  "hourly": {
    "repeatEvery": "Répéter chaque: ",
    "interval": " heure(s)"
  },
  "repeat": "Répéter"
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
    "save": "Enregistrer les modifications",
    "search": "Recherche"
  },
  "editable": {
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "cancelDelete": "Annuler",
    "confirmDelete": "Effacer"
  },
  "noRecords": "Aucun enregistrement disponible.",
  "search": "Recherche...",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Appuyez sur ctrl + espace pour grouper",
  "ungroupHeader": "Appuyez sur ctrl + espace pour dissocier"  
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
  "selectedItemsFormat": "{0} éléments(s) sélectionné(s)",
  "clearAll": "Effacer toutes",
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
  "deleteColumn": "Supprimer la colonne",
  "deleteRow": "Supprimer ligne",
  "formatting": "Format",
  "viewHtml": "Voire le HTML",
  "dialogUpdate": "Mise à jour",
  "insertFile": "Insérer un fichier",
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
  "cleanFormatting": "Retirer le format",
  "units": "Unités",
  "print": "Imprimer",
  "headerRows": "Lignes d'en-tête",
  "headerColumns": "Colonnes d'en-tête",
  "tableSummaryPlaceholder": "L'attribut de résumé n'est pas compatible HTML5.",
  "associateNone": "Aucun",
  "associateScope": "Associer à l'aide de l'attribut 'scope'",
  "associateIds": "Associer à l'aide d'identifiants",
  "copyFormat": "Copier le format",
  "applyFormat": "Appliquer le format",
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Téléverser",
  "orderBy": "Organiser par",
  "orderByName": "Nom",
  "orderBySize": "Taille",
  "directoryNotFound": "Aucun dossier avec ce nom n'a pas été trouvé.",
  "emptyFolder": "Dossier vide",
  "deleteFile": 'Etes-vous sûr que vous voulez supprimer "{0}"?',
  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers pris en charge sont {1}.",
  "overwriteFile": "Un fichier portant le nom \"{0}\" existe déjà dans le répertoire actuel. Voulez-vous l'écraser?",
  "dropFilesHere": "déposer le fichier ici pour le téléverser",
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
  "headerStatusUploaded":  "Complété",
  "headerStatusUploading": "Téléversement...",
  "clearSelectedFiles": "Effacer",
  "statusWarning": "avertissement",
  "headerStatusPaused": "Pause",
  "uploadSuccess": "Fichier(s) téléversé (s) avec succes.",
  "uploadFail": "Échec du téléversement du ou des fichiers.",
  "invalidMaxFileSize": "Taille de fichier trop grande.",
  "invalidMinFileSize": "Taille de fichier trop petite.",
  "invalidFileExtension": "Type de fichier non autorisé."  
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
  "destroy": "Supprimer",
  "editor": {
    "allDayEvent": "Toute la journée",
    "description": "Description",
    "editorTitle": "Évènement",
    "end": "Fin",
    "endTimezone": "Fuseau horaire de fin",
    "repeat": "Répéter",
    "separateTimezones": "Utiliser des fuseaux horaires différents pour le début et la fin",
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
    "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
    "editWindowOccurrence": "Modifier l'occurrence courante",
    "editWindowSeries": "Modifier la série",
    "editWindowTitle": "Modification de l'élément courant",
    "resetSeriesWindowTitle": "Réinitialiser Series",
    "deleteRecurringConfirmation": "Voulez-vous vraiment supprimer cette occurrence d'événement?",
    "deleteSeriesConfirmation": "Voulez-vous vraiment supprimer toute la série?"
  },
  "save": "Sauvegarder",
  "time": "Heure",
  "today": "Aujourd'hui",
  "views": {
    "agenda": "Agenda",
    "day": "Jour",
    "month": "Mois",
    "week": "Semaine",
    "workWeek": "Semaine de travail"
  },
  "deleteWindowTitle": "Suppression de l'élément",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables",
  "resetSeries": "Réinitialiser séries",
  "ariaSlotLabel": "Selectionnés de {0:t} à {1:t}",
  "ariaEventLabel": "{0} sur {1:D} à {2:t}",
  "search": "Recherche..."
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
  "upArrowText": "Augmenter la valeur",
  "downArrowText": "Diminuer la valeur"
});
}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
kendo.ui.DateRangePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
  "startLabel": "Début",
  "endLabel": "Fin"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Supprimer",
    "moveUp": "Déplacer vers le haut",
    "moveDown": "Déplacer vers le bas",
    "transferTo": "Transférer à",
    "transferFrom": "Transférer de",
    "transferAllTo": "Transférer tout à",
    "transferAllFrom": "Transférer tout de"
  }
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
      "excel": "Exporter vers Excel",
      "pdf": "Exporter vers PDF"
  }
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Ajouter enfant",
    "append": "Ajouter tâche",
    "insertAfter": "Ajouter en dessous",
    "insertBefore": "Ajouter au dessus",
    "pdf": "Exporter en PDF"
  },
  "cancel": "Annuler",
  "deleteDependencyWindowTitle": "Supprimer dépendance",
  "deleteTaskWindowTitle": "Supprimer tâche",
  "destroy": "Supprimer",
  "editor": {
    "assingButton": "Assigner",
    "editorTitle": "Tâche",
    "end": "Fin",
    "percentComplete": "Completé",
    "plannedStart": "Départ planifié",
    "plannedEnd": "Fin planifiée",
    "resources": "Ressources",
    "resourcesEditorTitle": "Ressources",
    "resourcesHeader": "Ressources",
    "start": "Départ",
    "title": "Titre",
    "unitsHeader": "Unités"
  },
  "plannedTasks": {
    "switchText": "Tâche planifiée",
    "offsetTooltipAdvanced": "Respecter la date limite plus tôt",
    "offsetTooltipDelay": "Retard",
    "seconds": "secondes",
    "minutes": "minutes",
    "hours": "heures",
    "days": "jours"
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
  "unmute": "Activer le son",
  "quality": "Qualité",
  "fullscreen": "Plein écran"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Déposer les champs de données ici",
  "columnFields": "Déposer les champs de colonne ici",
  "rowFields": "Déposer les champs de lignes ici"
});
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
      "endTitle": "Se termine",
      "repeatTitle": "Patron de répétition",
      "headerTitle": "Répéter l'événement",
      "end": {
        "patterns": {
            "never": "Jamais",
            "after": "Après...",
            "on": "Le..."
        }
      },
      "monthly": {
        "repeatBy": "Répéter par: ",
        "dayOfMonth": "Jour du mois",
        "dayOfWeek": "Jour de la semaine",
        "every": "Chaque"
      },
      "yearly": {
        "repeatBy": "Répéter par: ",
        "dayOfMonth": "Jour du mois",
        "dayOfWeek": "Jour de la semaine",
        "every": "Chaque",
        "month": "Mois",
        "day": "Jour"
      }
    });
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Toutes les bordures",
  "insideBorders": "Bordures intérieures",
  "insideHorizontalBorders": "À l'intérieur des bordures horizontales",
  "insideVerticalBorders": "À l'intérieur des bordures verticales",
  "outsideBorders": "Bordures extérieures",
  "leftBorder": "Bordure gauche",
  "topBorder": "Bordure supérieure",
  "rightBorder": "Bordure droite",
  "bottomBorder": "Bordure inférieure",
  "noBorders": "Aucune bordure",
  "reset": "Réinitialiser la couleur",
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
  "retry": "Recommencer",
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
    "title": "Taille de la police"
  },
  "bordersDialog": {
    "title": "Bordures"
  },
  "alignmentDialog": {
    "title": "Alignement",
    "buttons": {
     "justtifyLeft": "Aligner à gauche",
     "justifyCenter": "Centre",
     "justifyRight": "Aligner à droite",
     "justifyFull": "Justifier",
     "alignTop": "Aligner en haut",
     "alignMiddle": "Aligner au milieu",
     "alignBottom": "Aligner en bas"
    }
  },
  "mergeDialog": {
    "title": "Fusionner les cellules",
    "buttons": {
      "mergeCells": "Tout fusionner",
      "mergeHorizontally": "Fusionner horizontalement",
      "mergeVertically": "Fusionner verticalement",
      "unmerge": "Annuler fusion"
    }
  },
  "freezeDialog": {
    "title": "Figer les volets",
    "buttons": {
      "freezePanes": "Figer les volets",
      "freezeRows": "Figer les lignes",
      "freezeColumns": "Figer les colonnes",
      "unfreeze": "Défiger les volets"
    }
  },
  "confirmationDialog": {
    "text": "Voulez-vous vraiment supprimer cette feuille?",
    "title": "Supression de feuille"
  },
  "validationDialog": {
    "title": "Validation des données",
    "hintMessage": "Veuillez saisir une valeur {0} {1} valide.",
    "hintTitle": "Validation {0}",
    "criteria": {
      "any": "Toutes",
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
      "custom": "qui satisfait la formule: {0}"
    },
    "labels": {
      "criteria": "Critère",
      "comparer": "Comparer",
      "min": "Min",
      "max": "Max",
      "value": "Valeur",
      "start": "Départ",
      "end": "Fin",
      "onInvalidData": "Sur des données non valides",
      "rejectInput": "Rejeter l'entrée",
      "showWarning": "Afficher l'avertissement",
      "showHint": "Afficher l'indice",
      "hintTitle": "Titre de l'indice",
      "hintMessage": "Message d'indication",
      "ignoreBlank": "Ignorer les espaces vides"
    },
    "placeholders": {
      "typeTitle": "Saisir le titre",
      "typeMessage": "Saisir le message"
    }
  },
  "exportAsDialog": {
    "title": "Exporter...",
    "labels": {
      "fileName": "Non du fichier",
      "saveAsType": "Sauvegarder en tant que",
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
    "errorMessage": "Impossible de modifier une partie d'une cellule fusionnée."
  },
  "useKeyboardDialog": {
    "title": "Copier et coller",
    "errorMessage": "Ces actions ne peuvent pas être appelées via le menu. Veuillez utiliser les raccourcis clavier à la place:",
    "labels": {
      "forCopy": "pour copie",
      "forCut": "pour couper",
      "forPaste": "for paste"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Cette action ne peut pas être effectuée sur une sélection multiple."
  },
  "insertCommentDialog": {
    "title": "Insérer un commentaire",
    "labels": {
      "comment": "Commentaire",
      "removeComment": "Supprimer le commentaire"
    }
  },
  "insertImageDialog": {
    "title": "Insérer une image",
    "info": "Faites glisser une image ici ou cliquez pour la sélectionner",
    "typeError": "Veuillez sélectionner une image JPEG, PNG ou GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Trier la plage de A à Z",
  "sortDescending": "Trier la plage de Z à A",
  "filterByValue": "Filtrer par valeur",
  "filterByCondition": "Filtrer par condition",
  "apply": "Appliquer",
  "search": "Chercher",
  "addToCurrent": "Ajouter à la sélection actuelle",
  "clear": "Effacer filtre",
  "blanks": "(Blancs)",
  "operatorNone": "Aucun",
  "and": "ET",
  "or": "OU",
  "operators": {
    "string": {
      "contains": "Le texte contient",
      "doesnotcontain": "Le texte ne contient pas",
      "startswith": "Le texte commence par",
      "endswith": "Le texte se termine par"
    },
    "date": {
      "eq": "La date est",
      "neq": "La date n'est pas",
      "lt": "La date est antérieure",
      "gt": "La date est postérieure"
    },
    "number": {
      "eq": "Est égal à",
      "neq": "N'est pas égal à",
      "gte": "Est supérieur ou égal à",
      "gt": "Est supérieur à",
      "lte": "Est inférieur ou égal à",
      "lt": "Est inférieur à"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Réinitialiser la couleur",
  "customColor": "Couleur personnalisée...",
  "apply": "Appliquer",
  "cancel": "Annuler"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Ajouter une colonne à gauche",
  "addColumnRight": "Ajouter une colonne à droite",
  "addRowAbove": "Ajouter une ligne au-dessus",
  "addRowBelow": "Ajouter une ligne en-dessous",
  "alignment": "Alignment",
  "alignmentButtons": {
    "justtifyLeft": "Aligner à gauche",
    "justifyCenter": "Centre",
    "justifyRight": "Aligner à droite",
    "justifyFull": "Justifier",
    "alignTop": "Aligner en haut",
    "alignMiddle": "Aligner au milieu",
    "alignBottom": "Aligner en bas"
  },
  "backgroundColor": "Arrière-plan",
  "bold": "Gras",
  "borders": "Bordures",
  "colorPicker": {
    "reset": "Réinitialiser la couleur",
    "customColor": "Couleur personnalisée ..."
  },
  "copy": "Copier",
  "cut": "Coller",
  "deleteColumn": "Supprimer la colonne",
  "deleteRow": "Supprimer la ligne",
  "excelImport": "Importer depuis Excel...",
  "filter": "Filtre",
  "fontFamily": "Police",
  "fontSize": "Taille de la police",
  "format": "Format personnalisé...",
  "formatTypes": {
    "automatic": "Automatique",
    "number": "Number",
    "percent": "Percent",
    "financial": "financier",
    "currency": "Currency",
    "date": "Date",
    "time": "Heure",
    "dateTime": "Date heure",
    "duration": "Duration",
    "moreFormats": "Plus de formats ..."
  },
  "formatDecreaseDecimal": "Diminuer la décimale",
  "formatIncreaseDecimal": "Augmenter la décimale",
  "freeze": "Figer les volets",
  "freezeButtons": {
    "freezePanes": "Figer les volets",
    "freezeRows": "Figer les lignes",
    "freezeColumns": "Figer les colonnes",
    "unfreeze": "Dégeler les volets"
  },
  "insertComment": "Insérer un commentaire",
  "insertImage": "Insérer une image",
  "italic": "Italique",
  "merge": "Fusionner les cellules",
  "mergeButtons": {
    "mergeCells": "Tout fusionner",
    "mergeHorizontally": "Fusionner horizontalement",
    "mergeVertically": "Fusionner verticalement",
    "unmerge": "Annuler fusion"
  },
  "open": "Ouvrir...",
  "paste": "Coller",
  "quickAccess": {
    "redo": "Refaire",
    "undo": "Défaire"
  },
  "saveAs": "Enregistrer sous ...",
  "sortAsc": "Trier par ordre croissant",
  "sortDesc": "Trier par ordre décroissant",
  "sortButtons": {
    "sortSheetAsc": "Trier la feuille de A à Z",
    "sortSheetDesc": "Trier la feuille de Z à A",
    "sortRangeAsc": "Trier la plage de A à Z",
    "sortRangeDesc": "Trier la plage de Z à A"
  },
  "textColor": "Couleur du texte",
  "textWrap": "Envelopper le texte",
  "underline": "Souligné",
  "validation": "Validation des données ..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Impossible d'insérer des cellules en raison d'une possibilité de perte de données. Sélectionnez un autre emplacement d'insertion ou supprimez les données de la fin de votre feuille de calcul.",
    "filterRangeContainingMerges": "Impossible de créer un filtre dans une plage contenant des fusions",
    "validationError": "La valeur que vous avez saisie enfreint les règles de validation définies sur la cellule."
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
  "retry": "Recommencer"
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
      "weekday": "jour de  la semaine",
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
      "clear": "effacer",
      "noData": "Aucune donnée trouvée."
    });
}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
    $.extend(true, kendo.ui.DropDownTree.prototype.options.messages,{
        "singleTag": "item(s) sélectionnés",
        "clear": "effacer",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "item(s) sélectionnés",
        "clear": "effacer",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée."
    });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
    $.extend(true, kendo.ui.Chat.prototype.options.messages,{
        "placeholder": "Saisir un message...",
        "toggleButton": "Basculer la barre d'outils",
        "sendButton": "Envoyer messsage"
    });
}

/* Wizard messages */

if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
    $.extend(true, kendo.ui.Wizard.prototype.options.messages,{
        "reset": "Réinitialiser",
        "previous": "Précédent",
        "next": "Suivant",
        "done": "Terminé",
        "step": "Étape",
        "of": "de"
    });
}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
    $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        defaultFileName: "Document",
        toolbar: {
            zoom: {
                zoomLevel: "Niveau de zoom",
                zoomOut: "Dézoomer",
                zoomIn: "Agrandir",
                actualWidth: "Largeur réelle",
                autoWidth: "Largeur automatique",
                fitToWidth: "Ajuster à la largeur",
                fitToPage: "Ajuster à la page"
            },
            open: "Ouvrir",
            exportAs: "Exporter",
            download: "Télécharger",
            pager:  {
                first: "Aller à la première page",
                previous: "Aller à la page précédente",
                next: "Aller à la page suivante",
                last: "Aller à la dernière page",
                of: " de {0} ",
                page: "page",
                pages: "pages"
            },
            print: "Imprimer",
            toggleSelection: "Activer la sélection",
            togglePan: "Activer le panoramique",
            search: "Rechercher"
        },
        errorMessages: {
            notSupported: "Seuls les fichiers pdf sont autorisés.",
            parseError: "Le traitement du fichier PDF échoue.",
            notFound: "Le fichier est introuvable.",
            popupBlocked: "Popup est bloqué."
        },
        dialogs: {
            exportAsDialog: {
                title: "Exporter...",
                defaultFileName: "Document",
                pdf: "Portable Document Format (.pdf)",
                png: "Portable Network Graphics (.png)",
                svg: "Image Vectorielle (.svg)",
                labels: {
                    fileName: "Nom de fichier",
                    saveAsType: "Enregistrer sous",
                    page: "Page"
                }
            },
            okText: "OK",
            save: "Sauvegarder",
            cancel: "Annuler",
            search: {
                inputLabel: "Rechercher Texte",
                matchCase: "Respecter la case",
                next: "Résultat suivant",
                previous: "Résultat précédent",
                close: "Fermer",
                of: "de"
            }
        }
    });
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Afficher les éléments avec une valeur qui:",
  "filterFields": "Filtre de champs",
  "filter": "Filtre",
  "include": "Inclure les champs...",
  "title": "Champs à inclure",
  "clear": "Effacer",
  "ok": "Ok",
  "cancel": "Annuler",
  "operators": {
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "startswith": "Commence par",
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N'est pas égal à"
  }
});
}

})(window.kendo.jQuery);
