(function( window, undefined ) {
    kendo.cultures["fy-NL"] = {
        name: "fy-NL",
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
                name: "Euro",
                abbr: "EUR",
                pattern: ["$ n-","$ n"],
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
                    names: ["snein","moandei","tiisdei","woansdei","tongersdei","freed","sneon"],
                    namesAbbr: ["si","mo","ti","wo","to","fr","so"],
                    namesShort: ["si","mo","ti","wo","to","fr","so"]
                },
                months: {
                    names: ["Jannewaris","Febrewaris","Maart","April","Maaie","Juny","July","Augustus","Septimber","Oktober","Novimber","Desimber"],
                    namesAbbr: ["Jan","Feb","Mrt","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
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
