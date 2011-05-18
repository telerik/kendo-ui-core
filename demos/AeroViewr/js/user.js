(function($, window) {
    var flickr = window.flickr,
        upload,
        slideshow = window.slideshow,
        data = window.data,
        photosInSet = false,
        IMAGESIZES = [
            {suffix: "_s", size: 75},
            {suffix: "_t", size: 100},
            {suffix: "_m", size: 240}
        ],
        imageSize = IMAGESIZES[0],
        PAGESIZE = 500,
        EXTRAS = "owner_name,tags",
        template = function(option) { return '<li style="width:' + option.size + 'px;height:' + option.size + 'px"><img data-photoid="<%= id %>" alt="<%= title %>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + option.suffix + '.jpg"></li>'; },
        setTemplate = '<li data-setid="<%=id%>" alt="thumbnail"><img width="75" height="75" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=primary%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html";

    var searchReader = {
        data: function(result) {
            return result.photos.photo;
        },
        total: function(result) {
            return Math.min(result.photos.total, PAGESIZE);
        }
    },
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
    };

    var setsDataSource = data.dataSource({
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
        pageSize: 5,
        dialect: defaultDialect,
        reader: defaultReader
    }),
    photoSetId = function() {
        return $("#flatSetsStrip").data("kendoListView").selected().attr("data-setid");
    };

    function displayImages(element) {
       element.find("img")
           .hide()
           .bind("load", function() {
               $(this).fadeIn();
           });
    }

    function showSelectedPhoto(ui) {
       $("#flatPhotoStrip").show();
       $("#flatSetsStrip").hide();

       ui.element.parent().hide();
       $("#overlay").fadeOut();
       $("#exifButton").fadeIn();

       setBigPhoto($("img:first", ui.selectable.value()));

       setPhotosDataSource.query({page: 1, pageSize: PAGESIZE});
   }
   var loadingTimeout = 0;
   function setBigPhoto(img) {
       var bigPhoto = $("#bigPhoto"),
           src = img.attr("src").replace("_s", "").replace(imageSize.suffix,""),
           loader = $("img.loader"),
           exifInfo = $(".exifInfo");

        if (loader[0]) {
            loader.remove();
        } else {
            loadingTimeout = setTimeout(function() {
                bigPhoto.after("<div class='loading'>Loading ...</div>");
                exifInfo.fadeOut();
            }, 100);
        }

        loader = $("<img class='loader' />")
            .hide()
            .appendTo(document.body)
            .attr("src", src)
            .bind("load", function() {
                clearTimeout(loadingTimeout);

                loader.remove();

                bigPhoto.next(".loading")
                    .remove()
                    .end()
                    .add(exifInfo)
                    .stop(true, true)
                    .fadeOut(function() {
                        if (this == exifInfo[0]) {
                            exifInfo.find("h2")
                               .text(img.attr("alt") || "No Title")
                               .end()
                               .attr("data-photoid", img.attr("data-photoid"));
                            exifInfo.css({
                               display: 'block',
                               opacity: 0
                            });
                        } else {
                            bigPhoto.attr("src", src);
                        }
                    });

                bigPhoto.fadeIn({
                    step: function (now) {
                        if (!slideshow._started)
                            exifInfo.css('opacity',  now);
                    }
                });
            });
   }

    function search() {
        if($("#searchBox").val()) {
            $("#flatSetsStrip").hide();
            $("#flatPhotoStrip").hide();
            $("#mainUserWrap").show();
            $("#overlay").fadeIn();
            $("#exifButton").fadeOut();
            changeState("searchresult");
            setPhotosDataSource.transport.dialect = searchDialect;
            setPhotosDataSource._reader = searchReader;

            $("#overlay").after("<div id='searchLoading' class='loading'>Loading ...</div>");
            setPhotosDataSource.read();
        }
        slideshow.stop();
    }

    function changeState(state) {
        var el = $(".bottomLink>#backButton");
        $(".bottomLink").data("state", state);

        if(state == "initial") {
            el.text("");
            setPhotosDataSource.transport.dialect = defaultDialect;
            setPhotosDataSource._reader = defaultReader;
            $(".i-gridview").click();
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
                $("#exifButton").hide();
                $("#overlay").show();
                upload.show();
            });
        },
        initFlatSetsStrip: function() {
            $("#flatSetsStrip").kendoListView({
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
            });
        },
        initMainPictures: function() {
            $(".paging").kendoPager({ dataSource: setPhotosDataSource });

            $("#mainSetPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                template: template(imageSize),
                change: function () {
                    changeState("slideshow");
                    showSelectedPhoto(this);
                },
                dataBound: function () {
                    displayImages(this.element);
                }
            }).hide();

            $("#mainSetPhotoGrid").kendoGrid({
                autoBind: false,
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img data-photoid="<%= id %>" alt="<%=title%>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
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
            });
        },
        initPhotoStrip: function() {
            $("#flatPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                template: template(imageSize),
                change: function () {
                    setBigPhoto($("img:first", this.selectable.value()));
                }
            }).hide();
        },
        initSlider: function() {
            $("#setPhotoSize").kendoSlider({
                orientation: "vertical",
                min: 0,
                max: 2,
                largeStep: 1,
                change: function() {
                    imageSize = IMAGESIZES[this.value()];
                    $("#mainSetPhotoStrip").data("kendoListView").template = kendo.template(template(imageSize));
                    setPhotosDataSource.read();
                }
            })
            .parent().hide();
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
        },
        initUser: function() {
            var that = this;
            $("#flatMostPopularPhotos").hide();
            $("#signin").hide();
            $("#userInfo").fadeIn().find("em:first").html(flickr.auth.username);

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
            that.initSlider();
            that.initSearch();

            slideshow.init($("#flatPhotoStrip").data("kendoListView"));
            $("#viewslideshow").click(function(e) {
                e.preventDefault();

                $(this).find(".p-icon")
                    .toggleClass("i-pause")
                    .toggleClass("i-slideshow");

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
            }).addClass("currentView");

            $(".i-tileview").click(function() {
                $(this).addClass("currentView");
                $(".i-gridview").removeClass("currentView");
                $("#mainSetPhotoStrip").show();
                $("#setPhotoSize").parent().show();
                $("#mainSetPhotoGrid").hide();
                setPhotosDataSource.query({page: 1, pageSize: 20});
            });

            $(".bottomLink").click(function() {
                var element = $(this),
                    state = element.data("state");
                slideshow.stop();
                if (state == "slideshow") {
                    $("#flatPhotoStrip").hide();
                    $("#flatSetsStrip").show();
                    $("#mainUserWrap").show();
                    changeState("initial");
                }
                else if(state == "searchresult") {
                    $("#flatPhotoStrip").hide();
                    $("#flatSetsStrip").show();
                    $("#mainUserWrap").show();
                    changeState("initial");
                }
            })
            .data("state", "intial")
            .find(">#backButton").text("");
        }
    };
})(jQuery, window);
