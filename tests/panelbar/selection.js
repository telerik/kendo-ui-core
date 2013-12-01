(function() {
   var isExpandRaised, isCollapseRaised, isSelectRaised;

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

    var panelbar;

    module("PanelBar / Selection", {
        setup: function() {
            QUnit.fixture.html(__html__['tests/panelbar/selection-fixture.html']);
            $("#PanelBar1").kendoPanelBar({ animation: false });
            panelbar = $("#PanelBar1").data('kendoPanelBar');
        }
    });

    test('clicking root items selects them', function() {
        var firstLink = getRootItem(0).find('> .k-link');

        firstLink.trigger({ type: 'click' });

        ok(firstLink.hasClass('k-state-selected'));
    });

    test('selecting root items deselects their siblings', function() {
        var firstLink = getRootItem(0).find('> .k-link');
        var secondLink = getRootItem(1).find('> .k-link');

        firstLink.trigger({ type: 'click' });
        secondLink.trigger({ type: 'click' });

        equal($(panelbar.element).find('.k-state-selected').length, 1);
    });
})();
