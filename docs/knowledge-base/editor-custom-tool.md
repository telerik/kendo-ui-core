---
title: Create Custom Editor Tool
description: Learn how to create a custom tool for the Kendo UI Editor.
type: how-to
page_title: Create Custom Tool - Kendo UI Editor for jQuery
slug: editor-custom-tool
tags: kendo, kendo-ui, editor, tool, custom-tool
ticketid: 1142213
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2023.1.315</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Editor for jQuery</td>
	</tr>
</table>


## Description

How can I add a font-weight tool to the Editor whose value changes based on the selected font?

## Solution

Register a new tool for the Editor.

```dojo
<textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
    Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br>
    In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling.
    The widget outputs identical HTML across all major browsers, follows accessibility standards and provides API for content manipulation.
</textarea>

<script>
    kendo.ui.editor.EditorUtils.registerTool(
        "fontWeight",
        new kendo.ui.editor.FontTool({
            name:"fontWeight",
            domAttr: "fontWeight",
            items: [
                { text: "bold", value: "900" }
            ],
            defaultValue: [{ text: "fontWeight",  value: "normal" }],
            ui: {
                type: "component",
                component: "ComboBox",
                componentOptions: {
                    dataValueField: "value",
                    dataTextField: "text"
                }
            }
        })
    );

    var editor = $("#editor").kendoEditor({
        tools: [
            "fontWeight",
            "fontName"
        ],
        messages: {
            fontWeight: "normal",
        }
    }).getKendoEditor();

    var fontNameCombo = kendo.widgetInstance($(editor.wrapper.find("input[data-command=fontName]")[0]));

    function fontNameComboChange(e) {
        var fontWeightCombo = kendo.widgetInstance($(editor.wrapper.find("input[data-command=fontWeight]")[0]));

        fontWeightCombo.setDataSource([
            { text: "Light", value: "300" },
            { text: "Medium", value: "500" },
            { text: "Bold", value: "900" },
        ]);
    }

    fontNameCombo.bind("change", fontNameComboChange);
</script>
```

## See Also

* [API Reference of the Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
