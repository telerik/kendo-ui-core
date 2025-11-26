---
title: Compact Number Formatting in Kendo UI for jQuery
page_title: Compact Number Formatting in Kendo UI for jQuery
description: "Learn how to format large numbers into a compact notation using 1K, 1M, 1B, and more in Kendo UI for jQuery applications using the Intl.NumberFormat API."
type: how-to
slug: compact-number-formatting
tags: format, number, compact, thousands, millions, billions, notation, display, kendo ui for jquery, intl, internationalization
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Kendo UI for jQuery
</td>
</tr>
</tbody>
</table>

## Description

How can I format large numbers into a compact notation in Kendo UI for jQuery? For example, displaying 100,000 as "100K", 1,000,000 as "1M", or 1,000,000,000 as "1B"?

Compact number formatting is useful for displaying large numbers in a more readable and space-efficient way, commonly used in dashboards, analytics, and data visualizations.

## Solution 1: Using Intl.NumberFormat

You can use the ECMAScript Internationalization API (`Intl.NumberFormat`) with the `notation: "compact"` option to format numbers in compact notation. This is a built-in browser API that handles locale-aware formatting without custom logic.

### Using Intl.NumberFormat for Compact Notation

The `Intl.NumberFormat` API with `notation: "compact"` provides native compact number formatting:

```javascript
<script>
    // Compact number formatting using Intl.NumberFormat
    function formatCompactNumber(value, locale = 'en-US', decimals = 1) {
        if (value === null || value === undefined) {
return "0";
        }

        const formatter = new Intl.NumberFormat(locale, {
      notation: "compact",
  compactDisplay: "short",
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0
    });

        return formatter.format(value);
    }

    // Example usage
    console.log(formatCompactNumber(100000));     // Output: 100K
    console.log(formatCompactNumber(1000000));   // Output: 1M
    console.log(formatCompactNumber(1500000));        // Output: 1.5M
    console.log(formatCompactNumber(1000000000));     // Output: 1B
    console.log(formatCompactNumber(2500000000));     // Output: 2.5B
    console.log(formatCompactNumber(1000000000000));  // Output: 1T
    console.log(formatCompactNumber(999));            // Output: 999
    console.log(formatCompactNumber(-1000000));    // Output: -1M
    
    // Locale-specific formatting
    console.log(formatCompactNumber(1500000, 'de-DE'));    // Output: 1,5M (German locale)
    console.log(formatCompactNumber(1500000, 'fr-FR'));    // Output: 1,5M (French locale)
</script>
```

## Solution 2: Using toLocaleString() with Compact Notation

Alternatively, you can use the `.toLocaleString()` method directly on numbers with compact notation options. This is a more concise approach that's also part of the ECMAScript Internationalization specification:

```javascript
<script>
    // Compact number formatting using toLocaleString()
    function formatCompactNumber(value, locale = 'en-US', decimals = 1) {
        if (value === null || value === undefined) {
            return "0";
        }

        return value.toLocaleString(locale, {
     notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: decimals,
            minimumFractionDigits: 0
 });
    }

    // Example usage
    console.log(formatCompactNumber(100000));         // Output: 100K
    console.log(formatCompactNumber(1000000));        // Output: 1M
    console.log(formatCompactNumber(1500000));        // Output: 1.5M
  console.log(formatCompactNumber(1000000000));   // Output: 1B
    console.log(formatCompactNumber(2500000000));     // Output: 2.5B
 console.log(formatCompactNumber(1000000000000));  // Output: 1T
    console.log(formatCompactNumber(999));        // Output: 999
    console.log(formatCompactNumber(-1000000));       // Output: -1M
    
    // Locale-specific formatting
    console.log(formatCompactNumber(1500000, 'de-DE'));    // Output: 1,5M (German locale)
    console.log(formatCompactNumber(1500000, 'fr-FR'));    // Output: 1,5M (French locale)
</script>
```

### Complete Working Example

Here's a complete example with HTML markup, CSS styling, and integration with Kendo UI Grid:

```dojo
  <div id="grid" style="width: 800px;"></div>

    <script>
        // Compact number formatting using Intl.NumberFormat
        function formatCompactNumber(value, locale = 'en-US', decimals = 3) {
            if (value === null || value === undefined) {
                return "0";
            }

            // Approach 1: Using Intl.NumberFormat
            const formatter = new Intl.NumberFormat(locale, {
                notation: "compact",
                compactDisplay: "short",
                maximumFractionDigits: decimals,
                minimumFractionDigits: 0
            });

            // Approach 2: Using toLocaleString()
            //return value.toLocaleString(locale, {
            //    notation: "compact",
            //    compactDisplay: "short",
            //    maximumFractionDigits: decimals,
            //    minimumFractionDigits: 0
            //});

            return formatter.format(value);
        }

        // Helper function to generate random number between min and max
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Generate randomized data
        const gridData = [];
        for (let i = 1; i <= 50; i++) {
            gridData.push({
                productName: `Product ${String.fromCharCode(64 + i)}`,
                revenue: getRandomNumber(50000 * i, 500000 * i),
                totalSales: getRandomNumber(1000000 * i, 5000000 * i),
                users: getRandomNumber(10000 * i, 100000 * i),
                revenuePerUser: getRandomNumber(100, 5000)
            });
        }

        // Initialize Kendo Grid with formatted data
        $("#grid").kendoGrid({
            dataSource: {
                data: gridData
            },
            columns: [
                {
                    field: "productName",
                    title: "Product Name",
                    width: 150
                },
                {
                    field: "revenue",
                    title: "Revenue",
                    template: "#= formatCompactNumber(revenue) #",
                    width: 150
                },
                {
                    field: "totalSales",
                    title: "Total Sales",
                    template: "#= formatCompactNumber(totalSales) #",
                    width: 150
                },
                {
                    field: "users",
                    title: "Active Users",
                    template: "#= formatCompactNumber(users) #",
                    width: 150
                },
                {
                    field: "revenuePerUser",
                    title: "Revenue Per User",
                    template: "#= formatCompactNumber(revenuePerUser) #",
                    width: 150
                }
            ],
            pageable: {
                pageSize: 5
            },
            sortable: true
        });
    </script>
```

## Intl.NumberFormat / toLocaleString() Options

Both APIs provide the same options for compact formatting:

| Option | Type | Value | Description |
|--------|------|-------|-------------|
| `notation` | string | "compact" | Use compact notation for large numbers |
| `compactDisplay` | string | "short" \| "long" | Display style: "100K" (short) or "100 thousand" (long) |
| `maximumFractionDigits` | number | 0-20 | Maximum decimal places to show |
| `minimumFractionDigits` | number | 0-20 | Minimum decimal places to show |
| `locale` | string | "en-US", "de-DE", etc. | Locale for locale-specific formatting (toLocaleString parameter) |

## Locale-Specific Formatting

Both methods automatically respect locale settings:

```javascript
// English (US)
formatCompactNumber(1500000, 'en-US');  // "1.5M"

// German
formatCompactNumber(1500000, 'de-DE');  // "1,5M"

// French
formatCompactNumber(1500000, 'fr-FR');  // "1,5M"

// Spanish
formatCompactNumber(1500000, 'es-ES');  // "1,5M"

// Japanese
formatCompactNumber(1500000, 'ja-JP');  // "150万"
```

## See Also

* [Intl.NumberFormat API on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
* [Number.prototype.toLocaleString() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
* [Kendo UI Number Formatting](/framework/globalization/numberformatting)
* [Kendo UI Grid Client-Side Templates](/controls/grid/templates/client-template)
* [Kendo UI DataSource](/framework/datasource/overview)
