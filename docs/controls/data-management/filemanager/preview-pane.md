---
title: Preview Pane
page_title: jQuery FileManager Documentation | Preview Pane in FileManager
description: "Understand how you can easily enable, disable and customize the Preview Pane in the FileManager"
slug: previewpane_kendoui_filemanager_widget
position: 6
---

# Preview Pane Overview

The Preview Pane shows additional information about the selected files or folders in the view.

The preview pane visibility could be toggled by the Switch Tool in the FileManager Toolbar. By default, it shows the following information about the selected file or folder:

* Thumbnail, representing the file
* File extension 
* File size
* Date created 
* Date modified

The `metaFields` object in the PreivewPane configuration, allows you to control which fields from the above-enumerated should be displayed. If you need to show only the Extension and Size information in the Preview Pane, the configuration would be as follows:

```js
    <div id="filemanager"></div>
    $("#filemanager").kendoFileManager({
         previewPane: {
                metaFields:  ["extension", "size"]
            },
        dataSource: {
            data: myData
        }
    });


```

## Customize Preview Pane

You can customize the Preview Pane layout by specifying a kendo template. The Pane accepts the following templates:

* noFileTemplate: String | Function - Template when no file/folder is selected
* singleFileTemplate: String | Function - Template when only a single file/folder is selected
* multipleFilesTemplate: String | Function - Template when multiple files/folders are selected

The following example demonstrates a singleFileTemplate declaration in the FileManager

```js
    <div id="filemanager"></div>
    $("#filemanager").kendoFileManager({
         previewPane: {
                singleFileTemplate: kendo.template($("#preview-template").html())
            },
        dataSource: {
            data: myData
        }
    });

    <script id="preview-template" type="text/kendo-ui-template">
        <div class="#=styles.fileInfo#">
            <div class="#=styles.filePreviewWrapper#">
                <span class="k-icon k-i-#=kendo.getFileGroup(selection[0].extension, true)#"></span>
            </div>
            <div class="#=styles.fileTitleWrapper#">
                <span class="#=styles.fileTitle#">#=selection[0].name#</span>
            </div>
            #if(metaFields){#
            <dl class="#=styles.fileMetaWrapper#">
                #for(var i = 0; i < metaFields.length; i+=1){#
                #var field = metaFields[i]#
                <dt class="#=styles.metaLabel#">#=messages[field]#: </dt>
                <dd class="#=styles.metaValue# #=styles[field]#">
                    #if(field == "size"){#
                    #=kendo.getFileSizeMessage(selection[0][field])#
                    #} else if(selection[0][field] instanceof Date) {#
                    #=kendo.toString(selection[0][field], "G")#
                    #} else if(field == "extension") {#
                    #=kendo.getFileGroup(selection[0].extension)#
                    #} else {#
                    #=selection[0][field]#
                    #}#
                </dd>
                <dd class="line-break"></dd>
                # } #
            </dl>
            #}#
        </div>
    </script>

```

## See Also

* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [Basic Usage of the FileManager (Demo)](https://demos.telerik.com/kendo-ui/filemanager/index)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the Grid](/api/javascript/ui/filemanager)
* [Sort in Kendo UI FileManager]({% slug sort_kendoui_filemanager_widget %})
* [Toolbar Commands in Kendo UI FileManager]({% slug toolbar_kendoui_filemanager_widget %})

