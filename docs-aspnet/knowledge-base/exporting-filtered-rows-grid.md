---
title: Export to Excel Only the Filtered Rows from Grid for ASP.NET Core
description: Learn how to export only the filtered rows from the {{ site.framework }}
type: how-to
page_title: Exporting Filtered Rows from Grid to Excel through Server Export 
slug: exporting-filtered-rows-grid
tags: grid, export, filtered rows, ASP.NET Core, excel
ticketid: 1555436
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>

## Description

I want to send the Grid's filtered rows to Excel.

## Solution

To export only the filtered rows from the Grid for ASP.NET Core to excel with server export, follow these steps:

1. Add the custom serialization function of the data source and serialize the filter from the client-side:

```javascript
   var escapeQuoteRegExp = /'/ig;

    function encodeFilterValue(value, encode) {
        if (typeof value === "string") {
            if (value.indexOf('Date(') > -1) {
                value = new Date(parseInt(value.replace(/^\/Date\((.*?)\)\/$/, '$1'), 10));
            } else {
                value = value.replace(escapeQuoteRegExp, "''");

                if (encode) {
                    value = encodeURIComponent(value);
                }

                return "'" + value + "'";
            }
        }

        if (value && value.getTime) {
            return "datetime'" + kendo.format("{0:yyyy-MM-ddTHH-mm-ss}", value) + "'";
        }
        return value;
    }

    function serializeFilter(filter, encode) {
        if (filter.filters) {
            return $.map(filter.filters, function (f) {
                var hasChildren = f.filters && f.filters.length > 1,
                    result = serializeFilter(f, encode);

                if (result && hasChildren) {
                    result = "(" + result + ")";
                }

                return result;
            }).join("~" + filter.logic + "~");
        }

        if (filter.field) {
            return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value, encode);
        } else {
            return undefined;
        }
    }
    $("#export-filter").val(encodeURIComponent(serializeFilter(grid.dataSource.filter())));
```

2. On the server, parse the filter into a `FilterDescriptor`:

```csharp
var filters = FilterDescriptorFactory.Create(filter);
```

3. Execute the filter expression over your data collection and retrieve the data items only:

```csharp
var filteredData = students.ToDataSourceResult(new DataSourceRequest() { Filters=filters, Page=1 }).Data;
```


## Notes

- The filter parameter contains the currently applied filters to the columns.
- If you encounter issues with exporting to CSV, ensure that the mime type is set correctly.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

- [Grid Server Export Demo](https://demos.telerik.com/aspnet-core/grid/server-export)
