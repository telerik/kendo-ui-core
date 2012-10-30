<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <div class="treeview-back">
        <kendo:treeView name="treeview-left" dragAndDrop="true">
            <kendo:treeView-items>
                <kendo:treeView-item text="Furniture" expanded="true">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Tables & Chairs" />
                        <kendo:treeView-item text="Sofas" />
                        <kendo:treeView-item text="Occasional Furniture" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
                <kendo:treeView-item text="Decor">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Bed Linen" />
                        <kendo:treeView-item text="Curtains & Blinds" />
                        <kendo:treeView-item text="Carpets" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
            </kendo:treeView-items>
        </kendo:treeView>
    </div>

    <div class="treeview-back">
        <kendo:treeView name="treeview-right" dragAndDrop="true">
            <kendo:treeView-items>
                <kendo:treeView-item text="Storage" expanded="true">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Wall Shelving" />
                        <kendo:treeView-item text="Floor Shelving" />
                        <kendo:treeView-item text="Kids Storage" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
                <kendo:treeView-item text="Lights">
                    <kendo:treeView-items>
                        <kendo:treeView-item text="Ceiling" />
                        <kendo:treeView-item text="Table" />
                        <kendo:treeView-item text="Floor" />
                    </kendo:treeView-items>
                </kendo:treeView-item>
            </kendo:treeView-items>
        </kendo:treeView>
    </div>

    <style scoped>
        .treeview-back
        {
            float: left;
            width: 220px;
            margin: 30px;
            padding: 20px;
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
            box-shadow: 0 1px 2px rgba(0,0,0,0.45), inner 0 0 30px rgba(0,0,0,0.07);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
        }
    </style>
<demo:footer />
