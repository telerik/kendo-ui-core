---
title: Common Issues
page_title: Common Issues | Kendo UI Scheduler
description: "Learn how to deal with issues you may encounter while using the Kendo UI Scheduler widget."
previous_url: /web/scheduler/troubleshooting
slug: troubleshooting_scheduler_widget
position: 1
---

# Common Issues

This page provides solutions for common issues you may encounter while working with the Kendo UI Scheduler widget.

## General

### Events Are Not Rendered

If the remote data request is successful and the Scheduler is databound, but no events are rendered, this indicates that the date format of the events is not correct, and the browser is unable to create JavaScript Date objects from the date strings. As a result, the events in the Scheduler dataSource have `null` values for their `start` and `end` properties, and the events are not rendered.

To handle this issue, use the recommended date format for sending and receiving Scheduler event dates, which is [ISO 8601 with a Z zone designator (UTC date)]({% slug timezones_kendoui_scheduler_widget %}).

## CRUD Data Operations

### Create/Destroy/Update Request Is Sent Multiple Times to the Remote Service

In this case the server response of the create/destroy/update action is interpreted as an error by the `dataSource` and the [`error` event](/api/framework/datasource#events-error) of the dataSource is triggered. When such a request fails, the Scheduler `dataSource` will try to get a valid server response again on a subsequent dataSource sync until the request succeeds.

**Solution**

Update the remote service in use, so it can return valid responses. Make sure the server response is formatted in the same way as the `read` action response:

1. The `create` request&mdash;The Scheduler expects the created record to be returned to the client side with its [`id` field](/api/javascript/data/schedulerevent#fields-id) set to a unique value.

2. The `update/destroy` request&mdash;The Scheduler expects the server to return a valid response, so it can signify success. Such a response, for example, is the updated/deleted event formatted in the same way as the `read` action `[{id: 23, title: "some title", start:"2015-10-14T15:00:00.000Z", end:"2015-10-14T17:00:00.000Z" }]`.

### Created Events Are Offset after Create/Update Request

This behavior may be caused if the Scheduler [`timezone`](/api/javascript/ui/scheduler#configuration-timezone) option is not set, or if the remote service does not keep dates in the correct format.

**Solution**

Set the timezone option of the Scheduler and make sure the dates on the remote service are saved in UTC. For more information about how to do this see the [Timezones help article](/web/scheduler/timezones).

## Performance Issues

### When You Cancel Changes, Other Events Disappear

It is possible to experience such behavior if the [id fields](/api/javascript/data/schedulerevent#fields-id) of the other events are not set to valid and unique values.

### Editing Event Causes All Initial Events to be Sent to the <code>Create</code> Action

This behavior can be experienced if the [id fields](/api/javascript/data/schedulerevent#fields-id) of all events are not set to valid and unique values during initial read.

### Remote Data Bound Scheduler Does Not Populate

Such behavior may be caused by various reasons. Follow the instructions below to solve this issue:

**Step 1** Use your browser developer console and check for JavaScript errors. Pressing the `F12` functional key is the shortcut for most browsers to display the console. Now you can easily address all JavaScript errors.

**Step 2** Check the **Network** (or **Net** in Firebug) tab of the browser developer console. Look for a failed HTTP request for the [transport operations](/api/javascript/data/datasource#configuration-transport) configured via the [dataSource](/api/javascript/ui/scheduler#configuration-dataSource) Scheduler option.

* HTTP status code [401](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that an authentication is required and has failed, or not is not provided yet.
* HTTP status code [403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that a request is not authorized. It is possible that the current user does not have the required permissions.
* HTTP status code [404](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
* HTTP status code [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request.

**Step 3** Check if the server response is in the correct data type format. For more information see the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.

**Step 4** Check if the models returned from the sever match the required [kendo.data.SchedulerEvent](/api/javascript/data/schedulerevent) fields. For more information check the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.

## Navigation

### Widget Jumps on Focus

When widget navigation is enabled, the widget wrapper becomes a focusable element. On click, the browser focuses it and preforms the so called scroll-into-view action. If the widget exceeds the height/width of the view-port, then it scrolls the page automatically. The goal is to position the focusable element at the top left corner of the view-port. During this process, actions like `double click`, `drag` or `resize` would not be available due to the movement of the page.

> **Important**
>
> The page re-positioning is a default browser behavior, which cannot be prevented nor modified.

To avoid this behavior, choose either of the available options:
* [Disable widget's navigation](/api/javascript/ui/scheduler#configuration-selectable), if it is not needed in your business case.
* [Size the widget to the view-port dimensions]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %}).

## See Also

Other articles on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [Resources]({% slug resources_kendoui_scheduler_widget %})
* [Timezones]({% slug timezones_kendoui_scheduler_widget %})
* [Overview of the Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
