<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url value="/web/listview/navigation/create" var="createUrl" />
<c:url value="/web/listview/navigation/read" var="readUrl" />
<c:url value="/web/listview/navigation/update" var="updateUrl" />
<c:url value="/web/listview/navigation/destroy" var="destroyUrl" />

<demo:header />

<div class="demo-section">
    <div class="k-toolbar k-grid-toolbar">
        <a class="k-button k-button-icontext k-add-button" href="#"><span
            class="k-icon k-add"></span>Add new record</a>
    </div>
</div>

<div class="demo-section">
<kendo:listView name="listView" template="template" pageable="true"
    editTemplate="editTemplate" selectable="true" navigatable="true">
    <kendo:dataSource pageSize="4" serverPaging="true">
        <kendo:dataSource-transport>
            <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                 <kendo:dataSource-transport-parameterMap>
                    <script>
                        function parameterMap(options,type) {
                            return JSON.stringify(options);                         
                        }
                    </script>
                </kendo:dataSource-transport-parameterMap>
        </kendo:dataSource-transport>
        <kendo:dataSource-schema data="data" total="total">
            <kendo:dataSource-schema-model id="productId">
                <kendo:dataSource-schema-model-fields>
                    <kendo:dataSource-schema-model-field name="productId"
                        editable="false" nullable="true">
                    </kendo:dataSource-schema-model-field>
                    <kendo:dataSource-schema-model-field name="productName">
                    </kendo:dataSource-schema-model-field>
                    <kendo:dataSource-schema-model-field name="unitPrice" type="number">
                    </kendo:dataSource-schema-model-field>
                    <kendo:dataSource-schema-model-field name="discontinued"
                        type="boolean">
                    </kendo:dataSource-schema-model-field>
                    <kendo:dataSource-schema-model-field name="unitsInStock"
                        type="number">
                    </kendo:dataSource-schema-model-field>
                </kendo:dataSource-schema-model-fields>
            </kendo:dataSource-schema-model>
        </kendo:dataSource-schema>
    </kendo:dataSource>
</kendo:listView>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product-view k-widget">
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
        </div>
        <dl>
            <dt>Product Name</dt>
            <dd>#:productName#</dd>
            <dt>Unit Price</dt>
            <dd>#:kendo.toString(unitPrice, "c")#</dd>
            <dt>Units In Stock</dt>
            <dd>#:unitsInStock#</dd>
            <dt>Discontinued</dt>
            <dd>#:discontinued#</dd>
        </dl>
    </div>
</script>

<script type="text/x-kendo-tmpl" id="editTemplate">
    <div class="product-view k-widget">
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
        </div>
        <dl>
            <dt>Product Name</dt>
            <dd>
                <input type="text" class="k-textbox" data-bind="value:productName" name="productName" required="required" validationMessage="required" />
                <span data-for="productName" class="k-invalid-msg"></span>
            </dd>
            <dt>Unit Price</dt>
            <dd>
                <input type="text" data-bind="value:unitPrice" data-role="numerictextbox" data-type="number" name="unitPrice" required="required" min="1" validationMessage="required" />
                <span data-for="unitPrice" class="k-invalid-msg"></span>
            </dd>
            <dt>Units In Stock</dt>
            <dd>
                <input type="text" data-bind="value:unitsInStock" data-role="numerictextbox" name="unitsInStock" required="required" data-type="number" min="0" validationMessage="required" />
                <span data-for="unitsInStock" class="k-invalid-msg"></span>
            </dd>
            <dt>Discontinued</dt>
            <dd><input type="checkbox" name="discontinued" data-bind="checked:discontinued"></dd>
        </dl>
    </div>
</script>

<script>
    $(function() {
        var listView = $("#listView").data("kendoListView");

        $(".k-add-button").click(function(e) {
            listView.add();
            e.preventDefault();
        });
    });
</script>

<ul class="keyboard-legend" style="padding-top: 25px">
	<li><span class="button-preview"> <span
			class="key-button leftAlign">Alt</span> + <span class="key-button">W</span>
	</span> <span class="button-descr"> Focus the ListView </span></li>
</ul>

<h4>Supported keys and user actions</h4>
<ul class="keyboard-legend">
	<li><span class="button-preview"> <span class="key-button">Right</span>
	</span> <span class="button-descr"> Goes to the next item (same as
			Down) </span></li>
	<li><span class="button-preview"> <span class="key-button">Left</span>
	</span> <span class="button-descr"> Goes to the previous item (same as
			Up) </span></li>
	<li><span class="button-preview"> <span class="key-button">Home</span>
	</span> <span class="button-descr"> Goes to the first item </span></li>
	<li><span class="button-preview"> <span class="key-button">End</span>
	</span> <span class="button-descr"> Goes to the last item </span></li>
	<li><span class="button-preview"> <span class="key-button">Enter</span>
	</span> <span class="button-descr"> Enter Edit mode or Apply changes </span></li>
	<li><span class="button-preview"> <span class="key-button">Esc</span>
	</span> <span class="button-descr"> Exit Edit mode and Cancel changes </span>
	</li>
	<li><span class="button-preview"> <span class="key-button">Tab</span>
	</span> <span class="button-descr"> Tabs away from the ListView on the
			next focusable page element </span></li>
	<li><span class="button-preview"> <span
			class="key-button leftAlign">Shift</span> + <span class="key-button">Tab</span>
	</span> <span class="button-descr"> Tabs away from the ListView on the
			previous focusable page element </span></li>
	<li><span class="button-preview"> <span class="key-button">Space</span>
	</span> <span class="button-descr"> Select item </span></li>
</ul>

<style scoped>
.demo-section {
    width: 605px;
}
.product-view
{
    float: left;
    position: relative;
    width: 301px;
    margin: -1px -1px 0 0;
}

.product-view dl
{
    margin: 10px 0;
    padding: 0;
    min-width: 0;
}
.product-view dt, dd
{
    float: left;
    margin: 0;
    padding: 3px;
    height: 26px;
    width: 160px;
    line-height: 26px;
    overflow: hidden;
}
.product-view dt
{
    clear: left;
    padding: 3px 5px 3px 0;
    text-align: right;
    opacity: 0.6;
    width: 100px;
}
.k-listview
{
    border: 0;
    padding: 0;
    min-width: 605px;
    min-height: 298px;
}
.k-listview:after, .product-view dl:after
{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.edit-buttons
{
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: 146px;
    padding: 2px 2px 0 3px;
    background-color: rgba(0,0,0,0.1);
}
.edit-buttons .k-button
{
    width: 26px;
    margin-bottom: 1px;
}
.k-pager-wrap
{
    border-top: 0;
}
span.k-invalid-msg
{
    position: absolute;
    margin-left: 6px;
}
</style>

<demo:footer />