(function( window, undefined ) {
    kendo.cultures["ko-KR"] = {
        name: "ko-KR",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Korean Won",
                abbr: "KRW",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "₩"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
                    namesAbbr: ["일","월","화","수","목","금","토"],
                    namesShort: ["일","월","화","수","목","금","토"]
                },
                months: {
                    names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12"]
                },
                AM: ["오전","오전","오전"],
                PM: ["오후","오후","오후"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy'년' M'월' d'일' dddd",
                    F: "yyyy'년' M'월' d'일' dddd tt h:mm:ss",
                    g: "yyyy-MM-dd tt h:mm",
                    G: "yyyy-MM-dd tt h:mm:ss",
                    m: "M'월' d'일'",
                    M: "M'월' d'일'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy'년' M'월'",
                    Y: "yyyy'년' M'월'"
                },
                "/": "-",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
