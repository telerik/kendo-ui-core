---
title: Getting Started
page_title: jQuery FileManager Documentation - Getting Started with the FileManager
description: "Get started with the jQuery FileManager by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_filemanager_component
position: 1
---

# Getting Started with the FileManager 

This guide demonstrates how to get up and running with the Kendo UI for jQuery FileManager.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="filemanager"></div>
    <script>
        $(document).ready(function() {
          $("#filemanager").kendoFileManager({
            previewPane: {
              noFileTemplate: '<b>No file or filder selected</b>'
            },
            toolbar: {
              items: [
                { name: "search" },
                { name: "createFolder" },
                { name: "upload" },
                { name: "details" },
                { name: "spacer" },
                { name: "sortDirection" },
                { name: "sortField" },
                { name: "changeView" }
              ]
            },          
            uploadUrl: "https://demos.telerik.com/kendo-ui/service/FileManager/Upload",
            dataSource: {
              schema: kendo.data.schemas.filemanager,
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
                  method: "POST"
                },
                create: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Create",
                  method: "POST"
                },
                update: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Update",
                  method: "POST"
                },
                destroy: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Destroy",
                  method: "POST"
                }
              }
            },
          });
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="filemanager"></div>
```

## 2. Initialize the FileManager

In this step, you will initialize the FileManager from the `<div>` element.

```dojo
    <div id="filemanager"></div>

    <script>
    $(document).ready(function() {
        $("#filemanager").kendoFileManager();
    </script>
```

## 3. Specify the Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/filemanager/configuration/datasource) instance and fetch the remote data.

```dojo
    <div id="filemanager"></div>

    <script>
        $(document).ready(function() {
            $("#filemanager").kendoFileManager({
                dataSource: {
                    schema: kendo.data.schemas.filemanager,
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
                            method: "POST"
                        },
                        create: {
                            url: "https://demos.telerik.com/kendo-ui/service/FileManager/Create",
                            method: "POST"
                        },
                        update: {
                            url: "https://demos.telerik.com/kendo-ui/service/FileManager/Update",
                            method: "POST"
                        },
                        destroy: {
                            url: "https://demos.telerik.com/kendo-ui/service/FileManager/Destroy",
                            method: "POST"
                        }
                    }
                },
            });
        });
    </script>
```

## 4. Configure the Items in the Toolbar

In this step, you will define the items that will be included in the Toolbar of the FileManager component and their order of rendering.

```dojo
    <div id="filemanager"></div>

    <script>
      $(document).ready(function() {
        $("#filemanager").kendoFileManager({
          toolbar: {
            items: [
              { name: "search" },
              { name: "createFolder" },
              { name: "upload" },
              { name: "details" },
              { name: "spacer" },
              { name: "sortDirection" },
              { name: "sortField" },
              { name: "changeView" },

            ]
          },
          dataSource: {
            schema: kendo.data.schemas.filemanager,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
                method: "POST"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Create",
                method: "POST"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Update",
                method: "POST"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Destroy",
                method: "POST"
              }
            }
          },
        });
      });
    </script>
```

## 5. Set the Upload URL

By using the [`uploadUrl`](/api/javascript/ui/filemanager/configuration/uploadurl), you can set the path to the endpoint that will be used for the built-in Upload component in the ToolBar.

```dojo
    <div id="filemanager"></div>

    <script>
      $(document).ready(function() {
        $("#filemanager").kendoFileManager({
          toolbar: {
            items: [
              { name: "search" },
              { name: "createFolder" },
              { name: "upload" },
              { name: "details" },
              { name: "spacer" },
              { name: "sortDirection" },
              { name: "sortField" },
              { name: "changeView" }
            ]
          },
          uploadUrl: "https://demos.telerik.com/kendo-ui/service/FileManager/Upload",
          dataSource: {
            schema: kendo.data.schemas.filemanager,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
                method: "POST"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Create",
                method: "POST"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Update",
                method: "POST"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Destroy",
                method: "POST"
              }
            }
          },
        });
      });
    </script>
```


## 6. Define Template

You can customize the preview pane through the [`noFileTemplate`](/api/javascript/ui/filemanager/configuration/previewpane.nofiletemplate), 
[`singleFileTemplate`](/api/javascript/ui/filemanager/configuration/previewpane.singlefiletemplate), and [`multipleFilesTemplate`](/api/javascript/ui/filemanager/configuration/previewpane.multipleFilesTemplate).

The following example demonstrates how to configure the `noFileTemplate`:

```dojo
    <div id="filemanager"></div>
    <script>
        $(document).ready(function() {
          $("#filemanager").kendoFileManager({
            previewPane: {
              noFileTemplate: '<b>No file or folder selected</b>'
            },
            toolbar: {
              items: [
                { name: "search" },
                { name: "createFolder" },
                { name: "upload" },
                { name: "details" },
                { name: "spacer" },
                { name: "sortDirection" },
                { name: "sortField" },
                { name: "changeView" }
              ]
            },          
            uploadUrl: "https://demos.telerik.com/kendo-ui/service/FileManager/Upload",
            dataSource: {
              schema: kendo.data.schemas.filemanager,
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
                  method: "POST"
                },
                create: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Create",
                  method: "POST"
                },
                update: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Update",
                  method: "POST"
                },
                destroy: {
                  url: "https://demos.telerik.com/kendo-ui/service/FileManager/Destroy",
                  method: "POST"
                }
              }
            },
          });
        });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the FileManager](https://demos.telerik.com/kendo-ui/filemanager/index)

## See Also 

* [JavaScript API Reference of the FileManager](/api/javascript/ui/filemanager)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
