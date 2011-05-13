
(function($, window) {
var IMAGESIZES = ["_s", "_t", "_m"],
    imageSize = IMAGESIZES[0],
    template = function(size) { return '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>' + size + '.jpg"></li>'; },
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
    });

   window.visitor = {
        showMostPopular: function() {
            $("#flatMostPopularPhotos").kendoListView({
                dataSource: mostPopularDataSource,
                template: template("_s"),
                dataBound: function() {
                    var listView = this.element,
                        li = listView.find("li:first");
                    this.selectable.value(li);
                },
                change: function() {
                    $("#bigPhoto").attr("src", this.selected().find("img").attr('src').replace("_s", ""));
                }
            });
        },
        search: function() {
            dataSource.query({page: 1, pageSize: 5});
            $("#flatMostPopularPhotos").hide();
            $("#flatSearchPhotos").hide();
            $("#mainTemplate").show();
        },

        initSearchResult: function () {
            $(".paging").kendoPager({ dataSource: dataSource });

            $("#flatSearchPhotos").kendoListView({
                dataSource: dataSource,
                template: template("_s"),
                change: function() {
                   $("#bigPhoto").attr("src", this.selected().find("img").attr('src').replace("_s", ""));
                }
            });
            $("#mainPhotoGrid").kendoGrid({
                dataSource: dataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}]
            })
            .data("kendoGrid")
            .bind("change", function () {
                $("#flatSearchPhotos").show();                
                this.element.parent().hide();
                $("#bigPhoto").fadeOut("slow")
                    .attr("src", $("img:first", this.selectable.value()).attr("src").replace("_s", ""))
                    .bind("load", function (e) {
                        $(e.target).hide().fadeIn("medium");
                    });
                dataSource.query({page: 1, pageSize: 500});
            });

            $("#mainPhotoStrip").kendoListView({
                dataSource: dataSource,
                template: template(imageSize)
            })
            .hide()
            .data("kendoListView")
            .bind("change", function () {
                $("#flatSearchPhotos").show();
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

            $("#slider").kendoSlider({
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
                $("#slider").parent().hide();
                $("#mainPhotoGrid").show();
            });
            $("#listView").click(function(e) {                                
                $("#mainPhotoGrid").hide();
                mainPhotoStrip.show();
                $("#slider").parent().show();
            });
            /*
            $("#backButton").bind("click", function(){
                var element = $(this);
                if (element.text().toLowerCase() == "back to slideshow" && flickr.auth.token === null) {
                    dataSource.query({page: 1, pageSize: 5});
                    $("#flatSearchPhotos").hide();
                    $("#mainTemplate").show();
                    element.text("");
                }
            });*/
        },
        initVisitor: function() {
            $(".i-search").unbind("click").click(this.search);
            $("#searchBox").unbind("keydown").keydown(function(e) { if (e.keyCode == 13) { this.search(); } }); //change with autocomplete... maybe InitAutoComplete

            this.initSearchResult();
            this.showMostPopular();
        }
   };
})(jQuery, window);
