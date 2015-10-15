---
title: Troubleshooting
page_title: Kendo UI Scheduler Troubleshooting Guide
description: Learn how to use Kendo UI jQuery Scheduler component and easily handle most common issues.
---

# Scheduler Troubleshooting

## Created/Deleted/Updated events are send multiple times to the remote service
In this case the server response of the create/destroy/update action is interpreted as an error by the dataSource and the [error event](/api/framework/datasource#events-error) of the dataSource is triggered. When such request fails the scheduler dataSource will try to sync it again on next user triggered remote action until the request succeeds which is the reason for current behavior. 

###Solution: update the remote service in use to return valid responses
Make sure the server is returning valid response for these actions which is formatted the same way as the "read" action response:

1) **create** request - the scheduler expects the created record to be returned back to the client side with it's [id field](/api/javascript/data/schedulerevent#fields-id) set to **unique value**.

1) **update/destroy** request - the scheduler expects valid response to be returned from the server to signify success. Such response could be the updated/deleted event formatted the same way as the "read" action:

    [{id: 23, title: "some title", start:"2015-10-14T15:00:00.000Z", end:"2015-10-14T17:00:00.000Z" }]

## Canceling changes causes other events to disappear
This behavior can be experienced when the events that disappear does not have valid unique [id field](/api/javascript/data/schedulerevent#fields-id) set.

###Solution: Update the remote service in use to return  valid responses
Make sure the server is returning valid response for "create" and "read" actions and all events have valid unique value set in the [id field](/api/javascript/data/schedulerevent#fields-id).


## Events created are offset after the Create/Update
This behavior is related to either the [timezone](/api/javascript/ui/scheduler#configuration-timezone) option of the Scheduler is not set or the remote service is not keeping the dates correctly.

### Solution: set the timezone option of the Scheduler and make sure the dates are saved correctly on the remote service in UTC timezone
For more information about how to set this option and how to configure the remote service in use to work correctly with received dates you can check the [Timezones help article](/web/scheduler/timezones).

## Scheduler bind to remote data is not populating
There are various reasons which may cause this. Follow the troubleshooting instructions.

### Remote binding troubleshooting
1. Use your browser's developer console to check for any JavaScript errors. In most browsers pressing **F12** will pop up the developer console. Address all JavaScript errors.

2. Check the "Network" (or "Net" in Firebug) tab of the browser developer console. Look for a failed HTTP request for the [transport operations](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport) configured via the [dataSource](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#configuration-dataSource) scheduler option.
    - HTTP status code [401](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that authentication is required and has failed or not yet been provided.
    - HTTP status code [403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that request is not authorized. Perhaps the current user does not have
    the required permissions.
    - HTTP status code [404](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that requested URL cannot be found.
    Check if the controller and action names are spelled correctly.
    - HTTP status code [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while process the request.

3. Check if the server is returning the response in the correct data type format - more information is available in the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic. 
4. Check if the models returned from the sever are matching the required [kendo.data.SchedulerEvent](/api/javascript/data/schedulerevent) fields. For more information you can check the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.
