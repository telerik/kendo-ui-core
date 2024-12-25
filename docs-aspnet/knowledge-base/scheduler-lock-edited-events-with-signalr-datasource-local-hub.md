---
title: Lock Edited Events of Scheduler Configured for SignalR Binding Using Local Hub
description: Learn how to lock edited events in the {{ site.product }} Scheduler when using SignalR DataSource with local hub.
type: how-to
page_title: Lock Edited Events of Scheduler Configured for SignalR Binding Using Local Hub
previous_url: /helpers/scheduling/scheduler/how-to/lock-edited-events-with-signalr-datasource-local-hub, /html-helpers/scheduling/scheduler/how-to/lock-edited-events-with-signalr-datasource-local-hub, /helpers/scheduling/scheduler/how-to/signalr-local-hub-locking-events, /html-helpers/scheduling/scheduler/how-to/signalr-local-hub-locking-events
slug: scheduler-lock-edited-events-with-signalr-datasource-local-hub
tags: scheduler, signalr, datasource, local, hub, lock, events, edit, real-time, push-notifications, telerik, core, mvc
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I lock the edited events of the {{ site.framework }} Scheduler that uses SignalR DataSource with a local hub?

## Solution

This example demonstrates locking the currently edited events of the Scheduler so the events cannot be edited, deleted, moved, or resized until they are saved (unlocked).

1. Disable the default events editing of the Scheduler by using the [`Editable.Update()`](/api/kendo.mvc.ui.fluent/schedulereditablesettingsbuilder#updatesystemboolean) configuration.

    ```HtmlHelper
            @(Html.Kendo().Scheduler<MeetingViewModel>()
                .Name("scheduler")
                .Editable(editable => editable.Update(false))
                ...// Additional configuration.
            )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <editable update="false"></editable>
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    {% endif %}

1. Track the state of the locked and unlcoked events using their `id`. The `lockedRecords` global object stores their state.

    ```JS
        <script>
            var lockedRecords = {};
            var hubStart = {};

            // Create a new SignalR connection to the specified hubUrl.
            var hubUrl = "https://demos.telerik.com/kendo-ui/service/signalr/hubs";
            var connection = $.hubConnection(hubUrl, { useDefaultPath: false });
            var productHub = connection.createHubProxy("meetingHub");

            $(function () {
                // Define functions that will lock and unlock the events by using their Ids.
                productHub.lockRecord = function (record) {
                    lockedRecords[record.id] = true;
                };

                productHub.unlockRecord = function (record) {
                    lockedRecords[record.id] = false;
                }

                hubStart = connection.start({ jsonp: true });
            });
        </script>
    ```
    ```ProductHub.cs
        public class ProductHub : Hub
        {
            public void LockRecord(int id)
            {
                Clients.Others.lockRecord(new
                {
                    id = id
                });
            }

            public void UnlockRecord(int id)
            {
                Clients.Others.unlockRecord(new
                {
                    id = id
                });
            }
        }
    ```

1. When the page with the Scheduler is loaded, handle the [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event) event over the events, prevent its default action (editing), and check if the double-clicked event is locked for editing. If not, trigger the Scheduler's [`Edit`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#editsystemstring) event.

    ```JS
        <script>
            // After the Scheduler declaration.
            $(function () {
                var scheduler = $("#scheduler").data("kendoScheduler");

                scheduler.element.on("dblclick", ".k-event", function (e) { // Handle the "dblclick" event of the Scheduler events and prevent its default action (the opening of the Popup eidtor).
                    e.preventDefault();

                    var eventUid = $(this).closest(".k-event").attr(kendo.attr("uid")); // Get the "uid" of the event.
                    var event = scheduler.occurrenceByUid(eventUid); // Access the event data using its "uid".

                    if (!lockedRecords[event.id]) { // If the cliked event is not locked for editing.
                        $.connection.productHub.server.lockRecord(event.id); // Lock it.
                        scheduler.view().trigger("edit", { uid: eventUid }); // Trigger the "edit" event of the Scheduler that will open its Popup editor.
                    } else {
                        alert("Currently the event cannot be edited");
                        return false;
                    }
                });
            });
        </script>
    ```

1. Handle the [`DataBound`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) event of the Scheduler and handle the `click` event of the **Delete** event icon. Use a custom function to check if the event that the user wants to delete is currently locked.

    ```JS
        <script>
            function onDataBound(e) {
                // Handle the "click" event of the event's "Delete" icon.
                this.view().content.on("click", ".k-event-delete", preventEvent);
            }

            function preventEvent(e) {
                var scheduler = $("#scheduler").data("kendoScheduler");
                var eventUid = $(this).closest(".k-event").attr(kendo.attr("uid"));
                var event = scheduler.occurrenceByUid(eventUid); // Select the event's data by using its "uid".

                if (lockedRecords[event.id]) { // Check if the event is locked.
                    e.stopImmediatePropagation() // If the event is currently locked for editing, prevent the deleting of the event and inform the user.
                    alert("Currently the event cannot be deleted");
                }
            }
        </script>
    ```

1. Handle the [`Edit`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#editsystemstring) and [`Save`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#savesystemstring) events of the Scheduler to unlock the respective event when the user cancels the editing or when the event is saved.

    ```JS
        <script>
            function onEdit(e) {
                var model = e.event;
                e.container.find(".k-scheduler-cancel").click(function () {
                    $.connection.productHub.server.unlockRecord(model.id);
                });
            }

            function onSave(e) {
                productHub.unlockRecord(e.event.id);
            }
        </script>
    ```

1. Handle the [`MoveStart`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#movestartsystemstring) and [`MoveEnd`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#moveendsystemstring) events of the Scheduler to prevent the moving of a currently locked event or unlocking the event when it is moved successfully.

    ```JS
        <script>
            function onMoveStart(e) {
                var scheduler = this;
                var event = e.event;

                if (!lockedRecords[event.id]) {
                    $.connection.productHub.server.lockRecord(event.id); // Lock the event when the user starts moving it.
                } else {
                    alert("Currently the event cannot be moved");
                    e.preventDefault(); // Prevent the moving of the event when it is already locked.
                }
            }

            function onMoveEnd(e) {
                $.connection.productHub.server.unlockRecord(e.event.id); // Unlock the event when it is moved successfully.
            }
        </script>
    ```

1. Handle the [`ResizeStart`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#resizestartsystemstring) and [`ResizeEnd`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#resizeendsystemstring) events of the Scheduler to prevent the resizing of a currently locked event or unlocking the event when it is resized successfully. 

    ```JS
        <script>
            function onResizeStart(e) {
                var scheduler = this;
                var event = e.event;

                if (!lockedRecords[event.id]) {
                    $.connection.productHub.server.lockRecord(event.id); // Lock the event when the user starts resizing it.
                } else {
                    alert("Currently the event cannot be resized");
                    e.preventDefault(); // Prevent the resizing of the event when it is already locked.
                }
            }

            function onResizeEnd(e) {
                $.connection.productHub.server.unlockRecord(e.event.id); // Unlock the event when it is resized successfully.
            }
        </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerSignalRLocalHub) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore%})

* [{{ site.framework }} Scheduler Demos](https://demos.telerik.com/{{ site.platform }}/scheduler/index)

{% if site.core %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-core-ui/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-mvc/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

