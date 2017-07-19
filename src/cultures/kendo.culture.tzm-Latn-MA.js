(function( window, undefined ) {
    kendo.cultures["tzm-Latn-MA"] = {
        name: "tzm-Latn-MA",
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
                name: "Moroccan Dirham",
                abbr: "MAD",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "MAD"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Asamas","Aynas","Asinas","Akras","Akwas","Asimwas","Asiḍyas"],
                    namesAbbr: ["Asa","Ayn","Asn","Akr","Akw","Asm","Asḍ"],
                    namesShort: ["Asa","Ayn","Asn","Akr","Akw","Asm","Asḍ"]
                },
                months: {
                    names: ["Yennayer","Yebrayer","Mars","Ibrir","Mayyu","Yunyu","Yulyuz","Ɣuct","Cutanbir","Kṭuber","Nwanbir","Dujanbir"],
                    namesAbbr: ["Yen","Yeb","Mar","Ibr","May","Yun","Yul","Ɣuc","Cut","Kṭu","Nwa","Duj"]
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
                firstDay: 6
            }
        }
    }
})(this);
