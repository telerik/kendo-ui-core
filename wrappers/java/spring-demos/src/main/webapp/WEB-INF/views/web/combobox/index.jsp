<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div id="tshirt-view" class="k-header">
	    <h2>Customize your Kendo T-shirt</h2>
	    <img id="tshirt" src="<c:url value="/resources/web/combobox/tShirt.png"/>" />
	    <div id="options">
		    <h3>T-shirt Fabric</h3>
		    <kendo:comboBox name="fabric" filter="contains" placeholder="Select fabric..." index="3" suggest="true" 
		                    dataTextField="text" dataValueField="value">
                <kendo:dataSource data="${fabrics}"></kendo:dataSource>
		    </kendo:comboBox>
		
		    <h3>T-shirt Size</h3>  
		    <kendo:comboBox name="size" placeholder="Select size..." index="3" suggest="true">
                <kendo:dataSource data="${sizes}"></kendo:dataSource>
		    </kendo:comboBox>
		    
		    <button class="k-button" id="get">Customize</button>
	    </div>
	</div>
	<style scoped>
	    #example h2 {
	        font-weight: normal;
	    }
	    #tshirt-view {
	        border-radius: 10px 10px 10px 10px;
	        border-style: solid;
	        border-width: 1px;
	        overflow: hidden;
	        width: 500px;
	        margin: 30px auto;
	        padding: 20px 20px 0 20px;
	    }
	    #tshirt {
	        float: left;
	        margin: 30px 40px 30px 20px;
	    }
	    #options {
	        padding: 30px;
	    }
	    #options h3 {
	        font-size: 1em;
	        font-weight: bold;
	        margin: 25px 0 8px 0;
	    }
	    #get {
	        margin-top: 25px;
	    }
	
	    .k-readonly
	    {
	        color: gray;
	    }
	</style>
	<script>
	$(document).ready(function() {
        var fabric = $("#fabric").data("kendoComboBox");
        var size = $("#size").data("kendoComboBox");

        $("#get").click(function() {
            alert('Thank you! Your Choice is:\n\nFabric ID: ' + fabric.value() + ' and Size: ' + size.value());
        });
    });
	</script>
<demo:footer />