<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="k-rtl">
        <kendo:comboBox name="input" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${items}">
            </kendo:dataSource>
        </kendo:comboBox>
    </div>
<demo:footer />