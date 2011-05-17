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

        $('.i-help').click(function (e) {
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
    });
})(jQuery);
