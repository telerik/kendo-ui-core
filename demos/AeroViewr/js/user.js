(function($, window) {
    var flickr = window.flickr,
        upload,
        slideshow = window.slideshow,
        photosInSet = false,
        IMAGESIZES = ["_s", "_t", "_m"],
        imageSize = IMAGESIZES[0],
        template = function(size) { return '<li><img alt="<%= title %>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
        setTemplate = '<li data-setid="<%=id%>" alt="thumbnail"><img width="75" height="75" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html";

    var setsDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: flickr.service,
                cache: true,
                dataType: "json"
            },
            cache: "inmemory",
            dialect: {
                read: function(data) {
                    return flickr.getSetsParams({});
                }
            }
        },
        reader: {
            data: function(result) {
                // this will not databind listview if no sets!!!
                var sets = [];
                if (result.stat == "ok" && result.photosets.photoset) {
                    sets = result.photosets.photoset;
                }
                return sets;
            }
        }
    }),
    setPhotosDataSource = new kendo.data.DataSource({
        serverSorting: true,
        pageSize: 10,
        transport: {
            read: {
                url: flickr.service,
                cache: true,
                dataType: "json"
            },
            cache: "localstorage",
            dialect: {
                read: function(data) {
                    var params = { extras: "owner_name,tags", per_page: 500 };
                    if(photosInSet) {
                        params.photoset_id = photoSetId();
                        return flickr.getInSetParams(params);
                    }
                    else {
                        return flickr.getNotInSetParams(params);
                    }
                }
            }
        },
        reader: {
            data: function(result) {
                if(photosInSet) {
                    return result.photoset.photo;
                }
                return result.photos.photo;
            },
            total: function(result) {
                if(photosInSet) {
                    return Math.min(result.photoset.total, 500);
                }
                return Math.min(result.photos.total, 500);
            }
        }
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
       //$("#flatSearchPhotos").show();
       $("#flatPhotoStrip").show();
       $("#flatSetsStrip").hide();

       ui.element.parent().hide();

       setBigPhoto($("img:first", ui.selectable.value()));
       
       setPhotosDataSource.query({page: 1, pageSize: 500});
   }

   function setBigPhoto(img) {
       var bigPhoto = $("#bigPhoto"),
           src = img.attr("src").replace("_s", ""),
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

    var user = window.user = {
        initUpload: function() {
            upload = new window.Upload($("#uploadWrap"));
            $("#uploadphotos").bind("click", function(e) {
                e.preventDefault();
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
                    //maybe load pictures from first set
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
        refreshSets: function() {
            notInSetDataSource.transport.cache.clear();
            notInSetDataSource.read();
        },
        initUser: function() {
            var that = this;
            $("#flatMostPopularPhotos").hide();
            $("#signin").hide();
            $("#userInfo").fadeIn().find("em:first").html(flickr.auth.user.username);
            if(history.replaceState){
                history.replaceState(null, "AeroViewr", liveUrl);
            }

            that.initUpload();
            that.initFlatSetsStrip();
            that.initMainPictures();
            that.initPhotoStrip();

            slideshow.init($("#flatPhotoStrip").data("kendoListView"));
            $("#viewslideshow").click(function() {
                slideshow.toggle();
            });
        }
    };
})(jQuery, window);
