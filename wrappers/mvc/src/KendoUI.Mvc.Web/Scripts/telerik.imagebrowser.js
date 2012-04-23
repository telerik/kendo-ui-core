(function($, undefined){
    
    var $t = $.telerik, q = $.telerik.query;

    $t.scripts.push("telerik.imagebrowser.js"); 

    $t.imageBrowser = function(element, options) {
        this.element = element;
        this.wrapper = $(element);

        var filter = options.filter || "*.png,*.gif,*.jpg,*.jpeg";
        var localization = options.localization;
        this.wrapper.append('<div class="t-floatwrap"><div class="t-widget t-combobox t-header t-breadcrumbs"><div class="t-dropdown-wrap t-state-default"><input type="text" class="t-input" /><div class="t-breadcrumbs-wrap"/><span class="t-select t-header"><span class="t-icon t-arrow-down">select</span></span></div></div><div class="t-widget t-combobox t-dropdown-wrap t-search-wrap" /></div>')
                    .append(toolBar(localization, options.uploadUrl, options.createDirectoryUrl, options.deleteFileUrl || options.deleteDirectoryUrl))
                    .append('<ul id="t-editor-image-list" class="t-reset t-floats t-tiles" />');
    
        var breadcrumbs = this.wrapper.find(".t-breadcrumbs");
        var listView = this.wrapper.find(".t-tiles");
        var searchBox = this.wrapper.find(".t-search-wrap");
        
        if (options.uploadUrl) {
            this.wrapper.find(".t-upload input").tUpload({
                    async: {
                        saveUrl: options.uploadUrl,
                        autoUpload: true
                    },
                    multiple: false,
                    onUpload: function(e) {
                        var rfilter = new RegExp(("(" + filter.split(",").join(")|(") + ")").replace( /\*\./g , ".*\."), "i");

                        var fileName = e.files[0].name;

                        if (rfilter.test(fileName)) {
                            e.data = { path: breadcrumbs.val() };

                            listView.trigger("t:upload", [{ name: fileName }, function() {
                                    e.preventDefault();
                                }]);
                        } else {
                            e.preventDefault();
                            alert($t.formatString(localization.invalidFileType, fileName, filter));
                        }
                    },
                    onError: function(e) {
                        e.preventDefault();
                        listView.trigger("t:error", [e.files[0]]);

                        var xhr = e.XMLHttpRequest;
                        if ($t.ajaxError(options.element, 'error', xhr, xhr.statusText))
                            return;
                    },
                    onSuccess: function(e) {
                        listView.trigger("t:completeFile", [$.extend(e.response, { path: breadcrumbs.val() })]);
                    }
                });
        }
        new $t.searchBox(searchBox[0]);
        
        new $t.fileListView(listView[0], { thumbnailUrl: options.thumbUrl, localization: localization });
            
        var dropDown = new $t.dropDown({ 
            effects: $t.fx.slide.defaults(),
            onClick: function (e) {
                $(element).find(".t-tiles-arrange a span:first").html($(e.item).text());
                dropDown.close();
                breadcrumbs.trigger("t:change");
            }
        });
            
        var arrangeBy = [{ Text: localization.orderByName, Value: "name" }, { Text:localization.orderBySize, Value: "size" }];
            
        dropDown.dataBind(arrangeBy);

        this.wrapper.find(".t-tiles-arrange a").click(function(e) {
            e.preventDefault();
            var a = $(this);
            dropDown.open({
                offset: a.offset(),
                outerHeight: a.outerHeight(),
                outerWidth: a.outerWidth(),
                zIndex: $t.getElementZIndex(this)
            });
        }).end().delegate(".t-button:not(.t-state-disabled):has(.t-delete)", "click", function() {
            var selected = listView.find(".t-state-selected");
            
            if (selected.length && confirm($t.formatString(localization.deleteFile, selected.find("strong").text()))) {
                $.ajax( {
                    type: "POST",
                    url: selected.data("kind") == "f" ? options.deleteFileUrl : options.deleteDirectoryUrl,
                    data: { path: selected.data("url") },
                    error: function (xhr, status) {
                        if ($t.ajaxError(options.element, 'error', xhr, status))
                            return;
                    },
                    success: function() {
                        listView.trigger("t:delete");
                        $(element).find(".t-delete").parent().addClass("t-state-disabled");
                    }
                });
            }
        }).delegate(".t-button:not(.t-state-disabled):has(.t-addfolder)", "click", function() {
            listView.trigger("t:createDirectory", [function(name) {
                $.ajax( {
                    type: "POST",
                    url: options.createDirectoryUrl,
                    data: { path: breadcrumbs.val(), name: name },
                    error: function (xhr, status) {
                        listView.trigger("t:errorDirectory", { name: name });
                        if ($t.ajaxError(options.element, 'error', xhr, status))
                            return;
                    },
                    success: function() {
                        listView.trigger("t:completeDirectory", { path: breadcrumbs.val(), name: name });
                    }
                });
            }]);
        });

        $(document.documentElement).bind('mousedown', function (e) {
            var element = dropDown.$element[0];

            if (!$.contains(element, e.target)) {
                dropDown.close();
            }
        });
            
        var dataSource = new $t.dataSource({
            error: function (xhr, status) {
                var prevented = $t.trigger(options.element, "error",
                {
                    XMLHttpRequest: xhr,
                    textStatus: status
                });
                if (!prevented) {
                    if (status == 'error') { 
                        if (xhr.status == '404') {
                            alert(options.localization.directoryNotFound);
                        } else if (xhr.status != '0') {
                            alert('Error! The requested URL returned ' + xhr.status + ' - ' + xhr.statusText);
                        }
                    } else if (status == 'timeout') {
                        alert('Error! Server timeout.');
                    }
                }
            },
            url: options.selectUrl,
            callback: function (data) {                
                $(element).find(".t-delete").parent().addClass("t-state-disabled");
                
                if (!breadcrumbs.val()) {
                    new $t.breadcrumbs(breadcrumbs[0], { path: data.Path, roots: data.ContentPaths });
                }

                breadcrumbs.val(data.Path).trigger("t:refresh");
                var arrangeByText = $(element).find(".t-tiles-arrange a span:first").text();
                var sortOrder = $.map(arrangeBy, function(item) { if (item.Text == arrangeByText) return item.Value; })[0];
                var filter = searchBox.val();
                listView.trigger("t:refresh",[data, sortOrder, filter]);
            }
        });

        searchBox.bind("t:change", function() {
            breadcrumbs.trigger("t:change");
        });

        dataSource.get({ path: "" });

        listView.bind("t:select", function (args) {
            if (args.kind == "d") {
                dataSource.get({ path: args.url });
            } else {                
                options.apply(args);
            }
        }).bind("t:change", function (args) {
            var deleteButton = $(element).find(".t-delete").parent().addClass("t-state-disabled");
                
            if (args.kind == "f") {
                var url = args.url;
                if(options.imageUrl) {
                    url = options.imageUrl + "?path=" + url;
                }
                $(element).parent().find('#t-editor-image-url').val(url);
            }
                
            if ((args.kind == "f" && options.deleteFileUrl) || (args.kind == "d" && options.deleteDirectoryUrl)) {
               deleteButton.removeClass("t-state-disabled");
            } 
        });

        breadcrumbs.bind("t:change", function() {
            var value = $(this).val();
            if(!value.match(/\/$/)) {
                value = value + "/";
            }
            dataSource.get({ path: value });
        });
    };

    function toolBar(localization, canUpload, canAddFolder, canRemove) {
        var upload = !canUpload ? "" : '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button"><span class="t-icon t-add"></span>' + localization.uploadFile + '<input type="file" name="file" /></div></div>',
            addFolder = !canAddFolder ? "" : '<button type="button" class="t-button t-button-icon t-button-bare"><span class="t-icon t-addfolder"></span></button>',
            remove = !canRemove ? "" : '<button type="button" class="t-button t-button-icon t-button-bare t-state-disabled"><span class="t-icon t-delete"></span></button>&nbsp;';
        
        return '<div class="t-widget t-toolbar t-floatwrap">' +
                        '<div class="t-toolbar-wrap">' + upload + addFolder + remove +
                        '</div>' +
                        '<div class="t-tiles-arrange">' +
                                localization.orderBy + ' <a href="#" class="t-link"><span>' + localization.orderByName + '</span><span class="t-icon t-arrow-down"></span></a>' +
                        '</div>' +
                '</div>';
    }

    $t.fileInfoReader = function(options){
        this._thumbnailUrl = options.thumbnailUrl || "";
    }

    $t.fileInfoReader.prototype = {
        read: function (key, data) {
            return data[key] || data[(key.charAt(0).toUpperCase() + key.substring(1))];
        },

        directories: function (data) {
            return this.read("directories", data);
        },
        files: function (data) {
            return this.read("files", data);
        },
        thumbUrl: function(path, name) {
            return this._thumbnailUrl + "/?path=" + path + encodeURIComponent(name);
        },
        size: function(item) {
            var value = this.read("size", item);
            if(!value) {
                return "";
            }

            var suffix = " bytes";

            if (value >= 1073741824) {
                suffix = " GB";
                value /= 1073741824;
            } else if (value >= 1048576) {
                suffix = " MB";
                value /= 1048576;
            } else  if (value >= 1024) {
                suffix = " KB";
                value /= 1024;
            } 
            
            return Math.round(value * 100) / 100 + suffix;
        },        
        name: function(item) {
            return this.read("name", item);
        },        
        path: function(data) {
            return this.read("path", data);
        },
        concatPaths: function(path, name){
            if(path === undefined || !path.match(/\/$/)) {
                path = (path || "") + "/";
            }
            return path + encodeURIComponent(name);
        }
    };

    $t.fileListView = function (element, options) {
        this.element = element;
        this.wrapper = $(element);
        this._localization = options.localization;
        this._reader = options.reader || new $t.fileInfoReader({thumbnailUrl: options.thumbnailUrl});

        this._pageSize = options.pageSize || 20;
        
        this.wrapper.bind({
                        "t:refresh": $.proxy(this._refresh, this),
                        "t:upload": $.proxy(this._upload, this),
                        "t:completeDirectory": $.proxy(this._completeDirectory, this),
                        "t:delete": $.proxy(this._delete, this),
                        "t:errorFile": $.proxy(this._errorFile, this),
                        "t:errorDirectory": $.proxy(this._errorDirectory, this),
                        "t:createDirectory": $.proxy(this._createDirectory, this),
                        "scroll": $.proxy(this._scroll, this) 
                    })
                    .delegate("li[data-url]:not(.t-tile-empty)", "click", $.proxy(this._click, this))
                    .delegate("li[data-url]:not(.t-tile-empty)", "dblclick", $.proxy(this._dblclick, this));
    }
    
    function loadingHtml(item) {
         return '<li class="t-tile" data-filename="' + item.name + '">' +
                    '<div class="t-thumb">' +
                        '<span class="t-icon t-loading"></span>' +
                    '</div>' +
                    '<strong>' + item.name + '</strong>' +
                '</li>';
    }

    function emptyHtml(text) {
        return '<li class="t-tile-empty">' +
                  '<strong>' + text  + '</strong>' +
               '</li>';
    }

    function fileHtml(item) {
         return '<li class="t-tile" data-filename="' + item.name + '" data-thumburl="' + item.thumbUrl + '" data-url="' + item.url +'" data-kind="' + item.kind + '">' +
                    '<div class="t-thumb">' +
                        '<span class="t-icon t-loading"></span>' +
                    '</div>' +
                    '<strong>' + item.name + '</strong>' +                    
                    '<span class="t-filesize">' + item.size + '</span>'
                '</li>';
    }

    function directoryHtml(item) {
         return '<li class="t-tile" data-url="' + item.url +'" data-kind="' + item.kind + '">' +
                    '<div class="t-thumb">' +
                        '<span class="t-icon t-folder"></span>' +
                    '</div>' +
                    '<strong>' + item.name + '</strong>' +
                '</li>';
    }    

    function newDirectoryHtml(name) {
        return '<li class="t-tile" data-kind="d">' +
                    '<div class="t-thumb">' +
                        '<span class="t-icon t-folder"></span>' +
                    "</div>" +
                    '<input class="t-input" value="' + name + '" />' +
                '</li>';        
    }

    function load(li) {        
        var element = $(li);
        var img = $("<img />", {                           
                alt: element.data("filename") 
            })            
            .hide()
            .bind("load", function() {                       
                $(this).prev().remove().end().addClass("t-image").fadeIn();
            });
            
                    
        element.find(".t-loading").after(img);
               
        // IE8 will trigger the load event immediately when the src is assign 
        // if the image is loaded from the cache
        img.attr("src", element.data("thumburl"));

        li.loaded = true;        
    }

    if ($.browser.msie && parseFloat($.browser.version) < 8) {
        var offsetTop = function (element) {
            return element.offsetTop;
        }
    } else {
        var offsetTop = function (element) {
            return element.offsetTop - $(element).height();
        }
    }

    var rescape = /(\:|\^|\$|\/|\.|\+|\||\(|\)|\[|\]|\{|\}|\\)/g,
        rstar = /\*/g,
        rquestion = /\?/g;
    
    function wildcardToRegExp(value) {
        return new RegExp(value.replace(rescape, "\\$1").replace(rstar, ".*").replace(rquestion, ".?"), "ig");
    }

    $t.fileListView.prototype = {
        bindTo: function(data, orderBy, filter) {
            this._filter = filter;
            var reader = this._reader;
            this.wrapper.empty(); 
            
            var directories = q(this._reader.directories(data) || []);
            var files = q(this._reader.files(data) || []);
            
            if (filter) {
                var where = function(item){
                    return wildcardToRegExp(filter).test(reader.name(item));
                };

                directories = directories.where(where);
                files = files.where(where);
            }

            var selector = function(item) {
                return reader[orderBy](item);
            };           

            this._data = this._process(this._reader.path(data), 
                directories.orderBy(selector),
                files.orderBy(selector)
            );            
                       
            var html = this._data
                           .select(function(item) {
                               return item.kind == "f" ? fileHtml(item) : directoryHtml(item);
                           })
                           .toArray()
                           .join("");
            
            this.wrapper.append(html);

            this._tiles = this.wrapper.find("li[data-kind=f]");
            this._scroll();
            this._asEmpty();
        },
        
        _asEmpty: function() {
            if (!this._data.any() && !this._filter) {
                this.wrapper.append(emptyHtml(this._localization.emptyFolder));
            }
        },

        _completeFile: function(file, originalFileName) {
            var name = this._reader.name(file);
            var path = this._reader.path(file);
            
            var li = $(fileHtml({
                kind: "f",
                thumbUrl: this._reader.thumbUrl(path, name),
                url: this._reader.concatPaths(path, name),
                    name: name,
                size: this._reader.size(file)
            }));
                
            this.wrapper.find("li").eq(this.fileIndex(originalFileName)).replaceWith(li);
     
            load(li[0]);
                    
            li.click();
        },
        
        _completeDirectory: function(e, directory) {
            var name = this._reader.name(directory);
            var path = this._reader.path(directory);

            var li = $(directoryHtml({ 
                kind:"d", 
                url: this._reader.concatPaths(path, name),
                name: name
            }));
                
            this.wrapper.find("li").eq(this.directoryIndex(name)).replaceWith(li);
        },

        _delete: function() {
            var selected = this.wrapper.find(".t-state-selected");
            if (selected.length) {
                var data = this._data.toArray();
                data.splice(selected.index(), 1);
                this._data = q(data);
                selected.remove();
                
                this._scroll();

                this._asEmpty();
            }
        },

        _scroll: function(e) {            
            clearTimeout(this._timeout);
            
            this._timeout = setTimeout($.proxy(function() {
                var height = this.wrapper.outerHeight();
                var viewTop = this.wrapper.scrollTop();
            
                var viewBottom = viewTop + height;
            
                this._tiles.each(function() {
                    var top = offsetTop(this);
                    var bottom = top + this.offsetHeight;

                    if ((top >= viewTop && top < viewBottom) || (bottom >= viewTop && bottom < viewBottom)) {                        
                       load(this);
                    }
                
                    if (top > viewBottom) {
                        return false;
                    }
                });

                this._tiles = this._tiles.filter(function() { 
                    return !this.loaded; 
                });
                
            }, this), 250);
        },

        _upload: function(e, file, preventDefault) {
            var fileName = file.name;
            var existingFileIndex = this.fileIndex(fileName);
            
            if (existingFileIndex > -1 && !confirm($t.formatString(this._localization.overwriteFile, fileName))) {
                preventDefault();
            } else {
                this.wrapper.find(".t-tile-empty").remove();

                var li = $(loadingHtml(file));
            
                if(existingFileIndex > -1) {
                    li.data("existing", true);
                    this.wrapper.find("li").eq(existingFileIndex).replaceWith(li);
                } else {
                    
                    var firstFile = this.wrapper.find("li[data-kind=f]:first");
                
                    if (firstFile.length) {
                        firstFile.before(li);
                    } else {
                        this.wrapper.append(li);
                    }
                    
                    var data = this._data.toArray();

                    data.splice(li.index(), 0, {
                        name: fileName,
                        kind: "f"
                    });
                }

                this.wrapper.scrollTop(li.attr("offsetTop") - this.element.offsetHeight);

                this.wrapper.one("t:completeFile", $.proxy(function(e, file) {
                    this._completeFile(file, fileName);                                        
                }, this));
            }
        },
        _nameDirectory: function() {
            var name = "New folder";

            var directoryNames = this._data.where(function(item) {
                return item.kind == "d" && item.name.indexOf(name) > -1;
            }).select(function(directory) {
                return directory.name;
            }).toArray();

            if ($.inArray(name, directoryNames) > -1) {
                var index = 2;

                do {
                    var candidate = name + " (" + index + ")";
                    index ++;
                } while ($.inArray(candidate, directoryNames) > -1);

                name = candidate;
            }

            return name;
        },
        _createDirectory: function(e, callback) {
            var name = this._nameDirectory();

            var li = $(newDirectoryHtml(name));
            
            var firstFile = this.wrapper.find("li[data-kind=f]:first");
                
            if (firstFile.length) {
                firstFile.before(li);
            } else {
                this.wrapper.append(li);
            }
            var data = this._data.toArray();

            var input = li.addClass("t-state-selected")
              .siblings()
              .removeClass("t-state-selected")
              .end()
              .find("input").keydown(function(e) {
                if (e.keyCode == 13) {
                    this.blur();
                }
              }).blur($.proxy(function(e) {                    
                    var value = $.trim(e.target.value);
                    
                    if (!value || this._data.any(function (item) {
                        return item.kind == "d" && item.name.toLowerCase() == value.toLowerCase();
                    })) {
                        value = this._nameDirectory();
                    }
                    
                    data.splice(li.index(), 0, {
                        name: value,
                        kind: "d"
                    });
                
                    $(e.target).replaceWith("<strong>" + value + "</strong>");

                    callback(value);
              }, this));
            
            setTimeout(function() {
                input.select();
            })

            this.wrapper.find(".t-tile-empty").remove();
            this.wrapper.scrollTop(li.attr("offsetTop") - this.element.offsetHeight);
        },

        _errorFile: function(e, file) {
            var index = this.fileIndex(file.name);
            
            if (index > -1) {
                var li = this.wrapper.find("li").eq(index);
                if (li.data("existing")) {
                    var replacement = $(fileHtml(this._data.toArray()[index]));
                    li.replaceWith(replacement);
                    load(replacement[0]);
                } else {
                    li.remove();
                    this._data.toArray().splice(index, 1);
                }
                this._asEmpty();
            }
        },

        _errorDirectory: function(e, directory) {
            var index = this.directoryIndex(directory.name);
            if (index > -1) {
                this.wrapper.find("li").eq(index).remove();
                this._data.toArray().splice(index, 1);
                this._asEmpty();
            }
        },
        
        fileIndex: function(name) {
            return this._index("f", name);
        },

        directoryIndex: function(name) {
            return this._index("d", name);
        },

        _index: function(kind, name) {
            var result = -1,
                data = this._data ? this._data.toArray() : [];

            name = name.toLowerCase();

            $.each(data, function (index, item) {
                if (item.kind == kind && item.name.toLowerCase() == name) {
                    result = index;
                    return false;
                }
            });
            
            return result;
        },

        _raise: function(e, type) {
            var div = $(e.currentTarget);
            
            $t.trigger(this.wrapper, type, {
                kind: div.data("kind"),
                url: div.data("url")
            });
        },

        _click: function (e) {
            $(e.currentTarget).addClass("t-state-selected")
                              .siblings()
                              .removeClass("t-state-selected");
            
            this._raise(e, "t:change");
        },

        _dblclick: function (e) {
            // clear selection for IE
            if(document.selection && document.selection.empty) {
                document.selection.empty();
            } 
            
            this._raise(e, "t:select");
        },
        
        _refresh: function(e, data, orderBy, filter) {
            this.bindTo(data, orderBy, filter);
        },

        _process: function(path, directories, files) {
            var reader = this._reader;
            
            var directories = directories.select(function (dir) {
                return {                    
                    url: reader.concatPaths(path, reader.name(dir)),
                    name: reader.name(dir),
                    kind: "d"
                };
            });
            
            var files = files.select(function (file) {
                var name = reader.name(file);
                return {
                    url: reader.concatPaths(path, name),
                    name: name,
                    kind: "f",
                    thumbUrl: reader.thumbUrl(path, name),
                    size: reader.size(file)
                };
            });

            return directories.concat(files);
        }
    }

    $t.dataSource = function(options) {
        this._url = options.url;
        this._callback = options.callback;
        this._error = options.error;
    }

    $t.dataSource.prototype = {
        _complete: function (data) { 
            if(this._callback) {
                this._callback(data);
            }           
        },
        get: function(args){
            $.ajax({
                type: "POST",
                url: this._url,
                data: args,
                success: $.proxy(this._complete, this),
                error: this._error
            });
        }
    }

    $t.breadcrumbs = function (element, options) {
        this.element = element;
        this.wrapper = $(element);
        this._gap = options.gap || 50;        
        
        this._initPaths(options.path);
        
        var dropDown = new $t.dropDown({ 
            effects: $t.fx.slide.defaults(),
            onClick: $.proxy(function (e) {                
                var value = $(e.item).text();
                dropDown.close();
                this._initPaths(value);
                $(element).val(value).trigger("t:change");
            }, this)
        });            

        dropDown.dataBind(options.roots);
        
        this.wrapper.delegate("input", "focus", $.proxy(this._focus, this))
                    .delegate("input", "blur", $.proxy(this._blur, this))
                    .delegate("input", "keydown", $.proxy(function(e) {
                        if (e.keyCode == 13) {
                            this._blur();
                        }
                    }, this))
                    .delegate("a:not(.t-first)", "click", $t.stopAll(this._click, this))
                    .delegate(".t-select", "click", function() {
                        var a = $(element);
                        dropDown.open({
                            offset: a.offset(),
                            outerHeight: a.outerHeight(),
                            outerWidth: a.outerWidth(),
                            zIndex: $t.getElementZIndex(this)
                        });
                    })
                    .bind("t:refresh", $.proxy(this.refresh, this));
         
         $(document.documentElement).bind('mousedown', function (e) {
            var element = dropDown.$element[0];

            if (!$.contains(element, e.target)) {
                dropDown.close();
            }
        });
        
        this.value(options.path);
    }
    
    $t.breadcrumbs.prototype = {
        _initPaths: function(path) {
            this._basePath = (path || "").replace(/\/{2,}/g, "/").replace(/\/$/, "");
        
            path = this._basePath.split("/");
            path.pop();
        
            this._root = path.join("/");
        },
        _html: function () {
            var baseIndex = this._basePath.split("/").length - 1;

            var val = this.value();
            if(val === undefined || !val.match(/^\//)) {
                val = "/" + (val || "");
            }
            return '<div class="t-dropdown-wrap t-state-default">' +
                '<input type="text" class="t-input" />' +
                '<div class="t-breadcrumbs-wrap">' + 
                $.map(val.split("/"), function(segment, index) {
                    if (segment && index >= baseIndex) {
                        return '<a class="t-link" href="#">' + segment + '</a>';
                    }
                }).join('<span class="t-icon t-arrow-next">&gt;</span>') + 
                "</div>" + 
                '<span class="t-select t-header"><span class="t-icon t-arrow-down">select</span></span>' +
                "</div>";
        },

        _path: function (trail) {
            return this._root + "/" + $.map(trail, function(breadcrumb) {
                return $(breadcrumb).text();
            }).join("/");
        },
        
        _update: function(path) {
            path = path.charAt(0) === "/" ? path : "/" + path;

            var change = this.value() != path;

            this.value(path);
            
            if (change) {
                this.wrapper.trigger("t:change");
            }
        },

        value: function (path) {
            if (path !== undefined) {
                this.wrapper.val(path.replace(/\/{2,}/g, "/"));
                this.refresh();
            } else {
                return this.wrapper.val();
            }
        },

        _click: function(e) {
            this._update(this._path($(e.target).prevAll("a").andSelf()));
        },

        refresh: function() {
            this.wrapper.empty().append(this._html());

            var width = this.wrapper.width() - this._gap;
            
            var links = this.wrapper.find("a");

            links.each(function(index) {
                var a = $(this);
                
                if (a.parent().width() > width) {
                    if (index == links.length - 1) {
                        a.width(width);
                    } else {
                        a.prev().andSelf().hide();
                    }
                }
            });
        },
        
        _focus: function () {
            var input = this.wrapper.find(".t-breadcrumbs-wrap").hide()
                            .end().find("input").val(this.value());
            
            setTimeout(function() {
                input.select();
            });
        },
        
        _blur: function () {
            var value = this.wrapper.find("input").val().replace(/\/{2,}/g, "/");
            
            if (!value || value.toLowerCase().indexOf(this._basePath.toLowerCase()) < 0 ) {
                value = this._basePath;
            }
            
            this._update(value);
        }
    }

    $t.searchBox = function(element) {
        this.element = element;
        this.wrapper = $(element);

        this.wrapper.delegate("input", "focus", $.proxy(this._focus, this))
                    .delegate("input", "blur", $.proxy(this._blur, this))
                    .delegate("input", "keydown", $.proxy(function(e){
                        if (e.keyCode == 13) {
                            this._blur();
                        }
                    }, this))
                    .delegate("a", "click", $t.stopAll(this._click, this));

        this._render();
    }

    $t.searchBox.prototype = {
        _render: function() {
            var html = '<label for="t-imagebrowser-search">Search</label>' +
                       '<input type="text" id="t-imagebrowser-search" class="t-input" />' +
                       '<a href="#" class="t-icon t-search">search</a>';

            this.wrapper.empty().append($(html));
        },
        _focus: function() {    
            this.wrapper.find("label").hide();
        },
        _blur: function() {
            this._update(this.wrapper.find("input").val());

            if(this.value() == "") {
                this.wrapper.find("label").show();
            }
        },
        _update: function(val) {
            var change = this.value() != val;

            this.value(val);
            
            if (change) {
                this.wrapper.trigger("t:change");
            }
        },
        value: function (val) {
            if (val !== undefined) {
                this.wrapper.val(val);
            } else {
                return this.wrapper.val();
            }
        },
        _click: function() {
            this._blur();
        }
    };
    
})(jQuery);
