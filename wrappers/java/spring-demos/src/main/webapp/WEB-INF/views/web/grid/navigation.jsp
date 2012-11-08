<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true" 
    	selectable="multiple cell" navigatable="true" >
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource data="${products}" pageSize="10">
        	<kendo:dataSource-group>
        		<kendo:dataSource-groupItem field="unitsInStock"/>
        	</kendo:dataSource-group>        
            <kendo:dataSource-schema>
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
    
    <script>    	
	    $(document.body).keydown(function(e) {
	        if (e.altKey && e.keyCode == 87) {
	            $("#grid").data("kendoGrid").table.focus();
	        }
	    });
    </script>
    
     <ul class="keyboard-legend" style="padding-top: 25px">
         <li>
             <span class="button-preview">
                 <span class="key-button leftAlign">Alt</span>
                 +
                 <span class="key-button">w</span>
             </span>
             <span class="button-descr">
                 focuses the widget
             </span>
         </li>
     </ul>

     <h4>Actions applied on Grid header</h4>
     <ul class="keyboard-legend">
         <li>
             <span class="button-preview">
                 <span class="key-button">Enter</span>
             </span>
             <span class="button-descr">
                 sort by the column
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button leftAlign">Alt</span>
                 +
                 <span class="key-button">Down</span>
             </span>
             <span class="button-descr">
                 opens the filter menu
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">Esc</span>
             </span>
             <span class="button-descr">
                 closes the filter menu
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">Tab</span>
             </span>
             <span class="button-descr">
                 navigates through the elements in the filter menu(default browser behavior)
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button leftAlign">Shift</span>
                 +
                 <span class="key-button">Tab</span>
             </span>
             <span class="button-descr">
                 same as Tab, but in reverse order
             </span>
         </li>
     </ul>

     <h4>Actions applied on Grid data table</h4>
     <ul class="keyboard-legend">
         <li>
             <span class="button-preview">
                 <span class="key-button wider">Arrow Keys</span>
             </span>
             <span class="button-descr">
                 to navigate over the cells
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">Enter</span>
             </span>
             <span class="button-descr">
                 on group row will toggle expand/collapse
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button wider">Page Up</span>
             </span>
             <span class="button-descr">
                 pages on previouse page
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button wider">Page Down</span>
             </span>
             <span class="button-descr">
                 pages on next page
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button">Space</span>
             </span>
             <span class="button-descr">
                 selects currently highlighted cell
             </span>
         </li>
         <li>
             <span class="button-preview">
                 <span class="key-button leftAlign">Ctrl</span>
                 +
                 <span class="key-button">Space</span>
             </span>
             <span class="button-descr">
                 same as Space, but perists previously selected cells(only for selection mode "multiple")
             </span>
         </li>
     </ul>
            
<demo:footer />
