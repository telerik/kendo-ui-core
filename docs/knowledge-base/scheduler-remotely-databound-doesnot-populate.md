---
title: Remotely Data-Bound Scheduler Does Not Populate 
page_title: Remotely Data-Bound Scheduler Does Not Populate 
description: "Learn how to handle the Kendo UI for jQuery Scheduler when a remotely data-bound component does not populate."
slug: scheduler_remotely_databoud_doesnot_populate
tags: telerik, progress, kendoui, scheduler, remotely, databound, does, not, populate
type: troubleshooting
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

A remotely data-bound jQuery Scheduler does not populate.

## Cause 

Such behavior may be caused by various reasons.

## Solution

To diagnose the cause of the issue, open your browser developer console and check for JavaScript errors. Pressing the `F12` functional key is the shortcut for most browsers to display the console. Now you can easily address all JavaScript errors:

* Check the **Network** (or **Net** in Firebug) tab of the browser developer console. Look for a failed HTTP request for the [transport operations](/api/javascript/data/datasource/configuration/transport) configured via the [dataSource](/api/javascript/ui/scheduler/configuration/datasource) Scheduler option.

  * HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that an authentication is required and has failed, or not is not provided yet.
  * HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that a request is not authorized. It is possible that the current user does not have the required permissions.
  * HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
  * HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request.

* Check if the server response is in the correct data type format. For more information see the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.
* Check if the models returned from the sever match the required [kendo.data.SchedulerEvent](/api/javascript/data/schedulerevent) fields. For more information check the [Binding to remote service](/web/scheduler/overview#binding-to-remote-service) help topic.


## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
