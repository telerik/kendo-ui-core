---
title: Showing a Message When the Chart Has No Data
page_title: Showing a Message When the Chart Has No Data
description: An example on how to show a message when the {{ site.product }} Chart has no data.
slug: chart-no-data-message
tags: telerik, chart, no, data, message
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I display a message in the {{ site.product }} Chart when its data source is empty?

## Solution

The following example demonstrates how to achieve such behavior in the {{ site.product }} Chart. Note that the `div` element of the message is positioned and decorated through CSS.


```Razor Index.cshtml

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Events(ev=>ev.Render("onRender"))
    )

```
```JS script.js
    <script>
        function onRender(e) {
            var view = e.sender.dataSource.view();
            var parent = e.sender.element.closest('.container')
            createOverlay(view.length, parent)
        }
        function createOverlay(viewLength, parent) {
            if (viewLength === 0) {
                parent.append("<div class='overlay'><div>No Data</div></div>")
            }
        }
    </script>
```
```C# Style.css

    <style>
        .container {
        position: relative;
        }

        .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .5;
        background-color: #6495ed;
        text-align: center;
        }

        .overlay div {
        position: relative;
        font-size: 34px;
        margin-top: -17px;
        top: 50%;
        }
    </style>

```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on displaying the {{ site.product }} Chart when its data source is empty](https://netcorerepl.telerik.com/cQbPQFFd41Tge1n326).

## More {{ site.framework }} Chart Resources

* [{{ site.framework }} Chart Documentation]({%slug htmlhelpers_charts_aspnetcore%})

* [{{ site.framework }} Chart Demos](https://demos.telerik.com/{{ site.platform }}/charts/index)

{% if site.core %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-core-ui/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-mvc/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL Example on Displaying the {{ site.product }} Chart When Its Data Source is Empty](https://netcorerepl.telerik.com/cQbPQFFd41Tge1n326)
* [Client-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
