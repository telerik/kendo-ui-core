---
title: Widget Object Is Undefined after Loading a Page through AJAX
page_title: Widget Object Is Undefined after Loading a Page through AJAX
description: "Learn how to handle the error that the widget object is undefined after loading a page with AJAX in Kendo UI for jQuery."
slug: widget_object_udefined_after_loading_page_ajax
tags: telerik, kendoui, jquery, troubleshooting, error, widget, object, undefined, afetr, loading, page, with, ajax 
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

The widget object is undefined after loading a page with AJAX.

## Cause
 
This issue is usually caused when the page loaded via AJAX contains a script reference to jQuery. When jQuery is re-initialized, all jQuery-based data attributes are cleared, including the `data` (`kendoWidget`) attribute that holds the Kendo UI widget object.

## Solution

Load a partial HTML fragment that does not contain any unneeded jQuery references, or use an `iframe` to load the complete page.

The example below demonstrates a test issue.

    $("#dialog").kendoWinodow({
        // loads complete page
        content: "/foo"
    });

The example below demonstrates the solution of the test issue above.

    $("#dialog").kendoWindow({
        // load complete page...
        content: "/foo",
        // ... and show it in an iframe
        iframe: true
    });

    // or

    $("#dialog").kendoWinodow({
         // load partial page, without jQuery reference
        content: "/foo"
    });
