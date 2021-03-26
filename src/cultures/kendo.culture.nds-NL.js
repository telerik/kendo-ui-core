(function( window, undefined ) {
    kendo.cultures["nds-NL"] = {
        name: "nds-NL",
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
                name: "Euro",
                abbr: "EUR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sünndag","Maandag","Dingsdag","Middeweken","Dunnersdag","Freedag","Sünnavend"],
                    namesAbbr: ["Sü.","Ma.","Di.","Mi.","Du.","Fr.","Sa."],
                    namesShort: ["Sü.","Ma.","Di.","Mi.","Du.","Fr.","Sa."]
                },
                months: {
                    names: ["Januaar","Februaar","März","April","Mai","Juni","Juli","August","September","Oktover","November","Dezember"],
                    namesAbbr: ["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."]
                },
                AM: ["vm","vm","VM"],
                PM: ["nm","nm","NM"],
                patterns: {
                    d: "d.MM.yyyy",
                    D: "dddd, 'de' d. MMMM yyyy",
                    F: "dddd, 'de' d. MMMM yyyy 'Klock' H.mm:ss",
                    g: "d.MM.yyyy 'Kl'. H.mm",
                    G: "d.MM.yyyy 'Klock' H.mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "'Kl'. H.mm",
                    T: "'Klock' H.mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": ".",
                ":": ".",
                firstDay: 1
            }
        }
    }
})(this);
