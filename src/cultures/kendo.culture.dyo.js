(function( window, undefined ) {
    kendo.cultures["dyo"] = {
        name: "dyo",
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
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "CFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Dimas","Teneŋ","Talata","Alarbay","Aramisay","Arjuma","Sibiti"],
                    namesAbbr: ["Dim","Ten","Tal","Ala","Ara","Arj","Sib"],
                    namesShort: ["Dim","Ten","Tal","Ala","Ara","Arj","Sib"]
                },
                months: {
                    names: ["Sanvie","Fébirie","Mars","Aburil","Mee","Sueŋ","Súuyee","Ut","Settembar","Oktobar","Novembar","Disambar"],
                    namesAbbr: ["Sa","Fe","Ma","Ab","Me","Su","Sú","Ut","Se","Ok","No","De"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
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
