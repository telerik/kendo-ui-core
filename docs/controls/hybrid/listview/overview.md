---
title: Overview
page_title: Overview | Hybrid UI ListView
description: "Initialize and take full advantage of the Hybrid UI ListView widget in the Kendo UI framework."
slug: overview_hybridlistview
position: 1
---

# Hybrid UI ListView Overview

The [Hybrid UI ListView widget](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index) is used to display flat or grouped lists of items. It can be either used in the unbound mode by enhancing an HTML `ul` element, or bound to a DataSource instance.

## Getting Started

The Kendo UI mobile Application automatically initializes a mobile ListView for every `ul` element with the `role` data attribute set to `listview` and present in the application Views. Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler. The mobile ListView element may contain one or more `li` elements.

### Initialize from Markup

The example below demonstrates how to initialize the Hybrid UI Listview widget from markup.

###### Example

    <ul data-role="listview">
        <li>Foo</li>
        <li>Bar</li>
    </ul>

### Initialize Using jQuery

The example below demonstrates how to initialize the Hybrid UI ListView widgets using jQuery plugin syntax.

###### Example

    <div data-role="view" data-init="initListView">
        <ul id="listView"></ul>
    </div>

    <script>
        function initListView(e) {
            e.view.element.find("#listView").kendoMobileListView();
        }
    </script>

## Display

### Inset ListViews

In iOS, the mobile ListView appearance can be changed to `inset`, to achieve an effect similar to the iOS grouped table views, where the list items are padded from the container, and have rounded corners. To do so, set the `style` data attribute to `inset`.

> **Important**
>
> This setting does not affect the appearance of the mobile ListView on Android/Blackberry devices.

The example below demonstrates how to create an inset mobile ListView.

###### Example

    <ul data-role="listview" data-style="inset">
      <li>Foo</li>
      <li>Bar</li>
    </ul>

### Grouped ListViews

The mobile ListView can display items in groups, with optional headers. This can be achieved by nesting unordered lists in items, and setting the widget's element `type` data-attribute to `group`.

The example below demonstrates how to create a grouped Hybrid UI ListView.

###### Example

    <ul data-role="listview" data-type="group">
        <li>
            Foo
            <ul>
                <li>Bar</li>
                <li>Baz</li>
            </ul>
        </li>
        <li>
            Bar
            <ul>
                <li>Bar</li>
                <li>Qux</li>
            </ul>
        </li>
    </ul>

## Data Binding

### Bind to Local Arrays

The Hybrid UI ListView widget can be bound to both local JavaScript arrays and remote data via the Kendo UI DataSource component. Local JavaScript arrays are appropriate for limited value options, while remote data binding is better for larger data sets.

The example below demonstrates how to bind a Hybrid UI ListView to a local data source.

###### Example

    function initListView(e) {
        e.view.element.find("#listview").kendoMobileListView({
            dataSource: kendo.data.DataSource.create(["foo", "bar", "baz"])
         });
    });

## Customization

### Item Templates

The hybrid mobile ListView leverages Kendo UI high-performance Templates to provide complete control over item rendering. For a complete overview of Kendo UI Template capabilities and syntax, refer to the [article on Kendo UI Templates]({% slug overview_kendoui_templatescomponent %}).

> **Important**
>
> The ListView automatically wraps the template content in a `<li>` tag. Putting a `<li>` tag inside the template creates invalid nesting of elements.

The example below demonstrates basic item template customization.

###### Example

    <ul id="listview"></ul>

    <script type="text/javascript">
        function initListView(e) {
            e.view.element.find("#listview").kendoMobileListView({
                template : "<strong>#:data.foo#</strong>",
                dataSource: kendo.data.DataSource.create([{foo: "bar"}, {foo: "baz"}])
            });
        });
    </script>

The example below demonstrates how to set an item template via the data attribute.

###### Example

    <div id="foo" data-role="view">
        <ul id="list" data-role="listview" data-source="dataSource" data-template="tmp"></ul>
    </div>

    <script id="tmp" type="text/x-kendo-template">
        <p>#: name # <span>Age: #: age #</span></p>
    </script>

    <script>
        var app = new kendo.mobile.Application();
        var dataSource = new kendo.data.DataSource({
            data: [
                { name: "Jane Doe", age: 30 },
                { name: "John Doe", age: 33 }
            ]
        });
    </script>

### Link Items

The mobile ListView automatically styles items with a single link element inside, adding a details indicator.

The example below demonstrates a Hybrid UI ListView with link items.

###### Example

    <ul data-role="listview">
      <li><a href="#foo">Foo</a></li>
      <li><a href="#bar">Bar</a></li>
    </ul>

### Detail Buttons

Mobile ListView integrates with nested DetailButton widgets. These buttons are best suited when users should be able to execute more than one action on a given row. besides custom icons, the detail buttons support four default data-styles through the data-icon attribute:

* `contactadd`
* `detaildisclose`
* `rowinsert`
* `rowdelete`

One row can contain both regular links and detail buttons.

The example below demonstrates a Hybrid UI ListView with detail buttons.

###### Example

    <ul data-role="listview" data-style="inset" data-type="group">
        <li>
            Default button styles
            <ul>
                <li>Contact Add<a data-role="detailbutton" data-style="contactadd"></a></li>
                <li>Detail Disclose<a data-role="detailbutton" data-style="detaildisclose"></a></li>
                <li>Row Insert<a data-role="detailbutton" data-style="rowinsert"></a></li>
                <li>Row Delete<a data-role="detailbutton" data-style="rowdelete"></a></li>
            </ul>
        </li>
        <li>
            Custom icons
            <ul>
                <li>Battery level<a data-role="detailbutton" data-icon="battery"></a></li>
            </ul>
        </li>
        <li>
            Link Items & Detail Buttons
            <ul>
                <li><a>Row Insert</a><a data-role="detailbutton" data-style="rowinsert"></a></li>
                <li><a>Battery Level</a><a data-role="detailbutton" data-icon="battery"></a></li>
            </ul>
        </li>
    </ul>

## Item Icons Configuration

An item icon can be set in two ways:

1. By adding an `img` element inside the `li` element.
2. By setting a `data-icon` attribute to the `li` element. In this case an `a` element should be placed inside the `li` element. The icon CSS class will be applied to the `a` element.

The example below demonstrates how to use font icons with the `data-icon` attribute.

###### Example

    <ul data-role="listview" data-style="inset">
      <li data-icon="home">
         <a>Home</a>
      </li>
    </ul>

> **Important**
>
> Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [article on icons]({% slug hybridiconfonts_hybridkendoui %}).

Additional icons may be added by defining the respective CSS class. If the `data-icon` attribute is set to `custom`, the item receives the `km-custom` CSS class.

### Create Custom Icons before Q3 2012

To create colorizable icons like the default ones in the hybrid Kendo UI platform, specify the icon image as a box mask&mdash;either as a `dataURI` or as a separate image. The image should be `PNG8` or `PNG24` with an alpha channel&mdash;`PNG8+Alpha` is supported only by few graphic editors, so better stick with `PNG24`. The image color is not important as it is going to be used as a mask only.

> **Important**
>
> BlackBerry 7.0 has a bug that renders its masks as a background-image, so it is recommended to use white to support it. The bug is fixed in the 7.1 release.

The example below demonstrates how to defined a custom list item icon.

###### Example

    <style>
        .km-custom {
          -webkit-mask-box-image: url("foo.png");
        }
    </style>

    <ul data-role="listview" data-style="inset">
      <li data-icon="custom">
         <a>Home</a>
      </li>
      <li>
         Bar
      </li>
    </ul>

### Create Custom Icons after Q3 2012

In the Kendo UI Q3 2012 release, due to numerous issues with the WebKit mask icons, they were deprecated and Kendo UI introduced font icons for its hybrid mobile platform. Since the font is not easily editable, the previous method for a mask icon can be used with some additional styling.

The example below demonstrates how to define custom list item icons after the Kendo UI Q3 2012 release. Note that the code from this demo will restyle all font icons.

###### Example

    <style>
        /* Remove font icons styling, use .km- + data-icon name if only one should be overridden */
        .km-root .km-pane .km-view .km-icon {
            background-size: 100% 100%;
            -webkit-background-clip: border-box;
            background-color: currentcolor;
        }

        .km-custom {
            -webkit-mask-box-image: url("foo.png");
            background-color: red;
        }
    </style>

    <ul data-role="listview" data-style="inset">
      <li data-icon="custom">
         <a>Home</a>
      </li>
      <li>
         Bar
      </li>
    </ul>

<!--*-->

### Restyle Added Custom Icons Only

If you want to add only one or two custom icons, specify them with their respective classes&mdash;`.km-` and the data-icon name, as shown in the example below.

###### Example

    .km-root .km-pane .km-view .km-question {
        background-size: 100% 100%;
        -webkit-background-clip: border-box;
        background-color: currentcolor;
    }

    .km-question {
        -webkit-mask-box-image: url("foo.png");
        background-color: red;
    }

### Hide All Hybrid UI Font Icons

When custom icons are used and their names are the same as the integrated Hybrid UI icon names, make sure that the font icons are not rendered.

The example below demonstrates how to hide all Hybrid UI font icons.

###### Example

    /* Don't render all internal Kendo UI font icons
    .km-root .km-pane .km-view .km-icon:after,
    .km-root .km-pane .km-view .km-icon:before
    {
        visibility: hidden;
    }

### Hide Specific Hybrid UI Font Icons

Again if only several icons should be overridden, specify them with their classes instead, as demonstrated in the example below.

###### Example

    .km-root .km-pane .km-view .km-favorites:after,
    .km-root .km-pane .km-view .km-favorites:before
    {
        visibility: hidden;
    }

## Nova Theme Features

### Tags

To activate this feature add span with `km-badge` class, as demonstrated in the example below.

###### Example

    <ul data-role="listview" data-style="inset">
  		<li>
     		<a>Home<span class="km-badge">NEW</span></a>
  		</li>
  		<li>
     		Bar
  		</li>
	</ul>

### Icons

Icons shift the whole ListView to the right. The grouping headers are also indented. To activate this feature, set `km-listview-icons` class, as shown in the example below.

###### Example

     <ul data-role="listview" class="km-listview-icons">
       <li data-icon="downloads"><a href="#drawer-home">Inbox</a></li>
       <li data-icon="favorites"><a href="#drawer-starred">Starred Items</a></li>        
     </ul>

### Thumbnails

Thumbnails shift the whole ListView to the right. The grouping headers are also indented. To activate this feature, set `km-thumbnail` to the images, as demonstrated in the example below.

###### Example

      <ul data-role="listview" class="km-listview-icons">
        <li>
          <img src="../content/web/foods/1.jpg" alt="Chai image" class="km-thumbnail">
          <!-- ... -->
        </li>
      </ul>

## See Also

Other articles and how-to examples on the Hybrid UI ListView:

* [Hybrid UI ListView JavaScript API Reference](/api/javascript/mobile/ui/listview)
* [Overview of the Hybrid UI ListView]({% slug overview_hybridlistview %})
* [Endless Scrolling Feature]({% slug endlessscrolling_hybridlistview %})
* [Pull-to-Refresh Feature]({% slug pulltorefreshfeature_hybridlistview %})

For how-to examples on the Kendo UI hybrid ListView, browse its [**How To** documentation folder]({% slug howto_group_data_hybridlistview %}).
