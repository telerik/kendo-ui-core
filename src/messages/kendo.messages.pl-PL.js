(function($, undefined) {

/* FilterCell operators */

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
    "doesnotcontain": "nie zawierają",
    "isnull": "jest null",
    "isnotnull": "nie jest null",
    "isempty": "jest puste",
    "isnotempty": "nie jest puste",
    "isnullorempty": "nie ma wartości",
    "isnotnullorempty": "ma wartośc"
  },
  "enums": {
    "eq": "są równe",
    "neq": "są inne niż"
  }
});
}

/* FilterMenu operator messages */

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

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Wstaw pola danych tutaj",
  "columnFields": "Wstaw pola kolumn tutaj",
  "rowFields": "Wstaw pola wierszy tutaj"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Pokaż element z wartością która:",
  "filterFields": "Filtry pól",
  "filter": "Filtr",
  "include": "Dodaj pola...",
  "title": "Pola do dodania",
  "clear": "Wyczyść",
  "ok": "Ok",
  "cancel": "Anuluj",
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

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "dni",
    "repeatEvery": "Powtarzaj co:"
  },
  "end": {
    "after": "Po",
    "occurrence": "występowanie",
    "label": "Koniec:",
    "never": "Nigdy",
    "on": "On",
    "mobileLabel": "Koniec"
  },
  "frequencies": {
    "daily": "Codziennie",
    "monthly": "Miesięcznie",
    "never": "Nigdy",
    "weekly": "Tygodniowo",
    "yearly": "Rocznie"
  },
  "monthly": {
    "day": "Dzień",
    "interval": "miesiąc(e)",
    "repeatEvery": "Cyklicznie co:",
    "repeatOn": "Powtórz:"
  },
  "offsetPositions": {
    "first": "pierwszy",
    "fourth": "czwarty",
    "last": "ostatni",
    "second": "drugi",
    "third": "trzeci"
  },
  "weekly": {
    "repeatEvery": "Powtarzaj co:",
    "repeatOn": "Powtórz:",
    "interval": "tydzień"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Powtarzaj co:",
    "repeatOn": "Powtórz:",
    "interval": "rok/lata"
  },
  "weekdays": {
    "day": "dzień",
    "weekday": "dzień powszedni",
    "weekend": "dzień weekendu"
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
    "excel": "Eksport do Excel",
    "pdf": "Eksport do PDF",
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
  "search": "Szukaj",
  "filter": "Filtr",
  "clear": "Wyczyść filtr",
  "checkAll": "Zaznacz wszystko",
  "clearAll": "Odznacz wszystko",
  "selectedItemsFormat": "Wybrano {0} elementy"
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
  "style": "Styl",
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
  "associateCellsWithHeaders": "Powiąż nagłówkami",
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
  "insertFile": "Wstaw plik",
  "print": "Drukuj"
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
  "uploadFile": "Wyślij",
  "orderBy": "Sortuj wg",
  "orderByName": "Nazwy",
  "orderBySize": "Rozmiaru",
  "directoryNotFound": "Folder o podanej nazwie nie został odnaleziony.",
  "emptyFolder": "Pusty folder",
  "invalidFileType": "Wybrany plik \"{0}\" jest nieprawidłowy. Obsługiwane pliki {1}.",
  "deleteFile": 'Czy napewno chcesz usunąć plik "{0}"?',
  "overwriteFile": 'Plik o nazwie "{0}" już istnieje w bieżącym folderze. Czy zastąpić?',
  "dropFilesHere": "umieść pliki tutaj, aby je wysłać",
  "search": "Szukaj"
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

/* FileManager messages */

if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages = $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
        toolbar: {
            createFolder: 'Nowy folder',
            upload: 'Prześlij',
            sortDirection: 'Sort Direction',
            sortDirectionAsc: 'Sortuj rosnąco',
            sortDirectionDesc: 'Sortuj malejąco',
            sortField: 'Sortuj według',
            nameField: 'Nazwa',
            sizeField: 'Rozmiar',
            typeField: 'Typ',
            dateModifiedField: 'Data modyfikacji',
            dateCreatedField: 'Data utworzenia',
            listView: 'Ikony',
            gridView: 'Szczegóły',
            search: 'Szukaj',
            details: 'Szczegóły',
            detailsChecked: 'tak',
            detailsUnchecked: 'nie',
            'Delete': 'Usuń',
            Rename: 'Zmień nazwę'
        },
        views: {
            nameField: 'Nazwa',
            sizeField: 'Rozmiar',
            typeField: 'Typ',
            dateModifiedField: 'Data modyfikacji',
            dateCreatedField: 'Data utworzenia',
            items: 'elementów'
        },
        dialogs: {
            upload: {
                title: 'Prześlij pliki',
                clear: 'Wyczyść listę',
                done: 'OK'
            },
            moveConfirm: {
                title: ' ',
                content: '<p class=\'k-text-center\'>Czy chcesz przenieść zaznaczone pliki, czy skopiować?</p>',
                okText: 'Kopiuj',
                cancel: 'Przenieś',
                close: 'Zamknij'
            },
            deleteConfirm: {
                title: 'Potwierdź usunięcie',
                content: '<p class=\'k-text-center\'>Czy na pewno chcesz usunąć zaznaczone pliki?<br/>Nie ma możliwości cofnięcia tej operacji.</p>',
                okText: 'Usuń',
                cancel: 'Anuluj',
                close: 'Zamknij'
            },
            renamePrompt: {
                title: 'Zmień nazwę',
                content: '<p class=\'k-text-center\'>Wprowadź nową nazwę pliku</p>',
                okText: 'Zastosuj',
                cancel: 'Anuluj',
                close: 'Zamknij'
            }
        },
        previewPane: {
            noFileSelected: 'Nie zaznaczono pliku',
            extension: 'Typ',
            size: 'Rozmiar',
            created: 'Data utworzenia',
            createdUtc: 'Data utworzenia UTC',
            modified: 'Data modyfikacji',
            modifiedUtc: 'Data modyfikacji UTC',
            items: 'elementów'
        }
    });
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

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Wszystkie brzegi",
  "insideBorders": "Brzegi wewnętrzne",
  "insideHorizontalBorders": "Poziome brzegi wewnętrzne",
  "insideVerticalBorders": "Pionowe brzegi wewnętrzne",
  "outsideBorders": "Brzegi zewnętrzne",
  "leftBorder": "Lewy brzeg",
  "topBorder": "Górny brzeg",
  "rightBorder": "Prawy brzeg",
  "bottomBorder": "Dolny brzeg",
  "noBorders": "Bez brzegu",
  "reset": "Resetuj kolor",
  "customColor": "Inny kolor...",
  "apply": "Zastosuj",
  "cancel": "Anuluj"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Zastosuj",
  "save": "Zapisz",
  "cancel": "Anuluj",
  "remove": "Usuń",
  "retry": "Ponów",
  "revert": "Przywróć",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Format",
    "categories": {
      "number": "Liczba",
      "currency": "Waluta",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Czcionka"
  },
  "fontSizeDialog": {
    "title": "Rozmiar"
  },
  "bordersDialog": {
    "title": "Brzegi"
  },
  "alignmentDialog": {
    "title": "Wyrównanie",
    "buttons": {
      "justifyLeft": "Wyrównaj w lewo",
      "justifyCenter": "Centruj",
      "justifyRight": "Wyrównaj w prawo",
      "justifyFull": "Dostosuj",
      "alignTop": "Wyrównaj do góry",
      "alignMiddle": "Wyrównaj do środka",
      "alignBottom": "Wyrównaj do dołu"
    }
  },
  "mergeDialog": {
    "title": "Scal komórki",
    "buttons": {
      "mergeCells": "Scal wszystkie",
      "mergeHorizontally": "Scal w poziomie",
      "mergeVertically": "Scal w pionie",
      "unmerge": "Rozdziel"
    }
  },
  "freezeDialog": {
    "title": "Zablokuj okienka",
    "buttons": {
    "freezePanes": "Zablokuj okienka",
    "freezeRows": "Zablokuj wiersze",
    "freezeColumns": "Zablokuj kolumny",
    "unfreeze": "Odblokuj okienka"
    }
  },
  "confirmationDialog": {
    "text": "Czy na pewno chcesz usunąć ten arkusz?",
    "title": "Usuń arkusz"
  },
  "validationDialog": {
    "title": "Walidacja danych",
    "hintMessage": "Wprowadź prawidłową wartość {0} {1}.",
    "hintTitle": "Walidacja {0}",
    "criteria": {
      "any": "Dowolna",
      "number": "Liczba",
      "text": "Tekst",
      "date": "Data",
      "custom": "Niestandardowe",
      "list": "Lista"
    },
    "comparers": {
      "greaterThan": "większa niż",
      "lessThan": "mniejsza niż",
      "between": "między",
      "notBetween": "nie między",
      "equalTo": "równa",
      "notEqualTo": "nierówna",
      "greaterThanOrEqualTo": "większa lub równa",
      "lessThanOrEqualTo": "mniejsza lub równa"
    },
    "comparerMessages": {
      "greaterThan": "większa niż {0}",
      "lessThan": "mniejsza niż {0}",
      "between": "między {0} i {1}",
      "notBetween": "nie między {0} i {1}",
      "equalTo": "równa {0}",
      "notEqualTo": "nierówna {0}",
      "greaterThanOrEqualTo": "większa lub równa {0}",
      "lessThanOrEqualTo": "mniejsza lub równa {0}",
      "custom": "spełnia warunek: {0}"
    },
    "labels": {
      "criteria": "Kryteria",
      "comparer": "Porównanie",
      "min": "Min",
      "max": "Max",
      "value": "Wartość",
      "start": "Start",
      "end": "Koniec",
      "onInvalidData": "W razie nieprawidłowych danych",
      "rejectInput": "Odrzuć",
      "showWarning": "Pokaż ostrzeżenie",
      "showHint": "Pokaż podpowiedź",
      "hintTitle": "Tytuł podpowiedzi",
      "hintMessage": "Treść podpowiedzi",
      "ignoreBlank": "Ignoruj blanki"
    },
    "placeholders": {
      "typeTitle": "Wprowadź tytuł",
      "typeMessage": "Wprowadź wiadomość"
    }
  },
  "exportAsDialog": {
    "title": "Eksport...",
    "labels": {
      "fileName": "Nazwa pliku",
      "saveAsType": "Zapisz jako plik typu",
      "exportArea": "Eksport",
      "paperSize": "Rozmiar papieru",
      "margins": "Marginesy",
      "orientation": "Orientacja",
      "print": "Drukuj",
      "guidelines": "Wskazówki",
      "center": "Wyśrodkuj",
      "horizontally": "Poziomo",
      "vertically": "Pionowo"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Nie można zmienić części scalonej komórki."
  },
  "useKeyboardDialog": {
    "title": "Kopiowanie i wklejanie",
    "errorMessage": "Te działania nie mogą zostać wywołane przez menu. Użyj następujących skrótów klawiszowych:",
    "labels": {
      "forCopy": "kopiuj",
      "forCut": "wytnij",
      "forPaste": "wklej"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "To działanie nie może zostać wykonane na wielokrotnym zaznaczeniu."
  },
  "insertCommentDialog": {
    "title": "Wstaw komentarz",
    "labels": {
      "comment": "Komentarz",
      "removeComment": "Usuń komentarz"
    }
  },
  "insertImageDialog": {
    "title": "Wstaw obraz",
    "info": "Przeciągnij tu obrazek, lub klikjnij by wybrać",
    "typeError": "Wybierz plik JPEG, PNG lub GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sortuj przedział A do Z",
  "sortDescending": "Sortuj przedział Z do A",
  "filterByValue": "Filtruj po wartości",
  "filterByCondition": "Filtruj po warunku",
  "apply": "Zastosuj",
  "search": "Szukaj",
  "addToCurrent": "Dodaj do zaznaczenia",
  "clear": "Wyczyść ",
  "blanks": "(Blanki)",
  "operatorNone": "Żaden",
  "and": "I",
  "or": "LUB",
  "operators": {
    "string": {
      "contains": "Tekst zawiera",
      "doesnotcontain": "Tekst does nie zawiera",
      "startswith": "Tekst zaczyna się od",
      "endswith": "Tekst kończy się na"
    },
    "date": {
      "eq": "Data jest równa",
      "neq": "Data nie jest równa",
      "lt": "Data jest przed",
      "gt": "Data jest po"
    },
    "number": {
      "eq": "Jest równa",
      "neq": "Nie jest równa",
      "gte": "Jest większa lub równa",
      "gt": "Jest większa",
      "lte": "Jest mniejsza lub równa",
      "lt": "Jest mniejsza"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Resetuj kolor",
  "customColor": "Inny kolor...",
  "apply": "Zastosuj",
  "cancel": "Anuluj"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Dodaj kolumnę z lewej",
  "addColumnRight": "Dodaj kolumnę z prawej",
  "addRowAbove": "Dodaj wiersz powyżej",
  "addRowBelow": "Dodaj wiersz poniżej",
  "alignment": "Wyrównanie",
  "alignmentButtons": {
    "justifyLeft": "Wyrównaj w lewo",
    "justifyCenter": "Centruj",
    "justifyRight": "Wyrównaj w prawo",
    "justifyFull": "Dostosuj",
    "alignTop": "Wyrównaj do góry",
    "alignMiddle": "Wyrównaj do środka",
    "alignBottom": "Wyrównaj do dołu"
  },
  "backgroundColor": "Kolor tła",
  "bold": "Wytłuszczenie",
  "borders": "Brzegi",
  "colorPicker": {
    "reset": "Resetuj kolor",
    "customColor": "Inny kolor..."
  },
  "copy": "Kopiuj",
  "cut": "Wklej",
  "deleteColumn": "Usuń kolumnę",
  "deleteRow": "Usuń wiersz",
  "excelImport": "Importuj z Excel...",
  "filter": "Filtruj",
  "fontFamily": "Czcionka",
  "fontSize": "Rozmiar",
  "format": "Inne formatowanie...",
  "formatTypes": {
    "automatic": "Auto",
    "number": "Liczba",
    "percent": "Procenty",
    "financial": "Waluta",
    "currency": "Waluta",
    "date": "Data",
    "time": "Czas",
    "dateTime": "Data i czas",
    "duration": "Czas trwania",
    "moreFormats": "Więcej formatów..."
  },
  "formatDecreaseDecimal": "Zwiększ",
  "formatIncreaseDecimal": "Zmniejsz",
  "freeze": "Zablokuj okienka",
  "freezeButtons": {
    "freezePanes": "Zablokuj okienka",
    "freezeRows": "Zablokuj wiersze",
    "freezeColumns": "Zablokuj kolumny",
    "unfreeze": "Odblokuj okienka"
  },
  "insertComment": "Wstaw komentarz",
  "insertImage": "Wstaw obrazek",
  "italic": "Kursywa",
  "merge": "Scal komórki",
  "mergeButtons": {
    "mergeCells": "Scal wszystkie",
    "mergeHorizontally": "Scal w poziomie",
    "mergeVertically": "Scal w pionie",
    "unmerge": "Rozdziel"
  },
  "open": "Otwórz...",
  "paste": "Wklej",
  "quickAccess": {
    "redo": "Ponów",
    "undo": "Cofnij"
  },
  "saveAs": "Zapisz jako...",
  "sortAsc": "Sortuj rosnąco",
  "sortDesc": "Sortuj malejąco",
  "sortButtons": {
    "sortSheetAsc": "Sortuj arkusz A do Z",
    "sortSheetDesc": "Sortuj arkusz Z do A",
    "sortRangeAsc": "Sortuj przedział A do Z",
    "sortRangeDesc": "Sortuj przedział Z do A"
  },
  "textColor": "Kolor tekstu",
  "textWrap": "Zawijanie",
  "underline": "Podkreślenie",
  "validation": "Walidacja danych..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Nie można wstawić komórek ze względu na możliwą utratę danych. Wybierz inne miejsce docelowe lub usuń dane z końca arkusza.",
    "filterRangeContainingMerges": "Nie można utworzyć filtra w przedziale zawierającym scalenia.",
    "validationError": "Wprowadzona wartość łamie reguły walidacji dla tej komórki."
  },
  "tabs": {
    "home": "Narzędzia główne",
    "insert": "Wstaw",
    "data": "Dane"
  }
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

/* Validator messages */
if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages, {
	required: 'Wartość {0} jest wymagana',
	pattern: 'Wartość {0} jest nieprawidłowa',
	min: '{0} musi być nie mniejsze niż {1}',
	max: '{0} musi być nie większe niż {1}',
	step: 'Wartość {0} jest nieprawidłowa',
	email: 'Nieprawidłowy email: {0}',
	url: 'Nieprawidłowy URL: {0}',
	date: 'Nieprawidłowa data: {0}',
	dateCompare: 'Data początkowa nie może być późniejsza niż końcowa.'
});
}

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "Współczynnik kontrastu:",
            "fail": "Niepowodzenie",
            "pass": "Zaliczony",
            "hex": "HEX",
            "toggleFormat": "Przełącz format",
            "red": "Czerwony",
            "green": "Zielony",
            "blue": "Niebieski",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Zastosuj",
            "cancel": "Anuluj",
            "noColor": "brak koloru",
            "clearColor": "Wyczyść kolor"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Zastosuj",
            "cancel": "Anuluj",
            "noColor": "brak koloru",
            "clearColor": "Wyczyść kolor"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Początek",
            "endLabel": "Koniec"
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Dodaj podzadanie",
                "append": "Dodaj zadanie",
                "insertAfter": "Wstaw po",
                "insertBefore": "Wstaw przed",
                "pdf": "Eksportuj do PDF"
            },
            "cancel": "Anuluj",
            "deleteDependencyWindowTitle": "Usuń zależność",
            "deleteTaskWindowTitle": "Usuń zadanie",
            "destroy": "Usuń",
            "editor": {
                "assignButton": "Przypisz",
                "editorTitle": "Zadanie",
                "end": "Koniec",
                "percentComplete": "Ukończenie",
                "resources": "Zasoby",
                "resourcesEditorTitle": "Zasoby",
                "resourcesHeader": "Zasoby",
                "start": "Początek",
                "title": "Tytuł",
                "unitsHeader": "Jednostki",
                "parent": "Nadrzędny",
                "addNew": "Dodaj",
                "name": "Nazwa"
            },
            "save": "Zapisz",
            "selectView": "Wybierz widok",
            "views": {
                "day": "Dzień",
                "end": "Koniec",
                "month": "Miesiąc",
                "start": "Początek",
                "week": "Tydzień",
                "year": "Rok"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Edytuj",
            "createNewCard": "Nowa karta",
            "create": "Utwórz",
            "search": "Szukaj",
            "previewCard": "Podgląd karty",
            "addCard": "Dodaj kartę",
            "editCard": "Edytuj kartę",
            "deleteCard": "Usuń kartę",
            "addColumn": "Dodaj kolumnę",
            "editColumn": "Edytuj kolumnę",
            "deleteColumn": "Usuń kolumnę",
            "close": "Zamknij",
            "cancel": "Anuluj",
            "delete": "Usuń",
            "saveChanges": "Zapisz zmiany",
            "title": "Tytuł:",
            "description": "Opis:",
            "newColumn": "Nowa kolumna",
            "deleteColumnConfirm": "Czy na pewno chcesz usunąć tę kolumnę?",
            "deleteCardConfirm": "Czy na pewno chcesz usunąć tę kartę?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Zwiększ wartość",
            "downArrowText": "Zmniejsz wartość"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Pauza",
            "play": "Odtwórz",
            "mute": "Wycisz",
            "unmute": "Włącz dźwięk",
            "quality": "Jakość",
            "fullscreen": "Pełny ekran"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Ustawienia",
            "cancelButtonText": "Anuluj",
            "applyButtonText": "Zastosuj",
            "measures": "Wybierz pola, aby rozpocząć",
            "columns": "Wybierz pola, aby rozpocząć",
            "rows": "Wybierz pola, aby rozpocząć"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Zastosuj",
            "sortAscending": "Rosnąco",
            "sortDescending": "Malejąco",
            "filterFields": "Filtr pól",
            "filter": "Filtr",
            "include": "Dołącz pola...",
            "clear": "Wyczyść",
            "reset": "Resetuj",
            "moveToColumns": "Przenieś do kolumn",
            "moveToRows": "Przenieś do wierszy",
            "movePrevious": "Przenieś wstecz",
            "moveNext": "Przenieś dalej",
            "filterOperatorsDropDownLabel": "Operatory filtru",
            "filterValueTextBoxLabel": "Wartość filtru",
            "operators": {
                "contains": "Zawiera",
                "doesnotcontain": "Nie zawiera",
                "startswith": "Zaczyna się od",
                "endswith": "Kończy się na",
                "eq": "Jest równe",
                "neq": "Nie jest równe"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Anuluj",
            "update": "Zapisz",
            "endTitle": "Zakończenie powtarzania",
            "repeatTitle": "Wzorzec powtarzania",
            "headerTitle": "Powtórz zdarzenie",
            "end": {
                "never": "Nigdy",
                "after": "Po",
                "on": "W dniu"
            },
            "daily": {
                "interval": "dzień/dni"
            },
            "weekly": {
                "interval": "tydzień/tygodnie"
            },
            "monthly": {
                "interval": "miesiąc/miesiące",
                "repeatBy": "Powtarzaj wg: ",
                "dayOfMonth": "Dzień miesiąca",
                "dayOfWeek": "Dzień tygodnia"
            },
            "yearly": {
                "interval": "rok/lata",
                "repeatBy": "Powtarzaj wg: ",
                "dayOfMonth": "Dzień miesiąca",
                "dayOfWeek": "Dzień tygodnia",
                "of": " z "
            },
            "endRule": {
                "after": " wystąpień",
                "on": "W dniu "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Zwiększ",
            "decreaseButtonTitle": "Zmniejsz",
            "dragHandleTitle": "Przeciągnij"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Usuń",
                "moveUp": "W górę",
                "moveDown": "W dół",
                "transferTo": "Przenieś do",
                "transferFrom": "Przenieś z",
                "transferAllTo": "Przenieś wszystko do",
                "transferAllFrom": "Przenieś wszystko z"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Ładowanie...",
            "requestFailed": "Żądanie nie powiodło się.",
            "retry": "Ponów"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Ładowanie..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Ustaw",
            "cancel": "Anuluj",
            "hour": "godzina",
            "minute": "minuta",
            "second": "sekunda",
            "millisecond": "milisekunda",
            "now": "Teraz"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Ustaw",
            "cancel": "Anuluj",
            "hour": "godzina",
            "minute": "minuta",
            "second": "sekunda",
            "millisecond": "milisekunda",
            "now": "Teraz",
            "date": "Data",
            "time": "Czas",
            "today": "Dziś",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Dziś",
            "navigateTo": "Przejdź do: ",
            "parentViews": {
                "month": "Widok roczny",
                "year": "Widok dekady",
                "decade": "Widok stulecia"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "rok",
            "month": "miesiąc",
            "day": "dzień",
            "weekday": "dzień tygodnia",
            "hour": "godziny",
            "minute": "minuty",
            "second": "sekundy",
            "dayperiod": "AM/PM"
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "wyczyść",
            "noData": "Brak danych.",
            "singleTag": "wybranych elementów"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "wyczyść",
            "noData": "Brak danych.",
            "singleTag": "wybranych elementów"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Wpisz wiadomość...",
            "toggleButton": "Przełącz pasek narzędzi",
            "sendButton": "Wyślij"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Resetuj",
            "previous": "Wstecz",
            "next": "Dalej",
            "done": "Gotowe",
            "step": "Krok",
            "of": "z"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Dokument",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Poziom powiększenia",
                    "zoomOut": "Pomniejsz",
                    "zoomIn": "Powiększ",
                    "actualWidth": "Rzeczywista szerokość",
                    "autoWidth": "Automatyczna szerokość",
                    "fitToWidth": "Dopasuj do szerokości",
                    "fitToPage": "Dopasuj do strony"
                },
                "open": "Otwórz",
                "exportAs": "Eksportuj",
                "download": "Pobierz",
                "pager": {
                    "first": "Przejdź do pierwszej strony",
                    "previous": "Przejdź do poprzedniej strony",
                    "next": "Przejdź do następnej strony",
                    "last": "Przejdź do ostatniej strony",
                    "of": "z",
                    "page": "strona",
                    "pages": "stron"
                },
                "print": "Drukuj",
                "toggleSelection": "Włącz zaznaczanie",
                "togglePan": "Włącz przesuwanie",
                "search": "Szukaj"
            },
            "errorMessages": {
                "notSupported": "Obsługiwane są tylko pliki PDF.",
                "parseError": "Nie udało się przetworzyć pliku PDF.",
                "notFound": "Plik nie został znaleziony.",
                "popupBlocked": "Okno wyskakujące jest blokowane przez przeglądarkę."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Wygeneruj nową captchę",
            "audio": "Odtwórz dźwięk captcha",
            "imageAlt": "Wpisz tekst z obrazka captcha",
            "success": "Weryfikacja zakończona pomyślnie"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Schemat organizacyjny",
            "edit": "Edytuj",
            "create": "Utwórz",
            "destroy": "Usuń",
            "destroyContent": "Czy na pewno chcesz usunąć ten element i jego podrzędne?",
            "destroyTitle": "Usuń element",
            "cancel": "Anuluj",
            "save": "Zapisz",
            "menuLabel": "Menu edycji",
            "uploadAvatar": "Prześlij nowy obraz",
            "parent": "Nadrzędny",
            "name": "Nazwa",
            "title": "Tytuł",
            "none": "--Brak--",
            "expand": "Rozwiń",
            "collapse": "Zwiń"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Tytuł mapy"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Jednostek"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Brak dostępnych danych"
        });

}

})(window.kendo.jQuery);