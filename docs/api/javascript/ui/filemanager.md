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


<div class="meta-api-description">
How can I adjust the width of the Kendo UI file manager? Adjust or configure the total width, fixed or responsive size, or horizontal dimension of the file manager interface to control pane distribution, content area size, layout scaling, or container width using pixel values or CSS size units like percentages, enabling precise control over the file explorer’s visual footprint and resizing behavior within the application interface.
</div>

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


<div class="meta-api-description">
How do I set the height of a Kendo UI FileManager? Adjust or configure the vertical dimension, height, or size of a file management interface to control layout appearance, scrolling regions, and responsiveness dynamically or on setup; manage fixed height settings, adaptive resizing, overflow handling, and component container sizing to optimize user interface display, content fitting, viewport constraints, or full-height expansions within file explorer or file browser components.
</div>

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


<div class="meta-api-description">
How to set the default display mode for the Kendo UI FileManager? Control and configure the default display mode or layout that appears when the file manager interface launches, enabling you to set the initial presentation such as list view, detailed view, thumbnail view, icon view, or grid arrangement. Adjust startup visuals to decide how files and folders are organized and shown at first load, allowing customization of the opening user interface to match preferences for browsing, managing, or previewing content. This setup governs the initial perspective or arrangement users encounter, influencing navigation style, file representation, and overall layout right when the file manager initializes.
</div>

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


<div class="meta-api-description">
How to enable resizing in Kendo UI FileManager component? Control and configure the ability to resize user interface elements and panes within file management components, including enabling or disabling resize functionality, specifying which edges or handles allow resizing, setting minimum and maximum size limits, adjusting drag behavior for dynamic resizing, and customizing how users interact with resizable panels to manage layout and content areas flexibly. This setting governs how resizing operations are initialized and controlled, ensuring adaptable sizes and user-adjustable dimensions for file browser sections, directory lists, preview panes, and other modular interface parts.
</div>

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


<div class="meta-api-description">
How to enable drag-and-drop functionality in Kendo UI FileManager? Control the ability to enable or disable drag-and-drop interactions for moving, rearranging, or reordering files and folders within a file management interface, allowing users to initiate or prevent drag operations for flexible organization, interactive sorting, or layout adjustments during file browsing sessions.
</div>

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


<div class="meta-api-description">
How to configure data source for Kendo UI FileManager component? Configure or set up the file management data layer by connecting the file management component to various data sources such as local arrays, remote APIs, REST endpoints, cloud storage services, or custom backends for file listing, uploading, updating, deleting, and managing operations. Enable data binding and integration by specifying data source objects, defining transport methods like read, create, update, and destroy operations either as functions or configurations, handling custom parameter mapping when working with function transports, and controlling how the file management system communicates with backend services for dynamic file handling workflows. This includes options to customize request payloads, synchronize with server responses, manage file system actions programmatically, and integrate complex or remote data storage patterns into the file management interface.
</div>

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


<div class="meta-api-description">
How can I customize file upload behavior in the Kendo FileManager widget? Control and customize file upload behavior by setting asynchronous endpoints, enabling chunked uploads, allowing multiple file selection, applying validation rules, defining upload templates, configuring automatic upload triggers, and managing status messages through flexible upload component options compatible with KendoUpload settings to handle file transfer processes efficiently and adapt to various upload scenarios and requirements.
</div>

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


<div class="meta-api-description">
How do I configure the upload URL for Kendo UI FileManager to send files to a specific server endpoint? Specify or configure the target server address, endpoint URL, or upload destination for sending files when enabling file upload functionality, allowing control over where files are posted or transmitted during file management operations. This setting supports absolute or relative URLs to define the server location used by upload handlers, facilitating customization of file transfer targets, upload routes, or API endpoints for file submissions across different environments or backends. Adjusting the upload path, destination link, or server upload URL helps developers control file storage locations during client-to-server file uploads or data transfer processes.
</div>

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


<div class="meta-api-description">
How to cancel ongoing file uploads in Kendo UI for jQuery FileManager control? Control or configure aborting ongoing file uploads with the ability to stop in-progress uploads, cancel requests, halt file transfers, roll back interface changes, discard temporary data, handle user-initiated upload interruptions, manage cancel events during uploads, implement upload cancellation handlers, and ensure cleanup of partial upload state in file management workflows.
</div>

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


<div class="meta-api-description">
How to handle clear event in Kendo UI FileManager? Detect and manage actions triggered when users clear or remove pending file uploads via a clear or reset control, enabling developers to listen for clearing events to update user interface state, cancel ongoing file processing, perform cleanup tasks, or synchronize application behavior after upload removal; supports handling events fired on upload cancellation or reset commands, configuring callbacks to respond to user-initiated removal of selected files before upload completion, and integrating custom logic for upload queue management during or after clear actions.
</div>

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


<div class="meta-api-description">
What triggers when all file uploads finish in Kendo UI's FileManager? Trigger actions or callbacks triggered when all file uploads finish processing, whether successful or failed, enabling updates to user interfaces, reloading file lists, toggling buttons or controls, managing bulk upload completion events, and handling overall upload queue finalization status to synchronize UI state changes after multiple concurrent file transfers have ended.
</div>

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


<div class="meta-api-description">
How do I handle failed file uploads in Kendo UI for jQuery FileManager? Manage and respond to file upload or deletion failures by configuring error handling for failed upload or removal operations, capturing upload errors, handling exceptions during file transfers, detecting when file uploads or removals do not succeed, implementing callbacks for upload or delete failures, setting up listeners for file operation errors, controlling behaviors on unsuccessful file uploads or deletes, reacting to file management process errors, and handling asynchronous failures during file transactions with customizable error responses and event-driven error notifications.
</div>

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


<div class="meta-api-description">
How to pause file upload in Kendo UI FileManager? Control and manage the pausing of chunked file uploads during file transfer processes, enabling the interruption and halting of ongoing uploads, clearing or resetting the queue of files waiting to be uploaded, responding to user actions like clicking pause buttons, configuring handlers or callbacks triggered when upload sequences are paused or canceled, managing the upload flow dynamically, supporting chunked or segmented file transfers with the ability to stop and resume operations, setting up event-driven handling for upload pauses, and controlling upload state transitions to handle user-driven interruption and queue management in file upload interfaces.
</div>

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


<div class="meta-api-description">
How to track file upload progress in Kendo UI FileManager? Track and monitor file upload progress in real time by capturing bytes transferred and updating progress indicators dynamically, enabling developers to handle upload status updates, trigger actions during uploads, manage progress events, configure callbacks for upload tracking, receive continuous feedback on file transfer status, integrate progress bars or loaders, and respond to incremental upload data for seamless user experience during file transfers.
</div>

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


<div class="meta-api-description">
How do I resume an interrupted file upload in Kendo UI FileManager? Enable resuming interrupted or paused chunked file uploads by responding to resume events triggered when users click resume buttons during multipart uploads with chunk size configured, allowing seamless continuation of upload processes, UI state updates, error recovery, and upload management workflows that handle pause, resume, manual restart, or automatic continuation of large or unstable file transfers, supporting robust upload control and user interaction handling in file management or storage integration scenarios.
</div>

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


<div class="meta-api-description">
How to prevent accidental file removal during upload in Kendo UI FileManager? Intercept, control, or customize file deletion during upload processes by detecting when an uploaded file is about to be removed, enabling developers to prompt for confirmation, prevent accidental removals, block file deletion, modify or cancel the removal action, handle events before a file is deleted, and update application state accordingly, supporting use cases like user prompts before delete, aborting file removals programmatically, managing upload lifecycle events related to file deletion, and ensuring safer file upload workflows with options to confirm or deny removing files.
</div>

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


<div class="meta-api-description">
How to handle file selection in Kendo UI FileManager upload interface? Detect and respond to user file selections within upload interfaces by capturing file pick events, enabling custom handling such as validating file properties, managing or modifying selected file lists, triggering UI updates, preparing or queuing files for upload, intercepting selection actions, and integrating with upload workflows. Support scenarios including reacting to single or multiple file selection changes, applying client-side validation on chosen files, dynamically updating upload queues or previews, and executing business logic immediately when files are chosen through file dialogs or drag-and-drop. Manage file input selection events to control upload readiness, enforce file type or size restrictions, and synchronize file metadata processing with user interactions in file management components.
</div>

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


<div class="meta-api-description">
How to detect successful file uploads in Kendo UI FileManager? Trigger actions or callbacks upon successful completion of file uploads or removals, enabling you to detect when a file transfer finishes without errors, update file lists or directories accordingly, refresh views, display confirmation messages or notifications, process server responses after uploads or deletions, handle post-upload processing workflows, execute custom functions once file operations succeed, monitor file manager events for successful transfers, and synchronize client-side state with server confirmations during file handling operations.
</div>

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


<div class="meta-api-description">
How can I intercept and validate files before uploading them with Kendo UI for jQuery FileManager? Control and customize the file uploading process by intercepting the files before transfer to validate, inspect, or filter multiple files, enabling checks for file types, sizes, or custom criteria, and offering the ability to block or cancel uploads dynamically; handle events triggered at the moment files are about to be sent, inspect the entire file list for validation, prevent unauthorized or unwanted files from uploading, manage file upload workflows, and implement custom logic to stop or allow file transmission based on specific conditions or validations before the upload completes.
</div>

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


<div class="meta-api-description">
How to customize the toolbar in Kendo UI FileManager? Customize and configure the file management toolbar by setting, arranging, or modifying toolbar buttons, controls, and layout during initialization or runtime. Enable or disable specific toolbar items, reorder actions, apply custom templates or command handlers, add new buttons, or remove defaults to tailor the toolbar for file operations, user interface preferences, workflow optimization, and enhanced control over tool visibility and behavior. Adjust toolbar settings to support creating, editing, navigation, or batch file processing with flexible customization of commands and interactive elements.
</div>

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


<div class="meta-api-description">
How can I customize the toolbar in Kendo UI FileManager to show only specific buttons? Customize and control the toolbar by specifying which buttons, separators, groups, text labels, or custom templates appear, arranging their order, enabling or disabling specific controls, attaching command actions, and defining interactive behaviors for file management interfaces. This includes setting up toolbar elements at startup, configuring the layout and grouping of controls, embedding custom UI components or templates, and tailoring the toolbar to match user workflows and commands within file management tools. Developers can configure toolbar button visibility, order, grouping, commands, and insert custom templates or text to create a personalized and functional file manager toolbar experience.
</div>

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


<div class="meta-api-description">
How do I customize the types of buttons displayed in Kendo UI FileManager's toolbar? Configure, select, or set the kind and category of toolbar controls or buttons displayed in the file management interface, enabling customization of toolbar elements, their function, and appearance during initialization, controlling which control types such as buttons, dropdowns, toggles, or separators appear in the toolbar, as well as how they behave or look.
</div>

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


<div class="meta-api-description">
What is the overflow behavior for toolbar buttons in Kendo UI FileManager? Customize how toolbar buttons react when space is limited by setting their overflow behavior, including options to keep buttons visible, move them into an overflow menu, collapse them, hide them, or control their visibility dynamically in the file management toolbar. Adjust button appearance and placement during initialization to manage toolbar layout, optimize usability under constrained widths, configure responsive toolbar item arrangement, enable smooth transitions between visible and overflow states, and set how individual toolbar controls behave when space is insufficient. This caters to use cases like responsive design, dynamic UI adaptation, button prioritization, and maintaining access to essential actions despite limited toolbar real estate.
</div>

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


<div class="meta-api-description">
How can I handle click events on custom toolbar buttons in Kendo UI FileManager? Configure custom actions triggered by toolbar button clicks in the file management interface, enabling developers to set up event handlers that respond to user interactions on toolbar items. This includes handling button presses to execute commands, open dialogs, update or modify UI elements, or perform specific operations when a toolbar control is clicked. Implement click event callbacks or listeners during component initialization to control file manager toolbar interactions, customize behavior, trigger workflows, and manage user input on toolbar buttons.
</div>

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


<div class="meta-api-description">
How to customize file operations in Kendo UI File Manager using command property? Set or customize the function triggered by clicking a toolbar button to control file operations, specify or link commands by name or identifier, map buttons to standard file management actions or user-defined handlers, configure button click behaviors, enable custom or prebuilt command execution, control toolbar button responses, assign actions for file manipulation tasks from the toolbar, manage command bindings for toolbar items including custom commands or default operations, and adjust interaction handling for toolbar controls in file management interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the command behavior for a specific toolbar button in the Kendo UI File Manager? Configure toolbar button commands with customizable options including command behavior settings, callback functions, custom parameters, and specific command configurations for file management tools. Enable control over command execution, tailor button actions with custom callbacks or parameters, set behavior adjustments, and specify detailed command options during toolbar setup or initialization. Use this configuration to adjust command responses, modify how buttons trigger functions, and pass additional data or handlers to toolbar commands for enhanced file manager interactivity and flexibility.
</div>

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


<div class="meta-api-description">
How do I set unique identifiers for toolbar buttons in Kendo UI FileManager? Set or configure a unique identifier for toolbar buttons within file management interfaces to enable precise targeting, referencing, customization, and event handling for specific toolbar controls, allowing developers to assign meaningful names, labels, or keys for each button to manage actions, detect clicks, or tailor toolbar behavior through configuration or scripting in file explorer or file manager toolbars.
</div>

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


<div class="meta-api-description">
How to enable toggle functionality for toolbar buttons in Kendo UI FileManager? Control whether toolbar buttons in a file management interface can behave as toggle switches that alternate between active and inactive states, enabling users to set buttons as pressed or unpressed, selected or deselected, for persistent state management versus standard clickable actions without state retention. Configure toggle functionality for toolbar elements to allow switching, enable or disable toggle modes, set buttons as toggleable or regular, and manage the selection state of toolbar controls to help users indicate active modes or options through persistent pressed states in file navigation and operations.
</div>

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


<div class="meta-api-description">
How to customize the button labels in Kendo UI FileManager's toolbar? Customize toolbar button labels for file management interfaces by setting visible captions, captions text, or display names on toolbar controls to change or localize button text for actions such as upload, delete, create, or rename files and folders. Configure and override default toolbar item text, adjust button names dynamically, localize button labels into different languages, or set custom captions for toolbar commands within file browsing or file handling toolbars. Enable clear, user-friendly, and context-specific button text on file manager toolbars by controlling toolbar items’ displayed text or captions.
</div>

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


<div class="meta-api-description">
How to customize the toolbar in Kendo UI for jQuery FileManager widget? Customize or extend the toolbar by embedding custom HTML content, DOM elements, or user-defined controls directly into the toolbar area, enabling insertion of buttons, widgets, or interactive components within the file management interface's toolbar section. Configure bespoke toolbar entries without predefined types by supplying templates that render personalized elements, allowing dynamic insertion of markup, custom layouts, or third-party components into the toolbar wrapper for enhanced UI flexibility and tailored user experiences. This feature supports injecting any HTML or element node to tailor the toolbar appearance, control placement, and interactivity beyond standard toolbar options.
</div>

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


<div class="meta-api-description">
How to show text next to icons in FileManager toolbar? Control the display of toolbar item labels in a file management interface by configuring whether text appears alongside icons directly on the toolbar, only within the overflow or dropdown menu, or in both locations simultaneously. Enable or disable showing descriptive labels to improve usability and clarity depending on screen space and user preferences, adjusting whether button text is visible next to toolbar icons, only in secondary menus, or fully visible throughout the interface. Customize label visibility for toolbar buttons to optimize accessibility, navigation, and user experience in toolbars that support overflow menus or compact layouts.
</div>

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


<div class="meta-api-description">
How to set the primary button in FileManager toolbar using Kendo UI for jQuery? Control which toolbar button appears as the main or highlighted action by marking it as primary, enabling you to emphasize or feature a specific file management command such as save, upload, or delete. Configure the key or default toolbar item to stand out visually with distinct styling for quick access, prominence, or priority, ensuring that the most important action is easily recognizable. Set or enable a button’s primary status during setup to differentiate it from secondary controls, highlight default or suggested tasks, and improve user interface clarity by visually prioritizing one toolbar element over others. This setting helps you designate the main actionable button for users needing prominent, emphasized commands in file management toolbars.
</div>

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


<div class="meta-api-description">
How can I customize the HTML attributes of FileManager toolbar buttons? Control and customize toolbar button HTML attributes by specifying key-value pairs to set element identifiers, CSS classes, data attributes, ARIA roles, or any custom metadata for buttons in the toolbar, enabling tailored styling, accessibility enhancements, semantic roles, event targeting, or integration with external scripts and frameworks.
</div>

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


<div class="meta-api-description">
How do I enable specific toolbar items in Kendo UI FileManager when it loads? Set or configure the initial interactive state of toolbar buttons or menu commands in a file management interface, controlling whether specific toolbar controls are active, enabled, clickable, or disabled when the file manager loads, allowing customization of which toolbar items respond immediately to user actions or remain inactive at start, including toggling tool availability, enabling or disabling UI controls, and managing initial toolbar interactivity for file operations and navigation.
</div>

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


<div class="meta-api-description">
How to hide specific buttons in Kendo UI FileManager toolbar? Manage toolbar button visibility in file management interfaces by configuring whether specific buttons are shown or hidden, enabling developers to enable, disable, or toggle toolbar controls dynamically during setup. Adjust button display states, control interface elements visibility, customize which toolbar actions appear or remain concealed on initialization, and set visibility flags to conditionally render or omit toolbar buttons for streamlined user experiences.
</div>

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


<div class="meta-api-description">
How can I customize the icons in the Kendo UI FileManager toolbar? Configure and customize toolbar button icons by setting one or multiple CSS classes as a space-separated string to control icon appearance, including sprite-based images, font icons, or any custom styling for toolbar icons. Enable applying specific class names to the icon elements in a file management toolbar to style, theme, or replace default icons with custom sprites, fonts, or CSS-driven visuals. Adjust, override, or extend icon styles on toolbar buttons by assigning CSS class lists for flexible icon representation, including sprite sheets or font icon sets, ensuring easy modification and consistent visual design in user interfaces.
</div>

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


<div class="meta-api-description">
How do I set custom icons for file manager toolbar buttons in Kendo UI? Configure toolbar button icons with custom images by specifying an image URL to display personalized graphics or icons in file management toolbars. Enable, set, or control custom button visuals using image links to replace default icons, supporting branding, UI customization, or specific action representation in file manager toolbars. Use imageUrl settings to embed user-defined pictures in toolbar controls for distinctive button appearance, including custom icons, logos, or actionable images that visually communicate functionality across file navigation, editing, and management interfaces.
</div>

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


<div class="meta-api-description">
How to customize icon display for toolbar buttons in Kendo UI FileManager? Specify display settings for toolbar button icons in file management interfaces, including options to show icons directly on the main toolbar, within the overflow or dropdown menu, or simultaneously in both areas to customize visibility and user interface layout; configure icon placement behavior for toolbar items to enhance accessibility and streamline command access, supporting choices that control whether icons appear prominently alongside buttons, only when menus expand, or in both contexts for consistent visual cues on file operation controls.
</div>

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


<div class="meta-api-description">
How to customize the icon for file manager toolbar buttons in Kendo UI? Set or customize the visual symbol, glyph, or icon for toolbar buttons within a file management interface, enabling configuration of toolbar item appearance by selecting from predefined, theme-based icon sets or sprite resources, allowing developers to assign, change, or control toolbar icons to enhance UI clarity, usability, and consistent visual cues in file navigation or manipulation tools.
</div>

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


<div class="meta-api-description">
How to uniquely identify a file manager toolbar button in Kendo UI for jQuery? Specify or configure the unique identifier for a toolbar button within a file management interface to programmatically access, target, manipulate, enable, disable, simulate interactions, attach event handlers, apply custom CSS selectors, or modify styles and behavior of individual toolbar elements. This ID-based referencing supports precise control over toolbar buttons through scripting, DOM selection, dynamic interaction simulation, and customization in complex file manager toolbars.
</div>

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


<div class="meta-api-description">
How to handle click events on File Manager toolbar buttons in Kendo UI for jQuery? Detect and manage toolbar button clicks within file management interfaces, enabling developers to capture user interactions on command buttons, customize or override default click actions, handle events triggered by toolbar elements, inspect details about the clicked buttons and associated event data, implement custom behaviors on toolbar commands, control toolbar event handling, listen to toolbar command activations, and respond programmatically to toolbar button presses in file management components.
</div>

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


<div class="meta-api-description">
How to handle closing of popup menus in Kendo UI FileManager toolbar? Control and respond to the closing or dismissal of popup menus, dropdowns, or split button panels within a file management toolbar, enabling you to trigger callbacks or event handlers that update interface state, restore user focus, manage modal dialogs, log user interactions, or synchronize UI changes whenever a toolbar popup closes or is dismissed, useful for handling toolbar split button actions, capturing user navigation flows, or customizing behavior after popup menus shut down in file manager toolbars.
</div>

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


<div class="meta-api-description">
How to handle opening split-button popup in Kendo UI FileManager toolbar? Detect and respond to the opening of a split-button popup in a file management toolbar, enabling actions such as executing custom code, updating user interface elements dynamically, lazy-loading menu options, triggering analytics events, handling toolbar interactions, configuring popup behavior, running event-driven logic on menu expansion, controlling dropdown visibility, and integrating responsive UI updates when the split-button menu opens.
</div>

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


<div class="meta-api-description">
How do I detect toggle button state changes in Kendo UI FileManager toolbar? Detect and respond to toggle button state changes in a file management toolbar by capturing toggle events when users enable or disable toolbar buttons. Monitor toggle state updates to synchronize UI elements, trigger commands, update application state, handle button checked or unchecked actions, listen for toggle interactions, and manage toolbar button state changes in response to user clicks or programmatic toggling signals. Capture toolbar toggle events for customized behavior, state synchronization, and dynamic interface updates based on user interactions with toggle buttons.
</div>

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


<div class="meta-api-description">
How to handle toolbar buttons when there's not enough horizontal space in a FileManager? Manage how toolbar buttons and controls adapt when there is limited horizontal space, including options to collapse, hide, or group excess toolbar items into an overflow menu, customize dynamic resizing, adjust visibility for responsive design, configure behavior for toolbar item wrapping, enable automatic overflow handling, control toolbar layout when too many commands appear, set overflow options to optimize user interface space, and refine how toolbar actions are presented on narrow screens or constrained containers.
</div>

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


<div class="meta-api-description">
How to handle overflowing toolbar items in Kendo UI FileManager? Configure how the toolbar handles excess or overflowing items when there isn’t enough space, including options to move extra buttons into dropdown menus, enable horizontal scrolling to view all controls, group toolbar elements into expandable or collapsible sections for better organization, or disable overflow handling entirely which may cause items to be hidden or clipped. Adjust the display mode to control toolbar item layout, visibility, and user interaction for scenarios like responsive design, limited screen width, or dynamic content changes, ensuring toolbar usability through menu-based overflow, scrollable access, section grouping, or no overflow management depending on your interface needs.
</div>

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


<div class="meta-api-description">
How to control scroll buttons in Kendo UI FileManager toolbar? Control the visibility and behavior of navigation arrow buttons in a toolbar when managing overflowed items, including options to enable, disable, or automatically show scroll controls for toolbars in scroll mode, allowing configuration of scroll button appearance, toggling arrow navigation for overflowed toolbar elements, adjusting whether scroll arrows appear always, never, or only when required, and managing user interaction with horizontal toolbar scrolling or overflow navigation in file manager toolbars.
</div>

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


<div class="meta-api-description">
How do I control where scroll buttons appear in Kendo UI FileManager toolbar? Control and customize the placement and alignment of scroll buttons that appear when toolbar items exceed available space, enabling navigation through overflowing toolbar content by configuring position options such as placing scroll arrows or navigation controls only at the beginning, only at the end, or split across both ends of the toolbar. Adjust the horizontal placement of overflow navigation buttons in toolbars for better user interface control, including enabling or disabling scroll controls at toolbar start, end, or both sides to optimize accessibility and user interaction with file manager or other toolbar components.
</div>

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


<div class="meta-api-description">
How to control the scroll increment of toolbar buttons in Kendo UI FileManager? Control and customize the horizontal or vertical scrolling increment of toolbar buttons when overflow navigation triggers, enabling precise adjustment of scroll steps or distances in pixels per click to enhance usability, improve navigation smoothness, manage how much the toolbar shifts upon clicking scroll arrows, set or configure the scroll amount for toolbars with hidden or overflowing items, define scroll granularity to fine-tune the toolbar's movement when users navigate through excess toolbar content, adjust scroll increments for seamless browsing through toolbar options, and optimize scroll behavior for toolbars that cannot display all buttons at once.
</div>

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


<div class="meta-api-description">
How to handle close event in Kendo UI FileManager toolbar overflow popup? Detect or handle the closing action of a toolbar overflow popup in a file management interface to run cleanup tasks, update interface states, validate conditions before the popup disappears, intercept or respond to overflow menu closure events, trigger custom logic when the toolbar overflow closes, manage UI behavior on overflow popup close, listen for or react to overflow menu dismissal, control actions on toolbar overflow closing, execute code before the overflow popup hides, and implement event-driven responses tied to toolbar overflow closing moments.
</div>

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


<div class="meta-api-description">
How can I customize actions when the FileManager toolbar overflow menu opens? Configure event handlers to detect and respond when the toolbar overflow menu or popup in a file management interface is about to open, enabling you to trigger custom logic, update toolbar items, refresh component state, adjust UI elements dynamically, or prepare data just before the overflow container becomes visible, supporting scenarios such as modifying available actions, enabling or disabling buttons, and managing component behavior related to overflow display timing.
</div>

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


<div class="meta-api-description">
How to customize file operation dialogs in Kendo UI for jQuery? Customize and control file operation dialogs including confirm, create, rename, delete, and upload windows by configuring dialog components; set options or override default dialog behavior and appearance for file interactions, tailor prompt windows, modify dialog properties at initialization, enable custom pop-ups for file management tasks, and adjust user interface dialogs used in file operations to enhance or change dialog flows and responses within the file handling system.
</div>

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


<div class="meta-api-description">
How do I customize the upload dialog interface in Kendo UI for jQuery's file manager? Control and customize the upload dialog interface within the file management system by configuring its title, buttons, size, appearance, and behavior using dialog settings compatible with common modal frameworks. Adjust dialog dimensions, labels, and controls for file upload prompts, set modal options for user interactions, enable or disable specific buttons, and tailor the upload interface presentation during initialization to fit various UI and UX requirements, ensuring seamless integration and consistent dialog management for file upload workflows.
</div>

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


<div class="meta-api-description">
How do I customize the move confirmation dialog in Kendo UI FileManager? Control and customize the confirmation pop-up or dialog that appears when files or folders are moved via drag-and-drop in a file management interface, including setting custom titles, messages, buttons, and interaction options. Adjust how move confirmations behave during drag-and-drop operations, configure dialog prompts and confirmation windows for moving items, and manage user prompts or alerts related to file relocation actions. Enable or modify move action verification dialogs to enhance user feedback, allow passing specific options for confirming or canceling file moves, and tailor the look and functionality of move confirmation pop-ups in file browsing or management contexts.
</div>

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


<div class="meta-api-description">
How can I customize the confirmation dialog when deleting files in Kendo UI FileManager? Control and customize the confirmation prompt displayed when deleting files, including configuring dialog titles, messages, button labels, and callback actions for user interaction during file removal processes. Enable setting personalized confirmation dialogs, customize alert windows for file deletions, adjust prompt texts, handle user responses with callbacks, and manage delete confirmations within file management workflows. Configure dialog content, set custom confirmation messages, specify button text for acceptance or cancellation, and control the user confirmation experience when files are being removed.
</div>

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


<div class="meta-api-description">
How do I customize the rename dialog prompt in Kendo UI File Manager? Customize or configure the file rename dialog prompt to set titles, messages, input placeholders, default values, button labels like OK or Cancel, modal behavior, and validation rules for renaming files or folders. Control rename input dialogs during file management workflows by adjusting dialog prompts, labels, validation callbacks, button text, and modal settings to tailor user experience when prompting for new names. Enable, set, or override rename prompts with flexible configuration options to manage rename dialog appearance, content, and behavior within file management interfaces.
</div>

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


<div class="meta-api-description">
How can I customize the right-click context menu in Kendo UI for jQuery FileManager? Control and customize the FileManager right-click context menu by defining which menu items appear, setting commands and templates, managing interaction behaviors, and organizing actions for files and folders; configure menu grouping, enable or disable specific options, tailor event responses, and specify how context menus trigger and display to suit various user workflows and interface requirements.
</div>

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


<div class="meta-api-description">
How to customize the items in Kendo UI FileManager's context menu? Configure and customize the file manager’s right-click context menu by defining, setting, or modifying the menu item list, including adding, removing, or arranging actions such as open, download, rename, delete, or custom commands; control submenu nesting, icons, text labels, styles, separators, and click event handlers to enable tailored user interactions and extend the context menu with specific functionality during initialization or dynamically.
</div>

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


<div class="meta-api-description">
How do I customize the label of individual context menu entries in a Kendo UI FileManager? Configure or specify the label, identifier, or key for individual context menu entries within a file manager’s right-click menu setup, enabling precise targeting, customization, binding, or recognition of specific menu commands during initialization or runtime. This setting helps in defining, naming, or referencing context menu items to control their display text, associate actions, hook event handlers, or modify behavior dynamically in file browsing interfaces. It supports use cases involving labeling menu options, linking custom commands, identifying menu selections programmatically, and tailoring user interface elements for context-specific operations within file management environments.
</div>

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


<div class="meta-api-description">
How do I customize the text label for context menu entries in Kendo UI File Manager? Customize or configure the displayed text label for context menu entries in file management interfaces, enabling control over captions, menu item names, and localized or translated strings; adjust, set, or change the visible wording users see on right-click menus or action menus within file managers; modify or define labeling for context menu items to tailor user interface language, customize menu item text dynamically, rename options in file operation menus, or control the presentation of context menu choices for better user interaction and localization support.
</div>

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


<div class="meta-api-description">
How to customize the CSS class for context menu icons in a Kendo UI file manager? Set or customize the CSS class for context menu icons within a file management interface, enabling control over sprite-based visual icons displayed next to menu items, including configuring, styling, applying custom classes, and adjusting icon appearance through sprite CSS classes during component setup to tailor the file manager's context menu visuals and enhance user interface consistency and branding.
</div>

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


<div class="meta-api-description">
How do I customize the icon for each context menu item in Kendo UI's FileManager widget? Control or customize the visual icon displayed next to context menu entries in file management interfaces by setting or configuring graphical indicators such as CSS icon classes, font glyphs, SVG images, or custom pictures to enhance menu item appearance, enable visual cues, specify symbolic representations, or adjust icons for context menu options, buttons, or commands in file explorers and user interfaces.
</div>

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


<div class="meta-api-description">
How to customize the action triggered by selecting a context menu option in Kendo UI FileManager? Set or customize the action triggered when selecting a context menu option in file management, enabling configuration of built-in commands or custom identifiers to control which operation executes upon user interaction, such as opening, deleting, copying, or any specific task linked to the file manager’s context menu item, allowing developers to define, assign, or override commands that the file manager will invoke, handle, or process when right-click menu choices are made.
</div>

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


<div class="meta-api-description">
How to prevent close actions on Kendo UI FileManager context menus? Control the behavior of right-click or context menus to stop them or their submenus from closing automatically by intercepting and canceling close actions, enabling you to prevent menu closure with event handling techniques like calling preventDefault or blocking the close event, useful for customizing interactions, maintaining menu state, or managing submenu visibility during complex user workflows where you want menus to remain open despite user clicks or other triggers.
</div>

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


<div class="meta-api-description">
How to customize the behavior of opening the context menu in Kendo UI FileManager? Control and customize the behavior when a file manager or hierarchical context menu attempts to open, including intercepting and canceling the menu or submenu display by executing logic before it appears, handling events that trigger before menus are shown, enabling prevention of menu opening through event cancellation methods, managing user interactions that invoke right-click or context menus, implementing conditional display rules or restrictions, configuring event handlers to run pre-display code, and controlling dynamic enabling or disabling of menu visibility for file management interfaces or nested submenu systems.
</div>

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


<div class="meta-api-description">
How do I trigger custom code when a context menu finishes opening in Kendo UI File Manager? Trigger custom functions or execute code immediately after a right-click or context menu, including submenus, finishes opening and its animation completes within file management interfaces. Detect when context menus or nested menus fully appear, enable event-driven actions upon menu activation or opening completion, respond dynamically to users opening folder or file options, configure listeners for context menu visibility changes, and handle UI states after menu animations finalize in file explorer tools. This supports use cases such as initializing controls, loading dynamic menu content, or tracking user interactions precisely when menus become active and visible.
</div>

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


<div class="meta-api-description">
When does Kendo UI FileManager context menu deactivate event trigger? Detect when a context menu or submenu in a file management interface has completely closed and its closing animation finished to trigger code execution for cleanup tasks, restoring focus, updating application state, or initiating subsequent user interface updates; capture the precise moment the menu or submenu deactivates after animation, enabling developers to handle event-driven workflows related to context menu closure, submenu dismissal, and final UI transitions in file browsing environments.
</div>

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


<div class="meta-api-description">
How do I handle menu item selections in Kendo UI FileManager's context menu? Detect and respond to user selections from file manager context menus by capturing item choices to execute custom logic such as triggering file actions, running commands, updating the interface, handling menu option clicks, or executing navigation based on the selected context menu entry. Capture and handle events fired when context menu items are activated, enabling developers to control and customize behavior dynamically on user right-click menus, context menu item triggers, or command invocations within file operations. This event-driven approach supports implementing tailored responses to context menu commands, user interaction with file management menus, and customized UI updates triggered by menu selections.
</div>

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


<div class="meta-api-description">
How to customize file list view in Kendo UI FileManager? Configure, customize, and control individual views including layout styles, templates, toolbar options, command sets, selection modes, sorting preferences, and other per-view behaviors to tailor file management interfaces; set up multiple view types with distinct appearance and interaction patterns, manage how file lists or grids display and respond to user actions, enable or disable view-specific features, and fine-tune sorting, filtering, and toolbar commands for each view context within the file manager environment.
</div>

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


<div class="meta-api-description">
How do I customize the file manager grid in Kendo UI for jQuery? Adjust the file manager’s grid display by configuring column layouts, sorting orders, pagination settings, row selection modes, custom cell templates, virtualization options, and interactive behaviors to tailor how files and folders are presented and navigated. Enable or disable multi-column sorting, set page sizes for data loading, control selection methods like single or multiple rows, apply custom rendering templates for cells or headers, and optimize performance with virtualization and lazy loading. Modify grid views to fit file organization needs, enhance user experience with customized column arrangements and filtering, or integrate standard grid configurations for complex data presentation and interaction control in file management interfaces.
</div>

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


<div class="meta-api-description">
How to customize file manager list display in Kendo UI for jQuery? Customize and control file manager list displays with thumbnail-style item layouts by configuring built-in list view options, including templates for item rendering, data binding setups, selection modes, and visual styling. Enable grid or list layouts with thumbnail previews, adjust appearance and behavior of item selection, set custom item templates, and manage how files and folders are rendered and interacted with in a file browsing interface. Configure the collection view to display files in list format with flexible templating, selectable items, and responsive layouts optimized for browsing, searching, or bulk operations on file entries using familiar list view controls and rendering patterns.
</div>

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


<div class="meta-api-description">
How do I customize the folder tree display in Kendo UI's FileManager? Control and customize the folder tree display and interaction within the file management interface by configuring data binding, templates, selection modes, expand and collapse actions, and event handling for tree nodes. Enable or modify how the hierarchical folder structure renders, respond to user actions, and manage dynamic data sources or custom layouts, including setting options for node templates, selection behavior, expanding or collapsing folders programmatically, and attaching events like click or data load handlers to tailor the tree navigation experience. Adjust initialization parameters to influence tree view behavior, appearance, and user interaction within the file manager’s side panel or folder explorer feature.
</div>

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


<div class="meta-api-description">
How can I customize the file preview panel in Kendo UI FileManager? Adjust settings to enable or disable the file preview panel, customize its layout, size, and position within the file manager interface, define the content and metadata displayed for selected files, configure preview templates, and control how file previews appear and behave during navigation or selection in the file explorer.
</div>

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


<div class="meta-api-description">
How do I customize the display of file metadata in Kendo UI FileManager's preview pane? Control and customize the display of file metadata in the preview pane by selecting, ordering, labeling, and toggling the visibility of various metadata fields. Configure which file details appear, adjust the sequence of metadata information, define custom field names or labels, and enable or disable specific attributes shown during file previews. Manage and tailor metadata visibility to optimize file information presentation, including sorting metadata elements or setting preferred fields for quick reference in the file preview interface.
</div>

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


<div class="meta-api-description">
How to customize preview pane content in Kendo UI FileManager when no file is selected? Control and customize the content shown in the preview area when no file or folder is selected by configuring placeholder templates, empty state messages, default preview content, or instructional UI elements. Enable custom empty view layouts, adjust what appears in the preview pane without selection, set fallback content for when files are not chosen, and manage how blank or unselected states are visually represented in file browsing interfaces. Tailor the preview section's appearance during empty or null selection scenarios to include helpful prompts, guides, or alternative interface components that provide context when no items are currently highlighted.
</div>

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


<div class="meta-api-description">
How to customize preview content in Kendo UI FileManager's single file preview pane? Customize or configure the preview content and layout shown when a single file or folder is selected in a file manager interface by defining custom templates, markup, or rendering functions that control how thumbnails, metadata, details, or actionable items appear in the preview pane, enabling developers to override default previews and tailor the display dynamically based on the selected item's data using HTML strings, script IDs, or template functions.
</div>

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


<div class="meta-api-description">
How to customize the preview pane when selecting multiple files in Kendo UI FileManager? Control and customize the preview pane display and layout when multiple files or folders are selected, enabling tailored templates, custom content rendering, dynamic multi-item previews, configurable markup for batch selections, and personalized visualization of grouped files or directories in file management interfaces.
</div>

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


<div class="meta-api-description">
How do I customize breadcrumb navigation in Kendo UI File Manager? Control the visibility and customization of file path navigation in a file management interface by enabling, disabling, or configuring breadcrumb navigation elements. Adjust breadcrumb templates, appearance, and display settings to show or hide the current directory path, toggle navigation breadcrumbs on or off, manage folder hierarchy indicators, set path navigation visibility, and customize breadcrumb UI for clearer file location tracking within file managers or explorer components during initialization.
</div>

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


<div class="meta-api-description">
How to customize root folder icon in FileManager breadcrumb? Customize or replace the root folder icon displayed in the file navigation breadcrumb to personalize, configure, or set a different visual indicator for the top-level directory; control the breadcrumb trail’s starting point icon to better fit UI themes, enhance navigation clarity, or override default folder symbols in file explorers, path bars, or directory hierarchies.
</div>

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


<div class="meta-api-description">
How to customize the separator icon in Kendo UI file manager breadcrumb navigation? Control and customize the visual separator or icon displayed between breadcrumb navigation items in file or folder paths, enabling you to set, override, or change the delimiter symbol such as arrows, chevrons, slashes, or custom icons and SVGs to modify the appearance of hierarchical file path breadcrumbs for clearer navigation, folder structure indication, or UI personalization in file browsers.
</div>

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


<div class="meta-api-description">
How to customize button captions in Kendo UI FileManager component? Customize, configure, and control the user interface text by setting or overriding labels, button captions, prompts, tooltips, and messages in different languages or custom wording for file management components. Enable localization, translation, and internationalization by providing tailored strings for UI elements, adjusting interface text content, or personalizing prompts and notifications to match user preferences or specific language needs within file management workflows.
</div>

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


<div class="meta-api-description">
How do I customize the labels for the file manager toolbar buttons in Kendo UI? Customize and translate toolbar button labels, commands, and tooltips in file management interfaces by setting or configuring localized language strings for toolbar actions, enabling multi-language support, internationalization of file manager controls, and adjusting display text for toolbar buttons such as upload, download, delete, rename, and navigation commands to match user-preferred languages or regional settings in the file explorer toolbar interface.
</div>

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


<div class="meta-api-description">
How do I customize the label for the "Create New Folder" button in a Kendo UI File Manager toolbar? Customize the label, tooltip, and display text for the create new folder button in a file management toolbar to support localization, internationalization, or personalized UI language settings, enabling control over the folder creation prompt, button captions, hover text, and user interface terminology related to adding directories within file explorer or document management tools.
</div>

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


<div class="meta-api-description">
How can I change the label on the upload button in Kendo UI File Manager? Customize, localize, and configure the upload button label and tooltip text on the file manager toolbar, controlling how the upload action is presented, named, described, or displayed to users in different languages or contexts; adjust the upload control’s visible text, tooltip hints, button captions, and UI labels for file uploads within the file manager interface.
</div>

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


<div class="meta-api-description">
How do I customize the dropdown text for sorting order in Kendo UI File Manager? Customize or localize the toolbar dropdown text for sorting order in file management interfaces, enabling users to switch or configure sorting direction as ascending or descending, adjust sort order labels, control ascending vs descending display in UI toolbars, set dropdown messages for sorting preferences, and tailor language or phrasing for sorting direction toggle options in file explorers or file manager toolbars.
</div>

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


<div class="meta-api-description">
How to change the label for ascending sort in Kendo UI FileManager toolbar? Set or configure the ascending sort label text for file listing controls, customize or localize the sort direction indicator in the file manager toolbar, control the display wording for sorting files in ascending order, change or override the default ascending sort label shown in file navigation or sorting UIs, adjust text for ascending order sorting in file management interfaces, provide localized or custom strings for sorting files from A to Z or smallest to largest, modify the toolbar button label that signifies ascending sorting, rename or translate the ascending sort direction option in file explorers or document managers.
</div>

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


<div class="meta-api-description">
How to customize the label for descending sort order in Kendo UI FileManager toolbar? Control and customize the label or text displayed for descending sort order in the file manager toolbar, enabling localization and language-specific adjustments for sort direction indicators, configure custom messages or labels for sort descending states in file listing toolbars, set and localize the wording that indicates files or folders are sorted in descending order, tailor the toolbar's descending sort description or prompt to match various languages, adapt and define sort direction messages for sorting files from highest to lowest or newest to oldest in file browsing interfaces.
</div>

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


<div class="meta-api-description">
How to customize the "Sort by" label in Kendo UI FileManager toolbar? Customize or translate the toolbar label for sorting options in the file manager interface, enabling control over the displayed text for sorting criteria such as file name, file size, file type, or modification date; configure or localize the dropdown menu that lets users select how files are ordered by these attributes, supporting multiple languages and user preferences for sorting representation in the toolbar.
</div>

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


<div class="meta-api-description">
How to customize the label for sorting files by name in Kendo UI FileManager? Customize and localize the label or text for the file and folder sorting option that organizes items by their name, enabling control over the display language and terminology for the name-based sorting feature in file management interfaces, allowing developers to set, translate, rename, or adapt the text shown for sorting files alphabetically or by filename in toolbars or file explorers.
</div>

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


<div class="meta-api-description">
How do I customize the file size sorting label in Kendo UI File Manager? Translate or customize the label for the file size sorting dropdown in file management interfaces, enabling configuration of displayed text for file size sorting options across different languages and locales. Adjust, localize, or set the size label in sorting toolbars, change the wording for file size sorting dropdowns, control multilingual display of file size sort options, and tailor the sort field name to match language-specific terminology or user preferences.
</div>

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


<div class="meta-api-description">
How do I customize the "Type" label in Kendo UI FileManager's toolbar? Customize, translate, or localize the label for the file type or extension filter in the file manager’s sorting dropdown menu on the toolbar, enabling modification or configuration of the text displayed when sorting files and folders by their type, format, or extension, with options to set or change the name shown for the sorting field that categorizes items based on their file extension or kind.
</div>

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


<div class="meta-api-description">
How do I customize the label for sorting files by date modified in Kendo UI FileManager? Configure or customize the label text shown in file management interfaces for sorting files by their last modification date, enabling localization or translation of the date-modified sorting option in toolbars or dropdown menus. Adjust the displayed name for sorting by modification timestamps, change or set the text that appears when users select to arrange or order files based on when they were last edited, updated, or changed. Control the wording or phrasing used in user interface elements that sort file lists by modification date attributes, allowing developers to tailor the descriptive text for sorting files by their modification time in various languages or regional settings.
</div>

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


<div class="meta-api-description">
How do I customize the "Date Created" field in the Kendo UI File Manager toolbar? Customize, configure, or localize the text labels, names, or options for sorting files by their creation date in the file manager toolbar dropdown, enabling multilingual or regional display of "date created" sorting criteria, creation timestamp field labels, or toolbar menu date filters for user-friendly, localized file sorting interfaces.
</div>

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


<div class="meta-api-description">
How can I customize the search input label in the Kendo UI FileManager toolbar? Customize and localize the search input label or placeholder text in the file management toolbar, including configuring search box prompts, modifying search field hints, setting localized placeholder messages, adjusting search input labels for different languages, controlling search bar text in file explorers, and tailoring toolbar search messages to enhance user interface clarity and support multilingual environments.
</div>

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


<div class="meta-api-description">
How to customize the label and tooltip for the details button in Kendo UI FileManager? Customize and configure the toolbar button label and tooltip text that toggles the details pane in file management interfaces, including localization and internationalization support for different languages, enable personalized or translated descriptions for interface elements controlling file details visibility, set or override default messages for UI components showing file metadata, adjust the wording displayed on buttons or tooltips related to expanding or collapsing detail views, control user-facing text for detail panel toggles in file explorers or document managers, and tailor button captions and hints to match specific application terminology or user preferences in file navigation tools.
</div>

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


<div class="meta-api-description">
How do I customize the "Details Checked" label in a Kendo UI FileManager toolbar? Customize or translate the label and tooltip text displayed on the toolbar toggle for the details pane when it is active or checked in a file management interface, including controlling how the interface indicates that details view is enabled, modifying the messages shown for toggling detailed file information, and setting localized or customized strings for the toolbar’s details toggle state indicator.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip for the details toggle button in Kendo UI FileManager when the file details pane is hidden? Customize, translate, or set the text label and tooltip shown on the toolbar’s details toggle button when the file details pane is hidden, enabling localization and adjusting the interface language or caption for hidden details view, including tooltips, button labels, and accessibility descriptions related to showing or hiding file information in file management interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the delete button in Kendo UI FileManager toolbar? Customize, localize, or configure the label, tooltip, title, and text of the delete button in a file management toolbar used for removing or deleting selected files, folders, or items. Control the wording, translations, and display of delete actions shown in the toolbar interface for file explorer components, enabling dynamic adjustment of button captions, hints, or accessible labels associated with file or folder removal commands. Adjust the UI text and messages related to deleting files or directories in the file manager toolbar to match user language, preferences, or context.
</div>

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


<div class="meta-api-description">
How do I change the label for the rename button in a Kendo UI FileManager toolbar? Customize, configure, or localize the toolbar rename button’s label and tooltip text to control how the rename action is presented in file management interfaces, enabling setting, updating, or changing the displayed text for the rename control to match different languages, user preferences, or UI terminology related to renaming files and folders within a file explorer toolbar.
</div>

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


<div class="meta-api-description">
How do I customize the file manager interface labels in Kendo UI for jQuery? Customize and localize file manager interface labels and messages for different views including list, details, and thumbnails by configuring display text, translating UI elements, adjusting terminology, changing captions, and tailoring prompts or headings to specific languages or user preferences across various view modes and presentation styles.
</div>

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


<div class="meta-api-description">
How do I customize the file name column label in Kendo UI File Manager? Customize or translate the label and header text for the file name column in file manager list and grid layouts, enabling control over the displayed column title for filenames, document names, or item identifiers. Adjust, set, or localize the naming header to match different languages, user preferences, or UI designs, ensuring the file or item name field label is accurately reflected in various view modes and contexts.
</div>

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


<div class="meta-api-description">
How do I translate the file size column header in Kendo UI FileManager? Adjust or translate the text label for the file size column header in file management interfaces, control or set the displayed heading for file size in file lists, configure the size field title for different languages or custom UI, modify how the size column is named or presented in file explorer views, customize the label text for file size metrics shown in file browsers, localize or rename the size header in file manager grids, specify alternative captions or strings for file size columns to suit user interfaces or language preferences, manage or personalize the display name of the size attribute in file views, change or define the wording for size columns in file directory displays for clarity or branding, and tailor the file size header wording to meet localization, accessibility, or design requirements.
</div>

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


<div class="meta-api-description">
How do I customize the column header for file types in a Kendo UI FileManager? Customize or localize the column header that displays file types or extensions in file manager list and grid views, enabling control over how file type labels, file extension names, and their headings appear in various file browsing interfaces, including configuring or renaming the type column title, adjusting file category headers, or setting how file formats are presented to users in file explorer or directory listing environments.
</div>

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


<div class="meta-api-description">
How to customize the label for the last modified date column in Kendo UI FileManager? Control and customize the label text for the last modified date column in file management list or grid views, enabling localization and personalized display of modification timestamps. Configure, set, or change the column header that shows file update dates across different interface layouts. Adjust how the modification date is presented and labeled to fit language preferences or UI terminology, ensuring clarity in file version tracking, sorting, and display of change history. Enable tailored headers for the last modified timestamp to enhance user understanding and regional adaptation in file browsing applications.
</div>

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


<div class="meta-api-description">
How to change the label for the "Date Created" column in Kendo UI FileManager? Change or localize the label text for the "Date Created" column header in a file manager interface, configure the displayed name or title that identifies when files or items were originally created, set custom or translated header captions for creation date columns, modify or control the naming of date-related view fields showing file creation timestamps, update the column heading text to fit different languages or user preferences, localize and personalize the creation date column label to improve clarity or match UI language settings in file browsing or management views.
</div>

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


<div class="meta-api-description">
How do I customize the file count label in Kendo UI FileManager? Customize and localize the suffix or label displayed alongside numeric counts of files, folders, or items within directories or user selections in a file manager interface. Configure how item quantities are presented, including pluralization, language-specific terms, and contextual wording for file and folder counts, enabling tailored messaging that fits different locales, user preferences, or UI themes. Control the textual representation of item numbers in views where file system contents are listed or summarized, supporting adjustments to singular, plural, and other numeric-dependent suffixes to enhance clarity and localization in file browsing or management scenarios.
</div>

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


<div class="meta-api-description">
How do I customize the screen reader label for the list view in Kendo UI's FileManager widget? Configure or customize the screen reader label for the file manager's list view to improve accessibility and localization, enabling users to set descriptive, readable alt text or ARIA labels for the file list interface. Control and define the accessible name or voiceover text that announces the file list view in applications, helping visually impaired users understand the current display mode through assistive technologies by providing localized, user-friendly list view descriptions and labels. Adjust or set the accessibility identifier for screen reader support on the file listing panel to enhance usability and compliance with accessibility standards.
</div>

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


<div class="meta-api-description">
How can I customize the titles and button labels in Kendo UI File Manager dialogs for multilingual support? Customize and localize file management interface dialogs by setting multilingual titles, button labels, and informational messages; control dialog text for errors, confirmations, prompts, and alerts in file manager operations; enable configuring user interface language for dialogs in file handling components, adjust wording in pop-up windows related to file actions, support translations or custom phrasing for dialog content, and tailor message displays for diverse locales and contexts within file system dialogs.
</div>

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


<div class="meta-api-description">
How to customize upload dialog interface in Kendo UI FileManager? Customize, translate, or configure the text content, titles, button labels, status messages, prompts, and notifications within the upload dialog interface for file management, enabling localization, internationalization, language support, user interface text adjustments, and personalized messaging for file upload dialogs in applications.
</div>

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


<div class="meta-api-description">
How can I customize the title of the upload dialog in Kendo UI FileManager? Customize and localize the text displayed as the title in the upload dialog header within file management interfaces, enabling control over the wording and language of the upload prompt shown to users during file selection or transfer processes, adjusting dialog headers for different languages, user preferences, or branding needs related to uploading files.
</div>

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


<div class="meta-api-description">
How to change the "Clear" button label in Kendo UI FileManager upload dialog? Customize, translate, or set the label for the button that removes all selected files from the upload queue in the file manager upload dialog, including changing the clear button text or caption to match different languages, localizations, or UI requirements, enabling control over the interface wording that resets or empties the list of files awaiting upload.
</div>

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


<div class="meta-api-description">
How to change the "done" button label in Kendo UI FileManager upload dialog? Customize or set the label text for the button that confirms or completes file uploads in file manager dialogs, enabling control over the upload completion prompt, dismissing or closing the upload dialog once files have successfully uploaded, adjusting the confirmation button wording, modifying the done or finish button text on file upload dialogs, configuring the user interface message that finalizes the upload process, controlling the text displayed on the upload dialog’s completion action, and personalizing the confirmation prompt that users click to close or exit the upload window after files are added.
</div>

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


<div class="meta-api-description">
How do I customize the confirmation dialog message when moving files in Kendo UI File Manager? Customize and localize confirmation dialog messages that appear when moving or copying files and folders within a file management system, enabling tailored prompts, alerts, or notifications during drag-and-drop operations, move or copy actions, overwrite warnings, and user confirmations to control file operations messaging, adjust dialog text for different languages, and configure prompts that verify or confirm file transfers or relocations in diverse file explorer or file manager interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the title in Kendo UI file manager's move confirmation dialog? Adjust, configure, or localize the header text displayed in confirmation dialogs that appear when moving or copying files through drag-and-drop actions, including setting the title for move-versus-copy prompts in file management interfaces, customizing dialog captions for file operation confirmations, controlling the displayed message in move confirmation popups, and tailoring user interface text for drag-and-drop file relocation warnings or prompts.
</div>

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


<div class="meta-api-description">
How do I customize the move confirmation dialog in Kendo UI for jQuery FileManager? Customize or configure the text content of the move confirmation dialog that prompts users to confirm moving or copying selected files, with support for localization, setting custom messages, controlling dialog prompts during file operations, adjusting wording for move versus copy actions, enabling user confirmation dialogs for file transfers, and tailoring messages for different languages or contexts when relocating files within file management interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the confirmation button text in Kendo UI's file manager dialog for moving files? Customize or configure the confirm button text for move or duplicate file and folder dialogs, enabling localization or changing the primary action label during file management operations, such as copying or moving items within file explorer interfaces, so users can adapt the displayed confirmation button wording to their preferred language, terminology, or contextual prompts in file handling workflows.
</div>

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


<div class="meta-api-description">
How do I change the cancel button text in Kendo UI FileManager move confirmation dialogs? Change or set the text label for the cancel button in file move confirmation dialogs, control the wording on secondary buttons that trigger file relocation instead of duplication, customize the cancel or abort option during move file prompts, localize or translate the button text that lets users cancel or proceed with moving files, adjust the prompt controls when confirming file transfers from one directory to another, configure cancelation wording in dialogs that distinguish moving files versus copying them, modify the interface text for preventing file moves by pressing the secondary or cancel button in file management dialogs.
</div>

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


<div class="meta-api-description">
How do I customize the close button text in Kendo UI FileManager's move confirmation dialog? Customize or translate the text label for the button that closes or cancels the move or copy confirmation dialog, enabling control over the wording displayed when dismissing move or copy actions, setting the close or cancel button text in file management dialogs, configuring localized strings for dismissing file operation prompts, and adjusting button captions for terminating move or copy dialogs in file management interfaces.
</div>

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


<div class="meta-api-description">
How to customize the delete confirmation dialog in Kendo UI FileManager? Customize or localize the confirmation prompt, alert, or dialog that appears when deleting files or folders in a file management interface, enabling control over the text or message shown during file removal, folder deletion warnings, or user confirmations to prevent accidental data loss, and allowing configuration of delete confirm phrases, prompts, notifications, or dialog content related to file or directory deletion operations.
</div>

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


<div class="meta-api-description">
How to change the delete confirmation dialog title in Kendo UI FileManager? Configure or customize the title text displayed in confirmation dialogs when users attempt to delete files or folders, enabling localized or tailored wording for delete prompts, confirmation notices, removal alerts, or warning headers before file or directory deletion actions.
</div>

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


<div class="meta-api-description">
How to customize the delete confirmation message in Kendo UI FileManager dialogs? Customize or configure the delete confirmation message content for dialogs that prompt users to confirm permanent file or folder deletion, including support for localization, translation, and customizing warning texts, alert messages, or prompt content in file management interfaces to control the exact wording displayed when users delete files or directories.
</div>

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


<div class="meta-api-description">
How to change the delete confirmation button text in Kendo UI FileManager? Configure or customize the primary confirmation button label for file deletion dialogs, enabling localization and personalized text for the action that confirms or accepts permanent file removal; control, set, or change the confirmation button text to match different languages, UI preferences, or user prompts for deleting files or confirming irreversible removal actions.
</div>

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


<div class="meta-api-description">
How do I customize the cancel button label in Kendo UI's FileManager delete confirmation dialog? Customize the text displayed on the cancel button in file deletion confirmation dialogs, allowing developers to set, modify, localize, or translate the label that dismisses the delete prompt without removing any files or directories, enabling control over user interface wording during file or folder removal confirmation processes.
</div>

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


<div class="meta-api-description">
How to customize the close button text in Kendo UI File Manager delete confirm dialogs? Customize or localize the text label of the close or cancel button within file deletion confirmation dialogs, configure the dismiss button wording to prevent file removal, set or change the message that lets users exit or abort the delete action without confirming, adjust the interface text displayed for closing delete prompts, and control how the cancel or close option appears in file manager delete confirmation popups.
</div>

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


<div class="meta-api-description">
How do I customize the rename prompt in Kendo UI File Manager? Customize or translate the prompt text, dialog titles, placeholder text, input labels, and button captions displayed when renaming files or folders in the file management interface, enabling localization, internationalization, or personalized messages for rename dialogs, including dynamic text prompts and action controls that guide users through renaming operations.
</div>

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


<div class="meta-api-description">
How do I customize the title of the rename dialog in Kendo UI FileManager? Set or customize the text displayed as the title or header in the rename dialog box when renaming files or folders within a file management interface, enabling localization, translation, or adjustment of the rename prompt heading to match different languages, regional settings, or UI preferences, and control the label shown in the dialog window that requests the new name for files during rename operations.
</div>

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


<div class="meta-api-description">
How do I customize the rename prompt message in Kendo UI's FileManager? Customize, localize, or configure the instructional text prompting users to input or set a new filename during rename operations in file management interfaces, enabling control over the prompt message shown when users rename files or folders, adjusting the wording for clarity, language, or branding in dialogs that ask for new names, supporting user-friendly rename input prompts, customizable rename dialog instructions, rename prompt messages, and localized rename request text to improve user guidance and adapt messaging to different languages or contexts.
</div>

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


<div class="meta-api-description">
How do I change the label on the rename confirmation button in Kendo UI File Manager? Customize, configure, or set the confirmation button label text in file renaming dialogs, controlling the text displayed on the primary rename confirmation button, adjusting the prompt button language, enabling localization or internationalization of rename dialog buttons, modifying rename action affordances, changing the OK or confirm button text during file rename operations, overriding default rename dialog button captions, and tailoring user interface text for rename prompts to match specific languages or terminology within file management environments.
</div>

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


<div class="meta-api-description">
How do I customize the cancel button in Kendo UI FileManager's rename dialog? Customize or configure the text label, caption, or button title for canceling or dismissing a rename dialog, controlling how users abort or exit the file renaming prompt in file management interfaces, enabling localization, translation, or internationalization for cancel actions, adjusting UI language for cancel buttons in rename dialogs, setting or changing the cancel prompt wording to enhance user experience during file renaming processes, handling user intent to cancel rename operations across different languages and contexts.
</div>

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


<div class="meta-api-description">
How do I customize the close button text in Kendo UI File Manager rename dialog? Configure or customize the text label for the cancel or close action in a file renaming dialog, enabling localization, translation, or modifying the button or link wording that appears when a user aborts, exits, or dismisses the rename prompt in file management interfaces. This setting controls how the cancel, close, or dismiss option is presented during file renaming operations, supporting internationalization and user interface adjustments for better clarity and accessibility.
</div>

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


<div class="meta-api-description">
How to customize preview pane UI text in Kendo UI file manager? Translate and customize the preview pane UI text, labels, tooltips, and messages in a file management interface by configuring localized strings, supporting multiple languages, enabling internationalization for preview pane content, adjusting displayed messages for different locales, and setting custom translations or localized wording for the preview pane area within file explorers or file manager components.
</div>

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


<div class="meta-api-description">
How to customize the no file selected message in Kendo UI FileManager? Customize or localize the message displayed in the file preview area when no document, file, or folder is currently chosen or highlighted, controlling the default placeholder text shown in the preview pane to inform users that no selection has been made, enabling configuration of empty preview states, prompts, or notices that appear when the file manager’s preview panel is empty or awaiting input.
</div>

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


<div class="meta-api-description">
How can I customize the file extension labels in Kendo UI for jQuery's FileManager preview pane? Configure or customize the label that appears next to the file type in the file preview pane, controlling how file extensions are displayed or localized in file manager previews. Adjust the preview pane text to enable language-specific naming, modify file type suffixes, or set custom extension tags visible when a file is selected, supporting multilingual interfaces and tailored user displays of file formats. This setting influences the display of extension identifiers, file suffix labels, and localized descriptions in file selection previews across file management environments.
</div>

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


<div class="meta-api-description">
How do I customize the file size label in the Kendo UI for jQuery FileManager preview pane? Control and customize the display text for file size within the file preview area, enabling localization, text adjustment, and user interface tweaks to show file size labels in different languages, formats, or styles. Configure the wording, translate size descriptions, and set personalized labels for file sizes shown in preview panes, enhancing clarity and user understanding of file dimensions during browsing and file management operations. Adjust how file sizes appear alongside previews, supporting varied language preferences, UI customization, and descriptive text modifications.
</div>

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


<div class="meta-api-description">
How to customize the "created" label in Kendo UI FileManager? Customize or translate the label for the creation date displayed in the file preview panel when viewing selected files or folders. Adjust or set the wording for the creation timestamp, modify the date label text shown in preview panes, control localization or language settings for the file creation date indicator, and configure how the created date information appears next to items in file browsing or management interfaces. Enable localization, internationalization, or custom string overrides for the created date shown in preview areas within file manager components.
</div>

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


<div class="meta-api-description">
How do I customize the "modified" label in Kendo UI File Manager's preview pane? Customize the text label that appears next to the modification date in the file or folder preview pane, enabling localization, translation, or custom wording of the modification indicator for file management interfaces. Configure or set the displayed tag that denotes when a file or folder was last changed or edited, adjust the preview panel's modification label wording, and control how modification status is presented in file browser previews to suit different languages, terminologies, or UI preferences.
</div>

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


<div class="meta-api-description">
How can I customize the item count suffix in Kendo UI FileManager's preview pane? Customize, set, or localize the text suffix that appears in the file manager preview pane when viewing a folder, including labels for the number of files, subfolders, or total items present; control the display language or wording of item counts and folder contents summaries, adjust or translate the preview pane’s item count suffix to fit different languages or UI preferences, and manage how file and folder quantities are described or presented in folder previews.
</div>

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


<div class="meta-api-description">
How can I get the current folder path in Kendo UI's FileManager? Get the current directory or folder location where the file manager or file explorer is actively navigated, enabling retrieval of the present navigation path to control or track the user's browsing state, such as reading the active folder, saving or restoring navigation context, detecting the current file path to conditionally load files or folders, managing path-based updates, querying the existing directory, or programmatically accessing and controlling the folder hierarchy in a filesystem navigation interface.
</div>

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


<div class="meta-api-description">
How do I dynamically change the view mode of Kendo UI's file manager component? Control or obtain the current display mode of a file management interface by setting or retrieving the active view configuration, enabling dynamic switching between different file presentation styles, such as list, grid, or thumbnails, at runtime; customize how files and folders are visually organized and rendered, programmatically adjust or query the file explorer layout, toggle between various viewing options, modify the presentation mode on demand, and fetch the current display setting to adapt UI behavior or enhance user navigation experiences based on file arrangement preferences.
</div>

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


<div class="meta-api-description">
How do I programmatically change the current directory in a Kendo UI File Manager? Change or set the current directory, switch to a specified folder path, open or drill down into nested folders, update the file manager view to show the contents of a target directory, move or navigate through folder hierarchies by providing folder paths as strings, browse or jump directly to a particular folder, refresh the displayed files by changing the navigation location, control file explorer location programmatically by specifying folder routes or directory names.
</div>

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


<div class="meta-api-description">
How do I reload file listings in Kendo UI FileManager after data update? Trigger an update to reload and rebind the current file and folder listings within the file management interface, forcing the user interface to redraw and reflect any changes from data updates, programmatic modifications, or initialization processes. This functionality enables refreshing the displayed items, resetting the view, syncing with the latest data source state, and ensuring the file explorer component shows the most current directory contents and file structure immediately. Use this action to programmatically ensure the display is current after any changes, reload, reset, or update operations, supporting scenarios like manual refresh, data source changes, or UI synchronization.
</div>

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


<div class="meta-api-description">
How can I programmatically execute file management actions in Kendo UI for jQuery? Invoke or trigger file management actions programmatically by running commands such as upload, delete, rename, open, or custom operations through named command execution with optional arguments for target files, folders, or specific options. Automate file system tasks by configuring or enabling command calls that utilize built-in or user-defined handlers and integrate seamlessly into file and folder workflows, allowing precise control over file operations, batch processes, and command pipelines without direct user interaction. This method supports executing predefined or scripted commands on files and directories, enabling developers to set, run, or trigger file-related behaviors dynamically in code.
</div>

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


<div class="meta-api-description">
How can I programmatically get the list of selected files in a Kendo UI FileManager? Retrieve or access currently selected files or items programmatically, obtain the list or array of selected file objects in JSON format, check which files or entries a user has highlighted or chosen within a file management interface, extract selected data for processing, uploading, or integration with other APIs, query the active selection state or contents after initialization, get the current file or item selection for inspection, manipulation, or further actions, fetch the chosen files for batch operations or user interaction handling, obtain the selection details dynamically to enable features like preview, deletion, or export.
</div>

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


<div class="meta-api-description">
How do I get the size of a file manager container in Kendo UI for jQuery? Obtain or measure the width and height dimensions of a file manager or container wrapper to determine its current size for responsive layouts, dynamic resizing, adaptive element positioning, overlay alignment, popup placement, or custom layout calculations, enabling you to fetch rendered container measurements, detect size changes, and programmatically control or react to component dimension updates for flexible UI adjustments.
</div>

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


<div class="meta-api-description">
How can I dynamically update the data source for a Kendo UI FileManager? Update or replace the source of files and folders dynamically by configuring or switching the data input for a file manager component, enabling you to refresh, reload, or swap local or remote data bindings at runtime without recreating the component. This method supports changing the underlying data provider, updating file system references, or reattaching different storage configurations to immediately reflect new or altered content in the file navigation interface. It works for scenarios involving runtime updates to file collections, toggling between data endpoints, or programmatically controlling the loaded dataset for file management views.
</div>

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


<div class="meta-api-description">
How do I properly remove a Kendo UI File Manager instance from my application? Remove or delete a file manager instance while releasing all associated resources, clear internal data and state, detach event listeners or handlers linked to file management operations, clean up or remove DOM elements generated by the file interface, prevent memory leaks by properly disposing and tearing down the component setup, reset or destroy file management controls for fresh initialization, safely shut down file browsing sessions, disable and remove file manager UI elements, and reset event bindings to enable component re-creation or re-initialization without leftover artifacts or performance issues.
</div>

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


<div class="meta-api-description">
How can I detect when the user navigates to a new folder in the Kendo UI FileManager? Detect changes in folder or directory navigation within a file management interface by capturing navigation events triggered when users move between paths or folders. Monitor and respond to path updates, directory switches, or folder selections to implement custom behaviors such as refreshing UI elements, loading or displaying new file lists, synchronizing application data states, triggering updates after navigation completes, handling user-driven location changes, responding to folder browsing actions, or integrating folder navigation details for dynamic content updates. This event-driven mechanism provides access to destination path information and navigation context, enabling reactive programming models and state synchronization tied to file system exploration and directory traversal.
</div>

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


<div class="meta-api-description">
How do I detect when a file is selected in Kendo UI FileManager? Capture and respond to changes in file or folder selection within file management interfaces by detecting selection updates triggered by user actions or programmatic commands, enabling synchronization of selected items, updating user interfaces dynamically, toggling command states based on selection, handling events that signal when the set of chosen files or directories changes, and accessing selection details through event data or component methods for coordinated interaction across multiple components or UI elements.
</div>

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


<div class="meta-api-description">
What is triggered when a file is opened in Kendo UI for jQuery FileManager? Detect when a user opens or activates a file, trigger actions on file open events such as responding to double-clicks, initiating file previews, navigating directly to files, launching custom handlers on file access, managing file opening workflows, reacting to open commands or user interactions within file browsers, and executing code or flows when files are accessed or initialized.
</div>

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


<div class="meta-api-description">
How do I execute custom code after file operations in Kendo UI for jQuery FileManager? Listen for command execution events triggered after file manager operations to run custom code or handle commands dynamically, capturing details like command names, affected files or items, and execution context for purposes such as UI updates, validation checks, logging actions, auditing file changes, responding to user commands, or integrating additional workflows following file operations.
</div>

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


<div class="meta-api-description">
How to handle errors in Kendo UI FileManager? Capture and respond to data loading failures, source errors, or operational exceptions within file management workflows by detecting error events emitted during file retrieval or processing; utilize event handlers to monitor faults, access detailed error information, display user notifications, trigger fallback interfaces, implement retry mechanisms, perform custom logging, or manage data source interruptions to ensure robust file handling and error recovery strategies across various file system or remote data scenarios.
</div>

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


<div class="meta-api-description">
How to customize data binding in Kendo UI FileManager before displaying files? configure event triggered before data binding in file management components to intercept, inspect, or modify incoming data sources, manipulate binding context, adjust query or request parameters, update user interface state, handle pre-binding logic, perform asynchronous operations or preparations before data display, control data flow, and customize binding behavior for file managers or file explorer widgets.
</div>

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


<div class="meta-api-description">
How to trigger an action after file data loading is complete in Kendo UI FileManager? Detect when file data loading completes in a file management interface to trigger post-load actions, respond after data source binding finishes, listen for events signaling the UI is updated or refreshed, access loaded items and file lists, manipulate or inspect the user interface dynamically, handle asynchronous data binding completion, enable event-driven updates after file retrieval, control UI refresh logic upon data availability, and integrate custom behaviors once files have fully loaded and are ready for interaction.
</div>

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


<div class="meta-api-description">
How can I handle files dropped onto folders in Kendo UI FileManager using the drop event? Capture or respond to files dragged and dropped onto folders, detect file drop actions within directory views, process drag-and-drop events for files entering folder targets, intercept dropped file data and destination folders, validate or cancel file move or upload after a drag-and-drop interaction, monitor and handle user attempts to drop one or multiple files into folders, customize response to file drag-drop events including previews or UI updates, control or modify file management state changes triggered by dropping files, implement logic for handling drag-and-drop file transfers between folders, and enable event-driven workflows based on files dropped onto folder containers.
</div>

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


<div class="meta-api-description">
How to handle file operation events in Kendo UI FileManager? Listen for server-side file operation events such as copy, move, delete, or rename commands to track the success or failure of these file management actions, enabling you to respond with UI updates, notifications, logging, error handling, retries, or cleanup after server commands execute. Capture event triggers related to file command execution results, manage asynchronous file tasks, monitor backend file actions, and handle outcomes to synchronize client interfaces, inform users of operation status, and programmatically control post-command workflows or error recovery in file operations.
</div>

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



