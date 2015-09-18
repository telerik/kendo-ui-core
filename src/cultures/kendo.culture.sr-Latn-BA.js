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
                name: "Convertible Mark",
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
                    namesAbbr: ["ned.","pon.","uto.","sri.","čet.","pet.","sub."],
                    namesShort: ["ne.","po.","ut.","sr.","če.","pe.","su."]
                },
                months: {
                    names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
                    namesAbbr: ["jan.","feb.","mar.","apr.","maj.","jun.","jul.","avg.","sep.","okt.","nov.","dec."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d.M.yyyy.",
                    D: "d. MMMM yyyy.",
                    F: "d. MMMM yyyy. H:mm:ss",
                    g: "d.M.yyyy. H:mm",
                    G: "d.M.yyyy. H:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
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
