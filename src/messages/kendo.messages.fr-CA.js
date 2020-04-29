(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
  kendo.ui.FlatColorPicker.prototype.options.messages =
  $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
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

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Tri croissant",
  "sortDescending": "Tri décroissant",
  "filter": "Filtrer",
  "columns": "Colonnes",
  "columnVisibility": "Colonne visible",
  "clear": "Vider",
  "cancel": "Annuler",
  "done": "Fini",
  "settings": "Paramètres de colonne",
  "lock": "Bloquer",
  "unlock": "Ouvrir"
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

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Gras",
  "italic": "Italique",
  "underline": "Souligné",
  "strikethrough": "Barré",
  "superscript": "Superscript",
  "subscript": "Subscript",
  "justifyCenter": "Centrer",
  "justifyLeft": "Aligner le texte à gauche",
  "justifyRight": "Aligner le texte à droite",
  "justifyFull": "Justifier",
  "insertUnorderedList": "Liste à puces",
  "insertOrderedList": "Liste numérotée",
  "indent": "Augmenter le retrait",
  "outdent": "Diminuer le retrait",
  "createLink": "Insérer un lien hypertexte",
  "unlink": "Supprimer le lien hypertexte",
  "insertImage": "Insérer image",
  "insertFile": "Inserer fichier",
  "insertHtml": "Insérer HTML",
  "viewHtml": "Voir HTML",
  "fontName": "Police",
  "fontNameInherit": "(police héritée)",
  "fontSize": "Taille de police",
  "fontSizeInherit": "(taille héritée)",
  "formatBlock": "Style du paragraphe",
  "formatting": "Format",
  "foreColor": "Couleur",
  "backColor": "Couleur de fond",
  "style": "Styles",
  "emptyFolder": "Vider le dossier",
  "uploadFile": "Téléverser",
  "overflowAnchor": "Plus d'outils",
  "orderBy": "Organiser par:",
  "orderBySize": "Taille",
  "orderByName": "Nom",
  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers supportés sont {1}.",
  "deleteFile": "Êtes-vous sûr de vouloir supprimer \"{0}\"?",
  "overwriteFile": "Un fichier avec le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous le remplacer?",
  "directoryNotFound": "Un répertoire avec ce nom n'a pas été trouvé.",
  "imageWebAddress": "Adresse Web",
  "imageAltText": "Le texte de remplacement",
  "imageWidth": "Largeur (px)",
  "imageHeight": "Hauteur (px)",
  "fileWebAddress": "Adresse Web",
  "fileTitle": "Titre",
  "linkWebAddress": "Adresse Web",
  "linkText": "Texte",
  "linkToolTip": "Info-bulle",
  "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
  "dialogUpdate": "Mise à jour",
  "dialogInsert": "Insérer",
  "dialogButtonSeparator": "ou",
  "dialogCancel": "Annuler",
  "cleanFormatting": "Retirer le format",
  "createTable": "Insérer un tableau",
  "addColumnLeft": "Ajouter une colonne à gauche",
  "addColumnRight": "Ajouter une colonne à droite",
  "addRowAbove": "Ajouter une ligne au dessus",
  "addRowBelow": "Ajouter une ligne en dessous",
  "deleteRow": "Supprimer ligne",
  "deleteColumn": "Supprimer la colonne",
  "dialogOk": "OK",
  "tableWizard": "Assistant de tableau",
  "tableTab": "Table",
  "cellTab": "Cellule",
  "accessibilityTab": "Accessibilité",
  "caption": "Sous-titre",
  "summary": "Sommaire",
  "width": "Largeur",
  "height": "Hauteur",
  "units": "Unités",
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
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
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

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "est vrai",
  "isFalse": "est fausse",
  "filter": "Filtrer",
  "clear": "Effacer filtre",
  "operator": "Opérateur"
});
}


/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "endswith": "Se termine par",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide",
    "isnullorempty": "Est vide ou nulle",
    "isnotnullorempty": "A une valeur"
  },
  "number": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "date": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Afficher les lignes avec la valeur qui",
  "title": "Afficher les lignes avec la valeur qui",
  "isTrue": "est vrai",
  "isFalse": "est fausse",
  "filter": "Filtrer",
  "clear": "Effacer filtre",
  "and": "Et",
  "or": "Ou",
  "selectValue": "-Sélectionner-",
  "operator": "Opérateur",
  "value": "Valeur",
  "cancel": "Annuler",
  "done": "Terminé",
  "into": "dans"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "endswith": "Se termine par",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide",
    "isnullorempty": "Est vide ou nulle",
    "isnotnullorempty": "A une valeur"
  },
  "number": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "date": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Choisir toutes",
  "clearAll": "Effacer tout",
  "clear": "Effacer",
  "filter": "Filtrer",
  "search": "Recherche",
  "cancel": "Annuler",
  "selectedItemsFormat": "{0} items sélectionnés",
  "done": "Terminé",
  "into": "dans"

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

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Annuler les modifications",
    "canceledit": "Annuler",
    "create": "Insérer",
    "destroy": "Effacer",
    "edit": "Éditer",
    "excel": "Exporter vers Excel",
    "pdf": "Exporter vers PDF",
    "save": "Enregistrer les modifications",
    "select": "Sélectionner",
    "update": "Mettre à jour"
  },
  "editable": {
    "cancelDelete": "Annuler",
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "confirmDelete": "Effacer"
  },
  "noRecords": "Aucun enregistrement disponible.",
  "search": "Recherche...",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Pressez ctrl + espace pour grouper",
  "ungroupHeader": "Pressez ctrl + espace pour dégrouper"
});
}


/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Augmenter valeur",
  "downArrowText": "Diminuer valeur"
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

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Toutes",
  "display": "Afficher les items {0} - {1} de {2}",
  "empty": "Aucun enregistrement à afficher.",
  "page": "Page",
  "of": "de {0}",
  "itemsPerPage": "articles par page",
  "first": "Aller à la première page",
  "previous": "Aller à la page précédente",
  "next": "Aller à la page suivante",
  "last": "Aller à la dernière page",
  "refresh": "Actualiser",
  "morePages": "Plusieurs pages"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tous",
  "display": "Afficher les items {0} - {1} de {2}",
  "empty": "Aucun enregistrement à afficher.",
  "page": "Page",
  "of": "de {0}",
  "itemsPerPage": "articles par page",
  "first": "Aller à la première page",
  "previous": "Aller à la page précédente",
  "next": "Aller à la page suivante",
  "last": "Aller à la dernière page",
  "refresh": "Actualiser",
  "morePages": "Plusieurs pages"
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
  "filterFields": "Filter les champs",
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

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Jamais",
    "hourly": "Une fois par heure",
    "daily": "Une fois par jour",
    "weekly": "Une fois par semaine",
    "monthly": "Une fois par mois",
    "yearly": "Une fois par an"
  },
  "daily": {
    "repeatEvery": "Répéter chaque:",
    "interval": "jour(s)"
  },
  "weekly": {
    "interval": "semaine(s)",
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:"
  },
  "monthly": {
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "mois",
    "day": "Jour"
  },
  "yearly": {
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "année(ans)",
    "of": "de"
  },
  "end": {
    "label": "Finir:",
    "mobileLabel": "Ends",
    "never": "Jamais",
    "after": " Après",
    "occurrence": "occurrence(s)",
    "on": "Sur"
  },
  "offsetPositions": {
    "first": "premier",
    "second": "second",
    "third": "troisième",
    "fourth": "quatrième",
    "last": "dernier"
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de week-end"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "toute la journée",
  "date": "Date",
  "event": "Événement",
  "time": "Time",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables",
  "today": "Aujourd'hui",
  "save": "Sauvegarder",
  "cancel": "Annuler",
  "destroy": "Effacer",
  "resetSeries": "Réinitialiser la série",
  "deleteWindowTitle": "Supprimer événement",
  "ariaSlotLabel": "Sélectionner de {0:t} à {1:t}",
  "ariaEventLabel": "{0} le {1:D} à {2:t}",
  "editable": {
    "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?"
  },
  "views": {
    "day": "Jour",
    "week": "Semaine",
    "workWeek": "Semaine de travail",
    "agenda": "Agenda",
    "month": "Mois"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "resetSeriesWindowTitle": "Réinitialiser la série",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteRecurringConfirmation": "Êtes-vous sûr de vouloir supprimer cet occurence d'événement?",
    "deleteSeriesConfirmation": "Êtes-vous sûr de vouloir supprimer toute la série?",
    "editWindowTitle": "Modification de l'élément courant",
    "editWindowOccurrence": "Modifier l'occurrence courante",
    "editWindowSeries": "Modifier la série",
    "deleteRecurring": "Voulez-vous supprimer seulement cet Événement ou toute la série?",
    "editRecurring": "Voulez-vous modifier seulement cet Événement ou toute la série?"
  },
  "editor": {
    "title": "Titre",
    "start": "Début",
    "end": "Fin",
    "allDayEvent": "Toute la journée",
    "description": "Description",
    "repeat": "Répéter",
    "timezone": " ",
    "startTimezone": "Fuseau horaire de départ",
    "endTimezone": "Fuseau horaire d'arrivée",
    "separateTimezones": "Utiliser des fuseaux horaires différents pour le départ et l'arrivée",
    "timezoneEditorTitle": "Fuseaux horaires",
    "timezoneEditorButton": "Fuseau horaire",
    "timezoneTitle": "Fuseaux horaires",
    "noTimezone": "Pas de fuseau horaire",
    "editorTitle": "Événement"
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
  "customColor": "Couleurs personnalisées...",
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
  "retry": "Réessayer",
  "revert": "Défaire",
  "okText": "Ok",
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
    "title": "Taille de police"
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
      "unmerge": "Dé-fusionner"
    }
  },
  "freezeDialog": {
    "title": "Figer les panneaux",
    "buttons": {
      "freezePanes": "Figer les panneaux",
      "freezeRows": "Figer des lignes",
      "freezeColumns": "Figer des colonnes",
      "unfreeze": "Défiger les panneaux"
    }
  },
  "confirmationDialog": {
    "text": "Êtes-vous sur de vouloir retirer cette feuille?",
    "title": "Retirer une feuille"
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
      "notBetween": "pas inclus entre",
      "equalTo": "égal à",
      "notEqualTo": "pas égal à",
      "greaterThanOrEqualTo": "plus grand ou égal à",
      "lessThanOrEqualTo": "plus petit ou égal à"
    },
    "comparerMessages": {
      "greaterThan": "plus grand que {0}",
      "lessThan": "plus petit que {0}",
      "between": "entre {0} et {1}",
      "notBetween": "pas inclus entre {0} et {1}",
      "equalTo": "égal à {0}",
      "notEqualTo": "pas égal à {0}",
      "greaterThanOrEqualTo": "plus grand ou égal à {0}",
      "lessThanOrEqualTo": "plus petit ou égal à {0}",
      "custom": "qui satisfait la formule: {0}"
    },
    "labels": {
      "criteria": "Critere",
      "comparer": "Comparer",
      "min": "Min",
      "max": "Max",
      "value": "Valeur",
      "start": "Départ",
      "end": "Fin",
      "onInvalidData": "Sur donnée valide",
      "rejectInput": "Rejeter l'entrée",
      "showWarning": "Afficher avertissement",
      "showHint": "Afficher astuce",
      "hintTitle": "Titre astuce",
      "hintMessage": "Message astuce",
      "ignoreBlank": "Ignorer les blancs"
    },
    "placeholders": {
      "typeTitle": "Entrer le titre",
      "typeMessage": "Entrer le message"
    }
  },
  "exportAsDialog": {
    "title": "Exporter...",
    "labels": {
      "fileName": "Nom du fichier",
      "saveAsType": "Sauvegarde en tant que",
      "exportArea": "Exporter",
      "paperSize": "Taille duu papier",
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
    "title": "Inserer un commentaire",
    "labels": {
      "comment": "Commentaire",
      "removeComment": "Retirer le commentaire"
    }
  },
  "insertImageDialog": {
    "title": "Inserer une image",
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
  "addToCurrent": "Ajouter à la sélection courante",
  "clear": "Vider",
  "blanks": "(Blancs)",
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
      "lt":  "Date est avant",
      "gt":  "Date est après"
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
  "reset": "Reset color",
  "customColor": "Couleurs personnalisées...",
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
  "fontSize": "Taille de police",
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
  "formatDecreaseDecimal": "Diminuer décimale",
  "formatIncreaseDecimal": "Augmenter décimale",
  "freeze": "Figer les panneaux",
  "freezeButtons": {
    "freezePanes": "Figer les panneaux",
    "freezeRows": "Figer les lignes",
    "freezeColumns": "Figer les colonnes",
    "unfreeze": "Défiger les panneaux"
  },
  "insertComment": "Inserer un commentaire",
  "insertImage": "Inserer un image",
  "italic": "Italique",
  "merge": "Fusionner des cellules",
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
  "saveAs": "Sauvegarder en tant que...",
  "sortAsc": "Tri croissant",
  "sortDesc": "Tri décroissant",
  "sortButtons": {
    "sortSheetAsc": "Trier les pages de A à Z",
    "sortSheetDesc": "Trier les pages de Z à A",
    "sortRangeAsc": "Plage de tri de A à Z",
    "sortRangeDesc": "Plage de tri de Z à A"
  },
  "textColor": "Couleur du texte",
  "textWrap": "Retour à la ligne",
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
    "validationError": "La valeur que vous avez entrée ne respecte pas les règles de validation définies sur la cellule."
  },
  "tabs": {
    "home": "Accueil",
    "insert": "Inserer",
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

/* ListBox messaages */

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

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Aucun enregistrement à afficher",
    "loading": "Chargement...",
    "requestFailed": "La requête à échoué.",
    "retry": "Réessayer",
    "commands": {
        "edit": "Éditer",
        "update": "Mise à jour",
        "canceledit": "Annuler",
        "create": "Ajouter un enregistrement",
        "createchild": "Ajouter un enregistrement enfant",
        "destroy": "Supprimer",
        "excel": "Exporter vers Excel",
        "pdf": "Exporter vers PDF"
    }
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

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Sélectionner...",
  "cancel": "Annuler",
  "retry": "Réessayer",
  "remove": "Retirer",
  "clearSelectedFiles": "Vider",
  "uploadSelectedFiles": "Télécharger des fichiers",
  "dropFilesHere": "déposer les fichiers à télécharger ici",
  "statusUploading": "téléchargement",
  "statusUploaded": "téléchargé",
  "statusWarning": "attention",
  "statusFailed": "échoué",
  "headerStatusUploading": "Téléchargement...",
  "headerStatusUploaded":  "Complété",
  "invalidMaxFileSize": "Taille du fichier trop grande.",
  "invalidMinFileSize": "Taille du fichier trop petite.",
  "invalidFileExtension": "Type de fichier non permis."
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

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Chargement..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Fermer"
});
}

/* Calendar */
if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
  "weekColumnHeader": ""
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "Ok"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "Ok",
  "cancel": "Annuler"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "Ok",
  "cancel": "Annuler"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "année",
      "month": "mois",
      "day": "jour",
      "weekday": "jour de la semaine",
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

/* DropDownList messages */

if (kendo.ui.DropDownList) {
    kendo.ui.DropDownList.prototype.options.messages =
    $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);
}

/* ComboBox messages */

if (kendo.ui.ComboBox) {
    kendo.ui.ComboBox.prototype.options.messages =
    $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
}

/* AutoComplete messages */

if (kendo.ui.AutoComplete) {
    kendo.ui.AutoComplete.prototype.options.messages =
    $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);
}

/* MultiColumnComboBox messages */

if (kendo.ui.MultiColumnComboBox) {
    kendo.ui.MultiColumnComboBox.prototype.options.messages =
    $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
    $.extend(true, kendo.ui.DropDownTree.prototype.options.messages,{
        "singleTag": "item(s) sélectionnés",
        "clear": "vider",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "item(s) sélectionnés",
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
