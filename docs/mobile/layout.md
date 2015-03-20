---
title: Layout
page_title: How to use Kendo UI Mobile Layout widget | Kendo UI Documentation
description: Instructions how to use Mobile Layout widget to easily share headers and footers between multiple views.
position: 8
---

# Layout

A mobile **Layout** is used to share headers and footers between multiple **Views**.
The header and/or footer element of the **Layout** are applied to any **View** that uses it.

To define a **Layout** set `data-role="layout"` to an element.

When a view with the given layout is displayed, the layout attaches its header and footer to it.

**Note:** When instantiated, the layout detaches its element from the document tree.

A **View** is associated with a **Layout** by setting its `data-layout` attribute value
to the ID of the layout (specified by the `data-id` attribute):

## Views with Layout

    <div data-role="view" data-layout="foo">Foo view</div>
    <div data-role="view" data-layout="foo">Bar view</div>

    <div data-role="layout" data-id="foo">
      <div data-role="header">Header</div>
      <div data-role="footer">Footer</div>
    </div>

A default application layout can be set through the [`layout` configuration](/api/mobile/application#layout-string) option of the **Application**.
A mobile **View** can remove the default application layout by setting `data-layout=""`.

## Default Application Layout

    <div data-role="view">Bar</div>

    <div data-role="layout" data-id="foo">
      <div data-role="header">Header</div>
    </div>

    <script>
       new kendo.mobile.Application($(document.body), { layout: "foo" });
    </script>

Layouts can be platform specific, allowing for different layout and behavior per platform.
A layout platform can be specified using `data-platform=""`

## iOS and Android Application Layout

    <div data-role="view">Bar</div>

    <div data-role="layout" data-id="foo" data-platform="ios">
      <div data-role="header">Header</div>
    </div>

    <div data-role="layout" data-id="foo" data-platform="android">
      <div data-role="header">Header</div>
    </div>

# Layout DOM elements

Each mobile Layout instance exposes the following fields:

*   **header** - the header DOM element;
*   **footer** - the footer DOM element;

