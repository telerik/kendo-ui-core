<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div id="shipping">
        <label for="movies">Choose movie:</label>
        
        <kendo:autoComplete name="movies" minLength="3" dataTextField="Name">
            <kendo:dataSource type="odata" serverFiltering="true" serverPaging="true" pageSize="20">
                <kendo:dataSource-transport read="http://odata.netflix.com/Catalog/Titles">
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:autoComplete>
    </div>
    <style scoped="scoped">
        .k-autocomplete
        {
            width: 250px;
        }
    </style>
<demo:footer />