(function() {
    function getRootItem(index) {
        return $('#PanelBar1').children().eq(index)
    }

    function getPanelBar() {
        return $("#PanelBar1").data("kendoPanelBar");
    }

    module('single expand collapse', {
        setup : function() {
            QUnit.fixture.html(__html__['tests/panelbar/single-expand-collapse-fixture.html']);
            $("#PanelBar1").kendoPanelBar({ animation: false, expandMode: "single" });
        }
    });

    test('clicking not expandable item should not collapse expanded item', function() {
        var item = getRootItem(3);
        var item2 = getRootItem(1);

        item2.find('> .k-link').click();

        equal(item.find('.k-group').css("display"), "block");
    });

    test('clicking item should collapse other and fire collapse on it', function() {

        var panelbar = getPanelBar(),
            item = getRootItem(3),
            item2 = getRootItem(2),
            collapseItem = false;

        panelbar.bind( "collapse", function(e) {
            collapseItem = e.item;
        });

        item2.find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "none");
        equal(collapseItem, item[0]);
    });

    test('clicking item twice should not collapse it', function() {
        var item = getRootItem(0);

        item.find('> .k-link').trigger('click');
        item.find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "block");
    });

    test('clicking subItem should not collapse headerItem', function() {
        var item = getRootItem(0);
        item.find('> .k-link').trigger('click');
        var subItem = item.find('> .k-group').children()[0];

        $(subItem).find('> .k-link').trigger('click');

        equal(item.find('.k-group').css("display"), "block");
    });
})();
