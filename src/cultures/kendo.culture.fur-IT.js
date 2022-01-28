(function( window, undefined ) {
    kendo.cultures["fur-IT"] = {
        name: "fur-IT",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Euro",
                abbr: "EUR",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["domenie","lunis","martars","miercus","joibe","vinars","sabide"],
                    namesAbbr: ["dom","lun","mar","mie","joi","vin","sab"],
                    namesShort: ["dom","lun","mar","mie","joi","vin","sab"]
                },
                months: {
                    names: ["Zenâr","Fevrâr","Març","Avrîl","Mai","Jugn","Lui","Avost","Setembar","Otubar","Novembar","Dicembar"],
                    namesAbbr: ["Zen","Fev","Mar","Avr","Mai","Jug","Lui","Avo","Set","Otu","Nov","Dic"]
                },
                AM: ["a.","a.","A."],
                PM: ["p.","p.","P."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d 'di' MMMM 'dal' yyyy",
                    F: "dddd d 'di' MMMM 'dal' yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d 'di' MMMM",
                    M: "d 'di' MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM 'dal' yyyy",
                    Y: "MMMM 'dal' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
