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
                    Application.fetchExample(href);
                    $('#viewDescription').trigger('click');

                    Application.fetchDescription(href);
                }
            });
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                $("#example").empty().html(Application.body(html));
            });
        },

        fetchCode: function(callback) {
            $.get(location.href, function(html) {
                var code = html;
                code = code.replace(new RegExp('\\s*<!-- tools -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- tools -->', 'ig'), ''); // Remove tools first to strip description
                code = code.replace(new RegExp('\\s*<!-- \\w+ -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- \\w+ -->', 'ig'), '');

                $("#code").empty().text(code);

                prettyPrint();

                if (callback)
                    callback();
            })
        },

        fetchDescription: function(href) {
            $.get(href, function(html) {
                $(".description").empty().text(Application.description(html).trim());
            })
        },

        description: function(html) {
            return /<div class="description">(([\u000a\u000d\u2028\u2029]|.)*?)<\/div>\s*<!-- description -->/ig.exec(html)[1];
        },

        body: function(html) {
            return /<div id="example">(([\u000a\u000d\u2028\u2029]|.)*?)<\/div>\s*<!-- tools -->/ig.exec(html)[1];
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

                Application.fetchDescription(location.href);
            }

            $("#viewCode").click(function(e) {
                e.preventDefault();

                Application.fetchCode();
            });
        }
    };

    $(Application.init);
})(jQuery);
