(function($, undefined) {
    /**
     * @name kendo.ui.Upload.Description
     *
     * @section
     * <p>
     * The Upload widget uses progressive enhancement to deliver the best possible
     * uploading experience to users without requiring extra developer effort.
     * Features highlights:
     * </p>
     *
     * <ul>
     *    <li>Asynchronous and synchronous (on form submit) file upload</li>
     *    <li>Multiple file selection</li>
     *    <li>Removing uploaded files</li>
     *    <li>Progress tracking *</li>
     *    <li>File Drag-and-Drop *</li>
     *    <li>Cancelling upload in progress *</li>
     * </ul>
     * <p>
     * * These features are automatically enabled if supported by the browser.
     * </p>
     * <p>
     * Upload is a standards-based widget. No plug-ins required.
     * </p>
     *
     * <h3>
     * Getting Started
     * </h3>
     * <p>
     * @exampleTitle 1. Create a simple HTML form and input element of type "file"
     * @example
     * <!-- Kendo will automatically set the form enctype attribute to "multi-part/form-data" -->
     * <form method="post" action="handler.php">
     *     <div>
     *         <input name="photos[]" id="photos" type="file" />
     *     </div>
     * </form>
     *
     * @exampleTitle 2. Initialize Upload with a jQuery selector
     * @example
     *    $(document).ready(function() {
     *        $("#photos").kendoUpload();
     *    });
     *
     * @section
     * <p>
     * Note the array syntax in the input name.
     * It is used to hint the upload handler to treat photos as an array.
     * </p>
     * <p>
     * Please consult the documentation of your specific server technology
     * regarding the handling of uploaded files.
     * </p>
     *
     * <h3>
     * See also
     * </h3>
     * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx">Upload Modes</a>
     */
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        rFileExtension = /\.([^\.]+)$/,
        SELECT = "select",
        UPLOAD = "upload",
        SUCCESS = "success",
        ERROR = "error",
        COMPLETE = "complete",
        CANCEL = "cancel",
        LOAD = "load",
        REMOVE = "remove";

    var Upload = Widget.extend(/** @lends kendo.ui.Upload.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [enabled] <true>
         * Can be used to disable the upload. A disabled upload can be enabled by calling enable().
         * @option {Boolean} [multiple] <true>
         * Enables or disables multiple file selection.
         * If set to false, users will be able to select only one file at a time.
         * Note: This option does not limit the total number of uploaded files
         * in asynchronous configuration.
         * @option {Boolean} [showFileList] <true>
         * Controls whether to show the list of uploaded files.
         * Hiding the list can be useful when you want to fully customize the UI.
         * Use the client-side events to build your own UI.
         * @option {Object} [async]
         * Configures the upload for asynchronous operation.
         * <dl>
         *     <dt>
         *         saveUrl: (String)
         *     </dt>
         *     <dd>
         *         The URL of the handler that will receive the submitted files.
         *         The handler must accept POST requests containing one or more
         *         fields with the same name as the original input name.
         *     </dd>
         *     <dt>
         *         saveField: (String)
         *     </dt>
         *     <dd>
         *         The name of the form field submitted to the Save URL.
         *         The default value is the input name.
         *     </dd>
         *     <dt>
         *         removeUrl: (String)
         *     </dt>
         *     <dd>
         *         The URL of the handler responsible for removing uploaded files (if any).
         *         The handler must accept POST requests containing one or more
         *         "fileNames" fields specifying the files to be deleted.
         *     </dd>
         *     <dt>
         *         removeVerb: (String)
         *     </dt>
         *     <dd>
         *         The HTTP verb to be used by the remove action.
         *         The default value is "DELETE".
         *     </dd>
         *     <dt>
         *         removeField: (String)
         *     </dt>
         *     <dd>
         *         The name of the form field submitted to the Remove URL.
         *         The default value is fileNames.
         *     </dd>
         *     <dt>
         *         autoUpload: (Boolean)
         *     </dt>
         *     <dd>
         *         The selected files will be uploaded immediately by default.
         *         You can change this behavior by setting autoUpload to false.
         *     </dd>
         * </dl>
         * <p>
         * See the <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>
         * help topic for more details.
         * </p>
         * @option {Object} [localization]
         * Sets the strings rendered by the Upload.
         * <dl>
         *     <dt>
         *         select: (String)
         *     </dt>
         *     <dd>
         *         The "Select..." button text.
         *     </dd>
         *     <dt>
         *         cancel: (String)
         *     </dt>
         *     <dd>
         *         The Cancel button text.
         *     </dd>
         *     <dt>
         *         retry: (String)
         *     </dt>
         *     <dd>
         *         The Retry button text.
         *     </dd>
         *     <dt>
         *         remove: (String)
         *     </dt>
         *     <dd>
         *         The Remove button text.
         *     </dd>
         *     <dt>
         *         uploadSelectedFiles: (String)
         *     </dt>
         *     <dd>
         *         The "Upload files" button text.
         *     </dd>
         *     <dt>
         *         dropFilesHere: (String)
         *     </dt>
         *     <dd>
         *         The drop zone hint.
         *         The default value is "drop files here to upload".
         *     </dd>
         *     <dt>
         *         statusUploading: (String)
         *     </dt>
         *     <dd>
         *         The status message for files that are being uploaded.
         *     </dd>
         *     <dt>
         *         statusUploaded: (String)
         *     </dt>
         *     <dd>
         *         The status message for uploaded files.
         *     </dd>
         *     <dt>
         *         statusFailed: (String)
         *     </dt>
         *     <dd>
         *         The status message for failed uploads.
         *     </dd>
         * </dl>
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.name = element.name;
            that.multiple = that.options.multiple;
            that.localization = that.options.localization;

            var activeInput = that.element;
            that.wrapper = activeInput.closest(".k-upload");
            if (that.wrapper.length == 0) {
                that.wrapper = that._wrapInput(activeInput);
            }

            that._activeInput(activeInput);
            that.toggle(that.options.enabled);

            activeInput.closest("form").bind({
                "submit": $.proxy(that._onParentFormSubmit, that),
                "reset": $.proxy(that._onParentFormReset, that)
            });

            if (that.options.async.saveUrl != undefined) {
                that._module = that._supportsFormData() ?
                new formDataUploadModule(that) :
                new iframeUploadModule(that);
            } else {
                that._module = new syncUploadModule(that);
            }

            if (that._supportsDrop()) {
                that._setupDropZone();
            }

            that.wrapper
            .delegate(".k-upload-action", "click", $.proxy(that._onFileAction, that))
            .delegate(".k-upload-selected", "click", $.proxy(that._onUploadSelected, that))
            .delegate(".k-file", "t:progress", $.proxy(that._onFileProgress, that))
            .delegate(".k-file", "t:upload-success", $.proxy(that._onUploadSuccess, that))
            .delegate(".k-file", "t:upload-error", $.proxy(that._onUploadError, that));

            that.bind([
                /**
                 * Fires when one or more files are selected.
                 * Cancelling the event will prevent the selection.
                 * @name kendo.ui.Upload#select
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the selected files. Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     select: onSelect
                 * });
                 *
                 * function onSelect(e) {
                 *     // Array with information about the uploaded files
                 *     var files = e.files;
                 *
                 *     if (files.length > 5) {
                 *         alert("Too many files selected!");
                 *         e.preventDefault();
                 *     }
                 * }
                 */
                SELECT,

                /**
                 * Fires when one or more files are about to be uploaded.
                 * Cancelling the event will prevent the upload.
                 * <p>
                 * Note: The upload event fires only when the upload is in
                 * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>.
                 * </p>
                 * @name kendo.ui.Upload#upload
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the files that will be uploaded. Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @param {Object} data Optional object that will be
                 * sent to the save handler in the form of key/value pairs.
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     upload: onUpload
                 * });
                 *
                 * function onUpload(e) {
                 *     // Array with information about the uploaded files
                 *     var files = e.files;
                 *
                 *     // Check the extension of each file and abort the upload if it is not .jpg
                 *     $.each(files, function() {
                 *         if (this.extension != ".jpg") {
                 *             alert("Only .jpg files can be uploaded")
                 *             e.preventDefault();
                 *         }
                 *     });
                 * }
                 */
                UPLOAD,

                /**
                 * Fires when an upload / remove operation has been completed successfully.
                 * <p>
                 * Note: The success event fires only when the upload is in
                 * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>.
                 * </p>
                 * @name kendo.ui.Upload#success
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the files that were uploaded or removed . Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @param {String} e.operation "upload" or "remove".
                 * @param {String} e.response the response object returned by the server.
                 * @param {Object} e.XMLHttpRequest
                 * This is either the original XHR used for the operation or a stub containing:
                 * <ul>
                 *     <li>responseText</li>
                 *     <li>status</li>
                 *     <li>statusText</li>
                 * </ul>
                 * Verify that this is an actual XHR before accessing any other fields.
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     success: onSuccess
                 * });
                 *
                 * function onSuccess(e) {
                 *     // Array with information about the uploaded files
                 *     var files = e.files;
                 *
                 *     if (e.operation == "upload") {
                 *         alert("Successfully uploaded " + files.length + " files");
                 *     }
                 * }
                 */
                SUCCESS,

                /**
                 * Fires when an upload / remove operation has failed.
                 * <p>
                 * Note: The error event fires only when the upload is in
                 * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>.
                 * </p>
                 * @name kendo.ui.Upload#error
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the files that were uploaded or removed . Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @param {String} e.operation - "upload" or "remove".
                 * @param {Object} e.XMLHttpRequest
                 * This is either the original XHR used for the operation or a stub containing:
                 * <ul>
                 *     <li>responseText</li>
                 *     <li>status</li>
                 *     <li>statusText</li>
                 * </ul>
                 * Verify that this is an actual XHR before accessing any other fields.
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     error: onError
                 * });
                 *
                 * function onError(e) {
                 *     // Array with information about the uploaded files
                 *     var files = e.files;
                 *
                 *     if (e.operation == "upload") {
                 *         alert("Failed to uploaded " + files.length + " files");
                 *     }
                 *
                 *     // Suppress the default error message
                 *     e.preventDefault();
                 * }
                 */
                ERROR,

                /**
                 * Fires when all active uploads have completed either successfully or with errors.
                 * <p>
                 * Note: The complete event fires only when the upload is in
                 * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>.
                 * </p>
                 * @name kendo.ui.Upload#complete
                 * @event
                 * @param {Event} e
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     complete: onComplete
                 * });
                 *
                 * function onComplete(e) {
                 *     // The upload is now idle
                 * }
                 */
                COMPLETE,

                /**
                 * Fires when the upload has been cancelled while in progress.
                 * <p>
                 * Note: The cancel event fires only when the upload is in
                 * <a href="http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async">async mode</a>.
                 * </p>
                 * @name kendo.ui.Upload#cancel
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the files that were uploaded or removed . Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     cancel: onCancel
                 * });
                 *
                 * function onCancel(e) {
                 *     // Array with information about the uploaded files
                 *     var files = e.files;
                 *
                 *     // Process the Cancel event
                 * }
                 */
                CANCEL,

                /**
                 * Fires when an uploaded file is about to be removed.
                 * Cancelling the event will prevent the remove.
                 * @name kendo.ui.Upload#remove
                 * @event
                 * @param {Event} e
                 * @param {Array} e.files
                 * List of the files that were uploaded or removed . Each file has:
                 * <ul>
                 *     <li>name</li>
                 *     <li>
                 *         extension - the file extension
                 *         inlcuding the leading dot - ".jpg", ".png", etc.
                 *      </li>
                 *     <li>size - the file size in bytes (null if not available)</li>
                 * </ul>
                 * @param {Object} data Optional object that will be
                 * sent to the save handler in the form of key/value pairs.
                 * @example
                 * $("#photos").kendoUpload({
                 *     // ...
                 *     remove: onRemove
                 * });
                 *
                 * function onRemove(e) {
                 *     // Array with information about the removed files
                 *     var files = e.files;
                 *
                 *     // Process the Remove event
                 *     // Optionally cancel the remove operation by calling
                 *     // e.preventDefault()
                 * }
                 */
                REMOVE], that.options);
        },

        options: {
            name: "Upload",
            enabled: true,
            multiple: true,
            showFileList: true,
            async: {
                removeVerb: "POST",
                autoUpload: true
            },
            localization: {
                "select": "Select...",
                "cancel": "Cancel",
                "retry": "Retry",
                "remove": "Remove",
                "uploadSelectedFiles": "Upload files",
                "dropFilesHere": "drop files here to upload",
                "statusUploading": "uploading",
                "statusUploaded": "uploaded",
                "statusFailed": "failed"
            }
        },

        /**
         * Enables the upload.
         * @example
         * var upload = $("#upload").data("kendoUpload");
         *
         * // enables the upload
         * upload.enable();
         */
        enable: function() {
            this.toggle(true);
        },

        /**
         * Disables the upload.
         * @example
         * var upload = $("#upload").data("kendoUpload");
         *
         * // disables the upload
         * upload.enable();
         */
        disable: function() {
            this.toggle(false);
        },

        /**
         * Toggles the upload enabled state.
         * @param {Boolean} enable (Optional) The new enabled state.
         * @example
         * var upload = $("#upload").data("kendoUpload");
         *
         * // toggles the upload enabled state
         * upload.toggle();
         */
        toggle: function(enable) {
            enable = typeof enable === "undefined" ? enable : !enable;
            this.wrapper.toggleClass("k-state-disabled", enable);
        },

        _addInput: function(input) {
            var that = this;

            input
                .insertAfter(that.element)
                .data("kendoUpload", that);

            $(that.element)
                .hide()
                .removeAttr("id");

            that._activeInput(input);
        },

        _activeInput: function(input) {
            var that = this,
                wrapper = that.wrapper;

            that.element = input;

            input
                .attr("multiple", that._supportsMultiple() ? that.multiple : false)
                .attr("autocomplete", "off")
                .click(function(e) {
                    if (wrapper.hasClass("k-state-disabled")) {
                        e.preventDefault();
                    }
                })
                .change($.proxy(that._onInputChange, that));
        },

        _onInputChange: function(e) {
            var upload = this,
                input = $(e.target),
                prevented = upload.trigger(SELECT, { files: inputFiles(input) });

            if (!prevented) {
                input.trigger("t:select");
            } else {
                upload._addInput(input.clone().val(""));
            }
        },

        _onDrop: function (e) {
            var dt = e.originalEvent.dataTransfer,
                that = this,
                droppedFiles = dt.files;

            stopEvent(e);

            if (droppedFiles.length > 0) {
                var prevented = that.trigger(SELECT, { files: droppedFiles });
                if (!prevented) {
                    $(".k-dropzone", that.wrapper).trigger("t:select", [ droppedFiles ]);
                }
            }
        },

        _enqueueFile: function(name, data) {
            var that = this,
                existingFileEntries,
                fileEntry,
                fileList =  $(".k-upload-files", that.wrapper);

            if (fileList.length == 0) {
                fileList = $("<ul class='k-upload-files k-reset'></ul>").appendTo(that.wrapper);
                if (!that.options.showFileList) {
                    fileList.hide();
                }
            }

            existingFileEntries = $(".k-file", fileList);
            fileEntry =
                $("<li class='k-file'><span class='k-icon'></span><span class='k-filename' title='" + name + "'>" + name + "</span></li>")
                .appendTo(fileList)
                .data(data);

            if (!that.multiple) {
                existingFileEntries.trigger("t:remove");
            }

            return fileEntry;
        },

        _removeFileEntry: function(fileEntry) {
            var fileList = fileEntry.closest(".k-upload-files");
            if ($(".k-file > .k-icon:not(.k-fail)", fileList).length == 1) {
                fileList.remove();
                this._hideUploadButton();
            } else {
                fileEntry.remove();
            }
        },

        _fileAction: function(fileElement, actionKey) {
            var classDictionary = { remove: "k-delete", cancel: "k-cancel", retry: "k-retry" };
            if (!classDictionary.hasOwnProperty(actionKey)) {
                return;
            }

            this._clearFileAction(fileElement);

            fileElement.append(
                this._renderAction(classDictionary[actionKey], this.localization[actionKey])
                .addClass("k-upload-action")
            );
        },

        _fileState: function(fileEntry, stateKey) {
            var localization = this.localization,
                states = {
                    uploading: {
                        cssClass: "k-loading",
                        text : localization.statusUploading
                    },
                    uploaded: {
                        cssClass: "k-success",
                        text : localization.statusUploaded
                    },
                    failed: {
                        cssClass: "k-fail",
                        text : localization.statusFailed
                    }
                },
                currentState = states[stateKey];

            if (currentState) {
                var icon = fileEntry.children(".k-icon").text(currentState.text);
                icon[0].className = "k-icon " + currentState.cssClass;
            }
        },

        _renderAction: function (actionClass, actionText) {
            if (actionClass != "") {
                return $(
                "<button type='button' class='k-button k-button-icontext'>" +
                    "<span class='k-icon " + actionClass + "'></span>" +
                    actionText +
                "</button>"
                )
            }
            else {
                return $(
                "<button type='button' class='k-button'>" +
                    actionText +
                "</button>"
                )
            }
        },

        _clearFileAction: function(fileElement) {
            fileElement
                .find(".k-upload-action").remove();
        },

        _onFileAction: function(e) {
            var that = this;

            if (!that.wrapper.hasClass("k-state-disabled")) {
                var button = $(e.target).closest(".k-upload-action"),
                    icon = button.find(".k-icon"),
                    fileEntry = button.closest(".k-file"),
                    eventArgs = { files: fileEntry.data("fileNames") };

                if (icon.hasClass("k-delete")) {
                    if (!that.trigger(REMOVE, eventArgs)) {
                        fileEntry.trigger("t:remove", eventArgs.data);
                    }
                } else if (icon.hasClass("k-cancel")) {
                    that.trigger(CANCEL, eventArgs);
                    fileEntry.trigger("t:cancel");
                } else if (icon.hasClass("k-retry")) {
                    fileEntry.trigger("t:retry");
                }
            }

            return false;
        },

        _onUploadSelected: function() {
            this.wrapper.trigger("t:saveSelected");
            return false;
        },

        _onFileProgress: function(e, percentComplete) {
            var progressBar = $(".k-progress-status", e.target);
            if (progressBar.length == 0) {
                progressBar =
                    $("<span class='k-progress'><span class='k-progress-status' style='width: 0;'></span></span>")
                        .appendTo($(".k-filename", e.target))
                        .find(".k-progress-status");
            }

            progressBar.width(percentComplete + "%");
        },

        _onUploadSuccess: function(e, response, xhr) {
            var fileEntry = getFileEntry(e);

            this._fileState(fileEntry, "uploaded");

            this.trigger(SUCCESS, {
                files: fileEntry.data("fileNames"),
                response: response,
                operation: "upload",
                XMLHttpRequest: xhr
            });

            if (this._supportsRemove()) {
                this._fileAction(fileEntry, REMOVE);
            } else {
                this._clearFileAction(fileEntry);
            }

            this._checkAllComplete();
        },

        _onUploadError: function(e, xhr) {
            var fileEntry = getFileEntry(e);

            this._fileState(fileEntry, "failed");
            this._fileAction(fileEntry, "retry");

            var prevented = this.trigger(ERROR, {
                operation: "upload",
                files: fileEntry.data("fileNames"),
                XMLHttpRequest: xhr
            });

            logToConsole("Server response: " + xhr.responseText);

            if (!prevented) {
                this._alert("Error! Upload failed. Unexpected server response - see console.");
            }

            this._checkAllComplete();
        },

        _showUploadButton: function() {
            var uploadButton = $(".k-upload-selected", this.wrapper);
            if (uploadButton.length == 0) {
                uploadButton =
                    this._renderAction("", this.localization["uploadSelectedFiles"])
                    .addClass("k-upload-selected");
            }

            this.wrapper.append(uploadButton);
        },

        _hideUploadButton: function() {
            $(".k-upload-selected", this.wrapper).remove();
        },

        _onParentFormSubmit: function() {
            var upload = this,
                element = upload.element;
            element.trigger("t:abort");

            if (!element.value) {
                var input = $(element);

                // Prevent submitting an empty input
                input.attr("disabled", "disabled");

                window.setTimeout(function() {
                    // Restore the input so the Upload remains functional
                    // in case the user cancels the form submit
                    input.removeAttr("disabled");
                }, 0);
            }
        },

        _onParentFormReset: function() {
            $(".k-file", this.wrapper).trigger("t:remove");
        },

        _supportsFormData: function() {
            return typeof(FormData) != "undefined";
        },

        _supportsMultiple: function() {
            return !$.browser.opera;
        },

        _supportsDrop: function() {
            var userAgent = this._userAgent().toLowerCase(),
                isChrome = /chrome/.test(userAgent),
                isSafari = !isChrome && /safari/.test(userAgent),
                isWindowsSafari = isSafari && /windows/.test(userAgent);

            return !isWindowsSafari && this._supportsFormData() && (this.options.async.saveUrl != undefined);
        },

        _userAgent: function() {
            return navigator.userAgent;
        },

        _setupDropZone: function() {
            $(".k-upload-button", this.wrapper)
                .wrap("<div class='k-dropzone'></div>");

            var dropZone = $(".k-dropzone", this.wrapper)
                .append($("<em>" + this.localization["dropFilesHere"] + "</em>"))
                .bind({
                    "dragenter": stopEvent,
                    "dragover": function(e) { e.preventDefault(); },
                    "drop" : $.proxy(this._onDrop, this)
                });

            bindDragEventWrappers(dropZone,
                function() { dropZone.addClass("k-dropzone-hovered"); },
                function() { dropZone.removeClass("k-dropzone-hovered"); });

            bindDragEventWrappers($(document),
                function() { dropZone.addClass("k-dropzone-active"); },
                function() { dropZone.removeClass("k-dropzone-active"); });
        },

        _supportsRemove: function() {
            return this.options.async.removeUrl != undefined;
        },

        _submitRemove: function(fileNames, data, onSuccess, onError) {
            var upload = this,
                removeField = upload.options.async.removeField || "fileNames",
                params = $.extend(data, getAntiForgeryTokens());

            params[removeField] = fileNames;

            $.ajax({
                  type: this.options.async.removeVerb,
                  dataType: "json",
                  url: this.options.async.removeUrl,
                  traditional: true,
                  data: params,
                  success: onSuccess,
                  error: onError
            });
        },

        _alert: function(message) {
            alert(message);
        },

        _wrapInput: function(input) {
            input.wrap("<div class='k-widget k-upload'><div class='k-button k-upload-button'></div></div>");
            input.closest(".k-button")
                .append("<span>" + this.localization.select + "</span>");

            return input.closest(".k-upload");
        },

        _checkAllComplete: function() {
            if ($(".k-file .k-icon.k-loading", this.wrapper).length == 0) {
                this.trigger(COMPLETE);
            }
        }
    });

    // Synchronous upload module
    var syncUploadModule = function(upload) {
        this.name = "syncUploadModule";
        this.element = upload.wrapper;
        this.upload = upload;
        this.element
            .bind("t:select", $.proxy(this.onSelect, this))
            .bind("t:remove", $.proxy(this.onRemove, this))
            .closest("form")
                .attr("enctype", "multipart/form-data")
                .attr("encoding", "multipart/form-data");
    };

    syncUploadModule.prototype = /** @ignore */  {
        onSelect: function(e) {
            var upload = this.upload;
            var sourceInput = $(e.target);
            upload._addInput(sourceInput.clone().val(""));
            var file = upload._enqueueFile(getFileName(sourceInput), { relatedInput : sourceInput });
            upload._fileAction(file, REMOVE);
        },

        onRemove: function(e) {
            var fileEntry = getFileEntry(e);
            fileEntry.data("relatedInput").remove();

            this.upload._removeFileEntry(fileEntry);
        }
    };

    // Iframe upload module
    var iframeUploadModule = function(upload) {
        this.name = "iframeUploadModule";
        this.element = upload.wrapper;
        this.upload = upload;
        this.iframes = [];
        this.element
            .bind("t:select", $.proxy(this.onSelect, this))
            .bind("t:cancel", $.proxy(this.onCancel, this))
            .bind("t:retry", $.proxy(this.onRetry, this))
            .bind("t:remove", $.proxy(this.onRemove, this))
            .bind("t:saveSelected", $.proxy(this.onSaveSelected, this))
            .bind("t:abort", $.proxy(this.onAbort, this));
    };

    Upload._frameId = 0;

    iframeUploadModule.prototype = /** @ignore */ {
        onSelect: function(e) {
            var upload = this.upload,
                sourceInput = $(e.target);

            var fileEntry = this.prepareUpload(sourceInput);

            if (upload.options.async.autoUpload) {
                this.performUpload(fileEntry);
            } else {
                if (upload._supportsRemove()) {
                    this.upload._fileAction(fileEntry, REMOVE);
                }

                upload._showUploadButton();
            }
        },

        prepareUpload: function(sourceInput) {
            var upload = this.upload;
            var activeInput = $(upload.element);
            var name = upload.options.async.saveField || sourceInput.attr("name");
            upload._addInput(sourceInput.clone().val(""));

            sourceInput.attr("name", name);

            var iframe = this.createFrame(upload.name + "_" + Upload._frameId++);
            this.registerFrame(iframe);

            var form = this.createForm(upload.options.async.saveUrl, iframe.attr("name"))
                .append(activeInput);

            var fileEntry = upload._enqueueFile(
                getFileName(sourceInput),
                { "frame": iframe, "relatedInput": activeInput, "fileNames": inputFiles(sourceInput) });

            iframe
                .data({ "form": form, "file": fileEntry });

            return fileEntry;
        },

        performUpload: function(fileEntry) {
            var e = { files: fileEntry.data("fileNames") },
                iframe = fileEntry.data("frame"),
                upload = this.upload;

            if (!upload.trigger(UPLOAD, e)) {
                upload._hideUploadButton();

                iframe.appendTo(document.body);

                var form = iframe.data("form")
                    .appendTo(document.body);

                e.data = $.extend({ }, e.data, getAntiForgeryTokens());
                for (var key in e.data) {
                    var dataInput = form.find("input[name='" + key + "']");
                    if (dataInput.length == 0) {
                        dataInput = $("<input>", { type: "hidden", name: key })
                            .appendTo(form);
                    }
                    dataInput.val(e.data[key]);
                }

                upload._fileAction(fileEntry, CANCEL);
                upload._fileState(fileEntry, "uploading");

                iframe
                    .one("load", $.proxy(this.onIframeLoad, this));

                form[0].submit();
            } else {
                upload._removeFileEntry(iframe.data("file"));
                this.cleanupFrame(iframe);
                this.unregisterFrame(iframe);
            }
        },

        onSaveSelected: function(e) {
            var module = this;

            $(".k-file", this.element).each(function() {
                var fileEntry = $(this),
                    started = isFileUploadStarted(fileEntry);

                if (!started) {
                    module.performUpload(fileEntry);
                }
            });
        },

        onIframeLoad: function(e) {
            var iframe = $(e.target);

            try {
                var responseText = iframe.contents().text();
            } catch (e) {
                responseText = "Error trying to get server response: " + e;
            }

            this.processResponse(iframe, responseText);
        },

        processResponse: function(iframe, responseText) {
            var fileEntry = iframe.data("file"),
                module = this,
                fakeXHR = {
                    responseText: responseText
                };

            tryParseJSON(responseText,
                function(jsonResult) {
                    $.extend(fakeXHR, { statusText: "OK", status: "200" });
                    fileEntry.trigger("t:upload-success", [ jsonResult, fakeXHR ]);
                    module.cleanupFrame(iframe);
                    module.unregisterFrame(iframe);
                },
                function() {
                    $.extend(fakeXHR, { statusText: "error", status: "500" });
                    fileEntry.trigger("t:upload-error", [ fakeXHR ]);
                }
            );
        },

        onCancel: function(e) {
            var iframe = $(e.target).data("frame");

            this.stopFrameSubmit(iframe);
            this.cleanupFrame(iframe);
            this.unregisterFrame(iframe);
            this.upload._removeFileEntry(iframe.data("file"));
        },

        onRetry: function(e) {
            var fileEntry = getFileEntry(e);
            this.performUpload(fileEntry);
        },

        onRemove: function(e, data) {
            var fileEntry = getFileEntry(e);

            var iframe = fileEntry.data("frame");
            if (iframe)
            {
                this.unregisterFrame(iframe);
                this.upload._removeFileEntry(fileEntry);
                this.cleanupFrame(iframe);
            } else {
                removeUploadedFile(fileEntry, this.upload, data);
            }
        },

        onAbort: function() {
            var element = this.element,
                module = this;

            $.each(this.iframes, function() {
                $("input", this.data("form")).appendTo(element);
                module.stopFrameSubmit(this[0]);
                this.data("form").remove();
                this.remove();
            });

            this.iframes = [];
        },

        createFrame: function(id) {
            return $(
                "<iframe" +
                " name='" + id + "'" +
                " id='" + id + "'" +
                " style='display:none;' />"
            );
        },

        createForm: function(action, target) {
            return $(
                "<form enctype='multipart/form-data' method='POST'" +
                " action='" + action + "'" +
                " target='" + target + "'" +
                "/>");
        },

        stopFrameSubmit: function(frame) {
            if (typeof(frame.stop) != "undefined") {
                frame.stop();
            } else if (frame.document) {
                frame.document.execCommand("Stop");
                frame.contentWindow.location.href = frame.contentWindow.location.href;
            }
        },

        registerFrame: function(frame) {
            this.iframes.push(frame);
        },

        unregisterFrame: function(frame) {
            this.iframes = $.grep(this.iframes, function(value) {
                return value.attr("name") != frame.attr("name");
            });
        },

        cleanupFrame: function(frame) {
            var form = frame.data("form");

            frame.data("file").data("frame", null);

            setTimeout(function () {
                form.remove();
                frame.remove();
            }, 1);
        }
    };

    // FormData upload module
    var formDataUploadModule = function(upload) {
        this.name = "formDataUploadModule";
        this.element = upload.wrapper;
        this.upload = upload;
        this.element
            .bind("t:select", $.proxy(this.onSelect, this))
            .bind("t:cancel", $.proxy(this.onCancel, this))
            .bind("t:remove", $.proxy(this.onRemove, this))
            .bind("t:retry", $.proxy(this.onRetry, this))
            .bind("t:saveSelected", $.proxy(this.onSaveSelected, this))
            .bind("t:abort", $.proxy(this.onAbort, this));
    };

    formDataUploadModule.prototype = /** @ignore */ {
        onSelect: function(e, rawFiles) {
            var upload = this.upload,
                module = this,
                sourceElement = $(e.target),
                files = rawFiles ? getAllFileInfo(rawFiles) : this.inputFiles(sourceElement),
                fileEntries = this.prepareUpload(sourceElement, files);

            $.each(fileEntries, function() {
                if (upload.options.async.autoUpload) {
                    module.performUpload(this);
                } else {
                    if (upload._supportsRemove()) {
                        upload._fileAction(this, REMOVE);
                    }
                    upload._showUploadButton();
                }
            });
        },

        prepareUpload: function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);

            if (sourceElement.is("input")) {
                $.each(fileEntries, function() {
                    $(this).data("relatedInput", sourceElement);
                });
                sourceElement.data("relatedFileEntries", fileEntries);
                this.upload._addInput(sourceElement.clone().val(""));
            }

            return fileEntries;
        },

        enqueueFiles: function(arrFileInfo) {
            var upload = this.upload
                fileEntries = [];

            for (var i = 0; i < arrFileInfo.length; i++) {
                var currentFile = arrFileInfo[i],
                    name = currentFile.name;

                var fileEntry = upload._enqueueFile(name, { "fileNames": [ currentFile ] });
                fileEntry.data("formData", this.createFormData(arrFileInfo[i]));

                fileEntries.push(fileEntry);
            }

            return fileEntries;
        },

        inputFiles: function(sourceInput) {
            return inputFiles(sourceInput);
        },

        performUpload: function(fileEntry) {
            var upload = this.upload,
                formData = fileEntry.data("formData"),
                e = { files: fileEntry.data("fileNames") };

            if (!upload.trigger(UPLOAD, e)) {
                upload._fileAction(fileEntry, CANCEL);
                upload._hideUploadButton();

                e.data = $.extend({ }, e.data, getAntiForgeryTokens());
                for (var key in e.data) {
                    formData.append(key, e.data[key]);
                }

                upload._fileState(fileEntry, "uploading");

                this.postFormData(this.upload.options.async.saveUrl, formData, fileEntry);
            } else {
                this.removeFileEntry(fileEntry);
            }
        },

        onSaveSelected: function(e) {
            var module = this;

            $(".k-file", this.element).each(function() {
                var fileEntry = $(this),
                    started = isFileUploadStarted(fileEntry);

                if (!started) {
                    module.performUpload(fileEntry);
                }
            });
        },

        onCancel: function(e) {
            var fileEntry = getFileEntry(e);
            this.stopUploadRequest(fileEntry);
            this.removeFileEntry(fileEntry);
        },

        onRetry: function(e) {
            var fileEntry = getFileEntry(e);
            this.performUpload(fileEntry);
        },

        onRemove: function(e, data) {
            var fileEntry = getFileEntry(e);

            if (fileEntry.children(".k-icon").is(".k-success")) {
                removeUploadedFile(fileEntry, this.upload, data);
            } else {
                this.removeFileEntry(fileEntry);
            }
        },

        postFormData: function(url, data, fileEntry) {
            var xhr = new XMLHttpRequest(),
                module = this;

            fileEntry.data("request", xhr);

            xhr.addEventListener("load", function(e) {
                module.onRequestSuccess.call(module, e, fileEntry);
            }, false);

            xhr.addEventListener(ERROR, function(e) {
                module.onRequestError.call(module, e, fileEntry);
            }, false);

            xhr.upload.addEventListener("progress", function(e) {
                module.onRequestProgress.call(module, e, fileEntry);
            }, false);

            xhr.open("POST", url);
            xhr.send(data);
        },

        createFormData: function(fileInfo) {
            var formData = new FormData(),
            upload = this.upload;

            formData.append(upload.options.async.saveField || upload.name, fileInfo.rawFile);

            return formData;
        },

        onRequestSuccess: function(e, fileEntry) {
            var xhr = e.target,
                module = this;
            tryParseJSON(xhr.responseText,
                function(jsonResult) {
                    fileEntry.trigger("t:upload-success", [ jsonResult, xhr ]);
                    fileEntry.trigger("t:progress", [ 100 ]);
                    module.cleanupFileEntry(fileEntry);
                },
                function() {
                    fileEntry.trigger("t:upload-error", [ xhr ]);
                }
            );
        },

        onRequestError: function(e, fileEntry) {
            var xhr = e.target;
            fileEntry.trigger("t:upload-error", [ xhr ]);
        },

        cleanupFileEntry: function(fileEntry) {
            var relatedInput = fileEntry.data("relatedInput"),
                uploadComplete = true;

            if (relatedInput) {
                $.each(relatedInput.data("relatedFileEntries"), function() {
                    // Exclude removed file entries and self
                    if (this.parent().length > 0 && this[0] != fileEntry[0]) {
                        uploadComplete = uploadComplete && this.children(".k-icon").is(".k-success");
                    }
                });

                if (uploadComplete) {
                    relatedInput.remove();
                }
            }

            fileEntry.data("formData", null);
        },

        removeFileEntry: function(fileEntry) {
            this.cleanupFileEntry(fileEntry);
            this.upload._removeFileEntry(fileEntry);
        },

        onRequestProgress: function(e, fileEntry) {
            var percentComplete = Math.round(e.loaded * 100 / e.total);
            fileEntry.trigger("t:progress", [ percentComplete ]);
        },

        stopUploadRequest: function(fileEntry) {
            fileEntry.data("request").abort();
        }
    };

    // Helper functions
    function getFileName(input) {
        return $.map(inputFiles(input), function (file) {
            return file.name;
        }).join(", ");
    }

    function inputFiles($input) {
        var input = $input[0];
        if (input.files) {
            return getAllFileInfo(input.files);
        } else {
            return [{
                name: stripPath(input.value),
                extension: getFileExtension(input.value),
                size: null
            }];
        }
    }

    function getAllFileInfo(rawFiles) {
        return $.map(rawFiles, function (file) {
            return getFileInfo(file);
        });
    }

    function getFileInfo(rawFile) {
        // Older Firefox versions (before 3.6) use fileName and fileSize
        var fileName = rawFile.name || rawFile.fileName;
        return {
            name: fileName,
            extension: getFileExtension(fileName),
            size: rawFile.size || rawFile.fileSize,
            rawFile: rawFile
        };
    }

    function getFileExtension(fileName) {
        var matches = fileName.match(rFileExtension);
        return matches ? matches[0] : "";
    }

    function stripPath(name) {
        var slashIndex = name.lastIndexOf("\\");
        return (slashIndex != -1) ? name.substr(slashIndex + 1) : name;
    }

    function removeUploadedFile(fileEntry, upload, data) {
        if (!upload._supportsRemove()) {
            return;
        }

        var files = fileEntry.data("fileNames");
        var fileNames = $.map(files, function(file) { return file.name });

        upload._submitRemove(fileNames, data,
            function onSuccess(data, textStatus, xhr) {
                upload._removeFileEntry(fileEntry);

                upload.trigger(SUCCESS, {
                    operation: "remove",
                    files: files,
                    response: data,
                    XMLHttpRequest: xhr });
            },

            function onError(xhr, textStatus, textStatus) {
                var prevented = upload.trigger(ERROR, {
                    operation: "remove",
                    files: files,
                    XMLHttpRequest: xhr });

                logToConsole("Server response: " + xhr.responseText);

                if (!prevented) {
                    upload._alert("Error! Remove operation failed. Unexpected response - see console.");
                }
            }
        );
    }

    function tryParseJSON(input, onSuccess, onError) {
        try {
            var json = $.parseJSON(input);
            onSuccess(json);
        } catch (e) {
            onError();
        }
    }

    function stopEvent(e) {
        e.stopPropagation(); e.preventDefault();
    }

    function bindDragEventWrappers(element, onDragEnter, onDragLeave) {
        var hideInterval, lastDrag;

        element
            .bind("dragenter", function(e) {
                onDragEnter();
                lastDrag = new Date();

                if (!hideInterval) {
                    hideInterval = setInterval(function() {
                        var sinceLastDrag = new Date() - lastDrag;
                        if (sinceLastDrag > 100) {
                            onDragLeave();

                            clearInterval(hideInterval);
                            hideInterval = null;
                        }
                    }, 100);
                }
            })
            .bind("dragover", function(e) {
                lastDrag = new Date();
            });
    }

    function isFileUploadStarted(fileEntry) {
        return fileEntry.children(".k-icon").is(".k-loading, .k-success, .k-fail");
    }

    function logToConsole(message) {
        if (typeof(console) != "undefined" && console.log) {
            console.log(message);
        }
    }

    function getFileEntry(e) {
        return $(e.target).closest(".k-file");
    }

    function getAntiForgeryTokens() {
        var tokens = { };
        $("input[name^='__RequestVerificationToken']").each(function() {
            tokens[this.name] = this.value;
        });

        return tokens;
    }
    kendo.ui.plugin(Upload);
})(jQuery);
