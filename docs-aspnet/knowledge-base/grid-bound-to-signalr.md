---
title: Bind Grids to SignalR Hub
page_title: Bind Grids to SignalR Hub
description: "Configure the {{ site.product }} Grid to show real-time push-notifications from SignalR(v2) with local hub."
previous_url: /helpers/data-management/grid/how-to/Binding/grid-bound-to-signalr, /html-helpers/data-management/grid/how-to/Binding/grid-bound-to-signalr
slug: howto_bindgridtosignalrhub_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I bind the Grid to [SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/) Hub for real-time push notifications?

## Solution

Follow the steps below to configure the Grid's DataSource for [SignalR binding]({% slug htmlhelpers_grid_aspnetcore_signalrbinding%}):

1. Add a reference to the [ASP.NET SignalR client-side library](https://learn.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client).

    ```HTML
    <script src="https://cdn.jsdelivr.net/npm/signalr@2.4.3/jquery.signalR.min.js"></script>
    ```

1. Initialize and start the hub.

    ```JS
    <script>
        var hubUrl = "path/to/hub";
        var connection = $.hubConnection(hubUrl, { useDefaultPath: false });
        var hub = connection.createHubProxy("productHub");
        var hubStart = connection.start({ jsonp: true });
    </script>
    ```

1. Define the Grid and its DataSource instance appropriately: 

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("Grid")
        ... // Additional configuration.
        .DataSource(dataSource => dataSource
            .SignalR()
            .AutoSync(true)
            .Events(events => events.Push(@<text>
                function(e) {
                    var notification = $("#notification").data("kendoNotification");
                    notification.success(e.type);
                }
            </text>))
            .PageSize(10)
            .Transport(tr => tr
                .Promise("hubStart")
                .Hub("hub")
                .Client(c => c
                    .Read("read")
                    .Create("create")
                    .Update("update")
                    .Destroy("destroy"))
                .Server(s => s
                    .Read("read")
                    .Create("create")
                    .Update("update")
                    .Destroy("destroy")))
            .Schema(schema => schema
                .Model(model =>
                {
                    model.Id(m => m.ProductID);
                    model.Field(m => m.ProductID).Editable(false);
                })
            )
        )
    )
    ```

To review the complete example, refer to the [ASP.NET MVC project on how to set up the Grid for real-time push-notifications from SignalR(v2) with a local hub](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridSignalR).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
