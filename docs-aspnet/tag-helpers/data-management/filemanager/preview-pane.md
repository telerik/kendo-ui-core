---
title: Preview Pane
page_title: Preview Pane
description: "Understand how you can easily enable, disable and customize the Preview Pane in the FileManager"
slug: taghelpers_filemanager_aspnetcore_previewpane
position: 6
---
# Preview Pane Overview

The Preview Pane in the {{ site.product }} FileManager shows additional information about the selected files or folders in the view.

The preview pane visibility could be toggled by the Switch Tool in the FileManager Toolbar. By default, it shows the following information about the selected file or folder:

* Thumbnail (with the name of the file/folder)
* File extension
* File size
* Date created
* Date modified

The `MetaFields` object in the PreviewPane configuration, allows you to control which fields from the above-enumerated should be displayed. If you need to show only the Extension and Size information in the Preview Pane, the configuration would be as follows:

        <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")">
            <preview-pane meta-fields='new [] { "size", "extension" }' />
            <filemanager-datasource>
                <transport>
                    <read url="@Url.Action("Read", "FileManagerData")" />
                    <create url="@Url.Action("Destroy", "FileManagerData")" />
                    <destroy url="@Url.Action("Create", "FileManagerData")" />
                    <update url="@Url.Action("Update", "FileManagerData")" />
                </transport>
            </filemanager-datasource>
        </kendo-filemanager>

## Customize Preview Pane

You can customize the Preview Pane layout by specifying a kendo Template. The Pane accepts the following templates:

* NoFileTemplate: String | Function - Template when no file/folder is selected
* SingleFileTemplate: String | Function - Template when only a single file/folder is selected
* MultipleFilesTemplate: String | Function - Template when multiple files/folders are selected

The following example demonstrates a singleFileTemplate declaration in the FileManager

        <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")">
            <preview-pane single-file-template-id="preview-template" />
            <filemanager-datasource>
                <transport>
                    <read url="@Url.Action("Read", "FileManagerData")" />
                    <create url="@Url.Action("Destroy", "FileManagerData")" />
                    <destroy url="@Url.Action("Create", "FileManagerData")" />
                    <update url="@Url.Action("Update", "FileManagerData")" />
                </transport>
            </filemanager-datasource>
        </kendo-filemanager>
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




## See Also

* [Overview of {{ site.product }} FileManager]({% slug taghelpers_filemanager_aspnetcore_overview %})
* [Basic Usage of the {{ site.product }} FileManager (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/index)
* [Client API section](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager)
* [Sort in {{ site.product }} FileManager]({% slug taghelpers_filemanager_aspnetcore_sort %})
* [Toolbar Commands in {{ site.product }} FileManager]({% slug taghelpers_filemanager_aspnetcore_toolbar %})