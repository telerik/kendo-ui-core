---
title: Scheduler Sends Multiple Create, Destroy, or Update Requests to the Remote Service
page_title: Multiple Scheduler Create, Destroy, or Update Requests Are Sent to the Remote Service
description: "Learn how to handle the Kendo UI for jQuery Scheduler when the component sends multiple, create, destroy, or update requests to the remote service."
slug: scheduler_multiple_requests_remote_service
tags: telerik, progress, kendoui, scheduler, multiple, create, destroy, update, requests, to, remote, service
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

While working with the jQuery Scheduler, a create/destroy/update request is sent multiple times to the remote service. 

## Cause 

In this case the server response of the create/destroy/update action is interpreted as an error by the `dataSource` and the [`error` event](/api/framework/datasource#events-error) of the dataSource is triggered. When such a request fails, the Scheduler `dataSource` will try to get a valid server response again on a subsequent dataSource sync until the request succeeds.

## Solution

Update the remote service in use, so it can return valid responses. Make sure the server response is formatted in the same way as the `read` action response:

1. The `create` request&mdash;The Scheduler expects the created record to be returned to the client side with its [`id` field](/api/javascript/data/schedulerevent#fields-id) set to a unique value.
1. The `update/destroy` request&mdash;The Scheduler expects the server to return a valid response, so it can signify success. Such a response, for example, is the updated/deleted event formatted in the same way as the `read` action `[{id: 23, title: "some title", start:"2015-10-14T15:00:00.000Z", end:"2015-10-14T17:00:00.000Z" }]`.

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
