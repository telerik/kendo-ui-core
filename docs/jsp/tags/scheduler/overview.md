---
title: Overview
page_title: Overview | Scheduler JSP Tag
description: "Get started with the Scheduler JSP tag in Kendo UI."
slug: overview_scheduler_uiforjsp
position: 1
---

# Scheduler JSP Tag Overview

The Scheduler JSP tag is a server-side wrapper for the [Kendo UI Scheduler](/api/javascript/ui/scheduler) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Scheduler to display and edit Scheduler events.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a class which will represent the Scheduler event. Call it `Task`.

###### Example

        @Entity
        @Table(name="Tasks")
        public class Task {
            private int taskId;
            private Integer ownerId;
            private String title;
            private String description;
            private String recurrenceRule;
            private String recurrenceException;
            private Integer recurrenceId;
            private boolean isAllDay;
            private Date start;
            private Date end;

            @Id
            @Column(name="TaskID")
            @GeneratedValue(strategy=GenerationType.AUTO)
            public int getTaskId() {
                return taskId;
            }

            public void setTaskId(int taskId ) {
                this.taskId = taskId ;
            }

            @Column(name="OwnerID")
            public Integer getOwnerId() {
                return ownerId;
            }

            public void setOwnerId(Integer ownerId) {
                this.ownerId = ownerId;
            }

            @Column(name="Start")
            @JsonSerialize(using=IsoDateJsonSerializer.class)
            public Date getStart() {
                return start;
            }

            public void setStart(Date start) {
                this.start = start;
            }

            @Column(name="End")
            @JsonSerialize(using=IsoDateJsonSerializer.class)
            public Date getEnd() {
                return end;
            }

            public void setEnd(Date end) {
                this.end = end;
            }

            @Column(name="Title")
            public String getTitle() {
                return title;
            }

            public void setTitle(String title) {
                this.title = title;
            }

            @Column(name="Description")
            public String getDescription() {
                return description;
            }

            public void setDescription(String description) {
                this.description = description;
            }

            @Column(name="RecurrenceRule")
            public String getRecurrenceRule() {
                return recurrenceRule;
            }

            public void setRecurrenceRule(String recurrenceRule) {
                this.recurrenceRule = recurrenceRule;
            }

            @Column(name="IsAllDay")
            public boolean getIsAllDay() {
                return isAllDay;
            }

            public void setIsAllDay(boolean isAllDay) {
                this.isAllDay = isAllDay;
            }

            @Column(name="RecurrenceException")
            public String getRecurrenceException() {
                return recurrenceException;
            }

            public void setRecurrenceException(String recurrenceException) {
                this.recurrenceException = recurrenceException;
            }

            @Column(name="RecurrenceID")
            public Integer getRecurrenceId() {
                return recurrenceId;
            }

            public void setRecurrenceId(Integer recurrenceId) {
                this.recurrenceId = recurrenceId;
            }

        }

**Step 3** Register the Telerik UI for JSP `taglib` in your JSP page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Declare a `scheduler` tag. Configure the fields of its data source model.

###### Example

        <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="600" date="<%= date %>" startTime="<%= startTime %>">
            <kendo:dataSource batch="true">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="taskId">
                         <kendo:dataSource-schema-model-fields>
                             <kendo:dataSource-schema-model-field name="taskId" type="number" />
                             <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                             <kendo:dataSource-schema-model-field name="description" type="string" />
                             <kendo:dataSource-schema-model-field name="isAllDay" type="boolean" />
                             <kendo:dataSource-schema-model-field name="recurrenceRule" type="string" nullable="true"/>
                             <kendo:dataSource-schema-model-field name="recurrenceId" type="number" nullable="true" />
                             <kendo:dataSource-schema-model-field name="recurrenceException" type="string" nullable="true" />
                             <kendo:dataSource-schema-model-field name="ownerId" type="number" defaultValue="1" />
                             <kendo:dataSource-schema-model-field name="start" type="date" />
                             <kendo:dataSource-schema-model-field name="end" type="date" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:scheduler>

**Step 5** Specify the action methods which will perform the `create`, `read`, `update` and `destroy` operations.

###### Example

        <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="600" date="<%= date %>" startTime="<%= startTime %>">
            <kendo:dataSource batch="true">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="taskId">
                         <kendo:dataSource-schema-model-fields>
                             <kendo:dataSource-schema-model-field name="taskId" type="number" />
                             <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                             <kendo:dataSource-schema-model-field name="description" type="string" />
                             <kendo:dataSource-schema-model-field name="isAllDay" type="boolean" />
                             <kendo:dataSource-schema-model-field name="recurrenceRule" type="string" nullable="true"/>
                             <kendo:dataSource-schema-model-field name="recurrenceId" type="number" nullable="true" />
                             <kendo:dataSource-schema-model-field name="recurrenceException" type="string" nullable="true" />
                             <kendo:dataSource-schema-model-field name="ownerId" type="number" defaultValue="1" />
                             <kendo:dataSource-schema-model-field name="start" type="date" />
                             <kendo:dataSource-schema-model-field name="end" type="date" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-parameterMap>
                        <script>
                            function parameterMap(options, type) {
                                if(type==="read"){
                                    return JSON.stringify(options);
                                } else {
                                    return JSON.stringify(options.models);
                                }
                            }
                        </script>
                </kendo:dataSource-transport-parameterMap>
            </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:scheduler>

**Step 6** Implement the `create` method.

###### Example

        @Autowired
        private TaskDao task;

        // The new scheduler events are posted as JSON
        @RequestMapping(value = "/index/create", method = RequestMethod.POST)
        public @ResponseBody List<Task> create(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<Task> tasks = new ArrayList<Task>();

            for (Map<String, Object> model : models) {
                Task task = new Task();

                task.setDescription((String)model.get("description"));
                task.setTitle((String)model.get("title"));

                SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

                task.setStart(iso8601.parse((String)model.get("start")));
                task.setEnd(iso8601.parse((String)model.get("end")));
                task.setIsAllDay((boolean)model.get("isAllDay"));
                task.setRecurrenceRule((String)model.get("recurrenceRule"));
                task.setRecurrenceException((String)model.get("recurrenceException"));
                task.setRecurrenceId((Integer)model.get("recurrenceId"));

                tasks.add(task);
            }

            task.saveOrUpdate(tasks);

            return tasks;
        }

**Step 7** Implement the `read` method.

###### Example

        // Return a list of Tasks as JSON
        @RequestMapping(value = "/index/read", method = RequestMethod.POST)
        public @ResponseBody List<Task> read() {
            return task.getList();
        }

**Step 8** Implement the `update` method.

###### Example

        @RequestMapping(value = "/index/update", method = RequestMethod.POST)
        public @ResponseBody List<Task> update(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<Task> tasks = new ArrayList<Task>();

            for (Map<String, Object> model : models) {
                Task task = new Task();

                task.setTaskId((int)model.get("taskId"));
                task.setDescription((String)model.get("description"));
                task.setTitle((String)model.get("title"));

                SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

                task.setStart(iso8601.parse((String)model.get("start")));
                task.setEnd(iso8601.parse((String)model.get("end")));
                task.setIsAllDay((boolean)model.get("isAllDay"));
                task.setRecurrenceRule((String)model.get("recurrenceRule"));
                task.setRecurrenceException((String)model.get("recurrenceException"));
                task.setRecurrenceId((Integer)model.get("recurrenceId"));

                tasks.add(task);
            }

            task.saveOrUpdate(tasks);

            return tasks;
        }

**Step 9** Implement the `destroy` method.

###### Example

        @RequestMapping(value = "/index/destroy", method = RequestMethod.POST)
        public @ResponseBody List<Task> destroy(@RequestBody ArrayList<Map<String, Object>> models) {
            List<Task> tasks = new ArrayList<Task>();

            for (Map<String, Object> model : models) {
                Task task = new Task();

                task.setTaskId((int)model.get("taskId"));

                tasks.add(task);
            }

            task.delete(tasks);

            return tasks;
        }

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Scheduler](/api/javascript/ui/scheduler#events) by the handler name. All events are exposed as attributes and nested tags of the Scheduler JSP tag.

The example below demonstrates how to handle Scheduler events by setting their attributes.

###### Example

    <kendo:scheduler name="scheduler" dataBound="scheduler_dataBound">
        <!-- snip -->
    </kendo:scheduler>
    <script>
    function scheduler_dataBound(e) {
        console.log("dataBound");
    }
    </script>

The example below demonstrates how to handle Scheduler events by setting a nested tag.

###### Example

    <kendo:scheduler name="scheduler">
        <!-- snip -->
        <kendo:scheduler-dataBound>
            <script>
            function scheduler_dataBound(e) {
                console.log("dataBound");
            }
            </script>
        </kendo:scheduler-dataBound>
    </kendo:scheduler>

## Reference

### Existing Instances

You are able to reference an existing Scheduler instance by using [`jQuery.data()`](http://api.jquery.com/jQuery.data/) and then passing `kendoScheduler` as an argument.

###### Example

    <kendo:scheduler name="scheduler">
        <!-- snip -->
    </kendo:scheduler>
    <script>
    // Get reference to the kendo.ui.Scheduler instance
    var scheduler = $("#scheduler").data("kendoScheduler");
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Scheduler:

* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
