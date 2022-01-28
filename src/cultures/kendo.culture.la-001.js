(function( window, undefined ) {
    kendo.cultures["la-001"] = {
        name: "la-001",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Special Drawing Rights",
                abbr: "XDR",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "XDR"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Solis","Lunae","Martis","Mercurii","Jovis","Veneris","Saturni"],
                    namesAbbr: ["Sol","Lun","Mar","Mer","Jov","Ven","Sat"],
                    namesShort: ["So","Lu","Ma","Me","Jo","Ve","Sa"]
                },
                months: {
                    names: ["Ianuarius","Februarius","Martius","Aprilis","Maius","Iunius","Quintilis","Sextilis","September","October","November","December"],
                    namesAbbr: ["Ian","Feb","Mar","Apr","Mai","Iun","Quint","Sext","Sept","Oct","Nov","Dec"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy H:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
