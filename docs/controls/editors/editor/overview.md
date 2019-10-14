---
title: Overview
page_title: jQuery Editor Documentation | Editor Overview | Kendo UI
description: "Get started with the jQuery Editor by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_editor_widget
position: 1
---

# Editor Overview

The Editor allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and generate widget value as an XHTML markup.

* [Demo page for the Editor](http://demos.telerik.com/kendo-ui/editor/index)

## Initializing the Editor

To initialize the Editor, use an existing `HTML` element and a jQuery selector.

      <textarea id="editor" rows="10" cols="30"></textarea>

      $(document).ready(function(){
          $("#editor").kendoEditor();
      });

## Functionality and Features

* [Read-only Editor]({% slug readonly_kendoui_editor_widget %})
* [Modes of operation]({% slug modes_kendoui_editor_widget %})
* [Tools]({% slug tools_kendoui_editor_widget %})
* [Selection]({% slug set_selections_editor_widget %})
* [Image browser]({% slug image_browser_editor_widget %})
* [Immutable elements]({% slug immutable_elements_editor_widget %})
* [Pasting content]({% slug pasting_editor_widget %})
* [Post-processing content]({% slug post_process_content_editor_widget %})
* [Preventing cross-site scripting]({% slug prevent_xss_editor_widget %})
* [Using the Table Wizard tool]({% slug table_wizard_dialog_editor_widget %})
* [Appearance]({% slug appearance_kendoui_editor_widget %})

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
