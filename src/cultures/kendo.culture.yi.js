(function( window, undefined ) {
    kendo.cultures["yi"] = {
        name: "yi",
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
                pattern: ["-$ n","$ n"],
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
                    names: ["זונטיק","מאָנטיק","דינסטיק","מיטוואך","דאנערשטיק","פֿרײַטיק","שבת"],
                    namesAbbr: ["זונטיק","מאָנטיק","דינסטיק","מיטוואך","דאנערשטיק","פֿרײַטיק","שבת"],
                    namesShort: ["זונטיק","מאָנטיק","דינסטיק","מיטוואך","דאנערשטיק","פֿרײַטיק","שבת"]
                },
                months: {
                    names: ["יאַנואַר","פֿעברואַר","מערץ","אַפּריל","מיי","יוני","יולי","אויגוסט","סעפּטעמבער","אקטאבער","נאוועמבער","דעצעמבער"],
                    namesAbbr: ["יאַנ","פֿעב","מערץ","אַפּר","מיי","יוני","יולי","אויג","סעפּ","אקט","נאוו","דעצ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dטן MMMM yyyy",
                    F: "dddd, dטן MMMM yyyy HH:mm:ss",
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
                firstDay: 1
            }
        }
    }
})(this);
