---
title: Data Binding
page_title: jQuery Scheduler Documentation | Data Binding
description: "Get started with the jQuery Scheduler by Kendo UI and bind the widget to local data arrays or remote data services."
slug: databinding_kendoui_scheduler
position: 2
---

# Data Binding

The Scheduler provides options for binding it to local data arrays and remote data services.

## Binding to Local Data

When you bind the Scheduler to a local data array, you can switch from a **Day** to a **Week** view, edit, create, and delete events. However, these changes will not be kept in-memory which means that they will be lost when the user refreshes the page.

The following example demonstrates how to initialize a Scheduler with two events and how to bind it to an array of JavaScript objects.

    <!-- HTML element in which the Kendo UI Scheduler will initialize -->
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"), // The current date of the scheduler
      dataSource: [ // The kendo.data.SchedulerDataSource configuration
        // The first Scheduler event.
        {
          id: 1, // A unique identifier. Needed for editing.
          start: new Date("2013/6/6 08:00 AM"), // The start of the event.
          end: new Date("2013/6/6 09:00 AM"), // The end of the event.
          title: "Breakfast" // The title of the event.
        },
        // The second Scheduler event.
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview"
        }
      ]
    });
    </script>

## Binding to Remote Data

You can bind the Scheduler to a remote service which will return, create, update, or delete Scheduler events. The [online Kendo UI Scheduler demos](https://demos.telerik.com/kendo-ui/scheduler/index) use a demo remote service which returns sample Gantt tasks and dependencies. To support cross-domain requests, the remote service uses [JSONP](https://en.wikipedia.org/wiki/JSONP).

> If the service you use resides in the same domain as your website, use JSON instead. For more information on cross-domain requests, refer to [this article]({% slug corsdatafetching_anotherdomain_datasourcecomponent %}).

The following example demonstrates how to bind the widget to a remote service. Note how the fields of the event in the `schema.model` section are configured and mapped to the fields that are returned by the remote service by using the `from` option.

    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        timezone: "Etc/UTC", // Setting the timezone is recommended when binding to a remote service.
        dataSource: {
            batch: true, // Enable the batch updates.
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId", // The "id" of the event is the "taskId" field.
                    fields: {
                        // Describe the Scheduler event fields and map them to the fields that are returned by the remote service.
                        taskId: {
                            from: "TaskID", // The 'TaskID' server-side field is mapped to the 'taskId' client-side field.
                            type: "number"
                        },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        }
    });

## Best Practices

When you bind the Scheduler to a remote service:

* Set the [`timezone`](/api/web/scheduler#configuration-timezone) option of the Scheduler. It is used to indicate to the widget in what timezone its events are created and stored on the server. If the timezone is not set, the Scheduler will use the current timezone. This means that users with different timezone settings will see different start and end times. Setting the timezone of the Scheduler will make the widget display the same start and end times regardless of the current user timezone. For more information, refer to the [article about timezones]({% slug timezones_kendoui_scheduler_widget %}).
* Send the start and end date fields of the Scheduler event to the remote service in [UTC format](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). The `parameterMap` option from the previous example implements the same functionality.

        parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
            }
        }

* Store the start and end date fields of the Scheduler event in UTC format as well. This approach will allow for an easier migration of your data between servers in different timezones.

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
