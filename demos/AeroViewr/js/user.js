(function($, window) {
    var flickr = window.flickr,
        upload,
        slideshow = window.slideshow,
        data = window.data,
        photosInSet = false,
        IMAGESIZES = [
            {suffix: "_s", size: 75},
            {suffix: "_t", size: 100},
            {suffix: "_m", size: 240},            
        ],
        imageSize = IMAGESIZES[0],
        PAGESIZE = 500,
        EXTRAS = "owner_name,tags",
        template = function(option) { return '<li style="width:' + option.size + 'px;height:' + option.size + 'px"><img alt="<%= title %>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + option.suffix + '.jpg"></li>'; },
        setTemplate = '<li data-setid="<%=id%>" alt="thumbnail"><img width="75" height="75" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
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
        cache: "inmemory",
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

       setBigPhoto($("img:first", ui.selectable.value()));

       setPhotosDataSource.query({page: 1, pageSize: PAGESIZE});
   }

   function setBigPhoto(img) {       
       var bigPhoto = $("#bigPhoto"),
           src = img.attr("src").replace("_s", "").replace(imageSize.suffix,""),
           loader = $("img.loader");

        $(".exifInfo").find("h2").text(img.attr("alt") || "No Title").end().find(".i-help").attr("data-photoid", img.attr("data-photoid"));

        if (loader[0]) {
            loader.remove();
        } else {
            bigPhoto.after("<div class='loading'>Loading ...</div>");
        }

        loader = $("<img class='loader' />")
        .hide()
        .appendTo(document.body)
        .attr("src", src)
        .bind("load", function() {
            loader.remove();
            bigPhoto.next(".loading")
            .remove()
            .end()
            .stop(true, true)
            .fadeOut(function() {
                bigPhoto.attr("src", src);
            })
            .fadeIn();
        });
   }

    function search() {
        if($("#searchBox").val()) {            
            $("#flatSetsStrip").hide();
            $("#flatPhotoStrip").hide();
            $("#mainUserWrap").show();
            $("#overlay").fadeIn();
            $("#exifButton").fadeOut();

            setPhotosDataSource.transport.dialect = searchDialect;
            setPhotosDataSource.reader = searchReader;
            
            setPhotosDataSource.read();
        }        
        slideshow.stop();
    }

    var user = window.user = {
        initUpload: function() {
            upload = new window.Upload($("#uploadWrap"));
            $("#uploadphotos").bind("click", function(e) {
                e.preventDefault();
                slideshow.stop();
                upload.show();
            });
        },
        initFlatSetsStrip: function() {
            $("#flatSetsStrip").kendoListView({
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
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                template: template(imageSize),
                change: function () {
                    showSelectedPhoto(this);
                },
                dataBound: function () {
                    displayImages(this.element);
                }
            }).hide();

            $("#mainSetPhotoGrid").kendoGrid({
                dataSource: setPhotosDataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}
                ],
                change: function() {
                    showSelectedPhoto(this);
                },
                dataBound: function() {
                    displayImages(this.element);
                }
            });
        },
        initPhotoStrip: function() {
            $("#flatPhotoStrip").kendoListView({
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

            that.initUpload();
            that.initFlatSetsStrip();
            that.initMainPictures();
            that.initPhotoStrip();
            that.initSlider();
            that.initSearch();

            slideshow.init($("#flatPhotoStrip").data("kendoListView"));
            $("#viewslideshow").click(function() {
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
                slideshow.stop();
                $("#flatPhotoStrip").hide();                
                $("#flatSetsStrip").show();
                $("#mainUserWrap").show();
            });            
        }
    };
})(jQuery, window);
