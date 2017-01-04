---
title: Immutable Elements
page_title: Immutable Elements | Kendo UI Editor
description: "The immutable feature enables you to add HTML elements which cannot be edited by the user to a Kendo UI Editor."
slug: immutable_elements_editor_widget
position: 7
---

# Immutable Elements

The immutable feature enables you to add HTML elements that cannot be edited by the user.

## Configuration

### Enable and Add Immutable Elements

To define the immutable elements in the content area, set the [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable) DOM attribute to `false`. To make the Editor prevent the user from editing this element, you also need to enable the [`immutables`](/api/javascript/ui/editor#configuration-immutables) option.

###### Example

```html
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

### Serialize Immutables

The [`immutables.serialization`](/api/javascript/ui/editor#configuration-immutables.serialization) option enables you to control the HTML representation of the immutable elements in the **viewHtml** dialog.

The `immutables.serialization` configuration option accepts the following parameters:

* `String`&mdash;This plain string implements an opening and a closing tag of the representation you want to display in the **viewHtml** dialog.

    ###### Example

    ```html
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

    ###### Example

    ```html
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

* `Function`&mdash;This callback function exposes the immutable DOM element in the overload and is expected to return a string.

    ###### Example

    ```html
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

### Deserialize Immutables

The [`immutables.deserialization`](/api/javascript/ui/editor#configuration-immutables.deserialization) does the opposite of the `immutables.serialization` one&mdash;it takes the HTML representation from the **viewHtml** dialog and alters the immutable DOM element based on the logic implemented in the callback function.

The following example demonstrates how to use the `immutables.serialization` and `immutables.deserialization` options to expose the CSS `text-align` property in the **viewHtml** dialog so that the user is able to change it from the HTML code.

###### Example

```html
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

### Apply Default Decoration to Immutables

To decorate all `contenteditable="false"` elements and improve user experience (UX), use a CSS rule.

If you use the [classic mode]({% slug overview_kendoui_editor_widget %}#classic-mode), add the CSS rule to an external CSS file adjoined to the [stylesheet collection](/api/javascript/ui/editor#configuration-stylesheets) of the Editor.

If you use the [inline mode]({% slug overview_kendoui_editor_widget %}#inline-mode), place the CSS rule on the page as demonstrated in the following example.

###### Example

```html
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

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
