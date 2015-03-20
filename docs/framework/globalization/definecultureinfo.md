---
title: Define culture information
page_title: Define Culture Information | Kendo UI Framework Globalization documentation
description: How to define culture information in culture files and extend it, default culture information settings.
---
# Define culture information

Each culture info is placed in a separate JS file with the naming convention *`kendo.culture.<language code>[-<country/region code>].js`*. You can include as many culture files as you want. Every included file will extend the kendo.cultures mapping. Please note that the included culture file will not automatically become current culture used by Kendo.

## Default culture information

The English culture is defined directly in kendo.core.js and it is considered as "default". The name is "en-US".

The default culture info is listed here:

    kendo.cultures["en-US"] = {
	    //<language code>-<country/region code>
        name: "en-US",
		// "numberFormat" defines general number formatting rules
        numberFormat: {
            //numberFormat has only negative pattern unline the percent and currency
            //negative pattern: one of (n)|-n|- n|n-|n -
            pattern: ["-n"],
            //number of decimal places
            decimals: 2,
            //string that separates the number groups (1,000,000)
            ",": ",",
			//string that separates a number from the fractional point
            ".": ".",
            //the length of each number group
            groupSize: [3],
            //formatting rules for percent number
            percent: {
                //[negative pattern, positive pattern]
				//negativePattern: one of -n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %
                //positivePattern: one of n %|n%|%n|% n
                pattern: ["-n %", "n %"],
				//number of decimal places
                decimals: 2,
				//string that separates the number groups (1,000,000 %)
                ",": ",",
				//string that separates a number from the fractional point
                ".": ".",
				//the length of each number group
                groupSize: [3],
                //percent symbol
                symbol: "%"
            },
            currency: {
				//[negative pattern, positive pattern]
				//negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
            	//positivePattern: one of "$n|n$|$ n|n $"
                pattern: ["($n)", "$n"],
				//number of decimal places
                decimals: 2,
				//string that separates the number groups (1,000,000 $)
                ",": ",",
				//string that separates a number from the fractional point
                ".": ".",
				//the length of each number group
                groupSize: [3],
				//currency symbol
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
					// full day names
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					// abbreviated day names
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					// shortest day names
                    namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                },
                months: {
 					// full month names
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					// abbreviated month names
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
				// AM and PM designators
				// [standard,lowercase,uppercase]
                AM: [ "AM", "am", "AM" ],
                PM: [ "PM", "pm", "PM" ],
				// set of predefined date and time patterns used by the culture.
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },-
				// the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0
            }
        }
    }};

## Extending culture information

If you examine the source code of the script for each culture, you will notice that each script just adds the culture info object to the the kendo.cultures mappings. You can easily define your own culture file and extend current kendo.cultures mapping. The only requirement is to follow the structure of the default culture information listed above.
