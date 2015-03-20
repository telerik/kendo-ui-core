---
title: Overview
---

# ToolBar

The ToolBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ToolBar](/api/web/toolbar) widget.

## Getting Started

### Example - initialization and basic usage

    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {

            //regular button
            items.Add().Type(CommandType.Button).Text("Button").Icon("note");

            //toggle button
            items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true).Selected(true);

            //split button
            items.Add().Type(CommandType.SplitButton).Text("Split Button").MenuButtons(menuButtons =>
            {
                menuButtons.Add().Text("Option 1").Id("option1");
                menuButtons.Add().Text("Option 2").Id("option2");
                menuButtons.Add().Text("Option 3").Id("option3");
            });

            //button group
            items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
            {
                buttons.Add().Text("Left").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyLeft");
                buttons.Add().Text("Center").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyCenter");
                buttons.Add().Text("Right").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyRight");
            });

            //separator
            items.Add().Type(CommandType.Separator);

            //custom template
            items.Add().Template("<input id='dropdown' style='width: 150px;' />").Overflow(ShowInOverflowPopup.Never);
        })
    )

### Configure the Kendo ToolBar

Here is how to configure the Kendo AutoComplete:

 1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.
 2.  Create a new action method:

        public ActionResult Index()
        {
            return View();
        }

 3.  Add a toolbar:
     - WebForms

             <%: Html.Kendo().ToolBar()
                 .Resizable(true)   //Enable or disable the resizing feature

                 .Items(items => {  //Define the widget commands
                    items.Add().Type(CommandType.Button).Text("Button");
                 })
             %>
     - Razor

             @(Html.Kendo().ToolBar()
                 .Resizable(true)   //Enable or disable the resizing feature

                 .Items(items => {  //Define the widget commands
                    items.Add().Type(CommandType.Button).Text("Button");
                 })
             )

 4. For more information regarding supported command types please check [this link](/web/toolbar/overview#command-types).

## Accessing an Existing ToolBar

You can reference an existing ToolBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).

### Accessing an existing ToolBar instance

    //Put this after your Kendo ToolBar for ASP.NET MVC declaration
    <script>
    $(function() {
        var toolbar = $("#container").data("kendoToolBar");
    });
    </script>


## Handling Kendo UI ToolBar events

You can subscribe to all [events](/api/web/toolbar#events) exposed by Kendo UI ToolBar:

### WebForms - subscribe by handler name

    <%: Html.Kendo().ToolBar()
         .Items(items => {  //Define the widget commands
            items.Add().Type(CommandType.Button).Text("Button");
         })
         .Events(e => e
            .Click("onClick")
            .Toggle("onToggle")
            .Open("onOpen")
            .Close("onClose")
            .OverflowOpen("onOverflowOpen")
            .OverflowClose("onOverflowClose")
         )
    %>
    <script>
        function onClick(e) {
            //Handle the click event
        }

        //.....
    </script>

### Razor - subscribe by handler name

    @(Html.Kendo().ToolBar()
         .Items(items => {  //Define the widget commands
            items.Add().Type(CommandType.Button).Text("Button");
         })
         .Events(e => e
            .Click("onClick")
            .Toggle("onToggle")
            .Open("onOpen")
            .Close("onClose")
            .OverflowOpen("onOverflowOpen")
            .OverflowClose("onOverflowClose")
         )
    )
    <script>
        function onClick(e) {
            //Handle the click event
        }

        //.....
    </script>
