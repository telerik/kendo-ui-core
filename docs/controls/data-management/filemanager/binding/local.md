---
title: Local Data
page_title: jQuery FileManager Documentation | Local Binding in FileManager
description: "Get understanding in the Local Binding in FileManager."
slug: localdata_kendoui_filemanager_widget
position: 1
---

# Local Data 

The Kendo UI FileManager enables you to bind it to local arrays of data.


To bind the FileManager to local data, set the `dataSource` option of the `kendoFileManager` object. The data should correspond ot the FileManager built-in model schema (see [Data Binding Overview]({% slug bindingoverview_kendoui_filemanager_widget %}) article)

```dojo
    // Define the HTML div that will contain the FileManager.
    <div id="filemanager"></div>

    // Initialize the FileManager with local data.
    <script>
      var myData = [
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
        dataSource: {
          schema: kendo.data.schemas.filemanager,
          data: myData
        }
    });     

    </script>
```

* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [Sort in Kendo UI FileManager]({% slug sort_kendoui_filemanager_widget %})
* [Toolbar Commands in Kendo UI FileManager]({% slug toolbar_kendoui_filemanager_widget %})
