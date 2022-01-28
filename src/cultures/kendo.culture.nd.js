(function( window, undefined ) {
    kendo.cultures["nd"] = {
        name: "nd",
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
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sonto","Mvulo","Sibili","Sithathu","Sine","Sihlanu","Mgqibelo"],
                    namesAbbr: ["Son","Mvu","Sib","Sit","Sin","Sih","Mgq"],
                    namesShort: ["Son","Mvu","Sib","Sit","Sin","Sih","Mgq"]
                },
                months: {
                    names: ["Zibandlela","Nhlolanja","Mbimbitho","Mabasa","Nkwenkwezi","Nhlangula","Ntulikazi","Ncwabakazi","Mpandula","Mfumfu","Lwezi","Mpalakazi"],
                    namesAbbr: ["Zib","Nhlo","Mbi","Mab","Nkw","Nhla","Ntu","Ncw","Mpan","Mfu","Lwe","Mpal"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
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
