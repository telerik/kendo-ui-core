(function($, window) {
    var flickr = window.flickr,           
        upload,
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
    notInSetDataSource = new kendo.data.DataSource({
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
                    upload.currentSet(selected);
                    if(selected.is(this.element.find("li:first"))) {
                        photosInSet = false;
                    }
                    else {                          
                        photosInSet = true;                            
                    }
                    $("#mainPicturesNotInSet").show(); 
                    notInSetDataSource.read();
                }
            });
        },
        initMainPictures: function() {
            $("#mainPicturesNotInSet").kendoListView({
                dataSource: notInSetDataSource,
                template: template(imageSize)
            })
            .hide()
            .data("kendoListView")
            .bind("change", function () {
                $("#bigPhoto").fadeOut("slow")
                    .attr("src", $("img:first", this.selected()).attr("src").replace(imageSize, ""))
                    .bind("load", function (e) {
                        $(e.target).hide().fadeIn("medium");
                    });
                this.element.hide();
            })
            .bind("dataBound", function () {
                this.element.show().find("img").bind("load", function () {
                    $(this).css("display", "block")
                            .css("marginLeft", ~~($(this).width() / 2))
                            .animate({ marginLeft: 0 }, 500)
                            .parent()
                            .css("overflow", "hidden").animate({ opacity: 1 }, 1000);
                });
            });
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
        }
    };
})(jQuery, window);