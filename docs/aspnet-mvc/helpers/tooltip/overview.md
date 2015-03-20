---
title: Overview
---

# Tooltip

The Tooltip HtmlHelper extension is a server-side wrapper for the [Kendo UI Tooltip](/api/web/tooltip) widget.

## Getting Started

There are several ways to define content for the Kendo Tooltip for ASP.NET MVC:

*   **static text** - set a static text which to be displayed as text.
*   **function** - JavaScript function which to supply the content for the tooltip.
*   **ajax** - content will be retrieved via ajax request

### Configure the Kendo Tooltip

Here is how to configure the Kendo AutoComplete:

 1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.
 2.  Create a new action method:

        public ActionResult Index()
        {
            return View();
        }
 3.  Add a tooltip:
     - WebForms

             <%: Html.Kendo().Tooltip()
                 .For("#container") //The for option of the autocomplete is mandatory.
                                    //It is a jQuery selector which specifies the element or the container for the elements for which the tooltip will be shown.
                 .Filter("a[title]") //The jQuery selector which narrows the elements within the container for which the tooltip will be shown.
                 .Content("custom text")
             %>
     - Razor

             @(Html.Kendo().Tooltip()
                 .For("#container") //The for option of the autocomplete is mandatory.
                                    //It is a jQuery selector which specifies the element or the container for the elements for which the tooltip will be shown.
                 .Filter("a[title]") //The jQuery selector which narrows the elements within the container for which the tooltip will be shown.
                 .Content("custom text")
             )

### Configure the Kendo Tooltip with a load-on-demand content

Here is how to configure the Kendo Tooltip:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Create an action method which renders the content:

        public ActionResult AjaxContent()
        {
            return View();
        }
4.  Add a Tooltip:
    - WebForms

            <%: Html.Kendo().Tooltip()
                   .For("#container") //The for option of the autocomplete is mandatory.
                                    //It is a jQuery selector which specifies the element or the container for the elements for which the tooltip will be shown.
                   .LoadContentFrom("AjaxContent", "Tooltip") //define the Action and Controller name
            %>
    - Razor

            @(Html.Kendo().Tooltip()
                   .For("#container") //The for option of the autocomplete is mandatory.
                                    //It is a jQuery selector which specifies the element or the container for the elements for which the tooltip will be shown.
                   .LoadContentFrom("AjaxContent", "Tooltip") //define the Action and Controller name
            )

## Accessing an Existing Tooltip

You can reference an existing Tooltip instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/tooltip#methods) to control its behavior.

### Accessing an existing Tooltip instance

    //Put this after your Kendo Tooltip for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the For() of the tooltip is used to get its client-side instance
        var tooltip = $("#container").data("kendoTooltip");
    });
    </script>


## Handling Kendo UI Tooltip events

You can subscribe to all [events](/api/web/tooltip#events) exposed by Kendo UI Tooltip:

### WebForms - subscribe by handler name

    <%: Html.Kendo().Tooltip()
        .For("#container")
        .Events(e => e
            .Show("tooltip_show")
            .Hide("tooltip_hide")
        )
    %>
    <script>
        function tooltip_show() {
            //Handle the show event
        }

        function tooltip_hide() {
            //Handle the hide event
        }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Tooltip()
      .For("#container")
      .Events(e => e
            .Show("tooltip_show")
            .Hide("tooltip_hide")
      )
    )
    <script>
        function tooltip_show() {
            //Handle the show event
        }

        function tooltip_hide() {
            //Handle the hide event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Tooltip()
      .For("#container")
      .Events(e => e
          .Show(@<text>
            function() {
                //Handle the show event inline
            }
          </text>)
          .Hide(@<text>
            function() {
                //Handle the hide event inline
            }
            </text>)
      )
    )

