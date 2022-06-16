---
title: Persisting the Pane Size
page_title: Persisting the Pane Size
description: "Learn how to keep the Splitter pane sizes in percentages using the Telerik UI Splitter component for {{ site.framework }}."
slug: htmlhelpers_keep_pane_size_in_percentages_aspnetcore
position: 5
---

# Persisting the Pane Size

The Splitter enables you to keep its pane size in percentage upon user resizes.

```HtmlHelper
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
                // Prevent endless recursion from resizes.
                if (!this.appliesSizes) {
                    this.appliesSizes = true;

                    // Calculate the pane width.
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
{% if site.core %}
```TagHelper
    <kendo-splitter name="splitter" on-resize="onResize">
            <pane size="20%" collapsible="true"></pane>
            <pane collapsible="false"></pane>
    </kendo-splitter>

    <script>
            function onResize(e) {
                console.log(e.sender.options.panes);
                // Prevent endless recursion from resizes.
                if (!this.appliesSizes) {
                    this.appliesSizes = true;

                    // Calculate the pane width.
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
{% endif %}
```Controller
    public class SplitterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## See Also

* [Server-Side API](/api/splitter)
