(function( window, undefined ) {
    kendo.cultures["km"] = {
        name: "km",
        numberFormat: {
            pattern: ["- n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,0],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "៛"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ថ្ងៃអាទិត្យ","ថ្ងៃច័ន្ទ","ថ្ងៃអង្គារ","ថ្ងៃពុធ","ថ្ងៃព្រហស្បតិ៍","ថ្ងៃសុក្រ","ថ្ងៃសៅរ៍"],
                    namesAbbr: ["អាទិ.","ច.","អ.","ពុ","ព្រហ.","សុ.","ស."],
                    namesShort: ["អា","ច","អ","ពុ","ព","សុ","ស"]
                },
                months: {
                    names: ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
                    namesAbbr: ["១","២","៣","៤","៥","៦","៧","៨","៩","១០","១១","១២"]
                },
                AM: ["ព្រឹក","ព្រឹក","ព្រឹក"],
                PM: ["ល្ងាច","ល្ងាច","ល្ងាច"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yy H:mm",
                    G: "dd/MM/yy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "'ខែ' MM 'ឆ្នាំ' yyyy",
                    Y: "'ខែ' MM 'ឆ្នាំ' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
