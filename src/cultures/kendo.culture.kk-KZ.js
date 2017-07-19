(function( window, undefined ) {
    kendo.cultures["kk-KZ"] = {
        name: "kk-KZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Kazakhstani Tenge",
                abbr: "KZT",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "₸"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["жексенбі","дүйсенбі","сейсенбі","сәрсенбі","бейсенбі","жұма","сенбі"],
                    namesAbbr: ["Жс","Дс","Сс","Ср","Бс","Жм","Сб"],
                    namesShort: ["Жс","Дс","Сс","Ср","Бс","Жм","Сб"]
                },
                months: {
                    names: ["Қаңтар","Ақпан","Наурыз","Сәуір","Мамыр","Маусым","Шілде","Тамыз","Қыркүйек","Қазан","Қараша","Желтоқсан"],
                    namesAbbr: ["Қаң.","Ақп.","Нау.","Сәу.","Мам.","Мау.","Шіл.","Там.","Қыр.","Қаз.","Қар.","Жел."]
                },
                AM: ["таңғы","таңғы","ТАҢҒЫ"],
                PM: ["түскі/кешкі","түскі/кешкі","ТҮСКІ/КЕШКІ"],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "yyyy 'ж'. d MMMM, dddd",
                    F: "yyyy 'ж'. d MMMM, dddd HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy 'ж'. MMMM",
                    Y: "yyyy 'ж'. MMMM"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
