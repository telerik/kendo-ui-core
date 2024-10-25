---
title: Implementing 'moveTop' and 'moveBottom' Custom Tools
description: An example on how to create custom tools that move the selected item to the top or the bottom of the options when using the Telerik UI for {{ site.framework }} ListBox.
type: how-to
page_title: Implementing 'moveTop' and 'moveBottom' Custom Tools of the ListBox
slug: listbox-move-top-bottom-tools
tags: listbox, custom, tools, moveTop, moveBottom, toolbar, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} ListBox</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description

How can I create custom tools (*moveTop* and *moveBottom*) that move the selected option at the top or the bottom of all ListBox options?

## Solution

The ListBox supports [`MoveUp()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/listboxtoolfactory#moveup) and [`MoveDown()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/listboxtoolfactory#movedown) that move up and down the selected option. To create tools that move the option to the top or the bottom of the options list, follow the steps below:

1. Create two buttons and handle their [`Click`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/buttoneventbuilder#clicksystemstring) events.
1. Get a reference to the ListBox and use the client-side API methods [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/methods/select) and [`reorder()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/methods/reorder) to get the selected item and move it to the respective position.
1. To render the "moveTop" and "moveBottom" buttons within the toolbar, handle the `DataBound` event of the ListBox and use the jQuery [`append()`](https://api.jquery.com/append/) method to append each button in the `k-listbox-actions` element.

    ```HtmlHelper
      @(Html.Kendo().ListBox()
            .Name("listBox")
            .Toolbar(toolbar =>
            {
                toolbar.Position(ListBoxToolbarPosition.Right);
                toolbar.Tools(tools => tools
                    .MoveUp()
                    .MoveDown()
                    .Remove()
                );
            })
            .Events(ev => ev.DataBound("onDataBound"))
            ...
        )

        @(Html.Kendo().Button()
            .Name("moveToTop")
            .Icon("chevron-double-up")
            .Content("<span class='k-icon' title='Move Top'></span>")
            .Events(ev => ev.Click("onClickTop"))
        )

        @(Html.Kendo().Button()
            .Name("moveToBottom")
            .Icon("chevron-double-down")
            .Content("<span class='k-icon' title='Move Bottom'></span>")
            .Events(ev => ev.Click("onClickBottom"))
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @{
            var tools = new string[] { "moveUp", "moveDown", "remove" };
        }

        <kendo-listbox name="listBox">
            <toolbar position="ListBoxToolbarPosition.Right" tools="tools"/>
            <!-- Other configuration -->
        </kendo-listbox>

        <kendo-button name="moveToTop" icon="chevron-double-up" on-click="onClickTop">
            <span class='k-icon' title='Move Top'></span>
        </kendo-button>

        <kendo-button name="moveToBottom" icon="chevron-double-down" on-click="onClickBottom">
            <span class='k-icon' title='Move Bottom'></span>
        </kendo-button>
    ```
    {% endif %}
    ```Script
        <script>
            function onClickTop() {
                var listBox = $("#listBox").data("kendoListBox");
                var selectedItems = listBox.select(); // Get the selected item element.

                if (selectedItems.length > 0) {
                    listBox.reorder(selectedItems[0], 0); // Move it at position 1 (index 0).
                }
            }

            function onClickBottom() {
                var listBox = $("#listBox").data("kendoListBox");
                var selectedItems = listBox.select(); // Get the selected item element.
                var items = listBox.items(); // Get all ListBox items.

                if (selectedItems.length > 0) {
                    listBox.reorder(selectedItems[0], (items.length - 1)); // Move it at the last position.
                }
            }

            function onDataBound() {
                $(".k-listbox-actions").append($("#moveToTop"));
                $(".k-listbox-actions").append($("#moveToBottom"));
            }
        </script>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the ListBox HtmlHelper](https://netcorerepl.telerik.com/wdvOwZkB33pJMjAn16)
* [Sample code with the ListBox TagHelper](https://netcorerepl.telerik.com/QxbYGZYh37p6TeCB04)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on creating "moveTop" and "moveBottom" custom tools for the ListBox](https://netcorerepl.telerik.com/wdvOwZkB33pJMjAn16).
{% endif %}

## More {{ site.framework }} ListBox Resources

* [{{ site.framework }} ListBox Documentation]({%slug htmlhelpers_listbox_aspnetcore%})

* [{{ site.framework }} ListBox Demos](https://demos.telerik.com/{{ site.platform }}/listbox/index)

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the ListBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/listbox)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

