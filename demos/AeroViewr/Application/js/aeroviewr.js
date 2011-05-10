(function ($) {
    var app = {
        key: 'ea73824c4e27a137b7597fc3ffb3ba98',
        secret: '2e767957c686dd30',
        frob: "72157626154487045-2db02b0fc7fbf6de-60630644"
    };

    var auth = {
        token: '72157626154487043-7dfd951a1ede12fa' //write auth
    };

    var service = "http://api.flickr.com/services/rest/",
        template = '<li alt="thumbnail"><img src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg"></li>';

    function getThumbnailURL(photo) {
        return 'http://farm' + photo.farm + '.' + 'static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
    }

    function buildAuthMethod(service, method, params) {
        params = params || {};
        params["method"] = method;
        params["api_key"] = app.key;
        params["auth_token"] = auth.token;
        params["format"] = "json";
        params["api_sig"] = getApiSig(app.secret, params);

        return service + "?" + $.param(params);
    }

    function getApiSig(secret, params) {
        var concatString = "",
            keys = [];

        params["callback"] = "jsonFlickrApi";

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        keys.sort();
        concatString += secret
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            concatString += key + params[key];
        }
        return hex_md5(concatString);
    }

    $(document).ready(function () {
        var mainPhotoStrip = $("#mainPhotoStrip"),
            flatPhotoStrip = $("#flatPhotoStrip"),
            mainPhotoGrid = $("#mainPhotoGrid"),
            slider = $("#slider"),
            dataSource = new kendo.data.DataSource({
                page: 1,
                pageSize: 5,
                transport: {
                    read: {
                        url: service,
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
                                method: "flickr.photos.search",
                                api_key: app.key,
                                auth_token: auth.token,
                                format: "json"
                            }
                            params.per_page = 500;
                            params["api_sig"] = getApiSig(app.secret, params);
                            return params;
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

        $('.i-help').click(function (e) {
            dataSource.transport.cache.clear(); // temp in order to force items removal from the localStore
        });

        $('.i-search').click(function (e) {
            if(mainPhotoStrip.data("prevVisible") === true) {
                mainPhotoStrip.show().data("prevVisible", false);
                slider.parent().css("display", "");                
            } 
            else {
                mainPhotoGrid.parent().css("display", "");
            }
            dataSource.read();
        });

        $("#grid").click(function() {
            mainPhotoStrip.hide();
            slider.parent().css("display", "none");
            mainPhotoGrid.parent().css("display", "");            
        });
        $("#listView").click(function() {
            mainPhotoStrip.show().data("prevVisible", true);
            slider.parent().css("display", "");            
            mainPhotoGrid.parent().css("display", "none");            
        });

        mainPhotoStrip.kendoListView({
            dataSource: dataSource,
            template: template
        })
        .hide()        
        .data("kendoListView")        
        .bind("change", function () {
            mainPhotoStrip.hide().data("prevVisible", true);
            $("#bigPhoto").fadeOut("slow")
            .attr("src", $("img:first", this.selected()).attr("src").replace("_s", ""))
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
            style: "display:none"
        })
        .data("kendoSlider");

        $("#flatPhotoStrip").kendoListView({
            dataSource: dataSource,
            template: template
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
            mainPhotoGrid.parent().css("display", "none");
            $("#bigPhoto").fadeOut("slow")
                .attr("src", $("img:first", this.selectable.value()).attr("src").replace("_s", ""))
                .bind("load", function (e) {
                    $(e.target).hide().fadeIn("medium");
                });
        });
    });
})(jQuery);
