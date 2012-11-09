<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="k-rtl">
        <kendo:dropDownList name="input" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${items}">
            </kendo:dataSource>
        </kendo:dropDownList>
    </div>
<demo:footer />