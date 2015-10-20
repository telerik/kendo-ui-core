---
title: Troubleshooting
page_title: Kendo UI Scheduler Troubleshooting Guide
description: Learn how to use Kendo UI jQuery Scheduler component and easily handle most common issues.
---

# Scheduler Troubleshooting

## Create/Destroy/Update Request Is Sent Multiple Times to the Remote Service

In this case the server response of the create/destroy/update action is interpreted as an error by the dataSource and the [error event](/api/framework/datasource#events-error) of the dataSource is triggered. When such a request fails, the Scheduler dataSource will try to get a valid server response again on a subsequent dataSource sync until the request succeeds. 

**Solution**: Update the remote service in use, so it can return valid responses. Make sure the server response is formatted in the same way as the **read** action response:

1. **create** request - the Scheduler expects the created record to be returned to the client side with its [id field](/api/javascript/data/schedulerevent#fields-id) set to a **unique value**.

2. **update/destroy** request - the Scheduler expects the server to return a valid response, so it can signify success. Such a response, for example, is the updated/deleted event formatted in the same way as the **read** action:

    [{id: 23, title: "some title", start:"2015-10-14T15:00:00.000Z", end:"2015-10-14T17:00:00.000Z" }]

## When You Cancel Changes Other Events Disappear
It is possible to experience such behavior if the [id fields](/api/javascript/data/schedulerevent#fields-id) of the other events are not set to valid and unique values. 

## Editing event cause all initial events to sent to the Create action
This behavior can be experienced if the [id fields](/api/javascript/data/schedulerevent#fields-id) of all events are not set to valid and unique values during initial read. 

## Created Events Are Offset after Create/Update Request
This behavior may be caused if the Scheduler [timezone](/api/javascript/ui/scheduler#configuration-timezone) option is not set, or if the remote service does not keep dates in the correct format.

**Solution**: Set the timezone option of the Scheduler and make sure the dates on the remote service are saved in UTC. For more information about how to do this see the [Timezones help article](/web/scheduler/timezones).

## Remote Data Bound Scheduler Does Not Populate
Such behavior may be caused by various reasons. Follow the instructions below to solve this issue:

1. Use your browser developer console and check for JavaScript errors. Pressing the **F12** functional key is the shortcut for most browsers to display the console. Now you can easily address all JavaScript errors.

2. Check the **Network** (or **Net** in Firebug) tab of the browser developer console. Look for a failed HTTP request for the [transport operations](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport) configured via the [dataSource](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#configuration-dataSource) scheduler option.
    - HTTP status code [401](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that an authentication is required and has failed, or not is not provided yet.
    - HTTP status code [403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that a request is not authorized. It is possible that the current user does not have
    the required permissions.
    - HTTP status code [404](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
    - HTTP status code [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request.

3. Check if the server response is in the correct data type format. For more information see the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic. 

4. Check if the models returned from the sever match the required [kendo.data.SchedulerEvent](/api/javascript/data/schedulerevent) fields. For more information check the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.