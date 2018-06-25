---
title: Example of fontName with styles in Editor
description: How to style the fontNames in Editor
type: how-to
page_title: Style the FontNames | Kendo UI Editor 
slug: editor-style-fontnames-dropdown
tags: editor
ticketid: 1171186  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How to style the names of each font in Editor fontNames dropdown?

## Solution

1. Get a reference to the fontNames ComboBox.
1. Change the styles using a template and setOptions method.

```html
<textarea id="editor" rows="10" cols="30" style="width:100%;height:200px">
    Sample text
</textarea>

<script>
    $("#editor").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
          {
            name: "fontName",
            items: [
                { text: "Andale Mono", value: "Andale Mono"},
                { text: "Arial", value: "Arial"},
                { text: "Arial Black", value: "Arial Black" },
                { text: "Book Antiqua", value: "Book Antiqua" },
                { text: "Comic Sans MS", value: "Comic Sans MS" },
                { text: "Courier New", value: "Courier New" },
                { text: "Georgia", value: "Georgia" },
                { text: "Helvetica", value: "Helvetica" },
                { text: "Impact", value: "Impact" },
                { text: "Symbol", value: "Symbol" },
                { text: "Tahoma", value: "Tahoma" },
                { text: "Terminal", value: "Terminal" },
                { text: "Times New Roman", value: "Times New Roman" },
                { text: "Trebuchet MS", value: "Trebuchet MS" },
                { text: "Verdana", value: "Verdana" },
                { text: "Webdings", value: "Webdings" },
                { text: "Wingdings", value: "Wingdings" }
            ]
        }
            
        ]
    });
  
  	var cb = $("select.k-fontName").data("kendoComboBox");      	
  	cb.setOptions({
    	template: "<span style='font-family: #: text #'>#: text #</span>"
    });
</script>
```
