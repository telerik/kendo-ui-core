(function( window, undefined ) {
    kendo.cultures["wae"] = {
        name: "wae",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": "’",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": "’",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": "’",
                ".": ",",
                groupSize: [3],
                symbol: "CHF"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunntag","Mäntag","Zištag","Mittwuč","Fróntag","Fritag","Samštag"],
                    namesAbbr: ["Sun","Män","Ziš","Mit","Fró","Fri","Sam"],
                    namesShort: ["Sun","Män","Ziš","Mit","Fró","Fri","Sam"]
                },
                months: {
                    names: ["Jenner","Hornig","Märze","Abrille","Meije","Bráčet","Heiwet","Öigšte","Herbštmánet","Wímánet","Wintermánet","Chrištmánet"],
                    namesAbbr: ["Jen","Hor","Mär","Abr","Mei","Brá","Hei","Öig","Her","Wím","Win","Chr"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "dddd, d. MMMM yyyy",
                    F: "dddd, d. MMMM yyyy HH:mm:ss",
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
