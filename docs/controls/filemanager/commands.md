---
title: Commands
page_title: jQuery FileManager Documentation - FileManager Commands
description: "Get familiar with the Commands in the FileManager and how you can use them."
slug: commands_kendoui_filemanager_widget
position: 10
---

# Commands

The FileManager component provides the following commands that can be executed using the [executeCommand](/api/javascript/ui/filemanager/methods/executecommand) method: 

* [CreateFolderCommand;](#createfoldercommand)
* [RenameCommand;](#renamecommand)
* [DeleteCommand;](#deletecommand)
* [MoveCommand;](#movecommand)
* [CopyCommand;](#copycommand)
* [SortCommand;](#sortcommand)
* [SearchCommand;](#searchcommand)
* [ChangeViewCommand;](#changeviewcommand)
* [OpenDialogCommand;](#opendialogcommand)
* [TogglePaneCommand;](#togglePanecommand)

Below you will find examples for each of the commands:

#### CreateFolderCommand 

You can use the command to add a new folder in the FileManager.

```dojo
    <button id='createFolder'>Create Folder Command</button>
    <div id="filemanager"></div>

    <script>
      $("#filemanager").kendoFileManager({
        dataSource: {
          schema: kendo.data.schemas.filemanager,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
              method: "POST"
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
              method: "POST"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
              method: "POST"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
              method: "POST"
            }
          }
        },
        uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload",

      });

      $(document).ready(function () {
        $("#createFolder").on('click', () => {
          var filemanager = $("#filemanager").getKendoFileManager();

          filemanager.executeCommand({ command: "CreateFolderCommand" });
        });
      })
    </script>
```

#### RenameCommand

Use the command to open the popup for renaming a folder or for start editing the name of a file.

```dojo
  <input type="button" value="Rename Folder" onclick="renameFolder()" />
  <input type="button" value="Rename Selected File" onclick="renameFile()" />
  <div id="filemanager"></div>

  <script>
    $("#filemanager").kendoFileManager({
      dataSource: {
        schema: kendo.data.schemas.filemanager,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
              method: "POST"
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
              method: "POST"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
              method: "POST"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
              method: "POST"
            }
          }
      },
      uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload",
    });

    function renameFolder() {

      var filemanager = $("#filemanager").data("kendoFileManager");

      var selectedFolder = $(".k-filemanager-treeview").find(".k-selected").parents(".k-item");

      if (selectedFolder.length > 0) {
        filemanager.executeCommand({ command: "RenameCommand", options: { target: $(".k-filemanager-treeview").find(".k-selected").parents(".k-item"), item: filemanager.getSelected()[0] } })
      }
      else {
        alert("Select a folder in the tree");
      }
    }

    function renameFile() {

      var filemanager = $("#filemanager").data("kendoFileManager");

      var selectedFile = $(".k-listview-item.k-selected");

      if (selectedFile.length > 0) {
        filemanager.executeCommand({ command: "RenameCommand", options: { target: selectedFile, item: filemanager.getSelected()[0] } })
      }
    }

  </script>
```

#### DeleteCommand

The command allows you to delete file or folder in the FileManager.

```dojo
    <button onclick="deleteSelected()">Delete Selected</button>

    <div id="filemanager"></div>
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

      function deleteSelected(){
        var fileManager = $("#filemanager").getKendoFileManager();
        var elem = $("div.k-filemanager-content .k-selected");
        fileManager.executeCommand({
          command:"DeleteCommand",
          options:{
            target:elem
          }
        })
      }

    </script>
```

#### MoveCommand

The Move command will call the Create endpoint for adding the file to its new destination and the Destroy remote endpoint as the selected file is deleted from the origin folder. Below is an example for using the `MoveCommand`.

```
    let fileManager = $("#filemanager").getKendoFileManager();
    let selectedIDs = fileManager.getSelected().map(function (item) {
      return item.id;
    });         
    
    
    fileManager.executeCommand({
      command: "MoveCommand",
      options: {
        items: selectedIDs,
        target: "Documents", //the targeted folder where the files will be moved
        targetDataSource: fileManager.dataSource
      }
    })
```

#### CopyCommand

The copy command will call the `Create` remote endpoint as the selected file is not deleted from the destination. In the example below a `create` request containing the path to the selected file and target folder 'Documents' will be sent.

```
    let fileManager = $("#filemanager").getKendoFileManager();
    let selectedIDs = fileManager.getSelected().map(function (item) {
      return item.id;
    });
    

    fileManager.executeCommand({
      command: "CopyCommand",
      options: {
        items: selectedIDs,
        target: "Documents",
        dataSource: fileManager.dataSource,
        targetDataSource: fileManager.dataSource
      }
    })
```


#### SortCommand

The sort command provides an option to sort the items in the FileManager by specific field and direction. 

```dojo
    <button id="sort">Sort Descending</button>
    <div id="filemanager"></div>

    <script>
      $("#filemanager").kendoFileManager({
        dataSource: {
          schema: kendo.data.schemas.filemanager,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
              method: "POST"
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
              method: "POST"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
              method: "POST"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
              method: "POST"
            }
          }
        },
        uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload"
      });

      $('#sort').on('click', function(){

        var fileManager = $("#filemanager").getKendoFileManager();
        fileManager.executeCommand({ 
          command: "SortCommand", 
          options: { 
            dir: "desc",
            field: "name"
          } 
        });
      })

    </script>
```

#### SearchCommand

The command allows you to perform search on the currently rendered files and folders. The search will not be performed in the nested items. You can pass the field and value based on which the search will be applied as well as the filter operator. 

```dojo
    <input type="text" id="search-input" />
    <button id="search">Sort Descending</button>
    <div id="filemanager"></div>

    <script>
      $("#filemanager").kendoFileManager({
        dataSource: {
          schema: kendo.data.schemas.filemanager,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
              method: "POST"
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
              method: "POST"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
              method: "POST"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
              method: "POST"
            }
          }
        },
        uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload"
      });

      $('#search').on('click', function(){

        var fileManager = $("#filemanager").getKendoFileManager();
        let text = $("#search-input").val()
        fileManager.executeCommand({
          command:"SearchCommand", 
          options:{
            field:"name", 
            operator:"contains", 
            value: text
          }
        })
      })

    </script>
```

#### ChangeViewCommand

You can switch between the `grid` and the `list` view to display the files in the FileManager.

```dojo
  <button id="btn">Switch view</button>
  <div id="filemanager"></div>

  <script>
    $("#filemanager").kendoFileManager({
      dataSource: {
        schema: kendo.data.schemas.filemanager,
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
            method: "POST"
          },
          create: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
            method: "POST"
          },
          update: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
            method: "POST"
          },
          destroy: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
            method: "POST"
          }
        }
      }
    });

    $('#btn').on('click', function(){

      var fileManager = $("#filemanager").getKendoFileManager();          
      var view = fileManager.view()      
      var toggle = view.listView == undefined ? $('.k-button[title="List View"]') : $('.k-button[title="Grid View"]')
      var current = view.listView == undefined ? 'list' : 'grid'          
     
      fileManager.executeCommand({ 
        command: "ChangeViewCommand", 
        options: current
      });   
      fileManager.toolbar.toggle(toggle, true);
    })

  </script>
```

#### OpenDialogCommand

You can use the command to pass in the options the dialog that should be opened. 

```dojo
  <button id="btn">Open Upload Dialog</button>
  <div id="filemanager"></div>

  <script>
    $("#filemanager").kendoFileManager({
      dataSource: {
        schema: kendo.data.schemas.filemanager,
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
            method: "POST"
          },
          create: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
            method: "POST"
          },
          update: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
            method: "POST"
          },
          destroy: {
            url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
            method: "POST"
          }
        }
      },
      uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload"
    });

    $('#btn').on('click', function(){

      var fileManager = $("#filemanager").getKendoFileManager();
     
      fileManager.executeCommand({ 
        command: "OpenDialogCommand",
        options: { type: "uploadDialog"}
      });
    })

  </script>
```

#### TogglePaneCommand

The toggle pane command opens the preview pane for reviewing the file details.

```dojo
    <script id="preview-template" type="text/kendo-ui-template">
   	  <strong> My custom single pane template </strong>
    </script>

    <button id="btn">Toggle Preview Pane</button>
    <div id="filemanager"></div>

    <script>
      $("#filemanager").kendoFileManager({
        dataSource: {
          schema: kendo.data.schemas.filemanager,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
              method: "POST"
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Create",
              method: "POST"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Update",
              method: "POST"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileManager/Destroy",
              method: "POST"
            }
          }
        },
        uploadUrl: "https://demos.telerik.com/service/v2/core/FileManager/Upload",
        previewPane: {
          singleFileTemplate: kendo.template($("#preview-template").html())
        },
      });

      $('#btn').on('click', function(){
        var filemanager = $("#filemanager").getKendoFileManager();
        filemanager.executeCommand({ command: "TogglePaneCommand", options: { type: "preview" } });
      })
    </script>
```


## See Also

* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [ContextMenu in Kendo UI FileManager]({% slug contextmenu_kendoui_filemanager_widget %})
* [Drag and Drop in Kendo UI FileManager]({% slug dragndrop_kendoui_filemanager_widget %})
