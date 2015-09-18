(function( window, undefined ) {
    kendo.cultures["rw"] = {
        name: "rw",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
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
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "RWF"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Ku cyumweru","Ku wa mbere","Ku wa kabiri","Ku wa gatatu","Ku wa kane","Ku wa gatanu","Ku wa gatandatu"],
                    namesAbbr: ["cyu.","mbe.","kab.","gat.","kan.","gat.","gat."],
                    namesShort: ["cy","mb","ka","ga","ka","ga","ga"]
                },
                months: {
                    names: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza"],
                    namesAbbr: ["Mut","Gas","Wer","Mat","Gic","Kam","Nyak","Kan","Nze","Ukwak","Ugus","Ukub"]
                },
                AM: ["z.m","z.m","Z.M"],
                PM: ["z.n","z.n","Z.N"],
                patterns: {
                    d: "d/MM/yyyy",
                    D: "d ' ' MMMM ' ' yyyy",
                    F: "d ' ' MMMM ' ' yyyy H:mm:ss",
                    g: "d/MM/yyyy H:mm",
                    G: "d/MM/yyyy H:mm:ss",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
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
