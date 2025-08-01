---
title: Editor
page_title: Configuration, methods and events of Kendo UI Editor
description: Help guide for proper configuration of Editor UI widget, and how to use methods and events.
res_type: api
component: editor
---

# kendo.ui.Editor

Represents the Kendo UI Editor widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### ai `Object`

Defines the configuration options for the AI tools in the Editor.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
          url: "/api/llm"
        }
      }
    });
    </script>

### ai.aiPrompt `Object|Boolean`

Defines the configuration options for the side panel AI Prompt tool in the Editor. If set to `false`, the side panel AI Prompt tool is disabled.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          // configuration options for the AI prompt
        }
      }
    });
    </script>

### ai.aiPrompt.systemPrompt `Function`
Defines the system prompt for the side panel AI Prompt tool. The function accepts the following arguments:

- `context` - The selected text in the editor.
- `prompt` - The user prompt.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          systemPrompt: (context, prompt) => `You are an advanced AI language assistant.
                                A user has selected a portion of their text and provided a query regarding how they want it modified.
                                Your task is to accurately respond to their request while preserving the original intent of the text.
                                Follow the instructions strictly and provide only the requested output unless explicitly asked to explain your changes.

                                Selected Text:
                                ${context}

                                User's Request:
                                ${prompt}

                                Response:`
        }
      }
    });
    </script>

### ai.aiPrompt.commands `Array`

Defines the commands for the side panel AI Prompt tool. The commands are displayed in the side panel AI Prompt dropdown.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          commands: [
            {
              id: "1",
              text: "Make the text funnier",
              icon: "star",
              prompt: (context) => `Make the following text funnier: ${context}`
            }
          ]
        }
      }
    });
    </script>

### ai.aiPrompt.commands.text `String`

The text of the command.

### ai.aiPrompt.commands.id `String`

The id of the command.

### ai.aiPrompt.commands.icon `String`

The icon of the command.

### ai.aiPrompt.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The text in the editor.

### ai.aiPrompt.promptSuggestions `Array`

Defines the suggestions for the side panel AI Prompt tool. The suggestions are displayed in the side panel AIPrompt tool.


### ai.aiPrompt.commands `Array`

Defines the shared fast commands for the side panel AI Prompt tool and the inline popup prompt tool. The commands are displayed in the side panel AI Prompt view and the context menu of the inline popup tool.

The commands can be configured separately in the `ai.aiPrompt.commands` and `ai.inlineAIPrompt.commands` properties.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        commands: [
          {
            id: "1",
            text: "Make the text funnier",
            icon: "star",
            prompt: (context) => `Make the following text funnier: ${context}`
          }
        ]
      }
    });
    </script>

### ai.commands.text `String`

The text of the command.

### ai.commands.id `String`

The id of the command.

### ai.commands.icon `String`

The icon of the command.

### ai.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The text in the editor.

### ai.inlineAIPrompt `Object|Boolean`

Defines the configuration options for the inline AI Prompt tool in the Editor. If set to `false`, the inline AI Prompt tool is disabled.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          // configuration options
        }
      }
    });
    </script>

### ai.inlineAIPrompt.systemPrompt `Function`
Defines the system prompt for the inline AI Prompt tool. The function accepts the following arguments:

- `context` - The selected text in the editor.
- `prompt` - The user prompt.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          systemPrompt: (context, prompt) => `You are an advanced AI language assistant.
                                A user has selected a portion of their text and provided a query regarding how they want it modified.
                                Your task is to accurately respond to their request while preserving the original intent of the text.
                                Follow the instructions strictly and provide only the requested output unless explicitly asked to explain your changes.


          Selected Text:
                                ${context}


          User's Request:
          ${prompt}

          Response:`
        }
      }
    });
    </script>

### ai.inlineAIPrompt.commands `Array`

Defines the commands for the inline AI Prompt tool. The commands are displayed in the inline AI Prompt dropdown.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          commands: [
            {
              id: "funnier",
              text: "Make the text funnier",
              icon: "star",
              prompt: (context) => `Make the following text funnier: ${context}`
            }
          ]
        }
      }
    });
    </script>

### ai.inlineAIPrompt.commands.text `String`

The text of the command.

### ai.inlineAIPrompt.commands.id `String`

The id of the command.

### ai.inlineAIPrompt.commands.icon `String`

The icon of the command.

### ai.inlineAIPrompt.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The selected text in the editor.

### ai.pane `Object`

Defines the configuration options for the Splitter Pane containing the side panel AI Prompt. This allows you to control the pane's size, minimum size, collapsibility, and collapsed state.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        pane: {
          min: "370px",
          size: "370px",
          collapsible: true,
          collapsed: true
        }
      }
    });
    </script>

### ai.pane.min `String`

Sets the minimum size of the pane.

### ai.pane.size `String`

Sets the size of the pane.

### ai.pane.collapsible `Boolean`

Enables the collapsibility of the pane.

### ai.pane.collapsed `Boolean`

Sets the collapsed of the pane.

### ai.service `String|Object`

The URL of the AI service to use for generating outputs.

#### Example
    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: "/api/llm"
      }
    });
    </script>

### ai.service.url `String`
The Url of the AI service to use for generating outputs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
          url: "/api/llm"
        }
      }
    });
    </script>


### ai.service.headers `Object`

The headers to send with the AI service request.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            headers: {
                "Authorization": "Bearer token"
            }
        }
      }
    });
    </script>

### ai.service.data `Object|Function`

The data to send with the AI service request.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            data: {
                "key": "value"
            }
        }
      }
    });
    </script>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            data: function(prompt, isRetry, history) {
                return {
                    "messages": [{
                        type: messageTypes.user,
                        text: prompt
                    }],
                    "key": "value"
                }
            }
        }
      }
    });
    </script>

### ai.service.outputGetter `Function`

The function to get the output from the AI service response.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            outputGetter: function(response) {
                return response.output;
            }
        }
      }
    });
    </script>

### deserialization `Object`

Fine-tune deserialization in the Editor widget. Deserialization is the process of parsing the HTML string input from the value() method or from the viewHtml dialog into editable content.

### deserialization.custom `Function`

Callback that allows custom deserialization to be plugged in. The method accepts string as the only parameter and is expected to return the modified content as string as well.

#### Example

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            deserialization: {
                custom: function(html) {
                    return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
                }
            }
        });
    </script>

### domain `String`

Relaxes the same-origin policy when using the iframe-based editor.
This is done automatically for all cases except when the policy is relaxed by document.domain = document.domain.
In that case, this property must be used to allow the editor to function properly across browsers.
This property has been introduced in internal builds after 2014.1.319.

#### Example

    <textarea id="editor"></textarea>
    <script>
    document.domain = document.domain;

    $("#editor").kendoEditor({
      domain: document.domain
    });
    </script>

### encoded `Boolean` *(default: true)*

Indicates whether the Editor should submit encoded HTML tags. By default, the submitted value is encoded.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "<p>foo</p>",
      encoded: false
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").val()); // logs "<p>foo</p>"
    </script>

### immutables `Boolean|Object` *(default: false)*

If enabled, the editor disables the editing and command execution in elements marked with editablecontent="false" attribute.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: true
    });
    </script>

### immutables.deserialization `Function`

Callback that allows custom deserialization of an immutable element. The callback accepts two arguments. The DOM element representing the immutable element in the html view and the immutable DOM element, which will be restored.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">editable content</p>',
      immutables: {
        deserialization: function(node, immutable) {
          immutable.style.backgroundColor = "red";
        }
      }
    });
    </script>

### immutables.serialization `String|Function`

Kendo template or a callback that allows custom serialization of an immutable element. The callback accepts DOM element as only parameter and is expected to return the HTML source of a DOM element.

#### Example - specify serialization as a kendo template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: {
          serialization: "<#= data.nodeName # data=\"immutable-element\"></#= data.nodeName #>"
      }
    });
    </script>

#### Example - specify serialization as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: {
        serialization: function(node) {
          var tagName = node.tagName;
          return "<" + tagName + ">" + "</" + tagName + ">";
        }
      }
    });
    </script>

### inlineHeight `Number`

This property enables you to configure height for the Editor when the component is in [`inline`](https://demos.telerik.com/kendo-ui/editor/inline-editing) mode.

> This configuration is required when you want to use the `formattingMarks` tool in an inline editor.

    <div id="editor">
        <h2>
            Comprehensive HTML5/JavaScript framework <br />
            for modern web and mobile app development
        </h2>
        <p>
            Kendo UI is everything professional developers need
            to build HTML5 sites and mobile apps. Today, productivity
            of an average HTML/jQuery developer is hampered by
            assembling a Frankenstein framework of disparate
            JavaScript libraries and plug-ins.
        </p>
        <p>
            Kendo UI has it all: rich jQuery-based widgets,
            a simple and consistent programming interface,
            a rock-solid DataSource, validation, internationalization,
            a MVVM framework, themes, templates and the list goes on.
        </p>
    </div>

    <script>
      $("#editor").kendoEditor({
        inlineHeight: 200
      });
    </script>

### messages `Object`

Defines the text of the labels that are shown within the editor. Used primarily for localization.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        strikethrough: "Strikethrough",
        superscript: "Superscript",
        subscript: "Subscript",
        justifyCenter: "Center text",
        justifyLeft: "Align text left",
        justifyRight: "Align text right",
        justifyFull: "Justify",
        insertUnorderedList: "Insert unordered list",
        insertOrderedList: "Insert ordered list",
        indent: "Indent",
        outdent: "Outdent",
        createLink: "Insert hyperlink",
        unlink: "Remove hyperlink",
        insertImage: "Insert image",
        insertFile: "Insert file",
        insertHtml: "Insert HTML",
        fontName: "Select font family",
        fontNameInherit: "(inherited font)",
        fontSize: "Select font size",
        fontSizeInherit: "(inherited size)",
        formatBlock: "Format",
        formatting: "Format",
        style: "Styles",
        viewHtml: "View HTML",
        overwriteFile: "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
        imageWebAddress: "Web address",
        imageAltText: "Alternate text",
        fileWebAddress: "Web address",
        fileTitle: "Title",
        linkWebAddress: "Web address",
        linkText: "Text",
        linkToolTip: "ToolTip",
        linkOpenInNewWindow: "Open link in new window",
        dialogInsert: "Insert",
        dialogUpdate: "Update",
        dialogCancel: "Cancel",
        dialogCancel: "Cancel",
        createTable: "Create table",
        addColumnLeft: "Add column on the left",
        addColumnRight: "Add column on the right",
        addRowAbove: "Add row above",
        addRowBelow: "Add row below",
        deleteRow: "Delete row",
        deleteColumn: "Delete column"
      }
    });
    </script>


### messages.accessibilityTab `String` *(default: 'Advanced')*

The title of the tab containing advanced and accessibility configurations in the Table Wizard dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        accessibilityTab: "Advanced"
      }
    });
    </script>

### messages.addColumnLeft `String` *(default: "Add column on the left")*

The title of the tool that adds table columns on the left of the selection.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addColumnLeft: "Add column on the left"
      }
    });
    </script>

### messages.addColumnRight `String` *(default: "Add column on the right")*

The title of the tool that adds table columns on the right of the selection.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addColumnRight: "Add column on the right"
      }
    });
    </script>

### messages.addRowAbove `String` *(default: "Add row above")*

The title of the tool that adds table rows above the selection.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addRowAbove: "Add row above"
      }
    });
    </script>

### messages.addRowBelow `String` *(default: "Add row below")*

The title of the tool that adds table rows below the selection.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addRowBelow: "Add row below"
      }
    });
    </script>

### messages.alignCenter `String` *(default: 'Align Center')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({

      messages: {
        alignCenter: "Align Center"
      }
    });
    </script>

### messages.alignCenterBottom `String` *(default: 'Align Center Bottom')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterBottom: "Align Center Bottom"
      }
    });
    </script>

### messages.alignCenterMiddle `String` *(default: 'Align Center Middle')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterMiddle: "Align Center Middle"
      }
    });
    </script>

### messages.alignCenterTop `String` *(default: 'Align Center Top')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterTop: "Align Center Top"
      }
    });
    </script>

### messages.alignLeft `String` *(default: 'Align Left')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeft: "Align Left"
      }
    });
    </script>

### messages.alignLeftBottom `String` *(default: 'Align Left Bottom')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftBottom: "Align Left Bottom"
      }
    });
    </script>

### messages.alignLeftMiddle `String` *(default: 'Align Left Middle')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftMiddle: "Align Left Middle"
      }
    });
    </script>

### messages.alignLeftTop `String` *(default: 'Align Left Top')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftTop: "Align Left Top"
      }
    });
    </script>

### messages.alignRemove `String` *(default: 'Remove Alignment')*

The title of the tool that removes the cell text's alignment.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRemove: "Remove Alignment"
      }
    });
    </script>

### messages.alignRight `String` *(default: 'Align Right')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRight: "Align Right"
      }
    });
    </script>

### messages.alignRightBottom `String` *(default: 'Align Right Bottom')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightBottom: "Align Right Bottom"
      }
    });
    </script>

### messages.alignRightMiddle `String` *(default: 'Align Right Middle')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightMiddle: "Align Right Middle"
      }
    });
    </script>

### messages.alignRightTop `String` *(default: 'Align Right Top')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightTop: "Align Right Top"
      }
    });
    </script>

### messages.auto `String` *(default: 'Auto')*

The placeholder for the numeric inputs in the Table Wizard dialogs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        auto: "Auto"
      }
    });
    </script>

### messages.tableAlignLeft `String` *(default: 'Table Align Left')*

The title of the tool that aligns the table.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignLeft: "Table Align Left"
      }
    });
    </script>

### messages.tableAlignCenter `String` *(default: 'Table Align Center')*

The title of the tool that aligns the table.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignCenter: "Table Align Center"
      }
    });
    </script>

### messages.tableAlignRight `String` *(default: 'Table Align Right')*

The title of the tool that aligns the table.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignRight: "Table Align Right"
      }
    });
    </script>

### messages.alignment `String` *(default: 'Alignment')*

The title of the tool that aligns the cell text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignment: "Alignment"
      }
    });
    </script>

### messages.applyFormat `String` *(default: 'Apply format')*

The title of the format painter tool button that applies the copied format.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyFormat: "Apply the format that has been copied"
      }
    });
    </script>

### messages.applyToColumn `String` *(default: 'apply to column')*

The hint for the Width input in the Cell properties Table Wizard dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyToColumn: "apply to column"
      }
    });
    </script>

### messages.applyToRow `String` *(default: 'apply to row')*

The hint for the Height input in the Cell properties Table Wizard dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyToRow: "apply to row"
      }
    });
    </script>

### messages.associateCellsWithHeaders `String` *(default: 'Associate cells with headers')*

The title of the Associate cells with headers tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        associateCellsWithHeaders: "Associate cells with headers"
      }
    });
    </script>

### messages.backColor `String` *(default: "Background color")*

The title of the tool that changes the text background color.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        backColor: "Background color"
      }
    });
    </script>

### messages.background `String` *(default: 'Background')*

The title of the tool that changes the text background of the tables/cells.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        background: "Background"
      }
    });
    </script>

### messages.bold `String` *(default: "Bold")*

The title of the tool that makes text bold.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        bold: "Bold"
      }
    });
    </script>

### messages.border `String` *(default: 'Border')*

The title of the tool that changes the border of tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        border: "Border"
      }
    });
    </script>

### messages.borderColor `String` *(default: 'Border color')*

The title of the tool that changes the border color of tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        borderColor: "Border color"
      }
    });
    </script>

### messages.borderWidth `String` *(default: 'Border width')*

The title of the tool that changes the border width of tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        borderWidth: "Border width"
      }
    });
    </script>

### messages.style `String` *(default: 'Styles')*

The title of the tool that applies styling to elements. Deprecated.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        style: "Styles"
      }
    });
    </script>

### messages.caption `String` *(default: 'Caption')*

The title of the tool that adds caption to tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        caption: "Caption"
      }
    });
    </script>

### messages.captionAlignment `String` *(default: 'Caption alignment')*

The title of the tool that sets the caption alignment of tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        captionAlignment: "Caption alignment"
      }
    });
    </script>

### messages.cellMargin `String` *(default: 'Cell Margin')*

The title of the tool that applies margin to table cells.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellMargin: "Cell Margin"
      }
    });
    </script>

### messages.cellPadding `String` *(default: 'Cell Padding')*

The title of the tool that applies padding to table cells.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellPadding: "Cell Padding"
      }
    });
    </script>

### messages.cellSpacing `String` *(default: 'Cell Spacing')*

The title of the tool that applies spacing to table cells.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellSpacing: "Cell Spacing"
      }
    });
    </script>

### messages.cellTab `String` *(default: 'Cell')*

The title of the Cell tab in Table Wizard dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellTab: "Cell"
      }
    });
    </script>

### messages.cleanFormatting `String` *(default: 'Clean formatting')*

The title of the Clean Formatting tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cleanFormatting: "Clean formatting"
      }
    });
    </script>

### messages.collapseBorders `String` *(default: 'Collapse borders')*

The title of the Collapse borders option in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        collapseBorders: "Collapse borders"
      }
    });
    </script>

### messages.columns `String` *(default: 'Columns')*

The title of the Columns tool in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        columns: "Columns"
      }
    });
    </script>

### messages.copyFormat `String` *(default: 'Copy format')*

The title of the format painter tool button that copies format.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        copyFormat: "Copy format from selected range"
      }
    });
    </script>

### messages.createLink `String` *(default: "Insert hyperlink")*

The title of the tool that creates hyperlinks.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createLink: "Insert hyperlink"
      }
    });
    </script>

### messages.createTable `String` *(default: "Create table")*

The title of the tool that inserts tables.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createTable: "Create table"
      }
    });
    </script>

### messages.createTableHint `String` *(default: "Create a {0} x {1} table")*

The status text of the tool that inserts tables, which indicates the dimensions of the inserted table.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createTableHint: "Create a {0} x {1} table"
      }
    });
    </script>

### messages.cssClass `String` *(default: 'CSS Class')*

The title of the CSS Class dropdown tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cssClass: "CSS Class"
      }
    });
    </script>

### messages.deleteColumn `String` *(default: "Delete column")*

The title of the tool that deletes selected table columns.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        deleteColumn: "Delete column"
      }
    });
    </script>

### messages.deleteRow `String` *(default: "Delete row")*

The title of the tool that deletes selected table rows.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        deleteRow: "Delete row"
      }
    });
    </script>

### messages.dialogCancel `String` *(default: "Cancel")*

The label of the cancel button in all editor dialogs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogCancel: "Cancel"
      }
    });
    </script>

### messages.dialogInsert `String` *(default: "Insert")*

The label of the insert button in all editor dialogs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogInsert: "Insert"
      }
    });
    </script>

### messages.dialogOk `String` *(default: 'Confirm')*

The title of the OK buttons in editor's dialogs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogOk: "Confirm"
      }
    });
    </script>

### messages.dialogUpdate `String` *(default: "Update")*

The label of the update button in all editor dialogs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogUpdate: "Update"
      }
    });
    </script>

### messages.editAreaTitle `String` *(default: "Editable area. Press F10 for toolbar.")*

The title of the iframe editing area when a sandboxed editor is used. Used as a hint for screen readers.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        editAreaTitle: "Write your comments here. Press F10 for toolbar."
      }
    });
    </script>

### messages.fileTitle `String` *(default: "Title")*

The caption for the file title in the insertFile dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fileTitle: "Title"
      }
    });
    </script>

### messages.fileWebAddress `String` *(default: "Web address")*

The caption for the file URL in the insertFile dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fileWebAddress: "Web address"
      }
    });
    </script>

### messages.fitToCell `String` *(default: 'Fit to cell')*

The text of the fit to cell option in the WrapText dropdown in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fitToCell: "Fit to cell"
      }
    });
    </script>

### messages.fontName `String` *(default: "Select font family")*

The title of the tool that changes the text font.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontName: "Select font family"
      }
    });
    </script>

### messages.fontNameInherit `String` *(default: "(inherited font)")*

The text that is shown when the text font will be inherited from the surrounding page.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontNameInherit: "(inherited font)"
      }
    });
    </script>

### messages.fontSize `String` *(default: "Select font size")*

The title of the tool that changes the text size.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: ["fontSize"],
      messages: {
        fontSize: "Select font size"
      }
    });
    </script>

### messages.fontSizeInherit `String` *(default: "(inherited size)")*

The text that is shown when the text size will be inherited from the surrounding page.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontSizeInherit: "(inherited size)"
      }
    });
    </script>

### messages.foreColor `String` *(default: "Color")*

The title of the tool that changes the text color.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        foreColor: "Color"
      }
    });
    </script>

### messages.formatBlock `String` *(default: "Format")*

The title of the tool that lets users choose block formats. Deprecated.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        formatBlock: "Format"
      }
    });
    </script>

### messages.formatting `String` *(default: "Format")*

The title of the tool that lets users choose block formats.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        formatting: "Format"
      }
    });
    </script>

### messages.height `String` *(default: 'Height')*

The title of the height fields.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        height: "Height"
      }
    });
    </script>

### messages.id `String` *(default: 'ID')*

The title of the id fields.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        id: "ID"
      }
    });
    </script>

### messages.imageAltText `String` *(default: "Alternate text")*

The caption for the image alternate text in the insertImage dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageAltText: "Alternate text"
      }
    });
    </script>

### messages.imageHeight `String` *(default: "Height (px)")*

The caption for the image height in the insertImage dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageHeight: "Height (px)"
      }
    });
    </script>

### messages.imageWebAddress `String` *(default: "Web address")*

The caption for the image URL in the insertImage dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageWebAddress: "Web address"
      }
    });
    </script>

### messages.imageWidth `String` *(default: "Width (px)")*

The caption for the image width in the insertImage dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageWidth: "Width (px)"
      }
    });
    </script>

### messages.indent `String` *(default: "Indent")*

The title of the tool that indents the content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        indent: "Indent"
      }
    });
    </script>

### messages.insertFile `String` *(default: "Insert file")*

The title of the tool that inserts links to files.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertFile: "Insert file"
      }
    });
    </script>

### messages.insertHtml `String` *(default: "Insert HTML")*

The title of the tool that inserts HTML snippets.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertHtml: "Insert HTML"
      }
    });
    </script>

### messages.insertImage `String` *(default: "Insert image")*

The title of the tool that inserts images.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertImage: "Insert image"
      }
    });
    </script>

### messages.insertOrderedList `String` *(default: "Insert ordered list")*

The title of the tool that inserts an ordered list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertOrderedList: "Insert ordered list"
      }
    });
    </script>

### messages.insertUnorderedList `String` *(default: "Insert unordered list")*

The title of the tool that inserts an unordered list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertUnorderedList: "Insert unordered list"
      }
    });
    </script>

### messages.insertUpperRomanList `String` *(default: "Insert upper roman list")*

The title of the tool that inserts an upper roman list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertUpperRomanList: "Insert upper roman list"
      }
    });
    </script>

### messages.insertLowerRomanList `String` *(default: "Insert lower roman list")*

The title of the tool that inserts an lower roman list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertLowerRomanList: "Insert lower roman list"
      }
    });
    </script>

### messages.italic `String` *(default: "Italic")*

The title of the tool that makes text italicized.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        italic: "Italic"
      }
    });
    </script>

### messages.overflowAnchor `String` *(default: "More tools")*

The title of the tool that shows the overflow tools.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        overflowAnchor: "More tools"
      }
    });
    </script>

### messages.justifyCenter `String` *(default: "Center text")*

The title of the tool that aligns text in the center.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyCenter: "Center text"
      }
    });
    </script>

### messages.justifyFull `String` *(default: "Justify")*

The title of the tool that justifies text both left and right.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyFull: "Justify"
      }
    });
    </script>

### messages.justifyLeft `String` *(default: "Align text left")*

The title of the tool that aligns text on the left.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyLeft: "Align text left"
      }
    });
    </script>

### messages.justifyRight `String` *(default: "Align text right")*

The title of the tool that aligns text on the right.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyRight: "Align text right"
      }
    });
    </script>

### messages.linkOpenInNewWindow `String` *(default: "Open link in new window")*

The caption for the checkbox for opening the link in a new window in the createLink dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkOpenInNewWindow: "Open link in new window"
      }
    });
    </script>

### messages.linkText `String` *(default: "Text")*

The caption for the link text in the createLink dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkText: "Text"
      }
    });
    </script>

### messages.linkToolTip `String` *(default: "ToolTip")*

The caption for the link Tooltip in the createLink dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkToolTip: "ToolTip"
      }
    });
    </script>

### messages.linkWebAddress `String` *(default: "Web address")*

The caption for the URL in the createLink dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkWebAddress: "Web address"
      }
    });
    </script>

### messages.outdent `String` *(default: "Outdent")*

The title of the tool that outdents the content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        outdent: "Outdent"
      }
    });
    </script>

### messages.print `String` *(default: 'Print')*

The title of the Print tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        print: "Print"
      }
    });
    </script>

### messages.redo `String` *(default: "Redo")*

The title of the redo tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        redo: "Redo task"
      }
    });
    </script>

### messages.rows `String` *(default: 'Rows')*

The title of the Rows field in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        rows: "Rows"
      }
    });
    </script>

### messages.selectAllCells `String` *(default: 'Apply to all cells')*

The title of the Apply to all cells tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        selectAllCells: "Apply to all cells"
      }
    });
    </script>

### messages.strikethrough `String` *(default: "Strikethrough")*

The title of the tool that strikes through text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        strikethrough: "Strikethrough"
      }
    });
    </script>

### messages.subscript `String` *(default: "Subscript")*

The title of the tool that makes text subscript.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        subscript: "Subscript"
      }
    });
    </script>

### messages.summary `String` *(default: 'Summary')*

The title of the Summary field in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        summary: "Summary"
      }
    });
    </script>

### messages.superscript `String` *(default: "Superscript")*

The title of the tool that makes text superscript.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        superscript: "Superscript"
      }
    });
    </script>

### messages.tableBackground `String` *(default: 'Table background')*

The title of the Table background Wizard tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableBackground: "Table background"
      }
    });
    </script>

### messages.tableCellProperties `String` *(default: 'Cell Properties')*

The title of the Table Cell properties Wizard tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableCellProperties: "Cell Properties"
      }
    });
    </script>

### messages.tableProperties `String` *(default: 'Table Properties')*

The title of the Table properties Wizard tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableProperties: "Table Properties"
      }
    });
    </script>

### messages.tableTab `String` *(default: 'General')*

The title of the main Table tab in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableTab: "General"
      }
    });
    </script>

### messages.tableWizard `String` *(default: 'Table Wizard')*

The title of the Table Wizard tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableWizard: "Table Wizard"
      }
    });
    </script>

### messages.underline `String` *(default: "Underline")*

The title of the tool that underlines text.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        underline: "Underline"
      }
    });
    </script>

### messages.undo `String` *(default: "Undo")*

The title of the undo tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        undo: "Undo task"
      }
    });
    </script>

### messages.units `String` *(default: "Units")*

The label of the Units dropdowns in TableWizard dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        units: "Units"
      }
    });
    </script>

### messages.unlink `String` *(default: "Remove hyperlink")*

The title of the tool that removes hyperlinks.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        unlink: "Remove hyperlink"
      }
    });
    </script>

### messages.viewHtml `String` *(default: "View HTML")*

The title of the tool that shows the editor value as HTML.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        viewHtml: "View HTML"
      }
    });
    </script>

### messages.width `String` *(default: 'Width')*

The title of the Width fields.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        width: "Width"
      }
    });
    </script>

### messages.wrapText `String` *(default: 'Wrap text')*

The title of the Wrap Text option in Table Wizard.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        wrapText: "Wrap text"
      }
    });
    </script>

### nonce `String`

When strict CSP is enabled a `nonce` can be provided for the inline styles. The passed value would be used as the nonce attribute for the inline styles in the content area iframe, the placeholder inline style and the link tags loading external stylesheets in the content area.

#### Example

    <textarea id="editor"></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                nonce: "kendoNonce"
            });
        });
    </script>

### navigateOnTab `Boolean` *(default: false)*

If set to `true` this configuration option would enable Tab-based navigation among Editor ToolBar items. By default navigation is arrow-based.

#### Example

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
          navigateOnTab: true
      });
    </script>

### nonSplittableTagsOnPaste `Array` *(default: [])*

When pasting a block element inside an element such as a list `ul`, the list gets split in half and the block element is inserted between the two `ul` elements.

This configuration enables you to specify elements for which the above behavior will be ignored.

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: ["ul"],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### nonSplittableTagsOnPaste.tag `String`

An extension of the `nonSplittableTagsOnPaste` configuration. You can specify an array of objects instead of array of strings if you want to configure additional settings.

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: [{
          tag: "ul",
          unwrap: false
        }],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### nonSplittableTagsOnPaste.unwrap `Boolean` *(default: true)*

By default the pasted content will be unwrapped from its parent elements when the `nonSplittableTagsOnPaste` configuration is enabled. This property enables you to stop that behavior.

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: [{
          tag: "ul",
          unwrap: false
        }],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### pasteCleanup `Object`

Options for controlling how the pasting content is modified before it is added in the editor.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            all: false,
            css: false,
            custom: null,
            keepNewLines: false,
            msAllFormatting: false,
            msConvertLists: true,
            msTags: true,
            none: false,
            span: false
        }
    });
    </script>

### pasteCleanup.all `Boolean` *(default: false)*

All HTML tags are stripped leaving only the text in the content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            all: true
        }
    });
    </script>

### pasteCleanup.css `Boolean` *(default: false)*

Remove `style` and `class` attributes from the pasting content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            css: true
        }
    });
    </script>

### pasteCleanup.custom `Function`

Use a callback function to integrate a custom implementation for cleaning up the paste content. Make sure the callback function always returns the result.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            custom: function(html) {
                return html.replace(/<img[^>]*>/, "");
            }
        }
    });
    </script>

### pasteCleanup.keepNewLines `Boolean` *(default: false)*

Strip all HTML tags but keep new lines in the pasted content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            keepNewLines: true
        }
    });
    </script>

### pasteCleanup.msAllFormatting `Boolean` *(default: false)*

Remove all special formatting from MS Word content like font-name, font-size and MS Word specific tags.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msAllFormatting: true
        }
    });
    </script>

### pasteCleanup.msConvertLists `Boolean` *(default: true)*

Converts MS Word pasted content into HTML lists.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msConvertLists: false
        }
    });
    </script>

### pasteCleanup.msTags `Boolean` *(default: true)*

Removes all MS Word specific tags and cleans up the extra metadata.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msTags: false
        }
    });
    </script>

### pasteCleanup.none `Boolean` *(default: false)*

Prevent any cleaning up of the content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            none: true
        }
    });
    </script>

### pasteCleanup.span `Boolean` *(default: false)*

Remove all span elements from the content, ensuring much of the inline formatting is removed.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            span: false
        }
    });
    </script>

### pdf `Object`

Configures the Kendo UI Editor PDF export settings.

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - set the author

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                author: "John Doe"
            }
        });
    </script>


### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - set the creator

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                creator: "John Doe"
            }
        });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                date: new Date("2015/1/31")
            }
        });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                fileName: "Document.pdf"
            }
        });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/editor#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - set the keywords

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                keywords: "Kendo UI Editor PDF export"
            }
        });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                landscape: true
            }
        });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                margin: {
                    bottom: 20,
                    left: 20,
                    right: 20,
                    top: 20
                }
            }
        });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                paperSize : "A4"
            }
        });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser is not capable of saving files locally, for example, Internet Explorer 9 and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.

#### Example - set the server proxy URL
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                proxyURL: "/save"
            }
        });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                forceProxy: true,
                proxyURL: "/save",
                proxyTarget: "_blank"
            }
        });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - set the subject
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf:{
                subject : "Kendo UI Editor overview"
            }
        });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - set the title
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                title : "Overview"
            }
        });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

> **Important**
>
> The options is only available in [Classic Mode](/controls/editor/overview#classic-mode).

#### Example - specify the placeholder option
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            placeholder: "Type here..."
        });
    </script>

### resizable `Boolean|Object` *(default: false)*

If enabled, the editor renders a resize handle to allow users to resize it.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: true
    });
    </script>

### resizable.content `Boolean`

If enabled, the editor renders a resize handle to allow users to resize it.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
          content: true
      }
    });
    </script>

### resizable.min `Number|Object`

The minimum height that the editor can be resized to. If set to an object the user can restrict both min width and height values.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: 100
      }
    });
    </script>

### resizable.min.minWidth `Number`

The minimum width that the editor can be resized to.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: {
          minWidth: 500
        }
      }
    });
    </script>

### resizable.min.minHeight `Number`

The minimum height that the editor can be resized to.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: {
          minHeight: 500
        }
      }
    });
    </script>

### resizable.max `Number|Object`

The maximum height that the editor can be resized to. If set to an object the user can restrict both max width and height values.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: 600
      }
    });
    </script>

### resizable.max.maxWidth `Number`

The maximum width that the editor can be resized to.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: {
          maxWidth: 500
        }
      }
    });
    </script>

### resizable.max.maxHeight `Number`

The maximum height that the editor can be resized to.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: {
          maxHeight: 500
        }
      }
    });
    </script>

### resizable.toolbar `Boolean|Object` *(default: false)*

If `resizable` is set to `true` the widget will detect changes in the viewport width and will hide the overflowing controls in the tool overflow popup.

If `resizable.toolbar` is assigned an object, it will propagate the [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration to the Editor's toolbar.

> Tools are shown/hidden on tool group level. Tools with popup such as `fontName`, `fontSize`, `fontColor`, `backColor`, `formatting` and `createTable` will **not** be moved to the tool overflow popup and will be always visible.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
          toolbar: true
      }
    });
    </script>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        toolbar: {
            mode: "section"
        }
      }
    });
    </script>

### resizable.toolbar.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


### resizable.toolbar.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


### resizable.toolbar.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


### resizable.toolbar.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.

### serialization `Object`

Allows setting of serialization options.

### serialization.custom `Function`

Define custom serialization for the editable content. The method accepts a single parameter as a string and is expected to return a string.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        serialization: {
            custom: function(html) {
                return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
            }
        }
    });
    </script>

### serialization.entities `Boolean` *(default: true)*

Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "The character ä is an umlaut",
      serialization: {
        entities: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "The character &auml; is an umlaut"
    </script>

### serialization.optimizeTags `Boolean` *(default: false)*

Indicates whether optizable tags should be removed from the DOM. Currently, optimizable tags are `span` and `font` elements with no attributes and no decoration or formatting applied (via inline styles/attributes).

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "<p><span>non-decorated text</span></p><p><span style=\"text-decoration: underline;\">underline text</span></p>",
      serialization: {
        optimizeTags: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "The character &auml; is an umlaut"
    </script>

### serialization.scripts `Boolean` *(default: false)*

Indicates whether inline scripts will be serialized and posted to the server.

> Setting this option does not prevent cross-site scripting (XSS) attacks; you need server sanitization, too.
> See the [preventing cross-site-scripting](/web/editor/preventing-xss) help topic for more information.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "before script <script>alert(1);<\/script> after script",
      serialization: {
        scripts: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // log will contain the script tag
    </script>

### serialization.semantic `Boolean` *(default: true)*

Indicates whether the font styles will be saved as semantic (strong / em / span) tags,
or as presentational (b / i / u / font) tags. Used for outputting content for legacy systems.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "Check out <em>this</em> <strong>kata</strong>.",
      serialization: {
        semantic: false
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "Check out <i>this</i> <b>kata</b>.",
    </script>

### stylesheets `Array`

Allows custom stylesheets to be included within the editing area. This setting is applicable only when the [Editor is initialized from a `textarea`](/web/editor/overview)
and a contenteditable iframe is generated.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      stylesheets: [
          "https://demos.telerik.com/kendo-ui/content/web/editor/editorStyles.css"
      ]
    });
    </script>

### tools `Array`

A collection of tools that are used to interact with the Editor.
Tools may be switched on by specifying their name.
Custom tools and tools that require configuration are defined as objects.

The available editor commands are:

*   Basic text formatting
        - **bold**, **italic**, **underline**, **strikethrough**, **subscript**, **superscript**
*   Font and color
        - **fontName**, **fontSize**, **foreColor**, **backColor**
*   Alignment
        - **justifyLeft**, **justifyCenter**, **justifyRight**, **justifyFull**
*   Spacing
        - **lineHeight**
*   Lists
        - **insertUnorderedList**, **insertOrderedList**, **indent**, **outdent**
*   Links, images and files
        - **createLink**, **unlink**, **insertImage**, **insertFile**
*   Table editing
        - **tableWizard**, **createTable**, **addColumnLeft**, **addColumnRight**, **addRowAbove**, **addRowBelow**, **deleteRow**, **deleteColumn**
*   Structural markup and styles
        - **formatting**, **cleanFormatting**
*   Snippets
        - **insertHtml**
*   HTML code view
        - **viewHtml**
*   Print edited page
        - **print**
*   Export to PDF
        - **pdf**
*   Format painter
        - **copyFormat**, **applyFormat**
*   Formatting marks
        - **formattingMarks**

#### Example - add built-in and custom buttons to the tools collection

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
        tools: [
          {
            name: "bold",
          },
          {
            name: "italic"
          },
          {
            name: "underline"
          },
          {
            name: "custom",
            template: '<button id="custom">Custom</button>'
          }
        ]
      });

      $("#custom").kendoButton({
        click: function() {
          console.log("custom hanler")
        }
      })
    </script>

#### Example - add grouped tools collection using multi array

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
        tools: [
          [
            "bold",
            "italic",
            "underline",
            "strikethrough"
          ],
          [
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull"
          ],
          [
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent"
          ],
        ]
      });
    </script>

> Grouping of tools works as expected only for tools of type "button".

### tools.name `String`

When specifying a tool as an object, a tool name is required. **Please note that "undo" and "redo" are reserved tool names.**

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        { name: "custom" }
      ]
    });
    </script>

### tools.tooltip `String`

The text which will be displayed when the end-user hovers the tool button with the mouse.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        { name: "bold", tooltip: "Bold the selected text" }
      ]
    });
    </script>

### tools.exec `Function`

The JavaScript function which will be executed when the end-user clicks the tool button.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          exec: function(e) {
            var editor = this;
            // ...
          }
        }
      ]
    });
    </script>

### tools.items `Array`

For tools that display a list of items (fontName, fontSize, formatting), this option specifies the items in the shown list.

#### Example - specify custom font families

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontName",
          items: [
            { text: "Arial/Verdana", value: "Arial,Verdana,sans-serif" }
          ]
        }
      ]
    });
    </script>

### tools.items.text `String`

The string that the popup item will show.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontName",
          items: [
            { text: "Default site font", value: "Arial,Verdana,sans-serif" },
            { text: "Monospaced font", value: "monospace" }
          ]
        }
      ]
    });
    </script>

### tools.items.value `String`

The value that will be applied by the tool when this item is selected.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontSize",
          items: [
            { text: "12px", value: "12px" },
            { text: "24px", value: "24px" }
          ]
        }
      ]
    });
    </script>

### tools.items.context `String`

Only applicable for the formatting tool. Specifies the context in which the option will be available.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "formatting",
          items: [
            { text: "Title", value: "h1" },

            // will be shown only when selection is in H1
            { text: "Note", value: "span.note", context: "h1" }
          ]
        }
      ]
    });
    </script>

### tools.palette `String|Array` *(default: "websafe")*

Specifies the [color palette](/api/javascript/ui/colorpicker/configuration/palette) for "foreColor" and "backColor" tools. If you need to use the [color gradient](api/javascript/ui/colorgradient) view in the picker instead of the palette, set this value to null.

#### Example - "websafe" palette

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "foreColor"
        }]
    });
    </script>

#### Example - list of colors

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "backColor",
            palette: ["#f0d0c9", "#e2a293", "#d4735e", "#65281a"]
        }]
    });
    </script>

#### Example - use gradient

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "backColor",
            palette: null
        }]
    });
    </script>

### tools.columns `Number`

Specifies the [colors columns](/api/javascript/ui/colorpicker/configuration/columns) for "foreColor" and "backColor" tools when list of colors are defined.

#### Example - specified columns of the colors

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "foreColor",
            palette: ["#f0d0c9", "#e2a293", "#d4735e", "#65281a"],
            columns: 2
        }]
    });
    </script>

### tools.template `String|Function`

The kendo template that will be used for rendering the given tool.

#### Example using a simple string template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          template: "<button class='k-button'>Save draft</button>"
        }
      ]
    });
    </script>

The code below shows how to use a function template.

#### Example using a function template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          template: function() {
            return "<button class='k-button'>Save draft</button>"
          }
        }
      ]
    });
    </script>

### tools.ui `Object`

Apart from the built-in tools, the Editor fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

All tools must have their `name` specified. All custom tools with no name will have "custom" automatically assigned as their name. As a result only one of them will be placed in the Editor ToolBar.

#### Example - Custom tools via the ToolBar API

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
            name: "text-btn",
            ui: {
                type: "button",
                text: "Button",
                showText: "always",
                icon: null
            }
        },
        {
            name: "toggle-btn",
            ui: {
                type: "button",
                text: "Toggle",
                togglable: true,
                icon: "cancel",
                showText: "always"
            }
        },
        {
            name: "split-btn",
            ui: {
                type: "splitButton",
                text: "SplitButton",
                showText: "always",
                icon: null,
                menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
            }
        }
      ]
    });
    </script>

Note that all tools have their `showText` option set to `overflow` and their `icon` set to `gear`. If the default state does not cover your scenario requirements, you will need to override those options.

### imageBrowser `Object`

Configuration for image browser dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: "imagebrowser/read",
          destroy: "imagebrowser/destroy",
          create: "imagebrowser/createDirectory",
          uploadUrl: "imagebrowser/upload",
          thumbnailUrl: "imagebrowser/thumbnail",
          imageUrl: "/content/images/{0}",
        },
        path: "/myInitialPath/"
      }
    });
    </script>

### imageBrowser.fileTypes `String` *(default: "*.png,*.gif,*.jpg,*.jpeg")*

Defines the allowed file extensions.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        /* omitted for brevity */
        fileTypes: "*.gif"
      }
    });
    </script>

### imageBrowser.path `String` *(default: "/")*

Defines the initial folder to display, relative to the root.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        /* omitted for brevity */
        path: "/uploads/"
      }
    });
    </script>

### imageBrowser.transport `Object`

Specifies the settings for loading and saving data.

### imageBrowser.transport.read `Object|String|Function`

Options or URL for remote image retrieval.

> **Important:** The value of `transport.read` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example - specify a read URL

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: "/imagebrowser/read"
        }
      }
    });
    </script>

#### Example - specify read as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: function(options) {
              // query async service, then call options.success or options.error
              options.success([
                { "name": "foo", "type": "d" },
                { "name": "bar.png", "type": "f", "size": 15289 }
              ]);
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.contentType `String` *(default: "application/x-www-form-urlencoded")*

The content-type HTTP header sent to the server. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            /* omitted for brevity */
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            data: function() {
              return { id: 42, name: "John Doe" };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            type: "POST"
          }
        }
      }
    });
    </script>


### imageBrowser.transport.read.url `String|Function`

The remote url to call when fetching list of items.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            url: "/read"
          }
        }
      }
    });
    </script>

#### Example - specify Read URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            url: function(params) {
              // build url
              return "/read?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.thumbnailUrl `String|Function`

The URL for retrieving the thumbnail version of the image. If not specified a default image icon will be shown.
If function is assigned, the current path and image name will be provided.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          thumbnailUrl: "/thumbnail"
        }
      }
    });
    </script>

#### Example - thumbnailUrl as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          thumbnailUrl: function(path, file) {
            return "/thumbnail?path=" + path + file;
          }
        }
      }
    });
    </script>

### imageBrowser.transport.uploadUrl `String`

The URL which will handle the upload of the new images. If not specified the Upload button will not be displayed.

The requirements for this handler are the same as for the [save handler](/web/upload/modes#save-handler) in the Upload widget.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          uploadUrl: "/thumbnail"
        }
      }
    });
    </script>

### imageBrowser.transport.imageUrl `String|Function`

The URL responsible for serving the original image. A file name placeholder should be specified. By default the placeholder value is URL encoded. If this is not desired, use a function.

#### Example - imageUrl as String

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          imageUrl: "/content/images/{0}" //the placeholder will be replaced with the current virtual path and selected file name
        }
      }
    });
    </script>

#### Example - imageUrl as Function (can be used to avoid automatic URL encoding)

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          imageUrl: function (e) {
            return "/content/images/" + e;
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy `Object|String`

Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: "/destroy"
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            type: "POST"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.url `String|Function`

The remote url to call when creating a new record.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            url: "/destroy"
          }
        }
      }
    });
    </script>

#### Example - specify Destroy URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            url: function(params) {
              // build url
              return "/destroy?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create `Object|String`

Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: "/create"
        }
      }
    });
    </script>

### imageBrowser.transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify data as object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify data as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            type: "POST"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.url `String|Function`

The remote url to call when creating a new record.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            url: "/create"
          }
        }
      }
    });
    </script>

#### Example - specify create url as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            url: function(params) {
              // build url
              return "/create?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>


### imageBrowser.schema `Object`

Set the object responsible for describing the image raw data format.

### imageBrowser.schema.model `Object`

Set the object which describes the image/directory entry fields. Note that a name, type and size fields should be set.

### imageBrowser.schema.model.id `String`

The name of the field which acts as an identifier.

### imageBrowser.schema.model.fields `Object`

### imageBrowser.schema.model.fields.name `Object|String`

The field which contains the name of the image/directory

### imageBrowser.schema.model.fields.name.field `String`

The name of the field.

### imageBrowser.schema.model.fields.name.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.schema.model.fields.type `Object|String`

The field which contains the type of the entry. Either *f* for image or *d* for directory.

### imageBrowser.schema.model.fields.type.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.schema.model.fields.type.field `String`

The name of the field.

### imageBrowser.schema.model.fields.size `Object|String`

The field which contains the size of image.

### imageBrowser.schema.model.fields.size.field `String`

The name of the field.

### imageBrowser.schema.model.fields.size.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.messages `Object`

Defines texts shown within the image browser.

### imageBrowser.messages.uploadFile `String` *(default: "Upload")*

Defines text for upload button.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          uploadFile: "Upload a file"
        }
      }
    });
    </script>

### imageBrowser.messages.orderBy `String` *(default: "Arrange by")*

Defines text for order by label.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderBy: "Order by"
        }
      }
    });
    </script>

### imageBrowser.messages.orderByName `String` *(default: "Name")*

Defines text for Name item of order by drop down list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderByName: "Filename"
        }
      }
    });
    </script>

### imageBrowser.messages.orderBySize `String` *(default: "Size")*

Defines text for Size item of order by drop down list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderBySize: "File size"
        }
      }
    });
    </script>

### imageBrowser.messages.directoryNotFound `String` *(default: "A directory with this name was not found.")*

Defines text for dialog shown when the directory not found error occurs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          directoryNotFound: "Directory not found!"
        }
      }
    });
    </script>

### imageBrowser.messages.emptyFolder `String` *(default: "Empty Folder")*

Defines text displayed when folder does not contain items.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          emptyFolder: "Folder is empty"
        }
      }
    });
    </script>

### imageBrowser.messages.deleteFile `String` *(default: "Are you sure you want to delete {0}?")*

Defines text for dialog shown when the file or directory is deleted.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          deleteFile: "Are you sure? This action cannot be undone."
        }
      }
    });
    </script>

### imageBrowser.messages.invalidFileType `String` *(default: "The selected file '{0}' is not valid. Supported file types are {1}.")*

Defines text for dialog shown when an invalid file is set for upload.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          invalidFileType: "Supported file types are {1}. Please retry your upload."
        }
      }
    });
    </script>

### imageBrowser.messages.overwriteFile `String` *(default: "A file with name '{0}' already exists in the current directory. Do you want to overwrite it?")*

Defines text for dialog shown when an already existing file is set for upload.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          overwriteFile: "Do you want to overwrite the file with name '{0}'?"
        }
      }
    });
    </script>

### imageBrowser.messages.search `String` *(default: "Search")*

Defines text for search box placeholder.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          search: "Find"
        }
      }
    });
    </script>

### fileBrowser `Object`

Configuration for file browser dialog.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: "https://demos.telerik.com/service/v2/core/FileBrowser/read",
          destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileBrowser/Destroy",
              type: "POST"
          },
          create: {
              url: "https://demos.telerik.com/service/v2/core/FileBrowser/Create",
              type: "POST"
          },
          uploadUrl: "https://demos.telerik.com/service/v2/core/FileBrowser/upload",
          fileUrl: "https://demos.telerik.com/service/v2/core/FileBrowser/File?fileName={0}",
        }
      }
    });
    </script>

### fileBrowser.fileTypes `String` *(default: "*.*")*

Defines the allowed file extensions.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        /* omitted for brevity */
        fileTypes: "*.zip"
      }
    });
    </script>

### fileBrowser.path `String` *(default: "/")*

Defines the initial folder to display, relative to the root.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        /* omitted for brevity */
        path: "/uploads/"
      }
    });
    </script>

### fileBrowser.transport `Object`

Specifies the settings for loading and saving data.

### fileBrowser.transport.read `Object|String|Function`

Options or URL for remote file retrieval.

> **Important:** The value of `transport.read` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example - specify a read URL

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: "/filebrowser/read"
        }
      }
    });
    </script>

#### Example - specify read as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: function(options) {
              // query async service, then call options.success or options.error
              options.success([
                { "name": "foo", "type": "d" },
                { "name": "bar.pdf", "type": "f", "size": 15289 }
              ]);
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.contentType `String` *(default: "application/x-www-form-urlencoded")*

The content-type HTTP header sent to the server. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            /* omitted for brevity */
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            data: function() {
              return { id: 42, name: "John Doe" };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            type: "POST"
          }
        }
      }
    });
    </script>


### fileBrowser.transport.read.url `String|Function`

The remote url to call when fetching list of items.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            url: "/read"
          }
        }
      }
    });
    </script>

#### Example - specify Read URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            url: function(params) {
              // build url
              return "/read?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.uploadUrl `String`

The URL which will handle the upload of the new files. If not specified the Upload button will not be displayed.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          uploadUrl: "/upload"
        }
      }
    });
    </script>

### fileBrowser.transport.fileUrl `String|Function`

The URL responsible for serving the original file. A file name placeholder should be specified. By default the placeholder value is URL encoded. If this is not desired, use a function.

#### Example - fileUrl as String

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          fileUrl: "/content/files/{0}" //the placeholder will be replaced with the current virtual path and selected file name
        }
      }
    });
    </script>

#### Example - fileUrl as Function (can be used to avoid automatic URL encoding)

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
      "insertFile"
      ],
      fileBrowser: {
        transport: {
          fileUrl: function (e) {
            return "/content/files/" + e;
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy `Object|String`

Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: "/destroy"
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            type: "POST"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.url `String|Function`

The remote url to call when creating a new record.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            url: "/destroy"
          }
        }
      }
    });
    </script>

#### Example - specify Destroy URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            url: function(params) {
              // build url
              return "/destroy?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create `Object|String`

Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: "/create"
        }
      }
    });
    </script>

### fileBrowser.transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - specify data as object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify data as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            type: "POST"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.url `String|Function`

The remote url to call when creating a new record.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            url: "/create"
          }
        }
      }
    });
    </script>

#### Example - specify create url as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            url: function(params) {
              // build url
              return "/create?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>


### fileBrowser.schema `Object`

Set the object responsible for describing the file raw data format.

### fileBrowser.schema.model `Object`

Set the object which describes the file/directory entry fields. Note that a name, type and size fields should be set.

### fileBrowser.schema.model.id `String`

The name of the field which acts as an identifier.

### fileBrowser.schema.model.fields `Object`

### fileBrowser.schema.model.fields.name `Object|String`

The field which contains the name of the file/directory

### fileBrowser.schema.model.fields.name.field `String`

The name of the field.

### fileBrowser.schema.model.fields.name.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### fileBrowser.schema.model.fields.type `Object|String`

The field which contains the type of the entry. Either *f* for file or *d* for directory.

### fileBrowser.schema.model.fields.type.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### fileBrowser.schema.model.fields.type.field `String`

The name of the field.

### fileBrowser.schema.model.fields.size `Object|String`

The field which contains the size of file.

### fileBrowser.schema.model.fields.size.field `String`

The name of the field.

### fileBrowser.schema.model.fields.size.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### fileBrowser.messages `Object`

Defines texts shown within the file browser.

### fileBrowser.messages.uploadFile `String` *(default: "Upload")*

Defines text for upload button.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          uploadFile: "Upload a file"
        }
      }
    });
    </script>

### fileBrowser.messages.orderBy `String` *(default: "Arrange by")*

Defines text for order by label.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderBy: "Order by"
        }
      }
    });
    </script>

### fileBrowser.messages.orderByName `String` *(default: "Name")*

Defines text for Name item of order by drop down list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderByName: "Filename"
        }
      }
    });
    </script>

### fileBrowser.messages.orderBySize `String` *(default: "Size")*

Defines text for Size item of order by drop down list.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderBySize: "File size"
        }
      }
    });
    </script>

### fileBrowser.messages.directoryNotFound `String` *(default: "A directory with this name was not found.")*

Defines text for dialog shown when the directory not found error occurs.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          directoryNotFound: "Directory not found!"
        }
      }
    });
    </script>

### fileBrowser.messages.emptyFolder `String` *(default: "Empty Folder")*

Defines text displayed when folder does not contain items.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          emptyFolder: "Folder is empty"
        }
      }
    });
    </script>

### fileBrowser.messages.deleteFile `String` *(default: "Are you sure you want to delete {0}?")*

Defines text for dialog shown when the file or directory is deleted.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          deleteFile: "Are you sure? This action cannot be undone."
        }
      }
    });
    </script>

### fileBrowser.messages.invalidFileType `String` *(default: "The selected file '{0}' is not valid. Supported file types are {1}.")*

Defines text for dialog shown when an invalid file is set for upload.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          invalidFileType: "Supported file types are {1}. Please retry your upload."
        }
      }
    });
    </script>

### fileBrowser.messages.overwriteFile `String` *(default: "A file with name '{0}' already exists in the current directory. Do you want to overwrite it?")*

Defines text for dialog shown when an already existing file is set for upload.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          overwriteFile: "Do you want to overwrite the file with name '{0}'?"
        }
      }
    });
    </script>

### fileBrowser.messages.search `String` *(default: "Search")*

Defines text for search box placeholder.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          search: "Find"
        }
      }
    });
    </script>

### formattingMarksRefreshDelay `Number|Boolean` *(default: 250)*

The delay in milliseconds before the formatting marks are refreshed. This feature is useful for performance optimization as the formatting marks are re-rendered any time the user presses a key. If the user is typing very fast or holding down a key, the delay will prevent the re-rendering from being executed multiple times.

The visual effect from this configuration is that the marks will briefly disappear while the user is typing. You can set the value to `false` to fully turn off this behavior.

#### Example

    <textarea id="editor"><p>Some text with several spaces that demonstrates<br /> the re-rendering of the marks.</p></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                tools: ["formattingMarks"],
                formattingMarksRefreshDelay: false
            });
        });
    </script>

### unsafeInline `Boolean` *(default: true)*

When set to false, the decoration applied by the Formatting tool dropdown will be skipped and the values will appear as plain text options.

#### Example

    <textarea id="editor"></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                unsafeInline: false
            });
        });
    </script>

## Fields

### body `Element`

The HTML element which represents the editor content area. In the [classic Editor mode](/controls/editor/overview#classic-mode), this is the `<body>` element inside the `iframe`. In the [inline Editor mode](/controls/editor/overview#inline-mode), this is the [element, from which the Editor is initialized](/intro/widget-basics/wrapper-element).

#### Example - set background color and font color to the editor content area

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor();
      var editor = $("#editor").data("kendoEditor");
      editor.body.style.backgroundColor = "#f00";
      editor.body.style.color = "#FFFFFF";
    </script>

### toolbar `Object`

The toolbar instance of the Kendo Editor.

#### Example

    <button  id="open">Open</button>
    <div id="editor"></div>
    <script>
      $("#open").kendoButton();
      var editor = $("#editor").kendoEditor().data("kendoEditor");
      $("#open").click(function(){
        editor.windowInstance.open();
      })
    </script>

## Methods

### createRange

Creates a W3C-compatible **Range** object.

#### Parameters

##### document `Document` *(optional)*

The document that the range is associated with. If omitted, the document of the editor editing area will be used.

#### Returns

`Range` The created **Range** object.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.createRange();
    </script>

### destroy
Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Editor element from DOM.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.destroy();
    </script>

### encodedValue

Gets the HTML encoded value of the editor.

#### Returns

`String` The value of the Editor as HTML encoded string.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({ value: "<p>foo</p>" });
    var editor = $("#editor").data("kendoEditor");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.encodedValue()); // logs "&lt;p&gt;foo&lt;/p&gt;"
    </script>

### exec

Executes an editor command on the currently selected text.

#### Parameters

##### name `String`

The name of the command to be executed. The available names match the list of [tools](/api/javascript/ui/editor#configuration-tools), plus `"undo"` and `"redo"`.

##### params `String|Object` *(optional)*

The parameters for the executed command.

##### params.value `Object`

The arguments for commands that expect such

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({ value: "foo" });
    var editor = $("#editor").data("kendoEditor");
    editor.exec("foreColor", { value: "#f00" });
    </script>

### focus

Focuses the editable area.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.focus();
    </script>

### getRange

Gets a **Range** object form the editable area.

#### Returns

`Range` A W3C-compatible **Range** object that represents the currently selected text in the editor area.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.getRange();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(range);
    </script>

### getSelection

Gets a W3C-compatible **Selection** object form the editable area.

#### Returns

`Selection` a W3C-compatible **Selection** object form the editable area.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var selection = editor.getSelection();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(selection);
    </script>

### paste

Inserts HTML into the editable area. Cleans up MS Word formatting.

#### Parameters

##### html `String`

The HTML to be inserted.

##### options `Object`

Options that configure how the content is processed when pasting.

##### options.split `Boolean` *(default: true)*

Specifies whether the surrounding formatting should be split prior to inserting the HTML. If set to `false`, the inserted snippet will inherit styles from the surrounding content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.paste("<p>New content</p>");
    </script>

#### Example - insert text content, preserving formatting

    <textarea id="editor">&lt;em&gt;foo&lt;/em&gt;</textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");

    // set selection after 'f'
    var range = editor.getRange();
    range.setStart(editor.body.firstChild.firstChild, 1);
    range.collapse(true);
    editor.selectRange(range);

    // insert content
    editor.paste("bar", { split: false }); // <em>fbaroo</em>
    </script>

### selectedHtml

Serializes the currently selected text to a XHTML string.

#### Returns

`String` The selected text as valid XHTML.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var html = editor.selectedHtml();
    </script>

### refresh

Reinitializes the editing area iframe. Should be used after moving the editor in the DOM.

#### Example

    <textarea id="editor"></textarea>
    <div id="container"></div>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.wrapper.appendTo("#container");
    editor.refresh();
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/editor/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/editor/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <textarea id="editor" rows="10" cols="30" style="height:440px">
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
            In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
            and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
            accessibility standards and provides API for content manipulation.
    </textarea>

    <script>
        $("#editor").kendoEditor();
        $("#export").click(function(e) {
            var editor = $("#editor").data("kendoEditor");
            editor.saveAsPDF();
        });
    </script>


### selectRange

Focuses the editable area and selects the range described by the range parameter.

#### Parameters

##### range `Range`

The **Range** object that describes the new selection.

#### Example - select all

    <textarea id="editor"></textarea>
    <div id="container"></div>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.createRange();
    range.selectNodeContents(editor.body);
    editor.selectRange(range);
    </script>

### update

Serializes the current state of the editable area to the `<textarea>` element.
This method should be called after modifying the editor content through the DOM.

#### Example

    <textarea id="editor"></textarea>
    <script>
    var textarea = $("#editor");
    textarea.kendoEditor({ value: "Hello, " });
    var editor = textarea.data("kendoEditor");
    editor.body.appendChild(editor.document.createTextNode("World"));
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(textarea.val()); // logs "Hello, "
    editor.update();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(textarea.val()); // logs "Hello, World"
    </script>

### state

Get the state of a given tool. Introduced in the 2013.2.923 internal build.

#### Parameters

##### toolName `String`

The name of the tool that will be tested if formatted.

#### Returns

`Boolean` The state of the tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.value("<em>foo</em>");
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild);
    editor.selectRange(range);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.state("italic")); // logs true
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.state("bold")); // logs false
    </script>

### value

Gets or sets the editor value.

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the Editor as HTML string.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.value("<p>New content</p>");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.value()); // logs "<p>New content</p>"
    </script>

## Events

### change

Fires when Editor is blurred and its content has changed.

#### Example - subscribe to the "change" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      change: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(this.value());
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_change() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(this.value());
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("change", editor_change);
    </script>

### execute

Fires when an Editor command is executed.

#### Event Data

##### e.name `String`

The name of the command

##### e.command `Object`

The command instance

#### Example - subscribe to the "execute" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      execute: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("executing command", e.name, e.command);
      }
    });
    </script>

#### Example - subscribe to the "execute" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_execute(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("executing command", e.name, e.command);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("execute", editor_execute);
    </script>

### keydown

Fires when the user depresses a keyboard key. Triggered multiple times if the user holds the key down.

#### Example - subscribe to the "keydown" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      keydown: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("keydown : keyCode=",e.keyCode);
      }
    });
    </script>

#### Example - subscribe to the "keydown" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_keydown(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("keydown : keyCode=", e.keyCode);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("keydown", editor_keydown);
    </script>

### keyup

Fires when the user releases a keyboard key.

#### Example - subscribe to the "keyup" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      keyup: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("keyup : keyCode=",e.keyCode);
      }
    });
    </script>

#### Example - subscribe to the "keyup" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_keyup(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("keyup : keyCode=",e.keyCode);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("keyup", editor_keyup);
    </script>

#### Example - show word count

    <textarea id="editor"></textarea>
    <div id="words"></div>
    <script>
    function wordCount(value) {
      return $.trim(value.replace(/<.*?>/g, " "))
        .replace(/['";:,.?\-!]+/g, '')
        .match(/\S+/g).length;
    }

    $("#editor").kendoEditor({
      keyup: function(e) {
        $("#words").text(wordCount(this.value()) + " words");
      }
    });
    </script>

### paste

Fires before the content is pasted in the Editor.

#### Event Data

##### e.html `Object`

The pasted content

#### Example - subscribe to the "paste" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      paste: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.html);
      }
    });
    </script>

#### Example - subscribe to the "paste" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_paste(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.html);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("paste", editor_paste);
    </script>

#### Example - process the pasted content

    <textarea id="editor"></textarea>
    <script>
    function onPaste(e) {
      // replace all <a> / </a> tags in the pasted content
      e.html = e.html.replace(/<\/?a[^>]*>/g, "");
    }
    $("#editor").kendoEditor({
      paste: onPaste
    });
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Editor`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the Editor will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "select" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	    tools: ["pdf"],
      pdfExport: function(e) {
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function onEditorExport(e) {
    }
    $("#editor").kendoEditor({
		   tools: ["pdf"]
	  });
    var editor = $("#editor").data("kendoEditor");
    editor.bind("pdfExport", onEditorExport);
    </script>

### select

Fires when the Editor selection has changed.

#### Example - subscribe to the "select" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      select: function(e) {
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_select(e) {
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("select", editor_select);
    </script>


## Class Fields

### defaultTools `Array`

An array of tool definitions that are used for initializing the default tools. Note: Editors that are already initialized will not be affected by changes to this array.

#### Example - insert paragraphs on Shift+Enter, line breaks on Enter

    <textarea id="editor"></textarea>
    <script>
    var defaultTools = kendo.ui.Editor.defaultTools;

    defaultTools["insertLineBreak"].options.shift = false;
    defaultTools["insertParagraph"].options.shift = true;

    $("#editor").kendoEditor();
    </script>
