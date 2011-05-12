(function($, window, undefined) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        rFileExtension = /\.([^\.]+)$/
        SELECT = "select";

    function Upload(element, options) {
        var that = this;

        Component.apply(that, arguments);
        that.name = element.name;
        that.multiple = that.options.multiple;

        var activeInput = that.element;
        that.wrapper = activeInput.closest(".t-upload");
        if (that.wrapper.length == 0) {
            that.wrapper = that._wrapInput(activeInput);
        }

        that._setActiveInput(activeInput);
        that.toggle(that.options.enabled);

        activeInput.closest("form").bind({
            "submit": $.proxy(that._onParentFormSubmit, that),
            "reset": $.proxy(that._onParentFormReset, that)
        });

        if (that.options.async.saveUrl != undefined) {
            that._module = that._getSupportsFormData() ?
                new formDataUploadModule(that) :
                new iframeUploadModule(that);
        } else {
            that._module = new syncUploadModule(that);
        }

        if (that._getSupportsDrop()) {
            that._setupDropZone();
        }

        that.wrapper
            .delegate(".t-upload-action", "click", $.proxy(that._onFileAction, that))
            .delegate(".t-upload-selected", "click", $.proxy(that._onUploadSelected, that))
            .delegate(".t-file", "t:progress", $.proxy(that._onFileProgress, that))
            .delegate(".t-file", "t:upload-success", $.proxy(that._onUploadSuccess, that))
            .delegate(".t-file", "t:upload-error", $.proxy(that._onUploadError, that));

        that.bind([SELECT], that.options);
/*
        $t.bind(that.wrapper, {
            load: that.onLoad,
            select: that.onSelect,
            upload: that.onUpload,
            success: that.onSuccess,
            error: that.onError,
            complete: that.onComplete,
            cancel: that.onCancel,
            remove: that.onRemove
        });

        // Load is triggered for the input by $t.bind,
        // but we need it to trigger for the wrapper
        $t.trigger(that.wrapper, 'load');
        */
    }

    Upload.prototype = {
        options: {
            enabled: true,
            multiple: true,
            showFileList: true,
            async: { }, // The async section defaults are always serialized.
            localization: {
                "select": "Select...",
                "cancel": "Cancel",
                "retry": "Retry",
                "remove": "Remove",
                "uploadSelectedFiles": "Upload files",
                "dropFilesHere": "drop files here to upload",
                "statusUploading": "uploading",
                "statusUploaded": "uploaded",
                "statusFailed": "failed" }
        },
        enable: function() {
            this.toggle(true);
        },
        disable: function() {
            this.toggle(false);
        },
        toggle: function(enable) {
            this.wrapper.toggleClass("t-state-disabled", !enable);
        },
        _getSupportsMultiple: function() {
            return !$.browser.opera;
        },
        _getSupportsDrop: function() {
            var that = this,
                userAgent = that._getUserAgent().toLowerCase(),
                isChrome = /chrome/.test(userAgent),
                isSafari = !isChrome && /safari/.test(userAgent),
                isWindowsSafari = isSafari && /windows/.test(userAgent);

            return !isWindowsSafari && that._getSupportsFormData() && (that.options.async.saveUrl != undefined);
        },
        _getUserAgent: function() {
            return navigator.userAgent;
        },
        _getSupportsFormData: function() {
            return typeof(FormData) != "undefined";
        },
        _submitRemove: function(fileNames, onSuccess, onError) {
            var params = $.extend({}, getAntiForgeryTokens());
            params["fileNames"] = fileNames;

            $.ajax({
                  type: "POST",
                  dataType: "json",
                  url: this.options.async.removeUrl,
                  traditional: true,
                  data: params,
                  success: onSuccess,
                  error: onError
            });
        },
        _onParentFormSubmit: function() {
            this.element.trigger("t:abort");

            if (!this.element.value) {
                var input = $(this.element),
                    parent = input.parent();
                    //
                // Prevent submitting an empty input by removing it from the DOM
                input.detach()

                window.setTimeout(function() {
                    // Restore the input so the Upload remains functional
                    // in case the user cancels the form submit
                    parent.append(input);
                }, 0);
            }
        },

        _onParentFormReset: function() {
            $(".t-file", this.wrapper).trigger("t:remove");
        },
        createFormData: function(fileInfo) {
            var formData = new FormData();

            formData.append(this.upload.name, fileInfo.rawFile);

            return formData;
        },
        _setupDropZone: function() {
            var that = this,
                wrapper = that.wrapper,
                localization = that.options.localization,
                dropZone;

            $(".t-upload-button", wrapper)
                .wrap("<div class='t-dropzone'></div>");

            dropZone = $(".t-dropzone", wrapper)
                .append($("<em>" + localization["dropFilesHere"] + "</em>"))
                .bind({
                    "dragenter": stopEvent,
                    "dragover": function(e) { e.preventDefault(); },
                    "drop" : $.proxy(that._onDrop, that)
                });

            bindDragEventWrappers(dropZone,
                function() { dropZone.addClass("t-dropzone-hovered"); },
                function() { dropZone.removeClass("t-dropzone-hovered"); });

            bindDragEventWrappers($(document),
                function() { dropZone.addClass("t-dropzone-active"); },
                function() { dropZone.removeClass("t-dropzone-active"); });
        },
        _onDrop: function (e) {
            var that = this,
                wrapper = that.wrapper,
                dt = e.originalEvent.dataTransfer,
                droppedFiles = dt.files;

            stopEvent(e);

            if (droppedFiles.length > 0) {
                var prevented = that.trigger(SELECT, { files: droppedFiles });
                if (!prevented) {
                    $(".t-dropzone", wrapper).trigger("t:select", [ droppedFiles ]);
                }
            }
        },
        _enqueueFile: function(name, data) {
            var that = this,
                wrapper = that.wrapper,
                existingFileEntries,
                fileEntry,
                fileList =  $(".t-upload-files", wrapper);

            if (fileList.length == 0) {
                fileList = $("<ul class='t-upload-files t-reset'></ul>").appendTo(wrapper);
                if (!that.options.showFileList) {
                    fileList.hide();
                }
            }

            existingFileEntries = $(".t-file", fileList);
            fileEntry = $("<li class='t-file'><span class='t-icon'></span><span class='t-filename'>" + name + "</span></li>")
                .appendTo(fileList)
                .data(data);

            if (!that.multiple) {
                existingFileEntries.trigger("t:remove");
            }

            return fileEntry;
        },
        _onFileAction: function(e) {
            var wrapper = this.wrapper;

            if (!wrapper.hasClass("t-state-disabled")) {
                var button = $(e.target).closest(".t-upload-action"),
                    icon = button.find(".t-icon"),
                    fileEntry = button.closest(".t-file"),
                    eventArgs = { files: fileEntry.data("fileNames") };

                if (icon.hasClass("t-delete")) {
                    if (!this.trigger("remove", eventArgs)) {
                        fileEntry.trigger("t:remove");
                    }
                } else if (icon.hasClass("t-cancel")) {
                    this.trigger("cancel", eventArgs);
                    fileEntry.trigger("t:cancel");
                } else if (icon.hasClass("t-retry")) {
                    fileEntry.trigger("t:retry");
                }
            }

            return false;
        },
        _onUploadSelected: function() {
            this.wrapper.trigger("t:saveSelected");
            return false;
        },
        _showUploadButton: function() {
            var uploadButton = $(".t-upload-selected", this.wrapper);
            if (uploadButton.length == 0) {
                uploadButton =
                    this._renderAction("", this.options.localization["uploadSelectedFiles"])
                    .addClass("t-upload-selected");
            }

            this.wrapper.append(uploadButton);
        },
        _onFileProgress: function(e, percentComplete) {
            var progressBar = $(".t-progress-status", e.target);
            if (progressBar.length == 0) {
                progressBar =
                    $("<span class='t-progress'><span class='t-progress-status' style='width: 0;'></span></span>")
                        .appendTo($(".t-filename", e.target))
                        .find(".t-progress-status");
            }

            progressBar.width(percentComplete + "%");
        },

        _onUploadSuccess: function(e, response, xhr) {
            var fileEntry = getFileEntry(e);

            this._setFileState(fileEntry, "uploaded");

            this.trigger("success", {
                files: fileEntry.data("fileNames"),
                response: response,
                operation: "upload",
                XMLHttpRequest: xhr
            });

            if (this._supportsRemove()) {
                this._setFileAction(fileEntry, "remove");
            } else {
                this._clearFileAction(fileEntry);
            }

            this._checkAllComplete();
        },

        _onUploadError: function(e, xhr) {
            var fileEntry = getFileEntry(e);

            this._setFileState(fileEntry, "failed");
            this._setFileAction(fileEntry, "retry");

            var prevented = this.trigger("error", {
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
        _setActiveInput: function(input) {
            var that = this,
                wrapper = this.wrapper;

            that.element = $(input);

            input
                .attr("multiple", that._getSupportsMultiple() ? that.multiple : false)
                .attr("autocomplete", "off")
                .click(function(e) {
                    if (wrapper.hasClass("t-state-disabled")) {
                        e.preventDefault();
                    }
                })
                .change($.proxy(that._onInputChange, that));
        },
        _setFileAction: function(fileElement, actionKey) {
            var classDictionary = { remove: "t-delete", cancel: "t-cancel", retry: "t-retry" };
            if (!classDictionary.hasOwnProperty(actionKey)) {
                return;
            }

            this._clearFileAction(fileElement);

            fileElement.append(
                this._renderAction(classDictionary[actionKey], this.options.localization[actionKey])
                .addClass("t-upload-action")
            );
        },
        _setFileState: function(fileEntry, stateKey) {
            var that = this,
                localization = that.options.localization,
                states = {
                    uploading: {
                        cssClass: "t-loading",
                        text : localization.statusUploading
                    },
                    uploaded: {
                        cssClass: "t-success",
                        text : localization.statusUploaded
                    },
                    failed: {
                        cssClass: "t-fail",
                        text : localization.statusFailed
                    }
            };

            var currentState = states[stateKey];
            if (currentState) {
                var icon = fileEntry.children(".t-icon").text(currentState.text);
                icon[0].className = "t-icon " + currentState.cssClass;
            }
        },
        _clearFileAction: function(fileElement) {
            fileElement
                .find(".t-upload-action").remove();
        },
        _renderAction: function (actionClass, actionText) {
            if (actionClass != "") {
                return $(
                "<button type='button' class='t-button t-button-icontext'>" +
                    "<span class='t-icon " + actionClass + "'></span>" +
                    actionText +
                "</button>"
                )
            }
            else {
                return $(
                "<button type='button' class='t-button'>" +
                    actionText +
                "</button>"
                )
            }
        },
        _hideUploadButton: function() {
            $(".t-upload-selected", this.wrapper).remove();
        },
        _addInput: function(input) {
            input
                .insertAfter(this.element)
                .data("kendoUpload", this);

            $(this.element)
                .hide()
                .removeAttr("id");

            this._setActiveInput(input);
        },
        _onInputChange: function(e)
        {
            var input = $(e.target),
                prevented = this.trigger(SELECT, { files: getInputFiles(input) });

            if (!prevented) {
                input.trigger("t:select");
            }
        },
        _removeFileEntry: function(fileEntry) {
            var fileList = fileEntry.closest(".t-upload-files");
            if ($(".t-file", fileList).length == 1) {
                fileList.remove();
                this._hideUploadButton();
            } else {
                fileEntry.remove();
            }
        },
        _wrapInput: function(input) {
            input.wrap("<div class='t-widget t-upload'><div class='t-button t-upload-button'></div></div>");
            input.closest(".t-button")
                .append("<span>" + this.options.localization.select + "</span>");

            return input.closest(".t-upload");
        },
        _checkAllComplete: function() {
            if ($(".t-file .t-icon.t-loading", this.wrapper).length == 0) {
                this.trigger("complete");
            }
        },
        _supportsRemove: function() {
            return this.options.async.removeUrl != undefined;
        }
    };

    // Synchronous upload module
    var syncUploadModule = function(upload) {
    };

    syncUploadModule.prototype = {};

    // FormData upload module
    var formDataUploadModule = function(upload) {
        var that = this;

        that.name = "formDataUploadModule";
        that.element = upload.wrapper;
        that.upload = upload;
        that.element
            .bind("t:select", $.proxy(that.onSelect, that))
            .bind("t:cancel", $.proxy(that.onCancel, that))
            .bind("t:remove", $.proxy(that.onRemove, that))
            .bind("t:retry", $.proxy(that.onRetry, that))
            .bind("t:saveSelected", $.proxy(that.onSaveSelected, that))
            .bind("t:abort", $.proxy(that.onAbort, that));
    }

    formDataUploadModule.prototype = {
        onSelect: function(e, rawFiles) {
            var upload = this.upload,
                module = this,
                sourceElement = $(e.target),
                files = rawFiles ? getAllFileInfo(rawFiles) : this.getInputFiles(sourceElement),
                fileEntries = this.prepareUpload(sourceElement, files);

            $.each(fileEntries, function() {
                if (upload.options.async.autoUpload) {
                    module.performUpload(this);
                } else {
                    if (upload._supportsRemove()) {
                        upload._setFileAction(this, "remove");
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

        getInputFiles: function(sourceInput) {
            return getInputFiles(sourceInput);
        },

        performUpload: function(fileEntry) {
            var that = this,
                upload = that.upload,
                formData = fileEntry.data("formData"),
                e = { files: fileEntry.data("fileNames") };

            if (!upload.trigger("upload", e)) {
                upload._setFileAction(fileEntry, "cancel");
                upload._hideUploadButton();

                e.data = $.extend({ }, e.data, getAntiForgeryTokens());
                for (var key in e.data) {
                    formData.append(key, e.data[key]);
                }

                upload._setFileState(fileEntry, "uploading");

                that.postFormData(upload.options.async.saveUrl, formData, fileEntry);
            } else {
                that.removeFileEntry(fileEntry);
            }
        },

        onSaveSelected: function(e) {
            var module = this;

            $(".t-file", this.element).each(function() {
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

        onRemove: function(e) {
            var fileEntry = getFileEntry(e);

            if (fileEntry.children(".t-icon").is(".t-success")) {
                removeUploadedFile(fileEntry, this.upload);
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

            xhr.addEventListener("error", function(e) {
                module.onRequestError.call(module, e, fileEntry);
            }, false);

            xhr.upload.addEventListener("progress", function(e) {
                module.onRequestProgress.call(module, e, fileEntry);
            }, false);

            xhr.open("POST", url);
            xhr.send(data);
        },

        createFormData: function(fileInfo) {
            var formData = new FormData();

            formData.append(this.upload.name, fileInfo.rawFile);

            return formData;
        },

        onRequestSuccess: function(e, fileEntry) {
            var xhr = e.target,
                module = this;
            tryParseJSON(xhr.responseText,
                function(jsonResult) {
                    fileEntry.trigger("t:upload-success", [ jsonResult, xhr ]);
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
                        uploadComplete = uploadComplete && this.children(".t-icon").is(".t-success");
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
    }
    // Iframe upload module
    var iframeUploadModule = function(upload) {

    };

    iframeUploadModule.prototype = {};

    // Helper functions
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

    function tryParseJSON(input, onSuccess, onError) {
        try {
            var json = $.parseJSON(input);
            onSuccess(json);
        } catch (e) {
            onError();
        }
    }
    function getFileName(input) {
        return $.map(getInputFiles(input), function (file) {
            return file.name;
        }).join(", ");
    }
    function getInputFiles($input) {
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
        return fileName.match(rFileExtension)[0] || "";
    }

    function stripPath(name) {
        var slashIndex = name.lastIndexOf("\\");
        return (slashIndex != -1) ? name.substr(slashIndex + 1) : name;
    }
    function getAntiForgeryTokens() {
        var tokens = { };
        $("input[name^='__RequestVerificationToken']").each(function() {
            tokens[this.name] = this.value;
        });

        return tokens;
    }
    function getFileEntry(e) {
        return $(e.target).closest(".t-file");
    }
    function logToConsole(message) {
        if (typeof(console) != "undefined" && console.log) {
            console.log(message);
        }
    }
    function removeUploadedFile(fileEntry, upload) {
        if (!upload._supportsRemove()) {
            return;
        }

        var files = fileEntry.data("fileNames");
        var fileNames = $.map(files, function(file) { return file.name });

        upload._submitRemove(fileNames,
            function onSuccess(data, textStatus, xhr) {
                upload._removeFileEntry(fileEntry);

                $t.trigger(upload.wrapper, "success", {
                    operation: "remove",
                    files: files,
                    response: data,
                    XMLHttpRequest: xhr });
            },

            function onError(xhr, textStatus, textStatus) {
                var prevented = $t.trigger(upload.wrapper, "error", {
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
    kendo.ui.plugin("Upload", Upload, Component);
})(jQuery, window);
