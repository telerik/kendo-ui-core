---
title: Merge Table Cells in the Editor
description: Learn how to merge table cells in the Kendo UI Editor.
type: how-to
page_title: Merge Table Cells - Kendo UI Editor for jQuery
slug: editor-merge-table-cells
tags: editor, table, merge, cells
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2023.1.315</td>
 </tr>
</table>

## Description

How can I make merge table cells with the Kendo UI Editor?

## Solution

Register two new custom tools that merge cells horizontally and vertically.

```dojo
    <div id="example">
        <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px"></textarea>

        <script>
            var MergeColumnCellsCommand =  kendo.ui.editor.Command.extend({
                exec: function () {
                    var range = this.lockRange(true),
                        currentTd = kendo.ui.editor.Dom.closest(range.endContainer, "td"),
                        columnIndex = kendo.ui.editor.Dom.findNodeIndex(currentTd),
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
                },
                update: $.noop
            });

            kendo.ui.editor.EditorUtils.registerTool(
                "cellsMergeVertically",
                new mergeTool({
                    type: "column",
                    action: "merge",
                    ui: {
                        attributes: {
                            title: "Merge Next Column"
                        }
                    }
                })
            );

            kendo.ui.editor.EditorUtils.registerTool(
                "cellsMergeHorizontally",
                new mergeTool({
                    type: "row",
                    action: "merge",
                    ui: {
                        attributes: {
                            title: "Merge Next Row"
                        }
                    }
                })
            );
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

* [API Reference of the Editor](/api/javascript/ui/editor)
