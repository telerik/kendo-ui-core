<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div class="demo-section">
        <div class="k-rtl">
            <h2>USA STATES:</h2>
            <kendo:autoComplete name="states" placeholder="Select state...">
                <kendo:dataSource data="${states}">
                </kendo:dataSource>
            </kendo:autoComplete>
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
