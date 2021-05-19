---
title: Hint
page_title: jQuery Sortable Documentation | Hint
description: "Get started with the jQuery Sortable by Kendo UI and manage the hint of the widget."
slug: hint_kendoui_sortable
position: 2
---

# Hint

By default, the Sortable renders a hint.

The hint is the element which represents the dragged item and is a clone of the dragged item. You can change the default hint by setting the `hint` configuration option.

> The `hint` element is appended to the `<body>` tag which may cause styling issues if the CSS rules are applied only to the container of the Sortable.

The following example demonstrates how to build the hint from the dragged element.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            hint: function(element) {
                return $("<span></span>")
                        .text(element.text())
                        .css("color", "#FF0000");
            }
        });
    </script>
```

The following example demonstrates how to build a static hint.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            hint: "<span>hint!</span>"
        });
    </script>
```

The following example demonstrates how to disable the hint by setting the `hint` option to an empty function ([`jQuery.noop`](https://api.jquery.com/jQuery.noop/)).

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            hint: $.noop
        });
    </script>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
