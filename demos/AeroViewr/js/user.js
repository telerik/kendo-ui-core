(function($, window) {

    window.application.call(this);

    var flickr = window.flickr,
        upload,
        uploadInfo,
        uploadedPhotos = [],
        slideshow = window.slideshow,
        data = window.data,
        photosInSet = false,
        searching = false,
        sliderValue = 0,
        loading = $("<div id='searchLoading' class='loading'>Loading ...</div>"),
        noimages = $("<div id='noimages' class='loading'>No images found</div>"),
        defaultDeserializer = {
            data: function(result) {
                if(photosInSet) {
                    return result.photoset.photo;
                }
                return result.photos.photo;
            },
            total: function(result) {
                if(photosInSet) {
                    return Math.min(result.photoset.total, PAGESIZE);
                }
                return Math.min(result.photos.total, PAGESIZE);
            }
        },
        searchDialect = function(data) {
            var params = {
                text: $("#searchBox").val(),
                extras: EXTRAS,
                per_page: PAGESIZE
            };

            if (!$.support.cors) {
                params.jsoncallback = "searchPhotos";
            }

            return flickr.searchParams(params);
        },
        defaultDialect = function(data) {
            var params = { extras: "owner_name,tags", per_page: PAGESIZE };

            if (!$.support.cors) {
                params.jsoncallback = "defaultCallback";
            }

            if(photosInSet) {
                params.photoset_id = photoSetId();
                return flickr.getInSetParams(params);
            }
            else {
                return flickr.getNotInSetParams(params);
            }
        },
        setsDataSource = data.dataSource({
            dialect: function(data) {
                var params = {};

                if (!$.support.cors) {
                    params.jsoncallback = "getSets";
                }

                return flickr.getSetsParams(params);
            },
            schema: {
                data: function(result) {
                    var sets = [];
                    if (result.stat == "ok" && result.photosets.photoset) {
                        sets = result.photosets.photoset;
                    }
                    return sets;
                }
            },
            jsoncallback: "getSets"
        }),
        setPhotosDataSource = data.dataSource({
            serverSorting: true,
            pageSize: computePageSize(imageSize.size),
            dialect: defaultDialect,
            schema: defaultDeserializer,
            jsoncallback: "defaultCallback"
        }),
        photoSetId = function() {
            var setId = $("#flatSetsStrip").data("kendoListView").selected().attr("data-setid");
            return setId || null;
        };

    function showSelectedPhoto(ui) {
       $("#flatPhotoStrip").show();
       $("#flatSetsStrip").hide();

       ui.element.parent().hide();
       $("#overlay").fadeOut();
       $("#exifButton").fadeIn();

       setBigPhoto($("img", ui.selectable.value()).filter(":first"));

       setPhotosDataSource.query({page: 1, pageSize: PAGESIZE});
    }

    function initCallouts() {
        var hints = $(".callout");

        hints.eq(1).css({ right: window.innerWidth - ($("#searchBox").position().left + $("#searchBox").width() / 2) * zoomFactor, left: 'auto' });

        var removeHints = function(e) {
            hints.stop(true, true).fadeOut();
            $(document).unbind('mousedown touchstart', removeHints);
        };

        $(".i-hints").bind(kendo.support.touch ? 'touchend' : 'mouseup', function(e) {
            e.preventDefault();
            hints.stop(true, true).fadeIn("slow");
            $(document).bind('mousedown touchstart', removeHints);
        }).click(false);
    }

    function search() {
        if ($("#searchBox").val() && !searching) {
            slideshow.stop();
            toggleButtons(false);

            searching = true;
            noimages.remove();
            $("#flatSetsStrip").hide();
            $("#flatPhotoStrip").hide();
            $("#overlay").fadeIn();
            $("#exifButton").fadeOut();
            changeState("searchresult");
            setPhotosDataSource.transport.dialect = searchDialect;
            setPhotosDataSource.reader = searchDeserializer;

            if (!$.support.cors) {
                setPhotosDataSource.transport.options.read.jsonpCallback = "searchPhotos";
            }

            $("#overlay").after(loading);

            updatePageSize();
        }
    }

    function updatePageSize() {
        var isGrid = $("#mainUserWrap").find("#gridNotInSetPhotos").hasClass("currentView");
            listPageSize = computePageSize(imageSize.size),
            gridPageSize = computePageSize(120, true),

        setPhotosDataSource.query({page: 1, pageSize: isGrid ? gridPageSize : listPageSize});
    }

    function changeState(state) {
        var el = $("#backButton");
        el.data("state", state);

        if (state == "initial") {
            el.text("");
            setPhotosDataSource.transport.dialect = defaultDialect;
            setPhotosDataSource.reader = defaultDeserializer;

            if (!$.support.cors) {
                setPhotosDataSource.transport.options.read.jsonpCallback = "defaultCallback";
            }

            $(".i-tileview").click();
        } else if (state == "slideshow") {
            el.text("Back to sets");
        } else if (state == "searchresult") {
            el.text("Back to sets");
        }
    }

    function updatePlayIcon(playing) {
        return $("#viewslideshow").find(".p-icon")
                .toggleClass("i-pause", playing)
                .toggleClass("i-slideshow", !playing)
                .end()
                .find("em")
                .html(playing ? 'Pause' : 'Play').end();
    }

    function toggleButtons(value) {
        updatePlayIcon(slideshow._started).toggle(value);
        if (!kendo.support.touch) {
            $("#uploadphotos").toggle(value);
        }
    }

    var user = window.user = {
        initUploadInfo: function() {
            uploadInfo = $('<div id="uploadInfo"></div>')
                                    .appendTo(document.body)
                                    .kendoWindow({
                                        modal: true,
                                        title: "Status",
                                        visible: false,
                                        resizable: false,
                                        width: 375
                                    })
                                    .data("kendoWindow");
        },
        initUpload: function() {
            upload = new window.Upload($("#uploadWrap"));
            $("#uploadphotos").bind("click", function(e) {
                e.preventDefault();

                if(!$(this).hasClass("i-state-disabled")) {
                    slideshow.stop();
                    updatePlayIcon(slideshow._started);

                    var button = $("#backButton");
                    if (button.data("state") !== "initial") {
                        button.click();
                    }

                    $("#mainTemplate").hide();
                    $("#mainUserWrap").hide();
                    upload.show();
                }
            });
        },
        initFlatSetsStrip: function() {
            this.thumbList.append( $("#flatSetsStrip").kendoListView({
                autoBind: true,
                dataSource: setsDataSource,
                template: setTemplate,
                dataBound: function () {
                    this.element
                        .prepend('<li alt="thumbnail"><img width="75" height="75" src="img/NotInSet.png" /><em>Not In Set</em></li>')
                        .show();
                    this.selectable.value(this.element.find("li").filter(":first"));
                },
                change: function(e) {
                    var selected = this.selected();
                    upload.currentSet(photoSetId());
                    photosInSet = !selected.is(this.element.find("li").filter(":first"));

                    $("#mainUserWrap").show();
                    $("#overlay").fadeIn();
                    $("#exifButton").fadeOut();
                    setPhotosDataSource.page(1);
                }
            }));
        },
        initMainPictures: function() {
            var that = this;
            $(".paging").kendoPageable({ dataSource: setPhotosDataSource });

            that._isSliderInit = false;

            $("#mainSetPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: setPhotosDataSource,
                template: template(imageSize),
                change: function () {
                    changeState("slideshow");
                    showSelectedPhoto(this);
                    toggleButtons(true);
                },
                dataBound: function () {
                    loading.remove();
                    if (searching){
                        searching = false;
                        if (!setPhotosDataSource.view()[0]) {
                            $("#overlay").after(noimages);
                            $("#mainUserWrap").hide();
                        } else {
                            noimages.remove();
                            $("#mainUserWrap").show();
                        }
                    }
                    if (!that._isSliderInit) {
                        that._isSliderInit = true;
                        that.initSlider();
                    }
                    displayImages(this.element);
                }
            });

            $("#mainSetPhotoGrid").kendoGrid({
                scrollable: false,
                autoBind: false,
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPageable"),
                selectable: true,
                columns: [
                    { template: '<img data-photoid="<#= id #>" alt="<#= kendo.htmlEncode(title) #>" src="http://farm<#=farm#>.static.flickr.com/<#=server#>/<#=id#>_<#=secret#>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}
                ],
                change: function() {
                    changeState("slideshow");
                    showSelectedPhoto(this);
                    toggleButtons(true);
                },
                dataBound: function() {
                    loading.remove();
                    displayImages(this.element);
                }
            }).hide();
        },
        initPhotoStrip: function() {
            this.thumbList.append( $("#flatPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: setPhotosDataSource,
                template: template(imageSize),
                change: function () {
                    setBigPhoto($("img", this.selectable.value()).filter(":first"));
                },
                dataBound: function() {
                    var id = $("#bigPhoto").attr("data-photoid");
                    var images = this.element.find("img[data-photoid*='" + id + "']");
                    if (images.length)
                        images.parent().addClass("t-state-selected");
                }
            }).hide() );
        },
        initSlider: function() {
            $("#setPhotoSize")
            .show()
            .kendoSlider({
                orientation: "vertical",
                min: 0,
                max: 2,
                largeStep: 1,
                tickPlacement: "none",
                change: function() {
                    imageSize = IMAGESIZES[this.value()];
                    $("#mainSetPhotoStrip").data("kendoListView").template = kendo.template(template(imageSize));
                    setPhotosDataSource.query({page: 1, pageSize: computePageSize(imageSize.size)});
                }
            });
        },
        initSearch: function() {
            $(".i-search").click(function(e) { e.preventDefault(); search(); });
            $("#searchBox").bind("keydown", function(e) {
                if (e.keyCode === kendo.keys.ENTER) {
                    this.blur();
                    $(".i-search").click();
                }
            });
        },
        refreshSets: function(showGrid) {
            uploadedPhotos = upload.responses;
            setPhotosDataSource.transport.cache.clear();
            setPhotosDataSource.read();

            if(showGrid){
                $("#mainUserWrap").show();
                $("#overlay").fadeIn();
            }
        },
        initUser: function() {
            var that = this;
            $("#flatMostPopularPhotos").hide();
            $("#signin").hide();
            $("#userInfo").fadeIn().find("em").filter(":first").html(flickr.auth.username);
            $(document.body).bind('orientationchange', function() {
                if ($(".thumbViews:visible")[0]) {
                    updatePageSize();
                }
            });

            var scroller = $('<div class="thumb-list">')
                                .appendTo("#footer")
                                .kendoScroller(scrollerOptions);

            that.thumbList = scroller.data('kendoScroller').scrollElement;

            var href = location.href.split("?");
            try {
                history.replaceState(null, "AeroViewr", href[0]);
            } catch(e) {
                if(href[1]) {
                    location.href = href[0];
                }
            }

            setPhotosDataSource.bind("change", function() {
                if (uploadedPhotos[0]) {
                    var lastPage = setPhotosDataSource._totalPages(),
                        data = setPhotosDataSource.data(),
                        photosLength = uploadedPhotos.length,
                        i = data.length - 1,
                        j = 0, inStream = 0,
                        dataItem;

                    if (setPhotosDataSource.page() != lastPage) {
                        setPhotosDataSource.page(lastPage);
                    }

                    for (; i > -1; i--) {
                        j = 0;
                        dataItem = data[i];
                        for(; j < photosLength; j++) {
                            var photo = uploadedPhotos[j];
                            if (photo.stat.toLowerCase() == "fail") {
                                uploadInfo.content("<h1>Some of the files were not uploaded</h1>")
                                          .center()
                                          .open();
                                break;
                            }

                            if (dataItem.id == photo.photoid) {
                                inStream++;
                            }
                        }

                        if (inStream === photosLength) {
                            break; //all files are uploaded
                        }
                    }

                    if (inStream != photosLength) {
                        uploadInfo.content("<h1>Some of the uploaded photos\
                                            were not found in the photo stream.\
                                            It seams that Flickr does not returned\
                                            them yet. Try again later.</h1>")
                                  .center()
                                  .open();
                    }

                    uploadedPhotos = [];
                }
            });
            that.initFlatSetsStrip();
            that.initMainPictures();
            that.initPhotoStrip();
            that.initSearch();
            that.initUploadInfo();
            initCallouts();

            slideshow.init($("#flatPhotoStrip").data("kendoListView"));
            $("#viewslideshow").click(function(e) {
                e.preventDefault();
                if($(this).hasClass("i-state-disabled")) {
                    return;
                }
                var started = slideshow._started;
                if (!started && !$("#flatPhotoStrip:visible")[0]) {
                    return;
                }

                if (started) {
                    setBigPhoto($(".thumbs:visible").find(".t-state-selected:last img"));
                } else {
                    $("#exifButton").fadeOut();
                    setTimeout(function(){
                        hideExif();
                    }, 300);
                }

                upload.hide();

                $("#uploadphotos").toggleClass("i-state-disabled", !started);

                slideshow.toggle();
                updatePlayIcon(slideshow._started);
            });

            $(".i-gridview").click(function() {
                $(this).addClass("currentView");
                $(".i-tileview").removeClass("currentView");
                $("#mainSetPhotoStrip").hide();
                $("#setPhotoSize").parent().hide();
                $("#mainSetPhotoGrid").show();
                setPhotosDataSource.query({page: 1, pageSize: computePageSize(120, true)});
            });

            $(".i-tileview").click(function() {
                $(this).addClass("currentView");
                $(".i-gridview").removeClass("currentView");
                $("#mainSetPhotoStrip").show();
                $("#setPhotoSize").parent().show();
                $("#mainSetPhotoGrid").hide();
                setPhotosDataSource.query({page: 1, pageSize: computePageSize(imageSize.size)});
            }).addClass("currentView");

            $("#backButton").click(function(e) {
                var element = $(this),
                    state = element.data("state");
                e.preventDefault();

                $("#uploadphotos").removeClass("i-state-disabled");

                slideshow.stop();

                toggleButtons(true);

                if (state == "slideshow" || state == "searchresult") {
                    $("#flatPhotoStrip").hide();
                    $("#flatSetsStrip").show();
                    $("#mainUserWrap").show();
                    $("#overlay").stop(true, true).fadeIn();
                    $("#exifButton").stop(true, true).fadeOut();
                    changeState("initial");
                    noimages.remove();
                }
            })
            .data("state", "intial")
            .text("");
        }
    };
})(jQuery, window);
