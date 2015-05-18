---
title: Responsive Web Design
description: How to implement responsive web design with Kendo UI widgets.
position: 190
---

#Responsive Web Design concepts

By definition, responsive web design or responsiveness is an approach to web design aimed at crafting sites to provide an optimal viewing experience - easy reading and navigation with a minimum of resizing, panning, and scrolling — across a wide range of devices (from desktop computer monitors to mobile phones). Responsive web design is the foundation of modern UX practices for building applications for the mobile web.

# Using Kendo UI in Responsive Web Pages

Most Kendo UI Widgets work and auto-resize when used in responsive web pages out of the box. Several widgets will need an additional [kendo.resize](/api/framework/kendo#methods-resize) in case their dimensions are set to percentage values.

## Widgets that do not support auto resizing when container is resized: ##

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
The widget's `resize` method accepts a single boolean parameter, which defines whether the widget should execute its layout adjustment algorithm
even if the widget's dimensions have not changed ("force" mode).

#### Example: using widget `resize()`

    var gridWidget = $("#GridID").data("kendoGrid");
    
    // apply new height and trigger layout readjustment
    gridWidget.wrapper.height(800);
    gridWidget.resize();
    
    // force layout readjustment without setting a new height
    gridWidget.resize(true);

The code above uses a `wrapper` field, which is documented in the [Widget wrapper and widget element](/framework/widgets/wrapper-element) page.

If the widget wrapper has a `height:100%` style and resizes automatically with its parent,
then setting an explicit pixel height for the `wrapper` is not required before executing the `resize` method.

## Kendo UI and media queries

Kendo UI uses media queries to enhance the behavior of Kendo UI widgets on different form factors. Media queries, a part of the [CSS3 specification](http://www.w3.org/TR/css3-mediaqueries/), load different set of styles to different devices, delivering improved and unified end user experience.

#### CSS media query example:

    @media only screen and (max-width: 480px) {
        h2 {
            font-size: 14pt;
        }
    }

Kendo UI responsive styles use the Non-Mobile First Method with media queries having max-width breakpoints. Max-width refers to every window or device with width or screen-width of less than or equal to the amount given. That said, styles written e.g. under 480px breakpoint will override the base styles on screens of max-width equal to 480px or less.

# Responsive UI enhancements 
These utilize media queries and include built-in UI enhancements for scalability and improved user experience on different form factors. 


Such features are available for widgets like grid, scheduler, treelist, etc. 

#### Responsive UI features in widgets ####
* Grid: Integrates a responsive pager, which automatically adjusts on different screen widths and provides the ability to define which columns to be hidden on small view ports. This makes them more flexible for mobile web usage. 
* Scheduler: provides mechanism to overflow its View selection options into a dropdown on small screen estates. Additionally, it can apply short date/month/year abbreviations where applicable. Thus, its visual presentation is fine-tuned for usage in responsive web scenarios. 

We also have a responsive panel widget which is a responsive container component. Its sole purpose is providing the necessary plumbing for hiding content on small screens when the specified width boundary is passed, and showing this content when its "hamburger" icon button is clicked.

You can see them in action [here](http://demos.telerik.com/kendo-ui/responsive/).

##See Also
[Twitter Bootstrap Integration](http://docs.telerik.com/kendo-ui/using-kendo-with-twitter-bootstrap)