(function ($, undefined) {

   /* ColorGradient messages */

   if (kendo.ui.ColorGradient) {
      kendo.ui.ColorGradient.prototype.options.messages =
         $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Contraste:",
            "fail": "Echec",
            "pass": "Valide",
            "hex": "HEX",
            "toggleFormat": "Basculer le format",
            "red": "Rouge",
            "green": "Vert",
            "blue": "Bleu",
            "alpha": "Alpha"
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

   /* ColumnMenu messages */

   if (kendo.ui.ColumnMenu) {
      kendo.ui.ColumnMenu.prototype.options.messages =
         $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
            "sortAscending": "Tri croissant",
            "sortDescending": "Tri décroissant",
            "filter": "Filtre",
            "column": "Colonne",
            "columns": "Colonnes",
            "columnVisibility": "Visibilité de la colonne",
            "clear": "Effacer",
            "cancel": "Annuler",
            "done": "Terminé",
            "settings": "Paramètres de colonne",
            "lock": "Bloquer",
            "unlock": "Ouvrir",
            "stick": "Figer colonne",
            "unstick": "Libérer colonne",
            "setColumnPosition": "Définir position de la colonne",
            "apply": "Appliquer",
            "reset": "Initialiser",
            "buttonTitle": "{0} Éditer paramètres colonne"
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

   /* Editor messages */

   if (kendo.ui.Editor) {
      kendo.ui.Editor.prototype.options.messages =
         $.extend(true, kendo.ui.Editor.prototype.options.messages, {
            "bold": "Gras",
            "italic": "Italique",
            "search": "Rechercher",
            "dropFilesHere": "déposer les fichiers ici",
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
            "insertFile": "Insérer un fichier",
            "insertHtml": "Insérer HTML",
            "viewHtml": "Voire le HTML",
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
            "dialogButtonSeparator": "Ou",
            "dialogCancel": "Annuler",
            "cleanFormatting": "Retirer le format",
            "createTable": "Insérer un tableau",
            "addColumnLeft": "Ajouter colonne à gauche",
            "addColumnRight": "Ajouter colonne à droite",
            "addRowAbove": "Ajouter ligne au-dessus",
            "addRowBelow": "Ajouter ligne au-dessous",
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
            "headerRows": "Lignes d'en-tête",
            "headerColumns": "Colonnes d'en-tête",
            "tableSummaryPlaceholder": "L'attribut de résumé n'est pas compatible HTML5.",
            "associateNone": "Aucun",
            "associateScope": "Associer à l'aide de l'attribut 'scope'",
            "associateIds": "Associer à l'aide d'identifiants",
            "copyFormat": "Copier le format",
            "applyFormat": "Appliquer le format",
            "borderNone": "Aucune",
            "undo": "Défaire",
            "redo": "Refaire"
         });
   }

   /* FileBrowser messages */

   if (kendo.ui.FileBrowser) {
      kendo.ui.FileBrowser.prototype.options.messages =
         $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
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

   /* FileManager messages */

   if (kendo.ui.FileManager) {
      kendo.ui.FileManager.prototype.options.messages =
         $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            toolbar: {
               createFolder: "Nouveau dossier",
               upload: "Téléverser",
               sortDirection: "Ordre de tri",
               sortDirectionAsc: "Tri Ascendant",
               sortDirectionDesc: "Tri descendant",
               sortField: "Trier par",
               nameField: "Nom",
               sizeField: "Taille",
               typeField: "Type",
               dateModifiedField: "Date Modification",
               dateCreatedField: "Date Création",
               listView: "Vue liste",
               gridView: "Vue grille",
               search: "Recherche",
               details: "Vue Détails",
               detailsChecked: "On",
               detailsUnchecked: "Off",
               "delete": "Supprimer",
               rename: "Rename"
            },
            views: {
               nameField: "Nom",
               sizeField: "Taille",
               typeField: "Type",
               dateModifiedField: "Date Modification",
               dateCreatedField: "Date Création",
               items: "items",
               listLabel: "Gestionnaire fichiers liste",
               gridLabel: "Gestionnaire fichiers grille",
               treeLabel: "Gestionnaire fichiers Arborescence"
            },
            dialogs: {
               upload: {
                  title: "Téléverser",
                  clear: "Effacer liste",
                  done: "Terminé"
               },
               moveConfirm: {
                  title: "Confirmer",
                  content: "<p style='text-align: center;'>Voulez-vous déplacer ou copier?</p>",
                  okText: "Copier",
                  cancel: "Déplacer",
                  close: "fermer"
               },
               deleteConfirm: {
                  title: "Confirmer",
                  content: "<p style='text-align: center;'>Êtes-vous sûr de vouloir supprimer le(s) fichier(s) sélectionné(s)?<br/>Cette opération est irréversible.</p>",
                  okText: "Supprimer",
                  cancel: "Annuler",
                  close: "fermer"
               },
               renamePrompt: {
                  title: "Invite",
                  content: "<p style='text-align: center;'>Entrer un nom pour le fichier.</p>",
                  okText: "Renommer",
                  cancel: "Annuler",
                  close: "fermer"
               }
            },
            previewPane: {
               noFileSelected: "Aucun fichier sélectionné",
               extension: "Type",
               size: "Taille",
               created: "Date Création",
               createdUtc: "Date Création UTC",
               modified: "Date Modification",
               modifiedUtc: "Date Modification UTC",
               items: "items"
            }
         });
   }

   /* FilterCell messages */

   if (kendo.ui.FilterCell) {
      kendo.ui.FilterCell.prototype.options.messages =
         $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
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
         $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
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
               "isnullorempty": "A une valeur",
               "isnotnullorempty": "N'a pas de valeur"
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
         $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
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
            "into": "dans",
            "buttonTitle": "{0} parametres du filtre de colonnes"
         });
   }

   /* FilterMenu operator messages */

   if (kendo.ui.FilterMenu) {
      kendo.ui.FilterMenu.prototype.options.operators =
         $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
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
               "isnullorempty": "A une valeur",
               "isnotnullorempty": "N'a pas de valeur"
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
         $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
            "checkAll": "Choisir toutes",
            "clearAll": "Effacer toutes",
            "clear": "Effacer filtre",
            "filter": "Filtrer",
            "search": "Recherche",
            "cancel": "Annuler",
            "selectedItemsFormat": "{0} éléments(s) sélectionné(s)",
            "done": "Terminé",
            "into": "dans"
         });
   }

   /* Gantt messages */

   if (kendo.ui.Gantt) {
      kendo.ui.Gantt.prototype.options.messages =
         $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
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
               "unitsHeader": "Unités",
               "parent": "Parent",
               "addNew": "Ajouter",
               "name": "Nom",
               "percentCompleteHint": "valeur de 0 à 1",
               "remove": "Retirer",
               "actualStart": "Départ actuel",
               "actualEnd": "Fin actuelle",
               "parentOptionLabel": "-Aucun-",
               "general": "Général",
               "predecessors": "Prédécesseurs",
               "successors": "Successeurs",
               "other": "Autre",
               "dependencyType": "Type"
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
            "selectView": "Sélectionner vue",
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
         $.extend(true, kendo.ui.Grid.prototype.options.messages, {
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
               "update": "Mettre à jour",
               "search": "Recherche..."
            },
            "editable": {
               "cancelDelete": "Annuler",
               "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
               "confirmDelete": "Effacer"
            },
            "noRecords": "Aucun enregistrement disponible.",
            "expandCollapseColumnHeader": "",
            "groupHeader": "Appuyez sur ctrl + espace pour grouper",
            "ungroupHeader": "Appuyez sur ctrl + espace pour dissocier",
            "toolbarLabel": "barre d'outils grille",
            "groupingHeaderLabel": "regrouper entêtes de grille",
            "filterCellTitle": "filtre cellule"
         });
   }

   /* TaskBoard messages */

   if (kendo.ui.TaskBoard) {
      kendo.ui.TaskBoard.prototype.options.messages =
         $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Édition",
            "createNewCard": "Créer nouvelle carte",
            "create": "Créer",
            "search": "Recherche",
            "previewCard": "Carte précédente",
            "addCard": "Ajouter une carte",
            "editCard": "Éditer carte",
            "deleteCard": "Supprimer carte",
            "addColumn": "Ajouter colonne",
            "editColumn": "Éditer colonne",
            "deleteColumn": "Supprimer colonne",
            "close": "Fermer",
            "cancel": "Annuler",
            "delete": "Supprimer",
            "saveChanges": "Sauvegarder",
            "title": "Titre:",
            "description": "Description:",
            "newColumn": "Nouvelle colonne",
            "deleteColumnConfirm": "Êtes-vous sûr de vouloir supprimer cette colonne?",
            "deleteCardConfirm": "Êtes vous sûr de vouloir supprimer cette carte?"
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
               "excel": "Exporter vers Excel",
               "pdf": "Exporter vers PDF"
            }
         });
   }

   /* Groupable messages */

   if (kendo.ui.Groupable) {
      kendo.ui.Groupable.prototype.options.messages =
         $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
            "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
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

   /* MediaPlayer messages */

   if (kendo.ui.MediaPlayer) {
      kendo.ui.MediaPlayer.prototype.options.messages =
         $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pause",
            "play": "Jouer",
            "mute": "Muet",
            "unmute": "Activer le son",
            "quality": "Qualité",
            "fullscreen": "Plein écran",
            "volume": "volume",
            "time": "temps"
         });
   }

   /* Pager messages */

   if (kendo.ui.Pager) {
      kendo.ui.Pager.prototype.options.messages =
         $.extend(true, kendo.ui.Pager.prototype.options.messages, {
            "allPages": "Tous",
            "display": "Afficher les items {0} - {1} de {2}",
            "empty": "Aucun enregistrement à afficher.",
            "page": "Page",
            "pageButtonLabel": "Page {0}",
            "pageSizeDropDownLabel": "Tailles de page combo",
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
         $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
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
         $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Déposer les champs de données ici",
            "columnFields": "Déposer les champs de colonne ici",
            "rowFields": "Déposer les champs de lignes ici"
         });
   }

   /* PivotFieldMenu messages */

   if (kendo.ui.PivotFieldMenu) {
      kendo.ui.PivotFieldMenu.prototype.options.messages =
         $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
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

   /* RecurrenceEditor messages */

   if (kendo.ui.RecurrenceEditor) {
      kendo.ui.RecurrenceEditor.prototype.options.messages =
         $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            "repeat": "Répéter",
            "recurrenceEditorTitle": "Éditeur d'occurence",
            "frequencies": {
               "never": "Jamais",
               "hourly": "Une fois par heure",
               "daily": "Une fois par jour",
               "weekly": "Une fois par semaine",
               "monthly": "Une fois par mois",
               "yearly": "Une fois par an"
            },
            "hourly": {
               "repeatEvery": "Répéter chaque: ",
               "interval": " heure(s)"
            },
            "daily": {
               "repeatEvery": "Répéter chaque: ",
               "interval": " jour(s)"
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
               "day": "Jour",
               "date": "Date"
            },
            "yearly": {
               "repeatEvery": "Répéter chaque:",
               "repeatOn": "Répéter l'opération sur:",
               "interval": "année(ans)",
               "of": "de",
               "month": "mois",
               "day": "jour",
               "date": "date"
            },
            "end": {
               "label": "Finir:",
               "mobileLabel": "Fin",
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
               "weekend": "jour de fin de semaine"
            }
         });
   }

   /* MobileRecurrenceEditor messages */

   if (kendo.ui.MobileRecurrenceEditor) {
      kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
         $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            "cancel": "Annuler",
            "update": "Sauvegarder",
            "endTitle": "Se termine",
            "repeatTitle": "Patron de répétition",
            "headerTitle": "Répéter l'événement",
            "end": {
               "patterns": {
                  "never": "Jamais",
                  "after": "Après...",
                  "on": "Le..."
               },
               "never": "Jamais",
               "after": "Après...",
               "on": "Le..."
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
               "repeatEvery": "Répéter chaque",
               "every": "Chaque",
               "month": "Mois",
               "day": "Jour"
            }
         });
   }

   /* Scheduler messages */

   if (kendo.ui.Scheduler) {
      kendo.ui.Scheduler.prototype.options.messages =
         $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
            "allDay": "toute la journée",
            "date": "Date",
            "event": "Évènement",
            "time": "Heure",
            "showFullDay": "Montrer toute la journée",
            "showWorkDay": "Montrer les heures ouvrables",
            "today": "Aujourd'hui",
            "save": "Sauvegarder",
            "cancel": "Annuler",
            "destroy": "Supprimer",
            "resetSeries": "Réinitialiser séries",
            "deleteWindowTitle": "Suppression de l'élément",
            "ariaSlotLabel": "Selectionnés de {0:t} à {1:t}",
            "ariaEventLabel": "{0} sur {1:D} à {2:t}",
            "refresh": "Rafraichir",
            "selectView": "Sélectionner vue",
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
               "resetSeriesWindowTitle": "Réinitialiser Series",
               "deleteWindowOccurrence": "Suppression de l'élément courant",
               "deleteWindowSeries": "Suppression de toute la série",
               "deleteRecurringConfirmation": "Voulez-vous vraiment supprimer cette occurrence d'événement?",
               "deleteSeriesConfirmation": "Voulez-vous vraiment supprimer toute la série?",
               "editWindowTitle": "Modification de l'élément courant",
               "editWindowOccurrence": "Modifier l'occurrence courante",
               "editWindowSeries": "Modifier la série",
               "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
               "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?"
            },
            "editor": {
               "title": "Titre",
               "start": "Début",
               "end": "Fin",
               "allDayEvent": "Toute la journée",
               "description": "Description",
               "repeat": "Répéter",
               "timezone": " ",
               "startTimezone": "Fuseau horaire de début",
               "endTimezone": "Fuseau horaire de fin",
               "separateTimezones": "Utiliser des fuseaux horaires différents pour le début et la fin",
               "timezoneEditorTitle": "Fuseaux horaires",
               "timezoneEditorButton": "Fuseau horaire",
               "timezoneTitle": "Fuseaux horaires",
               "noTimezone": "Pas de fuseau horaire",
               "editorTitle": "Évènement"
            },
            "search": "Recherche..."
         });
   }

   /* Spreadsheet messages */

   if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
      kendo.spreadsheet.messages.borderPalette =
         $.extend(true, kendo.spreadsheet.messages.borderPalette, {
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
         $.extend(true, kendo.spreadsheet.messages.dialogs, {
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
         $.extend(true, kendo.spreadsheet.messages.filterMenu, {
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
         $.extend(true, kendo.spreadsheet.messages.view, {
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
         $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Augmenter",
            "decreaseButtonTitle": "Diminuer"
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

   /* TreeView messages */

   if (kendo.ui.TreeView) {
      kendo.ui.TreeView.prototype.options.messages =
         $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Chargement...",
            "requestFailed": "La requête à échoué.",
            "retry": "Recommencer"
         });
   }

   /* Upload messages */

   if (kendo.ui.Upload) {
      kendo.ui.Upload.prototype.options.localization =
         $.extend(true, kendo.ui.Upload.prototype.options.localization, {
            "select": "Sélectionner...",
            "cancel": "Annuler",
            "retry": "Réessayer",
            "remove": "Retirer",
            "clearSelectedFiles": "Effacer",
            "uploadSelectedFiles": "Téléverser des fichiers",
            "dropFilesHere": "déposer les fichiers à téléverser ici",
            "statusUploading": "téléversement",
            "statusUploaded": "téléversé",
            "statusWarning": "avertissement",
            "statusFailed": "échoué",
            "headerStatusPaused": "Pause",
            "headerStatusUploading": "Téléversement...",
            "headerStatusUploaded": "Complété",
            "uploadSuccess": "Fichier(s) téléversé (s) avec succes.",
            "uploadFail": "Échec du téléversement du ou des fichiers.",
            "invalidMaxFileSize": "Taille de fichier trop grande.",
            "invalidMinFileSize": "Taille de fichier trop petite.",
            "invalidFileExtension": "Type de fichier non autorisé."
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
            "weekColumnHeader": "S",
            "navigateTo": "Aller à ",
            "parentViews": {
               "month": "de l'année",
               "year": "de la décénie",
               "decade": "du siècle"
            }
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
         $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "effacer",
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
         $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "singleTag": "item(s) sélectionnés",
            "clear": "effacer",
            "deleteTag": "supprimer",
            "noData": "Aucune donnée trouvée."
         });
   }

   /* MultiSelect messages */

   if (kendo.ui.MultiSelect) {
      kendo.ui.MultiSelect.prototype.options.messages =
         $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "singleTag": "item(s) sélectionnés",
            "clear": "effacer",
            "deleteTag": "supprimer",
            "noData": "Aucune donnée trouvée.",
            "downArrow": "Selection"
         });
   }

   /* Chat messages */

   if (kendo.ui.Chat) {
      kendo.ui.Chat.prototype.options.messages =
         $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "messageListLabel": "Liste message",
            "placeholder": "Saisir un message...",
            "toggleButton": "Basculer la barre d'outils",
            "sendButton": "Envoyer messsage"
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
                  of: "de",
                  dragHandle: "Glisser recherche"
               }
            }
         });
   }

   /* Captcha messages */

   if (kendo.ui.Captcha) {
      kendo.ui.Captcha.prototype.options.messages =
         $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Reinitialiser le code",
            "audio": "Audio code",
            "imageAlt": "Entrer le code de l'image",
            "success": "Vérification réussie"
         });
   }

   /* OrgChart messages */

   if (kendo.ui.OrgChart) {
      kendo.ui.OrgChart.prototype.options.messages =
         $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            label: "Organigramme",
            edit: "Éditipon",
            create: "Créer",
            destroy: "Supprimer",
            destroyContent: "Êtes-vous sûr de vouloir supprimer cet élément ainsi que tous ses enfants?",
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
            collapse: "refermer"
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