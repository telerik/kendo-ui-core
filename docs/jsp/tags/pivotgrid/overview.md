---
title: Overview
page_title: Overview | PivotGrid JSP Tag
description: "Get started with the PivotGrid JSP tag in Kendo UI."
slug: overview_pivotgrid_uiforjsp
position: 1
---

# PivotGrid JSP Tag Overview

The PivotGrid JSP tag is a server-side wrapper for the [Kendo UI PivotGrid](/api/javascript/ui/pivotgrid) widget.


> **Important**
>
> The Kendo UI PivotGrid for JSP supports only Ajax data-binding to HTTP accessible OLAP cube. For more information on the OLAP concepts, refer to the article about the [fundamentals of the OLAP Cube]({%slug fundamentals_pivotgrid_widget %}), the [setup of an OLAP cube]({% slug olap_cube_setup_pivotgrid_widget %}) or use Telerik OLAP service at [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll).

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PivotGrid for JSP to do Ajax binding to an **Adventure Works** cube hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "pivotgrid/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a reference to the OLAP service URL.

###### Example

        <c:url value="http://demos.telerik.com/olap/msmdpump.dll" var="transportReadUrl" />  

**Step 5** Add a `pivotgrid` tag.

###### Example

        <kendo:pivotGrid name="pivotgrid">
    		<kendo:pivotDataSource type="xmla">
    			<kendo:pivotDataSource-columns>				
    				<kendo:pivotDataSource-column name="[Date].[Calendar]" expand="true"/>
    				<kendo:pivotDataSource-column name="[Geography].[City]"/>
    			</kendo:pivotDataSource-columns>
    			<kendo:pivotDataSource-rows>				
    				<kendo:pivotDataSource-row name="[Product].[Product]"/>
    			</kendo:pivotDataSource-rows>
    			<kendo:pivotDataSource-measures>
    				<kendo:pivotDataSource-measure name="[Measures].[Internet Sales Amount]"/>
    			</kendo:pivotDataSource-measures>
    			<kendo:pivotDataSource-schema type="xmla">
    			</kendo:pivotDataSource-schema>
    			<kendo:pivotDataSource-transport>
    				<kendo:pivotDataSource-transport-connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"/>
    				<kendo:pivotDataSource-transport-discover url="${transportReadUrl}" dataType="text" contentType="text/xml" type="POST">					
    				</kendo:pivotDataSource-transport-discover>
    				<kendo:pivotDataSource-transport-read url="${transportReadUrl}" dataType="text" contentType="text/xml" type="POST">					
    				</kendo:pivotDataSource-transport-read>
    			</kendo:pivotDataSource-transport>
    		</kendo:pivotDataSource>
    	</kendo:pivotGrid>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI PivtoGrid](/api/javascript/ui/pivotgrid#events) by the handler name.

###### Example

        <kendo:grid name="productGrid" dataBound="productGrid_dataBound" change="productGrid_change">
            <kendo:dataSource data="${data}" pageSize="10"/>
        </kendo:grid>

        <kendo:pivotGrid name="pivotgrid" dataBound="pivotgrid_dataBound" expandMember="pivotgrid_expandMember" collapseMember="pivotgrid_collapseMember">
    		<kendo:pivotDataSource type="xmla">
    			<kendo:pivotDataSource-columns>				
    				<kendo:pivotDataSource-column name="[Date].[Calendar]" expand="true"/>
    				<kendo:pivotDataSource-column name="[Geography].[City]"/>
    			</kendo:pivotDataSource-columns>
    			<kendo:pivotDataSource-rows>				
    				<kendo:pivotDataSource-row name="[Product].[Product]"/>
    			</kendo:pivotDataSource-rows>
    			<kendo:pivotDataSource-measures>
    				<kendo:pivotDataSource-measure name="[Measures].[Internet Sales Amount]"/>
    			</kendo:pivotDataSource-measures>
    			<kendo:pivotDataSource-schema type="xmla">
    			</kendo:pivotDataSource-schema>
    			<kendo:pivotDataSource-transport>
    				<kendo:pivotDataSource-transport-connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"/>
    				<kendo:pivotDataSource-transport-discover url="${transportReadUrl}" dataType="text" contentType="text/xml" type="POST">					
    				</kendo:pivotDataSource-transport-discover>
    				<kendo:pivotDataSource-transport-read url="${transportReadUrl}" dataType="text" contentType="text/xml" type="POST">					
    				</kendo:pivotDataSource-transport-read>
    			</kendo:pivotDataSource-transport>
    		</kendo:pivotDataSource>
    	</kendo:pivotGrid>

        <script>
        function pivotgrid_dataBound() {
            //Handle the dataBound event
        }

        function pivotgrid_expandMember() {
            //Handle the expandMember event
        }

        function pivotgrid_collapseMember() {
            //Handle the collapseMember event
        }
        </script>

## Reference

### Existing Instances

You are able to reference an existing PivotGrid instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [PivotGrid API](/api/javascript/ui/pivotgrid#methods) to control its behavior.

###### Example

    //Put this after your Kendo PivotGrid tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the pivotgrid is used to get its client-side instance
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the PivotGrid:

* [Overview of the Kendo UI PivotGrid Widget]({% slug overview_kendoui_pivotgrid_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
