---
title: Upload Demonstrates General Performance Issues
page_title: Upload Demonstrates General Performance Issues
description: "Learn how to handle the Kendo UI for jQuery Upload if the component demonstrates general performance issues."
slug: upload_general_performance_issues
tags: telerik, progress, kendoui, jquery, upload, demonstrates, general, performance, issues
type: troubleshooting
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The jQuery Upload demonstrates general performance issues.

## Cause 

When working in Opera, the following symptoms of incorrect behavior occur:

* The `success` is fired when the file upload fails.
* The server response cannot be accessed in the `success` event.
* The `success` event fires before the upload is complete.

## Solution

Turn off the Opera Dragonfly debugging tool because it interferes with the upload by firing an extra `Load` event for the `iframe`.

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
