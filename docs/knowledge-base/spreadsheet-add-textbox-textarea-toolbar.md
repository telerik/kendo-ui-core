---
title: Adding a TextBox or TextArea to the Kendo UI Spreadsheet Toolbar
description: Learn how to add an interactive TextBox or TextArea to the toolbar of a Kendo UI Spreadsheet.
type: how-to
page_title: How to Add a TextBox or TextArea to the Kendo UI Spreadsheet Toolbar
slug: spreadsheet-add-textbox-textarea-toolbar
tags: kendo-ui, spreadsheet, toolbar, textbox, textarea
res_type: kb
components: ["textbox"]
---

## Environment

| Product | Version |
| --- | --- |
| Spreadsheet for Progress® Kendo UI® | 2023.3.1114 |

## Description

I want to add an interactive TextBox or TextArea to the toolbar of a Kendo UI Spreadsheet. Is there a way to do this?

## Solution

To add a TextBox or TextArea to the Kendo UI Spreadsheet's toolbar, you can follow these steps:

1. Initialize the Spreadsheet component with a [custom template for the toolbar](/api/javascript/ui/toolbar/configuration/items.template).
2. Add a `div` element with an `id` for the TextBox and [initialize it](/intro/widget-basics/jquery-initialization?#getting-started) as a [Kendo UI TextBox](https://demos.telerik.com/kendo-ui/textbox/index).
3. Add a `textArea` element with an `id` for the TextArea and  [initialize it](/intro/widget-basics/jquery-initialization?#getting-started) as a [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index).

Here is an example of how to achieve this using JavaScript:

```javascript
$("#spreadsheet").kendoSpreadsheet({
  toolbar: {
    home: [
      {
        template: "<input id='textBoxSpreadSheet' />"
      },
      {
        template: "<textArea id='textareaSpreadSheet' />"
      },
      "open",
      "exportAs",
      ["cut", "copy", "paste"],
      ["bold", "italic", "underline"],
      "backgroundColor", 
      "textColor",
      "borders",
      "fontSize", 
      "fontFamily",
      "alignment",
      "textWrap",
      ["formatDecreaseDecimal", "formatIncreaseDecimal"],
      "format",
      "merge",
      "freeze",
      "filter",
    ],
  }
});

$("#textBoxSpreadSheet").kendoTextBox();

$("#textareaSpreadSheet").kendoTextArea({
  rows: 1,
  resize: "both"
});
```

You can find a live example of this implementation in the [Progress Kendo UI Dojo](https://dojo.telerik.com/IdeWitug).
