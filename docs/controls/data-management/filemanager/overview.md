---
title: Overview
page_title: jQuery FileManager Documentation | FileManager Overview
description: "Get started with the jQuery FileManager by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_filemanager_widget
position: 0
---

# FileManager Overview

The Kendo UI FileManager is an Explorer-like component enabling you to manage file and folders. 

It enables you to organize and manage files and folders and provides you with a rich API for customization. You can show additional information about the selected file in a template-customizable Preview Pane, which you can show or hide via a switch button. The widget is built entirely by Kendo UI for jQuery components: [Grid]({% slug overview_kendoui_grid_widget %}), [ListView]({% slug overview_kendoui_listview_widget %}), [TreeView]({% slug overview_kendoui_treeview_widget %}), [Toolbar]({% slug overview_kendoui_toolbar_widget %}), [Breadcrumb]({% slug overview_kendoui_breadcrumb_widget %}). 

* [Demo page for the FileManager](https://demos.telerik.com/kendo-ui/filemanager/index)

## Initializing the FileManager

The following example demonstrates initialization of the FileManager with a local binding. The file structure is served as JSON though the FileManager DataSource object.

```dojo
    // Define the HTML div that will contain the FileManager.
    <div id="filemanager"></div>

    // Initialize the FileManager with local data.
    <script>
      var data = [
        {
          name: "Folder",
          isDirectory: true,
          hasDirectories: false,
          path: "folder",
          extension: "",
          size: 0,
          createdUtc: new Date(),
          items: [
              {
                name: "Image.jpg",
                isDirectory: false,
                hasDirectories: false,
                path: "folder/Image.jpg",
                extension: ".jpg",
                size: 20,
                createdUtc: new Date(),
              },
              {
                name: "Image2.jpg",
                isDirectory: false,
                hasDirectories: false,
                path: "folder/Image2.jpg",
                extension: ".jpg", 
                size: 20,
                createdUtc: new Date(),
              }
          ]        
        }
      ];
    $("#filemanager").kendoFileManager({               
        dataSource: data
    });     

    </script>
```
## Referencing Existing Instances

To refer to an existing FileManager instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [FileManager API](/api/javascript/ui/filemanager) to control its behavior.

        var filemanager = $("#filemanager").data("kendoFileManager");

## Functionality and Features

* [Data binding]({% slug bindingoverview_kendoui_filemanager_widget %})
* [ContextMenu]({% slug contextmenu_kendoui_filemanager_widget %})
* [Drag and Drop]({% slug dragndrop_kendoui_filemanager_widget %})
* [Views]({% slug views_kendoui_filemanager_widget %})
* [Navigation]({% slug navigation_kendoui_filemanager_widget %})
* [PreviewPane]({% slug previewpane_kendoui_filemanager_widget %})
* [Search]({% slug search_kendoui_filemanager_widget %})
* [Sort]({% slug sort_kendoui_filemanager_widget %})
* [Toolbar Commands]({% slug toolbar_kendoui_filemanager_widget %})
* [Accessibility]({% slug accessibility_kendoui_filemanager_widget %})
* [Globalization]({% slug globalization_kendoui_filemanager_widget %})

Visit the [Client API section](/api/javascript/ui/filemanager) for full description of the configurations methods and events of the Kendo UI for jQuery FileManager component.

## See Also

* [Basic Usage of the FileManager (Demo)](https://demos.telerik.com/kendo-ui/filemanager/index)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the FileManager](/api/javascript/ui/filemanager)
