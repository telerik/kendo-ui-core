---
title: Implement Custom Editors
page_title: Implement Custom Editors
description: "Implement a custom editor similar to the build-in editor of a Kendo UI Scheduler in ASP.NET MVC applications."
previous_url: /helpers/scheduling/scheduler/how-to/custom-editor
slug: howto_implementcustomeditor_scheduleraspnetmvc
поситион: 0
---

# Implement Custom Editors

To see the example, refer to the project on how to [implement a custom editor similar to the build-in editor of a Scheduler](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/scheduler/scheduler-custom-editor) in ASP.NET MVC applications.

> Fields that do not come from the `ISchedulerEvent` interface preserve their exact names. Therefore, when the editor template refers to such a field, it has to apply those names instead. Fields from the `ISchedulerEvent` interface are automatically mapped to camelCase fields.

## See Also

* [Basic Usage of the Scheduler HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/scheduler)
* [SchedulerBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)
* [Scheduler Server-Side API](/api/scheduler)
