<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div>
        <label for="movies">Choose movie:</label>
        
        <%
        String template = "<img src=\"#:data.BoxArt.SmallUrl#\" alt=\"#:data.Name#\" />" +
        		   "<h3>" +
        		   "#:data.Name# " +
        		   "<span>#: data.ReleaseYear#</span>" +
        		   "</h3>";
        %>
        
        <kendo:autoComplete name="movies" minLength="3" dataTextField="Name" template="<%=template%>" height="300">
            <kendo:dataSource type="odata" serverFiltering="true" serverPaging="true" pageSize="20">
                <kendo:dataSource-transport read="http://odata.netflix.com/Catalog/Titles">
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:autoComplete>
        
        <script>
	    $(document).ready(function() {
	        var autocomplete = $("#movies").data("kendoAutoComplete");
	
	        // set width of the drop-down list
	        autocomplete.list.width(400);
	    });
</script>
    </div>
    <style scoped="scoped">
        .k-autocomplete
        {
            width: 250px;
        }
    </style>
<demo:footer />