(function( window, undefined ) {
    kendo.cultures["xog-UG"] = {
        name: "xog-UG",
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
                name: "Ugandan Shilling",
                abbr: "UGX",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "USh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sabiiti","Balaza","Owokubili","Owokusatu","Olokuna","Olokutaanu","Olomukaaga"],
                    namesAbbr: ["Sabi","Bala","Kubi","Kusa","Kuna","Kuta","Muka"],
                    namesShort: ["Sabi","Bala","Kubi","Kusa","Kuna","Kuta","Muka"]
                },
                months: {
                    names: ["Janwaliyo","Febwaliyo","Marisi","Apuli","Maayi","Juuni","Julaayi","Agusito","Sebuttemba","Okitobba","Novemba","Desemba"],
                    namesAbbr: ["Jan","Feb","Mar","Apu","Maa","Juu","Jul","Agu","Seb","Oki","Nov","Des"]
                },
                AM: ["Munkyo","munkyo","MUNKYO"],
                PM: ["Eigulo","eigulo","EIGULO"],
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
                firstDay: 1
            }
        }
    }
})(this);
