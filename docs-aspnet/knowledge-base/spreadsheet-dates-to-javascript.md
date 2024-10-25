---
title: Converting Spreadsheet Dates to Javascript
description: "Learn how to convert the {{ site.product }} Spreadsheet date column values from an Excel format to JavaScript."
type: how-to
page_title: Convert {{ site.product }} Spreadsheet Dates From MS Excel Date Format to JavaScript Date 
slug: spreadsheet-dates-to-javascript
tags: excel dates, format, javascript, date, object, type, convert, spreadsheet, range, value
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Soreadsheet</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.314 version</td>
 </tr>
</table>

## Description

I access a range of cells in my Spreadsheet and utilize the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/value) method of the Range's API to extract the date values of the range. However, I get numbers that are not usable in JavaScript. How can I format these dates to JavaScript?

## Solution

Date values in the Spreadsheet are converted to numbers internally to maintain compatibility with the specifications of [Microsoft Excel's date formatting](https://xlsxwriter.readthedocs.io/working_with_dates_and_time.html).

To convert the formatted dates back to JavaScript, pass the date value to the following __getJsDatesFromExcel__ function:

```JavaScript
    function getJsDateFromExcel(excelDate){
        const SECONDS_IN_DAY = 24 * 60 * 60;
        const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
        const MAGIC_NUMBER_OF_DAYS = (25567 + 2);    
        if (!Number(excelDate)) {
            alert('wrong input format')
        }
        
        const delta = excelDate - MAGIC_NUMBER_OF_DAYS;
        const parsed = delta * MISSING_LEAP_YEAR_DAY;
        const date = new Date(parsed)
        
        return date
    }

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    var range = sheet.range("B4");
    var value = range.value();

    var jsValue = getJsDateFromExcel(value);
```

To explore the complete behavior, see the Telerik REPL example on how to [format Excel dates to JavaScript Date objects](https://netcorerepl.telerik.com/GxYdcsPe40nJkVs938).

## More {{ site.framework }} Spreadsheet Resources

* [{{ site.framework }} Spreadsheet Documentation]({%slug htmlhelpers_spreadsheet_aspnetcore%})

* [{{ site.framework }} Spreadsheet Demos](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)

{% if site.core %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-core-ui/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-mvc/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}


## See Also

* [Client-Side API Reference of the Spreadsheet's Range for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range)
* [Server-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/spreadsheet)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
