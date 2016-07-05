---
title: Responsive Web Design
page_title: Responsive Web Design | Kendo UI Styles and Appearance
description: "Learn how to implement responsive web design in Kendo UI widgets."
previous_url: /using-kendo-in-responsive-web-pages
slug: responsivewebdesign_integration_kendoui
position: 2
---

# Responsive Web Design

By definition, responsive web design, or responsiveness, is an approach to web design. It aims at crafting sites to provide an optimal viewing experience&mdash;easy reading and navigation with minimum of resizing, panning, and scrolling&mdash;across a wide range of devices from desktop computer monitors to smartphones. Responsive web design is the foundation of modern UX practices for building applications for the mobile web.

## Kendo UI in Responsive Web Pages

Most Kendo UI widgets work and auto-resize when used in responsive web pages out of the box. Several widgets are going to need an additional [`kendo.resize`](/api/javascript/kendo#methods-resize) if their dimensions are set to percentage values.

### Non-Autoresizing Widgets in Container

Below is a list of the Kendo UI widgets that do not support auto-resizing when their container is resized.

* All [widgets for data visualization: Charts and Barcodes](http://demos.telerik.com/kendo-ui/)
* [Hybrid ActionSheet](http://demos.telerik.com/kendo-ui/m/index#actionsheet/index)
* [Hybrid ListView](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index)
* [Hybrid ScrollView](http://demos.telerik.com/kendo-ui/m/index#scrollview/mobile)
* [Hybrid Switch](http://demos.telerik.com/kendo-ui/m/index#switch/mobile)
* [Grid](http://demos.telerik.com/kendo-ui/grid/index)
* [PivotGrid](http://demos.telerik.com/kendo-ui/pivotgrid/index)
* [Scheduler](http://demos.telerik.com/kendo-ui/scheduler/index)
* [Slider](http://demos.telerik.com/kendo-ui/slider/index)
* [Splitter](http://demos.telerik.com/kendo-ui/splitter/index)
* [TabStrip](http://demos.telerik.com/kendo-ui/tabstrip/index)
* [Window](http://demos.telerik.com/kendo-ui/window/index)

### Auto-Resize Widgets for Data Visualization

The example below demonstrates how to auto-resize a chart with a 100% width.

###### Example

    <div class="chart-wrapper">
       <div id="chart" style="width:100%"></div>
    </div>

    <script>
        $(function() {
            $("#chart").kendoChart({
                title: {
                    text: "Gross domestic product growth /GDP annual %/"
                },
                legend: {
                    position: "bottom"
                },
                seriesDefaults: {
                    type: "area"
                },
                series: [{
                    name: "India",
                    data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}%"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    template: "#= series.name #: #= value #"
                }
            });
        });

        $(window).on("resize", function() {
          kendo.resize($(".chart-wrapper"));
        });
    </script>

## Customization

### Individual Widget Resizing

Each Kendo UI widget has a `resize()` method which can be used to trigger a layout readjustment instead of using [`kendo.resize`](/api/javascript/kendo#methods-resize). The `resize` method of the widget accepts a single Boolean parameter, which defines whether the control should execute its layout adjustment algorithm even if the widget dimensions have not changed (`"force"` mode).

### Apply `resize()` Method

The example below demonstrates how to use the `resize()` method.

###### Example

    var gridWidget = $("#GridID").data("kendoGrid");

    // apply the new height and trigger the layout readjustment
    gridWidget.wrapper.height(800);
    gridWidget.resize();

    // force the layout readjustment without setting a new height
    gridWidget.resize(true);

The example above uses a `wrapper` field, which is documented in the article on the [widget wrapper and widget element](/framework/widgets/wrapper-element).

If the widget wrapper resizes automatically with its parent element during browser window resize, it is not required to set new dimensions for the `wrapper` before executing the `resize` method, nor to use the  `"force"` mode.

## Media Queries

Kendo UI uses media queries to enhance the behavior of the widgets on different form factors. Media queries, a part of the [CSS3 specification](http://www.w3.org/TR/css3-mediaqueries/), load different sets of styles to different devices and deliver improved and unified end-user experience.

The example below demonstrates a CSS media query.

###### Example

    @media only screen and (max-width: 480px) {
        h2 {
            font-size: 14pt;
        }
    }

The responsive styles of Kendo UI use the non-mobile first method with media queries having max-width breakpoints. Max-width refers to every window or device with width or screen-width of less than or equal to the amount given. That said, written styles, e.g. under 480px breakpoint, are going to override the base styles on screens of max-width equal to 480px or less.

> **Important**
>
> Responsive behaviors which depend on CSS media queries cannot be disabled.

## Responsive UI Enhancements

Responsive UI enhancements utilize media queries and include built-in UI enhancements for scalability and improved user experience on different form factors. Such features are available for Kendo UI widgets such as the Grid, Scheduler, TreeList, etc.

### Responsive UI Features in Kendo UI Widgets

* **Kendo UI Grid** Integrates a responsive pager, which automatically adjusts to different screen widths and provides the ability to define which columns to be hidden on small view ports. This makes them more flexible for mobile web usage.
* **Kendo UI Scheduler** Provides a mechanism to overflow its `view` selection options into a dropdown on small screen estates. Additionally, it can apply short date/month/year abbreviations where applicable. Thus, its visual presentation is fine-tuned for usage in responsive web scenarios.
* **Kendo UI Responsive Panel** This is a responsive container component. Its sole purpose is providing the necessary plumbing for hiding content on small screens when the specified width boundary is passed, and showing this content when its hamburger icon button is clicked.

To find the live demos to all Kendo UI components, visit the [Kendo UI demo page](http://demos.telerik.com/kendo-ui/).

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
