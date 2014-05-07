<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="demo-section">
        <div class="k-rtl">
            <h2>RTL DropDownList</h2>
	        <kendo:dropDownList name="input" dataTextField="text" dataValueField="value">
	            <kendo:dataSource data="${items}">
	            </kendo:dataSource>
	        </kendo:dropDownList>
        </div>
    </div>
    <style scoped>
            .demo-section {
                width: 250px;
                margin: 35px auto 50px;
                padding: 30px;
            }
            .demo-section h2 {
                text-transform: uppercase;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
        </style>
<demo:footer />
