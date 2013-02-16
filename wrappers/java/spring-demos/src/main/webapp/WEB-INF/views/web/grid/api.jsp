<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/api/read" var="transportReadUrl" />

<demo:header />

	<div class="configuration k-widget k-header" style="width:190px">
         <span class="configHead">API Functions</span>
         <ul class="options">
             <li>
                 <input type="text" value="0" id="selectRow" class="k-textbox"/>
                 <button class="selectRow k-button">Select row</button>
             </li>
             <li>
                 <button class="clearSelection k-button">Clear selected rows</button>
             </li>
             <li>
                 <input type="text" value="0" id="groupRow" class="k-textbox"/>
                 <button class="toggleGroup k-button">Collapse/Expand group</button>
             </li>
         </ul>
     </div>
     
    <kendo:grid name="grid" pageable="true" style="width:700px;" sortable="true" selectable="multiple row"
    	groupable="true" scrollable="false">
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="5">             
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}"/>
            </kendo:dataSource-transport>
            <kendo:dataSource-group>
            	<kendo:dataSource-groupItem field="unitsInStock" dir="asc" />
            </kendo:dataSource-group>
        </kendo:dataSource>       
   </kendo:grid>       
      
   <script>		
	    $(".clearSelection").click(function () {
	        $("#grid").data("kendoGrid").clearSelection();
	    });
	
	    var selectRow = function (e) {
	        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	            var grid = $("#grid").data("kendoGrid"),
	                    rowIndex = $("#selectRow").val(),
	                    row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(rowIndex);
	
	            grid.select(row);
	        }
	    },
	        toggleGroup = function (e) {
	            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	                var grid = $("#grid").data("kendoGrid"),
	                    rowIndex = $("#groupRow").val(),
	                    row = grid.tbody.find(">tr.k-grouping-row").eq(rowIndex);
	
	                if (row.has(".k-i-collapse").length) {
	                    grid.collapseGroup(row);
	                } else {
	                    grid.expandGroup(row);
	                }
	            }
	        };
	
        $(document).ready(function () {
		    $(".selectRow").click(selectRow);
		    $("#selectRow").keypress(selectRow);
		
		    $(".toggleGroup").click(toggleGroup);
		    $("#groupRow").keypress(toggleGroup);
        });
	</script>
	
	<style scoped>
	.configuration .k-textbox
	{
	    width: 23px;
	}
	</style>   
<demo:footer />