import '@progress/kendo-ui/src/kendo.tabstrip.js';
import { TimerUtils } from '../../helpers/unit/timer-utils.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let isRaised;
let div;
let argsCheck = false;

//handlers
function Select(e) {
    if (argsCheck) {
        isRaised = !!e.contentElement;
        argsCheck = false;
    } else {
        isRaised = true;
    }
}

let tabstrip;
let template = '<div id="tabstrip">' +
    '    <ul>' +
    '        <li class="k-active">ASP.NET MVC</li>' +
    '        <li class="k-disabled">Silverlight</li>' +
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

let tabstripSetup = function(enableDOMDataSource = false) {
    div = $(template);
    div.appendTo(Mocha.fixture);

    let localCounter = 0;

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
        ],
        _enableDOMDataSource: enableDOMDataSource
    });
};

function getRootItem(index) {
    return div.find('.k-tabstrip-item').eq(index);
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
                this.responseText = "<p>This content was loaded via ajax ().</p>";
            }
        });

        $.mockjax({
            url: "ajax-view-two.html",
            response: function() {
                this.responseText = "<p>This content was loaded via ajax ().</p>";
            }
        });

        tabstripSetup();
    });

    afterEach(function() {

        tabstrip.destroy();
    });

    it('clicking should make clicked item active even before AJAX request', function() {
        let item = getRootItem(2);

        item.find('> .k-link').trigger('click');
        assert.isOk(item.hasClass('k-active'));
    });

    it('ajax content url should be attached to item', function() {
        let item = getRootItem(4);

        assert.equal(item.find('> .k-link').data('contentUrl'), 'ajax-view-one.html');
    });

    asyncTest("clicking should make all items except clicked unactive", function(done) {
        let item = getRootItem(0);

        item.find('> .k-link').trigger('click');

        setTimeout(function() {
            done(() => assert.equal(item.parent().find('.k-active').length, 1));
        });
    });

    asyncTest("ajax content with error fires error handler and writes the error message to the console", function(done) {
        if (jQuery.fn.jquery.substring(0, 1) === '3' || jQuery.fn.jquery.substring(0, 1) === '4') {
            done(() => assert.isOk(true));
            return;
        }

        let item = getRootItem(5);

        tabstrip.bind("error", function(e) {
            done(() => assert.isOk(true));
        });

        item.click();
    });
});

describe('tabstrip [DataSource DOM Rendering]', function() {
    beforeEach(function() {
        TimerUtils.initTimer();
        $.mockjaxSettings.responseTime = 0;

        $.mockjax.clear();

        $.mockjax({
            url: "ajax-view-one.html",
            response: function() {
                this.responseText = "<p>Content from ajax-view-one.html</p>";
            }
        });

        $.mockjax({
            url: "ajax-view-two.html",
            response: function() {
                this.responseText = "<p>Content from ajax-view-two.html</p>";
            }
        });
    });

    afterEach(function() {
        TimerUtils.destroyTimer();
        tabstrip.destroy();
    });

    it('contentUrls can be changed dynamically and loads new content', function() {
        tabstripSetup(true);

        let item = getRootItem(2);

        item.find('> .k-link').trigger('click');
        TimerUtils.advanceTimer();

        let contentElement = tabstrip.element.find(".k-tabstrip-content").eq(2);
        assert.equal(contentElement.html(), "<p>Content from ajax-view-one.html</p>");

        tabstrip.options.contentUrls[2] = "ajax-view-two.html";
        item.find('> .k-link').data('contentUrl', 'ajax-view-two.html');

        tabstrip.reload(item);
        TimerUtils.advanceTimer();

        assert.equal(contentElement.html(), "<p>Content from ajax-view-two.html</p>");
    });
});

describe('tabstrip ajax loading using options', function() {
    beforeEach(function() {
        TimerUtils.initTimer();
        $.mockjaxSettings.responseTime = 0;
    });

    afterEach(function() {
        TimerUtils.destroyTimer();
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

        let item = getRootItem(6);

        item.click();

        TimerUtils.advanceTimer();

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

        let item = getRootItem(6);

        item.click();
        TimerUtils.advanceTimer();

        tabstrip.reload(item);
        TimerUtils.advanceTimer();

        assert.isOk(!item.find('> .k-link').data('contentUrl'));
    });

    it('ajax content url should be supported when reloading tab', function() {
        let calls = 0;

        $.mockjax({
            url: "ajax-view-three.html",
            response: function() {
                assert.isOk(true);
            }
        });

        tabstripSetup();

        let item = getRootItem(3);

        item.click();
        TimerUtils.advanceTimer();

        tabstrip.reload(item);
        TimerUtils.advanceTimer();

        assert.isOk(item.find('> .k-link').data('contentUrl'));
    });

    it('ajax content url from function should supported', function() {
        let firstUrlCalls = 0;
        $.mockjax({
            url: "ajax-view-from-function1.html",
            response: function() {
                firstUrlCalls++;

                assert.isOk(true && firstUrlCalls < 2);

                let item = getRootItem(7);

                tabstrip.reload($(item));
                TimerUtils.advanceTimer();
            }
        });

        $.mockjax({
            url: "ajax-view-from-function2.html",
            response: function() {
                assert.isOk(true);
            }
        });

        tabstripSetup();

        let item = getRootItem(7);

        item.click();
        TimerUtils.advanceTimer();


        assert.isOk(!item.find('> .k-link').data('contentUrl'));
    });
});
