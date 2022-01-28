---
title: Troubleshooting
page_title: jQuery Scheduler Documentation | Troubleshooting
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to deal with issues you may encounter while using the widget."
previous_url: /web/scheduler/troubleshooting, /controls/scheduling/scheduler/troubleshoot/troubleshooting
slug: troubleshooting_scheduler_widget
position: 60
---

# Troubleshooting

This article provides solutions for issues you might encounter while working with the Kendo UI Scheduler widget.

## Events are not rendered

If the remote data request is successful and the Scheduler is databound, but no events are rendered, this indicates that the date format of the events is not correct, and the browser is unable to create JavaScript Date objects from the date strings. As a result, the events in the Scheduler dataSource have `null` values for their `start` and `end` properties, and the events are not rendered.

**Solution** Use the recommended date format for sending and receiving Scheduler event dates, which is [ISO 8601 with a Z zone designator (UTC date)]({% slug timezones_kendoui_scheduler_widget %}).

## A create/destroy/update request is sent multiple times to the remote service

In this case the server response of the create/destroy/update action is interpreted as an error by the `dataSource` and the [`error` event](/api/framework/datasource#events-error) of the dataSource is triggered. When such a request fails, the Scheduler `dataSource` will try to get a valid server response again on a subsequent dataSource sync until the request succeeds.

**Solution** Update the remote service in use, so it can return valid responses. Make sure the server response is formatted in the same way as the `read` action response:

1. The `create` request&mdash;The Scheduler expects the created record to be returned to the client side with its [`id` field](/api/javascript/data/schedulerevent#fields-id) set to a unique value.
1. The `update/destroy` request&mdash;The Scheduler expects the server to return a valid response, so it can signify success. Such a response, for example, is the updated/deleted event formatted in the same way as the `read` action `[{id: 23, title: "some title", start:"2015-10-14T15:00:00.000Z", end:"2015-10-14T17:00:00.000Z" }]`.

## Created events are offset after a create/update request

This behavior may be caused if the Scheduler [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is not set, or if the remote service does not keep dates in the correct format.

**Solution** Set the `timezone` option of the Scheduler and make sure the dates on the remote service are saved in UTC. For more information about how to do this see the [Timezones help article](/web/scheduler/timezones).

## The defined timezone is not applied

In this case, the specified [`timezone`](/api/javascript/ui/scheduler/configuration/timezone) option is not recognized by the widget and the events are visualized with a specific time offset. This could happen when the `SchedulerDataSource` instance is created separately, outside the Scheduler.

**Solution** Set directly the [`schema.timezone`](/api/javascript/data/schedulerdatasource/configuration/schema.timezone) option of the `SchedulerDataSource` instance to the desired value.

## When you cancel changes, other events disappear

It is possible to experience such behavior if the [id fields](/api/javascript/data/schedulerevent#fields-id) of the other events are not set to valid and unique values.

## Editing an event causes all initial events to be sent to the create action

This behavior can be experienced if the [id fields](/api/javascript/data/schedulerevent#fields-id) of all events are not set to valid and unique values during initial read.

## A remotely data-bound Scheduler does not populate

Such behavior may be caused by various reasons.

**Solution**

1. Use your browser developer console and check for JavaScript errors. Pressing the `F12` functional key is the shortcut for most browsers to display the console. Now you can easily address all JavaScript errors.
1. Check the **Network** (or **Net** in Firebug) tab of the browser developer console. Look for a failed HTTP request for the [transport operations](/api/javascript/data/datasource/configuration/transport) configured via the [dataSource](/api/javascript/ui/scheduler/configuration/datasource) Scheduler option.

    * HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that an authentication is required and has failed, or not is not provided yet.
    * HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that a request is not authorized. It is possible that the current user does not have the required permissions.
    * HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
    * HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request.

1. Check if the server response is in the correct data type format. For more information see the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.
1. Check if the models returned from the sever match the required [kendo.data.SchedulerEvent](/api/javascript/data/schedulerevent) fields. For more information check the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.

## The widget jumps on focus

When widget navigation is enabled, the widget wrapper becomes a focusable element. On click, the browser focuses it and preforms the so called scroll-into-view action. If the widget exceeds the height/width of the view-port, then it scrolls the page automatically. The goal is to position the focusable element at the top left corner of the view-port. During this process, actions like `double click`, `drag` or `resize` would not be available due to the movement of the page.

> The page re-positioning is a default browser behavior, which cannot be prevented nor modified.

To avoid this behavior, choose either of the available options:
* [Disable widget navigation](/api/javascript/ui/scheduler/configuration/selectable) if it is not needed in your business case.
* [Size the widget to the view-port dimensions]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %}).

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
