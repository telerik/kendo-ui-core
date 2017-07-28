(function( window, undefined ) {
    kendo.cultures["saq-KE"] = {
        name: "saq-KE",
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
                name: "Kenyan Shilling",
                abbr: "KES",
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
                    names: ["Mderot ee are","Mderot ee kuni","Mderot ee ong’wan","Mderot ee inet","Mderot ee ile","Mderot ee sapa","Mderot ee kwe"],
                    namesAbbr: ["Are","Kun","Ong","Ine","Ile","Sap","Kwe"],
                    namesShort: ["Are","Kun","Ong","Ine","Ile","Sap","Kwe"]
                },
                months: {
                    names: ["Lapa le obo","Lapa le waare","Lapa le okuni","Lapa le ong’wan","Lapa le imet","Lapa le ile","Lapa le sapa","Lapa le isiet","Lapa le saal","Lapa le tomon","Lapa le tomon obo","Lapa le tomon waare"],
                    namesAbbr: ["Obo","Waa","Oku","Ong","Ime","Ile","Sap","Isi","Saa","Tom","Tob","Tow"]
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
