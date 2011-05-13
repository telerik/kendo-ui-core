(function($, window) {
   var app = {
        key: 'ea73824c4e27a137b7597fc3ffb3ba98',
        secret: '2e767957c686dd30'
    };
 
   window.flickr = {
        service: "http://api.flickr.com/services/rest/",
        authURL: "http://flickr.com/services/auth/",
        auth: {
            token: null //'72157626154487043-7dfd951a1ede12fa' //write auth
        },
        methods: {
            getToken : "flickr.auth.getToken",
            search: "flickr.photos.search",
            getSets: "flickr.photosets.getList",
            getMostPopular: "flickr.interestingness.getList"
        },

        getThumbnailURL: function(photo) {
            return 'http://farm' + photo.farm + '.' + 'static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
        },

        getApiSig: function(params) {
            var concatString = "",
                keys = [];

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            keys.sort();
            concatString += app.secret;
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                concatString += key + params[key];
            }
            return hex_md5(concatString);
        },

        getAuthMethodUrl: function(method, params) {
            params = params || {};
            params["method"] = method;
            params["api_key"] = app.key;
            params["auth_token"] = this.auth.token;
            params["format"] = "json";
            params["api_sig"] = this.getApiSig(params);

            return this.service + "?" + $.param(params);
        },

        mostPopularParams: function(data) {
            var params = {
                method: this.methods.getMostPopular,
                api_key: app.key,
                format: "json",
                nojsoncallback: 1
            }
            $.extend(params, data);
            params["api_sig"] = this.getApiSig(params);
            return params;
        },

        searchParams: function(data) {
            var params = {
                method: this.methods.search,
                api_key: app.key,
                format: "json",
                nojsoncallback: 1
            }

            if(this.auth.token) {
                params["auth_token"] = this.auth.token;
            }

            $.extend(params, data);
            params["api_sig"] = this.getApiSig(params);
            return params;
        },

        getSetsParams: function(data) {
            var params = {
                method: this.methods.getSets,
                user_id: flickr.auth.user.nsid,
                api_key: app.key,
                auth_token: this.auth.token,
                format: "json",
                nojsoncallback: 1
            }
            $.extend(params, data);
            params["api_sig"] = this.getApiSig(params);
            return params;
        },
        getNotInSetParams: function(data) {
            var params = {
                method: this.methods.getSets,
                user_id: flickr.auth.user.nsid,
                api_key: app.key,
                auth_token: this.auth.token,
                format: "json",
                nojsoncallback: 1
            }
            $.extend(params, data);
            params["api_sig"] = this.getApiSig(params);
            return params;
        },
        getFrob: function() {
            var search = document.location.search,
                key = "frob=",
                idx = search.indexOf(key),
                frob;

            if (idx != -1) {
                frob = search.slice(idx + key.length).split("&")[0];
            }
            return frob;
        },
        getToken: function(frob, callback) {
            var params = {
                api_key: app.key,
                frob: frob,
                format: "json",
                nojsoncallback: 1,
                method: this.methods.getToken
             }

            params["api_sig"] = this.getApiSig(params);
            $.get(this.service + "?" + $.param(params), null, callback, "json");
        },
        signIn: function() {
             var params = {
                api_key: app.key,
                perms: "write"
            }
            params["api_sig"] = this.getApiSig(params);

            window.location.href = this.authURL + "?" + $.param(params);
        },
        signOut: function() {
            this.auth.token = null;
            this.auth.user = null;
            this.auth.frob = null;
            document.location.href = document.location.href;
        },
        authenticate: function(callback) {
            var frob = this.getFrob();
            if(frob !== undefined && frob !== this.auth.frob) {
                this.auth.frob = frob;

                this.getToken(frob, $.proxy(function(data){
                    if(data.stat == "ok"){
                        var auth = this.auth;
                        auth.token = data.auth.token._content;
                        auth.user = data.auth.user;
                        callback(true);
                    } else {
                        this.signIn();
                    }
                }, this));
            } else {
                callback(false);
            }
        }
    }
})(jQuery, window);
