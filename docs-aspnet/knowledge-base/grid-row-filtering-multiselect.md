---
title: Grid Multiple Checkbox Filtering in Row Mode
description: How to combine both Grid Row Filtering mode and the Multi Checkbox configuration available for the Menu.
type: how-to
page_title: Combining Grid Row Filtering with Multiple Checkboxes
slug: grid-row-filtering-multi-select
position: 
tags: grid, row, filtering, multiselect, multi, multiple checkboxes
ticketid: 1626077
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.2.829</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>Grid for ASP.NET Core</td>
        </tr>
    </tbody>
</table>


## Description
I noticed that the Multi Checkbox configuration only has effect when the Grid's FilterMode is set to Menu. Is there a way to use the Multiple Checkboxes in Row FilterMode?

## Solution

Here are the required steps to achieve the custom scenario:

1. Enable the MultiCheckbox Filtering with the desired column.
``` columns.Bound(p => p.ShipName).Filterable(ftb => ftb.Multi(true)).Width(500); ```
2. Subscribe to the [DataBound Event](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) of the Component.
``` .Events(e=>e.DataBound("onDataBound")) ```
3. When the Grid initializes make sure to enable both its Menu and Row filtering with the [setOptions method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions).
```
    $(document).ready(function(){
        var grid = $("#grid").data("kendoGrid");
        grid.setOptions({
            filterable: {
                mode: "menu, row"
            }
        })
    })
```

4. In the onDataBound handler, hide the unnecessary menu icons and place the icon that opens the Multi Checkbox Menu in the Row Filtering header. 
```
    function onDataBound(E){
        var menuFilters = E.sender.thead.find("th>span>a"); //select the menu filters of the columns
        var multifilter = E.sender.thead.find("th[data-field='ShipName']>span>a"); // select the element that opens the Multi Checkbox Menu
        menuFilters.hide(); // hide the menu filters
        multifilter.show(); // show the Multi Checkbox Menu element
          if(multifilter){
            $("span[data-field='ShipName']").first().replaceWith(multifilter); // replace the row filter with the element that opens the Multi Checkbox
            multifilter.wrap("<span class='nameFilter k-button k-button-icon k-dropdown-wrap'></span>"); // wrap the icon with a span to ease styling
          }
        }
```
5. Style the icon button.
```CSS
      .nameFilter{
        height:15px;
      }
      .nameFilter > .k-grid-filter-menu {
        height:15px !important;
        padding: 0;
        left: 0;
        bottom: 0px !important;
      }
```

Review the behavior in [this Telerik REPL example](https://netcorerepl.telerik.com/mHPuuguw58YRe9JU26).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation](/html-helpers/data-management/grid/overview)

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
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [TagHelper API Reference of the Grid](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)