(function( window, undefined ) {
    kendo.cultures["xh"] = {
        name: "xh",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Cawe","Mvulo","Lwesibini","Lwesithathu","Lwesine","Lwesihlanu","Mgqibelo"],
                    namesAbbr: ["Caw","Mvu","Bin","Tha","Sin","Hla","Mgq"],
                    namesShort: ["Caw","Mvu","Bin","Tha","Sin","Hla","Mgq"]
                },
                months: {
                    names: ["Janyuwari","Februwari","Matshi","Epreli","Meyi","Juni","Julayi","Agasti","Septemba","Okthoba","Novemba","Disemba"],
                    namesAbbr: ["Jan","Feb","Mat","Epr","Mey","Jun","Jul","Aga","Sep","Okt","Nov","Dis"]
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
                firstDay: 0
            }
        }
    }
})(this);
