---
title: Incorrect Appearance or Errors Occur in Hidden Widgets 
page_title: Incorrect Appearance or Errors Occur in Hidden Widgets
description: "Learn how to handle the issue that hidden Kendo UI for jQuery widgets are rendered incorrectly or raise errors."
slug: hidden_widgets_appearance_error_issues
tags: telerik, kendoui, jquery, troubleshooting, hidden, widget, incorrect, appearance, error, issue 
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

Hidden Kendo UI for jQuery widgets are rendered incorrectly or raise errors.

## Cause

If you display widgets that have been in an initially hidden container, call their [`resize()`](/api/javascript/ui/widget/methods/resize) method after you show them. Initializing widgets on elements with the `style="display: none;"` configuration might cause errors, such as inability to calculate dimensions and positions or even throw errors. The reason for this behavior is that such calculations are not available for elements that are not rendered by the browser.

## Solution

Usually, delaying the widget initialization until after it is displayed resolves the issue and improves the page performance.

