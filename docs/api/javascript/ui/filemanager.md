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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            width: 500,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            height: 500,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            initialView: "grid",
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            resizable: false,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            draggable: false,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    },
                    update: {
                        type: "post",
                        url: baseUrl + "Update"
                    },
                    create: {
                        type: "post",
                        url: baseUrl + "Create"
                    },
                    destroy: {
                        type: "post",
                        url: baseUrl + "Destroy"
                    }
                }
            }
        });
    </script>

#### Example - transport with functions.

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: function(options) {
                        var that = this;

                        $.ajax({
                            url: baseUrl + "Read",
                            dataType: "json",
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
                            dataType: "json",
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
                            dataType: "json",
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
                            dataType: "json",
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

### uploadUrl `String`

Sets the upload url for the Upload widget.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            uploadUrl: baseUrl + "Upload",
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### upload.cancel `Function`

Fires when the upload was cancelled while in progress. [Upload Events](/api/javascript/ui/upload#events).

### upload.clear `Function`

Fires when the files are cleared by clicking on the **Clear** button. [Upload Events](/api/javascript/ui/upload#events).

### upload.complete `Function`

Fires when all active uploads complete&mdash;either successfully or with errors. [Upload Events](/api/javascript/ui/upload#events).

### upload.error `Function`

Fires when an `upload` or `remove` operation fails. [Upload Events](/api/javascript/ui/upload#events).

### upload.pause `Function`

Fires when the files are cleared by clicking the **Pause** button. The button is visible if `chunksize` is set. [Upload Events](/api/javascript/ui/upload#events).

### upload.progress `Function`

Fires when the data about the progress of the upload is available. [Upload Events](/api/javascript/ui/upload#events).

### upload.resume `Function`

Fires when the files are resumed through clicking the **Resume** button. The button is visible if `chunksize` is set and the file upload is paused. [Upload Events](/api/javascript/ui/upload#events).

### upload.remove `Function`

Fires when an uploaded file is about to be removed. If the event is canceled, the `remove` operation is prevented. [Upload Events](/api/javascript/ui/upload#events).

### upload.select `Function`

Fires when a file is selected. [Upload Events](/api/javascript/ui/upload#events).

### upload.success `Function`

Fires when an `upload` or `remove` operation is completed successfully. [Upload Events](/api/javascript/ui/upload#events).

### upload.upload `Function`

Fires when one or more files are about to be uploaded. The canceling of the event prevents the upload. [Upload Events](/api/javascript/ui/upload#events).


### toolbar `Boolean | Object` *(default: true)*

Configures the Toolbar of the FileManager

### toolbar.items `Array`

Configures the items collection of the toolbar.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

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
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

Apart from the built-in tools, the FileManager fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

### toolbar.items.type `String`
Specifies the type of the button.

### toolbar.items.overflow `String`
Specifies the overflow of the button.

### toolbar.items.click `Function`
Specifies the click handler of the button.

### toolbar.items.command `String`
Specifies the command of the button.

### toolbar.items.options `String`
Specifies the command options of the button.

### toolbar.items.name `String`
Specifies the name of the button.

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

### toolbar.items.text `String`
Sets the text of the button.

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

### toolbar.items.id `String`
Specifies the ID of the button.

### toolbar.click `Function`

Fires when the user clicks a command button. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.close `Function`

Fires when the SplitButton's popup closes. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.open `Function`

Fires when the Split Button's popup opens. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.toggle `Function`

Fires when the user changes the checked state of a toggle button. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.overflowClose `Function`

Fires when the overflow popup container is about to close. [Toolbar Events](/api/javascript/ui/toolbar#events).

### toolbar.overflowOpen `Function`

Fires when the overflow popup container is about to open. [Toolbar Events](/api/javascript/ui/toolbar#events).

### dialogs `Object`

Specifies the composite Dialog widgets of the FileManager.

### dialogs.upload `Object`

Configures the Upload dialog - [kendoDialog](/api/javascript/ui/dialog)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                upload: {
                    // kendoDialog options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                moveConfirm: {
                    // kendoConfirm options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                deleteConfirm: {
                    // kendoConfirm options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dialogs: {
                renamePrompt: {
                    // kendoPrompt options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: false,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                items: [
                    "delete"
                ]
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### contextMenu.items.name `String`
Specifies the name of the item.

### contextMenu.items.text `String`
Specifies the text of the item.

### contextMenu.items.spriteCssClass `String`
Specifies the spriteCssClass of the item.

### contextMenu.items.icon `String`

Specifies the icon of the item.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

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
                        type: "post",
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
      var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

      $("#fileManager").kendoFileManager({
        height: 500,
        dataSource: {
          transport: {
            read: {
              type: "post",
              url: baseUrl + "Read"
            },
            destroy: {
              type: "post",
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

### contextMenu.open `Function`

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.activate `Function`

Fires when a sub menu or the ContextMenu gets opened and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.deactivate `Function`

Fires when a sub menu or the ContextMenu gets closed and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

### contextMenu.select `Function`

Fires when a menu item gets selected. [ContextMenu Events](/api/javascript/ui/contextmenu#events).

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            contextMenu: {
                select: function(e){
                    console.log('Selected item: ' + $(e.item).text())
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### views `Object`

Configures every view registered for the FileManager.

### views.grid `Object`

Configures the built-in grid view - accepts [kendoGrid options](/api/javascript/ui/grid)

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                grid: {
                    // kendoGrid options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                list: {
                    // kendoListView options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                tree: {
                    // kendoTreeView options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane `Object`

Configures the Preview Pane of the FileManager.

### previewPane.metaFields `Array`

Configures the meta fields to be showed in the preview pane.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            previewPane: {
                metaFields: ["created", "createdUtc", "size"]
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### previewPane.noFileTemplate `String|Function`
Defines a new template for the preview pane when no file/folder is selected.

### previewPane.singleFileTemplate `String|Function`
Defines a new template for the preview pane when a single file/folder is selected.

### previewPane.multipleFilesTemplate `String|Function`
Defines a new template for the preview pane when multiple files/folders are selected.

### breadcrumb `Object|Boolean` *(default: true)*

Configures or disables the Breadcrumb component.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            breadcrumb: false,
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### breadcrumb.rootIcon `String`
Defines a new root icon for the breadcrumb.

### breadcrumb.delimiterIcon `String`
Defines a new delimiter icon for the breadcrumb.

### messages `Object`
Defines the text of the localizable UI parts of the FileManager.

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

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
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });
    </script>

### messages.toolbar `Object`
Defines the localization messages for the toolbar.

### messages.toolbar.createFolder `String`

### messages.toolbar.upload `String`

### messages.toolbar.sortDirection `String`

### messages.toolbar.sortDirectionAsc `String`

### messages.toolbar.sortDirectionDesc `String`

### messages.toolbar.sortField `String`

### messages.toolbar.nameField `String`

### messages.toolbar.sizeField `String`

### messages.toolbar.typeField `String`

### messages.toolbar.dateModifiedField `String`

### messages.toolbar.dateCreatedField `String`

### messages.toolbar.search `String`

### messages.toolbar.details `String`

### messages.toolbar.detailsChecked `String`

### messages.toolbar.detailsUnchecked `String`

### messages.toolbar.delete `String`

### messages.toolbar.rename `String`

### messages.views  `Object`
Defines the localization messages for the views.

### messages.views.nameField `String`

### messages.views.sizeField `String`

### messages.views.typeField `String`

### messages.views.dateModifiedField `String`

### messages.views.dateCreatedField `String`

### messages.views.items `String`

### messages.views.listViewLabel `String`

### messages.dialogs `Object`
Defines the localization messages for the dialogs.

### messages.dialogs.upload `Object`

### messages.dialogs.upload.title `String`

### messages.dialogs.upload.clear `String`

### messages.dialogs.upload.done `String`

### messages.dialogs.moveConfirm `Object`

### messages.dialogs.moveConfirm.title `String`

### messages.dialogs.moveConfirm.content `String`

### messages.dialogs.moveConfirm.okText `String`

### messages.dialogs.moveConfirm.cancel `String`

### messages.dialogs.moveConfirm.close `String`

### messages.dialogs.deleteConfirm `Object`

### messages.dialogs.deleteConfirm.title `String`

### messages.dialogs.deleteConfirm.content `String`

### messages.dialogs.deleteConfirm.okText `String`

### messages.dialogs.deleteConfirm.cancel `String`

### messages.dialogs.deleteConfirm.close `String`

### messages.dialogs.renamePrompt `Object`

### messages.dialogs.renamePrompt.title `String`

### messages.dialogs.renamePrompt.content `String`

### messages.dialogs.renamePrompt.okText `String`

### messages.dialogs.renamePrompt.cancel `String`

### messages.dialogs.renamePrompt.close `String`

### messages.previewPane `Object`
Defines the localization messages for the preview pane.

### messages.previewPane.noFileSelected `String`

### messages.previewPane.extension `String`

### messages.previewPane.size `String`

### messages.previewPane.created `String`

### messages.previewPane.modified `String`

### messages.previewPane.items `String`

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

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            views: {
                list: {
                    // kendoListView options
                }
            },
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    }
                }
            }
        });

    	var fileManager = $("#fileManager").data("kendoFileManager");

   	fileManager.executeCommand({ command: "TogglePaneCommand", options: { type: "preview" } });
    	$("#details-toggle").getKendoSwitch().toggle();
    </script>

### getSelected
Gets the selected files (the JSON representation of the files).

#### Example - log the selected files data

    <button onclick="getSelectedFiles()" class="k-button">Get selected files</button>
    <div id="fileManager"></div>

    <script>
      var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

      $("#fileManager").kendoFileManager({
        width: 500,
        dataSource: {
          transport: {
            read: {
              type: "post",
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

### setDataSource

Sets the dataSource of an existing FileManager and rebinds it.

#### Parameters

##### dataSource `kendo.data.FileManagerDataSource`

#### Example

    <div id="fileManager"></div>
    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
            transport: {
                read: {
                type: "post",
                url: baseUrl + "Read"
                },
                update: {
                type: "post",
                url: baseUrl + "Update"
                },
                create: {
                type: "post",
                url: baseUrl + "Create"
                },
                destroy: {
                type: "post",
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

## Events

### navigate

Fired when navigation occurs.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.path `String`

The navigation path.

### select

Fired when selection changes.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.entries `Array`

The selected file/files (the JSON representation of the files).

### open

Fired when a file is opened (with double click).

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.entry `Object`

The opened file (the JSON representation of the file).

### execute

Fired when a command is executed.

#### Event Data

##### e.sender `kendo.ui.FileManager`

The widget instance which fired the event.

##### e.command `String`

The name of the command.

##### e.options `Object`

The options of the command.

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
                url: "https://demos.telerik.com/kendo-ui/service/FileManager/Read",
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

### dataBound

Fired when the widget is bound to data from its data source.

#### Example

    <div id="filemanager"></div>
    <script>
    var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

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
        var baseUrl = "https://demos.telerik.com/kendo-ui/service/filemanager/";

        $("#fileManager").kendoFileManager({
            dataSource: {
                transport: {
                    read: {
                        type: "post",
                        url: baseUrl + "Read"
                    },
                    update: {
                        type: "post",
                        url: baseUrl + "Update"
                    },
                    create: {
                        type: "post",
                        url: baseUrl + "Create"
                    },
                    destroy: {
                        type: "post",
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



