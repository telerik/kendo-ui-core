(function( window, undefined ) {
    kendo.cultures["ko-KP"] = {
        name: "ko-KP",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "North Korean Won",
                abbr: "KPW",
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
                    namesAbbr: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
                },
                AM: ["오전","오전","오전"],
                PM: ["오후","오후","오후"],
                patterns: {
                    d: "yyyy. M. d.",
                    D: "yyyy년 M월 d일 dddd",
                    F: "yyyy년 M월 d일 dddd tt h:mm:ss",
                    g: "yyyy. M. d. tt h:mm",
                    G: "yyyy. M. d. tt h:mm:ss",
                    m: "MMMM d일",
                    M: "MMMM d일",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy년 MMMM",
                    Y: "yyyy년 MMMM"
                },
                "/": ". ",
                ":": ":",
                firstDay: 1
            }
        }
    };
})();
