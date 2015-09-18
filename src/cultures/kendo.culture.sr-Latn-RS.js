(function( window, undefined ) {
    kendo.cultures["sr-Latn-RS"] = {
        name: "sr-Latn-RS",
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
                name: "Serbian Dinar",
                abbr: "RSD",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "din."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
                    namesAbbr: ["ned.","pon.","uto.","sre.","čet.","pet.","sub."],
                    namesShort: ["ne","po","ut","sr","če","pe","su"]
                },
                months: {
                    names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],
                    namesAbbr: ["jan.","feb.","mart","apr.","maj","jun","jul","avg.","sept.","okt.","nov.","dec."]
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
