---
title: Tooltip
page_title: Configuration, methods and events of Kendo UI Tooltip
---

# kendo.ui.Tooltip

Represents the Kendo UI Tooltip. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoHide `Boolean`*(default: true)*

Specifies if the Tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within Tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.

#### Example - prevent the Tooltip from closing automatically

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

### animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animations

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

The animation that will be used when a Tooltip closes.

#### Example - set close animation

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

Effect to be used for closing of the Tooltip.

#### Example - set close animation effect

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

Defines the animation duration.

#### Example - set close animation duration

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

The animation that will be used when a Tooltip opens.

#### Example - set open animation

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

Effect to be used for opening of the Tooltip.

#### Example - set open animation effect

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

Defines the animation duration.

#### Example - set open animation duration

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

The text or a function which result will be shown within the Tooltip.
By default the Tooltip will display the target element title attribute content.

> If the content passed to the Tooltip includes scripts, they will be executed. If this is not desired, make sure to strip any undesired content in advance.

#### Example - extract the content from target element content

    <div id="container">
        <span>Some content</span>
        <span>Some more content</span>
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoTooltip({
            filter: "span",
            content: function(e) {
              var target = e.target; // the element for which the tooltip is shown
              return target.text(); // set the element text as content of the tooltip
            }
          });
        });
    </script>

#### Example - content as static text

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

Specifies a URL or request options that the Tooltip should load its content from.

>Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - load content from remote URL

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        });
      });
    </script>

### callout `Boolean`*(default:true)*

Specifies if the Tooltip callout will be displayed.

#### Example - hide the Tooltip callout

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

Specifies a selector for elements, within the container, for which the Tooltip will be displayed.

#### Example - show Tooltip only for strong elements in a text

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

Explicitly states whether content iframe should be created.

### height `Number`*(default: Infinity)*

The height (in pixels) of the Tooltip.

#### Example - set the height of the Tooltip

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

#### Example - set the width of the Tooltip

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

The position relative to the target element, at which the Tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

#### Example - set Tooltip position

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

Specify the delay in milliseconds before the Tooltip is shown. This option is ignored if `showOn` is set to "click" or "focus".

#### Example - set show delay

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

The event on which the Tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

#### Example - set event on which the Tooltip will be shown

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

## Methods

### show

Shows the Tooltip for given target.

#### Example - show Tooltip for target element

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

The target element for which the Tooltip should be shown.

### hide

Hides the Tooltip.

#### Example - manually close the Tooltip

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

Refresh the Tooltip content.

#### Example force refresh of the Tooltip content

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

Gets the Tooltip current target.

#### Example

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

`jQuery` The target element or null.

## Events

### contentLoad

Triggered when an AJAX request for content completes.

#### Example - subscribe to the "contentLoad" event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          contentLoad: function() {
            console.log("content is loaded");
          }
        });
      });
    </script>

#### Example - subscribe to the "contentLoad" event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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

Triggered when a Tooltip is shown.

#### Example - subscribe to "show" event during initialization

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

#### Example - subscribe to "show" event after initialization

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

#### Example - force refresh every time the Tooltip is shown

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

Triggered when a Tooltip is hidden

#### Example - subscribe to "hide" event during initialization

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

#### Example - subscribe to "hide" event after initialization

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

Triggered before an AJAX request started. Note that this event is triggered only when an AJAX request, instead of an iframe, is used.

#### Example - subscribe to "requestStart" event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          requestStart: function(e) {
            console.log("request is started");
          }
        });
      });
    </script>

#### Example - subscribe to "requestStart" event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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

The target element, for which the Tooltip is shown.

##### e.options `Object`

The request options which will be set to [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) or to the iframe

### error

Triggered when an AJAX request for content fails.

#### Example - subscribe to "error" event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          error: function(e) {
            console.log("error");
          }
        });
      });
    </script>

#### Example - subscribe to "error" event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "http://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
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

The XHR request object, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

##### e.status `String`

The status of the request, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)
