<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treelist/all" var="transportReadUrl" />

<demo:header />

<script id="photo-template" type="text/x-kendo-template">
   <div class='employee-photo'
        style='background-image: url(../content/web/treelist/people/#:data.EmployeeID#.jpg);'></div>
   <div class='employee-name'>#: FirstName #</div>
</script>

<div class="demo-section k-header">
<kendo:treeList name="treelist" sortable="true" filterable="true" height="540" >
    <kendo:treeList-columns>
        <kendo:treeList-column field="firstName" title="First Name" width="220"
        	template="<div class='employee-photo' style='background-image: url(../resources/web/treelist/people/#:employeeId#.jpg);'></div><div class='employee-name'>#: firstName #</div>">
       	</kendo:treeList-column>
        <kendo:treeList-column field="lastName" title="Last Name" width="160"></kendo:treeList-column>
        <kendo:treeList-column field="position" title="Position"></kendo:treeList-column>
        <kendo:treeList-column field="phone" title="Phone" width="200"></kendo:treeList-column>
        <kendo:treeList-column field="extension" title="Extension" width="140"></kendo:treeList-column>
        <kendo:treeList-column field="address" title="Address"></kendo:treeList-column>
    </kendo:treeList-columns>
    <kendo:dataSource >
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="employeeId">
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="employeeId" type="number" />
                        <kendo:dataSource-schema-model-field name="parentId" from="reportsTo" type="number" nullable="true"/>
                        <kendo:dataSource-schema-model-field name="firstName" type="string" />
                        <kendo:dataSource-schema-model-field name="lastName" type="string" />
                        <kendo:dataSource-schema-model-field name="position" type="string" />
                        <kendo:dataSource-schema-model-field name="phone" type="string" />
                        <kendo:dataSource-schema-model-field name="address" type="string" />
                        <kendo:dataSource-schema-model-field name="extension" type="number" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}"/>
            </kendo:dataSource-transport>
        </kendo:dataSource>
</kendo:treeList>

<style>
    .employee-photo {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: 40px 44px;
        background-position: center center;
        vertical-align: middle;
        line-height: 41px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
    }

    .employee-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 41px;
        padding-left: 10px;
    }
</style>

</div>
 
<demo:footer />
