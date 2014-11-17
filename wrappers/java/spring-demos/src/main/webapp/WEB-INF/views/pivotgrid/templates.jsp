<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="http://demos.telerik.com/olap/msmdpump.dll" var="transportReadUrl" />

<demo:header />
	<%
	String dataCellTemplate = "# var columnMember = columnTuple ? columnTuple.members[0] : { children: [] }; #" +
	        "# var rowMember = rowTuple ? rowTuple.members[0] : { children: [] }; #" +
	        "# var value = kendo.toString(kendo.parseFloat(dataItem.value) || \"N/A\", \"c2\"); #" +
	        "# if (columnMember.children.length || rowMember.children.length) { #" +
	        "   	<em  style=\"color: red\">#: value # (total)</em>" +
	        "# } else { #" +
	        "	#: value #" +
			"# } #";

	String headerTemplate = "# if (!member.children.length) { #" +
    						"	<em>#: member.caption #</em>" +
							"# } else { #" +
    						"	#: member.caption #" +
							"# } #";
	%>	
	<kendo:pivotGrid name="pivotgrid" columnWidth="200" height="270"
		dataCellTemplate="<%=dataCellTemplate%>" columnHeaderTemplate="<%=headerTemplate%>"
		rowHeaderTemplate="<%=headerTemplate%>">		
		<kendo:pivotGrid-configurator name="configurator" />
		<kendo:pivotDataSource type="xmla">
			<kendo:pivotDataSource-columns>
				<kendo:pivotDataSource-column name="[Date].[Calendar]" expand="true"/>
			</kendo:pivotDataSource-columns>
			<kendo:pivotDataSource-rows>
				<kendo:pivotDataSource-row name="[Product].[Product Line]"/>
			</kendo:pivotDataSource-rows>
			<kendo:pivotDataSource-measures>
				<kendo:pivotDataSource-measure name="[Measures].[Reseller Freight Cost]"/>
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

<demo:footer />
