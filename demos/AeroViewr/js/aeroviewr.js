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
    $("#noHTML5Alert").hide();
    if (jQuery.browser.opera) {
        document.documentElement.className += " isOpera";
    } else if (jQuery.browser.msie) {
        document.documentElement.className += " isIE";
    }
}

(function ($) {
    var flickr = window.flickr,
        visitor = window.visitor,
        data = window.data,
        user = window.user,
        fullscreen = false;

    animType = false;

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
                if (infoLoading) {
                    $(document).one("mousedown touchstart", arguments.callee);
                    return;
                }

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
                        <dt>Description</dt><dd><%= description %></dd>\
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
                        <dt>Location</dt><dd><%= location %></dd>\
                        <dt>Posted to Flickr</dt><dd><%= posted %></dd>\
                    </dl>\
                    <% if (url) { %>\
                    <div class="exif-actions"><a href="<%= url %>">See on flickr</a></div>\
                    <% } %>\
                </div>'
                )({
                    posted: kendo.toString(new Date(parseInt(photo.dates.posted) * 1000), "MMMM dd, yyyy"),
                    description: kendo.htmlEncode(description),
                    author: photo.owner.realname || photo.owner.username  || "Unknown",
                    tags: $.map(photo.tags.tag.slice(0, 24), function(tag) {
                        return {
                            text: kendo.htmlEncode(tag.raw),
                            id: kendo.htmlEncode(tag._content)
                        };
                    }),
                    url: photo.urls.url[0]._content,
                    location: photo.owner.location || "Unknown"
                })
                ).kendoWindow({
                    modal: true,
                    title: kendo.htmlEncode(photo.title._content) || "Untitled",
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
            $('#uploadphotos').hide();
            $('#footer > .thumb-list').css('marginRight', '15px');
            $('#photoWrap').css('overflow', 'hidden');
            $('#bigPhoto').kendoPincer();
            var zoomFactor = 1;

            if (window.innerWidth < 380 || window.innerHeight < 380) {
                $(document.body).css('zoom', .7);
                zoomFactor = 2;
            }

            $(document).bind('touchmove', function (e) { // Disable viewport scrolling
                e.preventDefault();
            });

            var startLocation = {};

            $.extend(kendo.fx, {
                slideRotateLeft: {
                    play: function(element, properties, options) {
                        kendo.fx.transition(element, $.extend({ translate: (-window.innerWidth * zoomFactor) + 'px' }, properties), options);
                    },
                    reverse: function(element, properties, options) {
                        element.css(kendo.support.transitions.css + 'transform', 'translate(' + (window.innerWidth * zoomFactor) + 'px, 0)');
                        element.css(kendo.support.transitions.css + 'transform');
                        kendo.fx.transition(element, $.extend({ translate: 0 }, properties), options);
                    }
                },
                slideRotateRight: {
                    play: function(element, properties, options) {
                        kendo.fx.transition(element, $.extend({ translate: (window.innerWidth * zoomFactor) + 'px' }, properties), options);
                    },
                    reverse: function(element, properties, options) {
                        element.css(kendo.support.transitions.css + 'transform', 'translate(-' + (window.innerWidth * zoomFactor) + 'px, 0)');
                        element.css(kendo.support.transitions.css + 'transform');
                        kendo.fx.transition(element, $.extend({ translate: 0 }, properties), options);
                    }
                }
            });

            $('#photoWrap, #main')
                .bind('touchstart', function (e) {
                    startLocation = kendo.touchLocation(e);
                })
                .bind('touchend', function (e) {
                    var location = kendo.touchLocation(e),
                        dX = location.x - startLocation.x,
                        dY = location.y - startLocation.y;

                    if (Math.abs(dX) < 10 && Math.abs(dY) < 10) {
                        if ($(e.target).is('#photoWrap, #photoWrap *, #main')) {
                            e.preventDefault();

                            $('header').kendoStop().kendoAnimate('slideUp', 'fast', fullscreen);
                            $('#footer').kendoStop().kendoAnimate('slideDown', 'fast', fullscreen);
                            fullscreen = !fullscreen;

                            return;
                        }
                    }

                    var pincer = $('#bigPhoto').data('kendoPincer');
                    if (pincer._gesture) return;
                    if (Math.abs(dX) > Math.abs(dY)) {
                        (dX > 40) && $(e.target).trigger('swipeRight');
                        (dX < -40) && $(e.target).trigger('swipeLeft');
                    } else {
                        (dY > 40) && $(e.target).trigger('swipeDown');
                        (dY < -40) && $(e.target).trigger('swipeUp');
                    }
                })
                .bind('swipeLeft', getSlideHandler("next", "slideRotateLeft"))
                .bind('swipeRight', getSlideHandler("prev", "slideRotateRight"));
        } else {
            $('#photoWrap, #main')
                .bind("mousedown", function(e) {
                    if ($(e.target).is('#photoWrap, #photoWrap *, #main')) {
                        e.preventDefault();

                        $('header').kendoStop().kendoAnimate('slideUp', 'fast', fullscreen);
                        $('#footer').kendoStop().kendoAnimate('slideDown', 'fast', fullscreen);
                        fullscreen = !fullscreen;
                   }
                });
        }

        function getSlideHandler(direction, animationType) {
            return function(e) {
                var listView = $("#footer .thumbs:visible"),
                    selectable, upcomingImage = [];

                if (listView.length) {
                    selectable = listView.data("kendoListView").selectable;
                    upcomingImage = selectable.value()[direction]();
                }

                if (upcomingImage.length) {
                    selectable.clear();
                    selectable.value(upcomingImage);
                    animType = animationType;
                    $("#photoWrap").kendoStop(false, true).kendoAnimate(animationType, 400);
                }
            }
        }
    });
})(jQuery);
