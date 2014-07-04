

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "等于",
    "gte": "大于或等于",
    "gt": "大于",
    "lte": "小于或等于",
    "lt": "小于",
    "neq": "不等于"
  },
  "number": {
    "eq": "等于",
    "gte": "大于或等于",
    "gt": "大于",
    "lte": "小于或等于",
    "lt": "小于",
    "neq": "不等于"
  },
  "string": {
    "endswith": "结尾为",
    "eq": "等于",
    "neq": "不等于",
    "startswith": "开头为",
    "contains": "包含",
    "doesnotcontain": "不包含"
  },
  "enum": {
    "eq": "等于",
    "neq": "不等于"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "列",
  "sortAscending": "升序排序",
  "sortDescending": "降序排序",
  "settings": "列设置",
  "done": "完成",
  "lock": "锁定",
  "unlock": "解除锁定"
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
    "create": "新增",
    "destroy": "删除",
    "canceledit": "取消",
    "update": "更新",
    "edit": "编辑",
    "select": "选择",
    "cancel": "取消",
    "save": "保存"
  },
  "editable": {
    "confirmation": "确定要删除吗？",
    "cancelDelete": "取消",
    "confirmDelete": "删除"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "页",
  "display": "显示条目 {0} - {1} 共 {2}",
  "of": "共 {0}",
  "empty": "没有可显示的记录。",
  "refresh": "刷新",
  "first": "首页",
  "itemsPerPage": "每页",
  "last": "末页",
  "next": "下一页",
  "previous": "上一页",
  "morePages": "更多..."
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "过滤",
  "and": "并且",
  "clear": "清除过滤",
  "info": "显示符合以下条件的行",
  "selectValue": "-选择值-",
  "isFalse": "为假",
  "isTrue": "为真",
  "or": "或者",
  "cancel": "取消",
  "operator": "运算符",
  "value": "值"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "托拽列标题到此处按列组合显示"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "粗体",
  "createLink": "插入链接",
  "fontName": "选择字体",
  "fontNameInherit": "（继承的字体）",
  "fontSize": "选择字号",
  "fontSizeInherit": "（继承的字号）",
  "formatBlock": "选择块类型",
  "indent": "增加缩进",
  "insertHtml": "插入 HTML",
  "insertImage": "插入图片",
  "insertOrderedList": "插入有序列表",
  "insertUnorderedList": "插入无序列表",
  "italic": "斜体",
  "justifyCenter": "居中",
  "justifyFull": "两端对齐",
  "justifyLeft": "左对齐",
  "justifyRight": "右对齐",
  "outdent": "减少缩进",
  "strikethrough": "删除线",
  "styles": "风格",
  "subscript": "下标",
  "superscript": "上标",
  "underline": "下划线",
  "unlink": "移除链接",
  "dialogButtonSeparator": "或",
  "dialogCancel": "取消",
  "dialogInsert": "插入",
  "imageAltText": "替代文本",
  "imageWebAddress": "图片地址",
  "linkOpenInNewWindow": "在新窗口中打开",
  "linkText": "链接文字",
  "linkToolTip": "链接提示",
  "linkWebAddress": "链接地址",
  "search": "搜索",
  "createTable": "创建表",
  "addColumnLeft": "左侧添加列",
  "addColumnRight": "右侧添加列",
  "addRowAbove": "上方添加行",
  "addRowBelow": "下方添加行",
  "deleteColumn": "删除列",
  "deleteRow": "删除行",
  "backColor": "背景色",
  "bold1": "粗体",
  "createLink1": "插入超链接",
  "createTable1": "创建表格",
  "deleteColumn1": "删除列",
  "deleteFile": "您确定要删除 \"{0}\"?",
  "deleteRow1": "删除行",
  "dialogButtonSeparator1": "或",
  "dialogCancel1": "取消",
  "dialogInsert1": "插入",
  "directoryNotFound": "此文件夹未找到",
  "dropFilesHere": "拖拽要上传的文件到此处",
  "emptyFolder": "文件夹为空",
  "fontName1": "选择字体",
  "fontNameInherit1": "(继承的字体)",
  "fontSize1": "选择字号",
  "fontSizeInherit1": "(继承的大小)",
  "foreColor": "颜色",
  "formatBlock1": "格式",
  "imageAltText1": "替代文本",
  "imageWebAddress1": "图片地址",
  "indent1": "缩进",
  "insertHtml1": "插入 HTML",
  "insertImage1": "插入图片",
  "insertOrderedList1": "插入有序列表",
  "insertUnorderedList1": "插入无序列表",
  "invalidFileType": "选中的文件 \"{0}\" 非法，支持的文件类型为 {1}。",
  "italic1": "斜体",
  "justifyCenter1": "居中",
  "justifyFull1": "两端对齐",
  "justifyLeft1": "左对齐",
  "justifyRight1": "右对齐",
  "linkOpenInNewWindow1": "在新窗口中打开",
  "linkText1": "链接文字",
  "linkToolTip1": "链接提示",
  "linkWebAddress1": "链接地址",
  "orderBy": "排序条件:",
  "orderByName": "按名称排序",
  "orderBySize": "按大小排序",
  "outdent1": "减少缩进",
  "overwriteFile": "当前文件夹已存在文件名为 \"{0}\" 的文件，您确定要覆盖么？",
  "search1": "搜索",
  "strikethrough1": "删除线",
  "styles1": "风格",
  "subscript1": "下标",
  "superscript1": "上标",
  "underline1": "下划线",
  "unlink1": "删除超链接",
  "uploadFile": "上传",
  "formatting": "格式",
  "viewHtml": "查看 HTML",
  "dialogUpdate": "上传",
  "insertFile": "插入文件"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "取消",
  "dropFilesHere": "拖拽要上传的文件到此处",
  "remove": "移除",
  "retry": "重试",
  "select": "选择...",
  "statusFailed": "失败",
  "statusUploaded": "已上传",
  "statusUploading": "上传中",
  "uploadSelectedFiles": "上传文件",
  "headerStatusUploaded": "完成",
  "headerStatusUploading": "上传..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "取消",
  "confirmation": "Are you sure you want to delete this event?",
  "date": "Date",
  "destroy": "Delete",
  "editor": {
    "allDayEvent": "All day event",
    "description": "Description",
    "editorTitle": "Event",
    "end": "End",
    "endTimezone": "End timezone",
    "repeat": "Repeat",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Start",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Time zone",
    "timezoneEditorTitle": "Timezones",
    "title": "Title",
    "noTimezone": "No timezone"
  },
  "event": "Event",
  "recurrenceMessages": {
    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
    "deleteWindowOccurrence": "Delete current occurrence",
    "deleteWindowSeries": "Delete the series",
    "deleteWindowTitle": "Delete Recurring Item",
    "editRecurring": "Do you want to edit only this event occurrence or the whole series?",
    "editWindowOccurrence": "Edit current occurrence",
    "editWindowSeries": "Edit the series",
    "editWindowTitle": "Edit Recurring Item"
  },
  "save": "Save",
  "time": "Time",
  "today": "Today",
  "views": {
    "agenda": "Agenda",
    "day": "Day",
    "month": "Month",
    "week": "Week",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Delete event",
  "showFullDay": "Show full day",
  "showWorkDay": "Show business hours"
});
}