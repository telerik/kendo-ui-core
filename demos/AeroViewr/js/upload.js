(function($, window) {
    var nonAuthContent = '<h1 class="uploadTitle">You must <a href="#" id="uploadSignIn">sign in</a> to upload photos.</h1>',
        authContent = '<div id="uploadWrapInner"><h1 class="uploadTitle"><span class="p-icon i-drag"></span> Drag &amp; drop photos to upload</h1>' +
                    '<em>or</em>' +
                    '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button p-border-big">' +
                    '<span class="p-icon i-set t-add"></span> browse<input type="file" name="photo" id="photosUpload" /></div></div>' +
                    '</div>' +
                    '<div id="msgContainer" style="display:none"><h1 class="uploadTitle"></h1></div>',
        flickr = window.flickr,
        contains = $.contains;

    function Upload(element) {
        this.element = $(element);
        this.responses = [];
        this.exifVisible = false;
    }
    Upload.prototype = {
        show: function() {
            var that = this,
                element = that.element,
                exifButton = $("#exifButton"),
                isAuth = flickr.isAuthenticated();

            $(document).one("mousedown touchstart", function(e) {
                var target = e.target;
                if(!contains($("#uploadphotos")[0], target) && !contains(element[0], target)) {
                    that.hide();
                }
            });

            this.exifVisible = exifButton.is(":visible");
            exifButton.fadeOut();

            element.empty()
                    .html(isAuth ? authContent : nonAuthContent)
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
                                e.data["secret"] = flickr.app.secret;

                                that._showMsg("Uploading photos...");
                                $(document).unbind("mousedown touchstart", handler);
                                $("#viewslideshow").addClass("i-state-disabled");
                            },
                            success: function (e) {
                               that.responses = that.responses.concat(e.response);
                            },
                            complete: function (e) {
                                that._movePhotosToSet();
                            }
                    })
                    .end()
                    .delegate("#uploadSignIn","click", function(e) {
                        e.preventDefault();
                        flickr.signIn();
                    })
                    .fadeIn();

            if (isAuth && !$("#photosUpload").data("kendoUpload")._supportsDrop()) {
                element.find(".uploadTitle")
                       .html("Drag &amp; Drop is supported only in Chrome, Firefox 4.0 +, Safari (Mac OS only)")
                       .next()
                       .html('click the "Browse" button to upload photos');
            }

            that._overlay().fadeIn();
        },
        _showMsg: function(msg){
            var element = this.element;
            element.find("#uploadWrapInner").hide().end()
                    .find("#msgContainer > .uploadTitle")
                    .empty().html(msg)
                    .parent()
                    .show();
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
            that.hide();
            window.user.refreshSets(!that.exifVisible);
            that.responses = [];
        },
        hide: function() {
            var that = this;
            that._overlay().fadeOut();
            that.element.fadeOut();
            if(that.exifVisible) {
                $("#exifButton").fadeIn();
            }
            $("#viewslideshow").removeClass("i-state-disabled");
        },
        currentSet: function(val){
            if(val !== undefined) {
                this._currentSet = val;
            }
            return this._currentSet;
        },
        _overlay: function() {
            return $("#overlay");
        }
    };
    window.Upload = Upload;
})(jQuery, window);

