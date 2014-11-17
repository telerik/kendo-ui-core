<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

	<kendo:pivotConfigurator name="configurator" height="570px">
	</kendo:pivotConfigurator>

	<kendo:pivotGrid name="pivotgrid" columnWidth="120" height="570px">		
		<kendo:pivotGrid-configurator name="configurator" />
		<kendo:pivotDataSource data="${products}">
			<kendo:pivotDataSource-schema>
				<kendo:pivotDataSource-schema-cube>
					<kendo:pivotDataSource-schema-cube-dimensions>
						<kendo:pivotDataSource-schema-cube-dimension name="productName" caption="All Products"/>
						<kendo:pivotDataSource-schema-cube-dimension name="categoryName" caption="All Categories"/>
						<kendo:pivotDataSource-schema-cube-dimension name="discontinued" caption="Discontinued"/>
					</kendo:pivotDataSource-schema-cube-dimensions>
					<kendo:pivotDataSource-schema-cube-measures>
						<kendo:pivotDataSource-schema-cube-measure name="Sum" field="unitPrice" aggregateName="sum" format="{0:c}"/>
						<kendo:pivotDataSource-schema-cube-measure name="Average" field="unitPrice" aggregateName="average" format="{0:c}"/>
					</kendo:pivotDataSource-schema-cube-measures>
				</kendo:pivotDataSource-schema-cube>
				 <kendo:dataSource-schema-model>
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="productName" type="string" />
                        <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                        <kendo:dataSource-schema-model-field name="categoryName" from="category.categoryName" />                        
                        <kendo:dataSource-schema-model-field name="discontinued" type="boolean" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>				
			</kendo:pivotDataSource-schema>
			
			<kendo:pivotDataSource-columns>
				<kendo:pivotDataSource-column name="categoryName" expand="true"/>
				<kendo:pivotDataSource-column name="productName"/>
			</kendo:pivotDataSource-columns>
			<kendo:pivotDataSource-rows>
				<kendo:pivotDataSource-row name="discontinued"/>
			</kendo:pivotDataSource-rows>
			<kendo:pivotDataSource-measures>
				<kendo:pivotDataSource-measure name="Sum"/>
			</kendo:pivotDataSource-measures>			
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
