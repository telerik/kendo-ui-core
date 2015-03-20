---
title: SplitView
page_title: Kendo UI jQuery Mobile SplitView widget documentation
description: Overview of jQuery-based Kendo tablet UI pane widget. Quick tips for the customization of Kendo UI SplitView component.
---

# SplitView

The mobile SplitView is a tablet-specific view that consists of two or more **mobile Pane widgets**. The
Mobile Application automatically instantiates a mobile SplitView for each element with a `role` data attribute set
to **splitview**.

**Important:** unlike most widgets, the splitview element **should not be nested**
in a view, but should be put as an immediate child of the mobile application element.

## Mobile SplitView with two panes

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


## Collapsible panes

Collapsible panes are automatically hidden when the device is in portrait orientation. The `expandPanes` method can be wired to a button in order to display the collapsed pane(s) overlayed on top of the main pane. Tapping on the main pane will collapse the overlayed pane(s).
The expanded panes can also be collapsed when a navigation happens in the mane pane.

### Collapsible pane with button which expands it
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

## Header and Footer support

In Q2 2014 and later versions, the SplitView supports top-level header and footer elements like a regular view.

### SplitView with top-level footer

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


## Customizing appearance

By default Kendo UI Mobile is configured to show a horizontal SplitView with smaller left and bigger right pane in 1:2 proportion.
In order to resize one of the panes, use CSS to set its width or adjust the flexibility of the flex boxes (if the width is set, the other pane flexibility should be set to a high number, like 1000).

### Set pane width to 300px or change the proportions to 1:3

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

Additionally you can split your view to more panes by adding them directly. You can also make them stack vertically
by setting data-style="vertical" on your SplitView.

## Make SplitView to stack vertically.

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

