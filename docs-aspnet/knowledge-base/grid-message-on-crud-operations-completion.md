---
title: Showing a Message When a Grid Server Request Is Completed
description: "Learn how to use the events of the {{ site.product }} Grid to notify the user when a rows is created, updated, or deleted successfully."
type: how-to
page_title: Notify Users of the Server Operations {{ site.product }} Grid Result
slug: grid-message-on-crud-operations-completion
tags: grid, message, crud, create, update, destroy, events, server, request, notification
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>

## Description

I have a Grid with CRUD operations. Once the `Controller` processes the request, I want to display a message to the user through a JavaScript alert whether the process has succeeded or not.

## Solution

To show a message when a `create`, `update`, or `delete` operation is performed in the Grid:

1. Define a global `successfullOperation` variable to hold the text of the type of the operation.
2. Subscribe and handle the [`RequestEnd` event](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requestend) of the Grid's DataSource. There, set the value of the global variable.
3. Subscribe to the [`Error` event](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/error) of the Grid's DataSource.
4. In the handler, set the value of the `successfulOperation` to be an empty string in case an `Error` event is thrown and the operation failes.
5. Subscribe to the [`DataBound` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) of the Grid.
6. In the `onDataBound` handler, check whether the global variable is set. If set, show the message.

```HtmlHelper
    ...
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Events(events => events.Error("onError").RequestEnd("onEnd"))
        .Model(model => model.Id(p => p.ProductID))
        .Create(update => update.Action("Create", "Grid"))
        .Read(read => read.Action("Read", "Grid"))
        .Update(update => update.Action("Update", "Grid"))
        .Destroy(update => update.Action("Destroy", "Grid"))
    )
    .Events(e=>e.DataBound("onDataBound"))
```
```JavaScript
    var successfullOperation = "";
    function onDataBound(e) {
        if (successfullOperation.length > 0) {
            alert("Row was "+successfullOperation+" successfully.")
        }
        successfullOperation = "";
    }
    function onEnd(e) {
        console.log(e)
        if (e.type == "destroy") {
            successfullOperation = "deleted"
        } else if (e.type == "update") {
            successfullOperation = "updated"
        } else if (e.type == "create") {
            successfullOperation = "created"
        }
    }
    function onError(e) {
        successfullOperation = "";
        if (e.errors) {
            var message = "Errors:\n";
            $.each(e.errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function () {
                        message += this + "\n";
                    });
                }
            });
            alert("error");
        }
    }
```

To explore the complete behavior, see the Telerik REPL example on how to [display a message upon a server response to the `Update`, `Create`, and `Destroy` requests performed by the Grid](https://netcorerepl.telerik.com/QduQkAlP18HPzzFR26).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
