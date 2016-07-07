---
title: Immutable Elements
page_title: Immutable Elements | Kendo UI Editor
description: "Immutable feature enables you to add HTML elements that cannot be edited by the user in Kendo UI Editor widget."
slug: immutable_elements_editor_widget
position: 7
---

# Immutable Elements

You can learn here how to enable and use the **Immutables** feature of **Kendo UI Editor** widget. 

## Enable `immutables` and Add an Immutable Element

Immutable elements in the content area are defined by setting the DOM attribute [contenteditable](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable) to `false`. In order to configure **Kendo Editor** to prevent user from editing this element you should also enable the [immutables](/api/javascript/ui/editor#configuration-immutables) option.

###### <a name="example-1"></a>[Example](#example-1)

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
````

## Using immutables.serialization Option

The [immutables.serialization](/api/javascript/ui/editor#configuration-immutables.serialization) option enables you to control the HTML representation of the immutable elements in the **viewHtml** dialog.

This option can accept:
* `String`—plain string that implements an opening and closing tag of the representation you would like to see in the **viewHtml** dialog.

    ###### <a name="example-2"></a>[Example](#example-2)

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
    ````

* [Kendo Template]({%slug overview_kendoui_templatescomponent%})—where `data` is the immutable DOM element.

    ###### <a name="example-3"></a>[Example](#example-3)

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
    ````

* `Function`—callback function that exposes the immutable DOM element in the overload and should return string. 

    ###### <a name="example-4"></a>[Example](#example-4)

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
    ````

## Using immutables.deserialization Option

The [immutables.deserialization](/api/javascript/ui/editor#configuration-immutables.deserialization) does the opposit of the `immutables.serialization` one—it takes the HTML representation from the **viewHtml** dialog and alters the immutable DOM element based on the logic implemented in the callback function.

In the following example you can see how to use the `immutables.serialization` and `immutables.deserialization` options to expose the CSS `text-align` property in the **viewHtml** dialog so that users can change it from the HTML code.

###### <a name="example-5"></a>[Example](#example-5)

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
````

## How to Apply Default Decoration to the Immutable Elements

You can put a CSS rule that decorates all `contenteditable="false"` elements in order to improve UX. 

If you are using [Classic mode]({%slug overview_kendoui_editor_widget%}#classic-mode) you can add it in an external CSS file added to the [editor's stylesheet collection](/api/javascript/ui/editor#onfiguration-stylesheets). And if you are using [Inline mode]({%slug overview_kendoui_editor_widget%}#inline-mode) you can just place it in the page as shown in the following example.

###### <a name="example-6"></a>[Example](#example-6)

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
````
 
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