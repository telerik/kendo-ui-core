---
title: Showing Notifications in an Inline Editable Grid
description: How can I show success and error notification messages when editing the Grid inline? Find the solution in the {{ site.product }} Knowledge Base.
type: how-to
page_title: Show Notifications when Editing Inline Grid
slug: grid-show-notifications
tags: grid, notification, messages, inline, editing
res_type: kb
ticketid: 1580942
component: grid, notification
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.3.913</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I show success and error notification messages when editing Inline Grid?

## Solution

1. Create a [Notification component](https://demos.telerik.com/{{ site.platform }}/notification) with templates for success and error messages. 

    ```
        <div id="notification-container"></div>

        @(Html.Kendo().Notification()
            .Name("gridNotification")
            .AppendTo("#notification-container")
            .HideOnClick(true)
            .AllowHideAfter(200)
            .Templates(t =>
            {
            t.Add().Type("error").ClientTemplateID("errorTemplate"); // Specify a template for errors.
            t.Add().Type("success").ClientTemplateID("successTemplate"); // Specify a template for success.
            })
        )

        <script id="errorTemplate" type="text/x-kendo-template">
            <p>#= message #</p>
        </script>

        <script id="successTemplate" type="text/x-kendo-template">
            <div class="edit-success">
                <span class="k-icon k-i-check-circle"></span><span>#= message #</span>
            </div>
        </script>
    ```

1. Handle the [`RequestEnd` event of the DataSource](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requeststartsystemfunc) that triggers when a remote request is finished. If the request type is `"update"` and the server response has no errors, display the Notification with the respective message for success.

    ```
        @(Html.Kendo().Grid<GridViewModel>()
            .Name("grid")
            .DataSource(ds => ds
                .Ajax()
                .Events(e => e.RequestEnd("onRequestEnd"))
                ...
            )
            ...
        )

        <script>
            function onRequestEnd(e) {
                if(e.type == "update") {
                    if (e.response.Errors == null) {
                        var notification = $("#gridNotification").data("kendoNotification"); // Get a reference of the Notification.
                        notification.show({ // Display it.
                            message: "Record Saved Successfully!"
                        }, "success");
                    }
                }
            }
        </script>
    ```

1. Handle the [`Error` event of the DataSource](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datasourceeventbuilder#errorsystemfunc) that triggers when the request to the remote endpoint fails. in the event handler, display the errors, call the `cancelchanges()` method of the grid as is explained in [the handling `modelstate` errors section in the documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/editing/inline#handling-modelstate-errors), and display the Notification with the respective message for the error.


    ```
        @(Html.Kendo().Grid<GridViewModel>()
            .Name("grid")
            .DataSource(ds => ds
                .Ajax()
                .Events(e => e.Error("onError"))
                ...
            )
            ...
        )

        <script>
            function onError(e) { // The event will fire when there are Model State errors.
                if (e.errors) {
                    var message = "There are some errors:\n";
                    // Create a message containing all errors.
                    $.each(e.errors, function (key, value) {
                        if ('errors' in value) {
                            $.each(value.errors, function () {
                                message += this + "\n";
                            });
                        }
                    });
                    // Display the message.
                    var notification = $("#gridNotification").data("kendoNotification"); // Get a reference of the Notification.
                    notification.show({ // Display it.
                        message: "Record is not saved!"
                    }, "error");

                    // Cancel the changes.
                    var grid = $("#grid").data("kendoGrid");
                    grid.cancelChanges();
                }
            }
        </script>
    ```






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

* [Inline Editing in the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/editing/inline)
* [Notification Component for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/notification/overview)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
