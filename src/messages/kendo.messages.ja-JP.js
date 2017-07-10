(function ($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "適用",
  "cancel": "キャンセル"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "適用",
  "cancel": "キャンセル"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "昇順に並べ替え",
  "sortDescending": "降順に並べ替え",
  "filter": "フィルタ",
  "columns": "列",
  "done": "完了",
  "settings": "列の設定",
  "lock": "ロック",
  "unlock": "ロック解除"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "太字",
  "italic": "斜体",
  "underline": "下線",
  "strikethrough": "取り消し線",
  "superscript": "上付き文字",
  "subscript": "下付き文字",
  "justifyCenter": "テキストを中央揃え",
  "justifyLeft": "テキストを左揃え",
  "justifyRight": "テキストを右揃え",
  "justifyFull": "両端揃え",
  "insertUnorderedList": "順序付けされていないリストを挿入",
  "insertOrderedList": "順序付けされたリストを挿入",
  "indent": "インデント",
  "outdent": "インデント解除",
  "createLink": "ハイパーリンクを挿入",
  "unlink": "ハイパーリンクを削除",
  "insertImage": "イメージを挿入",
  "insertFile": "ファイルを挿入",
  "insertHtml": "HTML を挿入",
  "viewHtml": "HTML を表示",
  "fontName": "フォント ファミリを選択",
  "fontNameInherit": "(継承されたフォント)",
  "fontSize": "フォント サイズを選択",
  "fontSizeInherit": "(継承されたサイズ)",
  "formatBlock": "フォーマット",
  "formatting": "フォーマット",
  "foreColor": "カラー",
  "backColor": "背景色",
  "style": "スタイル",
  "emptyFolder": "空のフォルダ",
  "uploadFile": "アップロード",
  "orderBy": "次の要素による整列:",
  "orderBySize": "サイズ",
  "orderByName": "名",
  "invalidFileType": "選択されたファイル {0} は無効です。サポートされているファイル タイプは {1} です。",
  "deleteFile": "{0} を本当に削除しますか?",
  "overwriteFile": "{0} という名前のファイルは既にカレント ディレクトリに存在します。上書きしますか?",
  "directoryNotFound": "この名前のディレクトリが見つかりませんでした。",
  "imageWebAddress": "Web アドレス",
  "imageAltText": "代替テキスト",
  "imageWidth": "幅 (px)",
  "imageHeight": "高さ (px)",
  "fileWebAddress": "Web アドレス",
  "fileTitle": "タイトル",
  "linkWebAddress": "Web アドレス",
  "linkText": "テキスト",
  "linkToolTip": "ツールチップ",
  "linkOpenInNewWindow": "リンクを新規ウィンドウで開く",
  "dialogUpdate": "更新",
  "dialogInsert": "挿入",
  "dialogButtonSeparator": "または",
  "dialogCancel": "キャンセル",
  "createTable": "テーブルの作成",
  "addColumnLeft": "左に列を追加",
  "addColumnRight": "右に列を追加",
  "addRowAbove": "上に行を追加",
  "addRowBelow": "下に行を追加",
  "deleteRow": "行を削除",
  "deleteColumn": "列を削除"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "アップロード",
  "orderBy": "次の要素による整列",
  "orderByName": "名",
  "orderBySize": "サイズ",
  "directoryNotFound": "この名前のディレクトリは見つかりませんでした。",
  "emptyFolder": "空のフォルダ",
  "deleteFile": "{0} を本当に削除しますか?",
  "invalidFileType": "選択されたファイル {0} は無効です。サポートされているファイル タイプは {1} です。",
  "overwriteFile": "{0} という名前のファイルは既にカレント ディレクトリに存在します。上書きしますか?",
  "dropFilesHere": "ここにファイルをドロップしてアップロード",
  "search": "検索"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "真である",
  "isFalse": "偽である",
  "filter": "フィルタ",
  "clear": "クリア",
  "operator": "演算子"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "startswith": "が次で始まる",
    "contains": "が次を含む",
    "doesnotcontain": "が次を含まない",
    "endswith": "が次で終わる"
  },
  "number": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "gte": "が次の値以上",
    "gt": "が次の値より大きい",
    "lte": "が次の値以下",
    "lt": "が次の値より小さい"
  },
  "date": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "gte": "次の値と同じかそれより後",
    "gt": "次の値より後",
    "lte": "次の値と同じかそれより前",
    "lt": "次の値より前"
  },
  "enums": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "次の値がある項目を表示:",
  "isTrue": "真である",
  "isFalse": "偽である",
  "filter": "フィルタ",
  "clear": "クリア",
  "and": "And",
  "or": "Or",
  "selectValue": "-値を選択-",
  "operator": "演算子",
  "value": "値",
  "cancel": "キャンセル"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "startswith": "が次で始まる",
    "contains": "が次を含む",
    "doesnotcontain": "が次を含まない",
    "endswith": "が次で終わる"
  },
  "number": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "gte": "が次の値以上",
    "gt": "が次の値より大きい",
    "lte": "が次の値以下",
    "lt": "が次の値より小さい"
  },
  "date": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる",
    "gte": "次の値と同じかそれより後",
    "gt": "次の値より後",
    "lte": "次の値と同じかそれより前",
    "lt": "次の値より前"
  },
  "enums": {
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "検索"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "子の追加",
    "append": "タスクの追加",
    "insertAfter": "下に追加",
    "insertBefore": "上に追加",
    "pdf": "PDF にエクスポート"
  },
  "cancel": "キャンセル",
  "deleteDependencyWindowTitle": "依存関係を削除",
  "deleteTaskWindowTitle": "タスクを削除",
  "destroy": "削除",
  "editor": {
    "assingButton": "割り当て",
    "editorTitle": "タスク",
    "end": "終点",
    "percentComplete": "完了",
    "resources": "リソース",
    "resourcesEditorTitle": "リソース",
    "resourcesHeader": "リソース",
    "start": "始点",
    "title": "タイトル",
    "unitsHeader": "単位"
  },
  "save": "保存",
  "views": {
    "day": "日",
    "end": "終点",
    "month": "月",
    "start": "始点",
    "week": "週",
    "year": "年"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "変更のキャンセル",
    "canceledit": "キャンセル",
    "create": "新規レコードを追加",
    "destroy": "削除",
    "edit": "編集",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "変更の保存",
    "select": "選択",
    "update": "更新"
  },
  "editable": {
    "cancelDelete": "キャンセル",
    "confirmation": "このレコードを本当に削除しますか?",
    "confirmDelete": "削除"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "列ヘッダーをここにドラッグ アンド ドロップして、その列でグループ化"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "値を増やす",
  "downArrowText": "値を減らす"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} ({2} 項目中)",
  "empty": "表示する項目がありません",
  "page": "ページ",
  "of": "/ {0}",
  "itemsPerPage": "項目 (1 ページあたり)",
  "first": "最初のページに移動",
  "previous": "前のページに移動",
  "next": "次のページに移動",
  "last": "最後のページに移動",
  "refresh": "更新",
  "morePages": "その他のページ"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "ここにデータ フィールドをドロップ",
  "columnFields": "ここに列フィールドをドロップ",
  "rowFields": "ここに行フィールドをドロップ"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "次の値がある項目を表示:",
  "filterFields": "フィールド フィルタ",
  "filter": "フィルタ",
  "include": "フィールドをインクルード...",
  "title": "インクルードするフィールド",
  "clear": "クリア",
  "ok": "OK",
  "cancel": "キャンセル",
  "operators": {
    "contains": "が次を含む",
    "doesnotcontain": "が次を含まない",
    "startswith": "が次で始まる",
    "endswith": "が次で終わる",
    "eq": "が次の値と同じ",
    "neq": "が次の値と異なる"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "なし",
    "hourly": "毎時",
    "daily": "毎日",
    "weekly": "毎週",
    "monthly": "毎月",
    "yearly": "毎年"
  },
  "hourly": {
    "repeatEvery": "次の間隔で繰り返す: ",
    "interval": " 時間"
  },
  "daily": {
    "repeatEvery": "次の間隔で繰り返す: ",
    "interval": " 日"
  },
  "weekly": {
    "interval": " 週間",
    "repeatEvery": "次の間隔で繰り返す: ",
    "repeatOn": "次のときに繰り返す: "
  },
  "monthly": {
    "repeatEvery": "次の間隔で繰り返す: ",
    "repeatOn": "次のときに繰り返す: ",
    "interval": " か月",
    "day": "日 "
  },
  "yearly": {
    "repeatEvery": "次の間隔で繰り返す: ",
    "repeatOn": "次のときに繰り返す: ",
    "interval": " 年",
    "of": " の "
  },
  "end": {
    "label": "終了:",
    "mobileLabel": "終了",
    "never": "なし",
    "after": "後 ",
    "occurrence": " 回",
    "on": "オン "
  },
  "offsetPositions": {
    "first": "最初",
    "second": "2 番目",
    "third": "3 番目",
    "fourth": "4 番目",
    "last": "最後"
  },
  "weekdays": {
    "day": "日",
    "weekday": "平日",
    "weekend": "週末"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "すべての日",
  "date": "日付",
  "event": "イベント",
  "time": "時間",
  "showFullDay": "24 時間表示",
  "showWorkDay": "営業時間を表示",
  "today": "今日",
  "save": "保存",
  "cancel": "キャンセル",
  "destroy": "削除",
  "deleteWindowTitle": "イベントを削除",
  "ariaSlotLabel": "{0:t} ～ {1:t} 時の範囲から選択",
  "ariaEventLabel": "{0} ({1:D} 日の {2:t} 時)",
  "confirmation": "このイベントを本当に削除しますか?",
  "views": {
    "day": "日",
    "week": "週",
    "workWeek": "稼働日",
    "agenda": "予定",
    "month": "月"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "定期的な項目を削除",
    "deleteWindowOccurrence": "現在の回を削除",
    "deleteWindowSeries": "系列を削除",
    "editWindowTitle": "定期的な項目を編集",
    "editWindowOccurrence": "現在の回を編集",
    "editWindowSeries": "系列を編集",
    "deleteRecurring": "このイベントの回のみを削除しますか、それとも系列全体を削除しますか?",
    "editRecurring": "このイベントの回のみを編集しますか、それとも系列全体を編集しますか?"
  },
  "editor": {
    "title": "タイトル",
    "start": "始点",
    "end": "終点",
    "allDayEvent": "終日のイベント",
    "description": "説明",
    "repeat": "繰り返す",
    "timezone": " ",
    "startTimezone": "開始タイムゾーン",
    "endTimezone": "終了タイムゾーン",
    "separateTimezones": "開始と終了で別のタイムゾーンを使用する",
    "timezoneEditorTitle": "タイムゾーン",
    "timezoneEditorButton": "タイム ゾーン",
    "timezoneTitle": "タイム ゾーン",
    "noTimezone": "タイムゾーンがありません",
    "editorTitle": "イベント"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "増やす",
  "decreaseButtonTitle": "減らす"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "ロードしています...",
  "requestFailed": "要求を実行できませんでした。",
  "retry": "再試行"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "ファイルを選択...",
  "cancel": "キャンセル",
  "retry": "再試行",
  "remove": "削除",
  "uploadSelectedFiles": "ファイルをアップロード",
  "dropFilesHere": "ここにファイルをドロップしてアップロード",
  "statusUploading": "アップロード中",
  "statusUploaded": "アップロード済み",
  "statusWarning": "警告",
  "statusFailed": "失敗",
  "headerStatusUploading": "アップロード中...",
  "headerStatusUploaded": "完了"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} が必要です",
  "pattern": "{0} は無効です",
  "min": "{0} は {1} より大きいか同じ値にしてください",
  "max": "{0} は {1} より小さいか同じ値にしてください",
  "step": "{0} は無効です",
  "email": "{0} は無効な電子メールです",
  "url": "{0} は無効な URL です",
  "date": "{0} は無効な日付です"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "閉じる"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "オーケー"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "オーケー",
  "cancel": "キャンセル"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "オーケー",
  "cancel": "キャンセル"
});
}

})(window.kendo.jQuery);
