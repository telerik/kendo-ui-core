(function( window, undefined ) {
    kendo.cultures["ia-FR"] = {
        name: "ia-FR",
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
                pattern: ["-$ n","$ n"],
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
                    names: ["dominica","lunedi","martedi","mercuridi","jovedi","venerdi","sabbato"],
                    namesAbbr: ["dom","lun","mar","mer","jov","ven","sab"],
                    namesShort: ["dom","lun","mar","mer","jov","ven","sab"]
                },
                months: {
                    names: ["januario","februario","martio","april","maio","junio","julio","augusto","septembre","octobre","novembre","decembre"],
                    namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","oct","nov","dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, yyyy MMMM dd",
                    F: "dddd, yyyy MMMM dd HH:mm:ss",
                    g: "yyyy/MM/dd HH:mm",
                    G: "yyyy/MM/dd HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
