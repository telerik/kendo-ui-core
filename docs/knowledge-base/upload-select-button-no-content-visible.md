---
title: Upload Select Button Is Partially Visible with No Text
page_title: Upload Select Button Is Partially Visible and Has No Text
description: "Learn how to handle the Kendo UI for jQuery Upload if the Select button is partially visible and doesn't display text."
previous_url: /controls/editors/upload/troubleshoot/troubleshooting, /controls/editors/upload/troubleshooting
slug: troubleshooting_upload_widget
tags: telerik, progress, kendoui, jquery, upload, select, button, partially, visible, has, no, text
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

The **Select** button of the jQuery Upload is partially visible and doesn't display any content.

## Cause 

The [Kendo UI Upload](https://demos.telerik.com/kendo-ui/upload/index) uses an opacity filter to overlay the default **Select** button of the file input. This filter is implemented as an ActiveX control in Internet Explorer version 8 and earlier. As such, it is subject to security settings and can be disabled. The following image demonstrates an affected component.

## Solution

To handle this issue in Internet Explorer, set **Internet Options** > **Security** > **Internet** (or Local intranet) > **Custom Level** > **Binary and script behaviors** to **Enable**.

![Kendo UI for jQuery Upload Behaviors](upload-ie-script-behaviors.png)

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
