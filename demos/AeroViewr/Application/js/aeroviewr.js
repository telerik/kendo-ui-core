(function($){
    var app = {
        key: 'ea73824c4e27a137b7597fc3ffb3ba98',
        secret: '2e767957c686dd30',
        frob: "72157626154487045-2db02b0fc7fbf6de-60630644"
    };

    var auth = {
        token:'72157626154487043-7dfd951a1ede12fa' //write auth
    };

    var service = "http://api.flickr.com/services/rest/";

    function getThumbnailURL(photo){
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

    function getApiSig(secret, params){
        var concatString = "",
            keys = [];

        params["callback"] = "jsonFlickrApi";

        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            keys.push(key);
          }
        }

        keys.sort ();
        concatString += secret
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          concatString += key + params[key];
        }
        return hex_md5(concatString);
    }

    $(document).ready(function(){
        var template = "<img src='http://farm<#=farm#>.static.flickr.com/<#=server#>/<#=id#>_<#=secret#>_s.jpg'>";
        var mainPhotos = new window.listview({element: $("#mainPhotoStrip"), template: template, onItemBound: itemBound});
        var flatPhotoStrip = new window.listview({element: $("#flatPhotoStrip"), template: template, onItemBound: itemBound});

        var dataSource = new kendo.data.DataSource({
                page: 1,
                pageSize: 20,
                transport: {
                    read: {
                        url: service,
                        cache: true,
                        dataType: "jsonp",
                        jsonpCallback: "jsonFlickrApi"
                    },
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
                           // if (data.page && data.pageSize) {
                           //     params.page = data.page;
                           //     params.per_page = data.pageSize;
                           // }
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
                        return result.photos.total < 500 ? result.photos.total : 500;
                    }
                }
            });

        $('.i-search').click(function(e){            
           dataSource.read();
        });

        $(".paging").kendoPager({ dataSource: dataSource});

        dataSource.bind("kendo:change", function(){
            mainPhotos.bind(this.view());
            if(!mainPhotos.element.is(":visible")){
                flatPhotoStrip.bind(this.view());
            }
        });

        function itemBound(e){
           var li = e.item;
           li.css("opacity", 0)
             .find("img")
             .bind({
                 load: function(e){
                    li.css("overflow", "hidden").animate({opacity: 1}, 1000);
                    var image = $(e.target);
                    image
                     .css("display", "block")
                     .css("marginLeft", ~~(image.width()/2))
                     .animate({marginLeft: 0}, 500);
                 },
                click: function(e){
                    var image = $(this);
                    var liItems = $("#mainPhotoStrip").find("li");
                    var length = liItems.length;

                    //will try to animate one image by one in order to achieve the effect of dropping images.

                    //liItems.eq(length)
                    //mainStrip
                    //.find("li")
                    //.each(function(i, element){
                    //    element = $(element);
                    //    element.animate({opacity: 0}, 1000)
                    //    var image = element.find("img");
                    //    image
                    //        .css("display", "block")
                    //        .css("marginTop", ~~(image.height()/2))
                    //        .animate({marginTop: 0}, 500);
                    //})
                    $("#mainPhotoStrip").hide();
                    
                    //incorrectly bind flat strip on every click
                    flatPhotoStrip.bind(dataSource.view());
                    $("#bigPhoto").fadeOut("slow")
                                .attr("src", image.attr('src').replace("_s", ""))
                                .bind({
                                    load: function(e){
                                        $(e.target).hide().fadeIn("slow");
                                    }
                                });
                }
            });
        }
    });
})(jQuery);
