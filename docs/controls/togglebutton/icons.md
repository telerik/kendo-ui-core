---
title: Icons
page_title: Icons
description: "Accommodate an icon and enhance the meaning of the text content of the Kendo UI ToggleButton widget for jQuery."
components: ["togglebutton"]
slug: icons_kendoui_togglebutton
position: 2
---

# Icon ToggleButton

The ToggleButton can accommodate an icon which enhances the meaning of the text content.

The ToggleButton provides the following methods for configuring icons:

* [`icon`](#icon)&mdash;Defines a name of an existing icon in the Kendo UI theme sprite.
* [`spriteCssClass`](#spriteclass)&mdash;Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a span element inside the ToggleButton. 
* [`imageUrl`](#imageicons)&mdash;Defines a URL, which will be used for an `img ` element inside the ToggleButton. 
* [`iconClass`](#iconclass)&mdash;Defines a CSS class or multiple classes which are applied to a span element inside the ToggleButton.

Use only one of them with a particular ToggleButton instance. If you define multiple properties, only one of them will be obeyed according to the order stated above.

### Icon

The `icon` configuration displays the appropriate SVG Icon as a content of a `<span>` pseudo element. The ToggleButton enables you to completely omit any text to be specified for its contents.

```dojo
    <button id="button" type="button">Cancel</button>
    <script>
    $("#button").kendoButton({
        icon: "cancel"
    });
    </script>
```

### IconClass

Alternatively to the `icon` configuration, you can use the `iconClass` configuration to set a custom icon. It accepts a CSS class (or multiple space-separated CSS classes).

```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
	<button id="button" type="button"></button>
    <script>
        $("#button").kendoButton({
            icon: "fa fa-magic"
        });
    </script>
```

### SpriteClass

The `spriteCssClass` configuration  displays the icon as a background of a `span` element instead.

```
    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            spriteCssClass: "myEditIcon"
        });
    </script>
```

### ImageIcons

Image icons are applied by using the `imageUrl` configuration and are displayed as an `img` element.

```
    <button id="button" type="button">
        <img class="k-image" alt="Edit" /> Edit
    </button>
    <script>
        $("#button").kendoButton({
            imageUrl: "/images/edit-icon.gif"
        });
    </script>
```

## See Also

* [Adding Images to the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/images)