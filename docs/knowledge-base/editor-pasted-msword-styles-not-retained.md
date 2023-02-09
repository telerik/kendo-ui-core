---
title: Pasted MS Word Styles in the Editor Are Not Retained
page_title: Pasted Editor MS Word Styles Are Not Retained
description: "Learn how to handle the Kendo UI for jQuery Editor when the pasted MS Word styles are not retained."
slug: editor_msword_styles_not_retained
tags: telerik, progress, kendoui, jquery, editor, pasted, msword, styles, not, retained 
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

The pasted MS Word styles in the jQuery Editor are not retained.

## Cause 

By design, the Editor strives to output a clean and XHTML-compatible markup. That is why, the widget cleans up invalid styles set by Microsoft Word and removes the most presentational styles. Such styles include the colors applied by the current theme and the default MS Word font and size.

## Solution 

Ideally, the output of the Editor has to be styled via a stylesheet provided through the [stylesheets configuration option](/api/javascript/ui/editor/configuration/stylesheets). It allows for the whole pasted content to be consistently styled across your site.

If wrong pasting removes semantics or actual content along with the styles:

1. Submit a bug report.
1. Attach an MS Word document that reproduces the issue.

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
