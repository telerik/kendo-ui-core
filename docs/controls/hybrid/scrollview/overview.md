---
title: Overview
page_title: Hybrid ScrollView Documentation | ScrollView Overview
description: "Get started with the Hybrid ScrollView by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_hybridscrollview
position: 1
---

# ScrollView Overview

The Hybrid UI ScrollView widget scrolls content that is wider than the mobile device screen.

The Hybrid Application by Kendo UI automatically initializes the mobile ScrollView for every element with `role` data attribute set to `scrollview` and present in the markup of the views. Alternatively, it can be initialized by using jQuery plugin syntax in the containing mobile View `init` event handler.

The Hybrid ScrollView supports two operation modes&mdash;standard and data-bound. The first one is suitable for displaying static content, while the second one provides remote data virtualization. If the ScrollView has a DataSource set during the initialization, it operates in a data-bound mode.

* [Demo page for the Hybrid ScrollView](https://demos.telerik.com/kendo-ui/m/index#scrollview/mobile)

## Initializing the Hybrid ScrollView

The following example demonstrates how to initialize the Hybrid UI ScrollView by using the `data`-role attribute.

    <div data-role="scrollview">
        Foo
    </div>

The following example demonstrates how to initialize the Hybrid UI ScrollView by using jQuery plugin syntax.

    <div data-role="view" data-init="initScrollView">
        <div id="scrollView">
            <div data-role="page">Foo</div>
            <div data-role="page">Bar</div>
        </div>
    </div>

    <script>
        function initScrollView(e) {
            e.view.element.find("#scrollView").kendoMobileScrollView();
        }
    </script>

## Functionality and Features

* [Data binding]({% slug databinding_hybridscrollview %})
* [Pages]({% slug pages_hybridscrollview %})
* [Templates]({% slug templates_hybridscrollview %})
* [Appearance]({% slug appearance_hybridscrollview %})

## See Also

* [Basic Usage of the Hybrid ScrollView (Demo)](https://demos.telerik.com/kendo-ui/m/index#mobile-scrollview/mobile)
* [JavaScript API Reference of the Hybrid ScrollView](/api/javascript/mobile/ui/scrollview)
