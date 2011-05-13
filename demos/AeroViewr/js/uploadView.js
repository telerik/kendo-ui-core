(function($, window) {
    var nonAuthContent = '<h1 class="uploadTitle">You must <a href="#">Sign In</a> to upload photos.</h1>',
        authContent = '<h1 class="uploadTitle"><span class="p-icon i-drag"></span> Drag &amp; drop photos to upload</h1>' +
                  '<em>or</em>' +
                  '<div class="t-widget t-upload"><div class="t-button t-button-icontext t-button-bare t-upload-button p-border-big">' +
                  '<span class="p-icon i-set t-add"></span> browse<input type="file" name="file" id="photosUpload" /></div></div>';

    function UploadView(element) {
        this.element = $(element);
    }
    UploadView.prototype = {
        show: function() {
            var that = this,
                element = that.element;

            that._overlay().empty()
                        .html(flickr.isAuthenticated() ? authContent : nonAuthContent)
                        .find("#photosUpload").kendoUpload({
                            async: {
                                saveUrl: "k"
                            },
                            localization: {
                                dropFilesHere: ""
                            },
                            showFileList: false
                        })
                        .end()
                        .show();
        },
        hide: function() {
            var that = this;
            that.element.hide();
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

