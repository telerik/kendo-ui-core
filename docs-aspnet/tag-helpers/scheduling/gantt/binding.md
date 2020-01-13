---
title: Data Binding
page_title: Data Binding
description: "Configure the DataSource instances for the data, dependencies, resources, and assignments of the Telerik UI Gantt TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: binding_gantt_aspnetcore
position: 2
---

# Data Binding

The Gantt TagHelper enables you to set up the DataSource instances for its data, dependencies, resources, and assignments.

    <kendo-gantt name="gantt" show-work-days="false" show-work-hours="false" snap="false" height="700">
        <columns>
            <gantt-column field="title" title="Title" editable="true" sortable="true"></gantt-column>
            <gantt-column field="resources" title="Assigned Resources" editable="true" sortable="true"></gantt-column>
        </columns>
        <views>
            <gantt-view type="GanttViewType.Day"></gantt-view>
            <gantt-view type="GanttViewType.Week"></gantt-view>
            <gantt-view type="GanttViewType.Month" selected="true"></gantt-view>
        </views>
        <gantt-datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("ReadTasks","Gantt")" />
                <destroy url="@Url.Action("DestroyTask","Gantt")" />
                <update url="@Url.Action("UpdateTask","Gantt")" />
                <create url="@Url.Action("CreateTask","Gantt")" />
            </transport>
            <schema>
                <model id="TaskID">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="parentId" from="ParentID" type="number"></field>
                        <field name="title" from="Title" type="string"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="summary" from="Summary" type="boolean"></field>
                        <field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
                        <field name="percentComplete" from="PercentComplete" type="number"></field>
                        <field name="orderId" from="OrderId" type="number"></field>
                    </fields>
                </model>
            </schema>
        </gantt-datasource>
        <dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("ReadDependencies", "Gantt")" />
                <create url="@Url.Action("CreateDependency", "Gantt")" />
                <destroy url="@Url.Action("DestroyDependency", "Gantt")" />
            </transport>
            <schema>
                <model id="DependencyID">
                    <fields>
                        <field name="DependencyID" type="number"></field>
                        <field name="predecessorId" from="PredecessorID" type="number"></field>
                        <field name="successorId" from="SuccessorID" type="number"></field>
                        <field name="type" from="Type" type="number"></field>
                    </fields>
                </model>
            </schema>
        </dependency-datasource>
        <resources field="resources" datacolorfield="Color" datatextfield="Name">
            <datasource type="DataSourceTagHelperType.Custom">
                <schema data="Data">
                    <model id="ID"></model>
                </schema>
                <transport>
                    <read url="@Url.Action("ReadResources", "Gantt")" />
                </transport>
            </datasource>
        </resources>
        <assignments datataskidfield="TaskID" dataresourceidfield="ResourceID" datavaluefield="Units">
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema>
                    <model id="ID">
                        <fields>
                            <field name="ID" type="number"></field>
                            <field name="TaskID" type="number"></field>
                            <field name="ResourceID" type="number"></field>
                            <field name="Units" type="number"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Action("ReadAssignments", "Gantt")" />
                    <create url="@Url.Action("CreateAssignment", "Gantt")" />
                    <destroy url="@Url.Action("DestroyAssignment", "Gantt")" />
                    <update url="@Url.Action("UpdateAssignment", "Gantt")" />
                </transport>
            </datasource>
        </assignments>
    </kendo-gantt>

You can also use external DataSource tag helpers to implement the same and assign their names to the corresponding fields.

    <kendo-ganttdatasource name="ganttdatasource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadTasks","Gantt")" />
            <destroy url="@Url.Action("DestroyTask","Gantt")" />
            <update url="@Url.Action("UpdateTask","Gantt")" />
            <create url="@Url.Action("CreateTask","Gantt")" />
        </transport>
        <schema>
            <model id="TaskID">
                <fields>
                    <field name="TaskID" type="number"></field>
                    <field name="parentId" from="ParentID" type="number"></field>
                    <field name="title" from="Title" type="string"></field>
                    <field name="start" from="Start" type="date"></field>
                    <field name="end" from="End" type="date"></field>
                    <field name="summary" from="Summary" type="boolean"></field>
                    <field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
                    <field name="percentComplete" from="PercentComplete" type="number"></field>
                    <field name="orderId" from="OrderId" type="number"></field>
                </fields>
            </model>
        </schema>
    </kendo-ganttdatasource>

    <kendo-ganttdependencydatasource name="ganttdependencydatasource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadDependencies", "Gantt")" />
            <create url="@Url.Action("CreateDependency", "Gantt")" />
            <destroy url="@Url.Action("DestroyDependency", "Gantt")" />
        </transport>
        <schema>
            <model id="DependencyID">
                <fields>
                    <field name="DependencyID" type="number"></field>
                    <field name="predecessorId" from="PredecessorID" type="number"></field>
                    <field name="successorId" from="SuccessorID" type="number"></field>
                    <field name="type" from="Type" type="number"></field>
                </fields>
            </model>
        </schema>
    </kendo-ganttdependencydatasource>

    <kendo-datasource name="resourcesdatasource" type="DataSourceTagHelperType.Custom">
        <schema data="Data">
            <model id="ID"></model>
        </schema>
        <transport>
            <read url="@Url.Action("ReadResources", "Gantt")" />
        </transport>
    </kendo-datasource>

    <kendo-datasource name="assignmentsdatasource" type="DataSourceTagHelperType.Ajax">
        <schema>
            <model id="ID">
                <fields>
                    <field name="ID" type="number"></field>
                    <field name="TaskID" type="number"></field>
                    <field name="ResourceID" type="number"></field>
                    <field name="Units" type="number"></field>
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("ReadAssignments", "Gantt")" />
            <create url="@Url.Action("CreateAssignment", "Gantt")" />
            <destroy url="@Url.Action("DestroyAssignment", "Gantt")" />
            <update url="@Url.Action("UpdateAssignment", "Gantt")" />
        </transport>
    </kendo-datasource>

    <kendo-gantt name="gantt" show-work-days="false" show-work-hours="false" snap="false" height="700" datasource-id="ganttdatasource" dependancy-datasource-id="ganttdependencydatasource">
        <columns>
            <gantt-column field="title" title="Title" editable="true" sortable="true"></gantt-column>
            <gantt-column field="resources" title="Assigned Resources" editable="true" sortable="true"></gantt-column>
        </columns>
        <views>
            <gantt-view type="GanttViewType.Day"></gantt-view>
            <gantt-view type="GanttViewType.Week"></gantt-view>
            <gantt-view type="GanttViewType.Month" selected="true"></gantt-view>
        </views>
        <resources field="resources" datacolorfield="Color" datatextfield="Name" datasource-id="resourcesdatasource">
        </resources>
        <assignments datataskidfield="TaskID" dataresourceidfield="ResourceID" datavaluefield="Units" datasource-id="assignmentsdatasource">
        </assignments>
    </kendo-gantt>

## See Also

* [Server-Side API](/api/gantt)
