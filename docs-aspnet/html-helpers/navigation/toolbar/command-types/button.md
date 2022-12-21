---
title: Button
page_title: Button ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the Button command type."
slug: htmlhelpers_toolbar_button_aspnetcore
---

# Button ToolBar Command Type

The ToolBar supports and can render the Button as a toolbar command for enabling the user to execute specific actions. You can further configure the Button command type and control its behavior, state, and appearance.

## Supported Options

The Button command type of the ToolBar provides the following methods for further configurations:

* `Text()`&mdash;Sets the text.
* `ShowText()`&mdash;Specifies where the text will be displayed. The possible values are `Toolbar`, `Overflow`, or `Both` (default).
* `Icon()`&mdash;Sets an icon for the item. The icon has to be an existing Kendo UI theme sprite.
* `ImageUrl()`&mdash;If set, the ToolBar will render an image with a specified URL in the button.
* `ShowIcon()`&mdash;Specifies where the button icon will be displayed. The possible values are `Toolbar`, `Overflow`, or `Both` (default).
* `SpriteCssClass()`&mdash;Defines a CSS class (or multiple classes, separated by spaces) which will be used for the button icon.
* `Id()`&mdash;Specifies the ID of the button.
* `Enable()`&mdash;Specifies whether the control is initially enabled or disabled. The default value is `true`.
* `Primary()`&mdash;Specifies whether the button is primary. Primary buttons receive different styling.
* `Overflow()`&mdash;Specifies how the button behaves when the ToolBar is resized. The possible values are `Always`, `Never`, or `Auto` (default).
* `Togglable()`&mdash;Specifies if the button is togglable, for example, has a selected and unselected state.
* `Selected()`&mdash;Specifies if the toggle button is initially selected. Applicable only for buttons with the `Togglable()` method set to `true`.
* `Group()`&mdash;Assigns the button to a group. Applicable only for buttons with the `Togglable()` method set to `true`.

## Configuration of the Button

The following example demonstrates how to configure the properties of the button command type in the ToolBar.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button)
               .Text("Button") 
               .ShowText(ShowIn.Both)
               .Icon("folder-add")
               .SpriteCssClass("myIcon")
               .ImageUrl("../content/btnImage.png")
               .ShowIcon(ShowIn.Toolbar)
               .Id("myButton")
               .Enable(true)
               .Primary(false)
               .Overflow(ShowInOverflowPopup.Auto)
               .Togglable(true)
               .Selected(true)
               .Group("myGroup")
               .Toggle("onToggle")
               .Click("onClick");
        })
    )

    <script>
        function onToggle(e){
            // Handle the toggle event of the Button.
        }
        function onClick(e){
           // Handle the click event of the Button.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item command-type="CommandType.Button" 
                  text="Button"
                  click="onClick"
                  toggle="onToggle"
                  type="CommandType.Button"
                  icon="folder-add"
                  image-url="../content/btnImage.png"
                  sprite-css-class="myIcon"
                  show-icon="ShowIn.Toolbar"
                  id="myButton"
                  enable="true"
                  primary="false"
                  overflow="ShowInOverflowPopup.Auto"
                  togglable="true"
                  selected="true"
                  group="myGroup"
                  show-text="ShowIn.Both">
            </item>
        </toolbar-items>
    </kendo-toolbar>

    <script>
        function onToggle(e){
            // Handle the toggle event of the Button.
        }
        function onClick(e){
           // Handle the click event of the Button.
        }
    </script>

```
{% endif %}

## Overflow of the Button

To control the overflow state of the Button, configure the `Overflow()` method with any of the following values:

* `Always`&mdash;The button will be rendered and displayed only in the command overflow popup.
* `Never`&mdash;The button will be rendered and displayed only in the ToolBar wrapper.
* `Auto`&mdash;The button will be rendered both in the ToolBar wrapper and in the command overflow popup. Depending on the available space in the ToolBar wrapper, it will be displayed in only one of the locations.

> When resizing is enabled, the button will be rendered once in the ToolBar and another time in the command overflow popup. If the button has a set `ID`, it will be assigned to the element in the ToolBar wrapper. The corresponding element in the command overflow popup will receive the same `ID` with an `"_overflow"` suffix. For example, a button with `id: "foo"` and `overflow: "auto"` will render an element with `id="foo"` in the ToolBar and another element with `id="foo_overflow"` in the ToolBar command overflow popup.

The following example demonstrates the properties of the button.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Button 1").Overflow(ShowInOverflowPopup.Auto);
            items.Add().Type(CommandType.Button).Text("Button 2").Overflow(ShowInOverflowPopup.Always);
            items.Add().Type(CommandType.Button).Text("Button 3").Overflow(ShowInOverflowPopup.Never);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button1" overflow="ShowInOverflowPopup.Auto"></item>
            <item type="CommandType.Button" text="Button2" overflow="ShowInOverflowPopup.Always"></item>
            <item type="CommandType.Button" text="Button3" overflow="ShowInOverflowPopup.Never"></item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## Icons and Images

To control the appearance of the Button, use any of the following methods:

* `Icon()`&mdash;The property defines a name of an existing icon from the Kendo UI theme sprite. The icon will be applied as a background image of a `span` element that is rendered inside the Button. For a list of available icon names, refer to the [demo on icons](https://demos.telerik.com/kendo-ui/styling/icons).
* `ImageUrl()`&mdash;The property defines an URL which will be used for an `img` element inside the Button. The `img` element will be rendered automatically by the widget.
* `SpriteCssClass()`&mdash;The property defines one or more CSS classes that are separated by spaces which will be used for applying a background image to a `span` element inside the Button. To use an icon from the Kendo UI theme sprite background image, use the `icon` property.

The following example demonstrates how to use icons in the ToolBar when you set the appearance of the Button.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Button 1").Icon("folder-add");
            items.Add().Type(CommandType.Button).Text("Button 2").ImageUrl("/images/edit-icon.gif");
            items.Add().Type(CommandType.Button).Text("Button 3").SpriteCssClass("myEditIcon");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button1" icon="folder-add"></item>
            <item type="CommandType.Button" text="Button2" image-url="/images/edit-icon.gif"></item>
            <item type="CommandType.Button" text="Button3" sprite-css-class="myEditIcon"></item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)
