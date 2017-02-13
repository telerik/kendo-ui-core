---
title: Table Wizard Dialog
page_title: Table Wizard Dialog | Kendo UI Editor
description: "Enable the user to add HTML tables and configure them easily by using the Table Wizard dialog in the Kendo UI Editor."
slug: table_wizard_dialog_editor_widget
position: 8
---

# Table Wizard Dialog

As of the Kendo UI R3 2016 release and in addition to the **Insert Table** tool, the user is now able to add and configure tables by using the **Table Wizard** dialog.

![](/controls/editors/editor/table-wizard.png)

## Getting Started

### Insert Tables

To insert a new table by using the **Table Wizard** dialog:

1. Open the **Insert Table** tool.
1. To open the dialog, click the **Table Wizard** button.
1. Configure the table that is to be inserted.
1. Click the **OK** button.

![](/controls/editors/editor/table-wizard-open.png)

### Modify Tables

To modify an existing table or a table cell:

1. Select the table or the table cell to edit.
1. Click the **Table Wizard** tool in the toolbar.

![](/controls/editors/editor/table-wizard-edit.png)


> **Important**
>
> Even without using the table wizard dialog, you can resize the table rows and columns by dragging the cell border with the mouse.

## Table Wizard Options

The table and cell options that are available in the **Table Wizard** are displayed in the following three tabs:

* [**Table**](#table)&mdash;The available options for the table element.
* [**Cell**](#cell)&mdash;The available options for the selected cell or all cells in the table.
* [**Accessibility**](#accessibility)&mdash;The available options related to accessibility.

### Table

The **Table** tab provides the following options:

* **Width**&mdash;Changes the width of the table (in pixels, em, or percent).
* **Height**&mdash;Changes the height of the table (in pixels, em, or percent).
* **Columns**&mdash;Defines the columns of the table.
* **Rows**&mdash;Defines the rows of the table.
* **Cell Spacing**&mdash;Specifies the space between the cells ([`cellspacing` attribute](http://www.w3schools.com/tags/att_table_cellspacing.asp)).
* **Cell Padding**&mdash;Specifies the padding in the cells ([`cellpadding` attribute](http://www.w3schools.com/tags/att_table_cellpadding.asp)).
* **Alignment**&mdash;Specifies the text alignment in the cells.
* **Background**&mdash;Specifies the background color of the table.
* **CSS Class**&mdash;Defines the class names for the table element (white space-separated).
* **ID**&mdash;Defines the id of the table element.
* **Border**&mdash;Defines the border size (in pixels only) and color.
* **Border Style**&mdash;Defines the border style (`none`, `hidden`, `dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, `outset`, `initial`, and `inherit`).
* **Collapse borders**&mdash;Adds an inline style to that table element with the `border-collapse: collapse` rule ([`border-collapse` property](http://www.w3schools.com/cssref/pr_border-collapse.asp)).

### Cell

The **Cell** tab provides the following options:

* **Select All Cells**&mdash;Applies the changes to all cells in the table.
* **Width**&mdash;Changes the width of the cell or cells (in pixels, em, or percent).
* **Height**&mdash;Changes the height of the cell or cells (in pixels, em, or percent).
* **Cell Margin**&mdash;Defines the margin of the cell or cells.
* **Cell Padding**&mdash;Defines the padding of the cell or cells.
* **Alignment**&mdash;Specifies the text alignment of the cell or cells.
* **Background**&mdash;Specifies the background color of the cell or cells.
* **CSS Class**&mdash;Defines class names for the cells (white space-separated).
* **ID**&mdash;Defines the id of the cells.
* **Border**&mdash;Defines the border size (in pixels only) and color of the cells.
* **Border Style**&mdash;Defines the border style (`none`, `hidden`, `dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, `outset`, `initial`, and `inherit`).
* **Wrap text**&mdash;When unchecked, applies a `white-space: nowrap` style to the cells ([`white-space` property](http://www.w3schools.com/cssref/pr_text_white-space.asp)).

### Accessibility

The **Accessibility** tab provides the following options:

* **Caption**&mdash;Adds a caption text for the table.
* **Alignment**&mdash;Defines the text alignment of the caption.
* **Summary**&mdash;Adds a [`summary` attribute](http://www.w3schools.com/tags/att_table_summary.asp) with the value defined to the table.
* **Associate cells with headers**&mdash;Associates the cells with the header id attributes. For more information on using id and header attributes, refer to the article on [using id and header attributes to associate data cells with header cells in data tables](https://www.w3.org/TR/WCAG20-TECHS/H43.html)).

## See Also

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
