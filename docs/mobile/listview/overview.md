---
title: Overview
page_title: User guide for Kendo UI Mobile ListView Widget
description: Documentation how to use capabilities of Kendo UI Mobile ListVeiw widget.
position: 1
---

# ListView

The Kendo Mobile ListView widget is used to display flat or grouped list of items.
It can be either used in unbound mode by enhancing an HTML `ul` element, or bound to a DataSource instance.

## Getting Started

The Kendo mobile Application automatically initializes the mobile ListView for every `ul` element with `role` data attribute set to
`listview` present in the application Views.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.
The mobile ListView element may contain one or more `li` elements.

### Initialize mobile ListView using a role data attribute

    <ul data-role="listview">
        <li>Foo</li>
        <li>Bar</li>
    </ul>

### Initialize mobile ListView using jQuery plugin syntax

    <div data-role="view" data-init="initListView">
        <ul id="listView"></ul>
    </div>

    <script>
        function initListView(e) {
            e.view.element.find("#listView").kendoMobileListView();
        }
    </script>

## Inset Mobile ListView

In iOS, the mobile ListView appearance can be changed to **inset**, to achieve an effect similar to iOS grouped table views,
where the list items are padded from the container, and have rounded corners.
To do so, set the `style` data attribute to `inset`.
**Note:** This setting will not affect the appearance of the mobile ListView on Android/Blackberry devices.

### Create inset mobile ListView

    <ul data-role="listview" data-style="inset">
      <li>Foo</li>
      <li>Bar</li>
    </ul>

## Grouped mobile ListView

The mobile ListView can display items in groups, with optional headers. This can be achieved by nesting unordered lists in items,
and setting the widget's element `type` data attribute to `group`.

### Create grouped mobile ListView

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

## Binding to Data

The mobile ListView can be bound to both local JavaScript arrays and remote data via the
**Kendo DataSource component**. Local JavaScript arrays are appropriate for limited value
options, while remote data binding is better for larger data sets.

### Bind mobile ListView to a local data source.

    function initListView(e) {
        e.view.element.find("#listview").kendoMobileListView({
            dataSource: kendo.data.DataSource.create(["foo", "bar", "baz"])
         });
    });

## Customizing Item Templates

The mobile ListView leverages Kendo UI high-performance Templates to provide complete control
over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
please review the [Kendo UI Templates](/framework/templates/overview) documentation.

> The ListView automatically wraps the template content in `<li>` tag. Putting a `<li>` tag inside the template creates invalid nesting of elements.

### Basic item template customization

    <ul id="listview"></ul>

    <script type="text/javascript">
        function initListView(e) {
            e.view.element.find("#listview").kendoMobileListView({
                template : "<strong>#:data.foo#</strong>",
                dataSource: kendo.data.DataSource.create([{foo: "bar"}, {foo: "baz"}])
            });
        });
    </script>

### Setting item template via data attribute

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

## Link Items

The mobile ListView will automatically style items with a single link element inside, adding a details indicator.

### ListView with link items

    <ul data-role="listview">
      <li><a href="#foo">Foo</a></li>
      <li><a href="#bar">Bar</a></li>
    </ul>

## Detail Buttons

Mobile ListView integrates with nested DetailButton widgets. These buttons are best suited when the user should be able to execute more than one action on a given row.
Detail buttons support 4 default data-styles: **contactadd**, **detaildisclose**, **rowinsert** and **rowdelete**, along custom icons
through the data-icon attribute. One row can contain both regular links and detail buttons.

### ListView with Detail Buttons

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

## Item Icons

An icon can be set in two ways:

1. By adding an `img` element inside the `li` element
2. By setting a `data-icon` attribute to the `li` element. In this case an `a` element should be placed inside the `li` element. The icon CSS class will be applied to the `a` element.
   
### Example - using font icons with `data-icon` attribute

    <ul data-role="listview" data-style="inset">
      <li data-icon="home">
         <a>Home</a>
      </li>
    </ul>

> **Important:** Kendo UI ships with several ready to use icons. The full list of predefined icons can be seen in the [Icons](./icons) article.

Additional icons may be added by defining the respective CSS class.
If the `data-icon` attribute is set to `custom`, the item will receive `km-custom` CSS class.

### Creating Custom Icons

In order to create colorizable icons like the default ones in Kendo UI Mobile, specify the icon image as a **box mask**
(either as dataURI or as a separate image). The image should be **PNG8** or **PNG24** with alpha channel (**PNG8+Alpha** is supported by
only few graphic editors, so **better stick with PNG24**). The image color is not important - it will be used as a mask only.

**Note**: **BlackBerry 7.0** has a bug that renders its masks as background-image, so it is recommended to use white in order to support it. The bug is fixed in **7.1**.

#### Define custom list item icon

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

In Q3 2012 due to numerous issues with WebKit mask icons, they were deprecated and Kendo UI Mobile introduced font icons. Since the font is not easy editable,
the previous method for a mask icon can be used, but with some additional styling. Please note that the below example will restyle all font icons.

### Define custom list item icon after Q3 2012

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

If you want to add only one or two custom icons, specify them with their respective classes (.km- + data-icon name):

### Restyle only the added Kendo UI Mobile custom icon.

    .km-root .km-pane .km-view .km-question {
        background-size: 100% 100%;
        -webkit-background-clip: border-box;
        background-color: currentcolor;
    }

    .km-question {
        -webkit-mask-box-image: url("foo.png");
        background-color: red;
    }

When custom icons are used and their names are the same as the integrated Kendo UI Mobile icon names, make sure that the font icons are not rendered.

### Hide all Kendo UI Mobile font icons.

    /* Don't render all internal Kendo UI font icons
    .km-root .km-pane .km-view .km-icon:after,
    .km-root .km-pane .km-view .km-icon:before
    {
        visibility: hidden;
    }

Again if only several icons should be overridden, specify them with their classes instead:

### Hide specific Kendo UI Mobile font icons.

    .km-root .km-pane .km-view .km-favorites:after,
    .km-root .km-pane .km-view .km-favorites:before
    {
        visibility: hidden;
    }

