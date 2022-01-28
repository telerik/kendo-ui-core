(function( window, undefined ) {
    kendo.cultures["nr-ZA"] = {
        name: "nr-ZA",
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
                name: "South African Rand",
                abbr: "ZAR",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["uSonto","uMvulo","uLesibili","Lesithathu","uLesine","ngoLesihlanu","umGqibelo"],
                    namesAbbr: ["Son","Mvu","Bil","Tha","Ne","Hla","Gqi"],
                    namesShort: ["Son","Mvu","Bil","Tha","Ne","Hla","Gqi"]
                },
                months: {
                    names: ["Janabari","uFeberbari","uMatjhi","u-Apreli","Meyi","Juni","Julayi","Arhostosi","Septemba","Oktoba","Usinyikhaba","Disemba"],
                    namesAbbr: ["Jan","Feb","Mat","Apr","Mey","Jun","Jul","Arh","Sep","Okt","Usi","Dis"]
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
