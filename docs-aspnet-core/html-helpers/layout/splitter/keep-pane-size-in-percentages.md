---
title: Keep Pane Size in Percentages
page_title: Splitter | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to keep the Kendo UI Splitter pane sizes in percentages using the Kendo UI Splitter HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_keep_pane_size_in_percentages_aspnetcore
position: 5
---

#Keep Pane Size in Percentages
The example below demonstrates how to keep the Kendo UI Splitter pane sizes in percentages upon user resizes.

```Razor
@(Html.Kendo().Splitter()
                .Name("splitter")
                .Panes(panes=> {
                    panes.Add().Collapsible(true).Size("20%");
                    panes.Add().Collapsible(false);
                })
                .Events(e => { e.Resize("onResize"); })
    )

<script>
        function onResize(e) {
            console.log(e.sender.options.panes);
            // prevent endless recursion from resizes
            if (!this.appliesSizes) {
                this.appliesSizes = true;

                // calculate pane width
                var element = this.element;
                var pane = element.find(".k-pane:first");
                var ratio = Math.ceil(pane.width() * 100 / element.width());

                // set pane width in percentages
                this.size(pane, ratio + "%");

                this.appliesSizes = false;
            }
        }
</script>
```
```Controller
    public class SplitterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

