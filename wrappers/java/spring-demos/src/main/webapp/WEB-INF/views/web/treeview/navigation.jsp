<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="demo-section">
    <kendo:treeView name="treeview">
        <kendo:treeView-items>
            <kendo:treeView-item text="Furniture">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Tables & Chairs" />
                    <kendo:treeView-item text="Sofas" />
                    <kendo:treeView-item text="Occasional Furniture" />
                    <kendo:treeView-item text="Childerns Furniture" />
                    <kendo:treeView-item text="Beds" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Decor" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Bed Linen" />
                    <kendo:treeView-item text="Throws" />
                    <kendo:treeView-item text="Curtains & Blinds" />                 
                    <kendo:treeView-item text="Rugs" />
                    <kendo:treeView-item text="Carpets" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Storage">
            	<kendo:treeView-items>
            		<kendo:treeView-item text="Wall Shelving" />
            		<kendo:treeView-item text="Kids Storage" />
            		<kendo:treeView-item text="Baskets" />
            		<kendo:treeView-item text="Multimedia Storage" />
            		<kendo:treeView-item text="Floor Shelving" />
            		<kendo:treeView-item text="Toilet Roll Holders" />
            		<kendo:treeView-item text="Storage Jars" />
            		<kendo:treeView-item text="Drawers" />
            		<kendo:treeView-item text="Boxes" />
            	</kendo:treeView-items>
            </kendo:treeView-item>
        </kendo:treeView-items>
    </kendo:treeView>
</div>
    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button leftAlign wider">Alt</span>
                +
                <span class="key-button">w</span>
            </span>
            <span class="button-descr">
                focuses the widget
            </span>
        </li>
    </ul>

    <ul class="keyboard-legend">
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">up arrow</span>
            </span>
            <span class="button-descr">
                highlights previous item
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">left arrow</span>
            </span>
            <span class="button-descr">
                collapses the item
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">down arrow</span>
            </span>
            <span class="button-descr">
                highlights next item
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider leftAlign">right arrow</span>
            </span>
            <span class="button-descr">
                expands the item
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">home</span>
            </span>
            <span class="button-descr">
                highlights first item in the list
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button">end</span>
            </span>
            <span class="button-descr">
                highlights last item in the list
            </span>
        </li>
        <li>
            <span class="button-preview">
                <span class="key-button wider rightAlign">enter</span>
            </span>
            <span class="button-descr">
                selects highlighted item
            </span>
        </li>
    </ul>

    <script>
        $(document).ready(function() {
            //focus the widget
            $(document).on("keydown.examples", function(e) {
                if (e.altKey && e.keyCode === 87 /* w */) {
                    $("#treeview").data("kendoTreeView").wrapper.focus();
                }
            });
        });
    </script>

    <style scoped>
        .demo-section {
            width: 200px;
        }
    </style>
    
<demo:footer />
