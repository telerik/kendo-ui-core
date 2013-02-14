<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
    
    <div id="colors">
        <label for="input">Select a color:</label>
        <kendo:autoComplete name="input" filter="startswith">
            <kendo:dataSource data="${colors}">
            </kendo:dataSource>
        </kendo:autoComplete>
    </div>
    <script>
	     $(document).ready(function() {
	         var autocomplete = $("#input").data("kendoAutoComplete"),
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
          	#colors {
                width: 366px;
                height: 180px;
                padding: 114px 0 0 0;
                 background: url(<c:url value="/resources/web/autocomplete/palette.png" />) transparent no-repeat right 0;
                margin: 30px 0 30px 120px;
                text-align: center;
			}
           	#colors label {
                display: block;
                color: #333;
                padding-bottom: 5px;
 			}
           #input {
                    margin-right: 50px;
            }
            .configuration {
                height: 410px;
                margin-bottom: -21px;
            }
            .configuration .k-textbox {
                width: 40px;
            }
    </style>
<demo:footer />