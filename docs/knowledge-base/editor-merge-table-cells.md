---
title: Merge table cells in the Editor
description: An example on how to merge table cells in the Kendo UI Editor.
type: how-to
page_title: Merge table cells | Kendo UI Editor
slug: editor-merge-table-cells
tags: editor, table, merge, cells
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI Editor</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How to make merge table cells with the Kendo UI Editor?

## Solution

Merging of table cells in the Kendo UI Editor can be achieved by registering two new custom tools that merge cells horizontally and vertically as follows:

```dojo
    <div id="example">
        <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px"></textarea>

        <script>
            var MergeColumnCellsCommand =  kendo.ui.editor.Command.extend({
                exec: function () {
                    var range = this.lockRange(true),
                        currentTd = kendo.ui.editor.Dom.closest(range.endContainer, "td"),
                        columnIndex = kendo.ui.editor.Dom.findNodeIndex(currentTd);
                        nextTd = $(currentTd).parent().next().children()[columnIndex];

                    if(currentTd && nextTd) {
                        nextTd.remove();
                        $(currentTd).prop("rowspan", 2);
                    }

                    this.releaseRange(range);
                }
            });

            var MergeRowCellsCommand =  kendo.ui.editor.Command.extend({
                exec: function () {
                    var range = this.lockRange(true),
                        currentTd = $(kendo.ui.editor.Dom.closest(range.endContainer, "td")),
                        nextTd = currentTd.next();

                    if(currentTd && nextTd) {
                        nextTd.remove();
                        currentTd.prop("colspan", 2);
                    }

                    this.releaseRange(range);
                }
            });

            $.extend(kendo.ui.editor, {
                MergeColumnCellsCommand: MergeColumnCellsCommand,
                MergeRowCellsCommand: MergeRowCellsCommand
            });

            var mergeTool =  kendo.ui.editor.TableModificationTool.extend({
                command: function (commandArguments) {
                    var options = $.extend(commandArguments, this.options);

                    if(options.type == "column") {
                        return new MergeColumnCellsCommand($.extend(commandArguments, { }));
                    } else {
                        return new MergeRowCellsCommand($.extend(commandArguments, { }));
                    }
                }
            });

            kendo.ui.editor.EditorUtils.registerTool(
                "cellsMergeVertically",
                new mergeTool({
                    type: "column",
                    action: "merge",
                    template: new kendo.ui.editor.ToolTemplate({
                        template: kendo.ui.editor.EditorUtils.buttonTemplate,
                        title: "Merge Next Column"
                    })
                })
            );

            kendo.ui.editor.EditorUtils.registerTool(
                "cellsMergeHorizontally",
                new mergeTool({
                    type: "row",
                    action: "merge",
                    template: new kendo.ui.editor.ToolTemplate({
                        template: kendo.ui.editor.EditorUtils.buttonTemplate,
                        title: "Merge Next Row"
                    })
                })
            );
        </script>

        <script>
            $("#editor").kendoEditor({
                tools: [
                    "tableWizard",
                    "createTable",
                    "addRowAbove",
                    "addRowBelow",
                    "addColumnLeft",
                    "addColumnRight",
                    "deleteRow",
                    "deleteColumn",
                    "cellsMergeVertically",
                    "cellsMergeHorizontally"
                ]
            });
        </script>
    </div>
```

## See Also

* [Editor API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)