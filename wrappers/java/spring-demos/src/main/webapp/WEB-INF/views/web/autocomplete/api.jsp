<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div class="configuration k-widget k-header">
	    <span class="configHead">API Functions</span>
	    <ul class="options">
	        <li>
	            <input id="value" type="text" class="k-textbox" />
	            <button id="set" class="k-button">Set value</button>
	        </li>
	        <li>
	            <button id="get" class="k-button">Get value</button>
	        </li>
	        <li>
	            <input id="word" value="B" class="k-textbox" />
	            <button id="search" class="k-button">Find starting with</button>
	        </li>
	    </ul>
    </div>
    
    <div>
        <label for="colors">Select a color:</label>
        <kendo:autoComplete name="colors" filter="contains">
            <kendo:dataSource data="${colors}">
            </kendo:dataSource>
        </kendo:autoComplete>
    </div>
    <script>
	     $(document).ready(function() {
	         var autocomplete = $("#colors").data("kendoAutoComplete"),
	             setValue = function(e) {
	                 if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
	                     autocomplete.value($("#value").val());
	             },
	             setSearch = function(e) {
	                 if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
	                     autocomplete.search($("#word").val());
	             };
	
	         $("#set").click(setValue);
	         $("#value").keypress(setValue);
	         $("#search").click(setSearch);
	         $("#word").keypress(setSearch);
	
	         $("#get").click(function() {
	             alert(autocomplete.value());
	         });
	     });
	</script>
	<style scoped>
		.configuration {
		    height: 410px;
		    margin-bottom: -21px;
		}
		.configuration .k-textbox {
		    width: 40px;
		}
    </style>
<demo:footer />