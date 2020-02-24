---
title: Create Custom File Manager Command
page_title: Create Custom Command
description: "An example on how to create a custom command for the Kendo UI File Manager for jQuery."
slug: howto_create_custom_filemanager_command
tags: filemanager, custom command,
component: filemanager
type: how-to
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI File Manager for jQuery</td>
 </tr>
</table>

## Description

How can I create a custom command for the Kendo UI File Manager?

## Creating a Custom Command

As of Kendo UI R1 2020 SP1 the kendo.ui.filemanager namespace exposes the `FileManagerCommand` class that could be extended to implement a custom File Manager command.

```
<div id="filemanager"></div>

<script>
  var ds = [
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
  
  var fm = $("#filemanager").kendoFileManager({
    dataSource: ds,
    toolbar: {
      items: [
        { type: "button", name: "custom", text: "MyCommand", command: "MyCustomCommand", options: "{ \"arg\": \"argument\" }" }
      ]
    },
    contextMenu: {
      items: [
        { name: "custom", text: "MyCommand", command: "MyCustomCommand" }
      ]
    }
  }).data("kendoFileManager");

  var filemanagerNS = kendo.ui.filemanager;

  filemanagerNS.commands.MyCustomCommand = filemanagerNS.FileManagerCommand.extend({
    exec: function(){
      var that = this,
          filemanager = that.filemanager, // get the kendo.ui.FileManager instance
          options = that.options, // get the options passed through the tool
          target = options.target // options.target is available only when command is executed from the context menu
          selectedFiles = filemanager.getSelected(); // get the selected files

      console.log(options.arg, target, selectedFiles);
      // Proceed with the logic of the custom command.
    }
  });
</script>
```

## See Also

* [Create custom Kendo UI Widget](https://docs.telerik.com/kendo-ui/intro/widget-basics/create-custom-kendo-widget)
