(function( window, undefined ) {
    kendo.cultures["st-ZA"] = {
        name: "st-ZA",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
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
                    names: ["Sontaha","Mmantaha","Labobedi","Laboraru","Labone","Labohlane","Moqebelo"],
                    namesAbbr: ["Son","Mma","Bed","Rar","Ne","Hla","Moq"],
                    namesShort: ["Son","Mma","Bed","Rar","Ne","Hla","Moq"]
                },
                months: {
                    names: ["Phesekgong","Hlakola","Hlakubele","Mmese","Motsheanong","Phupjane","Phupu","Phata","Leotshe","Mphalane","Pundungwane","Tshitwe"],
                    namesAbbr: ["Phe","Kol","Ube","Mme","Mot","Jan","Upu","Pha","Leo","Mph","Pun","Tsh"]
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
