---
title: Override the number formats in a culture
page_title: Substitute the culture delimiters in the numbers.
description: Learn how to change Telerik UI for {{ site.framework }} culture number delimiters.
slug: culture-override-settings
tags: culture, numeric, numbers, override, numberFormat, currency, percent
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.829 version</td>
 </tr>
</table>

## Description

How can I override the numeric delimiters for {{ site.product }} culture?

## Solution

To achieve the desired scenario add a script which extends the numeric options for the culture:

```Script.js
<script>
        var customUS = $.extend(true, {}, kendo.culture(), {
            name: "custom-US",
            numberFormat: {
              ",": " ",
              ".": "^",
  			  currency: {
                ",": " ",
                ".": "^",
              },
              percent: {
                ",": " ",
                ".": "^",
              }
            }
        });
      kendo.cultures["custom-US"] = customUS;
   	  kendo.culture("custom-US");
</script>
```

```Index.cshtml
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("Grid")
    .Columns(columns =>
    {
            columns.Bound(p => p.UnitPrice).Title("Unit Price");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read("Products_Read", "Grid")
    )
)
```

For a runnable example based on the code above, refer to the:
* [REPL example on overriding the numeric delimiters in culture](https://netcorerepl.telerik.com/QRatmrPI15wZ58Hy52)

## More {{ site.framework }} Culture Resources
* [Globalization Overview]({%slug overview_globalization_core%})
* [Right-to-Left Languages]({%slug overview_rtlsupport_core%})
* [Localization]({%slug overview_localization_core%})

## See Also
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)