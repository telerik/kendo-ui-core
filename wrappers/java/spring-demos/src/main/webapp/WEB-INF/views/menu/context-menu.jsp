<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/web/toolbar/reply.png" var="reply"/>
<c:url value="/resources/web/toolbar/forward.png" var="forward"/>
<c:url value="/resources/web/toolbar/important.png" var="important"/>
<c:url value="/resources/web/toolbar/todo.png" var="todo"/>
<c:url value="/resources/web/toolbar/done.png" var="done"/>

<script type="text/x-kendo-template" id="template">
    <div class="product">
        <img src="../resources/shared/images/employees/#:employeeId#.png" alt="#:fullName#" />
        <h3>#:title#</h3>
        <p class="date">#:birthDate#</p>
        <p>#:fullName#</p>
    </div>
</script>

    <kendo:listView name="listview-context-menu" template="template">
        <kendo:dataSource pageSize="5" data="${users}">
        </kendo:dataSource>
    </kendo:listView>

    <kendo:contextMenu name="context-menu" target="#listview-context-menu" filter=".product">
   	    <kendo:contextMenu-items>
   		    <kendo:contextMenu-item text="Reply" imageUrl="${reply}">
   		        <kendo:contextMenu-items>
   		            <kendo:contextMenu-item imageUrl="${reply}" text="Reply to Sender" />
   		            <kendo:contextMenu-item text="Reply to All" imageUrl="${reply}" />
   		        </kendo:contextMenu-items>
   		    </kendo:contextMenu-item>
            <kendo:contextMenu-item />
   		    <kendo:contextMenu-item text="Forward" imageUrl="${forward}" />
   	        <kendo:contextMenu-item text="Mark As">
   	            <kendo:contextMenu-items>
   	                <kendo:contextMenu-item text="Unread" />
   	                <kendo:contextMenu-item text="Important" />
   	                <kendo:contextMenu-item text="Read" />
   	            </kendo:contextMenu-items>
   	        </kendo:contextMenu-item>
            <kendo:contextMenu-item text="Label As">
                <kendo:contextMenu-items>
                    <kendo:contextMenu-item text="None" />
                    <kendo:contextMenu-item text="Important" imageUrl="${important}" />
                    <kendo:contextMenu-item text="Work" imageUrl="${todo}" />
                    <kendo:contextMenu-item text="Personal" imageUrl="${done}" />
                    <kendo:contextMenu-item text="New Label" />
                </kendo:contextMenu-items>
            </kendo:contextMenu-item>
   	    </kendo:contextMenu-items>
   	</kendo:contextMenu>

    <style scoped>
        .demo-section {
                width: 860px;
            }
        #listview-context-menu {
            padding: 0;
            margin-bottom: -1px;
            min-height: 300px;
        }
        .product {
            position: relative;
            height: 62px;
            margin: 0;
            padding: 0;
            border-bottom: 1px solid rgba(128,128,128,.3);
        }
        .product img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            margin: 10px;
            border: 1px solid #000;
            float: left;
        }
        .product h3 {
            margin: 0;
            padding: 15px 5px 1px 0;
            overflow: hidden;
            line-height: 1em;
            font-size: 1.1em;
            font-weight: bold;
        }
        .product p {
            font-size: .9em;
        }
        .product .date {
            float: right;
            margin: -8px 15px 0 0;
        }
        .k-listview:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    </style>
<demo:footer />
