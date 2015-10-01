---
title: User Guide
page_title: Guide of the User Interface of the Spreadsheet Widget
position: 2
---

# The User Guide to the Kendo UI Spreadsheet Widget

### Audience

This guide is intended for the end user of the Kendo UI Spreadsheet widget. It aims at providing information about the widget's functionalities for data entry/management, and support to end users while working with it.

### Table of Contents

To the left of this page is the collapsible Table of Contents. You can easily navigate through it by clicking on the title of a section you want to read.

### Organization

The instructions in this guide are organized in sections, based on the actions you might wish to execute on each spreadsheet component (sheets, rows, columns).

### Conventions

This guide uses the following conventions:

| ITEM										| CONVENTION						|
| :---										| :---								|
| Buttons, menus, tabs, dialog titles		| **boldface** font 				|
| Keyboard buttons, names of functions		| `screen` font						|
| Selection sequences of buttons or options	| **Data** -> **Data Validation**	|

### Overview

The Kendo UI Spreadsheet is used for implementation of related data and its visualization in a tabular format (rows and columns).
This kind of data structuring provides for an easier management and analysis.
The widget renders the feeling of a [Microsoft Excel table](https://support.office.com/en-ca/article/Overview-of-Excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c) by offering many cell-formatting options, styles, and themes, while utilizing simpler and easy-to-master user interface.

### Actions with Sheets

When you open the spreadsheet, the widget automatically generates a worksheet and applies to it a set of default settings.

| WHAT YOU WANT			| HOW TO GET THERE	|
| :---					| :---				|
| Create				| Click **+** on the Sheet Tab Bar to create a new sheet				|
| Rename 				| <ol><li> Double-click the tab of the sheet you want to rename and modify it</li> <li>Press `Enter` to exit, or click anywhere on the sheet</li></ol> |
| Reorder				| Click and hold the sheet tab, and drag it to the desired location on the Sheet Tab Bar |
| Delete				| Click **X** [ <span class="k-font-icon k-i-x"></span> ] on the tab of the sheet you want to remove |
| Select a whole sheet	| Click **Select All** [ <span class="k-font-icon k-i-resize-se"></span> ]  located to the left of column letter **A** and above row number **1** on the active sheet |

### Actions with Cells

| WHAT YOU WANT			| HOW TO GET THERE		|
| :---					| :---					|
| Select/activate		| Click on a cell		|
| Edit 					| Double-click a cell 	|
| Copy content			| <ol><li>Select a cell</li> <li>Click **Copy** [ <span class="k-font-icon k-i-copy"></span> ] on the Toolbar, or use the [`Ctrl` + `C`](#shortcut-keys) keyboard shortcut</li></ol>|
| Cut content			| <ol><li>Select a cell</li> <li>Click **Cut** [ <span class="k-font-icon k-i-cut"></span> ] on the Toolbar, or use the [`Ctrl` + `X`](#shortcut-keys) keyboard shortcut</li></ol> |
| Paste content			| <ol><li>Click the cell where you want to place the copied or cut content</li> <li>Click **Paste** [ <span class="k-font-icon k-i-paste"></span> ] on the Toolbar, or use the [`Ctrl` + `V`](#shortcut-keys) keyboard shortcut</li></ol> |
| Delete content		| <ol><li>Select a cell</li> <li>Press **Delete** on your keyboard to remove its content</li></ol> |
| Merge cells			| <ol><li>Select the cells you want to merge</li> <li>Right-click the selection -> **Merge**</li> <li>Select the option from the **Merge Cells** pop-up window</li></ol> |
| Merge cells (via the Toolbar)	|<ol><li>Select the cells you want to merge</li> <li>Click **Merge Cells** [ <span class="k-font-icon k-i-merge-horizontally"></span> ] on the Toolbar</li> <li>Choose an option from the drop-down list</li></ol> |
| Add a background color| <ol><li>Select a cell</li> <li>Click **Background** [ <span class="k-font-icon k-i-background"></span> ] on the Toolbar</li> <li>Choose a color from the drop-down list to apply to the cell background</li></ol> |
| Align content			| <ol><li>Select a cell</li> <li>Click **Alignment** [ <span class="k-font-icon k-i-justify-left"></span> ] on the Toolbar</li> <li>Choose a style form the drop-down list</li></ol> |
| Wrap text				| <ol><li>Select a cell that contains the content you want to wrap</li> <li>Click **Wrap Text** [ <span class="k-font-icon k-i-text-wrap"></span> ] on the Toolbar</li></ol> |
| Choose border styles and colors | <ol><li>Select a cell</li> <li>Click **Borders** [ <span class="k-font-icon k-i-all-borders"></span> ] on the Toolbar</li> <li>Select the border style and/or the color from the drop-down list</li> <li>Click anywhere on the sheet to exit</li></ol> |

### Actions with Rows

| WHAT YOU WANT			| HOW TO GET THERE		|
| :---					| :---					|
| Select/activate		| Click the row number against of the row you want to select |
| Insert				| <ol><li>Select a row by clicking on the respective row number</li> <li>Click the **Insert** tab from the **Menu**</li> <li>Click **Add Row Below** [ <span class="k-font-icon k-i-add-row-below"></span> ] or **Add Row Above** [ <span class="k-font-icon k-i-add-row-above"></span> ] on the Toolbar</li></ol> |
| Delete				| <ol><li>Right-click on the row number</li> <li>Choose **Delete**</li></ol> |
| Delete (via the Toolbar) | <ol><li>Select a row by clicking on its row number</li> <li>In the **Menu** click **Insert**</li> <li>On the Toolbar click **Delete Row** [ <span class="k-font-icon k-i-delete-row"></span> ]</li></ol> |
| Hide					| <ol><li>Select the row(s) by clicking on the respective row number</li> <li>Right-click on the row number</li> <li>Choose **Hide**</li></ol> |
| Resize the height of a row | <ol><li>Select a row or a cell from a row</li> <li>Hover the pointer over the row number field until either the upper or bottom field border is highlighted</li> <li>Click the highlighted area and hold while dragging it to the desired height. Release the hold.</li></ol> |
| Add a background color | <ol><li>Select a row</li> <li>On the Toolbar click **Background** [ <span class="k-font-icon k-i-background"></span> ]</li> <li>Select the color from the drop-down list</li></ol> |
| Wrap text				| <ol><li>Select a row</li> <li>Click **Wrap Text** [ <span class="k-font-icon k-i-text-wrap"></span> ] on the Toolbar</li></ol> |
| Choose border styles and colors | <ol><li>Select a row</li> <li>Click **Borders** [ <span class="k-font-icon k-i-all-borders"></span> ] on the Toolbar</li> <li>Select the border style and/or the color from the drop-down list</li> <li>Click anywhere on the worksheet to exit</li></ol> |

### Actions with Columns

| WHAT YOU WANT			| HOW TO GET THERE		|
| :---					| :---					|
| Select/activate 		| Click the column letter against the column you want to select |
| Insert				| <ol><li>Select a column by clicking on the respective column letter</li> <li>Click the **Insert** tab from the **Menu**</li> <li>On the Toolbar click **Add Column Left** [ <span class="k-font-icon k-i-add-column-left"></span> ] or **Add Column Right** [ <span class="k-font-icon k-i-add-column-right"></span> ]</li></ol> |
| Delete				| <ol><li>Select the column(s) by clicking on the respective column letter</li> <li>In the **Menu** click **Insert**</li> <li>On the Toolbar click **Delete Column** [ <span class="k-font-icon k-i-delete-column"></span> ]</li></ol> |
| Hide					| <ol><li>Select a column by clicking on the respective column letter</li> <li>Right-click on the column letter</li> <li>Choose **Hide**</li></ol> |
| Resize the width of a column | <ol><li>Select a column or a cell within a column</li> <li>Hover the pointer over the column letter field until either the left or right border is highlighted</li> <li>Click the highlighted area and hold while dragging it to the desired width. Release the hold.</li></ol> |
| Add a background color | <ol><li>Select a  column</li> <li>On the Toolbar click **Background** [ <span class="k-font-icon k-i-background"></span> ]</li> <li>Select the color from the drop-down list</li></ol> |
| Wrap text				| <ol><li>Select the column whose content you want to wrap</li> <li>Click **Wrap Text** [ <span class="k-font-icon k-i-text-wrap"></span> ] on the Toolbar</li></ol> |
| Choose border styles and colors | <ol><li>Select a column</li> <li>Click **Borders** [ <span class="k-font-icon k-i-all-borders"></span> ] on the Toolbar</li> <li>Select the border style and/or the color from the drop-down list</li> <li>Click anywhere on the sheet to exit</li></ol> |

### Actions with Fonts

| WHAT YOU WANT			| HOW TO GET THERE		|
| :---					| :---					|
| Choose a font			| <ol><li>Select the cell(s) to which you want to apply the font</li> <li>On the Toolbar click **Font** [ <span class="k-font-icon k-i-font-family"></span> ]</li> <li>Choose a font type from the drop-down list</li></ol> |
| Edit the font size 	| <ol><li>Select the cell(s) to which you want to apply the font size</li> <li>On the Toolbar click **Font Size** [ <span class="k-font-icon k-i-font-size"></span> ]</li> <li>Choose the font size from the predetermined values in drop-down list</li></ol> |
| Format fonts			| <ol><li>Select the cell(s) where you want to format the font</li> <li>Use any of the following commands:</li></ol> <ul><ul><li>To make make the font **bold**, click **Bold** [ <span class="k-font-icon k-i-bold"></span> ] on the Toolbar</li> <li>To make make the font <i>italic</i>, click **Italic** [ <span class="k-font-icon k-i-italic"></span> ] on the Toolbar</li> <li>To make make the font <u>underlined</u>, click **Underline** [ <span class="k-font-icon k-i-underline"></span> ] on the Toolbar</li></ul></ul> |
| Customize the format of numbers | <ol><li>Select the cell(s) where you want to format the font</li> <li>Click **Custom Format** [ <span class="k-font-icon k-i-format-number"></span> ] on the Toolbar</li> <li>Select an option from the drop-down list. The style of formatting is hinted to the right of each option.</li></ol> |
| Further customize the format of numbers | <ol><li>Select the cell(s) whose content you want to format</li> <li>Click **Custom Format** [ <span class="k-font-icon k-i-format-number"></span> ] -> **More Formats**. Choose any of the following options:</li></ol> <ul><ul><li>**Number** customizes the format of numerical input</li> <li>**Currency** customizes the format of currency input</li> <li>**Date** customizes the format of date input</li></ul></ul> |

### Other Data Formatting Options

| WHAT YOU WANT				| HOW TO GET THERE		|
| :---						| :---					|
| Freeze panes				| <ol><li>Select the row or column which you want to freeze</li> <li>From the Toolbar click **Freeze Panes**</li> <li>Choose the option from the drop-down list</li></ol> |
| Apply the `Undo` function | Click **Undo** [ <span class="k-font-icon k-i-undo"></span> ] on the **Menu** to reverse the actions you made during your current session. The number of actions you can reverse using `Undo` is unlimited. |
| Apply the `Redo` function | Click **Redo** [ <span class="k-font-icon k-i-redo"></span> ] on the **Menu** to repeat the actions you made during your current session. The number of actions you can repeat using `Redo` is unlimited. |
| Increase decimal values	| Click **Increase Decimal** [ <span class="k-font-icon k-i-increase-decimal"></span> ] on the Toolbar to increase the number of digits after the decimal point |
| Decrease decimal values	| Click **Decrease Decimal** [ <span class="k-font-icon k-i-decrease-decimal"></span> ] on the Toolbar to decrease the number of digits after the decimal point |
| Apply formulas and functions | <ol><li>Select a cell</li> <li>Go to the **Formula Bar** and type an equal sign [ `=` ]</li> <li>Type your formula/function and press `Enter` once done to see the outcome of your input in the cell. Note that when you start writing a function, the `AutoComplete` prompts you with the syntax.</li></ol> |
| Edit formulas and functions 	| <ol><li>Double-click on a cell to display the formula/function in the **Formula Bar**</li> <li>Change the formula/function and press `Enter`</li></ol> |
| Sort information			| <ol><li>Select a column</li> <li>On the **Menu** click the **Data** tab</li> <li>Click **Sort** [ <span class="k-font-icon k-i-sort-desc"></span> ] on the Toolbar and choose an option from the drop-down list. The data within the active sheet is now sorted according to the alphabetical order of the column you modified and in an ascending or descending order of its content.</li></ol> |
| Apply filters				| <ol><li>Select the columns whose data you want to filter</li> <li>Go to **Data** tab on the **Menu**</li> <li>Click **Filter** [ <span class="k-font-icon k-i-filter"></span> ] on the Toolbar</li></ol> |
| Use applied filters		| Once you filtered the data within a column, click on the drop-down arrow of the filter and choose from the drop-down list of options: <ul><li>**Sort range A to Z** sorts the data within the column in an ascending alphabetical order</li> <li>**Sort range Z to A** sorts the data within the column in a descending alphabetical order</li> <li>**Filter by condition** filters the data within the column by applying any of the conditions from the drop-down list of options. Determine a value in the filed below so the condition can apply and sort the data.</li> <li>**Filter by value** opens a list of all different values listed within the column:</li> <ul><li>Check **All** to avoid setting criteria to the information within the selected column and display all data from it.</li> <li>Uncheck **All** to let go of all sub-filters.</li> <li>You can also set filtering criteria by checking the checkboxes against each value.</li></ul></ul> |
| Validate data				| Data validation allows you to predetermine the format and constrain the value of the content of a single cell or cells within a range, column, or row: <ol><li>Select a cell or a range of cells</li> <li>In the **Menu** click **Data** -> **Data Validation** to open the **Data Validation** window</li> <li>Choose the criterion from the drop-down list of options.</li> <li>A new window with criteria-specific options appears. Use the prompts and drop-down options to set the rules for modifying the content.</li></ol> |
| Export files				| Click **Export to Excel** [ <span class="k-font-icon k-i-xls"></span> ] to export your file in a Microsoft Excel format |

<br>

> Whenever **Cancel** is displayed as a command and you click on it, it closes an active drop-down list or menu, or exits an open window, and takes you back to the spreadsheet.
>
> Whenever **Apply** is displayed as a command, click on it after you selected an option to confirm its application.

### Shortcut Keys

| WHAT YOU WANT TO DO										| SHORTCUTS					|
| :--- 														| :---						|
| Copies the content of a cell 								| `Ctrl` + `C`				|
| Pastes the content of a cell								| `Ctrl` + `V`				|
| Reverses the last commands or deletes the last entry you typed	| `Ctrl` + `Z` 		|
| Repeats the last action, if possible 						| `Ctrl` + `Y` 				|
| Cuts selected cells										| `Ctrl` + `X`				|
| Selects the whole worksheet								| `Ctrl` + `A`				|
| Selects nonadjacent cells									| `Ctrl` + click on the cell you want to select			|
| Selects nonadjacent rows/columns 							| `Ctrl` + click on the row/column you want to select 	|
| Selects adjacent cells 									| `Shift` + an `arrow` key 	|
| Selects adjacent rows/columns								| `Shift` + an `arrow` key 	|
| Cancels an entry in a cell or in the Formula Bar			| `Esc`						|
