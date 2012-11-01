<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" resizable="true">
        <kendo:grid-columns>
            <kendo:grid-column title="First Name" field="firstName" />
			<kendo:grid-column title="Last Name" field="lastName" />
			<kendo:grid-column title="City" field="city" />   
			<kendo:grid-column title="Title" field="title" />   
			<kendo:grid-column title="Birth Date" field="birthDate" format="{0:MM/dd/yyyy}"/>			
        </kendo:grid-columns>
        <kendo:dataSource data="${employees}" pageSize="6">                    
        </kendo:dataSource>
        <kendo:grid-pageable />
    </kendo:grid>
<demo:footer />
