---
title: Overview
---

# PivotGrid

The PivotGrid tag is a server-side wrapper for the [Kendo UI PivotGrid](/api/web/pivotgrid) widget.

## Introduction

Kendo UI PivotGrid for JSP supports **only** ajax data-binding to HTTP accessible OLAP cube. More information about OLAP concepts can be found in the following links:

- [PivotGrid Fundamentals](/web/pivotgrid/fundamentals)
- [Setup an OLAP cube](/web/pivotgrid/olap-cube-setup) or use our OLAP service ([http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll))

## Getting started
The following tutorial shows how to configure Kendo UI PivotGrid for JSP to do ajax binding to an **Adventure Works** cube hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll)

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

1.  Create a new action method which renders the view:
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "pivotgrid/index";
    }

1. Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

1. Add a reference to OLAP service URL:

        <c:url value="http://demos.telerik.com/olap/msmdpump.dll" var="transportReadUrl" />  

1. Add a pivotgrid tag:

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

## Accessing an Existing PivotGrid

You can reference an existing PivotGrid instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/pivotgrid#methods) to control its behavior.

### Accessing an existing PivotGrid instance

    //Put this after your Kendo PivotGrid tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the pivotgrid is used to get its client-side instance
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    });
    </script>


## Handling Kendo UI PivotGrid events

You can subscribe to all [events](/api/web/pivotgrid#events) exposed by Kendo UI PivotGrid:


### Subscribe by handler name

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
