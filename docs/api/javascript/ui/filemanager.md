---
title: FileManager
page_title: Configuration, methods and events of Kendo UI FileManager
description: How to initialize an FileManager UI widget, configure its properties.
res_type: api
component: filemanager
---

# kendo.ui.FileManager

Represents the Kendo UI FileManager. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### width `Number | String`

Configures the width of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            width: 500,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### height `Number | String`

Configures the height of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            height: 500,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### initialView `String`

Configures the initial view of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            initialView: "grid",
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### resizable `Boolean`

Configures the resizable features of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            resizable: false,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### draggable `Boolean` *(default: true)*

Enables or disables the drag and drop features of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            draggable: false,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dataSource `Object | Array | kendo.data.FileManagerDataSource`

Sets the [FileManagerDataSource](/api/javascript/data/filemanagerdatasource) of the FileManager. Can be bound to a remote service or local data.

> When using the transport options as functions the target parameter will not be sent automatically due to the DataSource not calling the [parameterMap method](/api/javascript/data/datasource/configuration/transport.parametermap).
> You can call it within your function to pass the required data - Example - read as function.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    },
                    update: {
                        method: "POST",
                        url: baseUrl + "Update"
                    },
                    create: {
                        method: "POST",
                        url: baseUrl + "Create"
                    },
                    destroy: {
                        method: "POST",
                        url: baseUrl + "Destroy"
                    }
                }
            }
        });
    </script>

#### Example - transport with functions.

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: function(options) {
                        var that = this;

                        $.ajax({
                            url: baseUrl + "Read",
                            method: "POST",
                            data: that.parameterMap ? that.parameterMap(options.data, "read") : options.data,
                            success: function(result) {
                                options.success(result);
                            }
                        });
                    },
                    update: function(options) {
                        var that = this;

                        $.ajax({
                            url: baseUrl + "Update",
                            method: "POST",
                            data: that.parameterMap ? that.parameterMap(options.data, "read") : options.data,
                            success: function(result) {
                                options.success(result);
                            }
                        });
                    },
                    create: function(options) {
                        var that = this;

                        $.ajax({
                            url: baseUrl + "Update",
                            method: "POST",
                            data: that.parameterMap ? that.parameterMap(options.data, "read") : options.data,
                            success: function(result) {
                                options.success(result);
                            }
                        });
                    },
                    destroy: function(options) {
                        var that = this;

                        $.ajax({
                            url: baseUrl + "Destroy",
                            method: "POST",
                            data: that.parameterMap ? that.parameterMap(options.data, "read") : options.data,
                            success: function(result) {
                                options.success(result);
                            }
                        });
                    }
                }
            }
        });
    </script>

#### Example

    <div id="fileManager"></div>
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

    $("#fileManager").kendoFileManager({
        dataSource: myData
    });
    </script>

### upload `Object`

Configures the composite Upload widget of the FileManager. Accepts the same options as the [kendoUpload widget](/api/javascript/ui/upload).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                multiple: true,
                showFileList: true,
                async: {
                    saveUrl: baseUrl + "Upload",
                    removeUrl: baseUrl + "Remove"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### uploadUrl `String`

Sets the upload url for the Upload widget.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            uploadUrl: baseUrl + "Upload",
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.cancel `Function`

Fires when the upload was cancelled while in progress. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                cancel: function(e) {
                    console.log("Upload cancelled: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.clear `Function`

Fires when the files are cleared by clicking on the **Clear** button. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                clear: function(e) {
                    console.log("Upload list cleared");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.complete `Function`

Fires when all active uploads complete&mdash;either successfully or with errors. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                complete: function(e) {
                    console.log("Upload completed");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.error `Function`

Fires when an `upload` or `remove` operation fails. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                error: function(e) {
                    console.log("Upload error: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.pause `Function`

Fires when the files are cleared by clicking the **Pause** button. The button is visible if `chunksize` is set. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                pause: function(e) {
                    console.log("Upload paused: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.progress `Function`

Fires when the data about the progress of the upload is available. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                progress: function(e) {
                    console.log("Upload progress: " + Math.round(e.percentComplete) + "%");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.resume `Function`

Fires when the files are resumed through clicking the **Resume** button. The button is visible if `chunksize` is set and the file upload is paused. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                resume: function(e) {
                    console.log("Upload resumed: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.remove `Function`

Fires when an uploaded file is about to be removed. If the event is canceled, the `remove` operation is prevented. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                remove: function(e) {
                    console.log("File removed: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.select `Function`

Fires when a file is selected. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                select: function(e) {
                    console.log("Files selected: " + e.files.length);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.success `Function`

Fires when an `upload` or `remove` operation is completed successfully. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                success: function(e) {
                    console.log("Upload successful: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.upload `Function`

Fires when one or more files are about to be uploaded. The canceling of the event prevents the upload. [Upload Events](/api/javascript/ui/upload#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            upload: {
                upload: function(e) {
                    console.log("Starting upload: " + e.files[0].name);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>


### toolbar `Boolean | Object` *(default: true)*

Configures the Toolbar of the FileManager

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder" },
                    { name: "upload" },
                    { name: "search" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items `Array`

Configures the items collection of the toolbar.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder" },
                    { name: "upload" },
                    { name: "sortDirection" },
                    { name: "sortField" },
                    { name: "changeView" },
                    { name: "spacer" },
                    { name: "details" },
                    { name: "search" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

Apart from the built-in tools, the FileManager fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

### toolbar.items.type `String`
Specifies the type of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", type: "button" },
                    { name: "upload", type: "button" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.overflow `String`
Specifies the overflow of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", overflow: "auto" },
                    { name: "upload", overflow: "never" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.click `Function`
Specifies the click handler of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { 
                        name: "custom", 
                        text: "Custom",
                        click: function() {
                            alert("Custom button clicked");
                        }
                    }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.command `String`
Specifies the command of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", command: "CreateFolderCommand" },
                    { name: "upload", command: "UploadCommand" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.options `String`
Specifies the command options of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", options: { text: "New Folder" } }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.name `String`
Specifies the name of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder" },
                    { name: "upload" },
                    { name: "search" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "details", togglable: true }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.text `String`
Sets the text of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", text: "New Folder" },
                    { name: "upload", text: "Upload Files" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { template: "<button class='k-button'>Custom Button</button>" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", showText: "toolbar" },
                    { name: "upload", showText: "both" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", primary: true },
                    { name: "upload", primary: false }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { 
                        name: "createFolder", 
                        attributes: { 
                            "data-role": "button",
                            "title": "Create a new folder"
                        } 
                    }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", enable: true },
                    { name: "upload", enable: false }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", hidden: false },
                    { name: "upload", hidden: true }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", spriteCssClass: "k-icon k-i-folder" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", imageUrl: "/path/to/folder-icon.png" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", showIcon: "toolbar" },
                    { name: "upload", showIcon: "both" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", icon: "folder" },
                    { name: "upload", icon: "upload" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.items.id `String`
Specifies the ID of the button.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                items: [
                    { name: "createFolder", id: "createFolderBtn" },
                    { name: "upload", id: "uploadBtn" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.click `Function`

Fires when the user clicks a command button. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                click: function(e) {
                    console.log("Toolbar button clicked: " + e.id);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.close `Function`

Fires when the SplitButton's popup closes. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                close: function(e) {
                    console.log("Toolbar popup closed");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.open `Function`

Fires when the Split Button's popup opens. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                open: function(e) {
                    console.log("Toolbar popup opened");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.toggle `Function`

Fires when the user changes the checked state of a toggle button. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                toggle: function(e) {
                    console.log("Toolbar button toggled: " + e.checked);
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflow: {
                    mode: "menu"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflow: {
                    mode: "scroll"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflow: {
                    mode: "scroll",
                    scrollButtons: "visible"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflow: {
                    mode: "scroll",
                    scrollButtonsPosition: "end"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflow: {
                    mode: "scroll",
                    scrollDistance: 100
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>


### toolbar.overflowClose `Function`

Fires when the overflow popup container is about to close. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflowClose: function(e) {
                    console.log("Toolbar overflow popup is closing");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### toolbar.overflowOpen `Function`

Fires when the overflow popup container is about to open. [Toolbar Events](/api/javascript/ui/toolbar#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            toolbar: {
                overflowOpen: function(e) {
                    console.log("Toolbar overflow popup is opening");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dialogs `Object`

Specifies the composite Dialog widgets of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                upload: {
                    title: "Upload Files"
                },
                deleteConfirm: {
                    title: "Confirm Deletion"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dialogs.upload `Object`

Configures the Upload dialog - [kendoDialog](/api/javascript/ui/dialog)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                upload: {
                    // kendoDialog options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dialogs.moveConfirm `Object`

Configures the Move (when drag/drop action is performed) dialog - [kendoConfirm](/api/javascript/ui/confirm)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                moveConfirm: {
                    // kendoConfirm options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dialogs.deleteConfirm `Object`

Configures the Delete dialog - [kendoConfirm](/api/javascript/ui/confirm)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                deleteConfirm: {
                    // kendoConfirm options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dialogs.renamePrompt `Object`

Configures the Rename dialog - [kendoPrompt](/api/javascript/ui/prompt)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                renamePrompt: {
                    // kendoPrompt options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu `Object|Boolean` *(default: true)*

Configures the ContextMenu of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: false,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items `Array`

Configures the items of the ContextMenu.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    "delete"
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.name `String`
Specifies the name of the item.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    { name: "delete" },
                    { name: "rename" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.text `String`
Specifies the text of the item.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    { name: "delete", text: "Delete File" },
                    { name: "rename", text: "Rename File" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.spriteCssClass `String`
Specifies the spriteCssClass of the item.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    { name: "delete", spriteCssClass: "k-icon k-i-delete" }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.icon `String`

Specifies the icon of the item.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    {
                        text: "delete",
                        icon: "pencil"
                    }
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.command `String`
Specifies the command of the item.

#### Example

	<div id="fileManager"></div>
    <script>
      var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

      $("#fileManager").kendoFileManager({
        height: 500,
        dataSource: {
          transport: {
            read: {
              method: "POST",
              url: baseUrl + "Read"
            },
            destroy: {
              method: "POST",
              url: baseUrl + "Destroy"
            }
          }
        },
        contextMenu: {
          items: [
            { name: "delete" },
            { name: "custom", text: "Custom command", command: "MyCustomCommand", spriteCssClass:"k-icon k-i-info" }
          ]
        }
      });

      $(document).ready(function () {
        var filemanagerNS = kendo.ui.filemanager;
        filemanagerNS.commands.MyCustomCommand = filemanagerNS.FileManagerCommand.extend({
          exec: function(){
            kendo.alert('Custom command in ContextMenu has been clicked')
          }
        });
      })
    </script>

### contextMenu.close `Function`

Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.  [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                close: function(e) {
                    console.log("ContextMenu is closing");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.open `Function`

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                open: function(e) {
                    console.log("ContextMenu is opening");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.activate `Function`

Fires when a sub menu or the ContextMenu gets opened and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                activate: function(e) {
                    console.log("ContextMenu activated");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.deactivate `Function`

Fires when a sub menu or the ContextMenu gets closed and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                deactivate: function(e) {
                    console.log("ContextMenu deactivated");
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.select `Function`

Fires when a menu item gets selected. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                select: function(e){
                    console.log('Selected item: ' + $(e.item).text())
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### views `Object`

Configures every view registered for the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                grid: {
                    sortable: true
                },
                list: {
                    pageable: false
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### views.grid `Object`

Configures the built-in grid view - accepts [kendoGrid options](/api/javascript/ui/grid)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                grid: {
                    // kendoGrid options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### views.list `Object`

Configures the built-in list view (thumbnails) - accepts [kendoListView options](/api/javascript/ui/listview)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                list: {
                    // kendoListView options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### views.tree `Object`

Configures the built-in tree view - accepts [kendoTreeView options](/api/javascript/ui/treeview)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                tree: {
                    // kendoTreeView options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane `Object`

Configures the Preview Pane of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                metaFields: ["created", "size", "extension"]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane.metaFields `Array`

Configures the meta fields to be showed in the preview pane.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                metaFields: ["created", "createdUtc", "size"]
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane.noFileTemplate `String|Function`
Defines a new template for the preview pane when no file/folder is selected.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                noFileTemplate: "<div class='no-file-message'>Please select a file to preview</div>"
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane.singleFileTemplate `String|Function`
Defines a new template for the preview pane when a single file/folder is selected.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                singleFileTemplate: "<div><h3>#: name #</h3><p>Size: #: size # bytes</p></div>"
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane.multipleFilesTemplate `String|Function`
Defines a new template for the preview pane when multiple files/folders are selected.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                multipleFilesTemplate: "<div><h3>#: files.length # files selected</h3></div>"
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### breadcrumb `Object|Boolean` *(default: true)*

Configures or disables the Breadcrumb component.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            breadcrumb: false,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### breadcrumb.rootIcon `String`
Defines a new root icon for the breadcrumb.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            breadcrumb: {
                rootIcon: "home"
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### breadcrumb.delimiterIcon `String`
Defines a new delimiter icon for the breadcrumb.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            breadcrumb: {
                delimiterIcon: "arrow-right"
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages `Object`
Defines the text of the localizable UI parts of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    createFolder: "New Folder",
                    upload: "Upload",
                    sortDirection: "Sort Direction",
                    sortDirectionAsc: "Sort Direction Ascending",
                    sortDirectionDesc: "Sort Direction Descending",
                    sortField: "Sort By",
                    nameField: "Name",
                    sizeField: "File Size",
                    typeField: "Type",
                    dateModifiedField: "Date Modified",
                    dateCreatedField: "Date Created",
                    listView: "List View",
                    gridView: "Grid View",
                    search: "Search",
                    details: "View Details",
                    detailsChecked: "On",
                    detailsUnchecked: "Off",
                    "delete": "Delete",
                    rename: "Rename"
                },
                views: {
                    nameField: "Name",
                    sizeField: "File Size",
                    typeField: "Type",
                    dateModifiedField: "Date Modified",
                    dateCreatedField: "Date Created",
                    items: "items"
                },
                dialogs: {
                    upload: {
                        title: "Upload Files",
                        clear: "Clear List",
                        done: "Done"
                    },
                    moveConfirm: {
                        title: "Confirm",
                        content: "<p style='text-align: center;'>Do you want to move or copy?</p>",
                        okText: "Copy",
                        cancel: "Move",
                        close: "close"
                    },
                    deleteConfirm: {
                        title: "Confirm",
                        content: "<p style='text-align: center;'>Are you sure you want to delete the selected file(s)?</br>You cannot undo this action.</p>",
                        okText: "Delete",
                        cancel: "Cancel",
                        close: "close"
                    },
                    renamePrompt: {
                        title: "Prompt",
                        content: "<p style='text-align: center;'>Enter new name for the file.</p>",
                        okText: "Rename",
                        cancel: "Cancel",
                        close: "close"
                    }
                },
                previewPane: {
                    noFileSelected: "No File Selected",
                    extension: "Type",
                    size: "Size",
                    created: "Date Created",
                    createdUtc: "Date Created UTC",
                    modified: "Date Modified",
                    modifiedUtc: "Date Modified UTC",
                    items: "items"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar `Object`
Defines the localization messages for the toolbar.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    createFolder: "New Folder",
                    upload: "Upload Files",
                    search: "Search Files"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.createFolder `String`

Defines the text for the create folder button in the toolbar. This message appears as a tooltip and button label for the create folder action in the FileManager toolbar. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    createFolder: "Create New Folder"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.upload `String`

Defines the text for the upload button in the toolbar. This message appears as a tooltip and button label for the file upload action in the FileManager toolbar. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    upload: "Upload Files"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.sortDirection `String`

Defines the text for the sort direction dropdown in the toolbar. This message appears as a label for the dropdown that allows users to select between ascending and descending sort orders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    sortDirection: "Sort Direction"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.sortDirectionAsc `String`

Defines the text for the ascending sort direction option in the toolbar dropdown. This message appears as an option in the sort direction dropdown menu, allowing users to sort files and folders in ascending order. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    sortDirectionAsc: "Sort Ascending"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.sortDirectionDesc `String`

Defines the text for the descending sort direction option in the toolbar dropdown. This message appears as an option in the sort direction dropdown menu, allowing users to sort files and folders in descending order. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    sortDirectionDesc: "Sort Descending"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.sortField `String`

Defines the text for the sort field dropdown in the toolbar. This message appears as a label for the dropdown that allows users to select which column to sort by (name, size, type, or date). It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    sortField: "Sort By"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.nameField `String`

Defines the text for the name field option in the sort field dropdown. This message appears as an option in the sort field dropdown menu, allowing users to sort files and folders by their name. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    nameField: "Name"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.sizeField `String`

Defines the text for the size field option in the sort field dropdown. This message appears as an option in the sort field dropdown menu, allowing users to sort files and folders by their size. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    sizeField: "File Size"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.typeField `String`

Defines the text for the type field option in the sort field dropdown. This message appears as an option in the sort field dropdown menu, allowing users to sort files and folders by their file type or extension. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    typeField: "Type"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.dateModifiedField `String`

Defines the text for the date modified field option in the sort field dropdown. This message appears as an option in the sort field dropdown menu, allowing users to sort files and folders by their last modification date. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    dateModifiedField: "Date Modified"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.dateCreatedField `String`

Defines the text for the date created field option in the sort field dropdown. This message appears as an option in the sort field dropdown menu, allowing users to sort files and folders by their creation date. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    dateCreatedField: "Date Created"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.search `String`

Defines the text for the search functionality in the toolbar. This message appears as a placeholder or label for the search input field, allowing users to search for files and folders by name. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    search: "Search"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.details `String`

Defines the text for the details toggle button in the toolbar. This message appears as a tooltip and button label for the toggle that switches the details pane visibility in the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    details: "View Details"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.detailsChecked `String`

Defines the text for the details toggle button when the details pane is visible. This message appears as an accessibility label or tooltip text when the details pane is currently shown, indicating the checked state of the toggle. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    detailsChecked: "On"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.detailsUnchecked `String`

Defines the text for the details toggle button when the details pane is hidden. This message appears as an accessibility label or tooltip text when the details pane is currently hidden, indicating the unchecked state of the toggle. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    detailsUnchecked: "Off"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.delete `String`

Defines the text for the delete button in the toolbar. This message appears as a tooltip and button label for the delete action that removes selected files or folders from the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    delete: "Delete"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar.rename `String`

Defines the text for the rename button in the toolbar. This message appears as a tooltip and button label for the rename action that allows users to rename selected files or folders in the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                toolbar: {
                    rename: "Rename"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views  `Object`
Defines the localization messages for the views.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    nameField: "Name",
                    sizeField: "File Size",
                    items: "items"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.nameField `String`

Defines the text for the name field column header in the FileManager view. This message appears as a column header in both list and grid views, identifying the column that displays file and folder names. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    nameField: "Name"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.sizeField `String`

Defines the text for the size field column header in the FileManager view. This message appears as a column header in both list and grid views, identifying the column that displays file sizes. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    sizeField: "File Size"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.typeField `String`

Defines the text for the type field column header in the FileManager view. This message appears as a column header in both list and grid views, identifying the column that displays file types or extensions. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    typeField: "Type"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.dateModifiedField `String`

Defines the text for the date modified field column header in the FileManager view. This message appears as a column header in both list and grid views, identifying the column that displays the last modification date of files and folders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    dateModifiedField: "Date Modified"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.dateCreatedField `String`

Defines the text for the date created field column header in the FileManager view. This message appears as a column header in both list and grid views, identifying the column that displays the creation date of files and folders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    dateCreatedField: "Date Created"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.items `String`

Defines the text suffix used when displaying item counts in the FileManager views. This message appears alongside numerical values to indicate the number of items (files and folders) in a directory or selection. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    items: "items"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.views.listViewLabel `String`

Defines the accessibility label for the list view in the FileManager. This message provides screen reader support and accessibility compliance by describing the list view mode for assistive technologies. It provides localization support for different languages and ensures proper accessibility standards.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                views: {
                    listViewLabel: "List View"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs `Object`
Defines the localization messages for the dialogs.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    upload: {
                        title: "Upload Files",
                        clear: "Clear List",
                        done: "Done"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.upload `Object`

Defines the localization messages for the upload dialog in the FileManager. This object contains all text messages displayed within the file upload dialog, including the dialog title, action buttons, and status messages. It provides comprehensive localization support for the upload functionality.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    upload: {
                        title: "Upload Files",
                        clear: "Clear List",
                        done: "Done"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.upload.title `String`

Defines the title text for the upload dialog in the FileManager. This message appears in the dialog header when users open the file upload dialog, providing a clear indication of the dialog's purpose. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    upload: {
                        title: "Upload Files"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.upload.clear `String`

Defines the text for the clear button in the upload dialog. This message appears on the button that allows users to remove all selected files from the upload queue before uploading. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    upload: {
                        clear: "Clear List"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.upload.done `String`

Defines the text for the done button in the upload dialog. This message appears on the button that closes the upload dialog after files have been successfully uploaded or when users want to dismiss the dialog. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    upload: {
                        done: "Done"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm `Object`

Defines the localization messages for the move confirmation dialog in the FileManager. This object contains all text messages displayed when users drag and drop files or folders, providing options to move or copy the selected items. It provides comprehensive localization support for the move/copy functionality.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        title: "Confirm",
                        content: "<p style='text-align: center;'>Do you want to move or copy?</p>",
                        okText: "Copy",
                        cancel: "Move"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm.title `String`

Defines the title text for the move confirmation dialog in the FileManager. This message appears in the dialog header when users perform a drag-and-drop operation that requires choosing between move or copy actions. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        title: "Confirm Move"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm.content `String`

Defines the content text for the move confirmation dialog in the FileManager. This message appears as the main body text that asks users whether they want to move or copy the selected files and folders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        content: "<p style='text-align: center;'>Do you want to move or copy?</p>"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm.okText `String`

Defines the text for the primary action button in the move confirmation dialog. This message appears on the button that performs the copy action when users choose to duplicate files and folders instead of moving them. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        okText: "Copy"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm.cancel `String`

Defines the text for the secondary action button in the move confirmation dialog. This message appears on the button that performs the move action when users choose to relocate files and folders instead of copying them. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        cancel: "Move"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.moveConfirm.close `String`

Defines the text for the close button in the move confirmation dialog. This message appears on the button or link that dismisses the dialog without performing any action, canceling the move or copy operation. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    moveConfirm: {
                        close: "close"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm `Object`

Defines the localization messages for the delete confirmation dialog in the FileManager. This object contains all text messages displayed when users attempt to delete files or folders, ensuring they confirm the destructive action before proceeding. It provides comprehensive localization support for the delete functionality.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        title: "Confirm",
                        content: "<p style='text-align: center;'>Are you sure you want to delete the selected file(s)?</p>",
                        okText: "Delete",
                        cancel: "Cancel"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm.title `String`

Defines the title text for the delete confirmation dialog in the FileManager. This message appears in the dialog header when users attempt to delete selected files or folders, providing a clear warning about the destructive action. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        title: "Confirm Deletion"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm.content `String`

Defines the content text for the delete confirmation dialog in the FileManager. This message appears as the main body text that asks users to confirm the permanent deletion of selected files and folders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        content: "<p style='text-align: center;'>Are you sure you want to delete the selected file(s)?</p>"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm.okText `String`

Defines the text for the primary action button in the delete confirmation dialog. This message appears on the button that executes the deletion when users confirm they want to permanently remove the selected files and folders. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        okText: "Delete"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm.cancel `String`

Defines the text for the cancel button in the delete confirmation dialog. This message appears on the button that dismisses the dialog without deleting any files or folders, allowing users to abort the deletion operation. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        cancel: "Cancel"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.deleteConfirm.close `String`

Defines the text for the close button in the delete confirmation dialog. This message appears on the button or link that dismisses the dialog without performing the deletion, effectively canceling the destructive operation. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    deleteConfirm: {
                        close: "close"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt `Object`

Defines the localization messages for the rename prompt dialog in the FileManager. This object contains all text messages displayed when users attempt to rename files or folders, including the dialog title, input prompt, and action buttons. It provides comprehensive localization support for the rename functionality.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        title: "Prompt",
                        content: "<p style='text-align: center;'>Enter new name for the file.</p>",
                        okText: "Rename",
                        cancel: "Cancel"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt.title `String`

Defines the title text for the rename prompt dialog in the FileManager. This message appears in the dialog header when users initiate a rename operation on a selected file or folder. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        title: "Rename File"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt.content `String`

Defines the content text for the rename prompt dialog in the FileManager. This message appears as instructional text that prompts users to enter a new name for the selected file or folder. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        content: "<p style='text-align: center;'>Enter new name for the file.</p>"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt.okText `String`

Defines the text for the primary action button in the rename prompt dialog. This message appears on the button that executes the rename operation when users have entered a new name for the selected file or folder. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        okText: "Rename"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt.cancel `String`

Defines the text for the cancel button in the rename prompt dialog. This message appears on the button that dismisses the dialog without renaming the file or folder, allowing users to abort the rename operation. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        cancel: "Cancel"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.dialogs.renamePrompt.close `String`

Defines the text for the close button in the rename prompt dialog. This message appears on the button or link that dismisses the dialog without performing the rename action, effectively canceling the operation. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                dialogs: {
                    renamePrompt: {
                        close: "close"
                    }
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane `Object`
Defines the localization messages for the preview pane.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    noFileSelected: "No File Selected",
                    extension: "Type",
                    size: "Size",
                    created: "Date Created"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.noFileSelected `String`

Defines the text displayed in the preview pane when no file is currently selected. This message appears in the details panel to inform users that they need to select a file or folder to view its properties and information. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    noFileSelected: "No File Selected"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.extension `String`

Defines the label text for the file extension field in the preview pane. This message appears as a label next to the file type or extension information when a file is selected in the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    extension: "Type"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.size `String`

Defines the label text for the file size field in the preview pane. This message appears as a label next to the file size information when a file is selected in the FileManager, displaying the file's storage size. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    size: "Size"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.created `String`

Defines the label text for the creation date field in the preview pane. This message appears as a label next to the file creation date information when a file or folder is selected in the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    created: "Date Created"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.modified `String`

Defines the label text for the modification date field in the preview pane. This message appears as a label next to the last modification date information when a file or folder is selected in the FileManager. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    modified: "Date Modified"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.previewPane.items `String`

Defines the label text for the item count field in the preview pane when a folder is selected. This message appears as a suffix alongside numerical values to indicate the number of files and subfolders contained within a selected directory. It provides localization support for different languages and allows customization of the user interface text.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            messages: {
                previewPane: {
                    items: "items"
                }
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

## Methods

### path

Gets the path that the FileManager is navigated to.

#### Returns

`String` The current active path.

#### Example

    <div id="fileManager"></div>
    <script>
        var myData = [{
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
            ]}
        ];

        $("#fileManager").kendoFileManager({
            dataSource: myData
        });

        var fileManager = $("#fileManager").data("kendoFileManager");

      	fileManager.navigate("folder");

        var path = fileManager.path();

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(path);
    </script>

### view

Gets or sets the view of the FileManager.

#### Parameters

##### view `String` *(optional)*

The name of the view.

#### Returns

`String` The current view.

#### Example

    <div id="fileManager"></div>
    <script>
        var myData = [{
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
            ]}
        ];

        $("#fileManager").kendoFileManager({
            dataSource: myData
        });

        var fileManager = $("#fileManager").data("kendoFileManager");

      	fileManager.view("grid");
    </script>

### navigate

Navigates to the specified path.

> Note: If you wish to use the method to navigate to a child folder, you will need to navigate to its parent folder first.

#### Parameters

##### path `String`

The path to navigate.

#### Example

    <div id="fileManager"></div>
    <script>
        var myData = [{
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
            ]}
        ];

        $("#fileManager").kendoFileManager({
            dataSource: myData
        });

        var fileManager = $("#fileManager").data("kendoFileManager");

      	fileManager.navigate("folder");
    </script>

### refresh

Refreshes the current view of the FileManager. Rebinds the data.

#### Example

    <div id="fileManager"></div>
    <script>
        var myData = [{
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
            ]}
        ];

        $("#fileManager").kendoFileManager({
            dataSource: myData
        });

        var fileManager = $("#fileManager").data("kendoFileManager");

      	fileManager.refresh();
    </script>

### executeCommand

Executes a command.

#### Parameters

##### command `String`

The command to execute.

##### args `Object` *(optional)*

The command arguments.

#### Example - execute `RenameCommand` and `TogglePaneCommand`

    <input type="button" value="Rename Folder" onclick="renameFolder()" />
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
        uploadUrl: "/kendo-ui/service/FileManager/Upload"
      });

      function renameFolder() {
        let filemanager = $("#filemanager").data("kendoFileManager");
        let selectedFolder = $(".k-filemanager-treeview").find(".k-selected").parents(".k-treeview-item");

        if (selectedFolder.length > 0) {
          filemanager.executeCommand({ command: "RenameCommand", options: { target: $(".k-filemanager-treeview").find(".k-selected").parents(".k-treeview-item"), item: filemanager.getSelected()[0] } })
        }
        else {
          alert("Select a folder in the tree");
        }
      }

      $(document).ready(function () {
        var filemanager = $("#filemanager").getKendoFileManager();

        filemanager.executeCommand({ command: "TogglePaneCommand", options: { type: "preview" } });
        $("input[title='View Details']").getKendoSwitch().toggle();
      })
    </script>

### getSelected
Gets the selected files (the JSON representation of the files).

#### Example - log the selected files data

    <button onclick="getSelectedFiles()" class="k-button">Get selected files</button>
    <div id="fileManager"></div>

    <script>
      var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

      $("#fileManager").kendoFileManager({
        width: 500,
        dataSource: {
          transport: {
            read: {
              method: "POST",
              url: baseUrl + "Read"
            }
          }
        }
      });

      function getSelectedFiles(){
        var filemanager = $("#fileManager").getKendoFileManager();
        var files = filemanager.getSelected()
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(files)
      }
    </script>

#### Returns

`Object` The currently selected files.

### getSize
Gets the size of the FileManager wrapper.

#### Returns

`Object` The width and height of the FileManager wrapper in pixels.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            width: 800,
            height: 600,
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });

        var fileManager = $("#fileManager").data("kendoFileManager");
        var size = fileManager.getSize();

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Width: " + size.width + ", Height: " + size.height);
    </script>

### setDataSource

Sets the dataSource of an existing FileManager and rebinds it.

#### Parameters

##### dataSource `kendo.data.FileManagerDataSource`

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
            transport: {
                read: {
                method: "POST",
                url: baseUrl + "Read"
                },
                update: {
                method: "POST",
                url: baseUrl + "Update"
                },
                create: {
                method: "POST",
                url: baseUrl + "Create"
                },
                destroy: {
                method: "POST",
                url: baseUrl + "Destroy"
                }
            }
            }
        });

        var myData = [{
            name: "Folder",
            isDirectory: true,
            hasDirectories: true,
            path: "Folder",
            extension: "",
            size: 0,
            createdUtc: new Date(),
            items: [{
                name: "Subfolder",
                isDirectory: true,
                hasDirectories: false,
                path: "SubFolder",
                extension: "",
                size: 0,
                createdUtc: new Date()
            }]
        }];
        var dataSource = new kendo.data.FileManagerDataSource({
            data: myData,
            schema: kendo.data.schemas.filemanager
        });

        var filemanager = $("#fileManager").data("kendoFileManager");
        filemanager.setDataSource(dataSource);
    </script>

### destroy
Destroys the FileManagers.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });

        var fileManager = $("#fileManager").data("kendoFileManager");
        fileManager.destroy();
    </script>

## Events

### navigate

Fired when navigation occurs.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.path `String`

The navigation path.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            navigate: function(e) {
                console.log("Navigated to: " + e.path);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### select

Fired when selection changes.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.entries `Array`

The selected file/files (the JSON representation of the files).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            select: function(e) {
                console.log("Selected files: ", e.entries);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### open

Fired when a file is opened (with double click).

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.entry `Object`

The opened file (the JSON representation of the file).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            open: function(e) {
                console.log("Opened file: " + e.entry.name);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

The widget instance which fired the event.

##### e.entry `Object`

The opened file (the JSON representation of the file).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            open: function(e) {
                console.log("Opened file: " + e.entry.name);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### execute

Fired when a command is executed.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.command `String`

The name of the command.

##### e.options `Object`

The options of the command.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            execute: function(e) {
                console.log("Executed command: " + e.command);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### error

Fired when a error in the DataSource happen.

#### Event data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.xhr `Object`

The XMLHttpRequest object.

##### e.status `String`

The request status.
##### e.errorThrown `String`

The error message.

#### Example

	<div id="filemanager"></div>
    <script>
        $("#filemanager").kendoFileManager({
          dataSource: {
            schema: kendo.data.schemas.filemanager,
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/FileManager/Read",
                method: "POST"
              }
            }
          },
          error: function(e) {
            console.log("Request failed with status " + e.status)
          }
        });
    </script>

### dataBinding

Fired before the widget binds to its data source.

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

##### e.source `String`

The source which triggered the event.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataBinding: function(e) {
                console.log("Data binding with action: " + e.action);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

#### Example

    <div id="filemanager"></div>
    <script>
    var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

            $("#filemanager").kendoFileManager({
                dataSource: {
                    schema: kendo.data.schemas.filemanager,
                    transport: {
                        read: {
                            url: baseUrl + "Read",
                            method: "POST"
                        },
                        create: {
                            url: baseUrl + "Create",
                            method: "POST"
                        },
                        update: {
                            url: baseUrl + "Update",
                            method: "POST"
                        },
                        destroy: {
                            url: baseUrl + "Destroy",
                            method: "POST"
                        }
                    }
                },
                uploadUrl: "/kendo-ui/service/FileManager/Upload",
                toolbar: {
                    items: [
                        { name: "createFolder" },
                        { name: "upload" }
                    ]
                },
                dataBound: onDataBound
            });

        function onDataBound(e) {
            console.log("event: DataBound");
        }
    </script>

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

### drop

Fired when a file is dragged and dropped over a folder.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.target `String`

The drop target's id.

##### e.items `Array`

The items dragged and dropped over the target.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            drop: function(e) {
                console.log("Dropped " + e.items.length + " items on target: " + e.target);
            },
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### command

Fired when server command is executed (copy, move, delete or rename).

The event is useful to get feedback when server commands has failed or succeeded and take additional actions based on the status.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.status `String`

The status of the command executed (success, fail or cancel).

##### e.action `String`

The action performed by the command (add, remove or itemchange).

##### e.data `Object`

Retrieves contextual data that holds information about the item(s) involved in the command's action.

##### e.response `Object`

The returned response by the service.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/service/v2/core/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: {
                        method: "POST",
                        url: baseUrl + "Read"
                    },
                    update: {
                        method: "POST",
                        url: baseUrl + "Update"
                    },
                    create: {
                        method: "POST",
                        url: baseUrl + "Create"
                    },
                    destroy: {
                        method: "POST",
                        url: baseUrl + "Destroy"
                    }
                }
            },
            command: function (ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Command " + ev.action + " - item:" + ev.data.item.path + "; status: " + ev.status);

                if (ev.status === "fail") { // Refresh the FileManager if a command has failed.
                    ev.sender.refresh()
                }
            }
        });
    </script>



