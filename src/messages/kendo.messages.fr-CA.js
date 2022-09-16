(function($, undefined) {
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

/* FileManager messages */

if (kendo.ui.FileManager) {
  kendo.ui.FileManager.prototype.options.messages =
  $.extend(true, kendo.ui.FileManager.prototype.options.messages,{
      toolbar: {
          createFolder: "Nouveau dossier",
          upload: "Téléverser",
          sortDirection: "Ordre de tri",
          sortDirectionAsc: "Croissant",
          sortDirectionDesc: "Décroissant",
          sortField: "Champ de tri",
          nameField: "Nom",
          sizeField: "Taille",
          typeField: "Type",
          dateModifiedField: "Date de modification",
          dateCreatedField: "Date de création",
          listView: "Liste",
          gridView: "Grille",
          search: "Rechercher",
          details: "Détails",
          detailsChecked: "Oui",
          detailsUnchecked: "Non",
          "delete": "Effacer",
          rename: "Renommer"
      },
      views: {
          nameField: "Nom",
          sizeField: "Taille",
          typeField: "Type",
          dateModifiedField: "Date de modification",
          dateCreatedField: "Date de création",
          items: "éléments",
          listLabel: "Gestionnaire fichier Liste",
          gridLabel: "Gestionnaire fichier Grille",
          treeLabel: "Gestionnaire fichier Arborescence"
      },
      dialogs: {
          upload: {
              title: "Transférer des fichiers",
              clear: "Vider",
              done: "Terminé"
          },
          moveConfirm: {
              title: " ",
              content: "<p style=\'text-align: center;\'>Voulez-vous déplacer les fichiers sélectionnés ou les copier?</p>",
              okText: "Copier",
              cancel: "Déplacer",
              close: "Fermer"
          },
          deleteConfirm: {
              title: "Confirmation de l'effacement",
              content: "<p style=\'text-align: center;\'>Voulez-vous vraiment supprimer les fichiers sélectionnés?</br>Il n\'est pas possible d\'annuler cette opération.</p>",
              okText: "Supprimer",
              cancel: "Annuler",
              close: "Fermer"
          },
          renamePrompt: {
              title: "Renommer",
              content: "<p style='text-align: center;'>Entrez un nouveau nom de fichier</p>",
              okText: "Renommer",
              cancel: "Annuler",
              close: "Fermer"
          }
      },
      previewPane: {
          noFileSelected: "Aucun fichier sélectionné",
          extension: "Type",
          size: "Taille",
          created: "Date de création",
          createdUtc: "Date de création (UTC)",
          modified: "Date de modification",
          modifiedUtc: "Date de modification (UTC)",
          items: "éléments"
      }
  });
}

/* FilterMenu operator messages */

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
  "columnVisibility": "Column Visible",
  "clear": "Vider",
  "cancel": "Annuler",
  "stick": "Ancrer la colonne",
  "unstick": "Libérer la colonne",
  "setColumnPosition": "Définir position colonne",
  "apply": "Appliquer",
  "reset": "Réinitialiser",
  "buttonTitle": "{0} éditer paramètres de colonne"
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
  "hourly": {
    "repeatEvery": "Répéter chaque: ",
    "interval": " heure(s)"
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
    "date": "Date"
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de week-end"
  },
  "repeat": "Répéter",
  "recurrenceEditorTitle": "Éditeur d'occurence"
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
    "search": "Rechercher..."
  },
  "editable": {
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "cancelDelete": "Annuler",
    "confirmDelete": "Effacer"
  },
  "noRecords": "Aucun enregistrement disponible.",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Appuer sur ctrl + espace pour grouper",
  "ungroupHeader": "Appuer sur ctrl + espace pour dégrouper",
  "toolbarLabel": "barre d'outils de grille",
  "groupingHeaderLabel": "groupe entête de grille",
  "filterCellTitle": "filtre cellule"
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
  "morePages": "Plusieurs pages",
  "pageButtonLabel": "Page {0}",
  "pageSizeDropDownLabel": "Menu déroulant tailles de Page",
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tous",
  "page": "Page",
  "display": "Afficher les éléments {0} - {1} de {2}",
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
  "into": "dans",
  "buttonTitle": "{0} paramètres filtre de colonne"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Choisir tout",
  "clear": "Effacer filtre",
  "filter": "Filtrer",
  "search": "Recherche",
  "selectedItemsFormat": "{0} éléments(s) sélectionné(s)",
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
  "dialogCancel": "Fermer",
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
  "deleteRow": "Supprimer la ligne",
  "formatting": "Format",
  "viewHtml": "Visualiser le HTML",
  "dialogUpdate": "Mise à jour",
  "insertFile": "Insérer un fichier",
  "dialogOk": "Ok",
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
  "cleanFormatting": "Effacer format",
  "units": "Unités",
  "print": "Imprimer",
  "headerRows": "Entêtes",
  "headerColumns": "Entêtes Colonnes",
  "tableSummaryPlaceholder": "L'attribut sumarry n'est pas compatible HTML5.",
  "associateNone": "Aucun",
  "associateScope": "Associer avec un attribut 'scope'",
  "associateIds": "Associer avec un Ids",
  "copyFormat": "Copier format",
  "applyFormat": "Appliquer format",
  "borderNone": "Aucun",
  "undo": "Défaire",
  "redo": "Refaire"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
  "uploadFile": "Charger",
  "orderBy": "Trier par",
  "orderByName": "Nom",
  "orderBySize": "Taille",
  "directoryNotFound": "Aucun répértoire de ce nom.",
  "emptyFolder": "Répertoire vide",
  "deleteFile": 'Etes-vous sûr de vouloir supprimer "{0}"?',
  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les type fichiers supportés sont {1}.",
  "overwriteFile": "Un fichier du nom \"{0}\" existe déjà dans ce répertoire. Voulez-vous le remplacer?",
  "dropFilesHere": "glissez les fichiers ici pour les charger",
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
  "headerStatusPaused": "Pause",
  "uploadSuccess": "Fichier(s) téléversé(s) avec succes.",
  "uploadFail": "Téléversement fichier(s) échoué.",
  "invalidMaxFileSize": "Taille du fichier trop grosse.",
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
  "event": "Evènement",
  "recurrenceMessages": {
    "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
    "editWindowOccurrence": "Modifier l'occurrence courante",
    "editWindowSeries": "Modifier la série",
    "editWindowTitle": "Modification de l'élément courant",
    "deleteRecurringConfirmation": "Êtes-vous sûr de vouloir supprimer cette occurence d'évènement ?",
    "deleteSeriesConfirmation": "Êtes-vous sûr de vouloir supprimer toute la série ?",
    "resetSeriesWindowTitle": "Réinitialiser la série"
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
  "ariaSlotLabel": "Sélectionner de {0:t} à {1:t}",
  "ariaEventLabel": "{0} le {1:D} à {2:t}",
  "refresh": "Rafraichir",
  "selectView": "Sélectionner la vue",
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

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
  kendo.ui.NumericTextBox.prototype.options =
  $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
    "upArrowText": "Augmenter la valeur",
    "downArrowText": "Diminuer la valeur"
  });
}

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
    $.extend(true, kendo.ui.ColorGradient.prototype.options.messages,{
        "contrastRatio": "Contraste :",
        "fail": "Echec",
        "pass": "Passe",
        "hex": "HEX",
        "toggleFormat": "Basucler format",
        "red": "Rouge",
        "green": "Vert",
        "blue": "Bleu",
        "alpha": "Alpha"
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

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Ajouter enfant",
    "append": "Ajouter tâche",
    "insertAfter": "Ajouter en dessous",
    "insertBefore": "Ajouter au dessus",
    "pdf": "Exporter vers PDF"
  },
  "cancel": "Annuler",
  "deleteDependencyWindowTitle": "Supprimer dépendances",
  "deleteTaskWindowTitle": "Supprimer tâche",
  "destroy": "Supprimer",
  "editor": {
    "assingButton": "Assigner",
    "editorTitle": "Tâche",
    "end": "Fin",
    "percentComplete": "Complété",
    "plannedStart": "Départ planifié",
    "plannedEnd": "Fin planifié",
    "resources": "Ressources",
    "resourcesEditorTitle": "Ressources",
    "resourcesHeader": "Ressources",
    "start": "Départ",
    "title": "Titre",
    "unitsHeader": "Unités"
  },
  "plannedTasks": {
    "switchText": "Tâche planifiée",
    "offsetTooltipAdvanced": "Date limite atteinte plus tôt",
    "offsetTooltipDelay": "Delai",
    "seconds": "secondes",
    "minutes": "minutes",
    "hours": "heures",
    "days": "jours"
  },
  "save": "Save",
  "selectView": "Selectionner vue",
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

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {
kendo.ui.TaskBoard.prototype.options.messages =
$.extend(true, kendo.ui.TaskBoard.prototype.options.messages,{
    "edit": "Éditer",
    "createNewCard": "Créer une nouvelle carte",
    "create": "Créer",
    "search": "Rechercher",
    "previewCard": "Prévisualiser la carte",
    "addCard": "Ajouter une carte",
    "editCard": "Éditer la carte",
    "deleteCard": "Supprimer la carte",
    "addColumn": "Ajouter colonne",
    "editColumn": "Éditer colonne",
    "deleteColumn": "Supprimer colonne",
    "close": "Fermer",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "saveChanges": "Sauvagrder",
    "title": "Titre:",
    "description": "Description:",
    "newColumn": "Nouvelle colonne",
    "deleteColumnConfirm": "Ëtes-vous sûr de vouloir supprimer cette colonne ?",
    "deleteCardConfirm": "Ëtes-vous sûr de vouloir supprimer cette carte ?"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pause",
  "play": "Jouer",
  "mute": "Désactiver le son",
  "unmute": "Réactiver le son",
  "quality": "Qualité",
  "fullscreen": "Plein écran",
  "volume": "volume",
  "time": "temps"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Déposer le champ de donnée ici",
  "columnFields": "Déposer la colonne de données ici",
  "rowFields": "Déposer la ligne de données ici"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Afficher les éléments avec une valeur qui :",
  "filterFields": "Filtre champs",
  "filter": "Filtrer",
  "include": "Inclure Champs...",
  "title": "Champs à inclure",
  "clear": "Vider",
  "ok": "Ok",
  "cancel": "Annuler",
  "operators": {
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "startswith": "Commence par",
    "endswith": "Fini par",
    "eq": "Est égal à",
    "neq": "N'est pas égal à"
  }
});
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
      "cancel": "Annuler",
      "update": "Sauvegarder",
      "endTitle": "Fin de répétition",
      "repeatTitle": "Motifs de répétitions",
      "headerTitle": "Événements répétition",
      "end": {
        "patterns": {
            "never": "Jammais",
            "after": "Après...",
            "on": "Sur..."
        },
        "never": "Jammais",
        "after": "Fin répétition après",
        "on": "Fin répétition dans"
      },
      "daily": {
        "interval": ""
      },
      "hourly": {
        "interval": ""
      },
      "weekly": {
        "interval": ""
      },
      "monthly": {
        "interval": "",
        "repeatBy": "Répéter par: ",
        "dayOfMonth": "Jour du mois",
        "dayOfWeek": "Jour de la semaine",
        "repeatEvery": "Répéter chaque",
        "every": "Chaque",
        "day": "Jour "
      },
      "yearly": {
        "interval": "",
        "repeatBy": "Répéter par: ",
        "dayOfMonth": "Jour du mois",
        "dayOfWeek": "Jour de la semaine",
        "repeatEvery": "Répéter chaque: ",
        "every": "Chaque",
        "month": "Mois",
        "day": "Jour "
      }
    });
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Toutes les bordures",
  "insideBorders": "Bordures intérieures",
  "insideHorizontalBorders": "Bordures intérieures horizontales",
  "insideVerticalBorders": "Bordures intérieures verticales",
  "outsideBorders": "Bordures extérieures",
  "leftBorder": "Bordure gauche",
  "topBorder": "Brodure du haut",
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
  "retry": "Réésayer",
  "revert": "Défaire",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Nombre",
      "currency": "Monnétaire",
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
     "alignBottom": "Aligner en bas"
    }
  },
  "mergeDialog": {
    "title": "Fusionner cellules",
    "buttons": {
      "mergeCells": "Fusionner tout",
      "mergeHorizontally": "Fusionner horizontalement",
      "mergeVertically": "Fusionner verticallement",
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
    "text": "Êtes-vous sûr de vouloir supprimer cette feuille ?",
    "title": "Retirer feuille"
  },
  "validationDialog": {
    "title": "Valider donnée",
    "hintMessage": "S'il vous plait entrez une valeur {0} valide {1}.",
    "hintTitle": "Validation {0}",
    "criteria": {
      "any": "Toutes valeurs",
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
      "greaterThanOrEqualTo": "plus grabd ou égal à",
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
      "rejectInput": "Entrée rejeté",
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
      "horizontally": "Horizontallement",
      "vertically": "Verticallement"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Impossible de modifier un partie d'une cellule fusionnée."
  },
  "useKeyboardDialog": {
    "title": "Copier et coller",
    "errorMessage": "Ces actions ne peuvent pas être appelées du menu. S'il vous plait utisez les raccourci clavier à la place:",
    "labels": {
      "forCopy": "pour copie",
      "forCut": "pour couper",
      "forPaste": "pour coller"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Cette action ne peut-être exécutée sur une sélection multiple."
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
    "info": "Déposer une image ici, ou cliquez pour sélectionner",
    "typeError": "S'il vous plait sélectionnez une image au format JPEG, PNG ou GIF"
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
      "endswith": "Texte fini par"
    },
    "date": {
      "eq": "Date est",
      "neq": "Date n'est pas",
      "lt": "Date avant",
      "gt": "Date après"
    },
    "number": {
      "eq": "Est égale à",
      "neq": "N'est pas égale à",
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
    "alignMiddle": "Aligner au milieu",
    "alignBottom": "Aligner en bas"
  },
  "backgroundColor": "Couleur fond",
  "bold": "Gras",
  "borders": "Bordures",
  "colorPicker": {
    "reset": "Réinitialiser couleur",
    "customColor": "Couleur personnalisée..."
  },
  "copy": "Copier",
  "cut": "Couper",
  "deleteColumn": "Supprimer colonne",
  "deleteRow": "Supprimer ligne",
  "excelImport": "Importer de Excel...",
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
  "formatDecreaseDecimal": "Décrément decimale",
  "formatIncreaseDecimal": "Incrément decimale",
  "freeze": "Figer les panneaux",
  "freezeButtons": {
    "freezePanes": "Figer les panneaux",
    "freezeRows": "Figer les lignes",
    "freezeColumns": "Figer les colonnes",
    "unfreeze": "Libérer les panneaux"
  },
  "insertComment": "Insérer commentaire",
  "insertImage": "Insérer image",
  "italic": "Italique",
  "merge": "Fusionner cellules",
  "mergeButtons": {
    "mergeCells": "Fusionner tout",
    "mergeHorizontally": "Fusionner horizontallement",
    "mergeVertically": "Fusionner verticallement",
    "unmerge": "Séparer"
  },
  "open": "Ouvrir...",
  "paste": "Coller",
  "quickAccess": {
    "redo": "Refaire",
    "undo": "Défaire"
  },
  "saveAs": "Sauvegarder sous...",
  "sortAsc": "Tri croissant",
  "sortDesc": "tri décroissant",
  "sortButtons": {
    "sortSheetAsc": "Trier pages de A à Z",
    "sortSheetDesc": "Trier pages de Z à A",
    "sortRangeAsc": "Trier les intervalles de A à Z",
    "sortRangeDesc": "Trier les intervalles de Z à A"
  },
  "textColor": "Couleur texte",
  "textWrap": "Habillage de texte",
  "underline": "Souligner",
  "validation": "Valider donnée..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Impossible d'insérer des cellules en raison d'une possibilité de perte de données. Sélectionnez un autre emplacement d'insertion ou supprimez les données à la fin de votre feuille de calcul.",
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
  "increaseButtonTitle": "Incrémenter",
  "decreaseButtonTitle": "Décrémenter"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Chargement...",
  "requestFailed": "La requête à échoué.",
  "retry": "Réésayer"
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
    "weekColumnHeader": "",
    "navigateTo": "Aller à ",
    "parentViews": {
        "month": "Vue année",
        "year": "Vue décénie",
        "decade": "Vue siècle"
    }
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
        "singleTag": "element(s) selectionné(s)",
        "clear": "vider",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "element(s) selectionné(s)",
        "clear": "vider",
        "deleteTag": "supprier",
        "noData": "Aucune donnée trouvée.",
        "downArrow": "selection"
    });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
    $.extend(true, kendo.ui.Chat.prototype.options.messages,{
        "messageListLabel": "Liste messages",
        "placeholder": "Enter un message...",
        "toggleButton": "Basculer la barre d'outils",
        "sendButton": "Envoyer message"
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
                zoomLevel: "niveau de zoom",
                zoomOut: "Dézoomer",
                zoomIn: "Zoomer",
                actualWidth: "Largeur actuelle",
                autoWidth: "Largeur automatique",
                fitToWidth: "Ajuster à la largeur",
                fitToPage: "Ajuster à la page"
            },
            open: "Ouvrir",
            exportAs: "Exporter",
            download: "Télécharger",
            pager: {
                first: "Aller à la première page",
                previous: "Aller à la page précédente",
                next: "Aller à la page suivante",
                last: "Aller à la dernière page",
                of: " de {0} ",
                page: "page",
                pages: "pages"
            },
            print: "Imprimer",
            toggleSelection: "Permettre la Selection",
            togglePan: "Permettre le Paysage",
            search: "Rechercher"
        },
        errorMessages: {
            notSupported: "Seuls les fichier PDF sont permis.",
            parseError: "Impossible d'afficher le PDF.",
            notFound: "Fichier non trouvé.",
            popupBlocked: "Fenêtre Popup bloquée."
        },
        dialogs: {
            exportAsDialog: {
                title: "Exporter...",
                defaultFileName: "Document",
                pdf: "Portable Document Format (.pdf)",
                png: "Portable Network Graphics (.png)",
                svg: "Scalable Vector Graphics (.svg)",
                labels: {
                    fileName: "Nom fichier",
                    saveAsType: "Sauvegarder sous",
                    page: "Page"
                }
            },
            okText: "OK",
            save: "Sauvegarder",
            cancel: "Annuler",
            search: {
                inputLabel: "Rechercher texte",
                matchCase: "Respecter la casse",
                next: "Résultat suivant",
                previous: "Résultat précédent",
                close: "Fermé",
                of: "de"
            }
        }
    });
}

/* Captcha messages */

if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
    $.extend(true, kendo.ui.Captcha.prototype.options.messages,{
        "reset": "Reinitialiser captcha",
        "audio": "Lire captcha",
        "imageAlt": "Tapez le code Captcha de l'image",
        "success": "Vérification réussie"
    });
}

/* OrgChart messages */

if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
    $.extend(true, kendo.ui.OrgChart.prototype.options.messages,{
        label: "Plan Org",
        edit: "Edition",
        create: "Créer",
        destroy: "Supprimer",
        destroyContent: "Est-vous sûr de vouloir supprimer cet élément et tous ces enfants ?",
        destroyTitle: "Supprimer élément",
        cancel: "Annuler",
        save: "Sauvegarder",
        menuLabel: "Menu édition",
        uploadAvatar: "Téléverser un nouvel avatar",
        parent: "Parent",
        name: "Nom",
        title: "Titre",
        none: "--Aucun--",
        expand: "développer",
        collapse: "réduire"
    });
}

/* Map messages */

if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
    $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Titre carte"
    });
}

})(window.kendo.jQuery);
