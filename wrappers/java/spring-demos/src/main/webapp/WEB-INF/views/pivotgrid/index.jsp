<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="http://demos.telerik.com/olap/msmdpump.dll" var="transportReadUrl" />

<demo:header />

	<kendo:pivotConfigurator name="configurator">
	</kendo:pivotConfigurator>
	
	<kendo:pivotGrid name="pivotgrid" height="550px">
		<kendo:pivotGrid-configurator name="configurator" />	
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
	
	 <style>
	     #pivotgrid
	     {
	         display: inline-block;
	         vertical-align: top;
	         width: 60%;
	     }
	
	     #configurator
	     {
	         display: inline-block;
	         vertical-align: top;
	     }
      </style>
	
<demo:footer />