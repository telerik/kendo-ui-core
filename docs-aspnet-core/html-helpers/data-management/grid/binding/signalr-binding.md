---
title: SignalR Binding
page_title: SignalR Binding | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn the basics when working with the Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_grid_aspnetcore_signalrbinding
previous_url: /aspnet-core/helpers/html-helpers/grid/signalr-binding
---

# SignalR Binding

As of the [ASP.NET Core R2 2018 release](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.1), the suite provides SignalR support for its components.

> **Important**
>
> The feature is tested with SignalR 1.0.0-rc1-final.

The feature relies on the client-side implementation of SignalR. It can be used with both the MVC and Core wrappers of the Grid since they wrap the [jQuery Grid widget](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview).

### Configuration

The following example uses Long Polling because [WebSockets](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-2.1) work only in [some scenarios](https://github.com/aspnet/SignalR/issues/1457#issuecomment-366280873) and [server-sent events](https://caniuse.com/#search=server%20sent%20events) are not supported by IE/Edge.

The following snippet demonstrates a sample implementation of a Grid which uses SignalR. The service that is used is available in [this GitHub repository](https://github.com/telerik/kendo-ui-demos-service/tree/master/signalr-hubs).

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

### See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [ASP.NET Core SignalR Get Started](https://docs.microsoft.com/en-us/aspnet/core/signalr/get-started?view=aspnetcore-2.1&tabs=visual-studio)
