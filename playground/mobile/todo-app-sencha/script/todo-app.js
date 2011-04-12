Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var timeline2 = new Ext.Component({
            title: 'Timeline 2',
            cls: 'timeline2',
            scroll: 'vertical',
            tpl: [
                '<tpl for=".">',
                    '<div class="tweet">',
                            '<div class="tweet-content">',
                                '<h2>{title}</h2>',
                            '</div>',
                    '</div>',
                '</tpl>'
            ]
        });
        var timeline = new Ext.Component({
            title: 'Timeline',
            cls: 'timeline',
            scroll: 'vertical',
            tpl: [
               '<tpl for=".">',
                    '<div class="tweet">',
                            '<div class="tweet-content">',
                                '<h2>{title}</h2>',
                                '<input type="checkbox" <tpl if="done == \'1\'">checked="checked"</tpl> />',
                            '</div>',
                    '</div>',
                '</tpl>'
            ]
        });

        var panel = new Ext.TabPanel({
            fullscreen: true,
            cardSwitchAnimation: 'slide',
            items: [timeline, timeline2]
        });

        var refresh = function() {

            var data = [
                { title: "Change a lightbulb together with the team", done: true },
                { title: "Shop groceries", done: false },
                { title: "Go through issues on GitHub", done: false },
                { title: "Run qUnit tests", done: true },
                { title: "Get cat food", done: false },
                { title: "Clean the living room", done: false },
                { title: "Cook something nice with George", done: false },
                { title: "Perform a miracle", done: false },
                { title: "Ship a product", done: false },
                { title: "Buy a nice bottle of wine for anniversary celebration", done: false },
                { title: "Eat cake", done: false },
                { title: "Create orange portal", done: false },
                { title: "Create blue portal", done: false },
                { title: "Jump fanatically through portals", done: false },
                { title: "Create orange portal", done: false },
                { title: "Create blue portal", done: true },
                { title: "Jump fanatically through portals", done: false },
                { title: "Buy a nice bottle of wine for anniversary celebration", done: false },
                { title: "Eat cake", done: false },
                { title: "Create orange portal", done: false },
                { title: "Create blue portal", done: false },
                { title: "Jump fanatically through portals", done: false },
                { title: "Create orange portal", done: false },
                { title: "Create blue portal", done: true },
                { title: "Jump fanatically through portals", done: false },
                { title: "Make another list of tommorow's tasks", done: false }
            ];

            // Update the tweets in timeline
            timeline.update(data);
            timeline2.update(data);
        };

        var tabBar = panel.getTabBar();
        tabBar.addDocked({
            xtype: 'button',
            ui: 'mask',
            iconCls: 'refresh',
            dock: 'right',
            stretch: false,
            align: 'center',
            handler: refresh
        });

        refresh();
    }
});
