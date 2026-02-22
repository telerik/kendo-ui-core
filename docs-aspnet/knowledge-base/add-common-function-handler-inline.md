---
title: Adding a Common Function Delegate Handler on Events
description: Learn how to incorporate a common function delegate handler.
page_title: Adding a Common Function Delegate Handler on Events
slug: add-common-function-handler-inline
tags: function, parameters, event, handler, grid, button, action, inline, template, delegate, telerik, core, mvc
ticketid: 1656801
res_type: kb
components: ["general"]
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>{{ site.product }}</td>
		</tr>
	</tbody>
</table>

## Description
How can I create common function handler that can be reused in different modules. But with supplemented parameters of different kind based on custom logic? For example, in the {{ site.product }} Grid columns.

## Solution

In the context of {{ site.product }} Helpers, adding a function with additional parameters requires a given event to expose a delegate overload. 

Most of the {{ site.product }} Components event handlers provide this overload. This allows you to subscribe to events by a {% if site.core %} [`Func<TResult>`](https://learn.microsoft.com/en-us/dotnet/api/system.func-1?view=net-8.0) delegate{% else %} [`Func<TResult>`](https://learn.microsoft.com/en-us/dotnet/api/system.func-2?view=netframework-4.7.2) delegate{% endif%}.

The following example demonstrates how to achieve the desired outcome:

1. Utilize the [.Click()](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridcustomactioncommandbuilder#clicksystemfunc) configuration method in order to employ a delegate.
1. Within the delegate, pass an [anonymous function](https://www.geeksforgeeks.org/javascript-anonymous-functions/).
1. Inside the anonymous function, call a common function handler with additionally passed arguments.

```HtmlHelper
   @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(e => e.FirstName);
            columns.Bound(e => e.LastName);
            columns.Bound(e => e.Title);
            columns.Command(command =>
            {
                command.Custom("ViewEnvelope")
                        .Click(@<text>
                            function(){
                                envelopeAction(event, "View")
                            }
                        </text>)
                        .Text("View")
                        .IconClass("k-icon k-i-envelop")
                        .HtmlAttributes(new { title = "View Envelope" });
                
                command.Custom("ApproveEnvelope")
                        .Click(@<text>
                            function(){
                                envelopeAction(event, "Approve")
                            }
                        </text>)
                        .Text("Approve")
                        .IconClass("k-icon k-i-check-circle")
                        .HtmlAttributes(new { title = "Approve Envelope" });
                
                command.Custom("RejectEnvelope")
                        .Click(@<text>
                            function(){
                                envelopeAction(event, "Reject")
                            }
                        </text>)
                        .Text("Reject")
                        .IconClass("k-icon k-i-cancel")
                        .HtmlAttributes(new { title = "Reject Envelope" });
            }).Width(350);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("CustomCommand_Read", "Grid"))
        )
    )
```
 {% if site.core %}
```TagHelper
	<kendo-grid name="Grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("CustomCommand_Read", "Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="FirstName"/>
            <column field="LastName"/>
            <column field="Title"/>
            <column width="350">
                <commands>
                    <column-command text="View" icon-class="k-icon k-i-envelop" title = "View Envelope"
                            click="function(){ envelopeAction(event, 'View');}" />
                    <column-command text="Approve" icon-class="k-icon k-i-check-circle" title = "Approve Envelope"
                            click="function(){ envelopeAction(event, 'Approve');}" />
                    <column-command text="Reject" icon-class="k-icon k-i-cancel"  title = "Reject Envelope"
                            click="function(){ envelopeAction(event, 'Reject');}" />
                </commands>
            </column>
        </columns>
    </kendo-grid>
```
 {% endif %}

```JS script.js
    <script>
        function envelopeAction(e, action){
            switch(action){
                case "View":
                    alert("View Action Clicked")
                break;
                case "Approve":
                    alert("Approve Action Clicked")
                break;
                case "Reject":
                    alert("Reject Action Clicked")
                break;
            }
        }    
    </script>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/ceuLPqFe26FY1u6A24)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/wSELFDPl090swHjc22)

{% else %}
For a runnable example based on the code above, refer to the [REPL example on adding a common function delegate handler with additional parameters on events](https://netcorerepl.telerik.com/ceuLPqFe26FY1u6A24).
{% endif %}

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik REPL for Adding a Common Function handler through a Delegate](https://netcorerepl.telerik.com/ceuLPqFe26FY1u6A24)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
