(function( window, undefined ) {
    kendo.cultures["bem"] = {
        name: "bem",
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
                symbol: "K"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Pa Mulungu","Palichimo","Palichibuli","Palichitatu","Palichine","Palichisano","Pachibelushi"],
                    namesAbbr: ["Pa Mulungu","Palichimo","Palichibuli","Palichitatu","Palichine","Palichisano","Pachibelushi"],
                    namesShort: ["Pa Mulungu","Palichimo","Palichibuli","Palichitatu","Palichine","Palichisano","Pachibelushi"]
                },
                months: {
                    names: ["Januari","Februari","Machi","Epreo","Mei","Juni","Julai","Ogasti","Septemba","Oktoba","Novemba","Disemba"],
                    namesAbbr: ["Jan","Feb","Mac","Epr","Mei","Jun","Jul","Oga","Sep","Okt","Nov","Dis"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
