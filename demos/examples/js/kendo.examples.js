(function() {
    var Application,
        pushState = "pushState" in history;

    Application = {
        load: function(href) {
            Application.fetch(href);

            history.pushState({ href: href }, null, href);
        },

        fetch: function(href) {
            $("li a").each(function() {
                var currentHref = $(this).attr("href");
                if (currentHref && currentHref.toLowerCase() === href) {
                    $.get(href, function(html) {
                        $("#example").empty().html(Application.body(html));

                        $("#code").empty();
                    });
                }
            });
        },

        body: function(html) {
            return /<div id="example">(([\u000a\u000d\u2028\u2029]|.)*)<\/div>/ig.exec(html)[1];
        },

        init: function() {
            if (pushState) {
                $("li a").click(function(e) {
                    e.preventDefault();

                    Application.load($(this).attr("href"));
                }).each(function() {
                    $(this).attr("href", this.href);
                });

                $(window).bind("popstate", function(e) {
                    var state = e.originalEvent.state;
                    if (state) {
                        Application.fetch(state.href.toLowerCase());
                    }
                });

                history.replaceState({ href: location.href }, null, location.href );
            }

            $("#viewCode").click(function(e) {
                e.preventDefault();

                $.get(location.href, function(html) {
                    $("#code").empty().text(html);

                    prettyPrint();
                })
            });
        }
    };

    $(Application.init);
})(jQuery);
