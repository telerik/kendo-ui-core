---
title: Media
page_title: jQuery Grid Documentation - Column Media
description: "Get started with the jQuery Grid by Kendo UI and learn how to set a visibility condition on the columns."
slug: column_media_kendoui_grid_widget
position: 11
---

# Column Media

The Kendo UI Grid provides the built-in functionality to condtionally make a column visible, based on the width of the Browser window.

> * The [hidden](/api/javascript/ui/grid/configuration/columns.hidden) option takes precedence over `media`.
> * The `media` option cannot be used with [minScreenWidth](/api/javascript/ui/grid/configuration/columns.minscreenwidth) at the same time.

## Configuration

Set the `media` property of the column to a [valid string](#accepted-values).

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
          columns: [
              { field: "id", width: 250, media: "(min-width: 576px)" },
              { field: "age", width: 250, media: "sm" },
              { field: "city", width: 250, media: "(max-width: 576px)" },
              { field: "name", width: 250 }
          ],
          dataSource: [
              { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>
```

## Accepted Values

1. The property accepts valid strings for the [`matchMedia browser API`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) (assuming it is supported by the browser) and toggles the visibility of the columns based on the media queries.

1. The property accepts the device identifiers that are available in [Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options):

- **xs** is equivalent to "(max-width: 576px)"
- **sm** is equivalent to "(min-width: 576px)"
- **md** is equivalent to "(min-width: 768px)"
- **lg** is equivalent to "(min-width: 992px)"
- **xl** is equivalent to "(min-width: 1200px)"

## See Also

* [Knowledge Base](/knowledge-base)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)