(function( window, undefined ) {
    kendo.cultures["ce-RU"] = {
        name: "ce-RU",
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
                name: "Russian Ruble",
                abbr: "RUB",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "₽"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["кӀиранан де","оршотан де","шинарин де","кхаарин де","еарин де","пӀераскан де","шот де"],
                    namesAbbr: ["кӀиранан де","оршотан де","шинарин де","кхаарин де","еарин де","пӀераскан де","шот де"],
                    namesShort: ["кӀиранан де","оршотан де","шинарин де","кхаарин де","еарин де","пӀераскан де","шот де"]
                },
                months: {
                    names: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
                    namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM d, dddd",
                    F: "yyyy MMMM d, dddd HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
