(function($, undefined) {

  /* FilterCell operators */

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
    kendo.ui.FileManager.prototype.options.messages =
      $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
        "toolbar": {
          "createFolder": "Nouveau dossier",
          "upload": "Téléverser",
          "sortDirection": "Ordre de tri",
          "sortDirectionAsc": "Croissant",
          "sortDirectionDesc": "Décroissant",
          "sortField": "Champ de tri",
          "nameField": "Nom",
          "sizeField": "Taille",
          "typeField": "Type",
          "dateModifiedField": "Date de modification",
          "dateCreatedField": "Date de création",
          "listView": "Liste",
          "gridView": "Grille",
          "search": "Rechercher",
          "details": "Détails",
          "detailsChecked": "Oui",
          "detailsUnchecked": "Non",
          "Delete": "Effacer",
          "Rename": "Renommer"
        },
        "views": {
          "nameField": "Nom",
          "sizeField": "Taille",
          "typeField": "Type",
          "dateModifiedField": "Date de modification",
          "dateCreatedField": "Date de création",
          "items": "éléments",
          "listLabel": "FileManager Liste",
          "gridLabel": "FileManager Grille",
          "treeLabel": "FileManager Arborescence"
        },
        "dialogs": {
          "upload": {
            "title": "Transférer des fichiers",
            "clear": "Vider",
            "done": "Terminé"
          },
          "moveConfirm": {
            "title": " ",
            "content": "<p class='k-text-center'>Voulez-vous déplacer les fichiers sélectionnés ou les copier?</p>",
            "okText": "Copier",
            "cancel": "Déplacer",
            "close": "Fermer"
          },
          "deleteConfirm": {
            "title": "Confirmation de l'effacement",
            "content": "<p class='k-text-center'>Voulez-vous vraiment supprimer les fichiers sélectionnés?<br/>Il n'est pas possible d'annuler cette opération.</p>",
            "okText": "Supprimer",
            "cancel": "Annuler",
            "close": "Fermer"
          },
          "renamePrompt": {
            "title": "Renommer",
            "content": "<p class='k-text-center'>Entrez un nouveau nom de fichier</p>",
            "okText": "Renommer",
            "cancel": "Annuler",
            "close": "Fermer"
          }
        },
        "previewPane": {
          "noFileSelected": "Aucun fichier sélectionné",
          "extension": "Type",
          "size": "Taille",
          "created": "Date de création",
          "createdUtc": "Date de création (UTC)",
          "modified": "Date de modification",
          "modifiedUtc": "Date de modification (UTC)",
          "items": "éléments"
        }
      });
  }

  /* FilterMenu operator messages */

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
        "sortAscending": "Tri croissant",
        "sortDescending": "Tri décroissant",
        "filter": "Filtrer",
        "column": "Colonne",
        "columns": "Colonnes",
        "columnVisibility": "Visibilité de la colonne",
        "clear": "Vider",
        "cancel": "Cancel",
        "done": "Terminé",
        "settings": "Paramètres de colonne",
        "lock": "Bloquer",
        "unlock": "Ouvrir",
        "stick": "Figer la colonne",
        "unstick": "Libérer la colonne",
        "setColumnPosition": "Définir la position de la colonne",
        "apply": "Appliquer",
        "reset": "Réinitialiser",
        "buttonTitle": "Modifier les paramètres de la colonne {0}",
        "movePrev": "Précédent",
        "moveNext": "Suivant",
        "groupColumn": "Grouper la colonne",
        "clearAllFilters": "Effacer tous les filtres",
        "ungroupColumn": "Dissocier la colonne"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "repeat": "Répéter",
        "recurrenceEditorTitle": "Éditeur de récurrence",
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
          "hourly": "Une fois par heure",
          "monthly": "Une fois par mois",
          "never": "Jamais",
          "weekly": "Une fois par semaine",
          "yearly": "Une fois par an"
        },
        "hourly": {
          "repeatEvery": "Répéter chaque :",
          "interval": " heure(s)"
        },
        "monthly": {
          "day": "Jour",
          "date": "Date",
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
          "interval": "année(ans)",
          "month": "mois",
          "day": "jour",
          "date": "Date"
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
        "noRecords": "Aucun enregistrement disponible.",
        "loader": {
          "loading": "Chargement...",
          "exporting": "Exportation..."
        },
        "commands": {
          "cancel": "Annuler les modifications",
          "canceledit": "Annuler",
          "create": "Insérer",
          "destroy": "Effacer",
          "edit": "Éditer",
          "excel": "Export vers Excel",
          "pdf": "Export en PDF",
          "save": "Enregistrer les modifications",
          "select": "Sélectionner",
          "update": "Mettre à jour",
          "search": "Rechercher...",
          "selectRow": "Sélectionner la ligne",
          "selectAllRows": "Toutes les lignes",
          "clearSelection": "Annuler la sélection",
          "copySelection": "Copier la sélection",
          "copySelectionNoHeaders": "Copier la sélection (Sans les en-têtes)",
          "reorderRow": "Repositionner la ligne",
          "reorderRowUp": "Haut",
          "reorderRowDown": "Bas",
          "reorderRowTop": "Première",
          "reorderRowBottom": "Dernière",
          "exportPdf": "Exporter vers PDF",
          "exportExcel": "Exporter vers Excel",
          "exportToExcelAll": "Tout",
          "exportToExcelSelection": "Sélection",
          "exportToExcelSelectionNoHeaders": "Sélection (Sans les en-têtes)",
          "sortAsc": "Trier de A à Z",
          "sortDesc": "Trier de Z à A",
          "moveGroupPrevious": "Précédent",
          "moveGroupNext": "Suivant",
          "columns": "Colonnes",
          "selectall": "Tout sélectionner"
        },
        "details": {
          "expand": "Développer",
          "collapse": "Réduire"
        },
        "expandCollapseColumnHeader": "",
        "groupHeader": "Appuyer sur ctrl + espace pour grouper",
        "ungroupHeader": "Appuyer sur ctrl + espace pour dissocier",
        "toolbarLabel": "Barre d'outils",
        "groupingHeaderLabel": "En-tête du groupe",
        "filterCellTitle": "Filtre de la cellule",
        "clearButtons": {
          "clearFiltering": "Effacer tous les filtres",
          "clearSorting": "Effacer le tri",
          "clearGrouping": "Effacer le groupement",
          "columnChooserReset": "Réinitialiser"
        },
        "applyButtons": {
          "applyGrouping": "Terminé",
          "applySorting": "Terminé",
          "columnChooserApply": "Appliquer"
        },
        "ai": {
          "outputPlaceholder": "Aucune sortie IA disponible",
          "success": "Les données sont :",
          "error": "L'opération n'a pas réussi. Erreur :",
          "invalidSelection": "Ce mode de sélection n'est pas actuellement activé...",
          "promptPlaceholder": "Entrez votre requête IA ici..."
        },
        "editable": {
          "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
          "cancelDelete": "Annuler",
          "confirmDelete": "Effacer"
        }
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
        "morePages": "Plusieurs pages",
        "pageButtonLabel": "Page {0}",
        "pageSizeDropDownLabel": "Menu déroulant des tailles de page"
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

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "Afficher les éléments dont la valeur :",
        "filterFields": ">Filtre de champs",
        "filter": "Filtre",
        "include": "Inclure les champs...",
        "title": "Champs à inclure",
        "clear": "Dégager",
        "ok": "Ok",
        "cancel": "Annuler",
        "operators": {
          "contains": "Contains",
          "doesnotcontain": "Does not contain",
          "startswith": "Starts with",
          "endswith": "Ends with",
          "eq": "Is equal to",
          "neq": "Is not equal to"
        }
      });
  }

  /* PivotGrid messages */

  if (kendo.ui.PivotGrid) {
    kendo.ui.PivotGrid.prototype.options.messages =
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "Déposez les champs de données ici",
        "columnFields": "Déposez les champs de colonne ici",
        "rowFields": "Déposez les champs de lignes ici"
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
        "additionalValue": "Valeur supplémentaire",
        "done": "Terminé",
        "into": "dans",
        "buttonTitle": "{0} paramètres de filtre de colonne"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Choisir toutes",
        "clearAll": "Tout effacer",
        "clear": "Effacer filtre",
        "filter": "Filtrer",
        "search": "Recherche",
        "cancel": "Annuler",
        "done": "Terminé",
        "into": "dans",
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
        "cleanFormatting": "Effacer la mise en forme",
        "print": "Imprimer",
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
        "auto": "Auto",
        "style": "Styles",
        "overflowAnchor": "Plus d'outils",
        "fileWebAddress": "Adresse Web",
        "fileTitle": "Titre",
        "tableBackground": "Fond de tableau",
        "tableCellProperties": "Propriétés de la cellule",
        "tableProperties": "Propriétés du tableau",
        "captionAlignment": "Alignement du sous-titre",
        "units": "Unités",
        "borderColor": "Couleur de bordure",
        "borderWidth": "Largeur de bordure",
        "fitToCell": "Ajuster à la cellule",
        "applyToColumn": "appliquer à la colonne",
        "applyToRow": "appliquer à la ligne",
        "headerRows": "Lignes d'en-tête",
        "headerColumns": "Colonnes d'en-tête",
        "tableSummaryPlaceholder": "L'attribut résumé n'est pas compatible HTML5.",
        "associateNone": "Aucun",
        "associateScope": "Associer avec l'attribut 'scope'",
        "associateIds": "Associer avec des IDs",
        "copyFormat": "Copier le format",
        "applyFormat": "Appliquer le format",
        "borderNone": "Aucun",
        "undo": "Annuler",
        "redo": "Refaire"
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

  /* FileBrowser messages */

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
        "headerStatusUploading": "Transmission...",
        "headerStatusPaused": "En pause",
        "statusWarning": "avertissement",
        "clearSelectedFiles": "Effacer",
        "uploadSuccess": "Fichier(s) téléchargé(s) avec succès.",
        "uploadFail": "Échec du téléchargement du/des fichier(s).",
        "invalidMaxFileSize": "La taille du fichier est trop grande.",
        "invalidMinFileSize": "La taille du fichier est trop petite.",
        "invalidFileExtension": "Type de fichier non autorisé."
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "toute la journée",
        "cancel": "Annuler",
        "editable": {
          "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?"
        },
        "date": "Date",
        "destroy": "Effacer",
        "event": "Evènement",
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
        "showWorkDay": "Montrer les heures ouvrables",
        "ariaSlotLabel": "Sélectionné de {0:t} à {1:t}",
        "ariaEventLabel": "{0} le {1:D} à {2:t}",
        "resetSeries": "Réinitialiser la série",
        "refresh": "Actualiser",
        "selectView": "Sélectionner la vue",
        "recurrenceMessages": {
          "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
          "deleteWindowOccurrence": "Suppression de l'élément courant",
          "deleteWindowSeries": "Suppression de toute la série",
          "deleteWindowTitle": "Suppression d'un élément récurrent",
          "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
          "editWindowOccurrence": "Modifier l'occurrence courante",
          "editWindowSeries": "Modifier la série",
          "editWindowTitle": "Modification de l'élément courant",
          "resetSeriesWindowTitle": "Réinitialiser la série",
          "deleteRecurringConfirmation": "Êtes-vous sûr de vouloir supprimer cette occurrence de l'événement ?",
          "deleteSeriesConfirmation": "Êtes-vous sûr de vouloir supprimer toute la série ?"
        },
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
          "timezoneTitle": "Fuseaux horaires",
          "title": "Titre",
          "noTimezone": "Pas de fuseau horaire"
        },
        "search": "Rechercher..."
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
    kendo.ui.Dialog.prototype.options.localization =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Fermer"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.localization =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.localization =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Annuler"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.localization =
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

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
      $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
        "contrastRatio": "Rapport de contraste :",
        "fail": "Échec",
        "pass": "Réussi",
        "hex": "HEX",
        "toggleFormat": "Basculer le format",
        "red": "Rouge",
        "green": "Vert",
        "blue": "Bleu",
        "alpha": "Alpha"
      });
  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
        "startLabel": "Début",
        "endLabel": "Fin"
      });
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Ajouter un enfant",
          "append": "Ajouter une tâche",
          "insertAfter": "Insérer après",
          "insertBefore": "Insérer avant",
          "pdf": "Exporter vers PDF"
        },
        "cancel": "Annuler",
        "deleteDependencyWindowTitle": "Supprimer la dépendance",
        "deleteTaskWindowTitle": "Supprimer la tâche",
        "destroy": "Supprimer",
        "editor": {
          "assingButton": "Assigner",
          "editorTitle": "Tâche",
          "end": "Fin",
          "plannedStart": "Début prévu",
          "plannedEnd": "Fin prévue",
          "percentComplete": "Terminé",
          "percentCompleteHint": "valeur de 0 à 1",
          "resources": "Ressources",
          "resourcesEditorTitle": "Ressources",
          "resourcesHeader": "Ressources",
          "start": "Début",
          "title": "Titre",
          "unitsHeader": "Unités",
          "parent": "Parent",
          "addNew": "Ajouter",
          "name": "Nom",
          "remove": "Supprimer",
          "actualStart": "Début réel",
          "actualEnd": "Fin réelle",
          "parentOptionLabel": "-Aucun-",
          "general": "Général",
          "predecessors": "Prédécesseurs",
          "successors": "Successeurs",
          "other": "Autre",
          "dependencyType": "Type"
        },
        "save": "Enregistrer",
        "selectView": "Sélectionner la vue",
        "plannedTasks": {
          "switchText": "Tâches prévues",
          "offsetTooltipAdvanced": "Date limite atteinte en avance",
          "offsetTooltipDelay": "Retard",
          "seconds": "secondes",
          "minutes": "minutes",
          "hours": "heures",
          "days": "jours"
        },
        "views": {
          "day": "Jour",
          "end": "Fin",
          "month": "Mois",
          "start": "Début",
          "week": "Semaine",
          "year": "Année"
        }
      });
  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {
    kendo.ui.TaskBoard.prototype.options.messages =
      $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
        "edit": "Modifier",
        "createNewCard": "Créer une nouvelle carte",
        "create": "Créer",
        "search": "Rechercher",
        "previewCard": "Aperçu de la carte",
        "addCard": "Ajouter une carte",
        "editCard": "Modifier la carte",
        "deleteCard": "Supprimer la carte",
        "addColumn": "Ajouter une colonne",
        "editColumn": "Modifier la colonne",
        "deleteColumn": "Supprimer la colonne",
        "close": "Fermer",
        "cancel": "Annuler",
        "delete": "Supprimer",
        "saveChanges": "Enregistrer les modifications",
        "title": "Titre :",
        "description": "Description :",
        "newColumn": "Nouvelle colonne",
        "deleteColumnConfirm": "Êtes-vous sûr de vouloir supprimer cette colonne ?",
        "deleteCardConfirm": "Êtes-vous sûr de vouloir supprimer cette carte ?"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Pause",
        "play": "Lecture",
        "mute": "Muet",
        "unmute": "Son",
        "quality": "Qualité",
        "fullscreen": "Plein écran"
      });
  }

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "Augmenter",
        "decreaseButtonTitle": "Diminuer"
      });
  }

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "Chargement...",
        "requestFailed": "La requête a échoué.",
        "retry": "Réessayer"
      });
  }

  /* DateInput messages */

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
      $.extend(true, kendo.ui.List.prototype.options.messages, {
        "clear": "effacer",
        "noData": "Aucune donnée trouvée.",
        "filterInputPlaceholder": "Filtrer"
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
      $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
        "singleTag": "élément(s) sélectionné(s)",
        "clear": "effacer",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée.",
        "filterInputPlaceholder": "Filtrer"
      });
  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
      $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
        "singleTag": "élément(s) sélectionné(s)",
        "clear": "effacer",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée.",
        "downArrow": "sélectionner"
      });
  }

  /* Chat messages */

  if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
      $.extend(true, kendo.ui.Chat.prototype.options.messages, {
        "messageListLabel": "Liste des messages",
        "placeholder": "Saisissez un message...",
        "toggleButton": "Basculer la barre d'outils",
        "sendButton": "Envoyer un message"
      });
  }

  /* TimePicker messages */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Définir",
        "cancel": "Annuler",
        "hour": "heure",
        "minute": "minute",
        "second": "seconde",
        "millisecond": "milliseconde",
        "now": "Maintenant"
      });
  }

  /* DateTimePicker messages */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Définir",
        "cancel": "Annuler",
        "hour": "heure",
        "minute": "minute",
        "second": "seconde",
        "millisecond": "milliseconde",
        "now": "Maintenant",
        "date": "Date",
        "time": "Heure",
        "today": "Aujourd'hui",
        "weekColumnHeader": ""
      });
  }

  /* Calendar messages */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "today": "Aujourd'hui",
        "weekColumnHeader": "",
        "navigateTo": "Naviguer vers ",
        "parentViews": {
          "month": "vue annuelle",
          "year": "vue décennale",
          "decade": "vue séculaire"
        }
      });
  }

  /* kendo.ui.progress method */

  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        "loading": "Chargement..."
      });
  }

  /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
        "cancel": "Annuler",
        "update": "Enregistrer",
        "endTitle": "Fin de la répétition",
        "repeatTitle": "Modèle de répétition",
        "headerTitle": "Répéter l'événement",
        "end": {
          "patterns": {
            "never": "Jamais",
            "after": "Après...",
            "on": "Le..."
          },
          "never": "Jamais",
          "after": "Terminer la répétition après",
          "on": "Terminer la répétition le"
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
          "repeatBy": "Répéter par : ",
          "dayOfMonth": "Jour du mois",
          "dayOfWeek": "Jour de la semaine",
          "repeatEvery": "Répéter chaque",
          "every": "Chaque",
          "day": "Jour "
        },
        "yearly": {
          "interval": "",
          "repeatBy": "Répéter par : ",
          "dayOfMonth": "Jour du mois",
          "dayOfWeek": "Jour de la semaine",
          "repeatEvery": "Répéter chaque : ",
          "every": "Chaque",
          "month": "Mois",
          "day": "Jour"
        }
      });
  }

  /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
        "title": "Configuration",
        "cancelButtonText": "Annuler",
        "applyButtonText": "Appliquer",
        "measures": "Sélectionnez des champs pour commencer",
        "columns": "Sélectionnez des champs pour commencer",
        "rows": "Sélectionnez des champs pour commencer"
      });
  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
        "apply": "Appliquer",
        "sortAscending": "Tri croissant",
        "sortDescending": "Tri décroissant",
        "filterFields": "Filtre de champs",
        "filter": "Filtrer",
        "include": "Inclure les champs...",
        "clear": "Effacer",
        "reset": "Réinitialiser",
        "moveToColumns": "Déplacer vers les colonnes",
        "moveToRows": "Déplacer vers les lignes",
        "movePrevious": "Déplacer précédent",
        "moveNext": "Déplacer suivant",
        "filterOperatorsDropDownLabel": "Opérateurs de filtre de région",
        "filterValueTextBoxLabel": "Valeur de filtre de région",
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

  /* Wizard messages */

  if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
      $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
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
        "defaultFileName": "Document",
        "toolbar": {
          "zoom": {
            "zoomLevel": "niveau de zoom",
            "zoomOut": "Dézoomer",
            "zoomIn": "Zoomer",
            "actualWidth": "Largeur réelle",
            "autoWidth": "Largeur automatique",
            "fitToWidth": "Ajuster à la largeur",
            "fitToPage": "Ajuster à la page"
          },
          "open": "Ouvrir",
          "exportAs": "Exporter",
          "download": "Télécharger",
          "pager": {
            "first": "Aller à la première page",
            "previous": "Aller à la page précédente",
            "next": "Aller à la page suivante",
            "last": "Aller à la dernière page",
            "of": "de",
            "page": "page",
            "pages": "pages"
          },
          "print": "Imprimer",
          "toggleSelection": "Activer la sélection",
          "togglePan": "Activer le défilement",
          "search": "Rechercher"
        },
        "errorMessages": {
          "notSupported": "Seuls les fichiers PDF sont autorisés.",
          "parseError": "Erreur lors du traitement du fichier PDF.",
          "notFound": "Fichier non trouvé.",
          "popupBlocked": "La fenêtre contextuelle a été bloquée."
        },
        "dialogs": {
          "exportAsDialog": {
            "title": "Exporter...",
            "defaultFileName": "Document",
            "pdf": "Portable Document Format (.pdf)",
            "png": "Portable Network Graphics (.png)",
            "svg": "Scalable Vector Graphics (.svg)",
            "labels": {
              "fileName": "Nom du fichier",
              "saveAsType": "Enregistrer sous",
              "page": "Page"
            }
          },
          "okText": "OK",
          "save": "Enregistrer",
          "cancel": "Annuler",
          "search": {
            "inputLabel": "Texte de recherche",
            "matchCase": "Respecter la casse",
            "next": "Correspondance suivante",
            "previous": "Correspondance précédente",
            "close": "Fermer",
            "of": "de",
            "dragHandle": "Déplacer la recherche"
          }
        }
      });
  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
      $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
        "label": "Organigramme",
        "edit": "Modifier",
        "create": "Créer",
        "destroy": "Supprimer",
        "destroyContent": "Êtes-vous sûr de vouloir supprimer cet élément et tous ses enfants ?",
        "destroyTitle": "Supprimer l'élément",
        "cancel": "Annuler",
        "save": "Enregistrer",
        "menuLabel": "Menu d'édition",
        "uploadAvatar": "Télécharger un nouvel avatar",
        "parent": "Parent",
        "name": "Nom",
        "title": "Titre",
        "none": "--Aucun--",
        "expand": "développer",
        "collapse": "réduire"
      });
  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
      $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
        "reset": "Réinitialiser le captcha",
        "audio": "Lire le captcha",
        "imageAlt": "Tapez le code Captcha de l'image",
        "success": "Vérification réussie"
      });
  }

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Aucune recherche précédente",
        "noPreviousPrompts": "Aucune requête précédente",
        "previousSearches": "Recherches précédentes",
        "previousPrompts": "Requêtes précédentes",
        "suggestedPrompts": "Requêtes suggérées",
        "searchModeLabel": "Rechercher",
        "searchModeDescription": "Recherche des correspondances exactes de mots dans vos données",
        "searchPlaceholder": "Rechercher",
        "semanticSearchModeLabel": "Recherche sémantique",
        "semanticSearchModeDescription": "Comprend le contexte pour afficher les résultats les plus pertinents.",
        "semanticSearchPlaceholder": "Recherche sémantique",
        "semanticSearchButtonText": "Rechercher",
        "aiAssistantPlaceholder": "Trier, filtrer ou grouper avec l'IA",
        "speechToText": "Voix en texte",
        "speechToTextAriaLabel": "Démarrer la reconnaissance vocale",
        "cancel": "Annuler",
        "send": "Envoyer",
        "searchButtonText": "Rechercher",
        "aiAssistantButtonText": "Assistant IA"
      });
  }

  /* ChartWizard messages */

  if (kendo.ui.ChartWizard) {
    kendo.ui.ChartWizard.prototype.options.messages =
      $.extend(true, kendo.ui.ChartWizard.prototype.options.messages, {
        "window": {
          "title": "Aperçu du graphique"
        },
        "export": "Exporter",
        "exportPDF": "Fichier PDF",
        "exportSVG": "Fichier SVG",
        "exportPNG": "Fichier PNG",
        "tab": {
          "chart": "Graphique",
          "data": "Données",
          "format": "Format"
        },
        "chart": {
          "bar": {
            "expandText": "Graphique à barres",
            "bar": "Barres",
            "stackedBar": "Barres empilées",
            "hundredStackedBar": "100% Barres empilées"
          },
          "pie": {
            "expandText": "Graphique circulaire",
            "pie": "Circulaire"
          },
          "column": {
            "expandText": "Graphique en colonnes",
            "column": "Colonnes",
            "stackedColumn": "Colonnes empilées",
            "hundredStackedColumn": "100% Colonnes empilées"
          },
          "line": {
            "expandText": "Graphique en lignes",
            "line": "Lignes",
            "stackedLine": "Lignes empilées",
            "hundredStackedLine": "100% Lignes empilées"
          },
          "scatter": {
            "expandText": "Graphique de dispersion",
            "scatter": "Dispersion"
          }
        },
        "data": {
          "configuration": {
            "expandText": "Configuration",
            "series": {
              "title": "Série",
              "add": "Ajouter"
            },
            "valueAxis": "Axe des valeurs",
            "categoryAxis": "Axe des catégories",
            "xAxis": "Axe X"
          }
        },
        "format": {
          "chartArea": {
            "expandText": "Zone du graphique",
            "margins": {
              "default": "Marges",
              "auto": "Auto",
              "left": "Gauche",
              "right": "Droite",
              "top": "Haut",
              "bottom": "Bas"
            },
            "background": {
              "default": "Fond",
              "color": "Couleur"
            }
          },
          "title": {
            "expandText": "Titre",
            "applyTo": "Appliquer à",
            "chartTitle": "Titre du graphique",
            "chartSubtitle": "Sous-titre du graphique",
            "label": "Titre",
            "font": "Police",
            "fontPlaceholder": "(police héritée)",
            "size": "Taille",
            "sizePlaceholder": "px",
            "color": "Couleur"
          },
          "series": {
            "expandText": "Série",
            "applyTo": "Appliquer à",
            "allSeries": "Toutes les séries",
            "color": "Couleur",
            "showLabels": "Afficher les étiquettes"
          },
          "legend": {
            "expandText": "Légende",
            "showLegend": "Afficher la légende",
            "font": "Police",
            "fontPlaceholder": "(police héritée)",
            "size": "Taille",
            "sizePlaceholder": "px",
            "color": "Couleur",
            "position": {
              "default": "Position",
              "top": "Haut",
              "bottom": "Bas",
              "left": "Gauche",
              "right": "Droite"
            }
          },
          "categoryAxis": {
            "expandText": "Axe des catégories",
            "title": {
              "text": "Titre",
              "placeholder": "Titre de l'axe",
              "font": "Police",
              "fontPlaceholder": "(police héritée)",
              "size": "Taille",
              "sizePlaceholder": "px",
              "color": "Couleur"
            },
            "labels": {
              "text": "Étiquettes",
              "font": "Police",
              "fontPlaceholder": "(police héritée)",
              "size": "Taille",
              "sizePlaceholder": "px",
              "color": "Couleur",
              "rotation": {
                "text": "Rotation",
                "auto": "Auto"
              },
              "reverseOrder": "Ordre inversé"
            }
          },
          "valueAxis": {
            "expandText": "Axe des valeurs",
            "title": {
              "text": "Titre",
              "placeholder": "Titre de l'axe",
              "font": "Police",
              "fontPlaceholder": "(police héritée)",
              "size": "Taille",
              "sizePlaceholder": "px",
              "color": "Couleur"
            },
            "labels": {
              "text": "Étiquettes",
              "labelFormat": {
                "default": "Format d'étiquette",
                "text": "Texte",
                "number": "Nombre",
                "currency": "Devise",
                "percent": "Pourcentage"
              },
              "font": "Police",
              "fontPlaceholder": "(police héritée)",
              "size": "Taille",
              "sizePlaceholder": "px",
              "color": "Couleur",
              "rotation": {
                "text": "Rotation",
                "auto": "Auto"
              }
            }
          },
          "xAxis": {
            "expandText": "Axe X"
          },
          "yAxis": {
            "expandText": "Axe Y"
          }
        }
      });
  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Titre de la carte"
      });
  }

  /* Sankey messages */

  if (kendo.dataviz.ui.Sankey) {
    kendo.dataviz.ui.Sankey.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
        "tooltipUnits": "{0} Unités"
      });
  }

  /* Chart messages */

  if (kendo.dataviz.ui.Chart) {
    kendo.dataviz.ui.Chart.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
        "noData": "Aucune donnée disponible"
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

  /* TimePicker */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Définir",
        "cancel": "Annuler",
        "hour": "heure",
        "minute": "minute",
        "second": "seconde",
        "millisecond": "milliseconde",
        "now": "Maintenant"
      });
  }

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Définir",
        "cancel": "Annuler",
        "hour": "heure",
        "minute": "minute",
        "second": "seconde",
        "millisecond": "milliseconde",
        "now": "Maintenant",
        "date": "Date",
        "time": "Heure",
        "today": "Aujourd'hui",
        "weekColumnHeader": ""
      });
  }

  /* Calendar */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "weekColumnHeader": "",
        "today": "Aujourd'hui",
        "navigateTo": "Naviguer vers : ",
        "parentViews": {
          "month": "Vue annuelle",
          "year": "Vue décennale",
          "decade": "Vue séculaire"
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
        "weekday": "jour de la semaine",
        "hour": "heures",
        "minute": "minutes",
        "second": "secondes",
        "dayperiod": "AM/PM"
      });
  }

})(window.kendo.jQuery);