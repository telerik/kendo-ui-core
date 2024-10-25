---
title: Overview
page_title: Overview - Hybrid UI Collapsible
description: "Create collapsible blocks of content by using the hybrid mobile Kendo UI Collapsible widget and learn how to nest widgets inside it."
slug: overview_hybridcollapsible
position: 1
component: collapsible
---

# Overview Collapsible

>Starting with the R2 2023 release, Kendo UI will no longer ship Hybrid UI components. This means that the R2 2023 will be the last release to include Kendo Hybrid in the Kendo UI package. See full announcement in [Kendo jQuery blog post](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#end-of-support-announcements). The last stable version that we recommend to use for Kendo Hybrid components is [R3 2022 SP1](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2022-sp1-(version-2022-3-1109)).
>
>[What's New in Kendo UI R2 2023](https://www.telerik.com/blogs/r2-2023-kendo-ui-release#kendo-ui-for-jquery)

The [Hybrid UI Collapsible widget](https://demos.telerik.com/kendo-ui/m/index#collapsible/index) allows you to create collapsible blocks of content.

## Getting Started

The Kendo UI mobile Application automatically initializes a mobile Collapsible for every element with the `role` data attribute set to `collapsible` and present in the views markup. Alternatively, it can be initialized by using jQuery plugin syntax in the containing mobile View `init` event handler.

The Collapsible element should be a `div` element. Directly inside this container, add a header element `h1`&mdash;`h6`. The framework styles the header as a clickable button with an icon to indicate that it is expandable. After the header, add any HTML markup you want to be collapsible. The framework wraps this content in a container that is hidden/shown when users tap on the Collapsible header.

By default the content is initially hidden.

### Initialize from Markup

The example below demonstrates how to initialize Hybrid UI Collapsible based on the `data-role` attribute.



    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

### Initialize Using jQuery



    var collapsible = $("#collapsible").kendoMobileCollapsible();

## Customization

### Create Scrollable Collapsible Content

To create some scrollable collapsible content, wrap the content in a `div` element with `data-role="scroller"` and specify its `height`.



```dojo
    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible">
            <h2>Header</h2>
            <div data-role="scroller" style="height: 200px">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>
```

### Nest Collapsible Panels

Collapsible widgets can be nested inside each other, as demonstrated in the example below.

> **Important**
>
> In this scenario the animation of the parent Collapsible content should be disabled.



```dojo
    <div id="home" data-role="view" data-init="onInit">
        <div id="collapsible" data-role="collapsible" data-animation="false" data-collapsed="false">
            <h2>Header</h2>

            <p>Nested collapsibles</p>
            <div id="collapsible" data-role="collapsible">
                <h3>Scrollable ListView</h3>
                <div data-role="scroller" style="height: 150px;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt faucibus mauris at pellentesque. Aenean vel est eu ante bibendum faucibus. Praesent pharetra nibh est, vitae scelerisque odio porta vel. Nunc in sagittis ipsum. Vivamus sit amet faucibus ex. Donec nec nisl cursus, consectetur odio et, vehicula est. Quisque sollicitudin ultricies imperdiet. Aenean et felis ante. Fusce ligula urna, maximus ac feugiat vel, placerat in nibh. Suspendisse leo neque, scelerisque ut mattis quis, imperdiet vel orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ut accumsan ante, at fermentum nunc. Suspendisse posuere diam sit amet mauris pulvinar, eget porttitor augue sagittis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt faucibus mauris at pellentesque. Aenean vel est eu ante bibendum faucibus. Praesent pharetra nibh est, vitae scelerisque odio porta vel. Nunc in sagittis ipsum. Vivamus sit amet faucibus ex. Donec nec nisl cursus, consectetur odio et, vehicula est. Quisque sollicitudin ultricies imperdiet. Aenean et felis ante. Fusce ligula urna, maximus ac feugiat vel, placerat in nibh. Suspendisse leo neque, scelerisque ut mattis quis, imperdiet vel orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ut accumsan ante, at fermentum nunc. Suspendisse posuere diam sit amet mauris pulvinar, eget porttitor augue sagittis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt faucibus mauris at pellentesque. Aenean vel est eu ante bibendum faucibus. Praesent pharetra nibh est, vitae scelerisque odio porta vel. Nunc in sagittis ipsum. Vivamus sit amet faucibus ex. Donec nec nisl cursus, consectetur odio et, vehicula est. Quisque sollicitudin ultricies imperdiet. Aenean et felis ante. Fusce ligula urna, maximus ac feugiat vel, placerat in nibh. Suspendisse leo neque, scelerisque ut mattis quis, imperdiet vel orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ut accumsan ante, at fermentum nunc. Suspendisse posuere diam sit amet mauris pulvinar, eget porttitor augue sagittis.</p>
                </div>
            </div>

            <div id="collapsible" data-role="collapsible">
                <h3>Form elements</h3>
                <ul data-role="listview" data-style="inset">
                    <li>
                        <label>Type text
                            <input type="text" value="Text" />
                        </label>
                    </li>
                    <li>
                        <label> Type password
                            <input type="password" value="password" />
                        </label>
                    </li>
                    <li>
                        <label> Type email
                            <input type="email" value="kendoui@telerik.com" />
                        </label>
                    </li>
                    <li>
                        <label> Textarea
                            <textarea style="resize: none">Multiline Text</textarea>
                        </label>
                    </li>
                </ul>
            </div>

            <div id="collapsible" data-role="collapsible">
                <h3>Nested 3</h3>
                <p>Nested content 3</p>
            </div>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>
```

## See Also

* [Hybrid UI Collapsible JavaScript API Reference](/api/javascript/mobile/ui/collapsible)
* [How to Use DataSource to Render Content]({% slug howto_usedatasourcetorebdercontent_hybridcollapsible %})
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
