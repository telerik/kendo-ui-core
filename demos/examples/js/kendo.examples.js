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
                if ($(this).attr("href").toLowerCase() === href) {
                    $.get(href, function(html) {
                        $("#example").empty().replaceWith(Application.body(html).filter("#example"));

                        $("#code").empty();
                    });
                }
            });
        },

        body: function(html) {
            return $(/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/ig.exec(html)[1]);
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

                history.replaceState({ href: location.href });
            }

            $("#viewcode").click(function(e) {
                e.preventDefault();

                $.get(location.href, function(html) {
                    $("#code").empty().text(html);

                    prettyPrint();
                })
            });
        }
    }

    $(Application.init);
})(jQuery);
