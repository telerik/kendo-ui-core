---
title: Serialize and Deserialize
page_title: Serialize and Deserialize Content | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to control the serialize / deserialize behavior of the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_serialize_aspnetcore
position: 5
---

# Serialize and Deserialize Content

The Editor HTML helper allows configuration and custom definition for both serialization and deserialization of its content.

## Serialize Content

The serialization options in the Editor could be configured in the following manner:

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Serialization(s => s
        .Entities(true)
        .Scripts(true)
        .Semantic(true)
        .Custom("serializeHandler")
    )
)

<script>
    function serializeHandler(html) {
        return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
    }
</script>
```

The available configuration options allow the following:

* `Entities()` - Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded (`true`).
* `Scripts()` - Indicates whether inline scripts will be serialized and posted to the server. By default scripts will be removed (`false`).
* `Semantic()` - Indicates whether the font styles will be saved as semantic (strong / em / span) tags, or as presentational (b / i / u / font) tags. By default semantic tags are used (`true`).
* `Custom()` - Allows you to define custom serialization for the editable content. The JavaScript handler will receive the Editor content and should return its serialized version.

## Deserialize Content

Deserialization is the process of parsing the HTML string input from the value() method or from the viewHtml dialog into editable content. The deserialization configuration method allows the use of a custom JavaScript handler. Such scenario is demonstrated on the example below:

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Deserialization(ds => ds
        .Custom("deserializeHandler")
    )
}

<script>
    function deserializeHandler(html) {
        return html.replace(/(<\/?)b(\s?)/, "$1strong$2")
    }
</script>
```

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [Styling Content]({% slug htmlhelpers_editor_styling_aspnetcore %})