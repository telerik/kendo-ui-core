(function($, undefined) {

  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
        "apply": "確定",
        "cancel": "取消",
        "noColor": "無顏色",
        "clearColor": "清除顏色",
        "previewInput": "顏色十六進位代碼"
      });
  }

  /* ColorPicker messages */

  if (kendo.ui.ColorPicker) {
    kendo.ui.ColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
        "apply": "確定",
        "cancel": "取消",
        "noColor": "無顏色",
        "clearColor": "清除顏色",
        "previewInput": "顏色十六進位代碼"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "sortAscending": "昇冪排列",
        "sortDescending": "降冪排列",
        "filter": "篩選",
        "column": "欄位列",
        "columns": "欄位列",
        "columnVisibility": "欄位列可見性",
        "clear": "清空",
        "cancel": "取消",
        "done": "完成",
        "settings": "列設置",
        "lock": "鎖定",
        "unlock": "解鎖"
      });
  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
        "startLabel": "開始",
        "endLabel": "結束"
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "bold": "粗體",
        "italic": "斜體",
        "underline": "底線",
        "strikethrough": "刪除線",
        "superscript": "上標",
        "subscript": "下標",
        "justifyCenter": "水準居中",
        "justifyLeft": "左對齊",
        "justifyRight": "右對齊",
        "justifyFull": "兩端對齊",
        "insertUnorderedList": "插入無序列表",
        "insertOrderedList": "插入有序列表",
        "indent": "增加縮進",
        "outdent": "減少縮進",
        "createLink": "插入連結",
        "unlink": "刪除連結",
        "insertImage": "插入圖片",
        "insertFile": "插入文件",
        "insertHtml": "插入代碼塊",
        "viewHtml": "原始程式碼編輯",
        "fontName": "請選擇字體",
        "fontNameInherit": "（預設字體）",
        "fontSize": "請選擇字型大小",
        "fontSizeInherit": "（默認字型大小）",
        "formatBlock": "格式",
        "formatting": "格式",
        "foreColor": "文字顏色",
        "backColor": "文字背景色",
        "style": "樣式",
        "emptyFolder": "資料夾為空",
        "editAreaTitle": "在可編輯區域可按 F10 跳轉工具列。",
        "uploadFile": "上傳文件",
        "overflowAnchor": "更多功能",
        "orderBy": "排序方式：",
        "orderBySize": "按大小排序",
        "orderByName": "按名稱排序",
        "invalidFileType": "你上傳的檔案格式 {0} 是無效的，支持的檔案類型為：{1}",
        "deleteFile": "你確定要刪除【{0}】這個檔嗎？",
        "overwriteFile": "當前資料夾已存在檔案名為【{0}】的檔，是否覆蓋？",
        "directoryNotFound": "資料夾未找到",
        "imageWebAddress": "圖片連結位址",
        "imageAltText": "圖片預留位置",
        "imageWidth": "圖片寬度（單位px）",
        "imageHeight": "圖片高度（單位px）",
        "fileWebAddress": "檔連結位址",
        "fileText": "檔顯示文字",
        "fileTitle": "檔懸停文字",
        "linkWebAddress": "連結位址",
        "linkText": "連結文字",
        "linkToolTip": "連結提示",
        "linkOpenInNewWindow": "在新視窗中打開連結",
        "dialogUpdate": "更新",
        "dialogInsert": "插入",
        "dialogButtonSeparator": "或",
        "dialogOk": "確定",
        "dialogCancel": "取消",
        "cleanFormatting": "清除格式",
        "createTable": "創建表格",
        "createTableHint": "創建一個 {0} 行 {1} 列的表格",
        "addColumnLeft": "在左側插入列",
        "addColumnRight": "在右側插入列",
        "addRowAbove": "在上方插入行",
        "addRowBelow": "在下方插入行",
        "deleteRow": "刪除行",
        "deleteColumn": "刪除列",
        "mergeCellsHorizontally": "水準合併儲存格",
        "mergeCellsVertically": "垂直合併儲存格",
        "splitCellHorizontally": "水準拆分儲存格",
        "splitCellVertically": "垂直拆分儲存格",
        "tableWizard": "表格嚮導",
        "tableTab": "表格",
        "cellTab": "儲存格",
        "accessibilityTab": "可訪問性",
        "caption": "標題",
        "summary": "摘要",
        "width": "寬",
        "height": "高",
        "units": "單位",
        "cellSpacing": "儲存格間距",
        "cellPadding": "儲存格內邊距",
        "cellMargin": "單元格外邊距",
        "alignment": "對齊",
        "background": "背景色",
        "cssClass": "樣式表",
        "id": "ID",
        "border": "邊框",
        "borderStyle": "邊框樣式",
        "collapseBorders": "合併邊框",
        "wrapText": "文字換行",
        "associateCellsWithHeaders": "關聯表頭與儲存格",
        "alignLeft": "左對齊",
        "alignCenter": "居中對齊",
        "alignRight": "右對齊",
        "alignLeftTop": "左上對齊",
        "alignCenterTop": "中上對齊",
        "alignRightTop": "右上對齊",
        "alignLeftMiddle": "左中對齊",
        "alignCenterMiddle": "居中對齊",
        "alignRightMiddle": "右中對齊",
        "alignLeftBottom": "左下對齊",
        "alignCenterBottom": "中下對齊",
        "alignRightBottom": "右下對齊",
        "alignRemove": "移除對齊",
        "columns": "列",
        "rows": "行",
        "selectAllCells": "選擇所有儲存格",
        "exportAs": "匯出",
        "import": "導入",
        "print": "列印"
      });
  }

  /* ImageBrowser messages */

  if (kendo.ui.ImageBrowser) {
    kendo.ui.ImageBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, {
        "uploadFile": "上傳圖片",
        "orderBy": "排序方式",
        "orderByName": "按名稱排序",
        "orderBySize": "按大小排序",
        "directoryNotFound": "資料夾未找到",
        "emptyFolder": "資料夾為空",
        "deleteFile": "你確定要刪除【{0}】這張圖片嗎？",
        "invalidFileType": "你上傳的圖片格式 {0} 是無效的，支援的圖片類型為：{1}",
        "overwriteFile": "當前資料夾已存在檔案名為【{0}】的圖片，是否覆蓋？",
        "dropFilesHere": "將圖片拖拽到此處上傳",
        "search": "搜索"
      });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
        "uploadFile": "上傳文件",
        "orderBy": "排序方式",
        "orderByName": "按名稱排序",
        "orderBySize": "按大小排序",
        "directoryNotFound": "資料夾未找到",
        "emptyFolder": "資料夾為空",
        "deleteFile": "你確定要刪除【{0}】這個檔嗎？",
        "invalidFileType": "你上傳的檔案格式 {0} 是無效的，支持的檔案類型為：{1}",
        "overwriteFile": "當前資料夾已存在檔案名為【{0}】的檔，是否覆蓋？",
        "dropFilesHere": "將文件拖拽到此處上傳",
        "search": "搜索"
      });
  }

  /* Filter messages */

  if (kendo.ui.Filter) {
    kendo.ui.Filter.prototype.options.messages =
      $.extend(true, kendo.ui.Filter.prototype.options.messages, {
        "and": "與",
        "or": "或",
        "apply": "確定",
        "close": "關閉",
        "addExpression": "添加運算式",
        "addGroup": "添加分組",
        "fields": "欄位",
        "operators": "運算子"
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "isTrue": "是",
        "isFalse": "否",
        "filter": "篩選",
        "clear": "清空",
        "operator": "運算子"
      });
  }

  /* FilterMenu messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "info": "篩選條件：",
        "title": "篩選條件：",
        "isTrue": "是",
        "isFalse": "否",
        "filter": "篩選",
        "clear": "清空",
        "and": "並且",
        "or": "或者",
        "selectValue": "-= 請選擇 =-",
        "operator": "運算子",
        "value": "值",
        "additionalValue": "附加值",
        "additionalOperator": "附加運算",
        "logic": "篩選邏輯",
        "cancel": "取消",
        "done": "完成",
        "into": "在"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "全選",
        "clearAll": "全部清除",
        "clear": "清除",
        "filter": "篩選",
        "search": "搜索",
        "cancel": "取消",
        "selectedItemsFormat": "已選擇 {0} 條資料",
        "done": "完成",
        "into": "在"
      });
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "新增子任務",
          "append": "新增任務",
          "insertAfter": "插入到後面",
          "insertBefore": "插入到前面",
          "pdf": "匯出 PDF"
        },
        "cancel": "取消",
        "deleteDependencyWindowTitle": "刪除從屬任務",
        "deleteDependencyConfirmation": "你確定要刪除這項從屬任務嗎？",
        "deleteTaskWindowTitle": "刪除任務",
        "deleteTaskConfirmation": "你確定要刪除這項任務嗎？",
        "destroy": "刪除",
        "editor": {
          "assignButton": "資源配置",
          "editorTitle": "編輯任務",
          "end": "結束時間",
          "percentComplete": "完成進度",
          "resources": "資源",
          "resourcesEditorTitle": "資源編輯",
          "resourcesHeader": "資源名稱",
          "start": "開始時間",
          "title": "任務標題",
          "unitsHeader": "百分比"
        },
        "save": "保存",
        "views": {
          "day": "日視圖",
          "end": "任務結束",
          "month": "月視圖",
          "start": "任務開始",
          "week": "周視圖",
          "year": "年視圖"
        }
      });
  }

  /* GanttTimeline messages */

  if (kendo.ui.GanttTimeline) {
    kendo.ui.GanttTimeline.prototype.options.messages =
      $.extend(true, kendo.ui.GanttTimeline.prototype.options.messages, {
        "views": {
          "day": "日視圖",
          "week": "周視圖",
          "month": "月視圖",
          "year": "年視圖",
          "start": "任務開始",
          "end": "任務結束"
        }
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "cancel": "取消",
          "canceledit": "取消",
          "create": "新增",
          "destroy": "刪除",
          "edit": "編輯",
          "excel": "匯出 Excel",
          "pdf": "匯出 PDF",
          "save": "保存",
          "select": "選擇",
          "update": "更新",
          "search": "搜索..."
        },
        "editable": {
          "cancelDelete": "取消刪除",
          "confirmation": "你確定要刪除這條資料嗎？",
          "confirmDelete": "確定刪除"
        },
        "noRecords": "無相關資料",
        "expandCollapseColumnHeader": "...",
        "groupHeader": "按 Ctrl + 空格 進行分組",
        "ungroupHeader": "按 Ctrl + 空格 取消分組"
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "將欄位列名稱拖拽到此處可進行該列的分組顯示"
      });
  }

  /* NumericTextBox options */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "增加",
        "downArrowText": "減少"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "暫停",
        "play": "播放",
        "mute": "靜音",
        "unmute": "取消靜音",
        "quality": "畫質",
        "fullscreen": "全屏"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "全部",
        "display": "{0} - {1} 條　共 {2} 條數據",
        "empty": "無相關資料",
        "page": "轉到第",
        "of": "頁　共 {0} 頁",
        "itemsPerPage": "條每頁",
        "first": "首頁",
        "previous": "上一頁",
        "next": "下一頁",
        "last": "末頁",
        "refresh": "刷新",
        "morePages": "更多..."
      });
  }

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "全部",
        "display": "{0} - {1} 條　共 {2} 條數據",
        "empty": "無相關資料",
        "page": "轉到第",
        "of": "頁　共 {0} 頁",
        "itemsPerPage": "條每頁",
        "first": "首頁",
        "previous": "上一頁",
        "next": "下一頁",
        "last": "末頁",
        "refresh": "刷新",
        "morePages": "更多..."
      });
  }

  /* PivotGrid messages */

  if (kendo.ui.PivotGrid) {
    kendo.ui.PivotGrid.prototype.options.messages =
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "拖拽值欄位到此處",
        "columnFields": "拖拽列欄位到此處",
        "rowFields": "拖拽行欄位到此處"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "篩選條件：",
        "sortAscending": "昇冪排列",
        "sortDescending": "降冪排列",
        "filterFields": "欄位篩選",
        "filter": "篩選",
        "include": "包含欄位...",
        "title": "包含的欄位",
        "clear": "清空",
        "ok": "確定",
        "cancel": "取消",
        "operators": {
          "contains": "包含",
          "doesnotcontain": "不含",
          "startswith": "開頭是",
          "endswith": "結尾是",
          "eq": "等於",
          "neq": "不等於"
        }
      });
  }

  /* PivotSettingTarget messages */

  if (kendo.ui.PivotSettingTarget) {
    kendo.ui.PivotSettingTarget.prototype.options.messages =
      $.extend(true, kendo.ui.PivotSettingTarget.prototype.options.messages, {
        "empty": "拖拽欄位到此處"
      });
  }

  /* PivotConfigurator messages */

  if (kendo.ui.PivotConfigurator) {
    kendo.ui.PivotConfigurator.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfigurator.prototype.options.messages, {
        "measures": "拖拽值欄位到此處",
        "columns": "拖拽列欄位到此處",
        "rows": "拖拽行欄位到此處",
        "measuresLabel": "值",
        "columnsLabel": "列",
        "rowsLabel": "行",
        "fieldsLabel": "欄位"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "recurrenceEditorTitle": "週期類型事件編輯",
        "frequencies": {
          "never": "從不",
          "hourly": "每小時",
          "daily": "每天",
          "weekly": "每週",
          "monthly": "每月",
          "yearly": "每年"
        },
        "hourly": {
          "repeatEvery": "週期",
          "interval": " 小時"
        },
        "daily": {
          "repeatEvery": "週期",
          "interval": " 天"
        },
        "weekly": {
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 周"
        },
        "monthly": {
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 月",
          "day": "幾號 "
        },
        "yearly": {
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 年",
          "of": " 在 "
        },
        "end": {
          "label": "截止",
          "mobileLabel": "截止",
          "never": "從不",
          "after": "重複 ",
          "occurrence": " 次後",
          "on": "止於 "
        },
        "offsetPositions": {
          "first": "第一",
          "second": "第二",
          "third": "第三",
          "fourth": "第四",
          "last": "最後一"
        },
        "weekdays": {
          "day": "天",
          "weekday": "工作日",
          "weekend": "週末"
        }
      });
  }

  /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
        "recurrenceEditorTitle": "週期類型事件編輯",
        "cancel": "取消",
        "update": "保存",
        "endTitle": "週期截止",
        "repeatTitle": "週期模式",
        "headerTitle": "週期事件",
        "frequencies": {
          "never": "從不",
          "hourly": "每小時",
          "daily": "每天",
          "weekly": "每週",
          "monthly": "每月",
          "yearly": "每年"
        },
        "hourly": {
          "repeatEvery": "週期",
          "interval": " 小時"
        },
        "daily": {
          "repeatEvery": "週期",
          "interval": " 天"
        },
        "weekly": {
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 周"
        },
        "monthly": {
          "repeatBy": "重複到：",
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 月",
          "dayOfMonth": "幾號",
          "dayOfWeek": "周幾",
          "every": "每",
          "day": "幾號 "
        },
        "yearly": {
          "repeatBy": "重複到：",
          "repeatEvery": "週期",
          "repeatOn": "重複於",
          "interval": " 年",
          "dayOfMonth": "幾號",
          "dayOfWeek": "周幾",
          "every": "每",
          "month": "月",
          "day": "天",
          "of": " 在 "
        },
        "end": {
          "patterns": {
            "never": "從不",
            "after": "重複 ",
            "on": "止於 "
          },
          "label": "截止",
          "mobileLabel": "截止",
          "never": "從不",
          "after": "重複 ",
          "occurrence": " 次後",
          "on": "止於 "
        },
        "offsetPositions": {
          "first": "第一",
          "second": "第二",
          "third": "第三",
          "fourth": "第四",
          "last": "最後一"
        },
        "weekdays": {
          "day": "天",
          "weekday": "工作日",
          "weekend": "週末"
        }
      });
  }

  /* TimezoneEditor options */

  if (kendo.ui.TimezoneEditor) {
    kendo.ui.TimezoneEditor.prototype.options =
      $.extend(true, kendo.ui.TimezoneEditor.prototype.options, {
        "optionLabel": "無時區"
      });
  }

  /* MobileTimezoneEditor options */

  if (kendo.ui.MobileTimezoneEditor) {
    kendo.ui.MobileTimezoneEditor.prototype.options =
      $.extend(true, kendo.ui.MobileTimezoneEditor.prototype.options, {
        "optionLabel": "無時區"
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "全天",
        "date": "日期",
        "event": "事件",
        "time": "時間",
        "showFullDay": "顯示全天",
        "showWorkDay": "顯示工作時間",
        "today": "今天",
        "pdf": "匯出 PDF",
        "save": "保存",
        "cancel": "取消",
        "destroy": "刪除",
        "resetSeries": "重置週期事件",
        "deleteWindowTitle": "刪除事件",
        "next": "往後",
        "previous": "往前",
        "ariaSlotLabel": "從 {0:t} 到 {1:t} 的選擇",
        "ariaEventLabel": "在 {1:D} {2:t} 的 {0}",
        "editable": {
          "confirmation": "你確定要刪除這個事件嗎？"
        },
        "views": {
          "day": "日視圖",
          "week": "周視圖",
          "workWeek": "工作日視圖",
          "agenda": "列表視圖",
          "month": "月視圖",
          "timeline": "時間線",
          "timelineWeek": "時間線周視圖",
          "timelineWorkWeek": "時間線工作日視圖",
          "timelineMonth": "時間線月視圖"
        },
        "recurrenceMessages": {
          "deleteWindowTitle": "刪除週期類型事件",
          "resetSeriesWindowTitle": "重置週期事件",
          "deleteWindowOccurrence": "刪除當前事件",
          "deleteWindowSeries": "刪除整個週期事件",
          "deleteRecurringConfirmation": "你確定要刪除當前事件？",
          "deleteSeriesConfirmation": "你確定要刪除整個週期事件？",
          "editWindowTitle": "編輯週期類型事件",
          "editWindowOccurrence": "編輯當前事件",
          "editWindowSeries": "編輯整個週期事件",
          "deleteRecurring": "你想僅刪除當前事件還是整個週期事件？",
          "editRecurring": "你想僅編輯當前事件還是整個週期事件？"
        },
        "editor": {
          "title": "事件標題",
          "start": "開始時間",
          "end": "結束時間",
          "allDayEvent": "全天事件",
          "description": "描述",
          "repeat": "重複",
          "timezone": "時區",
          "startTimezone": "開始時區",
          "endTimezone": "結束時區",
          "separateTimezones": "使用獨立的開始和結束時區",
          "timezoneEditorTitle": "時區設置",
          "timezoneEditorButton": "時區選擇",
          "timezoneTitle": "選擇時區",
          "noTimezone": "無時區",
          "editorTitle": "事件"
        }
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
        "allBorders": "內外框線",
        "insideBorders": "內框線",
        "insideHorizontalBorders": "橫向內框線",
        "insideVerticalBorders": "縱向內框線",
        "outsideBorders": "外框線",
        "leftBorder": "左框線",
        "topBorder": "上框線",
        "rightBorder": "右框線",
        "bottomBorder": "下框線",
        "noBorders": "無框線"
      });
  }

  /* Slider options */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "增加",
        "decreaseButtonTitle": "減少",
        "dragHandleTitle": "拖動"
      });
  }

  /* RangeSlider options */

  if (kendo.ui.RangeSlider) {
    kendo.ui.RangeSlider.prototype.options =
      $.extend(true, kendo.ui.RangeSlider.prototype.options, {
        "leftDragHandleTitle": "拖動",
        "rightDragHandleTitle": "拖動"
      });
  }

  /* ListBox messaages */

  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
        "tools": {
          "remove": "刪除",
          "moveUp": "上移",
          "moveDown": "下移",
          "transferTo": "轉移過去",
          "transferFrom": "轉移回來",
          "transferAllTo": "全部轉移過去",
          "transferAllFrom": "全部轉移回來"
        }
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "無相關資料",
        "loading": "載入中...",
        "requestFailed": "請求失敗！",
        "retry": "重試",
        "commands": {
          "edit": "編輯",
          "update": "更新",
          "canceledit": "取消",
          "create": "新增",
          "createchild": "新增子項",
          "destroy": "刪除",
          "excel": "匯出 Excel",
          "pdf": "匯出 PDF",
          "save": "保存",
          "cancel": "取消"
        }
      });
  }

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "載入中...",
        "requestFailed": "請求失敗！",
        "retry": "重試"
      });
  }

  /* PanelBar messages */

  if (kendo.ui.PanelBar) {
    kendo.ui.PanelBar.prototype.options.messages =
      $.extend(true, kendo.ui.PanelBar.prototype.options.messages, {
        "loading": "載入中...",
        "requestFailed": "請求失敗！",
        "retry": "重試"
      });
  }

  /* Upload localization */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "選擇檔",
        "cancel": "取消",
        "retry": "重試",
        "remove": "移除",
        "pause": "暫停",
        "resume": "恢復",
        "clearSelectedFiles": "清空",
        "uploadSelectedFiles": "上傳",
        "dropFilesHere": "將文件拖拽到此處上傳",
        "invalidFiles": "檔不符合要求！",
        "statusUploading": "上傳中...",
        "statusUploaded": "上傳成功！",
        "statusWarning": "上傳警告！",
        "statusFailed": "上傳失敗！",
        "headerStatusUploading": "上傳中...",
        "headerStatusPaused": "上傳暫停",
        "headerStatusUploaded": "上傳完成！",
        "invalidMaxFileSize": "文件太大！",
        "invalidMinFileSize": "文件太小！",
        "invalidFileExtension": "不支持的檔案格式！"
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} 是必填項！",
        "pattern": "{0} 的格式不正確！",
        "min": "{0} 必須大於或等於 {1} ！",
        "max": "{0} 必須小於或等於 {1} ！",
        "step": "{0} 不是正確的步進值！",
        "email": "{0} 不是正確的電子郵件格式！",
        "url": "{0} 不是正確的網址格式！",
        "date": "{0} 不是正確的日期格式！",
        "dateCompare": "結束日期必須晚於或等於開始日期！"
      });
  }

  /* Progress messages */

  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        "loading": "載入中..."
      });
  }

  /* VirtualList options */

  if (kendo.ui.VirtualList) {
    kendo.ui.VirtualList.prototype.options =
      $.extend(true, kendo.ui.VirtualList.prototype.options, {
        "placeholderTemplate": "載入中..."
      });
  }

  /* Dialog messages */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.messages, {
        "close": "關閉"
      });
  }

  /* Calendar messages */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "weekColumnHeader": "週"
      });
  }

  /* MultiViewCalendar messages */

  if (kendo.ui.MultiViewCalendar) {
    kendo.ui.MultiViewCalendar.prototype.options.messages =
      $.extend(true, kendo.ui.MultiViewCalendar.prototype.options.messages, {
        "weekColumnHeader": "週"
      });
  }

  /* Alert messages */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.messages =
      $.extend(true, kendo.ui.Alert.prototype.options.messages, {
        "okText": "確定",
        "cancel": "取消",
        "promptInput": "輸入"
      });
  }

  /* Confirm messages */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.messages =
      $.extend(true, kendo.ui.Confirm.prototype.options.messages, {
        "okText": "確定",
        "cancel": "取消",
        "promptInput": "輸入"
      });
  }

  /* Prompt messages */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.messages =
      $.extend(true, kendo.ui.Prompt.prototype.options.messages, {
        "okText": "確定",
        "cancel": "取消",
        "promptInput": "輸入"
      });
  }

  /* DateInput messages */

  if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
      $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "年",
        "month": "月",
        "day": "日",
        "weekday": "星期",
        "hour": "時",
        "minute": "分",
        "second": "秒",
        "dayperiod": "上午/下午"
      });
  }

  /* DropDownTree messages */

  if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空",
        "deleteTag": "刪除",
        "singleTag": "項已選擇"
      });
  }

  /* Chat messages */

  if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
      $.extend(true, kendo.ui.Chat.prototype.options.messages, {
        "placeholder": "請輸入..."
      });
  }

  /* Switch messages */

  if (kendo.ui.Switch) {
    kendo.ui.Switch.prototype.options.messages =
      $.extend(true, kendo.ui.Switch.prototype.options.messages, {
        "checked": "開",
        "unchecked": "關"
      });
  }

  /* List messages */

  if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
      $.extend(true, kendo.ui.List.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* SelectBox messages */

  if (kendo.ui.SelectBox) {
    kendo.ui.SelectBox.prototype.options.messages =
      $.extend(true, kendo.ui.SelectBox.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* AutoComplete messages */

  if (kendo.ui.AutoComplete) {
    kendo.ui.AutoComplete.prototype.options.messages =
      $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* DropDownList messages */

  if (kendo.ui.DropDownList) {
    kendo.ui.DropDownList.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownList.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* ComboBox messages */

  if (kendo.ui.ComboBox) {
    kendo.ui.ComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.ComboBox.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* MultiColumnComboBox messages */

  if (kendo.ui.MultiColumnComboBox) {
    kendo.ui.MultiColumnComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空"
      });
  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
      $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
        "noData": "無相關資料",
        "clear": "清空",
        "deleteTag": "刪除",
        "singleTag": "項已選擇"
      });
  }

  /* PDFViewer messages */

  if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
      $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        "defaultFileName": "PDF 文檔",
        "toolbar": {
          "zoom": {
            "zoomOut": "縮小",
            "zoomIn": "放大",
            "actualWidth": "實際寬度",
            "autoWidth": "自動寬度",
            "fitToWidth": "適應寬度",
            "fitToPage": "適應頁面"
          },
          "open": "打開",
          "exportAs": "匯出",
          "download": "下載",
          "pager": {
            "first": "首頁",
            "previous": "上一頁",
            "next": "下一頁",
            "last": "末頁",
            "of": "頁　共 {0} 頁",
            "page": "轉到第",
            "pages": "頁"
          },
          "print": "列印",
          "toggleSelection": "啟用選擇",
          "togglePan": "啟用平移",
          "search": "搜索"
        },
        "errorMessages": {
          "notSupported": "只支援 PDF 檔！",
          "parseError": "無法處理 PDF 文件！",
          "notFound": "找不到檔！"
        },
        "dialogs": {
          "exportAsDialog": {
            "title": "匯出...",
            "defaultFileName": "PDF 文檔",
            "pdf": "可擕式文檔格式(.pdf)",
            "png": "可擕式網路圖形(.png)",
            "svg": "可縮放向量圖形(.svg)",
            "labels": {
              "fileName": "檔案名",
              "saveAsType": "另存為",
              "page": "頁"
            }
          },
          "okText": "確定",
          "save": "保存",
          "cancel": "取消",
          "search": {
            "inputLabel": "關鍵字",
            "matchCase": "匹配大小寫",
            "next": "下一個匹配",
            "previous": "上一個匹配",
            "close": "關閉",
            "of": " / "
          }
        }
      });
  }

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {

      kendo.ui.ColorGradient.prototype.options.messages =
          $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
              "contrastRatio": "對比度：",
              "fail": "失敗",
              "pass": "通過",
              "hex": "HEX",
              "toggleFormat": "切換格式",
              "red": "紅",
              "green": "綠",
              "blue": "藍",
              "alpha": "透明度"
          });

  }

  /* FileManager messages */

  if (kendo.ui.FileManager) {

      kendo.ui.FileManager.prototype.options.messages =
          $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
              "toolbar": {
                  "createFolder": "新增資料夾",
                  "upload": "上傳",
                  "sortDirection": "排序方向",
                  "sortDirectionAsc": "遞增",
                  "sortDirectionDesc": "遞減",
                  "sortField": "排序欄位",
                  "nameField": "名稱",
                  "sizeField": "大小",
                  "typeField": "類型",
                  "dateModifiedField": "修改日期",
                  "dateCreatedField": "建立日期",
                  "listView": "清單檢視",
                  "gridView": "格狀檢視",
                  "search": "搜尋",
                  "details": "詳細資料",
                  "detailsChecked": "是",
                  "detailsUnchecked": "否",
                  "Delete": "刪除",
                  "Rename": "重新命名"
              },
              "views": {
                  "nameField": "名稱",
                  "sizeField": "大小",
                  "typeField": "類型",
                  "dateModifiedField": "修改日期",
                  "dateCreatedField": "建立日期",
                  "items": "項目"
              },
              "dialogs": {
                  "upload": {
                      "title": "上傳檔案",
                      "clear": "清除",
                      "done": "完成"
                  },
                  "moveConfirm": {
                      "title": " ",
                      "content": "<p class='k-text-center'>要移動還是複製所選檔案？</p>",
                      "okText": "複製",
                      "cancel": "移動",
                      "close": "關閉"
                  },
                  "deleteConfirm": {
                      "title": "確認刪除",
                      "content": "<p class='k-text-center'>確定要刪除所選檔案嗎？<br/>此操作無法復原。</p>",
                      "okText": "刪除",
                      "cancel": "取消",
                      "close": "關閉"
                  },
                  "renamePrompt": {
                      "title": "重新命名",
                      "content": "<p class='k-text-center'>請輸入新的檔案名稱</p>",
                      "okText": "重新命名",
                      "cancel": "取消",
                      "close": "關閉"
                  }
              },
              "previewPane": {
                  "noFileSelected": "未選擇檔案",
                  "extension": "類型",
                  "size": "大小",
                  "created": "建立日期",
                  "createdUtc": "建立日期 (UTC)",
                  "modified": "修改日期",
                  "modifiedUtc": "修改日期 (UTC)",
                  "items": "項目"
              }
          });

  }

  /* FilterCell operators */

  /* FilterCell operators */

  if (kendo.ui.FilterCell) {

      kendo.ui.FilterCell.prototype.options.operators =
          $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
              "string": {
                  "contains": "包含",
                  "startswith": "開頭是",
                  "eq": "等於",
                  "neq": "不等於",
                  "doesnotcontain": "不包含",
                  "endswith": "結尾是",
                  "isnull": "為空",
                  "isnotnull": "不為空",
                  "isempty": "為空值",
                  "isnotempty": "不為空值",
                  "isnullorempty": "有值",
                  "isnotnullorempty": "沒有值"
              },
              "number": {
                  "eq": "等於",
                  "neq": "不等於",
                  "gte": "大於或等於",
                  "gt": "大於",
                  "lte": "小於或等於",
                  "lt": "小於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              },
              "date": {
                  "eq": "等於",
                  "neq": "不等於",
                  "gte": "晚於或等於",
                  "gt": "晚於",
                  "lte": "早於或等於",
                  "lt": "早於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              },
              "enums": {
                  "eq": "等於",
                  "neq": "不等於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              }
          });

  }

  /* FilterMenu operator messages */

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {

      kendo.ui.FilterMenu.prototype.options.operators =
          $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
              "string": {
                  "contains": "包含",
                  "startswith": "開頭是",
                  "eq": "等於",
                  "neq": "不等於",
                  "doesnotcontain": "不包含",
                  "endswith": "結尾是",
                  "isnull": "為空",
                  "isnotnull": "不為空",
                  "isempty": "為空值",
                  "isnotempty": "不為空值",
                  "isnullorempty": "有值",
                  "isnotnullorempty": "沒有值"
              },
              "number": {
                  "eq": "等於",
                  "neq": "不等於",
                  "gte": "大於或等於",
                  "gt": "大於",
                  "lte": "小於或等於",
                  "lt": "小於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              },
              "date": {
                  "eq": "等於",
                  "neq": "不等於",
                  "gte": "晚於或等於",
                  "gt": "晚於",
                  "lte": "早於或等於",
                  "lt": "早於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              },
              "enums": {
                  "eq": "等於",
                  "neq": "不等於",
                  "isnull": "為空",
                  "isnotnull": "不為空"
              }
          });

  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {

      kendo.ui.TaskBoard.prototype.options.messages =
          $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
              "edit": "編輯",
              "createNewCard": "新增卡片",
              "create": "建立",
              "search": "搜尋",
              "previewCard": "預覽卡片",
              "addCard": "新增卡片",
              "editCard": "編輯卡片",
              "deleteCard": "刪除卡片",
              "addColumn": "新增欄",
              "editColumn": "編輯欄",
              "deleteColumn": "刪除欄",
              "close": "關閉",
              "cancel": "取消",
              "delete": "刪除",
              "saveChanges": "儲存變更",
              "title": "標題：",
              "description": "描述：",
              "newColumn": "新欄",
              "deleteColumnConfirm": "確定要刪除此欄嗎？",
              "deleteCardConfirm": "確定要刪除此卡片嗎？"
          });

  }

  /* NumericTextBox messages */

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {

      kendo.ui.NumericTextBox.prototype.options =
          $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
              "upArrowText": "增加值",
              "downArrowText": "減少值"
          });

  }

  /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {

      kendo.ui.PivotConfiguratorV2.prototype.options.messages =
          $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
              "title": "設定",
              "cancelButtonText": "取消",
              "applyButtonText": "套用",
              "measures": "選擇一些欄位以開始設定",
              "columns": "選擇一些欄位以開始設定",
              "rows": "選擇一些欄位以開始設定"
          });

  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {

      kendo.ui.PivotFieldMenuV2.prototype.options.messages =
          $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
              "apply": "套用",
              "sortAscending": "遞增排序",
              "sortDescending": "遞減排序",
              "filterFields": "欄位篩選",
              "filter": "篩選",
              "include": "包含欄位...",
              "clear": "清除",
              "reset": "重設",
              "moveToColumns": "移至欄",
              "moveToRows": "移至列",
              "movePrevious": "前移",
              "moveNext": "後移",
              "filterOperatorsDropDownLabel": "區域篩選運算子",
              "filterValueTextBoxLabel": "區域篩選值",
              "operators": {
                  "contains": "包含",
                  "doesnotcontain": "不包含",
                  "startswith": "開頭是",
                  "endswith": "結尾是",
                  "eq": "等於",
                  "neq": "不等於"
              }
          });

  }

  /* Slider messages */

  /* Slider messages */

  if (kendo.ui.Slider) {

      kendo.ui.Slider.prototype.options =
          $.extend(true, kendo.ui.Slider.prototype.options, {
              "increaseButtonTitle": "增加",
              "decreaseButtonTitle": "減少",
              "dragHandleTitle": "拖曳"
          });

  }

  /* ListBox messaages */

  /* ListBox messaages */

  if (kendo.ui.ListBox) {

      kendo.ui.ListBox.prototype.options.messages =
          $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
              "tools": {
                  "remove": "刪除",
                  "moveUp": "上移",
                  "moveDown": "下移",
                  "transferTo": "轉移至",
                  "transferFrom": "轉移自",
                  "transferAllTo": "全部轉移至",
                  "transferAllFrom": "全部轉移自"
              }
          });

  }

  /* Upload messages */

  if (kendo.ui.Upload) {

      kendo.ui.Upload.prototype.options.localization =
          $.extend(true, kendo.ui.Upload.prototype.options.localization, {
              "select": "選擇檔案...",
              "cancel": "取消",
              "retry": "重試",
              "remove": "移除",
              "clearSelectedFiles": "清除",
              "uploadSelectedFiles": "上傳",
              "dropFilesHere": "將檔案拖放到此處上傳",
              "statusUploading": "上傳中",
              "statusUploaded": "已上傳",
              "statusWarning": "警告",
              "statusFailed": "失敗",
              "headerStatusUploading": "上傳中...",
              "headerStatusUploaded": "完成",
              "headerStatusPaused": "已暫停"
          });

  }

  /* kendo.ui.progress method */

  if (kendo.ui.progress) {

      kendo.ui.progress.messages =
          $.extend(true, kendo.ui.progress.messages, {
              "loading": "載入中..."
          });

  }

  /* Dialog */

  if (kendo.ui.Dialog) {

      kendo.ui.Dialog.prototype.options.messages =
          $.extend(true, kendo.ui.Dialog.prototype.options.messages, {
              "close": "關閉"
          });

  }

  /* TimePicker */

  /* TimePicker */

  if (kendo.ui.TimePicker) {

      kendo.ui.TimePicker.prototype.options.messages =
          $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
              "set": "設定",
              "cancel": "取消",
              "hour": "小時",
              "minute": "分鐘",
              "second": "秒",
              "millisecond": "毫秒",
              "now": "現在"
          });

  }

  /* DateTimePicker */

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {

      kendo.ui.DateTimePicker.prototype.options.messages =
          $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
              "set": "設定",
              "cancel": "取消",
              "hour": "小時",
              "minute": "分鐘",
              "second": "秒",
              "millisecond": "毫秒",
              "now": "現在",
              "date": "日期",
              "time": "時間",
              "today": "今天",
              "weekColumnHeader": ""
          });

  }

  /* Calendar */

  /* Calendar */

  if (kendo.ui.Calendar) {

      kendo.ui.Calendar.prototype.options.messages =
          $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
              "weekColumnHeader": "",
              "today": "今天",
              "navigateTo": "瀏覽至: ",
              "parentViews": {
                  "month": "年檢視",
                  "year": "十年檢視",
                  "decade": "世紀檢視"
              }
          });

  }

  /* Alert */

  if (kendo.ui.Alert) {

      kendo.ui.Alert.prototype.options.messages =
          $.extend(true, kendo.ui.Alert.prototype.options.messages, {
              "okText": "確定"
          });

  }

  /* Confirm */

  if (kendo.ui.Confirm) {

      kendo.ui.Confirm.prototype.options.messages =
          $.extend(true, kendo.ui.Confirm.prototype.options.messages, {
              "okText": "確定",
              "cancel": "取消"
          });

  }

  /* Prompt */

  if (kendo.ui.Prompt) {

      kendo.ui.Prompt.prototype.options.messages =
          $.extend(true, kendo.ui.Prompt.prototype.options.messages, {
              "okText": "確定",
              "cancel": "取消"
          });

  }

  /* DateInput */

  /* DateInput */

  if (kendo.ui.DateInput) {

      kendo.ui.DateInput.prototype.options.messages =
          $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
              "year": "年",
              "month": "月",
              "day": "日",
              "weekday": "星期",
              "hour": "時",
              "minute": "分",
              "second": "秒",
              "dayperiod": "上午/下午"
          });

  }

  /* Wizard messages */

  if (kendo.ui.Wizard) {

      kendo.ui.Wizard.prototype.options.messages =
          $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
              "reset": "重設",
              "previous": "上一步",
              "next": "下一步",
              "done": "完成",
              "step": "步驟",
              "of": "/"
          });

  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {

      kendo.ui.Captcha.prototype.options.messages =
          $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
              "reset": "重新產生驗證碼",
              "audio": "播放驗證碼音訊",
              "imageAlt": "輸入驗證碼圖片中的文字",
              "success": "驗證成功"
          });

  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {

      kendo.ui.OrgChart.prototype.options.messages =
          $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
              "label": "組織架構圖",
              "edit": "編輯",
              "create": "建立",
              "destroy": "刪除",
              "destroyContent": "確定要刪除此項及其子項嗎？",
              "destroyTitle": "刪除項目",
              "cancel": "取消",
              "save": "儲存",
              "menuLabel": "編輯選單",
              "uploadAvatar": "上傳新頭像",
              "parent": "上級",
              "name": "名稱",
              "title": "職位",
              "none": "--無--",
              "expand": "展開",
              "collapse": "摺疊"
          });

  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {

      kendo.dataviz.ui.Map.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
              "tileTitle": "地圖標題"
          });

  }

  /* Sankey messages */

  if (kendo.dataviz.ui.Sankey) {

      kendo.dataviz.ui.Sankey.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
              "tooltipUnits": "{0} 個單位"
          });

  }

  /* Chart messages */

  if (kendo.dataviz.ui.Chart) {

      kendo.dataviz.ui.Chart.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
              "noData": "沒有可用資料"
          });

  }

})(window.kendo.jQuery);