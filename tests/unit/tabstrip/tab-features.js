import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@progress/kendo-ui/src/kendo.tabstrip.js';

let dom;
let tabstrip;

function createTabStrip(options, markup) {
    dom = $(markup || '<div></div>').appendTo(document.body);
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

    it('renders tab actions with custom attributes', function() {
        const handler = vi.fn();
        createTabStrip({
            dataTextField: 'text',
            dataContentField: 'content',
            dataSource: [
                {
                    text: 'Tab with actions',
                    content: 'Tab content',
                    actions: [
                        {
                            icon: 'pencil',
                            attributes: { 'title': 'Edit', 'data-id': 'edit-action' },
                            action: handler
                        },
                        {
                            icon: 'gear',
                            attributes: { 'title': 'Settings', 'data-role': 'settings-btn' }
                        }
                    ]
                }
            ]
        });

        const actionBtns = dom.find('.k-tabstrip-item .k-item-actions .k-button');
        assert.equal(actionBtns.length, 2);

        // Verify first action button has correct attributes
        const editBtn = actionBtns.eq(0);
        assert.equal(editBtn.attr('title'), 'Edit');
        assert.equal(editBtn.attr('data-id'), 'edit-action');

        // Verify second action button has correct attributes
        const settingsBtn = actionBtns.eq(1);
        assert.equal(settingsBtn.attr('title'), 'Settings');
        assert.equal(settingsBtn.attr('data-role'), 'settings-btn');

        // Verify the action handler is still triggered when button with attributes is clicked
        editBtn.trigger('click');
        assert.isOk(handler.mock.calls.length > 0);
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

    it('renders data-source text as text when encoded is omitted', function() {
        const untrustedText = 'Tab <img src=x onerror=alert(1)>';
        createTabStrip({
            dataTextField: 'text',
            dataSource: [{ text: untrustedText }]
        });

        const tab = dom.find('.k-tabstrip-item').first();
        assert.equal(tab.find('img').length, 0);
        assert.equal(tab.text().trim(), untrustedText);
    });

    it('renders DOM-sourced tab text as text when encoded is omitted', function() {
        const untrustedText = 'Tab <img src=x onerror=alert(1)>';
        createTabStrip(
            { _enableDOMDataSource: true },
            `<div><ul><li><a class="k-link"><span class="k-link-text">Tab &lt;img src=x onerror=alert(1)&gt;</span></a></li></ul></div>`
        );

        const tab = dom.find('.k-tabstrip-item').first();
        assert.equal(tab.find('img').length, 0);
        assert.equal(tab.text().trim(), untrustedText);
    });

    it('renders DOM-sourced HTML when encoded is explicitly false', function() {
        createTabStrip(
            { _enableDOMDataSource: true },
            '<div><ul><li data-encoded="false"><a class="k-link"><span class="k-link-text"><strong>Tab</strong></span></a></li></ul></div>'
        );

        assert.equal(dom.find('.k-tabstrip-item strong').text(), 'Tab');
    });

    it('renders DOM-sourced content as HTML when encoded is false', function() {
        createTabStrip(
            { _enableDOMDataSource: true },
            `<div>
                <ul>
                    <li data-text="&lt;strong&gt;Tab&lt;/strong&gt;" data-encoded="false" data-content="&lt;strong&gt;Content&lt;/strong&gt;">
                        <a class="k-link"><span class="k-link-text">Tab</span></a>
                    </li>
                </ul>
                <div class="k-tabstrip-content">Initial content</div>
            </div>`
        );

        assert.equal(dom.find(".k-tabstrip-content strong").text(), "Content");
    });

    it('preserves DOM-sourced panel HTML with plain-text header after refresh', function() {
        createTabStrip(
            { _enableDOMDataSource: true },
            `<div>
                <ul>
                    <li>Tab &lt;b&gt;</li>
                </ul>
                <div><input class="panel-input" /><strong>Panel</strong></div>
            </div>`
        );

        tabstrip.refresh();

        assert.equal(dom.find('.k-tabstrip-item').first().text().trim(), 'Tab <b>');
        assert.equal(dom.find('.k-tabstrip-item b').length, 0);
        assert.equal(dom.find('.k-tabstrip-content .panel-input').length, 1);
        assert.equal(dom.find('.k-tabstrip-content strong').text(), 'Panel');
    });

    it('renders data-source content as text when encoded is omitted', function() {
        const untrustedContent = '<img src=x onerror=alert(1)>';
        createTabStrip({
            dataTextField: 'text',
            dataContentField: 'content',
            dataSource: [{ text: 'Tab', content: untrustedContent }]
        });

        const content = dom.find('.k-tabstrip-content').first();
        assert.equal(content.find('img').length, 0);
        assert.equal(content.text(), untrustedContent);
    });

    it('renders data-source content as HTML when encoded is explicitly false', function() {
        createTabStrip({
            dataTextField: 'text',
            dataContentField: 'content',
            dataSource: [{ text: 'Tab', content: '<strong>Content</strong>', encoded: false }]
        });

        assert.equal(dom.find('.k-tabstrip-content strong').text(), 'Content');
    });

    it('renders data-source content as text when DOM data source is enabled together with a data source', function() {
        const untrustedContent = '<img src=x onerror=alert(1)>';
        createTabStrip({
            _enableDOMDataSource: true,
            dataTextField: 'text',
            dataContentField: 'content',
            dataSource: [{ text: 'Tab', content: untrustedContent }]
        });

        assert.equal(dom.find('.k-tabstrip-content img').length, 0);
    });

    it('preserves configured event-handler attributes and encodes action button attribute values', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [{
                text: 'Tab',
                actions: [{
                    icon: 'pencil',
                    attributes: {
                        onclick: 'alert(1)',
                        title: '<b>',
                        'data-safe': 'true'
                    }
                }]
            }]
        });

        const action = dom.find('.k-tabstrip-item .k-item-actions button').first();
        assert.equal(action.attr('onclick'), 'alert(1)');
        assert.equal(action.attr('title'), '<b>');
        assert.equal(action.attr('data-safe'), 'true');
    });

    it('sanitizes tab and action URL attributes using the link allowlist', function() {
        const attributes = { href: 'mailto:user@example.com', cite: 'javascript:alert(1)' };
        createTabStrip({
            dataTextField: 'text',
            dataSource: [{
                text: 'Tab',
                attributes: attributes,
                actions: [{ icon: 'pencil', attributes: attributes }]
            }]
        });

        const tab = dom.find('.k-tabstrip-item').first();
        const action = tab.find('.k-item-actions button').first();
        assert.equal(tab.attr('href'), attributes.href);
        assert.equal(tab.attr('cite'), '#INVALIDLINK');
        assert.equal(action.attr('href'), attributes.href);
        assert.equal(action.attr('cite'), '#INVALIDLINK');
    });

    it('renders data-source HTML when encoded is false on the item', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [{ text: '<strong>Tab</strong>', encoded: false }]
        });

        assert.equal(dom.find('.k-tabstrip-item strong').text(), 'Tab');
    });

    it('preserves configured event-handler attributes and rejects invalid data-source attribute names', function() {
        createTabStrip({
            dataTextField: 'text',
            dataSource: [{
                text: 'Tab',
                attributes: {
                    onclick: 'alert(1)',
                    'data-x" onmouseover="alert(1)': 'true',
                    'data-safe': 'true'
                }
            }]
        });

        const tab = dom.find('.k-tabstrip-item').first();
        assert.equal(tab.attr('onclick'), 'alert(1)');
        assert.isUndefined(tab.attr('onmouseover'));
        assert.equal(tab.attr('data-safe'), 'true');
    });
});
