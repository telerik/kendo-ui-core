---
title: Immutable Elements
page_title: Immutable Elements | Kendo UI Editor HtmlHelper for ASP.NET Core
description: "Learn how to use immutable elements in the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_immutable_aspnetcore
position: 7
---

# Immutable Elements

The immutable feature enables you to add HTML elements that cannot be edited by the user.

## Enable and Add Immutable Elements

To define the immutable elements in the content area, set the [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable) DOM attribute to `false`. To prevent the user interaction with that element, you also need to enable the [`Immutables()`](/api/Kendo.Mvc.UI.Fluent/EditorBuilder#immutablessystemactionkendomvcuifluenteditorimmutablessettingsbuilder) configuration method.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Immutables(true)
    .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
)
```

## Serialize Immutables

The [`Serialization()`](/api/Kendo.Mvc.UI.Fluent/EditorImmutablesSettingsBuilder#serializationsystemstring) method enables you to control the HTML representation of the immutable elements in the `viewHtml` dialog.

The `immutables.serialization` configuration method accepts the following parameters:

* `String`&mdash;A plain string. Implements an opening and a closing tag of the display representation in the `ViewHtml` dialog.

    ###### Example

    ```
    @(Html.Kendo().Editor()
        .Name("editor")
        .Immutables(i => i
            .Serialization("<div></div>")
        )
        .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
    )
    ```

* [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/overview)&mdash;Contains the immutable `data` DOM element.

    ###### Example

    ```
    (Html.Kendo().Editor()
        .Name("editor")
        .Immutables(i => i
            .Serialization("<#= data.nodeName # data=\"immutable-element\"></#= data.nodeName #>")
        )
        .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
    )
    ```

* `Function`&mdash;A callback function. Exposes the immutable DOM element in the overload and is expected to return a string.

    ###### Example

    ```
    (Html.Kendo().Editor()
        .Name("editor")
        .Immutables(i => i
            .SerializationHandler("immutablesSerializationHandler")
        )
        .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
    )

    <script>
        function immutablesSerializationHandler(node) {
            var tagName = node.tagName;

            return "<" + tagName + ">" + "</" + tagName + ">";
        }
    </script>
    ```

## Deserialize Immutables

The [`Deserialization()`](/api/Kendo.Mvc.UI.Fluent/EditorImmutablesSettingsBuilder#deserializationsystemfuncsystemobjectsystemobject) method does the opposite of the `Serialization()` one. `Deserialization()` takes the HTML representation from the `ViewHtml` dialog and alters the immutable DOM element based on the implemented logic in the callback function.

The following example demonstrates how to use the `Serialization()` and `Deserialization()` options to expose the CSS `text-align` property in the `ViewHtml` dialog so that the user is able to change it from the HTML code.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Immutables(i => i
        .Serialization("<immutable style='# if(data.style.textAlign){#text-align: #=data.style.textAlign##}#'></immutable>")
        .Deserialization("immutablesDeserializationHandler")
    )
    .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
)
<script>
    function immutablesDeserializationHandler(node, immutable) {
        immutable.style.textAlign = node.style.textAlign;
    }
</script>
```

## Apply Default Decoration to Immutables

To decorate all `contenteditable="false"` elements and improve user experience (UX), use a CSS rule.

If you use the [classic mode]({% slug htmlhelpers_editor_modes_aspnetcore %}#classic-mode), add the CSS rule to an external CSS file that is adjoined to the [stylesheet collection]({% slug htmlhelpers_editor_styling_aspnetcore %}) of the Editor.

If you use the [inline mode]({% slug htmlhelpers_editor_modes_aspnetcore %}#inline-mode), place the CSS rule on the page as demonstrated in the following example.

###### Example

```
<style>
    .k-editor [contenteditable='false']{
        opacity: 0.5;
    }
</style>

@(Html.Kendo().Editor()
    .Name("editor")
    .Tag("div")
    .Immutables(true)
    .Value("<div contenteditable='false'>this is immutable</div><div>this is mutable</div>")
)
```

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Styling Content]({% slug htmlhelpers_editor_styling_aspnetcore %})
