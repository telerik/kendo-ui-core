import '@progress/kendo-ui/src/kendo.tabstrip.js';
import { press, move, release } from '../../helpers/general-utils.js';

let tabstrip;
let touch = false;

function createTabStrip(options) {
    tabstrip = new kendo.ui.TabStrip("#tabstrip", $.extend({
        animation: false,
    }, options));
}


function setupDom() {


    Mocha.fixture.append(
        '<div id="tabstrip" style="width:600px;">' +
        '    <ul>' +
        '        <li class="k-active">some item text 1</li>' +
        '        <li>some item text 2</li>' +
        '        <li>some item text 3</li>' +
        '        <li>some item text 4</li>' +
        '        <li>some item text 5</li>' +
        '        <li>some item text 6</li>' +
        '        <li>some item text 7</li>' +
        '        <li>some item text 8</li>' +
        '        <li>some item text 9</li>' +
        '        <li>some item text 10</li>' +
        '    </ul>' +
        '    <div>content 1</div>' +
        '    <div>content 2</div>' +
        '    <div>content 3</div>' +
        '    <div>content 4</div>' +
        '    <div>content 5</div>' +
        '    <div>content 6</div>' +
        '    <div>content 7</div>' +
        '    <div>content 8</div>' +
        '    <div>content 9</div>' +
        '    <div>content 10</div>' +
        '</div>'
    );

}

function trigger(type, e, el) {
    el = el || tabstrip.tabWrapper;
    el.trigger($.Event(type, e));
}

describe('tabstrip sorting', function() {
    beforeEach(function() {
        setupDom();
    });

    afterEach(function() {

        tabstrip.destroy();
    });

    it('sorting is not enabled by default', function() {
        createTabStrip();

        assert.isOk(!tabstrip.sortable);
    });

    it("dragging a tab changes its position", function() {
        createTabStrip({ sortable: true });

        let draggedElement = tabstrip.tabWrapper.find("li:eq(0)"),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = tabstrip.tabWrapper.find("li:eq(1)"),
            targetOffset = kendo.getOffset(targetElement);

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left + draggedElement.width(), targetOffset.top);
        release(draggedElement, targetOffset.left + draggedElement.width(), targetOffset.top);

        assert.isOk(tabstrip.sortable);
        assert.equal(draggedElement.index(), 1);
    });

});
