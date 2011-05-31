(function() {
    var scripts = document.getElementsByTagName("script"),
        src,
        Application,
        position,
        idx,
        base = "",
        pushState = "pushState" in history;
        length;

    for (idx = 0, length = scripts.length; idx < length; idx++) {
        src = scripts[idx].getAttribute("src");

        if (!src) {
            continue;
        }

        position = src.indexOf("kendo.examples");
        if (position >= 0) {
            base = src.substring(0, position);
        }
    }

    Application = {
        load: function(href) {
            Application.fetch(href);

            if (pushState) {
                history.pushState({ href: href }, null, href);
            } else {
                location.hash = href;
            }
        },

        fetch: function(href) {
            $("li a").each(function() {
                if ($(this).attr("href").toLowerCase() === href) {
                    $.get(href, function(html) {
                        var example = $("#example");

                        if (!example[0]) {
                            example = $('<div id="example" />').appendTo(document.body);
                        }

                        example.empty().html(Application.body(html));
                    });
                }
            });
        },

        body: function(html) {
            html = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/ig.exec(html)[1];

            return html.replace(/href="([^"]*)"/g, 'href="' + base + '$1"');
        },

        init: function() {
            var exampleUrl = location.hash.replace("#", "").toLowerCase();

            $("li a").click(function(e) {
                e.preventDefault();

                Application.load($(this).attr("href"));
            }).each(function() {
                if (pushState) {
                    $(this).attr("href", this.href);
                } else {
                    if ($(this).attr("href").toLowerCase() === exampleUrl) {
                        Application.load(exampleUrl);
                    }
                }
            });
        }
    }

    if (base) {
        $.get("../index.html", function(html) {
            if (pushState) {
                history.replaceState({ href: location.href });
            }

            html = Application.body(html);

            $(document.body).prepend(html);

            Application.init();
        });
    }

    $(function() {
            $(window).bind("popstate", function(e) {
                var state = e.originalEvent.state;
                if (state) {
                    Application.fetch(state.href.toLowerCase());
                }
            }).bind("hashchange", function() {
                var url = location.hash.replace("#", "").toLowerCase();
                if (url) {
                    Application.fetch(url);
                }
            });

        Application.init();
    });

    window.Application = Application;
})(jQuery);
