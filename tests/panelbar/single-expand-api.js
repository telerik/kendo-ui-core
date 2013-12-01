(function() {
    var isRaised, isCollapseRaised, isSelectRaised;

    function getRootItem(index) {
        return $('#PanelBar1').find('.k-header').parent().eq(index)
    }

    function getPanelBar() {
        return $("#PanelBar1").data("kendoPanelBar");
    }

    //handlers
    function Expand(sender, args) {
        isExpandRaised = true;
    }

    function Collapse(sender, args) {
        isCollapseRaised = true;
    }

    function Select(sender, args) {
        isSelectRaised = true;
    }

    module('single expand api', {
        setup: function() {
            QUnit.fixture.html(__html__['tests/panelbar/single-expand-api-fixture.html']);
            $("#PanelBar1").kendoPanelBar({ animation: false, expandMode: 0 });
        }
    });

    test('expand should collapse other opened items', function() {

        var panel = getPanelBar();

        var item = getRootItem(0);
        var item2 = getRootItem(2);

        panel.expand(item2);

        equal(item.find('> .k-group').css("display"), "none");
    });

    test('expand should not collapse item which is already expanded', function() {

        var panel = getPanelBar();

        var item = getRootItem(2);

        panel.expand(item);
        panel.expand(item);

        equal(item.find('> .k-group').css("display"), "block");
    });
})();
