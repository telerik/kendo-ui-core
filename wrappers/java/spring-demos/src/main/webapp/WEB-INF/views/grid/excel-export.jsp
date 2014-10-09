<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/excel-export/read" var="transportReadUrl" />
<c:url value="/grid/excel-export/save" var="saveUrl" />

<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

<demo:header />
  
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true" groupable="true" reorderable="true" resizable="true" columnMenu="true" style="width:900px">
        <kendo:grid-toolbar>
        	<kendo:grid-toolbarItem name="excel"></kendo:grid-toolbarItem>
        </kendo:grid-toolbar>        
        <kendo:grid-excel fileName="Kendo UI Grid Export.xlsx" filterable="true" proxyURL="${saveUrl}" />
        <kendo:grid-columns>
            <kendo:grid-column width="300" locked="true" title="Product Name" field="productName" footerTemplate="Total Count: #=count#" groupFooterTemplate="Count: #=count#" />
            <kendo:grid-column width="300" title="Unit Price" field="unitPrice" />
            <kendo:grid-column width="300" title="Units On Order" field="unitsOnOrder" footerTemplate="Average: #= average#" 
            	groupFooterTemplate="Average: #= average #" />
            <kendo:grid-column width="300" title="Units In Stock" field="unitsInStock" footerTemplate="Min: #= min # Max: #= max #"
                               groupHeaderTemplate="Units In Stock: #= value # (Count: #= count#)"  />
        </kendo:grid-columns>        
        <kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true" serverAggregates="true">            
	        	<kendo:dataSource-group>
		        	<kendo:dataSource-groupItem field="unitsInStock">
		        		<kendo:dataSource-groupItem-aggregates>       		        		      
			        		<kendo:dataSource-groupItem-aggregate aggregate="min" field="unitsInStock"/>
			        		<kendo:dataSource-groupItem-aggregate aggregate="max" field="unitsInStock"/>
			        		<kendo:dataSource-groupItem-aggregate aggregate="count" field="unitsInStock"/>
			        		<kendo:dataSource-groupItem-aggregate aggregate="average" field="unitsOnOrder"/>
			        		<kendo:dataSource-groupItem-aggregate aggregate="count" field="productName"/>
		        		</kendo:dataSource-groupItem-aggregates>
		        	</kendo:dataSource-groupItem>
	        	</kendo:dataSource-group>
		        <kendo:dataSource-aggregate>               		        		      
			        <kendo:dataSource-aggregateItem aggregate="min" field="unitsInStock"/>
			        <kendo:dataSource-aggregateItem aggregate="max" field="unitsInStock"/>
			        <kendo:dataSource-aggregateItem aggregate="count" field="unitsInStock"/>
			        <kendo:dataSource-aggregateItem aggregate="average" field="unitsOnOrder"/>
			        <kendo:dataSource-aggregateItem aggregate="count" field="productName"/>        		
		        </kendo:dataSource-aggregate>
            	<kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>   
                <kendo:dataSource-transport-parameterMap>
	            	<script>
	             		function parameterMap(options) { 
	            			return JSON.stringify(options);
	             		}
	            	</script>
	            </kendo:dataSource-transport-parameterMap>             
            </kendo:dataSource-transport>            
            <kendo:dataSource-schema data="data" total="total" groups="data" aggregates="aggregates">
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="productName" type="string" />
                            <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                            <kendo:dataSource-schema-model-field name="unitsInStock" type="number" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
<demo:footer />
