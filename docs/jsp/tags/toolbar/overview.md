---
title: Overview
---

# ToolBar

The ToolBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ToolBar](/api/web/toolbar) widget.

## Getting Started

### Example - initialization and basic usage

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

            <!-- custom template
            <kendo:toolBar-item template="<input id='dropdown' style='width: 150px' />" overflow="never"></kendo:toolBar-item>

        </kendo:toolBar-items>
    </kendo:toolBar>

### Configure the Kendo ToolBar

Here is how to configure the Kendo AutoComplete:

 1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.
 2.  Create a new action method:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/window/index";
        }

 3. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

 4.  Add a toolbar tag and specify the widget controls:

    <kendo:toolBar name="toolbar">
        <kendo:toolBar-items>
            <kendo:toolBar-item type="button" text="Button"></kendo:toolBar-item>
        </kendo:toolBar-items>
    </kendo:toolBar>

 5. For more information regarding supported command types please check [this link](/web/toolbar/overview#command-types).

## Accessing an Existing ToolBar

You can reference an existing ToolBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).

### Accessing an existing ToolBar instance

    // Put this after your Kendo ToolBar tag declaration
    <script>
    $(function() {
        var toolbar = $("#container").data("kendoToolBar");
    });
    </script>


## Handling Kendo UI ToolBar events

You can subscribe to all [events](/api/web/toolbar#events) exposed by Kendo UI ToolBar:

### WebForms - subscribe by handler name

    <kendo:toolBar name="toolbar" click="onClick" toggle="onToggle"></kendo:toolBar>
    <script>
        function onClick(e) {
            //Handle the click event
        }

        //.....
    </script>
