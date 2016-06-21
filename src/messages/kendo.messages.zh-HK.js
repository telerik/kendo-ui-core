(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "確定",
  "cancel": "取消"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "確定",
  "cancel": "取消"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "升序",
  "sortDescending": "降序",
  "filter": "過濾",
  "columns": "列",
  "done": "完成",
  "settings": "列設置",
  "lock": "鎖定",
  "unlock": "解除鎖定"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "粗體",
  "italic": "斜體",
  "underline": "下劃線",
  "strikethrough": "刪除線",
  "superscript": "上標",
  "subscript": "下標",
  "justifyCenter": "居中",
  "justifyLeft": "左對齊",
  "justifyRight": "右對齊",
  "justifyFull": "兩端對齊",
  "insertUnorderedList": "插入無序列表",
  "insertOrderedList": "插入有序列表",
  "indent": "增加縮進",
  "outdent": "減少縮進",
  "createLink": "插入鏈接",
  "unlink": "移除鏈接",
  "insertImage": "插入圖片",
  "insertFile": "插入文件",
  "insertHtml": "插入 HTML",
  "viewHtml": "查看 HTML",
  "fontName": "選擇字體",
  "fontNameInherit": "（繼承的字體）",
  "fontSize": "選擇字號",
  "fontSizeInherit": "（繼承的字號）",
  "formatBlock": "格式化塊",
  "formatting": "格式化",
  "foreColor": "顏色",
  "backColor": "背景色",
  "style": "風格",
  "emptyFolder": "文件夾為空",
  "uploadFile": "上傳",
  "orderBy": "排序條件:",
  "orderBySize": "大小",
  "orderByName": "名字",
  "invalidFileType": "選中的文件 \"{0}\" 非法，支持的文件類型為 {1}。",
  "deleteFile": '您確定要刪除 \"{0}\"?',
  "overwriteFile": '當前文件夾已存在文件名為 \"{0}\" 的文件，您確定要覆蓋麽？',
  "directoryNotFound": "此文件夾未找到",
  "imageWebAddress": "圖片地址",
  "imageAltText": "替代文本",
  "imageWidth": "寬度 (px)",
  "imageHeight": "高度 (px)",
  "fileWebAddress": "文件地址",
  "fileTitle": "標題",
  "linkWebAddress": "鏈接地址",
  "linkText": "鏈接文字",
  "linkToolTip": "鏈接提示",
  "linkOpenInNewWindow": "在新窗口中打開",
  "dialogUpdate": "上傳",
  "dialogInsert": "插入",
  "dialogButtonSeparator": "或",
  "dialogCancel": "取消",
  "createTable": "創建表格",
  "addColumnLeft": "左側添加列",
  "addColumnRight": "右側添加列",
  "addRowAbove": "上方添加行",
  "addRowBelow": "下方添加行",
  "deleteRow": "刪除行",
  "deleteColumn": "刪除列"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "上傳",
  "orderBy": "排序條件",
  "orderByName": "名稱",
  "orderBySize": "大小",
  "directoryNotFound": "此文件夾未找到",
  "emptyFolder": "文件夾為空",
  "deleteFile": '您確定要刪除 \"{0}\"?',
  "invalidFileType": "選中的文件 \"{0}\" 非法，支持的文件類型為 {1}。",
  "overwriteFile": "當前文件夾已存在文件名為 \"{0}\" 的文件，您確定要覆蓋麽？",
  "dropFilesHere": "拖拽要上傳的文件到此處",
  "search": "搜索"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "為真",
  "isFalse": "為假",
  "filter": "過濾",
  "clear": "清除",
  "operator": "運算符"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "顯示符合以下條件的行",
  "isTrue": "為真",
  "isFalse": "為假",
  "filter": "過濾",
  "clear": "清除",
  "and": "並且",
  "or": "或",
  "selectValue": "-選擇-",
  "operator": "運算符",
  "value": "值",
  "cancel": "取消"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "搜索"
});
}

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "等於",
    "neq": "不等於",
    "startswith": "開頭為",
    "contains": "包含",
    "doesnotcontain": "不包含",
    "endswith": "結尾為"
  },
  "number": {
    "eq": "等於",
    "neq": "不等於",
    "gte": "大於等於",
    "gt": "大於",
    "lte": "小於等於",
    "lt": "小於"
  },
  "date": {
    "eq": "等於",
    "neq": "不等於",
    "gte": "大於等於",
    "gt": "大於",
    "lte": "小於等於",
    "lt": "小於"
  },
  "enums": {
    "eq": "等於",
    "neq": "不等於"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "等於",
    "neq": "不等於",
    "startswith": "開頭為",
    "contains": "包含",
    "doesnotcontain": "不包含",
    "endswith": "結尾為"
  },
  "number": {
    "eq": "等於",
    "neq": "不等於",
    "gte": "大於等於",
    "gt": "大於",
    "lte": "小於等於",
    "lt": "小於"
  },
  "date": {
    "eq": "等於",
    "neq": "不等於",
    "gte": "大於等於",
    "gt": "大於",
    "lte": "小於等於",
    "lt": "小於"
  },
  "enums": {
    "eq": "等於",
    "neq": "不等於"
  }
});
}


/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "views": {
    "day": "日",
    "week": "周",
    "month": "月"
  },
  "actions": {
    "append": "添加任務",
    "addChild": "添加子任務",
    "insertBefore": "添加到前面",
    "insertAfter": "添加到後面"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "取消",
    "canceledit": "取消",
    "create": "新增",
    "destroy": "刪除",
    "edit": "編輯",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "保存",
    "select": "選擇",
    "update": "更新"
  },
  "editable": {
    "cancelDelete": "取消",
    "confirmation": "確定要刪除嗎？",
    "confirmDelete": "刪除"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "拖拽列標題到此處按列組合顯示"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "增加",
  "downArrowText": "減少"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "顯示條目 {0} - {1} 共 {2}",
  "empty": "沒有可顯示的記錄。",
  "page": "頁",
  "of": "共 {0}",
  "itemsPerPage": "每頁",
  "first": "首頁",
  "last": "末頁",
  "next": "下一頁",
  "previous": "上一頁",
  "refresh": "刷新",
  "morePages": "更多..."
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "拖放數據字段於此",
  "columnFields": "拖放列字段於此",
  "rowFields": "拖放行字段於此"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "從不",
    "hourly": "每小時",
    "daily": "每天",
    "weekly": "每周",
    "monthly": "每月",
    "yearly": "每年"
  },
  "hourly": {
    "repeatEvery": "重復周期: ",
    "interval": " 小時"
  },
  "daily": {
    "repeatEvery": "重復周期: ",
    "interval": " 天"
  },
  "weekly": {
    "interval": " 周",
    "repeatEvery": "重復周期: ",
    "repeatOn": "重復於:"
  },
  "monthly": {
    "repeatEvery": "重復周期: ",
    "repeatOn": "重復於:",
    "interval": " 月",
    "day": "日期"
  },
  "yearly": {
    "repeatEvery": "重復周期: ",
    "repeatOn": "重復於: ",
    "interval": " 年",
    "of": " 月份: "
  },
  "end": {
    "label": "截止時間:",
    "mobileLabel": "截止時間",
    "never": "從不",
    "after": "重復 ",
    "occurrence": " 次後",
    "on": "止於 "
  },
  "offsetPositions": {
    "first": "第一",
    "second": "第二",
    "third": "第三",
    "fourth": "第四",
    "last": "最後"
  },
  "weekdays": {
    "day": "天",
    "weekday": "工作日",
    "weekend": "周末"
  }
});
}


/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "today": "今天",
  "save": "保存",
  "cancel": "取消",
  "destroy": "刪除",
  "deleteWindowTitle": "刪除事件",
  "ariaSlotLabel": "選擇從 {0:t} 到 {1:t}",
  "ariaEventLabel": "{0} on {1:D} at {2:t}",
  "views": {
    "day": "日",
    "week": "周",
    "workWeek": "工作日",
    "agenda": "日程",
    "month": "月"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "刪除周期條目",
    "deleteWindowOccurrence": "刪除當前事件",
    "deleteWindowSeries": "刪除序列",
    "editWindowTitle": "修改周期條目",
    "editWindowOccurrence": "修改當前事件",
    "editWindowSeries": "修改序列"
  },
  "editor": {
    "title": "標題",
    "start": "起始",
    "end": "終止",
    "allDayEvent": "全天事件",
    "description": "描述",
    "repeat": "重復",
    "timezone": " ",
    "startTimezone": "起始時區",
    "endTimezone": "終止時區",
    "separateTimezones": "使用獨立的起始和終止時區",
    "timezoneEditorTitle": "時區",
    "timezoneEditorButton": "時區",
    "timezoneTitle": "選擇時區",
    "noTimezone": "無",
    "editorTitle": "事件"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "增加",
  "decreaseButtonTitle": "減少"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "加載中...",
  "requestFailed": "加載失敗",
  "retry": "重試"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "選擇...",
  "cancel": "取消",
  "retry": "重試",
  "remove": "移除",
  "uploadSelectedFiles": "上傳文件",
  "dropFilesHere": "拖拽要上傳的文件到此處",
  "statusUploading": "上傳中",
  "statusUploaded": "已上傳",
  "statusWarning": "警告",
  "statusFailed": "失敗",
  "headerStatusUploading": "上傳...",
  "headerStatusUploaded": "完成"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} 為必填項",
  "pattern": "{0} 非法",
  "min": "{0} 應該大於或等於 {1}",
  "max": "{0} 應該小於或等於 {1}",
  "step": "{0} 非法",
  "email": "{0} 不是合法的郵件地址",
  "url": "{0} 不是合法的URL",
  "date": "{0} 不是合法的日期"
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
        $.extend(true, kendo.spreadsheet.messages.borderPalette, {
            "allBorders": "所有邊框",
            "insideBorders": "內邊框",
            "insideHorizontalBorders": "水平內邊框",
            "insideVerticalBorders": "垂直內邊框",
            "outsideBorders": "外邊框",
            "leftBorder": "左邊框",
            "topBorder": "頂邊框",
            "rightBorder": "右邊框",
            "bottomBorder": "底邊框",
            "noBorders": "沒有邊框",
            "reset": "重設顏色",
            "customColor": "自訂顏色...",
            "apply": "生效",
            "cancel": "取消"
        });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
    kendo.spreadsheet.messages.dialogs =
        $.extend(true, kendo.spreadsheet.messages.dialogs, {
            "apply": "生效",
            "save": "儲存",
            "cancel": "取消",
            "remove": "移除",
            "retry": "重試",
            "revert": "還原",
            "okText": "是",
            "formatCellsDialog": {
                "title": "格式",
                "categories": {
                    "number": "數字",
                    "currency": "貨幣",
                    "date": "日期"
                }
            },
            "fontFamilyDialog": {
                "title": "字體"
            },
            "fontSizeDialog": {
                "title": "字體大小"
            },
            "bordersDialog": {
                "title": "邊框"
            },
            "alignmentDialog": {
                "title": "對齊",
                "buttons": {
                    "justtifyLeft": "向左對齊",
                    "justifyCenter": "左右中央對齊",
                    "justifyRight": "向右對齊",
                    "justifyFull": "兩端對齊",
                    "alignTop": "向頂對齊",
                    "alignMiddle": "上下中央對齊",
                    "alignBottom": "向底對齊"
                }
            },
            "mergeDialog": {
                "title": "合併儲存格",
                "buttons": {
                    "mergeCells": "全部合併",
                    "mergeHorizontally": "水平合併",
                    "mergeVertically": "垂直合併",
                    "unmerge": "取消合併"
                }
            },
            "freezeDialog": {
                "title": "鎖定儲存格",
                "buttons": {
                    "freezePanes": "鎖定儲存格",
                    "freezeRows": "鎖定行",
                    "freezeColumns": "鎖定列",
                    "unfreeze": "取消鎖定儲存格"
                }
            },
            "validationDialog": {
                "title": "數據驗證",
                "hintMessage": "請輪入有效的 {0} 數值 {1}.",
                "hintTitle": "驗證 {0}",
                "criteria": {
                    "any": "任何數值",
                    "number": "數字",
                    "text": "文字",
                    "date": "日期",
                    "custom": "自訂公式",
                    "list": "列表"
                },
                "comparers": {
                    "greaterThan": "大於",
                    "lessThan": "小於",
                    "between": "在 ... 之間",
                    "notBetween": "不在 ... 之間",
                    "equalTo": "等於",
                    "notEqualTo": "不等於",
                    "greaterThanOrEqualTo": "大於或等於",
                    "lessThanOrEqualTo": "小於或等於"
                },
                "comparerMessages": {
                    "greaterThan": "大於 {0}",
                    "lessThan": "小於 {0}",
                    "between": "在 {0} 和 {1} 之間",
                    "notBetween": "不在 {0} 和 {1} 之間",
                    "equalTo": "等於 {0}",
                    "notEqualTo": "不等於 {0}",
                    "greaterThanOrEqualTo": "大於或等於 {0}",
                    "lessThanOrEqualTo": "小於或等於 {0}",
                    "custom": "乎合公式: {0}"
                },
                "labels": {
                    "criteria": "准則",
                    "comparer": "比較的",
                    "min": "最小",
                    "max": "最大",
                    "value": "數值",
                    "start": "開始",
                    "end": "完結",
                    "onInvalidData": "在數據無效時",
                    "rejectInput": "拒絕輸入",
                    "showWarning": "顯示警告",
                    "showHint": "顯示提示",
                    "hintTitle": "提示標題",
                    "hintMessage": "提示訊息",
                    "ignoreBlank": "忽略空白"
                },
                "placeholders": {
                    "typeTitle": "種類標題",
                    "typeMessage": "種類訊息"
                }
            },
            "saveAsDialog": {
                "title": "另存...",
                "labels": {
                    "fileName": "檔案名稱",
                    "saveAsType": "另存種類"
                }
            },
            "exportAsDialog": {
                "title": "滙出...",
                "labels": {
                    "fileName": "檔案名稱",
                    "saveAsType": "另存種類",
                    "exportArea": "滙出",
                    "paperSize": "紙張大小",
                    "margins": "邊距",
                    "orientation": "方向",
                    "print": "列印",
                    "guidelines": "參考線",
                    "center": "置中",
                    "horizontally": "水平地",
                    "vertically": "垂直地"
                }
            },
            "modifyMergedDialog": {
                "errorMessage": "不能轉換部份已合併的儲存格"
            },
            "useKeyboardDialog": {
                "title": "Copying and pasting",
                "errorMessage": "These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",
                "labels": {
                    "forCopy": "for copy",
                    "forCut": "for cut",
                    "forPaste": "for paste"
                }
            },
            "unsupportedSelectionDialog": {
                "errorMessage": "That action cannot be performed on multiple selection."
            }
        });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
    kendo.spreadsheet.messages.filterMenu =
        $.extend(true, kendo.spreadsheet.messages.filterMenu, {
            "sortAscending": "Sort range A to Z",
            "sortDescending": "Sort range Z to A",
            "filterByValue": "Filter by value",
            "filterByCondition": "Filter by condition",
            "apply": "Apply",
            "search": "Search",
            "addToCurrent": "Add to current selection",
            "clear": "Clear",
            "blanks": "(Blanks)",
            "operatorNone": "None",
            "and": "AND",
            "or": "OR",
            "operators": {
                "string": {
                    "contains": "Text contains",
                    "doesnotcontain": "Text does not contain",
                    "startswith": "Text starts with",
                    "endswith": "Text ends with"
                },
                "date": {
                    "eq": "Date is",
                    "neq": "Date is not",
                    "lt": "Date is before",
                    "gt": "Date is after"
                },
                "number": {
                    "eq": "Is equal to",
                    "neq": "Is not equal to",
                    "gte": "Is greater than or equal to",
                    "gt": "Is greater than",
                    "lte": "Is less than or equal to",
                    "lt": "Is less than"
                }
            }
        });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
    kendo.spreadsheet.messages.toolbar =
        $.extend(true, kendo.spreadsheet.messages.toolbar, {
            "addColumnLeft": "Add column left",
            "addColumnRight": "Add column right",
            "addRowAbove": "Add row above",
            "addRowBelow": "Add row below",
            "alignment": "Alignment",
            "alignmentButtons": {
                "justtifyLeft": "Align left",
                "justifyCenter": "Center",
                "justifyRight": "Align right",
                "justifyFull": "Justify",
                "alignTop": "Align top",
                "alignMiddle": "Align middle",
                "alignBottom": "Align bottom"
            },
            "backgroundColor": "Background",
            "bold": "Bold",
            "borders": "Borders",
            "colorPicker": {
                "reset": "Reset color",
                "customColor": "Custom color..."
            },
            "copy": "Copy",
            "cut": "Cut",
            "deleteColumn": "Delete column",
            "deleteRow": "Delete row",
            "excelImport": "Import from Excel...",
            "filter": "Filter",
            "fontFamily": "Font",
            "fontSize": "Font size",
            "format": "Custom format...",
            "formatTypes": {
                "automatic": "Automatic",
                "number": "Number",
                "percent": "Percent",
                "financial": "Financial",
                "currency": "Currency",
                "date": "Date",
                "time": "Time",
                "dateTime": "Date time",
                "duration": "Duration",
                "moreFormats": "More formats..."
            },
            "formatDecreaseDecimal": "Decrease decimal",
            "formatIncreaseDecimal": "Increase decimal",
            "freeze": "Freeze panes",
            "freezeButtons": {
                "freezePanes": "Freeze panes",
                "freezeRows": "Freeze rows",
                "freezeColumns": "Freeze columns",
                "unfreeze": "Unfreeze panes"
            },
            "italic": "Italic",
            "merge": "Merge cells",
            "mergeButtons": {
                "mergeCells": "Merge all",
                "mergeHorizontally": "Merge horizontally",
                "mergeVertically": "Merge vertically",
                "unmerge": "Unmerge"
            },
            "open": "Open...",
            "paste": "Paste",
            "quickAccess": {
                "redo": "Redo",
                "undo": "Undo"
            },
            "saveAs": "Save As...",
            "sortAsc": "Sort ascending",
            "sortDesc": "Sort descending",
            "sortButtons": {
                "sortSheetAsc": "Sort sheet A to Z",
                "sortSheetDesc": "Sort sheet Z to A",
                "sortRangeAsc": "Sort range A to Z",
                "sortRangeDesc": "Sort range Z to A"
            },
            "textColor": "Text Color",
            "textWrap": "Wrap text",
            "underline": "Underline",
            "validation": "資料驗證..."
        });
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
    kendo.spreadsheet.messages.view =
        $.extend(true, kendo.spreadsheet.messages.view, {
            "errors": {
                "shiftingNonblankCells": "Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet.",
                "filterRangeContainingMerges": "Cannot create a filter within a range containing merges",
                "validationError": "The value that you entered violates the validation rules set on the cell."
            },
            "tabs": {
                "home": "主頁",
                "insert": "插入",
                "data": "資料"
            }
        });
}
})(window.kendo.jQuery);
