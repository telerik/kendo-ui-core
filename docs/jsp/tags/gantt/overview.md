---
title: Overview
page_title: Overview | Gantt JSP Tag
description: "Get started with the Gantt JSP tag in Kendo UI."
slug: overview_gantt_uiforjsp
position: 1
---

# Gantt JSP Tag Overview

The Gantt tag is a server-side wrapper for the [Kendo UI Gantt](/api/javascript/ui/gantt) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Gantt.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a class which will represent the Gantt. Call it `GanttTask`.

###### Example

        @Entity
        @Table(name="GanttTasks")
        public class GanttTask {
            private int id;
            private int orderId;
            private Integer parentId;
            private Date start;
            private Date end;
            private String title;
            private boolean summary;
            private boolean expanded;
            private double percentComplete;

            @Id
            @Column(name="ID")
            @GeneratedValue(strategy=GenerationType.AUTO)
            public int getId() {
                return id;
            }

            public void setId(int id ) {
                this.id = id ;
            }

            @Column(name="OrderID")
            public int getOrderId() {
                return orderId;
            }

            public void setOrderId(int orderId) {
                this.orderId = orderId;
            }

            @Column(name="ParentID")
            public Integer getParentId() {
                return parentId;
            }

            public void setParentId(Integer parentId) {
                this.parentId = parentId;
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

            @Column(name="Summary")
            public boolean getSummary() {
                return summary;
            }

            public void setSummary(boolean summary) {
                this.summary = summary;
            }

            @Column(name="Expanded")
            public boolean getExpanded() {
                return expanded;
            }

            public void setExpanded(boolean expanded) {
                this.expanded = expanded;
            }

            @Column(name="PercentComplete")
            public double getPercentComplete() {
                return percentComplete;
            }

            public void setPercentComplete(double percentComplete) {
                this.percentComplete = percentComplete;
            }
        }
**Step 3** Register the Telerik UI for JSP `taglib` in your JSP page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Declare a `gantt` tag. Configure the fields of its tasks and dependencies data source model.

###### Example

        <kendo:gantt name="gantt" height="700" showWorkDays="false" showWorkHours="false" snap="false">
            <kendo:dataSource batch="false">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="id">
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="id" type="number" />
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="parentId" type="number" />
                            <kendo:dataSource-schema-model-field name="start" type="date" />
                            <kendo:dataSource-schema-model-field name="end" type="date" />
                            <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                            <kendo:dataSource-schema-model-field name="percentComplete" type="number" />
                            <kendo:dataSource-schema-model-field name="expanded" type="boolean" />
                            <kendo:dataSource-schema-model-field name="summary" type="boolean" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
            </kendo:dataSource>
            <kendo:dependencies batch="false">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="id">
                         <kendo:dataSource-schema-model-fields>
                             <kendo:dataSource-schema-model-field name="id" type="number" />
                             <kendo:dataSource-schema-model-field name="predecessorId" type="number" />
                             <kendo:dataSource-schema-model-field name="successorId" type="number" />
                             <kendo:dataSource-schema-model-field name="type" type="number" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
            </kendo:dependencies>
        </kendo:gantt>

**Step 5** Specify the action methods which will perform the `create`, `read`, `update` and `destroy` operations for the tasks and dependencies.

###### Example

        <kendo:gantt name="gantt" height="700" showWorkDays="false" showWorkHours="false" snap="false">
            <kendo:dataSource batch="false">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="id">
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="id" type="number" />
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="parentId" type="number" />
                            <kendo:dataSource-schema-model-field name="start" type="date" />
                            <kendo:dataSource-schema-model-field name="end" type="date" />
                            <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                            <kendo:dataSource-schema-model-field name="percentComplete" type="number" />
                            <kendo:dataSource-schema-model-field name="expanded" type="boolean" />
                            <kendo:dataSource-schema-model-field name="summary" type="boolean" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-create url="${tasksCreateUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-read url="${tasksReadUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-update url="${tasksUpdateUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-destroy url="${tasksDestroyUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-parameterMap>
                        <script>
                            function parameterMap(options, type) {
                                return JSON.stringify(options.models || [ options ]);
                            }
                        </script>
                    </kendo:dataSource-transport-parameterMap>
                </kendo:dataSource-transport>
            </kendo:dataSource>
            <kendo:dependencies batch="false">
                 <kendo:dataSource-schema>
                    <kendo:dataSource-schema-model id="id">
                         <kendo:dataSource-schema-model-fields>
                             <kendo:dataSource-schema-model-field name="id" type="number" />
                             <kendo:dataSource-schema-model-field name="predecessorId" type="number" />
                             <kendo:dataSource-schema-model-field name="successorId" type="number" />
                             <kendo:dataSource-schema-model-field name="type" type="number" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-create url="${dependencyCreateUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-read url="${dependencyReadUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-update url="${dependencyUpdateUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-destroy url="${dependencyDestroyUrl}" dataType="json" type="POST" contentType="application/json" />
                    <kendo:dataSource-transport-parameterMap>
                    	<script>
                            function parameterMap(options, type) {
                                return JSON.stringify(options.models || [ options ]);
                            }
                    	</script>
                    </kendo:dataSource-transport-parameterMap>              
                </kendo:dataSource-transport>
            </kendo:dependencies>
        </kendo:gantt>

**Step 6** Implement the `create_task` method.

###### Example

        @Autowired
        private GanttTaskDao taskDao;

        // The new gantt tasks are posted as JSON
        @RequestMapping(value = "/tasks/create", method = RequestMethod.POST)
        public @ResponseBody List<GanttTask> create_task(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<GanttTask> newTasks = new ArrayList<GanttTask>();

            for (Map<String, Object> model : models) {
                GanttTask task = new GanttTask();

                task.setTitle((String)model.get("title"));

                SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

                task.setStart(iso8601.parse((String)model.get("start")));
                task.setEnd(iso8601.parse((String)model.get("end")));
                task.setSummary((boolean)model.get("summary"));
                task.setExpanded((boolean)model.get("expanded"));
                task.setParentId((Integer)model.get("parentId"));
                task.setOrderId((int)model.get("orderId"));
                task.setPercentComplete((double)model.get("percentComplete"));

                newTasks.add(task);
            }

            taskDao.saveOrUpdate(newTasks);

            return newTasks;
        }

**Step 8** Implement the `read_tasks` method.

###### Example

        // Return a list of tasks as JSON
        @RequestMapping(value = "/tasks/read", method = RequestMethod.POST)
        public @ResponseBody List<GanttTask> read_tasks() {
            return taskDao.getList();
        }

**Step 9** Implement the `update_task` method.

###### Example

        @RequestMapping(value = "/tasks/update", method = RequestMethod.POST)
        public @ResponseBody List<GanttTask> update_task(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<GanttTask> updatedTasks = new ArrayList<GanttTask>();

            for (Map<String, Object> model : models) {
                GanttTask task = new GanttTask();

                task.setId((int)model.get("id"));
                task.setTitle((String)model.get("title"));

                SimpleDateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                iso8601.setTimeZone(TimeZone.getTimeZone("UTC"));

                task.setStart(iso8601.parse((String)model.get("start")));
                task.setEnd(iso8601.parse((String)model.get("end")));
                task.setSummary((boolean)model.get("summary"));
                task.setExpanded((boolean)model.get("expanded"));
                task.setParentId((Integer)model.get("parentId"));
                task.setOrderId((int)model.get("orderId"));
                task.setPercentComplete((double)model.get("percentComplete"));

                updatedTasks.add(task);
            }

            taskDao.saveOrUpdate(updatedTasks);

            return updatedTasks;
        }

**Step 10** Implement the `destroy_task` method.

###### Example

        @RequestMapping(value = "/tasks/destroy", method = RequestMethod.POST)
        public @ResponseBody List<GanttTask> destroy_task(@RequestBody ArrayList<Map<String, Object>> models) {
            List<GanttTask> deletedTasks = new ArrayList<GanttTask>();

            for (Map<String, Object> model : models) {
                GanttTask task = new GanttTask();

                task.setId((int)model.get("id"));

                deletedTasks.add(task);
            }

            taskDao.delete(deletedTasks);

            return deletedTasks;
        }

**Step 11** Implement the `create_dependency` method.

###### Example

        @Autowired
        private GanttDependencyDao dependencyDao;

        @RequestMapping(value = "/dependencies/create", method = RequestMethod.POST)
        public @ResponseBody List<GanttDependency> create_dependency(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<GanttDependency> newDependencies = new ArrayList<GanttDependency>();

            for (Map<String, Object> model : models) {
                GanttDependency dependency = new GanttDependency();

                dependency.setPredecessorId((int)model.get("predecessorId"));
                dependency.setSuccessorId((int)model.get("successorId"));
                dependency.setType((int)model.get("type"));

                newDependencies.add(dependency);
            }

            dependencyDao.saveOrUpdate(newDependencies);

            return newDependencies;
        }

**Step 12** Implement the `read_dependencies` method.

###### Example

        @RequestMapping(value = "/dependencies/read", method = RequestMethod.POST)
        public @ResponseBody List<GanttDependency> read_dependencies() {
            return dependencyDao.getList();
        }

**Step 13** Implement the `update_dependency` method.

###### Example

        @RequestMapping(value = "/dependencies/update", method = RequestMethod.POST)
        public @ResponseBody List<GanttDependency> update_dependency(@RequestBody ArrayList<Map<String, Object>> models) throws ParseException {
            List<GanttDependency> updatedDependencies = new ArrayList<GanttDependency>();

            for (Map<String, Object> model : models) {
                GanttDependency dependency = new GanttDependency();

                dependency.setId((int)model.get("id"));

                dependency.setPredecessorId((int)model.get("predecessorId"));
                dependency.setSuccessorId((int)model.get("successorId"));
                dependency.setType((int)model.get("type"));    

                updatedDependencies.add(dependency);
            }

            dependencyDao.saveOrUpdate(updatedDependencies);

            return updatedDependencies;
        }

**Step 14** Implement the `destroy_dependency` method.

###### Example

        @RequestMapping(value = "/dependencies/destroy", method = RequestMethod.POST)
        public @ResponseBody List<GanttDependency> destroy_dependency(@RequestBody ArrayList<Map<String, Object>> models) {
            List<GanttDependency> deletedDependencies = new ArrayList<GanttDependency>();

            for (Map<String, Object> model : models) {
                GanttDependency dependency = new GanttDependency();

                dependency.setId((int)model.get("id"));

                deletedDependencies.add(dependency);
            }

            dependencyDao.delete(deletedDependencies);

            return deletedDependencies;
        }

## Event Handling

### Subscribe to Events

The Kendo UI Gantt widget supports a set of [events](/api/javascript/ui/gantt#events) which you are able to subscribe to. All events are exposed as attributes and nested tags of the Gantt JSP tag.

The example below demonstrates how to handle Gantt events by setting their attributes.

###### Example

          <kendo:gantt name="gantt" dataBound="gantt_dataBound">
              <!-- snip -->
          </kendo:gantt>
          <script>
          function gantt_dataBound(e) {
              console.log("dataBound");
          }
          </script>

The example below demonstrates how to handle Gantt events by setting a nested tag.

###### Example

          <kendo:gantt name="gantt">
              <!-- snip -->
              <kendo:gantt-dataBound>
                  <script>
                  function gantt_dataBound(e) {
                      console.log("dataBound");
                  }
                  </script>
              </kendo:gantt-dataBound>
          </kendo:gantt>

## Reference

To get a reference to a Kendo UI Gantt instance, use the jQuery `data` and pass `"kendoGantt"` as an argument.

###### Example

          <kendo:gantt name="gantt">
              <!-- snip -->
          </kendo:gantt>
          <script>
          // Get reference to the kendo.ui.Gantt instance
          var gantt = $("#gantt").data("kendoGantt");
          </script>

## See Also

Other articles on Telerik UI for JSP and on the Gantt:

* [Overview of the Kendo UI Gantt Widget]({% slug overview_kendoui_gantt_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
