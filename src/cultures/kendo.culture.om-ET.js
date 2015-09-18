(function( window, undefined ) {
    kendo.cultures["om-ET"] = {
        name: "om-ET",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Ethiopian Birr",
                abbr: "ETB",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Br"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Dilbata","Wiixata","Qibxata","Roobii","Kamiisa","Jimaata","Sanbata"],
                    namesAbbr: ["Dil","Wix","Qib","Rob","Kam","Jim","San"],
                    namesShort: ["Dil","Wix","Qib","Rob","Kam","Jim","San"]
                },
                months: {
                    names: ["Amajjii","Guraandhala","Bitooteessa","Elba","Caamsa","Waxabajjii","Adooleessa","Hagayya","Fuulbana","Onkololeessa","Sadaasa","Muddee"],
                    namesAbbr: ["Ama","Gur","Bit","Elb","Cam","Wax","Ado","Hag","Ful","Onk","Sad","Mud"]
                },
                AM: ["WD","wd","WD"],
                PM: ["WB","wb","WB"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "dddd, MMMM d, yyyy",
                    F: "dddd, MMMM d, yyyy h:mm:ss tt",
                    g: "dd/MM/yy h:mm tt",
                    G: "dd/MM/yy h:mm:ss tt",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
