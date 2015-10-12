---
title: Calculate Tooltip content width
page_title: Calculate Tooltip content width
description: Calculate Tooltip content width
---

# Calculate Tooltip content width

By default, the tooltip width will be reduced, if the content is too little, and also, the tooltip width not change if the displayed content can fit.
In some scenarios this can cause the tooltip to be narrower than desired.
The following example demonstrates how to calculate the Tooltip width on each opening to allow greater flexibility.

Relevant resources:

* [api/javascript/ui/tooltip#configuration-content](content property)

#### Example:

```html
    <style>
        #table {
            width: 36em;
            table-layout: fixed;
            border-spacing: 0;
            border-collapse: collapse;
        }
        
        #table td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid #ccc;
            padding: .3em .6em;
        }
    </style>
    
    <p>Hover the table cells from the second column. Tooltips with variable width will appear.</p>
    
    <table id="table">
        <colgroup><col style="width:16em"><col></colgroup>
        <tbody>
            <tr><td>table cell with no tooltip</td><td>Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh.</td></tr>
            <tr><td>table cell with no tooltip</td><td>Lorem ipsum.</td></tr>
            <tr><td>table cell with no tooltip</td><td>Duis ut nulla eget lectus posuere tempor. </td></tr>
        </tbody>
    </table>
    
    <script>
      $("#table").kendoTooltip({
        filter: "td + td",
        position: "left",
        content: function (e) {
            var text = $(e.target).text();
            return '<div style="width: ' + text.length * .6 + 'em; max-width: 14em">' + text + '</div>';
        }
      })
    </script>
```