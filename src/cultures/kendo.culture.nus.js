(function( window, undefined ) {
    kendo.cultures["nus"] = {
        name: "nus",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "£"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Cäŋ kuɔth","Jiec la̱t","Rɛw lätni","Diɔ̱k lätni","Ŋuaan lätni","Dhieec lätni","Bäkɛl lätni"],
                    namesAbbr: ["Cäŋ","Jiec","Rɛw","Diɔ̱k","Ŋuaan","Dhieec","Bäkɛl"],
                    namesShort: ["Cäŋ","Jiec","Rɛw","Diɔ̱k","Ŋuaan","Dhieec","Bäkɛl"]
                },
                months: {
                    names: ["Tiop thar pɛt","Pɛt","Duɔ̱ɔ̱ŋ","Guak","Duät","Kornyoot","Pay yie̱tni","Tho̱o̱r","Tɛɛr","Laath","Kur","Tio̱p in di̱i̱t"],
                    namesAbbr: ["Tiop","Pɛt","Duɔ̱ɔ̱","Guak","Duä","Kor","Pay","Thoo","Tɛɛ","Laa","Kur","Tid"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy h:mm:ss tt",
                    g: "d/MM/yyyy h:mm tt",
                    G: "d/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
