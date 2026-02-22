---
title: ScrollView
page_title: Configuration, methods and events of Kendo UI ScrollView
description: You will learn how to configure ScrollView widget, update the scrollview HTML content and scroll to a given page by using methods.
res_type: api
component: scrollview
---

# kendo.ui.ScrollView

Represents the Kendo UI ScrollView widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### ARIATemplate `String`*(default: "Item #=data.index# of #=data.total#")*

Specifies a template is used to populate an aria-live element that anounces which is the current item.


<div class="meta-api-description">
How do I customize screen reader feedback for the currently visible item in a scrollable list with Kendo UI ScrollView? Customize or configure screen reader spoken feedback for the currently visible item in a scrollable list or container by defining a dynamic template that updates live-region announcements to convey which element is active or focused during scrolling, enabling control over accessibility narration, voice output, aria-live region content, and live updates for assistive technologies to improve user experience for visually impaired users navigating through scrolling content.
</div>

#### Example

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        navigatable: true,
        ARIATemplate: "Item #=data.index#",
		    contentHeight: "100%"
    });
    </script>

### autoBind `Boolean`*(default: true)*

If set to `false` the widget will not bind to the DataSource during initialization.

> Applicable only in the data-bound mode.


<div class="meta-api-description">
How do I control when Kendo UI ScrollView fetches its data? Configure initial data loading behavior in scrollable views by enabling or disabling automatic data binding on initialization, controlling whether the list fetches or binds its data source immediately or delays data retrieval until manually triggered, useful for managing when and how data fetches occur in data-driven scroll containers, supporting scenarios where you want to prevent automatic data requests at startup or defer data reads for optimization, manual refresh, or conditional loading within scrollable components that rely on external datasets.
</div>

#### Example

    <div id="example" style="margin:auto; width:60%">
      <button id="btn">ScrollView Load</button>
      <div id="scrollView" style="height: 500px; width:100%;"></div>

      <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
        </div>
         # } #
        </div>
      </script>

      <script>
        $('#btn').on('click', function(){
          let scrollview = $("#scrollView").data('kendoScrollView');
          scrollview.dataSource.fetch(function() {
            scrollview.scrollTo(0, true);
          });
        })


        var dataSource = new kendo.data.DataSource({
          type: "odata-v4",
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/odata/Products"
            }
          },
          serverPaging: true,
          pageSize: 3
        });

        $("#scrollView").kendoScrollView({
          dataSource: dataSource,
          autoBind: false,
          template: $("#scrollview-template").html(),
          contentHeight: "100%",
          enablePager: false
        });

        function setBackground(id) {
          return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
        }
      </script>

      <style>

        div.k-scrollview ul.k-scrollview-wrap > li {
          text-align: center;
          display: table;
          box-sizing: border-box;
        }

        ul.k-scrollview-wrap > li > .img-wrapper {
          padding: 2em;
          display: table-cell;
          vertical-align: middle;
          white-space: initial;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
          width: 30%;
          min-width: 150px;
          box-sizing: border-box;
          display: inline-block;
          vertical-align: top;
          margin-bottom: 1em;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div > div {
          margin: auto;
          margin-bottom: 0.5em;
        }

      </style>
    </div>

### bounceVelocityThreshold `Number`*(default: 1.6)*

The intensity of the swipe after which the swipe will result in a bounce effect when the user scrolls to the next page. Higher values require more accelerative swipe to notice the bounce effect when a page is changed.


<div class="meta-api-description">
How to adjust the velocity threshold for bounce effects in a Kendo UI ScrollView? Control the sensitivity and threshold for detecting quick swipe gestures that trigger bounce or overscroll effects during page navigation, adjusting how fast or forceful a swipe must be to produce a bounce or page change; configure, set, or tune the velocity limit that determines if rapid scrolling gestures result in elastic bounce behavior or smooth paging, enabling fine-tuning of swipe responsiveness, flick detection, gesture velocity sensitivity, and overscroll reactions to match desired user interaction speed and bounce triggers.
</div>

#### Example - increasing the bounce velocity threshold

    <div id="scrollView">
      <div data-role="page"><div style="height: 200px;">Foo</div></div>
      <div data-role="page"><div style="height: 200px;">Bar</div></div>
    </div>

    <script>

    $("#scrollView").kendoScrollView({
        bounceVelocityThreshold: 5
    });

    </script>

### contentHeight `Number|String`*(default: "auto")*

The height of the ScrollView content.

The supported string values are:

* `100%` - Used if the ScrollView container element does not have a set height. In this case, each page will be stretched to fill the height of the container.
* `auto`


<div class="meta-api-description">
How do I set the height of scrollable content in a Kendo UI ScrollView? Adjust or configure the vertical dimension or total height of scrollable content within a scrolling container to control page sizing and layout; set or define the scrollable area's height to automatic sizing that adapts dynamically or specify explicit height percentages like full container height to manage how each page or section fits and fills the viewport, enabling developers to scale, stretch, or auto-size scrolling content for responsive design, content fitting, and user interface layout customization within scrolling views or components.
</div>

#### Example - stretching the ScrollView

    <div id="scrollView" style="height: 500px;>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        contentHeight: "100%"
    });
    </script>

### dataSource `kendo.data.DataSource | Object`

An instance of a DataSource to which the ScrollView will be bound.

> If `dataSource` is set, the widget will operate in the data-bound mode.


<div class="meta-api-description">
How do I configure Kendo UI ScrollView to automatically populate its content from an external data source? Configure the scrollable list or container to dynamically display, render, and iterate over items by linking or binding it to a data collection, data source, or managed dataset, enabling automatic population and updating of content within the scroll area based on the connected data structure, data binding, or external data provider. This setup supports scenarios where developers need to control, set, or enable data-driven scrolling views, lists, grids, or item collections that update and render automatically from a specified data source instance for dynamic content management.
</div>

#### Example - binding the ScrollView to a remote DataSource

    <div id="scrollView" style="height: 500px; width:100%;"></div>
    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
         # } #
        </div>
    </script>
    <script>
        var dataSource = new kendo.data.DataSource({
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products"
              }
            },
            serverPaging: true,
            pageSize: 3
        });

        $("#scrollView").kendoScrollView({
            dataSource: dataSource,
            template: $("#scrollview-template").html(),
            contentHeight: "100%",
            enablePager: true
        });

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
        }
    </script>
    <style>
        div.k-scrollview ul.k-scrollview-wrap > li {
            text-align: center;
            display: table;
            box-sizing: border-box;
        }

        ul.k-scrollview-wrap > li > .img-wrapper {
            padding: 2em;
            display: table-cell;
            vertical-align: middle;
            white-space: initial;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div > div {
            margin: auto;
            margin-bottom: 0.5em;
        }
    </style>

### duration `Number`*(default: 400)*

The duration (in milliseconds) for the ScrollView to snap to the current page after the user releases it.


<div class="meta-api-description">
How to adjust animation speed in Kendo UI scrollview? Adjust the timing for page snapping animations in scrollable views by setting the delay or speed at which content settles after a swipe or drag gesture, enabling control over swipe responsiveness, animation duration, transition smoothness, and user interaction pacing when navigating between pages or sections within horizontally or vertically scrollable containers.
</div>

#### Example - increasing the duration of the snap transition

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        duration: "800",
		    contentHeight: "100%"
    });
    </script>

### emptyTemplate `String`*(default: "")*

The template for rendering the pages without content. By default, the ScrollView renders a blank page.

> Applicable only in the data-bound mode.


<div class="meta-api-description">
How do I customize the default empty state in Kendo UI ScrollView? Customize or set a placeholder, fallback content, or alternative view for empty or no-data scenarios within scrollable content areas, enabling control over what displays when the list, table, or data-driven view has no records. Configure a custom template, HTML snippet, or rendering function to replace default blank states in scrollable views or virtualized lists, ensuring users see meaningful messages, empty state indicators, or alternative UI elements when no data is available. Enable tailored empty view rendering for scroll containers in data-bound modes, supporting various methods to inject content for empty data sources, improving user experience during no-results or zero-item conditions in scrolling components.
</div>

#### Example

    <div id="scrollview" style="height: 120px;">
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script id="scrollview-empty" type="text/x-kendo-template">
      <div style="width: 100%; height: 100%; background-color: red;">empty</div>
    </script>

    <script>

    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/odata/Products"
        }
      },
      serverPaging: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }

    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: "scrollview-template",
        emptyTemplate: "scrollview-empty",
		    contentHeight: "100%"
    });
    </script>

### enablePager `Boolean`*(default: true)*

If set to `true`, the ScrollView will display a pager. By default, the pager is enabled.

> **Note:** The property has a lower priority than the [`pageable`](/api/javascript/ui/scrollview/configuration/pageable) property.


<div class="meta-api-description">
How can I hide page indicators in my Kendo UI ScrollView? Control the visibility of page indicators or navigation dots in a scrollable view to show or hide pagination UI elements, enabling users to see which page or section they are viewing during swiping or scrolling gestures; configure paging indicators for horizontal or vertical scroll containers, toggle pager display on or off depending on content layout or navigation style, and manage user interface hints for paged content navigation with preference over default or alternative pagination settings.
</div>

#### Example - turning off the pager in a ScrollView in the data-bound mode

    <div id="scrollView" style="height: 500px; width:100%;"></div>
    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
         # } #
        </div>
    </script>
    <script>
        var dataSource = new kendo.data.DataSource({
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products"
              }
            },
            serverPaging: true,
            pageSize: 3
        });

        $("#scrollView").kendoScrollView({
            dataSource: dataSource,
            template: $("#scrollview-template").html(),
            contentHeight: "100%",
            enablePager: false
        });

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
        }
    </script>
    <style>
        div.k-scrollview ul.k-scrollview-wrap > li {
            text-align: center;
            display: table;
            box-sizing: border-box;
        }

        ul.k-scrollview-wrap > li > .img-wrapper {
            padding: 2em;
            display: table-cell;
            vertical-align: middle;
            white-space: initial;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div > div {
            margin: auto;
            margin-bottom: 0.5em;
        }
    </style>

### messages `Object`

Defines the messages that are set as aria-lables for the previous and next buttons.


<div class="meta-api-description">
How to customize aria-label for ScrollView navigation buttons in Kendo UI? Set or customize accessible label text for ScrollView navigation buttons including 'previous' and 'next', enabling localized, descriptive aria-labels to improve screen reader announcements and assistive technology support; configure navigation button accessibility labels, define custom voiceover text, specify internationalized or translated aria-label attributes to enhance usability for users relying on keyboard navigation or screen readers while controlling focus and navigation cues in scrollable views.
</div>

#### Example

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        navigatable: true,
        messages: {
          previousButtonLabel: "prev",
          nextButtonLabel: "next"
        },
		    contentHeight: "100%"
    });
    </script>

### messages.nextButtonLabel `String`*(default: "Next")*

Defines the aria-label for the next button.


<div class="meta-api-description">
How to customize the accessible label for the next button in a Kendo UI ScrollView? Set or customize the accessible label, aria-label, or screen reader text for the next button in a scrolling view or carousel to enhance navigation accessibility, improve voiceover or screen reader announcements, adjust the descriptive text for assistive technologies, and control how the next navigation button is described for users relying on accessibility tools like ARIA attributes or screen readers.
</div>

#### Example - setting the nextButtonLabel

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        navigatable: true,
        messages: {
          nextButtonLabel: "Next button"
        },
		    contentHeight: "100%"
    });
    </script>

### messages.pagerLabel `String`*(default: "ScrollView pager")*

Defines the aria-label for the pager.

> **Note:** Will render the label only if paging and keyboard navigation are enabled.


<div class="meta-api-description">
How do I customize the accessibility label for the scrolling pager in a Kendo UI ScrollView? Configure or customize the accessibility label for the scrolling pager component to improve screen reader announcements and keyboard navigation cues when navigating between pages within a scrollable view. Enable or set an ARIA label specifically for the pager to enhance usability and compliance with accessibility standards during paginated content browsing. Adjust the visible or programmatic label that identifies the pager control in keyboard-driven scrolling interfaces, ensuring that assistive technologies can describe the pager context accurately when users move through multiple pages or sections. Optimize navigation feedback by defining descriptive pager labels that support keyboard users and screen readers in environments where paged scrolling is active and focus management is critical.
</div>

#### Example - setting the pagerLabel

    <div id="scrollView" style="height: 500px; width:100%;"></div>
    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
         # } #
        </div>
    </script>
    <script>
        var dataSource = new kendo.data.DataSource({
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products"
              }
            },
            serverPaging: true,
            pageSize: 3
        });

        $("#scrollView").kendoScrollView({
            dataSource: dataSource,
            messages: {
              pagerLabel: "Control pager"
            },
            navigatable: true,
            template: $("#scrollview-template").html(),
            contentHeight: "100%",
            enablePager: false
        });

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
        }
    </script>
    <style>
        div.k-scrollview ul.k-scrollview-wrap > li {
            text-align: center;
            display: table;
            box-sizing: border-box;
        }

        ul.k-scrollview-wrap > li > .img-wrapper {
            padding: 2em;
            display: table-cell;
            vertical-align: middle;
            white-space: initial;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div > div {
            margin: auto;
            margin-bottom: 0.5em;
        }
    </style>

### messages.previousButtonLabel `String`*(default: "Previous")*

Defines the aria-label for the previous button.


<div class="meta-api-description">
How to customize the previous button label in Kendo UI ScrollView? Customize, configure, or set the accessibility label, ARIA label, screen reader text, or descriptive tag for the button used to navigate backward or to the prior item in a scrollable view or carousel, enabling enhanced support for assistive technologies, improving semantic clarity for visually impaired users, and controlling the spoken or announced label that describes the previous navigation control, backward button, or prior page selector within scrolling user interface components.
</div>

#### Example - setting the previousButtonLabel

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        navigatable: true,
        messages: {
          previousButtonLabel: "Prev button"
        },
		    contentHeight: "100%"
    });
    </script>

### navigatable `Boolean`*(default: false)*

If set to true enables the built-in keyboard navigation


<div class="meta-api-description">
How do I enable keyboard navigation within a Kendo UI ScrollView? Control the ability to navigate through scrollable content using keyboard input, enabling or disabling keyboard-driven scrolling, arrow key navigation, focus movement, and tab navigation within a scroll container. Configure keyboard accessibility and interaction modes for a scrollable view, allowing users to use keys like arrows, tab, or page up/down to move through content, set keyboard focus handling, and manage whether the component reacts to keyboard events for scrolling and navigation. Adjust settings to enable keyboard support for navigation within scrollable areas, facilitating keyboard users or accessibility features by activating or deactivating keyboard navigation capabilities.
</div>

#### Example - increasing the duration of the snap transition

    <div id="scrollView" style="height: 500px;">
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
      <div data-role="page">This page will stretch to fit the entire view height</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        navigatable: true,
		    contentHeight: "100%"
    });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true` the grid will display a pager. By default paging is disabled.

Can be set to a JavaScript object which represents the pager configuration.


<div class="meta-api-description">
How to enable paged scrolling in Kendo UI ScrollView? Control and enable paged scrolling with navigation controls within a scrollable area, allowing users to flip through discrete pages or sections of content. Developers can activate or disable paging functionality to show page indicators, navigation dots, or pager components, customize pagination behavior, set up automated page switching, and configure page size or scroll snapping. This feature supports toggling pager visibility, applying custom pager settings, integrating with paged content displays, and managing user navigation through multi-page scroll views or carousel-like interfaces.
</div>

#### Example

    <div id="scrollview"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: "scrollview-template",
        pageable: true,
        contentHeight: "120px"
    });

    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/odata/Products"
        }
      },
      serverPaging: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### pageable.ARIATemplate `String`*(default: "Item #=data.index#")*

Specifies a template is used to populate the aria-label for each pager element.


<div class="meta-api-description">
How do I customize aria-label attributes for pager elements in Kendo UI scrollview? Configure custom accessible labels for pager elements in scrollable views by setting templates that dynamically generate aria-label attributes for each page indicator, enabling precise control over screen reader announcements, enhancing navigation clarity for users relying on assistive technologies, customizing pager item descriptions, and improving accessibility by tailoring verbal cues during scroll or page navigation actions.
</div>

#### Example

    <div id="scrollview"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    $("#scrollView").kendoScrollView({
        dataSource: dataSource,
        template: "scrollview-template",
        pageable: {
          ARIATemplate: "Image #=data.index#"
        },
        contentHeight: "120px"
    });

    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/odata/Products"
        }
      },
      serverPaging: true
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }
    </script>

### page `Number`*(default: 0)*

The initial page that will be displayed.


<div class="meta-api-description">
How do I set the initial page in a Kendo UI ScrollView? Control the starting page or initial visible screen in a scrollable view component to set which section, tab, or page appears when the interface loads or is rendered. Configure the default page or index of a scroll container to enable users to land on a specific portion of horizontally or vertically paged content, such as first, last, or any custom page. Enable, select, or specify the initial viewport within paginated scrollable areas for navigation, user onboarding, or focused content display right upon initialization. Manage initial scroll position targeting a particular page or content frame within a multi-page scroll region, supporting pre-selection and automatic page setting on component mount or startup.
</div>

#### Example

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView({
        page: 1
    });
    </script>

### pagerOverlay `String`*(default: "none")*

Sets an overlay background color for the pager. It can be configured to one of the three possible values:
- `none` - no background overlay is set
- `dark` - sets a dark-colored background overlay
- `light` - sets a light-colored background overlay


<div class="meta-api-description">
How do I customize the pager overlay in a Kendo UI ScrollView? Control and customize the background layer behind pagination indicators in a scrollable view by configuring a visual overlay that adjusts contrast and readability of page controls, enabling options to toggle no overlay, a dark translucent background to enhance visibility on light content, or a light overlay to improve contrast on darker elements, allowing developers to enable, disable, or set the pager background effect for optimal UI clarity and user navigation experience in scroll interactions.
</div>

#### Example

    <div id="scrollView" style="height: 500px; width:100%;"></div>
    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
         # } #
        </div>
    </script>
    <script>
        var dataSource = new kendo.data.DataSource({
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products"
              }
            },
            serverPaging: true,
            pageSize: 3
        });

        $("#scrollView").kendoScrollView({
            dataSource: dataSource,
            template: $("#scrollview-template").html(),
            contentHeight: "100%",
            enablePager: true,
            pagerOverlay: "dark"
        });

        function setBackground(id) {
            return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
        }
    </script>
    <style>
        div.k-scrollview ul.k-scrollview-wrap > li {
            text-align: center;
            display: table;
            box-sizing: border-box;
        }

        ul.k-scrollview-wrap > li > .img-wrapper {
            padding: 2em;
            display: table-cell;
            vertical-align: middle;
            white-space: initial;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div {
            width: 30%;
            min-width: 150px;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 1em;
        }

        ul.k-scrollview-wrap > li > .img-wrapper > div > div {
            margin: auto;
            margin-bottom: 0.5em;
        }
    </style>

### template `String`*(default: "#:data#")*

The template for rendering the content of the pages. By default, the ScrollView renders a `div` element for every page.

> Applicable only in the data-bound mode.


<div class="meta-api-description">
How do I customize the HTML structure of each page in a Kendo UI ScrollView? Define or customize the HTML structure or markup for each page or item within a scrollable list or view when working with data-bound components, enabling control over how content is dynamically rendered per page in a scrolling container; configure templates to override default div wrappers, specify custom layout, style, or element types for items, and tailor page rendering in virtualized or paged scrolling scenarios where the view binds to data sources, allowing precise control over the appearance and behavior of each scrollable page or item in data-driven interfaces.
</div>

#### Example - using a single-item template

    <script id="scrollview-template" type="text/x-kendo-template">
      <p>#= ProductName #</p>
    </script>

#### Example - using a multiple-item template with data being accessed through data[index].fieldName

    <script id="scrollview-template" type="text/x-kendo-template">
        # for (var i = 0; i < data.length; i++) { #
        <div>
            <p>#= data[i].ProductName #</p>
        </div>
         # } #
    </script>

    <div id="scrollview" style="height: 120px;"></div>

    <script>


    $("#scrollview").kendoScrollView({
        dataSource: {
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products"
              }
            },
            serverPaging: true,
            pageSize: 2
        },
        template: $("#scrollview-template").html(),
        contentHeight: 120,
        enablePager: false
    });
    </script>

### velocityThreshold `Number`*(default: 0.8)*

The length of the horizontal swipe after which a swipe will navigate to the next page - as opposed to snapping back to the current page. Higher values require long area swipes to navigate to the next page.


<div class="meta-api-description">
How do I adjust swipe sensitivity in Kendo UI ScrollView to prevent accidental page changes? Adjust swipe sensitivity and control horizontal paging in scroll views by setting the minimum swipe distance or speed needed to switch between pages, configure how far or fast a user must drag or flick horizontally before the view advances instead of snapping back, fine-tune responsiveness for swipe gestures by specifying thresholds that determine when horizontal scrolling triggers navigation to the next or previous page, customize swipe detection sensitivity to require longer or quicker horizontal gestures for page transitions, manage user interaction with swipe velocity limits to balance between accidental swipes and intentional page changes in scrollable interfaces.
</div>

#### Example

    <div id="scrollView" data-velocity-threshold="2">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>

    <script>
    $("#scrollview").kendoScrollView({
        velocityThreshold: 2
    });
    </script>

## Methods

### content

Updates the HTML content of the scrollView.

> The `content` method is not supported in the data-bound mode.


<div class="meta-api-description">
How do I update the content of a Kendo UI scrollview programmatically? Programmatically set, update, or replace the inner HTML content displayed within a scrollable container, enabling immediate refresh of visible content without relying on data bindings or reactive updates; configure or control dynamic HTML injection inside scroll views, directly manipulate the scrollable area's DOM after initialization, and override or reset scrollable content on demand to customize or refresh user interfaces with raw HTML strings, bypassing reactive data models.
</div>

#### Parameters

##### content `String | jQuery`

The new ScrollView content.

#### Example - changing the content after initialization

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>


    <script>
    $("#scrollView").kendoScrollView({
        velocityThreshold: 2
    });

    var scrollview = $("#scrollView").data("kendoScrollView");
    scrollview.content('<div data-role="page">Item1</div><div data-role="page">Item2</div>');
    </script>

### destroy

Prepares the ScrollView for safe removal from the DOM. Detaches all event handlers and removes the `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> The `destroy` method does not remove the `ScrollView` element from the DOM.


<div class="meta-api-description">
How do I safely remove a Kendo UI ScrollView instance from my page? Clean up and release ScrollView resources by calling the method that detaches event listeners, clears stored data, prevents memory leaks, and properly disposes of any nested UI components without removing the element from the DOM. This function is used to safely tear down the scrolling interface, disable event handlers, remove associated data attributes for garbage collection, and ensure child widgets linked to the ScrollView are also destroyed to avoid residual memory usage. Use this operation to finalize or reset the ScrollView instance, manage lifecycle cleanups, and maintain performance when dynamically updating or removing UI parts without DOM element removal.
</div>

#### Example

    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
    </div>

    <script>
    $("#scrollView").kendoScrollView();

    function destroyScrollView() {
      var scrollView = $("#scrollView").data("kendoScrollView");
      scrollView.destroy();
      $("#scrollView").remove();
    }
    </script>

### next

Switches to the next page with an animation.


<div class="meta-api-description">
How do I programmatically navigate to the next page in a Kendo UI ScrollView with animation? Advance the scrollable view forward to the next page or screen with smooth animated transitions, programmatically moving the current page index to the following item in a paginated scroll container. Control or trigger forward navigation through code, event handlers, or scripts to automatically slide or swipe to the subsequent page, enabling seamless page-by-page browsing or carousel-style interfaces with built-in animation effects. Enable next-page navigation for scrollable components, supporting tasks like programmatic page advancing, user-initiated page changes, or automated slideshow progression using method calls that animate the transition to the following page segment.
</div>

#### Example

    <div id="scrollView" style="height: 150px">
        <div data-role="page">Foo</div>
        <div data-role="page">Bar</div>
        <div data-role="page">Baz</div>
        <div data-role="page">Bat</div>
    </div>
    <script>
        var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView;
        scrollView.next();
    </script>

### prev

Switches to the previous page with an animation.


<div class="meta-api-description">
How do I use prev method to navigate back in a Kendo UI scrollview? Navigate back or move to the previous page in a paged scroll view with smooth animated transitions and programmatic control to trigger sliding effects, reversing the scroll or paging action by stepping one page backward within a scrollable container, enabling manual or scripted backward navigation through content panels, slides, or items with transition animations for seamless user experience when moving to the prior view or previous content segment.
</div>

#### Example

	<div id="scrollView" style="height: 150px">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
		<div data-role="page">Baz</div>
		<div data-role="page">Bat</div>
	</div>
	<script>
		var scrollView = $("#scrollView").kendoScrollView({ page: 1}).data().kendoScrollView;
		scrollView.prev();
	</script>

### refresh

Redraws the ScrollView pager.


<div class="meta-api-description">
How do I update pagination controls in Kendo UI ScrollView after dynamic content changes? Trigger a manual update or refresh of scrollable content indicators and layout after dynamic changes, enabling re-rendering of pagination controls, adjusting visible items, recalculating sizes, synchronizing the scroll container with updated or modified child elements, forcing the scroll view to reload current data, reset or recalculate pager and navigation state, and ensure that any changes in content structure or dimensions are immediately reflected in the user interface.
</div>

#### Example

	<div id="scrollView" style="height: 150px">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
	</div>

	<script>
		var scrollView = $("#scrollView").kendoScrollView({ enablePager: true}).data().kendoScrollView;
		scrollView.refresh();
	</script>

### scrollTo

Scrolls to the specified page. Page indices are zero-based.


<div class="meta-api-description">
How do I programmatically navigate to a specific page in my Kendo UI ScrollView? Programmatically navigate or jump to a specific page within a scrollable view by setting or controlling the visible content position using zero-based page indices; enable direct page navigation, go to a particular page, move the scroll to a designated index, or programmatically change which page is displayed after initialization to manage pagination and scrolling behavior dynamically.
</div>

#### Parameters

##### page `Number`

The page to which will be scrolled.

##### instant `Boolean` *(default: false)*

If set to `true`, the ScrollView will instantly jump to the specified page without any animation effects.

#### Example - scrolling instantly and without animation

	<div id="scrollView">
		<div data-role="page">Foo</div>
		<div data-role="page">Bar</div>
		<div data-role="page">Baz</div>
		<div data-role="page">Bat</div>
	</div>
	<script>
    var scrollView = $("#scrollView").kendoScrollView().data().kendoScrollView;
    scrollView.scrollTo(2); //scrolls to the 3rd page

	</script>

### setDataSource

Sets the DataSource of an existing ScrollView and rebinds it.


<div class="meta-api-description">
How do I dynamically update the data in a Kendo UI ScrollView with new data provider? Update or replace the data source for scrollable content dynamically by setting a new data provider to refresh, reload, or rebind the scroll view’s displayed items instantly; configure or change the underlying data array, collection, or dataset at runtime to force an immediate update of visible elements without reinitializing the component, enabling dynamic content changes, live data updates, or swapping data feeds programmatically to control the list or grid contents shown within the scroll container.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <div id="scrollview" style="height: 150px;"></div>
    <script id="tmp" type="text/x-kendo-template">
		<div>#: foo #</div>
    </script>
    <script>
      var ds = new kendo.data.DataSource({
        data: [{ foo: 1 }, { foo: 2 }]
      });

      var scrollView = $("#scrollview").kendoScrollView({
        dataSource: ds,
        template: $("#tmp").html()
      }).data().kendoScrollView;

      scrollView.setDataSource(new kendo.data.DataSource({
        data: [{ foo: 3 }, { foo: 4 }]
      }));
    </script>

## Events

### change

Fires when the ScrollView page is changed.


<div class="meta-api-description">
How do I detect when the page changes in a Kendo UI ScrollView? Detect page transitions, monitor active page updates, respond to scroll or swipe actions within paginated scroll containers, trigger events or callbacks when the displayed page changes, listen for page index modifications, handle dynamic content loading on page change, synchronize UI elements or indicators according to the current scroll position, capture and react to user navigation within scrollable views, update state or persist the current page for state management, and coordinate multiple components based on page navigation events.
</div>

#### Event Data

##### e.currentPage `Number`

The current page (zero-based index).

##### e.nextPage `Number`

The next page (zero-based index).

##### e.element `jQuery`

The page element. In the standard mode, the parameter will be undefined.

> Available only in the data-bound mode.

##### e.data `Array`

The data collection. In the standard mode, the parameter will be undefined.

> Available only in the data-bound mode.

##### e.preventDefault `Function`

If invoked, prevents the change action.

#### Example - hooking up to the change event

    <div id="scrollview"></div>

    <script id="scrollview-template" type="text/x-kendo-template">
      <div style="width: 110px; height: 110px; background-image: #=setBackground(ProductID)#;"></div>
      <p>#= ProductName #</p>
    </script>

    <script>
    $("#scrollview").kendoScrollView({
          dataSource: dataSource,
          template: "scrollview-template",
          contentHeight: "120px",
          enablePager: false,
          change: change
    });

    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/odata/Products"
        }
      },
      serverPaging: true,
      pageSize: 30
    });

    function setBackground(id) {
      return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id +".jpg)";
    }

    function change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("page ", e.page, "data: ", e.data);
      //handle event
    }
    </script>

### refresh

Fires when the ScrollView refreshes.


<div class="meta-api-description">
What triggers the refresh event in Kendo UI ScrollView? Detect and respond to updates in scrollable content visibility triggered by user interactions like pull-to-refresh gestures, programmatic refresh calls, viewport or layout changes, enabling dynamic UI updates, data rebinding, layout recalculations, and additional content loading whenever the scroll area refreshes or content is re-rendered.
</div>

#### Event Data

##### e.pageCount `Number`

The number of pages.

##### e.page `Number`

The current page number (zero-based index).

##### e.preventDefault `Function`

If invoked, prevents the `change` event. The ScrollView stays on the current page.

#### Example


    <div id="scrollView">
      <div data-role="page">Foo</div>
      <div data-role="page">Bar</div>
      <div data-role="page">Baz</div>
      <div data-role="page">Bat</div>
    </div>


    <script>
     $("#scrollView").kendoScrollView({
          refresh: refresh
    });

    function refresh(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Total: ", e.pageCount, " Current: ", e.page);
      //handle event
    }
    </script>
