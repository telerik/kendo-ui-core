---
title: Third-Party Modal Popups Prevent Access to Kendo UI Widgets
page_title: Third-Party Modal Popups Prevent Access to Kendo UI Widgets
description: "Learn how to handle the issue that third-party modal popups prevent the access to Kendo UI for jQuery widgets."
slug: third_party_modal_popups_no_access_to_widgets
tags: telerik, kendoui, jquery, troubleshooting, third, party, modal, popups, prevent, access, to, widgets
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

Third-party modal popups prevent the access to Kendo UI for jQuery widgets.

## Cause

Some third-party modal popups prevent access to focusable elements, which are rendered outside the modal popup. Such widgets include the Bootstrap modal dialog, the jQuery UI modal dialog, and possibly others. 

The Kendo UI widgets, which are affected by this behavior are all widgets, which render their own detached popups, for example, AutoComplete, ColorPicker, ComboBox, DropDownList, DateTimePicker, Editor, Grid, and MultiSelect. The popups of these Kendo UI widgets are rendered as children of the `<body>` and as a result, the third-party modal popup will prevent the access to them.

## Solution

To handle the issue, use either of the following approaches:

* Disable the modality of the modal popup, so that elements outside it can be focused.
* Use a [modal](/api/javascript/ui/window/configuration/modal) [Kendo UI Window]({% slug overview_kendoui_window_widget %}) instead of a third-party popup.

