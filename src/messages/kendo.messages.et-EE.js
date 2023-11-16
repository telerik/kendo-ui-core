(function($, undefined) {

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
    $.extend(true, kendo.ui.ColorGradient.prototype.options.messages,{
        "contrastRatio": "Kontrastsuse suhe",
        "fail": "Fail",
        "pass": "Üle andma",
        "hex": "HEX",
        "toggleFormat": "Vormingu sisselülitus",
        "red": "Punane",
        "green": "Roheline",
        "blue": "Sinine",
        "alpha": "Alfa"
    });
}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
    "apply": "Rakenda",
    "cancel": "Tühista",
    "noColor": "Värvitu",
    "clearColor": "Puhas (värvi-)toon"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
    "apply": "Rakenda",
    "cancel": "Tühista",
    "noColor": "Värvitu",
    "clearColor": "Puhas värv"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
    "sortAscending": "Sorteeri kasvavalt",
    "sortDescending": "Sorteeri kahanevalt",
    "filter": "Fiilter",
    "column": "Tulp",
    "columns": "Tulbad",
    "columnVisibility": "Tulpade nähtavus",
    "clear": "Puhasta",
    "cancel": "Tühista",
    "done": "Tehtud",
    "settings": "Korrigeeri tulba seadeid",
    "lock": "Lukusta tulp",
    "unlock": "Ava tulp",
    "stick": "Kleebi tulp",
    "unstick": "Vabasta tulp",
    "setColumnPosition": "Seadista tulba asend",
    "apply": "Rakenda",
    "reset": "Lähtesta",
    "buttonTitle": "{0} redigeeri tulba seadeid",
    "movePrev": "Liigu eelnevale",
    "moveNext": "Liigu järgmisele",
    "groupColumn": "Grupeeri veerud",
    "ungroupColumn": "Eralda veerud"
});
}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
kendo.ui.DateRangePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
    "startLabel": "Algus",
    "endLabel": "Lõpp"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
    "auto": "Auto",
    "bold": "Paksus kirjas",
    "italic": "Italic-kaldkiri",
    "search": "Otsing",
    "dropFilesHere": "Tiri failid siia.",
    "underline": "Allakriipsutus",
    "strikethrough": "Läbikriipsutus",
    "superscript": "Suurtähed",
    "subscript": "Väiketähed",
    "justifyCenter": "Tekst keskele",
    "justifyLeft": "Joonda tekst vasakule",
    "justifyRight": "Joonda tekst paremale",
    "justifyFull": "Ühtlusta read",
    "insertUnorderedList": "Sisesta järjestamata nimekiri",
    "insertOrderedList": "Sisesta järjestatud nimekiri",
    "indent": "Rea taane",
    "outdent": "Taande eemaldamine",
    "createLink": "Sisesta hüperlink",
    "unlink": "Eemalda hüperlink",
    "insertImage": "Sisesta pilt",
    "insertFile": "Sisesta fail",
    "insertHtml": "Sisesta HTML",
    "viewHtml": "Vaata HTML-i",
    "fontName": "Vali fondi(šrifti)-perekond",
    "fontNameInherit": "(Päritud font)",
    "fontSize": "Vali fondi suurus",
    "fontSizeInherit": "(Päritud suurus )",
    "formatBlock": "Vorming",
    "formatting": "Vorming",
    "foreColor": "Värv",
    "backColor": "Taustavärv",
    "style": "Stiilid",
    "emptyFolder": "Tühi kaust",
    "uploadFile": "Lae üles",
    "overflowAnchor": "Rohkem tööriistu",
    "orderBy": "Korrasta….:",
    "orderBySize": "Suurus",
    "orderByName": "Nimi",
    "invalidFileType": "Valitud fail \"{0}\" pole kehtiv. Toetatud faili tüübid on {1}.",
    "deleteFile": 'Kas olete kindel, et soovite kustutada "{0}"?',
    "overwriteFile": 'Fail nimega "{0}" on juba käsilolevas kataloogis olemas. Kas soovite selle ülekirjutada?',
    "directoryNotFound": "Selle nimelist kataloogi ei leitud.",
    "imageWebAddress": "Veebiaadress",
    "imageAltText": "Alternatiivtekst",
    "imageWidth": "Laius(px)",
    "imageHeight": "Kõrgus (px)",
    "fileWebAddress": "Veebiaadress",
    "fileTitle": "Pealkiri",
    "linkWebAddress": "Veebiaadress",
    "linkText": "Tekst",
    "linkToolTip": "Tööriista vihje",
    "linkOpenInNewWindow": "Ava link uues aknas",
    "dialogUpdate": "Uuenda",
    "dialogInsert": "Sisesta",
    "dialogButtonSeparator": "või",
    "dialogCancel": "Tühista",
    "cleanFormatting": "Puhasta vorming",
    "createTable": "Loo tabel",
    "addColumnLeft": "Lisa veerg vasakule",
    "addColumnRight": "Lisa veerg paremale",
    "addRowAbove": "Lisa rida üles",
    "addRowBelow": "Lisa rida alla",
    "deleteRow": "Kustuta rida",
    "deleteColumn": "Kustuta veerg",
    "dialogOk": "Kinnita",
    "tableBackground": "Tabeli taust",
    "tableCellProperties": "Lahtrite omadused",
    "tableProperties": "Tabeli omadused",
    "tableWizard": "Tabeli viisard",
    "tableTab": "Peamine",
    "cellTab": "Lahter",
    "accessibilityTab": "Edasijõudnud",
    "caption": "Pealdis",
    "captionAlignment": "Pealdise joondus",
    "summary": "Kokkuvõte",
    "width": "Laius",
    "height": "Kõrgus",
    "units": "Ühikud",
    "cellSpacing": "Lahtri vahekaugus",
    "cellPadding": "Lahtri täide",
    "cellMargin": "Lahtri väli",
    "alignment": "Joondus",
    "background": "Taust",
    "cssClass": "CSS klass",
    "id": "ID",
    "border": "Piire",
    "borderColor": "Piirde värv",
    "borderWidth": "Piirde laius",
    "borderStyle": "Piirde stiil",
    "collapseBorders": "Eemalda piirded",
    "wrapText": "Koonda tekst",
    "fitToCell": "Sobita lahtrisse",
    "associateCellsWithHeaders": "Seosta päised",
    "alignLeft": "Joonda vasakule",
    "alignCenter": "Joonda keskele",
    "alignRight": "Joonda paremale",
    "alignLeftTop": "Joonda vasakule üles",
    "alignCenterTop": "Joonda keskele üles",
    "alignRightTop": "Joonda paremale üles",
    "alignLeftMiddle": "Joonda vasakule keskele",
    "alignCenterMiddle": "Joonda keskmesse",
    "alignRightMiddle": "Joonda paremale keskele",
    "alignLeftBottom": "Joonda vasakule alla",
    "alignCenterBottom": "Joonda keskele alla",
    "alignRightBottom": "Joonda paremale alla",
    "alignRemove": "Eemalda joondus",
    "columns": "Veerud",
    "rows": "Read",
    "selectAllCells": "Rakenda kđikidele lahtritele",
    "applyToColumn": "Rakenda veerule",
    "applyToRow": "Rakenda reale",
    "print": "Prindi",
    "headerRows": "Päise read",
    "headerColumns": "Päise veerud",
    "tableSummaryPlaceholder": "Kokkuvõtte atribuut pole HTMLS-iga ühilduv.",
    "associateNone": "Puudub",
    "associateScope": "Seosta haarde atribuudi abil",
    "associateIds": "Seosta Ids-iga",
    "copyFormat": "Kopeeri vorming",
    "applyFormat": "Rakenda vormingut",
    "borderNone": "Puudub",
    "undo": "Vđta tagasi",
    "redo": "Tee uuesti"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
    "uploadFile": "Üleslaadida",
    "orderBy": "Järjesta",
    "orderByName": "Nimi",
    "orderBySize": "Suurus",
    "directoryNotFound": "Selle nimega jaotist ei leitud",
    "emptyFolder": "Tühi kaust",
    "deleteFile": 'Kas olete kindel, et soovite kustutada"{0}"?',
    "invalidFileType": "Valitud fail\"{0}\" pole kehtiv. Toetatud failitüübid on {1}.",
    "overwriteFile": "Fail nimega \"{0}\"on juba olemas antud jaotises.Kas soovite selle ülesalvestada?",
    "dropFilesHere": "Tõmba fail üleslaadimiseks siia",
    "search": "Otsing"
});
}

/* FileManager messages */

if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages =
    $.extend(true, kendo.ui.FileManager.prototype.options.messages,{
        toolbar: {
            createFolder: "Uus kaust",
            upload: "Lae üles",
            sortDirection: "Sortimis suund",
            sortDirectionAsc: "sortida tõusvas suunas",
            sortDirectionDesc: "Sortida kahanevas suunas",
            sortField: "Sordi…järgi",
            nameField: "Nimetus",
            sizeField: "Faili suurus",
            typeField: "Tüüp ",
            dateModifiedField: "Muutmise kuupäev",
            dateCreatedField: "Loomise kuupäev",
            listView: "Loetelu vaade",
            gridView: "Ruudustiku vaade",
            search: "Otsing",
            details: "Vaata üksikasju",
            detailsChecked: "Sisselülitatud",
            detailsUnchecked: "Väljalülitatud",
            "delete": "Kustuta",
            rename: "Nimeta ümber"
        },
        views: {
            nameField: "Nimetus",
            sizeField: "Faili suurus",
            typeField: "Tüüp",
            dateModifiedField: "Muutmise kuupäev",
            dateCreatedField: "Loomise kuupäev",
            items: "Artiklid",
            listLabel: "FileManager loetelu vaade",
            gridLabel: "FileManager ruudustik",
            treeLabel: "FileManager Puu vaade"
        },
        dialogs: {
            upload: {
                title: "Lae failid üles",
                clear: "Puhasta nimekiri",
                done: "Tehtud"
            },
            moveConfirm: {
                title: "Kinnita",
                content: "<p class='k-text-center'>Kas soovite muuta asukohta või kopeerida?</p>",
                okText: "Kopeeri",
                cancel: "Muuda asukohta",
                close: "sule"
            },
            deleteConfirm: {
                title: "Kinnita",
                content: "<p class='k-text-center'>Kas olete kindel, et soovite valitud faili(-d) kustutada?<br/>Te ei saa seda toimingut tagasi võtta.</p>",
                okText: "Kustuta",
                cancel: "Tühista",
                close: "Sule"
            },
            renamePrompt: {
                title: "Koheselt",
                content: "<p class='k-text-center'>Sisesta uus faili nimi.</p>",
                okText: "Nimeta ümber",
                cancel: "Tühista",
                close: "Sule"
            }
        },
        previewPane: {
            noFileSelected: "Faili pole valitud",
            extension: "Trüki",
            size: "Suurus",
            created: "Loomise kuupäev",
            createdUtc: "Loomise kuupäev UTC",
            modified: "Muutmise kuupäev",
            modifiedUtc: "Muutmise kuupäev UTC",
            items: "Artiklid"
        }
    });
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
    "isTrue": "on tõsi",
    "isFalse": "on väär",
    "filter": "Filter",
    "clear": "Puhasta",
    "operator": "Operaator"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
        "eq": "On vđrdne...",
        "neq": "Pole vđrdne...",
        "startswith": "Algab...",
        "contains": "Sisaldab",
        "doesnotcontain": "Ei sisalda",
        "endswith": "Lđppeb...",
        "isnull": "On null",
        "isnotnull": "Pole  null",
        "isempty": "On tühi",
        "isnotempty": "Pole tühi",
        "isnullorempty": "Ei oma väärtust",
        "isnotnullorempty": "Omab väärtust"
  },
  "number": {
      "eq": "On võrdne...",
      "neq": "Pole võrdne...",
      "gte": "On suurem või võrdne...",
      "gt": "On suurem kui...",
      "lte": "On väiksem või võrdne...",
      "lt": "On väiksem kui...",
      "isnull": "On null",
      "isnotnull": "Pole null"
  },
  "date": {
      "eq": "On võrdne...",
      "neq": "Pole võrdne...",
      "gte": "On pärast või võrdne...",
      "gt": "On pärast",
      "lte": "On ennem või võrdne...",
      "lt": "On ennem",
      "isnull": "On null",
      "isnotnull": "Pole null"
  },
  "enums": {
      "eq": "On võrdne...",
      "neq": "Pole võrdne...",
      "isnull": "On null",
      "isnotnull": "Pole null"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
    "info": "Näita valikuid väärtusega, mis:...",
    "title": "Näita valikuid väärtusega, mis...",
    "isTrue": "On tõsi",
    "isFalse": "On väär",
    "filter": "Vali filter",
    "clear": "Puhasta",
    "and": "Ja",
    "or": "Või",
    "selectValue": "-Vali väärtus-",
    "operator": "Operaator",
    "value": "Väärtus",
    "cancel": "Tühista",
    "done": "Tehtud",
    "into": "Sees",
    "buttonTitle": "{0} tulba seadete filter"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "On võrdne...",
    "neq": "Pole võrdne...",
    "startswith": "Algab...",
    "contains": "Sisaldab",
    "doesnotcontain": "Ei sisalda",
    "endswith": "Lõppeb...",
    "isnull": "On null",
    "isnotnull": "Pole null",
    "isempty": "On tühi",
    "isnotempty": "Ei ole tühi",
    "isnullorempty": "Ei oma väärtust",
    "isnotnullorempty": "Omab väärtust"
  },
  "number": {
    "eq": "On võrdne...",
    "neq": "Pole võrdne...",
    "gte": "On suurem või võrdne...",
    "gt": "On suurem kui...",
    "lte": "On väiksem või võrdne...",
    "lt": "On väiksem kui...",
    "isnull": "On null",
    "isnotnull": "Pole null"
  },
  "date": {
    "eq": "On võrdne...",
    "neq": "Pole võrdne",
    "gte": "On pärast või võrdne...",
    "gt": "On pärast...",
    "lte": "On ennem või võrdne...",
    "lt": "Ion ennem...",
    "isnull": "On null",
    "isnotnull": "Pole null"
  },
  "enums": {
    "eq": "On võrdne...",
    "neq": "Pole võrdne...",
    "isnull": "On null",
    "isnotnull": "Pole  null"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
    "checkAll": "Vali kõik",
    "clearAll": "Puhasta kõik",
    "clear": "Puhasta",
    "filter": "Filltri valik",
    "search": "Otsi",
    "cancel": "Tühista",
    "selectedItemsFormat": "{0} artiklit valitud",
    "done": "Tehtud",
    "into": "sees"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
        "addChild": "Lisa laps",
        "append": "Lisa ülesanne",
        "insertAfter": "Lisa alla",
        "insertBefore": "Lisa üles",
        "pdf": "Ekspordi PDF-i"
  },
    "cancel": "Tühista",
    "deleteDependencyWindowTitle": "Kustuta seos",
    "deleteTaskWindowTitle": "Kustuta ülesanne",
    "destroy": "Kustuta",
    "editor": {
        "assingButton": "Määra",
        "editorTitle": "Ülesanne",
        "end": "Lõpp",
        "percentComplete": "Valmis",
        "plannedStart": "Planeeritud algus",
        "plannedEnd": "Planeeritud lõpp",
        "resources": "Allikad",
        "resourcesEditorTitle": "Allikad",
        "resourcesHeader": "Allikad",
        "start": "Algus",
        "title": "Pealkiri",
        "unitsHeader": "Ühikud",
        "parent": "Lapsevanem",
        "addNew": "Lisa",
        "name": "Nimi",
        "percentCompleteHint": "Väärtus 0-1",
        "remove": "Eemalda",
        "actualStart": "Tegelik algus",
        "actualEnd": "Tegelik lõpp",
        "parentOptionLabel": "-Puudub-",
        "general": "Peamine",
        "predecessors": "Eelkäijad",
        "successors": "Järeltulijad",
        "other": "Muu",
        "dependencyType": "Tüüp"
  },
  "plannedTasks": {
      "switchText": "Planeeritud ülesanded",
      "offsetTooltipAdvanced": "Ennetähtaegselt lõpetatud",
      "offsetTooltipDelay": "Viivitus",
      "seconds": "Sekundid",
      "minutes": "Minutid",
      "hours": "Tunnid",
      "days": "Päevad"
  },
    "save": "Salvesta",
    "selectView": "Vali vaade",
    "views": {
        "day": "Päev",
        "end": "Lõpp",
        "month": "Kuu",
        "start": "Alusta",
        "week": "Nädal",
        "year": "Aasta"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Tühista muudatus",
    "canceledit": "Tühista",
    "create": "Lisa uus salvestus",
    "destroy": "Kustuta",
    "edit": "Redigeeri",
    "excel": "Ekspordi Excelisse",
    "pdf": "Ekspordi pdf-i",
    "save": "Salvesta muudatused",
    "select": "Vali",
    "update": "Salvesta",
    "search": "Otsi…",
    "selectRow": "Vali rida",
    "selectAllRows": "Kõik read",
    "clearSelection": "Puhasta valik",
    "copySelection": "Kopeeri valik",
    "copySelectionNoHeaders": "Kopeeri valik (ilma päiseta)",
    "reorderRow": "Järjesta rida ümber",
    "reorderRowUp": "Üles",
    "reorderRowDown": "Alla",
    "reorderRowTop": "Kõike peale",
    "reorderRowBottom": "Kõige alla",
    "exportPdf": "Ekspordi PDF-i",
    "exportExcel": "Ekspordi Excel-isse",
    "exportToExcelAll": "Kõik",
    "exportToExcelSelection": "Valik",
    "exportToExcelSelectionNoHeaders": "Valik (ilma päiseta)",
    "sortAsc": "Sordi kasvavalt",
    "sortDesc": "Sordi kahanevalt",
    "moveGroupPrevious": "Liigu eelmisele",
    "moveGroupNext": "Liigu järgmisele",
  },
  "editable": {
    "cancelDelete": "Tühista",
    "confirmation": "Olete kindel, et soovite selle salvestise kustutada",
    "confirmDelete": "Kustuta"

  },
    "noRecords": "Salvestisi pole saadaval",
    "expandCollapseColumnHeader": "",
    "groupHeader": "Grupeerimiseks vajutage ctrl + tühik ",
    "ungroupHeader": "Grupeeringust vabastamiseks vajutage ctrl + tühik",
    "toolbarLabel": "Joonvõrestiku tööriistariba",
    "groupingHeaderLabel": "Joonvõrestiku grupeerimise pealkiri",
    "filterCellTitle": "Lahtrite filter"
});
}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {
kendo.ui.TaskBoard.prototype.options.messages =
$.extend(true, kendo.ui.TaskBoard.prototype.options.messages,{
    "edit": "Redigeeri",
    "createNewCard": "Loo uus kaart",
    "create": "Loo",
    "search": "Otsing",
    "previewCard": "Kaardi eelvaade",
    "addCard": "Lisa kaart",
    "editCard": "Redigeeri kaarti",
    "deleteCard": "Kustuta kaart",
    "addColumn": "Lisa veerg",
    "editColumn": "Redigeeri veergu",
    "deleteColumn": "Kustuta veerg",
    "close": "Sule",
    "cancel": "Tühista",
    "delete": "Kustuta",
    "saveChanges": "Salvesta muudatused",
    "title": "Pealkiri:",
    "description": "Kirjeldus",
    "newColumn": "uus veerg",
    "deleteColumnConfirm": "Kas olete kindel, et soovite selle veeru kustutada?",
    "deleteCardConfirm": "Kas olete kindel, et soovite selle kaardi kustusada?"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Kuvatavad kirjed puuduvad",
    "loading": "Laeb...",
    "requestFailed": "Päring nurjus.",
    "retry": "Proovi uuesti",
    "commands": {
        "edit": "Redigeeri",
        "update": "Salvesta",
        "canceledit": "Tühista",
        "create": "Lisa uus kirje",
        "createchild": "Lisa lapse kirje",
        "destroy": "Kustuta",
        "excel": "Ekspordi Excel´i",
        "pdf": "Ekspordi  PDF-i"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
    "empty": "Tiri veeru päisest ja heida see siia, et grupeerida selle veeru järgi"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
    "upArrowText": "Suurenev väärtus",
    "downArrowText": "Vähenev väärtus"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
    "pause": "Paus",
    "play": "Mängi salvestust",
    "mute": "Heli maha",
    "unmute": "Heli sisse lülitada",
    "quality": "Kvaliteet",
    "fullscreen": "Täisekraan",
    "volume": "heli",
    "time": "kellaaeg"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
    "allPages": "Kõik",
    "display": "{0} - {1}  {2}-st artiklist",
    "empty": "Kuvatavad artiklid puuduvad",
    "page": "Lehekülg",
    "pageButtonLabel": "Lehekülg {0}",
    "pageSizeDropDownLabel": "Lehe mõõtmete rippmenüü",
    "of": " {0}-st",
    "itemsPerPage": "Artikleid lehe kohta",
    "first": "Mine esilehele",
    "previous": "Mine eelnevale lehele",
    "next": "Mine järgmisele lehele ",
    "last": "Liigu viimasele lehele",
    "refresh": "Värskenda",
    "morePages": "Rohkem lehti"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
    "allPages": "Kõik",
    "display": "{0} - {1}  {2}-st artiklist",
    "empty": "Kuvatavad artiklid puuduvad",
    "page": "Lehekülg",
    "of": " {0}-st",
    "itemsPerPage": "Artikleid lehe kohta",
    "first": "Mine esilehele",
    "previous": "Mine eelnevale lehele",
    "next": "Mine järgmisele lehele ",
    "last": "Liigu viimasele lehele",
    "refresh": "Värskenda",
    "morePages": "Rohkem lehti"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
    "measureFields": "Heida andmeväljad siia",
    "columnFields": "Heida tulbaväljad siia",
    "rowFields": "Heida veergude väljad siia"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
    "info": "Näita artikleid väärtusega:",
    "filterFields": "Väljade filter",
    "filter": "Filtreeri",
    "include": "Kaasa väljad...",
    "title": "Väljad, mida kaasata",
    "clear": "Puhasta",
    "ok": "Ok",
    "cancel": "Tühistal",
    "operators": {
        "contains": "Sisaldab",
        "doesnotcontain": "Ei sisalda",
        "startswith": "Algab...",
        "endswith": "Lõpeb...",
        "eq": "On võrdne...",
        "neq": "Pole võrdne…"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
    "repeat": "Korda",
    "recurrenceEditorTitle": "Korduste redigeerija",
    "frequencies": {
        "never": "Mitte kunagi",
        "hourly": "Iga tund",
        "daily": "Iga päev",
        "weekly": "Iga nädal",
        "monthly": "Iga kuu",
        "yearly": "Iga aasta"
  },
  "hourly": {
      "repeatEvery": "Korda iga...: ",
      "intervall": "tund(-nid)"
  },
  "daily": {
      "repeatEvery": "Korda iga...: ",
      "intervall": " päev(-ad)"
  },
  "weekly": {
      "interval": " nädal(-ad)",
      "repeatEvery": "Korda iga...: ",
      "repeatOn": "Korda….: "
  },
  "monthly": {
      "repeatEvery": "Korda iga...: ",
      "repeatOn": "Korda...: ",
      "interval": " kuu(-d)",
      "day": "Päev ",
      "date": "Kuupäev"
  },
  "yearly": {
      "repeatEvery": "Korda iga...: ",
      "repeatOn": "Korda...: ",
      "interval": " aasta(-d)",
      "of": "millegi oma... ",
      "month": "kuu...",
      "day": "päev",
      "date": "Kuupäev"
  },
  "end": {
      "label": "Lõpp:",
      "mobileLabel": "Lõpeb",
      "never": "Mitte kunagi",
      "after": "Pärast... ",
      "occurrence": "Esinemise sagedus",
      "on": "Sisselülitatud"
  },
  "offsetPositions": {
      "first": "esimene",
      "second": "teine",
      "third": "kolmas",
      "fourth": "neljas",
      "last": "viimane"
  },
  "weekdays": {
      "day": "päev",
      "weekday": "nädalapäev",
      "weekend": "nädalavahetuse päev"
  }
});
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
    $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "cancel": "Tühista",
        "update": "Salvesta",
        "endTitle": "Kordumine lõpeb",
        "repeatTitle": "Korda mustrit",
        "headerTitle": "Korda üritust",
      "end": {
        "patterns": {
              "never": "Mitte kunagi",
              "after": "Pärast...",
              "on": "Jooksval ajal..."
        },
          "never": "Mitte kunagi",
          "after": "Lõpetada kordus pärast...",
          "on": "Lõpetada kordus jooksval ajal..."
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
        "repeatBy": "Korda….kaupa: ",
        "dayOfMonth": "Kuupäevade",
        "dayOfWeek": "Nädalapäevade",
        "repeatEvery": "Korda igal...",
        "every": "Iga-",
        "day": "Päev "
      },
      "yearly": {
        "interval": "",
        "repeatBy": "Korda…kaupa: ",
        "dayOfMonth": "Kuupäevade",
        "dayOfWeek": "Nädalapäevade",
        "repeatEvery": "Korda igal...: ",
        "every": "Iga-",
        "month": "Kuu",
        "day": "Päev"
      }
    });
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
    "allDay": "Terve päev",
    "date": "Kuupäev",
    "event": "Üritus",
    "time": "Kellaaeg",
    "showFullDay": "Näita tervet päeva",
    "showWorkDay": "Näita lahtioleku aegu",
    "today": "Täna",
    "save": "Salvesta",
    "cancel": "Tühista",
    "destroy": "Kustuta",
    "resetSeries": "Lähtesta sarjad",
    "deleteWindowTitle": "Kustuta üritus",
    "ariaSlotLabel": "Valitud alates {0:t} kuni {1:t}",
    "ariaEventLabel": "{0}  {1:D}-l kl. {2:t}",
    "refresh": "Värskenda",
    "selectView": "Vali vaade",
    "editable": {
        "confirmation": "Kas olete kindel, et soovite selle ürituse kustutada?"
  },
  "views": {
      "day": "Päev",
      "week": "Nädal",
      "workWeek": "Töönädal",
      "agenda": "Päevakord",
      "month": "Kuu"
  },
  "recurrenceMessages": {
      "deleteWindowTitle": "Kustuta korduv artikkel",
      "resetSeriesWindowTitle": "Lähtesta sarjad",
      "deleteWindowOccurrence": "Kustuta jooksvad kordused",
      "deleteWindowSeries": "Kustuta sarjad",
      "deleteRecurringConfirmation": "Kas olete kindel, et soovite kustutada selle ürituse kordumise?",
      "deleteSeriesConfirmation": "Kas olete kindel, et soovite kustutada kogu sarja?",
      "editWindowTitle": "Redigeeri korduvat artiklit",
      "editWindowOccurrence": "Redigeeri jooksvat kordumist",
      "editWindowSeries": "Redigeeri sarju",
      "deleteRecurring": "Kas soovite kustutada vaid selle ürituse kordumist või kogu sarja kordumist?",
      "editRecurring": "Kas soovite redigeerida vaid selle ürituse kordumist või kogu sarja kordumist?"
  },
  "editor": {
      "title": "Pealkiri",
      "start": "Algus",
      "end": "Lõpp",
      "allDayEvent": "Kogu päeva üritus",
      "description": "Kirjeldus",
      "repeat": "Korda",
      "timezone": " ",
      "startTimezone": "Alguse ajavöönd",
      "endTimezone": "Lõpu ajavöönd",
      "separateTimezones": "Kasuta erinevaid alguse ja lõpu ajavööndeid",
      "timezoneEditorTitle": "Ajavööndid",
      "timezoneEditorButton": "Ajavöönd",
      "timezoneTitle": "Ajavööndid",
      "noTimezone": "Ilma ajavööndita",
      "editorTitle": "Üritus"
  },
    "search": "Otsing..."
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
    "allBorders": "Kõik piirded",
    "insideBorders": "Sisepiirded",
    "insideHorizontalBorders": "Sise-horisontaalpiirded",
    "insideVerticalBorders": "Sise-vertikaalpiirded",
    "outsideBorders": "Välispiirded",
    "leftBorder": "Vasak piire",
    "topBorder": "Ülapiire",
    "rightBorder": "Parem piire",
    "bottomBorder": "Alumine piire",
    "noBorders": "Ilma piireteta",
    "reset": "Lähtesta värv",
    "customColor": "Kohandatud värv...",
    "apply": "Rakenda",
    "cancel": "Tühista"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
    "apply": "Rakenda",
    "save": "Salvesta",
    "cancel": "Tühista",
    "remove": "Eemalda",
    "retry": "Proovi uuesti",
    "revert": "Pöördu tagasi",
    "okText": "OK",
    "formatCellsDialog": {
        "title": "Vorming",
        "categories": {
            "number": "Arv",
            "currency": "Valuuta",
            "date": "Kuupäev"
      }
  },
  "fontFamilyDialog": {
      "title": "Font"
  },
  "fontSizeDialog": {
      "title": "Fondi suurus"
  },
  "bordersDialog": {
      "title": "Piirded"
  },
  "alignmentDialog": {
      "title": "Joondus",
      "buttons": {
          "justifyLeft": "Joonda vasakule",
          "justifyCenter": "Joonda keskele",
          "justifyRight": "Joonda paremale",
          "justifyFull": "Ühtlusta",
          "alignTop": "Joonda üles",
          "alignMiddle": "Joonda keskele",
          "alignBottom": "Joonda alla"
    }
  },
  "mergeDialog": {
      "title": "Ühenda lahtrid",
      "buttons": {
          "mergeCells": "Ühenda kõik",
          "mergeHorizontally": "Ühenda horisontaalselt",
          "mergeVertically": "Ühenda vertikaalselt",
          "unmerge": "Eemalda ühendus"
    }
  },
  "freezeDialog": {
      "title": "Külmuta paneelid",
      "buttons": {
          "freezePanes": "Külmuta paneelid",
          "freezeRows": "Külmuta read",
          "freezeColumns": "Külmuta veerud",
          "unfreeze": "Vabasta paneelid"
    }
  },
  "confirmationDialog": {
      "text": "Kas oled kindel, et soovid selle lehe eemaldada?",
      "title": "Eemalda leht"
  },
  "validationDialog": {
      "title": "Andmete valideerimine",
      "hintMessage": "Palun sisesta kehtiv {0} väärtus {1}.",
      "hintTitle": "Kehtestamine {0}",
      "criteria": {
          "any": "Mistahes väärtus",
          "number": "Arv",
          "text": "Tekst",
          "date": "Kuupäev",
          "custom": "Kohandatud valem",
          "list": "Loetelu"
    },
    "comparers": {
        "greaterThan": "suurem kui",
        "lessThan": "väiksem kui",
        "between": "vahemik",
        "notBetween": "pole vahemikus",
        "equalTo": "võrdne...",
        "notEqualTo": "pole võrdne...",
        "greaterThanOrEqualTo": "suurem või võrdne...",
        "lessThanOrEqualTo": "väiksem või võrdne..."
    },
    "comparerMessages": {
        "greaterThan": "suurem kui {0}",
        "lessThan": "väiksem kui {0}",
        "between": "vahemikus {0} ja {1}",
        "notBetween": "pole vahemikus {0} ja {1}",
        "equalTo": "on võrdne {0}",
        "notEqualTo": "pole võrdne {0}",
        "greaterThanOrEqualTo": "suurem kui või võrdne... {0}",
        "lessThanOrEqualTo": "väiksem kui või võrdne {0}",
        "custom": "mis rahuldab valemit: {0}"
    },
    "labels": {
        "criteria": "Kriteerium",
        "comparer": "Võrdle",
        "min": "Min",
        "max": "Maks",
        "value": "Väärtus",
        "start": "Algus",
        "end": "Lõpp",
        "onInvalidData": "Kehtetute andmete kohta",
        "rejectInput": "Lükka sisestus tagasi",
        "showWarning": "Näita hoiatust",
        "showHint": "Näita vihjet",
        "hintTitle": "Vihje pealkiri",
        "hintMessage": "Vihje sõnum",
        "ignoreBlank": "Ignoreeri tühja"
    },
    "placeholders": {
        "typeTitle": "Sisesta pealkiri",
        "typeMessage": "Sisesta sõnum
    }
  },
  "exportAsDialog": {
      "title": "Eksport...",
      "labels": {
          "fileName": "Faili nimetus",
          "saveAsType": "Salvesta kui tüüp",
          "exportArea": "Ekspordi",
          "paperSize": "Lehe suurus",
          "margins": "Serva veerised",
          "orientation": "Lehe suund",
          "print": "Prindi",
          "guidelines": "Juhised",
          "center": "Joonda keskele",
          "horizontally": "Horisontaalselt",
          "vertically": "Vertikaalselt"
    }
  },
  "modifyMergedDialog": {
      "errorMessage": "Ei saa muuta osa ühendatud lahtritest."
  },
  "useKeyboardDialog": {
      "title": " Kopeeri ja kleebi",
      "errorMessage": "Neid toiminguid ei saa algatada menüü kaudu. Palun kasutage klaviatuuri otsevalikuid selle asemel:",
      "labels": {
          "forCopy": "kopeerimiseks",
          "forCut": "lõikamiseks",
          "forPaste": "kleepimiseks"
    }
  },
  "unsupportedSelectionDialog": {
      "errorMessage": "Seda toimingut ei saa teostada  mitmel piirkonnal korraga."
  },
  "insertCommentDialog": {
      "title": "Sisesta kommentaar",
    "labels": {
        "comment": "Kommentaar",
        "removeComment": "Eemalda kommentaar"
    }
  },
  "insertImageDialog": {
      "title": "Sisesta pilt",
      "info": "Tiri pilt siia või kliki valimiseks",
      "typeError": "Palun vali JPEG, PNG või GIF pilt"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
    "sortAscending": "Sortimisvahemik  A kuni Z",
    "sortDescending": "Sortimisvahemik Z kuni A",
    "filterByValue": "Filtreeri väärtuse järgi",
    "filterByCondition": "Filtreeri tingimuse järgi",
    "apply": "Rakenda",
    "search": "Otsi",
    "addToCurrent": "Lisa jooksvale valikule",
    "clear": "Puhasta",
    "blanks": "(Tühjad)",
    "operatorNone": "Puudub",
    "and": "JA",
    "or": "VÕI",
  "operators": {
    "string": {
          "contains": "Tekst sisaldab",
          "doesnotcontain": "Tekst ei sisalda",
          "startswith": "Tekst algab...",
          "endswith": "Tekst lõpeb..."
    },
    "date": {
        "eq": "Kuupäev on",
        "neq": "Kuupäev ei ole",
        "lt": "Kuupäev on enne...",
        "gt": "Kuupäev on pärast"
    },
    "number": {
        "eq": "On võrdne...",
        "neq": "sPole võrdne...",
        "gte": "On suurem või võrdne...",
        "gt": "On suurem kui...",
        "lte": "On väiksem või võrdne...",
        "lt": "On väiksem kui..."
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
    "reset": "Lähtesta värv",
    "customColor": "Kohaldatud värv...",
    "apply": "Rakenda",
    "cancel": "Tühista"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
    "addColumnLeft": "Lisa veerg vasakuleeft",
    "addColumnRight": "Lisa veerg paremale",
    "addRowAbove": "Lisa rida üles",
    "addRowBelow": "Lisa rida alla",
    "alignment": "Joondamine",
    "alignmentButtons": {
        "justifyLeft": "Joonda vasakule",
        "justifyCenter": "Joonda keskele",
        "justifyRight": "Joonda paremale",
        "justifyFull": "Sirgenda read",
        "alignTop": "Joonda üles",
        "alignMiddle": "Joonda keskele",
        "alignBottom": "Joonda alla
  },
    "backgroundColor": "Taust",
    "bold": "Jämedas kirjas",
    "borders": "Piirded",
    "colorPicker": {
        "reset": "Lähtesta värv",
        "customColor": "Kohaldatud värv..."
  },
    "copy": "Kopeeri",
    "cut": "Lõika",
    "deleteColumn": "Kustuta veerg",
    "deleteRow": "Kustuta rida",
    "excelImport": "Impordi Excelist...",
    "filter": "Filtreeri",
    "fontFamily": "Font",
    "fontSize": "Fondi suurus",
    "format": "Kohaldatud vorming...",
    "formatTypes": {
        "automatic": "Automaatne",
        "number": "Arv",
        "percent": "Protsent",
        "financial": "Finants",
        "currency": "Valuuta",
        "date": "Kuupäev",
        "time": "Aeg",
        "dateTime": "Kuupäeva aeg",
        "duration": "Kestvus",
        "moreFormats": "Rohkem vorminguid..."
  },
    "formatDecreaseDecimal": "Vähenda kümnendit",
    "formatIncreaseDecimal": "Suurenda kümnendit",
    "freeze": "Freeze panes",
    "freezeButtons": {
        "freezePanes": "Külmuta paneelid",
        "freezeRows": "Külmuta read",
        "freezeColumns": "Külmuta veerud",
        "unfreeze": "Vabasta paneelid"
  },
    "insertComment": "Sisesta kommentaar",
    "insertImage": "Sisesta pilt",
    "italic": "Kaldkiri - Italic",
    "merge": "Ühenda lahtrid ",
    "mergeButtons": {
        "mergeCells": "Ühenda kõik",
        "mergeHorizontally": "Ühenda horisontaalselt",
        "mergeVertically": "Ühenda vertikaalselt",
        "unmerge": "Eemalda ühendus"
  },
    "open": "Ava...",
    "paste": "Kleebi",
    "quickAccess": {
        "redo": "Tee uuesti",
        "undo": "Võta tagasi"
  },
    "saveAs": "Salvesta nagu...",
    "sortAsc": "Sordi kasvavalt",
    "sortDesc": "Sordi kahanevalt",
    "sortButtons": {
        "sortSheetAsc": "Sordi leht A kuni Z",
        "sortSheetDesc": "Sordi leht  Z kuni A",
        "sortRangeAsc": "Sortimisvahemik A kuni  Z",
        "sortRangeDesc": "Sortimisvahemik Z kuni A"
  },
    "textColor": "Teksti värv",
    "textWrap": "Koonda tekst lahtris",
    "underline": "Jooni alla",
    "validation": "Andmete kehtestamine..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
        "shiftingNonblankCells": "Ei saa sisestada lahtreid andmete kaotuse võimaluse tõttu. Valige teine sisestuskoht või kustutage andmed oma töölehe lõpust.",
        "filterRangeContainingMerges": "Ei saa luua filtrit ühendatud lahtreid sisaldavas vahemikus",
        "validationError": "Teie poolt sisestatud väärtus rikub lahtrile seatud kehtestamisreegleid."
  },
  "tabs": {
      "home": "Pealehele",
      "insert": "Sisesta",
      "data": "Andmed"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
    "increaseButtonTitle": "Suurenda",
    "decreaseButtonTitle": "Vähenda"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
        "remove": "Kustuta",
        "moveUp": "Liigu üles",
        "moveDown": "Liigu alla",
        "transferTo": "Kanna üle kohta...",
        "transferFrom": "Kanna üle kohast...",
        "transferAllTo": "Kanna kõik üle kohta...",
        "transferAllFrom": "Kanna kõik üle kohast..."
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Puuduvad kuvatavad kanded",
    "loading": "Laeb andmeid...",
    "requestFailed": "Päring ebaõnnestus.",
    "retry": "Proovi uuesti",
  "commands": {
      "edit": "Redigeeri",
      "update": "Uuenda",
      "canceledit": "Tühista",
      "create": "Lisa uus kanne",
      "createchild": "Lisa kanne lapse kohta",
      "destroy": "Kustuta",
      "excel": "Expordi Excelli",
      "pdf": "Ekspordi PDF-i
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
    "loading": "Laeb andmeid...",
    "requestFailed": "Päring ebaõnnestus.",
    "retry": "Proovi uuesti"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
    "select": "Vali failid...",
    "cancel": "Tühista",
    "retry": "Proovi uuesti",
    "remove": "Eemalda",
    "clearSelectedFiles": "Puhasta",
    "uploadSelectedFiles": "Lae failid üles",
    "dropFilesHere": "Tirige failid üleslaadimiseks siia",
    "statusUploading": "üleslaadimine",
    "statusUploaded": "üleslaetud",
    "statusWarning": "hoiatus",
    "statusFailed": "nurjus",
    "headerStatusPaused": "Pausil",
    "headerStatusUploading": "Üleslaadimine...",
    "headerStatusUploaded": "Tehtud",
    "uploadSuccess": "Fail(-id) on edukalt üles laetud.",
    "uploadFail": "Fail(-ide) üleslaadimine nurjus.",
    "invalidMaxFileSize": "Fail on liiga suur.",
    "invalidMinFileSize": "Fail on liiga väike.",
    "invalidFileExtension": "Faili tüüp pole lubatud."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
    "required": "{0} on nõutud",
    "pattern": "{0} pole kehtiv",
    "min": "{0} peab olema suurem või võrdne {1}",
    "max": "{0} peab olema väiksem või võrdne {1}",
    "step": "{0} pole kehtiv",
    "email": "{0} pole kehtiv e-mail",
    "url": "{0} pole kehtiv URL",
    "date": "{0} pole kehtiv kuupäev",
    "dateCompare": "Lõpp-kuupäev peab olema suurem või võrdne alguskuupäevaga"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Laeb andmeid..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
    "close": "Sule"
});
}

/* TimePicker */

if (kendo.ui.TimePicker) {
kendo.ui.TimePicker.prototype.options.messages =
$.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
    set: "Seadista",
    cancel: "Tühista",
    hour: "tund",
    minute: "minut",
    second: "sekund",
    millisecond: "millisekund",
    now: "Praegu"
});
}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {
kendo.ui.DateTimePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
    set: "Määra",
    cancel: "Tühista",
    hour: "Tund",
    minute: "Minut",
    second: "Sekund",
    millisecond: "Millisekund",
    now: "Praegu",
    date: "Kuupäev",
    time: "Kellaaeg",
    today: "Täna",
    weekColumnHeader: ""
});
}

/* Calendar */
if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
    "today": "Täna",
    "weekColumnHeader": "",
    "navigateTo": "Navigeeri... ",
    "parentViews": {
        "month": "Aasta vaade",
        "year": "Dekaadi vaade",
        "decade": "Sajandi vaade"
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
    "cancel": "Tõhista"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
    "cancel": "Tõhista"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "aasta",
        "month": "kuu",
        "day": "päev",
        "weekday": "nädalapäev",
        "hour": "tunnid",
        "minute": "minutid",
        "second": "sekundid",
        "dayperiod": "AM/PM"
    });
}

/* List messages */

if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
    $.extend(true, kendo.ui.List.prototype.options.messages,{
        "clear": "Puhasta",
        "noData": "Andmeid ei leitud."
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
        "singleTag": "Artikleid valitud",
        "clear": "puhasta",
        "deleteTag": "kustuta",
        "noData": "Andmeid ei leitud."
    });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
    $.extend(true, kendo.ui.MultiSelect.prototype.options.messages,{
        "singleTag": "Valitud artikkel(-lid)",
        "clear": "Puhasta",
        "deleteTag": "Kustuta",
        "noData": "Andmeid ei leitud",
        "downArrow": "Vali"
    });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
    $.extend(true, kendo.ui.Chat.prototype.options.messages,{
        "messageListLabel": "Sõnumite loetelu",
        "placeholder": "Sisesta sõnum...",
        "toggleButton": "Lülituste tööriistariba",
        "sendButton": "Saada sõnum"
    });
}

/* Wizard messages */

if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
    $.extend(true, kendo.ui.Wizard.prototype.options.messages,{
        "reset": "Lähtesta",
        "previous": "Eelnev",
        "next": "Järgmine",
        "done": "Tehtud",
        "step": "Samm",
        "of": "millegi-"
    });
}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
    $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        defaultFileName: "Dokument",
        toolbar: {
            zoom: {
                zoomLevel: "Suumi tase",
                zoomOut: "Suumi välja",
                zoomIn: "Suumi sisse",
                actualWidth: "Tegelik laius",
                autoWidth: "Automaatne laius",
                fitToWidth: "Sobita laiusesse",
                fitToPage: "Sobita lehele"
            },
            open: "Ava",
            exportAs: "Ekspordi",
            download: "Lae alla",
            pager: {
                first: "Mine esilehele",
                previous: "Mine eelnevale lehele",
                next: "Mine järgmisele lehele",
                last: "Mine viimasele lehele",
                of: "millegi kohta",
                page: "leht",
                pages: "lehed"
            },
            print: "Prindi",
            toggleSelection: "Luba valik",
            togglePan: " Luba paneelid",
            search: "Otsi"
        },
        errorMessages: {
            notSupported: "Ainult PDF-failid on lubatud.",
            parseError: "PDF-faili töötlemine nurjus.",
            notFound: "Faili ei leitud.",
            popupBlocked: "Hüpikaken on blokeeritud."
        },
        dialogs: {
            exportAsDialog: {
                title: "Eksport...",
                defaultFileName: "Dokument",
                pdf: "Portatiivne dokumendivorming (.pdf)",
                png: "Portatiivne võrgugraafika (.png)",
                svg: "Skaleeritav vektorgraafika (.svg)",
                labels: {
                    fileName: "Faili nimetus",
                    saveAsType: "Salvesta nagu...",
                    page: "Leht"
                }
            },
            okText: "OK",
            save: "Salvesta",
            cancel: "Tühista",
            search: {
                inputLabel: "Otsi Teksti",
                matchCase: "Sarna juhtum",
                next: "Järgmine sarnasus",
                previous: "Eelnev sarnasus",
                close: "Sulge",
                of: "millegi...",
                dragHandle: "Tiri otsing"
            }
        }
    });
}

/* Captcha messages */

if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
    $.extend(true, kendo.ui.Captcha.prototype.options.messages,{
        "reset": "Lähtesta captcha",
        "audio": "Räägi captcha",
        "imageAlt": "Sisesta Captcha kood pildilt",
        "success": "Tuvastamine õnnestus"
    });
}

/* OrgChart messages */

if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
    $.extend(true, kendo.ui.OrgChart.prototype.options.messages,{
        label: "Org  diagramm",
        edit: "Redigeeri",
        create: "Loo",
        destroy: "Kustuta",
        destroyContent: "Kas olete kindel, et soovite selle artikli ja kõik selle järglased kustutada?",
        destroyTitle: "Kustuta artikkel",
        cancel: "Tühista",
        save: "Salvesta",
        menuLabel: "Redigeeri menüüd",
        uploadAvatar: "Lae üles uus  avatar",
        parent: "Lapsevanem",
        name: "Nimi",
        title: "Pealkiri",
        none: "--Puudub--",
        expand: "laienda",
        collapse: "kokku tõmbama"
    });
}

/* Map messages */

if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
    $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Kaardi pealkiri"
    });
}

})(window.kendo.jQuery);
