---
title: Upload Indicator Incorrectly Renders the Progress
page_title: Upload Progress Indicator Incorrectly Renders the Progress of the Upload
description: "Learn how to handle the Kendo UI for jQuery Upload if the progress indicator renders the upload progress incorrectly."
slug: upload_progress_indicator_incorrectly
tags: telerik, progress, kendoui, jquery, upload, progress, indicator, incorrectly, renders  
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

The jQuery Upload progress indicator incorrectly renders the progress of the upload.

## Cause

When working in Internet Explorer version 10 or 11 with Windows authentication, the upload progress indicator can go over 100% or freeze but does not indicate that the request is complete. The issue is not related to Kendo UI and is caused by a bug in Internet Explorer which can be observed with any `FormData XMLHttpRequest`. The problem seems to occur only when accessing a web server on `localhost`.

## Solution

Deploy the application on a remote web server or disable asynchronous uploads.

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
