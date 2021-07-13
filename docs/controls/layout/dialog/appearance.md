---
title: Appearance
page_title: jQuery Dialog Documentation | Appearance
description: "Get started with the jQuery Dialog by Kendo UI and set its size and dimensions."
slug: appearance_kendoui_dialog
position: 6
---

# Appearance

The Dialog provides options for setting its dimensions and customizing its appearance.   

## Setting the Dimensions

By default, the Dialog does not have any preset dimensions and its size depends on its content. If the Dialog contains horizontally expandable block-level elements&mdash;including Kendo UI widgets such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Dialog is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Dialog and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

## Customizing Size and Position

Similar to other Kendo UI widgets, the Dialog has two DOM elements which can be accessed and used to customize the appearance of the widget or its content. These are the [`wrapper` and `element`]({% slug widgetwrapperandelement_references_gettingstarted %}) elements of the widget which are provided as fields of the widget object. In specific scenarios, the Dialog wrapper can be used to tweak the position or the size of the widget although this is normally done through the API and the [`setOptions` method](/api/javascript/ui/widget/methods/setoptions).

    var dialog = $("#dialog").data("kendoDialog");
    var dialogWrapper = dialog.wrapper;

    dialogWrapper.addClass("myDialogClass");

## Rendering of Form Elements

By default, after the Dialog is initialized, it is moved in the DOM and placed as a child of the `body` element which positions it on top of all other page content. However, this approach might cause undesired side-effects if the Dialog is created from an element inside a form because the moved form fields will not be submitted. To avoid such issues, place the whole form, including its opening and closing tags, inside the element from which the Dialog is created.

When the Dialog contains a form, which is submitted through a standard POST request, the widget will close and the page will reload. If you have to avoid this behavior, submit the form through Ajax. The approach is strongly recommended when the submitted data is validated on the server, because in such cases the Dialog is expected to remain visible and to display the validation messages that might be returned.

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
