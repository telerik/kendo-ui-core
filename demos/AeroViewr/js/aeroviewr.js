(function ($) {
    var flickr = window.flickr,
        IMAGESIZES = ["_s", "_t", "_m"],
        imageSize = IMAGESIZES[0],
        template = function(size) { return '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
        setTemplate = '<li alt="thumbnail"><img width="100" height="100" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html",
        isAuthenticated = true;

    $(document).ready(function () {
        var mainTemplate = $("#mainTemplate"),
            backButton = $("#backButton"),
            mainPhotoStrip = $("#mainPhotoStrip"),
            mainPhotoGrid = $("#mainPhotoGrid"),
            mainPhotoStrip = $("#mainNotInSetPhotoStrip"),
            flatPhotoStrip = $("#flatPhotoStrip"),
            flatSetsStrip = $("#flatSetsStrip"),
            flatSearchPhotos = $("#flatSearchPhotos"),
            flatMostPopularPhotos = $("#flatMostPopularPhotos"),
            slider = $("#slider").hide(),
            pager = $(".paging"),
            dataSource = new kendo.data.DataSource({
                page: 1,
                pageSize: 5,
                serverSorting: true,
                transport: {
                    read: {
                        url: flickr.service,
                        cache: true,
                        dataType: "json"
                    },
                    cache: "localstorage",
                    dialect: {
                        read: function(data) {
                            var params = {
                                text: $("#searchBox").val(),
                                extras: "owner_name,tags",
                                per_page: 500
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
                        dataType: "json"
                    },
                    cache: "localstorage",
                    dialect: {
                        read: function(data) {
                            var params = {
                                extras: "owner_name,tags",
                                per_page: 100
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
                       dataType: "json"
                   },
                   cache: "localstorage",
                   dialect: {
                       read: function(data) {
                           var params = {
                               callback: "jsonFlickrApi",
                           };
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

        var showMostPopular = function() {
            //initial loading - not logged user.
            flatMostPopularPhotos.kendoListView({
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
        };

        var search = function() {
            dataSource.query({page: 1, pageSize: 5});
            flatMostPopularPhotos.hide();
            flatSearchPhotos.hide();
            $("#mainTemplate").show();
        };

        var initSearchResult = function () {
            pager.kendoPager({ dataSource: dataSource });

            flatSearchPhotos.kendoListView({
                dataSource: dataSource,
                template: template("_s"),
                change: function() {
                    $("#bigPhoto").attr("src", this.selected().find("img").attr('src').replace("_s", ""));
                }
            });

            mainPhotoGrid.kendoGrid({
                dataSource: dataSource,
                pageable: pager.data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}]
            })
            .data("kendoGrid")
            .bind("change", function () {
                flatSearchPhotos.show();
                this.element.parent().hide();
                $("#bigPhoto").fadeOut("slow")
                    .attr("src", $("img:first", this.selectable.value()).attr("src").replace("_s", ""))
                    .bind("load", function (e) {
                        $(e.target).hide().fadeIn("medium");
                    });
                dataSource.query({page: 1, pageSize: 500});
            });

            mainPhotoStrip.kendoListView({
                dataSource: dataSource,
                template: template(imageSize)
            })
            .hide()
            .data("kendoListView")
            .bind("change", function () {
                flatSearchPhotos.show();
                this.element.parent().hide();
                $("#bigPhoto").fadeOut("slow")
                    .attr("src", $("img:first", this.selected()).attr("src").replace(imageSize, ""))
                    .bind("load", function (e) {
                        $(e.target).hide().fadeIn("medium");
                    });
                dataSource.query({page: 1, pageSize: 500});
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

            $("#grid").click(function() {
                mainPhotoStrip.hide();
                slider.parent().hide();
                mainPhotoGrid.show();
            });
            $("#listView").click(function(e) {
                mainPhotoGrid.hide();
                mainPhotoStrip.show();
                slider.parent().show();
            });
        }

        function initVisitor() {
            $(".i-search").click(search);
            $("#searchBox").keydown(function(e) { if (e.keyCode == 13) { search(); } });

            initSearchResult();
            showMostPopular();
        }

        //
        //Logged user
        function initUser() {
            showSets();
        }

        //back button handler
        backButton.bind("click", function(){
            var element = $(this);
            if (element.text().toLowerCase() == "back to slideshow" && flickr.auth.token === null) {
                dataSource.query({page: 1, pageSize: 5});
                flatSearchPhotos.hide();
                mainTemplate.show();
                element.text("");
            }
        });

        //log in section
        $("#signin").bind("click", function() {
            flickr.signIn();
        });

        $("#signout").bind("click", function() {
            flickr.signOut();
        });

        //initial loading - not logged user.
        flatMostPopularPhotos.kendoListView({
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
                mainTemplate.hide();
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
                    backButton.text("");
                    flatSearchPhotos.show();
                    mainPhotoStrip.hide().data("prevVisible", true);
                    //slider.parent().hide();
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
            } else {
              $('#userInfo').hide();
              $('#signin').fadeIn();
              initVisitor();
            }
        });
    });
})(jQuery);
