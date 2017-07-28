(function( window, undefined ) {
    kendo.cultures["seh-MZ"] = {
        name: "seh-MZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Mozambican Metical",
                abbr: "MZN",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "MTn"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Dimingu","Chiposi","Chipiri","Chitatu","Chinai","Chishanu","Sabudu"],
                    namesAbbr: ["Dim","Pos","Pir","Tat","Nai","Sha","Sab"],
                    namesShort: ["Dim","Pos","Pir","Tat","Nai","Sha","Sab"]
                },
                months: {
                    names: ["Janeiro","Fevreiro","Marco","Abril","Maio","Junho","Julho","Augusto","Setembro","Otubro","Novembro","Decembro"],
                    namesAbbr: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Aug","Set","Otu","Nov","Dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d 'de' MMMM 'de' yyyy",
                    F: "dddd, d 'de' MMMM 'de' yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM 'de' yyyy",
                    Y: "MMMM 'de' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
