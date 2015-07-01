(function() {
    var ScrollView = kendo.mobile.ui.ScrollView,
        scrollview,
        dataSourceConfig,
        element;

    module("ScrollView virtualization ", {
        setup: function() {
            dataSourceConfig = {
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i ++) {
                            results.push({ foo: i });
                        }

                        setTimeout(function() {
                            options.success(results);
                        }, 0);
                    }
                },
                pageSize: 36,
                serverPaging: true,
                schema: {
                    total: function() { return 100000; }
                }
            };

            element = $("<div style='width: 400px;' />").appendTo("#qunit-fixture").wrap("<div style='width: 400px;' />");
        },

        teardown: function() {
            if (scrollview) {
                scrollview.destroy();
            }
        }
    });

    asyncTest("initializes pages correctly", 1, function() {
        var options = {
            dataSource: dataSourceConfig,
            template: "<div class='foo'>#: foo #</div>",
            emptyTemplate: "<div>empty</div>",
            change: function(e) {
                e.element.html("<span class='bar'></span>");
            }
        };

        scrollview = new ScrollView(element, options);

        setTimeout(function() {
            start();
            equal($(".bar").length, 1);
        }, 300);
    });
})();
