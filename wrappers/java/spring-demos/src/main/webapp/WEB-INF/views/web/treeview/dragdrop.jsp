<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <kendo:treeView name="treeview-left">
        <kendo:treeView-items>
            <kendo:treeView-item text="Furniture" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Tables & Chairs" />
                    <kendo:treeView-item text="Sofas" />
                    <kendo:treeView-item text="Occasional Furniture" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Decor" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Bed Linen" />
                    <kendo:treeView-item text="Curtains & Blinds" />
                    <kendo:treeView-item text="Carpets" />
                </kendo:treeView-items>
            </kendo:treeView-item>
        </kendo:treeView-items>
    </kendo:treeView>

    <kendo:treeView name="treeview-right">
        <kendo:treeView-items>
            <kendo:treeView-item text="Storage" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Wall Shelving" />
                    <kendo:treeView-item text="Floor Shelving" />
                    <kendo:treeView-item text="Kids Storage" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Lights" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Ceiling" />
                    <kendo:treeView-item text="Table" />
                    <kendo:treeView-item text="Floor" />
                </kendo:treeView-items>
            </kendo:treeView-item>
        </kendo:treeView-items>
    </kendo:treeView>

    <style scoped>
        #treeview-left,
        #treeview-right
        {
            float: left;
            width: 220px;
            overflow: visible;
        }
        .demo-section {
            width: 500px;
        }
        .demo-section:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    </style>
<demo:footer />
