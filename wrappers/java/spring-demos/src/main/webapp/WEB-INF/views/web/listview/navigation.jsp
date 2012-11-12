<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url value="/web/listview/navigation/create" var="createUrl" />
<c:url value="/web/listview/navigation/read" var="readUrl" />
<c:url value="/web/listview/navigation/update" var="updateUrl" />
<c:url value="/web/listview/navigation/destroy" var="destroyUrl" />

<demo:header />

<div class="k-toolbar k-grid-toolbar">
	<a class="k-button k-button-icontext k-add-button" href="#"><span
		class="k-icon k-add"></span>Add new record</a>
</div>

<kendo:listView name="listView" template="template" pageable="true" altTemplate="template1"
	editTemplate="editTemplate" selectable="true" navigatable="true">
	<kendo:dataSource pageSize="4" serverPaging="true">
		<kendo:dataSource-transport>
			<kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
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

<script type="text/x-kendo-tmpl" id="template">
	<div class="product-view">
		<dl>
        	<dt>Product Name</dt>
            <dd>#=productName#</dd>
            <dt>Unit Price</dt>
            <dd>#=kendo.toString(unitPrice, "c")#</dd>
            <dt>Units In Stock</dt>
            <dd>#=unitsInStock#</dd>
            <dt>Discontinued</dt>
            <dd>#=discontinued#</dd>
		</dl>
        <div class="edit-buttons">
			<a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
        </div>
	</div>
</script>

<script type="text/x-kendo-tmpl" id="template1">
	<div class="product-view">
		asdasdas
	</div>
</script>

<script type="text/x-kendo-tmpl" id="editTemplate">
	<div class="product-view">
		<dl>
        	<dt>Product Name</dt>
            <dd>
            	<input type="text" data-bind="value:productName" name="productName" required="required" validationMessage="required" />
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
        <div class="edit-buttons">
        	<a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
		</div>
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
.product-view {
	float: left;
	width: 320px;
	margin: 5px;
	padding: 3px;
	-moz-box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
	-webkit-box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
	box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	border-radius: 8px;
}

.product-view dl {
	margin: 10px 0;
	padding: 0;
	min-width: 0;
}

.product-view dt,dd {
	float: left;
	margin: 0;
	padding: 0;
	height: 30px;
	line-height: 30px;
}

.product-view dt {
	clear: left;
	padding: 0 5px 0 15px;
	text-align: right;
	opacity: 0.6;
	width: 100px;
}

.k-listview {
	border: 0;
	padding: 0;
	min-width: 0;
}

.k-listview:after,.product-view dl:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}

.edit-buttons {
	text-align: right;
	padding: 5px;
	min-width: 100px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
	border-radius: 8px;
}

.k-toolbar,#listView,.k-pager-wrap {
	width: 660px;
	margin: 0 auto;
	-webkit-border-radius: 11px;
	-moz-border-radius: 11px;
	border-radius: 11px;
}

#listView {
	width: 674px;
}

span.k-invalid-msg {
	position: absolute;
	margin-left: 160px;
	margin-top: -26px;
}
</style>

<demo:footer />