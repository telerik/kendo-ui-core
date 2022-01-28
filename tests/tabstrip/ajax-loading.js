(function() {
    var isRaised;
    var div;
    var argsCheck = false;

    //handlers
    function Select(e) {
        if (argsCheck) {
            isRaised = !!e.contentElement;
            argsCheck = false;
        } else
            isRaised = true;
    }

    var tabstrip;
    var template = '<div id="tabstrip">' +
        '    <ul>' +
        '        <li class="k-state-active">ASP.NET MVC</li>' +
        '        <li class="k-state-disabled">Silverlight</li>' +
        '        <li>ASP.NET AJAX</li>' +
        '        <li>OpenAccess ORM</li>' +
        '        <li>Reporting</li>' +
        '        <li>Sitefinity ASP.NET CMS</li>' +
        '        <li>Loading using url from options</li>' +
        '        <li>Loading using url from function</li>' +
        '    </ul>' +
        '    <div>' +
        '        <ul>' +
        '            <li>Pure ASP.NET MVC components</li>' +
        '            <li>Completely Open Source</li>' +
        '            <li>Exceptional Performance</li>' +
        '            <li>Based on jQuery</li>' +
        '            <li>Search Engine Optimized</li>' +
        '            <li>Cross-browser support</li>' +
        '        </ul>' +
        '    </div>' +
        '    <div></div>' +
        '    <div></div>' +
        '    <div></div>' +
        '    <div></div>' +
        '    <div></div>' +
        '    <div></div>' +
        '    <div></div>' +
        '</div>';

    var tabstripSetup = function() {
        div = $(template);
        div.appendTo(Mocha.fixture);

        var localCounter = 0;

        tabstrip = new kendo.ui.TabStrip(div, {
            animation: false,
            select: Select,
            contentUrls: [
                'ajax-view-one.html',
                'ajax-view-two.html',
                'ajax-view-one.html',
                'ajax-view-three.html',
                'ajax-view-one.html',
                'error.html',
                {
                    url: 'ajax-view-from-options.html'
                },
                {
                    url: function() {
                        localCounter++;
                        return 'ajax-view-from-function' + localCounter + '.html';
                    }
                }
            ]
        });
    };

    function getRootItem(index) {
        return div.find('.k-item').eq(index);
    }

    describe('tabstrip ajax loading', function() {
        beforeEach(function() {


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

            tabstripSetup();
        });

        afterEach(function() {

            tabstrip.destroy();
        });

        it('clicking should make clicked item active even before AJAX request', function() {
            var item = getRootItem(2);

            item.find('> .k-link').trigger('click');
            assert.isOk(item.hasClass('k-state-active'));
        });

        it('ajax content url should be attached to item', function() {
            var item = getRootItem(4);

            assert.equal(item.find('> .k-link').data('contentUrl'), 'ajax-view-one.html');
        });

        it('clicking should make all items except clicked unactive', function(done) {
            var item = getRootItem(0);

            item.find('> .k-link').trigger('click');

            setTimeout(function() {
                assert.equal(item.parent().find('.k-state-active').length, 1);
                done();
            });
        });

        it('loading ajax content should trigger adding the loading element to the tab', function(done) {
            var item = getRootItem(3);

            tabstrip.bind("select", function() {
                setTimeout(function() {
                    assert.isOk(item.find('.k-loading').width() - item.width() <= 1);
                    done();
                });
            });

            item.click();
        });

        it("ajax content with error fires error handler and writes the error message to the console", function(done) {
            if (jQuery.fn.jquery.substring(0, 1) === '3') {
                assert.isOk(true);
                done();
                return;
            }

            var item = getRootItem(5);

            tabstrip.bind("error", function(e) {
                assert.isOk(true);
                done();
            });

            item.click();
        });
    });

    describe('tabstrip ajax loading using options', function() {
        beforeEach(function() {

            jasmine.clock().install();
            $.mockjaxSettings.responseTime = 0;
        });

        afterEach(function() {

            jasmine.clock().uninstall();
            tabstrip.destroy();
        });

        it('ajax content url from options should be supported', function() {
            $.mockjax({
                url: "ajax-view-from-options.html",
                response: function() {
                    assert.isOk(true);
                }
            });

            tabstripSetup();

            var item = getRootItem(6);

            item.click();

            jasmine.clock().tick();

            assert.isOk(!item.find('> .k-link').data('contentUrl'));
        });

        it('ajax content url from options should be supported when reloading tab', function() {
            $.mockjax({
                url: "ajax-view-from-options.html",
                response: function() {
                    assert.isOk(true);
                }
            });

            tabstripSetup();

            var item = getRootItem(6);

            item.click();
            jasmine.clock().tick();

            tabstrip.reload(item);
            jasmine.clock().tick();

            assert.isOk(!item.find('> .k-link').data('contentUrl'));
        });

        it('ajax content url should be supported when reloading tab', function() {
            var calls = 0;

            $.mockjax({
                url: "ajax-view-three.html",
                response: function() {
                    assert.isOk(true);
                }
            });

            tabstripSetup();

            var item = getRootItem(3);

            item.click();
            jasmine.clock().tick();

            tabstrip.reload(item);
            jasmine.clock().tick();

            assert.isOk(item.find('> .k-link').data('contentUrl'));
        });

        it('ajax content url from function should supported', function() {
            var firstUrlCalls = 0;
            $.mockjax({
                url: "ajax-view-from-function1.html",
                response: function() {
                    firstUrlCalls++;

                    assert.isOk(true && firstUrlCalls < 2);

                    var item = getRootItem(7);

                    tabstrip.reload($(item));
                    jasmine.clock().tick();
                }
            });

            $.mockjax({
                url: "ajax-view-from-function2.html",
                response: function() {
                    assert.isOk(true);
                }
            });

            tabstripSetup();

            var item = getRootItem(7);

            item.click();
            jasmine.clock().tick();


            assert.isOk(!item.find('> .k-link').data('contentUrl'));
        });
    });
}());
