<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
        <link href="http://cdn.kendostatic.com/2012.2.710/styles/kendo.common.min.css" rel="stylesheet" />
        <link href="http://cdn.kendostatic.com/2012.2.710/styles/kendo.default.min.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="http://cdn.kendostatic.com/2012.2.710/js/kendo.all.min.js"></script>
    </head>
    <body>
        <h1>Hello world!</h1>
        <p>The time on the server is ${serverTime}.</p>
        
        <kendo:window name="myWindow">
        	<kendo:window-content>
        	
	        	<strong>Window Content</strong>
	        	
	        	<kendo:autoComplete name="myAutoComplete" dataTextField="Name" minLength="3">
	        	    <kendo:dataSource type="odata" serverFiltering="true" serverPaging="true" pageSize="20">
	        	    	<kendo:transport>
	        	    		<kendo:read url="http://odata.netflix.com/Catalog/Titles"></kendo:read>
	        	    	</kendo:transport>
	        	    </kendo:dataSource>
	        	    <kendo:event name="dataBound">
	        	    	<script>
	        	    	function dataBound() {
	        	    		alert("dataBound");
	        	    	}
	        	    	</script>
	        	    </kendo:event>
	            </kendo:autoComplete>
	        
	        	<kendo:grid name="grid">
	        		<kendo:grid-columns>
	        			<kendo:grid-column title="Foo"/>
	        			<kendo:grid-column title="Bar" width="100"/>
	        		</kendo:grid-columns>
	        	</kendo:grid>
	        	
        	</kendo:window-content>	
        </kendo:window>

        <kendo:chart name="myChart">
        	<kendo:chart-title text="Foo">
       			<kendo:chart-title-border color="#ff0000" width="1"/>
        	</kendo:chart-title>
        </kendo:chart>
        
        <kendo:panelBar name="panelbar">
        	<kendo:panelBar-items>
        		<kendo:panelBar-item text="Root">
        			<kendo:panelBar-item-items>
        				<kendo:panelBar-item text="Child"/>
        				<kendo:panelBar-item text="Child with content">
        					<kendo:panelBar-item-content>
        						<strong>I haz contentz</strong>
        					</kendo:panelBar-item-content>
        				</kendo:panelBar-item>
        			</kendo:panelBar-item-items>
        		</kendo:panelBar-item>
        	</kendo:panelBar-items>
        </kendo:panelBar>
    </body>
</html>