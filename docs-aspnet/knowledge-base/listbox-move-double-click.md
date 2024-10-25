---
title: Transfer ListBox Items on Double Click
description: How can I transfer items between ListBoxes by double-clicking the Kendo UI ListBox? Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: ListBox Move elements on double click
slug: listbox-move-double-click
tags: listbox, list, box, double, click, transfer, items
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI ListBox for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I transfer items between ListBoxes by double-clicking the {{ site.product }} ListBox?

## Solution

1. Handle the [`dblclick`](https://api.jquery.com/dblclick/) event on the items in both ListBoxes.
2. In the event handler, based on the ListBox, manually execute the `transferTo` or `transferFrom` command.

```Index.cshtml
@(Html.Kendo().ListBox()
            .Name("listBoxA")
            .ConnectWith("listBoxB")
            .BindTo(new List<string>() { "Value 1", "Value 2", "Value 3"}))

@(Html.Kendo().ListBox()
            .Name("listBoxB")
            .BindTo(new List<string>())
            .Selectable(ListBoxSelectable.Multiple))
```
```script.js
    $(document).ready(function () {
        var listBoxB = $("#listBoxB").data("kendoListBox");
        var listBoxA = $("#listBoxA").data("kendoListBox");
        listBoxA.wrapper.find(".k-list").on("dblclick", ".k-item", function (e) {
            listBoxA._executeCommand("transferTo");
        });

        listBoxB.wrapper.find(".k-list").on("dblclick", ".k-item", function (e) {
            listBoxA._executeCommand("transferFrom");
        });
    })
```

## More {{ site.framework }} ListBox Resources

* [{{ site.framework }} ListBox Documentation]({%slug htmlhelpers_listbox_aspnetcore%})

* [{{ site.framework }} ListBox Demos](https://demos.telerik.com/{{ site.platform }}/listbox)

{% if site.core %}
* [{{ site.framework }} ListBox Product Page](https://www.telerik.com/aspnet-core-ui/listbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ListBox Product Page](https://www.telerik.com/aspnet-mvc/listbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ListBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)
* [Server-Side API Reference of the ListBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/listbox)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
