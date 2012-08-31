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
        	<strong>Window Content</strong>
        	
        	<kendo:autoComplete name="myAutoComplete">
        	    <kendo:dataSource></kendo:dataSource>
            </kendo:autoComplete>
        	
        </kendo:window>
    </body>
</html>