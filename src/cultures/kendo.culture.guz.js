(function( window, undefined ) {
    kendo.cultures["guz"] = {
        name: "guz",
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
                symbol: "Ksh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Chumapiri","Chumatato","Chumaine","Chumatano","Aramisi","Ichuma","Esabato"],
                    namesAbbr: ["Cpr","Ctt","Cmn","Cmt","Ars","Icm","Est"],
                    namesShort: ["Cpr","Ctt","Cmn","Cmt","Ars","Icm","Est"]
                },
                months: {
                    names: ["Chanuari","Feburari","Machi","Apiriri","Mei","Juni","Chulai","Agosti","Septemba","Okitoba","Nobemba","Disemba"],
                    namesAbbr: ["Can","Feb","Mac","Apr","Mei","Jun","Cul","Agt","Sep","Okt","Nob","Dis"]
                },
                AM: ["Ma","ma","MA"],
                PM: ["Mo","mo","MO"],
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
