(function($, window) {

    window.application.call(this);

    var flickr = window.flickr,
        upload,
        slideshow = window.slideshow,
        data = window.data,
        photosInSet = false,        
        searching = false,
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html",
        defaultReader = {
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
        searchDialect = {
            read: function(data) {
                var params = {
                    text: $("#searchBox").val(),
                    extras: EXTRAS,
                    per_page: PAGESIZE
                };
                return flickr.searchParams(params);
            }
        },
        defaultDialect = {
            read: function(data) {
                var params = { extras: "owner_name,tags", per_page: PAGESIZE };
                if(photosInSet) {
                    params.photoset_id = photoSetId();
                    return flickr.getInSetParams(params);
                }
                else {
                    return flickr.getNotInSetParams(params);
                }
            }
        },
        setsDataSource = data.dataSource({
            dialect: {
                read: function(data) {
                    return flickr.getSetsParams({});
                }
            },
            reader: {
                data: function(result) {
                    var sets = [];
                    if (result.stat == "ok" && result.photosets.photoset) {
                        sets = result.photosets.photoset;
                    }
                    return sets;
                }
            }
        }),
        setPhotosDataSource = data.dataSource({
            serverSorting: true,
            pageSize: 20,
            dialect: defaultDialect,
            reader: defaultReader
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

       setBigPhoto($("img:first", ui.selectable.value()));

       setPhotosDataSource.query({page: 1, pageSize: PAGESIZE});
   }   

    function search() {
        if($("#searchBox").val()) {
            searching = true;
            $("#flatSetsStrip").hide();
            $("#flatPhotoStrip").hide();
            $("#overlay").fadeIn();
            $("#exifButton").fadeOut();
            changeState("searchresult");
            setPhotosDataSource.transport.dialect = searchDialect;
            setPhotosDataSource._reader = searchReader;

            $("#overlay").after("<div id='searchLoading' class='loading'>Loading ...</div>");            
            setPhotosDataSource.query({page: 1, pageSize: 20});
        }
        slideshow.stop();
    }

    function changeState(state) {
        var el = $("#backButton");
        el.data("state", state);

        if(state == "initial") {
            el.text("");
            setPhotosDataSource.transport.dialect = defaultDialect;
            setPhotosDataSource._reader = defaultReader;
            $(".i-tileview").click();
        }
        else if(state == "slideshow") {
            el.text("Back to sets");
        }
        else if(state == "searchresult") {
            el.text("Back to sets");
        }
    }

    var user = window.user = {
        initUpload: function() {
            upload = new window.Upload($("#uploadWrap"));
            $("#uploadphotos").bind("click", function(e) {
                e.preventDefault();
                slideshow.stop();
                $("#mainTemplate").hide();
                $("#mainUserWrap").hide();
                upload.show();
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
                    this.selectable.value(this.element.find("li:first"));
                },
                change: function(e) {
                    var selected = this.selected();
                    upload.currentSet(photoSetId());
                    if(selected.is(this.element.find("li:first"))) {
                        photosInSet = false;
                    } else {
                        photosInSet = true;
                    }

                    $("#mainUserWrap").show();
                    $("#overlay").fadeIn();
                    $("#exifButton").fadeOut();
                    setPhotosDataSource.page(1);
                }
            }));
        },
        initMainPictures: function() {
            var that = this;
            $(".paging").kendoPager({ dataSource: setPhotosDataSource });

            that._isSliderInit = false;

            $("#mainSetPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: setPhotosDataSource,                
                template: template(imageSize),
                change: function () {
                    changeState("slideshow");
                    showSelectedPhoto(this);
                },
                dataBound: function () {
                    if(searching){
                        $("#mainUserWrap").show();
                        searching = false;
                    }
                    if(!that._isSliderInit) {
                        that._isSliderInit = true;
                        that.initSlider();
                    }
                    displayImages(this.element);
                }
            });

            $("#mainSetPhotoGrid").kendoGrid({
                autoBind: false,
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img data-photoid="<%= id %>" alt="<%= kendo.htmlEncode(title) %>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}
                ],
                change: function() {
                    changeState("slideshow");
                    showSelectedPhoto(this);
                },
                dataBound: function() {
                    $("#searchLoading").remove();
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
                    setBigPhoto($("img:first", this.selectable.value()));
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
                change: function() {
                    var value = this.value();
                    imageSize = IMAGESIZES[value];
                    var t = template(imageSize),
                        pageSize = value === 0 ? 20 : parseInt(20 / value);
                    $("#mainSetPhotoStrip").data("kendoListView").template = kendo.template(t);
                    setPhotosDataSource.query({page: 1, pageSize: pageSize});
                }
            });
        },
        initSearch: function() {
            $(".i-search").click(function(e) { e.preventDefault(); search(); });
            $("#searchBox").bind("keydown", function(e) {
                if(e.keyCode === kendo.keys.ENTER) {
                    $(".i-search").click();
                }
            });
        },
        refreshSets: function() {
            setPhotosDataSource.transport.cache.clear();
            setPhotosDataSource.read();
            $("#mainUserWrap").show();
            $("#overlay").fadeIn();
        },
        initUser: function() {
            var that = this;
            $("#flatMostPopularPhotos").hide();
            $("#signin").hide();
            $("#userInfo").fadeIn().find("em:first").html(flickr.auth.username);

            that.thumbList = new kendo.ui.Scroller($('<div class="thumb-list">').appendTo("#footer")).scrollElement;
            
            try {
                history.replaceState(null, "AeroViewr", liveUrl);
            } catch(e) {
                if(location.href.indexOf("?") !== -1) {
                    location.href = location.href.split("?")[0];
                }
            }


            that.initFlatSetsStrip();
            that.initMainPictures();
            that.initPhotoStrip();
            that.initSearch();

            slideshow.init($("#flatPhotoStrip").data("kendoListView"));
            $("#viewslideshow").click(function(e) {
                e.preventDefault();
                var started = slideshow._started;

               $(this).find(".p-icon")
                    .toggleClass("i-pause")
                    .toggleClass("i-slideshow")
                    .end()
                    .find("em").html(started ? 'Play' : 'Pause'); 

               if (started) {
                    setBigPhoto($(".thumbs:visible").find(".t-state-selected:last img"));
                } else {
                    $("#exifButton").fadeOut();
                    setTimeout(function(){
                        hideExif();
                    }, 300);
                }

                upload.hide();
                slideshow.toggle();
            });

            $(".i-gridview").click(function() {
                $(this).addClass("currentView");
                $(".i-tileview").removeClass("currentView");
                $("#mainSetPhotoStrip").hide();
                $("#setPhotoSize").parent().hide();
                $("#mainSetPhotoGrid").show();
                setPhotosDataSource.query({page: 1, pageSize: 5});
            });

            $(".i-tileview").click(function() {
                var value = $("#setPhotoSize").data("kendoSlider").value(),
                    pageSize = value === 0 ? 20 : parseInt(20 / value);

                setPhotosDataSource.query({page: 1, pageSize: pageSize});

                $(this).addClass("currentView");
                $(".i-gridview").removeClass("currentView");
                $("#mainSetPhotoStrip").show();
                $("#setPhotoSize").parent().show();
                $("#mainSetPhotoGrid").hide();
            }).addClass("currentView");

            $("#backButton").click(function() {
                var element = $(this),
                    state = element.data("state");
                slideshow.stop();

                if (state == "slideshow") {
                    $("#flatPhotoStrip").hide();
                    $("#flatSetsStrip").show();
                    $("#mainUserWrap").show();
                    $("#overlay").fadeIn();
                    $("#exifButton").fadeOut();
                    changeState("initial");
                }
                else if(state == "searchresult") {
                    $("#flatPhotoStrip").hide();
                    $("#flatSetsStrip").show();
                    $("#mainUserWrap").show();
                    $("#overlay").fadeIn();
                    $("#exifButton").fadeOut();
                    changeState("initial");
                }
            })
            .data("state", "intial")
            .text("");
        }
    };
})(jQuery, window);
