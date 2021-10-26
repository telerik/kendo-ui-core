---
title: Overview
page_title: REPL Overview
description: Explore the Telerik REPL server playground tool and use it to write razor/C# code in the browser, run the code, and then share it.
slug: overview_repl_aspnetcore
permalink: /getting-started/repl/overview
position: 1
---

## REPL Overview

Telerik [REPL](https://www.telerik.com/aspnet-core-ui) is a server playground tool that allows you to write razor/C# code in the browser, see the result, and share your code. It is integrated with the [Telerik UI for ASP.NET Core demos](https://demos.telerik.com/aspnet-core/), which lets you modify a demo and immediately see the effect of your changes.

Telerik REPL saves you time - it requires no setup and has no prerequisites. You can use it to test various simple scenarios or scenarios of medium complexity. REPL is particularly useful when you need to quickly test something in your browser, for example:

* Run the Telerik demos and then make changes to them by adding and executing your custom logic.
* Create a demo and share it with your team — this enables easier collaboration and boosts your productivity.
* Evaluate ASP.NET Core in general and Telerik UI for ASP.NET Core in particular — you can quickly decide whether Telerik UI for ASP.NET Core matches your requirements without unnecessary and time-consuming setups.

## Features

* Write, run, and save examples in REPL. 
* Share links to the examples that you save in REPL.
* Edit the existing Telerik UI for ASP.NET Core demos — REPL is integrated with the demos and allows you to open and edit them. The models used in the demos are included and you can use them to bind the components to data.
* Choose a theme that will be applied to the Telerik UI for ASP.NET Core components used in your example. 
* Share the created example as a link on a social media (Twitter, Facebook).

## Using REPL

Using REPL is simple and creating an example requires just a few steps.

1. Run an existing UI for ASP.NET Core demo in REPL, or start from scratch and add your code in the left pane. 
1. If you are using UI for ASP.NET Core components, select the desired theme from the theme selection dropdown.
1. Click the **Run** button to run the example. The result will be displayed in the right pane. 
1. Click the **Save** button to generate a link to the example you created. You can copy the generated url and share it. 

REPL uses the predefined models and controllers available in the Telerik UI for ASP.NET Core demos. If you need to test a local binding scenario with your own data, you can use the approach demonstrated in the example below.

      @{
         var attendees = new List<SelectListItem>
         {
               new SelectListItem(){ Value = "1", Text = "Steven White" },
               new SelectListItem(){ Value = "2", Text = "Nancy King" },
               new SelectListItem(){ Value = "3", Text = "Nancy Davolio" },
               new SelectListItem(){ Value = "4", Text = "Michael Leverling" },
               new SelectListItem(){ Value = "5", Text = "Andrew Callahan" },
               new SelectListItem(){ Value = "6", Text = "Michael Suyama" },
         };
      }

      @(Html.Kendo().ListBox()
         .Name("optional")
         .Toolbar(toolbar =>
         {
               toolbar.Position(ListBoxToolbarPosition.Right);
               toolbar.Tools(tools => tools
                  .MoveUp()
                  .MoveDown()
                  .TransferTo()
                  .TransferFrom()
                  .TransferAllTo()
                  .TransferAllFrom()
                  .Remove()
               );
         })
         .ConnectWith("selected")
         .BindTo(attendees)
      )

## See Also

* [Getting Started with UI for ASP.NET Core]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
