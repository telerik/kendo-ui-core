<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="demo-section k-rtl">
        <h3 class="title">Select Continents</h3>
        <kendo:multiSelect name="select" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${continents}">
            </kendo:dataSource>
        </kendo:multiSelect>
    </div>
<demo:footer />