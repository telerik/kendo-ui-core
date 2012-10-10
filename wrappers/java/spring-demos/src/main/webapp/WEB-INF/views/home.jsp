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
        	<kendo:grid name="grid">
        		<kendo:grid-pageable></kendo:grid-pageable>
        		<kendo:grid-columns>
        			<kendo:grid-column title="ProductID" field="productId" />
        		</kendo:grid-columns>
        		<kendo:dataSource data="${products}" pageSize="10"></kendo:dataSource>
        	</kendo:grid>
    </body>
</html>