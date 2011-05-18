(function($, window) {
      window.flickr = {
        service: "http://api.flickr.com/services/rest/",
        authURL: "http://flickr.com/services/auth/",
        auth: {},
        app: {
            key: '82cfddc3c01eeac6c1e406df5f79d26c',
            secret: '7a28f316522d2722'
        },
        methods: {
            getToken : "flickr.auth.getToken",
            search: "flickr.photos.search",
            getSets: "flickr.photosets.getList",
            getNotInSet: "flickr.photos.getNotInSet",
            getMostPopular: "flickr.interestingness.getList",
            getRelatedTags: "flickr.tags.getRelated",
            getSetPhotos: "flickr.photosets.getPhotos",
            getPhotoInfo : "flickr.photos.getInfo",
            movePhotoToSet: "flickr.photosets.addPhoto"
        },

        getThumbnailURL: function(photo) {
            return 'http://farm' + photo.farm + '.' + 'static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
        },

        isAuthenticated: function() {
            return !!this.auth.token
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
            concatString += this.app.secret;
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                concatString += key + params[key];
            }
            return hex_md5(concatString);
        },

        getAuthMethodUrl: function(method, param) {
            param = $.extend({
                auth_token: this.auth.token
            }, param);

            var params = this.params(method, param);

            return this.service + "?" + $.param($.extend(params, param));
        },

        mostPopularParams: function(data) {
            return this.params(this.methods.getMostPopular, data);
        },

        searchParams: function(data) {
            var params = $.extend({}, data);

            if (this.auth.token) {
                params["auth_token"] = this.auth.token;
            }

            return this.params(this.methods.search, params);
        },

        getSetsParams: function(data) {
            var params = $.extend({
                user_id: this.auth.nsid,
                auth_token: this.auth.token
            }, data);

            return this.params(this.methods.getSets, params);
        },

        getNotInSetParams: function(data) {
            var params = $.extend({
                auth_token: this.auth.token
            }, data);

            return this.params(this.methods.getNotInSet, params);
        },

        getInSetParams: function(data) {
            var params = $.extend({
                auth_token: this.auth.token
            }, data);

            return this.params(this.methods.getSetPhotos, params);
        },

        params: function(method, params) {
            params = $.extend({}, params, {
                method: method,
                api_key: this.app.key,
                format: "json"
            });

            if ($.support.cors) {
                params.nojsoncallback = 1;
            } else {
                params.timestamp = + new Date();
            }

            params["api_sig"] = this.getApiSig(params);
            return params;
        },

        getRelatedTagParams: function(text) {
            return this.params(this.methods.getRelatedTags, { tag: text });
        },

        getPhotoInfo: function(id, callback) {
            var params = this.params(this.methods.getPhotoInfo, {
                photo_id: id
            });

            $.ajax( {
                url: this.service + "?" + $.param(params),
                dataType: $.support.cors ? "json" : "jsonp",
                success: callback,
                jsonp: false,
                cache: true,
                jsonpCallback: "jsonFlickrApi"
            });
        },

        movePhotoToSet: function(id, photo, callback) {
            var url = this.getAuthMethodUrl(this.methods.movePhotoToSet, {photoset_id: id, photo_id: photo});
            $.post(url, null, callback);
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
            var params = this.params(this.methods.getToken, {
                frob: frob
            });

            $.ajax({
                url: this.service + "?" + $.param(params),
                dataType: $.support.cors ? "json" : "jsonp",
                success: callback,
                jsonp: false,
                cache: true,
                jsonpCallback: "jsonFlickrApi"
            });
        },

        signIn: function() {
            var params = {
                api_key: this.app.key,
                perms: "write"
            }

            params["api_sig"] = this.getApiSig(params);

            window.location.href = this.authURL + "?" + $.param(params);
        },

        signOut: function() {
            var NULL = null,
                auth = this.auth;

            window.slideshow.stop();
            auth.token = NULL;
            auth.nsid = NULL;
            auth.username = NULL;
            auth.fullname = NULL;

            sessionStorage.clear();
            document.location.reload();
        },

        authenticate: function(callback) {
            var session = sessionStorage;
            if(session.token) {
                var auth = this.auth;
                auth.token = session.token;
                auth.nsid = session.nsid;
                auth.username = session.username;
                auth.fullname = session.fullname;
            }

            if(this.isAuthenticated()) {
                callback(true);
                return;
            }

            var frob = this.getFrob();
            if(frob !== undefined && frob !== this.auth.frob) {
                this.auth.frob = frob;
                this.getToken(frob, $.proxy(function(data){
                    if(data.stat == "ok"){
                        var auth = this.auth,
                            session = sessionStorage,
                            remoteAuth = data.auth,
                            user = remoteAuth.user;

                        auth.token = remoteAuth.token._content;
                        auth.nsid = user.nsid;
                        auth.username = user.username;
                        auth.fullname = user.fullname;

                        session.setItem("token", auth.token);
                        session.setItem("nsid", auth.nsid);
                        session.setItem("username", auth.username);
                        session.setItem("fullname", auth.fullname);

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
