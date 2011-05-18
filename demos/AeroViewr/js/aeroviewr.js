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
        user = window.user;

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

        var infoTimeout = 0;

        $(".exifInfo").click(function (e) {
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

                var photo = result.photo;

                $(kendo.template('<div id="exifWindow"><dl class="floatWrap">\
                    <dt>Taken on</dt><dd><%= taken %></dd>\
                    <dt>Posted to Flickr</dt><dd><%= posted %></dd>\
                    <dt>Description</dt><dd><%= description %></dd>\
                    <dt>Author</dt><dd><%= author %></dd>\
                    <dt>Location</dt><dd><%= location %></dd>\
                    <dt>Tags</dt><dd><ul>\
                    <% $.each(tags, function(index, tag) { %> \
                       <li><%= tag %></li> \
                    <% }); %> \
                    </ul></dd>\
                </dl></div>'
                )({
                    posted: kendo.toString(new Date(parseInt(photo.dates.posted) * 1000), "MMMM dd, yyyy"),
                    taken: kendo.toString(new Date(parseInt(photo.dates.taken) * 1000), "MMMM dd, yyyy"),
                    description: photo.description._content,
                    author: photo.owner.realname,
                    tags: $.map(photo.tags.tag, function(tag) { return tag._content; } ),
                    location: photo.owner.location
                })).kendoWindow({
                    modal: true,
                    title: photo.title._content,
                    visible: false,
                    resizable: false,
                    width: 350,
                    close: function() {
                        var that = this;
                        setTimeout(function() {
                            that.destroy();
                        }, 400);
                    }
                }).data("kendoWindow").center().open();

                $("#exifWindow").closest(".t-window").bind("touchstart mousedown", function(e) {
                    e.stopPropagation();
                });
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
