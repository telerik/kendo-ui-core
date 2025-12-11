---
title: Using a Grid to Edit the Scheduler Resources
description: Learn how to use the {{ site.product }} Grid component as a custom editor in the {{ site.product }} Scheduler to edit its resources.
type: how-to
page_title: Using a Grid to Edit the Scheduler Resources
previous_url: /helpers/scheduling/scheduler/how-to/scheduler-resource-editing, /html-helpers/scheduling/scheduler/how-to/scheduler-resource-editing
slug: scheduler-edit-resources-using-grid
tags: scheduler, edit, resources, grid, custom, editor, telerik, core, mvc
res_type: kb
components: ["general"]
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

How can I use the [{{ site.framework }} Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) component to edit the {{ site.framework }} Scheduler resources?

By design, the user can edit the [resources assigned to the Scheduler events]({% slug htmlhelpers_scheduler_resources_aspnetcore %}). However, the default editor template of the Scheduler does not provide an editor that allows the users to edit the available resources. 

For example:

* To add a new resource that can be assigned to a specified event.
* To edit the `Text`, `Value`, or `Color` fields of the existing resource items.
* To delete a resource so it does not appear anymore as an available option in the resources DropDownList.

## Solution

Follow the steps below to create a custom editor template for the Scheduler events that contains an **Edit Attendees** button, which opens a [Window component]({% slug htmlhelpers_window_aspnetcore %}) with an InCell editable Grid used for editing the Scheduler resources.

1. Configure the resources to bind to remote data by using a [Custom DataSource](https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/types#custom-datasource). This way, when the resources are modified through the Grid, the changes will be applied to the resources collection.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            .Editable(editable => {
                editable.TemplateName("CustomEditorTemplate");
            })
            .Resources(resource => 
            {
                resource.Add(m => m.Attendees)
                .Title("Attendees")
                .Multiple(true)
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .DataSource(ds => ds
                    .Custom()
                    .Type("aspnetmvc-ajax") // Required in order to work with ToDataSourceResult() method.
                    .Transport(transport => transport.Read(read => read.Action("Read_Attendees", "Home")))
                    .Schema(schema => schema
                        //Required in order to work with ToDataSourceResult
                        .Data("Data")
                        .Total("Total")
                        .Errors("Errors")
                        .Model(model =>
                        {
                            model.Id("Value");
                            model.Field("Value", typeof(int));
                            model.Field("Text", typeof(string));
                            model.Field("Color", typeof(string));
                        })
                    )
                );
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
            <resources>
                <resource field="Attendees" title="Attendees" multiple="true" datatextfield="Text" datavaluefield="Value" datacolorfield="Color">
                    <datasource type="DataSourceTagHelperType.Custom">
                        <transport>
                            <read url="@Url.Action("Read_Attendees", "Home")" />
                        </transport>
                        <schema data="Data" total="Total" errors="Errors">
                            <model id="Value">
                                <fields>
                                    <field name="Value" type="number" />
                                    <field name="Text" type="string" />
                                    <field name="Color" type="string" />
                                </fields>
                            </model>
                        </schema>
                    </datasource>
                </resource>
            </resources>
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    ```C# HomeController.cs
        public virtual JsonResult Read_Attendees([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetAll().ToDataSourceResult(request));
        }

        private static IList<Attendee> GetAll()
        {
            IList<Attendee> result = new List<Attendee>();
            ... // Populate the "result" with the data.
            return result;
        }
    ```
    {% else %}
    ```C# HomeController.cs
        public virtual JsonResult Read_Attendees([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetAll().ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
        }

        private static IList<Attendee> GetAll()
        {
            IList<Attendee> result = (IList<Attendee>)System.Web.HttpContext.Current.Session["Attendees"];
            if (result == null)
            {
                // Read from the database.
                System.Web.HttpContext.Current.Session["Attendees"] = result =
                    (from attendee in attendeeList
                     select new Attendee
                     {
                         Text = attendee.Text,
                         Value = attendee.Value,
                         Color = attendee.Color
                     }).ToList();
            }
            return result;
        }
    ```
    {% endif %}

1. Create a custom editor template for the Scheduler. For more information, refer to the [implementing custom editors for the Scheduler events documentation]({% slug scheduler-custom-editors %}).
1. Add a [MultiSelect]({% slug htmlhelpers_multiselect_aspnetcore %}) editor for the **Attendees** resources in the custom editor template and configure it for remote data binding.

    ```Razor CustomEditorTemplate.cshtml
    <div class="k-edit-label">
        @(Html.LabelFor(model => model.Attendees))
    </div>
    <div data-container-for="Attendees" class="k-edit-field">
        <div style="width: 280px; display: inline-block">
            @(Html.Kendo().MultiSelectFor(model => model.Attendees)
                .HtmlAttributes(new { data_bind = "value:Attendees"})
                .DataTextField("Text")
                .DataValueField("Value")
                .ValuePrimitive(true)
                .TagTemplate("<span class='k-scheduler-mark' style='background-color:\\#= data.Color?Color:'' \\#'></span>\\#=Text\\#")
                .ItemTemplate("<span class='k-scheduler-mark' style='background-color:\\#= data.Color?Color:'' \\#'></span>\\#=Text\\#")
                .DataSource(ds => ds
                    .Custom()
                    .Type("aspnetmvc-ajax")
                    .Transport(transport => transport.Read(read => read.Action("Read_Attendees", "Home")))
                    .Schema(schema => schema
                        .Data("Data")
                        .Total("Total")
                        .Errors("Errors")
                        .Model(model =>
                        {
                            model.Id("Value");
                            model.Field("Value", typeof(int));
                            model.Field("Text", typeof(string));
                            model.Field("Color", typeof(string));
                        })
                    )
                )
            )
        </div>
    </div>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        <div class="k-edit-label">
            <label asp-for="Attendees"></label>
        </div>
        <div data-container-for="Attendees" class="k-edit-field">
            <div style="width: 280px; display: inline-block">
                <kendo-multiselect for="Attendees" is-in-client-template="true"
                    datavaluefield="Value"
                    datatextfield="Text"
                    value-primitive="true"
                    item-template="<span class='k-scheduler-mark' style='background-color:\\#= data.Color?Color:'' \\#'></span>\\#=Text\\#"
                    tag-template="<span class='k-scheduler-mark' style='background-color:\\#= data.Color?Color:'' \\#'></span>\\#=Text\\#">
                    <datasource type="DataSourceTagHelperType.Custom">
                        <transport>
                            <read url="@Url.Action("Read_Attendees", "Home")" />
                        </transport>
                        <schema data="Data" total="Total" errors="Errors">
                            <model id="Value">
                                <fields>
                                    <field name="Value" type="number"></field>
                                    <field name="Text" type="string"></field>
                                    <field name="Color" type="string"></field>
                                </fields>
                            </model>
                        </schema>
                    </datasource>
				</kendo-multiselect>
            </div>
        </div>
    ```
    {% endif %}

1. Add a button after the MultiSelect editor that will open the Window with the Grid. Also, define the InCell editable Grid and wrap it into a `<div>` element with a class **insertNewAttendeeDialog**. Finally, add **Save changes** and **Cancel changes** buttons below the Grid. The **Save changes** button will save the Grid changes, close the Window with the Grid, refresh the options of the MultiSelect editor used for the resources, and fetch the latest data for the resources collection.

    ```Razor CustomEditorTemplate.cshtml
    <div data-container-for="Attendees" class="k-edit-field">
        <div style="width: 280px; display: inline-block">
            @(Html.Kendo().MultiSelectFor(model => model.Attendees)
                ...// Additional configuration.
            )
        </div>

        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" style="float:right;" id="editAttendees">Edit attendees</button>

        <div id="insertNewAttendeeDialog">
            <div id="editResources"></div>
            <em>* closing the window will cancel the changes</em>
            @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.SchedulerEditingResources.Models.Attendee>()
                .Name("AttendeeEditor")
                .Columns(columns => {
                    columns.Bound(p => p.Value).Width(100);
                    columns.Bound(p => p.Text).Width(100);
                    columns.Bound(p => p.Color).Width(100);
                    columns.Command(command => command.Destroy()).Width(100);
                })
                .Navigatable()
                .ToolBar(toolbar => {
                    toolbar.Create();
                })
                .Editable(editable => editable.Mode(GridEditMode.InCell))
                .DataSource(ds => ds
                    .Ajax()
                    .Model(model =>
                    {
                        model.Id(m => m.Value);
                        model.Field(m => m.Value).Editable(false);
                    })
                    .Read(read => read.Action("Read_Attendees", "Home"))
                    .Create(create => create.Action("Create_Attendees", "Home"))
                    .Destroy(destroy => destroy.Action("Destroy_Attendees", "Home"))
                    .Update(update => update.Action("Update_Attendees", "Home"))
                )
                .ToClientTemplate()
            )
            <br />
            <button id='saveAttendees' class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">Save changes</button>
            <button id='cancelAttendees' class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Cancel changes</button>
        </div>
    </div>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <div data-container-for="Attendees" class="k-edit-field">
            <div style="width: 280px; display: inline-block">
                <kendo-multiselect for="Attendees" is-in-client-template="true">
                    <!--Other configuration-->
				</kendo-multiselect>
            </div>

            <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" style="float:right;" id="editAttendees">Edit attendees</button>

            <div id="insertNewAttendeeDialog">
                <div id="editResources"></div>
                <em>* closing the window will cancel the changes</em>
                <kendo-grid name="AttendeeEditor" navigatable="true" is-in-client-template="true">
                    <datasource type="DataSourceTagHelperType.Ajax">
                        <schema data="Data" total="Total">
                            <model id="Value">
                                <fields>
                                    <field name="Value" type="number" editable="false"></field>
                                </fields>
                            </model>
                        </schema>
                        <transport>
                            <read url="@Url.Action("Read_Attendees","Home")"/>
                            <create url="@Url.Action("Create_Attendees","Home")"/>
                            <update url="@Url.Action("Update_Attendees","Home")"/>
                            <destroy url="@Url.Action("Destroy_Attendees","Home")"/>
                        </transport>
                    </datasource>
                    <columns>
                        <column field="Value" width="100"/>
                        <column field="Text" width="100"/>
                        <column field="Color" width="100"/>
                        <column width="100">
                            <commands>
                                <column-command text="Delete" name="destroy"></column-command>
                            </commands>
                        </column>
                    </columns>
                    <toolbar>
                        <toolbar-button name="create"></toolbar-button> 
                    </toolbar>
                    <editable mode="incell"/>
                </kendo-grid>
                <br />
                <button id='saveAttendees' class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">Save changes</button>
                <button id='cancelAttendees' class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Cancel changes</button>
            </div>
        </div>
    ```
    {% endif %}

1. When the custom editor of the Scheduler is loaded, initialize the Window component that holds the Grid with jQuery.

    ```JS
    //CustomEditorTemplate.cshtml

    <script>
        (function () {
            var grid = $(document.getElementById("AttendeeEditor")).getKendoGrid(); // Get a reference to the Grid.
            var multi = $(document.getElementById("Attendees")).getKendoMultiSelect(); // Get a reference to the MultiSelect.
            var scheduler = $(document.getElementById("scheduler")).getKendoScheduler(); // Get a reference to the Scheduler.
            var dialog = $(document.getElementById("insertNewAttendeeDialog")).kendoWindow({ // Initialize the Window.
                title: "Insert New Attendee",
                modal: true,
                movable: true,
                visible: false,
                close: function () {
                    /* Cancel Grid changes. */
                    grid.cancelChanges();
                },
                open: function () {
                    this.center(); // Center the Window.
                    grid.dataSource.read(); // Request the Grid's data.
                }
            }).getKendoWindow();
        })();
    </script>
    ```

1. Handle the `click` events of the **Edit attendees**, **Save changes**, and **Cancel changes** buttons.

    ```JS
    //CustomEditorTemplate.cshtml

    <script>
        (function () {
            var grid = $(document.getElementById("AttendeeEditor")).getKendoGrid(); // Get a reference to the Grid.
            var multi = $(document.getElementById("Attendees")).getKendoMultiSelect(); // Get a reference to the MultiSelect.
            var scheduler = $(document.getElementById("scheduler")).getKendoScheduler(); // Get a reference to the Scheduler.
            var dialog = $(document.getElementById("insertNewAttendeeDialog")).kendoWindow({ ... }).getKendoWindow();

            $(document.getElementById("editAttendees")).on("click", function() {
                dialog.open(); // Open the Window with the Grid.
            });

            $(document.getElementById("cancelAttendees")).on("click", function() {
                dialog.close(); // Close the Window with the Grid when the changes are cancelled.
            });

            $(document.getElementById("saveAttendees")).on("click", function() {
                grid.dataSource.sync().then(function() { // Save all pending Grid changes.
                    dialog.close(); // Close the Window with the Grid.

                    multi.dataSource.read(); // Trigger the Read request of the MultiSelect editor to load the updated options.

                    /* The index of the resource defined in the Scheduler configuration. */
                    var resourceIndex = 0; 
                    scheduler.resources[resourceIndex].dataSource.read(); // Trigger the Read request of the resources to load the updated options.
                });
            });
        })();
    </script>
    ```

1. Handle the [`Edit`](/api/kendo.mvc.ui.fluent/schedulereventbuilder#editsystemstring) event of the Scheduler and get a reference to the Window that contains the event's editors. Subscribe to its `close` event and destroy the nested Window that holds the Grid.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            .Events(e => e.Edit("onEdit"))
            ...// Additional configuration.
        )

        <script type="text/javascript">
            function onEdit(e) {
                var editorWindow = $(e.container).getKendoWindow(); // The main Window.
                editorWindow.bind("close", function () {
                    destroyDialog(); // Destroy the Window with the Grid.
                });
            }
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler" on-edit="onEdit">
            <!-- Other configuration -->
        </kendo-scheduler>

        <script type="text/javascript">
            function onEdit(e) {
                var editorWindow = $(e.container).getKendoWindow(); // The main Window.
                editorWindow.bind("close", function () {
                    destroyDialog(); // Destroy the Window with the Grid.
                });
            }
        </script>
    ```
    {% endif %}
    ```Razor CustomEditorTemplate.cshtml
        <script>
            function destroyDialog() {
                var dialogElement = $(document.getElementById("insertNewAttendeeDialog"));
                dialogElement.getKendoWindow().destroy();
                dialogElement.remove();
            }
        </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerEditingResources) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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

