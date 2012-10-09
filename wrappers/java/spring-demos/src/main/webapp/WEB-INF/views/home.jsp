<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
        <link href="http://cdn.kendostatic.com/2012.2.913/styles/kendo.common.min.css" rel="stylesheet" />
        <link href="http://cdn.kendostatic.com/2012.2.913/styles/kendo.default.min.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="http://cdn.kendostatic.com/2012.2.913/js/kendo.all.min.js"></script>
    </head>
    <body>
        <h1>Hello world!</h1>
        
        <p>The time on the server is ${serverTime}</p>
        
        <kendo:datePicker name="datePicker" value="${serverTime}"></kendo:datePicker>
        
        <kendo:calendar name="calendar" dates="${dates}" ></kendo:calendar>
        
        <kendo:autoComplete name="myAutoComplete" dataTextField="Name" minLength="3">
      	    <kendo:dataSource type="odata" serverFiltering="true" serverPaging="true" pageSize="20">
      	    	<kendo:dataSource-transport>
      	    		<kendo:dataSource-transport-read url="http://odata.netflix.com/Catalog/Titles"/>
      	    	</kendo:dataSource-transport>
      	    </kendo:dataSource>
      	    <kendo:autoComplete-event name="change">
      	    	<script>
      	    	function dataBound() {
      	    		console.log("change");
      	    	}
      	    	</script>
      	    </kendo:autoComplete-event>
       </kendo:autoComplete>
	            
        <kendo:window name="myWindow">
        	<kendo:window-content>
        	
	        	<strong>Window Content</strong>
	        	
	        	
	        
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
        
        
        <kendo:treeView name="treeview">
        	<kendo:treeView-items>
        		<kendo:treeView-item text="Root">
        			<kendo:treeView-item-items>
        				<kendo:treeView-item text="Child"/>
        				<kendo:treeView-item text="Child with content"></kendo:treeView-item>
        			</kendo:treeView-item-items>
        		</kendo:treeView-item>
        	</kendo:treeView-items>
        </kendo:treeView>
        
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
        
          <kendo:menu name="menu">
        	<kendo:menu-items>
        		<kendo:menu-item text="Root">
        				<kendo:menu-items>
        					<kendo:menu-item text="Child"></kendo:menu-item>
        					<kendo:menu-item text="Child With Content">
        						<kendo:menu-item-content>
        							<strong>Menu Item Content</strong>
        						</kendo:menu-item-content>
        					</kendo:menu-item>
        				</kendo:menu-items>
        		</kendo:menu-item>
        	</kendo:menu-items>
        </kendo:menu>
    </body>
</html>