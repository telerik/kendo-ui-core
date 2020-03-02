---
title: Tooltip
page_title: Configuration, methods and events of Kendo UI Tooltip
res_type: api
component: tooltip
---

# kendo.ui.Tooltip

Represents the Kendo UI Tooltip. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoHide `Boolean`*(default: true)*

Specifies if the Tooltip will be hidden when the mouse leaves the target element. If set to `false`, a **Close** button will be shown within Tooltip. If set to `false`, `showAfter` is specified, and `showOn` is set to `mouseenter`, the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - preventing the Tooltip from closing automatically

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            autoHide: false
          });
        });
    </script>

### animation `Boolean|Object`

A collection of `{Animation}` objects which are used to change the default animations. If set to `false`, all widget animations will be disabled. `animation:true` is not a valid configuration.

#### Example - disabling animations

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: false
          });
        });
    </script>

### animation.close `Object`

The animation that will be used when the Tooltip closes.

#### Example - setting the close animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              close: {
                effects: "fade:out"
              }
            }
          });
        });
    </script>

### animation.close.effects `String`

The effect that will be used for closing the Tooltip.

#### Example - setting the close animation effect

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              close: {
                effects: "fade:out"
              }
            }
          });
        });
    </script>

### animation.close.duration `Number`

Defines the duration of the close animation.

#### Example - setting the duration of the close animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              close: {
                duration: 1000
              }
            }
          });
        });
    </script>

### animation.open `Object`

The animation that will be used when the Tooltip opens.

#### Example - setting the open animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              open: {
                effects: "fade:in",
                duration: 1000
              }
            }
          });
        });
    </script>

### animation.open.effects `String`

The effect that will be used for opening the Tooltip.

#### Example - setting the open animation effect

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              open: {
                effects: "fade:in"
              }
            }
          });
        });
    </script>

### animation.open.duration `Number`

Defines the duration of the open animation.

#### Example - setting the duration of the open animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              open: {
                duration: "1000"
              }
            }
          });
        });
    </script>

### content `Object|String|Function`

The text or the function whose result will be shown within the Tooltip. By default, the Tooltip will display the content of the `title` attribute of the target element. To retrieve the `title` attribute of the target from inside the `content` function, use `target.data("title")`.

> If the content that is passed to the Tooltip includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.

#### Example - extracting the content from the target element content

    <div id="container">
        <span title="foo">Some content</span>
        <span title="bar">Some more content</span>
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoTooltip({
            filter: "span",
            content: function(e) {
              var target = e.target; // the element for which the tooltip is shown
              return target.data("title") + " " + target.text(); // set the element text as content of the tooltip
            }
          });
        });
    </script>

#### Example - implementing the content as static text

    <span id="target">
        Some content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            content: "Tooltip content!"
          });
        });
    </script>

### content.url `String`

Specifies a URL or a request option from which the Tooltip will load its content.

> For URLs which start with a protocol (for example, `http://`), an iframe container element will be automatically created. This behavior may change in future versions, so it is advisable to always use the [`iframe` configuration option](#iframe).

#### Example - loading content from a remote URL

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        });
      });
    </script>

### callout `Boolean`*(default:true)*

Specifies if the Tooltip callout will be displayed.

#### Example - hiding the callout of the Tooltip

    <span id="target" title="Tooltip content">
        Some content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            callout: false
          });
        });
    </script>

### filter `String`

Specifies a selector for the elements within the container which will display the Tooltip.

#### Example - showing a Tooltip only for strong elements in a text

    <div id="container">
        I'm a <strong title="First target">tooltip target</strong>. I'm also a
        <strong title="Second target">tooltip target</strong>.
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoTooltip({
            filter: "strong"
          });
        });
    </script>

### iframe `Boolean`

Explicitly states whether a content `iframe` will be created.

### height `Number`*(default: Infinity)*

The height (in pixels) of the Tooltip.

#### Example - setting the height of the Tooltip

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          height: 80
        });
      });
    </script>

### width `Number`*(default: Infinity)*

The width (in pixels) of the Tooltip.

#### Example - setting the width of the Tooltip

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          width: 180
        });
      });
    </script>

### position `String`*(default: "bottom")*

The position that is relative to the target element at which the Tooltip will be shown.

The supported values are:

* `bottom`
* `top`
* `left`
* `right`
* `center`

#### Example - setting the position of the Tooltip

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          position: "right"
        });
      });
    </script>

### showAfter `Number`*(default: 100)*

Specifies the delay (in milliseconds) before the Tooltip shows. This option is ignored if `showOn` is set to `click` or `focus`.

#### Example - setting the show delay

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showAfter: 1000
        });
      });
    </script>

### showOn `String`*(default: "mouseenter")*

The event on which the Tooltip will be shown.

The supported values are:

* `mouseenter`
* `click`
* `focus`

#### Example - setting the event on which the Tooltip will be shown

    <span id="target" title="Tooltip content">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showOn: "click"
        });
      });
    </script>

#### Example - setting the multiple events on which the Tooltip will be shown

    <span id="target" title="Tooltip content">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showOn: "click mouseenter"
        });
      });
    </script>

### hideAfter `Number`*(default: 100)*

Specifies the delay (in milliseconds) before the Tooltip is hidden.

#### Example - setting the hide delay

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          hideAfter: 500
        });
      });
    </script>

### offset `Number`*(default: 0)*

Specifies the offset (in pixels) between the Tooltip and the anchor. If the `callout` property is set to `true`, the offset is rendered from the callout arrow. If the `callout` property is set to `false`, the offset is rendered from the content of the Tooltip.

#### Example - setting the Tooltip offset

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          offset: 10
        });
      });
    </script>

## Fields

### popup `kendo.ui.Popup`

Contains the Kendo UI [`Popup`](/api/javascript/ui/popup) instance which manages the showing and hiding of the tooltips at the appropriate position. The `popup` field can be used to apply custom CSS classes and styles, or any other attributes to the [`element` or `wrapper`](/intro/widget-basics/wrapper-element) settings of the Popup.

## Methods

### show

Shows the Tooltip for a specific target.

#### Example - showing the Tooltip for the target element

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip().data("kendoTooltip");
        tooltip.show($("#target"));
      });
    </script>

#### Parameters

##### element `jQuery`

The target element for which the Tooltip will be shown.

### hide

Hides the Tooltip.

#### Example - manually closing the Tooltip

    <div id="container">
      <span title="Tooltip content">Tooltip target</span>
    </div>

    <button id="hideTooltip" class="k-button">Hide tooltip</button>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          autoHide: false,
          position: "right"
        }).data("kendoTooltip");

        $("#hideTooltip").click(function() {
          tooltip.hide();
        });
      });
    </script>

### refresh

Refreshes the content of the Tooltip.

#### Example - forcing the refreshing of the Tooltip content

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <button id="refreshButton" class="k-button">Refresh Content</button>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          position: "right",
          content: function() {
            return "last time refreshed: " + kendo.format("{0:T}", new Date());
          }
        }).data("kendoTooltip");


        $("#refreshButton").click(function() {
          tooltip.refresh();
        });
      });
    </script>

### target

Gets the current target of the Tooltip.

#### Example - getting the current target of the tooltip

    <div id="container">
      <span id="target1" title="Tooltip1 content">Tooltip target1</span> <br />
      <span id="target2" title="Tooltip2 content">Tooltip target2</span>
    </div>

    <button id="targetButton" class="k-button">Log target</button>

    <script>
      $(document).ready(function() {

        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          autoHide: false,
          position: "right"
        }).data("kendoTooltip");


        $("#targetButton").click(function() {
          var target = tooltip.target();
          if (target) {
            console.log(target.attr("id"));
          }
        });
      });
    </script>

#### Returns

`jQuery` - The target element or `null`.

## Events

### contentLoad

Fires when an AJAX request for the content completes.

#### Example - subscribing to the contentLoad event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          contentLoad: function() {
            console.log("content is loaded");
          }
        });
      });
    </script>

#### Example - subscribing to the contentLoad event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("contentLoad", function() {
          console.log("content is loaded");
        });
      });
    </script>

### show

Fires when a Tooltip is shown.

#### Example - subscribing to the show event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          show: function() {
            console.log("tooltip is shown");
          }
        });

      });
    </script>

#### Example - subscribing to the show event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
        }).data("kendoTooltip");

        tooltip.bind("show", function() {
          console.log("tooltip is shown");
        });
      });
    </script>

#### Example - forcing refresh every time the Tooltip is shown

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <script>
      $(document).ready(function() {
        $("#container").kendoTooltip({
          filter: "span",
          position: "right",
          content: function() {
            return "last time refreshed: " + kendo.format("{0:T}", new Date());
          },
          show: function() {
            this.refresh();
          }
        });
      });
    </script>

### hide

Fires when a Tooltip is hidden.

#### Example - subscribing to the hide event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          hide: function() {
            console.log("tooltip is hidden!");
          }
        });

      });
    </script>

#### Example - subscribing to the hide event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip().data("kendoTooltip");

        tooltip.bind("hide", function() {
            console.log("tooltip is hidden!");
        });
      });
    </script>

### requestStart

Fires before an AJAX request starts. Note that this event is triggered only when an AJAX request is used instead of an `iframe`.

#### Example - subscribing to the requestStart event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          requestStart: function(e) {
            console.log("request is started");
          }
        });
      });
    </script>

#### Example - subscribing to the requestStart event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("requestStart", function(e) {
          console.log("request is started");
        });
      });
    </script>

#### Event Data

##### e.target `jQuery`

The target element for which the Tooltip is shown.

##### e.options `Object`

The request options which will be set to [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/) or to the `iframe`.

### error

Fires when an AJAX request for content fails.

#### Example - subscribing to the error event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          error: function(e) {
            console.log("error");
          }
        });
      });
    </script>

#### Example - subscribing to the error event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("error", function(e) {
          console.log("error");
        });
      });
    </script>

#### Event Data

##### e.xhr `jqXHR`

The XHR request object as returned by [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

##### e.status `String`

The status of the request as returned by [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).
