(function( window, undefined ) {
    kendo.cultures["ve-ZA"] = {
        name: "ve-ZA",
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
                    names: ["Swondaha","Musumbuluwo","Ḽavhuvhili","Ḽavhuraru","Ḽavhuṋa","Ḽavhuṱanu","Mugivhela"],
                    namesAbbr: ["Swo","Mus","Vhi","Rar","Ṋa","Ṱan","Mug"],
                    namesShort: ["Swo","Mus","Vhi","Rar","Ṋa","Ṱan","Mug"]
                },
                months: {
                    names: ["Phando","Luhuhi","Ṱhafamuhwe","Lambamai","Shundunthule","Fulwi","Fulwana","Ṱhangule","Khubvumedzi","Tshimedzi","Ḽara","Nyendavhusiku"],
                    namesAbbr: ["Pha","Luh","Ṱhf","Lam","Shu","Lwi","Lwa","Ṱha","Khu","Tsh","Ḽar","Nye"]
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
