kendo_module({
    id: "upload",
    name: "Upload",
    category: "web",
    description: "The Upload widget uses progressive enhancement to deliver the best possible uploading experience to users.",
    depends: [ "core" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        logToConsole = kendo.logToConsole,
        rFileExtension = /\.([^\.]+)$/,
        NS = ".kendoUpload",
        SELECT = "select",
        UPLOAD = "upload",
        SUCCESS = "success",
        ERROR = "error",
        COMPLETE = "complete",
        CANCEL = "cancel",
        PROGRESS = "progress",
        REMOVE = "remove";

    var Upload = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.name = element.name;
            that.multiple = that.options.multiple;
            that.localization = that.options.localization;

            var activeInput = that.element;
            that.wrapper = activeInput.closest(".k-upload");
            if (that.wrapper.length === 0) {
                that.wrapper = that._wrapInput(activeInput);
            }

            that._activeInput(activeInput);
            that.toggle(that.options.enabled);

            var ns = that._ns = NS + "-" + kendo.guid();
            activeInput.closest("form")
                .on("submit" + ns, $.proxy(that._onParentFormSubmit, that))
                .on("reset" + ns, $.proxy(that._onParentFormReset, that));

            if (that.options.async.saveUrl) {
                that._module = that._supportsFormData() ?
                new formDataUploadModule(that) :
                new iframeUploadModule(that);
                that._async = true;
            } else {
                that._module = new syncUploadModule(that);
            }

            if (that._supportsDrop()) {
                that._setupDropZone();
            }

            that.wrapper
            .on("click", ".k-upload-action", $.proxy(that._onFileAction, that))
            .on("click", ".k-upload-selected", $.proxy(that._onUploadSelected, that));
        },

        events: [
            SELECT,
            UPLOAD,
            SUCCESS,
            ERROR,
            COMPLETE,
            CANCEL,
            PROGRESS,
            REMOVE
        ],

        options: {
            name: "Upload",
            enabled: true,
            multiple: true,
            showFileList: true,
            template: "",
            async: {
                removeVerb: "POST",
                autoUpload: true
            },
            localization: {
                "select": "Select files...",
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

        setOptions: function(options) {
            var that = this,
                activeInput = that.element;

            Widget.fn.setOptions.call(that, options);

            that.multiple = that.options.multiple;

            activeInput.attr("multiple", that._supportsMultiple() ? that.multiple : false);
            that.toggle(that.options.enabled);
        },

        enable: function(enable) {
            enable = typeof (enable) === "undefined" ? true : enable;
            this.toggle(enable);
        },

        disable: function() {
            this.toggle(false);
        },

        toggle: function(enable) {
            enable = typeof (enable) === "undefined" ? enable : !enable;
            this.wrapper.toggleClass("k-state-disabled", enable);
            this.element.prop("disabled", enable);
        },

        destroy: function() {
            var that = this;

            $(document)
                .add($(".k-dropzone", that.wrapper))
                .add(that.wrapper.closest("form"))
                .off(that._ns);

            $(that.element).off(NS);

            Widget.fn.destroy.call(that);
        },

        _addInput: function(sourceInput) {
            //check if source input is a DOM element. Required for some unit tests
            if (!sourceInput[0].nodeType) {
                return;
            }

            var that = this,
                input = sourceInput.clone().val("");

            input
                .insertAfter(that.element)
                .data("kendoUpload", that);

            $(that.element)
                .hide()
                .removeAttr("id")
                .off(NS);

            that._activeInput(input);
        },

        _activeInput: function(input) {
            var that = this,
                wrapper = that.wrapper;

            that.element = input;

            input
                .attr("multiple", that._supportsMultiple() ? that.multiple : false)
                .attr("autocomplete", "off")
                .on("click" + NS, function(e) {
                    if (wrapper.hasClass("k-state-disabled")) {
                        e.preventDefault();
                    }
                })
                .on("focus" + NS, function() {
                    $(this).parent().addClass("k-state-focused");
                })
                .on("blur" + NS, function() {
                    $(this).parent().removeClass("k-state-focused");
                })
                .on("change" + NS, $.proxy(that._onInputChange, that));
        },

        _onInputChange: function(e) {
            var upload = this,
                input = $(e.target),
                prevented = upload.trigger(SELECT, { files: inputFiles(input) });

            if (prevented) {
                upload._addInput(input);
                input.remove();
            } else {
                upload._module.onSelect(e);
            }
        },

        _onDrop: function (e) {
            var dt = e.originalEvent.dataTransfer,
                that = this,
                droppedFiles = dt.files;

            stopEvent(e);

            if (droppedFiles.length > 0) {
                var prevented = that.trigger(SELECT, { files: getAllFileInfo(droppedFiles) });
                if (!prevented) {
                    that._module.onSelect({target : $(".k-dropzone", that.wrapper) }, droppedFiles);
                }
            }
        },

        _prepareTemplateData: function(name, data) {
            var filesData = data.fileNames,
                templateData = {},
                totalSize = 0,
                idx = 0;

            for (idx = 0; idx < filesData.length; idx++) {
                totalSize += filesData[idx].size;
            }

            templateData.name = name;
            templateData.size = totalSize;
            templateData.files = data.fileNames;

            return templateData;
        },

        _buildFileEntryTemplate: function() {

        },

        _enqueueFile: function(name, data) {
            var that = this;
            var existingFileEntries;
            var fileEntry;
            var fileList =  $(".k-upload-files", that.wrapper);
            var options = that.options;
            var template = options.template;
            var templateData;
            var stateIcon;
            var progressBar;

            if (fileList.length === 0) {
                fileList = $("<ul class='k-upload-files k-reset'></ul>").appendTo(that.wrapper);
                if (!that.options.showFileList) {
                    fileList.hide();
                }
            }

            existingFileEntries = $(".k-file", fileList);

            if (!template) {
                fileEntry = $("<li class='k-file'><span class='k-filename' title='" + name + "'>" + name + "</span></li>");
            } else {
                templateData = that._prepareTemplateData(name, data);
                template = kendo.template(template);

                fileEntry = $("<li class='k-file'>" + template(templateData) + "</li>");
                fileEntry.find(".k-upload-action").addClass("k-button k-button-icontext");

                progressBar = $(".k-progress", fileEntry);
                if (that._async && !that.options.async.autoUpload && progressBar.length > 0) {
                    progressBar.remove();
                }

                stateIcon = $(".k-icon", fileEntry);
                if (!that._async) {
                    if (progressBar.length > 0) {
                        progressBar.remove();
                    }

                    if (stateIcon.length > 0) {
                        stateIcon.remove();
                    }
                }
            }

            fileEntry
                .appendTo(fileList)
                .data(data);

            if (that._async && !template) {
                fileEntry.prepend("<span class='k-icon'></span>");
            }

            if (!that.multiple && existingFileEntries.length > 0) {
                that._module.onRemove({target : $(existingFileEntries, that.wrapper)});
            }

            return fileEntry;
        },

        _removeFileEntry: function(fileEntry) {
            var fileList = fileEntry.closest(".k-upload-files"),
                allFiles;

            fileEntry.remove();
            allFiles = $(".k-file", fileList);

            if (allFiles.find("> .k-fail").length === allFiles.length) {
                this._hideUploadButton();
            }

            if (allFiles.length === 0) {
                fileList.remove();
            }
        },

        _fileAction: function(fileElement, actionKey) {
            var classDictionary = { remove: "k-delete", cancel: "k-cancel", retry: "k-retry" };
            if (!classDictionary.hasOwnProperty(actionKey)) {
                return;
            }

            this._clearFileAction(fileElement);

            if (!this.options.template) {
                fileElement.append(
                    this._renderAction(classDictionary[actionKey], this.localization[actionKey])
                );
            } else {
                fileElement.find(".k-upload-action")
                           .addClass("k-button k-button-icontext")
                           .append("<span class='k-icon " + classDictionary[actionKey] + "'></span>" + this.localization[actionKey])
                           .show();
            }
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
                var icon = fileEntry.find(".k-icon:not(.k-delete, .k-cancel, .k-retry)").text(currentState.text);
                icon[0].className = "k-icon " + currentState.cssClass;
            }
        },

        _renderAction: function (actionClass, actionText) {
            if (actionClass !== "") {
                return $(
                "<button type='button' class='k-button k-button-icontext k-upload-action'>" +
                    "<span class='k-icon " + actionClass + "'></span>" +
                    actionText +
                "</button>"
                );
            }
            else {
                return $(
                "<button type='button' class='k-button'>" +
                    actionText +
                "</button>"
                );
            }
        },

        _clearFileAction: function(fileElement) {
            fileElement
                .find(".k-upload-action")
                .empty()
                .hide();
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
                        that._module.onRemove({target : $(fileEntry, that.wrapper)}, eventArgs.data);
                    }
                } else if (icon.hasClass("k-cancel")) {
                    that.trigger(CANCEL, eventArgs);
                    that._module.onCancel({ target: $(fileEntry, that.wrapper) });
                    this._checkAllComplete();
                } else if (icon.hasClass("k-retry")) {
                    that._module.onRetry({ target: $(fileEntry, that.wrapper) });
                }
            }

            return false;
        },

        _onUploadSelected: function() {
            this._module.onSaveSelected();
            return false;
        },

        _onFileProgress: function(e, percentComplete) {
            var progressBar;

            if (!this.options.template) {
                progressBar = $(".k-progress-status", e.target);
                if (progressBar.length === 0) {
                    progressBar =
                        $("<span class='k-progress'><span class='k-state-selected k-progress-status' style='width: 0;'></span></span>")
                            .appendTo($(".k-filename", e.target))
                            .find(".k-progress-status");
                }

                progressBar.width(percentComplete + "%");
            } else {
                progressBar = $(".k-progress", e.target);
                if (progressBar.is(':empty')) {
                    progressBar.append("<span class='k-state-selected k-progress-status' style='width: 0;'></span>");
                }
                $(".k-progress-status", e.target).width(percentComplete + "%");
            }

            this.trigger(PROGRESS, {
                files: getFileEntry(e).data("fileNames"),
                percentComplete: percentComplete
            });
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

            this.trigger(ERROR, {
                operation: "upload",
                files: fileEntry.data("fileNames"),
                XMLHttpRequest: xhr
            });

            logToConsole("Server response: " + xhr.responseText);

            this._checkAllComplete();
        },

        _showUploadButton: function() {
            var uploadButton = $(".k-upload-selected", this.wrapper);
            if (uploadButton.length === 0) {
                uploadButton =
                    this._renderAction("", this.localization.uploadSelectedFiles)
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

            if(typeof this._module.onAbort !== 'undefined'){
                this._module.onAbort();
            }

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
            $(".k-upload-files", this.wrapper).remove();
        },

        _supportsFormData: function() {
            return typeof(FormData) != "undefined";
        },

        _supportsMultiple: function() {
            var windows = this._userAgent().indexOf("Windows") > -1;

            return !kendo.support.browser.opera &&
                   !(kendo.support.browser.safari && windows);
        },

        _supportsDrop: function() {
            var userAgent = this._userAgent().toLowerCase(),
                isChrome = /chrome/.test(userAgent),
                isSafari = !isChrome && /safari/.test(userAgent),
                isWindowsSafari = isSafari && /windows/.test(userAgent);

            return !isWindowsSafari && this._supportsFormData() && (this.options.async.saveUrl);
        },

        _userAgent: function() {
            return navigator.userAgent;
        },

        _setupDropZone: function() {
            var that = this;

            $(".k-upload-button", this.wrapper)
                .wrap("<div class='k-dropzone'></div>");

            var ns = that._ns;
            var dropZone = $(".k-dropzone", that.wrapper)
                .append($("<em>" + that.localization.dropFilesHere + "</em>"))
                .on("dragenter" + ns, stopEvent)
                .on("dragover" + ns, function(e) { e.preventDefault(); })
                .on("drop" + ns, $.proxy(this._onDrop, this));

            bindDragEventWrappers(dropZone, ns,
                function() { dropZone.addClass("k-dropzone-hovered"); },
                function() { dropZone.removeClass("k-dropzone-hovered"); });

            bindDragEventWrappers($(document), ns,
                function() { dropZone.addClass("k-dropzone-active"); },
                function() { dropZone.removeClass("k-dropzone-active"); });
        },

        _supportsRemove: function() {
            return !!this.options.async.removeUrl;
        },

        _submitRemove: function(fileNames, data, onSuccess, onError) {
            var upload = this,
                removeField = upload.options.async.removeField || "fileNames",
                params = $.extend(data, getAntiForgeryTokens());

            params[removeField] = fileNames;

            jQuery.ajax({
                  type: this.options.async.removeVerb,
                  dataType: "json",
                  dataFilter: normalizeJSON,
                  url: this.options.async.removeUrl,
                  traditional: true,
                  data: params,
                  success: onSuccess,
                  error: onError
            });
        },

        _wrapInput: function(input) {
            input.wrap("<div class='k-widget k-upload'><div class='k-button k-upload-button'></div></div>");
            input.closest(".k-button")
                .append("<span>" + this.localization.select + "</span>");

            return input.closest(".k-upload");
        },

        _checkAllComplete: function() {
            if ($(".k-file .k-icon.k-loading", this.wrapper).length === 0) {
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
            .closest("form")
                .attr("enctype", "multipart/form-data")
                .attr("encoding", "multipart/form-data");
    };

    syncUploadModule.prototype = {
        onSelect: function(e) {
            var upload = this.upload;
            var sourceInput = $(e.target);

            upload._addInput(sourceInput);

            var file = upload._enqueueFile(getFileName(sourceInput), {
                "relatedInput" : sourceInput, "fileNames": inputFiles(sourceInput)
            });

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
    };

    Upload._frameId = 0;

    iframeUploadModule.prototype = {
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

            upload._addInput(sourceInput);

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
                    if (dataInput.length === 0) {
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

        onSaveSelected: function() {
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
            var iframe = $(e.target),
                responseText;

            try {
                responseText = iframe.contents().text();
            } catch (ex) {
                responseText = "Error trying to get server response: " + ex;
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
                    module.upload._onFileProgress({ target : $(fileEntry, module.upload.wrapper) }, 100);
                    module.upload._onUploadSuccess({ target : $(fileEntry, module.upload.wrapper) }, jsonResult, fakeXHR);

                    module.cleanupFrame(iframe);
                    module.unregisterFrame(iframe);
                },
                function() {
                    $.extend(fakeXHR, { statusText: "error", status: "500" });
                    module.upload._onUploadError({ target : $(fileEntry, module.upload.wrapper) }, fakeXHR);
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
            if (iframe) {
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
    };

    formDataUploadModule.prototype = {
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
                this.upload._addInput(sourceElement);
            }

            return fileEntries;
        },

        enqueueFiles: function(files) {
            var upload = this.upload,
                name,
                i,
                filesLength = files.length,
                currentFile,
                fileEntry,
                fileEntries = [];

            if (upload.options.async.batch === true) {
                name = $.map(files, function(file) { return file.name; })
                       .join(", ");

                fileEntry = upload._enqueueFile(name, { fileNames: files });
                fileEntry.data("files", files);

                fileEntries.push(fileEntry);
            } else {
                for (i = 0; i < filesLength; i++) {
                    currentFile = files[i];
                    name = currentFile.name;

                    fileEntry = upload._enqueueFile(name, { fileNames: [ currentFile ] });
                    fileEntry.data("files", [ currentFile ]);

                    fileEntries.push(fileEntry);
                }
            }

            return fileEntries;
        },

        inputFiles: function(sourceInput) {
            return inputFiles(sourceInput);
        },

        performUpload: function(fileEntry) {
            var upload = this.upload,
                formData = this.createFormData(fileEntry.data("files")),
                xhr = new XMLHttpRequest(),
                e = {
                    files: fileEntry.data("fileNames"),
                    XMLHttpRequest: xhr
                };

            if (!upload.trigger(UPLOAD, e)) {
                upload._fileAction(fileEntry, CANCEL);
                upload._hideUploadButton();

                e.data = $.extend({ }, e.data, getAntiForgeryTokens());
                for (var key in e.data) {
                    formData.append(key, e.data[key]);
                }

                upload._fileState(fileEntry, "uploading");

                this.postFormData(upload.options.async.saveUrl, formData, fileEntry, xhr);
            } else {
                this.removeFileEntry(fileEntry);
            }
        },

        onSaveSelected: function() {
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

            if (fileEntry.find(".k-icon:not(.k-delete, .k-cancel, .k-retry)").is(".k-success")) {
                removeUploadedFile(fileEntry, this.upload, data);
            } else {
                this.removeFileEntry(fileEntry);
            }
        },

        postFormData: function(url, data, fileEntry, xhr) {
            var module = this;

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

            xhr.open("POST", url, true);
            xhr.withCredentials = "true";
            xhr.send(data);
        },

        createFormData: function(files) {
            var formData = new FormData(),
                upload = this.upload,
                i,
                length = files.length;

            for (i = 0; i < length; i++) {
                formData.append(
                    upload.options.async.saveField || upload.name,
                    files[i].rawFile
                );
            }

            return formData;
        },

        onRequestSuccess: function(e, fileEntry) {
            var xhr = e.target,
                module = this;

            function raiseError() {
                module.upload._onUploadError({ target : $(fileEntry, module.upload.wrapper) }, xhr);
            }

            if (xhr.status >= 200 && xhr.status <= 299) {
                tryParseJSON(xhr.responseText,
                    function(jsonResult) {
                        module.upload._onFileProgress({ target : $(fileEntry, module.upload.wrapper) }, 100);
                        module.upload._onUploadSuccess({ target : $(fileEntry, module.upload.wrapper) }, jsonResult, xhr);
                        module.cleanupFileEntry(fileEntry);
                    },
                    raiseError
                );
            } else {
                raiseError();
            }
        },

        onRequestError: function(e, fileEntry) {
            var xhr = e.target;
            this.upload._onUploadError({ target : $(fileEntry, this.upload.wrapper) }, xhr);
        },

        cleanupFileEntry: function(fileEntry) {
            var relatedInput = fileEntry.data("relatedInput"),
                uploadComplete = true;

            if (relatedInput) {
                $.each(relatedInput.data("relatedFileEntries") || [], function() {
                    // Exclude removed file entries and self
                    if (this.parent().length > 0 && this[0] != fileEntry[0]) {
                        uploadComplete = uploadComplete && this.find(".k-icon:not(.k-delete, .k-cancel, .k-retry)").is(".k-success");
                    }
                });

                if (uploadComplete) {
                    relatedInput.remove();
                }
            }
        },

        removeFileEntry: function(fileEntry) {
            this.cleanupFileEntry(fileEntry);
            this.upload._removeFileEntry(fileEntry);
        },

        onRequestProgress: function(e, fileEntry) {
            var percentComplete = Math.round(e.loaded * 100 / e.total);
            this.upload._onFileProgress({ target : $(fileEntry, this.upload.wrapper) }, percentComplete);
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
            name: kendo.htmlEncode(fileName),
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
        var fileNames = $.map(files, function(file) { return file.name; });

        upload._submitRemove(fileNames, data,
            function onSuccess(data, textStatus, xhr) {
                upload._removeFileEntry(fileEntry);

                upload.trigger(SUCCESS, {
                    operation: "remove",
                    files: files,
                    response: data,
                    XMLHttpRequest: xhr
                });
            },

            function onError(xhr) {
                upload.trigger(ERROR, {
                    operation: "remove",
                    files: files,
                    XMLHttpRequest: xhr
                });

                logToConsole("Server response: " + xhr.responseText);
            }
        );
    }

    function tryParseJSON(input, onSuccess, onError) {
        var success = false,
            json = "";

        try {
            json = $.parseJSON(normalizeJSON(input));
            success = true;
        } catch (e) {
            onError();
        }

        if (success) {
            onSuccess(json);
        }
    }

    function normalizeJSON(input) {
        if (typeof input === "undefined" || input === "") {
            input = "{}";
        }

        return input;
    }

    function stopEvent(e) {
        e.stopPropagation(); e.preventDefault();
    }

    function bindDragEventWrappers(element, namespace, onDragEnter, onDragLeave) {
        var hideInterval, lastDrag;

        element
            .on("dragenter" + namespace, function() {
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
            .on("dragover" + namespace, function() {
                lastDrag = new Date();
            });
    }

    function isFileUploadStarted(fileEntry) {
        return fileEntry.find(".k-icon:not(.k-delete, .k-cancel, .k-retry)").is(".k-loading, .k-success, .k-fail");
    }

    function getFileEntry(e) {
        return $(e.target).closest(".k-file");
    }

    function getAntiForgeryTokens() {
        var tokens = { },
            csrf_token = $("meta[name=csrf-token]").attr("content"),
            csrf_param = $("meta[name=csrf-param]").attr("content");

        $("input[name^='__RequestVerificationToken']").each(function() {
            tokens[this.name] = this.value;
        });

        if (csrf_param !== undefined && csrf_token !== undefined) {
          tokens[csrf_param] = csrf_token;
        }

        return tokens;
    }
    kendo.ui.plugin(Upload);
})(window.kendo.jQuery);
