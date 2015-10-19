/*
 * Kendo UI v2015.2.902 (http://www.telerik.com/kendo-ui)
 * Copyright 2015 Telerik AD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
! function (e, define) {
    "use strict";
    define([], e);
}(function () {
    "use strict";
    return function(e) {
        kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.operators = e.extend(!0, kendo.ui.FilterCell.prototype.options.operators, {
                date: {
                    eq: "Är lika med",
                    gt: "Är senare än",
                    gte: "Är lika eller senare än",
                    lt: "Är tidigare än",
                    lte: "Är lika eller tidigare än",
                    neq: "Är inte lika med"
                },
                number: {
                    eq: "Är lika med",
                    gt: "Är större än",
                    gte: "Är lika eller större än",
                    lt: "Är mindre än",
                    lte: "Är lika eller mindre än",
                    neq: "Är inte lika med"
                },
                string: {
                    contains: "Innehåller",
                    doesnotcontain: "Innehåller inte",
                    endswith: "Slutar med",
                    eq: "Är lika med",
                    neq: "Är inte lika med",
                    startswith: "Börjar med"
                },
                enums: {
                    eq: "Är lika med",
                    neq: "Är inte lika med"
                }
            })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.operators = e.extend(!0, kendo.ui.FilterMenu.prototype.options.operators, {
                date: {
                    eq: "Är lika med",
                    gt: "Är senare än",
                    gte: "Är lika eller senare än",
                    lt: "Är tidigare än",
                    lte: "Är lika eller tidigare än",
                    neq: "Är inte lika med"
                },
                number: {
                    eq: "Är lika med",
                    gt: "Är större än",
                    gte: "Är lika eller större än",
                    lt: "Är mindre än",
                    lte: "Är lika eller mindre än",
                    neq: "Är inte lika med"
                },
                string: {
                    contains: "Innehåller",
                    doesnotcontain: "Innehåller inte",
                    endswith: "Slutar med",
                    eq: "Är lika med",
                    neq: "Är inte lika med",
                    startswith: "Börjar med"
                },
                enums: {
                    eq: "Är lika med",
                    neq: "Är inte lika med"
                }
            })), kendo.ui.ColumnMenu && (kendo.ui.ColumnMenu.prototype.options.messages = e.extend(!0, kendo.ui.ColumnMenu.prototype.options.messages, {
                columns: "Kolumner",
                sortAscending: "Sortera fallande",
                sortDescending: "Sortera stigande",
                settings: "Kolumninställningar",
                done: "Klar",
                lock: "Lås",
                unlock: "Lås upp"
            })),
            kendo.ui.Validator && (kendo.ui.Validator.prototype.options.messages = e.extend(!0, kendo.ui.Validator.prototype.options.messages, {
                "required": "{0} är obligatoriskt",
                "pattern": "{0} är ogiltigt",
                "min": "{0} måste vara större än eller lika med {1}",
                "max": "{0} måste vara mindre än eller lika med {1}",
                "step": "{0} är inte giltigt",
                "email": "{0} är inte en giltig mail-address",
                "url": "{0} är en ogiltig url",
                "date": "{0} är ett ogiltigt datum",
                "dateCompare": "Sluttiden måste vara efter starttiden"
            })),
            kendo.ui.RecurrenceEditor && (kendo.ui.RecurrenceEditor.prototype.options.messages = e.extend(!0, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                daily: {
                    interval: "dag(ar)",
                    repeatEvery: "Upprepa:"
                },
                end: {
                    after: "Efter",
                    occurrence: "förekomst(er)",
                    label: "Slut:",
                    never: "Aldrig",
                    on: "På",
                    mobileLabel: "Slutar"
                },
                frequencies: {
                    daily: "Dagligen",
                    monthly: "Månatligen",
                    never: "Aldrig",
                    weekly: "Veckovis",
                    yearly: "Årligen"
                },
                monthly: {
                    day: "Dag",
                    interval: "månad(er)",
                    repeatEvery: "Upprepa varje:",
                    repeatOn: "Upprepa på:"
                },
                offsetPositions: {
                    first: "första",
                    fourth: "fjärde",
                    last: "sista",
                    second: "andra",
                    third: "tredje"
                },
                weekly: {
                    repeatEvery: "Upprepa varje:",
                    repeatOn: "Upprepa på:",
                    interval: "vecka(or)"
                },
                yearly: {
                    of: "av",
                    repeatEvery: "Upprepa varje:",
                    repeatOn: "Upprepa på:",
                    interval: "år"
                },
                weekdays: {
                    day: "dag",
                    weekday: "veckodag",
                    weekend: "helgdag"
                }
            })), kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.messages = e.extend(!0, kendo.ui.FilterCell.prototype.options.messages, {
                clear: "Rensa",
                filter: "Filtrera",
                isFalse: "är falskt",
                isTrue: "är sant",
                operator: "Operatör"
            })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.messages = e.extend(!0, kendo.ui.FilterMenu.prototype.options.messages, {
                and: "Och",
                clear: "Rensa",
                filter: "Filtrera",
                info: "Visa poster med värde:",
                isFalse: "är falskt",
                isTrue: "är sant",
                or: "Eller",
                selectValue: "-Välj-",
                cancel: "Avbryt",
                operator: "Operatör",
                value: "Värde"
            })), kendo.ui.Grid && (kendo.ui.Grid.prototype.options.messages = e.extend(!0, kendo.ui.Grid.prototype.options.messages, {
                commands: {
                    canceledit: "Avbryt",
                    cancel: "Avbryt ändringar",
                    create: "Lägg till post",
                    destroy: "Radera",
                    edit: "Ändra",
                    excel: "Export to Excel",
                    pdf: "Export to PDF",
                    save: "Spara ändringar",
                    select: "Välj",
                    update: "Spara"
                },
                editable: {
                    confirmation: "Är du säker på att du vill radera denna post?",
                    cancelDelete: "Avbryt",
                    confirmDelete: "Radera"
                }
            })), kendo.ui.Groupable && (kendo.ui.Groupable.prototype.options.messages = e.extend(!0, kendo.ui.Groupable.prototype.options.messages, {
                empty: "Dra en kolumnrubrik hit för att sortera på den kolumnen"
            })), kendo.ui.Pager && (kendo.ui.Pager.prototype.options.messages = e.extend(!0, kendo.ui.Pager.prototype.options.messages, {
                display: "{0} - {1} av {2} poster",
                empty: "Det finns inga poster",
                first: "Gå till första sidan",
                itemsPerPage: "poster per sida",
                last: "Gå till sista sidan",
                next: "Gå till nästa sida",
                of: "av {0}",
                page: "Sida",
                previous: "Gå till föregående sida",
                refresh: "Uppdatera",
                morePages: "Fler sidor"
            })), kendo.ui.Upload && (kendo.ui.Upload.prototype.options.localization = e.extend(!0, kendo.ui.Upload.prototype.options.localization, {
                cancel: "Avbryt",
                retry: "Försök igen",
                select: "Välj...",
                remove: "Ta bort",
                uploadSelectedFiles: "Ladda upp filer",
                dropFilesHere: "släpp filer här för att ladda upp",
                statusFailed: "misslyckades",
                statusUploaded: "uppladdad",
                statusUploading: "laddar upp",
                headerStatusUploaded: "Done",
                headerStatusUploading: "Uploading..."
            })), kendo.ui.Editor && (kendo.ui.Editor.prototype.options.messages = e.extend(!0, kendo.ui.Editor.prototype.options.messages, {
                bold: "Fet",
                createLink: "Lägg till länk",
                fontName: "Välj typsnitt",
                fontNameInherit: "(ärvt typsnitt)",
                fontSize: "Välj storlek",
                fontSizeInherit: "(ärvd storlek)",
                formatBlock: "Formatering",
                indent: "Öka indrag",
                insertHtml: "Lägg till HTML",
                insertImage: "Lägg till bild",
                insertOrderedList: "Lägg till numrerad lista",
                insertUnorderedList: "Lägg till punktlista",
                italic: "Kursiv",
                justifyCenter: "Centrerad text",
                justifyFull: "Marginaljusterad text",
                justifyLeft: "Vänsterjusterad text",
                justifyRight: "Högerjusterad text",
                outdent: "Minska indrag",
                strikethrough: "Genomstruken",
                styles: "Stil",
                subscript: "Nedsänkt",
                superscript: "Upphöjd",
                underline: "Understruken",
                unlink: "Ta bort länk",
                deleteFile: 'Är du säker på att du vill radera "{0}"?',
                directoryNotFound: "En mapp med detta namn hittades ej.",
                emptyFolder: "Tom mapp",
                invalidFileType: 'Filen "{0}" är inte giltig. Tillåtna filtyper är {1}.',
                orderBy: "Sortera på:",
                orderByName: "Namn",
                orderBySize: "Storlek",
                overwriteFile: '\'En fil med namn "{0}" finns redan i aktuell mapp. Vill du skriva över den?',
                uploadFile: "Ladda upp",
                backColor: "Bakgrundsfärg",
                foreColor: "Färg",
                dropFilesHere: "släpp filer här för att ladda upp",
                dialogButtonSeparator: "eller",
                dialogCancel: "Avbryt",
                dialogInsert: "Lägg till",
                imageAltText: "Alternativ text",
                imageWebAddress: "Webbadress",
                linkOpenInNewWindow: "Öppna länk i ett nytt fönster",
                linkText: "Text",
                linkToolTip: "Skärmtips",
                linkWebAddress: "Webbadress",
                search: "Search",
                createTable: "Skapa tabell",
                addColumnLeft: "Lägg till vänsterkolumn",
                addColumnRight: "Lägg till högerkolumn",
                addRowAbove: "Lägg till rad ovanför",
                addRowBelow: "Lägg till rad under",
                deleteColumn: "Ta bort kolumn",
                deleteRow: "Ta bort rad",
                formatting: "Format",
                viewHtml: "Visa HTML",
                dialogUpdate: "Uppdatera",
                insertFile: "Ange fil"
            })), kendo.ui.Scheduler && (kendo.ui.Scheduler.prototype.options.messages = e.extend(!0, kendo.ui.Scheduler.prototype.options.messages, {
                allDay: "Hela dagen",
                cancel: "Avbryt",
                editable: {
                    confirmation: "Är du säker på att du vill ta bort tillfället?"
                },
                date: "Datum",
                destroy: "Ta bort",
                editor: {
                    allDayEvent: "Heldagstillfälle",
                    description: "Beskrivning",
                    editorTitle: "Tillfälle",
                    end: "Slut",
                    endTimezone: "Sluttidszon",
                    repeat: "Upprepa",
                    separateTimezones: "Använd separata start och sluttidszoner",
                    start: "Start",
                    startTimezone: "Starttidszon",
                    timezone: " ",
                    timezoneEditorButton: "Tidszon",
                    timezoneEditorTitle: "Tidszoner",
                    title: "Titel",
                    noTimezone: "Ingen tidszon"
                },
                event: "Tillfälle",
                recurrenceMessages: {
                    deleteRecurring: "Vill du ta bort enbart detta tillfället eller hela serien?",
                    deleteWindowOccurrence: "Ta bort nuvarande upprepning",
                    deleteWindowSeries: "Ta bort serien",
                    deleteWindowTitle: "Ta bort återkommande objekt",
                    editRecurring: "Vill du redigera enbart detta tillfälle eller hela serien?",
                    editWindowOccurrence: "Redigera återkommade tillfälle",
                    editWindowSeries: "Redigera serie",
                    editWindowTitle: "Redigera återkommande objekt"
                },
                end: "Slut",
                start: "Start",
                save: "Spara",
                time: "Tid",
                today: "Idag",
                views: {
                    agenda: "Agenda",
                    day: "Dag",
                    month: "Månad",
                    week: "Vecka",
                    workWeek: "Arbetsvecka"
                },
                deleteWindowTitle: "Ta bort tillfälle",
                showFullDay: "Visa heldag",
                showWorkDay: "Visa för arbetsdag"
            }))
    }(window.kendo.jQuery), window.kendo;
}, "function" == typeof define && define.amd ? define : function (e, t) {
    t();
})
