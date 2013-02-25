<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div class="configuration k-widget k-header" style="width: 210px">
         <span class="configHead">API Functions</span>
         <ul class="options">
             <li>
                 <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
             </li>
             <li>
                 <button id="open" class="k-button">Open</button> or <button id="close" class="k-button">Close</button> the drop-down
             </li>
             <li>
                 <button id="getValue" class="k-button">Get values</button>
             </li>
             <li>
                 <label for="filter" style="display: block; ">Filter type:</label>
                 <select id="filter" style="width: 120px; float: right; margin-bottom: 3px; margin-top: -3px;">
                     <option value="startswith">Starts with</option>
                     <option value="contains">Contains</option>
                     <option value="eq">Equal</option>
                 </select>
             </li>
             <li>
                 <input id="word" value="The" class="k-textbox" /> <button id="find" class="k-button">Find item</button>
             </li>
             <li>
                <input id="value" value="1,2" class="k-textbox" /> <button id="setValue" class="k-button">Select by value</button>
             </li>
         </ul>
    </div>

    <div class="demo-section">
        <kendo:multiSelect name="movies" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${movies}"></kendo:dataSource>
        </kendo:multiSelect>
    </div>

    <script>
	     $(document).ready(function() {
	         $("#filter").kendoDropDownList({
	             change: filterTypeOnChanged
	         });

	         var multiselect = $("#movies").data("kendoMultiSelect"),
	             setValue = function(e) {
	                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	                    multiselect.value($("#value").val().split(","));
	                }
	             },
	             setSearch = function (e) {
	                 if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
	                     multiselect.search($("#word").val());
	             };

	         $("#enable").click(function() {
	             multiselect.enable();
	         });

	         $("#disable").click(function() {
	             multiselect.enable(false);
	         });

	         $("#open").click(function() {
	             multiselect.open();
	         });

	         $("#close").click(function() {
	             multiselect.close();
	         });

	         $("#getValue").click(function() {
	             alert(multiselect.value());
	         });

	         $("#setValue").click(setValue);
	         $("#value").keypress(setValue);

	         $("#find").click(setSearch);
	         $("#word").keypress(setSearch);

	         function filterTypeOnChanged() {
	             multiselect.options.filter = $("#filter").val();
	         }
	     });
	</script>
	<style scoped>
	   .configuration .k-textbox {
	       width: 40px;
	   }
       .demo-section {
           float: left;
           width: 450px;
           margin-left: 0;
       }
	</style>
<demo:footer />
