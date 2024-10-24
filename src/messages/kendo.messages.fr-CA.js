(function($, undefined) {

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
    $.extend(true, kendo.ui.ColorGradient.prototype.options.messages,{
        "contrastRatio": "Contraste:",
        "fail": "Échec",
        "pass": "Pass",
        "hex": "HEX",
        "toggleFormat": "Basculer format",
        "red": "Rouge",
        "green": "Vert",
        "blue": "Bleu",
        "alpha": "Alpha"
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
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
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
  "sortAscending": "Tri Ascendant",
  "sortDescending": "Tri Descendant",
  "filter": "Filtrer",
  "clearAllFilters": "Effacer filtres",
  "column": "Colonne",
  "columns": "Colonnes",
  "columnVisibility": "Colonne Visibilité",
  "clear": "Effacer",
  "cancel": "Annuler",
  "done": "Terminé",
  "settings": "Paramètres colonne",
  "lock": "Vérouiller colonne",
  "unlock": "Dévérouiller colonne",
  "stick": "Figer colonne",
  "unstick": "Défiger colonne",
  "setColumnPosition": "Position colonne",
  "apply": "Appliquer",
  "reset": "Réinitialiser",
  "buttonTitle": "{0} paramètres colonnes",
  "movePrev": "Déplacer avant",
  "moveNext": "Déplacer après",
  "groupColumn": "Grouper colonne",
  "ungroupColumn": "Dégrouper colonne"
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

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "auto": "Auto",
  "bold": "Gras",
  "italic": "Italique",
  "search": "Recherche",
  "dropFilesHere": "Déposer des fichiers ici pour les téléverser",
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
  "viewHtml": "Visualiser le HTML",
  "fontName": "Police",
  "fontNameInherit": "(police héritée)",
  "fontSize": "Taille de police",
  "fontSizeInherit": "(taille héritée)",
  "formatBlock": "Style du paragraphe",
  "formatting": "Formatage",
  "foreColor": "Couleur",
  "backColor": "Couleur de fond",
  "styles": "Styles",
  "emptyFolder": "Vider le dossier",
  "uploadFile": "Télécharger",
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
  "linkText": "Text",
  "linkToolTip": "Info-bulle",
  "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
  "dialogUpdate": "Mise à jour",
  "dialogInsert": "Insérer",
  "dialogButtonSeparator": "Ou",
  "dialogCancel": "Fermer",
  "cleanFormatting": "Effecer format",
  "createTable": "Insérer un tableau",
  "addColumnLeft": "Ajouter colonne à gauche",
  "addColumnRight": "Ajouter colonne à droite",
  "addRowAbove": "Ajouter ligne au-dessus",
  "addRowBelow": "Ajouter ligne au-dessous",
  "deleteRow": "Supprimer la ligne",
  "deleteColumn": "Supprimer la colonne",
  "dialogOk": "OK",
  "tableBackground": "Fond de tableau",
  "tableCellProperties": "Propriétés cellule",
  "tableProperties": "Propriétes tableau",
  "tableWizard": "Assistant de tableau",
  "tableTab": "Table",
  "cellTab": "Cellule",
  "accessibilityTab": "Accessibilité",
  "caption": "Sous-titre",
  "captionAlignment": "Alignment sous-titre",
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
  "borderColor": "Couleur bordure",
  "borderWidth": "Taille bordureh",
  "borderStyle": "Style de bordure",
  "collapseBorders": "Rétracter bordures",
  "wrapText": "Renvoi à la ligne",
  "fitToCell": "Ajuster à la cellule",
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
  "applyToColumn": "Appliquer à la colonne",
  "applyToRow": "Appliquer à la ligne",
  "print": "Imprimer",
  "headerRows": "Entête lignes",
  "headerColumns": "Entête colonnes",
  "tableSummaryPlaceholder": "L'attribut Summary n'est pas compatible HTML5.",
  "associateNone": "Aucun",
  "associateScope": "Associer en utilisant unattribut 'cible'",
  "associateIds": "Associer en utilisant l'Id",
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
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
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
            listLabel: "Gestionnaire fichiers vue liste",
            gridLabel: "Gestionnaire fichieer grille",
            treeLabel: "Gestionnaire fichiers arborescence"
        },
        dialogs: {
            upload: {
                title: "Transférer des fichiers",
                clear: "Vider",
                done: "Terminé"
            },
            moveConfirm: {
                title: "Confirmer",
                content: "<p class=\'k-text-center\'>Voulez-vous déplacer les fichiers sélectionnés ou les copier?</p>",
                okText: "Copier",
                cancel: "Déplacer",
                close: "Fermer"
            },
            deleteConfirm: {
                title: "Confirmer",
                content: "<p class=\'k-text-center\'>Voulez-vous vraiment supprimer les fichiers sélectionnés?<br/>Il n\'est pas possible d\'annuler cette opération.</p>",
                okText: "Supprimer",
                cancel: "Annuler",
                close: "Fermer"
            },
            renamePrompt: {
                title: "Renommer",
                content: "<p class=\'k-text-center\'>Entrez un nouveau nom de fichier</p>",
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
  "into": "dans",
  "buttonTitle": "{0} parametres du filtre de colonnes"
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
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Choisir toutes",
  "clearAll": "Effacer tout",
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
    "addChild": "Ajouter descendant",
    "append": "Ajouter une Tâche",
    "insertAfter": "Ajouter après",
    "insertBefore": "Ajouter avant",
    "pdf": "Exporter en PDF"
  },
  "cancel": "Annuler",
  "deleteDependencyWindowTitle": "Effacer la dépendance",
  "deleteTaskWindowTitle": "Effacer la tâche",
  "destroy": "Effacer)",
  "editor": {
    "assingButton": "Assigner",
    "editorTitle": "Tâche",
    "end": "Fin",
    "percentComplete": "Complété",
    "plannedStart": "Départ planifié",
    "plannedEnd": "Fin planifiée",
    "resources": "Ressources",
    "resourcesEditorTitle": "Ressources",
    "resourcesHeader": "Ressources",
    "start": "Début",
    "title": "Titre",
    "unitsHeader": "Unité",
    "parent": "Parent",
    "addNew": "Ajouter",
    "name": "Nom",
    "percentCompleteHint": "valeur de 0 à 1",
    "remove": "Retirer",
    "actualStart": "Départ actuel",
    "actualEnd": "Fin actuelle",
    "parentOptionLabel": "-Aucun-",
    "general": "Général",
    "predecessors": "Predecesseurs",
    "successors": "Successeurs",
    "other": "Autre",
    "dependencyType": "Type"
  },
  "plannedTasks": {
    "switchText": "Tâches planifiées",
    "offsetTooltipAdvanced": "Atteindre la date limite plus tôt",
    "offsetTooltipDelay": "Delai",
    "seconds": "secondes",
    "minutes": "minutes",
    "hours": "heures",
    "days": "jours"
  },
  "save": "Sauvegarder",
  "selectView": "Selectionner vue",
  "views": {
    "day": "Jours",
    "end": "Fin",
    "month": "Mois",
    "start": "Début",
    "week": "Semaine",
    "year": "Année"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "loader": {
    "loading": "Chargement...",
    "exporting": "Exportation..."
  },
  "commands": {
    "cancel": "Annuler les modifications",
    "canceledit": "Annuler",
    "columns": "colonnes",
    "create": "Insérer",
    "destroy": "Effacer",
    "edit": "Éditer",
    "excel": "Exporter vers Excel",
    "pdf": "Exporter vers PDF",
    "save": "Enregistrer les modifications",
    "select": "Sélectionner",
    "update": "Mettre à jour",
    "search": "Rechercher...",
    "selectRow": "Selectioner ligne",
    "selectAllRows": "Toutes les ligne",
    "clearSelection": "Effacer sélection",
    "copySelection": "Copier sélection",
    "copySelectionNoHeaders": "Copier sélection (Sans entêtes)",
    "reorderRow": "Ordonner les lignes",
    "reorderRowUp": "Haut",
    "reorderRowDown": "Bas",
    "reorderRowTop": "Spérieure",
    "reorderRowBottom": "Inférieure",
    "exportPdf": "Exporter vers PDF",
    "exportExcel": "Exporter vers Excel",
    "exportToExcelAll": "Tout",
    "exportToExcelSelection": "Sélection",
    "exportToExcelSelectionNoHeaders": "Sélection (Sans entêtes)",
    "sortAsc": "Tri croissant",
    "sortDesc": "Tri décroissant",
    "moveGroupPrevious": "Déplacer avant",
    "moveGroupNext": "Déplacer après",
  },
  "editable": {
    "cancelDelete": "Annuler",
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "confirmDelete": "Effacer"
  },
  "noRecords": "Aucun enregistrement disponible.",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Appuyer ctrl + espace pour grouper",
  "ungroupHeader": "Appuyer ctrl + espace pour dégrouper",
  "toolbarLabel": "barre d'outils grille",
  "groupingHeaderLabel": "entête de regroupement grille",
  "filterCellTitle": "filtre cellule"
});
}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {
kendo.ui.TaskBoard.prototype.options.messages =
$.extend(true, kendo.ui.TaskBoard.prototype.options.messages,{
    "edit": "Éditer",
    "createNewCard": "Nouvelle carte",
    "create": "Créer",
    "search": "Trouver",
    "previewCard": "Carte précédente",
    "addCard": "Ajouter carte",
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
    "deleteColumnConfirm": "Êtes-vous sûr de vouloir supprimer cette colonne ?",
    "deleteCardConfirm": "Êtes-vous sûr de vouloir supprimer cette carte?"
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
  "upArrowText": "Augmenter la valeur",
  "downArrowText": "Diminuer la valeur"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Pause",
  "play": "Lire",
  "mute": "Désactiver le son",
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
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tous",
  "display": "Afficher les items {0} - {1} de {2}",
  "empty": "Aucun enregistrement à afficher.",
  "page": "Page",
  "pageButtonLabel": "Page {0}",
  "pageSizeDropDownLabel": "Tailles de page",  
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
  "display": "Afficher les éléments {0} - {1} de {2}",
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
  "measureFields": "Déposer les champs de données ici",
  "columnFields": "Déposer les colonnes de données ici",
  "rowFields": "Déposer les lignes de données ici"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Show items with value that:",
  "filterFields": "Fields Filter",
  "filter": "Filter",
  "include": "Include Fields...",
  "title": "Fields to include",
  "clear": "Clear",
  "ok": "Ok",
  "cancel": "Cancel",
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

/* GanttList messages */

if (kendo.ui.GanttList) {
  kendo.ui.GanttList.prototype.options.messages =
    $.extend(true, kendo.ui.GanttList.prototype.options.messages, {
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
  "overwriteFile": "Un fichier du nom \"{0}\" existe déjà dans ce répertoire. Voulez-vous le remplacer?",
  "dropFilesHere": "glissez les fichiers ici pour les charger",
  "search": "Recherche"
};

if (kendo.ui.ImageBrowser) {
kendo.ui.ImageBrowser.prototype.options.messages =
$.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
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
  "headerStatusUploaded": "Complété",
  "headerStatusUploading": "Téléchargement..."
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
    "separateTimezones": "Use separate start and end time zones",
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
    "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
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

/* Calendar */

if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
  "weekColumnHeader": "S",
  "navigateTo": "Naviguer à la vue ",
  "parentViews": {
    "month": "de l'année",
    "year": "de la décennie",
    "decade": "du centenaire"
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

})(window.kendo.jQuery);
