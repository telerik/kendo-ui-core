(function( window, undefined ) {
    kendo.cultures["sr-Latn-BA"] = {
        name: "sr-Latn-BA",
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
                name: "Bosnia-Herzegovina Convertible Mark",
                abbr: "BAM",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "KM"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["nedjelja","ponedeljak","utorak","srijeda","četvrtak","petak","subota"],
                    namesAbbr: ["ned","pon","ut","sr","čet","pet","sub"],
                    namesShort: ["ne","po","ut","sr","če","pe","su"]
                },
                months: {
                    names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
                    namesAbbr: ["jan","feb","mart","apr","maj","jun","jul","avg","sept","okt","nov","dec"]
                },
                AM: ["prije podne","prije podne","PRIJE PODNE"],
                PM: ["po podne","po podne","PO PODNE"],
                patterns: {
                    d: "d.M.yyyy.",
                    D: "dddd, dd. MMMM yyyy.",
                    F: "dddd, dd. MMMM yyyy. HH:mm:ss",
                    g: "d.M.yyyy. HH:mm",
                    G: "d.M.yyyy. HH:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy.",
                    Y: "MMMM yyyy."
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
