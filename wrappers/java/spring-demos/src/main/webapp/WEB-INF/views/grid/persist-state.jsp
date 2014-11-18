<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/resources/web/grid/clientsDb.png" var="backgroundUrl" />
<c:url value="/grid/customers/" var="transportReadUrl" />

<demo:header />

	<a href="#" class="k-button" id="save">Save State</a>
	<a href="#" class="k-button" id="load">Load State</a>
    <kendo:grid name="grid" groupable="true" sortable="true" style="height:550px;" columnMenu="true">
    	<kendo:grid-filterable mode="row"/>
    	<kendo:grid-pageable refresh="true" pageSizes="true" buttonCount="5">
    	</kendo:grid-pageable>
        <kendo:grid-columns>
            <kendo:grid-column title="Contact Name" locked="true" field="contactName" width="250" />
            <kendo:grid-column title="Contact Title" field="contactTitle" width="350" />
            <kendo:grid-column title="Company Name" field="companyName" width="350"/>
            <kendo:grid-column title="Country" field="country" width="400" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="20">
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model>
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="contactName" type="string" />
                        <kendo:dataSource-schema-model-field name="contactTitle" type="string" />
                        <kendo:dataSource-schema-model-field name="companyName" type="string" />
                        <kendo:dataSource-schema-model-field name="country" type="string" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}"/>
            </kendo:dataSource-transport>
        </kendo:dataSource>
    </kendo:grid>

<script>
	$(function () {
		 var grid = $("#grid").data("kendoGrid");

        $("#save").click(function (e) {
            e.preventDefault();
            localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
        });

        $("#load").click(function (e) {
            e.preventDefault();
            var options = localStorage["kendo-grid-options"];
            if (options) {
                grid.setOptions(JSON.parse(options));
            }
        });
	});
</script> 
<demo:footer />