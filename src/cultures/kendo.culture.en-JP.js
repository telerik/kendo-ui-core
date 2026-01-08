kendo.cultures["en-JP"] = {
    // <language code>-<country/region code>
    name: "en-JP",
    // The "numberFormat" defines general number formatting rules.
    numberFormat: {
        //numberFormat has only negative pattern unlike the percent and currency
        //negative pattern: one of (n)|-n|- n|n-|n -
        pattern: ["-n"],
        //number of decimal places
        decimals: 2,
        //string that separates the number groups (1,000,000)
        ",": ",",
		// A string that separates a number from the fractional point.
        ".": ".",
        //the length of each number group
        groupSize: [3],
        //formatting rules for percent number
        percent: {
            //[negative pattern, positive pattern]
			// negativePattern: one of -n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %
            //positivePattern: one of n %|n%|%n|% n
            pattern: ["-n %", "n %"],
			// The number of decimal places.
            decimals: 2,
			// The string that separates the number groups (1,000,000 %).
            ",": ",",
			// The string that separates a number from the fractional point.
            ".": ".",
			// The length of each number group.
            groupSize: [3],
            //percent symbol
            symbol: "%"
        },
        currency: {
			// [negative pattern, positive pattern]
			// negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
            //positivePattern: one of "$n|n$|$ n|n $"
            pattern: ["($n)", "$n"],
			// The number of decimal places.
            decimals: 2,
			// The string that separates the number groups (1,000,000 $).
            ",": ",",
			// The string that separates a number from the fractional point.
            ".": ".",
			// The length of each number group.
            groupSize: [3],
			// The currency symbol.
            symbol: "¥"
        }
    },
    calendars: {
        standard: {
            days: {
				// The full day names.
                names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				// The abbreviated day names.
                namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				// The shortest day names.
                namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
            },
            months: {
				// The full month names.
                names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				// abbreviated month names
                namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            // The AM and PM designators.
            // [standard,lowercase,uppercase]
            AM: [ "AM", "am", "AM" ],
            PM: [ "PM", "pm", "PM" ],
            // The set of predefined date and time patterns used by the culture.
            patterns: {
                d:"yyyy/MM/dd",
                D:"yyyy MMMM dd",
                F:"yyyy MMMM dd H:mm:ss",
                g:"yyyy/MM/dd H:mm",
                G:"yyyy/MM/dd H:mm:ss",
                m: "MMMM dd",
                M: "MMMM dd",
                s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                t: "h:mm tt",
                T: "h:mm:ss tt",
                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                y:"yyyy MMMM",
                Y:"yyyy MMMM"
            },
            // The first day of the week (0 = Sunday, 1 = Monday, and so on).
            firstDay: 0
        }
    }
};