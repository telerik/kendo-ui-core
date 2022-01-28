(function( window, undefined ) {
    kendo.cultures["nl-SR"] = {
        name: "nl-SR",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Surinamese Dollar",
                abbr: "SRD",
                pattern: ["$ -n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],
                    namesAbbr: ["zo","ma","di","wo","do","vr","za"],
                    namesShort: ["zo","ma","di","wo","do","vr","za"]
                },
                months: {
                    names: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
                    namesAbbr: ["jan.","feb.","mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec."]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "dd-MM-yyyy HH:mm",
                    G: "dd-MM-yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
