---
title: Changing Switch Messages Inside a Grid
description: An example which shows two ways to change the messages for the {{ site.product }} Switch in a Grid
type: how-to
page_title: Configuring Messages for Checked and Unchecked Inside Grid
slug: switch-change-messages-inside-grid
position: 
tags: switch, grid, messages, change, databound
ticketid: 1434769
res_type: kb
components: ["general"]
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description

Is there a way to change the Switch message **OK** button and **Cancel** button while it is bound to a {{ site.product }} Grid row?

## Solution

The Kendo UI Switch can be set as a [`ClientTemplate`](https://docs.telerik.com/aspnet-mvc/helpers/data-management/grid/faq#how-can-i-use-kendo-ui-widgets-inside-grid-client-column-templates) inside a Kendo UI Grid.  The [switch's messages](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/configuration/messages) can be configured within the razor or changed during the [`DataBound` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) using the `setOptions` method.  

```Razor
    @(Html.Kendo().Grid<SwitchInGridMessageChange.Models.OrderViewModel>()
        .Name("ProjectGrid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderID).Filterable(false);
            columns.Template(@<text></text>).HtmlAttributes(new { @class = "templateCell" }).ClientTemplate(
                Html.Kendo().Switch()
                    .Name("switch_#=OrderID#")
                    .HtmlAttributes(new { @class = "ProjectStatusStartedClass" })
                    .Enabled(true)
                    .Width(140)
                    //.Messages(e => e.Checked("Approve").Unchecked("Reject"))  //Approach 1: Can include here in switch
                    .ToClientTemplate().ToHtmlString()
                );
        })
        .Events(e => e.DataBound("onDataBound"))
        ...
    )
```
```JavaScript
    function onDataBound(e) {
        
        //scripts must be evaluated manually 
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());  
        });

        //Approach 2: setOptions()    

        //reference all switch elements
        var switchElements = this.tbody.find("input.ProjectStatusStartedClass");  

        //for each element, set the messages
        $(switchElements).each(function (e, switchElement) {  
            var myswitch = $(switchElement).data("kendoSwitch");
            myswitch.setOptions({
                messages: {
                    checked: "approve",
                    unchecked: "reject"
                }
            });
        });
    }
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid)

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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
