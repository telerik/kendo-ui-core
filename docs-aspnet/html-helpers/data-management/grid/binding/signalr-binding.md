---
title: SignalR Binding
page_title: SignalR Binding
description: "Learn the basics when working with the Grid HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_signalrbinding
previous_url: /helpers/html-helpers/grid/signalr-binding
position: 4
---

# SignalR Binding

As of the [{{ site.framework }} R2 2018 release](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.1), the suite provides SignalR support for its components.

> The feature is tested with SignalR 1.0.0-rc1-final.

The SignalR binding feature relies on the client-side implementation of SignalR. It can be used with both the MVC and Core wrappers of the Grid since they wrap the [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview). For a runnable example, refer to the [demo on SignalR binding of the Grid HtmlHelper](https://demos.telerik.com/{{ site.platform }}/grid/signalr).

The following example:
* Demonstrates a sample implementation of a Grid which uses SignalR. The service that is used is available in [this GitHub repository](https://github.com/telerik/kendo-ui-demos-service/tree/master/signalr-hubs).
* Uses Long Polling because [WebSockets](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-2.1) work only in [some scenarios](https://github.com/aspnet/SignalR/issues/1457#issuecomment-366280873) and [server-sent events](https://caniuse.com/#search=server%20sent%20events) are not supported by IE/Edge.

```JavaScript
$(document).ready(function() {
    var hubUrl = "http://domain/signalr-service/products";
    var hub = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
            transport: signalR.HttpTransportType.LongPolling
        })
        .build();

    var hubStart = hub.start();
});

function onPush(e) {
    var notification = $("#notification").data("kendoNotification");
    notification.success(e.type);
}

```
```Razor
@(Html.Kendo().Notification()
        .Name("notification")
        .Width("100%")
        .Position(position => position
            .Top(50)
            .Left(50))
)

@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.CreatedAt);
            columns.Command(command =>
            {
                command.Edit();
                command.Destroy();
            }).Width(150);
        })
        .HtmlAttributes(new { style = "height: 550px;margin-bottom:20px;" })
        .ToolBar(toolbar =>
        {
            toolbar.Create();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .SignalR()
            .AutoSync(true)
            .Events(events => events.Push("onPush"))
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
                    model.Id("ID");
                    model.Field("ID", typeof(string)).Editable(false);
                    model.Field("ProductName", typeof(string));
                    model.Field("CreatedAt", typeof(DateTime));
                    model.Field("UnitPrice", typeof(int));
                }
                )
            )
        )
)
```

## See Also

* [SignalR Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [Official Microsoft Documentation on Getting Started with {{ site.framework }} SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/get-started?view=aspnetcore-2.1&tabs=visual-studio)
* [Server-Side API](/api/grid)
