(function ($) {
    var flickr = window.flickr,
        visitor = window.visitor,
        upload = window.uploadView,
        IMAGESIZES = ["_s", "_t", "_m"],
        imageSize = IMAGESIZES[0],
        template = function(size) { return '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
        setTemplate = '<li alt="thumbnail"><img width="100" height="100" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html";

    $(document).ready(function () {
        var flatSetsStrip = $("#flatSetsStrip"),
            uploadView = new UploadView($("#uploadWrap")),
            mainNotInSetPhotoStrip = $("#mainNotInSetPhotoStrip"),
            setsDataSource = new kendo.data.DataSource({
               transport: {
                   read: {
                       url: flickr.service,
                       cache: true,
                       dataType: "json"
                   },
                   cache: "localstorage",
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
               transport: {
                   read: {
                       url: flickr.service,
                       cache: true,
                       dataType: "json"
                   },
                   cache: "localstorage",
                   dialect: {
                       read: function(data) {
                           return flickr.getNotInSetParams({extras: "owner_name,tags", per_page: 500});
                       }
                   }
                },
                reader: {
                    data: function(result) {
                        return result.photos.photo;
                    },
                    total: function(result) {
                        return Math.min(result.photos.total, 500);
                    }
                }
            }),
            tagHotListDataSource = new kendo.data.DataSource({
                serverFiltering: true,
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
                            return flickr.getRelatedTagParams(data.filter[0].value);
                        }
                    }
                },
                reader: {
                    data: function(result) {
                        return $.map(result.tags.tag, function(tag) {
                            return tag._content;
                        });
                    }
                }
            });

        $('.i-help').click(function (e) {
            dataSource.transport.cache.clear(); // temp in order to force items removal from the localStore
        });

        $("#searchBox").kendoAutoComplete({
            dataSource: tagHotListDataSource
        });

        $("#uploadphotos").bind("click", function() {
            uploadView.show();
        });

        //log in section
        $("#signin").bind("click", function() {
            flickr.signIn();
        });

        $("#signout").bind("click", function() {
            flickr.signOut();
        });

        flickr.authenticate(function(authenticated) {
           if (authenticated) {
                //mainTemplate.hide();
                $("#signin").hide();
                $("#userInfo").fadeIn().find("em:first").html(flickr.auth.user.username);
                if(history.replaceState){
                    history.replaceState(null, "AeroViewr", liveUrl);
                }

                flatSetsStrip.kendoListView({
                    dataSource: setsDataSource,
                    template: setTemplate,
                    dataBound: function () {
                        flatMostPopularPhotos.hide();
                        this.element
                            .prepend('<li alt="thumbnail"><img width="100" height="100" src="img/NotInSet.png" /><em>Not In Set</em></li>')
                            .show();
                        this.selectable.value(this.element.find("li:first"));
                        //maybe load pictures from first set
                    },
                    change: function(e) {
                        uploadView.currentSet(this.selectable.value());
                    }
                });
                $("#mainPicturesNotInSet").show();
                mainNotInSetPhotoStrip.kendoListView({
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
                })
                .bind("dataBound", function () {
                    mainNotInSetPhotoStrip.show().find("img").bind("load", function () {
                        $(this).css("display", "block")
                                .css("marginLeft", ~~($(this).width() / 2))
                                .animate({ marginLeft: 0 }, 500)
                                .parent()
                                .css("overflow", "hidden").animate({ opacity: 1 }, 1000);
                    });
                });
            } else {
              $('#userInfo').hide();
              $('#signin').fadeIn();
              visitor.initVisitor();
            }
        });
    });
})(jQuery);
