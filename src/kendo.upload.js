(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Navigatable = ui.Navigatable,        Selectable = ui.Selectable,
        Component = ui.Component,
        proxy = $.proxy,
        extend = $.extend;

    var undefined,
        $t = $.telerik,
        rFileExtension = /\.([^\.]+)$/;

    $t.upload = function (element, options) {
        $.extend(this, options);

        this.element = element;
        this.name = element.name;

        var activeInput = $(element);
        this.wrapper = activeInput.closest(".t-upload");
        if (this.wrapper.length == 0) {
            this.wrapper = this._wrapInput(activeInput);
        }

        this._setActiveInput(activeInput);
        this.toggle(this.enabled);

        activeInput.closest("form").bind({
            "submit": $.proxy(this._onParentFormSubmit, this),
            "reset": $.proxy(this._onParentFormReset, this)
        });

        if (this.async.saveUrl != undefined) {
            this._module = this._getSupportsFormData() ?
                new formDataUploadModule(this) :
                new iframeUploadModule(this);
        } else {
            this._module = new syncUploadModule(this);
        }

        if (this._getSupportsDrop()) {
            this._setupDropZone();
        }

        this.wrapper
            .delegate(".t-upload-action", "click", $.proxy(this._onFileAction, this))
            .delegate(".t-upload-selected", "click", $.proxy(this._onUploadSelected, this))
            .delegate(".t-file", "t:progress", $.proxy(this._onFileProgress, this))
            .delegate(".t-file", "t:upload-success", $.proxy(this._onUploadSuccess, this))
            .delegate(".t-file", "t:upload-error", $.proxy(this._onUploadError, this));

        $t.bind(this.wrapper, {
            load: this.onLoad,
            select: this.onSelect,
            upload: this.onUpload,
            success: this.onSuccess,
            error: this.onError,
            complete: this.onComplete,
            cancel: this.onCancel,
            remove: this.onRemove
        });

        // Load is triggered for the input by $t.bind,
        // but we need it to trigger for the wrapper
        $t.trigger(this.wrapper, 'load');
    };

    $t.upload.prototype = {
        enable: function() {
            this.toggle(true);
        },

        disable: function() {
            this.toggle(false);
        },

        toggle: function(enable) {
            this.wrapper.toggleClass("t-state-disabled", !enable);
        },

        _addInput: function(input) {
            input
                .insertAfter(this.element)
                .data("tUpload", this);

            $(this.element)
                .hide()
                .removeAttr("id");

            this._setActiveInput(input);
        },

        _setActiveInput: function(input) {
            var wrapper = this.wrapper;
            this.element = input;

            input
                .attr("multiple", this._getSupportsMultiple() ? this.multiple : false)
                .attr("autocomplete", "off")
                .click(function(e) {
                    if (wrapper.hasClass("t-state-disabled")) {
                        e.preventDefault();
                    }
                })
                .change($.proxy(this._onInputChange, this));
        },

        _onInputChange: function(e)
        {
            var input = $(e.target),
                prevented = $t.trigger(this.wrapper, "select", { files: getInputFiles(input) });

            if (!prevented) {
                input.trigger("t:select");
            }
        },

        _onDrop: function (e) {
			var dt = e.originalEvent.dataTransfer,
				droppedFiles = dt.files;
				
			stopEvent(e);

            if (droppedFiles.length > 0) {
                var prevented = $t.trigger(this.wrapper, "select", { files: droppedFiles });
                if (!prevented) {
                    $(".t-dropzone", this.wrapper).trigger("t:select", [ droppedFiles ]);
                }
            }
        },

        _enqueueFile: function(name, data) {
            var fileList =  $(".t-upload-files", this.wrapper);
            if (fileList.length == 0) {
                fileList = $("<ul class='t-upload-files t-reset'></ul>").appendTo(this.wrapper);
                if (!this.showFileList) {
                    fileList.hide();
                }
            }

            var existingFileEntries = $(".t-file", fileList);
            var fileEntry = $("<li class='t-file'><span class='t-icon'></span><span class='t-filename'>" + name + "</span></li>")
                .appendTo(fileList)
                .data(data);

            if (!this.multiple) {
                existingFileEntries.trigger("t:remove");
            }

            return fileEntry;
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

        _setFileAction: function(fileElement, actionKey) {
            var classDictionary = { remove: "t-delete", cancel: "t-cancel", retry: "t-retry" };
            if (!classDictionary.hasOwnProperty(actionKey)) {
                return;
            }

            this._clearFileAction(fileElement);

            fileElement.append(
                this._renderAction(classDictionary[actionKey], this.localization[actionKey])
                .addClass("t-upload-action")
            );
        },

        _setFileState: function(fileEntry, stateKey) {
            var states = {
                uploading: {
                    cssClass: "t-loading",
                    text : this.localization.statusUploading
                },
                uploaded: {
                    cssClass: "t-success",
                    text : this.localization.statusUploaded
                },
                failed: {
                    cssClass: "t-fail",
                    text : this.localization.statusFailed
                }
            };

            var currentState = states[stateKey];
            if (currentState) {
                var icon = fileEntry.children(".t-icon").text(currentState.text);
                icon[0].className = "t-icon " + currentState.cssClass;
            }
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

        _clearFileAction: function(fileElement) {
            fileElement
                .find(".t-upload-action").remove();
        },

        _onFileAction: function(e) {
            if (!this.wrapper.hasClass("t-state-disabled")) {
                var button = $(e.target).closest(".t-upload-action"),
                    icon = button.find(".t-icon"),
                    fileEntry = button.closest(".t-file"),
                    eventArgs = { files: fileEntry.data("fileNames") };

                if (icon.hasClass("t-delete")) {
                    if (!$t.trigger(this.wrapper, "remove", eventArgs)) {
                        fileEntry.trigger("t:remove");
                    }
                } else if (icon.hasClass("t-cancel")) {
                    $t.trigger(this.wrapper, "cancel", eventArgs);
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

            $t.trigger(this.wrapper, "success", {
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

            var prevented = $t.trigger(this.wrapper, "error", {
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
            var uploadButton = $(".t-upload-selected", this.wrapper);
            if (uploadButton.length == 0) {
                uploadButton =
                    this._renderAction("", this.localization["uploadSelectedFiles"])
                    .addClass("t-upload-selected");
            }

            this.wrapper.append(uploadButton);
        },

        _hideUploadButton: function() {
            $(".t-upload-selected", this.wrapper).remove();
        },

        _onParentFormSubmit: function() {
            this.element.trigger("t:abort");

            if (!this.element.value) {
                var input = $(this.element),
                    parent = input.parent();
                
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

        _getSupportsFormData: function() {
            return typeof(FormData) != "undefined";
        },

        _getSupportsMultiple: function() {
            return !$.browser.opera;
        },

        _getSupportsDrop: function() {
            var userAgent = this._getUserAgent().toLowerCase(),
                isChrome = /chrome/.test(userAgent),
                isSafari = !isChrome && /safari/.test(userAgent),
                isWindowsSafari = isSafari && /windows/.test(userAgent);

            return !isWindowsSafari && this._getSupportsFormData() && (this.async.saveUrl != undefined);
        },

        _getUserAgent: function() {
            return navigator.userAgent;
        },

        _setupDropZone: function() {
            $(".t-upload-button", this.wrapper)
                .wrap("<div class='t-dropzone'></div>");

            var dropZone = $(".t-dropzone", this.wrapper)
                .append($("<em>" + this.localization["dropFilesHere"] + "</em>"))
                .bind({
                    "dragenter": stopEvent,
                    "dragover": function(e) { e.preventDefault(); },
                    "drop" : $.proxy(this._onDrop, this)
                });

            bindDragEventWrappers(dropZone,
                function() { dropZone.addClass("t-dropzone-hovered"); },
                function() { dropZone.removeClass("t-dropzone-hovered"); });

            bindDragEventWrappers($(document),
                function() { dropZone.addClass("t-dropzone-active"); },
                function() { dropZone.removeClass("t-dropzone-active"); });
        },

        _supportsRemove: function() {
            return this.async.removeUrl != undefined;
        },

        _submitRemove: function(fileNames, onSuccess, onError) {
            var params = $.extend({}, getAntiForgeryTokens());
            params["fileNames"] = fileNames;

            $.ajax({
                  type: "POST",
                  dataType: "json",
                  url: this.async.removeUrl,
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
            input.wrap("<div class='t-widget t-upload'><div class='t-button t-upload-button'></div></div>");
            input.closest(".t-button")
                .append("<span>" + this.localization.select + "</span>");

            return input.closest(".t-upload");
        },

        _checkAllComplete: function() {
            if ($(".t-file .t-icon.t-loading", this.wrapper).length == 0) {
                $t.trigger(this.wrapper, "complete");
            }
        }
    };

    $.fn.tUpload = function(options) {
        return $t.create(this, {
            name: "tUpload",
            init: function(element, options) {
                return new $t.upload(element, options);
            },
            options: options
        });
    };

    $.fn.tUpload.defaults = {
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
    };

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

    syncUploadModule.prototype = {
        onSelect: function(e) {
            var upload = this.upload;
            var sourceInput = $(e.target);
            upload._addInput(sourceInput.clone().val(""));
            var file = upload._enqueueFile(getFileName(sourceInput), { relatedInput : sourceInput });
            upload._setFileAction(file, "remove");
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

    iframeUploadModule.prototype = {
        onSelect: function(e) {
            var upload = this.upload,
                sourceInput = $(e.target);

            var fileEntry = this.prepareUpload(sourceInput);

            if (upload.async.autoUpload) {
                this.performUpload(fileEntry);
            } else {
                if (upload._supportsRemove()) {
                    this.upload._setFileAction(fileEntry, "remove");
                }

                upload._showUploadButton();
            }
        },

        prepareUpload: function(sourceInput) {
            var upload = this.upload;
            var activeInput = $(upload.element);
            upload._addInput(sourceInput.clone().val(""));

            var iframe = this.createFrame(upload.name + "_" + this.iframes.length);
            this.registerFrame(iframe);

            var form = this.createForm(upload.async.saveUrl, iframe.attr("name"))
                .append(activeInput);

            var fileEntry = upload._enqueueFile(
                getFileName(sourceInput),
                { "frame": iframe, "relatedInput": activeInput, "fileNames": getInputFiles(sourceInput) });

            iframe
                .data({ "form": form, "file": fileEntry });

            return fileEntry;
        },

        performUpload: function(fileEntry) {
            var e = { files: fileEntry.data("fileNames") },
                iframe = fileEntry.data("frame"),
                upload = this.upload;

            if (!$t.trigger(upload.wrapper, "upload", e)) {
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

                upload._setFileAction(fileEntry, "cancel");
                upload._setFileState(fileEntry, "uploading");

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

            $(".t-file", this.element).each(function() {
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

        onRemove: function(e) {
            var fileEntry = getFileEntry(e);

            var iframe = fileEntry.data("frame");
            if (iframe)
            {
                this.unregisterFrame(iframe);
                this.upload._removeFileEntry(fileEntry);
                this.cleanupFrame(iframe);
            } else {
                removeUploadedFile(fileEntry, this.upload);
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

    formDataUploadModule.prototype = {
        onSelect: function(e, rawFiles) {
            var upload = this.upload,
                module = this,
                sourceElement = $(e.target),
                files = rawFiles ? getAllFileInfo(rawFiles) : this.getInputFiles(sourceElement),
                fileEntries = this.prepareUpload(sourceElement, files);

            $.each(fileEntries, function() {
                if (upload.async.autoUpload) {
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
            var upload = this.upload,
                formData = fileEntry.data("formData"),
                e = { files: fileEntry.data("fileNames") };

            if (!$t.trigger(this.element, "upload", e)) {
                upload._setFileAction(fileEntry, "cancel");
                upload._hideUploadButton();

                e.data = $.extend({ }, e.data, getAntiForgeryTokens());
                for (var key in e.data) {
                    formData.append(key, e.data[key]);
                }

                upload._setFileState(fileEntry, "uploading");

                this.postFormData(this.upload.async.saveUrl, formData, fileEntry);
            } else {
                this.removeFileEntry(fileEntry);
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
    };

    // Helper functions
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
        return fileEntry.children(".t-icon").is(".t-loading, .t-success, .t-fail");
    }

    function logToConsole(message) {
        if (typeof(console) != "undefined" && console.log) {
            console.log(message);
        }
    }

    function getFileEntry(e) {
        return $(e.target).closest(".t-file");
    }

    function getAntiForgeryTokens() {
        var tokens = { };
        $("input[name^='__RequestVerificationToken']").each(function() {
            tokens[this.name] = this.value;
        });

        return tokens;
    }

}
