(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "确定",
  "cancel": "取消"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "确定",
  "cancel": "取消"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "升序",
  "sortDescending": "降序",
  "filter": "过滤",
  "columns": "列",
  "done": "完成",
  "settings": "列设置",
  "lock": "锁定",
  "unlock": "解除锁定"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "粗体",
  "italic": "斜体",
  "underline": "下划线",
  "strikethrough": "删除线",
  "superscript": "上标",
  "subscript": "下标",
  "justifyCenter": "居中",
  "justifyLeft": "左对齐",
  "justifyRight": "右对齐",
  "justifyFull": "两端对齐",
  "insertUnorderedList": "插入无序列表",
  "insertOrderedList": "插入有序列表",
  "indent": "增加缩进",
  "outdent": "减少缩进",
  "createLink": "插入链接",
  "unlink": "移除链接",
  "insertImage": "插入图片",
  "insertFile": "插入文件",
  "insertHtml": "插入 HTML",
  "viewHtml": "查看 HTML",
  "fontName": "选择字体",
  "fontNameInherit": "（继承的字体）",
  "fontSize": "选择字号",
  "fontSizeInherit": "（继承的字号）",
  "formatBlock": "格式化块",
  "formatting": "格式化",
  "foreColor": "颜色",
  "backColor": "背景色",
  "style": "风格",
  "emptyFolder": "文件夹为空",
  "uploadFile": "上传",
  "orderBy": "排序条件:",
  "orderBySize": "大小",
  "orderByName": "名字",
  "invalidFileType": "选中的文件 \"{0}\" 非法，支持的文件类型为 {1}。",
  "deleteFile": '您确定要删除 \"{0}\"?',
  "overwriteFile": '当前文件夹已存在文件名为 \"{0}\" 的文件，您确定要覆盖么？',
  "directoryNotFound": "此文件夹未找到",
  "imageWebAddress": "图片地址",
  "imageAltText": "替代文本",
  "imageWidth": "宽度 (px)",
  "imageHeight": "高度 (px)",
  "fileWebAddress": "文件地址",
  "fileTitle": "标题",
  "linkWebAddress": "链接地址",
  "linkText": "链接文字",
  "linkToolTip": "链接提示",
  "linkOpenInNewWindow": "在新窗口中打开",
  "dialogUpdate": "上传",
  "dialogInsert": "插入",
  "dialogButtonSeparator": "或",
  "dialogCancel": "取消",
  "createTable": "创建表格",
  "addColumnLeft": "左侧添加列",
  "addColumnRight": "右侧添加列",
  "addRowAbove": "上方添加行",
  "addRowBelow": "下方添加行",
  "deleteRow": "删除行",
  "deleteColumn": "删除列"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "上传",
  "orderBy": "排序条件",
  "orderByName": "名称",
  "orderBySize": "大小",
  "directoryNotFound": "此文件夹未找到",
  "emptyFolder": "文件夹为空",
  "deleteFile": '您确定要删除 \"{0}\"?',
  "invalidFileType": "选中的文件 \"{0}\" 非法，支持的文件类型为 {1}。",
  "overwriteFile": "当前文件夹已存在文件名为 \"{0}\" 的文件，您确定要覆盖么？",
  "dropFilesHere": "拖拽要上传的文件到此处",
  "search": "搜索"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "为真",
  "isFalse": "为假",
  "filter": "过滤",
  "clear": "清除",
  "operator": "运算符"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "显示符合以下条件的行",
  "isTrue": "为真",
  "isFalse": "为假",
  "filter": "过滤",
  "clear": "清除",
  "and": "并且",
  "or": "或",
  "selectValue": "-选择-",
  "operator": "运算符",
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
    "eq": "等于",
    "neq": "不等于",
    "startswith": "开头为",
    "contains": "包含",
    "doesnotcontain": "不包含",
    "endswith": "结尾为"
  },
  "number": {
    "eq": "等于",
    "neq": "不等于",
    "gte": "大于等于",
    "gt": "大于",
    "lte": "小于等于",
    "lt": "小于"
  },
  "date": {
    "eq": "等于",
    "neq": "不等于",
    "gte": "大于等于",
    "gt": "大于",
    "lte": "小于等于",
    "lt": "小于"
  },
  "enums": {
    "eq": "等于",
    "neq": "不等于"
  }
});
}


/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "等于",
    "neq": "不等于",
    "startswith": "开头为",
    "contains": "包含",
    "doesnotcontain": "不包含",
    "endswith": "结尾为"
  },
  "number": {
    "eq": "等于",
    "neq": "不等于",
    "gte": "大于等于",
    "gt": "大于",
    "lte": "小于等于",
    "lt": "小于"
  },
  "date": {
    "eq": "等于",
    "neq": "不等于",
    "gte": "大于等于",
    "gt": "大于",
    "lte": "小于等于",
    "lt": "小于"
  },
  "enums": {
    "eq": "等于",
    "neq": "不等于"
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
    "append": "添加任务",
    "addChild": "添加子任务",
    "insertBefore": "添加到前面",
    "insertAfter": "添加到后面"
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
    "destroy": "删除",
    "edit": "编辑",
    "excel": "导出 Excel",
    "pdf": "导出 PDF",
    "save": "保存",
    "select": "选择",
    "update": "更新"
  },
  "editable": {
    "cancelDelete": "取消",
    "confirmation": "确定要删除吗？",
    "confirmDelete": "删除"
  },
  "noRecords": "没有可用的记录。"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "拖拽列标题到此处按列组合显示"
});
}

/* ImageBrowser messages */

if (kendo.ui.ImageBrowser) {
kendo.ui.ImageBrowser.prototype.options.messages =
$.extend(true, kendo.ui.ImageBrowser.prototype.options.messages,{
  "uploadFile": "上传",
  "orderBy": "排序条件",
  "orderByName": "名称",
  "orderBySize": "大小",
  "directoryNotFound": "此文件夹未找到",
  "emptyFolder": "文件夹为空",
  "deleteFile": '您确定要删除 \"{0}\"?',
  "invalidFileType": "选中的文件 \"{0}\" 非法，支持的文件类型为 {1}。",
  "overwriteFile": "当前文件夹已存在文件名为 \"{0}\" 的文件，您确定要覆盖么？",
  "dropFilesHere": "拖拽要上传的文件到此处",
  "search": "搜索"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "增加",
  "downArrowText": "减少"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "显示条目 {0} - {1} 共 {2}",
  "empty": "没有可显示的记录。",
  "page": "页",
  "of": "共 {0}",
  "itemsPerPage": "每页",
  "first": "首页",
  "last": "末页",
  "next": "下一页",
  "previous": "上一页",
  "refresh": "刷新",
  "morePages": "更多..."
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "拖放数据字段于此",
  "columnFields": "拖放列字段于此",
  "rowFields": "拖放行字段于此"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "从不",
    "hourly": "每小时",
    "daily": "每天",
    "weekly": "每周",
    "monthly": "每月",
    "yearly": "每年"
  },
  "hourly": {
    "repeatEvery": "重复周期: ",
    "interval": " 小时"
  },
  "daily": {
    "repeatEvery": "重复周期: ",
    "interval": " 天"
  },
  "weekly": {
    "interval": " 周",
    "repeatEvery": "重复周期: ",
    "repeatOn": "重复于:"
  },
  "monthly": {
    "repeatEvery": "重复周期: ",
    "repeatOn": "重复于:",
    "interval": " 月",
    "day": "日期"
  },
  "yearly": {
    "repeatEvery": "重复周期: ",
    "repeatOn": "重复于: ",
    "interval": " 年",
    "of": " 月份: "
  },
  "end": {
    "label": "截止时间:",
    "mobileLabel": "截止时间",
    "never": "从不",
    "after": "重复 ",
    "occurrence": " 次后",
    "on": "止于 "
  },
  "offsetPositions": {
    "first": "第一",
    "second": "第二",
    "third": "第三",
    "fourth": "第四",
    "last": "最后"
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
  "destroy": "删除",
  "allDay": "整天",
  "date": "日期",
  "event": "事件",
  "time": "时间",
  "showFullDay": "显示整天",
  "showWorkDay": "显示营业时间",
  "deleteWindowTitle": "删除事件",
  "ariaSlotLabel": "选择从 {0:t} 到 {1:t}",
  "ariaEventLabel": "{0} on {1:D} at {2:t}",
  "editable": {
    "confirmation": "你确定你要删除这个活动？"
  },
  "views": {
    "day": "日",
    "week": "周",
    "workWeek": "工作日",
    "agenda": "日程",
    "month": "月"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "删除周期条目",
    "deleteWindowOccurrence": "删除当前事件",
    "deleteWindowSeries": "删除序列",
    "editWindowTitle": "修改周期条目",
    "editWindowOccurrence": "修改当前事件",
    "editWindowSeries": "修改序列",
    "deleteRecurring": "你想删除仅此事件发生或整个系列？",
    "editRecurring": "你想，仅编辑此次事件发生或整个系列？"
  },
  "editor": {
    "title": "标题",
    "start": "起始",
    "end": "终止",
    "allDayEvent": "全天事件",
    "description": "描述",
    "repeat": "重复",
    "timezone": " ",
    "startTimezone": "起始时区",
    "endTimezone": "终止时区",
    "separateTimezones": "使用独立的起始和终止时区",
    "timezoneEditorTitle": "时区",
    "timezoneEditorButton": "时区",
    "timezoneTitle": "选择时区",
    "noTimezone": "无",
    "editorTitle": "事件"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "增加",
  "decreaseButtonTitle": "减少"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "加载中...",
  "requestFailed": "加载失败",
  "retry": "重试"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "选择...",
  "cancel": "取消",
  "retry": "重试",
  "remove": "移除",
  "uploadSelectedFiles": "上传文件",
  "dropFilesHere": "拖拽要上传的文件到此处",
  "statusUploading": "上传中",
  "statusUploaded": "已上传",
  "statusWarning": "警告",
  "statusFailed": "失败",
  "headerStatusUploading": "上传...",
  "headerStatusUploaded": "完成"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} 为必填项",
  "pattern": "{0} 非法",
  "min": "{0} 应该大于或等于 {1}",
  "max": "{0} 应该小于或等于 {1}",
  "step": "{0} 非法",
  "email": "{0} 不是合法的邮件地址",
  "url": "{0} 不是合法的URL",
  "date": "{0} 不是合法的日期"
});
}
})(window.kendo.jQuery);

kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette && (kendo.spreadsheet.messages.borderPalette = e.extend(!0, kendo.spreadsheet.messages.borderPalette, {
		    allBorders: "所有框线",
		    insideBorders: "内部边框",
		    insideHorizontalBorders: "内部水平边框",
		    insideVerticalBorders: "内部垂直边框",
		    outsideBorders: "外边框",
		    leftBorder: "左边框",
		    topBorder: "上边框",
		    rightBorder: "右边框",
		    bottomBorder: "底部边框",
		    noBorders: "无边框",
		    reset: "自动",
		    customColor: "其他颜色",
		    apply: "确定",
		    cancel: "取消"
		})),
		kendo.spreadsheet && kendo.spreadsheet.messages.dialogs && (kendo.spreadsheet.messages.dialogs = e.extend(!0, kendo.spreadsheet.messages.dialogs, {
		    apply: "应用",
		    save: "保存",
		    cancel: "取消",
		    remove: "移动",
		    okText: "确定",
		    formatCellsDialog: {
		        title: "格式",
		        categories: {
		            number: "数字",
		            currency: "货币",
		            date: "日期"
		        }
		    },
		    fontFamilyDialog: {
		        title: "字体"
		    },
		    fontSizeDialog: {
		        title: "字体大小"
		    },
		    bordersDialog: {
		        title: "边框"
		    },
		    alignmentDialog: {
		        title: "对齐方式",
		        buttons: {
		            justtifyLeft: "左对齐",
		            justifyCenter: "居中对齐",
		            justifyRight: "右对齐",
		            justifyFull: "两端对齐",
		            alignTop: "顶端对其",
		            alignMiddle: "居中对齐",
		            alignBottom: "底端对其"
		        }
		    },
		    mergeDialog: {
		        title: "合并单元格",
		        buttons: {
		            mergeCells: "合并",
		            mergeHorizontally: "水平合并",
		            mergeVertically: "垂直合并",
		            unmerge: "取消合并"
		        }
		    },
		    freezeDialog: {
		        title: "冻结面板",
		        buttons: {
		            freezePanes: "冻结行列",
		            freezeRows: "冻结行",
		            freezeColumns: "冻结列",
		            unfreeze: "取消冻结"
		        }
		    },
		    validationDialog: {
		        title: "数据校验",
		        hintMessage: "请输入合法的值在 {0} 和 {1} 之间.",
		        hintTitle: "校验 {0}",
		        criteria: {
		            any: "任意值",
		            number: "数值",
		            text: "文本",
		            date: "日期",
		            custom: "自定义",
		            list: "List"
		        },
		        comparers: {
		            greaterThan: "大于",
		            lessThan: "小于",
		            between: "区间",
		            notBetween: "不在区间",
		            equalTo: "等于",
		            notEqualTo: "不等于",
		            greaterThanOrEqualTo: "大于等于",
		            lessThanOrEqualTo: "小于等于"
		        },
		        comparerMessages: {
		            greaterThan: "大于 {0}",
		            lessThan: "小于 {0}",
		            between: "在 {0} 和 {1} 之间",
		            notBetween: "不在 {0} 和 {1} 之间",
		            equalTo: "等于 {0}",
		            notEqualTo: "不等于 {0}",
		            greaterThanOrEqualTo: "大于等于 {0}",
		            lessThanOrEqualTo: "小于等于 {0}",
		            custom: "满足公式: {0}"
		        },
		        labels: {
		            criteria: "Criteria",
		            comparer: "Comparer",
		            min: "Min",
		            max: "Max",
		            value: "Value",
		            start: "Start",
		            end: "End",
		            onInvalidData: "On invalid data",
		            rejectInput: "Reject input",
		            showWarning: "Show warning",
		            showHint: "Show hint",
		            hintTitle: "Hint title",
		            hintMessage: "Hint message",
		            ignoreBlank: "Ignore blank"
		        },
		        placeholders: {
		            typeTitle: "Type title",
		            typeMessage: "Type message"
		        }
		    },
		    saveAsDialog: {
		        title: "另存为",
		        labels: {
		            fileName: "文件名",
		            saveAsType: "文件类型"
		        }
		    },
		    exportAsDialog: {
		        title: "导出",
		        labels: {
		            fileName: "文件名",
		            saveAsType: "文件类型",
		            exportArea: "页范围",
		            paperSize: "纸张大小",
		            margins: "页边距",
		            orientation: "方向",
		            print: "打印",
		            guidelines: "导航线",
		            center: "居中",
		            horizontally: "垂直居中",
		            vertically: "水平居中"
		        }
		    },
		    modifyMergedDialog: {
		        errorMessage: "无法更改合并单元格."
		    },
		    useKeyboardDialog: {
		        title: "复制粘贴",
		        errorMessage: "请使用快捷键执行如下操作：",
		        labels: {
		            forCopy: "复制",
		            forCut: "剪切",
		            forPaste: "粘贴"
		        }
		    },
		    unsupportedSelectionDialog: {
		        errorMessage: "当前操作不能应用于多行选择"
		    },
            linkDialog: {
                title: '超链接',
                labels: {
                    text: '超链文本',
                    url: '地址',
                    removeLink: '移除'
                }
            }
		})),
		kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu && (kendo.spreadsheet.messages.filterMenu = e.extend(!0, kendo.spreadsheet.messages.filterMenu, {
		    sortAscending: "Sort range A to Z",
		    sortDescending: "Sort range Z to A",
		    filterByValue: "Filter by value",
		    filterByCondition: "Filter by condition",
		    apply: "Apply",
		    search: "Search",
		    addToCurrent: "Add to current selection",
		    clear: "Clear",
		    blanks: "(Blanks)",
		    operatorNone: "None",
		    and: "AND",
		    or: "OR",
		    operators: {
		        string: {
		            contains: "Text contains",
		            doesnotcontain: "Text does not contain",
		            startswith: "Text starts with",
		            endswith: "Text ends with"
		        },
		        date: {
		            eq: "Date is",
		            neq: "Date is not",
		            lt: "Date is before",
		            gt: "Date is after"
		        },
		        number: {
		            eq: "Is equal to",
		            neq: "Is not equal to",
		            gte: "Is greater than or equal to",
		            gt: "Is greater than",
		            lte: "Is less than or equal to",
		            lt: "Is less than"
		        }
		    }
		})),
		kendo.spreadsheet && kendo.spreadsheet.messages.toolbar && (kendo.spreadsheet.messages.toolbar = e.extend(!0, kendo.spreadsheet.messages.toolbar, {
		    addColumnLeft: "插入左侧列",
		    addColumnRight: "插入右侧列",
		    addRowAbove: "插入上方行",
		    addRowBelow: "插入下方行",
		    alignment: "居中对齐",
		    alignmentButtons: {
		        justtifyLeft: "左对齐",
		        justifyCenter: "居中",
		        justifyRight: "右对齐",
		        justifyFull: "自适应",
		        alignTop: "顶端对齐",
		        alignMiddle: "垂直居中",
		        alignBottom: "底端对齐"
		    },
		    backgroundColor: "底色",
		    bold: "粗体",
		    borders: "边框",
		    colorPicker: {
		        reset: "自动",
		        customColor: "其他颜色"
		    },
		    copy: "复制",
		    cut: "剪切",
		    deleteColumn: "删除列",
		    deleteRow: "删除行",
		    excelImport: "从Excel导入",
		    filter: "过滤",
		    fontFamily: "字体",
		    fontSize: "字体大小",
		    format: "自定义格式",
		    formatTypes: {
		        automatic: "Automatic",
		        number: "Number",
		        percent: "Percent",
		        financial: "Financial",
		        currency: "Currency",
		        date: "Date",
		        time: "Time",
		        dateTime: "Date time",
		        duration: "Duration",
		        moreFormats: "More formats..."
		    },
		    formatDecreaseDecimal: "减少小数位",
		    formatIncreaseDecimal: "增加小数位",
		    freeze: "冻结",
		    freezeButtons: {
		        freezePanes: "冻结面板",
		        freezeRows: "冻结行",
		        freezeColumns: "冻结列",
		        unfreeze: "取消冻结"
		    },
		    italic: "斜体",
		    merge: "合并单元格",
		    mergeButtons: {
		        mergeCells: "合并所以",
		        mergeHorizontally: "水平合并",
		        mergeVertically: "纵向合并",
		        unmerge: "取消合并"
		    },
		    open: "打开",
			exportAs:"导出..",
		    paste: "粘贴",
		    quickAccess: {
		        redo: "恢复",
		        undo: "撤销"
		    },
		    saveAs: "另存为",
		    sortAsc: "升序排列",
		    sortDesc: "降序排列",
		    sortButtons: {
		        sortSheetAsc: "升序",
		        sortSheetDesc: "降序",
		        sortRangeAsc: "升序",
		        sortRangeDesc: "降序"
		    },
		    textColor: "字体颜色",
		    textWrap: "自动换行",
		    underline: "下划线",
			hyperlink:"超链接",
		    validation: "数据验证"
		})),
		kendo.spreadsheet && kendo.spreadsheet.messages.view && (kendo.spreadsheet.messages.view = e.extend(!0, kendo.spreadsheet.messages.view, {
		    errors: {
		        shiftingNonblankCells: "由于数据丢失的可能性不能插入单元格。请选择另一个插入位置或从工作表的结尾删除数据。",
		        filterRangeContainingMerges: "您不能对合并的单元格设置过滤器",
		        validationError: "您输入的值不满足当前单元格数据规则"
		    },
		    tabs: {
		        home: "首页",
		        insert: "插入",
		        data: "数据"
		    }
		})),
		kendo.ui.Slider && (kendo.ui.Slider.prototype.options = e.extend(!0, kendo.ui.Slider.prototype.options, {
		    increaseButtonTitle: "增加",
		    decreaseButtonTitle: "减少"
		})),
		kendo.ui.TreeView && (kendo.ui.TreeView.prototype.options.messages = e.extend(!0, kendo.ui.TreeView.prototype.options.messages, {
		    loading: "加载中...",
		    requestFailed: "加载失败",
		    retry: "重试"
		})),
		kendo.ui.Upload && (kendo.ui.Upload.prototype.options.localization = e.extend(!0, kendo.ui.Upload.prototype.options.localization, {
		    select: "选择...",
		    cancel: "取消",
		    retry: "重试",
		    remove: "移除",
		    uploadSelectedFiles: "上传文件",
		    dropFilesHere: "拖拽要上传的文件到此处",
		    statusUploading: "上传中",
		    statusUploaded: "已上传",
		    statusWarning: "警告",
		    statusFailed: "失败",
		    headerStatusUploading: "上传...",
		    headerStatusUploaded: "完成"
		})),
		kendo.ui.Validator && (kendo.ui.Validator.prototype.options.messages = e.extend(!0, kendo.ui.Validator.prototype.options.messages, {
		    required: "{0} 为必填项",
		    pattern: "{0} 非法",
		    min: "{0} 应该大于或等于 {1}",
		    max: "{0} 应该小于或等于 {1}",
		    step: "{0} 非法",
		    email: "{0} 不是合法的邮件地址",
		    url: "{0} 不是合法的URL",
		    date: "{0} 不是合法的日期"
		}))
    }
	(window.kendo.jQuery)
});
