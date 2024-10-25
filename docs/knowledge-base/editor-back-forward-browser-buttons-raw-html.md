---
title: Back and Forward Browser Buttons Display Raw HTML in the Editor
page_title: Back and Forward Browser Buttons Display Raw HTML in the Editor
description: "Learn how to handle the Kendo UI for jQuery Editor when the Back and Forward browser button render raw HTML."
slug: editor_back_forward_buttons_raw_html
tags: telerik, progress, kendoui, jquery, editor, back, forward, buttons, display, raw, html
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

The **Back** and **Forward** browser buttons display raw HTML in the jQuery Editor.

## Cause

By default, the Editor stores its value encoded. When the page is retrieved from the `bfcache` (back-forward cache), the `textarea` value is persisted as encoded and the Editor encodes it again. This process can be easily observed if you navigate several times back and forth. On each navigation, the Editor value is encoded once more.

## Solution

Set the [`encoded`](/api/javascript/ui/editor/configuration/encoded) property to `false`. The value of the Editor is expected to be posted unencoded to the server.

If you are using ASP.NET, make sure that you either disable the ASP.NET security validation or set the `AllowHtml` attribute on the model field that will receive the HTML string. For more information, refer to the documentation on [requesting validation in ASP.NET](http://blogs.learnnowonline.com/blog/bid/199703/ASP-NET-MVC-Request-Validation-Protection-AllowHtml-Attribute).

Another option is to enable the [inline Editor mode](/web/editor/overview#classic-mode-vs-inline-mode) which does not use an `iframe` and a `textarea`. In this case, however, you have to [manually submit the value of the Editor]({% slug troubleshooting_editor_widget %}#inline-editor-value-is-not-posted-to-the-server).

The back-forward cache of the browser can be disabled by attaching a `window.unload` handler, as demonstrated in the following example.

    $(window).unload(function() {
      // nothing required here
    });

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
