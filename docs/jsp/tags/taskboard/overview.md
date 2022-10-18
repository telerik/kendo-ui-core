---
title: Overview
page_title: Overview - TaskBoard JSP Tag
description: "Get started with the TaskBoard JSP tag in Kendo UI."
slug: overview_taskboard_uiforjsp
position: 1
---

# TaskBoard JSP Tag Overview

The TaskBoard JSP tag is a server-side wrapper for the [Kendo UI TaskBoard](/api/javascript/ui/taskboard) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the TaskBoard in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method.



        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {       
            return "taskboard/index";
        } 

**Step 3** Add the Kendo UI `taglib` mapping to the page.



        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add a TaskBoard and bind it do data.



        <%
            ArrayList<HashMap<String, Object>> cardsData = new ArrayList<HashMap<String, Object>>();

            HashMap<String, Object> Campaigns = new HashMap<String, Object>();
            Campaigns.put("id", 1);
            Campaigns.put("title", "Campaigns");
            Campaigns.put("order", 1);
            Campaigns.put("description", "Create a new landing page for campaign");
            Campaigns.put("status", "todo");
            Campaigns.put("color", "orange");
            cardsData.add(Campaigns);
            
            HashMap<String, Object> Newsletters = new HashMap<String, Object>();
            Newsletters.put("id", 2);
            Newsletters.put("title", "Newsletters");
            Newsletters.put("order", 2);
            Newsletters.put("description", "Send newsletter");
            Newsletters.put("status", "todo");
            Newsletters.put("color", "orange");
            cardsData.add(Newsletters);
            
            HashMap<String, Object> Ads = new HashMap<String, Object>();
            Ads.put("id", 3);
            Ads.put("title", "Ads Analytics");
            Ads.put("order", 3);
            Ads.put("description", "Review ads performance");
            Ads.put("status", "todo");
            Ads.put("color", "orange");
            cardsData.add(Ads);
            
            
            HashMap<String, Object> Funnel = new HashMap<String, Object>();
            Funnel.put("id", 9);
            Funnel.put("title", "Funnel Analytics");
            Funnel.put("order", 9);
            Funnel.put("description", "Funnel analysis");
            Funnel.put("status", "inProgress");
            Funnel.put("color", "blue");
            cardsData.add(Funnel);
            
            HashMap<String, Object> Journey2 = new HashMap<String, Object>();
            Journey2.put("id", 13);
            Journey2.put("title", "Customer Journey");
            Journey2.put("order", 13);
            Journey2.put("description", "Review shopping cart experiencen");
            Journey2.put("status", "done");
            Journey2.put("color", "green");
            cardsData.add(Journey2);
            
            HashMap<String, Object> Content2 = new HashMap<String, Object>();
            Content2.put("id", 14);
            Content2.put("title", "Content");
            Content2.put("order", 14);
            Content2.put("description", "Publish new blogpost");
            Content2.put("status", "done");
            Content2.put("color", "green");
            cardsData.add(Content2);
            
            ArrayList<HashMap<String, Object>> columnsData = new ArrayList<HashMap<String, Object>>();

            HashMap<String, Object> todo = new HashMap<String, Object>();
            todo.put("id", 1);
            todo.put("text", "To-Do");
            todo.put("status", "todo");
            columnsData.add(todo);
            
            HashMap<String, Object> inProgress = new HashMap<String, Object>();
            inProgress.put("id", 2);
            inProgress.put("text", "In Progress");
            inProgress.put("status", "inProgress");
            columnsData.add(inProgress);
            
            HashMap<String, Object> done = new HashMap<String, Object>();
            done.put("id", 3);
            done.put("text", "Done");
            done.put("status", "done");
            columnsData.add(done);

        %>

        <kendo:taskBoard name="taskBoard" dataOrderField="order" height="970" width="1030">
            <kendo:taskBoard-columnSettings width="320" template="<%=columnTemplate%>">
                <kendo:taskBoard-columnSettings-buttons>
                    <kendo:taskBoard-columnSettings-button name="editColumn"/>
                    <kendo:taskBoard-columnSettings-button name="addCard"/>
                    <kendo:taskBoard-columnSettings-button name="deleteColumn"/>
                </kendo:taskBoard-columnSettings-buttons>
            </kendo:taskBoard-columnSettings>
            <kendo:taskBoard-columns>
                <kendo:dataSource data="<%= columnsData %>"></kendo:dataSource>
            </kendo:taskBoard-columns>
            <kendo:dataSource data="<%= cardsData %>"></kendo:dataSource>
        </kendo:taskBoard>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TaskBoard](/api/javascript/ui/taskboard#events) by the handler name.



	<kendo:taskBoard name="taskBoard" dataOrderField="order" height="970" width="1030" dataBound="onDataBound">
        <kendo:taskBoard-columnSettings width="320" template="<%=columnTemplate%>">
            <kendo:taskBoard-columnSettings-buttons>
                <kendo:taskBoard-columnSettings-button name="editColumn"/>
                <kendo:taskBoard-columnSettings-button name="addCard"/>
                <kendo:taskBoard-columnSettings-button name="deleteColumn"/>
            </kendo:taskBoard-columnSettings-buttons>
        </kendo:taskBoard-columnSettings>
        <kendo:taskBoard-columns>
            <kendo:dataSource data="<%= columnsData %>"></kendo:dataSource>
        </kendo:taskBoard-columns>
        <kendo:dataSource data="<%= cardsData %>"></kendo:dataSource>
    </kendo:taskBoard>

    <script>
    function onDataBound() {
        //Handle the dataBound event
    }
    </script>

## Reference

### Existing Instances

To get a reference to an existing TaskBoard instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [TaskBoard API](/api/javascript/ui/taskboard) to control its behavior.

        var taskBoard = $("#taskBoard").data("kendoTaskBoard");


## See Also

* [Overview of the Kendo UI TaskBoard Widget]({% slug overview_kendoui_taskboard_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
