(function( window, undefined ) {
    kendo.cultures["kea-CV"] = {
        name: "kea-CV",
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
                name: "Cape Verdean Escudo",
                abbr: "CVE",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": "$",
                groupSize: [3],
                symbol: "​"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dumingu","sigunda-fera","tersa-fera","kuarta-fera","kinta-fera","sesta-fera","sabadu"],
                    namesAbbr: ["dum","sig","ter","kua","kin","ses","sab"],
                    namesShort: ["du","si","te","ku","ki","se","sa"]
                },
                months: {
                    names: ["Janeru","Febreru","Marsu","Abril","Maiu","Junhu","Julhu","Agostu","Setenbru","Otubru","Nuvenbru","Dizenbru"],
                    namesAbbr: ["Jan","Feb","Mar","Abr","Mai","Jun","Jul","Ago","Set","Otu","Nuv","Diz"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d 'di' MMMM 'di' yyyy",
                    F: "dddd, d 'di' MMMM 'di' yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d 'di' MMMM",
                    M: "d 'di' MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM 'di' yyyy",
                    Y: "MMMM 'di' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
