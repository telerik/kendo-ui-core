(function() {
    window.SplitterHelpers = {
        generateHtml: function(paneCount) {
            return "<div style='width: 207px;height:100px'>" +  new Array((paneCount + 1) || 3).join("<div/>") + "</div>";
        },

        create: function(options, paneCount, initCss) {
            var splitter = $(window.SplitterHelpers.generateHtml(paneCount || 2))
                    .css(initCss || {})
                    .appendTo(QUnit.fixture)
                    .kendoSplitter(options);

            return {
                dom: splitter,
                object: splitter.data("kendoSplitter")
            };
        },

        basicModule: {
            setup: function() {
                jQuery.fn.press = function(options) {
                    if (!options.type) {
                        options.type = "keydown";
                    }

                    if (!options.preventDefault) {
                        options.preventDefault = $.noop;
                    }

                    this.trigger(options);
                };
            },

            teardown: function() {
                kendo.destroy(QUnit.fixture);
            }
        }
    };
})();
