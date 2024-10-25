---
title: Asynchronous Uploads Randomly Fail with the Upload
page_title: Asynchronous Uploads Randomly Fail with the Upload
description: "Learn how to handle the Kendo UI for jQuery Upload if the asynchronous uploads fail randomly."
slug: upload_asynch_uploads_fail_randomly
tags: telerik, progress, kendoui, jquery, upload, async, uploads, fail, randomly
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

Asynchronous uploads with the jQuery Upload randomly fail.

## Cause

When working in Internet Explorer version 10 or 11 with Windows authentication, the upload freezes indefinitely or, if a 401 challenge is received on the HTTP POST, the upload times out.

## Solution

For Internet Explorer 10, see [KB2980019](http://support.microsoft.com/kb/2980019). As of November 6, 2014, no official fix for Internet Explorer version 11 is available. For more information on this issue, refer to [Bug ID 819941](https://connect.microsoft.com/IE/feedback/details/819941/file-upload-stop-working-on-ie-with-windows-authentication).

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
