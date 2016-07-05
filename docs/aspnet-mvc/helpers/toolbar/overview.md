---
title: Overview
page_title: Overview | Kendo UI ToolBar HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ToolBar widget for ASP.NET MVC."
slug: overview_toolbarhelper_aspnetmvc
position: 1
---

# ToolBar HtmlHelper Overview

The ToolBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ToolBar](https://demos.telerik.com/kendo-ui/toolbar/index) widget.

## Getting Started

### Initialization

The example below demonstrates how to initialize the ToolBar.  

###### Example

      @(Html.Kendo().ToolBar()
          .Name("ToolBar")
          .Items(items => {

              //A regular button.
              items.Add().Type(CommandType.Button).Text("Button").Icon("note");

              //A toggle button.
              items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true).Selected(true);

              //The Split button.
              items.Add().Type(CommandType.SplitButton).Text("Split Button").MenuButtons(menuButtons =>
              {
                  menuButtons.Add().Text("Option 1").Id("option1");
                  menuButtons.Add().Text("Option 2").Id("option2");
                  menuButtons.Add().Text("Option 3").Id("option3");
              });

              //The ButtonGroup.
              items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
              {
                  buttons.Add().Text("Left").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyLeft");
                  buttons.Add().Text("Center").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyCenter");
                  buttons.Add().Text("Right").Togglable(true).Group("text-align").SpriteCssClass("k-tool-icon k-justifyRight");
              });

              //The separator.
              items.Add().Type(CommandType.Separator);

              //A custom template.
              items.Add().Template("<input id='dropdown' style='width: 150px;' />").Overflow(ShowInOverflowPopup.Never);
          })
      )

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ToolBar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

      public ActionResult Index()
      {
          return View();
      }

**Step 3** Add a ToolBar.

###### Example

```tab-ASPX

       <%: Html.Kendo().ToolBar()
           .Resizable(true)   //Enable or disable the resizing feature.

           .Items(items => {  //Define the widget commands.
              items.Add().Type(CommandType.Button).Text("Button");
           })
       %>
```
```tab-Razor

       @(Html.Kendo().ToolBar()
           .Resizable(true)   //Enable or disable the resizing feature.

           .Items(items => {  //Define the widget commands.
              items.Add().Type(CommandType.Button).Text("Button");
           })
       )
```

For more information on supported command types, refer to [this link]({% slug overview_kendoui_toolbar_widget %}#command-types).

## Event Handling

You can subscribe to all ToolBar [events](/api/javascript/ui/toolbar#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
              //Handle the click event.
          }

          //.....
      </script>
```
```tab-Razor

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
              //Handle the click event.
          }

          //.....
      </script>
```

## Reference

### Existing Instances

You can reference an existing Kendo UI ToolBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ToolBar API](/api/javascript/ui/toolbar#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI ToolBar for ASP.NET MVC declaration.
      <script>
      $(function() {
          var toolbar = $("#container").data("kendoToolBar");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ToolBar:

* [ASP.NET MVC API Reference: ToolBarBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ToolBarBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ToolBar Widget]({% slug overview_kendoui_toolbar_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
