---
title: Change Kendo UI Switch Messages Inside a Grid
description: An example which shows two ways to change the messages for the Kendo UI Switch in a Grid
type: how-to
page_title: Configure Messages for Checked and Unchecked Inside Grid
slug: switch-change-messages-inside-grid
position: 
tags: switch, grid, messages, change, databound
ticketid: 1434769
res_type: kb
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
Is there is a way to change the Kendo UI Switch message Ok button and Cancel button while it is bound to a Kendo UI Grid row?

## Solution
The Kendo UI Switch can be set as a [ClientTemplate](https://docs.telerik.com/aspnet-mvc/helpers/data-management/grid/faq#how-can-i-use-kendo-ui-widgets-inside-grid-client-column-templates) inside a Kendo UI Grid.  The [switch's messages](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/configuration/messages) can be configured within the razor or changed during the [DataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) using the setOptions method.  

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

## See Also
* [How can I use Kendo UI widgets inside Grid client column templates?](https://docs.telerik.com/aspnet-mvc/helpers/data-management/grid/faq#how-can-i-use-kendo-ui-widgets-inside-grid-client-column-templates)
* [messages property - Kendo UI Switch jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/configuration/messages)
* [dataBound event - Kendo UI Switch jQuery API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
