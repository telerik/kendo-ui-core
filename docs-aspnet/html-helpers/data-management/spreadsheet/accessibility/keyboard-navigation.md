---
title:  Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} Spreadsheet by Telerik UI and learn about the component keyboard navigation functionality."
slug: keynav_aspnetcore_spreadsheet
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Spreadsheet is always available.

For a runnable example, refer to the [demo on using the keyboard navigation of the Spreadsheet](https://demos.telerik.com/{{ site.platform }}/spreadsheet/keyboard-navigation).

## Managing the Focus

The Spreadsheet component is a container that consists of several logically separated structural elements:

* Quick access elements, **Undo** and **Redo** buttons
* Menu
* ToolBars
* Name editor
* Formula input
* Sheet area
* Sheets bar

Each of these elements is part of the page tab sequence and can be navigated using the `Tab` key. The list above illustrates the focus sequence. The only exception is the Sheet area, which implements its own inner tab based navigation.

Upon opening any of the Spreadsheet dialogs, the focus must move to the dialog and navigation must be trapped within the dialog. Upon closing the dialog, if a manipulation on the Spreadsheet cell has been performed, the focus must move to that cell. If no manipulation has been performed, the focus must return to the tool of the ToolBar that has opened the dialog.

The `ToolBars` implement the keyboard navigation specification for a ToolBar component.

The `Name editor` implements the [keyboard navigation specification for a ComboBox component]({%slug keynav_aspnetcore_combobox%}).

The `Sheets bar` elements are part of the page tab sequence.

## Keyboard Shortcuts

The following keyboard shortcuts are applicable to the content of the Spreadsheet:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Ctrl` + `C` | Copies the selected cells (range). |
| `Ctrl` + `V` | Inserts copied or cut cells to a selected location within the worksheet. |
| `Ctrl` + `X` | Cuts the selected cells (range). |
| `Ctrl` + `Y` | Repeats the last action, if possible, by using the **Redo** command. |
| `Ctrl` + `Z` | Reverses the last action, if possible, by using the **Undo** command. |
| `Delete` | In the formula bar, deletes the character to the right of the insertion point from the formula text.<br/>In cell selection mode, removes the content from selected cells without affecting cell formats.<br/>In cell editing mode, deletes the character to the right of the insertion point. |
| `Backspace` | In the formula bar, deletes one character to the left from the formula text. <br/>In cell selection mode, removes the content of the active cell. <br/>In cell editing mode, deletes the character to the left of the insertion point. |

The following keyboard shortcuts are applicable to the on element selection:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Ctrl` + select a cell | Selects an adjacent or nonadjacent cell. |
| `Ctrl` + select cells | Selects a range of adjacent or nonadjacanet cells. |
| `Ctrl` + `A` | Selects the whole worksheet. |
| `Ctrl` + select a row or column | Selects an adjacent or nonadjacent row or column. |
| `Ctrl` + select rows or columns | Selects a range of adjacent or nonadjacent rows or columns. |
| `Shift` + `Arrow Key` | Selects a range of adjacent cells, rows, or columns by extending the selection by one cell, row, or column. |
| `Ctrl` + `Shift` + `Arrow Key` | Extends the selection of cells to the last cell of the current series of data. If there is another set of data afterwards, the cell selection will be extended to the first cell of the new series of data. Otherwise, the cell selection will be extended to the last cell of the worksheet in the corresponding direction. |
| `Down Arrow` or `Up Arrow` | In a menu or submenu, selects the next or previous command.<br />In a dialog box, the arrow keys move between options in an active drop-down list, or between options in a group of options. |
| `Ctrl` + `Shift` + `End` |    In cell selection mode, extends the selection of cells to the last cell on the worksheet located in bottom-right corner.<br />In the formula bar, selects all text in the formula bar from the cursor position to the end. |
| `Ctrl` + `Shift` + `Home` | Extends the selection of cells to the beginning (the top-left cell) of the worksheet.<br/>In the formula bar, selects all text in the formula bar from the cursor position to the beginning of the input. |

The following keyboard shortcuts are applicable for navigation within the Spreadsheet:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Ctrl` + `Arrow Key` | Navigates to the end of the current series of data. If there is another set of data afterwards, the first cell of the new series will be selected. Otherwise, you will be navigated to the last cell of the worksheet in the corresponding direction. |
| `Arrow Keys` | Moves one cell up, down, right, or left in the worksheet. |
| `Shift` + `Tab` | In cell selection mode, moves to the previous cell in a worksheet. If the currently active cell is the first cell (the top-left cell) in the sheet, pressing `Shift` + `Tab` will move the focus <b>outside</b> of the sheet to the Named ranges ComboBox on the Spreadsheet Toolbar.<br />In a dialog box, moves to the previous option or option group.<br />In range selection of cells, rows, or columns, moves to the previous cell within the active range. If the focus is on the first cell (the top-left cell) in the range (the top-left), the focus will return to the last (the bottom-left) cell in the range. |
| `Tab` | In cell selection mode, moves one cell to the right in a worksheet. If the currently active cell is the last cell (the bottom-right cell) in the sheet, pressing Tab will move the focus <b>outside</b> of the Spreadsheet to the next focusable element on the page.<br />In a dialog box, moves to the next option or option group in a dialog box.<br />In range selection of cells, rows, or columns, moves to the next cell within the active range. If the focus is on the last cell (the bottom-right cell) in the range, the focus will return to the first cell. |
| `Page Down` | Moves one screen down in a worksheet. |
| `Page Up` | Moves one screen up in a worksheet. |
| `Home` | In cell selection mode, moves to the beginning of a row in a worksheet.<br/>In a menu or submenu, selects the first command. |
| `Ctrl` + `Home` | In cell selection mode, moves to the first cell (the top-left cell) on a worksheet.<br />In the formula bar, `Ctrl` + `Home` moves the cursor to the beginning of the text. |
| `End` |   In cell selection mode, moves to the far right cell of the active row.<br />In a menu or submenu, selects the last command |
| `Ctrl` + `End` | In cell selection mode, moves to the last cell on a worksheet, in the lowest used row of the used column on the bottom-right.<br />In the formula bar, `Ctrl` + `End` moves the cursor to the end of the text. |

The following keyboard shortcuts are applicable for the sheets bar:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Tab` | Moves the focus to the next focusable element in the sheets bar. If the last element is focused, pressing `Tab` will move the focus outside of the Spreadsheet. |
| `Shift` + `Tab` | Moves the focus to the previous focusable element in the sheets bar. If the first element is focused, pressing `Tab` will move the focus to the sheet area. |
| `Alt` + `Down Arrow` | Opens the actions DropDownButton popup for the current active tab. |

Additional keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Alt` + `Space` | Displays the **Control** menu for the Spreadsheet window. |
| `Space` | In a dialog box, performs the action for the selected button or selects or clears a check box. |
| `Enter` | In cell editing mode or in the formula bar, completes a cell entry and selects the cell below.<br />In a data form, moves to the first field in the next record.<br />In the command toolbar, opens a selected menu or performs the action for a selected command.<br />In a dialog box, performs the action for the default command button in the dialog box. |
| `Esc` | In cell editing mode or in the formula bar, cancels an entry in the cell or formula bar.<br />Closes an open menu or submenu, dialog box, or message window. |
| `Ctrl` + `P` | Displays the **Print** dialog box. |
| `Ctrl` + `S` | Saves the active spreadsheet file. |
| `Alt` + `H` | Displays the **Home** tab on the ToolBar. |
| `Alt` + `N` | Displays the **Insert** tab on the ToolBar. |
| `Alt` + `A` | Displays the **Data** tab on the ToolBar. |

## See Also

* [Keyboard Navigation by the Spreadsheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})