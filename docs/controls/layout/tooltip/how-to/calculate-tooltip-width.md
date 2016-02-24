---
title: Calculate Tooltip Content Width
page_title: Calculate Tooltip Content Width | Kendo UI Tooltip
description: "Learn how to calculate the content width of a Kendo UI Tooltip."
slug: howto_calculatetooltipcontentlength_tooltip
---

# Calculate Tooltip Content Width

By default, if the content is too little, the Tooltip width is going to be reduced, and if the displayed content can fit, the Tooltip width is not going to change. Therefore, in some scenarios this results in a Tooltip that is narrower than desired.

The example below demonstrates how to calculate the width of a Kendo UI Tooltip on each opening and allow for a greater flexibility.

###### Example

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

## See Also

Other articles on Kendo UI Tooltip:

* [Content Property of the Tooltip](/api/javascript/ui/tooltip#configuration-content)
* [Tooltip JavaScript API Reference](/api/javascript/ui/tooltip)
* [How to Show Only If Text Exceeds Certain Length]({% slug howto_showonlyiftextexceedscertainlength_tooltip %})
* [How to Show Only If Text Overflows with Ellipsis]({% slug howto_showonlyiftextoverflowswithellipsis_tooltip %})
