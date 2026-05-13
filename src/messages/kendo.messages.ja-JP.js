(function($, undefined) {

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
  "title": "次の値がある項目を表示",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
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
kendo.ui.Upload.prototype.options.localization =
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

/* ColorGradient messages */

if (kendo.ui.ColorGradient) {

    kendo.ui.ColorGradient.prototype.options.messages =
        $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
            "contrastRatio": "コントラスト比:",
            "fail": "不合格",
            "pass": "合格",
            "hex": "HEX",
            "toggleFormat": "フォーマット切替",
            "red": "赤",
            "green": "緑",
            "blue": "青",
            "alpha": "アルファ"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "開始",
            "endLabel": "終了"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "新しいフォルダー",
                "upload": "アップロード",
                "sortDirection": "並べ替え方向",
                "sortDirectionAsc": "昇順",
                "sortDirectionDesc": "降順",
                "sortField": "並べ替え",
                "nameField": "名前",
                "sizeField": "サイズ",
                "typeField": "種類",
                "dateModifiedField": "更新日",
                "dateCreatedField": "作成日",
                "listView": "リスト表示",
                "gridView": "グリッド表示",
                "search": "検索",
                "details": "詳細",
                "detailsChecked": "はい",
                "detailsUnchecked": "いいえ",
                "Delete": "削除",
                "Rename": "名前変更"
            },
            "views": {
                "nameField": "名前",
                "sizeField": "サイズ",
                "typeField": "種類",
                "dateModifiedField": "更新日",
                "dateCreatedField": "作成日",
                "items": "アイテム"
            },
            "dialogs": {
                "upload": {
                    "title": "ファイルのアップロード",
                    "clear": "クリア",
                    "done": "完了"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>選択したファイルを移動しますか、コピーしますか？</p>",
                    "okText": "コピー",
                    "cancel": "移動",
                    "close": "閉じる"
                },
                "deleteConfirm": {
                    "title": "削除の確認",
                    "content": "<p class='k-text-center'>選択したファイルを削除してもよろしいですか？<br/>この操作は取り消せません。</p>",
                    "okText": "削除",
                    "cancel": "キャンセル",
                    "close": "閉じる"
                },
                "renamePrompt": {
                    "title": "名前変更",
                    "content": "<p class='k-text-center'>新しいファイル名を入力してください</p>",
                    "okText": "名前変更",
                    "cancel": "キャンセル",
                    "close": "閉じる"
                }
            },
            "previewPane": {
                "noFileSelected": "ファイルが選択されていません",
                "extension": "種類",
                "size": "サイズ",
                "created": "作成日",
                "createdUtc": "作成日 (UTC)",
                "modified": "更新日",
                "modifiedUtc": "更新日 (UTC)",
                "items": "アイテム"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "編集",
            "createNewCard": "新しいカード",
            "create": "作成",
            "search": "検索",
            "previewCard": "カードのプレビュー",
            "addCard": "カードを追加",
            "editCard": "カードを編集",
            "deleteCard": "カードを削除",
            "addColumn": "列を追加",
            "editColumn": "列を編集",
            "deleteColumn": "列を削除",
            "close": "閉じる",
            "cancel": "キャンセル",
            "delete": "削除",
            "saveChanges": "変更を保存",
            "title": "タイトル:",
            "description": "説明:",
            "newColumn": "新しい列",
            "deleteColumnConfirm": "この列を削除してもよろしいですか？",
            "deleteCardConfirm": "このカードを削除してもよろしいですか？"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "一時停止",
            "play": "再生",
            "mute": "ミュート",
            "unmute": "ミュート解除",
            "quality": "品質",
            "fullscreen": "全画面"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "設定",
            "cancelButtonText": "キャンセル",
            "applyButtonText": "適用",
            "measures": "フィールドを選択して開始",
            "columns": "フィールドを選択して開始",
            "rows": "フィールドを選択して開始"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "適用",
            "sortAscending": "昇順",
            "sortDescending": "降順",
            "filterFields": "フィールドフィルター",
            "filter": "フィルター",
            "include": "フィールドを含む...",
            "clear": "クリア",
            "reset": "リセット",
            "moveToColumns": "列に移動",
            "moveToRows": "行に移動",
            "movePrevious": "前に移動",
            "moveNext": "次に移動",
            "filterOperatorsDropDownLabel": "フィルター演算子",
            "filterValueTextBoxLabel": "フィルター値",
            "operators": {
                "contains": "を含む",
                "doesnotcontain": "を含まない",
                "startswith": "で始まる",
                "endswith": "で終わる",
                "eq": "等しい",
                "neq": "等しくない"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "キャンセル",
            "update": "保存",
            "endTitle": "繰り返しの終了",
            "repeatTitle": "繰り返しパターン",
            "headerTitle": "イベントの繰り返し",
            "end": {
                "never": "なし",
                "after": "回数",
                "on": "日付"
            },
            "daily": {
                "interval": "日"
            },
            "weekly": {
                "interval": "週"
            },
            "monthly": {
                "interval": "月",
                "repeatBy": "繰り返し基準: ",
                "dayOfMonth": "月の日",
                "dayOfWeek": "曜日"
            },
            "yearly": {
                "interval": "年",
                "repeatBy": "繰り返し基準: ",
                "dayOfMonth": "月の日",
                "dayOfWeek": "曜日",
                "of": " の "
            },
            "endRule": {
                "after": " 回",
                "on": "日付 "
            }
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "削除",
                "moveUp": "上へ移動",
                "moveDown": "下へ移動",
                "transferTo": "転送先",
                "transferFrom": "転送元",
                "transferAllTo": "すべて転送先",
                "transferAllFrom": "すべて転送元"
            }
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "読み込み中..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "設定",
            "cancel": "キャンセル",
            "hour": "時",
            "minute": "分",
            "second": "秒",
            "millisecond": "ミリ秒",
            "now": "現在"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "設定",
            "cancel": "キャンセル",
            "hour": "時",
            "minute": "分",
            "second": "秒",
            "millisecond": "ミリ秒",
            "now": "現在",
            "date": "日付",
            "time": "時刻",
            "today": "今日",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "今日",
            "navigateTo": "移動: ",
            "parentViews": {
                "month": "年表示",
                "year": "10年表示",
                "decade": "100年表示"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "年",
            "month": "月",
            "day": "日",
            "weekday": "曜日",
            "hour": "時",
            "minute": "分",
            "second": "秒",
            "dayperiod": "午前/午後"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "クリア",
            "noData": "データがありません。"
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "クリア",
            "noData": "データがありません。",
            "singleTag": "件選択済み"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "クリア",
            "noData": "データがありません。",
            "singleTag": "件選択済み"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "メッセージを入力...",
            "toggleButton": "ツールバーの切替",
            "sendButton": "送信"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "リセット",
            "previous": "前へ",
            "next": "次へ",
            "done": "完了",
            "step": "ステップ",
            "of": "/"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "ドキュメント",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "ズームレベル",
                    "zoomOut": "縮小",
                    "zoomIn": "拡大",
                    "actualWidth": "実際の幅",
                    "autoWidth": "自動幅",
                    "fitToWidth": "幅に合わせる",
                    "fitToPage": "ページに合わせる"
                },
                "open": "開く",
                "exportAs": "エクスポート",
                "download": "ダウンロード",
                "pager": {
                    "first": "最初のページへ",
                    "previous": "前のページへ",
                    "next": "次のページへ",
                    "last": "最後のページへ",
                    "of": "/",
                    "page": "ページ",
                    "pages": "ページ"
                },
                "print": "印刷",
                "toggleSelection": "選択切替",
                "togglePan": "パン切替",
                "search": "検索"
            },
            "errorMessages": {
                "notSupported": "PDFファイルのみサポートされています。",
                "parseError": "PDFファイルを処理できませんでした。",
                "notFound": "ファイルが見つかりません。",
                "popupBlocked": "ポップアップがブラウザによりブロックされました。"
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "キャプチャを再生成",
            "audio": "キャプチャ音声を再生",
            "imageAlt": "キャプチャ画像のテキストを入力",
            "success": "検証に成功しました"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "組織図",
            "edit": "編集",
            "create": "作成",
            "destroy": "削除",
            "destroyContent": "この項目とその配下を削除してもよろしいですか？",
            "destroyTitle": "項目を削除",
            "cancel": "キャンセル",
            "save": "保存",
            "menuLabel": "編集メニュー",
            "uploadAvatar": "新しい画像をアップロード",
            "parent": "親",
            "name": "名前",
            "title": "タイトル",
            "none": "--なし--",
            "expand": "展開",
            "collapse": "折りたたみ"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "マップタイトル"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} 単位"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "利用可能なデータがありません"
        });

}

  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "表示するレコードがありません",
        "loading": "読み込み中...",
        "requestFailed": "リクエストが失敗しました。",
        "retry": "再試行",
        "commands": {
          "edit": "編集",
          "update": "保存",
          "canceledit": "キャンセル",
          "create": "新規レコード追加",
          "createchild": "子レコード追加",
          "destroy": "削除",
          "excel": "Excelにエクスポート",
          "pdf": "PDFにエクスポート"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "表示するレコードがありません",
        "loading": "読み込み中...",
        "requestFailed": "リクエストが失敗しました。",
        "retry": "再試行",
        "commands": {
          "edit": "編集",
          "update": "更新",
          "canceledit": "キャンセル",
          "create": "新規レコード追加",
          "createchild": "子レコード追加",
          "destroy": "削除",
          "excel": "Excelにエクスポート",
          "pdf": "PDFにエクスポート"
        }
      });
  }
  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "すべての罫線",
  "insideBorders": "内側の罫線",
  "insideHorizontalBorders": "内側の横罫線",
  "insideVerticalBorders": "内側の縦罫線",
  "outsideBorders": "外側の罫線",
  "leftBorder": "左罫線",
  "topBorder": "上罫線",
  "rightBorder": "右罫線",
  "bottomBorder": "下罫線",
  "noBorders": "罫線なし",
  "reset": "色をリセット",
  "customColor": "カスタム色...",
  "apply": "適用",
  "cancel": "キャンセル"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "適用",
  "save": "保存",
  "cancel": "キャンセル",
  "remove": "削除",
  "retry": "再試行",
  "revert": "元に戻す",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "書式設定",
    "categories": {
      "number": "数値",
      "currency": "通貨",
      "date": "日付"
    }
  },
  "fontFamilyDialog": {
    "title": "フォント"
  },
  "fontSizeDialog": {
    "title": "フォントサイズ"
  },
  "bordersDialog": {
    "title": "罫線"
  },
  "alignmentDialog": {
    "title": "配置",
    "buttons": {
      "justifyLeft": "左揃え",
      "justifyCenter": "中央揃え",
      "justifyRight": "右揃え",
      "justifyFull": "両端揃え",
      "alignTop": "上揃え",
      "alignMiddle": "中央揃え(縦)",
      "alignBottom": "下揃え"
    }
  },
  "mergeDialog": {
    "title": "セルの結合",
    "buttons": {
      "mergeCells": "すべて結合",
      "mergeHorizontally": "横方向に結合",
      "mergeVertically": "縦方向に結合",
      "unmerge": "結合解除"
    }
  },
  "freezeDialog": {
    "title": "ウィンドウ枠の固定",
    "buttons": {
      "freezePanes": "ウィンドウ枠を固定",
      "freezeRows": "行を固定",
      "freezeColumns": "列を固定",
      "unfreeze": "固定を解除"
    }
  },
  "confirmationDialog": {
    "text": "このシートを削除してもよろしいですか？",
    "title": "シートの削除"
  },
  "validationDialog": {
    "title": "データの入力規則",
    "hintMessage": "有効な{0}値{1}を入力してください。",
    "hintTitle": "入力規則 {0}",
    "criteria": {
      "any": "任意の値",
      "number": "数値",
      "text": "テキスト",
      "date": "日付",
      "custom": "ユーザー定義の数式",
      "list": "リスト"
    },
    "comparers": {
      "greaterThan": "より大きい",
      "lessThan": "より小さい",
      "between": "の間",
      "notBetween": "の間ではない",
      "equalTo": "等しい",
      "notEqualTo": "等しくない",
      "greaterThanOrEqualTo": "以上",
      "lessThanOrEqualTo": "以下"
    },
    "comparerMessages": {
      "greaterThan": "{0}より大きい",
      "lessThan": "{0}より小さい",
      "between": "{0}から{1}の間",
      "notBetween": "{0}から{1}の間ではない",
      "equalTo": "{0}と等しい",
      "notEqualTo": "{0}と等しくない",
      "greaterThanOrEqualTo": "{0}以上",
      "lessThanOrEqualTo": "{0}以下",
      "custom": "数式を満たす: {0}"
    },
    "labels": {
      "criteria": "条件",
      "comparer": "比較演算子",
      "min": "最小値",
      "max": "最大値",
      "value": "値",
      "start": "開始",
      "end": "終了",
      "onInvalidData": "無効なデータの場合",
      "rejectInput": "入力を拒否",
      "showWarning": "警告を表示",
      "showHint": "ヒントを表示",
      "hintTitle": "ヒントのタイトル",
      "hintMessage": "ヒントのメッセージ",
      "ignoreBlank": "空白を無視"
    },
    "placeholders": {
      "typeTitle": "タイトルを入力",
      "typeMessage": "メッセージを入力"
    }
  },
  "exportAsDialog": {
    "title": "エクスポート...",
    "labels": {
      "fileName": "ファイル名",
      "saveAsType": "ファイルの種類",
      "exportArea": "エクスポート",
      "paperSize": "用紙サイズ",
      "margins": "余白",
      "orientation": "方向",
      "print": "印刷",
      "guidelines": "ガイドライン",
      "center": "中央",
      "horizontally": "水平方向",
      "vertically": "垂直方向"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "結合されたセルの一部は変更できません。"
  },
  "useKeyboardDialog": {
    "title": "コピーと貼り付け",
    "errorMessage": "これらの操作はメニューから実行できません。代わりにキーボードショートカットを使用してください:",
    "labels": {
      "forCopy": "コピー",
      "forCut": "切り取り",
      "forPaste": "貼り付け"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "複数選択ではその操作を実行できません。"
  },
  "insertCommentDialog": {
    "title": "コメントの挿入",
    "labels": {
      "comment": "コメント",
      "removeComment": "コメントの削除"
    }
  },
  "insertImageDialog": {
    "title": "画像の挿入",
    "info": "ここに画像をドラッグするか、クリックして選択",
    "typeError": "JPEG、PNGまたはGIF画像を選択してください"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "範囲をA～Zに並べ替え",
  "sortDescending": "範囲をZ～Aに並べ替え",
  "filterByValue": "値でフィルター",
  "filterByCondition": "条件でフィルター",
  "apply": "適用",
  "search": "検索",
  "addToCurrent": "現在の選択に追加",
  "clear": "クリア",
  "blanks": "(空白)",
  "operatorNone": "なし",
  "and": "AND",
  "or": "OR",
  "operators": {
    "string": {
      "contains": "テキストを含む",
      "doesnotcontain": "テキストを含まない",
      "startswith": "テキストで始まる",
      "endswith": "テキストで終わる"
    },
    "date": {
      "eq": "日付が等しい",
      "neq": "日付が等しくない",
      "lt": "日付より前",
      "gt": "日付より後"
    },
    "number": {
      "eq": "等しい",
      "neq": "等しくない",
      "gte": "以上",
      "gt": "より大きい",
      "lte": "以下",
      "lt": "より小さい"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "色をリセット",
  "customColor": "カスタム色...",
  "apply": "適用",
  "cancel": "キャンセル"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "左に列を追加",
  "addColumnRight": "右に列を追加",
  "addRowAbove": "上に行を追加",
  "addRowBelow": "下に行を追加",
  "alignment": "配置",
  "alignmentButtons": {
    "justifyLeft": "左揃え",
    "justifyCenter": "中央揃え",
    "justifyRight": "右揃え",
    "justifyFull": "両端揃え",
    "alignTop": "上揃え",
    "alignMiddle": "中央揃え(縦)",
    "alignBottom": "下揃え"
  },
  "backgroundColor": "背景",
  "bold": "太字",
  "borders": "罫線",
  "colorPicker": {
    "reset": "色をリセット",
    "customColor": "カスタム色..."
  },
  "copy": "コピー",
  "cut": "切り取り",
  "deleteColumn": "列を削除",
  "deleteRow": "行を削除",
  "excelImport": "Excelからインポート...",
  "filter": "フィルター",
  "fontFamily": "フォント",
  "fontSize": "フォントサイズ",
  "format": "カスタム書式...",
  "formatTypes": {
    "automatic": "自動",
    "number": "数値",
    "percent": "パーセント",
    "financial": "会計",
    "currency": "通貨",
    "date": "日付",
    "time": "時刻",
    "dateTime": "日時",
    "duration": "期間",
    "moreFormats": "その他の書式..."
  },
  "formatDecreaseDecimal": "小数点以下を減らす",
  "formatIncreaseDecimal": "小数点以下を増やす",
  "freeze": "ウィンドウ枠の固定",
  "freezeButtons": {
    "freezePanes": "ウィンドウ枠を固定",
    "freezeRows": "行を固定",
    "freezeColumns": "列を固定",
    "unfreeze": "固定を解除"
  },
  "insertComment": "コメントの挿入",
  "insertImage": "画像の挿入",
  "italic": "斜体",
  "merge": "セルの結合",
  "mergeButtons": {
    "mergeCells": "すべて結合",
    "mergeHorizontally": "横方向に結合",
    "mergeVertically": "縦方向に結合",
    "unmerge": "結合解除"
  },
  "open": "開く...",
  "paste": "貼り付け",
  "quickAccess": {
    "redo": "やり直し",
    "undo": "元に戻す"
  },
  "saveAs": "名前を付けて保存...",
  "sortAsc": "昇順に並べ替え",
  "sortDesc": "降順に並べ替え",
  "sortButtons": {
    "sortSheetAsc": "シートをA～Zに並べ替え",
    "sortSheetDesc": "シートをZ～Aに並べ替え",
    "sortRangeAsc": "範囲をA～Zに並べ替え",
    "sortRangeDesc": "範囲をZ～Aに並べ替え"
  },
  "textColor": "テキストの色",
  "textWrap": "折り返し",
  "underline": "下線",
  "validation": "データの入力規則..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "名前ボックス",
  "formulaInput": "数式入力",
  "errors": {
    "shiftingNonblankCells": "データ損失の可能性があるため、セルを挿入できません。別の挿入位置を選択するか、ワークシートの末尾からデータを削除してください。",
    "filterRangeContainingMerges": "結合を含む範囲にフィルターを作成できません",
    "validationError": "入力した値がセルに設定された入力規則に違反しています。"
  },
  "tabs": {
    "home": "ホーム",
    "insert": "挿入",
    "data": "データ"
  },
  "sheetBar": {
    "addSheet": "新しいシートの追加",
    "deleteSheet": "削除",
    "duplicateSheet": "複製",
    "renameSheet": "名前変更",
    "hideSheet": "非表示",
    "moveRight": "右に移動",
    "moveLeft": "左に移動"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "過去の検索はありません",
        "noPreviousPrompts": "過去のプロンプトはありません",
        "previousSearches": "過去の検索",
        "previousPrompts": "過去のプロンプト",
        "suggestedPrompts": "おすすめのプロンプト",
        "searchModeLabel": "検索",
        "searchModeDescription": "データ内の正確な単語一致を検索します",
        "searchPlaceholder": "検索",
        "semanticSearchModeLabel": "セマンティック検索",
        "semanticSearchModeDescription": "コンテキストを理解して最も関連性の高い結果を表示します。",
        "semanticSearchPlaceholder": "セマンティック検索",
        "semanticSearchButtonText": "検索",
        "aiAssistantPlaceholder": "AIで並べ替え、フィルター、グループ化",
        "speechToText": "音声テキスト変換",
        "speechToTextAriaLabel": "音声認識を開始",
        "cancel": "キャンセル",
        "send": "送信",
        "searchButtonText": "検索",
        "aiAssistantButtonText": "AIアシスタント"
      });
  }

})(window.kendo.jQuery);