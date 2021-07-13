---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn about its features and how to initialize the component."
slug: htmlhelpers_taskboard_aspnetcore_overview
position: 1
---

# TaskBoard Overview

The Telerik UI TaskBoard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TaskBoard widget.

The {{ site.framework }} TaskBoard allows you to easily organize items and keep track of their state. The component provides a clean and user-friendly interface and enables you to manage tasks, notes, projects, people, or other kinds of items. The TaskBoard displays columns (lanes), which can represent different types of project/task statuses. Tasks are visualized as cards, which are easily customizable through templates. You can reorder cards within the columns, or drag and drop them onto another column.

* [TaskBoard demos](https://demos.telerik.com/{{ site.platform }}/taskboard/index)

## Initializing the TaskBoard

The following example demonstrates how to initialize the TaskBoard. 

```Razor
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

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_taskboard_aspnetcore_databinding %})
* [Cards]({% slug htmlhelpers_taskboard_aspnetcore_cards %})
* [Columns]({% slug htmlhelpers_taskboard_aspnetcore_columns %})
* [Editing]({% slug htmlhelpers_taskboard_aspnetcore_editing %})
* [Resources]({% slug htmlhelpers_taskboard_aspnetcore_resources %})
* [Search]({% slug htmlhelpers_taskboard_aspnetcore_search %})
* [Templates]({% slug htmlhelpers_taskboard_aspnetcore_templates %})
* [Toolbar]({% slug htmlhelpers_taskboard_aspnetcore_toolbar %})
* [Accessibility]({% slug htmlhelpers_taskboard_aspnetcore_accessibility %})
* [Globalization]({% slug htmlhelpers_taskboard_aspnetcore_globalization %})

## Referencing Existing Instances

To get a reference to an existing TaskBoard instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [TaskBoard client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard#methods) to control its behavior.

        $(document).ready(function() {
            // The Name() of the TaskBoard is used to get its client-side instance.
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");
        });

## See Also

* [Overview of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/index)
* [Data Binding]({% slug htmlhelpers_taskboard_aspnetcore_databinding %})
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
