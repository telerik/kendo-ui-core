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
  "info": "Afficher les itemsavec une valeur qui:",
  "filterFields": "Filtre données",
  "filter": "Filtre",
  "include": "Inclure champs...",
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

/* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
        "title": "Paramètres",
        "cancelButtonText": "Annuler",
        "applyButtonText": "Appliquer",
        "measures": "Selectionner des champ pour débuter la configuration",
        "columns": "Selectionner des champ pour débuter la configuration",
        "rows": "Selectionner des champ pour débuter la configuration"
      });
  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
        "apply": "Appliqueer",
        "sortAscending": "Tri ascendant",
        "sortDescending": "Tri descendant",
        "filterFields": "Filtre champs",
        "filter": "Filtre",
        "include": "Iclure champs...",
        "clear": "Vider",
        "reset": "Reinitialiser",
        "moveToColumns": "Déplacer à la colonne",
        "moveToRows": "Déplacer à la ligne",
        "movePrevious": "Déplacer avant",
        "moveNext": "Déplacer après",
        "filterOperatorsDropDownLabel": "Opérateur de filtre de région",
        "filterValueTextBoxLabel": "Valeur de filtre de région",
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
  "repeat": "Répéter",
  "recurrenceEditorTitle": "Éditer de recurrence",
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
    "date": "Date"
  },
  "end": {
    "label": "Fin:",
    "mobileLabel": "Fins",
    "never": "Jamais",
    "after": " Après",
    "occurrence": "occurrence(s)",
    "on": "Sur",
  },
  "offsetPositions": {
    "first": "premier",
    "second": "second",
    "third": "troisième",
    "fourth": "quatrième",
    "last": "dernier",
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de week-end"
  }
});
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
      "cancel": "Annuler",
      "update": "Sauvegarder",
      "endTitle": "Répétition fins",
      "repeatTitle": "Répétition modèle",
      "headerTitle": "Répétition événement",
      "end": {
        "patterns": {
            "never": "Jammais",
            "after": "Après...",
            "on": "Sur..."
        },
        "never": "Jamais",
        "after": "Terminer la répétition après",
        "on": "Terminer la répétition quand"
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
        "dayOfMonth": "Jour jour du mois",
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
        "day": "Jour"
      }
    });
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "toute la journée",
  "date": "Date",
  "event": "Evènement",
  "time": "Heure",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables",
  "today": "Aujourd'hui",
  "save": "Sauvegarder",
  "cancel": "Annuler",
  "destroy": "Effacer",
  "resetSeries": "Réinitialiser Series",
  "deleteWindowTitle": "Suppression de l'élément",
  "ariaSlotLabel": "Sélectionner de {0:t} à {1:t}",
  "ariaEventLabel": "{0} de {1:D} à {2:t}",
  "refresh": "Rafraichir",
  "selectView": "Selectionner vue",
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
    "deleteRecurringConfirmation": "Etes-vous sûr de vouloir supprimer cette occurrence ?",
    "deleteSeriesConfirmation": "Êtes-vous sûr de vouloir supprimer toute la série ?",
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
    "separateTimezones": "Use separate start and end time zones",
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
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Toutes les bordure",
  "insideBorders": "Bordurees internes",
  "insideHorizontalBorders": "Bordures internes horizontales",
  "insideVerticalBorders": "Bordures interne verticalees",
  "outsideBorders": "Bordures externes",
  "leftBorder": "Bordure gauche",
  "topBorder": "Bodure haut",
  "rightBorder": "Bordure droite",
  "bottomBorder": "Bordure bas",
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
  "revert": "Rétablir",
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
    "title": "Taille de police"
  },
  "bordersDialog": {
    "title": "Bordures"
  },
  "alignmentDialog": {
    "title": "Alignement",
    "buttons": {
     "justifyLeft": "Aligner à gauche",
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
      "mergeVertically": "Fusionner verticalement",
      "unmerge": "Annuler fusion"
    }
  },
  "freezeDialog": {
    "title": "Figer les panneaux",
    "buttons": {
      "freezePanes": "Figer panneaux",
      "freezeRows": "Figer lignes",
      "freezeColumns": "Figer colonnes",
      "unfreeze": "Annuler figer panneaux"
    }
  },
  "confirmationDialog": {
    "text": "Etes-vous sûr de vouloir supprimer cette feuille ?",
    "title": "Retirer feuille"
  },
  "validationDialog": {
    "title": "Validation donnée",
    "hintMessage": "Veuillez saisir une valeur {0} valide {1}.",
    "hintTitle": "Validation {0}",
    "criteria": {
      "any": "Standard",
      "number": "Nombre",
      "text": "Texte",
      "date": "Date",
      "custom": "Formule",
      "list": "Liste"
    },
    "comparers": {
      "greaterThan": "Plus grand que",
      "lessThan": "Plus petit que",
      "between": "entre",
      "notBetween": "pas entre",
      "equalTo": "égal à",
      "notEqualTo": "n'est pas égal à",
      "greaterThanOrEqualTo": "plus grand où égal à",
      "lessThanOrEqualTo": "plus petit où égal à"
    },
    "comparerMessages": {
      "greaterThan": "plus grand que {0}",
      "lessThan": "plus petit que {0}",
      "between": "entre {0} et {1}",
      "notBetween": "pas entre {0} et {1}",
      "equalTo": "égal à {0}",
      "notEqualTo": "pas égal à {0}",
      "greaterThanOrEqualTo": "plus grans où égal à {0}",
      "lessThanOrEqualTo": "plus petit où égal à {0}",
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
      "onInvalidData": "Sur donnée invalide",
      "rejectInput": "Rejeter l'entrée",
      "showWarning": "Afficher avertissement",
      "showHint": "Afficher astuce",
      "hintTitle": "Titre astuce",
      "hintMessage": "Message astuce",
      "ignoreBlank": "Ignorer les blancs"
    },
    "placeholders": {
      "typeTitle": "Entrer titre",
      "typeMessage": "Entrer message"
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
    "errorMessage": "Impossible de modifier une partie d'une cellule fusionnée."
  },
  "useKeyboardDialog": {
    "title": "Copier et coller",
    "errorMessage": "Ces actions ne peuvent pas être exécutées via le menu. Veuillez plutôt utiliser les raccourcis clavier:",
    "labels": {
      "forCopy": "pour copier",
      "forCut": "pour couper",
      "forPaste": "pour coller"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Cette action ne peut pas être effectuée sur une sélection multiple."
  },
  "insertCommentDialog": {
    "title": "Inserer un commentaire",
    "labels": {
      "comment": "Commentaire",
      "removeComment": "Retirer commentaire"
    }
  },
  "insertImageDialog": {
    "title": "Insérer image",
    "info": "Faites glisser une image ici ou cliquez pour sélectionner",
    "typeError": "Veuillez sélectionner une image JPEG, PNG ou GIF"
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
  "search": "Rechercher",
  "addToCurrent": "Ajouter à la sélection courrante",
  "clear": "Vider",
  "blanks": "(Blancs)",
  "operatorNone": "Aucun",
  "and": "ET",
  "or": "OU",
  "operators": {
    "string": {
      "contains": "Texte contient",
      "doesnotcontain": "Texte ne contient pas",
      "startswith": "Texte débute par",
      "endswith": "Texte termine par"
    },
    "date": {
      "eq": "Date est",
      "neq": "Date n'est pas",
      "lt": "Date avant",
      "gt": "Date après"
    },
    "number": {
      "eq": "Est égal à",
      "neq": "n'est pas égal à",
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
    "justifyLeft": "Aligner à gauche",
    "justifyCenter": "Centrer",
    "justifyRight": "Aligner à froite",
    "justifyFull": "Justifier",
    "alignTop": "Aligner en haut",
    "alignMiddle": "Aligner au centrer",
    "alignBottom": "Aligner en bas"
  },
  "backgroundColor": "Fond",
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
    "dateTime": "Date et heure",
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
  "insertComment": "Insérer un commentaire",
  "insertImage": "Inserer une image",
  "italic": "Italique",
  "merge": "Fusionner cellules",
  "mergeButtons": {
    "mergeCells": "Fusionner tout",
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
  "saveAs": "Sauvegarder sous...",
  "sortAsc": "Tri ascendant",
  "sortDesc": "Tri descendant",
  "sortButtons": {
    "sortSheetAsc": "Trier les feuilles de A à Z",
    "sortSheetDesc": "Trier les feuilles de Z à A",
    "sortRangeAsc": "Trier la plage de A à Z",
    "sortRangeDesc": "Trier la plage de Z à A"
  },
  "textColor": "Couleur du texte",
  "textWrap": "Renvoi à la ligne",
  "underline": "Souligner",
  "validation": "Validation donnée..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "Nom boîte",
  "formulaInput": "Champ formule",
  "errors": {
    "shiftingNonblankCells": "Impossible d'insérer des cellules en raison d'un risque de perte de données. Sélectionnez un autre emplacement d'insertion ou supprimez les données de la fin de votre feuille de calcul.",
    "filterRangeContainingMerges": "Impossible de créer un filtre dans une plage contenant des fusions",
    "validationError": "La valeur que vous avez saisie viole les règles de validation définies sur la cellule."
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

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Chagement...",
  "requestFailed": "Requête échouée.",
  "retry": "Rééssayer"
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
  "uploadSelectedFiles": "Téléverser fichiers",
  "dropFilesHere": "déposer les fichiers à téléverser ici",
  "statusUploading": "téléversement",
  "statusUploaded": "téléversé",
  "statusWarning": "attention",
  "statusFailed": "échoué",
  "headerStatusPaused": "En pause",
  "headerStatusUploading": "Téléversement...",
  "headerStatusUploaded": "Complété",
  "uploadSuccess": "Fichier(s) téléversé(s) avec succès.",
  "uploadFail": "Le télversement des fichier(s) à échoué.",
  "invalidMaxFileSize": "Taille du fichier trop grande.",
  "invalidMinFileSize": "Taille du fichier trop petite.",
  "invalidFileExtension": "Type de fichier non autorisé."
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

/* TimePicker */

if (kendo.ui.TimePicker) {
kendo.ui.TimePicker.prototype.options.messages =
$.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
    set: "Définir",
    cancel: "Annuler",
    hour: "heure",
    minute: "minute",
    second: "seconde",
    millisecond: "milliseconde",
    now: "Maintenant"
});
}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {
kendo.ui.DateTimePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
    set: "Définir",
    cancel: "Annuler",
    hour: "heure",
    minute: "minute",
    second: "seconde",
    millisecond: "milliseconde",
    now: "Maintenant",
    date: "Date",
    time: "Heure",
    today: "Aujourd'hui",
    weekColumnHeader: ""
});
}

/* Calendar */
if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
    "today": "Aujourd'hui",
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
        "singleTag": "item(s) sélectionné(s)",
        "clear": "vider",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "item(s) sélectioné(s)",
        "clear": "vider",
        "deleteTag": "supprimer",
        "noData": "Aucune donnée trouvée.",
        "downArrow": "Sélectionner"
    });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
    $.extend(true, kendo.ui.Chat.prototype.options.messages,{
        "messageListLabel": "Liste messages",
        "placeholder": "Saisir un message...",
        "toggleButton": "Basculer la barre d'outils",
        "sendButton": "Envoyer"
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
                zoomOut: "Zoom arrière",
                zoomIn: "Zoom avant",
                actualWidth: "Largeur actuelle",
                autoWidth: "Largeur automatique",
                fitToWidth: "Ajuster à la largeur",
                fitToPage: "Ajuster à la page"
            },
            open: "Ouvrir",
            exportAs: "Exporter",
            download: "Télécharger",
            pager: {
                first: "Aller à la première",
                previous: "Aller à la page précédente",
                next: "Aller à la page suivante",
                last: "Aller à la dernière page",
                of: "de",
                page: "page",
                pages: "pages"
            },
            print: "Imprimer",
            toggleSelection: "Activer la sélection",
            togglePan: "Activer le panoramique",
            search: "Rechercher"
        },
        errorMessages: {
            notSupported: "Seuls les fichiers PDF sont autorisés.",
            parseError: "Le traitement du fichier PDF échoue.",
            notFound: "Fichier non trouvé.",
            popupBlocked: "Fenêtre contextuelle est bloquée."
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
                matchCase: "Respecter la Case",
                next: "Correspondance suivante",
                previous: "Correspondance précédente",
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
    $.extend(true, kendo.ui.Captcha.prototype.options.messages,{
        "reset": "Réinitialiser captcha",
        "audio": "Lire captcha",
        "imageAlt": "Tapez le code Captcha de l'image",
        "success": "Vérification réussie"
    });
}

/* OrgChart messages */

if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
    $.extend(true, kendo.ui.OrgChart.prototype.options.messages,{
        label: "Organigramme",
        edit: "Étiter",
        create: "Créer",
        destroy: "Supprimer",
        destroyContent: "Êtes-vous sûr de vouloir supprimer cet élément et tous ses enfants ?",
        destroyTitle: "Supprimer l'item",
        cancel: "Annuler",
        save: "Sauvegarder",
        menuLabel: "Menu édition",
        uploadAvatar: "Téléverser un nouvel avatar",
        parent: "Parent",
        name: "Nom",
        title: "Titre",
        none: "--Aucun--",
        expand: "étendre",
        collapse: "fermer"
    });
}

/* Map messages */

if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
    $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Titre map"
    });
}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {
  kendo.dataviz.ui.Sankey.prototype.options.messages =
  $.extend(true, kendo.ui.Captcha.prototype.options.messages,{
      "tooltipUnits": "{0} Unités"
  });
}

})(window.kendo.jQuery);