---
title: Serialization and Deserialization
page_title: Serialization and Deserialization
description: "Learn how to control the serializing and deserializing behavior of the Telerik UI Editor component for {{ site.framework }}."
components: ["editor"]
slug: htmlhelpers_editor_serialize_aspnetcore
position: 6
---

# Serialize and Deserialize Content

The Editor component allows you to configure and apply custom definitions for serializing and deserializing its content.

## Serializing

The Editor provides the following configuration options:

* `Entities()`&mdash;Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded (`true`).
* `Scripts()`&mdash;Indicates whether inline scripts will be serialized and posted to the server. By default, scripts will be removed (`false`).
* `Semantic()`&mdash;Indicates whether the font styles will be saved as semantic tags (`strong`, `em`, `span`) or as presentational tags (`b`, `i`, `u`, `font`). By default, the Editor uses semantic tags (`true`).
* `Custom()`&mdash;Allows you to define custom serialization for the editable content. The JavaScript handler will receive the Editor content and will return its serialized version.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <serialization entities="true" scripts="true" semantic="true" custom="serializeHandler"/>
    </kendo-editor>

    <script>
        function serializeHandler(html) {
            return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
        }
    </script>
```
{% endif %}

## Deserializing

Deserialization is the process of parsing the HTML string input from the `value()` method or from the `viewHtml` dialog into editable content. The `deserialization` configuration method allows you to use a custom JavaScript handler, as demonstrated in the following example.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <deserialization custom="deserializeHandler"/>
    </kendo-editor>

    <script>
        function deserializeHandler(html) {
            return html.replace(/(<\/?)b(\s?)/, "$1strong$2")
        }
    </script>
```
{% endif %}

## See Also

* [Server-Side API](/api/editor)
