---
title: Formatting ProgressBar Value
description: An example of how to format the value displayed in the Telerik UI for {{ site.framework }} ProgressBar that is integrated into a Grid column.
type: how-to
page_title: Formatting ProgressBar Value
slug: progressbar-format-value
tags: progressbar, format, value, grid, column
ticketid: 1652206
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} ProgressBar</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I format the current value of the ProgressBar that is displayed into a Grid column?

By design, the underlying value of the ProgressBar must be a number. In some cases, the value must be formatted. For example, when the number groups must be comma-separated to match the current culture.

## Solution

Follow the steps below to initialize a ProgressBar into a specified Grid column and format its value based on the French (`fr-FR`) culture:

1. Add the ProgressBar element through the `ClientTemplate()` option of the Grid's column.

  ```HtmlHelper
    columns.Bound(p => p.Freight).ClientTemplate("<div class='progress'></div>");
  ```
  {% if site.core %}
  ```TagHelper
    <column field="Freight" template="<div class='progress'></div>" />
  ```
  {% endif %}

1. Handle the `DataBound` event of the Grid, select the `div` elements with class `progress` and initialize the ProgressBar component in each column cell.

  ```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
      .Name("grid")
      .Events(ev => ev.DataBound("onDataBound"))
      ...// Other configuration.
    )
  ```
  {% if site.core %}
  ```TagHelper
    <kendo-grid name="grid" on-data-bound="onDataBound">
      <!-- Other configuration -->
    </kendo-grid>
  ```
  {% endif %}
  ```Scripts
    <script>
      function onDataBound(e) {
        var grid = this;
        grid.tbody.find(".progress").each(function (e) {
            var row = $(this).closest("tr");
            var model = grid.dataItem(row);
            $(this).kendoProgressBar({
                max: model.Freight,
                value: model.Freight
            })
        });
      }
    </script>
  ```

1. Within the `DataBound` event handler, select the `k-progressbar` elements, and access the respective ProgressBar value through the `k-progressbar-status` element. Use the [`kendo.parseFloat()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/parsefloat) and [`kendo.toString()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/tostring) methods to format the value and update it with jQuery.

  ```Scripts
    <script>
      function onDataBound(e) {
        var grid = this;
        grid.tbody.find(".progress").each(function (e) {
            ... 
        });

        $.each($(".k-progressbar"), function(){
          let currentValue = $(this).find(".k-progress-status").text();
          $(this).find(".k-progress-status").text(kendo.toString(kendo.parseFloat(currentValue), 'n2', 'fr-FR'));
        });
      }
    </script>
  ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid and ProgressBar HtmlHelpers](https://netcorerepl.telerik.com/GykLQIlH233FLp0u38)
* [Sample code with the Grid and ProgressBar TagHelpers](https://netcorerepl.telerik.com/GSkhGybH25bau4l909)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on formatting the value of ProgressBar displayed into a Grid column](https://netcorerepl.telerik.com/GykLQIlH233FLp0u38).
{% endif %}

## More {{ site.framework }} ProgressBar Resources

* [{{ site.framework }} ProgressBar Documentation]({%slug htmlhelpers_progressbar_aspnetcore%})

* [{{ site.framework }} ProgressBar Demos](https://demos.telerik.com/{{ site.platform }}/progressbar)

{% if site.core %}
* [{{ site.framework }} ProgressBar Product Page](https://www.telerik.com/aspnet-core-ui/progress-bar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ProgressBar Product Page](https://www.telerik.com/aspnet-mvc/progressbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ProgressBar for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
* [Server-Side API Reference of the ProgressBar for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/progressbar)
{% if site.core %}
* [Server-Side TagHelper API Reference of the ProgressBar for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/progressbar)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
