(function ($, undefined) {
    /* FlatColorPicker messages */

    if (kendo.ui.FlatColorPicker) {
        kendo.ui.FlatColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
                "apply": " ÿ»Ìﬁ",
                "cancel": "≈·€«¡",
                "noColor": "»·« ·Ê‰",
                "clearColor": "≈“«·… «··Ê‰"
            });
    }

    /* ColorPicker messages */

    if (kendo.ui.ColorPicker) {
        kendo.ui.ColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
                "apply": " ÿ»Ìﬁ",
                "cancel": "≈·€«¡",
                "noColor": "»œÊ‰ ·Ê‰",
                "clearColor": "≈“«·… «··Ê‰"
            });
    }

    /* ColumnMenu messages */

    if (kendo.ui.ColumnMenu) {
        kendo.ui.ColumnMenu.prototype.options.messages =
            $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
                "sortAscending": " — Ì»  ’«⁄œÌ",
                "sortDescending": " — Ì»  ‰«“·Ì",
                "filter": "›—“",
                "column": "⁄„Êœ",
                "columns": "√⁄„œ…",
                "columnVisibility": "ŸÂÊ— «·⁄„Êœ",
                "clear": "„”Õ",
                "cancel": "≈·€«¡",
                "done": " „",
                "settings": " ⁄œÌ· ≈⁄œ«œ«  «·⁄„Êœ",
                "lock": "ﬁ›· «·⁄„Êœ",
                "unlock": "«·€«¡ ﬁ›· «·⁄„Êœ",
                "stick": " À»Ì  «·⁄«„Êœ",
                "unstick": "≈·€«¡  À»Ì  «·⁄„Êœ",
                "setColumnPosition": " ⁄ÌÌ‰ „Ê÷⁄ «·⁄„Êœ",
                "apply": " ÿ»Ìﬁ",
                "reset": "≈⁄«œ… ÷»ÿ",
                "buttonTitle": "{0}  ⁄œÌ· ≈⁄œ«œ«  «·⁄„Êœ"
            });
    }

    /* DateRangePicker messages */

    if (kendo.ui.DateRangePicker) {
        kendo.ui.DateRangePicker.prototype.options.messages =
            $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
                "startLabel": "»œ«Ì…",
                "endLabel": "‰Â«Ì…"
            });
    }

    /* Editor messages */

    if (kendo.ui.Editor) {
        kendo.ui.Editor.prototype.options.messages =
            $.extend(true, kendo.ui.Editor.prototype.options.messages, {
                "bold": "”„Ìﬂ",
                "italic": "„«∆·",
                "underline": " Õ Â Œÿ",
                "strikethrough": "Ì Ê”ÿ¯Â Œÿ",
                "superscript": "Õ—› ⁄·ÊÌ",
                "subscript": "Õ—› ”›·Ì",
                "justifyCenter": "„Õ«–«… ›Ì «·„‰ ’›",
                "justifyLeft": "„Õ«–«… «·‰’ ≈·Ï «·Ì”«—",
                "justifyRight": "„Õ«–«… «·‰’ ≈·Ï «·Ì„Ì‰",
                "justifyFull": "„Õ«–«…",
                "insertUnorderedList": "≈œ—«Ã ﬁ«∆„… €Ì— „— »…",
                "insertOrderedList": "≈œ—«Ã ﬁ«∆„… „— »…",
                "indent": "„”«›… »«œ∆…",
                "outdent": "«·Â«„‘ «·Œ«—ÃÌ",
                "createLink": "≈œ—«Ã —«»ÿ",
                "unlink": "≈“«·… «·—«»ÿ",
                "insertImage": "≈œ—«Ã ’Ê—…",
                "insertFile": "≈œ—«Ã „·›",
                "insertHtml": "HTML ≈œ—«Ã",
                "viewHtml": "HTML ⁄—÷",
                "fontName": "«Œ — „Ã„Ê⁄… «·ŒÿÊÿ",
                "fontNameInherit": "(‰Ê⁄ «·Œÿ)",
                "fontSize": "«Œ — ÕÃ„ «·Œÿ",
                "fontSizeInherit": "(ÕÃ„ «·Œÿ)",
                "formatBlock": " ‰”Ìﬁ",
                "formatting": " ‰”Ìﬁ",
                "foreColor": "·Ê‰",
                "backColor": "·Ê‰ «·Œ·›Ì…",
                "style": "√‰„«ÿ",
                "emptyFolder": "„Ã·œ ›«—€",
                "uploadFile": "—›⁄",
                "overflowAnchor": "√œÊ«  √ﬂÀ—",
                "orderBy": " — Ì» »Ê«”ÿ…:",
                "orderBySize": "«·ÕÃ„",
                "orderByName": "«·«”„",
                "invalidFileType": "«·„·› «·„Õœœ \"{0}\" €Ì— ’«·Õ. √‰Ê«⁄ «·„·›«  «·„œ⁄Ê„… ÂÌ {1}.",
                "deleteFile": "Â· √‰  „ √ﬂœ „‰ Õ–› «·„·› '{0}'ø",
                "overwriteFile": "ÌÊÃœ „·› »«”„ \"{0}\" »«·›⁄· ›Ì «·œ·Ì· «·Õ«·Ì. Â·  —Ìœ «” »œ«·Âø",
                "directoryNotFound": "·„ Ì „ «·⁄ÀÊ— ⁄·Ï œ·Ì· »Â–« «·«”„.",
                "imageWebAddress": "⁄‰Ê«‰ ’›Õ… «·≈‰ —‰ ",
                "imageAltText": "‰’ »œÌ·",
                "imageWidth": "«·⁄—÷ (»ﬂ”·)",
                "imageHeight": "«·«— ›«⁄ (»ﬂ”·)",
                "fileWebAddress": "⁄‰Ê«‰ ’›Õ… «·≈‰ —‰ ",
                "fileTitle": "⁄‰Ê«‰",
                "linkWebAddress": "⁄‰Ê«‰ ’›Õ… «·≈‰ —‰ ",
                "linkText": "‰’",
                "linkToolTip": " ·„ÌÕ",
                "linkOpenInNewWindow": "› Õ «·—«»ÿ ›Ì ‰«›–… ÃœÌœ…",
                "dialogUpdate": " ÕœÌÀ",
                "dialogInsert": "≈œ—«Ã",
                "dialogButtonSeparator": "√Ê",
                "dialogCancel": "≈·€«¡",
                "cleanFormatting": "≈“«·… «· ‰”Ìﬁ",
                "createTable": "√‰‘Ì¡ ÃœÊ·",
                "addColumnLeft": "√÷› ⁄„Êœ ≈·Ì «·Ì”«—",
                "addColumnRight": "√÷› ⁄„Êœ ≈·Ì «·Ì„Ì‰",
                "addRowAbove": "√÷› ’› ≈·Ì «·√⁄·Ì",
                "addRowBelow": "√÷› ’› ≈·Ì «·√”›·",
                "deleteRow": "Õ–› ’›",
                "deleteColumn": "Õ–› ⁄„Êœ",
                "dialogOk": "Õ”‰«",
                "tableWizard": "„⁄«·Ã «·Ãœ«Ê·",
                "tableTab": "ÃœÊ·",
                "cellTab": "Œ·Ì…",
                "accessibilityTab": "≈„ﬂ«‰Ì… «·Ê’Ê·",
                "caption": "Ê’›",
                "summary": "„·Œ’",
                "width": "«·⁄—÷",
                "height": "«— ›«⁄",
                "units": "«·ÊÕœ« ",
                "cellSpacing": " »«⁄œ «·Œ·«Ì«",
                "cellPadding": "‰ÿ«ﬁ «·Œ·Ì…",
                "cellMargin": "Â«„‘ «·Œ·Ì…",
                "alignment": "«·„Õ«–«…",
                "background": "«·Œ·›Ì…",
                "cssClass": "›∆… «· CSS",
                "id": "ID",
                "border": "≈ÿ«—",
                "borderStyle": "‰„ÿ «·≈ÿ«—",
                "collapseBorders": " ’€Ì— «·ÕœÊœ",
                "wrapText": "«· ›«› «·‰’",
                "associateCellsWithHeaders": "—ƒÊ” „ﬁ —‰…",
                "alignLeft": "„Õ«–«… ≈·Ï «·Ì”«—",
                "alignCenter": "„Õ«–«… ≈·Ï «·„‰ ’›",
                "alignRight": "„Õ«–«… ≈·Ï «·Ì„Ì‰",
                "alignLeftTop": "„Õ«–«… ≈·Ï √⁄·Ï «·Ì”«—",
                "alignCenterTop": "„Õ«–«… ≈·Ì √⁄·Ì «·„‰ ’›",
                "alignRightTop": "„Õ«–«… ≈·Ï √⁄·Ï «·Ì„Ì‰",
                "alignLeftMiddle": "„Õ«–«… ≈·Ï Ê”ÿ «·Ì”«—",
                "alignCenterMiddle": "„Õ«–«… ≈·Ì Ê”ÿ «·„‰ ’›",
                "alignRightMiddle": "„Õ«–«… ≈·Ï Ê”ÿ «·Ì„Ì‰",
                "alignLeftBottom": "„Õ«–«… ≈·Ï √”›· «·Ì”«—",
                "alignCenterBottom": "„Õ«–«… ≈·Ï √”›· «·„‰ ’›",
                "alignRightBottom": "„Õ«–«… ≈·Ï √”›· «·Ì„Ì‰",
                "alignRemove": "≈“«·… «·„Õ«–«…",
                "columns": "«·√⁄„œ…",
                "rows": "’›Ê›",
                "selectAllCells": " ÕœÌœ ﬂ· «·Œ·«Ì«",
                "print": "ÿ»«⁄…",
                "headerRows": "—√” «·’›Ê›",
                "headerColumns": "—√” «·«⁄„œ…",
                "tableSummaryPlaceholder": "”„… «·„·Œ’ €Ì— „ Ê«›ﬁ… „⁄ HTML5.",
                "associateNone": "·« ‘Ì¡",
                "associateScope": "«ﬁ —«‰ »«” Œœ«„ ”„… \"«·‰ÿ«ﬁ\"",
                "associateIds": "«ﬁ —«‰ »«” Œœ«„ «·„⁄—›« ",
                "copyFormat": "‰”Œ «· ‰”Ìﬁ",
                "applyFormat": " ÿ»Ìﬁ «· ‰”Ìﬁ",
                "borderNone": "·« ‘Ì¡"
            });
    }

    /* FileBrowser messages */

    if (kendo.ui.FileBrowser) {
        kendo.ui.FileBrowser.prototype.options.messages =
            $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
                "uploadFile": "—›⁄",
                "orderBy": " — Ì» »Ê«”ÿ…",
                "orderByName": "«·«”„",
                "orderBySize": "«·ÕÃ„",
                "directoryNotFound": "·„ Ì „ «·⁄ÀÊ— ⁄·Ï „”«— »Â–« «·«”„.",
                "emptyFolder": "„Ã·œ ›«—€",
                "deleteFile": "Â· √‰  „ √ﬂœ „‰ Õ–› '{0}'ø",
                "invalidFileType": "«·„·› \"{0}\" €Ì— ’«·Õ° √‰Ê«⁄ «·„·›«  «·„œ⁄Ê„… ÂÌ {1}.",
                "overwriteFile": "«·„·› »«”„ \"{0}\" „ÊÃÊœ »«·›⁄· ›Ì «·„”«—. Â·  —Ìœ «” »œ«·Âø",
                "dropFilesHere": "ﬁ„ »”Õ» «·„·› Â‰« ·—›⁄Â",
                "search": "»ÕÀ"
            });
    }

    /* FileManager messages */

    if (kendo.ui.FileManager) {
        kendo.ui.FileManager.prototype.options.messages =
            $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
                toolbar: {
                    createFolder: "„Ã·œ ÃœÌœ",
                    upload: "—›⁄",
                    sortDirection: " — Ì»",
                    sortDirectionAsc: " — Ì»  ’«⁄œÌ",
                    sortDirectionDesc: " — Ì»  ‰«“·Ì",
                    sortField: " — Ì» »Ê«”ÿ…",
                    nameField: "«·«”„",
                    sizeField: "ÕÃ„ «·„·›",
                    typeField: "«·‰Ê⁄",
                    dateModifiedField: " «—ÌŒ «· ⁄œÌ·",
                    dateCreatedField: " «—ÌŒ «·≈‰‘«¡",
                    listView: "⁄—÷ «·ﬁ«∆„…",
                    gridView: "⁄—÷ ‘»ﬂÌ",
                    search: "»ÕÀ",
                    details: "⁄—÷ «· ›«’Ì·",
                    detailsChecked: "„Õœœ",
                    detailsUnchecked: "€Ì— „Õœœ",
                    "delete": "Õ–›",
                    rename: "≈⁄«œ… «· ”„Ì…"
                },
                views: {
                    nameField: "«·«”„",
                    sizeField: "ÕÃ„ «·„·›",
                    typeField: "«·‰Ê⁄",
                    dateModifiedField: " «—ÌŒ «· ⁄œÌ·",
                    dateCreatedField: " «—ÌŒ «·≈‰‘«¡",
                    items: "«·⁄‰«’—"
                },
                dialogs: {
                    upload: {
                        title: "—›⁄ «·„·›« ",
                        clear: "≈“«·… «·ﬁ«∆„…",
                        done: " „"
                    },
                    moveConfirm: {
                        title: " √ﬂÌœ «·‰”Œ √Ê «·‰ﬁ·",
                        content: "<p style='text-align: center;'>Â· √‰  „ √ﬂœ „‰ ≈ „«„ «·‰”Œ √Ê «·Õ–›ø</p>",
                        okText: "‰”Œ",
                        cancel: "‰ﬁ·",
                        close: "≈€·«ﬁ"
                    },
                    deleteConfirm: {
                        title: " √ﬂÌœ «·Õ–›",
                        content: "<p style='text-align: center;'>Â· √‰  „ √ﬂœ „‰ Õ–› «·„·›«  «·„Õœœ…ø?</br>·« Ì„ﬂ‰ﬂ «· —«Ã⁄ ⁄‰ Â–« «·≈Ã—«¡.</p>",
                        okText: "Õ–›",
                        cancel: "≈·€«¡",
                        close: "≈€·«ﬁ"
                    },
                    renamePrompt: {
                        title: "≈⁄«œ… «· ”„Ì…",
                        content: "<p style='text-align: center;'>√œŒ· «”„ „·› ÃœÌœ</p>",
                        okText: "≈⁄«œ… «· ”„Ì…",
                        cancel: "≈·€«¡",
                        close: "≈€·«ﬁ"
                    }
                },
                previewPane: {
                    noFileSelected: "·„ Ì „ «Œ Ì«— √Ì „·›",
                    extension: "«·‰Ê⁄",
                    size: "«·ÕÃ„",
                    created: " «—ÌŒ «·≈‰‘«¡",
                    createdUtc: " «—ÌŒ «·≈‰‘«¡ (UTC)",
                    modified: " «—ÌŒ «· ⁄œÌ·",
                    modifiedUtc: " «—ÌŒ «· ⁄œÌ· (UTC)",
                    items: "«·⁄‰«’—"
                }
            });
    }

    /* FilterCell messages */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.messages =
            $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
                "isTrue": "’ÕÌÕ",
                "isFalse": "Œÿ√",
                "filter": "›—“",
                "clear": "≈“«·…",
                "operator": "⁄«„·"
            });
    }

    /* FilterCell operators */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.operators =
            $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
                "string": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "startswith": "Ì»œ√ »‹",
                    "contains": "Ì ÷„‰",
                    "doesnotcontain": "·« Ì ÷„‰",
                    "endswith": "Ì‰ ÂÌ »‹",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…",
                    "isempty": "›«—€",
                    "isnotempty": "·Ì” ›«—€«",
                    "isnullorempty": "·Ì” ·Â ﬁÌ„…",
                    "isnotnullorempty": "·Â ﬁÌ„…"
                },
                "number": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "gte": "√ﬂ»— „‰ √Ê Ì”«ÊÌ",
                    "gt": "√ﬂ»— „‰",
                    "lte": "√ﬁ· „‰ √Ê Ì”«ÊÌ",
                    "lt": "√ﬁ· „‰",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                },
                "date": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "gte": "»⁄œ √Ê Ì”«ÊÌ",
                    "gt": "»⁄œ",
                    "lte": "ﬁ»· √Ê Ì”«ÊÌ",
                    "lt": "ﬁ»·",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                },
                "enums": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                }
            });
    }

    /* FilterMenu messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
                "info": "≈ŸÂ«— «·⁄‰«’— –«  «·ﬁÌ„… «· Ì:",
                "title": "≈ŸÂ«— «·⁄‰«’— –«  «·ﬁÌ„… «· Ì",
                "isTrue": "’ÕÌÕ",
                "isFalse": "Œÿ√",
                "filter": "›—“",
                "clear": "≈“«·…",
                "and": "Ê",
                "or": "√Ê",
                "selectValue": "-«Œ — «·ﬁÌ„…-",
                "operator": "⁄«„·",
                "value": "ﬁÌ„…",
                "cancel": "≈·€«¡",
                "done": " „",
                "into": "›Ì",
                "buttonTitle": "{0} ›—“ ≈⁄œ«œ«  «·⁄„Êœ"
            });
    }

    /* FilterMenu operator messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.operators =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
                "string": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "startswith": "Ì»œ√ »‹",
                    "contains": "Ì ÷„‰",
                    "doesnotcontain": "·« Ì ÷„‰",
                    "endswith": "Ì‰ ÂÌ »",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…",
                    "isempty": "›«—€",
                    "isnotempty": "·Ì” ›«—€«",
                    "isnullorempty": "·Ì” ·Â ﬁÌ„…",
                    "isnotnullorempty": "·Â ﬁÌ„…"
                },
                "number": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "gte": "√ﬂ»— „‰ √Ê Ì”«ÊÌ",
                    "gt": "√ﬂ»— „‰",
                    "lte": "√ﬁ· „‰ √Ê Ì”«ÊÌ",
                    "lt": "√ﬁ· „‰",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                },
                "date": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "gte": "»⁄œ √Ê Ì”«ÊÌ",
                    "gt": "»⁄œ",
                    "lte": "»⁄œ √Ê Ì”«ÊÌ",
                    "lt": "»⁄œ",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                },
                "enums": {
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ",
                    "isnull": "»·« ﬁÌ„…",
                    "isnotnull": "·Â ﬁÌ„…"
                }
            });
    }

    /* FilterMultiCheck messages */

    if (kendo.ui.FilterMultiCheck) {
        kendo.ui.FilterMultiCheck.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                "checkAll": "«Œ — «·ﬂ·",
                "clearAll": "≈“«·… «·ﬂ·",
                "clear": "≈“«·…",
                "filter": "›—“",
                "search": "»ÕÀ",
                "cancel": "≈·€«¡",
                "selectedItemsFormat": "{0} «·⁄‰«’— «·„Õœ¯œ…",
                "done": " „",
                "into": "›Ì"
            });
    }

    /* Gantt messages */

    if (kendo.ui.Gantt) {
        kendo.ui.Gantt.prototype.options.messages =
            $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
                "actions": {
                    "addChild": "√÷› „Œÿ¯ÿ ›—⁄Ì",
                    "append": "≈÷«›… „Â„…",
                    "insertAfter": "√÷› ≈·Ì «·√”›·",
                    "insertBefore": "√÷› ≈·Ï «·√⁄·Ï",
                    "pdf": "PDF  ’œÌ— ≈·Ï „·›"
                },
                "cancel": "≈·€«¡",
                "deleteDependencyWindowTitle": "Õ–› «·⁄·«ﬁ… «·«⁄ „«œÌ…",
                "deleteTaskWindowTitle": "Õ–› «·„Â„…",
                "destroy": "Õ–›",
                "editor": {
                    "assingButton": " ⁄ÌÌ‰",
                    "editorTitle": "„Â„…",
                    "end": "‰Â«Ì…",
                    "percentComplete": "«ﬂ „«·",
                    "plannedStart": "«·»œ«Ì… «·„Œÿÿ ·Â«",
                    "plannedEnd": "«·‰Â«Ì… «·„Œÿÿ ·Â«",
                    "resources": "„Ê«—œ",
                    "resourcesEditorTitle": "„Ê«—œ",
                    "resourcesHeader": "„Ê«—œ",
                    "start": "»œ«Ì…",
                    "title": "⁄‰Ê«‰",
                    "unitsHeader": "«·ÊÕœ« "
                },
                "plannedTasks": {
                    "switchText": "«·„Â«„ «·„Œÿÿ ·Â«",
                    "offsetTooltipAdvanced": "Ê’· ≈·Ï «·„Ê⁄œ «·‰Â«∆Ì „»ﬂ—«",
                    "offsetTooltipDelay": " √ŒÌ—",
                    "seconds": "ÀÊ«‰Ì",
                    "minutes": "œﬁ«∆ﬁ",
                    "hours": "”«⁄« ",
                    "days": "√Ì«„"
                },
                "save": "Õ›Ÿ",
                "views": {
                    "day": "ÌÊ„",
                    "end": "‰Â«Ì…",
                    "month": "‘Â—",
                    "start": "»œ«Ì…",
                    "week": "√”»Ê⁄",
                    "year": "”‰…"
                }
            });
    }

    /* Grid messages */

    if (kendo.ui.Grid) {
        kendo.ui.Grid.prototype.options.messages =
            $.extend(true, kendo.ui.Grid.prototype.options.messages, {
                "commands": {
                    "cancel": "≈·€«¡ «· €ÌÌ—« ",
                    "canceledit": "≈·€«¡",
                    "create": "≈÷«›… ”Ã· ÃœÌœ",
                    "destroy": "Õ–›",
                    "edit": " ⁄œÌ·",
                    "excel": "Excel  ’œÌ— ≈·Ï",
                    "pdf": " ’œÌ— ≈·Ï PDF",
                    "save": "Õ›Ÿ «· €ÌÌ—« ",
                    "select": "«Œ —",
                    "update": " ÕœÌÀ"
                },
                "editable": {
                    "cancelDelete": "≈·€«¡",
                    "confirmation": "Â· √‰  „ √ﬂœ „‰ Õ–› «·”Ã·ø",
                    "confirmDelete": "Õ–›"
                },
                "noRecords": "·«  ÊÃœ ”Ã·«  „ «Õ….",
                "search": "»ÕÀ...",
                "expandCollapseColumnHeader": "",
                "groupHeader": "ctrl + space ·⁄„· „Ã„Ê⁄… «÷€ÿ",
                "ungroupHeader": "ctrl + space ·≈·€«¡ «·„Ã„Ê⁄… «÷€ÿ"
            });
    }

    /* TaskBoard messages */

    if (kendo.ui.TaskBoard) {
        kendo.ui.TaskBoard.prototype.options.messages =
            $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
                "edit": " ⁄œÌ·",
                "createNewCard": "≈‰‘«¡ »ÿ«ﬁ… ÃœÌœ…",
                "create": "≈‰‘«¡",
                "search": "»ÕÀ",
                "previewCard": "„⁄«Ì‰… «·»ÿ«ﬁ…",
                "addCard": "≈÷«›… »ÿ«ﬁ…",
                "editCard": " ⁄œÌ· «·»ÿ«ﬁ…",
                "deleteCard": "Õ–› «·»ÿ«ﬁ…",
                "addColumn": "≈÷«›… ⁄„Êœ",
                "editColumn": " ⁄œÌ· «·⁄„Êœ",
                "deleteColumn": "Õ–› «·⁄„Êœ",
                "close": "≈€·«ﬁ",
                "cancel": "≈·€«¡",
                "delete": "Õ–›",
                "saveChanges": "Õ›Ÿ «· €ÌÌ—« ",
                "title": "«·⁄‰Ê«‰:",
                "description": "«·Ê’›:",
                "newColumn": "⁄„Êœ ÃœÌœ",
                "deleteColumnConfirm": "Â· √‰  „ √ﬂœ „‰ Õ–› Â–« «·⁄„Êœø",
                "deleteCardConfirm": "Â· √‰  „ √ﬂœ „‰ Õ–› «·»ÿ«ﬁ…ø"
            });
    }

    /* TreeList messages */

    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
            $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                "noRows": "·«  ÊÃœ ”Ã·«  ·⁄—÷Â«",
                "loading": "Ã«— «· Õ„Ì·...",
                "requestFailed": "›‘· «·ÿ·».",
                "retry": "√⁄œ «·„Õ«Ê·…",
                "commands": {
                    "edit": " ⁄œÌ·",
                    "update": " ÕœÌÀ",
                    "canceledit": "≈·€«¡",
                    "create": "≈÷«›… ”Ã· ÃœÌœ",
                    "createchild": "≈÷«›… ”Ã· ›—⁄Ì",
                    "destroy": "Õ–›",
                    "excel": "Excel  ’œÌ— ≈·Ï",
                    "pdf": "PDF  ’œÌ— ≈·Ï"
                }
            });
    }

    /* Groupable messages */

    if (kendo.ui.Groupable) {
        kendo.ui.Groupable.prototype.options.messages =
            $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
                "empty": "«”Õ» —√” «·⁄„Êœ Ê√œ—ÃÂ Â‰« ·· Ã„Ì⁄ »Ê«”ÿ… Â–« «·⁄„Êœ"
            });
    }

    /* NumericTextBox messages */

    if (kendo.ui.NumericTextBox) {
        kendo.ui.NumericTextBox.prototype.options =
            $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
                "upArrowText": "“Ì«œ… «·ﬁÌ„…",
                "downArrowText": " ﬁ·Ì· «·ﬁÌ„…"
            });
    }

    /* MediaPlayer messages */

    if (kendo.ui.MediaPlayer) {
        kendo.ui.MediaPlayer.prototype.options.messages =
            $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                "pause": "≈Ìﬁ«› „ƒﬁ ",
                "play": " ‘€Ì·",
                "mute": "ﬂ „ «·’Ê ",
                "unmute": "≈·€«¡ ﬂ „ «·’Ê ",
                "quality": "«·ÃÊœ…",
                "fullscreen": " ﬂ»Ì— «·‘«‘…"
            });
    }

    /* Pager messages */

    if (kendo.ui.Pager) {
        kendo.ui.Pager.prototype.options.messages =
            $.extend(true, kendo.ui.Pager.prototype.options.messages, {
                "allPages": "«·ﬂ·",
                "display": "{0} - {1} „‰ {2} ⁄‰«’—",
                "empty": "·«  ÊÃœ ⁄‰«’— ·⁄—÷Â«",
                "page": "’›Õ…",
                "pageButtonLabel": "’›Õ… {0}",
                "pageSizeDropDownLabel": "ﬁ«∆„… ⁄œœ ⁄‰«’— «·’›Õ…",
                "of": "„‰ {0}",
                "itemsPerPage": "⁄‰«’— ﬂ· ’›Õ…",
                "first": "≈–Â» ≈·Ï «·’›Õ… «·√Ê·Ï",
                "previous": "≈–Â» ≈·Ï «·’›Õ… «·”«»ﬁ…",
                "next": "≈–Â» ≈·Ï «·’›Õ… «· «·Ì…",
                "last": "«–Â» ≈·Ï «·’›Õ… «·√ŒÌ—…",
                "refresh": " ÕœÌÀ",
                "morePages": "«·„“Ìœ „‰ «·’›Õ« "
            });
    }

    /* TreeListPager messages */

    if (kendo.ui.TreeListPager) {
        kendo.ui.TreeListPager.prototype.options.messages =
            $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
                "allPages": "«·ﬂ·",
                "display": "{0} - {1} of {2} «·⁄‰«’—",
                "empty": "·« ÌÊÃœ ⁄‰«’— ·⁄—÷Â«",
                "page": "’›Õ…",
                "of": "„‰ {0}",
                "itemsPerPage": "⁄‰’— ﬂ· ’›Õ…",
                "first": "≈–Â» ≈·Ï ’›Õ… «·√Ê·Ï",
                "previous": "≈–Â» ≈·Ï «·’›Õ… «·”«»ﬁ…",
                "next": "≈–Â» ≈·Ï «·’›Õ… «· «·Ì…",
                "last": "≈–Â» ≈·Ï «·’›Õ… «·√ŒÌ—…",
                "refresh": " ÕœÌÀ",
                "morePages": "«·„“Ìœ „‰ «·’›Õ« "
            });
    }

    /* PivotGrid messages */

    if (kendo.ui.PivotGrid) {
        kendo.ui.PivotGrid.prototype.options.messages =
            $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
                "measureFields": "”Õ» ÕﬁÊ· «·»Ì«‰«  Â‰«",
                "columnFields": "”Õ» ÕﬁÊ· «·⁄„Êœ Â‰«",
                "rowFields": "«”Õ» ÕﬁÊ· «·’›Ê› Â‰«"
            });
    }

    /* PivotFieldMenu messages */

    if (kendo.ui.PivotFieldMenu) {
        kendo.ui.PivotFieldMenu.prototype.options.messages =
            $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
                "info": "≈ŸÂ«— «·⁄‰«’— –«  «·ﬁÌ„… «· Ì:",
                "filterFields": "›—“ «·ÕﬁÊ·",
                "filter": "›—“",
                "include": " ‘ „· «·ÕﬁÊ·...",
                "title": "«·ÕﬁÊ· «· Ì ÌÃ»  ÷„Ì‰Â«",
                "clear": "≈“«·…",
                "ok": "Õ”‰«",
                "cancel": "≈·€«¡",
                "operators": {
                    "contains": "Ì ÷„‰",
                    "doesnotcontain": "·« Ì ÷„‰",
                    "startswith": "Ì»œ√ »",
                    "endswith": "Ì‰ ÂÌ »",
                    "eq": "Ì”«ÊÌ",
                    "neq": "·« Ì”«ÊÌ"
                }
            });
    }

    /* RecurrenceEditor messages */

    if (kendo.ui.RecurrenceEditor) {
        kendo.ui.RecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                "repeat": " ﬂ—«—",
                "recurrenceEditorTitle": "„Õ—— «· ﬂ—«—",
                "frequencies": {
                    "never": "«»œ«",
                    "hourly": "ﬂ· ”«⁄…",
                    "daily": "ÌÊ„Ì«",
                    "weekly": "√”»Ê⁄Ì«",
                    "monthly": "‘Â—Ì«",
                    "yearly": "”‰ÊÌ"
                },
                "hourly": {
                    "repeatEvery": ": ﬂ—«— ﬂ·",
                    "interval": "”«⁄…"
                },
                "daily": {
                    "repeatEvery": " ﬂ—«— ﬂ·:",
                    "interval": "ÌÊ„"
                },
                "weekly": {
                    "interval": "√”»Ê⁄",
                    "repeatEvery": " ﬂ—«— ﬂ·:",
                    "repeatOn": " ﬂ—«— ⁄·Ï:"
                },
                "monthly": {
                    "repeatEvery": " ﬂ—«— ﬂ·:",
                    "repeatOn": " ﬂ—«— ⁄·Ï:",
                    "interval": "‘Â—",
                    "day": "ÌÊ„",
                    "date": " «—ÌŒ"
                },
                "yearly": {
                    "repeatEvery": " ﬂ—«— ﬂ·:",
                    "repeatOn": "ﬂ—— ⁄·Ï:",
                    "interval": "”‰…",
                    "of": "„‰",
                    "month": "‘Â—",
                    "day": "ÌÊ„",
                    "date": " «—ÌŒ"
                },
                "end": {
                    "label": "«·‰Â«Ì…:",
                    "mobileLabel": "Ì‰ ÂÌ",
                    "never": "«»œ«",
                    "after": "»⁄œ",
                    "occurrence": "ÕœÀ (√ÕœÀ)",
                    "on": " ‘€Ì·"
                },
                "offsetPositions": {
                    "first": "«·√Ê·",
                    "second": "«·À«‰Ì",
                    "third": "«·À«·À",
                    "fourth": "«·—«»⁄",
                    "last": "«·√ŒÌ—"
                },
                "weekdays": {
                    "day": "ÌÊ„",
                    "weekday": "ÌÊ„ „‰ √Ì«„ «·√”»Ê⁄",
                    "weekend": "ÌÊ„ ⁄ÿ·… ‰Â«Ì… «·√”»Ê⁄"
                }
            });
    }

    /* MobileRecurrenceEditor messages */

    if (kendo.ui.MobileRecurrenceEditor) {
        kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                "cancel": "≈·€«¡",
                "update": "Õ›Ÿ",
                "endTitle": "≈‰Â«¡ «· ﬂ—«—",
                "repeatTitle": "ﬂ——¯ «·‰„ÿ",
                "headerTitle": " ﬂ—«— «·ÕœÀ",
                "end": {
                    "patterns": {
                        "never": "«»œ«",
                        "after": "»⁄œ...",
                        "on": " ‘€Ì·..."
                    },
                    "never": "«»œ«",
                    "after": "≈‰Â«¡ «· ﬂ—«— »⁄œ",
                    "on": "≈‰Â«¡ «· ﬂ—«— ⁄‰œ"
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
                    "repeatBy": " ﬂ—«— »Ê«”ÿ…:",
                    "dayOfMonth": "ÌÊ„ „‰ «·‘Â—",
                    "dayOfWeek": "ÌÊ„ ›Ì «·√”»Ê⁄",
                    "repeatEvery": " ﬂ—«— ﬂ·",
                    "every": "ﬂ·",
                    "day": "ÌÊ„"
                },
                "yearly": {
                    "interval": "",
                    "repeatBy": ": ﬂ—«— »Ê«”ÿ…",
                    "dayOfMonth": "ÌÊ„ ›Ì «·‘Â—",
                    "dayOfWeek": "ÌÊ„ ›Ì «·√”»Ê⁄",
                    "repeatEvery": ": ﬂ—«— ﬂ·",
                    "every": "ﬂ·",
                    "month": "‘Â—",
                    "day": "ÌÊ„"
                }
            });
    }

    /* Scheduler messages */

    if (kendo.ui.Scheduler) {
        kendo.ui.Scheduler.prototype.options.messages =
            $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
                "allDay": "ÿÊ«· «·ÌÊ„",
                "date": " «—ÌŒ",
                "event": "ÕœÀ",
                "time": "Êﬁ ",
                "showFullDay": "⁄—÷ ﬂ«„· ··ÌÊ„",
                "showWorkDay": "⁄—÷ ”«⁄«  «·⁄„·",
                "today": "«·ÌÊ„",
                "save": "Õ›Ÿ",
                "cancel": "≈·€«¡",
                "destroy": "Õ–›",
                "resetSeries": "≈⁄«œ… ÷»ÿ «·”·”·…",
                "deleteWindowTitle": "Õ–› «·ÕœÀ",
                "ariaSlotLabel": "„Õœœ „‰{0:t} ≈·Ï {1:t}",
                "ariaEventLabel": "{0} ›Ì{1:D} ⁄‰œ {2:t}",
                "editable": {
                    "confirmation": "Â· √‰  „ √ﬂœ „‰ Õ–› «·ÕœÀø"
                },
                "views": {
                    "day": "ÌÊ„",
                    "week": "√”»Ê⁄",
                    "workWeek": "√”»Ê⁄ «·⁄„·",
                    "agenda": "ÃœÊ· «·√⁄„«·",
                    "month": "‘Â—"
                },
                "recurrenceMessages": {
                    "deleteWindowTitle": "Õ–› «·⁄‰’— «·„ ﬂ——",
                    "resetSeriesWindowTitle": "≈⁄«œ… ÷»ÿ «·”·”·…",
                    "deleteWindowOccurrence": "Õ–› «·ÕœÀ «·Õ«·Ì",
                    "deleteWindowSeries": "Õ–› «·”·”·…",
                    "deleteRecurringConfirmation": "Â· √‰  „ √ﬂœ „‰ Õ–› Â–« «·ÕœÀø",
                    "deleteSeriesConfirmation": "Â· √‰  „ √ﬂœ Õ–› «·”·”·… »√ﬂ„·Â«ø",
                    "editWindowTitle": " ⁄œÌ· «·⁄‰’— «·„ ﬂ——",
                    "editWindowOccurrence": " ⁄œÌ· «·ÕœÀ «·Õ«·Ì",
                    "editWindowSeries": " ⁄œÌ· «·”·”·…",
                    "deleteRecurring": "Â·  —Ìœ Õ–› Â–« «·ÕœÀ ›ﬁÿ √„ «·”·”·… »√ﬂ„·Â«ø",
                    "editRecurring": "Â·  —Ìœ  ⁄œÌ· Â–« «·ÕœÀ ›ﬁÿ √„ «·”·”·… »√ﬂ„·Â«ø"
                },
                "editor": {
                    "title": "⁄‰Ê«‰",
                    "start": "»œ¡",
                    "end": "≈‰Â«¡",
                    "allDayEvent": "ÕœÀ «·ÌÊ„ »√ﬂ„·Â",
                    "description": "Ê’›",
                    "repeat": " ﬂ—«—",
                    "timezone": " ",
                    "startTimezone": "»œ¡ ‰Ÿ«„ «· ÊﬁÌ ",
                    "endTimezone": "≈‰Â«¡ ‰Ÿ«„ «· ÊﬁÌ ",
                    "separateTimezones": "«” Œœ«„ „‰«ÿﬁ “„‰Ì… „‰›’·… ··»œ¡ Ê«·«‰ Â«¡",
                    "timezoneEditorTitle": "«·„‰«ÿﬁ «·“„‰Ì…",
                    "timezoneEditorButton": "«·„‰ÿﬁ… «·“„‰Ì…",
                    "timezoneTitle": "«·„‰«ÿﬁ «·“„‰Ì…",
                    "noTimezone": "»·« ‰Ÿ«„  ÊﬁÌ ",
                    "editorTitle": "ÕœÀ"
                },
                "search": "»ÕÀ..."
            });
    }

    /* Spreadsheet messages */

    if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
        kendo.spreadsheet.messages.borderPalette =
            $.extend(true, kendo.spreadsheet.messages.borderPalette, {
                "allBorders": "ﬂ· «·ÃÊ«‰»",
                "insideBorders": "«·ÕœÊœ «·œ«Œ·Ì…",
                "insideHorizontalBorders": "ÕœÊœ √›ﬁÌ… œ«Œ·Ì…",
                "insideVerticalBorders": "ÕœÊœ ⁄„ÊœÌ… œ«Œ·Ì…",
                "outsideBorders": "«·ÕœÊœ «·Œ«—ÃÌ…",
                "leftBorder": "«·Õœ «·√Ì”—",
                "topBorder": "«·Õœ «·⁄·ÊÌ",
                "rightBorder": "«·Õœ «·√Ì„‰",
                "bottomBorder": "«·Õœ «·”›·Ì",
                "noBorders": "»·« ÕœÊœ",
                "reset": "≈⁄«œ…  ⁄ÌÌ‰ «··Ê‰",
                "customColor": "·Ê‰ „Œ’¯’...",
                "apply": " ÿ»Ìﬁ",
                "cancel": "≈·€«¡"
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
        kendo.spreadsheet.messages.dialogs =
            $.extend(true, kendo.spreadsheet.messages.dialogs, {
                "apply": " ÿ»Ìﬁ",
                "save": "Õ›Ÿ",
                "cancel": "≈·€«¡",
                "remove": "Õ–›",
                "retry": "√⁄œ «·„Õ«Ê·…",
                "revert": " —«Ã⁄",
                "okText": "Õ”‰«",
                "formatCellsDialog": {
                    "title": "’Ì€…",
                    "categories": {
                        "number": "—ﬁ„",
                        "currency": "⁄„·…",
                        "date": " «—ÌŒ"
                    }
                },
                "fontFamilyDialog": {
                    "title": "«·Œÿ"
                },
                "fontSizeDialog": {
                    "title": "ÕÃ„ «·Œÿ"
                },
                "bordersDialog": {
                    "title": "ÕœÊœ"
                },
                "alignmentDialog": {
                    "title": "«·„Õ«–«…",
                    "buttons": {
                        "justtifyLeft": "„Õ«–«… ≈·Ï «·Ì”«—",
                        "justifyCenter": "Ê”ÿ",
                        "justifyRight": "„Õ«–«… ≈·Ì «·Ì„Ì‰",
                        "justifyFull": "÷»ÿ",
                        "alignTop": "„Õ«–«… ≈·Ì «·√⁄·Ì",
                        "alignMiddle": "„Õ«–«… ≈·Ì «·„‰ ’›",
                        "alignBottom": "„Õ«–«… ≈·Ì «·√”›·"
                    }
                },
                "mergeDialog": {
                    "title": "œ„Ã «·Œ·«Ì«",
                    "buttons": {
                        "mergeCells": "œ„Ã «·ﬂ·",
                        "mergeHorizontally": "œ„Ã √›ﬁÌ«",
                        "mergeVertically": "œ„Ã —√”Ì«",
                        "unmerge": "›ﬂ «·œ„Ã"
                    }
                },
                "freezeDialog": {
                    "title": " Ã„Ìœ «·√Ã“«¡",
                    "buttons": {
                        "freezePanes": " Ã„Ìœ «·√Ã“«¡",
                        "freezeRows": " Ã„Ìœ «·’›Ê›",
                        "freezeColumns": " Ã„Ìœ «·√⁄„œ…",
                        "unfreeze": "≈·€«¡  Ã„Ìœ «·√Ã“«¡"
                    }
                },
                "confirmationDialog": {
                    "text": "Â· √‰  „ √ﬂœ „‰ ≈“«·… Â–Â «·Ê—ﬁ…ø",
                    "title": "≈“«·… Ê—ﬁ…"
                },
                "validationDialog": {
                    "title": " √ﬂÌœ ’Õ… «·»Ì«‰« ",
                    "hintMessage": "«·—Ã«¡ ≈œŒ«· ﬁÌ„… ’«·Õ… {0} ·ﬁÌ„… {1}.",
                    "hintTitle": "«· Õﬁﬁ {0}",
                    "criteria": {
                        "any": "«Ì ﬁÌ„…",
                        "number": "—ﬁ„",
                        "text": "‰’",
                        "date": " «—ÌŒ",
                        "custom": "’Ì€… „Œ’’…",
                        "list": "ﬁ«∆„…"
                    },
                    "comparers": {
                        "greaterThan": "√ﬂÀ— „‰",
                        "lessThan": "√ﬁ· „‰",
                        "between": "»Ì‰",
                        "notBetween": "·Ì” »Ì‰",
                        "equalTo": "Ì”«ÊÌ",
                        "notEqualTo": "·« Ì”«ÊÌ",
                        "greaterThanOrEqualTo": "√ﬂ»— „‰ √Ê Ì”«ÊÌ",
                        "lessThanOrEqualTo": "«ﬁ· „‰ «Ê Ì”«ÊÌ"
                    },
                    "comparerMessages": {
                        "greaterThan": "√ﬂ»— „‰ {0}",
                        "lessThan": "√ﬁ· „‰ {0}",
                        "between": "»Ì‰ {0} Ê {1}",
                        "notBetween": "·Ì” »Ì‰ {0} Ê {1}",
                        "equalTo": "Ì”«ÊÌ {0}",
                        "notEqualTo": "·« Ì”«ÊÌ {0}",
                        "greaterThanOrEqualTo": "√ﬂ»— „‰ √Ê Ì”«ÊÌ {0}",
                        "lessThanOrEqualTo": "√’€— „‰ √Ê Ì”«ÊÌ {0}",
                        "custom": "«· Ì   Ê«›ﬁ „⁄ «·’Ì€…: {0}"
                    },
                    "labels": {
                        "criteria": "«·„⁄«ÌÌ— «·⁄«„…",
                        "comparer": "«·„ﬁ«—‰…",
                        "min": "Õœ √œ‰Ï",
                        "max": "Õœ √ﬁ’Ï",
                        "value": "ﬁÌ„…",
                        "start": "»œ¡",
                        "end": "≈‰Â«¡",
                        "onInvalidData": "⁄·Ï »Ì«‰«  €Ì— ’«·Õ…",
                        "rejectInput": "—›÷ «·≈œŒ«·",
                        "showWarning": "≈ŸÂ«— «· Õ–Ì—",
                        "showHint": "«ŸÂ«— «· ·„ÌÕ",
                        "hintTitle": "⁄‰Ê«‰ «· ·„ÌÕ",
                        "hintMessage": "—”«·…  ·„ÌÕ",
                        "ignoreBlank": " Ã«Â· «·›—«€"
                    },
                    "placeholders": {
                        "typeTitle": "«ﬂ » «·⁄‰Ê«‰",
                        "typeMessage": "«ﬂ » «·—”«·…"
                    }
                },
                "exportAsDialog": {
                    "title": " ’œÌ—...",
                    "labels": {
                        "fileName": "«”„ «·„·›",
                        "saveAsType": "Õ›Ÿ ﬂ‰Ê⁄",
                        "exportArea": " ’œÌ—",
                        "paperSize": "ÕÃ„ «·Ê—ﬁ",
                        "margins": "«·ÂÊ«„‘",
                        "orientation": " ÊÃÌÂ",
                        "print": "ÿ»«⁄…",
                        "guidelines": "«·ﬁÊ«⁄œ «·«—‘«œÌ…",
                        "center": "Ê”ÿ",
                        "horizontally": "√›ﬁÌ«",
                        "vertically": "⁄„ÊœÌ«"
                    }
                },
                "modifyMergedDialog": {
                    "errorMessage": "·« Ì„ﬂ‰  €ÌÌ— Ã“¡ „‰ «·Œ·Ì… «·„œ„Ã…."
                },
                "useKeyboardDialog": {
                    "title": "«·‰”Œ Ê«··’ﬁ",
                    "errorMessage": "·« Ì„ﬂ‰ «” œ⁄«¡ Â–Â «·≈Ã—«¡«  „‰ Œ·«· «·ﬁ«∆„…. «·—Ã«¡ »œ·« „‰ –·ﬂ «” Œœ«„ «Œ ’«—«  ·ÊÕ… «·„›« ÌÕ:",
                    "labels": {
                        "forCopy": "··‰”Œ",
                        "forCut": "··ﬁ’",
                        "forPaste": "··’ﬁ"
                    }
                },
                "unsupportedSelectionDialog": {
                    "errorMessage": "·« Ì„ﬂ‰  ‰›Ì– Â–« «·≈Ã—«¡ ⁄·Ï ≈Œ Ì«— „‰ „ ⁄œœ."
                },
                "insertCommentDialog": {
                    "title": "≈÷«›…  ⁄·Ìﬁ",
                    "labels": {
                        "comment": " ⁄·Ìﬁ",
                        "removeComment": "Õ–›  ⁄·Ìﬁ"
                    }
                },
                "insertImageDialog": {
                    "title": "≈÷«›… ’Ê—…",
                    "info": "«”Õ» ’Ê—… Â‰«° √Ê «‰ﬁ— ··«Œ Ì«—",
                    "typeError": "«·—Ã«¡  ÕœÌœ ’Ê—… » ‰”Ìﬁ JPEG √Ê PNG √Ê GIF"
                }
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
        kendo.spreadsheet.messages.filterMenu =
            $.extend(true, kendo.spreadsheet.messages.filterMenu, {
                "sortAscending": "‰ÿ«ﬁ «· — Ì» „‰ √ ≈·Ï Ì",
                "sortDescending": "‰ÿ«ﬁ «· — Ì» „‰ Ì ≈·Ï √",
                "filterByValue": "›—“ Õ”» «·ﬁÌ„…",
                "filterByCondition": "›—“ Õ”» «·‘—ÿ",
                "apply": " ÿ»Ìﬁ",
                "search": "»ÕÀ",
                "addToCurrent": "√÷› ≈·Ï «·≈Œ Ì«— «·Õ«·Ì",
                "clear": "„”Õ",
                "blanks": "(›—«€« )",
                "operatorNone": "·« ‘Ì¡",
                "and": "Ê",
                "or": "√Ê",
                "operators": {
                    "string": {
                        "contains": "ÌÕ ÊÌ «·‰’ ⁄·Ï",
                        "doesnotcontain": "·« ÌÕ ÊÌ «·‰’ ⁄·Ï",
                        "startswith": "Ì»œ√ «·‰’ »‹",
                        "endswith": "Ì‰ ÂÌ «·‰’ »‹"
                    },
                    "date": {
                        "eq": "«· «—ÌŒ ÂÊ",
                        "neq": "«· «—ÌŒ ·Ì”",
                        "lt": "«· «—ÌŒ ﬁ»·",
                        "gt": "«· «—ÌŒ »⁄œ"
                    },
                    "number": {
                        "eq": "Ì”«ÊÌ",
                        "neq": "·« Ì”«ÊÌ",
                        "gte": "√ﬂ»— „‰ √Ê Ì”«ÊÌ",
                        "gt": "√ﬂ»— „‰",
                        "lte": "√’€— „‰ √Ê Ì”«ÊÌ",
                        "lt": "«ﬁ· „‰"
                    }
                }
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
        kendo.spreadsheet.messages.colorPicker =
            $.extend(true, kendo.spreadsheet.messages.colorPicker, {
                "reset": "≈⁄«œ…  ⁄ÌÌ‰ «··Ê‰",
                "customColor": "·Ê‰ „Œ’¯’...",
                "apply": " ÿ»Ìﬁ",
                "cancel": "≈·€«¡"
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
        kendo.spreadsheet.messages.toolbar =
            $.extend(true, kendo.spreadsheet.messages.toolbar, {
                "addColumnLeft": "√÷› ⁄„Êœ ≈·Ï «·Ì”«—",
                "addColumnRight": "√÷› ⁄„Êœ ≈·Ï «·Ì„Ì‰",
                "addRowAbove": "√÷› ’› ≈·Ì «·√⁄·Ì",
                "addRowBelow": "√÷› ’› ≈·Ì «·√”›·",
                "alignment": "„Õ«–«…",
                "alignmentButtons": {
                    "justtifyLeft": "„Õ«–«… ≈·Ì «·Ì”«—",
                    "justifyCenter": "Ê”ÿ",
                    "justifyRight": "„Õ«–«… ≈·Ì «·Ì„Ì‰",
                    "justifyFull": "÷»ÿ",
                    "alignTop": "„Õ«–«… ≈·Ì «·√⁄·Ì",
                    "alignMiddle": "„Õ«–«… ≈·Ì «·„‰ ’›",
                    "alignBottom": "„Õ«–«… ·√”›·"
                },
                "backgroundColor": "Œ·›Ì…",
                "bold": "”„Ìﬂ",
                "borders": "ÕœÊœ",
                "colorPicker": {
                    "reset": "≈⁄«œ…  ⁄ÌÌ‰ «··Ê‰",
                    "customColor": "·Ê‰ „Œ’’..."
                },
                "copy": "‰”Œ",
                "cut": "ﬁ’",
                "deleteColumn": "Õ–› ⁄„Êœ",
                "deleteRow": "Õ–› ’›",
                "excelImport": "«” Ì—«œ „‰ Excel...",
                "filter": "›· —",
                "fontFamily": "«·Œÿ",
                "fontSize": "ÕÃ„ «·Œÿ",
                "format": " ‰”Ìﬁ „Œ’’...",
                "formatTypes": {
                    "automatic": "√Ê Ê„« ÌﬂÌ",
                    "number": "—ﬁ„",
                    "percent": "‰”»Â „∆ÊÌÂ",
                    "financial": "„«·Ì",
                    "currency": "⁄„·…",
                    "date": " «—ÌŒ",
                    "time": "«·Êﬁ ",
                    "dateTime": "Êﬁ  «· «—ÌŒ",
                    "duration": "„œ…",
                    "moreFormats": "«·„“Ìœ „‰ «· ‰”Ìﬁ« ..."
                },
                "formatDecreaseDecimal": "≈‰ﬁ«’ «·⁄·«„… «·⁄‘—Ì…",
                "formatIncreaseDecimal": "“Ì«œ… «·⁄·«„… «·⁄‘—Ì…",
                "freeze": " Ã„Ìœ «·√Ã“«¡",
                "freezeButtons": {
                    "freezePanes": " Ã„Ìœ «·√Ã“«¡",
                    "freezeRows": " Ã„Ìœ «·’›Ê›",
                    "freezeColumns": " Ã„Ìœ «·√⁄„œ…",
                    "unfreeze": "≈·€«¡  Ã„Ìœ «·√Ã“«¡"
                },
                "insertComment": "≈÷«›…  ⁄·Ìﬁ",
                "insertImage": "≈÷«›… ’Ê—…",
                "italic": "„«∆·",
                "merge": "œ„Ã «·Œ·«Ì«",
                "mergeButtons": {
                    "mergeCells": "œ„Ã «·ﬂ·",
                    "mergeHorizontally": "œ„Ã √›ﬁÌ",
                    "mergeVertically": "œ„Ã —√”Ì",
                    "unmerge": "≈·€«¡ «·œ„Ã"
                },
                "open": "› Õ...",
                "paste": "·’ﬁ",
                "quickAccess": {
                    "redo": "≈⁄«œ…",
                    "undo": " —«Ã⁄"
                },
                "saveAs": "Õ›Ÿ »«”„...",
                "sortAsc": " — Ì»  ’«⁄œÌ",
                "sortDesc": " — Ì»  ‰«“·Ì",
                "sortButtons": {
                    "sortSheetAsc": "›—“ «·’›Õ… „‰ √ ≈·Ï Ì",
                    "sortSheetDesc": "›—“ «·’›Õ… „‰ Ì ≈·Ï √",
                    "sortRangeAsc": "›—“ „‰ √ ≈·Ï Ì",
                    "sortRangeDesc": "›—“ „‰ Ì ≈·Ï √"
                },
                "textColor": "·Ê‰ «·‰’",
                "textWrap": "œÊ—«‰ «·‰’",
                "underline": "Œÿ √”›· «·‰’",
                "validation": "«· Õﬁﬁ „‰ ’Õ… «·»Ì«‰« .."
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
        kendo.spreadsheet.messages.view =
            $.extend(true, kendo.spreadsheet.messages.view, {
                "errors": {
                    "shiftingNonblankCells": "·« Ì„ﬂ‰ﬂ ≈œ—«Ã «·Œ·«Ì« ·«Õ „«· ›ﬁœ «·»Ì«‰« . ﬁ„ » ÕœÌœ „ﬂ«‰ ¬Œ— √Ê Õ–› «·»Ì«‰«  „‰ ‰Â«Ì… Ê—ﬁ… «·⁄„·.",
                    "filterRangeContainingMerges": "·« Ì„ﬂ‰ ≈‰‘«¡ ›· — œ«Œ· Œ·«Ì« „œ„Ã…",
                    "validationError": "«·ﬁÌ„… «· Ì «œŒ· Â«  Œ«·› «·ﬁÊ«⁄œ «· Ì ›Ì «·Œ·Ì…."
                },
                "tabs": {
                    "home": "«·’›Õ… «·—∆Ì”Ì…",
                    "insert": "≈œ—«Ã",
                    "data": "«·»Ì«‰« "
                }
            });
    }

    /* Slider messages */

    if (kendo.ui.Slider) {
        kendo.ui.Slider.prototype.options =
            $.extend(true, kendo.ui.Slider.prototype.options, {
                "increaseButtonTitle": "“Ì«œ…",
                "decreaseButtonTitle": "«‰Œ›«÷"
            });
    }

    /* ListBox messaages */

    if (kendo.ui.ListBox) {
        kendo.ui.ListBox.prototype.options.messages =
            $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
                "tools": {
                    "remove": "Õ–›",
                    "moveUp": "«‰ ﬁ· ··√⁄·Ï",
                    "moveDown": "«‰ ﬁ· ·√”›·",
                    "transferTo": "‰ﬁ· ≈·Ï",
                    "transferFrom": "‰ﬁ· „‰",
                    "transferAllTo": "‰ﬁ· «·ﬂ· ≈·Ï",
                    "transferAllFrom": "‰ﬁ· «·ﬂ· „‰"
                }
            });
    }

    /* TreeList messages */

    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
            $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                "noRows": "·«  ÊÃœ ”Ã·«  ·⁄—÷Â«",
                "loading": "Ã«— «· Õ„Ì·...",
                "requestFailed": "›‘· «·ÿ·».",
                "retry": "√⁄œ «·„Õ«Ê·…",
                "commands": {
                    "edit": " ⁄œÌ·",
                    "update": " ÕœÌÀ",
                    "canceledit": "≈·€«¡",
                    "create": "≈÷«›… ”Ã· ÃœÌœ",
                    "createchild": "≈÷«›… ”Ã· ›—⁄Ì",
                    "destroy": "Õ–›",
                    "excel": "Excel  ’œÌ— ≈·Ï",
                    "pdf": "PDF  ’œÌ— ≈·Ï"
                }
            });
    }

    /* TreeView messages */

    if (kendo.ui.TreeView) {
        kendo.ui.TreeView.prototype.options.messages =
            $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
                "loading": "Ã«— «· Õ„Ì·...",
                "requestFailed": "›‘· «·ÿ·».",
                "retry": "√⁄œ «·„Õ«Ê·…"
            });
    }

    /* Upload messages */

    if (kendo.ui.Upload) {
        kendo.ui.Upload.prototype.options.localization =
            $.extend(true, kendo.ui.Upload.prototype.options.localization, {
                "select": " ÕœÌœ «·„·›« ...",
                "cancel": "≈·€«¡",
                "retry": "√⁄œ «·„Õ«Ê·…",
                "remove": "≈“«·…",
                "clearSelectedFiles": "≈“«·…",
                "uploadSelectedFiles": "—›⁄ „·›« ",
                "dropFilesHere": "ﬁ„ »”Õ» «·„·› Â‰« ·—›⁄Â",
                "statusUploading": "Ã«— «·—›⁄",
                "statusUploaded": " „ «·—›⁄",
                "statusWarning": " Õ–Ì—",
                "statusFailed": "›‘·",
                "headerStatusPaused": "«Ìﬁ«›",
                "headerStatusUploading": "Ã«— «·—›⁄...",
                "headerStatusUploaded": " „",
                "uploadSuccess": "( „ —›⁄ «·„·› («·„·›« .",
                "uploadFail": "(›‘· —›⁄ «·„·› («·„·›« .",
                "invalidMaxFileSize": "ÕÃ„ «·„·› ﬂ»Ì— Ãœ«.",
                "invalidMinFileSize": "ÕÃ„ «·„·› ’€Ì— Ãœ«.",
                "invalidFileExtension": "‰Ê⁄ «·„·› €Ì— „”„ÊÕ »Â."
            });
    }

    /* Validator messages */

    if (kendo.ui.Validator) {
        kendo.ui.Validator.prototype.options.messages =
            $.extend(true, kendo.ui.Validator.prototype.options.messages, {
                "required": "{0} „ÿ·Ê»",
                "pattern": "{0} €Ì— ’«·Õ",
                "min": "{0} ÌÃ» √‰  ﬂÊ‰ √ﬂ»— „‰ √Ê  ”«ÊÌ {1}",
                "max": "{0} ÌÃ» √‰  ﬂÊ‰ √’€— „‰ √Ê  ”«ÊÌ {1}",
                "step": "{0} €Ì— ’«·Õ",
                "email": "{0} »—Ìœ ≈·ﬂ —Ê‰Ì €Ì— ’«·Õ",
                "url": "{0} —«»ÿ €Ì— ’«·Õ",
                "date": "{0}  «—ÌŒ €Ì— ’«·Õ",
                "dateCompare": "ÌÃ» √‰ ÌﬂÊ‰  «—ÌŒ «·«‰ Â«¡ √ﬂ»— „‰ √Ê Ì”«ÊÌ  «—ÌŒ «·»œ¡"
            });
    }

    /* kendo.ui.progress method */
    if (kendo.ui.progress) {
        kendo.ui.progress.messages =
            $.extend(true, kendo.ui.progress.messages, {
                "loading": "Ã«—Ì «· Õ„Ì·..."
            });
    }

    /* Dialog */

    if (kendo.ui.Dialog) {
        kendo.ui.Dialog.prototype.options.messages =
            $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
                "close": "≈€·«ﬁ"
            });
    }

    /* Calendar */
    if (kendo.ui.Calendar) {
        kendo.ui.Calendar.prototype.options.messages =
            $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
                "weekColumnHeader": ""
            });
    }

    /* Alert */

    if (kendo.ui.Alert) {
        kendo.ui.Alert.prototype.options.messages =
            $.extend(true, kendo.ui.Alert.prototype.options.localization, {
                "okText": "Õ”‰«"
            });
    }

    /* Confirm */

    if (kendo.ui.Confirm) {
        kendo.ui.Confirm.prototype.options.messages =
            $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
                "okText": "Õ”‰«",
                "cancel": "≈·€«¡"
            });
    }

    /* Prompt */
    if (kendo.ui.Prompt) {
        kendo.ui.Prompt.prototype.options.messages =
            $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
                "okText": "Õ”‰«",
                "cancel": "≈·€«¡"
            });
    }

    /* DateInput */
    if (kendo.ui.DateInput) {
        kendo.ui.DateInput.prototype.options.messages =
            $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
                "year": "”‰…",
                "month": "‘Â—",
                "day": "ÌÊ„",
                "weekday": "ÌÊ„ ›Ì «·√”»Ê⁄",
                "hour": "”«⁄« ",
                "minute": "œﬁ«∆ﬁ",
                "second": "ÀÊ«‰Ì",
                "dayperiod": "AM/PM"
            });
    }

    /* List messages */

    if (kendo.ui.List) {
        kendo.ui.List.prototype.options.messages =
            $.extend(true, kendo.ui.List.prototype.options.messages, {
                "clear": "≈“«·…",
                "noData": "·«  ÊÃœ »Ì«‰« ."
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
                "singleTag": "⁄‰’— (⁄‰«’—) „Õœœ…",
                "clear": "≈“«·…",
                "deleteTag": "Õ–›",
                "noData": "·„ Ì „ ≈ÌÃ«œ »Ì«‰« ."
            });
    }

    /* MultiSelect messages */

    if (kendo.ui.MultiSelect) {
        kendo.ui.MultiSelect.prototype.options.messages =
            $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
                "singleTag": "⁄‰’— (⁄‰«’—) „Õœœ…",
                "clear": "≈“«·…",
                "deleteTag": "Õ–›",
                "noData": "·«  ÊÃœ »Ì«‰« ."
            });
    }

    /* Chat messages */

    if (kendo.ui.Chat) {
        kendo.ui.Chat.prototype.options.messages =
            $.extend(true, kendo.ui.Chat.prototype.options.messages, {
                "placeholder": "Ìﬂ » «·¬‰...",
                "toggleButton": " »œÌ· ‘—Ìÿ «·√œÊ« ",
                "sendButton": "√—”· —”«·…"
            });
    }

    /* Wizard messages */

    if (kendo.ui.Wizard) {
        kendo.ui.Wizard.prototype.options.messages =
            $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
                "reset": "≈⁄«œ…  ⁄ÌÌ‰",
                "previous": "«·”«»ﬁ",
                "next": "«· «·Ì",
                "done": " „",
                "step": "ŒÿÊ…",
                "of": "„‰"
            });
    }

    /* PDFViewer messages */

    if (kendo.ui.PDFViewer) {
        kendo.ui.PDFViewer.prototype.options.messages =
            $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
                defaultFileName: "„” ‰œ",
                toolbar: {
                    zoom: {
                        "zoomLevel": "„” ÊÏ «· ﬂ»Ì—/«· ’€Ì—",
                        "zoomOut": " ’€Ì—",
                        "zoomIn": " ﬂ»Ì—",
                        "actualWidth": "«·⁄—÷ «·ÕﬁÌﬁÌ",
                        "autoWidth": "÷»ÿ «·⁄—÷  ·ﬁ«∆Ì«",
                        "fitToWidth": "  ·«∆„ „⁄ «·⁄—÷",
                        "fitToPage": " ·«∆„ «·’›Õ…"
                    },
                    "open": "› Õ",
                    "exportAs": " ’œÌ—",
                    "download": " Õ„Ì·",
                    pager: {
                        "first": "≈–Â» ≈·Ï «·’›Õ… «·√Ê·Ï",
                        "previous": "≈–Â» ≈·Ï «·’›Õ… «·”«»ﬁ…",
                        "next": "≈–Â» ≈·Ï «·’›Õ… «· «·Ì…",
                        "last": "≈–Â» ≈·Ï «·’›Õ… «·√ŒÌ—…",
                        "of": "„‰ {0}",
                        "page": "’›Õ…",
                        "pages": "’›Õ« "
                    },
                    "print": "ÿ»«⁄…",
                    "toggleSelection": " „ﬂÌ‰ «· ÕœÌœ",
                    "togglePan": " „ﬂÌ‰ «· Õ—Ìﬂ",
                    "search": "»ÕÀ"
                },
                errorMessages: {
                    "notSupported": "pdf Ì”„Õ ›ﬁÿ »„·›« .",
                    "parseError": "PDF ›‘· ›Ì „⁄«·Ã… „·›.",
                    "notFound": "·„ Ì „ «·⁄ÀÊ— ⁄·Ï «·„·›.",
                    "popupBlocked": " „ ÕŸ— «·‰«›–… «·„‰»Àﬁ…."
                },
                dialogs: {
                    exportAsDialog: {
                        "title": " ’œÌ—...",
                        "defaultFileName": "„” ‰œ",
                        "pdf": "(.pdf)  ‰”Ìﬁ «·„” ‰œ«  »≈„ œ«œ",
                        "png": " ‰”Ìﬁ ‘»ﬂ… «· ’„Ì„«  »≈„ œ«œ (.png)",
                        "svg": " ‰”Ìﬁ «· ’„Ì„«  »≈„ œ«œ (.svg)",
                        "labels": {
                            "fileName": "«”„ «·„·›",
                            "saveAsType": "Õ›Ÿ »«”„",
                            "page": "’›Õ…"
                        }
                    },
                    "okText": "Õ”‰«",
                    "save": "Õ›Ÿ",
                    "cancel": "≈·€«¡",
                    "search": {
                        "inputLabel": "‰’ «·»ÕÀ",
                        "matchCase": "Õ«·… „ ÿ«»ﬁ…",
                        "next": "«· ÿ«»ﬁ «· «·Ì",
                        "previous": "«· ÿ«»ﬁ «·”«»ﬁ",
                        "close": "≈€·«ﬁ",
                        "of": "„‰"
                    }
                }
            });
    }

    /* Captcha messages */

    if (kendo.ui.Captcha) {
        kendo.ui.Captcha.prototype.options.messages =
            $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
                "reset": "≈⁄«œ…  ⁄ÌÌ‰ ﬂ·„… «· Õﬁﬁ",
                "audio": "‰ÿﬁ ﬂ·„… «· Õﬁﬁ",
                "imageAlt": "«ﬂ » ﬂ·„… «· Õﬁﬁ ﬂ„« ›Ì «·’Ê—…",
                "success": " „ «· Õﬁﬁ »‰Ã«Õ"
            });
    }

    /* OrgChart messages */

    if (kendo.ui.OrgChart) {
        kendo.ui.OrgChart.prototype.options.messages =
            $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
                label: "«·ÂÌﬂ· «· ‰ŸÌ„Ì",
                edit: " ⁄œÌ·",
                create: "≈‰‘«¡",
                destroy: "Õ–›",
                destroyContent: "Â· √‰  „ √ﬂœ „‰ Õ–› Â–« «·⁄‰’— Ê«·⁄‰«’— «· «»⁄… ·Âø",
                destroyTitle: "Õ–› ⁄‰’—",
                cancel: "≈·€«¡",
                save: "Õ›Ÿ",
                menuLabel: "ﬁ«∆„… «· ⁄œÌ·",
                uploadAvatar: " Õ„Ì· ’Ê—… ÃœÌœ…",
                parent: "⁄‰’— —∆Ì”Ì",
                name: "«·«”„",
                title: "«·⁄‰Ê«‰",
                none: "--·« ‘Ì¡--",
                expand: "⁄—÷",
                collapse: "ÿÌ"
            });
    }
})(window.kendo.jQuery);