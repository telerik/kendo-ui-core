<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    
    <div id="colors">
        <label for="input">Select a color:</label>
        <kendo:autoComplete name="input" filter="startswith">
            <kendo:dataSource data="${colors}">
            </kendo:dataSource>
        </kendo:autoComplete>
    </div>
    
    <div class="box">
	<div class="box-col">
	    <h4>Set / Get Value</h4>
	    <ul class="options">
		<li>
		    <input id="value" type="text" class="k-textbox" />
		    <button id="set" class="k-button">Set value</button>
		</li>
		<li style="text-align: right;">
		    <button id="get" class="k-button">Get value</button>
		</li>
	    </ul>
	</div>
	<div class="box-col">
	    <h4>Find item</h4>
	    <ul class="options">
		<li>
		    <input id="word" value="B" class="k-textbox" />
		    <button id="search" class="k-button">Search</button>
		</li>
	    </ul>
	</div>
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
		background: url('../content/web/autocomplete/palette.png') transparent no-repeat right 0;
		margin: 30px auto;
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
	    .box .k-textbox {
		width: 80px;
	    }
	    .box .k-button {
		min-width: 80px;
	    }
	</style>
<demo:footer />