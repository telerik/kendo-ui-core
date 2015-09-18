(function( window, undefined ) {
    kendo.cultures["ml"] = {
        name: "ml",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-%n","%n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$ -n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "₹"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],
                    namesAbbr: ["ഞായർ.","തിങ്കൾ.","ചൊവ്വ.","ബുധൻ.","വ്യാഴം.","വെള്ളി.","ശനി."],
                    namesShort: ["ഞാ","തി","ചൊ","ബു","വ്യാ","വെ","ശ"]
                },
                months: {
                    names: ["ജനുവരി","ഫെബ്രുവരി","മാര്‍‌ച്ച്","ഏപ്രില്‍","മെയ്","ജൂണ്‍","ജൂലൈ","ആഗസ്റ്റ്","സെപ്‌റ്റംബര്‍","ഒക്‌ടോബര്‍","നവംബര്‍","ഡിസംബര്‍"],
                    namesAbbr: ["ജനുവരി","ഫെബ്രുവരി","മാര്‍‌ച്ച്","ഏപ്രില്‍","മെയ്","ജൂണ്‍","ജൂലൈ","ആഗസ്റ്റ്","സെപ്‌റ്റംബര്‍","ഒക്‌ടോബര്‍","നവംബര്‍","ഡിസംബര്‍"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH.mm.ss",
                    g: "dd-MM-yy HH.mm",
                    G: "dd-MM-yy HH.mm.ss",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH.mm",
                    T: "HH.mm.ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "-",
                ":": ".",
                firstDay: 1
            }
        }
    }
})(this);
