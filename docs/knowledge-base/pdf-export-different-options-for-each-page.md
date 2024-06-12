---
title: PDF Export with Different Options
description: Learn how to export some pages landscape and others portrait by using the Kendo UI Drawing API.
type: how-to
page_title: Set different PDF options for each page - Kendo UI Drawing Library
slug: pdf-export-different-options-for-each-page
tags: pdf, export, different, options, drawing, api, pages, landscape, portrait, some, other
res_type: kb
component: drawing-api
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drawing API</td>
 </tr>
 <tr>
  <td>Created with Version</td>
  <td>2024.2.514</td>
 </tr>
</table>

## Description

How can I export some pages with landscape orientation and others with portrait orientation?

## Solution

1. Create a `new kendo.drawing.Group()`
1. Call the `drawDOM()` method and chain the other pages export
1. Append the resulting group to the root group

```dojo
	<div id="page1" class="new-page">Page 1</div> 
    <div id="page2" class="new-page">Page 2</div> 
    <script>
      	var root = new kendo.drawing.Group();
      	kendo.drawing.drawDOM('#page1', {
      	  paperSize: 'A4',
      	  margin: '1cm'
      	}).then(function (group) {
      	  root.append(group);

      	  kendo.drawing.drawDOM('#page2', {
      	    paperSize: 'A4',
      	    margin: '1cm',
      	    landscape: true
      	  }).then(function (group) {
      	    root.append(group);

      	    root.options.set("pdf", {
      	      multiPage: 'true'
      	    });

      	    kendo.drawing.pdf.saveAs(root, "test.pdf");
      	  });
      	});
    </script>
```

>The PDF standard fonts cover only the basic ASCII character set. For more information refer to the [`Unicode and Embedded Fonts`](/framework/pdf/embedded-fonts) article.
