(function ($) {
    var flickr = window.flickr,
        IMAGESIZES = ["_s", "_t", "_m"],
        imageSize = IMAGESIZES[0],
        template = function(size) { return '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
        template1 = '<li alt="thumbnail"><div class=""></div><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>',
        liveUrl = "http://localhost/kendo/demos/aeroviewr/index.html",
        isAuthenticated = true;

    $(document).ready(function () {
        flickr.authenticate(function(authenticated) {
          if (authenticated) {
              $("#signin").hide();
              $("#userInfo").fadeIn().find("em:first").html(flickr.auth.user.username);
              if(history.replaceState){
                  history.replaceState(null, "AeroViewr", liveUrl);
              }
              //initAuth();
          } else {
              //init();
              $('#userInfo').hide();
              $('#signin').fadeIn();
          }
        });

        var mainPhotoStrip = $("#mainPhotoStrip"),
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
                                method: flickr.methods.search,
                                text: $("#searchBox").val(),
                                extras: "owner_name,tags",
                                per_page: 500,
                                callback: "jsonFlickrApi"
                            };
                            return flickr.methodParams(params);
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
            });

        function initAuth(){
            var flatSetsStrip = $("#flatSetsStrip"),
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
                                method: flickr.methods.getSets,
                                callback: "jsonFlickrApi",
                                user_id: flickr.auth.user.nsid
                            };
                            return flickr.methodParams(params);
                        }
                    }
                },
                reader: {
                    data: function(result) {
                        debugger;
                        var sets = result.photosets.photoset;
                        sets.splice(0,1, {"id":null, 
                                          "primary":"5540403854", 
                                          "secret":"86a40c128e", 
                                          "server":"5175", 
                                          "farm":6, 
                                          "title":{"_content":"Pictures not in set"}, 
                                          "description":{"_content":"Pictures not in set"}
                                        });
                        return sets;
                    }
                }
            });

            flatSetsStrip.kendoListView({
                dataSource: setsDataSource,
                template: template(IMAGESIZES[0])
            })
            .hide()
            .data("kendoListView")
            .bind("dataBound", function () {
                this.element.show();
                //maybe load pictures from first set
            });
        }

        $('.i-help').click(function (e) {
            dataSource.transport.cache.clear(); // temp in order to force items removal from the localStore
        });

        var search = function(e) {
            if(mainPhotoStrip.data("prevVisible") === true) {
                mainPhotoStrip.show().data("prevVisible", false);
                slider.parent().css("display", "");
            } 
            else {
                mainPhotoGrid.parent().css("display", "");
            }
            dataSource.read();
        };

        $(".i-search").click(search);
        $("#searchBox").keydown(function(e) { if (e.keyCode == 13) { search(e); } });

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

        mainPhotoStrip.kendoListView({
            dataSource: dataSource,
            template: template(imageSize)
        })
        .hide()
        .data("kendoListView")
        .bind("change", function () {
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
            mainPhotoGrid.parent().css("display", "none");
            $("#bigPhoto").fadeOut("slow")
                .attr("src", $("img:first", this.selectable.value()).attr("src").replace("_s", ""))
                .bind("load", function (e) {
                    $(e.target).hide().fadeIn("medium");
                });
        });

        $("#flatPhotoStrip").kendoListView({
            dataSource: dataSource,
            template: template("_s")
        });

        $(".paging").kendoPager({ dataSource: dataSource });

        //log in section
        $("#signin").bind("click", function(e) {
            flickr.signIn();
        });

        $("#signout").bind("click", function(e) {
            flickr.signOut();
        });
    });
})(jQuery);
