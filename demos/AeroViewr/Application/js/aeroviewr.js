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

    function itemBound(e){
        e.item
         .find("img")
         .hide()
         .bind({
             load: function(e){
                $(this).fadeIn(1000);
             },
            click: function(e){
                $("#bigPhoto").attr("src", $(this).attr('src').replace("_t", ""));
            }
        });
    }

    $(document).ready(function(){
         var mainPhotos = new window.listview({element: $("#mainPhotoStrip"), template: "<img src='http://farm<#=farm#>.static.flickr.com/<#=server#>/<#=id#>_<#=secret#>_t.jpg'>", onItemBound: itemBound});

        var dataSource = new kendo.data.DataSource({ 
                serverSorting: false,
                transport: {
                    read: {
                        url: service,
                        dataType: "jsonp",
                        jsonpCallback: "jsonFlickrApi",
                        data: function(){
                            var params = {
                                text: $("#searchBox").val(),
                                extras: "owner_name,tags",
                                method: "flickr.photos.search",
                                api_key: app.key,
                                auth_token: auth.token,
                                format: "json"
                            }
                            params["api_sig"] = getApiSig(app.secret, params);
                            return params;
                        }
                    },
                    reader: {
                        data: function(result) {
                            return result.photos.photo;
                        }
                    }
                }
            });

        function search(text, page) {
            var params = {
                nojsoncallback : 1,
                text: text,
                extras: "owner_name,tags",
                per_page: 30,
                page: page
            }
            var url = buildAuthMethod(service, "flickr.photos.search", params);
/*
            $.get(url, function(data){
                try {
                    var photos = eval('(' + data + ')').photos.photo;
                    mainPhotos.bind(photos);
                } catch (e) {
                    alert('Error! The requested URL did not return JSON.');
                    return;
                }
            });
            */
        }

        $('.i-search').click(function(e){
            e.preventDefault();
            var params = {
                nojsoncallback : 1,
                text: $("#searchBox").val(),
                extras: "owner_name,tags",
                per_page: 30,
                page: 1
            }
            dataSource.read();
           // search($("#searchBox").val(), 1);
        });

        dataSource.bind("kendo:change", function(){
            alert(1);
            mainPhotos(this.view());
        });
    });
})(jQuery);
