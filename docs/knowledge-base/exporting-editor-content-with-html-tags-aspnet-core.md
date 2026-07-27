---
title: Exporting Kendo Editor Content with HTML Tags in UI for ASP.NET Core
description: Learn how to export Kendo Editor content with HTML tags in UI for ASP.NET Core by customizing the export functionality.
type: how-to
page_title: Export Kendo Editor Content Including HTML Tags in ASP.NET Core
meta_title: Export Kendo Editor Content Including HTML Tags in ASP.NET Core
slug: exporting-editor-content-with-html-tags-aspnet-core
tags: editor, asp.net core, export, html tags, export-as
res_type: kb
ticketid: 1717084
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> UI for ASP.NET Core Editor </td>
</tr>
<tr>
<td> Version </td>
<td>2026.2.520 </td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for ASP.NET Core Editor](https://docs.telerik.com/aspnet-core/html-helpers/editors/editor/overview), the built-in "Export As" button’s HTML option exports only the formatted content without the HTML tags. To export the content along with its HTML tags, you need to customize the export functionality.

This knowledge base article also answers the following questions:
- How can I export Editor content with visible HTML tags?
- How do I preserve HTML tags when exporting content from the Kendo Editor in ASP.NET Core?
- How can I modify the "Export As" functionality to include HTML tags?

## Solution

To export the Kendo Editor content with HTML tags, create a custom tool or override the built-in export option. Save the content as a plain-text `.txt` file to prevent browsers from parsing the HTML tags.

### Steps to Export HTML Content with Tags

1. Retrieve the Editor value using the `value()` method:
    ```javascript
    var htmlContent = $("#editor").data("kendoEditor").value();
    ```
   This method retrieves the raw HTML content, including tags like `<p>`, `<strong>`, and `<em>`.

2. Create a `Blob` with the content and set the MIME type to `text/plain;charset=utf-8`:
    ```javascript
    var blob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    ```

3. Create a temporary download link and trigger the download:
    ```javascript
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EditorExport.txt";
    link.click();
    ```

### Example Code

Implement a custom tool in the Kendo Editor to achieve the above behavior:
```
.Tools(tools => tools
            .Clear()
            .ExportAs()
            .CustomButton(x => x.Name("exportHtml").Icon("download").Exec(@<text>
                    function(e) {
                        var editor = $("#editor").data("kendoEditor");
                        var htmlContent = editor.value();
                        var blob = new Blob([htmlContent], { type: 'text/plain;charset=utf-8' });
                        var link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'EditorExport.txt';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                    }
                </text>))
)
```
This code adds a custom tool to the Editor that exports the content with its HTML tags preserved.

### Important Note
Saving the file as `.html` causes the browser to parse the tags upon opening, rendering formatted text instead of showing the tags. Use the `.txt` extension to preserve the tags as plain text.

## See Also

- [Editor Overview Documentation](https://docs.telerik.com/aspnet-core/html-helpers/editors/editor/overview)
- [Editor API Reference](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/editor)
- [Customizing Tools in the Editor](https://docs.telerik.com/aspnet-core/html-helpers/editors/editor/tools)
