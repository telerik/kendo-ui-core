(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "są równe",
    "gte": "są późniejsze lub równe",
    "gt": "są późniejsze niż",
    "lte": "są wcześniejsze lub równe",
    "lt": "są wcześniejsze niż",
    "neq": "są inne niż",
    "isnull": "brak daty",
    "isnotnull": "mają datę"
  },
  "number": {
    "eq": "są równe",
    "gte": "są większe lub równe",
    "gt": "są większe niż",
    "lte": "są mniejsze lub równe",
    "lt": "są mniejsze niż",
    "neq": "są inne niż",
    "isnull": "pusta wartość",
    "isnotnull": "niepusta wartość"
  },
  "string": {
    "endswith": "kończą się na",
    "eq": "są równe",
    "neq": "są inne niż",
    "startswith": "zaczynają się od",
    "contains": "zawierają",
    "doesnotcontain": "nie zawierają"
  },
  "enums": {
    "eq": "są równe",
    "neq": "są inne niż"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "są równe",
    "gte": "są późniejsze lub równe",
    "gt": "są późniejsze niż",
    "lte": "są wcześniejsze lub równe",
    "lt": "są wcześniejsze niż",
    "neq": "są inne niż"
  },
  "number": {
    "eq": "są równe",
    "gte": "są większe lub równe",
    "gt": "są większe niż",
    "lte": "są mniejsze lub równe",
    "lt": "są mniejsze niż",
    "neq": "są inne niż"
  },
  "string": {
    "endswith": "kończą się na",
    "eq": "są równe",
    "neq": "są inne niż",
    "startswith": "zaczynają się od",
    "contains": "zawierają",
    "doesnotcontain": "nie zawierają"
  },
  "enums": {
    "eq": "są równe",
    "neq": "są inne niż"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "filter": "Filtr",
  "columns": "Kolumny",
  "sortAscending": "Sortuj Rosnąco",
  "sortDescending": "Sortuj malejąco",
  "settings": "Ustawienia kolumn",
  "done": "Sporządzono",
  "lock": "Zablokować",
  "unlock": "Odblokować"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "days(s)",
    "repeatEvery": "Repeat every:"
  },
  "end": {
    "after": "After",
    "occurrence": "occurrence(s)",
    "label": "End:",
    "never": "Never",
    "on": "On",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Daily",
    "monthly": "Monthly",
    "never": "Never",
    "weekly": "Weekly",
    "yearly": "Yearly"
  },
  "monthly": {
    "day": "Day",
    "interval": "month(s)",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:"
  },
  "offsetPositions": {
    "first": "first",
    "fourth": "fourth",
    "last": "last",
    "second": "second",
    "third": "third"
  },
  "weekly": {
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "week(s)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "year(s)"
  },
  "weekdays": {
    "day": "day",
    "weekday": "weekday",
    "weekend": "weekend day"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Wstaw",
    "destroy": "Usuń",
    "canceledit": "Anuluj",
    "update": "Aktualizuj",
    "edit": "Edycja",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "select": "Zaznacz",
    "cancel": "Anuluj zmiany",
    "save": "Zapisz zmiany"
  },
  "editable": {
    "confirmation": "Czy na pewno chcesz usunąć ten rekord?",
    "cancelDelete": "Anuluj",
    "confirmDelete": "Usuń"
  },
  "noRecords": "Brak danych"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Brak danych",
    "loading": "Ładowanie...",
    "requestFailed": "Niepowodzenie.",
    "retry": "Ponów",
    "commands": {
        "edit": "Edycja",
        "update": "Aktualizuj",
        "canceledit": "Anuluj",
        "create": "Wstaw",
        "createchild": "Wstaw dziecko",
        "destroy": "Usuń",
        "excel": "Eksportuj do Excel",
        "pdf": "Eksportuj to PDF"
    }
});
}  
  
/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Wszystkie",
  "page": "Strona",
  "display": "Wyświetlanie elementów {0} - {1} z {2}",
  "of": "z {0}",
  "empty": "Brak danych",
  "refresh": "Odśwież",
  "first": "Idź do pierwszej strony",
  "itemsPerPage": "na stronę",
  "last": "Przejdź do ostatniej strony",
  "next": "Przejdź do następnej strony",
  "previous": "Przejdź do poprzedniej strony",
  "morePages": "Więcej stron"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Wszystkie",
  "page": "Strona",
  "display": "Wyświetlanie elementów {0} - {1} z {2}",
  "of": "z {0}",
  "empty": "Brak danych",
  "refresh": "Odśwież",
  "first": "Idź do pierwszej strony",
  "itemsPerPage": "na stronę",
  "last": "Przejdź do ostatniej strony",
  "next": "Przejdź do następnej strony",
  "previous": "Przejdź do poprzedniej strony",
  "morePages": "Więcej stron"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Filtr",
  "clear": "Wyczyść filtr",
  "isFalse": "fałsz",
  "isTrue": "prawda",
  "operator": "Operator"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filtr",
  "and": "Oraz",
  "clear": "Wyczyść filtr",
  "info": "Pokaż wiersze o wartościach które",
  "title": "Pokaż wiersze o wartościach które",
  "selectValue": "-Wybierz wartość-",
  "isFalse": "fałsz",
  "isTrue": "prawda",
  "or": "lub",
  "cancel": "Anuluj",
  "operator": "Operator",
  "value": "Wartość"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Szukaj"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Przeciągnij nagłówek kolumny i upuść go tutaj aby pogrupować według tej kolumny"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Wytłuszczenie",
  "createLink": "Wstaw link",
  "fontName": "Wybierz czcionkę",
  "fontNameInherit": "(czcionka odziedziczona)",
  "fontSize": "Wybierz rozmiar czcionki",
  "fontSizeInherit": "(rozmiar odziedziczony)",
  "formatBlock": "Wybierz rozmiar bloku",
  "indent": "Wcięcie",
  "insertHtml": "Wstaw HTML",
  "insertImage": "Wstaw obraz",
  "insertOrderedList": "Wstaw listę numerowaną",
  "insertUnorderedList": "Wstaw listę wypunktowaną",
  "italic": "Kursywa",
  "justifyCenter": "Centruj tekst",
  "justifyFull": "Wyrównaj tekst",
  "justifyLeft": "Wyrównaj tekst do lewej",
  "justifyRight": "Wyrównaj tekst do prawej",
  "outdent": "Zmniejsz wcięcie",
  "strikethrough": "Przekreślenie",
  "styles": "Styl",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Podkreślenie",
  "unlink": "Usuń link",
  "deleteFile": "Czy na pewno chcesz usunąć \"{0}\"?",
  "directoryNotFound": "Folder o tej nazwie nie został znaleziony.",
  "emptyFolder": "Opróżnij folder",
  "invalidFileType": "Wybrany plik \"{0}\" nie jest prawidłowy. Obsługiwane typy plików to: {1}.",
  "orderBy": "Uporządkuj wg:",
  "orderByName": "Nazwa",
  "orderBySize": "Rozmiar",
  "overwriteFile": "Plik o nazwie \"{0}\" istnieje już w bieżącym folderze. Czy chcesz go zastąpić?",
  "uploadFile": "Załaduj",
  "backColor": "Kolor tła",
  "foreColor": "Kolor",
  "dialogButtonSeparator": "or",
  "dialogCancel": "Anuluj",
  "dialogInsert": "Wstaw",
  "imageAltText": "Opis",
  "imageWebAddress": "URL",
  "imageWidth": "Szerokość (px)",
  "imageHeight": "Wysokość (px)",
  "linkWebAddress": "URL",
  "linkText": "Tekst",
  "linkToolTip": "Podpowiedź",
  "linkOpenInNewWindow": "Otwórz w nowym oknie",
  "search": "Search",
  "createTable": "Tworzenie tabeli",
  "createTableHint": "Utwórz tabelę {0} x {1}",
  "addColumnLeft": "Dodaj kolumnę z lewej",
  "addColumnRight": "Dodaj kolumnę z prawej",
  "addRowAbove": "Dodaj wiersz powyżej",
  "addRowBelow": "Dodaj wiersz poniżej",
  "deleteRow": "Usuń wiersz",
  "deleteColumn": "Usuń kolumnę",
  "tableWizard": "Szczegóły tabeli",
  "tableTab": "Tabela",
  "cellTab": "Komórka",
  "accessibilityTab": "Dostępność",
  "caption": "Nagłówek",
  "summary": "Streszczenie",
  "width": "Szerokość",
  "height": "Wysokość",
  "units": "Jednostki",
  "cellSpacing": "Odstępy między komórkami",
  "cellPadding": "Wewnętrzny odstęp komórek",
  "cellMargin": "Margines komórek",
  "alignment": "Wyrównanie",
  "background": "Tło",
  "cssClass": "Klasa CSS",
  "id": "ID",
  "border": "Brzegi",
  "borderStyle": "Styl CSS brzegów",
  "collapseBorders": "Sklejaj brzegi",
  "wrapText": "Zawijanie wierszy",
  "associateCellsWithHeaders": "Powiąż komórki z nagłówkami",
  "alignLeft": "Wyrównaj w lewo",
  "alignCenter": "Centruj",
  "alignRight": "Wyrównaj w prawo",
  "alignLeftTop": "Wyrównaj w prawo do góry",
  "alignCenterTop": "Wyrównaj do środka do góry",
  "alignRightTop": "Wyrównaj w prawo do góry",
  "alignLeftMiddle": "Wyrównaj w lewo do środka",
  "alignCenterMiddle": "Wyrównaj do środka",
  "alignRightMiddle": "Wyrównaj w prawo do środka",
  "alignLeftBottom": "Wyrównaj w lewo do dołu",
  "alignCenterBottom": "Wyrównaj do środka do dołu",
  "alignRightBottom": "Wyrównaj w prawo do dołu",
  "alignRemove": "Usuń wyrównanie",
  "columns": "Kolumny",
  "rows": "Wiersze",
  "selectAllCells": "Zaznacz wszystkie komórki",
  "cleanFormatting": "Usuń formatowanie",
  "dropFilesHere": "przeciągnij pliki tutaj, aby je wysłać",
  "formatting": "Formatowanie",
  "viewHtml": "Widok HTML",
  "dialogUpdate": "Aktualizuj",
  "insertFile": "Wstaw plik"
});
}
 
/* FormattingTool messages */
  
if (kendo.ui.editor) {
kendo.ui.editor.FormattingTool.prototype.options.items = [
    {
        text: 'Paragraf',
        value: 'p'
    },
    {
        text: 'Cytat',
        value: 'blockquote'
    },
    {
        text: 'Nagłówek 1',
        value: 'h1'
    },
    {
        text: 'Nagłówek 2',
        value: 'h2'
    },
    {
        text: 'Nagłówek 3',
        value: 'h3'
    },
    {
        text: 'Nagłówek 4',
        value: 'h4'
    },
    {
        text: 'Nagłówek 5',
        value: 'h5'
    },
    {
        text: 'Nagłówek 6',
        value: 'h6'
    }
];
}

/* FileBrowser and ImageBrowser messages */

var browserMessages = {
  "uploadFile" : "Wyślij",
  "orderBy" : "Sortuj wg",
  "orderByName" : "Nazwy",
  "orderBySize" : "Rozmiaru",
  "directoryNotFound" : "Folder o podanej nazwie nie został odnaleziony.",
  "emptyFolder" : "Pusty folder",
  "invalidFileType" : "Wybrany plik \"{0}\" jest nieprawidłowy. Obsługiwane pliki {1}.",
  "deleteFile" : 'Czy napewno chcesz usunąć plik "{0}"?',
  "overwriteFile" : 'Plik o nazwie "{0}" już istnieje w bieżącym folderze. Czy zastąpić?',
  "dropFilesHere" : "umieść pliki tutaj, aby je wysłać",
  "search" : "Szukaj"
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
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Anuluj",
  "dropFilesHere": "przeciągnij tu pliki aby je załadować",
  "remove": "Usuń",
  "retry": "Ponów",
  "select": "Wybierz...",
  "statusFailed": "niepowodzenie",
  "statusUploaded": "załadowane",
  "statusUploading": "trwa ładowanie",
  "uploadSelectedFiles": "Załaduj pliki",
  "headerStatusUploaded": "OK",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "cały dzień",
  "cancel": "Anuluj",
  "editable": {
    "confirmation": "Czy na pewno chcesz usunąć to wydarzenie?"
  },
  "date": "Data",
  "destroy": "Usuń",
  "editor": {
    "allDayEvent": "Wydarzenie całodniowe",
    "description": "Opis",
    "editorTitle": "Wydarzenie",
    "end": "Koniec",
    "endTimezone": "Strefa czasowa końca",
    "repeat": "Cykl",
    "separateTimezones": "Osobne strefy czasowe dla początku i końca",
    "start": "Początek",
    "startTimezone": "Strefa czasowa początku",
    "timezone": "Strefa czasowa",
    "timezoneEditorButton": "Strefa czasowa",
    "timezoneEditorTitle": "Strefy czasowe",
    "title": "Tytuł",
    "noTimezone": "Brak strefy czasowej"
  },
  "event": "Wydarzenie",
  "recurrenceMessages": {
    "deleteRecurring": "Czy chcesz usunąć pojedyńcze wydarzenie, czy cały cykl?",
    "deleteWindowOccurrence": "Usuń bieżące wydarzenie",
    "deleteWindowSeries": "Usuń cykl",
    "deleteWindowTitle": "Usuń wydarzenie cykliczne",
    "editRecurring": "Czy chcesz edytować pojedyńcze wydarzenie, czy cały cykl?",
    "editWindowOccurrence": "Edytuj bieżące wydarzenie",
    "editWindowSeries": "Edytuj cykl",
    "editWindowTitle": "Edytuj wydarzenie cykliczne"
  },
  "save": "Zapisz",
  "time": "Czas",
  "today": "Dziś",
  "views": {
    "agenda": "Agenda",
    "day": "Dzień",
    "month": "Miesiąc",
    "week": "Tydzień",
    "workWeek": "Tydzień roboczy"
  },
  "deleteWindowTitle": "Usuń wydarzenie",
  "showFullDay": "Pokaż cały dzień",
  "showWorkDay": "Pokaż godziny pracy"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Zamknąć"
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
  "cancel": "Anuluj"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Anuluj"
});
}

/* List messages */

if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
    $.extend(true, kendo.ui.List.prototype.options.messages,{
      "clear": "Wyczyść",
      "noData": "Brak danych."
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
  
})(window.kendo.jQuery);
