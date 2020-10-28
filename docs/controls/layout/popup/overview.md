---
title: Overview
page_title: jQuery Popup Documentation | Popup Overview
description: "Get started with the jQuery Popup by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_popup_widget
position: 1
---

# Popup Overview

The Kendo UI Popup positions content next to a specific anchor.

* [JavaScript API reference of the Popup](/api/javascript/ui/popup)

## Initializing the Popup

To initialize the Popup, use a `<div>` element. Initially, the element is hidden as the content of the widget is designed to be only visible when opened through the API.

The following example demonstrates how to initialize the Popup and what its basic usage is.

    <input id="name" /><button> Open/Close </button>

    <div id="popup">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <script>
      $("#popup").kendoPopup({
        anchor: $("#name")
      });

      $("button").click(function(){
      	$("#popup").data("kendoPopup").toggle();
      });
    </script>

## Functionality and Features

The Popup provides options for [aligning and appending it to elements and positioning it to specific points]({% slug alignposition_kendoui_popup %}).  

## Events

The Popup exposes the `activate`, `open`, `close`, and `deactivate` events. For more information, refer to the [JavaScript API reference of the Popup](/api/javascript/ui/popup).

## Referencing Existing Instances

To access an existing Popup instance, use the `.data("kendoPopup")` jQuery method that is executed by the jQuery object of the originating element. For more information, refer to the article [getting a reference to a Kendo UI widget]({% slug initialize_widgets_using_jquery_plugins_installation %}). Once a reference is established, use the [Popup API](/api/javascript/ui/popup) to control its behavior.

## See Also

* [JavaScript API Reference of the Popup](/api/javascript/ui/popup)
