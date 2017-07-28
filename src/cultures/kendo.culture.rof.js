(function( window, undefined ) {
    kendo.cultures["rof"] = {
        name: "rof",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "TSh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Ijumapili","Ijumatatu","Ijumanne","Ijumatano","Alhamisi","Ijumaa","Ijumamosi"],
                    namesAbbr: ["Ijp","Ijt","Ijn","Ijtn","Alh","Iju","Ijm"],
                    namesShort: ["Ijp","Ijt","Ijn","Ijtn","Alh","Iju","Ijm"]
                },
                months: {
                    names: ["Mweri wa kwanza","Mweri wa kaili","Mweri wa katatu","Mweri wa kaana","Mweri wa tanu","Mweri wa sita","Mweri wa saba","Mweri wa nane","Mweri wa tisa","Mweri wa ikumi","Mweri wa ikumi na moja","Mweri wa ikumi na mbili"],
                    namesAbbr: ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
