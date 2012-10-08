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
	        	    <kendo:autoComplete-event name="change">
	        	    	<script>
	        	    	function dataBound() {
	        	    		alert("change");
	        	    	}
	        	    	</script>
	        	    </kendo:autoComplete-event>
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
       			<kendo:chart-title-border color="#ff0000" width="1.5"/>
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
        
        <kendo:tabStrip name="tabStrip">
        	<kendo:tabStrip-items>
        		<kendo:tabStrip-item text="Tab 1">
        			<kendo:tabStrip-item-content>
        				<strong>First tab content</strong>
        			</kendo:tabStrip-item-content>
        		</kendo:tabStrip-item>
        		<kendo:tabStrip-item text="Tab 2">
        			<em>Second tab content</em>
        		</kendo:tabStrip-item>
        	</kendo:tabStrip-items>
        </kendo:tabStrip>
    </body>
</html>