---
title: Immutable Elements
page_title: jQuery Editor Documentation | Immutable Elements
description: "Get started with the jQuery Editor by Kendo UI and add HTML elements which cannot be edited by the user."
previous_url: /controls/editors/editor/immutable-elements
slug: immutable_elements_editor_widget
position: 8
---

# Immutable Elements

The immutable feature enables you to add HTML elements that cannot be edited by the user.

## Enabling Immutable Elements

To define the immutable elements in the content area, set the [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable) DOM attribute to `false`. To make the Editor prevent the user from editing this element, you also need to enable the [`immutables`](/api/javascript/ui/editor/configuration/immutables) option.

```dojo
    <textarea id="editor">
        &lt;p&gt;A simple paragraph&lt;/p&gt;
        &lt;p contenteditable=&quot;false&quot;&gt;This paragraph cannot be edited&lt;/p&gt;
        &lt;p&gt;A simple paragraph&lt;/p&gt;
    </textarea>
    <script>
        $("#editor").kendoEditor({
            immutables: true
        });
    </script>
```

## Serializing Immutables

The [`immutables.serialization`](/api/javascript/ui/editor/configuration/immutables.serialization) option enables you to control the HTML representation of the immutable elements in the **viewHtml** dialog.

The `immutables.serialization` configuration option accepts the following parameters:

* `String`&mdash;A plain string that implements an opening and a closing tag of the representation you want to display in the **viewHtml** dialog.

    ```dojo
        <textarea id="editor">
            &lt;p&gt;A simple paragraph&lt;/p&gt;
            &lt;p contenteditable=&quot;false&quot;&gt;This paragraph cannot be edited&lt;/p&gt;
            &lt;p&gt;A simple paragraph&lt;/p&gt;
        </textarea>
        <script>
            $("#editor").kendoEditor({
                tools: [
                    "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
                ],
                immutables: {
                    serialization: "<div></div>"
                    }
                }
            });
        </script>
    ```

* [Kendo UI Template]({%slug overview_kendoui_templatescomponent %})&mdash;In it, the immutable DOM element is `data`.

    ```dojo
        <textarea id="editor">
            &lt;p&gt;A simple paragraph&lt;/p&gt;
            &lt;p contenteditable=&quot;false&quot;&gt;This paragraph cannot be edited&lt;/p&gt;
            &lt;p&gt;A simple paragraph&lt;/p&gt;
        </textarea>
        <script>
            $("#editor").kendoEditor({
                tools: [
                    "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
                ],
                immutables: {
                    serialization: "<#= data.nodeName # data=\"immutable-element\"></#= data.nodeName #>"
                    }
                }
            });
        </script>
    ```

* `Function`&mdash;A callback function that exposes the immutable DOM element in the overload and is expected to return a string.

    ```dojo
        <textarea id="editor">
            &lt;p&gt;A simple paragraph&lt;/p&gt;
            &lt;p contenteditable=&quot;false&quot;&gt;This paragraph cannot be edited&lt;/p&gt;
            &lt;p&gt;A simple paragraph&lt;/p&gt;
        </textarea>
        <script>
            $("#editor").kendoEditor({
                tools: [
                    "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
                ],
                immutables: {
                    serialization: function(node) {
                        var tagName = node.tagName;
                        return "<" + tagName + ">" + "</" + tagName + ">";
                        }
                    }
                }
            });
        </script>
    ```

## Deserializing Immutables

The [`immutables.deserialization`](/api/javascript/ui/editor/configuration/immutables.deserialization) does the opposite of the `immutables.serialization` one&mdash;it takes the HTML representation from the **viewHtml** dialog and alters the immutable DOM element based on the logic implemented in the callback function.

The following example demonstrates how to use the `immutables.serialization` and `immutables.deserialization` options to expose the CSS `text-align` property in the **viewHtml** dialog so that the user is able to change it from the HTML code.

```dojo
    <textarea id="editor">
        &lt;p&gt;A simple paragraph&lt;/p&gt;
        &lt;p contenteditable=&quot;false&quot; style=&quot;text-align:left;&quot; &gt;This paragraph cannot be edited&lt;/p&gt;
        &lt;p&gt;A simple paragraph&lt;/p&gt;
    </textarea>
    <script>
        $("#editor").kendoEditor({
            tools: [
                "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
            ],
            serialization: "<immutable style='# if(data.style.textAlign){#text-align: #=data.style.textAlign##}#'></immutable>",
            deserialization: function (node, immutable) {
                    immutable.style.textAlign = node.style.textAlign;
            }
        });
    </script>
```

## Applying a Default Decoration

To decorate all `contenteditable="false"` elements and improve user experience (UX), use a CSS rule.

* If you use the [classic mode]({% slug overview_kendoui_editor_widget %}#classic-mode), add the CSS rule to an external CSS file adjoined to the [stylesheet collection](/api/javascript/ui/editor/configuration/stylesheets) of the Editor.
* If you use the [inline mode]({% slug overview_kendoui_editor_widget %}#inline-mode), place the CSS rule on the page as demonstrated in the following example.

```dojo
    <style>
    .k-editor [contenteditable='false']{
        opacity: 0.5;
    }
    </style>
    <textarea id="editor">
        &lt;p&gt;A simple paragraph&lt;/p&gt;
        &lt;p contenteditable=&quot;false&quot;&gt;This paragraph cannot be edited&lt;/p&gt;
        &lt;p&gt;A simple paragraph&lt;/p&gt;
    </textarea>
    <script>
        $("#editor").kendoEditor({
            immutables: true
        });
    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
