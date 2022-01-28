(function ($, undefined) {
  /* Filter cell operator messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
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
  kendo.ui.FileManager.prototype.options.messages = $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
      toolbar: {
          createFolder: 'Nouveau dossier',
          upload: 'Téléverser',
          sortDirection: 'Ordre de tri',
          sortDirectionAsc: 'Croissant',
          sortDirectionDesc: 'Décroissant',
          sortField: 'Champ de tri',
          nameField: 'Nom',
          sizeField: 'Taille',
          typeField: 'Type',
          dateModifiedField: 'Date de modification',
          dateCreatedField: 'Date de création',
          listView: 'Liste',
          gridView: 'Grille',
          search: 'Rechercher',
          details: 'Détails',
          detailsChecked: 'Oui',
          detailsUnchecked: 'Non',
          'Delete': 'Effacer',
          Rename: 'Renommer'
      },
      views: {
          nameField: 'Nom',
          sizeField: 'Taille',
          typeField: 'Type',
          dateModifiedField: 'Date de modification',
          dateCreatedField: 'Date de création',
          items: 'éléments'
      },
      dialogs: {
          upload: {
              title: 'Transférer des fichiers',
              clear: 'Vider',
              done: 'Terminé'
          },
          moveConfirm: {
              title: ' ',
              content: '<p style=\'text-align: center;\'>Voulez-vous déplacer les fichiers sélectionnés ou les copier?</p>',
              okText: 'Copier',
              cancel: 'Déplacer',
              close: 'Fermer'
          },
          deleteConfirm: {
              title: 'Confirmation de l\'effacement',
              content: '<p style=\'text-align: center;\'>Voulez-vous vraiment supprimer les fichiers sélectionnés?</br>Il n\'est pas possible d\'annuler cette opération.</p>',
              okText: 'Supprimer',
              cancel: 'Annuler',
              close: 'Fermer'
          },
          renamePrompt: {
              title: 'Renommer',
              content: '<p style=\'text-align: center;\'>Entrez un nouveau nom de fichier</p>',
              okText: 'Renommer',
              cancel: 'Annuler',
              close: 'Fermer'
          }
      },
      previewPane: {
          noFileSelected: 'Aucun fichier sélectionné',
          extension: 'Type',
          size: 'Taille',
          created: 'Date de création',
          createdUtc: 'Date de création (UTC)',
          modified: 'Date de modification',
          modifiedUtc: 'Date de modification (UTC)',
          items: 'éléments'
      }
  });
}
  /* Filter menu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
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
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "columns": "Colonnes",
        "sortAscending": "Tri croissant",
        "sortDescending": "Tri décroissant",
        "settings": "Paramètres de colonne",
        "done": "Terminé",
        "lock": "Bloquer",
        "unlock": "Ouvrir"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "daily": {
          "interval": "jour(s)",
          "repeatEvery": "Répéter chaque :"
        },
        "end": {
          "after": " Après",
          "occurrence": "occurrence(s)",
          "label": "Finir :",
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
          "repeatEvery": "Répéter chaque :",
          "repeatOn": "Répéter l'opération sur :"
        },
        "offsetPositions": {
          "first": "premier",
          "fourth": "quatrième",
          "last": "dernier",
          "second": "second",
          "third": "troisième"
        },
        "weekly": {
          "repeatEvery": "Répéter chaque :",
          "repeatOn": "Répéter l'opération sur :",
          "interval": "semaine(s)"
        },
        "yearly": {
          "of": "de",
          "repeatEvery": "Répéter chaque :",
          "repeatOn": "Répéter l'opération sur :",
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
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
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
          "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement ?",
          "cancelDelete": "Annuler",
          "confirmDelete": "Effacer"
        },
        "noRecords": "Aucun enregistrement disponible."
      });
  }
  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
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
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
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

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
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
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
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
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
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
        "logic": "Logique des filtres",
        "additionalOperator": "Opérateur supplémentaire",
        "additionalValue": "Valeur supplémentaire"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Choisir toutes",
        "clear": "Effacer filtre",
        "filter": "Filtrer",
        "search": "Recherche",
        "selectedItemsFormat": "{0} éléments(s) sélectionné(s)"
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
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
        "deleteFile": "Êtes-vous sûr de vouloir supprimer \"{0}\" ?",
        "directoryNotFound": "Un répertoire avec ce nom n'a pas été trouvé.",
        "emptyFolder": "Vider le dossier",
        "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers supportés sont {1}.",
        "orderBy": "Organiser par :",
        "orderByName": "Nom",
        "orderBySize": "Taille",
        "overwriteFile": "Un fichier avec le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous le remplacer ?",
        "uploadFile": "Télécharger",
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
        "linkText": "Text",
        "linkToolTip": "Info-bulle",
        "linkWebAddress": "Adresse Web",
        "search": "Search",
        "createTable": "Insérer un tableau",
        "addColumnLeft": "Ajouter colonne à gauche",
        "addColumnRight": "Ajouter colonne à droite",
        "addRowAbove": "Ajouter ligne au-dessus",
        "addRowBelow": "Ajouter ligne au-dessous",
        "deleteColumn": "Supprimer la colonne",
        "deleteRow": "Supprimer la ligne",
        "dropFilesHere": "Déposer des fichiers ici pour les télécharger",
        "formatting": "Formatage",
        "viewHtml": "Visualiser le HTML",
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
        "selectAllCells": "Sélectionner toutes les cellules"
      });
  }

  /* FileBrowser and ImageBrowser messages */

  var browserMessages = {
    "uploadFile": "Charger",
    "orderBy": "Trier par",
    "orderByName": "Nom",
    "orderBySize": "Taille",
    "directoryNotFound": "Aucun répértoire de ce nom.",
    "emptyFolder": "Répertoire vide",
    "deleteFile": 'Etes-vous sûr de vouloir supprimer "{0}"?',
    "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les type fichiers supportés sont {1}.",
    "overwriteFile": "Un fichier du nom \"{0}\" existe déjà dans ce répertoire. Voulez-vous le remplacer ?",
    "dropFilesHere": "glissez les fichiers ici pour les charger",
    "search": "Recherche"
  };

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, browserMessages);
  }

  if (kendo.ui.ImageBrowser) {
    kendo.ui.ImageBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
  }


  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "cancel": "Annuler",
        "dropFilesHere": "déposer les fichiers à télécharger ici",
        "remove": "Retirer",
        "retry": "Réessayer",
        "select": "Sélectionner...",
        "statusFailed": "échoué",
        "statusUploaded": "téléchargé",
        "statusUploading": "téléchargement",
        "uploadSelectedFiles": "Télécharger des fichiers",
        "headerStatusUploaded": "Terminé",
        "headerStatusUploading": "Transmission..."
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "toute la journée",
        "cancel": "Annuler",
        "editable": {
          "confirmation": "Etes-vous sûr de vouloir supprimer cet élément ?"
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
          "separateTimezones": "Utiliser des fuseaux horaires différents pour le début et la fin",//"Use separate start and end time zones",
          "start": "Début",
          "startTimezone": "Fuseau horaire de début",
          "timezone": " ",
          "timezoneEditorButton": "Fuseau horaire",
          "timezoneEditorTitle": "Fuseaux horaires",
          "title": "Titre",
          "noTimezone": "Pas de fuseau horaire"
        },
        "event": "Evènement",
        "recurrenceMessages": {
          "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série ?",
          "deleteWindowOccurrence": "Suppression de l'élément courant",
          "deleteWindowSeries": "Suppression de toute la série",
          "deleteWindowTitle": "Suppression d'un élément récurrent",
          "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série ?",
          "editWindowOccurrence": "Modifier l'occurrence courante",
          "editWindowSeries": "Modifier la série",
          "editWindowTitle": "Modification de l'élément courant"
        },
        "save": "Sauvegarder",
        "time": "Heure",
        "today": "Aujourd'hui",
        "views": {
          "agenda": "Agenda",
          "day": "Jour",
          "month": "Mois",
          "week": "Semaine",
          "workWeek": "Semaine de travail",
          "timeline": "Chronologie"
        },
        "deleteWindowTitle": "Suppression de l'élément",
        "showFullDay": "Montrer toute la journée",
        "showWorkDay": "Montrer les heures ouvrables"
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
        "allBorders": "Toutes les bordures",
        "insideBorders": "Bordures intérieures",
        "insideHorizontalBorders": "Bordures horizontales intérieures",
        "insideVerticalBorders": "Bordures verticales intérieures",
        "outsideBorders": "Bordures extérieures",
        "leftBorder": "Bordure gauche",
        "topBorder": "Bordure supérieure",
        "rightBorder": "Bordure droite",
        "bottomBorder": "Bordure inférieure",
        "noBorders": "Sans bordure",
        "reset": "Réinitialiser la couleur",
        "customColor": "Couleur personnalisée...",
        "apply": "Appliquer",
        "cancel": "Annuler"
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
    kendo.spreadsheet.messages.dialogs =
      $.extend(true, kendo.spreadsheet.messages.dialogs, {
        "apply": "Appliquer",
        "save": "Enregistrer les modifications",
        "cancel": "Annuler",
        "remove": "Retirer",
        "retry": "Réessayer",
        "revert": "Rétablir",
        "okText": "OK",
        "formatCellsDialog": {
          "title": "Format",
          "categories": {
            "number": "Nombre",
            "currency": "Devise",
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
          "title": "Alignment",
          "buttons": {
            "justtifyLeft": "Aligner à gauche",
            "justifyCenter": "Centrer",
            "justifyRight": "Aligner à droite",
            "justifyFull": "Justifier",
            "alignTop": "Aligner le haut",
            "alignMiddle": "Aligner le centre",
            "alignBottom": "Aligner le bas"
          }
        },
        "mergeDialog": {
          "title": "Fusionner les cellules",
          "buttons": {
            "mergeCells": "Fusionner tout",
            "mergeHorizontally": "Fusionner horizontalement",
            "mergeVertically": "Fusionner verticalement",
            "unmerge": "Annuler la fusion des cellules"
          }
        },
        "freezeDialog": {
          "title": "Figer les volets",
          "buttons": {
            "freezePanes": "Figer les volets",
            "freezeRows": "Figer les lignes",
            "freezeColumns": "Figer les colonnes",
            "unfreeze": "Libérer les volets"
          }
        },
        "confirmationDialog": {
          "text": "Êtes-vous sûr de vouloir supprimer cette feuille ?",
          "title": "Suppression de la feuille"
        },
        "validationDialog": {
          "title": "Validation des données",
          "hintMessage": "Veuillez entrer une valeur {0} valide {1}.",
          "hintTitle": "Validation {0}",
          "criteria": {
            "any": "Toute value",
            "number": "Nombre",
            "text": "Texte",
            "date": "Date",
            "custom": "Formule personnalisée",
            "list": "Liste"
          },
          "comparers": {
            "greaterThan": "supérieur(e) à",
            "lessThan": "inférieur(e) à",
            "between": "entre",
            "notBetween": "pas entre",
            "equalTo": "égal(e) à",
            "notEqualTo": "different(e) de",
            "greaterThanOrEqualTo": "supérieur(e) ou égal(e) à",
            "lessThanOrEqualTo": "inférieur(e) ou égal(e) à"
          },
          "comparerMessages": {
            "greaterThan": "supérieur(e) à {0}",
            "lessThan": "inférieur(e) à {0}",
            "between": "entre {0} et {1}",
            "notBetween": "pas entre {0} et {1}",
            "equalTo": "égal(e) à {0}",
            "notEqualTo": "different(e) de {0}",
            "greaterThanOrEqualTo": "supérieur(e) ou égal(e) à {0}",
            "lessThanOrEqualTo": "inférieur(e) ou égal(e) à {0}",
            "custom": "qui satisfait à la formule : {0}"
          },
          "labels": {
            "criteria": "Critère",
            "comparer": "Comparateur",
            "min": "Min",
            "max": "Max",
            "value": "Valeur",
            "start": "Début",
            "end": "Fin",
            "onInvalidData": "Sur les données invalides",
            "rejectInput": "Rejeter l'entrée",
            "showWarning": "Afficher l'avertissement",
            "showHint": "Afficher la note",
            "hintTitle": "Afficher le titre",
            "hintMessage": "Afficher le message",
            "ignoreBlank": "Ignorer l'espace vide",
            "showListButton": "Afficher le bouton pour montrer la liste",
            "showCalendarButton": "Afficher le bouton pour afficher le calendrier"
          },
          "placeholders": {
            "typeTitle": "Tapez le titre",
            "typeMessage": "Tapez le message"
          }
        },
        "exportAsDialog": {
          "title": "Exporter...",
          "defaultFileName": "Classeur",
          "xlsx": {
            "description": "Classeur Excel (.xlsx)"
          },
          "pdf": {
            "description": "Portable Document Format (.pdf)",
            "area": {
              "workbook": "Tout le classeur",
              "sheet": "Feilule active",
              "selection": "Sélection"
            },
            "paper": {
              "a2": "A2 (420 mm × 594 mm)",
              "a3": "A3 (297 mm x 420 mm)",
              "a4": "A4 (210 mm x 297 mm)",
              "a5": "A5 (148 mm x 210 mm)",
              "b3": "B3 (353 mm × 500 mm)",
              "b4": "B4 (250 mm x 353 mm)",
              "b5": "B5 (176 mm x 250 mm)",
              "folio": 'Folio (8.5" x 13")',
              "legal": 'Legal (8.5" x 14")',
              "letter": 'Letter (8.5" x 11")',
              "tabloid": 'Tabloid (11" x 17")',
              "executive": 'Executive (7.25" x 10.5")'
            },
            "margin": {
              "normal": "Normale",
              "narrow": "Etroite",
              "wide": "Large"
            }
          },
          "labels": {
            "scale": "Mettre à l'échelle",
            "fit": "Ajuster à la page",
            "fileName": "Nom du fichier",
            "saveAsType": "Enregistrer comme type",
            "exportArea": "Exporter",
            "paperSize": "Taille du papier",
            "margins": "Marges",
            "orientation": "Orientation",
            "print": "Imprimer",
            "guidelines": "Lignes directrices",
            "center": "Centrer",
            "horizontally": "Horizontalement",
            "vertically": "Verticalement"
          }
        },
        "modifyMergedDialog": {
          "errorMessage": "Impossible de modifier une partie d'une cellule fusionnée."
        },
        "rangeDisabledDialog": {
          "errorMessage": "La plage de destination contient des cellules désactivées."
        },
        "intersectsArrayDialog": {
          "errorMessage": "Vous ne pouvez pas modifier une partie d'un tableau"
        },
        "incompatibleRangesDialog": {
          "errorMessage": "Plages incompatibles"
        },
        "noFillDirectionDialog": {
          "errorMessage": "Impossible de déterminer la direction du remplissage"
        },
        "duplicateSheetNameDialog": {
          "errorMessage": "Nom de la feuille en double"
        },
        "overflowDialog": {
          "errorMessage": "Impossible de coller, car la zone de copie et la zone de collage n'ont pas la même taille et/ou forme."
        },
        "useKeyboardDialog": {
          "title": "Le copier/coller",
          "errorMessage": "Ces actions ne peuvent pas être invoquées via le menu. Veuillez utiliser les raccourcis clavier à la place :",
          "labels": {
            "forCopy": "pour copier",
            "forCut": "pour couper",
            "forPaste": "pour coller"
          }
        },
        "unsupportedSelectionDialog": {
          "errorMessage": "Cette action ne peut pas être effectuée sur une sélection multiple."
        },
        "linkDialog": {
          "title": "Lien hypertexte",
          "labels": {
            "text": "Texte",
            "url": "Adresse",
            "removeLink": "Supprimer le lien"
          }
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
          "info": "Faites glisser une image ici, ou cliquez pour la sélectionner",
          "typeError": "Veuillez sélectionner une image JPEG, PNG ou GIF."
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
    kendo.spreadsheet.messages.filterMenu =
      $.extend(true, kendo.spreadsheet.messages.filterMenu, {
        "sortAscending": "Trier de A à Z",
        "sortDescending": "Trier de Z à A",
        "filterByValue": "Filtrer par valeur",
        "filterByCondition": "Filtrer par condition",
        "apply": "Appliquer",
        "search": "Recherche",
        "addToCurrent": "Ajouter à la sélection en cours",
        "clear": "Effacer",
        "blanks": "(Blanks)",
        "operatorNone": "None",
        "and": "AND",
        "or": "OR",
        "operators": {
          "string": {
            "contains": "Le texte contient",
            "doesnotcontain": "Le texte ne contient pas",
            "startswith": "Le texte commence par",
            "endswith": "Le texte se termine par"
          },
          "date": {
            "eq": "La date est",
            "neq": "La date est différente de",
            "lt": "La date est antérieure à",
            "gt": "La date est postérieure à"
          },
          "number": {
            "eq": "Est égal à",
            "neq": "Est different de",
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
      $.extend(true, kendo.spreadsheet.messages.colorPicker, {
        "reset": "Réinitialiser la couleur",
        "customColor": "Couleur personnalisée...",
        "apply": "Appliquer",
        "cancel": "Annuler"
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
    kendo.spreadsheet.messages.toolbar =
      $.extend(true, kendo.spreadsheet.messages.toolbar, {
        "addColumnLeft": "Ajouter une colonne à gauche",
        "addColumnRight": "Ajouter une colonne à droite",
        "addRowAbove": "Ajouter une ligne au-dessus",
        "addRowBelow": "Ajouter une rangée en dessous",
        "alignment": "Alignement",
        "alignmentButtons": {
          "justtifyLeft": "Aligner à gauche",
          "justifyCenter": "Centrer",
          "justifyRight": "Aligner à droite",
          "justifyFull": "Justifier",
          "alignTop": "Aligner le haut",
          "alignMiddle": "Aligner le centre",
          "alignBottom": "Aligner le bas"
        },
        "backgroundColor": "Couleur de fond",
        "bold": "Gras",
        "borders": "Bordures",
        "colorPicker": {
          "reset": "Réinitialiser la couleur",
          "customColor": "Couleur personnalisée..."
        },
        "copy": "Copier",
        "cut": "Couper",
        "deleteColumn": "Supprimer la colonne",
        "deleteRow": "Supprimer la ligne",
        "excelImport": "Importer d'Excel...",
        "filter": "Filtrer",
        "fontFamily": "Police",
        "fontSize": "Taille de la police",
        "format": "Format personnalisé...",
        "formatTypes": {
          "automatic": "Automatique",
          "number": "Nombre",
          "percent": "Pourcentage",
          "financial": "Financier",
          "currency": "Devise",
          "date": "Date",
          "time": "Temps",
          "dateTime": "Date et heure",
          "duration": "Durée",
          "moreFormats": "Plus de formats..."
        },
        "formatDecreaseDecimal": "Moins de décimales",
        "formatIncreaseDecimal": "Plus de décimales",
        "freeze": "Figer les volets",
        "freezeButtons": {
          "freezePanes": "Figer les volets",
          "freezeRows": "Figer les lignes",
          "freezeColumns": "Figer les colonnes",
          "unfreeze": "Libérer les volets"
        },
        "insertComment": "Ajouter un commentaire",
        "insertImage": "Ajouter une image",
        "italic": "Italique",
        "merge": "Fusionner les cellules",
        "mergeButtons": {
          "mergeCells": "Fusionner tout",
          "mergeHorizontally": "Fusionner horizontalement",
          "mergeVertically": "Fusionner verticalement",
          "unmerge": "Annuler la fusion des cellules"
        },
        "open": "Ouvrir...",
        "paste": "Coller",
        "quickAccess": {
          "redo": "Refaire",
          "undo": "Annuler"
        },
        "saveAs": "Enregistrer sous...",
        "sortAsc": "Trier en ordre croissant",
        "sortDesc": "Tri décroissant",
        "sortButtons": {
          "sortSheetAsc": "Trier la feuille de A à Z",
          "sortSheetDesc": "Trier la feuille de Z à A",
          "sortRangeAsc": "Trier la plage de A à Z",
          "sortRangeDesc": "Trier la plage de Z à A"
        },
        "textColor": "Couleur du texte",
        "textWrap": "Retour du texte à la ligne",
        "underline": "Souligner",
        "validation": "Validation des données..."
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
    kendo.spreadsheet.messages.view =
      $.extend(true, kendo.spreadsheet.messages.view, {
        "errors": {
          "shiftingNonblankCells": "Impossible d'insérer des cellules en raison d'une possibilité de perte de données. Sélectionnez un autre emplacement d'insertion ou supprimez les données à la fin de votre feuille de calcul.",
          "filterRangeContainingMerges": "Impossible de créer un filtre dans une plage contenant des fusions",
          "validationError": "La valeur que vous avez saisie enfreint les règles de validation définies pour la cellule."
        },
        "tabs": {
          "home": "Home",
          "insert": "Insertion",
          "data": "Données"
        }
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
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
      $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
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

  /* Numeric text box messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Augmenter la valeur",
        "downArrowText": "Diminuer la valeur"
      });
  }

})(window.kendo.jQuery);
