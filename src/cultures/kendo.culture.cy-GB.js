(function( window, undefined ) {
    kendo.cultures["cy-GB"] = {
        name: "cy-GB",
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
                name: "UK Pound Sterling",
                abbr: "GBP",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "£"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],
                    namesAbbr: ["Sul","Llun","Maw","Mer","Iau","Gwe","Sad"],
                    namesShort: ["Su","Ll","Ma","Me","Ia","Gw","Sa"]
                },
                months: {
                    names: ["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr"],
                    namesAbbr: ["Ion","Chwef","Maw","Ebr","Mai","Meh","Gorff","Awst","Medi","Hyd","Tach","Rhag"]
                },
                AM: ["am","am","AM"],
                PM: ["pm","pm","PM"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yy HH:mm",
                    G: "dd/MM/yy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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
