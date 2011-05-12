(function ($) {
    var flickr = window.flickr,
        IMAGESIZES = ["_s", "_t", "_m"],
        imageSize = IMAGESIZES[0],
        template = function(size) { return '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
        setTemplate = '<li alt="thumbnail"><img width="100" height="100" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html",
        isAuthenticated = true;

    $(document).ready(function () {
        var flatSetsStrip = $("#flatSetsStrip"),
            mainPhotoStrip = $("#mainPhotoStrip"),
            flatPhotoStrip = $("#flatPhotoStrip"),
            mainPhotoGrid = $("#mainPhotoGrid"),
            slider = $("#slider"),
            dataSource = new kendo.data.DataSource({
                page: 1,
                pageSize: 5,
                transport: {
                    read: {
                        url: flickr.service,
                        cache: true,
                        dataType: "jsonp",
                        jsonpCallback: "jsonFlickrApi"
                    },
                    cache: "localstorage",
                    dialect: {
                        read: function(data) {
                            var params = {
                                text: $("#searchBox").val(),
                                extras: "owner_name,tags",
                                per_page: 500,
                                callback: "jsonFlickrApi"
                            };
                            return flickr.searchParams(params);
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
            mostPopularDataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: flickr.service,
                        cache: true,
                        dataType: "jsonp",
                        jsonpCallback: "jsonFlickrApi"
                    },
                    cache: "localstorage",
                    dialect: {
                        read: function(data) {
                            var params = {
                                extras: "owner_name,tags",
                                per_page: 100,
                                callback: "jsonFlickrApi"
                            };
                            return flickr.mostPopularParams(params);
                        }
                    }
                },
                reader: {
                    data: function(result) {
                        return result.photos.photo;
                    }
                }
            }),
            setsDataSource = new kendo.data.DataSource({
               transport: {
                   read: {
                       url: flickr.service,
                       cache: true,
                       dataType: "jsonp",
                       jsonpCallback: "jsonFlickrApi"
                   },
                   cache: "localstorage",
                   dialect: {
                       read: function(data) {
                           var params = {
                               callback: "jsonFlickrApi",
                           };
                           return flickr.getSetsParams(params);
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
            });


        $('.i-help').click(function (e) {
            dataSource.transport.cache.clear(); // temp in order to force items removal from the localStore
        });

        var showSearchResult = function (){
            $("#flatSearchPhotos").kendoListView({
                dataSource: dataSource,
                template: template("_s"),
                change: function() {
                    $("#bigPhoto").attr("src", this.selected().find("img").attr('src').replace("_s", ""));
                }
            });

            $(".paging").kendoPager({ dataSource: dataSource });

            mainPhotoGrid.kendoGrid({
                dataSource: dataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}]
            }).data("kendoGrid").bind("change", function () {
                $("#flatSearchPhotos").show();
                mainPhotoGrid.parent().css("display", "none");
                $("#bigPhoto").fadeOut("slow")
                    .attr("src", $("img:first", this.selectable.value()).attr("src").replace("_s", ""))
                    .bind("load", function (e) {
                        $(e.target).hide().fadeIn("medium");
                    });
                dataSource.query({page: 1, pageSize: 500});
            })
            .bind("dataBound", function(){
                mainPhotoGrid.show();
            });

            mainPhotoStrip.kendoListView({
                dataSource: dataSource,
                template: template(imageSize)
            })
            .hide()
            .data("kendoListView")
            .bind("change", function () {
                $("#flatSearchPhotos").show();
                mainPhotoStrip.hide().data("prevVisible", true);
                slider.parent().hide();
                $("#bigPhoto").fadeOut("slow")
                .attr("src", $("img:first", this.selected()).attr("src").replace(imageSize, ""))
                .bind("load", function (e) {
                    $(e.target).hide().fadeIn("medium");
                });
            })
            .bind("dataBound", function () {
                mainPhotoStrip.find("img").bind("load", function () {
                    $(this).css("display", "block")
                            .css("marginLeft", ~~($(this).width() / 2))
                            .animate({ marginLeft: 0 }, 500)
                            .parent()
                            .css("overflow", "hidden").animate({ opacity: 1 }, 1000);
                });
            });
        }

        var search = function() {
            mainPhotoGrid.hide();
            dataSource.read();
            $("#flatMostPopularPhotos").hide();
            $("#mainTemplate").show();
        };

        showSearchResult();

        $(".i-search").click(search);
        $("#searchBox").keydown(function(e) { if (e.keyCode == 13) { search(); } });

        $("#grid").click(function() {
            mainPhotoStrip.hide().data("prevVisible", false);
            slider.parent().hide();
            mainPhotoGrid.parent().show();
        });
        $("#listView").click(function() {
            mainPhotoStrip.show().data("prevVisible", true);
            slider.parent().show();
            mainPhotoGrid.parent().hide();
        });

        slider.kendoSlider({
            orientation: "vertical",
            minValue: 0,
            maxValue: 2,
            largeStep: 1
        })
        .parent().hide().end()
        .data("kendoSlider")
        .bind("change", function() {
            imageSize = IMAGESIZES[this.value()];
            mainPhotoStrip.data("kendoListView").template = template(imageSize);
            dataSource.read();
        });


        //log in section
        $("#signin").bind("click", function(e) {
            flickr.signIn();
        });

        $("#signout").bind("click", function(e) {
            flickr.signOut();
        });

        //initial loading - not logged user.
        $("#flatMostPopularPhotos").kendoListView({
            dataSource: mostPopularDataSource,
            template: template("_s"),
            dataBound: function(){
                var listView = this.element,
                    li = listView.find("li:first");
                this.selectable.value(li);
            },
            change: function() {
                $("#bigPhoto").attr("src", this.selected().find("img").attr('src').replace("_s", ""));
            }
        });

        flickr.authenticate(function(authenticated) {
            if (authenticated) {
                $("#mainTemplate").hide();
                $("#signin").hide();
                $("#userInfo").fadeIn().find("em:first").html(flickr.auth.user.username);
                if(history.replaceState){
                    history.replaceState(null, "AeroViewr", liveUrl);
                }

                flatSetsStrip.kendoListView({
                    dataSource: setsDataSource,
                    template: setTemplate,
                    dataBound: function () {
                        $("#flatMostPopularPhotos").hide();
                        this.element
                            .prepend('<li alt="thumbnail"><img width="100" height="100" src="img/NotInSet.png" /><em>Not In Set</em></li>')
                            .show();
                        //maybe load pictures from first set
                    }
                });

            } else {
              $('#userInfo').hide();
              $('#signin').fadeIn();
            }
        });
    });
})(jQuery);
