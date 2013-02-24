<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
<div class="demo-section">           
    <div class="k-rtl">
        <kendo:comboBox name="combobox" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${items}">
            </kendo:dataSource>
        </kendo:comboBox>
    </div>
</div>   
<demo:footer />