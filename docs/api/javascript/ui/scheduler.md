---
title: Scheduler
page_title: Configuration, methods and events of Kendo UI Scheduler
description: How to configure and control methods in Scheduler UI widget, which events to use to open, close, change, select.
res_type: api
component: scheduler
---

# kendo.ui.Scheduler

Represents the Kendo UI Scheduler widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### allDayEventTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the "all day" scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* isAllDay `Boolean` - if true the event is "all day"
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title


<div class="meta-api-description">
How do I customize the display of all-day events in a Kendo UI Scheduler? Customize the display and formatting of all-day calendar events by defining personalized templates that control the layout, visible fields, and presentation of titles, start and end dates, descriptions, and associated resources; tailor event visuals to match specific design needs or contextual information by configuring how all-day events appear, including options to format event content for schedules, timelines, planner views, or resource calendars, enabling developers to adjust styling, data binding, and field visibility for comprehensive control over multi-day or full-day event rendering.
</div>

#### Example - set the all day event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Attendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      allDayEventTemplate: $("#event-template").html(),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          isAllDay: true,
          title: "Interview",
          attendees: [1,2]
        }
      ],
      resources: [
        {
          field: "attendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### allDaySlot `Boolean` *(default: true)*

If set to `true` the scheduler will display a slot for "all day" events.

> The option is a shorthand to the view's `allDaySlot` option. To define the `daySlot` visibility using a **data-** attribute set the [views.allDaySlot](/api/javascript/ui/scheduler#configuration-views.allDaySlot) option directly.


<div class="meta-api-description">
How can I hide all-day event placeholders in my Kendo UI Scheduler? Control visibility of the all-day slot in calendar or scheduling views to enable or disable display of all-day event placeholders, configure whether an all-day time segment appears in daily or weekly timelines, show or hide full-day event rows, toggle allDay event sections for comprehensive event coverage, adjust calendar layout to include or exclude all-day spans, set allDay event visibility through options or data attributes, manage full-day event slots for better planning, customize scheduler interfaces for all-day event representation, and define whether slot for 24-hour events is shown in scheduling components or calendar views.
</div>

#### Example - hide the all day slot

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      allDaySlot: false,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
data source is fired. That will also apply for data sources for the [resources](/api/javascript/ui/scheduler/configuration/resources) used in the widget. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
How does autoBind affect data loading in Kendo UI Scheduler? Configure whether the scheduler or calendar component automatically connects and loads data from its data source during startup or initialization, enabling control over automatic data fetching to prevent immediate binding, delay loading until a data source change triggers an update, or manage syncing when multiple components share the same backend data source to avoid redundant network requests. This setting controls if the component fetches and binds data right away or waits for explicit events, applies to core data as well as associated resource data, and helps optimize performance and reduce duplicate data calls by disabling auto-fetch on launch, useful for scenarios requiring manual refresh, deferred loading, shared data synchronization, or controlled data binding workflows.
</div>

#### Example - disable automatic binding

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      autoBind: false,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### currentTimeMarker `Boolean|Object` *(default: true)*

If set to `false` the "current time" marker of the scheduler would not be displayed.


<div class="meta-api-description">
How do I show/hide the current time marker in a Kendo UI Scheduler? Enable or disable the visible real-time indicator that shows the current moment within the scheduler or calendar interface, allowing you to toggle the presence of a dynamic time marker or clock line that highlights the exact current time on the timeline or day view. This setting controls whether a live time cursor, current hour highlight, or present time strip is shown to track and visually represent the now position during scheduling, planning, or calendar management tasks, providing options to hide or display the real-time clock line for better focus or clarity.
</div>

#### Example - disable "current time" marker

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date(),
      currentTimeMarker: false,
      views: [
        "day", "week", "workWeek"
      ]
    });
    </script>

### currentTimeMarker.updateInterval `Number` *(default: 10000)*

The update interval of the "current time" marker, in milliseconds.


<div class="meta-api-description">
How often does the current time marker update in a Kendo UI Scheduler? Adjust the frequency or interval at which the live updated time indicator or current time marker refreshes in a scheduler or calendar interface, including setting how often the "current time" visual cue or real-time clock updates, configuring the polling rate or refresh timeout for current time display, enabling control over the live time pointer's update speed, and managing timing for automatic current timestamp refresh to ensure accurate real-time tracking within scheduling or timeline views.
</div>

#### Example - set the update interval of the "current time" marker

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date(),
      currentTimeMarker: {
        updateInterval: 100
      },
      views: [
        "day", "week", "workWeek"
      ]
    });
    </script>

### currentTimeMarker.useLocalTimezone `Boolean` *(default: true)*

If set to `false` the "current time" marker would be displayed using the scheduler [timezone](/api/javascript/ui/scheduler/configuration/timezone).


<div class="meta-api-description">
How to adjust current time indicator in Kendo UI Scheduler to reflect local system timezone? Adjust the display of the current time indicator in the scheduler by configuring whether it reflects the local system or browser timezone or aligns with a specified scheduler timezone setting, enabling control over time marker synchronization across different geographic regions, time zone conversions, local versus global time display preferences, real-time updates relative to user location, and how the current moment is visualized in calendar or timeline views for accurate time tracking regardless of user or server time zones.
</div>

#### Example - set "current time" marker to use scheduler timezone

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date(),
      timezone: "Etc/UTC",
      currentTimeMarker: {
        useLocalTimezone: false
      },
      views: [
        "day", "week", "workWeek"
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.SchedulerDataSource`

The data source of the widget which contains the scheduler events. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.SchedulerDataSource](/api/javascript/data/schedulerdatasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.SchedulerDataSource](/api/javascript/data/schedulerdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.SchedulerDataSource](/api/javascript/data/schedulerdatasource) instance the widget will use that instance and will **not** initialize a new one.

> The Kendo UI Scheduler widget can be bound *only* to a `kendo.data.SchedulerDataSource`. An exception will be thrown if the `dataSource` option is set to a `kendo.data.DataSource` instance.


<div class="meta-api-description">
How do I configure the data source for a Kendo UI Scheduler? Configure and link calendar events by assigning the event collection source to the scheduler, enabling synchronization with JavaScript arrays, configuration objects, or specialized scheduler data sources; control event binding by setting custom or existing data source instances that manage scheduling data, event collections, or calendars, while ensuring compatibility with specific scheduler data source formats for seamless event management, updates, and retrieval.
</div>

#### Example - set dataSource as a JavaScript object

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2022/6/6"),
      dataSource: {
        batch: true,
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/tasks"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/tasks/update",
                type: "POST",
                contentType: "application/json"
            },
            create: {
                url: "https://demos.telerik.com/service/v2/core/tasks/create",
                type: "POST",
                contentType: "application/json"
            },
            destroy: {
                url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
           model: {
             id: "ID",
             fields: {
               ID: { type: "number" },
               title: { field: "Title", defaultValue: "No title", validation: { required: true } },
               start: { type: "date", field: "Start" },
               end: { type: "date", field: "End" },
               description: { field: "Description" },
               recurrenceId: { from: "RecurrenceID" },
               recurrenceRule: { from: "RecurrenceRule" },
               recurrenceException: { from: "RecurrenceException" },
               ownerId: { field: "OwnerID", defaultValue: 1 },
               isAllDay: { type: "boolean", field: "IsAllDay" }
             }
           }
         }
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.SchedulerDataSource instance

    <div id="scheduler"></div>
    <script>
    var dataSource = new kendo.data.SchedulerDataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/tasks"
        }
      },
      schema: {
       model: {
         id: "ID",
         fields: {
           ID: { type: "number" },
           title: { field: "Title", defaultValue: "No title", validation: { required: true } },
           start: { type: "date", field: "Start" },
           end: { type: "date", field: "End" },
           description: { field: "Description" },
           recurrenceId: { from: "RecurrenceID" },
           recurrenceRule: { from: "RecurrenceRule" },
           recurrenceException: { from: "RecurrenceException" },
           ownerId: { field: "OwnerID", defaultValue: 1 },
           isAllDay: { type: "boolean", field: "IsAllDay" }
         }
       }
     }
    });
    $("#scheduler").kendoScheduler({
      date: new Date("2022/6/6"),
      dataSource: dataSource
    });
    </script>

### date `Date`

The current date of the scheduler. Used to determine the period which is displayed by the widget.


<div class="meta-api-description">
How to set initial displayed time period in Kendo UI Scheduler? Control and configure the initial displayed time period by setting or specifying the current active date for scheduling views such as day, week, or month; adjust the start date to determine which calendar range appears on load, set or update the visible timeframe for navigating schedules, and define the reference point used by scheduling components to display events or appointments at startup.
</div>

#### Example - set the date of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ]
    });
    </script>

### dateHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the date header cells.

By default the scheduler renders the date using a custom date format - "ddd M/dd".
The "ddd" specifier represents the abbreviated name of the week day and will be localized using the current Kendo UI culture.
If the developer wants to control the day and month order, then one needs to define a custom template.

The fields which can be used in the template are:

* date - represents the major tick date.


<div class="meta-api-description">
How do I customize the date header in a Kendo UI Scheduler to display day of the week in my locale's language? Customize and control the rendering and display format of date header cells within a scheduling or calendar interface by defining your own template for how dates appear, including changing the layout of day, month, and year elements, localizing the weekday names, and adjusting the order or style of date parts beyond default abbreviated weekday and numeric date formats. Configure, set, or enable personalized date header presentations by supplying custom templates that manipulate date output, formatting, locale-based weekday labels, and tick date representations to match specific UI design preferences, language settings, or cultural conventions in calendar or scheduler applications.
</div>

#### Example - set the date header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable `Boolean|Object` *(default: true)*

If set to `true` the user would be able to create new scheduler events and modify or delete existing ones.


<div class="meta-api-description">
How do I enable editing of events in Kendo UI for jQuery Scheduler? Control whether users can add, create, modify, update, or delete events directly within the scheduling interface through interactive editing features. Enable or disable event editing capabilities, event creation, or removal using the property that permits event changes via the user interface, allowing dynamic management of calendar entries, appointments, or tasks. Adjust or configure whether the schedule is user-editable, supporting modifications to existing events, insertion of new events, or deletion of unwanted entries, useful for interactive event handling, customization, and real-time schedule updates.
</div>

#### Example - disable editing

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      editable: false
    });
    </script>

### editable.confirmation `Boolean|String` *(default: true)*

If set to `true` the scheduler will display a confirmation dialog when the user clicks the "destroy" button.

Can be set to a string which will be used as the confirmation text.


<div class="meta-api-description">
How do I customize the confirmation dialog for deleting events in a Kendo UI Scheduler? Control and configure confirmation prompts for event deletions, enabling user verification before removing scheduled items with customizable dialog text or default messages, ensuring accidental deletions are prevented by requiring user approval, supporting confirmation modals, alert dialogs, or prompt messages when deleting events in scheduling interfaces, allowing developers to set flags or custom strings to manage confirmation behavior during event destroy or removal actions within calendar or scheduler components.
</div>

#### Example - disable delete confirmation

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        confirmation: false
      },
      views: [
        {
          type: "day"
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - set delete confirmation text

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        confirmation: "Are you sure you want to delete this meeting?"
      },
      views: [
        {
          type: "day"
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.create `Boolean` *(default: true)*

If set to `true` the user can create new events. Creating is enabled by default.


<div class="meta-api-description">
How do I enable users to create new events in a Kendo UI Scheduler? Enable or disable the ability for users to add or create new events, appointments, or tasks directly within the scheduling interface during initialization, controlling whether event creation through the scheduler UI is permitted or blocked, allowing configuration to allow or prevent users from initiating new schedule entries, bookings, or calendar items dynamically within the interface by toggling creation permissions on or off for user interactions.
</div>

#### Example - disable event creating

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        create: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.


<div class="meta-api-description">
How can I disable event deletion in Kendo UI Scheduler? Control the ability for users to delete or remove scheduled events through the interface by enabling or disabling event destruction features, configure whether events can be deleted via UI buttons within editable scheduling components, set permissions to allow or restrict event removal during editing sessions, toggle the deletion option for events directly within the schedule view, and manage user interactions around event deletion including enabling or disabling event removal controls for flexible calendar or timeline management tasks.
</div>

#### Example - disable event deleting

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        destroy: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.editRecurringMode `String`

Recurring events edit mode. The available modes are: 
- "dialog" (default) - displays a dialog that allows the user to choose whether the current occurrence or the entire series will be edited; 
- "series" - displays an editor for updating the entire series;
- "occurrence" - only the current occurrence will be edited.


<div class="meta-api-description">
How do I configure Kendo UI Scheduler to update recurring events? Configure options for modifying repeating calendar events to determine if changes apply to a single instance or the entire event series, enabling control over whether edits affect one occurrence, the whole recurring pattern, or prompt a user choice dialog. Set how recurring event updates behave by choosing modes like editing only one occurrence, updating the entire series, or displaying a decision interface to select between them. Adjust how modifications to recurring schedules are handled in terms of scope—single event versus all linked repeats—providing flexibility to control recurring event edit workflows and user interactions during appointment or event adjustments in scheduling applications.
</div>

#### Example - disable event deleting

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        editRecurringMode: "series"
      },
      views: [
        { type: "day" }
      ],
      dataSource: {
        data: [{
         id: 1,
         start: new Date("2013/6/5 8:00"),
         end: new Date("2013/6/5 10:00"),
         title: "my event",
         recurrenceRule: "FREQ=DAILY"
        }],
        schema: {
            model: {
                id: "id",
                fields: {
                    id: {type: "number"}
                }
            }
        }
      }
    });
    </script>

### editable.move `Boolean` *(default: true)*

If set to `true` the scheduler allows event moving. Dragging the event changes the start and end time.


<div class="meta-api-description">
How to enable event repositioning in Kendo UI Scheduler? Enable or disable the ability to drag and reposition calendar or scheduler events by controlling whether users can move events to different time slots or dates, supporting interactions such as dragging, updating event start and end times, rescheduling, adjusting event duration, and modifying event placement dynamically within the schedule interface.
</div>

#### Example - disable event moving

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      editable: {
        move: false
      }
    });
    </script>

### editable.resize `Boolean` *(default: true)*

If set to `true` the scheduler allows event resizing. Dragging the resize handles changes the start or end time of the event.


<div class="meta-api-description">
How do I allow users to resize events in Kendo UI Scheduler? Control the ability to adjust event durations interactively by enabling or disabling resizing features, allowing users to drag event edges or handles to extend, shorten, or modify start and end times dynamically within the schedule or calendar interface, supporting use cases like changing appointment lengths, shifting meeting intervals, or customizing time blocks through user-driven resizing actions.
</div>

#### Example - disable event resizing

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      editable: {
        resize: false
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the Scheduler will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](slug://mvvm_initialization_kendoui) for more info.


<div class="meta-api-description">
How to customize the appointment editor layout in Kendo UI Scheduler? Customize and configure the appointment editor interface and fields layout in the scheduling component by defining a render template or custom markup that controls which input elements appear and how they are arranged. Enable or set editable form fields within the event editor by binding HTML elements to data fields directly through name attributes or leveraging MVVM data bindings for dynamic two-way updates. Control and customize how appointment details are edited, allowing developers to provide tailored input controls, integrate UI components using data-role attributes for easier initialization, and fully personalize the scheduler’s editing experience by modifying templates, structures, and bindings according to specific user or application requirements.
</div>

#### Example - customize the popup editor

    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input name="title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" name="start" /></label>
       </p>
       <p>
           <label>End: <input data-role="datetimepicker" name="end" /></label>
       </p>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        template: $("#editor").html()
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input data-bind="value: title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" data-bind="value: start" /></label>
       </p>
       <p>
           <label>End: <input data-role="datetimepicker" data-bind="value: end" /></label>
       </p>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        template: $("#editor").html()
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `true` the user can update events. Updating is enabled by default.


<div class="meta-api-description">
How do I allow users to edit events in a Kendo UI Scheduler? Enable or disable the ability for users to modify or update existing scheduled events directly within the calendar or scheduler interface, controlling whether events can be edited, changed, or adjusted after creation. This setting manages interactive event updating, allowing for real-time changes to event details like time, title, or other properties, and can be toggled to restrict or allow in-component event modifications during scheduling tasks or calendar management.
</div>

#### Example - disable event updating

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        update: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.window `Object`

Configures the Kendo UI Window instance, which is used when the Grid edit mode is `"popup"`. The configuration is optional.

For more information, please refer to the [Window configuration API](/api/javascript/ui/window).


<div class="meta-api-description">
How to customize the popup editing interface in Kendo UI Scheduler edit mode? Customize and control the popup editing interface appearing during scheduler popup edit mode, enabling settings for popup size, title text, screen position, modal overlay behavior, resizability, drag capability, animation effects, and custom CSS styling, allowing full adjustment of the editor window’s appearance and interaction to fit different UI requirements and user preferences in scheduling applications.
</div>

#### Example - Scheduler popup Window configuration

    <div id="scheduler"></div>
    <script>

    function myOpenEventHandler(e) {
        // ...
    }

    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        window: {
            title: "My Custom Title",
            animation: false,
            open: myOpenEventHandler
        }
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### endTime `Date`

The end time of the week and day views. The scheduler will display events ending before the `endTime`.


<div class="meta-api-description">
How to limit maximum visible time boundary for daily calendar view in Kendo UI Scheduler? Set, configure, or limit the maximum visible time boundary for daily or weekly calendar views to control which hours appear in the schedule, enabling display of events only up to a specified cutoff time and effectively restricting the time range shown in the interface. This setting governs the latest hour displayed in the timeline, helping to manage viewable hours, filter out late-day events, and tailor calendar visibility by adjusting time range endpoints alongside start time, controlling the schedule’s visible window for focused planning, event filtering, or time slot management across day and week views.
</div>

#### Example - set the end time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      startTime: new Date("2013/6/6 08:00"),
      endTime: new Date("2013/6/6 18:00"),
      views: ["day", "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### eventTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title


<div class="meta-api-description">
How to customize event layout in Kendo UI Scheduler? Customize how calendar or timeline events are displayed by defining your own HTML layout or template, enabling control over event visuals, content, and formatting. Adjust event rendering by specifying templates that incorporate details like event title, description, start and end dates, and associated resources, allowing for flexible design, styling, and dynamic content injection. This approach supports modifying event appearance, customizing event presentation, templating event data, and tailoring display to specific event attributes for scheduling or timeline applications.
</div>

#### Example - set the event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      eventTemplate: $("#event-template").html(),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### footer `Boolean|Object`

If set to `false` the footer of the scheduler would not be displayed.


<div class="meta-api-description">
How to hide footer in Kendo Scheduler widget? Control the visibility and rendering of the bottom footer section of the Scheduler interface by enabling or disabling the display of footer content during initialization, allowing you to show, hide, toggle, or configure the footer area for a cleaner layout, minimal UI, or customized footer presence based on user preference or application requirements, including settings to suppress, remove, or display footer components dynamically as part of the Scheduler configuration.
</div>

#### Example - disable footer

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      footer: false
    });
    </script>

### footer.command `String|Boolean` *(default: "workDay")*

Sets the command which will be displayed in the scheduler footer. Currently only "workDay" option is supported. If the option is set to `false`, the "workDay" button will be removed from the footer.


<div class="meta-api-description">
How do I customize the footer commands in the Kendo UI Scheduler? Control the footer commands in the scheduling interface by configuring which action button appears below the calendar, such as enabling or disabling the built-in work day toggle, showing or hiding the work day control, setting command visibility to display or remove the work day option, customizing footer buttons in the scheduler UI, managing footer command availability during initialization, toggling the presence of standard schedule controls, and deciding whether the work day toggle button is shown for quick access or hidden to simplify the footer interface.
</div>

#### Example - disable workDay command in the footer

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      footer: {
        command: false
      }
    });
    </script>

### group `Object`

The configuration of the scheduler resource(s) grouping.


<div class="meta-api-description">
How to group events by resources in Kendo UI Scheduler? Manage and configure event organization by resources in scheduling systems, enabling grouping of calendar or timeline events based on one or multiple resource categories such as rooms, employees, or equipment. Control how appointments, tasks, or meetings are grouped or clustered by resource attributes, customize resource grouping orientation like vertical or horizontal layouts, set grouping filters and criteria to organize events efficiently across different resources, and adjust settings to enable resource-based grouping for better resource allocation, availability visualization, and multi-resource scheduling scenarios. Implement flexible resource grouping options to shape how events appear and interact in complex scheduling interfaces or calendars.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2024/6/10"),
        startTime: new Date("2024/6/10 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/meetings",
                    dataType: "jsonp"
                }
            },
            schema: {
                model: {
                    id: "meetingID",
                    fields: {
                        meetingID: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        roomId: { from: "RoomID", nullable: true },
                        attendees: { from: "Attendees", nullable: true },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
        group: {
            resources: ["Rooms", "Attendees"],
            orientation: "horizontal"
        },
        resources: [
            {
                field: "roomId",
                name: "Rooms",
                dataSource: [
                    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                ],
                title: "Room"
            },
            {
                field: "attendees",
                name: "Attendees",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
                ],
                multiple: true,
                title: "Attendees"
            }
        ]
    });
    </script>

### group.date `Boolean` *(default: false)*

If set to `true` and the [group.resources](/api/javascript/ui/scheduler#configuration-group.resources) has some resources set the view is grouped by date.


<div class="meta-api-description">
How can I group scheduler events by date in Kendo UI for jQuery? Arrange or configure scheduling views to group events or tasks by calendar date when managing multiple resources or entities, enabling date-based organization instead of resource-based sorting, allowing users to set or enable grouping of schedules by day, date, or chronological order when multiple resources are involved, supporting scenarios where timelines, appointments, or tasks need to be displayed grouped by specific dates across various resources, facilitating control over how scheduling views prioritize grouping criteria whether by resource or their associated dates.
</div>

#### Example - define group by date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      group: {
        resources: ["Rooms"],
        date: true
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### group.resources `Array`

An array of resource names by which the scheduler events will be grouped.


<div class="meta-api-description">
How do I group events by specific resources in Kendo UI Scheduler? Control and configure event grouping by selecting specific resource fields or resource names to organize scheduled items within multiple resources or hierarchical structures, enabling multi-resource categorization, sorting, and grouping order customization based on resource attributes, so you can set how events are clustered by resource identifiers, customize grouping layers, and manage event display according to resource-driven criteria.
</div>

#### Example - define groups

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      group: {
        resources: ["Rooms"]
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### group.orientation `String` *(default: "horizontal")*

The orientation of the group headers. Supported values are *horizontal* or *vertical*. Note that the agenda view is always in vertical orientation.


<div class="meta-api-description">
How do I configure the layout direction of grouped headers in a Kendo UI Scheduler? Configure the layout direction of grouped headers in scheduling interfaces by setting the orientation to horizontal or vertical, adjusting how grouped resources, time slots, or categories are displayed for better visualization and user interaction; control whether groups appear side-by-side or stacked, optimize the arrangement of grouped items in calendars, timelines, or resource views, and understand how different orientation settings impact the presentation of grouped data while ensuring compatibility with views that may enforce a fixed layout direction.
</div>

#### Example - define group orientation

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      group: {
        resources: ["Rooms"],
        orientation: "vertical"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### groupHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the group headers of scheduler day, week, workWeek and timeline views.

The fields which can be used in the template are:

* text `String` - the group text
* color `String` - the group color
* value - the group value
* field `String` - the field of the scheduler event which contains the resource id
* title `String` - the 'title' option of the resource
* name  `String` - the 'name' option of the resource


<div class="meta-api-description">
How do I customize the appearance of group headers in my Kendo UI Scheduler? Control and customize the styling and layout of group headers in calendar or schedule views such as day, week, workWeek, and timeline by defining templates that render resource or group properties including group text labels, colors, unique identifiers, resource IDs, titles, names, and additional metadata. Enable personalized header rendering for grouped events with dynamic access to text, color codes, value identifiers, scheduling fields, resource titles, and names, useful for configuring how grouped resources or events appear visually and contextually in scheduling interfaces or calendar components. Adjust header templates to integrate resource information or group characteristics, supporting flexible and detailed customization of grouping headers across multiple scheduler views.
</div>

#### Example - set the group header template

    <script id="groupHeaderTemplate" type="text/x-kendo-template">
      <strong style="color: #=color#">#=text#</strong>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      groupHeaderTemplate: $("#groupHeaderTemplate").html(),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          isAllDay: true,
          title: "Interview",
          attendees: [1,2]
        }
      ],
      group: {
        resources: ["Attendees"],
        orientation: "horizontal"
      },
      resources: [
        {
          field: "attendees",
          name: "Attendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### height `Number|String`

The height of the widget. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the height of a Kendo UI Scheduler widget? Adjust or define the vertical dimension, height, or size of a scheduling or calendar component to control its layout, viewport, scrolling area, visible rows, or display space using pixel values or numeric settings during setup or rendering. Configure, set, customize, control, or specify the component’s vertical height to optimize user interface spacing, fit schedules within containers, or manage scrollable height in various contexts and frameworks.
</div>

#### Example - set the height of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      height: 500,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### majorTick `Number` *(default: 60)*

The number of minutes represented by a major tick.


<div class="meta-api-description">
How can I adjust the time axis granularity in my Kendo UI Scheduler widget to display larger time slots? Control and customize the time axis granularity in scheduling interfaces by configuring the interval duration for major ticks, enabling precise adjustment of the primary time scale in minutes, which impacts how time slots are displayed and interacted with for events and tasks. Set, modify, or fine-tune the number of minutes each major division covers to influence the visual representation and snapping behavior of scheduled items, coordinating with smaller subdivisions to achieve the desired blend of overview and detail in timeline views or calendar layouts. This setting supports use cases such as adjusting time increments for daily planners, timeline zoom levels, resource allocation periods, and interactive event placement accuracy within scheduling applications.
</div>

#### Example - set the major tick

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      majorTick: 120, // a major tick represents 120 minutes (2 hours)
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### majorTimeHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the major ticks.

By default the scheduler renders the time using the current culture time format.

The fields which can be used in the template are:

* date - represents the major tick date.


<div class="meta-api-description">
How to customize major time headers in the Kendo UI Scheduler? Customize or format the main time headers in scheduling views by configuring templates that control how primary time intervals or major ticks are displayed, including options to set custom date formatting, control time label appearance, localize headers according to culture settings, and tailor the display of significant time markers on calendars or timelines. This enables setting or changing the layout, style, or data fields used in major time divisions, such as rendering timestamps, dates, or periods in various formats, adjusting visual representation of key time slots, and creating personalized headers that fit specific scheduling needs and preferences.
</div>

#### Example - set the major time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      majorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'h')#</strong><sup>00</sup>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### max `Date` *(default: 31/12/2099)*

Constraints the maximum date which can be selected via the scheduler navigation.


<div class="meta-api-description">
How to restrict user selection beyond a specific date in Kendo UI Scheduler? Set or configure the maximum allowable date to restrict calendar navigation and selection, enforcing an upper bound that prevents users from moving beyond or choosing dates after a certain limit, useful for controlling date ranges, limiting scheduling options, enforcing cutoffs, setting latest selectable days, and managing date pickers or event planners to ensure users cannot exceed a defined final date.
</div>

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      max: new Date("2013/7/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages `Object`

The configuration of the scheduler messages. Use this option to customize or localize the scheduler messages.


<div class="meta-api-description">
How can I customize the text labels in the Kendo UI Scheduler? Customize and localize scheduler interface text elements including labels, button captions, tooltips, and other UI messages by configuring display language, altering default wording, translating prompts, adjusting user-facing notifications, and tailoring interface terminology to match different locales, preferred languages, or project-specific vocabulary, enabling flexible control over all textual content presented in the scheduling component.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        messages: {
            allDay: "Full day",
            ariaEventLabel: "Event at {0:M/d/yyyy h:mm tt}",
            ariaSlotLabel: "Time slot",
            cancel: "Abort",
            deleteWindowTitle: "Remove event",
            destroy: "Remove",
            save: "Store",
            today: "Current day",
            defaultRowText: "All events"
        }
    });
    </script>

### messages.allDay `String`

The text similar to "all day" displayed in day,week and agenda views.


<div class="meta-api-description">
How can I customize the label for all-day events in Kendo UI Scheduler? Customize or configure the label text that appears for all-day events in calendar, schedule, or agenda views, enabling control over how all-day entries are displayed and named in day, week, or agenda layouts. Adjust or override the default all-day indicator, set localization or personalized strings for the all-day tag, and tailor these messages to fit specific language, regional preferences, or UI terminology within scheduling interfaces. This encompasses modifying the display text for full-day events, changing the wording for events without specific times, and managing the labeling of all-day appointments in various calendar components.
</div>

#### Example - set the "allDay" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        allDay: "daily"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.ariaEventLabel `String`*(default: "{0} on {1:D} at {2:t}")*

Specifies the format string used to populate the aria-label attribute value of the selected event element.

The arguments which can be used in the format string are:

* {0} - represents the title of the selected event.
* {1} - represents the start date of the event.
* {2} - represents the start time of the event.


<div class="meta-api-description">
How do I customize the ARIA label for the selected event in Kendo UI Scheduler? Customize and control the accessibility label describing the currently selected event in scheduling interfaces by configuring dynamic text that incorporates the event title, date, and time into screen reader announcements, enabling enhanced ARIA labeling, improving assistive technology support, setting descriptive aria-label formats for selected events, and tailoring how event details like name and timing are vocalized for users requiring accessible navigation and event identification.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      selectable: true,
      date: new Date("2013/6/6"),
      messages: {
        ariaEventLabel: "Selected event is {0}. It starts on {1:d} {2:t}"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.ariaSlotLabel `String`*(default: "Selected from {0:t} to {1:t}")*

Specifies the format string used to populate the aria-label attribute value of the selected slot element.

The arguments which can be used in the format string are:

* {0} - represents the start date of the slot.
* {1} - represents the end date of the slot.


<div class="meta-api-description">
How do I customize the accessibility label for selected time slots in a Kendo UI scheduler? Customize or configure the accessibility label text for selected time slots in a scheduler or calendar interface to improve screen reader support, defining how the start and end times are announced or described when a user navigates the schedule, allowing setting or changing of the ARIA label format to enhance usability and compliance with accessibility standards, controlling spoken descriptions of scheduled time ranges, and enabling precise voice output for selected event intervals or appointment blocks.
</div>

#### Example - set the "ariaSlotLabel" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      selectable: true,
      date: new Date("2013/6/6"),
      messages: {
        ariaSlotLabel: "Selected from {0:g} to {0:g}"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.cancel `String`

The text similar to "Cancel" displayed in scheduler.


<div class="meta-api-description">
How can I customize the cancel button label in Kendo UI Scheduler for different languages? Set or customize the text label for the cancel button within scheduling interfaces to support localization, internationalization, or alternative user interface wording, enabling developers to configure, override, or translate the cancel action prompt used in scheduling or calendar components for diverse languages and regional user preferences.
</div>

#### Example - set the "cancel" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        cancel: "Undo"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.date `String`

The text similar to "Date" displayed in scheduler.


<div class="meta-api-description">
How to change the default date label in Kendo UI Scheduler? Customize or translate the label displaying the current day or calendar date in the scheduling interface, enabling adjustments of the date caption, header text, or date indicator to match various languages, regions, or preferred terminology. This feature supports localization, overriding default date captions, modifying date-related labels, and setting custom date strings for calendars, event planners, or time management tools that show the current date or day indicator. Adjust the visible date text to fit internationalization needs, user interface wording preferences, or specialized scheduling vocabulary across different contexts and applications.
</div>

#### Example - set the "date" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        date: "Date"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.deleteWindowTitle `String`

The text similar to "Delete event" displayed as title of the scheduler delete event window.


<div class="meta-api-description">
How to customize the title of the confirmation dialog when deleting events in a Kendo UI Scheduler? Customize, configure, or set the confirmation dialog title text displayed when deleting events within a scheduler or calendar interface, enabling control over the prompt message, window heading, or alert title that appears during event removal actions, helping tailor user notifications, confirmation dialogs, deletion prompts, and modal window headings to match specific application wording or localization requirements.
</div>

#### Example - set the "deleteWindowTitle" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        deleteWindowTitle: "Remove event"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.destroy `String`

The text similar to "Delete" displayed in scheduler.


<div class="meta-api-description">
How to customize the delete button label in Kendo UI Scheduler? Customize, localize, or translate the text displayed on the delete or remove button within scheduling interfaces, calendars, or event planners by setting or overriding the label used for the deletion action; configure how the delete prompt, remove option, or erase command appears to users, enabling changes to default button text for better user experience, internationalization, and personalized interface wording related to removing events, tasks, or scheduled items.
</div>

#### Example - set the "destroy" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        destroy: "Destroy"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.event `String`

The text similar to "Event" displayed in scheduler.


<div class="meta-api-description">
How to customize the event label in Kendo UI Scheduler? Customize the text label or name displayed for events in a scheduling interface, set or change the default event caption, control how event titles appear within calendar or scheduler views, modify event header or tag wording, localize or translate event labels, adjust displayed event names for clarity, rename default event placeholders, tailor event descriptions shown on timelines or agendas, configure event identifiers visible to users, and update the standard event term used in scheduling displays.
</div>

#### Example - set the "event" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        event: "Meeting"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.defaultRowText `String`

The text similar to "All events" displayed in timeline views when there is no vertical grouping.


<div class="meta-api-description">
How to customize default row text in Kendo UI Scheduler? Control and customize the default placeholder text or label displayed in timeline or calendar views when vertical grouping or categorization is not applied, allowing configuration or replacement of the fallback row name shown in scheduling interfaces, timeline row captions, or default group identifiers to better fit user interface preferences or localized messaging.
</div>

#### Example - set the "defaultRowText" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        defaultRowText: "Conference room"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.next `String`

The tooltip of the next navigation button.


<div class="meta-api-description">
How do I customize the tooltip for the next navigation button in a Kendo UI Scheduler? Control and customize the tooltip text displayed on the next navigation button within a scheduling or calendar interface, enabling localization, language adaptation, or user-specific phrasing for the button that advances to the following time period or event. Adjust, set, or override the label, hint, or accessible description shown when hovering or focusing on the forward navigation control in date picker or scheduler components, facilitating internationalization and user-friendly UI messaging for next-step navigation features.
</div>

#### Example - set the "next" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      messages: {
        next: "Next"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.noData `String`

The text displayed in the Scheduler year view Tooltip when there are no events on the selected date.


<div class="meta-api-description">
How to customize the message shown in Kendo UI Scheduler when there's no data for a specific date? Configure the message or tooltip text that appears in calendar or scheduler views when there are no events, appointments, or entries for a specific date, especially in year or timeline views, enabling customization of empty state notifications, no-data indicators, or placeholders shown to users when days have no scheduled items.
</div>

#### Example - set the "noData" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "year",
          months: 10
        },
      ],
      messages: {
        noData: "No appointments on this date."
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/1/1 08:00 AM"),
          end: new Date("2013/1/1 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.pdf `String`

The text displayed by the PDF export button.


<div class="meta-api-description">
How do I change the label of the export to PDF button in a Kendo UI Scheduler? Customize, set, or localize the label and text displayed on the export to PDF button within scheduling interfaces, controlling how the PDF export option is named or presented to users in different languages or contexts. Enable changing button captions, modify text strings for PDF export features, adjust localization settings for export labels, and tailor UI elements that trigger exporting schedules as PDF files to match specific terminology, translation needs, or user preferences.
</div>

#### Example - set the "pdf" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      messages: {
        pdf: "PDF Export"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.previous `String`

The tooltip of the previous navigation button.


<div class="meta-api-description">
How to customize the previous button tooltip in Kendo UI Scheduler? Set or customize the tooltip, hover text, label, or descriptive message for the previous navigation button in a scheduling interface or calendar control, enabling developers to control the user-facing text that appears when users hover over or focus on the button used to move to the prior date, week, month, or view in a scheduler, timeline, or event planner UI component.
</div>

#### Example - set the "previous" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      messages: {
        previous: "Previous"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.refresh `String`

The aria-label of the refresh toolbar button.


<div class="meta-api-description">
How do I customize the refresh button's accessible label in a Kendo UI Scheduler widget? Set or customize the accessible label for the scheduler toolbar’s refresh button to improve screen reader support, configure ARIA attributes or aria-label text for the refresh control, enable descriptive voiceover announcements for the update or reload action, control accessibility names for buttons that trigger data refresh or sync operations, and enhance usability for users relying on assistive technologies by defining meaningful labels for the refresh icon or control within scheduling interfaces.
</div>

#### Example - set the "previous" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      messages: {
        refresh: "Again"
      },
      views: ["day"],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.resetSeries `String`

The text of the reset series button.


<div class="meta-api-description">
How to customize the reset button text in Kendo UI Scheduler? Customize the text label for the button that clears or reverts all events in a recurring series, enabling control over how users reset repeating schedules, change series recurrence, modify or cancel entire event groups, and update series instances with a clear, descriptive action name for resetting repeating appointments or calendar event sequences.
</div>

#### Example - set the "previous" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      messages: {
        resetSeries: "Reset Series"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.save `String`

The text similar to "Save" displayed in scheduler.


<div class="meta-api-description">
How do I customize the save button label in Kendo UI Scheduler? Customize or translate the save button label in scheduling interfaces, modify the text displayed on the save action to match different languages or terms, configure the confirmation button wording in event or task schedulers, enable localization or internationalization of save button captions, control or set the save command label shown in UI schedulers, adapt the save text for user interfaces requiring multilingual support or custom button phrasing, override default save button messages in calendar or appointment scheduling components, tailor the displayed save prompt for diverse user contexts including different locales or terminology preferences.
</div>

#### Example - set the "save" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        save: "Update"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.selectView `String`

The aria-label of the View select element.


<div class="meta-api-description">
How do I customize the accessible label for the view selector in Kendo UI Scheduler? Set or customize the accessible label, ARIA attribute, or screen reader description for the dropdown or selector that lets users choose different calendar or scheduler views, enabling control over the select element’s accessible name, improving usability, configuring assistive technology support, and defining how view options are announced in scheduling interfaces.
</div>

#### Example - set the "previous" message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      messages: {
        selectView: "Custom"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.showFullDay `String`

The text similar to "Show full day" used in scheduler "showFullDay" button.


<div class="meta-api-description">
How do I customize the full day view toggle button label in Kendo UI Scheduler? Customize, configure, or localize the text label, caption, or display name for the full day view toggle button in scheduling interfaces, calendar apps, or event planners. Enable developers to set or change the wording, translation, or language-specific phrase shown on the button that switches the schedule or calendar to show the complete full-day agenda or timeline. Control how the interface presents the prompt or action to expand or view the entire day, including customizing UI text for different locales, languages, or user-preference settings related to full-day display toggles.
</div>

#### Example - set the "showFullDay" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        showFullDay: "Show 24h"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>


### messages.showWorkDay `String`

The text similar to "Show business hours" used in scheduler "showWorkDay" button.


<div class="meta-api-description">
How to customize the button label that toggles workday periods in Kendo UI Scheduler? Customize the label or text displayed on the button that toggles viewing business hours or workday periods in a scheduling interface, enabling control over how the interface communicates the option to show or hide working hours, business day segments, or typical office hours in calendar views, helping users set, modify, or localize the prompt for displaying daily work schedules or standard operating hours within a calendar or appointment planner.
</div>

#### Example - set the "showWorkDay" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        showWorkDay: "Show work hours"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.time `String`

The text similar to "Time" displayed in scheduler.


<div class="meta-api-description">
How to customize time column headers in Kendo UI Scheduler for localization? Adjust, configure, or set the text label shown on time column headers in scheduling or calendar views for localization, language customization, or branding purposes, enabling developers to modify default time header captions, translate or replace the "Time" string, control the display of time indicators in schedule interfaces, and adapt time header labels for different regions or user preferences within appointment or event scheduling components.
</div>

#### Example - set the "time" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        time: "Time of the day"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.today `String`

The text similar to "Today" displayed in scheduler.


<div class="meta-api-description">
How to change the "Today" button label in Kendo UI Scheduler widget? Customize or configure the label text displayed on the "Today" button within scheduling or calendar interfaces, enabling localization, translation, renaming, or adjusting the default wording for current date navigation, controlling how the shortcut to jump to the present day appears in UI elements, and supporting multi-language environments or personalized button captions to improve user interaction with calendar or timeline controls.
</div>

#### Example - set the "today" scheduler message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        today: "Current Date"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editable `Object`

The configuration of the scheduler editable messages. Use this option to customize or localize the scheduler editable messages.


<div class="meta-api-description">
How do I customize the text prompts for editing events in a Kendo UI Scheduler? Configure, customize, or localize the editable text prompts, labels, or messages displayed while modifying or updating schedules, events, or calendar entries; control the wording, language, and user-facing notifications that appear during inline editing, drag-and-drop edits, or form-based schedule changes, enabling tailored wording for different locales, user preferences, or application requirements related to edit actions within a scheduling interface.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        messages: {
            editable: {
                confirmation: "Are you sure you want to delete this event?",
                destroy: "Delete",
                save: "Save"
            }
        }
    });
    </script>

### messages.editable.confirmation `String`

The text similar to "Are you sure you want to delete this event?" displayed in scheduler.


<div class="meta-api-description">
How to customize the confirmation prompt in Kendo UI Scheduler for editable events? Control the confirmation prompt text displayed when users attempt to delete or edit calendar events, customize the warning or alert messages shown before removing scheduled items, set or modify the dialog text that asks for user confirmation to prevent accidental deletions, configure editable event removal notifications, and tailor the messaging that ensures users confirm changes or deletions in scheduling interfaces.
</div>

#### Example - set delete confirmation text

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editable: {
          confirmation: "Are you sure you want to delete this meeting?"
        }
      },
      views: [
        {
          type: "day"
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor `Object`

The configuration of the scheduler editor messages. Use this option to customize or localize the scheduler editor messages.


<div class="meta-api-description">
How do I customize the editing interface text in Kendo UI Scheduler? Customize and localize scheduler editing interface text, modify editor labels, prompts, and messages for different languages or contexts, configure and set personalized editor notifications, messages, and dialogs displayed within the scheduling tool, enable translation or adjustment of editor-related strings, control how editor prompts are shown to users during schedule management, adapt scheduler editor messages for internationalization, tailor messaging content for schedule editing workflows, and set or override default editor communication text to fit specific application requirements or user preferences.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        messages: {
            editor: {
                allDayEvent: "Full day event",
                description: "Event description",
                editorTitle: "Event Editor",
                end: "End time",
                endTimezone: "End timezone",
                repeat: "Recurrence",
                separateTimezones: "Use separate start and end time zones",
                start: "Start time",
                startTimezone: "Start timezone",
                timezone: "Timezone",
                timezoneEditorButton: "Time zone",
                timezoneEditorTitle: "Time zones",
                title: "Event title"
            }
        }
    });
    </script>

### messages.editor.allDayEvent `String`

The text similar to "All day event" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the label for all-day events in Kendo UI Scheduler's event editor? Translate or customize the label for all-day events in event editors, adjust the displayed text for full-day appointments, set or modify the all-day event captions in scheduling interfaces, localize the phrase used to represent events lasting the entire day, configure multilingual or regional wording for full-day event indicators, control how all-day events are named or described within calendar or scheduling tools, tailor the all-day event terminology in user interfaces, update labels for day-long events in event creation or editing screens, enable language-specific or customized captions for events marked to last all day, and manage the display text associated with comprehensive day events in planner or scheduler editors.
</div>

#### Example - set the "allDayEvent" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            allDayEvent: "Full day"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.description `String`

The text similar to "Description" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the event description label in Kendo UI Scheduler? Customize, configure, or set the text label, caption, placeholder, or localized phrase used for the event description field inside a scheduler or calendar editor interface, enabling control over how the description input prompt appears in different languages or contexts, including changing or overriding the default description label shown to users when editing or creating events, appointments, or tasks.
</div>

#### Example - set the "description" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            description: "Message"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.editorTitle `String`

The text similar to "Event" displayed as title of the scheduler event editor.


<div class="meta-api-description">
How to change the title of the event editor in Kendo UI Scheduler? Control and configure the text label, heading, or title displayed at the top of the event editor interface within scheduling or calendar components, enabling developers to set, change, or customize the event editor's header, caption, or prompt from default values to personalized names like "Event," "Appointment," or other descriptive terms to improve user clarity and context during event creation or editing workflows.
</div>

#### Example - set the "editorTitle" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            editorTitle: "Edit event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.end `String`

The text similar to "End" displayed in the scheduler event editor.


<div class="meta-api-description">
How to customize the "End" field label in Kendo UI Scheduler event editor? Customize or configure the text label for the event end time in calendar or scheduler editors, control how the "End" field is displayed or named in event editing dialogs, set or override the end time label to fit localization, user interface preferences, or custom terminology for event scheduling applications, enable personalized or translated labels for event end inputs in booking or time management tools, adjust the terminology used for marking the conclusion time in event editor forms, tailor the label text that identifies the event finishing time for improved clarity or branding in scheduling components.
</div>

#### Example - set the "end" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            end: "End of the event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.endTimezone `String`

The text similar to "End timezone" displayed in the scheduler event editor.


<div class="meta-api-description">
How to customize the end timezone label in Kendo UI Scheduler? Customize or modify the text label displayed for the event end timezone in scheduling or calendar event editors, control the localization or translation of the end timezone prompt, set or update the wording related to selecting the finish timezone in event configuration interfaces, adjust the phrasing shown when users pick the ending timezone for an event, and enable altering or overriding default end timezone labels for improved clarity or internationalization in event scheduling UIs.
</div>

#### Example - set the "endTimezone" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            endTimezone: "End date timezone"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.repeat `String`

The text similar to "Repeat" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the repeat label in Kendo UI Scheduler? Customize, configure, or set the label text, caption, or wording for repeat, recurring, or repeated events within a scheduling or calendar editor interface. Control how the recurrence indicator, repetition tag, or frequency label appears in different languages or locales for editors handling event repetition, reoccurrence, or scheduling cycles. Adjust the captions for recurring event prompts, repeat options, or event repeat dialogs in various internationalization and localization scenarios.
</div>

#### Example - set the "repeat" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            repeat: "Repeat the event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.separateTimezones `String`

The text similar to "Use separate start and end time zones" displayed in the scheduler event editor.


<div class="meta-api-description">
How to customize the separate time zones message in Kendo UI Scheduler editor? Customize or configure the label text for scheduling interfaces that control whether start and end times use distinct time zones by changing or setting the message that prompts users to enable or disable separate time zone settings for start and end times in calendar or event editors, allowing modification of displayed text for clearer user guidance on handling different time zone inputs during scheduling.
</div>

#### Example - set the "separateTimezones" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            separateTimezones: "Set different start and end time zones"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.start `String`

The text similar to "Start" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the "Start" label in Kendo UI Scheduler's event editor? Customize, set, or localize the start label text displayed in the event editor interface of date and time scheduling tools, enabling developers to modify or translate the indicator that marks the beginning or commencement time of an event. Control the wording, captions, or prompt that signifies when an appointment, task, or calendar entry starts, allowing for multilingual support, branding adjustments, and user interface text updates related to scheduling start times in event management or calendar applications.
</div>

#### Example - set the "start" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            start: "Start of the event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.startTimezone `String`

The text similar to "Start timezone" displayed in the scheduler event editor.


<div class="meta-api-description">
How to change the label for the start time zone field in Kendo UI Scheduler? Customize, set, or change the label text for the start time zone field in event scheduling interfaces, modify or configure the displayed timezone name in event editors, control how the start timezone prompt or title appears when creating or editing calendar events, update or localize the start timezone wording in scheduling dialogs, adjust the label that indicates the beginning time zone for events in appointment or calendar editors.
</div>

#### Example - set the "startTimezone" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            startTimezone: "Start date timezone"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.timezone `String`

The text similar to "Timezone" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the timezone label in the Kendo UI Scheduler event editor? Customize, configure, or translate the timezone label shown in the event editor of scheduling tools, adjust or set the displayed timezone text to match different locales or languages, control how timezone information is presented during event creation or editing, localize the timezone description or caption in calendar scheduler interfaces, modify or enable timezone labeling for clearer scheduling context across time zones in event management systems.
</div>

#### Example - set the "timezone" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            timezone: "Event timezone"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.timezoneEditorButton `String`

The text similar to "Time zone" displayed as text of timezone editor button in the scheduler event editor.


<div class="meta-api-description">
How do I change the label for the time zone selector button in Kendo UI Scheduler? Customize, localize, or change the label text for the time zone selector button in scheduling interfaces, enabling developers to set or configure the displayed timezone editor button caption, adjust phrasing such as "Time zone" or alternatives, and control the wording for time zone editing controls in calendar, scheduler, or event management components.
</div>

#### Example - set the "timezoneEditorButton" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            timezoneEditorButton: "Time zone"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.timezoneEditorTitle `String`

The text similar to "Timezones" displayed as title of timezone editor in the scheduler event editor.


<div class="meta-api-description">
How do I customize the title of the timezone selector in a Kendo UI Scheduler event editor? Control and customize the label or heading that appears for timezone selection within an event editor in scheduling interfaces, enabling localization, translation, or modification of the timezone picker title to fit different languages, regions, or user preferences, including configuring the text of the timezone selector's header to improve clarity and usability in calendar or event scheduling applications.
</div>

#### Example - set the "timezoneEditorTitle" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            timezoneEditorTitle: "Timezones"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.editor.title `String`

The text similar to "Title of the event" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the title of the event editor in Kendo UI Scheduler? Customize and control the text label or heading displayed at the top of the event editor interface within scheduling or calendar applications, enabling configuration of the prompt or title message for event creation or editing dialogs. This setting lets developers modify, set, or localize the editor's main title text shown when users add or update events, helping tailor the user interface's event editor header, label, or caption to specific terminology, languages, or branding needs in scheduling software.
</div>

#### Example - set the "title" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        editor: {
            title: "Title of the event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor `Object`

The configuration of the scheduler recurrence editor messages. Use this option to customize or localize the scheduler recurrence editor messages.


<div class="meta-api-description">
How do I customize the recurrence editor labels in Kendo UI Scheduler? Control and customize the text labels, prompts, and messages within the recurrence editor used for scheduling repetitive events, enabling localization, translation, or adjustment of default wording to fit different languages, user interfaces, or specific terminology preferences; configure and override recurrence editing strings to tailor the recurrence pattern descriptions, error messages, button labels, and informational text involved in setting and managing recurring schedules, ensuring clear communication and user-friendly recurrence configuration in calendar or event scheduler components.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting",
                recurrenceRule: "FREQ=WEEKLY;BYDAY=MO"
            }
        ],
        messages: {
            recurrenceEditor: {
                cancel: "Cancel",
                headerTitle: "Repeat",
                frequencies: {
                    never: "Never",
                    hourly: "Hourly",
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    yearly: "Yearly"
                },
                daily: {
                    repeatEvery: "Repeat every: ",
                    interval: " day(s)"
                },
                weekly: {
                    repeatEvery: "Repeat every: ",
                    interval: " week(s) on:",
                    repeatOn: "Repeat on:"
                },
                update: "Update"
            }
        }
    });
    </script>

### messages.recurrenceEditor.cancel `String`

Applicable in Scheduler Adaptive rendering scenario. The text for the cancel button on the scheduler recurrence editor header.


<div class="meta-api-description">
How can I change the cancel button label in Kendo UI Scheduler's recurrence editor? Customize, configure, or set the cancel button label, text, or caption displayed in the header of the recurrence editor within scheduler applications using adaptive rendering. This enables adjusting or changing the cancel action wording, button content, or UI text for recurrence editing interfaces, supporting localization, personalization, or alternative phrasing for cancel, dismiss, close, or exit commands during recurring event scheduling tasks.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting",
                recurrenceRule: "FREQ=WEEKLY;BYDAY=MO"
            }
        ],
        messages: {
            recurrenceEditor: {
                cancel: "Abort"
            }
        }
    });
    </script>

### messages.recurrenceEditor.daily `Object`

The configuration of the scheduler recurrence editor daily messages. Use this option to customize or localize the scheduler recurrence editor daily messages.


<div class="meta-api-description">
How to customize daily recurrence options in Kendo UI Scheduler? Adjust, customize, or localize text labels and messages shown in daily recurrence scheduling interfaces, including configuring the wording, prompts, and instructions for setting up daily repeating events, controlling language translation, modifying display strings, adapting UI text for calendar recurrence editors, and tailoring daily repetition options in scheduling tools to fit different languages, user preferences, or application requirements.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Daily Meeting",
                recurrenceRule: "FREQ=DAILY"
            }
        ],
        messages: {
            recurrenceEditor: {
                daily: {
                    repeatEvery: "Repeat every: ",
                    interval: " day(s)"
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.daily.interval `String`

The text similar to " day(s)" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the daily interval label in Kendo UI Scheduler's recurrence editor? Configure and customize the text label or phrase that appears for setting the daily interval in a recurrence or repeat event editor, such as adjusting the wording for how many days between occurrences, controlling the display and wording of daily repeat intervals, modifying or translating the daily frequency descriptor in scheduling or calendar controls, enabling personalized or localized strings for daily recurrence units, and setting up the text for daily spacing in repeating task or event editors.
</div>

#### Example - set the "interval" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            daily: {
                interval: " days(s)"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.daily.repeatEvery `String`

The text similar to "Repeat every: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the "Repeat every" label in Kendo UI Scheduler's daily recurrence editor? Customize and localize the label text for repeating daily events in scheduling tools, enabling control over the phrasing of interval prompts such as "Repeat every" on daily recurrence settings. This supports configuring the daily repeat interval description in recurrence editors, adjusting language for calendar event recurrence patterns, and tailoring UI text for repeat frequency input fields related to daily scheduling. Use cases include translating or modifying the daily repeat frequency label for clarity, adapting scheduling interfaces for different languages or terminology, and enabling precise control over how repeat intervals are presented to users setting daily recurring tasks or events.
</div>

#### Example - set the "repeatEvery" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            daily: {
                repeatEvery: "Repeat on: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end `Object`

The configuration of the scheduler recurrence editor end messages. Use this option to customize or localize the scheduler recurrence editor end messages.


<div class="meta-api-description">
How to customize the "end" message in Kendo UI Scheduler's recurrence editor? Control and customize the text, labels, prompts, and messages related to ending recurrence patterns in scheduling or calendar recurrence editors, including localization and translation of end-of-recurrence notifications, warnings, or instructions for setting recurrence stop conditions, termination criteria, or final occurrences in recurring events or appointments.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Weekly Meeting",
                recurrenceRule: "FREQ=WEEKLY;COUNT=10"
            }
        ],
        messages: {
            recurrenceEditor: {
                end: {
                    after: "After ",
                    occurrence: " occurrence(s)",
                    label: "End",
                    never: "Never",
                    mobileLabel: "Ends",
                    on: "On "
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.end.after `String`

The text similar to "After " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "after" label in a Kendo UI Scheduler's recurrence editor? Customize or configure the label text that appears after a specified number of occurrences in a recurrence or repeating event editor, enabling localization, customization of the "after" prompt that defines when a repeating schedule ends based on a count. Adjust, set, or translate the display text that indicates completion after a certain repetition count in scheduling user interfaces or calendar recurrence settings to match different languages, preferences, or application contexts.
</div>

#### Example - set the "after" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            end: {
                after: "after "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end.occurrence `String`

The text similar to " occurrence(s)" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the text suffix for recurring events in a Kendo UI Scheduler? Control and customize the text suffix that appears after the number indicating how many times a recurring event repeats, such as defining labels like "occurrence," "occurrences," or other terms to display after the recurrence count in scheduling interfaces. This setting enables configuring the wording that follows repeat counts, adapting the phrasing for end-of-recurrence event counts, repeat occurrence descriptions, or recurrence editor labels in calendar, event, or scheduler components. Adjust the suffix for user-facing messages showing the total repetitions or cycles of repeating events, tailoring how the count is presented in various recurrence rule editors and scheduling UI elements.
</div>

#### Example - set the "occurrence" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            end: {
                occurrence: " occurrence(s)."
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end.label `String`

The text similar to "End:" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How can I customize the "End:" label in a Kendo UI Scheduler's recurrence settings dialog? Adjust, configure, or customize the text label shown for the ending point in a scheduler's recurrence settings, including modifying how the "End:" descriptor appears, changing the end date prompt, renaming the conclusion label in repeat or recurring event dialogs, and controlling the wording displayed for ending or stopping recurrence patterns in calendar or scheduling interfaces.
</div>

#### Example - set the "label" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            end: {
                label: "end: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end.never `String`

The text similar to "Never" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the label for "no end date" in Kendo UI Scheduler's recurrence editor? Control and customize the label text for the option that specifies no end date or infinite recurrence in scheduling tools and recurrence pattern editors, enabling developers to set, change, or localize the wording for event recurrence rules that never expire, do not end, or continue indefinitely in calendar, appointment, or task scheduling interfaces.
</div>

#### Example - set the "never" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            end: {
                never: "never"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end.mobileLabel `String`

The text similar to "Ends" displayed in the adaptive version of the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "Ends" label in Kendo UI Scheduler's mobile recurrence editor? Customize or localize the label text for the mobile recurrence editor’s "Ends" field in scheduling interfaces, enabling control over the display term that indicates when a recurring event stops or finishes on mobile devices. This supports internationalization, adapting the end date label for mobile recurrence settings, allowing adjustment of the term users see for the event end condition within recurrence editors on smaller screens, supporting various languages, terminologies, or regional phrasing for the finish/end point of repeating calendar entries on mobile platforms.
</div>

#### Example - set the "mobileLabel" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      mobile: "phone",
      height: 550,
      messages: {
        recurrenceEditor: {
            end: {
                mobileLabel: "ends: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.end.on `String`

The text similar to "On " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How can I customize the "On" label in Kendo UI Scheduler's recurrence editor? Customize or configure the label text for the "On" option in the recurrence end settings of scheduling or calendar applications, modify the displayed wording or phrasing shown to users ending a recurring event on a specific date, control and set the end date label in recurrence editors, localize or translate the termination label in recurrence patterns, adjust the text that indicates when a recurring event concludes, and personalize the user interface messaging related to specifying the final occurrence date of a repeating schedule.
</div>

#### Example - set the "on" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            end: {
                on: "on "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.endTitle `String`

Applicable in Scheduler Adaptive rendering scenario. The text for the endTitle (end repeat on) on the scheduler recurrence editor.


<div class="meta-api-description">
How can I customize the "End Title" in Kendo UI Scheduler's recurrence editor? Configure and customize the text label that appears for ending recurrence rules in scheduling interfaces with adaptive or responsive designs, including setting or modifying the phrase used to indicate when repeating events conclude, adjusting the end repeat title or prompt within recurrence editors, controlling the display language or wording for recurrence end settings, and personalizing the user interface messaging related to the termination point of recurring calendar entries.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                endTitle: "End Repeat"
            }
        }
    });
    </script>

### messages.recurrenceEditor.frequencies `Object`

The configuration of the scheduler recurrence editor frequencies messages. Use this option to customize or localize the scheduler recurrence editor frequencies messages.


<div class="meta-api-description">
How do I customize frequency labels in Kendo UI Scheduler's recurrence editor? Customize, localize, or configure frequency labels, terms, and messages for recurrence patterns in scheduling or calendar apps, including options to set daily, weekly, monthly, yearly intervals, or custom recurrence frequencies. Adjust naming conventions for recurrence frequency selectors, edit frequency descriptors, translate frequency options for different languages, control how recurrence intervals are displayed or phrased within the editor interface, and tailor frequency labels to match user preferences or localization needs in scheduling and event recurrence settings.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Event",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                frequencies: {
                    never: "Never",
                    hourly: "Hourly",
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    yearly: "Yearly"
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.frequencies.daily `String`

The text similar to "Daily" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I change the label for daily recurrence intervals in a Kendo UI Scheduler? Customize, configure, or change the label, text, or wording displayed for daily recurrence intervals within scheduling or calendar recurrence editors. Control how the term for daily frequency appears in recurrence patterns, repeat options, or event repeat settings. Set or localize the daily repeat description, rename the daily option in recurrence dialogs, or adjust the daily interval prompt shown when defining repeating tasks, events, or appointments in scheduling tools. Modify the string that represents daily repetition frequency to match custom terminology, language preferences, or UI requirements in event recurrence editors.
</div>

#### Example - set the "daily" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            frequencies: {
                daily: "daily"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.frequencies.monthly `String`

The text similar to "Monthly" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the label for monthly recurrence in Kendo UI Scheduler's recurrence editor? Configure and customize the label for monthly recurrence frequency in the scheduler’s recurrence editor, enabling localization, translation, or modification of the default "Monthly" text to suit different languages, user preferences, or UI terminology for repeating events occurring every month in calendar scheduling interfaces.
</div>

#### Example - set the "monthly" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            frequencies: {
                monthly: "monthly"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.frequencies.never `String`

The text similar to "Never" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "never repeat" label in a Kendo UI Scheduler recurrence editor? Customize, configure, or translate the label indicating no recurrence or the option to disable repetition frequency in scheduling tools, calendar apps, or event editors, enabling users to specify that an event or task should never repeat or recur. This includes setting the display text for the "never repeat," "no recurrence," "one-time event," or "no frequency" option within recurrence configuration interfaces, supporting localization, UI adjustments, and user preferences to clearly convey the absence of repeat intervals or scheduling cycles.
</div>

#### Example - set the "never" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            frequencies: {
                never: "never"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.frequencies.weekly `String`

The text similar to "Weekly" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "Weekly" label in Kendo UI Scheduler's recurrence editor? Customize and translate the label for recurring weekly events in the scheduler’s recurrence editor by configuring or setting the weekly frequency text, enabling localization or internationalization of the term "Weekly" for user interfaces that manage repeating schedules, calendar recurrences, or event planners where weekly intervals need to be displayed in different languages or customized wording.
</div>

#### Example - set the "weekly" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            frequencies: {
                weekly: "weekly"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.frequencies.yearly `String`

The text similar to "Yearly" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the yearly recurrence label in Kendo UI Scheduler? Configure or customize the yearly recurrence label, yearly frequency text, annual repeat options, or yearly pattern name displayed in scheduling or calendar recurrence editors, enabling localization, language adjustments, and personalized strings for repeating events every year, annual schedules, or yearly reminders.
</div>

#### Example - set the "yearly" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            frequencies: {
                yearly: "yearly"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.headerTitle `String`

Applicable in Scheduler Adaptive rendering scenario. The text for the headerTitle (text in the header) on the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the title in the recurrence editor of a Kendo UI Scheduler? Customize or configure the title text displayed at the top of the recurrence editor within scheduling components that use adaptive rendering, enabling control over the header label in recurring event editors, modifying the recurrence dialog or popup heading, setting or changing the recurrence editor's header caption, adjusting the title displayed when editing event repetition patterns, and personalizing the textual header for recurrence settings interfaces in calendar or scheduler applications.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                headerTitle: "Edit Recurrence"
            }
        }
    });
    </script>

### messages.recurrenceEditor.monthly `Object`

The configuration of the scheduler recurrence editor monthly messages. Use this option to customize or localize the scheduler recurrence editor monthly messages.


<div class="meta-api-description">
How do I customize the monthly recurrence editor messages in Kendo UI Scheduler? Customize, configure, or localize the monthly recurrence editor messages in scheduling tools to control how monthly repeating events are described, adjusted, or displayed. Enable setting precise text labels, prompts, and notifications for monthly recurrence patterns, including options for frequency, day selection, interval adjustments, and user-friendly monthly repeat descriptions. Adapt the language and labels for monthly event editors to match localization needs, customize recurrence rules, or tailor the monthly scheduler interface to specific user preferences and internationalization requirements. Support modifying default messages for clearer communication of monthly repeats in calendar or scheduling applications, ensuring the monthly recurrence editor reflects customized wording, translations, or personalized settings.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Monthly Meeting",
                recurrenceRule: "FREQ=MONTHLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                monthly: {
                    day: "Day ",
                    interval: " month(s)",
                    of: " of ",
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: "
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.monthly.day `String`

The text similar to "Day " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the "Day" label in monthly recurrence settings for Kendo UI Scheduler? Customize or set the label text for the day field in monthly recurrence settings within scheduling or calendar apps, enabling localization, translation, or modification of the "Day" descriptor shown in monthly recurrence editors, as used in configuring repeat events on specific days each month, adjusting UI wording for monthly recurrence day selection, or controlling the monthly repeat day label in date picker or scheduling interfaces.
</div>

#### Example - set the "day" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            monthly: {
                day: "day "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.monthly.date `String`

The text similar to "Date " displayed in the scheduler recurrence editor. Also used for titles of the appropriate inputs.


<div class="meta-api-description">
How to customize the date input field label in Kendo UI Scheduler's monthly recurrence editor? Customize and configure the text labels, captions, and titles displayed for the date input field within monthly recurrence settings in scheduling or calendar applications, allowing control over how date selectors and their prompts appear in recurrence editors, supporting localization, user interface customization, and adapting the wording for recurring event date inputs in monthly repeat patterns.
</div>

#### Example - set the "date" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            monthly: {
                date: "Exact date "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.monthly.interval `String`

The text similar to " month(s)" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the interval label in Kendo UI Scheduler's monthly recurrence editor? Customize or translate the label displaying the frequency interval for monthly recurrences in scheduling tools, enabling configuration of the text such as "month(s)" or equivalent terms in different languages or regional formats, to support localization and adapt the recurrence editor’s interval descriptor for monthly repeating events, ensuring clarity and appropriate phrasing in diverse user interfaces that manage recurring calendar entries on a monthly basis.
</div>

#### Example - set the "interval" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            monthly: {
                interval: " month(s)."
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.monthly.repeatEvery `String`

The text similar to "Repeat every: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How can I customize the "repeat every" label in Kendo UI Scheduler's recurrence editor for monthly recurring events? Customize or translate the label text that specifies how often a recurring event repeats on a monthly basis, such as setting or localizing the phrase that prompts users with "repeat every," enabling adjustment of recurrence frequency descriptions for monthly schedules, and controlling the display wording used in scheduling interfaces to clarify monthly repetition intervals in various languages or terminologies.
</div>

#### Example - set the "repeatEvery" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            monthly: {
                repeatEvery: "Repeat each: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.monthly.repeatOn `String`

The text similar to "Repeat on: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the label for the "repeat on" option in a monthly recurrence editor in Kendo UI Scheduler? Change, set, or customize the label text for the monthly recurrence option that specifies which day or date to repeat on in a scheduler or calendar interface, including editing or configuring the prompt text users see when defining monthly repeating events or tasks, controlling how the "repeat on" instruction is displayed for recurring scheduling patterns, adjusting the terminology used for monthly repeat selections in recurrence editors or event planners, and enabling localization or personalization of the monthly repeat day selector prompt.
</div>

#### Example - set the "repeatOn" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            monthly: {
                repeatOn: "repeat on: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.offsetPositions `Object`

The configuration of the scheduler recurrence editor `offsetPositions` messages. Use this option to customize or localize the scheduler recurrence editor `offsetPositions` messages.


<div class="meta-api-description">
How do I customize the position offset messages in Kendo UI Scheduler's recurrence editor? Configure or customize the text, labels, and messages related to position offsets in the recurrence editor of scheduling tools, enabling localization, translation, or overriding default wording for better user interface adaptation. Enable precise control over how offset position prompts, hints, or descriptions appear in recurrence settings, supporting multilingual displays and tailored message adjustments to match different languages, terminologies, or regional formats in calendar event recurrence editors. Adjust, translate, or override offset-related scheduler recurrence editor messages to suit diverse user preferences, programming needs, or internationalization requirements.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Monthly Meeting",
                recurrenceRule: "FREQ=MONTHLY;BYSETPOS=1;BYDAY=MO"
            }
        ],
        messages: {
            recurrenceEditor: {
                offsetPositions: {
                    first: "first",
                    second: "second",
                    third: "third",
                    fourth: "fourth",
                    last: "last"
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.offsetPositions.first `String`

The text similar to "first" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the label for the first occurrence in a recurrence pattern in Kendo UI Scheduler? Customize or configure the label text for the initial position or starting point in a recurrence pattern within scheduling tools, such as changing or setting the displayed name for the first occurrence, offset, or position option in recurrence editors. Enable control over terminology used for the first offset position in recurring event configurations, adjusting language or labels for repeat scheduling interfaces, and tailoring UI text to match preferred naming conventions for the initial instance in recurrence rules or patterns.
</div>

#### Example - set the "first" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            offsetPositions: {
                first: "first"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.offsetPositions.second `String`

The text similar to "second" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the label for seconds in Kendo UI Scheduler's recurrence editor? Configure or customize the label text for seconds in scheduling recurrence patterns, enabling localization and adjustment of the time offset unit for precise interval settings, recurrence rules, countdown displays, or timer configurations where the concept of seconds as an offset position is required, allowing developers to set or translate the terminology for seconds to match different languages or specific application contexts in schedule editors, event repeat setups, or calendar recurrence interfaces.
</div>

#### Example - set the "second" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            offsetPositions: {
                second: "second"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.offsetPositions.third `String`

The text similar to "third" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the label for the third occurrence in Kendo UI Scheduler's recurrence editor? Customize, localize, or set the label text for the third offset position displayed in a recurrence editor for scheduling, enabling control over how the third occurrence or offset is named or represented in various languages or custom configurations within calendar or event recurrence settings, accommodating translation, user interface text changes, and regional adaptations for recurrence patterns.
</div>

#### Example - set the "third" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            offsetPositions: {
                third: "third"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.offsetPositions.fourth `String`

The text similar to "fourth" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the fourth offset position label in Kendo UI Scheduler's recurrence editor? Customize and translate the label or text displayed for the fourth positional option within the recurrence pattern settings of a scheduling interface, enabling localization and language adaptation for recurring event configurations, recurrence rules, and scheduler UI positions, particularly useful for adjusting the wording of fourth occurrence selectors or offset position descriptions in calendar scheduling editors and recurrence editing tools.
</div>

#### Example - set the "fourth" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            offsetPositions: {
                fourth: "fourth"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.offsetPositions.last `String`

The text similar to "last" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "last" label in Kendo UI Scheduler's recurrence editor? Customize, translate, or set the label for the final position option in recurrence scheduling interfaces, controlling how the "last" offset is displayed in recurrence patterns, repeat rules, or scheduling configurations. Adjust the wording for last-day, end-position, or tail occurrences within recurrence editors, enabling localization, internationalization, and adaptation of offset position text in event repeat settings, calendar controls, or date recurrence selectors.
</div>

#### Example - set the "last" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            offsetPositions: {
                last: "last"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.recurrenceEditorTitle `String`

The text of the Recurence editor dropdown title.


<div class="meta-api-description">
How can I customize the title of the recurrence editor in Kendo UI Scheduler? Customize or configure the title text shown at the top of the recurrence editor dropdown within scheduling interfaces, including setting or changing the localized label or header for recurring event editors, controlling the display name for recurrence settings dialogs, adjusting the visible title that indicates the recurrence configuration panel, and enabling custom titles to better represent recurring event editors in multiple languages or contexts.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                recurrenceEditorTitle: "Edit Recurrence"
            }
        }
    });
    </script>

### messages.recurrenceEditor.repeatTitle `String`

Applicable in Scheduler Adaptive rendering scenario. The text for the repeatTitle (repeat on) on the scheduler recurrence editor.


<div class="meta-api-description">
How can I customize the "repeat" label in the Kendo UI Scheduler's recurrence editor? Customize or configure the text label for the repeat section in the recurrence editor of a scheduling or calendar tool, enabling localization, translation, or adjustment of the phrase that indicates repeating events, cycles, or recurring appointments, so developers can control the displayed title for repeat options, occurrences, or patterns in the adaptive recurrence editor interface.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                repeatTitle: "Repeat On"
            }
        }
    });
    </script>

### messages.recurrenceEditor.update `String`

Applicable in Scheduler Adaptive rendering scenario. The text for the update button on the scheduler recurrence editor header.


<div class="meta-api-description">
How do I customize the update button text in Kendo UI Scheduler's recurrence editor? Customize, translate, or configure the text label for the update button in the recurrence editor of a scheduling interface, enabling localization and adaptation of the button’s wording in recurring event editors, recurrence dialogs, or repeat event settings to match different languages, user interfaces, or adaptive layouts for consistent user experience across diverse locales and dynamic UI environments.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                update: "Update"
            }
        }
    });
    </script>

### messages.recurrenceEditor.weekly `Object`

The configuration of the scheduler recurrence editor weekly messages. Use this option to customize or localize the scheduler recurrence editor weekly messages.


<div class="meta-api-description">
How to customize weekly recurrence options in Kendo UI Scheduler? Customize and localize text displayed in weekly recurrence options within scheduling or calendar applications, control labels and messages for configuring weekly repeat patterns, set or modify wording for weekly event recurrence editors, enable translation or adjustment of weekly frequency prompts, and tailor user interface strings related to selecting and managing weekly repetition intervals in recurring event settings.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Weekly Meeting",
                recurrenceRule: "FREQ=WEEKLY;BYDAY=MO"
            }
        ],
        messages: {
            recurrenceEditor: {
                weekly: {
                    interval: " week(s) on:",
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on:"
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.weekly.interval `String`

The text similar to " week(s)" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize weekly recurrence interval label in Kendo UI Scheduler? Customize, translate, or configure the text label for weekly recurrence intervals in scheduling or calendar recurrence editors, enabling control over how recurring event frequency is displayed, such as setting or modifying the "week" or "weeks" designation, adjusting localization or language-specific interval wording, and managing how weekly repetition intervals appear in recurrence patterns or scheduling interfaces.
</div>

#### Example - set the "interval" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekly: {
                interval: " week(s)."
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.weekly.repeatEvery `String`

The text similar to "Repeat every: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize "Repeat every" label in Kendo UI Scheduler's recurrence editor for weekly recurring events? Customize or localize the label text that indicates how often a weekly recurrence repeats, such as modifying or configuring the phrase for "Repeat every" intervals in scheduling, calendar, or recurrence editors to display alternative wording or translations for repeating events on a weekly basis, enabling control over the frequency descriptor shown to users arranging repeated occurrences or appointments.
</div>

#### Example - set the "repeatEvery" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekly: {
                repeatEvery: "Repeat each: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.weekly.repeatOn `String`

The text similar to "Repeat on: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How do I customize the "Repeat on:" label in Kendo UI Scheduler's recurrence editor for weekly repetition? Customize or translate the label that prompts users to select specific days for weekly repetition patterns in scheduling interfaces, enabling localization or adjustment of the "Repeat on:" text within recurrence editors, recurring event planners, or calendar settings to match different languages, regional formats, or personalized phrasing in user interfaces that manage repeated weekly events or schedules.
</div>

#### Example - set the "repeatOn" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekly: {
                repeatOn: "repeat on: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.weekdays `Object`

The configuration of the scheduler recurrence editor week days messages. Use these options to customize or localize the scheduler recurrence editor weekdays messages.


<div class="meta-api-description">
How do I change the weekday names in the Kendo UI Scheduler recurrence editor? Control and customize the weekday names or labels shown in the recurrence editor of scheduling tools, enabling localization, renaming, or overriding default day labels for Monday through Sunday. Configure, set, or modify how weekdays appear in recurring event editors, supporting internationalization or personalized naming conventions for days of the week in calendar or scheduler interfaces. Adjust weekday text for recurrence rules to match different languages, abbreviations, or custom labels, enhancing user experience in date pickers, event planners, or time management applications.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Weekly Meeting",
                recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
            }
        ],
        messages: {
            recurrenceEditor: {
                weekdays: {
                    day: "day",
                    weekday: "weekday",
                    weekend: "weekend day"
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.weekdays.day `String`

The text similar to "day" displayed in the repeat by section of the monthly recurrence pattern.


<div class="meta-api-description">
How do I customize the label for day-based options in a Kendo UI Scheduler's recurrence editor? Customize or set the label text for the day-based option in a scheduler's recurrence editor, specifically within the monthly repeat settings, enabling control over how weekdays or day selections are presented, formatted, or displayed in the repeat by criteria; this supports localization, UI adjustments, and personalized naming for days in recurrence rules when configuring, editing, or managing scheduled events with repeat intervals based on specific days of the month or week.
</div>

#### Example - set the "day" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekdays: {
                day: "Day"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.weekdays.weekday `String`

The text similar to "weekday" displayed in the repeat by section of the monthly recurrence pattern.


<div class="meta-api-description">
How to customize weekday labels in Kendo UI Scheduler's recurrence editor? Customize or translate the label for individual days of the week used in scheduling recurring events, particularly for setting up monthly recurrences with repeat-by-day options. Enable localization and configuration of weekday names, modify or set custom day labels, and adapt the displayed text in recurrence editors for different languages or regional preferences. Control how weekdays appear when users specify repetition patterns by day within calendar or scheduling interfaces, including adjusting day names used in repeat-by settings for recurring event rules.
</div>

#### Example - set the "weekday" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekdays: {
                weekday: "Week day"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.weekdays.weekend `String`

The text similar to "weekend" displayed in the repeat by section of the monthly recurrence pattern.


<div class="meta-api-description">
How to customize the label for weekend days in Kendo UI Scheduler's monthly recurrence options? Customize or set the label displayed for weekend days in the monthly recurrence options, control how "weekend" is shown in recurring event repeat settings, configure the weekend text in scheduling interfaces, change or localize the weekend term in recurrence editors, enable customization of weekend day labels for repeating events, adjust the wording used to represent weekend periods in recurrence rules, define or modify the description of weekend days in scheduling recurrence controls, tailor the weekend label for calendar repeat patterns, manage the weekend name shown during event recurrence setup, and personalize the terminology used for weekends in scheduler repeat by settings.
</div>

#### Example - set the "weekend" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            weekdays: {
                weekend: "Week day"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly `Object`

The configuration of the scheduler recurrence editor yearly messages. Use this option to customize or localize the scheduler recurrence editor yearly messages.


<div class="meta-api-description">
How can I customize yearly recurrence messages in Kendo UI Scheduler? Customize, configure, or localize yearly recurrence messages, labels, and prompts within scheduling or calendar recurrence editors, enabling developers to adapt annual recurrence settings, control localization, modify repeated event descriptions for yearly patterns, set or override default text for yearly frequency options, and tailor user interface messages related to yearly scheduling recurrence rules across different languages and regions.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Annual Meeting",
                recurrenceRule: "FREQ=YEARLY"
            }
        ],
        messages: {
            recurrenceEditor: {
                yearly: {
                    day: "day",
                    interval: " year(s)",
                    month: "month",
                    of: " of ",
                    repeatEvery: "Repeat every: ",
                    repeatOn: "Repeat on: "
                }
            }
        }
    });
    </script>

### messages.recurrenceEditor.yearly.day `String`

The text similar to "day" displayed in the scheduler recurrence editor. Also used for titles of the appropriate inputs.


<div class="meta-api-description">
How do I customize the "day" label in Kendo UI Scheduler's yearly recurrence editor? Configure or customize the localized text label for the "day" field within the yearly recurrence editor of scheduling interfaces, enabling control over language-specific terms and input prompts related to selecting days in yearly recurrence patterns, supporting internationalization, language adaptation, and localization of calendar or scheduling applications for better user clarity and accessibility.
</div>

#### Example - set the "day" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                day: "on day"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly.month `String`

The text similar to "month" displayed in the scheduler recurrence editor. Also used for titles of the appropriate inputs.


<div class="meta-api-description">
How do I customize the "month" label in a yearly recurrence editor for the Kendo UI Scheduler? Customize, translate, or localize the label and input placeholder for selecting the month within the yearly recurrence settings of a scheduling or calendar component. Enable changing the displayed text for the month field in recurrence editors to suit different languages, cultural formats, or user interface preferences. Configure or set the month name, title, or prompt shown in recurrence patterns that repeat annually, supporting internationalization and multilingual calendar scheduling experiences. This control helps adapt the month input label in yearly recurrence rules for diverse localization, UI customization, or accessibility needs.
</div>

#### Example - set the "month" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                day: "exact month"
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly.of `String`

The text similar to " of " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the "of" label in Kendo UI Scheduler's yearly recurrence editor? Customize the label text that appears in the yearly recurrence editor to specify the "of" keyword, enabling modification of the phrase used in date and month selections for recurring events, adjusting how the recurrence rule describes occurrences within specific months or days, configuring the displayed text that separates parts of a yearly repeat pattern, and controlling the wording shown in recurrence settings to better match localization, user preferences, or interface clarity in scheduling applications.
</div>

#### Example - set the "of" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                of: " of "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly.repeatEvery `String`

The text similar to "Repeat every: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to change the "repeat every year" label in Kendo UI Scheduler's recurrence editor? Configure and customize the label text for yearly recurrence intervals in calendar or scheduling apps, allowing developers to set or localize the phrase that indicates how often an event repeats annually. Adjust, change, or translate the descriptor used for specifying repetition frequency on a yearly basis within recurrence editors, ensuring the interface shows the correct prompt for users managing yearly event repetition settings. Enable control over the "repeat every year" wording in the recurrence settings, useful for localization, UI customization, or adapting to different languages and phrasing preferences when handling yearly repeating schedules.
</div>

#### Example - set the "repeatEvery" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                repeatEvery: "Repeat each: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly.repeatOn `String`

The text similar to "Repeat on: " displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to change the "Repeat on" label for yearly recurrence in Kendo UI Scheduler? Control the label text for the yearly recurrence "Repeat on:" option in scheduling interfaces, enabling customization, localization, translation, or modification of the prompt that specifies how users select repeat dates or intervals on an annual basis; adjust, configure, or override the default label displayed in recurrence editors, calendars, or event schedulers to match language preferences or custom wording for yearly repetition settings.
</div>

#### Example - set the "repeatOn" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                repeatOn: "repeat on: "
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceEditor.yearly.interval `String`

The text similar to " year(s)" displayed in the scheduler recurrence editor.


<div class="meta-api-description">
How to customize the yearly interval label in Kendo UI Scheduler's recurrence editor? Customize or localize the label that specifies the number of years between recurring events in a scheduler’s recurrence editor, enabling control over the text that indicates yearly intervals such as "year(s)" frequency, repetition period, or duration between annual recurrences, allowing developers to set, change, or translate the interval description shown to users when configuring yearly repeating schedules or calendar events.
</div>

#### Example - set the "interval" scheduler recurrence editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceEditor: {
            yearly: {
                interval: " year(s)."
            }
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages `Object`

The configuration of the scheduler recurrence messages. Use this option to customize or localize the scheduler recurrence messages.


<div class="meta-api-description">
How do I customize the recurrence-related messages in Kendo UI for jQuery Scheduler? Configure, customize, and localize recurrence-related user interface text for scheduling features, including enabling custom recurrence prompts, editing repeat event messages, setting multilingual recurrence instructions, controlling notification texts for recurring tasks, modifying repeat pattern warnings, and adjusting recurrence descriptions that appear in calendar or scheduling apps. Tailor and translate all recurrence labels, alerts, and helper texts to fit various languages and contexts, ensuring clear communication and consistent user experience in scheduling recurrence options.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Recurring Meeting",
                recurrenceRule: "FREQ=WEEKLY"
            }
        ],
        messages: {
            recurrenceMessages: {
                deleteRecurring: "Do you want to delete only this event occurrence or the whole series?",
                deleteWindowOccurrence: "Delete current occurrence",
                deleteWindowSeries: "Delete the series",
                deleteWindowTitle: "Delete Recurring Item",
                editRecurring: "Do you want to edit only this event occurrence or the whole series?",
                editWindowOccurrence: "Edit current occurrence",
                editWindowSeries: "Edit the series",
                editWindowTitle: "Edit Recurring Item"
            }
        }
    });
    </script>

### messages.recurrenceMessages.deleteRecurring `String`

The text similar to "Do you want to delete only this event occurrence or the whole series?" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I configure the confirmation message when deleting recurring events in Kendo UI Scheduler? Configure or customize the confirmation message when deleting recurring calendar events, enabling prompts that ask whether to remove a single occurrence or the entire event series, control recurring event deletion notifications, set or change dialog texts for deleting specific instances versus the full recurrence, handle user prompts for event series management, adjust warning messages for recurring appointment removals, and manage confirmations for recurring event edits or deletions in scheduling interfaces.
</div>

#### Example - set the "deleteRecurring" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            deleteRecurring: "Delete only this event occurrence or the whole series?"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.deleteWindowOccurrence `String`

The text similar to "Delete current occurrence" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the label for deleting an occurrence in a recurring event using Kendo UI Scheduler? Customize, modify, or configure the label text for deleting a single instance or occurrence within a recurring event or series in a scheduling interface, enabling tailored messaging for options like removing only the current event occurrence, controlling user prompts for deleting specific repetitions of recurring appointments, meetings, or calendar entries, and adjusting recurrence-related action labels to fit localization, customization, or specific application language needs around deletion of repeat event occurrences in event editors or calendar schedulers.
</div>

#### Example - set the "deleteWindowOccurrence" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            deleteWindowOccurrence: "Delete current event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.deleteWindowSeries `String`

The text similar to "Delete the series" displayed in the scheduler event editor.


<div class="meta-api-description">
How can I customize the delete series message in Kendo UI Scheduler? Customize or set the text label for deleting an entire recurring event series in a calendar or scheduler interface, configure messages that control how users can remove all occurrences at once, enable changing or localizing the phrase shown when opting to delete multiple repeated events, adjust recurrence deletion prompts, specify the wording for bulk event removal confirmations, and manage the user interface language or terminology for "delete the series" actions in scheduling event editors.
</div>

#### Example - set the "deleteWindowSeries" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            deleteWindowSeries: "Delete all occurrences"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.deleteWindowTitle `String`

The text similar to "Delete Recurring Item" displayed in the scheduler event editor.


<div class="meta-api-description">
How to set the title for the delete recurring event confirmation dialog in Kendo UI Scheduler? Control and customize the title text displayed in the confirmation dialog when deleting recurring events or series within a scheduling interface, including setting, modifying, or localizing the delete window header to enhance user clarity, prompt customization, dialog labeling, and user interface message adjustments related to recurring event deletion prompts or warnings.
</div>

#### Example - set the "deleteWindowTitle" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            deleteWindowTitle: "Delete Recurring event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.editRecurring `String`

The text similar to "Do you want to edit only this event occurrence or the whole series?" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I configure the prompt text for editing recurring events in Kendo UI Scheduler? Adjust or configure the prompt text displayed when modifying calendar events to choose whether to update only one occurrence or the entire series, including customizing confirmation messages, editing recurrence options, clarifying single versus recurring event edits, controlling dialog wording for rescheduling repeated appointments, setting labels for editing recurring items, and specifying user prompts for repeating event modifications within scheduling or calendar interfaces.
</div>

#### Example - set the "editRecurring" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            editRecurring: "Do you want to edit only this event or the whole series?"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.editWindowOccurrence `String`

The text similar to "Edit current occurrence" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the label for editing a single occurrence in recurring events using Kendo UI Scheduler? Customize or set the label text for editing a single instance or occurrence within recurring events in a scheduling or calendar interface, controlling how the prompt for modifying one occurrence in a series appears to users, enabling tailored wording such as "Edit current occurrence," "Modify this instance," or similar phrases in event editors for clearer user interaction with recurring event edits.
</div>

#### Example - set the "editWindowOccurrence" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            editWindowOccurrence: "Edit current event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.editWindowSeries `String`

The text similar to "Edit the series" displayed in the scheduler event editor.


<div class="meta-api-description">
How to customize the edit window series message in Kendo UI Scheduler? Customize or configure the localized text, label, or caption displayed during the modification or editing of an entire recurring event series within a calendar or scheduling interface, enabling tailored messaging for update, change, or adjust actions on series events, including prompts or notifications relevant to batch edits, recurring event management, and series-wide rescheduling in various languages or regional settings.
</div>

#### Example - set the "editWindowSeries" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            editWindowSeries: "Edit all occurrences"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.editWindowTitle `String`

The text similar to "Edit Recurring Item" displayed in the scheduler event editor.


<div class="meta-api-description">
How do I customize the title of the edit window for recurring events in the Kendo UI Scheduler? Customize and localize the title text displayed in the event editor window when modifying or updating recurring events in a scheduling interface, enabling control over the edit dialog heading for repeated appointments, recurring task updates, or series modifications within calendar or planner tools. This setting lets developers configure, set, or change the window title to match different languages, user contexts, or branding needs when users open the editor to adjust recurrence details.
</div>

#### Example - set the "editWindowTitle" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            editWindowTitle: "Edit Recurring Event"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.recurrenceMessages.resetSeriesWindowTitle `String`

The title of the prompt dialog opened to confirm the resetting of a series event.


<div class="meta-api-description">
How to customize reset series window title in Kendo UI Scheduler? Customize or translate the confirmation dialog title that appears when resetting a series of recurring events in a scheduling or calendar application, including options to set, localize, or modify the prompt text shown to users when they attempt to reset or edit entire recurring event series, ensuring clarity and context in various languages, configurations, or UI customizations for managing repeated event adjustments and resets.
</div>

#### Example - set the "resetSeriesWindowTitle" scheduler editor message

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        recurrenceMessages: {
            resetSeriesWindowTitle: "Reset Series"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.search `String`

The Search input title and placeholder text.


<div class="meta-api-description">
How do I customize the placeholder text in Kendo UI Scheduler's search input? Control and customize the text labels for search inputs in scheduling interfaces, including setting, localizing, or translating placeholder prompts, input titles, or search field hints to enhance user experience in calendar, event, or task schedulers; configure search box messaging for accessibility, UI localization, or tailored user guidance in scheduling components.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      toolbar: [ "search" ],
      messages: {
        search: "test"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views `Object`

The configuration of the scheduler views messages. Use this option to customize or localize the scheduler views messages.


<div class="meta-api-description">
How can I customize the view labels in the Kendo UI Scheduler for jQuery? Customize, configure, or localize scheduler calendar view labels, names, and messages such as day, week, month, timeline, or agenda views by setting custom text, translations, or language-specific labels to adapt the scheduler UI to different languages or branding needs, enabling control over all visible view captions and display messages for better user experience and interface localization in scheduling applications.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "workWeek", "week", "month", "agenda"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        messages: {
            views: {
                day: "Day",
                week: "Week",
                workWeek: "Work Week",
                agenda: "Agenda",
                month: "Month"
            }
        }
    });
    </script>

### messages.views.day `String`

The text similar to "Day" displayed as scheduler "day" view title.


<div class="meta-api-description">
How do I customize the title for the daily view in Kendo UI Scheduler? Customize, translate, or configure the title text displayed for the daily calendar or day view in scheduling interfaces, enabling control over how the "Day" label appears to users. Adjust or override the default day view heading to support localization, alternate wording, or custom phrasing for daily schedule displays, calendar day labels, or time-based event overviews. Set or modify the textual representation of the single-day view title, catering to internationalization, language preferences, and personalized UI labeling in calendar or scheduler components.
</div>

#### Example - set the "day" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        views: {
            day: "Today"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.week `String`

The text similar to "Week" displayed as scheduler "week" view title.


<div class="meta-api-description">
How to change the week view label in Kendo UI Scheduler? Customize or localize the text label shown as the title for the week view in the scheduler interface, allowing developers to set, change, or translate the displayed word for "Week" in calendar or scheduling components, enabling user-friendly week view headings, adjustable captions, or alternative naming for weekly time spans in apps or UI elements.
</div>

#### Example - set the "week" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        views: {
            week: "Weekly"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.month `String`

The text similar to "Month" displayed as scheduler "month" view title.


<div class="meta-api-description">
How to customize the month view header in Kendo UI Scheduler? Customize the calendar or scheduler month view header text by configuring or setting the label that appears on month view screens, enabling developers to change, rename, localize, or override the default "Month" title shown in calendar interfaces, date pickers, or scheduling applications, allowing for tailored UI text such as alternative words, translations, or personalized month view descriptors in various user interface scenarios.
</div>

#### Example - set the "month" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        views: {
            month: "Monthly"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.agenda `String`

The text similar to "Agenda" displayed as scheduler "agenda" view title.


<div class="meta-api-description">
How to change the "Agenda" title in a Kendo Scheduler? Customize or localize the agenda view title or label in scheduling interfaces, configure the text displayed for agenda or list views, set or modify the header title for timeline summaries, control the naming or captions shown in calendar agenda outputs, adjust the displayed wording for daily or event lists, translate or change the default "Agenda" terminology in scheduling components, update or personalize the label for agenda-like views in calendar schedulers, enable multi-language support for scheduler agenda headings, and tailor the agenda section titles to match user interface branding or localization requirements.
</div>

#### Example - set the "agenda" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      messages: {
        views: {
            agenda: "Events list"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.timelineMonth `String`

The text similar to "Timelnie Month" displayed as scheduler "timelineMonth" view title.


<div class="meta-api-description">
How to customize the title of the timeline month view in a Kendo UI Scheduler? Control and customize the timeline month view title or label shown in calendar schedulers, set or configure the display text for monthly timeline layouts, rename or modify the heading for timeline month views in scheduler interfaces, adjust the visible month label in timeline mode, localize or personalize the month timeline view title, change the display string for timeline month perspective, update or override default month timeline captions, tailor the monthly timeline header wording in scheduling components.
</div>

#### Example - set the "timelineMonth" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month", "timelineMonth", "timelineWeek" ],
      messages: {
        views: {
            timelineMonth: "Month, but sideways"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.timelineWeek `String`

The text similar to "Timelnie Week" displayed as scheduler "timelineWeek" view title.


<div class="meta-api-description">
How to customize the title of the weekly timeline view in Kendo UI Scheduler? Customize or localize the displayed title text for the weekly timeline calendar view, enabling you to change, translate, or set the header label for a scheduler’s week-by-week timeline display, adjust the naming convention or caption shown in schedule views that organize events across days and weeks, control the week timeline’s title to match different languages, formats, or user preferences for a weekly horizontal time grid.
</div>

#### Example - set the "timelineWeek" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month", "timelineMonth", "timelineWeek" ],
      messages: {
        views: {
            timelineWeek: "Week, but sideways"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### messages.views.year `String`

The text similar to "Year" displayed as scheduler "year" view title.


<div class="meta-api-description">
How do I customize the yearly view title in the Kendo UI Scheduler? Customize or translate the calendar or scheduler annual view title, configure the text label shown for the yearly overview, localize the year display name, set or change the heading text for the year view in scheduling interfaces, adjust the caption or title for the calendar's year mode, control how the year perspective is named or presented, update the language or wording for the year label in date pickers or schedulers, adapt the year view header to different locales or preferences, modify the displayed term for the annual timeline view in calendar components, and redefine the user-facing text representing the yearly schedule overview.
</div>

#### Example - set the "year" view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month", "year" ],
      messages: {
        views: {
            year: "Year, but sideways"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### min `Date` *(default: 1/1/1900)*

Constraints the minimum date which can be selected via the scheduler navigation.


<div class="meta-api-description">
How do I set a minimum date limit in Kendo UI Scheduler? Control the earliest selectable or navigable date in scheduling or calendar interfaces by setting a minimum date boundary that blocks users from choosing or browsing to any date before the specified point. Configure or enforce a lower date limit using date objects, strings, or timestamps during initialization to restrict scheduling, event creation, or navigation to allowable time frames, preventing selection, scrolling, or input of dates earlier than the defined minimum threshold for calendar, appointment, or timeline components.
</div>

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      min: new Date("1980/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### minorTickCount `Number` *(default:2)*

The number of time slots to display per major tick.

> Note that the minorTickCount value should set to number greater than 0.


<div class="meta-api-description">
How to adjust the number of smaller time intervals in a Kendo UI Scheduler? Adjust the number of smaller intervals or subdivisions displayed within each main time division on a schedule or timeline, enabling finer-grained control over time slots by splitting major ticks into equal parts; configure, set, or control the count of minor segments per major interval to customize the density of time markings for detailed scheduling, calendar views, or timeline precision with numeric values greater than zero.
</div>

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      minorTickCount: 1, // display one time slot per major tick
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### minorTimeHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the minor ticks.

By default the scheduler renders a `"&nbsp;"`.

The fields which can be used in the template are:

* date - represents the major tick date.


<div class="meta-api-description">
How do I customize the minor time header template in Kendo UI Scheduler? Control, configure, or customize the display and rendering of minor time headers or sub-interval ticks within the schedule timeline by providing templates or functions that define how individual minor time segments appear, including formatting dates, injecting custom HTML, or computing dynamic content based on time intervals or major time markers. Enable fine-tuned visual representation of sub-hour, minute, or finer-granularity time divisions in scheduling views, customize tick labels, render placeholders, or style minor time headers dynamically during initialization or runtime, allowing developers to format, override, or replace default empty or blank values with context-aware text, dates, or computed outputs inside scheduler header sections.
</div>

#### Example - set the minor time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      minorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 't')#</strong>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>



### mobile `Boolean|String` *(default: false)*

If set to `true` and the scheduler is viewed on mobile browser it will use adaptive rendering.

Can be set to a string `phone` which will force the widget to use adaptive rendering regardless of browser type.

> Important: With the mobile rendering, we recommend to set up the `height` option as well. Without setting an explicit height, every view of the scheduler might have a different height.


<div class="meta-api-description">
How do I enable mobile support for my Kendo UI Scheduler component? Control and configure responsive or adaptive layouts specifically optimized for mobile devices, enabling the scheduling interface to automatically adjust its design for smaller screens, phones, or mobile browsers by toggling mobile support or forcing phone mode. This helps set up mobile-friendly views that improve usability on handheld devices, smartphones, or touchscreens, ensuring the scheduler renders appropriately on different device types. Adjusting or enabling mobile rendering modes can also involve managing layout height settings to maintain consistent view sizes and prevent dynamic resizing issues on mobile displays. This covers use cases like adaptive UI, mobile-first rendering, responsive scheduling components, and device-specific layout control.
</div>

#### Example - enable adaptive rendering auto detect

    <div id="scheduler"></div>
    <script>
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/6"),
          mobile: true,
          height: 600,
          dataSource: [
            {
              id: 1,
              start: new Date("2013/6/6 08:00 AM"),
              end: new Date("2013/6/6 09:00 AM"),
              title: "Interview"
            }
          ]
        });
    </script>

#### Example - force adaptive rendering

    <div id="scheduler"></div>
    <script>
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/6"),
          mobile: "phone",
          height: 600,
          dataSource: [
            {
              id: 1,
              start: new Date("2013/6/6 08:00 AM"),
              end: new Date("2013/6/6 09:00 AM"),
              title: "Interview"
            }
          ]
        });
    </script>

### ongoingEvents `Boolean|Object`

The settings for the ongoing events highlight. The highlight is disabled by default. If you need to turn it on, set this option to `true`, or use a configuration object with its nested options.


<div class="meta-api-description">
How to enable ongoing event highlighting in Kendo UI Scheduler? Control the activation and customization of real-time event highlighting within the calendar or scheduling interface, enabling users to emphasize currently active appointments, meetings, or tasks. This feature supports toggling ongoing event visibility on or off, configuring dynamic visual cues for in-progress events, adjusting highlight styles, durations, and behaviors to match user preferences, and managing how live events are displayed in timelines, agenda views, or day planners. Whether enabling default continuous event markers or tailoring complex highlight options for ongoing items, this setting helps ensure users can easily identify which scheduled events are happening right now.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = currentTime.getHours();

    $("#scheduler").kendoScheduler({
      ongoingEvents: true,
      dataSource: [{
        id: 1,
        title: "test",
        start: new Date(year, month, day, hour - 1),
        end: new Date(year, month, day, hour + 1)
      }]
    });
    </script>

### ongoingEvents.cssClass `String` *(default: null)*

Specifies a custom CSS class applied to ongoing events. If not set, the default `k-event-ongoing` class will be applied.


<div class="meta-api-description">
How to customize the CSS class of ongoing events in Kendo UI Scheduler? Customize the appearance of currently running or active events by setting a specific CSS class that overrides the default styling applied to ongoing or in-progress events in the calendar or scheduler component; control, define, or configure the visual presentation of live events, highlight real-time event statuses, set custom styles or themes for events happening now, apply unique CSS selectors to distinguish ongoing appointments, meetings, or tasks, and modify default class names used for active event rendering to match branding or UI requirements.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = currentTime.getHours();

    $("#scheduler").kendoScheduler({
      ongoingEvents: {
        enabled: true,
        cssClass: "customClass"
      },
      dataSource: [{
        id: 1,
        title: "test",
        start: new Date(year, month, day, hour - 1),
        end: new Date(year, month, day, hour + 1)
      }]
    });
    </script>

    <style>
      .k-scheduler .k-event.customClass {
        border: 3px solid black;
      }
    </style>

### ongoingEvents.enabled `Boolean` *(default: false)*

Specifies if the ongoing events will be highlighted. Defaults to false.


<div class="meta-api-description">
How to enable visual highlighting of ongoing events in Kendo UI Scheduler? Enable or disable the visual highlighting or dimming of events that are currently in progress based on the current time within a scheduling or calendar interface, controlling whether ongoing meetings, appointments, or tasks appear distinctly marked, active, or emphasized in real-time views. Adjust this setting to configure the display of live, in-progress events so users can easily identify which events are happening now, toggle visibility of currently running time blocks, or set up dynamic updates reflecting current activity status within timeline or agenda components. This feature supports customization of event emphasis, live event focus, and real-time feedback for active scheduling entries.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = currentTime.getHours();

    $("#scheduler").kendoScheduler({
      ongoingEvents: {
        enabled: true
      },
      dataSource: [{
        id: 1,
        title: "test",
        start: new Date(year, month, day, hour - 1),
        end: new Date(year, month, day, hour + 1)
      }]
    });
    </script>

### ongoingEvents.updateInterval `Number` *(default: 60000)*

The update interval (in milliseconds) of the ongoing events highlight. Defaults to `60000` (a minute).


<div class="meta-api-description">
How often does Kendo UI update ongoing events in a Scheduler? Adjust how often the system refreshes or updates the display of active, live, or ongoing events to control real-time highlighting, polling intervals, or update frequency in milliseconds; configure the interval to speed up, slow down, enable dynamic live updates, or throttle periodic refresh rates for event tracking, live event rendering, and continuous event monitoring to optimize performance and responsiveness according to your scheduling or calendar view needs.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = currentTime.getHours();

    $("#scheduler").kendoScheduler({
      ongoingEvents: {
        enabled: true,
        updateInterval: 60 * 60 * 1000 // one hour interval
      },
      dataSource: [{
        id: 1,
        title: "test",
        start: new Date(year, month, day, hour - 1),
        end: new Date(year, month, day, hour + 1)
      }]
    });
    </script>

### ongoingEvents.useLocalTimezone `Boolean` *(default: true)*

If set to `false` the ongoing events will be highlighted in the scheduler [timezone](/api/javascript/ui/scheduler/configuration/timezone). That means only events that happen at the moment (according to their `start` and `end` data) will be highlighted. In order the highlight on the ongoing events to be visually in sync with the `currentTimeMarker` in the widget, the `useLocalTimezone` configuration options of both must be set to the same value. This way the highlighted ongoing events will be placed over the `currentTimeMarker`.


<div class="meta-api-description">
How does the Kendo UI Scheduler handle ongoing events when using a different timezone than local time? Control whether active or ongoing events are detected and displayed based on the Scheduler's configured timezone or the individual event timestamps, enabling customization of how current events are highlighted in relation to the current time indicator or marker; set or configure this behavior to use local or scheduler timezones to ensure accurate real-time event tracking, synchronization of ongoing event visibility with current time references, and precise control over event highlighting during live timelines or calendar views.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
      var currentTime = new Date();
      var year = currentTime.getFullYear();
      var month = currentTime.getMonth();
      var day = currentTime.getDate();
      var hour = currentTime.getHours();

      $("#scheduler").kendoScheduler({
        timezone: "Etc/UTC",
        ongoingEvents: {
          enabled: true,
          useLocalTimezone: false
        },
        currentTimeMarker: {
          useLocalTimezone: false
        },
        dataSource: [{
          id: 1,
          title: "test",
          start: new Date(year, month, day, hour - 1),
          end: new Date(year, month, day, hour + 1)
        }]
      });
    </script>

### pdf `Object`

Configures the Kendo UI Scheduler PDF export settings.


<div class="meta-api-description">
How to export scheduler data to PDF in Kendo UI? Control and customize exporting calendar or scheduling data to PDF files by configuring page layout, margins, scaling, filename generation, proxy settings, and export options. Adjust how schedule views, appointments, and timelines are rendered into PDF documents, set export parameters before or during initialization, enable PDF output generation from scheduler content, and fine-tune formatting, pagination, and output file details for seamless document creation and sharing.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            author: "John Doe",
            creator: "Scheduler App",
            date: new Date(),
            fileName: "Scheduler.pdf",
            forceProxy: true,
            keywords: "scheduler export",
            landscape: true,
            margin: {
                bottom: "1cm",
                left: "1cm",
                right: "1cm", 
                top: "1cm"
            },
            paperSize: "A4",
            subject: "Scheduler Export",
            title: "My Schedule"
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How do I set the author of a PDF generated by the Kendo UI Scheduler? Control and configure the metadata author information embedded in exported or printed PDF documents generated from scheduling or calendar data, enabling customization of the PDF author field visible in PDF readers and Acrobat during save, export, or print actions; set or change the creator, writer, or document owner text within the PDF properties to ensure accurate attribution, document identification, and metadata management during automated or manual PDF generation processes related to scheduling interfaces and calendar exports.
</div>

#### Example - set the author

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        author: "John Doe"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>


### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
How to prevent automatic print dialog when generating PDF in Kendo UI Scheduler? Enable or disable automatic triggering of the print dialog upon loading a PDF export of scheduling data, allowing seamless immediate printing without manual intervention or requiring user action to initiate print commands. Control whether the print preview or print dialog opens instantly after PDF generation, configure auto print behavior in exported calendar, event, or schedule documents, and manage printing flow when exporting Scheduler information as PDF files. Optimize workflow by setting automatic print triggers, print prompts, or silent printing modes for PDF exports of schedules, timetables, and event lists, recognizing some PDF viewers may restrict automatic print dialog display and need additional configuration.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            autoPrint: true
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later


<div class="meta-api-description">
How can I prevent hyperlinks from being clickable in a Kendo UI Scheduler PDF export? Control whether hyperlinks are disabled, ignored, or excluded when exporting schedules or calendar views to PDF, enabling you to configure the PDF output to omit clickable links entirely or selectively skip links matching specific CSS selectors; useful for preventing interactive links, ensuring static PDF content, avoiding link rendering, and customizing exported document behavior by enabling, setting, or turning off link activation and hyperlink inclusion in exported schedule PDFs.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            avoidLinks: true
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How do I set the creator metadata for PDFs generated from a Kendo UI Scheduler? Set or customize the creator metadata embedded in PDF files generated from scheduling content, control the PDF Info dictionary's creator string to identify the source application or tool that produced the document, configure or modify the PDF creator field to track PDF origin when exporting, printing, or saving calendar or scheduler data as PDF, enable specifying or overriding the default creator information for PDFs exported from scheduling interfaces, support for setting author or creator identifiers within PDF metadata for better document provenance and traceability.
</div>

#### Example - set the creator

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        creator: "John Doe"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How to customize the date in the PDF metadata when exporting from Kendo UI Scheduler? Configure or specify the creation timestamp embedded into the generated PDF’s metadata when exporting from scheduling tools, allowing you to control the PDF’s date field by providing a custom date and time value, typically supplied as a JavaScript Date object or similar datetime format, useful for setting historical, future, or fixed document creation dates instead of the default current timestamp applied automatically during PDF generation.
</div>

#### Example - set the date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        date: new Date("2014/10/10")
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How do I customize the file name when generating a PDF in Kendo UI Scheduler? Specify or customize the name of the exported PDF file when generating a downloadable calendar or schedule document, enabling control over the file name used during PDF export, setting meaningful or descriptive titles for saved schedule files, configuring the default or dynamic file name assigned to exported calendar PDFs, and ensuring the resulting PDF download has a specific, user-defined filename for better organization and identification.
</div>

#### Example - set the default PDF file name

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        fileName: "Events.pdf"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/scheduler#configuration-pdf.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
How to force PDF export through a proxy server in Kendo UI Scheduler? Control routing of exported PDF files by enforcing server-side proxy forwarding, ensuring all generated PDF content is sent through a specified proxy URL regardless of local browser download capabilities, enabling centralized handling, secure delivery, or auditing of PDF exports within scheduling or report generation workflows, optionally configured at setup to override default client-side saving and guarantee consistent proxy-based processing of PDF output.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            forceProxy: true,
            proxyURL: "/save"
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How do I adjust image quality when exporting scheduler data to PDF? Adjust image compression quality for pictures embedded in PDFs exported from the scheduler by setting the JPEG quality level between 0 and 1, controlling trade-offs between image clarity, file size, compression rate, visual fidelity, and output resolution; optimize for higher quality to enhance picture sharpness and detail or reduce quality to minimize exported PDF size and improve performance, balancing image fidelity, compression ratio, export quality settings, and resource usage in exported documents.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            jpegQuality: 0.8
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How to prevent PNG images from being converted to JPEG when exporting a Scheduler as PDF? Control whether PNG images embedded in the scheduler export remain unaltered and preserved in their original PNG format when generating PDFs, enabling you to maintain image quality and avoid automatic conversion to JPEG or other formats. Configure export settings to keep raster images as PNG files within the PDF output, ensuring transparent backgrounds and sharp visuals are retained, ideal for preserving graphics, charts, or screenshots during PDF generation from scheduling or calendar data. Enable or disable PNG format retention in exports to optimize image fidelity, maintain visual consistency, or comply with asset requirements when producing PDFs from scheduler content.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            keepPNG: true
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How do I customize the metadata keywords for PDF exports from a Kendo UI Scheduler? Set or control the metadata keywords embedded in exported PDF documents from scheduling tools by specifying a list of comma-separated terms that improve searchability, indexing, content tagging, document identification, or filtering within PDFs generated from calendar or event data, enabling enhanced discoverability across different PDF viewers, search engines, and archival systems through keyword customization, adjustment, or configuration during PDF export processes.
</div>

#### Example - set the keywords

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        keywords: "events interviews"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
How to configure PDF export in landscape orientation for Kendo UI Scheduler? Configure PDF export orientation to landscape by enabling wide page layout, flip page dimensions for horizontal printing, set PDF output to use wider page width instead of default portrait mode, switch paper orientation to landscape during export or print, control Scheduler PDF format to produce horizontal pages, enable page rotation for PDF to create landscape documents, set export layout to wide format, force print and export to use landscape rather than portrait, adjust exported PDF pages for horizontal display, and customize PDF scheduler output to flip dimensions for better visualization on wide screens or prints.
</div>

#### Example - enable landscape mode

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        landscape: true
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
How do I adjust the margins for PDF exports in Kendo UI Scheduler? Set or adjust page margins for PDF exports of scheduling data by specifying precise margin sizes in multiple units like millimeters, centimeters, inches, or points, enabling control over top, bottom, left, and right spacing when generating printable schedules, timetables, or calendar PDFs. Customize PDF page whitespace, borders, and edge padding for better layout, print formatting, and visual appearance. Configure export margins to fit content neatly on pages or to meet printing standards when saving or exporting schedule views as PDF documents.
</div>

#### Example - set the margins

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the bottom margin in Kendo UI Scheduler's PDF export? Adjust or configure the bottom margin size for PDF exports from a scheduling tool to control the amount of white space at the base of each page, enabling fine-tuning of page layout, spacing, and positioning of content when generating PDFs. This setting accepts numerical values typically interpreted as points to set the lower boundary margin, helping customize page formatting, prevent content cutoff at the bottom, and manage blank space for professional-looking exported schedules or reports.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            margin: {
                bottom: "2cm"
            }
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How to adjust left margin when exporting Scheduler to PDF? Adjust the left page margin or left whitespace spacing when exporting schedules, calendars, or timeline views to PDF documents by configuring the left margin size in points, controlling page layout, padding, or borders specifically on the left side of the PDF output, and setting precise left offset or indentation values to customize the horizontal positioning and appearance of exported PDF pages.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            margin: {
                left: "1.5cm"
            }
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the right margin in PDF exports for the Kendo UI Scheduler? Adjust or configure the right-side page margin for PDF exports of scheduling content, controlling the printable whitespace on the right edge of the page to refine layout, spacing, and formatting when exporting schedules or calendar views to PDF format; set numeric margin values to customize right margin size in points, pixels, or units for print-ready documents, enabling fine-tuning of page boundaries, edge padding, and printable area to ensure professional page design and fit during PDF generation from schedule data.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            margin: {
                right: "1.5cm"
            }
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the top margin for PDF exports of a Kendo Scheduler? Adjust or configure the top margin size for PDF exports of scheduling or calendar content, controlling the vertical space between the top edge of the page and the schedule elements; set, modify, or fine-tune the page's upper margin in points or numeric values to ensure proper content positioning, spacing, and layout when generating printable PDF versions of timeline or scheduler components.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        pdf: {
            margin: {
                top: "2cm"
            }
        },
        toolbar: ["pdf"]
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".


<div class="meta-api-description">
How can I control the size of PDF exports from a Kendo UI Scheduler? Configure the PDF export page dimensions and control the size of the output document by setting custom paper dimensions, fixed standard sizes like A4 or A3, or specifying precise width and height using points, inches, centimeters, or millimeters. Adjust the layout and scaling when exporting schedules or content to PDF by overriding automatic sizing, selecting from common paper sizes, or entering exact measurements in multiple units, enabling fine-tuned print-ready page setups and precise document formatting tailored to different printing or display requirements in PDF exports.
</div>

#### Example - set custom paper size

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        paperSize: ["20mm", "20mm"]
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.


<div class="meta-api-description">
How to enable server-based file download streaming in Kendo UI Scheduler for browsers lacking local file save capabilities? Set up server-based file download streaming to support browsers lacking local file save capabilities, such as Internet Explorer 9 and earlier or Safari, by configuring a proxy URL that funnels exported files through a backend endpoint. This enables seamless file export handling via server-side forwarding, proxying POST requests containing base64-encoded file data, MIME type, and requested file name, ensuring compatibility across environments where direct client-side downloads are disabled or unsupported. Implementing this proxy mechanism allows control over download delivery, bypassing browser limitations by streaming files through a server, facilitating export functionality, file streaming, and remote download management for various web applications.
</div>

#### Example - set the server proxy URL

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        proxyURL: "/save"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How to display generated PDF in Scheduler using proxyTarget property? Set or configure the destination for displaying PDF documents generated or returned via proxy, enabling control over whether the PDF opens in a new browser tab, an existing iframe, a named window, or a specific target area within a scheduler interface. Manage where and how PDF files load by specifying target names like _blank, custom iframe identifiers, or browser window names to direct inline PDF rendering, ensuring proper display behavior when working with content disposition headers for inline file viewing. Control output destinations, window targets, or embedded frames for proxied PDF content to customize user experience, streamline PDF presentation within scheduled workflows, and handle opening behavior in different browsing contexts.
</div>

#### Example - open the generated document in a new window

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
          forceProxy: true,
          proxyURL: "/save",
          proxyTarget: "_blank"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How do I set the subject metadata for exported Scheduler PDFs? Configure or set the PDF document subject metadata for exported schedules, enabling control over the Subject field embedded in PDF files to improve document identification, metadata searchability, descriptive labeling, and proper indexing in PDF viewers when exporting calendar or scheduler data to PDF format.
</div>

#### Example - set the subject

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        subject: "Events"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How do I customize the title in the exported Kendo UI Scheduler PDF? Control the document title shown in the generated PDF file when exporting schedule or calendar data, allowing you to define, set, customize, or configure the PDF file name, header title, or metadata title for the exported schedule document, ensuring the PDF output reflects the desired naming, labeling, or title string to identify the exported schedule content in the file properties or viewer.
</div>

#### Example - set the title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      pdf: {
        title: "Events"
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### resources `Array`

The configuration of the scheduler resource(s). A scheduler resource is optional metadata that can be associated
with a scheduler event.


<div class="meta-api-description">
How to configure multiple resources in Kendo UI Scheduler? Configure and manage collections of resources linked to scheduled events, enabling assignment, filtering, and grouping by setting up resource definitions with custom data sources, field mappings, labels, and metadata; control how multiple resources integrate with event scheduling, support binding to arrays or data sources, define values and display labels, and organize resources for effective event allocation and grouping within calendar or task management contexts.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2024/6/10"),
        startTime: new Date("2024/6/10 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/meetings", 
                }
            },
            schema: {
                model: {
                    id: "meetingID",
                    fields: {
                        meetingID: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        roomId: { from: "RoomID", nullable: true },
                        attendees: { from: "Attendees", nullable: true },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
        resources: [
            {
                field: "roomId",
                name: "Rooms",
                dataSource: [
                    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                ],
                title: "Room"
            },
            {
                field: "attendees",
                name: "Attendees",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
                ],
                multiple: true,
                title: "Attendees"
            }
        ]
    });
    </script>

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.


<div class="meta-api-description">
How to configure resource-specific color assignment in Kendo UI Scheduler? Configure resource-specific color assignment by specifying the field name in your data source that holds color values for each resource, enabling event colors, resource headers, and indicators to reflect those colors dynamically. Control how resource colors are bound and rendered by setting a custom data field containing color codes or values, allowing consistent and automatic color mapping per resource in scheduling interfaces. Enable dynamic coloring of resources by linking color properties from your data model, supporting use cases like differentiating resource types, matching branding colors, or customizing visual schedules through data-driven color binding. Set or change which data attribute controls resource appearance colors to influence coloring of events, resource labels, and visual indicators in the schedule display, supporting developer needs to customize and theme schedules based on resource metadata.
</div>

#### Example - set the resource data color field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I configure data source for scheduler resources in Kendo UI? Set, configure, or bind the array, object, or kendo.data.DataSource instance that provides resource data items for scheduling, enabling control over resource loading, updating, sharing, and synchronization within calendar or scheduler components; supports defining, supplying, or managing resource collections dynamically or statically, including options for external data sources, custom data structures, or built-in data source instances to enable flexible resource management and integration across scheduling features and UI elements.
</div>

#### Example - set the resource data source

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.dataParentValueField `String` *(default: "parentValue")*

The field of the resource data item which represents the parent resource item value where the current resource should be nested in. Used in hierarchical grouping scenarios where only part of the members of one resource should be grouped within a member of the previous (parent) resource.


<div class="meta-api-description">
How do I configure parent-child relationships in Kendo UI Scheduler resources? Configure hierarchical nesting of resource items by specifying the field that links child resources to their parent resources for grouping, enabling parent-child relationships and partial membership within resource groups. Control how resource data items associate with parent entries by setting the identifier field that defines parent values, allowing nested or multi-level resource hierarchies in scheduling interfaces. Enable grouping of resources based on parent-child mappings using field values that connect sub-resources to their corresponding higher-level resources, supporting complex resource structures and hierarchical organization. Set the key or attribute in resource data that establishes parent relationships to facilitate dynamic grouping and visualization of nested resources in schedules.
</div>

#### Example - set the resource data parentValue field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1,
          attendees: [ 1, 2 ]
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2,
          attendees: [ 3 ]
        }
      ],
      resources: [{
        field: "roomId",
        name: "Rooms",
        dataSource: [
            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
        ],
        title: "Room"
      }, {
        field: "attendees",
        name: "Attendees",
        dataParentValueField: "room",
        dataSource: [
            { text: "Alex", value: 1, room: 1 },
            { text: "Bob", value: 2, room: 1 },
            { text: "Charlie", value: 3, room: 2 }
        ],
        multiple: true,
        title: "Attendees"
      }],
      group: {
          resources: ["Rooms", "Attendees"],
          orientation: "vertical"
      }
    });
    </script>

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.


<div class="meta-api-description">
What is dataTextField in Kendo UI Scheduler for specifying resource display names? Set or customize the data attribute that holds the display name or label for resources within scheduling components, enabling control over which resource property populates text in UI elements like lists, dropdowns, tags, or editors; supports configuration of the specific field key tied to resource titles, captions, or identifiers shown throughout calendar views, resource selectors, or timeline interfaces for effective resource representation and dynamic text rendering in schedules.
</div>

#### Example - set the resource data text field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataTextField: "room",
          dataSource: [
            { room: "Small meeting room", value: 1 },
            { room: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.dataValueField `String` *(default: "value")*

The field of the resource data item which represents the resource value. The resource value is used to link a scheduler event with a resource.


<div class="meta-api-description">
How to link scheduler events with resources using the dataValueField property in Kendo UI for jQuery? Configure or set the field name in your resource data that holds the unique identifier or value used to link and associate resources with scheduler events, enabling seamless mapping, binding, and relationship management between events and their assigned resources within the scheduler data structure.
</div>

#### Example - set the resource data value field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose roomId is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose roomId is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataValueField: "roomId",
          dataSource: [
            { text: "Small meeting room", roomId: 1 },
            { text: "Big meeting room", roomId: 2 }
          ]
        }
      ]
    });
    </script>

### resources.field `String`

The field of the scheduler event which contains the resource id.


<div class="meta-api-description">
How do I configure Kendo UI for jQuery Scheduler to identify resource IDs in event objects? Configure or specify the data field in your event objects that identifies the resource id for assigning, grouping, filtering, or rendering events by resource in scheduling applications. Enable mapping between events and resources by setting the event property name that holds resource identifiers, supporting queries like how to link events to rooms, users, assets, or other resources. Control resource association for calendar entries, event grouping, resource-based filters, or multi-resource scheduling by defining the field that connects event data to resource records for proper visualization and management.
</div>

#### Example - specify the resource field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.multiple `Boolean` *(default: false)*

If set to `true` the scheduler event can be assigned multiple instances of the resource. The scheduler event field specified via the [field](/api/javascript/ui/scheduler#configuration-resources.field) option will contain an array of resources.
By default only one resource instance can be assigned to an event.


<div class="meta-api-description">
How to assign multiple resources to a single event in Kendo UI Scheduler? Enable assigning multiple resources to a single event, configure events to support multiple resource instances, set up events with several associated resources, control event assignments with arrays of resources rather than single entries, allow scheduling multiple attendees or assets for one event, manage event-resource relations with multiple selections, support assigning clusters of resources or participants to one calendar entry, handle diverse resource allocation per event, implement multi-resource event assignment for complex scheduling scenarios, and configure event fields to store several linked resources simultaneously.
</div>

#### Example - multiple resources

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1,
          atendees: [2, 3] // the resource instances with value 2 and 3 (Bob and Charlie)
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2,
          atendees: [1, 2] // the resource instances with value 1 and 2 (Alex and Bob)
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        },
        {
          field: "atendees",
          multiple: true,
          dataSource: [
            { text: "Alex", value: 1 },
            { text: "Bob", value: 2 },
            { text: "Charlie", value: 3 }
          ]
        }
      ]
    });
    </script>

### resources.name `String`

The name of the resource used to distinguish resource. If not set the value of the [field](/api/javascript/ui/scheduler#configuration-resources.field) option is used.


<div class="meta-api-description">
How do I set the name of a resource in the Kendo UI Scheduler? Set or configure the identifier used to label and distinguish individual resources within scheduling systems, enabling referencing, grouping, templating, and data mapping by resource name or logical key, with fallback to default field values when no explicit name is provided, supporting resource management, lookup, and differentiation in schedules and calendar integrations.
</div>

#### Example - set the resource title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          title: "Room",
          name: "Room",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>


### resources.title `String`

The user friendly title of the resource displayed in the scheduler edit form. If not set the value of the [field](/api/javascript/ui/scheduler#configuration-resources.field) option is used.


<div class="meta-api-description">
How to customize resource title in Kendo UI Scheduler? Customize, configure, or set the label, name, or title shown for a resource during event editing in a scheduling interface, controlling how resource identifiers appear in scheduler forms, whether to override default field values, adjust user-friendly display names for resources, modify or personalize resource captions when editing events, and enable descriptive titles that enhance clarity and usability in calendar or timeline scheduling components.
</div>

#### Example - set the resource title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          title: "Room",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.valuePrimitive `Boolean` *(default: true)*

Set to `false` if the scheduler event field specified via the [field](/api/javascript/ui/scheduler#configuration-resources.field) option contains a resource data item.
By default the scheduler expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via `dataValueField`).


<div class="meta-api-description">
How to configure Kendo UI Scheduler to use primitive values for resource assignments instead of full objects? Control whether scheduling event resource assignments use simple primitive values like IDs or full resource objects by configuring the binding format; enable or disable primitive value usage to switch between referencing resources by basic identifiers such as strings or numbers versus using comprehensive resource data including all associated fields, allowing flexible resource linkage and event association in scheduling systems according to use cases requiring either lightweight ID binding or richer object-based resource representation.
</div>

#### Example - set valuePrimitive to false

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          room: { value: 1 } // the resource field is an object instead of a primitive value
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          room: { value: 2 } // the resource field is an object instead of a primitive value
        }
      ],
      resources: [
        {
          field: "room",
          valuePrimitive: false,
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### selectable `Boolean` *(default: false)*

If set to true the user would be able to select scheduler cells and events. By default selection is disabled.


<div class="meta-api-description">
How do I disable user selection of time slots in Kendo UI Scheduler? Control the ability to enable or disable user selection of time slots, calendar cells, or scheduled events within a scheduling interface, allowing users to highlight, click, or interact with specific time blocks or appointments; configure selection capabilities during setup to allow for event or timeslot highlighting, user-driven selection, event interaction, or disabling selection to prevent changes or clicks on calendar entries.
</div>

#### Example - enable selection

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      selectable: true,
      views: ["day", "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### showWorkHours `Boolean` *(default: false)*

If set to true the view will be initially shown in business hours mode. By default view is displayed in full day mode.

> The `showWorkHours` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How to show only work hours in Kendo UI Scheduler by default? Control whether the calendar or scheduler initially displays only business hours or the full day, configuring the default visible time range to focus on work hours during daily or weekly views. Enable or disable the setting to show office hours, standard working intervals, or core business time upon loading the scheduler, helping to prioritize work time blocks instead of all 24 hours. This setting influences how the schedule opens, allowing customization of the initial time view to highlight typical work periods for better planning, filtering, or appointment management within day-based or week-based views. Adjusting this option helps optimize user experience by emphasizing core working times versus a full-day timeline at startup.
</div>

#### Example - enable selection

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      showWorkHours: true,
      views: ["day", "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

To dynamically update the `showWorkHours` or any other option yo ucan use the [`setOptions`](/api/javascript/ui/widget/methods/setoptions) method.

### snap `Boolean` *(default: true)*

If set to `true` the scheduler will snap events to the nearest slot during dragging (resizing or moving). Set it to `false` to allow free moving and resizing of events.


<div class="meta-api-description">
How do I enable automatic event snapping in Kendo UI Scheduler? Control event alignment during drag-and-drop or resizing by enabling or disabling automatic snapping to the closest time slot in a scheduling interface, allowing precise locking of events to predefined intervals or offering freeform positioning and resizing without constraints; configure drag behavior to either constrain movements to set time slots or allow flexible event placement and adjustment without snapping limitations.
</div>

#### Example - allow free event resizing and moving

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      snap: false,
      views: ["day", "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### startTime `Date`

The start time of the week and day views. The scheduler will display events starting after the `startTime`.


<div class="meta-api-description">
How do I configure the initial visible time in a Kendo UI Scheduler? Set or configure the initial visible time or starting hour for calendar views to control which hours appear in daily and weekly schedules, determine the time range shown, customize when events become visible, filter out events that start before a defined hour, and adjust the calendar's default earliest hour displayed to focus on working hours or specific time intervals in schedule planning or event tracking applications.
</div>

#### Example - set the start time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      startTime: new Date("2013/6/6 08:00"),
      endTime: new Date("2013/6/6 18:00"),
      views: ["day", "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### timezone `String`

The timezone which the scheduler will use to display the scheduler appointment dates. By default the current system timezone is used. This is an acceptable default when the
scheduler widget is bound to local array of events. It is advisable to specify a timezone if the scheduler is bound to a remote service.
That way all users would see the same dates and times no matter their configured system timezone.

The complete list of the supported timezones is available in the [List of IANA time zones](https://en.wikipedia.org/wiki/List_of_IANA_time_zones) Wikipedia page.

> The **kendo.timezones.min.js** file must be included in order to use timezones other than "Etc/UTC".

> The **timezone** option will not affect events if the widget's data source is initialized separately. In this case set the [schema.timezone](/api/javascript/data/schedulerdatasource/configuration/schema#schematimezone) option directly.


<div class="meta-api-description">
How do I configure Kendo UI Scheduler to display appointment dates and times in a specific timezone? Control and configure the timezone setting used for displaying appointment dates and times in scheduling interfaces, enabling consistent start and end time presentation across multiple clients and user devices regardless of their local system timezone. Adjust or set specific timezones to ensure uniform event timing when syncing with remote or centralized data sources, overriding default local system zones to handle global scheduling scenarios, event displays, calendar synchronization, or cross-timezone appointment management. Support for a broad range of IANA timezones allows precise timezone selection for event rendering, time conversions, and schedule alignment; it is essential for managing time-sensitive data, preventing discrepancies in event timing, and supporting multi-region users. Include timezone data files when working outside UTC to enable full timezone functionality in event timelines and control how appointments adapt dynamically or statically to user or server timezone contexts. This setting relates also to data mapping and conversion strata when importing or initializing schedule data from various sources with independent timezone definitions.
</div>

#### Example - set the timezone

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/tasks"
                },
                update: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/update",
                    type: "POST",
                    contentType: "application/json"
                },
                create: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/create",
                    type: "POST",
                    contentType: "application/json"
                },
                destroy: {
                    url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                    type: "POST",
                    contentType: "application/json"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return kendo.stringify(options.models);
                    }
                }
            },
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        ownerId: { from: "OwnerID", defaultValue: 1 },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        }
    });
    </script>

### toolbar `Array|Object`

When Array of commands is passed, it accepts the "pdf" and "search" commands that the scheduler will display alongside its built-in ToolBar tools. The "pdf" and "search" tools will be rendered in a fixed place within the ToolBar that cannot be changed.

The "pdf" command exports the scheduler in PDF format. The "search" option allows searching through Scheduler events titles.


<div class="meta-api-description">
How to customize the toolbar in Kendo UI Scheduler to include export to PDF functionality? Control and customize the Scheduler interface by enabling export options like generating PDFs of the schedule and activating search functionality to quickly find events by title within the calendar view, integrate commands that add export to PDF capabilities and in-app search bars for filtering or locating specific event entries, configure toolbar features to include document exporting and keyword search tools that work alongside existing scheduling controls, set up commands that allow users to save schedules as PDF files and perform text searches across event names, optimize schedule management by incorporating built-in toolbar buttons for exporting content to PDF formats and searching event lists for keywords or phrases, enhance scheduling interfaces with fixed-position controls for exporting appointments as PDF documents and running search queries on scheduled events, leverage toolbar commands to add PDF export functions and event title search capabilities directly in the scheduling environment for better navigation and data extraction, enable quick retrieval of events by name and printable schedule exports with toolbar options designed to support exporting and search functionalities on the Scheduler’s user interface.
</div>

#### Example - specify the toolbar commands as array of strings

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf", "search"],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - specify the toolbar commands as array of objects

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: [ { name: "pdf" } ],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

When an object having an `items` field is used, that will entirely replace all tools in the Scheduler ToolBar (including the default ones). Hence, the developer will need to declare them manually in order make them appear in the component. The default order of the Scheduler tools is: `[ "pdf", [ "today", "previous", "next" ], "current", { type: "spacer" }, "search", "views" ]`. Note that if more than one view is defined, the last default tool is `views`, otherwise `views` is substituted by the `refresh` tool. Tools grouped in an array would produce a ButtonGroup in the ToolBar. Note that the `pdfMobile` and `search` tools should be explicitly enabled in order to be visible.

By using the `items` field, you can specify any kind and number of custom tools that will be rendered in the ToolBar. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).

#### Example - specify the toolbar items

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: {
        items: [
          ["previous", "next"],
          {
            name: "custom",
            type: "button",
            text: "Custom Button"
          },
          { type: "spacer" },
          "search",
          "views"
        ]
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.items `Array|Object`

When the `items` field receives an array, it will entirely replace all tools in the Scheduler ToolBar (including the default once). Hence, the developer will need to declare them manually in order make them appear in the component. The default order of the Scheduler tools is: `[ "pdf", [ "today", "previous", "next" ], "current", { type: "spacer" }, "search", "views" ]`. Note that if more than one view is defined, the last default tool is `views`, otherwise `views` is substituted by the `refresh` tool. Tools grouped in an array would produce a ButtonGroup in the ToolBar. Note that the `pdfMobile` and `search` tools should be explicitly enabled in order to be visible.

By using the `items` field, you can specify any kind and number of custom tools that will be rendered in the ToolBar. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).


<div class="meta-api-description">
How do I customize the toolbar in Kendo UI Scheduler? Control, configure, and customize the set and sequence of toolbar buttons, tools, or actions displayed in a scheduler or calendar interface by specifying an array of elements that replaces default controls; manage visibility, order, grouping as button groups, and inclusion of features like PDF export, navigation controls (today, previous, next), current date display, spacers, search bars, multiple view selectors, and refresh buttons, with the ability to enable or disable tools such as search and mobile PDF export explicitly and to add custom or third-party tools through toolbar items definitions or APIs for tailored scheduling interfaces.
</div>

#### Example - pass an array to the items field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: {
        items: [
          ["previous", "next"],
          {
            name: "custom",
            type: "button",
            text: "Custom Button"
          },
          { type: "spacer" },
          "search",
          "views"
        ]
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - pass an object to the items field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      mobile: true,
      toolbar: {
        items: {
          desktop: [["previous", "next"], "current", "pdf", { type: "spacer" }, "search", "views"],
          mobile: {
            main: ["pdfMobile", { type: "spacer" }, "search", "viewsMobile"],
            navigation: ["previousMobile", { type: "spacer" }, "currentMobile", { type: "spacer" }, "nextMobile"]
          }
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.items.desktop `Array`

Will specify all tools rendered in the Scheduler ToolBar with its non-adaptive rendering. If not explicitly set here, the component will render its built-in tools in the following order: `[ "pdf", [ "today", "previous", "next" ], "current", { type: "spacer" }, "search", "views" ]`. Note that if more than one view is defined, the last default tool is `views`, otherwise `views` is substituted by the `refresh` tool. Tools grouped in an array would produce a ButtonGroup in the ToolBar. Note that the `pdf` and `search` tools should be explicitly enabled in order to be visible.

By using the `items.desktop` field, you can specify any kind and number of custom tools that will be rendered in the ToolBar. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).


<div class="meta-api-description">
How to customize the toolbar in a non-adaptive Kendo Scheduler? Control and customize the set, sequence, and grouping of toolbar buttons and tools shown in the desktop (non-adaptive) scheduler interface, including enabling or disabling built-in features like PDF export, search, navigation controls (today, previous, next), current date display, view selectors, refresh actions, and custom tool components defined through a toolbar item API; configure button groups, specify tool order, enable or disable default or additional scheduler controls, and tailor the desktop toolbar layout for optimized user interaction and functionality within the scheduling application.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: {
        items: {
          desktop: [
            ["previous", "next"],
            {
              name: "custom",
              type: "button",
              text: "Custom Button"
            },
            { type: "spacer" },
            "search",
            "views"
          ]
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.items.mobile `Object`

Will specify all tools rendered in the Scheduler ToolBar with its adaptive rendering. By default, there are two ToolBars rendered in the Scheduler in that mode:

- `main` (or upper) ToolBar contains the following built-in tools: `[ [ "pdfMobile", "calendar", "create" ], { type: "spacer" }, "search", "viewsMobile" ]`. Note that if more than one view is defined, the last default tool is `viewsMobile`, otherwise `viewsMobile` is substituted by the `refresh` tool. Tools grouped in an array would produce a ButtonGroup in the ToolBar. Note that the `pdfMobile` and `search` tools should be explicitly enabled in order to be visible;
- `navigation` (or lower) ToolBar contains the following built-in tools: `[ "previousMobile", { type: "spacer" }, "currentMobile", { type: "spacer" }, "nextMobile" ]`;

By using the `items.mobile` field, you can specify any kind and number of custom tools for the above two ToolBars. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).


<div class="meta-api-description">
How do I customize the mobile toolbar in Kendo UI Scheduler? Control and customize the visible tools and buttons in mobile toolbar layouts of scheduling interfaces by configuring which mobile-specific actions appear in top and bottom toolbars, including buttons for PDF export, calendar display, event creation, search functionality, view switching, refresh, and navigation controls like previous, current date, and next. Adjust the adaptive toolbar arrangement by setting mobile toolbar items, enable or disable built-in features such as PDF export and search with explicit activation, group multiple tools into button groups, and supply custom tools using flexible toolbar item definitions to tailor the mobile scheduling UI navigation and interaction experience across varying view configurations or user preferences.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      mobile: "phone",
      toolbar: {
        items: {
          mobile: {
              main: [
                "pdfMobile",
                {
                  name: "custom",
                  type: "button",
                  text: "Custom Button"
                },
                { type: "spacer" },
                "search",
                "viewsMobile"
              ],
              navigation: [
                "previousMobile",
                { type: "spacer" },
                {
                  name: "custom2",
                  type: "button",
                  text: "Custom 2"
                },
                { type: "spacer" },
                "nextMobile"
              ]
          }
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.items.mobile.main `Object`

Will specify all tools rendered in the main (upper) Scheduler ToolBar with its adaptive rendering. If not explicitly set here, the component will render its built-in tools in the following order: `[ [ "pdfMobile", "calendar", "create" ], { type: "spacer" }, "search", "viewsMobile" ]`. Note that if more than one view is defined, the last default tool is `viewsMobile`, otherwise `viewsMobile` is substituted by the `refresh` tool. Tools grouped in an array would produce a ButtonGroup in the ToolBar. Note that the `pdfMobile` and `search` tools should be explicitly enabled in order to be visible.

By using the `items.mobile.main` field, you can specify any kind and number of custom tools for that ToolBar. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).


<div class="meta-api-description">
How to customize main toolbar items in Kendo UI Scheduler for mobile devices? Control and customize which tools and buttons display in the top mobile toolbar of a scheduling interface, enabling configuration of built-in or custom tools, setting the order and grouping of actions like PDF export, calendar access, event creation, search functionality, view switching, and refresh controls. Manage adaptive rendering on mobile devices by specifying any combination or number of toolbar items, including enabling or disabling default features such as search and PDF export, creating grouped button sets, and replacing view selectors based on the availability of multiple calendar views. This allows tailoring of the main toolbar's interactive elements, their visibility, grouping, layout, and behavior across mobile contexts to optimize user interface controls, quick actions, and navigation options in scheduler applications.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      mobile: "phone",
      toolbar: {
        items: {
          mobile: {
              main: [
                "pdfMobile",
                {
                  name: "custom",
                  type: "button",
                  text: "Custom Button"
                },
                { type: "spacer" },
                "search",
                "viewsMobile"
              ],
              navigation: [ ]
          }
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.items.mobile.navigation `Object`

Will specify all tools rendered in the navigation (lower) Scheduler ToolBar with its adaptive rendering. If not explicitly set here, the component will render its built-in tools in the following order: `[ "previousMobile", { type: "spacer" }, "currentMobile", { type: "spacer" }, "nextMobile" ]`.

By using the `items.mobile.navigation` field, you can specify any kind and number of custom tools for that ToolBar. You should define the custom tools via the [ToolBar items API](/api/javascript/ui/toolbar/configuration/items).


<div class="meta-api-description">
How do I customize the navigation buttons in the mobile Scheduler toolbar? Control, customize, configure, or set which navigation buttons, controls, or tools appear in the mobile version of the scheduler’s lower toolbar, including adding, removing, or reordering default or custom navigation elements for adaptive layouts; manage the composition and sequence of mobile toolbar items to tailor user navigation experience, such as previous, current, and next view controls, by defining or adjusting toolbar components in mobile scheduling interfaces.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      mobile: "phone",
      toolbar: {
        items: {
          mobile: {
              main: [ ],
              navigation: [
                "previousMobile",
                { type: "spacer" },
                {
                  name: "custom2",
                  type: "button",
                  text: "Custom 2"
                },
                { type: "spacer" },
                "nextMobile"
              ]
          }
        }
      },
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### toolbar.name `String`

The name of the command.


<div class="meta-api-description">
How do I set unique identifiers for toolbar commands in Kendo UI Scheduler? Assign, configure, or reference a unique identifier for toolbar commands in scheduling interfaces to enable precise control, event handling, and customization of both built-in and custom buttons; set command names for detecting clicks, managing toolbar behavior, linking actions to specific controls, and integrating with event listeners through consistent command naming during initialization or runtime to streamline toolbar command identification and interaction workflows.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        toolbar: [
            { name: "pdf" },
            { name: "today" }
        ]
    });
    </script>

### views `Array`

The views displayed by the scheduler and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
By default the Kendo UI Scheduler widget displays "day" and "week" view.


<div class="meta-api-description">
How can I customize the calendar views in Kendo UI Scheduler? Set, modify, or customize calendar display modes by specifying which views to show in the scheduler, such as day, week, month, timeline, or custom views, including adding or removing specific calendar perspectives and adjusting how each view functions or appears; this flexible configuration supports initialization with view types as strings for default layouts or detailed object configurations for tailored behavior, enabling control over visible calendar intervals, switching between time scopes, and personalizing presentation modes to fit scheduling, timeline visualization, or event management needs.
</div>

#### Example - set views as array of strings

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ], // day and month views
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

#### Example - set views as array of objects

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "day" },
        { type: "month" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

### views.adaptiveSlotHeight `Boolean` *(default: false)*

Increases the slot height when containing events up to views.eventsPerDay and reduces its height if there are less events for that specific day.

> The `adaptiveSlotHeight` option is supported when `views.type` is set to "month".
> The `adaptiveSlotHeight` option is not supported in resource grouping or date grouping scenarios.


<div class="meta-api-description">
How do I control the height of time slots in a Kendo UI Scheduler's month view? Control and customize the height of daily time slots in a calendar's month view to dynamically expand or shrink based on the number of events scheduled per day, optimizing space usage for multiple appointments or meetings. Configure the slot height to adapt automatically when days contain varying event counts, enhancing visibility and usability for heavy or sparse schedules. This functionality is intended for month-style calendar views without resource or date groupings, focusing on responsive vertical sizing to fit multiple events cleanly within each day's cell. Adjust, enable, or set per-day slot height behavior to improve event display density, layout flexibility, and readability in calendar month views featuring multiple daily entries.
</div>

#### Example - set the adaptive slot height in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          eventsPerDay: 4,
          adaptiveSlotHeight: true
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview1"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview2"
        },
        {
          id: 3,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview3"
        },
        {
          id: 4,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview4"
        }
      ],
      height: 1000
    });
    </script>

### views.allDayEventTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the "all day" scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

> The `allDayEventTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How to customize all-day event display in Kendo UI Scheduler? Control and customize the rendering, layout, and styling of all-day calendar events by defining templates that adjust how titles, descriptions, start and end dates, associated resources, icons, classes, and conditional content appear in daily or weekly views. Enable custom formatting, dynamically change event displays, inject markup or design elements, and tailor how full-day appointments are presented with flexible template-driven configurations for event details, resource assignments, event timing, and visual enhancements in scheduling interfaces.
</div>

#### Example - set the all day event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          allDayEventTemplate: $("#event-template").html()
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          isAllDay: true,
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### views.allDaySlot `Boolean` *(default: true)*

If set to `true` the scheduler will display a slot for "all day" events.

> The `allDaySlot` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How to enable an all-day area in the Kendo UI Scheduler for jQuery? Control whether the calendar shows a separate section for all-day events, enabling or disabling a distinct space to display full-day or multi-day appointments apart from hourly or timed events within day or week views, allowing developers to configure an all-day area, toggle the presence of all-day slots, and manage how events that span entire days are visually organized and separated from scheduled timed entries.
</div>

#### Example - hide the all day slot

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          allDaySlot: false
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.allDaySlotTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the all day slot cell.

The fields which can be used in the template are:

* date - represents the slot date.

* resources() - returns the relevant resources for the current slot.

> The `allDaySlotTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day", "week" or "workWeek".


<div class="meta-api-description">
How do I customize the appearance of all-day time slots in a Kendo UI Scheduler view? Customize the rendering and appearance of all-day slot cells in daily, weekly, or workweek scheduler views by defining templates that control the HTML markup and layout. Enable flexible formatting for all-day time slots by setting templates that incorporate slot dates, resource assignments, and contextual data, allowing the scheduler to display tailored content, multiple resources, or custom visual elements within the all-day row. Configure, modify, or override how the all-day section is presented in calendar views to match specific user interface requirements, scheduling semantics, or resource grouping scenarios across day, week, and workweek layouts.
</div>

#### Example - set the date header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          allDaySlotTemplate: kendo.template("<strong>#=kendo.toString(date)#</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - modify the all day slot based on resources

    <div id="scheduler"></div>
    <script id="allDaySlotTemplate" type="text/x-kendo-template">
        # var resources = data.resources(); #
        # var color = resources.roomId === 1 ? "red" : "blue"; #

        <span style="background: #=color#">
          #=kendo.toString(date, "d")#
        </span>
    </script>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [{
        type: "day",
        allDaySlotTemplate: kendo.template($("#allDaySlotTemplate").html())
      }],
      group: {
        resources: ["Rooms"]
      },
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataSource: [
            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
          ],
          title: "Room"
        }
      ]
    })
    </script>

### views.columnWidth `Number` *(default: 100)*

The width of the table columns in timeline views. Value is treated as pixels.

> The `columnWidth` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "timeline", "timelineWeek", "timelineWorkWeek" or "timelineMonth".


<div class="meta-api-description">
How do I set the width of timeline columns in a Kendo Scheduler view? Set or configure the width, size, or pixel length of timeline columns in scheduling views to customize the table layout, control cell spacing, and adjust the horizontal dimension of timeline grids for week, work week, month, or generic timeline types; use this to modify the appearance, fit content better, or standardize column widths in timeline-based calendar or scheduling interfaces.
</div>

#### Example - set the columnWidth in timelineWeek view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "timelineWeek",
          columnWidth: 50
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.dateHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the date header cells.

By default the scheduler renders the date using a custom date format - "ddd M/dd".
The "ddd" specifier, a.k.a abbreviated name of the week day, will be localized using the current Kendo UI culture.
If the developer wants to control the day and month order then one needs to define a custom template.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `dateHeaderTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day", "week", "workweek" and "timeline" views.


<div class="meta-api-description">
How can I customize the date header in Kendo UI Scheduler to display dates in a specific format? Customize and control the formatting and display of date header cells in calendar or scheduler components by defining templates that specify how dates, weekdays, and months appear, enabling localization and rearrangement of day and month order, supporting various view types like day, week, workweek, and timeline. Configure or set customized date header rendering with flexible template options that use date fields for precise control over major tick dates, supporting developer needs for tailored date presentations, date format adjustments, localized abbreviated weekday names, and custom header layouts in time-based scheduling views. Adjust the appearance of date headers by enabling template-driven customization, allowing formatting synonyms such as date string patterns, localized day names, and rearranged date components to fit diverse locale and UI requirements, useful for calendar, scheduling, and timeline interfaces.
</div>

#### Example - set the date header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.dayTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the day slots in month view.

The fields which can be used in the template are:

* date `Date` - represents the current day

* resources() - returns the relevant resources for the current slot.

> The `dayTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "month".


<div class="meta-api-description">
How can I customize the HTML for individual day cells in a Kendo UI Scheduler's monthly calendar? Customize or override the HTML rendering of individual day cells in a monthly calendar or scheduler by defining your own template that dynamically controls the content and structure for each day slot using data such as the current date and associated resources. Enable or configure custom markup, content generation, or styling for daily grid cells within a month view calendar, allowing for flexible display of dates, resource information, or contextual details per day. This is useful for developers seeking to create personalized day layouts, custom data overlays, or tailored visual representations of each date in a monthly scheduling component.
</div>

#### Example - set the day template in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          dayTemplate: kendo.template("<strong>#= kendo.toString(date, 'ddd') #</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - modify the day slot based on resources

    <div id="scheduler"></div>
    <script id="dayTemplate" type="text/x-kendo-template">
        # var resources = data.resources(); #
        # var color = resources.roomId === 1 ? "red" : "blue"; #

        <span style="height:100%;color:black;background-color:#:color#">
          #=kendo.toString(date, "d")#
        </span>
    </script>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [{
        type: "month",
        dayTemplate: kendo.template($("#dayTemplate").html())
      }],
      group: {
        resources: ["Rooms"]
      },
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataSource: [
            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
          ],
          title: "Room"
        }
      ]
    });
    </script>

### views.editable `Boolean|Object` *(default: true)*

If set to `true` the user would be able to create new scheduler events and modify or delete existing ones.

Overrides the [editable](/api/javascript/ui/scheduler#configuration-editable) option of the scheduler.


<div class="meta-api-description">
How to enable editing of specific events in Kendo UI Scheduler views? Control the ability to create, modify, update, or delete events individually for each calendar or timeline view in a scheduler, enabling per-view configuration of event editing capabilities that override global settings and allow users to customize editing permissions like enabling or disabling event changes, adjustments, interactive drag-and-drop modifications, new event creation, and removal within specific views or contexts.
</div>

#### Example - disable view editing

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: false
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.create `Boolean` *(default: true)*

If set to `true` the user can create new events. Creating is enabled by default.


<div class="meta-api-description">
How to enable event creation in Kendo UI Scheduler? Control whether users can create new events in the calendar or scheduler interface, enabling or disabling event creation actions such as double-clicking, drag selection, or interactive input. Configure the ability to add or initiate new entries within views by toggling event creation permissions on or off. Set whether event creation is allowed for users during scheduling workflows, managing interactive editing capabilities and controlling user input for generating new appointments or tasks. Manage event creation access by enabling or disabling the functionality to add new events dynamically within the scheduler environment.
</div>

#### Example - disable event creating

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            create: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.


<div class="meta-api-description">
How to control event deletion permissions on individual calendar views in Kendo UI Scheduler? Control event deletion permissions on individual calendar views by enabling or disabling the option for users to remove events directly within that view. Configure whether the delete or destroy button is visible and functional per view, allowing users to click and delete events when allowed. Toggle event removal capabilities per view to manage user interactions for deleting scheduled items, enabling or restricting deletion actions depending on specific view settings. Adjust and control user privileges to delete or destroy events in particular Scheduler views, supporting granular management of event lifecycle and interface controls related to event removal.
</div>

#### Example - disable event deleting

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            destroy: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.update `Boolean` *(default: true)*

If set to `true` the user can update events. Updating is enabled by default.


<div class="meta-api-description">
How can I allow users to edit existing events in a Kendo UI Scheduler? Control the ability to modify or update existing calendar entries, events, or tasks within a scheduling interface, enabling or disabling user interactions for editing event details, adjusting appointment times, or changing event information directly through the scheduler UI; configure permissions for event updates to allow full event edits or to lock events from being altered, supporting use cases where event modification is required or needs to be restricted to maintain data integrity or enforce read-only scheduling environments.
</div>

#### Example - disable event updating

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            update: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.endTime `Date`

The end time of the view. The scheduler will display events ending before the `endTime`.


<div class="meta-api-description">
How to set the end time boundary for a Kendo UI Scheduler view? Set or adjust the ending time boundary for a calendar or scheduling view to control which events appear, limit visible hours, configure the latest time slot shown, restrict event display based on finish times, manage calendar view cutoff times, define the endpoint for event rendering, customize the scheduler’s visible timeframe, control day or week view end limits, and specify when the schedule stops showing ongoing or ending appointments.
</div>

#### Example - set the end time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          startTime: new Date("2013/6/6 08:00"),
          endTime: new Date("2013/6/6 18:00")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.eventDateTemplate

The [template](/api/javascript/kendo/methods/template) used by the agenda view to render the date of the scheduler events.

The fields which can be used in the template are:

* date `Date` - represents the event date.

> The `eventDateTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "agenda".


<div class="meta-api-description">
How to customize event date display in Kendo UI Scheduler's agenda view? Control and customize the display format, styling, and markup of event dates in the agenda view of a scheduling interface by defining templates that dictate how dates appear for each event. Enable configuration of date rendering using flexible template options, including formatting, layout, and dynamic insertion of date values, to tailor the visual presentation of event timing in agenda-style views. Adjust, set, or override the default date display for scheduled events, apply custom date templates during scheduler setup or initialization, and specify how individual event dates are shown to improve clarity, localization, or branding across all agenda events. This applies to scenarios where event date formatting, templating, agenda view date customization, or scheduler event date control are needed.
</div>

#### Example - set the event date template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "agenda",
          eventDateTemplate: kendo.template("<strong>#= kendo.toString(date, 'dd-MM-yyyy')#</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.eventHeight `String|Number` *(default: 25)*

The height of the scheduler event rendered in month and timeline views. In month view it could be set to a concrete number or to the string value "auto". When set to "auto" it will automatically set the views.adaptiveSlotHeight property to true.

> The `eventHeight` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "month", "timeline", "timelineWeek", "timelineWorkWeek" or "timelineMonth". The "auto" value is supported when views.type is set to "month" and it sets the views.adaptiveSlotHeight to true.
> The `eventHeight` option is not supported in resource grouping or date grouping scenarios.


<div class="meta-api-description">
How do I adjust the height of calendar events in Kendo UI Scheduler views? Adjust or configure the vertical height of calendar events in monthly and timeline views by setting a numeric pixel value or enabling automatic sizing, where auto mode dynamically adapts the event block height based on content, particularly useful in month view layouts; this control applies to different timeline variations such as week, work week, and month, helping customize the visual spacing and compactness of events in scheduler interfaces while noting that it is not applicable when using resource grouping or date grouping features.
</div>

#### Example - set the event height in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          eventHeight: 40
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      height: 1000
    });
    </script>

### views.eventSpacing `Number` *(default: 3)*

Specifies the distance between individual events.

> The`eventSpacing option is supported when `views.type` is set to "month".


<div class="meta-api-description">
How can I adjust the spacing between events in a Kendo UI Scheduler's month view? Adjust or configure the gap, padding, or distance between calendar events in a month view schedule to enhance clarity, prevent event overlap or crowding, customize spacing for better visual separation, control event layout density, set minimum intervals between events in monthly calendar grids, and optimize the display of concurrent or adjacent appointments in scheduling interfaces when using month-based views.
</div>

#### Example - set the event spacing in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          eventsPerDay: 4,
          eventSpacing: 4
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview1"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview2"
        },
        {
          id: 3,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview3"
        },
        {
          id: 4,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview4"
        }
      ],
      height: 1000
    });
    </script>

### views.eventsPerDay `Number` *(default: 2)*

Indicates how many events could be listed for a day. When there are more events for a specific day a "more" link will be placed at the bottom of the day slot and will navigate to the day view if clicked.

> The `eventsPerDay` option is supported when `views.type` is set to "month". If it is set to 0 it is internally set to 1.


<div class="meta-api-description">
How to set maximum visible events per day in Kendo UI Scheduler views? Control or configure the maximum number of visible events displayed for each day in a monthly calendar or scheduler view, setting limits on how many entries appear before showing a "more" indicator link that users can click to see additional events in a detailed daily layout. Enable, adjust, or cap daily event listings in month mode to manage calendar clutter, overflow handling, event preview truncation, and navigation from summarized day slots to full day views. Use this to set event display thresholds per day, limit or hide excess calendar items, and improve usability in monthly overviews by controlling event counts and activating "more" overflow behavior.
</div>

#### Example - set the events per day in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          eventsPerDay: 4
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview1"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview2"
        },
        {
          id: 3,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview3"
        },
        {
          id: 4,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview4"
        }
      ],
      height: 1000
    });
    </script>

### views.eventTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used by the view to render the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title


<div class="meta-api-description">
How to customize event layout in Kendo UI Scheduler? Control and customize the appearance and layout of calendar events by defining a flexible event rendering template that enables formatting and displaying details like event title, start and end times, descriptions, associated resources, and other event metadata; configure custom event layouts, bind data fields such as title, description, start and end dates, and linked resources to tailor event presentation in scheduling views, allowing precise control over how events are visually represented, styled, and structured within calendars, planners, or appointment views.
</div>

#### Example - set the event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          eventTemplate: $("#event-template").html()
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### views.eventTimeTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used by the agenda view to render the time of the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* isAllDay `Boolean` - if true the event is "all day"
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

> The `eventTimeTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "agenda".


<div class="meta-api-description">
How can I customize the display format of event times in a Kendo UI Scheduler agenda view? Control and customize the display format of event start and end times in agenda-style calendar views by defining flexible templates that can include event properties such as title, description, start and end dates, all-day status, and associated resources, enabling developers to configure how time information appears during scheduling, render tailored time text for events with various durations and resource assignments, and adjust formatting to meet specific visual or informational requirements within agenda layouts.
</div>

#### Example - set the event time template

    <script id="event-time-template" type="text/x-kendo-template">
      # if (isAllDay) { #
        All day
      # } else { #
        #= kendo.toString(start, "t") # - #= kendo.toString(end, "t") #
      # }  #
    </script>

    <div id="scheduler"></div>

    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [
          {
            type: "agenda",
            eventTimeTemplate: $("#event-time-template").html(),
          }
        ],
        dataSource: [
          {
            isAllDay:true,
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          },
          {
            isAllDay:false,
            id: 2,
            start: new Date("2013/6/6 09:00 AM"),
            end: new Date("2013/6/6 10:00 AM"),
            title: "Workshop"
          }
        ]
      });
    </script>

### views.group `Object`

The configuration of the view resource(s) grouping.


<div class="meta-api-description">
How to group resources by multiple attributes in Kendo UI for jQuery Scheduler views? Configure and control how resources are grouped, segmented, or categorized within scheduling views, enabling grouping by one or multiple resource attributes, adjusting layout arrangements for resource groups, managing resource grouping behavior across different views, setting up multidimensional resource groupings, customizing grouping criteria for rendering schedules, organizing appointments by resource fields, enabling or disabling grouping of resources in calendar or timeline views, and tailoring resource divisions to enhance schedule clarity and visualization in various scenarios.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2024/6/10"),
        startTime: new Date("2024/6/10 07:00 AM"),
        height: 600,
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/meetings", 
                }
            },
            schema: {
                model: {
                    id: "meetingID",
                    fields: {
                        meetingID: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        roomId: { from: "RoomID", nullable: true },
                        attendees: { from: "Attendees", nullable: true },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
        views: [
            {
                type: "workWeek",
                selected: true,
                group: {
                    resources: ["Rooms", "Attendees"],
                    orientation: "horizontal"
                }
            }
        ],
        resources: [
            {
                field: "roomId",
                name: "Rooms",
                dataSource: [
                    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                ],
                title: "Room"
            },
            {
                field: "attendees", 
                name: "Attendees",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" }
                ],
                multiple: true,
                title: "Attendees"
            }
        ]
    });
    </script>

### views.group.date `Boolean` *(default: false)*

If set to `true` and the [group.resources](/api/javascript/ui/scheduler#configuration-group.resources) has some resources set the view is grouped by date.

Overrides the [date](/api/javascript/ui/scheduler#configuration-group.date) option of the scheduler.


<div class="meta-api-description">
How to prioritize date grouping in Kendo UI Scheduler views when multiple resources are involved? Configure how scheduling views organize by prioritizing date grouping when multiple resources are involved, enabling date-first arrangement across calendar slots or timelines for better clarity in multi-resource plans, control grouping order to display dates before resource categories, set views to arrange events by day before resource filtering, toggle grouping strategies for schedules combining dates and resources, manage the layout so dates lead grouping in views with resource allocation, adjust calendar display to group by date initially when multiple resource entities exist, optimize the scheduler interface to present chronological grouping before resource segmentation, enable or disable date-priority grouping to customize how tasks and resources appear across scheduling interfaces.
</div>

#### Example - define group by date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
       views: [
        {
            type: "month",
            group: {
                date: true
            }
        }
      ],
      group: {
        resources: ["Rooms"]
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### views.group.orientation `String` *(default: "horizontal")*

The orientation of the group headers. Supported values are *horizontal* or *vertical*. Note that the agenda view is always in vertical orientation.


<div class="meta-api-description">
How to control group header alignment in Kendo UI Scheduler? Control and configure the direction or alignment of grouped headers within scheduling interfaces, enabling display of group labels either side-by-side in a horizontal layout or stacked vertically to suit calendar, timeline, or agenda formats. Adjust, set, or toggle group header orientation between horizontal and vertical modes to customize how resources, dates, or categories are presented in views such as day, week, month, or timeline scheduling layouts, while keeping in mind certain views like agenda maintain a fixed vertical grouping orientation. Customize grouping header alignment visually to improve readability, layout flow, or adapt to different scheduling scenarios and user interface preferences.
</div>

#### Example - disable delete confirmation

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
            type: "month",
            group: {
                orientation: "vertical"
            }
        }
      ],
      group: {
        resources: ["Rooms"]
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### views.majorTick `Number` *(default: 60)*

The number of minutes represented by a major tick.

> The `majorTick` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How do I set the interval for major ticks in a Kendo UI Scheduler? Control the time axis interval by setting the number of minutes each major tick represents, enabling adjustment of visible time scale, grouping, and segmentation of time slots within daily or weekly views. Configure the scheduler’s timeline granularity, set major tick duration in minutes, define how time intervals appear on the calendar, customize the scale for day and week modes, and adjust the timeline’s major division to fit scheduling needs, timeline zoom, or time slot clustering preferences.
</div>

#### Example - set the major tick

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          majorTick: 120 // a major tick represents 120 minutes (2 hours)
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.majorTimeHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the major ticks.

By default the scheduler renders the time using the current culture time format.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `majorTimeHeaderTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day", "week", "workweek" and "timeline" views.


<div class="meta-api-description">
How to customize major time headers in Kendo UI Scheduler views? Control and customize how major time intervals or larger time ticks are displayed in calendar, day, week, workweek, or timeline views by defining custom templates to format or render the primary time headers; enable developers to set, configure, or override default culture-based date and time formatting by specifying a template that accesses date values representing these major time ticks, allowing customization of label appearance, date representation, or formatting for enhanced readability, localization, or specific display requirements in scheduling and timeline interfaces.
</div>

#### Example - set the major time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          majorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'h')#</strong><sup>00</sup>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.minorTickCount `Number` *(default:2)*

The number of time slots to display per major tick.

> The `minorTickCount` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day", "week" or "timeline".


<div class="meta-api-description">
How do I control the number of smaller time segments in a Kendo UI Scheduler timeline? Adjust the number of smaller time segments within each main time interval to customize the granularity and resolution of the scheduling timeline, enabling finer or coarser time slots for day, week, or timeline views. Configure how many subdivisions appear within primary time markers to control slot detail and precision, supporting use cases where splitting time intervals into equal or varied minor segments helps optimize time-axis display for improved scheduling accuracy, time slot management, or detailed appointment breakdowns. This setting enhances control over the timeline’s visual structure by setting the count of minor ticks nested inside major ticks, affecting how users view and interact with time units in calendar and resource planning interfaces.
</div>

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          minorTickCount: 1 // display one time slot per major tick
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.minorTimeHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the minor ticks.

By default the scheduler renders a `"&nbsp;"`.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `minorTimeHeaderTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How can I customize the minor time headers in my Kendo UI Scheduler to display specific details? Control and customize the appearance and formatting of minor time intervals or smaller time segments in day or week views by setting a template that dynamically renders each minor tick using flexible templating syntax, enabling tailored display of time headers, time slots, or subdivisions within larger scheduling blocks, including options to format dates, adjust label content, or replace default blank intervals with meaningful custom text or HTML using date-related fields, ideal for developers looking to configure, style, or override how detailed time divisions appear in schedule or calendar components.
</div>

#### Example - set the minor time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          minorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 't')#</strong>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.months `Number` *(default: 12)*

Configures the number of months that will be displayed in the year view calendar.

> The `months` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "year".


<div class="meta-api-description">
How do I configure the number of months displayed in a Kendo UI Scheduler year view? Adjust or configure the number of months displayed simultaneously in a calendar's year view to show one or multiple months side-by-side, controlling the layout and range of visible months. Enable, set, or customize the monthly span or visible periods in a year calendar view, allowing for expanded or condensed multi-month displays, calendar resizing, and year overview customization. This covers scenarios like showing a single month, several months in parallel, or adjusting calendar width to fit specific date ranges within a year-focused scheduler or date-picker interface.
</div>

#### Example - set the number of months rendered in the year view calendar

    <div id="scheduler"></div>

    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [
          {
            type: "year",
            months: 10
          },
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/1/1 08:00 AM"),
            end: new Date("2013/1/1 09:00 AM"),
            title: "Interview"
          }
        ]
      });
    </script>

### views.name `String`

The name of the view. Typically, used to get the name of the currently selected view via the [view method](/api/javascript/ui/scheduler/methods/view).


<div class="meta-api-description">
How do I uniquely identify and switch between different calendar views in a Kendo UI Scheduler? Identify, set, or reference unique identifiers for calendar or scheduler views to enable programmatic selection, switching, comparison, or retrieval of active display modes; control or access the current visible schedule, timeline, or view instance by name or key, facilitating dynamic view management, view matching, custom UI interactions, or conditional logic based on which calendar perspective is active or selected.
</div>

#### Example - select a view

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [ "day", "month" ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
      setTimeout(function(){
        // Check the browser console to see the result

        var scheduler = $("#scheduler").data("kendoScheduler");
        var viewName = scheduler.view();
        console.log(scheduler.view().name)
      })
    </script>

### views.selected `Boolean` *(default: false)*

If set to `true` the view will be initially selected by the scheduler widget.

> If more than one view is selected then last of them will prevail.


<div class="meta-api-description">
How to set default active view in Kendo UI Scheduler? Control which calendar or timeline view loads first by setting the initial or default active view in a scheduling or calendar component, specifying which layout or presentation mode appears on startup, marking a particular view as preselected or enabled for immediate display, managing multiple view options with priority rules when several are flagged as selected simultaneously, configuring startup behavior to open on day, week, month, timeline, or custom views, defining the active tab or panel shown when the scheduler initializes, enabling developers to set or override the default visible schedule perspective, handling conflicts when multiple initial views are indicated by prioritizing the last defined setting, and adjusting which interface mode is presented first for user convenience or application flow.
</div>

#### Example - select a view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "day" },
        { type: "month", selected: true }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.selectedDateFormat `String`

The format used to display the selected date. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.


<div class="meta-api-description">
How do I customize the date format in Kendo UI Scheduler views? Control how the displayed date range appears in scheduling views by setting or customizing the date format string that defines start and end dates, enabling precise formatting with placeholders for start and end, supporting flexible date patterns, literals, and templates for showing selected calendar ranges, configuring or customizing date range display formats during initialization or runtime, adjusting how date intervals are presented visually in calendars or schedulers, and formatting date boundaries in scheduling interfaces with customizable placeholders and string patterns.
</div>

#### Example - set the selectedDateFormat

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          selectedDateFormat: "{0:dd-MM-yyyy}"
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.selectedShortDateFormat `String`

The format used to display the selected date when viewport is narrow, and the date is displayed in short ("d") format by default. Uses [kendo.format](/api/javascript/kendo/methods/format).


<div class="meta-api-description">
How do I customize the short date format for selected dates in Kendo UI Scheduler when space is limited? Customize or configure the short date display format for selected dates in a scheduling or calendar interface when space is limited, enabling control over how dates are shown in compact or narrow viewports. This includes setting custom date format strings, adjusting the appearance of the selected date in small or condensed layouts, specifying short or abbreviated date formats, and formatting dates with flexible pattern options to ensure clarity and readability on responsive or mobile views where full date formats may not fit. This feature supports tailoring date presentation in day, week, or month views to match user preferences or localization needs in minimal screen real estate scenarios.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            }
        ],
        views: [
            {
                type: "day",
                selectedShortDateFormat: "dd/MM"
            },
            {
                type: "week",
                selectedShortDateFormat: "MMM dd"
            }
        ]
    });
    </script>

### views.showWorkHours `Boolean` *(default: false)*

If set to true the view will be initially shown in business hours mode. By default view is displayed in full day mode.

> The `showWorkHours` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How to show only work hours in Kendo UI Scheduler views? Control the initial display of calendar or scheduler interfaces to emphasize standard business hours, enabling viewing modes that highlight workday time ranges rather than the full 24-hour day cycle, with the ability to configure or toggle showing only active office hours in daily or weekly layouts, focusing on typical work schedules and excluding non-working hours for clearer planning and appointment scheduling, ideal for setting default views that prioritize work periods and improve usability during business-focused date selections or time slot management.
</div>

#### Example - enable selection

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ { type: "day", showWorkHours: true }, "week"],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>


### views.slotTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the time slot cells.

The fields which can be used in the template are:

* date - represents the slot date and time.

* resources() - returns the relevant resources for the current slot.

> The `slotTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day", "week", "workWeek" or "timeline" views.


<div class="meta-api-description">
How can I customize the appearance of individual time slots in a Kendo UI Scheduler view? Control and customize the appearance and content of individual time slots in daily, weekly, work week, or timeline scheduler views by defining a slot rendering template that accesses slot date and time along with associated resources, enabling developers to tailor the display and formatting of each time cell, adapt slot visuals based on contextual data, dynamically inject custom HTML or components for slots, and modify how time intervals are presented during scheduling or calendar display, providing flexible ways to personalize appointment or event slots through template configuration and resource-aware slot management.
</div>

#### Example - set the slot template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          slotTemplate: kendo.template("<strong>#=kendo.toString(date)#</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - modify the slot based on resources

    <div id="scheduler"></div>
    <script id="slotTemplate" type="text/x-kendo-template">
        # var resources = data.resources(); #
        # var color = resources.roomId === 1 ? "red" : "blue"; #

        <span style="background: #=color#">
          #=kendo.toString(date, "d")#
        </span>
    </script>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [{
        type: "day",
        slotTemplate: kendo.template($("#slotTemplate").html())
      }],
      group: {
        resources: ["Rooms"]
      },
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataSource: [
            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
          ],
          title: "Room"
        }
      ]
    });
    </script>

### views.startDate `Date`

Configures the start date of the year view. The Scheduler will display [12 months](/api/javascript/ui/scheduler#configuration-views.months) starting from the `startDate`.

> The `startDate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "year".


<div class="meta-api-description">
How can I set the initial date for the yearly calendar view in Kendo UI Scheduler? Configure the initial date for the year-based calendar view to control which month and 12-month period the scheduler displays first, enabling customization of the yearly timeline, selection of the starting month or date for yearly planning, setting the base month that the multi-month display begins with, defining the first visible month in the annual perspective, and adjusting the start of the year view range for scheduling, timeline visualization, and event overview in yearly mode.
</div>

#### Example - set the start date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      views: [
        {
          type: "year",
          startDate: new Date("2021/2/1")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2021/2/2 08:00 AM"),
          end: new Date("2021/2/2 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.startTime `Date`

The start time of the view. The scheduler will display events starting after the `startTime`.


<div class="meta-api-description">
How do I set the initial visible hour in Kendo UI Scheduler's calendar or timeline views? Control the initial visible hour in calendar or timeline views to configure when daily schedules, timelines, or week views begin displaying events, enabling the customization of start times for appointments or tasks, filtering out earlier events and focusing the display on a specific portion of the day or timeline, useful for adjusting the visible window to business hours, work shifts, or preferred time ranges in scheduling interfaces.
</div>

#### Example - set the start time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          startTime: new Date("2013/6/6 08:00"),
          endTime: new Date("2013/6/6 18:00")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.title `String`

The user-friendly title of the view displayed by the scheduler.


<div class="meta-api-description">
How to customize the display name for different views in Kendo UI Scheduler? Customize or configure the display name, label, or title text shown for different calendar or scheduler views such as daily, weekly, or monthly layouts. Enable setting user-friendly, localized, or custom names for views in scheduling interfaces, controlling how each view is presented in the user interface. Adjust or rename schedule tabs, view headings, or calendar section titles to match localized languages, branding, or user preferences when initializing or updating scheduler components.
</div>

#### Example - set the view title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          title: "Today",
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.tooltipTemplate `String|Function`

Configures the [template](/api/javascript/kendo/methods/template) used to render the Tooltip in the Scheduler year view.

> The `tooltipTemplate` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "year".

The fields which can be used in the template are:

* date `Date` - the selected date from the calendar
* events `Array` - list of the events and their respective resource for the selected date
* messages `Object` - the configuration of the Scheduler messages used for localization.


<div class="meta-api-description">
How do I customize the tooltip content in Kendo UI Scheduler's year view? Customize or define the tooltip content displayed in the calendar’s year view by setting or controlling the template for tooltip rendering, enabling personalized HTML, text, or data binding for dates, event lists tied to specific days, or localization messages; this involves configuring how date-specific event information and localized messages appear on hover or focus in the annual calendar display, helping developers tailor user interface tooltips to show event summaries, resource details, or localized text in any desired format during year view interactions.
</div>

#### Example - set the view title

    <div id="scheduler"></div>
    <script id="tooltip-template" type="text/x-kendo-template">
      <div>Events: </div>
      <div>
          # for (var i = 0; i < events.length; i++) { #
            #: events[i].title #
          # } #
      </div>
    </script>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "year",
          tooltipTemplate:  $("#tooltip-template").html()
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.type `String`

The type of the view. The built-in views are: "day", "week", "workWeek", "month", "agenda", "timeline", "timelineWeek", "timelineWorkWeek", "timelineMonth" and "year".


<div class="meta-api-description">
How do I configure different view modes in Kendo UI Scheduler? Configure and control the calendar display by specifying different view modes such as day, week, work week, month, agenda, timeline, timeline week, timeline work week, timeline month, or year, enabling selection and customization of how scheduling data is rendered and interacted with. Adjust scheduling interfaces to show various time scales or layouts, switch between detailed daily views, weekly overviews, monthly calendars, timeline perspectives, and agenda formats, as well as enable or set up specific calendar presentations that fit different planning, resource management, or event visualization needs across numerous use cases.
</div>

#### Example - set the view type

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.virtual `Boolean` *(default: false)*

Enables the DOM virtualization for vertical grouping of the view - renders batches of DOM elements as you scroll. The views that support this option are: "day", "week", "workWeek", "month".


<div class="meta-api-description">
How do I improve performance in Kendo UI Scheduler for large datasets? Optimize vertical scrolling and rendering efficiency in scheduler views by enabling virtual rendering or DOM virtualization to dynamically load and display appointment slots and events incrementally as users scroll, reducing the total number of DOM nodes and minimizing memory consumption, repainting overhead, and lag in large datasets or long timelines. Configure virtualization to batch-render visible elements in time-based views like day, week, work week, and month, improving performance for calendars with many appointments without preloading the entire set at once. Adjust scroll performance, rendering strategy, and resource usage in vertical grouping scheduler interfaces by activating incremental rendering techniques that only process the currently viewable time slots and events, enhancing smoothness and responsiveness during navigation and interaction.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      height: 400,
      views: [
        { type: "week", virtual: true }
      ],
      group: {
        resources: ["Rooms"],
        orientation: "vertical"
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
	</script>

### views.workDays `Array`

Sets the working days (index based).


<div class="meta-api-description">
How do I specify which days of the week are considered workdays in a Kendo UI Scheduler? Specify and customize the set of weekdays recognized as active or business days by defining numeric day indexes representing Monday through Sunday, enabling control over scheduling, availability, and workweek configurations. Adjust which days the system treats as working, operating, or non-working by setting an array of day numbers to reflect standard business days, custom work shifts, or holiday schedules for task planning, calendar views, and resource allocation within the Scheduler framework. This flexible setup supports varying workweek definitions, disables weekends or off days, and tailors day-based calculations for appointments, events, and timeline availability, enhancing control over perceived working days in scheduling applications.
</div>

#### Example - set the workDays of the scheduler

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [
            { type: "week", workDays: [1,2,4] },
            { type: "workWeek", selected: true, workDays: [1,2,4] },
            { type: "timelineWeek", workDays: [1,2,4] },
            { type: "timelineWorkWeek", workDays: [1,2,4] },
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
    </script>

### views.workWeekStart `Number` *(default: 1)*

The start of working week (index based).

> The `workWeekStart` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How do I configure the first day of the workweek for a Kendo UI Scheduler? Set or configure the first day of the workweek for scheduling, calendar display, or navigation in day and week views by specifying the starting weekday using numeric indexing, enabling control over which weekday marks the beginning of work periods, adjusts calendar rendering, affects schedule calculations, and customizes how workweeks are visualized and interacted with in week-based or daily scheduling interfaces.
</div>

#### Example - set the start day of the work week to Tuesday

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "week", workWeekStart: 2 }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.workWeekEnd `Number` *(default: 5)*

The end of working week (index based).

> The `workWeekEnd` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How do I customize the end day of the workweek in Kendo UI Scheduler's workWeek view? Set or customize the final working day displayed in calendar or scheduling views, controlling which day marks the end of the active workweek in daily or weekly layouts. Adjust, configure, or specify the endpoint of the workweek by selecting a specific day index to tailor the visible work range, helping define workweek boundaries, business days, or office hours cutoff. Enable or modify how the workweek concludes within schedule views, ensuring the calendar reflects company-specific, regional, or custom workweek schedules and excludes weekends or non-working days as needed for planning, availability, or resource allocation.
</div>

#### Example - set the end day of the work week to Saturday

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "week", workWeekEnd: 6 }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### width `Number|String`

The width of the widget. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the width of the Kendo UI Scheduler widget? Adjust or configure the horizontal dimension, width, or layout size of the scheduling interface or calendar area by setting numeric pixel values or CSS units like percentages to control how much space the scheduler uses on the screen, enabling customization of its visible width, overall layout fit, and available scheduling area for tasks, events, or appointments in various responsive or fixed-width designs.
</div>

#### Example - set the width of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      width: 500,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### workDayStart `Date`

Sets the start of the work day when the  "Show business hours" button is clicked.


<div class="meta-api-description">
How to configure the start time for work shifts in Kendo UI Scheduler? Set or configure the start hour of the workday in scheduling interfaces to emphasize business hours, define when the workday begins for calendar displays, highlight specific morning hours in appointment planners, adjust the default start time for work shifts or office hours in schedulers, customize the beginning of operational hours for day planning tools, enable focused visibility on the start of working hours during calendar views, control or specify the initial active hour in business hour layouts, determine the first active slot in daily scheduling grids, and manage how business hours are visually prioritized in time management components.
</div>

#### Example - set the workDayStart of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      workDayStart: new Date("2013/1/1 09:00 AM"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### workDays `Array`

Sets the working days (index based).


<div class="meta-api-description">
How do I customize which days are considered workdays in a Kendo UI Scheduler? Set or customize the active business days or weekdays recognized by the scheduling system by specifying an array of day indexes representing working days, enabling control over which days appear as available for appointments, meetings, or tasks, while excluding weekends or holidays as non-working, adjusting the calendar to match company hours, configuring which days count as operational for planning or shift management, managing weekday schedules, enabling flexible workweek definitions, and controlling day visibility or activity in calendar views.
</div>

#### Example - set the workDays of the scheduler

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        workDays: [1,2,4],
        views: [
            { type: "week" },
            { type: "workWeek", selected: true },
            { type: "timelineWeek" },
            { type: "timelineWorkWeek" },
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
    </script>

### workDayEnd `Date`

Sets the end of the work day when the  "Show business hours" button is clicked.


<div class="meta-api-description">
How to set end time of business hours in Kendo UI Scheduler? Set or adjust the end time of business hours to define when the workday finishes, control the visible working hours in scheduling interfaces, configure the daily cutoff time for calendar views, customize the scheduler timeline or day and week displays to match organizational operating hours, enable or disable display of late-day slots, manage office closing times in planner views, and align visible work periods with company-specific schedules for accurate appointment and resource planning.
</div>

#### Example - set the workDayEnd of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      workDayEnd: new Date("2013/1/1 5:00 PM"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### workWeekStart `Number` *(default: 1)*

The start of working week (index based).

> The `workWeekStart` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How do I set the start day of the work week in Kendo UI Scheduler? Set or configure the first day of the work week to control calendar starting points in daily and weekly views, enabling customization of workweek alignment, week start day, business week configuration, day index for week beginning, calendar week settings, defining which weekday initiates the schedule, adjusting week scope in day or week modes, specifying the initial day for scheduling, and managing workweek boundaries for accurate time and resource planning.
</div>

#### Example - set the start day of the work week to Tuesday

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      workWeekStart: 2,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### workWeekEnd `Number` *(default: 5)*

The end of working week (index based).

> The `workWeekEnd` option is supported when [views.type](/api/javascript/ui/scheduler#configuration-views.type) is set to "day" or "week".


<div class="meta-api-description">
How do I set the last working day of the week in a Kendo UI Scheduler? Control or configure the last working day of the week by setting the scheduler’s work week endpoint using an index-based weekday value, specifying which weekday marks the closure of the workweek in daily or weekly views. This enables customization of business calendars, adjusting the workweek boundaries for scheduling, defining workweek end days, and tailoring calendar behavior to match various regional or organizational schedules, including setting workweek end on Fridays, Saturdays, or any specific weekday for correct display and logic in day or week view modes.
</div>

#### Example - set the end day of the work week to Saturday

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      workWeekEnd: 6,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

## Fields

### dataSource `kendo.data.SchedulerDataSource`

The [data source](/api/javascript/data/schedulerdatasource) of the widget. Configured via the [dataSource](/api/javascript/ui/scheduler/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/scheduler/methods/setdatasource) method instead.


<div class="meta-api-description">
How to bind data to Kendo UI Scheduler? Connect, bind, or link the event collection or underlying data items that power the calendar, timetable, or scheduling widget, managing, updating, or syncing the source data to control the displayed events and automatically reflect any modifications or changes in real-time; configure, observe, or monitor the event list, appointments, or items collection tied to the schedule component, ensuring any updates, edits, or adjustments in the data are shown without manual refresh; control or access the primary event dataset that the schedule view uses for rendering and interaction, and handle dynamic data binding, data updates, or data synchronization with the scheduling interface.
</div>

#### Example - add a data item to the data source

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.dataSource.add( {
      start: new Date("2013/6/6 08:00 AM"),
      end: new Date("2013/6/6 09:00 AM"),
      title: "Interview"
    });
    </script>

#### Example - update a data item in the data source

    <button id="btn">Set Date</button>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
          },
        ],
      });
      $("#btn").on("click", function () {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var event = scheduler.dataSource.at(0);
        event.set("end", new Date("2013/6/6 10:00 AM"));
      });
    </script>

#### Example - remove a data item from the data source

    <button id="remove">Remove</button>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
      $("#remove").click(function(){
        var scheduler = $("#scheduler").data("kendoScheduler");
        var event = scheduler.dataSource.at(0);
        console.log(event);
        scheduler.dataSource.remove(event);
      }) 

    </script>

### resources `Array`

The resources of the widget. Configured via the [resources](/api/javascript/ui/scheduler#configuration-resources) option.


<div class="meta-api-description">
How to update resource configurations in Kendo UI Scheduler after initialization? Manage and interact with resource configurations within the scheduler, including reading, updating, binding, and assigning resource definitions after initialization. Control resource data sources, customize field mappings, organize resource grouping, and modify resource settings dynamically. Enable configuring and accessing scheduler resources for tasks like resource allocation, scheduling assignments, and adjusting resource-related properties in real time. Handle resource definitions and data connections to optimize scheduling workflows and resource management consistently.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting",
                roomId: 1
            }
        ],
        resources: [
            {
                field: "roomId",
                name: "Rooms",
                dataSource: [
                    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                ],
                title: "Room"
            }
        ]
    });
    
    var scheduler = $("#scheduler").data("kendoScheduler");
    console.log("Resources:", scheduler.resources);
    </script>

### calendar `kendo.ui.Calendar`

The [Calendar widget](/api/javascript/ui/calendar) of the Scheduler. The toolbar Calendar widget allows navigation directly to the chosen date. It will only be available after it has been opened for the first time.


<div class="meta-api-description">
How do I programmatically navigate to a specific date in the Kendo UI for jQuery Scheduler's embedded calendar? Control and interact with the embedded calendar in the scheduling toolbar to programmatically navigate to particular dates, bind event listeners, trigger calendar methods, manage date selection dynamically, manipulate calendar views, configure toolbar date controls, access calendar component instances on demand, handle user interactions within the calendar widget, and integrate programmatic date navigation or updates within the scheduling interface once the calendar is initialized or opened.
</div>

#### Example - get the Calendar selected value

    <input type="button" class="k-button" value="Click to get Calendar" id="btn"/>
	  <div id="scheduler"></div>

	  <script>
	    $("#scheduler").kendoScheduler({
	  	date: new Date("2013/6/6")
	    });
  
	    $('#btn').on('click', function() {
	  	var scheduler = $("#scheduler").getKendoScheduler();
	  	var calendar = scheduler.calendar;
  
	  	if (!calendar) {
	  		alert("Calendar is yet not initialized.");
	  	} else {
	  		alert("Current date in calendar: " + calendar.value());
	  	}
	    });
	  </script>

## Methods

### addEvent

Adds a new scheduler event and opens the edit form.


<div class="meta-api-description">
How do I programmatically add new events to a Kendo UI Scheduler? Create, insert, or programmatically add new events or appointments to a scheduling system while instantly opening an editable form or interface to modify event details, initialize or prefill form fields, trigger the event creation process, launch the event editor from code, and enable users to input or update event information within a calendar or scheduling application workflow.
</div>

#### Parameters

##### data `Object`

The object containing the scheduler event fields.

#### Example - add a new event

    <button id='addEvent'>Add New Event</button>
    <div id="scheduler"></div>
    <script>
      
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6")
      });
      
      var scheduler = $("#scheduler").data("kendoScheduler"); 
      
      $("#addEvent").click(function (){       
        scheduler.addEvent({ title: "(No title)" }); 
      })
    </script>

### cancelEvent

Cancels the scheduler event editing. Closes the edit form.


<div class="meta-api-description">
How do I cancel ongoing event editing in Kendo UI Scheduler? Stop ongoing event editing, discard changes, cancel event modifications, close or dismiss event edit dialogs, halt editing workflows, reset event forms without saving, exit event editing mode, interrupt event updates, and return the scheduler or calendar interface to its default non-editing state; effectively undo or abort event edit sessions and ensure no changes are applied to scheduled events by interrupting the edit process and closing all related edit controls or dialogs.
</div>

#### Example - cancel editing

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.addEvent({ title: "(No title)" });
    scheduler.cancelEvent();
    </script>

### data

Gets currently expanded scheduler events.


<div class="meta-api-description">
How do I access the currently expanded events in the Kendo UI Scheduler using jQuery? Retrieve, access, or inspect the currently expanded events in the scheduling interface by obtaining the list of expanded items as an array of event objects, enabling you to monitor, save, restore, or debug the expanded state of events within the scheduler, control which events are open in the UI, capture expansion state for persistence or analysis, and manage event visibility dynamically based on user actions or application state.
</div>

#### Example - add a new event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        views: ["week"]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");

    scheduler.addEvent({
        title: "Example event",
        start: new Date(),
        end: new Date(),
        recurrenceRule: "FREQ=DAILY;COUNT=2"
    });

    scheduler.saveEvent();
    //get second occurrence
	  /* The result can be observed in the DevTools(F12) console of the browser. */
    setTimeout(function(){
        console.log(scheduler.data()[1]);
    })
    </script>

### date

Gets or sets the current scheduler date.


<div class="meta-api-description">
How do I programmatically change the date displayed in a Kendo UI Scheduler? Access or modify the current active day displayed in the calendar or scheduling interface, enabling seamless navigation to a specific date, retrieving the visible date for syncing state or logic, setting the scheduler’s date programmatically to update the view or control the focused day, manipulating or reading the displayed date for scheduling, calendar navigation, date selection, or date-based filtering, supporting queries like how to jump to a particular day, read the selected date, or change the viewed day through code or UI automation.
</div>

#### Parameters

##### value `Date` *(optional)*

The new date to set.

#### Returns

`Date` the current date.

#### Example - set the current date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.date(new Date("2013/6/6"));
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly remove a Kendo UI Scheduler instance from my application without causing memory leaks? Clean up and dispose of a scheduling component by detaching all event listeners, removing stored data attributes to prevent memory leaks, and recursively destroying any nested child components, ensuring safe removal and resource release without deleting the element itself from the DOM; this method is useful for properly disabling, resetting, or tearing down scheduler instances in applications while managing event handler cleanup, memory optimization, and integrated child component disposal.
</div>

#### Example

    <button id="destroy">Destroy</button>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
          },
        ],
      });

      $("#destroy").click(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler.destroy();
      });
    </script>

### editEvent

Opens the specified scheduler event in the edit form.


<div class="meta-api-description">
How can I programmatically open the event editor for a specific appointment in the Kendo Scheduler? Trigger or programmatically open the event editor interface to modify a specific calendar appointment or scheduled item, enabling editing through the scheduling component’s popup or inline form just like when a user manually starts editing; control, invoke, launch, or activate the edit mode for any event to update details, adjust times, or change properties within the scheduler’s UI editing workflow.
</div>

#### Parameters

##### event `String|kendo.data.SchedulerEvent`

The event which should be put in edit mode. Also accepts a string which is the `uid` of the event which should be edited.

#### Example - edit an event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    setTimeout(function(){
        var scheduler = $("#scheduler").data("kendoScheduler");
        var event = scheduler.dataSource.at(0);
        scheduler.editEvent(event);
    })
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
How can I access the individual event elements in my Kendo UI Scheduler? Retrieve or access the list or array of rendered scheduler event elements corresponding to the current displayed data items for purposes such as custom DOM manipulation, styling individual schedule entries, attaching event listeners, measuring element dimensions, scrolling to specific rendered events, mapping scheduler data objects to their visual DOM nodes, or synchronizing UI behaviors with underlying data; enabling you to link scheduler data source views with their actual DOM representations to facilitate enhanced customization, dynamic updates, or interaction handling within scheduler components.
</div>

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2022/6/13"),
        startTime: new Date("2022/6/13 07:00 AM"),
        height: 600,
        views: ["day", "week"],
        timezone: "Etc/UTC",
        dataSource: [
            {
                id: 1,
                start: new Date("2022/6/13 10:00 AM"),
                end: new Date("2022/6/13 11:00 AM"),
                title: "Team Meeting"
            },
            {
                id: 2,
                start: new Date("2022/6/13 14:00 PM"),
                end: new Date("2022/6/13 15:00 PM"),
                title: "Project Review"
            }
        ]
    });
    
    var scheduler = $("#scheduler").data("kendoScheduler");
    var items = scheduler.items();
    console.log("Number of event elements:", items.length);
    console.log("First event element:", items[0]);
    </script>

#### Returns

`Array` The currently rendered events (`<div>` elements).

### occurrenceByUid

Gets the event occurrence with the specified [uid](/api/javascript/data/model#fields-uid).

> This method can return an occurrence (not part of the data source's data) part of a recurring series.


<div class="meta-api-description">
How to get a specific occurrence of an event in Kendo UI Scheduler by its unique identifier? Find or fetch a particular event instance or occurrence by its unique identifier or uid within a calendar or scheduling system, enabling retrieval of the exact occurrence including instances from recurring event series whether or not they exist in the main data source. Search, locate, or access a single event occurrence by uid for scheduling, editing, or displaying purposes, supporting scenarios such as querying specific event repetitions, handling exceptions in recurring events, or managing individual event occurrences based on a unique id. Use cases include retrieving, identifying, or controlling event instances programmatically by a unique key or identifier in complex scheduling or calendar applications.
</div>

#### Parameters

##### uid `String`

The `uid` of the occurrence to look for.

#### Returns

`kendo.data.SchedulerEvent` the occurrence instance. Returns `undefined` if an occurrence with the specified uid is not found.

#### Example - get an occurrence from a recurring series

    <button id="uid">Get Event By Uid</button>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: ["week"],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
            recurrenceRule: "FREQ=DAILY",
          },
        ],
      });

      $("#uid").click(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var event = scheduler.occurrenceByUid(uid);
        console.log(event);
      });
      /* The result can be observed in the DevTools(F12) console of the browser. */
    </script>

### occurrencesInRange

Gets a list of event occurrences in specified time range.

> The result is scoped to the current displayed view. Therefore, the specified range should be within the view's time range.


<div class="meta-api-description">
How can I retrieve all occurrences of an event in a Kendo UI Scheduler between two specific dates? Retrieve or query event instances, occurrences, or scheduled items happening within a specific start and end timeframe, filter or list events based on date and time ranges, fetch all events visible in the current calendar or scheduler view between given dates, search for occurrences that fall inside a particular time window, obtain scheduled occurrences constrained to the displayed or active timeline, extract or process events within custom time intervals, track repeating or single events within start/end boundaries, gather all calendar entries between given start and end times, control and manipulate time-scoped event data, and perform range-based retrieval of scheduler entries for filtering, display, or further processing.
</div>

#### Parameters

##### start `Date`

The start date of the period.

##### end `Date`

The end date of the period.

#### Returns

`Array` a list of scheduler events filtered by the specified start/end period.

> All recurring events within the start - end period will be returned in the list.

#### Example - get a list of occurrences

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2023/7/6"),
        views: ["week"],
        dataSource: [
          {
            id: 1,
            start: new Date("2023/7/6 08:00 AM"),
            end: new Date("2023/7/6 09:00 AM"),
            title: "Interview",
            recurrenceRule: "FREQ=DAILY"
          }
        ]
      });

      setTimeout(function(){
        var scheduler = $("#scheduler").data("kendoScheduler");

        var events = scheduler.occurrencesInRange(new Date("2023/7/5"), new Date("2023/7/10"));

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(events);
      }, 1500)
    </script>

### refresh

Refreshes the Scheduler data rendering using the current data items. This method will not refresh the slots of the view.


<div class="meta-api-description">
How can I update the Scheduler to reflect changes in existing events without reloading data from a remote source? Trigger a data rendering update to re-display existing events or appointments when underlying items change by calling a refresh operation that re-renders the event elements in the DOM from the current local data collection without refetching, re-binding, or reloading remote data sources, ensuring visible event updates reflect modifications instantly while maintaining the current time slots, headers, resource layouts, and grid structure unchanged. This method is used to programmatically control and force the Scheduler to redraw events and appointments after edits, additions, or deletions within the existing dataset without impacting or resetting the overall calendar view or layout configuration.
</div>

#### Example - refresh the widget

    <div id="scheduler"></div>
    <script>
        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/6"),
          dataSource: [
            {
              id: 1,
              start: new Date("2013/6/6 08:00 AM"),
              end: new Date("2013/6/6 09:00 AM"),
              title: "Interview"
            }
          ]
        });
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler.refresh();
    </script>

### removeEvent

Removes the specified scheduler event.


<div class="meta-api-description">
How can I programmatically delete an event from the Kendo UI Scheduler? Delete or cancel individual calendar entries, appointments, meetings, or scheduled tasks within a scheduler or event management system by programmatically removing specific event instances or data items from the collection so they no longer appear or are processed. Enable precise control over dynamic event lists by eliminating particular events, clearing scheduled items, or updating the calendar data to reflect changes, deletions, or cancellations without manual user interaction. Manage event lifecycle, remove conflicting or outdated appointments, and update schedules through code to ensure the component only handles current, relevant events without rendering removed entries.
</div>

#### Parameters

##### event `String|kendo.data.SchedulerEvent`

The event which should be removed. Also accepts a string which is the `uid` of the event which should be removed.

#### Example - remove an event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    setTimeout(function(){
      var scheduler = $("#scheduler").data("kendoScheduler");
      var event = scheduler.dataSource.at(0);
      scheduler.removeEvent(event);
    })    
    </script>

### resourcesBySlot

Get the relevant resources for a given slot.


<div class="meta-api-description">
How do I get a list of resources assigned to a specific time slot in Kendo UI Scheduler? Retrieve or query resources associated with a particular time slot to identify assigned or free resources within a scheduling system, enabling filtering, mapping, highlighting, availability calculations, custom rendering, dynamic tooltips, or resource-based scheduling decisions by accessing the set of relevant resource objects linked to a specific slot or timeframe.
</div>

#### Parameters

##### slot `Object`

#### Returns

`Object` The relevant resources.

#### Example - get the relevant resources

    <button id="getResource">Get Resource for Slot</button>
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        group: {
          resources: ["Rooms"],
        },
        resources: [
          {
            field: "roomId",
            name: "Rooms",
            dataSource: [
              { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
              { text: "Meeting Room 201", value: 2, color: "#f58a8a" },
            ],
          },
        ],
      });
      
      $("#getResource").click(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");

        var element = scheduler.view().content.find("tr:first td:first");

        var slot = scheduler.slotByElement(element);

        var resource = scheduler.resourcesBySlot(slot);

        for (var key in resource) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("resouce - {" + key + ": " + resource[key] + " }");
        }
      });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/scheduler/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.


<div class="meta-api-description">
How can I export my Kendo UI Scheduler view as a PDF file? Convert or export the current schedule view, calendar data, or event listings into a downloadable PDF file by invoking a method that initiates PDF generation, returns a promise resolving upon completion or errors, and supports event-driven handling during the export process; this enables configuring PDF export on user actions like button clicks to prevent pop-up blockers, managing asynchronous export success or failure, triggering hooks or callbacks during export, and automating or customizing saving schedules as PDF documents for printing, sharing, archiving, or reporting purposes.
</div>

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/scheduler/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    $("#export").click(function(e) {
        var scheduler = $("#scheduler").data("kendoScheduler");
        scheduler.saveAsPDF();
    });
    </script>

### saveEvent

Saves the scheduler event which is open in the edit form and closes it.


<div class="meta-api-description">
How do I programmatically save changes to the currently edited event in a Kendo UI Scheduler? Persist changes to the currently edited event by programmatically saving updates, committing modifications made in the event editor, closing the active edit dialog or form, finalizing event edits within the scheduling interface, enabling automatic saving and form closure after editing, controlling event update completion, applying changes to open calendar events, finishing and saving user edits to scheduled items, confirming and storing event edits before closing the edit view, and managing save-and-close operations for timeline or calendar events.
</div>

#### Example - save a new event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.addEvent({ title: "(No title)" });
    scheduler.saveEvent();
    </script>

### select

Gets or sets the events (or slots) which are selected.


<div class="meta-api-description">
How do I get or change the currently selected events in a Kendo UI Scheduler? Retrieve or set the current selection of events, appointments, or available time slots within a scheduling or calendar interface, enabling developers to programmatically access which items are chosen or to update the selected times and events dynamically. Control, modify, or query the active selection state in a scheduler or calendar view by getting the list of selected slots or events, adjusting selections through code, syncing selections with external data, managing user-chosen times, configuring event highlighting, and handling multi-item or single-item selections for scheduling workflows or user interactions.
</div>

#### Parameters

##### events `Array`

The Uids of events which should be selected. List of the available events can be get using the [data](/api/javascript/ui/scheduler/methods/select) method.

##### options `Object`

##### options.events `Array`

The Uids of events which should be selected. List of the available events can be get using the [data](/api/javascript/ui/scheduler/methods/select) method.

##### options.resources `Array`

The resource values (groups) in which the events or slots should be selected. If no resources are defined the first event or slot that match the condition will be selected. This option is not supported in "agenda" view.

##### options.start `Date`

The start time from which the selection of the slots begins. If 'events' argument is provided the slot selection is ignored.

##### options.end `Date`

The end time in which the selection of the slots ends. If 'events' argument is provided the slot selection is ignored.

##### options.isAllDay `Boolean`

Allows selection of slots in day and time slots of the view (applicable in day/week/workweek views).

#### Example - select event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      selectable: true,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });

    setTimeout(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");

        //find event for selection:
        var event = scheduler.dataSource.data(); 
        scheduler.select([event[0].uid]);

        //log selected event data
        console.log(scheduler.select());
      });
    </script>


### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How do I update the event data source in Kendo UI Scheduler? Configure or update the events collection for the scheduler by setting, binding, or replacing its data source dynamically with arrays, data source instances, or configuration objects to control which event items are loaded, displayed, refreshed, or read at runtime; apply new event data, switch event lists, override existing schedules, or connect different event sources programmatically to manage calendar events effectively.
</div>

#### Parameters

##### dataSource `kendo.data.SchedulerDataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var dataSource = new kendo.data.SchedulerDataSource({
      data: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    scheduler.setDataSource(dataSource);
    </script>

### slotByPosition

Get the time slot from given horizontal (x) and vertical (y) position.


<div class="meta-api-description">
How do I determine which time slot in Kendo UI Scheduler corresponds to a specific pixel position on the screen? Convert screen or pointer coordinates to their corresponding scheduling time slots or calendar cells by mapping horizontal and vertical positions, enable interactions such as detecting which time slot corresponds to specific pixel positions for click, drag, or hit-testing, translate x and y coordinates relative to the scheduling interface into calendar or timeline intervals, determine precise time cells from cursor or touch locations, support event placement or selection based on screen position, control user input mapping on schedules by locating exact time intervals from pointer gestures, and facilitate responsive UI features that require converting spatial positions to temporal slots in a calendar or scheduler view.
</div>

#### Parameters

##### xPosition `Number`

The horizontal position.

##### yPosition `Number`

The vertical position.

#### Returns

`Object` The time slot.

#### Example - get slot and it's startDate and endDate

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });

    /* The scheduler in this example should be fully rendered correct results of slotByPosition()  */
    setTimeout(() => {
        var scheduler = $("#scheduler").data("kendoScheduler");
        var slot = scheduler.slotByPosition(100,100);
    
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("slot startDate: " + slot.startDate);
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("slot endDate: " + slot.endDate);
    }, 200);
    </script>

### slotByElement

Get the time slot from given element.


<div class="meta-api-description">
How do I get the calendar time slot associated with a given DOM element in Kendo UI Scheduler? Retrieve or determine the calendar time slot, schedule segment, or specific date/time interval associated with a given DOM element, such as a calendar cell, event container, or any interactive slot-related element. This method helps convert or map page elements to their corresponding schedule slots for purposes like event hit-testing, selecting or highlighting slots programmatically, resolving which time or date an element represents, and linking UI components back to their time-based data entries. It supports identifying and controlling the scheduler’s time regions based on user interactions, element references, or dynamic element queries within calendar or timeline views.
</div>

#### Parameters

##### element `Element|jQuery`

#### Returns

`Object` The time slot.

#### Example - save a new event

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    setTimeout(function(){
        var scheduler = $("#scheduler").data("kendoScheduler");
        var element = scheduler.view().content.find("tr:first td:first");
        var slot = scheduler.slotByElement(element);

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("slot startDate: " + slot.startDate);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("slot endDate: " + slot.endDate);
    })
    </script>

### view

Gets or sets the current Scheduler view.

To get the current Scheduler view name, use the [`viewName` method](/api/javascript/ui/scheduler/methods/viewname).


<div class="meta-api-description">
How do I switch between different views in Kendo UI Scheduler? Change, configure, or retrieve the current calendar or schedule display mode, switch between different scheduler perspectives programmatically, control which calendar view is active such as day, week, month, or custom views, set or obtain the active scheduling layout, dynamically update or read the scheduler’s visible timeline or agenda, manage and toggle schedule presentation modes at runtime, query the current calendar format name, assign or modify the scheduling interface view for displaying events, and handle scheduler view state for interactive calendar applications.
</div>

#### Parameters

##### type `String` *(optional)*

The view type to select.

#### Returns

`kendo.ui.SchedulerView` the current Scheduler view.

#### Example - set the current view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.view("month");
    </script>

### viewName

The name of the current view. Can be used for refreshing the current view data.


<div class="meta-api-description">
How do I access the current view mode in Kendo UI Scheduler? Obtain or access the current calendar or scheduler view identifier such as day, week, month, timeline, or agenda representation to detect which display mode is active, enabling dynamic refresh, conditional logic, state updates, or data reloading based on the visible scheduler layout. This facilitates running view-specific operations, comparing current view states, configuring UI changes depending on the selected time range, or managing view-driven workflows by checking or retrieving the name string that corresponds to the scheduler’s present display mode.
</div>

#### Returns

`String` the name of the current scheduler view.

#### Example - change scheduler options and refresh the view

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
      var scheduler = $("#scheduler").data("kendoScheduler");

      scheduler.setOptions({
        startTime: new Date("2015/1/1 14:00"),
        endTime: new Date("2015/1/1 18:00")
      });

      setTimeout(function(){
        scheduler.view(scheduler.viewName());
      })
    </script>


## Events

### add

Fired when a new event is about to be added.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I validate event data before adding new events to a Kendo UI Scheduler? Capture, inspect, or intercept calendar events right before they are created or added in scheduling systems, enabling validation, modification, or custom logic execution on event data prior to insertion. Configure hooks or listeners that trigger just before new events are saved, allowing control over event details, enforcing rules, adjusting properties, or integrating additional workflows. Enable pre-add event interception to examine fields, run checks, update values, or trigger related actions during calendar event creation processes within scheduling frameworks.
</div>

#### Event Data

##### e.event `Object`

The event data from which the SchedulerEvent instance will be created and added to the DataSource.

##### e.preventDefault `Function`

If invoked prevents the add action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "add" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      add: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Add", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "add" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_add(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Add", e.start);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("add", scheduler_add);
    </script>

### cancel

Fired when the user cancels editing by clicking the "cancel" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle cancellation of in-progress schedule edits using Kendo UI Scheduler's cancel event? Handle scenarios where in-progress schedule edits are aborted or canceled by users, detect when editing is interrupted or terminated via cancel actions or buttons, manage UI updates or rollback changes upon edit cancellation, respond to user-triggered cancel events within scheduling interfaces, enable execution of cleanup logic or state restoration when editing operations are stopped before completion, monitor and react to user cancel interactions in appointment or event editing workflows, configure event listeners for editing cancellation to maintain consistent interface states, trigger custom functions or side effects when users discard changes in scheduling components, detect editing interruptions to prevent unwanted data persistence or to reset form states, and synchronize application state with user cancellations during appointment modifications.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is no longer in edit mode.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The scheduler event remains in edit mode.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      cancel: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Cancelling", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_cancel(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Cancelling", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("cancel", scheduler_cancel);
    </script>

### change

Fired when the user selects a cell or event in the scheduler.

> Make sure you enabled the `selectable` option of the Scheduler, in order to be able to trigger a change event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when a user selects a time slot in the Kendo UI Scheduler? Detect and handle user selection updates within the scheduler component by capturing changes when users select time slots, events, cells, or appointments; enable and listen for selection change events to trigger custom actions, logic, or interface updates based on user interactions with schedulers, calendars, or booking grids, supporting selectable configurations and accessing the scheduler instance context for full control over selection events, user input response, and dynamic adjustments in scheduling interfaces or event management systems.
</div>

#### Event Data

##### e.start `Date`

The selection start date.

##### e.end `Date`

The selection end date.

##### e.events `Array`

A list of the selected [scheduler events](/api/javascript/data/schedulerevent).

##### e.slots `Array`

A list of the selected slots. Each slot has the following properties:

*   **slot.start**
        - The slot's start date.

*   **slot.end**
        - The slot's end date.

*   **slot.element**
        - The slot's element.

##### e.resources `Object`

The resources for the slot if resource grouping is enabled.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      selectable:true,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      change: function(e) {
        var start = e.start;
        var end = e.end;

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("Selection between {0:g} and {1:g}", start, end));
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_change(e) {
        var start = e.start;
        var end = e.end;

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.format("Selection between {0:g} and {1:g}", start, end));
    }

    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      selectable:true,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("change", scheduler_change);
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I modify request parameters before data is loaded into a Kendo UI Scheduler widget? Configure or handle actions that trigger immediately before the scheduling component loads or binds data from its source, enabling you to modify request parameters, intercept or transform incoming data, display loading animations or indicators, prepare UI elements, update state, or run custom logic prior to the rendering or application of fetched events or appointments. This event activates before data retrieval and binding occur, offering a hook to adjust or inspect data queries, manage asynchronous data flow, and control the scheduler's data processing lifecycle for seamless integration and dynamic updates.
</div>

#### Event Data

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "dataBinding" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      dataBinding: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_dataBinding(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBinding");
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("dataBinding", scheduler_dataBinding);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I execute code after data is loaded in a Kendo UI Scheduler component? Detect when the scheduling component has completed loading or refreshing its data, enabling you to run custom code after data retrieval or view updates, listen for changes in the calendar’s data source, trigger additional data fetches, re-render events or UI elements, respond to data binding completion, and hook into the moment when the scheduler finishes syncing with backend or local datasets to update or manipulate the displayed appointments or events accordingly.
</div>

#### Event Data

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBound");
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("dataBound", scheduler_dataBound);
    </script>

### edit

Fired when the user opens a scheduler event in edit mode by or creates a new event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to customize the edit dialog in Kendo UI Scheduler when creating a new event? Control interactions when opening or creating events in edit mode within the scheduler interface, enabling interception, customization, validation, or modification of event details during editing or creation. Capture edits to existing calendar entries or new event creation actions, manage the edit dialog behavior or data programmatically, respond to user attempts to modify schedule items, override default editing workflows, customize input forms for events, trigger validation logic on event fields, handle event detail adjustments, and implement custom editing interfaces or restrictions within the scheduling component.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is being edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      edit: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Editing", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_edit(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Editing", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("edit", scheduler_edit);
    </script>

### moveStart

Fired when the user starts to drag an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when users start moving events in a Kendo UI Scheduler? Detect the initiation of dragging actions on scheduled items or events to trigger updates in user interface, state management, or custom behaviors when users start moving calendar entries or tasks; capture the moment an event drag operation begins to enable real-time responses, interaction handling, dynamic adjustments, or execution of logic tied to drag-and-drop start within scheduling or calendar components, supporting scenarios such as monitoring drag start, enabling drag-and-drop workflows, and controlling event repositioning interactions.
</div>

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being moved.

##### e.preventDefault `Function`

If invoked prevents the move action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "moveStart" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      moveStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Move Start", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "moveStart" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_moveStart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Move Start", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("moveStart", scheduler_moveStart);
    </script>

### move

Fired when the user is moving an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I track drag-and-drop events in a Kendo UI Scheduler widget? Track and handle user actions that involve dragging, relocating, rescheduling, or moving events within a calendar or scheduling interface, enabling custom reactions to changes in event placement, position adjustments, and drag-and-drop interactions; supports detecting movement start, ongoing drag behaviors, and drop events to trigger updates, validations, or visual feedback during event repositioning workflows in scheduling applications.
</div>

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being moved.

##### e.slot `Object`

The slot over which the event is currently positioned.

###### e.slot.element `jQuery`

The slot's element.

###### e.slot.start `Date`

The slot's start date.

###### e.slot.end `Date`

The slot's end date.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "move" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      move: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Move", e.slot.start);
      }
    });
    </script>

#### Example - subscribe to the "move" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_move(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Move", e.slot.start);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("move", scheduler_move);
    </script>

### moveEnd

Fired when the user stops moving an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
What event is triggered when dragging an event to a new position in Kendo UI Scheduler? Detect and respond to the completion of dragging or repositioning calendar events, capturing when a user finishes moving an event in a scheduler interface to trigger updates like saving changes, syncing with data sources, refreshing displays, handling drag-and-drop completions, or updating event positions dynamically after user interactions, allowing developers to execute logic upon the end of event movement actions within scheduling components.
</div>

#### Event Data

##### e.start `Date`

The start date of the dragged range.

##### e.end `Date`

The end date of the dragged range.

##### e.event `kendo.data.SchedulerEvent`

The event which is being moved.

##### e.slot `Object`

The slot over which the event is currently positioned.

###### e.slot.element `jQuery`

The slot's element.

###### e.slot.start `Date`

The slot's start date.

###### e.slot.end `Date`

The slot's end date.

##### e.preventDefault `Function`

If invoked prevents the move action.

##### e.resources `Object`

The resources for the slot if resource grouping is enabled.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "moveEnd" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      moveEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("MoveEnd", e.slot.start);
      }
    });
    </script>

#### Example - subscribe to the "moveEnd" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_moveEnd(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("MoveEnd", e.slot.start);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("moveEnd", scheduler_moveEnd);
    </script>

### navigate

Fired when the user changes the selected date, selected Scheduler view or switches between show full day and show business hours.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I detect changes in calendar navigation when users move to different dates in a Kendo UI Scheduler? Detect changes in calendar navigation when users move to different dates, switch views, or toggle day display modes by capturing the event triggered on navigation updates. Track user interactions with date selections, view changes between day, week, month, or custom periods, and mode switches like full day or business hours to dynamically update the interface, refresh event listings, filter visible appointments, or synchronize data based on current scheduler context. Enable real-time responses or actions on scheduler navigation changes, such as loading relevant events, adjusting UI components, or logging navigation activity with handlers bound to the scheduler instance context for seamless state management.
</div>

#### Event Data

##### e.action `String`

Name of the action. Possible values are:

* changeView - navigate to different view
* next - navigate to next time period
* previous - navigate to previous time period
* today - select today's date
* changeDate - a date is selected via the Calendar
* changeWorkDay - switch between full day or business hours shown

##### e.date `Date`

Selected date

##### e.view `String`

Name of the view

##### e.preventDefault `Function`

If invoked, prevents the action.

##### e.sender `kendo.ui.Scheduler`

The widget instance, which fired the event.

#### Example - subscribe to the "navigate" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      navigate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("navigate", e.date);
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_navigate(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("navigate", e.date);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("navigate", scheduler_navigate);
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
How to handle pdfExport events in Kendo UI Scheduler? Capture and respond to user actions when exporting scheduler data or calendar views to PDF, detect clicks or triggers on PDF export buttons or toolbar controls, enable custom workflows or logic execution during PDF export initiation, intercept export events to modify UI states or run validation, configure handlers for automated or manual PDF generation requests within scheduling interfaces, manage event listeners that activate upon user export commands, support integration of export-related features such as progress indicators or data transformation during PDF creation from schedule or calendar components.
</div>

#### Event Data

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the scheduler will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "pdfExport" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      pdfExport: function(e) {
      }
    });
    </script>

#### Example - subscribe to the "pdfExport" event after initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      toolbar: ["pdf"],
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("pdfExport", function(e) {
    });
    scheduler.saveAsPDF();
    </script>

### remove

Fired when the user performs "destroy" action.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle event removal in Kendo UI Scheduler? Detect and respond to when a user deletes, removes, or destroys an event or appointment within a scheduling component by listening for removal or destruction triggers; handle update actions such as UI refresh, data synchronization, confirmation dialogs, or backend communication upon event deletion with access to the component context for effective state management and user interaction tracking.
</div>

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being removed.

##### e.preventDefault `Function`

If invoked prevents the remove action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      remove: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Removing", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_remove(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Removing", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("remove", scheduler_remove);
    </script>

### resizeStart

Fired when the user starts to resize an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when a user starts resizing an event in Kendo UI Scheduler? Detect when a user initiates resizing an event in a scheduling interface, enabling you to trigger custom logic at the moment a resize operation begins such as validating changes, updating or preparing the user interface, adjusting state, handling pre-resize conditions, capturing user interaction, or logging activity. This event signals the start of any resize gesture on scheduled items, useful for controlling or intercepting resize behavior, applying constraints, or managing dynamic UI updates related to event duration changes on calendars, timelines, or schedulers within your application.
</div>

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being resized.

##### e.preventDefault `Function`

If invoked prevents the resize action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "resizeStart" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      resizeStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Resize Start", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "resizeStart" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_resizeStart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Resize Start", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("resizeStart", scheduler_resizeStart);
    </script>

### resize

Fired when the user is resizing an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I handle user resize interactions in Kendo UI Scheduler events? Capture and handle user interactions when adjusting the size or duration of calendar or timeline events, enabling dynamic real-time updates, validation, or modification of event details during resize actions. Configure event resize handlers to monitor ongoing resizing, control or restrict changes, update UI elements live, and integrate custom logic that reacts as users stretch or shrink scheduled items. Detect and respond to drag-resize gestures on scheduler events, allowing developers to intercept, modify, or validate changes instantly while maintaining synchronization between event data and the visual interface. Enable precise control over event duration adjustments within scheduling applications by running code during resize interactions to enforce constraints, update backend data, or provide immediate feedback. This functionality supports scenarios such as preventing overlap, extending or shortening events programmatically, and customizing behavior based on user-driven resize operations.
</div>

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being resized.

##### e.slot `Object`

The slot over which the event is resized to.

###### e.slot.element `jQuery`

The slot's element.

###### e.slot.start `Date`

The slot's start date.

###### e.slot.end `Date`

The slot's end date.

##### e.preventDefault `Function`

If invoked prevents the resize action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "resize" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      resize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Resize", e.slot.start);
      }
    });
    </script>

#### Example - subscribe to the "resize" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_resize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Resize", e.slot.start);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("resize", scheduler_resize);
    </script>

### resizeEnd

Fired when the user releases the mouse after resizing an event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I capture when an appointment is finished being resized in a Kendo UI Scheduler? Capture user interaction when an appointment or event resizing operation completes in a scheduling or calendar interface, enabling developers to detect when the user finishes adjusting event duration or size via drag handles, mouse release, or touch gestures, to update data models, save changes to backend systems, refresh or re-render the UI, trigger custom logic after resizing appointments or calendar events, respond to drag-and-drop resize end events, handle modifications to event timing or length, listen for resize completion within scheduling components, and implement dynamic behavior tied to schedule adjustments.
</div>

#### Event Data

##### e.start `Date`

The final start date of the resized task.

##### e.end `Date`

The final end date of the resized task.

##### e.event `kendo.data.SchedulerEvent`

The event which is being resized.

##### e.slot `Object`

The slot over which the event is resized to.

###### e.slot.element `jQuery`

The slot's element.

###### e.slot.start `Date`

The slot's start date.

###### e.slot.end `Date`

The slot's end date.

##### e.preventDefault `Function`

If invoked prevents the resize action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "resizeEnd" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      resizeEnd: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Resize End", e.slot.start);
      }
    });
    </script>

#### Example - subscribe to the "resizeEnd" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_resizeEnd(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Resize End", e.slot.start);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("resizeEnd", scheduler_resizeEnd);
    </script>

### save

Fired when the user saves a scheduler event by clicking the "save" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when a user saves an event in Kendo UI Scheduler? Trigger custom functions or workflows when a calendar or scheduling event is saved by the user, capturing the moment a save action occurs to validate input data, persist modifications, update event sources, or refresh the user interface. Enable handling and intercepting of user-triggered save operations in calendar, timeline, or event scheduling components, allowing control over save workflows, data validation, event updates, and UI changes in response to user interaction or automated processes. Configure listeners or handlers to respond immediately when events are saved, ensuring synchronization between the event storage, user input validation, and interface feedback during event creation or editing.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is saved.

##### e.preventDefault `Function`

If invoked prevents the save action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "save" event during initialization

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      save: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Saving", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_save(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Saving", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("save", scheduler_save);
    </script>
