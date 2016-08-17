(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Käytä",
  "cancel": "Peruuta"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Käytä",
  "cancel": "Peruuta"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Nouseva järjestys",
  "sortDescending": "Laskeva järjestys",
  "filter": "Suodata",
  "columns": "Sarakkeet",
  "done": "Valmis",
  "settings": "Sarakeasetukset",
  "lock": "Lukitse",
  "unlock": "Poista lukinta"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Lihavoitu",
  "italic": "Kursivoitu",
  "underline": "Alleviivattu",
  "strikethrough": "Yliviivaus",
  "superscript": "Yläindeksi",
  "subscript": "Alaindeksi",
  "justifyCenter": "Keskitä",
  "justifyLeft": "Tasaa vasemmalle",
  "justifyRight": "Tasaa oikealle",
  "justifyFull": "Tasaa molemmat reunat",
  "insertUnorderedList": "Lisää lista",
  "insertOrderedList": "Lisää järjestetty lista",
  "indent": "Suurenna sisennystä",
  "outdent": "Pienennä sisennystä",
  "createLink": "Lisää hyperlinkki",
  "unlink": "Poista hyperlinkki",
  "insertImage": "Lisää kuva",
  "insertFile": "Lisää tiedosto",
  "insertHtml": "Lisää HTML",
  "viewHtml": "Näytä HTML",
  "fontName": "Valitse fontti",
  "fontNameInherit": "(peritty fontti)",
  "fontSize": "Valitse fontin koko",
  "fontSizeInherit": "(peritty koko)",
  "formatBlock": "Muotoilu",
  "formatting": "Muotoilu",
  "foreColor": "Väri",
  "backColor": "Taustaväri",
  "style": "Tyylit",
  "emptyFolder": "Tyhjä kansio",
  "uploadFile": "Lataa palvelimeen",
  "orderBy": "Järjestelyperuste:",
  "orderBySize": "Koko",
  "orderByName": "Nimi",
  "invalidFileType": "Tiedosto \"{0}\" ei kelpaa. Tuettuja tiedostomuotoja ovat {1}.",
  "deleteFile": "Haluatko varmasti poistaa tiedoston \"{0}\"?",
  "overwriteFile": "Tiedosto \"{0}\" on jo olemassa nykyisessä hakemistossa. Haluatko ylikirjoittaa tiedoston?",
  "directoryNotFound": "Halutun nimistä hakemistoa ei löytynyt.",
  "imageWebAddress": "WWW-osoite",
  "imageAltText": "Vaihtoehtokuvaus",
  "imageWidth": "Leveys (px)",
  "imageHeight": "Korkeus (px)",
  "fileWebAddress": "WWW-osoite",
  "fileTitle": "Otsikko",
  "linkWebAddress": "WWW-osoite",
  "linkText": "Teksti",
  "linkToolTip": "Vihjeteksti",
  "linkOpenInNewWindow": "Avaa linkki uudessa ikkunassa",
  "dialogUpdate": "Päivitä",
  "dialogInsert": "Lisää",
  "dialogButtonSeparator": "tai",
  "dialogCancel": "Peruuta",
  "createTable": "Lisää taulukko",
  "addColumnLeft": "Lisää sarake vasemmalle",
  "addColumnRight": "Lisää sarake oikealle",
  "addRowAbove": "Lisää rivi yläpuolelle",
  "addRowBelow": "Lisää rivi alapuolelle",
  "deleteRow": "Poista rivi",
  "deleteColumn": "Poista sarake"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Lataa palvelimeen",
  "orderBy": "Järjestelyperuste",
  "orderByName": "Nimi",
  "orderBySize": "Koko",
  "directoryNotFound": "Halutun nimistä hakemistoa ei löytynyt.",
  "emptyFolder": "Tyhjä kansio",
  "deleteFile": "Haluatko varmasti poistaa tiedoston \"{0}\"?",
  "invalidFileType": "Tiedosto \"{0}\" ei kelpaa. Tuettuja tiedostomuotoja ovat {1}.",
  "overwriteFile": "Tiedosto \"{0}\" on jo olemassa nykyisessä hakemistossa. Haluatko ylikirjoittaa tiedoston?",
  "dropFilesHere": "pudota tiedosto tähän ladataksesi palvelimeen",
  "search": "Hae"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "on",
  "isFalse": "ei ole",
  "filter": "Suodata",
  "clear": "Tyhjennä",
  "operator": "Operaattori"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "On",
    "neq": "Ei ole",
    "startswith": "Alkaa",
    "contains": "Sisältää",
    "doesnotcontain": "Ei sisällä",
    "endswith": "Loppuu"
  },
  "number": {
    "eq": "On",
    "neq": "Ei ole",
    "gte": "On tasan tai suurempi kuin",
    "gt": "On suurempi kuin",
    "lte": "On tasan tai pienempi kuin",
    "lt": "On pienempi kuin"
  },
  "date": {
    "eq": "On",
    "neq": "Ei ole",
    "gte": "On tasan tai myöhempi kuin",
    "gt": "On myöhempi kuin",
    "lte": "On tasan tai aikaisempi kuin",
    "lt": "On aikaisempi kuin"
  },
  "enums": {
    "eq": "On",
    "neq": "Ei ole"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Näytä tulokset, joiden arvo:",
  "isTrue": "on",
  "isFalse": "ei ole",
  "filter": "Suodata",
  "clear": "Tyhjennä",
  "and": "Ja",
  "or": "Tai",
  "selectValue": "-Valitse arvo-",
  "operator": "Operaattori",
  "value": "Arvo",
  "cancel": "Peruuta"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "On",
    "neq": "Ei ole",
    "startswith": "Alkaa",
    "contains": "Sisältää",
    "doesnotcontain": "Ei sisällä",
    "endswith": "Loppuu"
  },
  "number": {
    "eq": "On",
    "neq": "Ei ole",
    "gte": "On tasan tai suurempi kuin",
    "gt": "On suurempi kuin",
    "lte": "On tasan tai pienempi kuin",
    "lt": "On pienempi kuin"
  },
  "date": {
    "eq": "On",
    "neq": "Ei ole",
    "gte": "On tasan tai myöhempi kuin",
    "gt": "On myöhempi kuin",
    "lte": "On tasan tai aikaisempi kuin",
    "lt": "On aikaisempi kuin"
  },
  "enums": {
    "eq": "On",
    "neq": "Ei ole"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Valitse kaikki",
  "clear": "Tyhjennä",
  "filter": "Suodatus",
  "search": "Hae"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Lisää lapsi",
    "append": "Lisää tehtävä",
    "insertAfter": "Lisää alapuolelle",
    "insertBefore": "Lisää yläpuolelle",
    "pdf": "Vie PDF"
  },
  "cancel": "Peruuta",
  "deleteDependencyWindowTitle": "Poista riippuvuus",
  "deleteTaskWindowTitle": "Poista tehtävä",
  "destroy": "Poista",
  "editor": {
    "assingButton": "Vastuuta",
    "editorTitle": "Tehtävä",
    "end": "Loppu",
    "percentComplete": "Valmis",
    "resources": "Resurssit",
    "resourcesEditorTitle": "Resurssit",
    "resourcesHeader": "Resurssit",
    "start": "Alku",
    "title": "Otsikko",
    "unitsHeader": "Yksiköt"
  },
  "save": "Tallenna",
  "views": {
    "day": "Päivä",
    "end": "Loppu",
    "month": "Kuukausi",
    "start": "Alku",
    "week": "Viikko",
    "year": "Vuosi"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Peruuta muutokset",
    "canceledit": "Peruuta",
    "create": "Lisää uusi tietue",
    "destroy": "Poista",
    "edit": "Muokkaa",
    "excel": "Vie Exceliin",
    "pdf": "Vie PDF",
    "save": "Tallenna muutokset",
    "select": "Valitse",
    "update": "Päivitä"
  },
  "editable": {
    "cancelDelete": "Peruuta",
    "confirmation": "Haluatko varmasti poistaa tietueen?",
    "confirmDelete": "Poista"
  },
  "noRecords": "Ei tietueita."
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Vedä sarakeotsikko tähän ryhmitelläksesi sarakkeen perusteella"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Kasvata arvoa",
  "downArrowText": "Vähennä arvoa"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Kaikki",
  "display": "{0} - {1} yht. {2} tuloksesta",
  "empty": "Ei tuloksia",
  "page": "Sivu",
  "of": "/ {0}",
  "itemsPerPage": "tulosta sivulla",
  "first": "Ensimmäinen sivu",
  "previous": "Edellinen sivu",
  "next": "Seuraava sivu",
  "last": "Viimeinen sivu",
  "refresh": "Päivitä",
  "morePages": "Lisää sivuja"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Pudota datakentät tähän",
  "columnFields": "Pudota sarakkeet tähän",
  "rowFields": "Pudota rivit tähän"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Näytä tulokset, joiden arvo:",
  "filterFields": "Kenttien suodatus",
  "filter": "Suodata",
  "include": "Sisällytä kentät...",
  "title": "Sisällytettävät kentät",
  "clear": "Tyhjennä",
  "ok": "Ok",
  "cancel": "Peruuta",
  "operators": {
    "contains": "Sisältää",
    "doesnotcontain": "Ei sisällä",
    "startswith": "Alkaa",
    "endswith": "Loppuu",
    "eq": "On",
    "neq": "Ei ole"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Ei koskaan",
    "hourly": "Joka tunti",
    "daily": "Päivittäin",
    "weekly": "Viikoittain",
    "monthly": "Joka kuukausi",
    "yearly": "Joka vuosi"
  },
  "hourly": {
    "repeatEvery": "Toista joka: ",
    "interval": " tunti"
  },
  "daily": {
    "repeatEvery": "Toista joka: ",
    "interval": " päivä"
  },
  "weekly": {
    "interval": " viikko",
    "repeatEvery": "Toista joka: ",
    "repeatOn": "Toista tällöin: "
  },
  "monthly": {
    "repeatEvery": "Toista joka: ",
    "repeatOn": "Toista tällöin: ",
    "interval": " kuukausi",
    "day": "Päivä "
  },
  "yearly": {
    "repeatEvery": "Toista joka: ",
    "repeatOn": "Toista tällöin: ",
    "interval": " vuosi",
    "of": " kk: "
  },
  "end": {
    "label": "Loppu:",
    "mobileLabel": "Loppuu",
    "never": "Ei koskaan",
    "after": "Kun toistettu ",
    "occurrence": " kertaa",
    "on": "Tarkka pvm "
  },
  "offsetPositions": {
    "first": "ensimmäinen",
    "second": "toinen",
    "third": "kolmas",
    "fourth": "neljäs",
    "last": "viimeinen"
  },
  "weekdays": {
    "day": "päivä",
    "weekday": "arkipäivä",
    "weekend": "viikonloppu"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "koko päivä",
  "date": "Päivämäärä",
  "event": "Tapahtuma",
  "time": "Kellonaika",
  "showFullDay": "Näytä koko päivä",
  "showWorkDay": "Näytä virka-aika",
  "today": "Tänään",
  "save": "Tallenna",
  "cancel": "Peruuta",
  "destroy": "Poista",
  "deleteWindowTitle": "Poista tapahtuma",
  "ariaSlotLabel": "Valittuna {0:t} - {1:t}",
  "ariaEventLabel": "{0} {1:D} klo {2:t}",
  "editable": {
    "confirmation": "Haluatko varmasti poistaa tapahtuman?"
  },
  "views": {
    "day": "Päivä",
    "week": "Viikko",
    "workWeek": "Työviikko",
    "agenda": "Agenda",
    "month": "Kuukausi"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Poista toistuva tapahtuma",
    "deleteWindowOccurrence": "Poista vain tämä tapahtuma",
    "deleteWindowSeries": "Poista kaikki tapahtumat",
    "editWindowTitle": "Muokkaa toistuvaa tapahtumaa",
    "editWindowOccurrence": "Muokkaa vain tätä tapahtumaa",
    "editWindowSeries": "Muokkaa kaikkia tapahtumia",
    "deleteRecurring": "Haluatko poistaa vain tämän tapahtuman, vai koko sarjan?",
    "editRecurring": "Haluatko muokata vain tätä tapahtumaa, vai koko sarjaa?"
  },
  "editor": {
    "title": "Otsikko",
    "start": "Alku",
    "end": "Loppu",
    "allDayEvent": "Koko päivän tapahtuma",
    "description": "Kuvaus",
    "repeat": "Toistuminen",
    "timezone": " ",
    "startTimezone": "Alkamisen aikavyöhyke",
    "endTimezone": "Loppumisen aikavyöhyke",
    "separateTimezones": "Eri aikavyöhykkeet alkamiselle ja loppumiselle",
    "timezoneEditorTitle": "Aikavyöhykkeet",
    "timezoneEditorButton": "Aikavyöhyke",
    "timezoneTitle": "Aikavyöhykkeet",
    "noTimezone": "Ei aikavyöhykettä",
    "editorTitle": "Tapahtuma"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Kaikki reunat",
  "insideBorders": "Sisäreunat",
  "insideHorizontalBorders": "Vaakasuora sisäreuna",
  "insideVerticalBorders": "Pystysuora sisäreuna",
  "outsideBorders": "Ulkoreunat",
  "leftBorder": "Vasen reuna",
  "topBorder": "Yläreuna",
  "rightBorder": "Oikea reuna",
  "bottomBorder": "Alareuna",
  "noBorders": "Ei reunaviivaa"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Käytä",
  "save": "Tallenna",
  "cancel": "Peruuta",
  "remove": "Poista",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Muotoilu",
    "categories": {
      "number": "Numero",
      "currency": "Valuutta",
      "date": "Päivämäärä"
      }
  },
  "fontFamilyDialog": {
    "title": "Fontti"
  },
  "fontSizeDialog": {
    "title": "Fonttikoko"
  },
  "bordersDialog": {
    "title": "Reunaviivat"
  },
  "alignmentDialog": {
    "title": "Asemointi",
    "buttons": {
     "justtifyLeft": "Tasaa vasemmalle",
     "justifyCenter": "Keskitä",
     "justifyRight": "Tasaa oikealle",
     "justifyFull": "Tasaa molemmat reunat",
     "alignTop": "Tasaa ylös",
     "alignMiddle": "Tasaa keskelle",
     "alignBottom": "Tasaa alas"
    }
  },
  "mergeDialog": {
    "title": "Yhdistä solut",
    "buttons": {
      "mergeCells": "Yhdistä kaikki",
      "mergeHorizontally": "Yhdistä vaakasolut",
      "mergeVertically": "Yhdistä pystysolut",
      "unmerge": "Poista solujen yhdistäminen"
    }
  },
  "freezeDialog": {
    "title": "Kiinnitä ruudut",
    "buttons": {
      "freezePanes": "Kiinnitä ruudut",
      "freezeRows": "Kiinnitä rivit",
      "freezeColumns": "Kiinnitä sarakkeet",
      "unfreeze": "Vapauta ruudut"
    }
  },
  "validationDialog": {
    "title": "Datan validointi",
    "hintMessage": "Anna kelvollinen arvo tyyppiä \"{0}\" kohtaan {1}.",
    "hintTitle": "Validointi {0}",
    "criteria": {
      "any": "Mikä tahansa",
      "number": "Numero",
      "text": "Teksti",
      "date": "Päivämäärä",
      "custom": "Mukautettu ehto"
    },
    "comparers": {
      "greaterThan": "suurempi kuin",
      "lessThan": "pienempi kuin",
      "between": "väliltä",
      "notBetween": "ei väliltä",
      "equalTo": "tasan",
      "notEqualTo": "eri kuin",
      "greaterThanOrEqualTo": "tasan tai suurempi kuin",
      "lessThanOrEqualTo": "tasan tai pienempi kuin"
    },
    "comparerMessages": {
      "greaterThan": "suurempi kuin {0}",
      "lessThan": "pienempi kuin {0}",
      "between": "väliltä {0} ja {1}",
      "notBetween": "ei väliltä {0} ja {1}",
      "equalTo": "tasan {0}",
      "notEqualTo": "eri kuin {0}",
      "greaterThanOrEqualTo": "tasan tai suurempi kuin {0}",
      "lessThanOrEqualTo": "tasan tai pienempi kuin {0}",
      "custom": "joka täyttää ehdon: {0}"
    },
    "labels": {
      "criteria": "Kriteeri",
      "comparer": "Vertailu",
      "min": "Min",
      "max": "Max",
      "value": "Arvo",
      "start": "Alku",
      "end": "Loppu",
      "onInvalidData": "Epäkelvot arvot",
      "rejectInput": "Hylkää arvo",
      "showWarning": "Näytä varoitus",
      "showHint": "Näytä vihje",
      "hintTitle": "Vihjeen otsikko",
      "hintMessage": "Vihjeteksti"
    },
    "placeholders": {
      "typeTitle": "Tyypin otsikko",
      "typeMessage": "Tyypin viesti"
    }
  },
  "saveAsDialog": {
    "title": "Tallenna nimellä...",
    "labels": {
      "fileName": "Tiedostonimi",
      "saveAsType": "Tiedoston tyyppi"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Yhdistetyn solun osaa ei voi muuttaa."
  },
  "useKeyboardDialog": {
    "title": "Kopiointi ja liittäminen",
    "errorMessage": "Näitä toimintoja ei voi käyttää valikosta. Käytä näppäinoikoteitä:",
    "labels": {
      "forCopy": "kopioidaksesi",
      "forCut": "leikataksesi",
      "forPaste": "liittääksesi"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Toimintoa ei voi suorittaa useille kohteille."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Lajittele A - Ö",
  "sortDescending": "Lajittele Ö - A",
  "filterByValue": "Suodata arvon perusteella",
  "filterByCondition": "Suodata ehdon perusteella",
  "apply": "Käytä",
  "search": "Hae",
  "clear": "Tyhjennä",
  "blanks": "(Tyhjät)",
  "operatorNone": "Ei mitään",
  "and": "JA",
  "or": "TAI",
  "operators": {
    "string": {
      "contains": "Teksti sisältää",
      "doesnotcontain": "Teksti ei sisällä",
      "startswith": "Teksti alkaa",
      "endswith": "Teksti loppuu"
    },
    "date": {
      "eq":  "Päivämäärä on",
      "neq": "Päivämäärä ei ole",
      "lt":  "Päivämäärä on aiemmin kuin",
      "gt":  "Päivämäärä on myöhemmin kuin"
    },
    "number": {
      "eq": "On",
      "neq": "Ei ole",
      "gte": "On tasan tai suurempi kuin",
      "gt": "On suurempi kuin",
      "lte": "On tasan tai pienempi kuin",
      "lt": "On pienempi kuin"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Lisää sarake vasemmalle",
  "addColumnRight": "Lisää sarake vasemmalle",
  "addRowAbove": "Lisää rivi yläpuolelle",
  "addRowBelow": "Lisää rivi alapuolelle",
  "alignment": "Alignment",
  "alignmentButtons": {
    "justtifyLeft": "Tasaa vasemmalle",
    "justifyCenter": "Keskitä",
    "justifyRight": "Tasaa oikealle",
    "justifyFull": "Tasaa molemmat reunat",
    "alignTop": "Tasaa ylös",
    "alignMiddle": "Tasaa keskelle",
    "alignBottom": "Tasaa alas"
  },
  "backgroundColor": "Taustaväri",
  "bold": "Lihavoitu",
  "borders": "Reunaviivat",
  "copy": "Kopioi",
  "cut": "Leikkaa",
  "deleteColumn": "Poista sarake",
  "deleteRow": "Poista rivi",
  "excelExport": "Vie Exceliin...",
  "filter": "Suodata",
  "fontFamily": "Fontti",
  "fontSize": "Fonttikoko",
  "format": "Mukautettu muotoilu...",
  "formatTypes": {
    "automatic": "Automaattinen",
    "number": "Numero",
    "percent": "Prosenttimuoto",
    "financial": "Kirjanpidon lukumuoto",
    "currency": "Valuutta",
    "date": "Päivämäärä",
    "time": "Kellonaika",
    "dateTime": "Pvm ja klo",
    "duration": "Kesto",
    "moreFormats": "Lisää muotoiluja..."
  },
  "formatDecreaseDecimal": "Vähennä desimaaleja",
  "formatIncreaseDecimal": "Lisää desimaaleja",
  "freeze": "Kiinnitä ruudut",
  "freezeButtons": {
    "freezePanes": "Kiinnitä ruudut",
    "freezeRows": "Kiinnitä rivit",
    "freezeColumns": "Kiinnitä sarakkeet",
    "unfreeze": "Vapauta ruudut"
  },
  "italic": "Kursivoitu",
  "merge": "Yhdistä solut",
  "mergeButtons": {
    "mergeCells": "Yhdistä kaikki",
    "mergeHorizontally": "Yhdistä vaakasolu",
    "mergeVertically": "Yhdistä pystysolut",
    "unmerge": "Poista solujen yhdistäminen"
  },
  "open": "Avaa...",
  "paste": "Liitä",
  "quickAccess": {
    "redo": "Tee uudelleen",
    "undo": "Kumoa"
  },
  "saveAs": "Tallenna nimellä...",
  "sortAsc": "Nouseva järjestys",
  "sortDesc": "Laskeva järjestys",
  "sortButtons": {
    "sortSheetAsc": "Järjestä työkirja A - Ö",
    "sortSheetDesc": "Järjestä työkirja Ö - A",
    "sortRangeAsc": "Järjestä valinta A - Ö",
    "sortRangeDesc": "Järjestä valinta Ö - A"
  },
  "textColor": "Tekstin väri",
  "textWrap": "Tekstin rivitys",
  "underline": "Alleviivattu",
  "validation": "Datan validointi..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Soluja ei voi lisätä datahävikin vuoksi. Valitse toinen lisäyskohta tai poista tietoja työkirjan lopusta.",
    "filterRangeContainingMerges": "Suodatinta ei voi asettaa yhdistettyyn sisältöön."
  },
  "tabs": {
    "home": "Aloitus",
    "insert": "Lisää",
    "data": "Data"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Lisää",
  "decreaseButtonTitle": "Vähennä"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Ei tuloksia",
  "loading": "Ladataan...",
  "requestFailed": "Sivupyyntö epäonnistui.",
  "retry": "Yritä uudelleen",
  "commands": {
      "edit": "Muokkaa",
      "update": "Päivitä",
      "canceledit": "Peruuta",
      "create": "Lisää uusi tietue",
      "createchild": "Lisää lapsitietue",
      "destroy": "Poista",
      "excel": "Vie Exceliin",
      "pdf": "Vie PDF"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Ladataan...",
  "requestFailed": "Sivupyyntö epäonnistui.",
  "retry": "Yritä uudelleen"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Valitse tiedostoja...",
  "cancel": "Peruuta",
  "retry": "Yritä uudelleen",
  "remove": "Poista",
  "uploadSelectedFiles": "Lataa tiedostot palvelimeen",
  "dropFilesHere": "pudota tiedostot tähän ladataksesi palvelimeen",
  "statusUploading": "ladataan",
  "statusUploaded": "ladattu",
  "statusWarning": "varoitus",
  "statusFailed": "epäonnistui",
  "headerStatusUploading": "Ladataan...",
  "headerStatusUploaded": "Valmis"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} vaaditaan",
  "pattern": "{0} ei kelpaa",
  "min": "{0} on oltava tasan tai suurempi kuin {1}",
  "max": "{0} on oltava tasan tai pienempi kuin {1}",
  "step": "{0} ei kelpaa",
  "email": "{0} ei ole kelvollinen sähköpostiosoite",
  "url": "{0} ei ole kelvollinen URL",
  "date": "{0} ei ole kelvollinen päivämäärä",
  "dateCompare": "Loppupäivämäärän on oltava sama tai myöhäisempi kuin alkupäivämäärä"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Sulkea"
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
  "cancel": "Peruuta"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Peruuta"
});
}

})(window.kendo.jQuery);
