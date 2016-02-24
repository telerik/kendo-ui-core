---
title: Overview
page_title: Overview | ToolBar JSP Tag
description: "Get started with the ToolBar JSP tag in Kendo UI."
slug: overview_toolbar_uiforjsp
position: 1
---

# ToolBar JSP Tag Overview

The ToolBar JSP tag is a server-side wrapper for the [Kendo UI ToolBar](/api/javascript/ui/toolbar) widget.

## Getting Started

### Initialization

The example below demonstrates how to initialize the ToolBar and also its basic usage.

###### Example

      <kendo:toolBar name="toolbar">
          <kendo:toolBar-items>

              <!-- regular button -->
              <kendo:toolBar-item type="button" text="Button"></kendo:toolBar-item>

              <!-- toggle button -->
              <kendo:toolBar-item type="button" togglable="true" text="Toggle Button"></kendo:toolBar-item>

              <!-- split button -->
              <kendo:toolBar-item type="splitButton" text="Split Button">
                  <kendo:toolBar-item-menuButtons>
                      <kendo:toolBar-item-menuButton text="Option 1" id="option1"></kendo:toolBar-item-menuButton>
                      <kendo:toolBar-item-menuButton text="Option 2" id="option2"></kendo:toolBar-item-menuButton>
                      <kendo:toolBar-item-menuButton text="Option 3" id="option3"></kendo:toolBar-item-menuButton>
                  </kendo:toolBar-item-menuButtons>
              </kendo:toolBar-item>

              <!-- button group -->
              <kendo:toolBar-item type="buttonGroup">
                  <kendo:toolBar-item-buttons>
                      <kendo:toolBar-item-button text="Left" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyLeft"></kendo:toolBar-item-button>
                      <kendo:toolBar-item-button text="Center" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyCenter"></kendo:toolBar-item-button>
                      <kendo:toolBar-item-button text="Right" togglable="true" group="text-align" spriteCssClass="k-tool-icon k-justifyRight"></kendo:toolBar-item-button>
                  </kendo:toolBar-item-buttons>
              </kendo:toolBar-item>

              <!-- separator -->
              <kendo:toolBar-item type="separator"></kendo:toolBar-item>

              <!-- custom template -->
              <kendo:toolBar-item template="<input id='dropdown' style='width: 150px' />" overflow="never"></kendo:toolBar-item>

          </kendo:toolBar-items>
      </kendo:toolBar>

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ToolBar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/window/index";
        }

 **Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `toolbar` tag and specify the widget controls.

###### Example

      <kendo:toolBar name="toolbar">
          <kendo:toolBar-items>
              <kendo:toolBar-item type="button" text="Button"></kendo:toolBar-item>
          </kendo:toolBar-items>
      </kendo:toolBar>

For more information on the supported command types, refer to [this link]({% slug overview_kendoui_toolbar_widget %}#command-types).

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ToolBar](/api/javascript/ui/toolbar#events) by the handler name.

###### Example

      <kendo:toolBar name="toolbar" click="onClick" toggle="onToggle"></kendo:toolBar>
      <script>
          function onClick(e) {
              //Handle the click event
          }

          //.....
      </script>

## Reference

### Existing Instances

You are able to reference an existing ToolBar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ToolBar API](/api/javascript/ui/toolbar#methods) to control its behavior.

###### Example

      // Put this after your Kendo ToolBar tag declaration
      <script>
      $(function() {
          var toolbar = $("#container").data("kendoToolBar");
      });
      </script>

## See Also

Other articles on Telerik UI for JSP and on the ToolBar:

* [Overview of the Kendo UI ToolBar Widget]({% slug overview_kendoui_toolbar_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
