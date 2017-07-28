(function( window, undefined ) {
    kendo.cultures["om-KE"] = {
        name: "om-KE",
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
                    names: ["Dilbata","Wiixata","Qibxata","Roobii","Kamiisa","Jimaata","Sanbata"],
                    namesAbbr: ["Dil","Wix","Qib","Rob","Kam","Jim","San"],
                    namesShort: ["Dil","Wix","Qib","Rob","Kam","Jim","San"]
                },
                months: {
                    names: ["Amajjii","Guraandhala","Bitooteessa","Elba","Caamsa","Waxabajjii","Adooleessa","Hagayya","Fuulbana","Onkololeessa","Sadaasa","Muddee"],
                    namesAbbr: ["Ama","Gur","Bit","Elb","Cam","Wax","Ado","Hag","Ful","Onk","Sad","Mud"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, MMMM d, yyyy",
                    F: "dddd, MMMM d, yyyy HH:mm:ss",
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
