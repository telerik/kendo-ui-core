---
title: Toolbar
page_title: Toolbar
description: "Learn how to configure the Toolbar of the Telerik UI Scheduler component for {{ site.framework }}."
slug: scheduler_toolbar_aspnetcore
position: 5
---

# Toolbar

The Telerik {{ site.product_short }} Scheduler component provides the means to customize it's toolbar.

## Default Toolbar

The Telerik {{ site.product_short }} Scheduler allows you to add commands for exporting to PDF and searching through Scheduler events titles. Adding the `.Pdf()` and `.Search()` commands via the Scheduler's `Toolbar()` configuration will display the command alongside the built-in ToolBar tools. The `pdf` and `search` tools will be rendered in a predefined place within the ToolBar.

```HtmlHelper
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
        .Name("scheduler")
        .Height(600)
        .Toolbar(t=>{
            t.Pdf();
            t.Search();
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.RecurrenceId(f => f.RecurrenceID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.OwnerID).DefaultValue(1);
            })
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler" height="600" date="new DateTime(2022, 6, 13)" start-time="new DateTime(2022, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC" mobile="MobileMode.Auto">
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
            <scheduler-toolbar-button name="search"></scheduler-toolbar-button>
        </toolbar>
    </kendo-scheduler>
```
{% endif %}

## Custom Toolbar

The Telerik {{ site.product_short }} Scheduler allows you to customize entirely it's Toolbar via the `.Toolbar(t=>t.Custom())` configuration option.

The default order of the Scheduler tools is: `[ "pdf", [ "today", "previous", "next" ], "current", { type: "spacer" }, "search", "views" ]`. You can set the `Items` configuration to entirely replace all tools in the Scheduler ToolBar (including the default once) in order desired for them to appear in the component. Grouping tools to render a ButtonGroup in the ToolBar is also supported via the `Group()` configuration. Rendering custom components in the Toolbar is also supported via the `CustomTool()` configuration method.

```HtmlHelper
    .Toolbar(t => t.Custom(c =>
        c.Items(itm => {
            itm.CustomTool(Html.Kendo().Template().AddComponent(c => c
                    .DropDownButton()
                    .Name("viewsButton")
                    .Text("Select View")
                    .Icon("chevron-down").Items(db =>
                    {
                        db.Add().Text("Day");
                        db.Add().Text("Week");
                        db.Add().Text("Timeline");
                        db.Add().Text("Month");
                        db.Add().Text("Year");
                    })
                    .Events(ev => ev.Click("viewsHandler"))
                    )
                );
            itm.CustomTool(Html.Kendo().Template().AddComponent(c => c
                .Button()
                .Name("customButton")
                .Content("Custom Button")
                .Events(ev=>ev.Click("clickHandler"))
                )
            );
            itm.Spacer();
            itm.Current();
            itm.Group(g =>
                {
                    g.Today();
                    g.Previous();
                    g.Current();
                });
            })
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        var navButtons = new string[] { "today", "previous", "next" };
    }

    <kendo-scheduler name="scheduler" height="600" date="new DateTime(2022, 6, 13)" start-time="new DateTime(2022, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC" mobile="MobileMode.Auto">
        <toolbar>
            <scheduler-toolbar-items>
                <scheduler-tool>
                    <scheduler-tool-template>
                        <kendo-dropdownbutton name="viewsButton" text="Select View" on-click="viewsHandler" icon="chevron-down">
                            <dropdownbutton-items>
                                <item text="Day"></item>
                                <item text="Week"></item>
                                <item text="Month"></item>
                                <item text="TimeLine"></item>
                                <item text="Year"></item>
                            </dropdownbutton-items>
                        </kendo-dropdownbutton>
                    </scheduler-tool-template>
                </scheduler-tool>
                <scheduler-tool>
                    <scheduler-tool-template>
                        <kendo-button name="customButton" on-click="clickHandler">
                            Custom Button
                        </kendo-button>
                    </scheduler-tool-template>
                </scheduler-tool>
                <scheduler-tool type="spacer"></scheduler-tool>
                <scheduler-tool name="current"></scheduler-tool>
                <scheduler-tool commands-group="@navButtons"></scheduler-tool>
            </scheduler-toolbar-items>
        </toolbar>
    </kendo-scheduler>
```
{% endif %}
```JavaScript
    <script type="text/javascript">
        function viewsHandler(e) {
            var scheduler = $("#scheduler").getKendoScheduler();
            var selectedView = e.target.text().toLowerCase()
            scheduler.view(selectedView)
        }

        function clickHandler(e) {
            alert('Custom button is clicked!!!')
        }
    </script>
```

### Desktop Toolbar

Besides setting a custom Toolbar, the Scheduler provides the option to specify all the tools rendered in the Scheduler's ToolBar with its non-adaptive rendering. You can specify the tools via the `.Toolbar(t=>t.Custom(c=>c.Desktop()))` configuraiton method. If not explicitly set here, the component will render its built-in tools

### Mobile Toolbar

In addition to the `Desktop` configuration the {{ site.product_short }} Scheduler provides the option to specify the tools rendered in the Scheduler ToolBar with its adaptive rendering. By default, two ToolBars are rendered when the Scheduler is in Adaptive rendering mode:

 * Main (or upper) ToolBar - contains the following built-in tools: `[ [ "pdfMobile", "calendar", "create" ], { type: "spacer" }, "search", "viewsMobile" ]`
 * Navigation (or lower) ToolBar - contains the following built-in tools: `[ "previousMobile", { type: "spacer" }, "currentMobile", { type: "spacer" }, "nextMobile" ]`

Both the Main and Navigation toolbars can be configured to display any of the built-in tools as well as custom tools:

```HtmlHelper
.Toolbar(t => t.Custom(c =>
    c.Desktop(d =>
    {
        d.Group(g =>
        {
            g.Previous();
            g.Today();
            g.Next();
        });
        d.CustomTool(Html.Kendo().Template().AddComponent(c => c
            .DropDownButton()
            .Name("myViews")
            .Text("Select View")
            .Icon("chevron-down").Items(db =>
            {
                db.Add().Text("Day");
                db.Add().Text("Week");
                db.Add().Text("Timeline");
                db.Add().Text("Month");
                db.Add().Text("Year");
            })
            .Events(ev => ev.Click(
                @<text>
                    function(e) {
                    var scheduler = $("#scheduler").getKendoScheduler();
                    var selectedView = e.target.text().toLowerCase();
                    scheduler.view(selectedView);
                    }
                </text>))
            )
        );
        d.Current();
        d.Pdf();
        d.Spacer();
        d.Views();
    })
    .Mobile(m =>
    {
        m.Main(main =>
        {
            main.PdfMobile();
            main.Spacer();
            main.CurrentMobile();
            main.Spacer();
            main.ViewsMobile();
        });
        m.Navigation(navi =>
        {
            navi.PreviousMobile();
            navi.Spacer();
            navi.Today();
            navi.Spacer();
            navi.NextMobile();
        });
    })))
```
{% if site.core %}
```TagHelper
    @{
        var navButtons = new string[] { "today", "previous", "next" };
        var navMobileButtons = new string[] { "today", "previousMobile", "nextMobile" };
    }

    <kendo-scheduler name="scheduler" height="600" date="new DateTime(2022, 6, 13)" start-time="new DateTime(2022, 6, 13, 7, 0, 0, 0)" timezone="Etc/UTC" mobile="MobileMode.Auto">
        <toolbar>
            <scheduler-desktop-items>
                <scheduler-desktop-tool commands-group="@navButtons"></scheduler-desktop-tool>
                <scheduler-desktop-tool type="spacer"></scheduler-desktop-tool>
                <scheduler-desktop-tool name="search"></scheduler-desktop-tool>
            </scheduler-desktop-items>
            <scheduler-mobile-main-items>
                <scheduler-mobile-main-tool commands-group="@navMobileButtons"></scheduler-mobile-main-tool>
                <scheduler-mobile-main-tool type="spacer"></scheduler-mobile-main-tool>
                <scheduler-mobile-main-tool name="search"></scheduler-mobile-main-tool>
            </scheduler-mobile-main-items>
            <scheduler-mobile-nav-items>
                <scheduler-mobile-nav-tool name="current"></scheduler-mobile-nav-tool>
                <scheduler-mobile-main-tool type="spacer"></scheduler-mobile-main-tool>
                <scheduler-mobile-main-tool name="pdfMobile"></scheduler-mobile-main-tool>
            </scheduler-mobile-nav-items>
        </toolbar>
    </kendo-scheduler>
```
{% endif %}