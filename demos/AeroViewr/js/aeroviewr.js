(function ($) {
    var flickr = window.flickr,
        visitor = window.visitor,
        user = window.user;

    $(document).ready(function () {
        var tagHotListDataSource = new kendo.data.DataSource({
            serverFiltering: true,
            pageSize: 10,
            transport: {
                read: {
                    url: flickr.service,
                    cache: true,
                    dataType: "json"
                },
                cache: "localstorage",
                dialect: {
                    read: function(data) {
                        return flickr.getRelatedTagParams(data.filter[0].value);
                    }
                }
            },
            reader: {
                data: function(result) {
                    return $.map(result.tags.tag, function(tag) {
                        return tag._content;
                    });
                }
            }
        });

        $('.exifInfo .i-help').click(function (e) {
            flickr.getPhotoInfo($(this).attr("data-photoid"), function(result) {
                var photo = result.photo;

                $(kendo.template(
                '<dl class="floatWrap">\
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
                </dl>'
                )({
                    posted: kendo.toString(new Date(parseInt(photo.dates.posted) * 1000), "yyyy-MM-dd hh:mm:ss"),
                    taken: photo.dates.taken,
                    description: photo.description._content,
                    author: photo.owner.realname,
                    tags: $.map(photo.tags.tag, function(tag) { return tag._content; } ),
                    location: photo.owner.location
                })).kendoPopup().data("kendoPopup").open();
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
            $(document).bind('touchmove', function (e) { // Disable viewport scrolling
                    e.preventDefault();
            });

            window.scrollTo(0, 1);
        }

    });
})(jQuery);
