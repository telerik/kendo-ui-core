(function($, window) {
    var nonAuthContent = '<h1 class="uploadTitle">You must <a href="#">Sign In</a> to upload photos.</h1>',
        authContent = '<h1 class="uploadTitle"><span class="p-icon i-drag"></span> Drag &amp; drop photos to upload</h1>' +
                  '<em>or</em>' +
                  '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button p-border-big">' +
                  '<span class="p-icon i-set t-add"></span> browse<input type="file" name="photo" id="photosUpload" /></div></div>';

    function UploadView(element) {
        this.element = $(element);
        this.responses = [];
    }
    UploadView.prototype = {
        show: function() {
            var that = this,
                element = that.element;

            that._overlay().empty()
                        .html(flickr.isAuthenticated() ? authContent : nonAuthContent)
                        .find("#photosUpload").kendoUpload({
                                showFileList: true,
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
                                   var set = that.currentSet();
                                   //if (set) {
                                        var id = '72157626610392529';//set.data("set"),
                                            responses = that.responses;
                                        for (var i = 0, length = responses.length; i < length; i++) {
                                            if(responses[i].stat === "ok"){
                                                flickr.movePhotoToSet(id, responses[i].photoid);
                                            }
                                        }
                                   //}
                                }
                        })
                        .end()
                        .show();
        },
        hide: function() {
            var that = this;
            that.element.hide();
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
    window.UploadView = UploadView;
})(jQuery, window);

