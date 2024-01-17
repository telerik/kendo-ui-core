---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Sortable for {{ site.framework }}."
previous_url: /helpers/html-helpers/sortable, /helpers/interactivity/sortable/overview
slug: htmlhelpers_sortable_aspnetcore
position: 0
---

# {{ site.framework }} Sortable Overview

{% if site.core %}
The Telerik UI Sortable TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Sortable widget.
{% else %}
The Telerik UI Sortable HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Sortable widget.
{% endif %}

The Sortable provides a sortable drag-and-drop functionality to elements within a list.

* [Demo page for the Sortable HtmlHelper](https://demos.telerik.com/{{ site.platform }}/sortable/index)
{% if site.core %}
* [Demo page for the Sortable TagHelper](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}

## Initializing the Sortable

Unlike most of the Telerik UI components, the Sortable does not render HTML markup. You have to initialize the Sortable for an existing DOM element.

The following example demonstrates a basic declaration of the Sortable. The component is initialized for the `sortable-basic` element making its list items sortable.

```HtmlHelper
      <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
      </ul>
      @(Html.Kendo().Sortable()
          .For("#sortable-basic") // The For() option of the Sortable is mandatory.
                                  // It accepts a jQuery selector that specifies
                                  // the already existing element for which the Sortable will be initialized.
          .HintHandler("hint") // The JavaScript function that returns the hint element of the Sortable.
          .PlaceholderHandler("placeholder") // The JavaScript function that constructs the placeholder element of the Sortable.
      )
      <script>
          // Define the hint handler.
          function hint(element) {
              return element.clone().addClass("hint");
          }
          // Define the placeholder handler.
          function placeholder(element) {
              return element.clone().addClass("placeholder").text("drop here");
          }
      </script>
```
{% if site.core %}
```TagHelper
    <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
    </ul>
    <kendo-sortable name="sortable-basic" hint="hint" placeholder="placeholder">
    </kendo-sortable>
    <script>
          // Define the hint handler.
          function hint(element) {
              return element.clone().addClass("hint");
          }
          // Define the placeholder handler.
          function placeholder(element) {
              return element.clone().addClass("placeholder").text("drop here");
          }
    </script>
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Hint]({% slug hint_sortable_aspnetcore %}) | Set the Sortable item hint. |
| [Items]({% slug htmlhelpers_sortable_aspnetcore_items %}) | Control the behavior of the Sortable items.  |
| [Cursor]({% slug htmlhelpers_sortable_aspnetcore_cursor %}) | Configure the cursor type displayed when dragging a sortable item. |
| [Placeholder]({% slug htmlhelpers_sortable_aspnetcore_placeholder %}) | Customize the default Sortable placeholder. |
| [Events]({% slug events_sortable %}) | The Sortable allows you to handle its events and implement the desired custom functionality. |
| [Integration with other Telerik UI components]({% slug sortable_aspnetcore_integration_grid %}) | Use the Sortable with other Telerik UI components to reoder their items. |

## Next Steps

* [Getting Started with the Sortable]({% slug sortable_getting_started %})
* [Basic Usage of the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable)
{% if site.core %}
* [Basic Usage of the Sortable TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}

## See Also

* [Common Scenarios with the Sortable]({% slug htmlhelpers_sortable_aspnetcore_common_scenarios %})
* [Configure the Filtered and Disabled Items of the Sortable for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/filter-disable)
* [Knowledge Base Section](/knowledge-base)
