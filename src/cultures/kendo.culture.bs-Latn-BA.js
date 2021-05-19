(function( window, undefined ) {
    kendo.cultures["bs-Latn-BA"] = {
        name: "bs-Latn-BA",
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
                    names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
                    namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
                    namesShort: ["ned","pon","uto","sri","čet","pet","sub"]
                },
                months: {
                    names: ["januar","februar","mart","april","maj","juni","juli","august","septembar","oktobar","novembar","decembar"],
                    namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d. M. yyyy.",
                    D: "dddd, d. MMMM yyyy.",
                    F: "dddd, d. MMMM yyyy. HH:mm:ss",
                    g: "d. M. yyyy. HH:mm",
                    G: "d. M. yyyy. HH:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy.",
                    Y: "MMMM yyyy."
                },
                "/": ". ",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
