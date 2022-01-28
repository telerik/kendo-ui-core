(function( window, undefined ) {
    kendo.cultures["ta-LK"] = {
        name: "ta-LK",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                name: "Sri Lankan Rupee",
                abbr: "LKR",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "Rs."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
                    namesAbbr: ["ஞாயி.","திங்.","செவ்.","புத.","வியா.","வெள்.","சனி"],
                    namesShort: ["ஞா","தி","செ","பு","வி","வெ","ச"]
                },
                months: {
                    names: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],
                    namesAbbr: ["ஜன.","பிப்.","மார்.","ஏப்.","மே","ஜூன்","ஜூலை","ஆக.","செப்.","அக்.","நவ.","டிச."]
                },
                AM: ["முற்பகல்","முற்பகல்","முற்பகல்"],
                PM: ["பிற்பகல்","பிற்பகல்","பிற்பகல்"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d MMMM, yyyy",
                    F: "dddd, d MMMM, yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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
