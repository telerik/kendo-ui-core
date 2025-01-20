---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn about its features and how to initialize the component."
slug: htmlhelpers_taskboard_aspnetcore_overview
position: 0
---

# {{ site.framework }} TaskBoard Overview

{% if site.core %}
The Telerik UI TaskBoard TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TaskBoard widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI TaskBoard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TaskBoard widget.
{% endif %}

The {{ site.framework }} TaskBoard allows you to easily organize items and keep track of their state. The component provides a clean and user-friendly interface and enables you to manage tasks, notes, projects, people, or other kinds of items. The TaskBoard displays columns (lanes), which can represent different types of project/task statuses. Tasks are visualized as cards, which are customizable through templates. You can reorder cards within the columns, or drag and drop them onto another column.

* [TaskBoard demos](https://demos.telerik.com/{{ site.platform }}/taskboard/index)

## Initializing the TaskBoard

The following example demonstrates how to initialize the TaskBoard. 

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().TaskBoard<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel, Kendo.Mvc.Examples.Models.TaskBoard.Column>()
        .Name("taskBoard")
        .ColumnSettings(columnSettings => columnSettings
            .DataTextField("Text")
            .DataStatusField("ID")
        )
        .Columns(dataSource => dataSource
            .Ajax()
            .Read("Editing_Columns_Read", "TaskBoard")
            .Create("Editing_Columns_Create", "TaskBoard")
            .Update("Editing_Columns_Update", "TaskBoard")
            .Destroy("Editing_Columns_Destroy", "TaskBoard")
        )
        .DataTitleField("Title")
        .DataStatusField("OwnerID")
        .DataDescriptionField("Description")
        .DataCategoryField("ID")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.TaskID))
            .Read(read => read.Action("Tasks_Read", "TaskBoard"))
            .Create(update => update.Action("Tasks_Create", "TaskBoard"))
            .Update(update => update.Action("Tasks_Update", "TaskBoard"))
            .Destroy(update => update.Action("Tasks_Destroy", "TaskBoard"))
        )
        .Height("750")
    )
```
```TagHelper
    <kendo-taskboard name="taskBoard" datatitlefield="title" datastatusfield="OwnerID" datadescriptionfield="Description" datacategoryfield="ID" height="750">
        <datasource>
            <transport>
                <read url="@Url.Action("Tag_Helper_Tasks_Read", "TaskBoard")" />
                <create url="@Url.Action("Tag_Helper_Tasks_Create", "TaskBoard")" />
                <update url="@Url.Action("Tag_Helper_Tasks_Update", "TaskBoard")" />
                <destroy url="@Url.Action("Tag_Helper_Tasks_Destroy", "TaskBoard")" />
            </transport>
            <schema data="Data" total="Total" errors="Errors">
                <model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="title" from="Title" type="string"></field>
                        <field name="Description" from="Description" type="string"></field>
                        <field name="OwnerID" type="number" default-value="0"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <column-settings datatextfield="Text" datastatusfield="ID">
        </column-settings>
        <taskboard-columns>
            <datasource>
                <transport>
                    <read url="@Url.Action("Tag_Helper_Columns_Read", "TaskBoard")" />
                    <create url="@Url.Action("Tag_Helper_Columns_Create", "TaskBoard")" />
                    <update url="@Url.Action("Tag_Helper_Columns_Update", "TaskBoard")" />
                    <destroy url="@Url.Action("Tag_Helper_Columns_Destroy", "TaskBoard")" />
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <model id="ID">
                        <fields>
                            <field name="ID" type="number"></field>
                            <field name="Text" from="Text" type="string"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
        </taskboard-columns>
    </kendo-taskboard>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .ColumnSettings(s =>
        {
            s.Width("320");
        })
        .Columns(c =>
        {
            c.Add().Text("To-do").Status("todo");
            c.Add().Text("In Progress").Status("inProgress");
            c.Add().Text("Done").Status("done");
        })
        .DataDescriptionField("Description")
        .DataStatusField("Status")
        .DataTitleField("Title")
        .DataOrderField("Order")
        .BindTo((IEnumerable<Kendo.Mvc.Examples.Models.TaskBoard.CardViewModel>)ViewBag.Cards)
        .Height("750")
    )
```
```Controller
    public partial class TaskBoardController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Cards = GetCards();

            return View();
        }

        private static IList<CardViewModel> GetCards()
        {
            IList<CardViewModel> cards = new List<CardViewModel>()
            {
                new CardViewModel { ID = 1, Title = "Ads Analytics", Order = 1, Description = "Review ads performance", Status ="todo", Color= "blue" },
                new CardViewModel { ID = 2, Title = "SEO Analytics", Order = 2, Description = "Review SEO results", Status ="todo", Color= "blue" },
                new CardViewModel { ID = 3, Title = "Content", Order = 3, Description = "Plan content for podcasts", Status ="todo", Color= "orange" },
                new CardViewModel { ID = 4, Title = "Customer Research", Order = 4, Description = "Refine feedback from user interviews", Status ="inProgress", Color= "orange" },
                new CardViewModel { ID = 5, Title = "Campaigns", Order = 5, Description = "Collaborate with designers on new banners", Status ="inProgress", Color= "orange" },
                new CardViewModel { ID = 6, Title = "Customer Journey", Order = 6, Description = "Review shopping cart experience", Status ="done", Color= "green" },
                new CardViewModel { ID = 7, Title = "Content", Order = 7, Description = "Publish new blogpost", Status ="done", Color= "green" },
                new CardViewModel { ID = 8, Title = "Post-Release Party", Order = 8, Description = "Plan new release celebration", Status ="done", Color= "blue" },
            };

            return cards;
        }
    }
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Data Binding]({% slug htmlhelpers_taskboard_aspnetcore_databinding %}) | The TaskBoard provides options for binding it to local and remote data. |
| [Cards]({% slug htmlhelpers_taskboard_aspnetcore_cards %}) | The TaskBoard displays tasks, notes, projects, or other types of items as cards. |
| [Columns]({% slug htmlhelpers_taskboard_aspnetcore_columns %}) | The TaskBoard displays cards grouped by criteria in columns (lanes). |
| [Editing]({% slug htmlhelpers_taskboard_aspnetcore_editing %}) | The TaskBoard allows column and card editing. By default, editing in the TaskBoard is enabled for both columns and cards. |
| [Resources]({% slug htmlhelpers_taskboard_aspnetcore_resources %}) | The component allows you to configure resources&mdash;optional metadata that can be associated with a card. |
| [Search]({% slug htmlhelpers_taskboard_aspnetcore_search %}) | You can utilize a built-in search tool in the TaskBoard's toolbar that allows you to search through the cards data. |
| [Templates]({% slug htmlhelpers_taskboard_aspnetcore_templates %}) | You are able to control the rendering of columns, cards, and popup headers with the use of [Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview) or the [Template Component](https://docs.telerik.com/{{ site.platform }}/html-helpers/template/overview). |
| [Toolbar]({% slug htmlhelpers_taskboard_aspnetcore_toolbar %}) | The built-in toolbar of the component allows you to use existing tools or to create new custom ones. |
| [Accessibility]({% slug htmlhelpers_taskboard_aspnetcore_accessibility %}) | The TaskBoard is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support. |
| [Globalization]({% slug htmlhelpers_taskboard_aspnetcore_globalization %}) | The globalization process combines the translation of component messages (localization) with adapting them to specific cultures (internationalization and right-to-left support). |

## Next Steps

* [Getting Started with the TaskBoard]({% slug taskboard_aspnetcore_get_started %})
* [Basic Usage of the TaskBoard HtmlHelper for {{site.framework}} (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard)
{% if site.core %}
* [Basic Usage of the TaskBoard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/taskboard/tag-helper)
* [TaskBoard in Razor Pages]({% slug razorpages_taskboard_aspnetcore %})
{% endif %}
* [Data Binding]({% slug htmlhelpers_taskboard_aspnetcore_databinding %})

## See Also

* [Using the API of the TaskBoard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/api)
* [Client-side API of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
* [Server-Side HtmlHelper API of the TaskBoard](/api/taskboard)
{% if site.core %}
* [Server-Side TagHelper API of the TaskBoard](/api/taghelpers/taskboard)
* [Forum Discussions](https://www.telerik.com/forums/aspnet-core-ui?tagId=1735)
{% else %}
* [Forum Discussions](https://www.telerik.com/forums/aspnet-mvc?tagId=1736)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
