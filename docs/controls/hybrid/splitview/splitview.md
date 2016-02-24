---
title: Overview
page_title: Overview | Hybrid UI SplitView
description: "Learn about the jQuery-based Kendo UI tablet pane and customize the Hybrid UI SplitView component."
slug: overview_hybridsplitview
position: 1
---

# SplitView Overview

The [Hybrid UI SplitView widget](http://demos.telerik.com/kendo-ui/m/index#splitview/index) is a tablet-specific view that consists of two or more mobile Pane widgets.

## Getting Started

The mobile Kendo UI Application automatically initializes a mobile SplitView for each element with a `role` data- attribute set to `splitview`.

> **Important**
>
> Unlike most widgets, the SplitView element should not be nested in a view, but rather put as an immediate child of the mobile application element.

### Initialize SplitView with Two Panes

###### Example

    <div data-role="splitview">

      <div data-role="pane" id="side-pane">
          <div data-role="view" data-title="Messages">
             <ul data-role="listview">
               <li><a href="#foo" data-target="main-pane">Foo</a></li><!-- link to main pane -->
               <li><a href="#bar">Bar</a></li><!-- link to same pane -->
             </ul>
          </div>
      </div>

      <div data-role="pane" data-layout="main-default" id="main-pane">
          <div data-role="view" data-title="Messages">
              No message selected
          </div>

          ...

          <div data-role="layout" data-id="main-default">
              <div data-role="header">
                  <div data-role="navbar">
                      <span data-role="view-title"></span>
                  </div>
              </div>
          </div>
      </div>

    </div>

## Appearance

### Collapsible Panes

Collapsible panes are automatically hidden when the device is in portrait orientation. The `expandPanes` method can be wired to a button to display the collapsed panes overlaid on top of the main pane. Tapping on the main pane collapses the overlaid panes. The expanded panes can also be collapsed when a navigation happens in the mane pane.

The example below demonstrates a collapsible pane with a button, which expands it.

###### Example

    <style scoped>
        /* do not show side pane activation button in landscape mode */
        .km-horizontal #side-pane-button {
            display: none;
        }
    </style>

    <div data-role="splitview" id="my-splitview">
        <div data-role="pane" data-collapsible="true" data-portrait-width="200">
            <div data-role="view" data-title="Side Pane">
                <a data-role="button" data-target="main-pane" href="#main-bar">Bar (Main pane)</a>
           </div>
        </div>

        <div data-role="pane" style="-webkit-box-flex: 4" id="main-pane" data-layout="main">
            <div data-role="layout" data-id="main">
                <div data-role="header">
                    <div data-role="navbar">
                        <a id="side-pane-button" data-role="button" data-align="left" data-click="expandSidePane">Side</a>
                        <span data-role="view-title"></span>
                        <a data-role="button" data-align="right" href="#bar">Bar</a>
                    </div>
                </div>
            </div>

            <div data-role="view" data-title="Main Pane">
                Main pane Initial view
            </div>

            <div data-role="view" data-title="Main Pane Bar View" id="main-bar" data-show="collapseSidePane">
                Main pane Bar view
            </div>
        </div>
    </div>

    <script>
        $(function() {
            new kendo.mobile.Application();
        });

        function expandSidePane() {
            $("#my-splitview").data('kendoMobileSplitView').expandPanes();
        }

        /* called when the bar view is displayed */
        function collapseSidePane() {
            $("#my-splitview").data("kendoMobileSplitView").collapsePanes();
        }
    </script>

<!--*-->
### Headers and Footers

As of Kendo UI Q2 2014, the SplitView supports top-level header and footer elements like a regular view.

The example below demonstrates a SplitView with a top-level footer.

###### Example

    <div data-role="splitview">

      <div data-role="pane" id="side-pane">
          <div data-role="view" data-title="Messages">
             <ul data-role="listview">
               <li><a href="#foo" data-target="main-pane">Foo</a></li><!-- link to main pane -->
               <li><a href="#bar">Bar</a></li><!-- link to same pane -->
             </ul>
          </div>
      </div>

      <div data-role="pane" data-layout="main-default" id="main-pane">
          <div data-role="view" data-title="Messages">
              No message selected
          </div>


          <div data-role="layout" data-id="main-default">
              <div data-role="header">
                  <div data-role="navbar">
                      <span data-role="view-title"></span>
                  </div>
              </div>
          </div>
      </div>

      <div data-role="footer">
         <div data-role="tabstrip">
            <a href="#tabstrip-profile" data-icon="contacts">Profile
            </a><a href="#tabstrip-sales" data-icon="history">Sales
            </a><a href="#tabstrip-rating" data-icon="favorites">Rating
            </a><a href="#tabstrip-settings" data-icon="settings">Settings</a>
        </div>
      </div>
    </div>

    <script>
        $(function() {
            new kendo.mobile.Application();
        });
    </script>

## Customization

### Configure Proportions

By default, the Hybrid UI platform is configured to show a horizontal SplitView with smaller left and bigger right pane in a 1:2 proportion. To resize one of the panes, use CSS to set its width, or adjust the flexibility of the flex boxes. Note that if the width is set, the other pane flexibility should be set to a high number such as 1000.

The example below demonstrates how to set the pane width to 300px or change the proportions to 1:3.

###### Example

    <div data-role="splitview" id="main">
      <div data-role="pane" id="side-pane">
        <div data-role="view">
           <a data-role="button" href="#bar" data-target="main-pane">Bar (main pane)</a>
           <a data-role="button" href="#baz" data-target="_top">Baz (application)</a>
        </div>
      </div>
      <div data-role="pane" id="main-pane">
        <div data-role="view" id="foo">
           Foo
        </div>
        <div data-role="view" id="bar">
           Bar
        </div>
      </div>
    </div>

    <style>
        #side-pane {
            min-width: 300px;
        }
        #main-pane {
            -webkit-box-flex: 1000;
            -webkit-flex: 1000;
            flex: 1000;
        }
    </style>
    or
    <style>
        #main-pane {
            -webkit-box-flex: 3;
            -webkit-flex: 3;
            flex: 3;
        }
    </style>

<!--_-->
### Split Views to Many Panes

Additionally, you are able to split your view to more panes by adding them directly. You can also make them stack vertically by setting `data-style="vertical"` on your SplitView.

The example below demonstrates how to make the SplitView stack vertically.

###### Example

    <div data-role="splitview" id="main" data-style="vertical">
      <div data-role="pane" id="side-pane">
        <div data-role="view">
           <a data-role="button" href="#bar" data-target="main-pane">Bar (main pane)</a>
           <a data-role="button" href="#baz" data-target="_top">Baz (application)</a>
        </div>
      </div>
      <div data-role="pane" id="main-pane">
        <div data-role="view" id="foo">
           Foo
        </div>
        <div data-role="view" id="bar">
           Bar
        </div>
      </div>
    </div>

<!--_-->
## See Also

Other articles and how-to examples on the Hybrid UI components and on the SplitView:

* [Hybrid UI SplitView JavaScript API Reference](/api/javascript/mobile/ui/splitview)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
