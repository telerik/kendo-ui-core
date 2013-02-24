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
                 <button id="getValue" class="k-button">Get value</button> or <button id="getText" class="k-button">Get text</button>
             </li>
             <li>
                 <label for="filter" style="display: block; ">Filter type:</label>
                 <select id="filter" style="width: 120px; float: right; margin-bottom: 3px; margin-top: -3px;">
                     <option value="none">None</option>
                     <option value="startswith">Starts with</option>
                     <option value="contains">Contains</option>
                     <option value="eq">Equal</option>
                 </select>
             </li>
             <li>
                 <input id="word" value="The" class="k-textbox" /> <button id="find" class="k-button">Find item</button>
             </li>
             <li>
                 <input id="index" value="0" class="k-textbox" /> <button id="select" class="k-button">Select by index</button>
             </li>
             <li>
                 <input id="value" value="1" class="k-textbox" /> <button id="setValue" class="k-button">Select by value</button>
             </li>
         </ul>
    </div>
    <div class="demo-section">
    	<label for="movies">Select movie: </label>
	    <kendo:comboBox name="movies" dataTextField="text" dataValueField="value">
	        <kendo:dataSource data="${movies}"></kendo:dataSource>
	    </kendo:comboBox>
    </div>
    <script>
	     $(document).ready(function() {
	     	$("#movies").closest(".k-widget")
                    .attr("id", "movies_wrapper");
                    
	         $("#filter").kendoDropDownList({
					change: filterTypeOnChanged
				});

				var combobox = $("#movies").data("kendoComboBox"),
					setValue = function(e) {
						if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
							combobox.value($("#value").val());
					},
					setIndex = function(e) {
						if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
							var index = parseInt($("#index").val());
							combobox.select(index);
						}
					},
					setSearch = function (e) {
						if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
							combobox.search($("#word").val());
					};

				$("#enable").click(function() {
					combobox.enable();
				});

				$("#disable").click(function() {
					combobox.enable(false);
				});

				$("#open").click(function() {
					combobox.open();
				});

				$("#close").click(function() {
					combobox.close();
				});

				$("#getValue").click(function() {
					alert(combobox.value());
				});

				$("#getText").click(function() {
					alert(combobox.text());
				});

				$("#setValue").click(setValue);
				$("#value").keypress(setValue);

				$("#select").click(setIndex);
				$("#index").keypress(setIndex);

				$("#find").click(setSearch);
				$("#word").keypress(setSearch);

				function filterTypeOnChanged() {
					combobox.options.filter = $("#filter").val();
				}
	     });
	</script>
	<style scoped>
	   .configuration .k-textbox {
	       width: 40px;
	   }
	   .demo-section{
			width:250px;
			margin-right: 360px;            
		}
	</style>
<demo:footer />