---
title: Implementing Custom Editors for the Scheduler Events
description: Learn how to create a custom editor template for editing the {{ site.product }} Scheduler events.
type: how-to
page_title: Implementing Custom Editors for the Scheduler Events
previous_url: /html-helpers/scheduling/scheduler/how-to/custom-editor
slug: scheduler-custom-editors
tags: scheduler, custom, editors, template, events, telerik, core, mvc
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I use a custom template with editors to create new and edit the existing {{ site.framework }} Scheduler events?

## Solution

1. Specify the name of the template through the [`TemplateName()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereditablesettingsbuilder#templatenamesystemstring) option of the [`Editable`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulerbuilder#editablesystemaction) configuration.

    ```HtmlHelper
            @(Html.Kendo().Scheduler<MeetingViewModel>()
                .Name("scheduler")
                .Editable(editable => {
                    editable.TemplateName("CustomEditorTemplate");
                })
                ...// Additional configuration.
            )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <editable template-view="await @Html.PartialAsync("~/Views/Shared/EditorTemplates/TagHelper_CustomEditorTemplate.cshtml")">
            </editable>
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    {% endif %}

1. Create a View in the **~Views\Shared\EditorTemplates** folder. The name of the View must match the specified name in the `TemplateName()` option (for example, **CustomEditorTemplate.cshtml**).
   The created template automatically receives the respective Model data. As a reuslt, you can bind the fields through the `<WidgetName>For()` Helpers, as the Scheduler uses the [MVVM Pattern](https://docs.telerik.com/kendo-ui/framework/mvvm/overview) internally to update the data in the views:

    ```Razor CustomEditorTemplate.cshtml
        @model MeetingViewModel

        <div class="k-edit-label">
            @(Html.LabelFor(model => model.Title))
        </div>
        <div data-container-for="title" class="k-edit-field">
            @(Html.TextBoxFor(model => model.Title, new { @class = "k-textbox", data_bind = "value:title" }))
        </div>

        <div class="k-edit-label">
            @(Html.LabelFor(model => model.Description))
        </div>
        <div data-container-for="description" class="k-edit-field">
            @(Html.TextAreaFor(model => model.Description, new { @class = "k-textbox", data_bind = "value:description" }))
        </div>

        <div class="k-edit-label">
            @(Html.LabelFor(model => model.RoomID))
        </div>
        <div data-container-for="RoomID" class="k-edit-field">
            @(Html.Kendo().DropDownListFor(model => model.RoomID)
                .DataTextField("Text")
                .DataValueField("Value")
                .ValuePrimitive(true)
                .BindTo(new[] {
                    new { Text = "Meeting Room 101", Value = 1, Color = "\\#6eb3fa" },
                    new { Text = "Meeting Room 201", Value = 2, Color = "\\#f58a8a" }
                })
            )
        </div>
    ```
    {% if site.core %}
    ```TagHelper
        @model MeetingViewModel

        @{
            var ddlData = new[] {
                new { Text = "Meeting Room 101", Value = 1, Color = "\\#6eb3fa" },
                new { Text = "Meeting Room 201", Value = 2, Color = "\\#f58a8a" }
            };
        }

        <div class="k-edit-label">
            <label asp-for="Title"></label>
        </div>
        <div data-container-for="title" class="k-edit-field">
            <kendo-textbox for="Title" data-bind="value:title" is-in-client-template="true"></kendo-textbox>
        </div>

        <div class="k-edit-label">
            <label asp-for="Description"></label>
        </div>
        <div data-container-for="description" class="k-edit-field">
            <kendo-textarea for="Description" data-bind="value:description" is-in-client-template="true"></kendo-textarea>
        </div>

        <div class="k-edit-label">
            <label asp-for="RoomID"></label>
        </div>
        <div data-container-for="RoomID" class="k-edit-field">
            <kendo-dropdownlist for="RoomID" is-in-client-template="true"
				datavaluefield="Value"
                datatextfield="Text"
                value-primitive="true"
                bind-to=ddlData>
            </kendo-dropdownlist>
        </div>
    ```
    {% endif %}
    ```Model
    using Kendo.Mvc.UI;

    public class MeetingViewModel : ISchedulerEvent
    {
        public int MeetingID { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        private DateTime start;
        [Required]
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        public string StartTimezone { get; set; }

        private DateTime end;

        [Required]
        [DateGreaterThan(OtherField = "Start")]
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        public string EndTimezone { get; set; }
        public string RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }
        public string Timezone { get; set; }
        public int? RoomID { get; set; }
    }
    ```
    ```C# Interface
    namespace Kendo.Mvc.UI;

    public interface ISchedulerEvent
    {
        string Title { get; set; }
        string Description { get; set; }
        bool IsAllDay { get; set; }
        DateTime Start { get; set; }
        DateTime End { get; set; }
        string StartTimezone { get; set; }
        string EndTimezone { get; set; }
        string RecurrenceRule { get; set; }
        string RecurrenceException { get; set; }
    }
    ```

    >  Fields from the `ISchedulerEvent` interface are automatically mapped to `camelCase` fields on the client. Therefore, when the Scheduler uses a custom editor template, you must to bind the editors to the `camelCase` property names by using the `data_bind` attribute.
    Fields that do not come from the `ISchedulerEvent` interface preserve their exact names. Therefore, when the editor template refers to such a field, it applies its exact name instead.

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerEditingCustomEditor) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master) on how to implement a custom editor template similar to the built-in editor of the Scheduler. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore%})

* [{{ site.framework }} Scheduler Demos](https://demos.telerik.com/{{ site.platform }}/scheduler/index)

{% if site.core %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-core-ui/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-mvc/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

