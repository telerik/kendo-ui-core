 import { describe, it, vi } from 'vitest';
 import '@progress/kendo-ui/src/kendo.tabstrip.js';

 let dom;
 let tabstrip;

 const K_DISABLED = "k-disabled";
 const DEFAULT_HTML = `<div id="tabstrip-datasource-dom">
    <ul>
        <li
            data-enabled="true"
            data-icon="search" 
            data-icon-position="after" 
            data-sprite-css-class="coca-cola" 
            data-closable="true" >
            <button data-icon="pencil" data-action="handler1"></button>
            <button data-icon="pin" data-icon-class="myIconClass" data-action="handler2"></button>
            Tab & 1
        </li>
        <li data-encoded="true" data-enabled="false">Ajax & Tab</li>
    </ul>
    </div>`;

 function createTabStrip(html) {
    dom = $(html || DEFAULT_HTML).appendTo(document.body);

    tabstrip = new kendo.ui.TabStrip(dom, {
         _enableDOMDataSource: true
    });
}

function destroyTabStrip() {
    if (tabstrip) {
        tabstrip.destroy();
        dom.remove();
        tabstrip = null;
        dom = null;
    }
}

describe('TabStrip Tab Features [DataSource DOM Rendering]', function() {
    afterEach(function() {
        destroyTabStrip();
    });

   it('renders encoded/decoded tab with data-encoded', function() {
         createTabStrip();

         const firstTabText = dom.find('.k-tabstrip-item').eq(0).text();
         const secondTabText = dom.find('.k-tabstrip-item').eq(1).text();

         assert.equal(firstTabText.trim(), 'Tab & 1');
         assert.equal(secondTabText.trim(), 'Ajax &amp; Tab');
   });

   it('renders enabled/disabled tab with data-enabled', function() {
         createTabStrip();

         const firstTab = dom.find('.k-tabstrip-item').eq(0);
         const secondTab = dom.find('.k-tabstrip-item').eq(1);

         assert.isOk(!firstTab.hasClass(K_DISABLED));
         assert.isOk(secondTab.hasClass(K_DISABLED));
   });

   it('renders close button only for tabs with data-closable: true', function() {
            createTabStrip();
            const items = dom.find('.k-tabstrip-item');
            assert.equal(items.eq(0).find('[ref-close-button]').length, 1);
            assert.equal(items.eq(1).find('[ref-close-button]').length, 0);
   });

    it('renders icon and iconPosition in tabs', function() {
            createTabStrip();

            const firstTab = dom.find('.k-tabstrip-item').eq(0);
            assert.isOk(firstTab.find('.k-icon').length > 0);
    });

    it('removes tab and content when close icon is clicked', function() {
            createTabStrip();

            const items = dom.find('.k-tabstrip-item');

            const closeBtn = items.eq(0).find('[ref-close-button]');
            closeBtn.trigger('click');

            assert.equal(dom.find('.k-tabstrip-item').length, 1);
            assert.equal(dom.find('.k-tabstrip-content').length, 1);
            assert.equal(dom.find('.k-tabstrip-item').text(), 'Ajax &amp; Tab');
    });

    it('preserves HTML elements in tab text during DOM data source creation', function() {
        const html = `<div id="tabstrip-html-content">
            <ul>
                <li>
                    <a href="#" class="k-link">
                        <span class="k-link-text">Tab with <input type="text" value="input"/> element</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="k-link">
                        <span class="k-link-text">Plain text tab</span>
                    </a>
                </li>
            </ul>
        </div>`;

        createTabStrip(html);

        const firstTabLinkText = dom.find('.k-tabstrip-item').eq(0).find('.k-link-text');
        const inputElement = firstTabLinkText.find('input');

        assert.equal(inputElement.length, 1, 'Input element should be preserved');
        assert.equal(inputElement.val(), 'input', 'Input value should be preserved');

        const secondTabText = dom.find('.k-tabstrip-item').eq(1).find('.k-link-text').text().trim();
        assert.equal(secondTabText, 'Plain text tab', 'Plain text should be preserved normally');
    });
});