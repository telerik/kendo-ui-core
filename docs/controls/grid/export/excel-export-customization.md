---
title: Excel Export Customization
page_title: jQuery Grid Documentation - Excel Export Customization
description: "Learn how to customize the Excel export of the jQuery Grid by Kendo UI through the excelExport event and the Workbook API."
components: ["grid"]
slug: excelexport_customization_kendoui_grid
position: 2
---

# Excel Export Customization

The Grid provides extensive Excel export customization capabilities that allow you to modify the appearance, structure, and content of the exported files to meet specific business requirements. 

This article demonstrates how to customize various aspects of the Excel export, including formatting, columns, data management, and advanced scenarios.

## Common Customization Patterns

The Grid's Excel export functionality is powered by two main components:

1. **The [excelExport](/api/javascript/ui/grid/events/excelexport) Event**&mdash;Triggered before the export begins, allowing you to access and modify the workbook object.
2. **The [Workbook API](/api/javascript/ooxml/workbook)**&mdash;Provides a rich set of configuration options to customize sheets, rows, columns, and cells.

### Accessing the Workbook

The `excelExport` event provides access to the workbook configuration object that will be used to generate the Excel file.

```javascript
$("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function(e) {
        var workbook = e.workbook;
        var sheet = workbook.sheets[0];
        
        // Access rows and cells
        var rows = sheet.rows;
        var headerRow = rows[0];
    }
});
```

### Modifying Cell Properties

You can customize the appearance of cells by setting various properties such as background color, text color, font styles, and number formats. For a complete list of the available cell properties, refer to the [Excel Appearance documentation](slug://appearance_excelexport_kendoui).

```javascript
$("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function(e) {
        var sheet = e.workbook.sheets[0];
        
        // Format a specific cell
        sheet.rows[1].cells[0].background = "#ffff00";
        sheet.rows[1].cells[0].color = "#000000";
        sheet.rows[1].cells[0].bold = true;
        sheet.rows[1].cells[0].format = "0.00";
    }
});
```

### Preventing Default Export

You can prevent the default export behavior to implement custom logic before saving the file.

```javascript
$("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function(e) {
        // Prevent default export to apply custom logic
        e.preventDefault();
        
        // Perform custom operations
        // ... your code
        
        // Manually save
        kendo.saveAs({
            dataURI: new kendo.ooxml.Workbook(e.workbook).toDataURL(),
            fileName: "CustomExport.xlsx"
        });
    }
});
```

## Customization Scenarios

The following sections demonstrate common customization scenarios for Grid Excel export. Each scenario addresses specific requirements and provides working examples.

### Basic Formatting

Customize the visual appearance of exported data including cell formats, colors, fonts, and styling.

#### Cell and Date Formatting

* [Format Cell Values](slug:howto_format_cell_values_grid)—Apply custom number formats, currency, percentages, and other cell value formats in the exported Excel file.
* [Format Date Cells](slug:date-format-excel-export-grid)—Configure proper date formatting for date columns to ensure dates display correctly in Excel.

#### Visual Styling

* [Alternating Row Colors](slug:howto_configure_color_alternating_rows_grid)—Set background colors for alternating rows to improve readability of exported data.
* [Align Footer Cells](slug:footer-alignment)—Control the horizontal alignment of footer cells in the Excel export.
* [Apply Custom Fonts](slug:grid-excel-export-custom-font)—Change the font family, size, and style of cells in the exported document.
* [Strikethrough Text Styling](slug:grid-excel-export-strikethrough-text)—Add strikethrough formatting to specific cells or rows.
* [Set Pattern Style Colors](slug:set-pattern-style-color-excel-export-kendo-ui-grid)—Apply background pattern styles and colors to cells.

#### Layout

* [Set Row Height to Auto](slug:excel-export-set-row-height-to-auto)—Configure automatic row height adjustment based on content.
* [Handle New Lines](slug:grid-excel-export-new-lines)—Properly display multi-line text content in Excel cells.

### Column Customization

Control which columns are exported and how they appear in the Excel file.

#### Column Selection and Visibility

* [Use Column Templates](slug:column-template-export)—Export column template values instead of raw data to maintain custom formatting.
* [Export Selected Columns Only](slug:export-checked-columns-only)—Allow users to choose which columns to include in the export.
* [Include Hidden Columns](slug:grid-include-hidden-columns-in-excel-export)—Export columns that are hidden in the Grid UI.

#### Column Manipulation

* [Add Columns During Export](slug:grid-add-column-export-excel)—Insert new columns at specific positions in the exported file.
* [Insert New Columns](slug:grid_insert_new_column_with_excel_export)—Add additional columns with custom data during the export process.
* [Format Sheet Columns](slug:grid-workbook-formatted-sheet-column-excel-export)—Configure column widths, alignment, and other formatting options.
* [Auto-fit Columns](slug:grid-excel-export-autofit-columns)—Automatically adjust column widths to fit content.

### Data Filtering and Selection

Manage which data gets exported, including filtered datasets and partial data exports.

#### Filtering

* [Export Filtered Data (All Pages)](slug:export-filtered-data-kendo-ui-jquery-grid)—Export only the filtered data across all pages, respecting current filter criteria.
* [Export Filtered Data from Dynamic Grids](slug:howto_export_filtered_data_dynamic_grid)—Handle Excel export for grids with dynamically generated columns and filtered data.

#### Data Range Selection

* [Export Entire Dataset](slug:grid-excel-export-entire-data)—Export all data from the data source, regardless of pagination or current view.
* [Limit Exported Rows](slug:grid-limit-the-exported-rows-to-excel)—Restrict the number of rows included in the export.
* [Insert Additional Rows](slug:insert-rows-when-exporting-grid-to-excel)—Add custom rows (headers, footers, summaries) to the exported file.

### Hierarchical and Grouped Data

Export complex data structures including master-detail relationships and grouped data.

#### Master-Detail Exports

* [Export Master and Detail Grids](slug:detail-grid-export)—Combine master and detail Grid data into a single Excel workbook.
* [Export Hierarchy to Separate Sheets](slug:grid-excel-export-hierarchy-master-and-detail-separate-sheets)—Place master and detail data on different Excel sheets for better organization.

#### Grouped Data

* [Export with Group Paging](slug:export-grid-rows-excel-group-paging)—Handle Excel export for grids using group paging functionality.
* [Export Each Group to Separate Sheets](slug:grid-excel-export-each-group-in-separate-sheet)—Create individual Excel sheets for each data group.

### Advanced Content

Export special content types including images, hyperlinks, formulas, and HTML content.

#### Rich Content Types

* [Export Images](slug:export-images-in-grid)—Include image data in the exported Excel file.
* [Export Clickable Hyperlinks](slug:export_grid_links_to_excel)—Make URL columns clickable in the exported Excel document.
* [Add Excel Formulas](slug:grid-excel-export-formulas)—Insert Excel formulas into cells for calculations within the exported file.

#### Content Processing

* [Export Text from HTML Content](slug:export-only-the-text-from-the-grid-cell-which-contains-html)—Strip HTML tags and export only text content when cells contain HTML.
* [Custom Headers](slug:grid-excel-export-custom-headers)—Add custom header rows with merged cells, titles, or branding.

### Export Configuration

Customize the export process, file naming, and user interactions.

#### File Management

* [Customize Export Filename](slug:grid-customize-excel-export-filename)—Dynamically set the Excel filename including dates, timestamps, or user information.
* [Export with User Confirmation](slug:export-the-grid-to-excel-only-after-confirmation)—Require user confirmation before proceeding with the export.

#### Advanced Configuration

* [Modify Exported Excel Document](slug:modify-exported-excel)—Apply comprehensive modifications to the workbook structure and content.
* [Export Page Content with Grid](slug:how-to-export-page-content-and-grid-to-excel)—Include additional page elements and content alongside the Grid data.
* [Server-Side Export](slug:grid-excel-export-server)—Implement Excel export processing on the server side.
* [Handle Proxy Issues](slug:grid-excel-export-cannot-post-to-proxy)—Troubleshoot and resolve proxy server issues during export.

## See Also

* [Excel Export Overview](slug:exporting_excel_kendoui_grid_widget)
* [excelExport Event API Reference](/api/javascript/ui/grid/events/excelexport)
* [Excel Configuration API Reference](/api/javascript/ui/grid/configuration/excel)
* [Workbook API Reference](/api/javascript/ooxml/workbook)
* [Excel Export Introduction](slug:introduction_excelexport_kendoui)
* [Excel Export Appearance](slug:appearance_excelexport_kendoui)
