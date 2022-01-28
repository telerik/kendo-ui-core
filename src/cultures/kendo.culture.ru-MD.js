(function( window, undefined ) {
    kendo.cultures["ru-MD"] = {
        name: "ru-MD",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Moldovan Leu",
                abbr: "MDL",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "L"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
                    namesAbbr: ["вс","пн","вт","ср","чт","пт","сб"],
                    namesShort: ["вс","пн","вт","ср","чт","пт","сб"]
                },
                months: {
                    names: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
                    namesAbbr: ["янв.","февр.","март","апр.","май","июнь","июль","авг.","сент.","окт.","нояб.","дек."]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, d MMMM yyyy 'г'.",
                    F: "dddd, d MMMM yyyy 'г'. HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy 'г'.",
                    Y: "MMMM yyyy 'г'."
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
