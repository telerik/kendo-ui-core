(function( window, undefined ) {
    kendo.cultures["naq"] = {
        name: "naq",
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
                    names: ["Sontaxtsees","Mantaxtsees","Denstaxtsees","Wunstaxtsees","Dondertaxtsees","Fraitaxtsees","Satertaxtsees"],
                    namesAbbr: ["Son","Ma","De","Wu","Do","Fr","Sat"],
                    namesShort: ["Son","Ma","De","Wu","Do","Fr","Sat"]
                },
                months: {
                    names: ["ǃKhanni","ǃKhanǀgôab","ǀKhuuǁkhâb","ǃHôaǂkhaib","ǃKhaitsâb","Gamaǀaeb","ǂKhoesaob","Aoǁkhuumûǁkhâb","Taraǀkhuumûǁkhâb","ǂNûǁnâiseb","ǀHooǂgaeb","Hôasoreǁkhâb"],
                    namesAbbr: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
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
