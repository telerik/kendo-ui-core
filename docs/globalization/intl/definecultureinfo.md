---
title: Culture Definition
page_title: Culture Definition | Kendo UI Globalization
description: "Learn about the default culture information settings in Kendo UI and how to define culture information in culture files and then extend it."
previous_url: /framework/globalization/definecultureinfo
slug: culture_definition_kendoui_globalization
position: 2
---

# Defining the Culture

The information on each culture is placed in a separate JavaScript file and shares the `kendo.culture.<language code>[-<country/region code>].js` naming convention.

You can include as many culture files as you want. Every file that is included extends the `kendo.cultures` mapping. Note that the included culture file does not automatically become the current culture used by Kendo UI.

## Applying the Default Cultures

The default English culture is defined directly in `kendo.core.js` and by the name of `"en-US"`.

The following example lists the default culture information.

    kendo.cultures["en-US"] = {
	    // <language code>-<country/region code>
        name: "en-US",
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
                symbol: "$"
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
                },
				  // The first day of the week (0 = Sunday, 1 = Monday, and so on).
                firstDay: 0
            }
        }
    };

## Extending Culture Information

In the source code of the script for each culture, each script just adds the culture info object to the `kendo.cultures` mappings. To define your own culture file and extend the current `kendo.cultures` mapping, follow the structure of the default culture information previously listed.

## See Also

* [Overview of Globalization in Kendo UI]({% slug overview_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Date Parsing]({% slug dateparsing_kendoui_globalization %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Number Parsing]({% slug numberparsing_kendoui_globalization %})
