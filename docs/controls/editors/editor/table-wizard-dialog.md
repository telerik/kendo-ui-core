---
title: Table Wizard Dialog
page_title: Table Wizard Dialog | Kendo UI Editor
description: "The Table Wizard Dialog enables user to add HTML tables and configure them easily in Kendo UI Editor."
slug: table_wizard_dialog_editor_widget
position: 8
---

# Table Wizard Dialog

As of **R3 2016**, in addition to the **Insert Table** tool, users can add and configure tables using the **Table Wizard** dialog.

![](/controls/editors/editor/table-wizard.png)

## Opening the Table Wizard

To insert a new table using the **Table Wizard** you can use the **Insert Table** tool and click on the **Table Wizard** button to open the dialog. Then, configure the table to be inserted and click the **OK** button.

![](/controls/editors/editor/table-wizard-open.png)


To modify an existing table (or table cell) first select the table (or table cell) to edit and click on the **Table Wizard** tool in the toolbar.

![](/controls/editors/editor/table-wizard-edit.png)

## Table Wizard Options

The table and cell options available in the **Table Wizard** are separated in three tabs:

* **Table**—options for the table element;
* **Cell**—options for the selected cell or all cells in the table;
* **Accessibility**—accessibility-related options.

You can refer to the following sections for more details about each tab:

### Table Options

* **Width**—changes the width of the table (pixel, em or percent);
* **Height**—changes the height of the table (px, em or percent);
* **Columns**—defines the columns of the table;
* **Rows**—defines the rows of the table;
* **Cell Spacing**—specifies the space between cells ([cellspacing attribute](http://www.w3schools.com/tags/att_table_cellspacing.asp));
* **Cell Padding**—specifies the padding in the cells ([cellpadding attribute](http://www.w3schools.com/tags/att_table_cellpadding.asp));
* **Alignment**—specifies the text alignment in the cells;
* **Background**—specifies the background color of the table;
* **CSS Class**—defines class names for the table element (white space-separated);
* **ID**—defines the id of the table element;
* **Border**—defines the border size (pixel only) and color;
* **Border Style**—defines the border style (none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset,initial and inherit);
* **Collapse borders**—adds an inline style to that table element with `border-collapse: collapse` rule ([border-collapse property](http://www.w3schools.com/cssref/pr_border-collapse.asp)).

### Cell Options

* **Select All Cells**—will apply the changes to all cells in the table.
* **Width**—changes the width of the cell/cells (pixel, em or percent);
* **Height**—changes the height of the cell/cells (pixel, em or percent);
* **Cell Margin**—defines the margin of the cell/cells;
* **Cell Padding**—defines the padding of the cell/cells;
* **Alignment**—specifies the text alignment of the cell/cells;
* **Background**—specifies the background color of the cell/cells;
* **CSS Class**—defines class names for the cell/cells (white space-separated);
* **ID**—defines the id of the cell/cells;
* **Border**—defines the border size (pixel only) and color of the cell/cells;
* **Border Style**—defines the border style (none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset,initial and inherit);
* **Wrap text**—when unchecked applies a `white-space: nowrap` style to the cell/cells ([white-space property](http://www.w3schools.com/cssref/pr_text_white-space.asp)).

### Accessibility Options

* **Caption**—adds caption text for the table;
* **Alignment**—defines the text alignment of the caption;
* **Summary**—adds a [summary attribute](http://www.w3schools.com/tags/att_table_summary.asp) with the value defines to the table;
* **Associate cells with headers**—associates the cells with the header id attributes ([Using id and headers attributes to associate data cells with header cells in data tables](https://www.w3.org/TR/WCAG20-TECHS/H43.html)).

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
