import '@progress/kendo-ui/src/kendo.menu.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

function onSelect() {
    isRaised = true;
}

function getRootItem(index) {
    return $('> .k-item', menu.element).eq(index);
}

let menu, isRaised,
    CLICK = "click";

describe("menu events", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '            <ul id="menu" style="position: absolute; visibility: hidden;">' +
            '                <li>ASP.NET MVC' +
            '                    <ul>' +
            '                        <li>Grid' +
            '                        </li>' +
            '                        <li>Menu' +
            '                            <ul>' +
            '                                <li>Grid' +
            '                                </li>' +
            '                                <li>Menu' +
            '                                </li>' +
            '                                <li>PanelBar</li>' +
            '                                <li>TabStrip</li>' +
            '                            </ul>' +
            '                        </li>' +
            '                        <li>PanelBar</li>' +
            '                        <li>TabStrip</li>' +
            '                    </ul>' +
            '                </li><li>Silverlight' +
            '                    <ul>' +
            '                        <li>GridView' +
            '                        </li>' +
            '                        <li>Scheduler' +
            '                        </li>' +
            '                        <li>Docking' +
            '                        </li>' +
            '                        <li class="k-item k-disabled">Chart' +
            '                        </li>' +
            '                        <li><a href="http://www.telerik.com/products/silverlight.aspx">... and 28 more!</a></li>' +
            '                    </ul>' +
            '                </li><li>ASP.NET AJAX' +
            '                    <ul>' +
            '                        <li>Grid</li>' +
            '                        <li>Editor' +
            '                        </li>' +
            '                        <li>Scheduler' +
            '                        </li>' +
            '                        <li><a href="http://www.telerik.com/products/aspnet-ajax.aspx">... and 28 more!</a></li>' +
            '                    </ul>' +
            '                </li><li><a href="#Menu-4">OpenAccess ORM</a>' +
            '                    <ul>' +
            '                        <li>' +
            '                            <div id="Menu-4">' +
            '                                <a href="http://www.telerik.com/purchase/individual/orm.aspx" id="buy">' +
            '                                    Telerik OpenAccess ORM' +
            '                                </a>' +
            '                                <a href="http://www.telerik.com/community/license-agreement.aspx?pId=639" id="express">' +
            '                                    Telerik OpenAccess ORM Express' +
            '                                </a>' +
            '                            </div>' +
            '                        </li>' +
            '                    </ul>' +
            '                </li>' +
            '                    <li>Reporting' +
            '                    </li>' +
            '                    <li>' +
            '                        Sitefinity ASP.NET CMS' +
            '                    </li>' +
            '                    <li>Other products' +
            '                    <ul>' +
            '                        <li>Web Testing Tools' +
            '                        </li>' +
            '                        <li>WinForms UI Controls' +
            '                        </li>' +
            '                        <li>WPF UI Controls' +
            '                        </li>' +
            '                    </ul>' +
            '                </li>' +
            '            </ul>'
        );
        menu = new kendo.ui.Menu("#menu", { animation: false, select: onSelect, hoverDelay: 0 });
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("close event can be canceled", function(done) {
        menu.bind("close", function(e) { e.preventDefault(); });

        menu.bind("activate", function() {
            menu.close(menu.element.children("li:eq(2)"));
            done(() => assert.equal(menu.element.find(">li:eq(2) ul").is(":visible"), true));
        });

        menu.open(menu.element.children("li:eq(2)"));
    });


    asyncTest("activate event is fired after open", function(done) {
        menu.unbind("open");
        let activated = false;

        menu.bind("activate", function() {
            activated = true;
        });

        menu.open(menu.element.children("li:eq(1)"));

        setTimeout(function() {
            done(() => assert.equal(activated, true));
        }, 10);
    });


    it("element select is triggered when menu element is clicked", function() {
        let item = getRootItem(0),
            triggerCount = 0;

        menu.bind("select", function() {
            triggerCount++;
        });

        item.trigger(CLICK);

        assert.equal(triggerCount, 1);
    });


    it('clicking disabled item should not raise onSelect event on parent item', function() {
        let item = getRootItem(1);

        isRaised = false;

        item.find('.k-item > .k-link').eq(3).trigger('click');

        assert.isOk(!isRaised);
    });

    asyncTest("open event can be canceled", function(done) {
        menu.bind("open", function(e) { e.preventDefault(); });
        menu.open(menu.element.children("li:first"));

        setTimeout(function() {
            done(() => assert.equal(menu.element.find(">li:first ul").is(":visible"), false));
        }, 10);
    });


    it("item select is triggered when items are loaded via dataSource", function() {
        let menuDiv = $("<div id='dataBoundMenu'></div>").appendTo(Mocha.fixture);
        let selectCount = 0;
        let raiseCount = function() {
            selectCount++;
        };
        $("#dataBoundMenu").kendoMenu({
            dataSource: [
                {
                    text: "Item 1",
                    select: raiseCount,
                    items: [
                        {
                            text: "Item 2",
                            select: raiseCount,
                            items: [
                                {
                                    text: "Item 3",
                                    select: raiseCount
                                }
                            ]
                        }
                    ]
                }
            ]
        });


        let dataBoundMenu = $("#dataBoundMenu").data("kendoMenu");

        dataBoundMenu.dataSource.view()[0].load();
        dataBoundMenu.dataSource.view()[0].items[0].load();

        let items = $('.k-item', dataBoundMenu.element);
        items.each(function() {
            $(this).children(".k-link").trigger(CLICK);
        });

        assert.equal(selectCount, 3);
        dataBoundMenu.destroy();
        menuDiv.remove();
    });

    it("item select is triggered when items are loaded via append", function() {
        let selectCount = 0;
        menu.append([
            {
                text: "New Item",
                select: function(e) {
                    selectCount++;
                }
            }
        ]);

        $('.k-item', menu.element).last().children(".k-link").trigger(CLICK);

        assert.equal(selectCount, 1);
    });

    it("item select is triggered when items are loaded via insertAfter", function() {
        let selectCount = 0;
        menu.insertAfter(
            [{
                text: "New Item",
                select: function(e) {
                    selectCount++;
                }
            }],
            "> li:last-child"
        );

        $('.k-item', menu.element).last().children(".k-link").trigger(CLICK);

        assert.equal(selectCount, 1);
    });

    it("item select is triggered when items are loaded via insertBefore", function() {
        let selectCount = 0;
        menu.insertBefore(
            [{
                text: "New Item",
                select: function(e) {
                    selectCount++;
                }
            }],
            "> li:first-child"
        );

        $('.k-item', menu.element).first().children(".k-link").trigger(CLICK);

        assert.equal(selectCount, 1);
    });

    it("item select is triggered when item content is clicked", function() {
        let selectCount = 0;
        menu.insertAfter(
            [{
                text: "<b>New Item</b>",
                encoded: false,
                select: function() {
                    selectCount++;
                }
            }],
            "> li:last-child"
        );

        $('.k-item', menu.element).last().find("b").trigger(CLICK);

        assert.equal(selectCount, 1);
    });

    it("dataBound event", function() {
        let menuDiv = $("<div id='dataBoundMenu'></div>").appendTo(Mocha.fixture);
        let selectCount = 0;
        let raiseCount = function() {
            selectCount++;
        };
        $("#dataBoundMenu").kendoMenu({
            dataSource: [
                {
                    text: "Item 1",
                    items: [
                        {
                            text: "Item 2",
                            items: [
                                {
                                    text: "Item 3",
                                }
                            ]
                        }
                    ]
                }
            ],
            dataBound: raiseCount
        });


        let dataBoundMenu = $("#dataBoundMenu").data("kendoMenu");

        dataBoundMenu.dataSource.view()[0].load();
        dataBoundMenu.dataSource.view()[0].items[0].load();

        assert.equal(selectCount, 3);
        dataBoundMenu.destroy();
        menuDiv.remove();
    });

});
