<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/multicolumnheaders/read" var="transportReadUrl" />

<demo:header />

<kendo:grid name="grid" groupable="true" sortable="true" style="height:550px;" 
	pageable="true" columnMenu="true" resizable="true" reorderable="true">
    <kendo:grid-columns>
    	<kendo:grid-column title="Company Name" field="companyName" width="420" />
        <kendo:grid-column-group title="Contact Info">
        	<kendo:grid-column-group-columns>
        		<kendo:grid-column title="Contact Name" field="contactName" width="200"/>
        		<kendo:grid-column title="Contact Title" field="contactTitle" width="200" />
        		<kendo:grid-column-group title="Location">
        			<kendo:grid-column-group-columns>
        				<kendo:grid-column title="Country" field="country" width="200" />
        				<kendo:grid-column title="City" field="city" width="200" />
        			</kendo:grid-column-group-columns>        	
        		</kendo:grid-column-group>
        		<kendo:grid-column title="Phone" field="phone"/>
        	</kendo:grid-column-group-columns>        	
        </kendo:grid-column-group>
    </kendo:grid-columns>
    <kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
         <kendo:dataSource-schema data="data" total="total" groups="data">
            <kendo:dataSource-schema-model>
                <kendo:dataSource-schema-model-fields>
                    <kendo:dataSource-schema-model-field name="contactName" type="string" />
                    <kendo:dataSource-schema-model-field name="contactTitle" type="string" />
                    <kendo:dataSource-schema-model-field name="companyName" type="string" />
                    <kendo:dataSource-schema-model-field name="country" type="string" />
                    <kendo:dataSource-schema-model-field name="city" type="string" />
                    <kendo:dataSource-schema-model-field name="phone" type="string" />
                </kendo:dataSource-schema-model-fields>
            </kendo:dataSource-schema-model>
        </kendo:dataSource-schema>
        <kendo:dataSource-transport>
            <kendo:dataSource-transport-read url="${transportReadUrl}"  type="POST"  contentType="application/json"/>
            <kendo:dataSource-transport-parameterMap>
           	<script>
            		function parameterMap(options) { 
           				return JSON.stringify(options);
            		}
           	</script>
           </kendo:dataSource-transport-parameterMap> 
        </kendo:dataSource-transport>
    </kendo:dataSource>
</kendo:grid>  
 
<demo:footer />