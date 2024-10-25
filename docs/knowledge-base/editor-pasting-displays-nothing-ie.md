---
title: Pasting in the Editor Display Nothing in IE
page_title: Pasting in the Editor Display Nothing in Internet Explorer
description: "Learn how to handle the Kendo UI for jQuery Editor when pasting displays nothing in Internet Explorer."
previous_url: /controls/editors/editor/troubleshooting/troubleshooting, /controls/editors/editor/troubleshooting
slug: troubleshooting_editor_widget
tags: telerik, progress, kendoui, jquery, editor, pasting, produces, displays, nothing, internet, explorer, ie
type: troubleshooting
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

Pasting in the jQuery Editor displays nothing in Internet Explorer.

## Cause 

Pasting in the Editor requires permission to access **Clipboard** data.

## Solution 

Users with strict security settings might be required to apply either of the following approaches:
* Add the site in the trusted site zone.
* Adjust their Internet options so that the **Allow Programmatic Clipboard Access** setting is set to either **Allowed** or **Prompt**.

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
