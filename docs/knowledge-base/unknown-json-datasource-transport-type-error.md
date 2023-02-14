---
title: Unknown JSON DataSource Transport Type Warning Occurs
page_title: Unknown JSON DataSource Transport Type Warning Occurs
description: "Learn how to handle the warning that an unknown JSON DataSource transport type occurs when working with Kendo UI for jQuery."
slug: unknown_json_datasource_transport_type_error
tags: telerik, kendoui, jquery, troubleshooting, unknown, json, datasource, transport, type, warning, occurs
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

A warning of an unknown JSON DataSource transport type occurs. 

## Cause

The possible causes of the issue may be either of the following:

* Invalid Kendo UI DataSource [`type`](/api/javascript/data/datasource/configuration/type) configuration is set. For example:

  ```
  dataSource: {
    type: "json"
  }
  ```

* A JavaScript file is missing when using a DataSource type that is not included in `kendo.all.min.js`. For example, `aspnetmvc-ajax`, `jsdo`, and others. Specifically, `json` is not a valid DataSource `type` and it does not require a separate JavaScript file.

## Error Message 

`Unknown DataSource transport type json`

## Solution

Use a valid `type` value, or remove the `type` property, or add the corresponding missing file&mdash;for example, `kendo.aspnetmvc.min.js` when using the Kendo UI MVC wrappers.

Note that the [dataSource `type`](/api/javascript/data/datasource/configuration/type) differs from the [`type` of the transport actions](/api/javascript/data/datasource/configuration/transport.read.type).
