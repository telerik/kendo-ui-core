import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@progress/kendo-ui/src/kendo.tabstrip.js';

let dom;
let tabstrip;

function createTabStrip(options) {
    dom = $('<div></div>').appendTo(document.body);
    tabstrip = new kendo.ui.TabStrip(dom, options);
}

function destroyTabStrip() {
    if (tabstrip) {
        tabstrip.destroy();
        dom.remove();
        tabstrip = null;
        dom = null;
    }
}

describe('TabStrip Tab Features', function() {
    afterEach(function() {
        destroyTabStrip();
    });

    it('renders close buttons when closable is true', function() {
        createTabStrip({
            closable: true,
            dataTextField: 'text',
            dataSource: [
                { text: 'Tab 1' },
                { text: 'Tab 2' }
            ]
        });

        const closeButtons = dom.find('[ref-close-button]');
        assert.equal(closeButtons.length, 2);
    });

    it('renders close button only for tabs with closable: true', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [
                { text: 'Tab 1', closable: true },
                { text: 'Tab 2', closable: false },
                { text: 'Tab 3' }
            ]
        });

        const items = dom.find('.k-tabstrip-item');
        assert.equal(items.eq(0).find('[ref-close-button]').length, 1);
        assert.equal(items.eq(1).find('[ref-close-button]').length, 0);
        assert.equal(items.eq(2).find('[ref-close-button]').length, 0);
    });

    it('renders icon and iconPosition in tabs', function() {
        createTabStrip({
            dataTextField: 'text',
            dataIconField: 'icon',
            dataIconPositionField: 'iconPosition',
            dataSource: [
                { text: 'Tab 1', icon: 'home', iconPosition: 'before' },
                { text: 'Tab 2', icon: 'gear', iconPosition: 'after' }
            ]
        });

        const firstTab = dom.find('.k-tabstrip-item').eq(0);
        const secondTab = dom.find('.k-tabstrip-item').eq(1);
        assert.isOk(firstTab.find('.k-icon').first().parent().children().first().hasClass('k-icon'));
        assert.isOk(secondTab.find('.k-icon').last().parent().children().last().hasClass('k-icon'));
    });

    it('renders icon and iconPosition with custom dataIconField/dataIconPositionField', function() {
        createTabStrip({
            dataTextField: 'text',
            dataIconField: 'ikona',
            dataIconPositionField: 'ikonaPoziciq',
            dataSource: [
                { text: 'Tab 1', ikona: 'star', ikonaPoziciq: 'before' },
                { text: 'Tab 2', ikona: 'user', ikonaPoziciq: 'after' }
            ]
        });

        const firstTab = dom.find('.k-tabstrip-item').eq(0);
        const secondTab = dom.find('.k-tabstrip-item').eq(1);
        assert.isOk(firstTab.find('.k-icon').first().parent().children().first().hasClass('k-icon'));
        assert.isOk(secondTab.find('.k-icon').last().parent().children().last().hasClass('k-icon'));
    });

    it('renders disabled and closable tabs', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [
                { text: 'Tab 1', closable: true },
                { text: 'Tab 2', enabled: false, closable: true },
                { text: 'Tab 3', enabled: false }
            ]
        });

        const items = dom.find('.k-tabstrip-item');
        assert.equal(items.eq(0).find('[ref-close-button]').length, 1);
        assert.isOk(items.eq(1).hasClass('k-disabled'));
        assert.equal(items.eq(1).find('[ref-close-button]').length, 1);
        assert.isOk(items.eq(2).hasClass('k-disabled'));
        assert.equal(items.eq(2).find('[ref-close-button]').length, 0);
    });

    it('renders tab with multiple actions', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [
                {
                    text: 'Tab 1',
                    actions: [
                        { icon: 'pencil' },
                        { icon: 'refresh' },
                        { icon: 'close' }
                    ]
                }
            ]
        });

        const actionBtns = dom.find('.k-tabstrip-item .k-item-actions .k-button');
        assert.equal(actionBtns.length, 3);
    });

    it('renders tab actions and triggers all action handlers', function() {
        const handler1 = vi.fn();
        const handler2 = vi.fn();
        createTabStrip({
            dataTextField: 'text',
            dataSource: [
                {
                    text: 'Tab 1',
                    actions: [
                        { icon: 'pencil', action: handler1 },
                        { icon: 'refresh', action: handler2 }
                    ]
                }
            ]
        });

        const actionBtns = dom.find('.k-tabstrip-item .k-item-actions .k-button');
        actionBtns.eq(0).trigger('click');
        actionBtns.eq(1).trigger('click');
        assert.isOk(handler1.mock.calls.length > 0);
        assert.isOk(handler2.mock.calls.length > 0);
    });

    it('removes tab and content when close icon is clicked', function() {
        createTabStrip({
            dataTextField: 'text',
            dataContentField: 'content',
            dataSource: [
                { text: 'Tab 1', content: 'Content 1', closable: true },
                { text: 'Tab 2', content: 'Content 2' }
            ]
        });

        const items = dom.find('.k-tabstrip-item');

        const closeBtn = items.eq(0).find('[ref-close-button]');
        closeBtn.trigger('click');
        // After close, only one tab and one content should remain
        assert.equal(dom.find('.k-tabstrip-item').length, 1);
        assert.equal(dom.find('.k-tabstrip-content').length, 1);
        assert.equal(dom.find('.k-tabstrip-item').text(), 'Tab 2');
        assert.equal(dom.find('.k-tabstrip-content').text(), 'Content 2');
    });
});
