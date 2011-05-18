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

        $('.exifInfo .i-help').click(function (e) {
            flickr.getPhotoInfo($(this).attr("data-photoid"), function(result) {
                if (result.stat == "fail") {
                    alert("flickr error: " + result.message);
                    return;
                }

                var photo = result.photo;

                $(kendo.template(
                '<div><dl class="floatWrap">\
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
                    posted: kendo.toString(new Date(parseInt(photo.dates.posted) * 1000), "yyyy-MM-dd hh:mm:ss"),
                    taken: photo.dates.taken,
                    description: photo.description._content,
                    author: photo.owner.realname,
                    tags: $.map(photo.tags.tag, function(tag) { return tag._content; } ),
                    location: photo.owner.location
                })).kendoWindow().data("kendoWindow").open().center();
            });
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
