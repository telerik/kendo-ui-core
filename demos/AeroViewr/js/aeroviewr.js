if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) {
    for(var e,l="header nav section time".split(" ");e=l.pop();document.createElement(e));
}

var isInferiorBrowser = false;

if ((jQuery.browser.msie && parseInt(jQuery.browser.version) < 9) ||
    (jQuery.browser.mozilla && parseFloat(jQuery.browser.version) < 1.9) ||
    (jQuery.browser.opera && parseInt(jQuery.browser.version) < 10)) {
    isInferiorBrowser = true;
}

if (!isInferiorBrowser) {
    document.documentElement.className = "";
    $("#inferiorBrowserAlert").hide();
}

(function ($) {
    var flickr = window.flickr,
        visitor = window.visitor,
        data = window.data,
        user = window.user,
        fullscreen = false;

    $(document).ready(function () {
        var tagHotListDataSource = data.dataSource( {
            serverFiltering: true,
            pageSize: 10,
            dialect: {
                read: function(data) {
                    return flickr.getRelatedTagParams(data.filter[0].value);
                }
            },
            reader: {
                data: function(result) {
                    if(result && result.tags) {
                        return $.map(result.tags.tag, function(tag) {
                            return tag._content;
                        });
                    }
                    return [];
                }
            }
        });

        var infoTimeout = 0,
            infoLoading = false;

        $(".exifInfo").click(function (e) {
            e.preventDefault();

            if (infoLoading) {
                return;
            }

            infoLoading = true;

            $(document).one("mousedown touchstart", function() {
                visitor.hideExif();
            });

            infoTimeout = setTimeout(function() {
                $("<div class='loading'>Loading ...</div>").insertAfter($("#bigPhoto"));
            }, 100);

            flickr.getPhotoInfo($(this).attr("data-photoid"), function(result) {
                clearTimeout(infoTimeout);

                $(".loading").remove();

                if (result.stat == "fail") {
                    alert("flickr error: " + result.message);
                    return;
                }

                var photo = result.photo,
                    description = photo.description._content;

                if (description.length > 1027) {
                    description = description.substring(0, 1024) + "...";
                }

                $(kendo.template('<div id="exifWindow">\
                    <div class="exif-author">by <span><%= author %></span></div>\
                    <dl class="floatWrap">\
                        <dt>Posted to Flickr</dt><dd><%= posted %></dd>\
                        <dt>Description</dt><dd><%= description %></dd>\
                        <dt>Location</dt><dd><%= location %></dd>\
                        <dt>Tags</dt><dd>\
                            <% if (tags.length) { %>\
                            <ul class="taglist">\
                            <% $.each(tags, function(index, tag) { %> \
                               <li<%= (index == tags.length - 1 ? \' class="last"\' : "") %>><a href="#" data-tagid="<%= tag.id %>"><%= tag.text %></a></li> \
                            <% }); %> \
                            </ul>\
                            <% } else { %>\
                            (none)\
                            <% } %>\
                        </dd>\
                    </dl>\
                </div>'
                )({
                    posted: kendo.toString(new Date(parseInt(photo.dates.posted) * 1000), "MMMM dd, yyyy"),
                    description: description,
                    author: photo.owner.realname,
                    tags: $.map(photo.tags.tag.slice(0, 24), function(tag) {
                        return {
                            text: tag.raw,
                            id: tag._content
                        };
                    }),
                    location: photo.owner.location
                })
                ).kendoWindow({
                    modal: true,
                    title: photo.title._content,
                    visible: false,
                    resizable: false,
                    width: 375,
                    close: function() {
                        var that = this;
                        setTimeout(function() {
                            that.destroy();
                        }, 400);
                    }
                })
                .closest(".t-window")
                    .attr("id", "exifWindowWrapper")
                    .bind("touchstart mousedown", function(e) {
                        e.stopPropagation();
                    })
                    .delegate(".taglist a", "click", function(e) {
                        // close window
                        $(this).closest("#exifWindow").data("kendoWindow").close();

                        // search for tag
                        $("#searchBox").val($(this).data("tagid"));
                        $(".i-search").click();
                    })
                    .end()
                .data("kendoWindow").center().open();

                infoLoading = false;
            });

            e.stopPropagation();
            e.preventDefault();
        });

        $("#searchBox").kendoAutoComplete({
            dataSource: tagHotListDataSource
        });

        //log in section
        $("#signin").bind("click", function(e) {
            e.preventDefault();
            flickr.signIn();
        });

        $("#signout").bind("click", function(e) {
            e.preventDefault();
            flickr.signOut();
        });

        $("#bigPhoto").bind(kendo.support.touch ? "touchend" : "mousedown", function(e) {
            e.preventDefault();

            $('header').kendoStop().kendoAnimate('slideUp', 'fast', fullscreen);
            $('#footer').kendoStop().kendoAnimate('slideDown', 'fast', fullscreen);
            fullscreen = !fullscreen;
        });

        if (isInferiorBrowser) {
            return;
        }

        user.initUpload();

        flickr.authenticate(function(authenticated) {
           if (authenticated) {
                user.initUser();
            } else {
              $('#userInfo').hide();
              $('#signin').fadeIn();
              visitor.initVisitor();
            }
        });

        if (kendo.support.touch) {
            if (window.innerWidth < 380 || window.innerHeight < 380)
                $(document.body).css('zoom', .7);

            $(document).bind('touchmove', function (e) { // Disable viewport scrolling
                e.preventDefault();
            });

            $(document).bind('orientationchange', function (e) {
                window.scrollTo(0, 1);
            });

//            $('#photoWrap').bind('gestureend', function (e) {
//                if (e.gesture) {
//
//                } else
//                    if (e.gesture) {
//                }
//
//            });

            window.scrollTo(0, 1);
        }

    });
})(jQuery);
