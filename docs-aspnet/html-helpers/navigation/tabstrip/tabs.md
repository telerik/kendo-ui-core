---
title: Tabs
page_title: Tabs
description: "Configure the tabs of the Telerik UI TabStrip component for {{ site.framework }}."
slug: htmlhelpers_tabstrip_aspnetcore_tabs
position: 2
---

# Tabs

The TabStrip provides advanced options for configuring its tabs.

## Tabs Positioning

The TabStrip API provides the [`TabPosition`](/api/kendo.mvc.ui.fluent/tabstripbuilder#tabpositionkendomvcuitabstriptabposition) configuration option that allows you to set the position of the tabs. You can position the tabs to the top, left, right or bottom of the TabStrip via the [`TabStripTabPosition`](/api/kendo.mvc.ui/tabstriptabposition)

The following example demonstrates how to position the TabStrip tabs to the right:

```HtmlHelper
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .TabPosition(TabStripTabPosition.Right)
        .Items(items =>
        {
            items.Add().Text("One")
                .Content(@<text>
                    <p>Tab One</p>
                </text>);
            items.Add().Text("Two")
                .Content(@<text>
                    <p>Tab Two</p>
                </text>);
            items.Add().Text("Three")
                .Content(@<text>
                    <p>Tab Three</p>
                </text>);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip" tab-position="right">
        <items>
            <tabstrip-item text="One">
                <content>
                    <p>Tab One</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Two">
                <content>
                    <p>Tab Two</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Three">
                <content>
                    <p>Tab Three</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## Dynamic Tabs

The TabStrip API provides methods for dynamically adding or removing TabStrip bars.

1. Get a reference to the TabStrip widget in JavaScript.
1. Provide the new item as a JSON object along with a reference item. A reference item is a target HTML `tab` element that already exists in the TabStrip. The reference item will be used to determine the exact position of the new tab. To get a reference to the target item, you can use any valid jQuery selector.

The following example demonstrates how to add a new TabStrip tab and position it after the first existing tab.

```HtmlHelper
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Paris")
                .Content(@<text>
                    <p>Rainy weather in Paris.</p>
                </text>);

            tabstrip.Add().Text("Sofia").Selected(true)
                .Content(@<text>
                    <p>Sunny weather in Sofia.</p>
                </text>);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip" tab-position="@TabStripTabPosition.Right">
        <items>
            <tabstrip-item text="Paris">
                <content>
                    <div class="weather">
                        <p>Rainy weather in Paris.</p>
                    </div>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Sofia" selected="true">
                <content>
                    <div class="weather">
                        <p>Sunny weather in Sofia.</p>
                    </div>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}
```JS script
    <script>
        var tabstrip = $("#tabstrip").data("kendoTabStrip");

        tabstrip.insertAfter(
            {
                text: 'Sydney',
                content: '<p>Rainy weather in Sidney.</p>'
            },
            tabstrip.tabGroup.children("li:first")
        );
    </script>
```

## Scrollable Tabs

The TabStrip supports scrollable `top` and `bottom` tabs through `TabPosition()`. During initialization, the TabStrip checks if the tabs fit in the available horizontal space and if not, renders scroll buttons on the sides. By default, the scrollable tabs are enabled. To disable them, use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable) method of the Kendo UI for jQuery widget.

If the TabStrip has no fixed width and is placed in a fluid layout, it can re-check whether tab scrolling is necessary or no longer required. To enable this option, execute the [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/resize) method of the Kendo UI TabStrip for jQuery upon `window.resize`. The `resize` method will also render the right scroll button if the last and selected tab becomes invisible as a result of TabStrip shrinking.

```HtmlHelper
    <div style="width: 150px;">
        @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Scrollable(false)
            .Items(tabstrip =>
            {
                tabstrip.Add().Text("Paris").Selected(true)
                    .Content(@<text>
                        <p>Rainy weather in Paris.</p>
                    </text>);

                tabstrip.Add().Text("Sofia")
                    .Content(@<text>
                        <p>Sunny weather in Sofia.</p>
                    </text>);
            })
        )
    </div>
```
{% if site.core %}
```TagHelper
    <div style="width: 150px;">
        <kendo-tabstrip name="tabstrip">
            <scrollable enabled="false" />
            <items>
                <tabstrip-item text="Paris" selected="true">
                    <content>
                        <div class="weather">
                            <p>Rainy weather in Paris.</p>
                        </div>
                    </content>
                </tabstrip-item>
                <tabstrip-item text="Sofia">
                    <content>
                        <div class="weather">
                            <p>Sunny weather in Sofia.</p>
                        </div>
                    </content>
                </tabstrip-item>
            </items>
        </kendo-tabstrip>
    </div>
```
{% endif %}

## Sortable Tabs

You can sort the TabStrip tabs by dragging and dropping the tabs into the desired position. To enable this feature, set the `Sortable()` option to `true`{% if site.core %} or add the `sortable` attribute to the component's tag when using the TagHelper mode{% endif %}.

The following example demonstrates how to enable sortable functionality, which is disabled by default.

```HtmlHelper
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Sortable(true)
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Paris")
            .Content(@<text>
                <p>Rainy weather in Paris.</p>
            </text>);

            tabstrip.Add().Text("Sofia")
            .Content(@<text>
                <p>Sunny weather in Sofia.</p>
            </text>);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip" sortable="true">
        <items>
            <tabstrip-item text="Paris">
                <content>
                    <p>Rainy weather in Paris.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Sofia">
                <content>
                    <p>Sunny weather in Sofia.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## Tabs Appearance

You can add HTML code into the item's `Text()` method to customize the appearance of the tab. Disable the `Encoded()` option to ensure that the HTML will render correctly.

The following example showcases how to add a button element inside a specified tab of the TabStrip.

```HtmlHelper
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add()
            .Text("<button id='tab1Btn' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button' type='button' onclick='tabBtnClick();'>Read more</button>")
            .Encoded(false)
            .Selected(true)
            .Content(@<text>
                <p>Rainy weather in Paris.</p>
            </text>);

            tabstrip.Add().Text("Sofia")
            .Content(@<text>
                <p>Sunny weather in Sofia.</p>
            </text>);
        })
    )

    <script>
        function tabBtnClick() {
            // Handle the button 'click' event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item selected="true" encoded="false" text="<button id='tab1Btn' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button' type='button' onclick='tabBtnClick();'>Read more</button>">
                <content>
                    <p>Rainy weather in Paris.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Sofia">
                <content>
                    <p>Sunny weather in Sofia.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>

    <script>
        function tabBtnClick() {
            // Handle the button 'click' event.
        }
    </script>
```
{% endif %}

## Closable Tabs

Use the `Closable` property to create closable tabs in the {{site.framework}} TabStrip component. When enabled for the entire component, every tab shows a **close** icon which hides the tab from view and removes it from the TabStrip. You can also control the closable behavior individually by setting the `closable` option for the respective tab. The default value is `false`.

```HtmlHelper
    @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Items(tabstrip =>
            {
                 tabstrip.Add().Text("New Folder (Closable)")
                 .Icon("folder-add")
                 .IconPosition(IconPosition.Before)
                 .Closable(true)
                 .Content("New Folder Content");
            })
        .SelectedIndex(0)
        )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item icon="folder-add" icon-position="IconPosition.Before" text="New Folder (Closable)" closable="true">
                <content>
                    New Folder Content
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## Disabled Tabs

You can leverage the `Enable` property to specify whether a given tab should be enabled or disabled. Disabled tabs cannot be selected or focused and are displayed with a different visual style. The default value is `true`.

```HtmlHelper
    @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Items(tabstrip =>
            {
                  tabstrip.Add().Text("Delete User (Disabled)")
                  .Icon("x-outline")
                  .Enabled(false)
                  .Content("Delete User Content");
            })
        .SelectedIndex(0)
        )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item icon="x-outline" text="Delete User (Disabled)" enabled="false">
                <content>
                    Delete User Content
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## Tabs Icons

The TabStrip component provides built-in icons for each of its tabs. The icon is rendered inside the tab element.  You can use the name for an existing icon in a theme or SVG content. Check the [full list of Telerik icons](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/) for all the available icons.

Use the `IconPosition` property to set the position of the icon relative to the tab text. Possible values are "IconPosition.Before" and "IconPosition.After".

Use the `IconClass` setting to apply a custom CSS class to the icon element, allowing you to style it further.

```HtmlHelper
    @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Items(tabstrip =>
            {
                 tabstrip.Add().Text("Privileges (Larger Icon)")
                 .Icon("security-lock-solid")
                 .IconPosition(IconPosition.After)
                 .IconClass("larger-icon")
                 .Content("Privileges Content");
            })
        .SelectedIndex(0)
        )
        <style>
           .larger-icon {
              scale: 1.5;
           }
         </style>
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item icon="security-lock-solid" icon-position="IconPosition.After" icon-class="larger-icon" text="Privileges (Larger Icon)">
                <content>
                    Privileges Content
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
    <style>
         .larger-icon {
             scale: 1.5;
         }
     </style>
```
{% endif %}

## Tab Actions

Use the TabStrip `Actions` configuration to define a collection of action buttons that are rendered in the tab. The actions buttons are rendered as part of the tab and can be used to provide additional functionality beyond the built-in close button.

Each action can be further customized with icons, attributes and a handler function that will be executed when the action is clicked.

```HtmlHelper
    @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Items(tabstrip =>
            {
                 tabstrip.Add().Text("Account")
                 .Icon("user-outline")
                 .Actions(actions =>
                 {
                     actions.Add().Icon("envelope").Action("sendMessage").HtmlAttributes(new { title = "Send Message" });
                     actions.Add().Icon("zoom-in").Action("zoomIn").HtmlAttributes(new { title = "Zoom In" });
                      actions.Add().Icon("zoom-out").Action("zoomOut").HtmlAttributes(new { title = "Zoom Out" });
                   })
                  .Content("Account Content");
            })
           .SelectedIndex(0)
        )
       <script>
         function sendMessage(e){
             alert("Message Sent!");
         }
        function zoomIn(e){
              $(".k-tabstrip-content.k-active").css("zoom",parseFloat($(".k-tabstrip-content.k-active").css("zoom"))+0.2);
          }
        function zoomOut(e){
              $(".k-tabstrip-content.k-active").css("zoom",parseFloat($(".k-tabstrip-content.k-active").css("zoom"))-0.2);
         }
       </script>
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item icon="user-outline" icon-position="IconPosition.After" icon-class="larger-icon" text="Account">
                <content>
                    Account Content
                </content>
                <tabstrip-item-actions>
                    <tabstrip-item-action icon="envelope" action-handler="sendMessage" html-attributes='new Dictionary<string, object>{ ["title"] = "Send Message" }'></tabstrip-item-action>
                    <tabstrip-item-action icon="zoom-in" action-handler="zoomIn" html-attributes='new Dictionary<string, object>{ ["title"] = "Zoom In" }'></tabstrip-item-action>
                    <tabstrip-item-action icon="zoom-out" action-handler="zoomOut" html-attributes='new Dictionary<string, object>{ ["title"] = "Zoom In" }'></tabstrip-item-action>
                </tabstrip-item-actions>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
    <script>
         function sendMessage(e){
             alert("Message Sent!");
         }
        function zoomIn(e){
              $(".k-tabstrip-content.k-active").css("zoom",parseFloat($(".k-tabstrip-content.k-active").css("zoom"))+0.2);
          }
        function zoomOut(e){
              $(".k-tabstrip-content.k-active").css("zoom",parseFloat($(".k-tabstrip-content.k-active").css("zoom"))-0.2);
         }
    </script>
```
{% endif %}

## Selecting Tab on Initial Load

You can select a tab and display its associated content upon the initial load of the TabStrip.

To select a tab on initial load, apply either of the following approaches:
* Use the `Selected()` configuration option on the required tab.
* Use the `SelectedIndex()` configuration method on the TabStrip HTML helper.

The following example demonstrates how to use the `Selected()` configuration method.

```HtmlHelper
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Paris")
                .Content(@<text>
                    <p>Rainy weather in Paris.</p>
                </text>);

            tabstrip.Add().Text("Sofia").Selected(true)
                .Content(@<text>
                    <p>Sunny weather in Sofia.</p>
                </text>);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item text="Paris">
                <content>
                    <div class="weather">
                        <p>Rainy weather in Paris.</p>
                    </div>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Sofia" selected="true">
                <content>
                    <div class="weather">
                        <p>Sunny weather in Sofia.</p>
                    </div>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## See Also

* [Scrollable Tabs by the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/scrollable-tabs)
* [Sortable Tabs by the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/sortable-tabs)
* [Tab Position in the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/tab-position)
* [Server-Side API](/api/tabstrip)
