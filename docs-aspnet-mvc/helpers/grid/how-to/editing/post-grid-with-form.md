---
title: Post Grid Data with Form
page_title: Post Grid Data with Form | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing."
slug: howto_postgriddatawithform_gridaspnetmv
---

# Post Grid Data with Form

To submit the Grid data items as part of an `Html.Form`, you have to note the known limitations.

These are:

* All items in the Grid are submitted no matter if they are updated or not.
* Only the items from the current page are submitted.
* Server operations must be disabled&mdash;`ServerOperation(false)`.

To see the example, refer to the project on how to [submit the Grid data items as part of an `Html.Form`](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/post-grid-with-form).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).
