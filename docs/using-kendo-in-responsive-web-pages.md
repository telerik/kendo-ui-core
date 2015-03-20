---
title: Kendo UI and Responsive Web Design
description: How to auto-resize kendo widgets when put in resizable containers (splitter or window).
position: 190
---

# Using Kendo with In Responsive Web Pages

Most Kendo UI Widgets work and auto-resize when used in responsive web pages out of the box. Several widgets will need an additonal [kendo.resize](/api/framework/kendo#methods-resize) in case their dimensions are set to percentage values.

## Widgets that do not suppport auto resizing when container is resized: ##

* All DataViz Widgets
* Mobile Actionsheet
* Mobile ListView
* Mobile ScrollView
* MobileSwitch
* Grid
* Scheduler
* Slider
* Splitter
* Window

#### Auto resizing chart with 100% width

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

## Individual widget resizing

Each Kendo UI widget has a `resize()` method, which can be used to trigger a layout readjustment, instead of using `kendo.resize`.
The widget `resize` method accepts a single boolean parameter, which defines whether the widget should execute its layout adjustment algorithm
even if the widget's dimensions have not changed ("force" mode).

#### Example: using widget `resize()`

    var gridWidget = $("#GridID").data("kendoGrid");
    
    // apply new height and trigger layout readjustment
    gridWidget.wrapper.height(800);
    gridWidget.resize();
    
    // force layout readjustment without setting a new height
    gridWidget.resize(true);

The code above uses a `wrapper` field, which is documented in the [Widget wrapper and widget element](/framework/widgets/wrapper-element) page.

## Kendo UI and media queries

Kendo UI uses media queries to enhance the behavior of Kendo UI widgets on different form factors. Media queries, a part of the [CSS3 specification](http://www.w3.org/TR/css3-mediaqueries/), load different set of styles to different devices, delivering improved and unified end user experience.

#### CSS media query example:

    @media only screen and (max-width: 480px) {
        h2 {
            font-size: 14pt;
        }
    }

Kendo UI responsive styles use the Non-Mobile First Method with media queries having max-width breakpoints. Max-width refers to every window or device with width or screen-width of less than or equal to the amount given. That said, styles written e.g. under 480px breakpoint will override the base styles on screens of max-width equal to 480px or less. 