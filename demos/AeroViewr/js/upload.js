(function($, window) {
    var nonAuthContent = '<h1 class="uploadTitle">You must <a href="#">Sign In</a> to upload photos.</h1>',
        authContent = '<h1 class="uploadTitle"><span class="p-icon i-drag"></span> Drag &amp; drop photos to upload</h1>' +
                  '<em>or</em>' +
                  '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button p-border-big">' +
                  '<span class="p-icon i-set t-add"></span> browse<input type="file" name="photo" id="photosUpload" /></div></div>';

    function Upload(element) {
        this.element = $(element);
        this.responses = [];
    }
    Upload.prototype = {
        show: function() {
            var that = this,
                element = that.element;

            that._overlay().empty()
                        .html(flickr.isAuthenticated() ? authContent : nonAuthContent)
                        .find("#photosUpload").kendoUpload({
                                showFileList: false,
                                multiple: true,
                                async: {
                                    saveUrl: 'Home/Save',
                                    autoUpload: true
                                },
                                upload: function (e) {
                                    e.data = {
                                        api_key: flickr.app.key,
                                        auth_token: flickr.auth.token
                                    };

                                    e.data["api_sig"] = flickr.getApiSig(flickr.app.secret, e.data);
                                },
                                success: function (e) {
                                   that.responses = that.responses.concat(e.response);
                                },
                                complete: function (e) {
                                    that._movePhotosToSet();
                                }
                        })
                        .end()
                        .fadeIn();
        },
        _movePhotosToSet: function() {
            var that = this,
                id = that.currentSet(),
                idx,
                responses = that.responses,
                len;

            if (id) {
                for (idx = 0, len = responses.length; idx < len; idx++) {
                    if(responses[idx].stat === "ok"){
                        flickr.movePhotoToSet(id, responses[idx].photoid);
                    }
                }
            }
            that.responses = [];
            that.hide();
        },
        hide: function() {
            window.user.refreshSets();
            this._overlay().fadeOut();
        },
        currentSet: function(val){
            if(val !== undefined) {
                this._currentSet = val;
            }
            return this._currentSet;
        },
        _overlay: function() {
            var that = this,
                overlay,
                element = that.element;

            overlay = element.parent().find(".t-overlay");
            return overlay.length ? overlay : $('<div class="t-overlay"/>').appendTo(element.parent());
        }
    };
    window.Upload = Upload;
})(jQuery, window);

