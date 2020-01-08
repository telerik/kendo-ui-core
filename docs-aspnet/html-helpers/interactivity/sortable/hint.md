---
title: Hint
page_title: Hint
description: "Disable the hint in the Telerik UI Sortable HtmlHelper for {{ site.framework }}."
slug: hint_sortable_aspnetcore
position: 2
---

# Hint

By default, the Sortable renders a hint.  

To disable that behavior, set the hint to an empty function by using [`jQuery.noop`](http://api.jquery.com/jQuery.noop/).

```
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .HintHandler("noHint")
    )

    <script>
        var noHint = $.noop;
    </script>
```

## See Also

* [Server-Side API](/api/sortable)
