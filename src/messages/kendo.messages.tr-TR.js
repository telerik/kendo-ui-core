(function ($, undefined) {
/* Filter menu operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Eşit",
    "gt": "Sonra",
    "gte": "Sonra veya eşit",
    "lt": "Önce",
    "lte": "Önce veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "enums": {
    "eq": "Eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "number": {
    "eq": "Eşit",
    "gt": "Büyük",
    "gte": "Büyük veya eşit",
    "lt": "Küçük",
    "lte": "Küçük veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşit",
    "neq": "Eşit değil",
    "startswith": "İle başlar",
    "isnull": "Null",
    "isnotnull": "Null değil",
    "isempty": "Boş",
    "isnotempty": "Boş değil",
    "isnullorempty": "Değer içermiyor",
    "isnotnullorempty": "Değer içeriyor"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Eşit",
    "gt": "Sonra",
    "gte": "Sonra veya eşit",
    "lt": "Önce",
    "lte": "Önce veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "enums": {
    "eq": "Eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "number": {
    "eq": "Eşit",
    "gt": "Büyük",
    "gte": "Büyük veya eşit",
    "lt": "Küçük",
    "lte": "Küçük veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşit",
    "neq": "Eşit değil",
    "startswith": "İle başlar",
    "isnull": "Null",
    "isnotnull": "Null değil",
    "isempty": "Boş",
    "isnotempty": "Boş değil",
    "isnullorempty": "Değer içeriyor",
    "isnotnullorempty": "Değer içermiyor"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Sütunlar",
  "settings": "Sütun ayarları",
  "done": "Tamam",
  "lock": "Kilitle",
  "sortAscending": "Artan Sıralama",
  "sortDescending": "Azalan Sıralama",
  "unlock": "Kilidini Aç",
  "filter": "Filtrele"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "Günler",
    "repeatEvery": "Her gün tekrarla"
  },
  "end": {
    "after": "Sonra",
    "label": "Bitiş",
    "mobileLabel": "Bitiş",
    "never": "Asla/Hiç",
    "occurrence": "Olay",
    "on": "Anlık"
  },
  "frequencies": {
    "daily": "Günlük",
    "monthly": "Aylık",
    "never": "Asla/Hiç",
    "weekly": "Haftalık",
    "yearly": "Yıllık"
  },
  "monthly": {
    "day": "Gün",
    "interval": "Aylar",
    "repeatEvery": "Her ay tekrarla",
    "repeatOn": "Tekrarla"
  },
  "offsetPositions": {
    "first": "İlk",
    "fourth": "Dördüncü",
    "last": "Son",
    "second": "İkinci",
    "third": "Üçüncü"
  },
  "weekdays": {
    "day": "Gün",
    "weekday": "İş günü",
    "weekend": "Haftasonu"
  },
  "weekly": {
    "interval": "Haftalar",
    "repeatEvery": "Her hafta tekrarla",
    "repeatOn": "Tekrarla"
  },
  "yearly": {
    "interval": "Yıllar",
    "of": "Arasında",
    "repeatEvery": "Her Yıl Tekrarla",
    "repeatOn": "Tekrarla"
  }
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "addColumnLeft": "Sola kolon ekle",
  "addColumnRight": "Sağa kolon ekle",
  "addRowAbove": "Yukarıya satır ekle",
  "addRowBelow": "Aşağıya satır ekle",
  "backColor": "Arka plan rengi",
  "bold": "Kalın ",
  "createLink": "Köprü ekleme",
  "createTable": "Tablo oluştur",
  "deleteColumn": "Sütun silme",
  "deleteFile": "Silmek istediğinizden emin misiniz?",
  "deleteRow": "Satır sil",
  "dialogButtonSeparator": "ya da",
  "dialogCancel": "İptal",
  "dialogInsert": "Ekle",
  "dialogUpdate": "Güncelle",
  "directoryNotFound": "Bu isimde bir dizin bulunamadı.",
  "dropFilesHere": "Yüklemek için dosyaları buraya bırakın",
  "emptyFolder": "Boş klasör",
  "fontName": "Font ailesi Seçiniz",
  "fontNameInherit": "Devralınan Karakter",
  "fontSize": "Font boyutu Seçiniz",
  "fontSizeInherit": "Devralınan Boyut",
  "foreColor": "Renk",
  "formatBlock": "Biçim",
  "formatting": "Biçimlendirme",
  "imageAltText": "Alternatif metin",
  "imageWebAddress": "Web adresi",
  "indent": "Satırbaşı",
  "insertHtml": "HTML ekle",
  "insertImage": "Resim ekle",
  "insertOrderedList": "Sıralı liste ekle",
  "insertUnorderedList": "Sırasız liste ekle",
  "invalidFileType": "Seçilen dosya \"{0}\" geçerli değil. Desteklenen dosya türleri: {1}.",
  "italic": "İtalik karakter",
  "justifyCenter": "Merkezi metin",
  "justifyFull": "Doğrulama",
  "justifyLeft": "Metni sola yasla",
  "justifyRight": "Metni sağa yasla",
  "linkOpenInNewWindow": "Yeni pencerede aç",
  "linkText": "Metin",
  "linkToolTip": "Araç İpucu",
  "linkWebAddress": "Web adresi",
  "orderBy": "Düzenleme ölçütü:",
  "orderByName": "İsim",
  "orderBySize": "Boyut",
  "outdent": "Çıkıntı",
  "overwriteFile": "Dizinde \"{0}\" isimli bir dosya zaten mevcut. Üzerine yazmak istiyor musunuz?",
  "search": "Arama",
  "strikethrough": "Üstü çizili",
  "styles": "Stiller",
  "subscript": "İndis",
  "superscript": "Üstyazı",
  "underline": "Altını çiz",
  "unlink": "Köprüyü Kaldır",
  "uploadFile": "Yükle",
  "viewHtml": "HTML Görünümü ",
  "insertFile": "Dosya Ekle"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Temizle",
  "filter": "Filtre",
  "isFalse": "Yanlış",
  "isTrue": "Doğru",
  "operator": "Operatör"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Ve",
  "cancel": "İptal",
  "clear": "Temizle",
  "filter": "Filtrele",
  "info": "Tanıma uyan kayıtları göster:",
  "title": "Tanıma uyan kayıtları göster",
  "isFalse": "Yanlış",
  "isTrue": "Doğru",
  "operator": "Operatör",
  "additionalOperator": "Ek Operatör",
  "or": "Veya",
  "selectValue": "Değer Seçiniz",
  "value": "Değer",
  "additionalValue": "Ek Değer",
  "logic": "Bağıntı"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Arama",
  "checkAll": "Tümünü İşaretle",
  "clear": "Temizle",
  "filter": "Filtrele",
  "selectedItemsFormat": "{0} seçenek işaretlendi"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "İptal",
    "cancel": "Değişiklikleri iptal et",
    "create": "Yeni Kayıt Ekle",
    "destroy": "Sil",
    "edit": "Düzenle",
    "excel": "Excel Kaydet",
    "pdf": "PDF Kaydet",
    "save": "Değişiklikleri Kaydet",
    "select": "Seç",
    "update": "Güncelle"
  },
  "editable": {
    "cancelDelete": "İptal",
    "confirmation": "Kayıtları silmek istediğinizden emin misiniz ?",
    "confirmDelete": "Sil"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Bir sütun başlığını sürükleyin ve bu sütuna göre gruplandırmak için buraya bırakın"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tümü",
  "display": "{0} - {1} aralığı gösteriliyor. Toplam {2} öğe var",
  "empty": "Görüntülenecek öğe yok",
  "first": "İlk sayfaya git",
  "itemsPerPage": "Sayfa başına ürün",
  "last": "Son sayfaya git",
  "morePages": "Daha fazla sayfa",
  "next": "Bir sonraki sayfaya git",
  "of": "{0}",
  "page": "Sayfa",
  "previous": "Bir önceki sayfaya git",
  "refresh": "Güncelle"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tümü",
  "display": "{0} - {1} aralığı gösteriliyor. Toplam {2} öğe var",
  "empty": "Görüntülenecek öğe yok",
  "first": "İlk sayfaya git",
  "itemsPerPage": "Sayfa başına ürün",
  "last": "Son sayfaya git",
  "morePages": "Daha fazla sayfa",
  "next": "Bir sonraki sayfaya git",
  "of": "{0}",
  "page": "Sayfa",
  "previous": "Bir önceki sayfaya git",
  "refresh": "Güncelle"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Tüm gün",
  "cancel": "İptal Et",
  "editable": {
    "confirmation": "Bu etkinliği silmek istediğinizden emin misiniz?"
  },
  "date": "Tarih",
  "deleteWindowTitle": "Etkinliği sil",
  "destroy": "Sil",
  "editor": {
    "allDayEvent": "Tüm gün süren olay",
    "description": "Tanım",
    "editorTitle": "Olay",
    "end": "Bitiş",
    "endTimezone": "Bitiş saati",
    "noTimezone": "Zaman Aralığı belirtilmemiş",
    "repeat": "Tekrar",
    "separateTimezones": "Ayrı bir başlangıç ve bitiş Zaman aralığı kullan",
    "start": "Başlangıç",
    "startTimezone": "Başlangıç Saati",
    "timezone": "",
    "timezoneEditorButton": "Zaman Aralığı",
    "timezoneEditorTitle": "Zaman Aralığı",
    "title": "Tanım"
  },
  "event": "Olay",
  "recurrenceMessages": {
    "deleteRecurring": "Sadece bu olayı mı yoksa bütün seriyi mi silmek istiyorsunuz?",
    "deleteWindowOccurrence": "Geçerli yinelemeyi Sil",
    "deleteWindowSeries": "Seriyi Sil",
    "deleteWindowTitle": "Tekrarlanan Öğeyi Sil",
    "editRecurring": "Sadece bu olayı mı yoksa bütün seriyi mi düzenlemek istiyorsunuz?",
    "editWindowOccurrence": "Geçerli Olayı Düzenle",
    "editWindowSeries": "Seriyi düzenle",
    "editWindowTitle": "Tekrarlanan Öğeyi Düzenle"
  },
  "save": "Kaydet",
  "showFullDay": "Tüm gün göster",
  "showWorkDay": "İş saatlerini göster",
  "time": "Zaman",
  "today": "Bugün",
  "views": {
    "agenda": "Gündem",
    "day": "Gün",
    "month": "Ay",
    "week": "Hafta",
    "workWeek": "Çalışma Haftası"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Tüm sınırlar",
  "insideBorders": "İç sınırlar",
  "insideHorizontalBorders": "Yatay sınırların içinde",
  "insideVerticalBorders": "Dikey sınırların içinde",
  "outsideBorders": "Dış sınırlar",
  "leftBorder": "sol kenarlık",
  "topBorder": "Üst kenarlık",
  "rightBorder": "Sağ kenarlık",
  "bottomBorder": "Alt sınır",
  "noBorders": "Sınır yok",
  "reset": "Rengi sıfırla",
  "customColor": "Özel renk...",
  "apply": "Uygulamak",
  "cancel": "İptal etmek"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Uygulamak",
  "save": "Kayıt etmek",
  "cancel": "İptal etmek",
  "remove": "Kaldırmak",
  "retry": "yeniden dene",
  "revert": "geri al",
  "okText": "tamam",
  "formatCellsDialog": {
    "title": "Biçim",
    "categories": {
      "number": "Numara",
      "currency": "Para birimi",
      "date": "Tarih"
    }
  },
  "fontFamilyDialog": {
    "title": "Yazı tipi"
  },
  "fontSizeDialog": {
    "title": "Yazı Boyutu"
  },
  "bordersDialog": {
    "title": "Sınırlar"
  },
  "alignmentDialog": {
    "title": "hizalama",
    "buttons": {
      "justtifyLeft": "Sola hizalamak",
      "justifyCenter": "merkez",
      "justifyRight": "Sağa hizala",
      "justifyFull": "Savunmak",
      "alignTop": "Üste hizala",
      "alignMiddle": "Ortaya hizala",
      "alignBottom": "Aşağıya hizala"
    }
  },
  "mergeDialog": {
    "title": "Hücreleri birleştir",
    "buttons": {
      "mergeCells": "Tümünü birleştir",
      "mergeHorizontally": "Yatay olarak birleştir",
      "mergeVertically": "Dikey olarak birleştir",
      "unmerge": "Ayır"
    }
  },
  "freezeDialog": {
    "title": "Donma bölmeleri",
    "buttons": {
      "freezePanes": "Donma bölmeleri",
      "freezeRows": "Satırları dondur",
      "freezeColumns": "Sütunları dondur",
      "unfreeze": "Bölmeleri çöz"
    }
  },
  "confirmationDialog": {
    "text": "Bu sayfayı kaldırmak istediğinizden emin misiniz?",
    "title": "Sayfayı kaldır"
  },
  "validationDialog": {
    "title": "Veri doğrulama",
    "hintMessage": "Lütfen geçerli bir {0} değeri {1} girin.",
    "hintTitle": "doğrulama {0}",
    "criteria": {
      "any": "Herhangi bir değer",
      "number": "Numara",
      "text": "Metin",
      "date": "Tarih",
      "custom": "Özel Formül",
      "list": "Liste"
    },
    "comparers": {
      "greaterThan": "daha büyük",
      "lessThan": "daha az",
      "between": "arasında",
      "notBetween": "arasında değil",
      "equalTo": "eşittir",
      "notEqualTo": "eşit değil",
      "greaterThanOrEqualTo": "büyük veya eşit",
      "lessThanOrEqualTo": "küçük veya eşittir"
    },
    "comparerMessages": {
      "greaterThan": "{0} değerinden büyük",
      "lessThan": "{0} değerinden az",
      "between": "{0} ile {1} arasında",
      "notBetween": "{0} ile {1} arasında değil",
      "equalTo": "{0}'e eşit",
      "notEqualTo": "{0}'e eşit değil",
      "greaterThanOrEqualTo": "{0} değerinden büyük veya ona eşit",
      "lessThanOrEqualTo": "{0} değerinden küçük veya ona eşit",
      "custom": "şu formülü karşılayan: {0}"
    },
    "labels": {
      "criteria": "kriterler",
      "comparer": "Karşılaştırıcı",
      "min": "Min.",
      "max": "Maks.",
      "value": "Değer",
      "start": "Başlangıç",
      "end": "Son",
      "onInvalidData": "geçersiz verilerde",
      "rejectInput": "Girişi reddet",
      "showWarning": "Uyarı göster",
      "showHint": "İpucu göster",
      "hintTitle": "İpucu başlığı",
      "hintMessage": "İpucu mesajı",
      "ignoreBlank": "Boşluğu yoksay"
    },
    "placeholders": {
      "typeTitle": "Başlık yazın",
      "typeMessage": "Mesaj yazın"
    }
  },
  "exportAsDialog": {
    "title": "İhracat...",
    "labels": {
      "fileName": "Dosya adı",
      "saveAsType": "Tür olarak kaydet",
      "exportArea": "İhracat",
      "paperSize": "Kağıt boyutu",
      "margins": "kenar boşlukları",
      "orientation": "Oryantasyon",
      "print": "Yazdır",
      "guidelines": "yönergeler",
      "center": "merkez",
      "horizontally": "yatay",
      "vertically": "dikey"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Birleştirilmiş hücrenin bir kısmı değiştirilemez."
  },
  "useKeyboardDialog": {
    "title": "Kopyalama ve yapıştırma",
    "errorMessage": "Bu eylemler menü aracılığıyla çağrılamaz. Lütfen bunun yerine klavye kısayollarını kullanın:",
    "labels": {
      "forCopy": "kopya için",
      "forCut": "kesim için",
      "forPaste": "yapıştırmak için"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Bu işlem çoklu seçimde gerçekleştirilemez."
  },
  "insertCommentDialog": {
    "title": "Yorum ekle",
    "labels": {
      "comment": "Yorum Yap",
      "removeComment": "Yorumu kaldır"
    }
  },
  "insertImageDialog": {
    "title": "Resim ekle",
    "info": "Bir resmi buraya sürükleyin veya seçmek için tıklayın",
    "typeError": "Lütfen bir JPEG, PNG veya GIF resmi seçin"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "A'dan Z'ye sıralama aralığı",
  "sortDescending": "Z'den A'ya kadar sıralama aralığı",
  "filterByValue": "Değere göre filtrele",
  "filterByCondition": "Koşullara göre filtrele",
  "apply": "Uygulamak",
  "search": "Aramak",
  "addToCurrent": "Geçerli seçime ekle",
  "clear": "Temizlemek",
  "blanks": "(Boşluklar)",
  "operatorNone": "Hiçbiri",
  "and": "VE",
  "or": "VEYA",
  "operators": {
    "string": {
      "contains": "Metin şunları içerir:",
      "doesnotcontain": "Metin içermiyor",
      "startswith": "Metin şununla başlar:",
      "endswith": "Metin şununla biter:"
    },
    "date": {
      "eq": "Tarih:",
      "neq": "Tarih değil",
      "lt": "Tarih önce",
      "gt": "Tarih sonra"
    },
    "number": {
      "eq": "Eşittir",
      "neq": "Eşit değildir",
      "gte": "Daha büyük veya eşittir",
      "gt": "Daha büyüktür",
      "lte": "Küçük veya eşittir",
      "lt": "Daha az"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Rengi sıfırla",
  "customColor": "Özel renk...",
  "apply": "Uygulamak",
  "cancel": "İptal etmek"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Sola sütun ekle",
  "addColumnRight": "Sağa sütun ekle",
  "addRowAbove": "Yukarıya satır ekle",
  "addRowBelow": "Aşağıya satır ekle",
  "alignment": "hizalama",
  "alignmentButtons": {
    "justtifyLeft": "Sola hizalamak",
    "justifyCenter": "merkez",
    "justifyRight": "Sağa hizala",
    "justifyFull": "Savunmak",
    "alignTop": "Üste hizala",
    "alignMiddle": "Ortaya hizala",
    "alignBottom": "Aşağıya hizala"
  },
  "backgroundColor": "Arka plan",
  "bold": "Gözü pek",
  "borders": "Sınırlar",
  "colorPicker": {
    "reset": "Rengi sıfırla",
    "customColor": "Özel renk..."
  },
  "copy": "kopyala",
  "cut": "Kesmek",
  "deleteColumn": "Sütunu sil",
  "deleteRow": "Sırayı sil",
  "excelImport": "Excel'den içe aktar...",
  "filter": "filtre",
  "fontFamily": "Yazı tipi",
  "fontSize": "Yazı Boyutu",
  "format": "Özel biçim...",
  "formatTypes": {
    "automatic": "Otomatik",
    "number": "Numara",
    "percent": "Yüzde",
    "financial": "Parasal",
    "currency": "Para birimi",
    "date": "Tarih",
    "time": "Zaman",
    "dateTime": "tarih saat",
    "duration": "Süre",
    "moreFormats": "Daha fazla format..."
  },
  "formatDecreaseDecimal": "Ondalık sayıyı azalt",
  "formatIncreaseDecimal": "Ondalık sayıyı artır",
  "freeze": "Donma bölmeleri",
  "freezeButtons": {
    "freezePanes": "Donma bölmeleri",
    "freezeRows": "Satırları dondur",
    "freezeColumns": "Sütunları dondur",
    "unfreeze": "Bölmeleri çöz"
  },
  "insertComment": "Yorum ekle",
  "insertImage": "Resim ekle",
  "italic": "İtalik",
  "merge": "Hücreleri birleştir",
  "mergeButtons": {
    "mergeCells": "Tümünü birleştir",
    "mergeHorizontally": "Yatay olarak birleştir",
    "mergeVertically": "Dikey olarak birleştir",
    "unmerge": "Ayır"
  },
  "open": "Açık...",
  "paste": "Yapıştırmak",
  "quickAccess": {
    "redo": "yinele",
    "undo": "Geri alma"
  },
  "saveAs": "Farklı kaydet...",
  "sortAsc": "Artan sıralama",
  "sortDesc": "Azalan şekilde sırala",
  "sortButtons": {
    "sortSheetAsc": "Sayfayı A'dan Z'ye sırala",
    "sortSheetDesc": "Sayfayı Z'den A'ya sırala",
    "sortRangeAsc": "A'dan Z'ye sıralama aralığı",
    "sortRangeDesc": "Z'den A'ya kadar sıralama aralığı"
  },
  "textColor": "Metin Rengi",
  "textWrap": "Metni kaydır",
  "underline": "Altını çizmek",
  "validation": "Veri doğrulama..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Veri kaybı olasılığı nedeniyle hücreler eklenemiyor. Başka bir ekleme konumu seçin veya çalışma sayfanızın sonundaki verileri silin.",
    "filterRangeContainingMerges": "Birleştirme içeren bir aralıkta filtre oluşturulamıyor",
    "validationError": "Girdiğiniz değer, hücrede ayarlanan doğrulama kurallarını ihlal ediyor."
  },
  "tabs": {
    "home": "Ev",
    "insert": "Sokmak",
    "data": "Veri"
  }
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "İptal Et",
  "dropFilesHere": "Yüklemek için dosyaları buraya bırakın",
  "headerStatusUploaded": "Tamamlandı",
  "headerStatusUploading": "Yükleniyor",
  "remove": "Kaldır",
  "retry": "Tekrar Dene",
  "select": "Seçiniz",
  "statusFailed": "Başarısız Oldu",
  "statusUploaded": "Yüklendi",
  "statusUploading": "Yükleniyor",
  "uploadSelectedFiles": "Seçilen dosyaları Yükle"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Kapat"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "Tamam"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "Tamam",
  "cancel": "İptal"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "Tamam",
  "cancel": "İptal"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "yıl",
      "month": "ay",
      "day": "gün",
      "weekday": "haftanın günü",
      "hour": "saat",
      "minute": "dakika",
      "second": "saniye",
      "dayperiod": "AM/PM"
    });
}  
  
})(window.kendo.jQuery);
