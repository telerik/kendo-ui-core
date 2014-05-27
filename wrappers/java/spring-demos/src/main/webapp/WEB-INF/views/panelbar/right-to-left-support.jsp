<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<div class="k-rtl">
	<kendo:panelBar name="panelbar">
		<kendo:panelBar-items>
			<kendo:panelBar-item  text="First Item" expanded="true">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Sub Item 1"/>
					<kendo:panelBar-item text="Sub Item 2"/>
					<kendo:panelBar-item text="Sub Item 3"/>
					<kendo:panelBar-item text="Sub Item 4"/>				
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item  text="Second Item">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Sub Item 1"/>
					<kendo:panelBar-item text="Sub Item 2"/>
					<kendo:panelBar-item text="Sub Item 3"/>
					<kendo:panelBar-item text="Sub Item 4"/>				
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item  text="Third Item">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Sub Item 1"/>
					<kendo:panelBar-item text="Sub Item 2"/>
					<kendo:panelBar-item text="Sub Item 3"/>
					<kendo:panelBar-item text="Sub Item 4"/>				
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item  text="Fourth Item">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Sub Item 1"/>
					<kendo:panelBar-item text="Sub Item 2"/>
					<kendo:panelBar-item text="Sub Item 3"/>
					<kendo:panelBar-item text="Sub Item 4"/>				
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item  text="Fifth Item">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Sub Item 1"/>
					<kendo:panelBar-item text="Sub Item 2"/>
					<kendo:panelBar-item text="Sub Item 3"/>
					<kendo:panelBar-item text="Sub Item 4"/>				
				</kendo:panelBar-items>
			</kendo:panelBar-item>
		</kendo:panelBar-items>
	</kendo:panelBar>
</div>
<demo:footer />
