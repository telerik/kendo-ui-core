---
title: Data Binding
page_title: Data Binding | Telerik UI Grid HtmlHelper for ASP.NET MVC
description: "Learn the basics about the Ajax and server binding of the Telerik UI Grid HtmlHelper for ASP.NET MVC."
slug: databinding_grid_aspnetmvc
position: 1
---

# Data Binding

The Telerik UI Grid for ASP.NT MVC enables you to populate it with data by using server and Ajax data binding.

* The server binding binds the Grid to a supplied model and the Grid makes `HTTP` and `GET` requests when binding.
* The Ajax binding makes Ajax requests to get the data for the Grid.

The following table lists the basic feature differences between the server and Ajax binding.

|**Feature**  |**Server Binding** |**Ajax Binding** |
|:---         |:---               |:---             |
|**Templates** |In the server-bound mode, the Grid templates use server-side expressions and .NET code&mdash;C# or Visual Basic. Templates are executed server-side. |In the Ajax-bound mode, the Grid uses Kendo UI templates. Templates are executed on the client and use JavaScript. |
|**Full-Page Updates** |The Grid makes HTTP GET requests to ASP.NET MVC action methods which cause a full-page refresh. |The Grid makes Ajax requests which cause partial page update. The Grid retrieves only the data needed for the current page.|

## See Also

* [Binding the Grid HtmlHelper for ASP.NET MVC to Data (Demos)](https://demos.telerik.com/aspnet-mvc/grid/local-data-binding)
* [Ajax Binding by the Grid HtmlHelper for ASP.NET MVC]({% slug ajaxbinding_grid_aspnetmvc %})
* [Server Binding by the Grid HtmlHelper for ASP.NET MVC]({% slug serverbinding_grid_aspnetmvc %})
* [Custom Ajax and Server Binding by the Grid HtmlHelper for ASP.NET MVC]({% slug custombinding_grid_aspnetmvc %})
* [Server-Side API](/api/grid)
