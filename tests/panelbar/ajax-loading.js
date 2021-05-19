(function() {
    var panelbar;
    var ul;

    describe("panelbar ajax loading", function() {
        beforeEach(function() {

            ul = $('<ul class="k-widget k-panelbar k-reset" id="panelbar" style="width: 300px; float: left; visibility: hidden; position: absolute;">' +
                '    <li><a>Pure ASP.NET MVC components</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Completely Open Source</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Exceptional Performance</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li><a>Based on jQuery</a>' +
                '       <div></div>' +
                '   </li>' +
                '   <li>Wide Cross-browser support' +
                '       <div></div>' +
                '   </li>' +
                '   <li>Wide Cross-browser support' +
                '       <div></div>' +
                '   </li>' +
                '</ul>');
            ul.appendTo(Mocha.fixture);

            $.mockjaxSettings.responseTime = 0;

            $.mockjax({
                url: "error.html",
                response: function() {
                    this.responseText = 'foo<script type="text/javascript">throw new Error("Exception required to fire the error event")<' + '/script>';
                }
            });

            $.mockjax({
                url: "ajax-view-one.html",
                response: function() {
                    this.responseText = "<p>This content was loaded via ajax ().</p>"
                }
            });

            $.mockjax({
                url: "ajax-view-two.html",
                response: function() {
                    this.responseText = "<p>This content was loaded via ajax ().</p>"
                }
            });

            panelbar = new kendo.ui.PanelBar(ul, {
                animation: false,
                contentUrls: [
                    'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'ajax-view-two.html', 'ajax-view-one.html', 'error.html'
                ]
            });
        });
        afterEach(function() {

            panelbar.destroy();
        });

        function getRootItem(index) {
            return ul.children().eq(index).children(".k-link");
        }

        it("PanelBar renders anchor instead of span if contentUrl", function() {

            var children = ul.find("li:last").children();

            assert.equal(children.filter("a").length, 1);
            assert.equal(children.filter("span").length, 0)
        });

        it("clicking collapsed content items should expand them", function(done) {
            var item = getRootItem(0);

            panelbar.bind("contentLoad", function() {
                assert.equal($(arguments[0].contentElement).css("display"), "block");
                panelbar.unbind("contentLoad");
                done();
            });

            item.trigger("click");
        });

        it("clicking expanded content items should collapse them", function() {
            var item = getRootItem(0);

            item.trigger("click");

            assert.equal(item.parent().find(".k-content").css("display"), "none");
        });

        it("clicking collapsed content items should toggle arrow", function(done) {
            var item = getRootItem(1);

            panelbar.bind("contentLoad", function() {
                assert.isOk($(arguments[0].item).find(".k-icon").hasClass("k-i-arrow-60-up"));
                panelbar.unbind("contentLoad");
                done();
            });

            item.trigger("click");
        });

        it("clicking expanded content items should toggle arrow", function() {
            var item = getRootItem(1);

            item.trigger("click");

            assert.isOk(item.find(".k-icon").hasClass("k-i-arrow-60-down"));
        });

        it("clicking should make item active", function(done) {
            var item = getRootItem(2);

            panelbar.bind("contentLoad", function() {
                assert.isOk(item.parent().hasClass("k-state-active"));
                panelbar.unbind("contentLoad");
                done();
            });

            item.click();
        });

        it("initially expanded items fetch their AJAX content", function(done) {
            kendo.destroy(Mocha.fixture);

            Mocha.fixture.html("")
                .append(
                    '<ul id="panelbar">' +
                    '    <li><a>Pure ASP.NET MVC components</a>' +
                    '       <div></div>' +
                    '   </li>' +
                    '   <li class="k-state-active"><a>Completely Open Source</a>' +
                    '       <div></div>' +
                    '   </li>' +
                    '</ul>'
                );

            ul = $("#panelbar");

            panelbar = new kendo.ui.PanelBar(ul, {
                animation: false,
                contentUrls: [
                    'ajax-view-one.html', 'ajax-view-two.html'
                ]
            });

            var item = getRootItem(1);

            panelbar.bind("contentLoad", function() {
                assert.equal(item.parent().find(".k-content").css("display"), "block");
                panelbar.unbind("contentLoad");
                done();
            });
        });

        it("ajax content with error fires error handler and writes the error message to the console", function(done) {
            if (jQuery.fn.jquery.substring(0, 1) === '3') {
                assert.isOk(true);
                done();
                return;
            }
            var item = getRootItem(5);

            panelbar.bind("error", function(e) {
                assert.isOk(true);
                done();
            });

            item.click();
        });
    });
}());
