<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="demo-section k-rtl">
        <h2>Select Continents</h2>
        <kendo:multiSelect name="select" dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${continents}">
            </kendo:dataSource>
        </kendo:multiSelect>
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
