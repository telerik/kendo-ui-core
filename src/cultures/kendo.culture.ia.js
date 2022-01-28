(function( window, undefined ) {
    kendo.cultures["ia"] = {
        name: "ia",
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
                name: "",
                abbr: "",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "XDR"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dominica","lunedi","martedi","mercuridi","jovedi","venerdi","sabbato"],
                    namesAbbr: ["dom","lun","mar","mer","jov","ven","sab"],
                    namesShort: ["do","lu","ma","me","jo","ve","sa"]
                },
                months: {
                    names: ["januario","februario","martio","april","maio","junio","julio","augusto","septembre","octobre","novembre","decembre"],
                    namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","oct","nov","dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd 'le' d 'de' MMMM yyyy",
                    F: "dddd 'le' d 'de' MMMM yyyy HH:mm:ss",
                    g: "dd-MM-yyyy HH:mm",
                    G: "dd-MM-yyyy HH:mm:ss",
                    m: "d 'de' MMMM",
                    M: "d 'de' MMMM",
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
