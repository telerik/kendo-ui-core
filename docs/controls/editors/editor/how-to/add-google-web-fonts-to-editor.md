---
title: Add Google WebFonts to the Editor
page_title: Add Google WebFonts to the Editor | Kendo UI Editor
description: "Learn how to add Google WebFonts in the Kendo UI Editor widget."
slug: howto_add_google_webfonts_editor
---

# Add Google WebFonts to the Editor

This example demonstrates how to include Google Web Fonts to the Kendo UI Editor.

###### Example

```html
<textarea id="editor" rows="10" cols="30" style="width:740px;height:440px">
		<p>
			Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
			In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
			and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows
			accessibility standards and provides API for content manipulation.
		</p>
		<p>Features include:</p>
		<ul>
			<li>Text formatting &amp; alignment</li>
			<li>Bulleted and numbered lists</li>
			<li>Hyperlink and image dialogs</li>
			<li>Cross-browser support</li>
			<li>Identical HTML output across browsers</li>
			<li>Gracefully degrades to a <code>textarea</code> when JavaScript is turned off</li>
		</ul>
		<p>
			Read <a href="http://docs.kendoui.com">more details</a> or send us your
			<a href="http://www.kendoui.com/forums.aspx">feedback</a>!
		</p>
    </textarea>
	<script>
		// Add Google Web Fonts to font name drop-down
		var editor = $("#editor").kendoEditor({
      tools: ["fontName"],
		  fontName: [].concat(
			// default fonts
			kendo.ui.Editor.fn.options.fontName,
			// value should contain list of fonts, including fallback
			[{text: "Fjalla One", value: "'Fjalla One',sans-serif" },
			 {text: "Griffy", value: "'Griffy',cursive" },
			 {text: "Jacques Francois Shadow", value: "'Jacques Francois Shadow',cursive" },
			 {text: "Fascinate", value: "'Fascinate',cursive" }
			 //...
			]
		  )
		});

		// Load Google Web Font in editing area
		$(editor.data("kendoEditor").body)
		  .prevAll("head")
			.append("<link href='http://fonts.googleapis.com/css?family=Fjalla+One' rel='stylesheet'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Griffy' rel='stylesheet' type='text/css'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Jacques+Francois+Shadow' rel='stylesheet' type='text/css'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Fascinate' rel='stylesheet' type='text/css'>");
	</script>
```

## See Also

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
