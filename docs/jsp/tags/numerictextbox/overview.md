---
title: Overview
page_title: Overview | NumericTextBox JSP Tag
description: "Get started with the NumericTextBox JSP tag in Kendo UI."
slug: overview_numerictextbox_uiforjsp
position: 1
---

# NumericTextBox JSP Tag Overview

The NumericTextBox JSP tag is a server-side wrapper for the [Kendo UI NumericTextBox](/api/javascript/ui/numerictextbox) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI NumericTextBox.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/numerictextbox/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add the `numerictextbox` tag.

###### Example

        <kendo:numericTextBox name="numerictextbox" value="10" max="100" min="-100">
        </kendo:numericTextBox>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI NumericTextBox](/api/javascript/ui/numerictextbox#events) by the handler name.

###### Example

      <kendo:numericTextBox name="numerictextbox" change="numerictextbox_change"></kendo:numericTextBox>

      <script>
          function numerictextbox_change() {
              //Handle the change event
          }
      </script>

## Reference

### Existing Instances

You are able to reference an existing NumericTextBox instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [NumericTextBox API](/api/javascript/ui/numerictextbox#methods) to control its behavior.

###### Example

    //Put this after your Kendo NumericTextBox tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the numerictextbox is used to get its client-side instance
        var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the NumericTextBox:

* [Overview of the Kendo UI NumericTextBox Widget]({% slug overview_kendoui_numerictextbox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
