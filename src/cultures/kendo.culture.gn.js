(function( window, undefined ) {
    kendo.cultures["gn"] = {
        name: "gn",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "₲"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["arateĩ","arakõi","araapy","ararundy","arapo","arapoteĩ","arapokõi"],
                    namesAbbr: ["teĩ","kõi","apy","ndy","po","oteĩ","okõi"],
                    namesShort: ["A1","A2","A3","A4","A5","A6","A7"]
                },
                months: {
                    names: ["jasyteĩ","jasykõi","jasyapy","jasyrundy","jasypo","jasypoteĩ","jasypokõi","jasypoapy","jasyporundy","jasypa","jasypateĩ","jasypakõi"],
                    namesAbbr: ["jteĩ","jkõi","japy","jrun","jpo","jpot","jpok","jpoa","jpor","jpa","jpat","jpak"]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd MMMM, yyyy",
                    F: "dddd, dd MMMM, yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
