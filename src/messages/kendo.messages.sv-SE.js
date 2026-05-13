(function($, undefined) {

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Är lika med",
    "gt": "Är senare än",
    "gte": "Är lika eller senare än",
    "lt": "Är tidigare än",
    "lte": "Är lika eller tidigare än",
    "neq": "Är inte lika med"
  },
  "number": {
    "eq": "Är lika med",
    "gt": "Är större än",
    "gte": "Är lika eller större än",
    "lt": "Är mindre än",
    "lte": "Är lika eller mindre än",
    "neq": "Är inte lika med"
  },
  "string": {
    "contains": "Innehåller",
    "doesnotcontain": "Innehåller inte",
    "endswith": "Slutar med",
    "eq": "Är lika med",
    "neq": "Är inte lika med",
    "startswith": "Börjar med"
  },
  "enums": {
    "eq": "Är lika med",
    "neq": "Är inte lika med"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
  kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
          "checkAll": "Markera alla",
          "clear": "Rensa",
          "filter": "Filtrera",
          "search": "Sök",
          "selectedItemsFormat": "{0} alternativ valt"
      });
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Är lika med",
    "gt": "Är senare än",
    "gte": "Är lika eller senare än",
    "lt": "Är tidigare än",
    "lte": "Är lika eller tidigare än",
    "neq": "Är inte lika med"
  },
  "number": {
    "eq": "Är lika med",
    "gt": "Är större än",
    "gte": "Är lika eller större än",
    "lt": "Är mindre än",
    "lte": "Är lika eller mindre än",
    "neq": "Är inte lika med"
  },
  "string": {
    "contains": "Innehåller",
    "doesnotcontain": "Innehåller inte",
    "endswith": "Slutar med",
    "eq": "Är lika med",
    "neq": "Är inte lika med",
    "startswith": "Börjar med"
  },
  "enums": {
    "eq": "Är lika med",
    "neq": "Är inte lika med"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Kolumner",
  "sortAscending": "Sortera stigande",
  "sortDescending": "Sortera fallande",
  "settings": "Kolumninställningar",
  "done": "Klar",
  "lock": "Lås",
  "unlock": "Lås upp"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "dag(ar)",
    "repeatEvery": "Återkommer varje:"
  },
  "end": {
    "after": "Efter",
    "occurrence": "förekomst(er)",
    "label": "Slut:",
    "never": "Aldrig",
    "on": "På",
    "mobileLabel": "Slutar"
  },
  "frequencies": {
    "daily": "Daglig",
    "monthly": "Månatlig",
    "never": "Aldrig",
    "weekly": "Veckovis",
    "yearly": "Årlig"
  },
  "monthly": {
    "day": "Dag",
    "interval": "månad(er)",
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:"
  },
  "offsetPositions": {
    "first": "första",
    "fourth": "fjärde",
    "last": "sista",
    "second": "andra",
    "third": "tredje"
  },
  "weekly": {
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:",
    "interval": "vecka(or)"
  },
  "yearly": {
    "of": "av",
    "repeatEvery": "Återkommer varje:",
    "repeatOn": "Återkommer på:",
    "interval": "år"
  },
  "weekdays": {
    "day": "dag",
    "weekday": "veckodag",
    "weekend": "helgdag"
  }
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Släpp data fält här",
  "columnFields": "Släpp kolumnfält här",
  "rowFields": "Släpp radfält här"
});
}

  /* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Visa objekt med värden som:",
  "filterFields": "Filtrera fält",
  "filter": "Filtrera",
  "include": "Inkludera fält...",
  "title": "Fält att inkludera",
  "clear": "Rensa",
  "ok": "Ok",
  "cancel": "Avbryt",
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

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Rensa",
  "filter": "Filtrera",
  "isFalse": "är falskt",
  "isTrue": "är sant",
  "operator": "Operatör"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Och",
  "clear": "Rensa",
  "filter": "Filtrera",
  "info": "Visa poster med värde:",
  "title": "Visa poster med värde",
  "isFalse": "är falskt",
  "isTrue": "är sant",
  "or": "Eller",
  "selectValue": "-Välj-",
  "cancel": "Avbryt",
  "operator": "Operatör",
  "value": "Värde"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Avbryt",
    "cancel": "Avbryt ändringar",
    "create": "Lägg till post",
    "destroy": "Radera",
    "edit": "Ändra",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "Spara ändringar",
    "select": "Välj",
    "update": "Spara"
  },
  "editable": {
    "confirmation": "Är du säker på att du vill radera denna post?",
    "cancelDelete": "Avbryt",
    "confirmDelete": "Radera"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Dra en kolumnrubrik hit för att sortera på den kolumnen"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Allt",
  "display": "{0} - {1} av {2} poster",
  "empty": "Det finns inga poster",
  "first": "Gå till första sidan",
  "itemsPerPage": "poster per sida",
  "last": "Gå till sista sidan",
  "next": "Gå till nästa sida",
  "of": "av {0}",
  "page": "Sida",
  "previous": "Gå till föregående sida",
  "refresh": "Uppdatera",
  "morePages": "Fler sidor"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Alla",
  "display": "{0} - {1} av {2} poster",
  "empty": "Det finns inga poster",
  "first": "Gå till första sidan",
  "itemsPerPage": "poster per sida",
  "last": "Gå till sista sidan",
  "next": "Gå till nästa sida",
  "of": "av {0}",
  "page": "Sida",
  "previous": "Gå till föregående sida",
  "refresh": "Uppdatera",
  "morePages": "Fler sidor"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Avbryt",
  "retry": "Försök igen",
  "select": "Välj...",
  "remove": "Ta bort",
  "uploadSelectedFiles": "Ladda upp filer",
  "dropFilesHere": "släpp filer här för att ladda upp",
  "statusFailed": "misslyckades",
  "statusUploaded": "uppladdad",
  "statusUploading": "laddar upp",
  "headerStatusUploaded": "Uppladdad",
  "headerStatusUploading": "Laddar upp..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Fet",
  "search": "Sök",
  "createLink": "Lägg till länk",
  "fontName": "Välj typsnitt",
  "fontNameInherit": "(ärvt typsnitt)",
  "fontSize": "Välj storlek",
  "fontSizeInherit": "(ärvd storlek)",
  "formatBlock": "Formatering",
  "indent": "Öka indrag",
  "insertHtml": "Lägg till HTML",
  "insertImage": "Lägg till bild",
  "insertOrderedList": "Lägg till numrerad lista",
  "insertUnorderedList": "Lägg till punktlista",
  "italic": "Kursiv",
  "justifyCenter": "Centrerad text",
  "justifyFull": "Marginaljusterad text",
  "justifyLeft": "Vänsterjusterad text",
  "justifyRight": "Högerjusterad text",
  "outdent": "Minska indrag",
  "strikethrough": "Genomstruken",
  "style": "Stil",
  "subscript": "Nedsänkt",
  "superscript": "Upphöjd",
  "underline": "Understruken",
  "unlink": "Ta bort länk",
  "deleteFile": "Är du säker på att du vill radera \"{0}\"?",
  "directoryNotFound": "En mapp med detta namn hittades ej.",
  "emptyFolder": "Tom mapp",
  "invalidFileType": "Filen \"{0}\" är inte giltig. Tillåtna filtyper är {1}.",
  "orderBy": "Sortera på:",
  "orderByName": "Namn",
  "orderBySize": "Storlek",
  "overwriteFile": "'En fil med namn \"{0}\" finns redan i aktuell mapp. Vill du skriva över den?",
  "uploadFile": "Ladda upp",
  "backColor": "Bakgrundsfärg",
  "foreColor": "Färg",
  "dropFilesHere": "släpp filer här för att ladda upp",
  "dialogButtonSeparator": "eller",
  "dialogCancel": "Avbryt",
  "dialogInsert": "Lägg till",
  "imageAltText": "Alternativ text",
  "imageWebAddress": "Webbadress",
  "linkOpenInNewWindow": "Öppna länk i ett nytt fönster",
  "linkText": "Text",
  "linkToolTip": "Skärmtips",
  "linkWebAddress": "Webbadress",
  "createTable": "Skapa tabell",
  "addColumnLeft": "Lägg till vänsterkolumn",
  "addColumnRight": "Lägg till högerkolumn",
  "addRowAbove": "Lägg till rad ovanför",
  "addRowBelow": "Lägg till rad under",
  "deleteColumn": "Ta bort kolumn",
  "deleteRow": "Ta bort rad",
  "formatting": "Format",
  "viewHtml": "Visa HTML",
  "dialogUpdate": "Uppdatera",
  "insertFile": "Ange fil"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Hela dagen",
  "cancel": "Avbryt",
  "search": "Sök...",
  "editable": {
    "confirmation": "Är du säker på att du vill ta bort tillfället?"
  },
  "date": "Datum",
  "destroy": "Ta bort",
  "editor": {
    "allDayEvent": "Heldagstillfälle",
    "description": "Beskrivning",
    "editorTitle": "Tillfälle",
    "end": "Slut",
    "endTimezone": "Sluttidszon",
    "repeat": "Upprepa",
    "separateTimezones": "Använd separata start och sluttidszoner",
    "start": "Start",
    "startTimezone": "Starttidszon",
    "timezone": "Tidszon",
    "timezoneEditorButton": "Tidszon",
    "timezoneEditorTitle": "Tidszoner",
    "title": "Titel",
    "noTimezone": "Ingen tidszon"
  },
  "event": "Tillfälle",
  "recurrenceMessages": {
    "deleteRecurring": "Vill du ta bort enbart detta tillfället eller hela serien?",
    "deleteWindowOccurrence": "Ta bort nuvarande upprepning",
    "deleteWindowSeries": "Ta bort serien",
    "deleteWindowTitle": "Ta bort återkommande objekt",
    "editRecurring": "Vill du redigera enbart detta tillfälle eller hela serien?",
    "editWindowOccurrence": "Redigera återkommande tillfälle",
    "editWindowSeries": "Redigera serie",
    "editWindowTitle": "Redigera återkommande objekt"
  },
  "save": "Spara",
  "time": "Tid",
  "today": "Idag",
  "views": {
    "agenda": "Agenda",
    "day": "Dag",
    "month": "Månad",
    "week": "Vecka",
    "workWeek": "Arbetsvecka"
  },
  "deleteWindowTitle": "Ta bort tillfälle",
  "showFullDay": "Visa heldag",
  "showWorkDay": "Visa arbetsdag"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Stäng"
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
  "cancel": "Avbryt"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Avbryt"
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

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Kontrastförhållande:",
            "fail": "Misslyckades",
            "pass": "Godkänd",
            "hex": "HEX",
            "toggleFormat": "Växla format",
            "red": "Röd",
            "green": "Grön",
            "blue": "Blå",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Verkställ",
            "cancel": "Avbryt",
            "noColor": "ingen färg",
            "clearColor": "Rensa färg"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Verkställ",
            "cancel": "Avbryt",
            "noColor": "ingen färg",
            "clearColor": "Rensa färg"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Start",
            "endLabel": "Slut"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Ladda upp",
            "orderBy": "Sortera efter",
            "orderByName": "Namn",
            "orderBySize": "Storlek",
            "directoryNotFound": "En katalog med det namnet hittades inte.",
            "emptyFolder": "Tom mapp",
            "deleteFile": "Är du säker på att du vill ta bort \"{0}\"?",
            "invalidFileType": "Den valda filen \"{0}\" är ogiltig. Filtyper som stöds är {1}.",
            "overwriteFile": "En fil med namnet \"{0}\" finns redan i den aktuella mappen. Vill du skriva över den?",
            "dropFilesHere": "släpp fil här för att ladda upp",
            "search": "Sök"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Ny mapp",
                "upload": "Ladda upp",
                "sortDirection": "Sorteringsordning",
                "sortDirectionAsc": "Stigande",
                "sortDirectionDesc": "Fallande",
                "sortField": "Sortera efter",
                "nameField": "Namn",
                "sizeField": "Storlek",
                "typeField": "Typ",
                "dateModifiedField": "Ändrad datum",
                "dateCreatedField": "Skapad datum",
                "listView": "Listvy",
                "gridView": "Rutnätsvy",
                "search": "Sök",
                "details": "Detaljer",
                "detailsChecked": "Ja",
                "detailsUnchecked": "Nej",
                "Delete": "Ta bort",
                "Rename": "Byt namn"
            },
            "views": {
                "nameField": "Namn",
                "sizeField": "Storlek",
                "typeField": "Typ",
                "dateModifiedField": "Ändrad datum",
                "dateCreatedField": "Skapad datum",
                "items": "objekt"
            },
            "dialogs": {
                "upload": {
                    "title": "Ladda upp filer",
                    "clear": "Rensa",
                    "done": "Klar"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Vill du flytta eller kopiera de valda filerna?</p>",
                    "okText": "Kopiera",
                    "cancel": "Flytta",
                    "close": "Stäng"
                },
                "deleteConfirm": {
                    "title": "Bekräfta borttagning",
                    "content": "<p class='k-text-center'>Är du säker på att du vill ta bort de valda filerna?<br/>Den här åtgärden kan inte ångras.</p>",
                    "okText": "Ta bort",
                    "cancel": "Avbryt",
                    "close": "Stäng"
                },
                "renamePrompt": {
                    "title": "Byt namn",
                    "content": "<p class='k-text-center'>Ange ett nytt filnamn</p>",
                    "okText": "Byt namn",
                    "cancel": "Avbryt",
                    "close": "Stäng"
                }
            },
            "previewPane": {
                "noFileSelected": "Ingen fil vald",
                "extension": "Typ",
                "size": "Storlek",
                "created": "Skapad datum",
                "createdUtc": "Skapad datum (UTC)",
                "modified": "Ändrad datum",
                "modifiedUtc": "Ändrad datum (UTC)",
                "items": "objekt"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Lägg till underuppgift",
                "append": "Lägg till uppgift",
                "insertAfter": "Infoga efter",
                "insertBefore": "Infoga före",
                "pdf": "Exportera till PDF"
            },
            "cancel": "Avbryt",
            "deleteDependencyWindowTitle": "Ta bort beroende",
            "deleteTaskWindowTitle": "Ta bort uppgift",
            "destroy": "Ta bort",
            "editor": {
                "assignButton": "Tilldela",
                "editorTitle": "Uppgift",
                "end": "Slut",
                "percentComplete": "Slutförande",
                "resources": "Resurser",
                "resourcesEditorTitle": "Resurser",
                "resourcesHeader": "Resurser",
                "start": "Start",
                "title": "Titel",
                "unitsHeader": "Enheter",
                "parent": "Överordnad",
                "addNew": "Lägg till",
                "name": "Namn"
            },
            "save": "Spara",
            "selectView": "Välj vy",
            "views": {
                "day": "Dag",
                "end": "Slut",
                "month": "Månad",
                "start": "Start",
                "week": "Vecka",
                "year": "År"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Redigera",
            "createNewCard": "Nytt kort",
            "create": "Skapa",
            "search": "Sök",
            "previewCard": "Förhandsgranska kort",
            "addCard": "Lägg till kort",
            "editCard": "Redigera kort",
            "deleteCard": "Ta bort kort",
            "addColumn": "Lägg till kolumn",
            "editColumn": "Redigera kolumn",
            "deleteColumn": "Ta bort kolumn",
            "close": "Stäng",
            "cancel": "Avbryt",
            "delete": "Ta bort",
            "saveChanges": "Spara ändringar",
            "title": "Titel:",
            "description": "Beskrivning:",
            "newColumn": "Ny kolumn",
            "deleteColumnConfirm": "Är du säker på att du vill ta bort den här kolumnen?",
            "deleteCardConfirm": "Är du säker på att du vill ta bort det här kortet?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Öka värde",
            "downArrowText": "Minska värde"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Paus",
            "play": "Spela",
            "mute": "Ljud av",
            "unmute": "Ljud på",
            "quality": "Kvalitet",
            "fullscreen": "Helskärm"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Inställningar",
            "cancelButtonText": "Avbryt",
            "applyButtonText": "Verkställ",
            "measures": "Välj fält för att börja",
            "columns": "Välj fält för att börja",
            "rows": "Välj fält för att börja"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Verkställ",
            "sortAscending": "Stigande ordning",
            "sortDescending": "Fallande ordning",
            "filterFields": "Fältfilter",
            "filter": "Filter",
            "include": "Inkludera fält...",
            "clear": "Rensa",
            "reset": "Återställ",
            "moveToColumns": "Flytta till kolumner",
            "moveToRows": "Flytta till rader",
            "movePrevious": "Flytta bakåt",
            "moveNext": "Flytta framåt",
            "filterOperatorsDropDownLabel": "Filteroperatorer",
            "filterValueTextBoxLabel": "Filtervärde",
            "operators": {
                "contains": "Innehåller",
                "doesnotcontain": "Innehåller inte",
                "startswith": "Börjar med",
                "endswith": "Slutar med",
                "eq": "Är lika med",
                "neq": "Är inte lika med"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Avbryt",
            "update": "Spara",
            "endTitle": "Avsluta upprepning",
            "repeatTitle": "Upprepningsmönster",
            "headerTitle": "Upprepa händelse",
            "end": {
                "never": "Aldrig",
                "after": "Efter",
                "on": "På"
            },
            "daily": {
                "interval": "dag(ar)"
            },
            "weekly": {
                "interval": "vecka/veckor"
            },
            "monthly": {
                "interval": "månad(er)",
                "repeatBy": "Upprepa efter: ",
                "dayOfMonth": "Dag i månaden",
                "dayOfWeek": "Veckodag"
            },
            "yearly": {
                "interval": "år",
                "repeatBy": "Upprepa efter: ",
                "dayOfMonth": "Dag i månaden",
                "dayOfWeek": "Veckodag",
                "of": " av "
            },
            "endRule": {
                "after": " förekomst(er)",
                "on": "På "
            }
        });

}

/* Spreadsheet messages */

if (kendo.spreadsheet) {

    kendo.spreadsheet.messages.view =
        $.extend(true, kendo.spreadsheet.messages.view, {
            "errors": {
                "shiftingNonblankCells": "Kan inte infoga celler på grund av möjlig dataförlust.",
                "filterRangeContainingMerges": "Kan inte skapa ett filter inom ett område som innehåller sammanslagna celler",
                "cannotModifyDisabled": "Kan inte ändra inaktiverade celler."
            },
            "tabs": {
                "home": "Hem",
                "insert": "Infoga",
                "data": "Data"
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Öka",
            "decreaseButtonTitle": "Minska",
            "dragHandleTitle": "Dra"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Ta bort",
                "moveUp": "Flytta upp",
                "moveDown": "Flytta ner",
                "transferTo": "Överför till",
                "transferFrom": "Överför från",
                "transferAllTo": "Överför alla till",
                "transferAllFrom": "Överför alla från"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Laddar...",
            "requestFailed": "Förfrågan misslyckades.",
            "retry": "Försök igen"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} är obligatoriskt",
            "pattern": "{0} är ogiltigt",
            "min": "{0} ska vara större än eller lika med {1}",
            "max": "{0} ska vara mindre än eller lika med {1}",
            "step": "{0} är ogiltigt",
            "email": "{0} är inte en giltig e-postadress",
            "url": "{0} är inte en giltig URL",
            "date": "{0} är inte ett giltigt datum",
            "dateCompare": "Slutdatum måste vara efter startdatum"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Laddar..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Ange",
            "cancel": "Avbryt",
            "hour": "timme",
            "minute": "minut",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nu"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Ange",
            "cancel": "Avbryt",
            "hour": "timme",
            "minute": "minut",
            "second": "sekund",
            "millisecond": "millisekund",
            "now": "Nu",
            "date": "Datum",
            "time": "Tid",
            "today": "Idag",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Idag",
            "navigateTo": "Gå till: ",
            "parentViews": {
                "month": "Årsvy",
                "year": "Decenniumvy",
                "decade": "Århundradevy"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "år",
            "month": "månad",
            "day": "dag",
            "weekday": "veckodag",
            "hour": "timmar",
            "minute": "minuter",
            "second": "sekunder",
            "dayperiod": "FM/EM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "rensa",
            "noData": "Inga data hittades."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "rensa",
            "noData": "Inga data hittades.",
            "singleTag": "objekt valda"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "rensa",
            "noData": "Inga data hittades.",
            "singleTag": "objekt valda"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Skriv ett meddelande...",
            "toggleButton": "Växla verktygsfält",
            "sendButton": "Skicka"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Återställ",
            "previous": "Föregående",
            "next": "Nästa",
            "done": "Klar",
            "step": "Steg",
            "of": "av"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Dokument",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Zoomnivå",
                    "zoomOut": "Zooma ut",
                    "zoomIn": "Zooma in",
                    "actualWidth": "Verklig bredd",
                    "autoWidth": "Automatisk bredd",
                    "fitToWidth": "Anpassa till bredd",
                    "fitToPage": "Anpassa till sida"
                },
                "open": "Öppna",
                "exportAs": "Exportera",
                "download": "Ladda ner",
                "pager": {
                    "first": "Gå till första sidan",
                    "previous": "Gå till föregående sida",
                    "next": "Gå till nästa sida",
                    "last": "Gå till sista sidan",
                    "of": "av",
                    "page": "sida",
                    "pages": "sidor"
                },
                "print": "Skriv ut",
                "toggleSelection": "Aktivera markering",
                "togglePan": "Aktivera panorering",
                "search": "Sök"
            },
            "errorMessages": {
                "notSupported": "Endast PDF-filer stöds.",
                "parseError": "PDF-filen kunde inte bearbetas.",
                "notFound": "Filen hittades inte.",
                "popupBlocked": "Popup blockeras av webbläsaren."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Generera om captcha",
            "audio": "Spela upp captcha-ljud",
            "imageAlt": "Ange texten från captcha-bilden",
            "success": "Verifiering lyckades"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organisationsschema",
            "edit": "Redigera",
            "create": "Skapa",
            "destroy": "Ta bort",
            "destroyContent": "Är du säker på att du vill ta bort det här objektet och dess underordnade?",
            "destroyTitle": "Ta bort objekt",
            "cancel": "Avbryt",
            "save": "Spara",
            "menuLabel": "Redigeringsmeny",
            "uploadAvatar": "Ladda upp ny bild",
            "parent": "Överordnad",
            "name": "Namn",
            "title": "Titel",
            "none": "--Ingen--",
            "expand": "Expandera",
            "collapse": "Komprimera"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Karttitel"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Enheter"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Inga tillgängliga data"
        });

}

  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Inga poster att visa",
        "loading": "Laddar...",
        "requestFailed": "Begäran misslyckades.",
        "retry": "Försök igen",
        "commands": {
          "edit": "Redigera",
          "update": "Spara",
          "canceledit": "Avbryt",
          "create": "Lägg till ny post",
          "createchild": "Lägg till underpost",
          "destroy": "Ta bort",
          "excel": "Exportera till Excel",
          "pdf": "Exportera till PDF"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Inga poster att visa",
        "loading": "Laddar...",
        "requestFailed": "Begäran misslyckades.",
        "retry": "Försök igen",
        "commands": {
          "edit": "Redigera",
          "update": "Uppdatera",
          "canceledit": "Avbryt",
          "create": "Lägg till ny post",
          "createchild": "Lägg till underpost",
          "destroy": "Ta bort",
          "excel": "Exportera till Excel",
          "pdf": "Exportera till PDF"
        }
      });
  }

})(window.kendo.jQuery);