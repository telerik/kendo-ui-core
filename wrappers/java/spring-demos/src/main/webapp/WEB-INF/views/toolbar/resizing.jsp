<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/web/toolbar/user.png" var="user"/>
<c:url value="/resources/web/toolbar/save.png" var="save"/>
<c:url value="/resources/web/toolbar/upload.png" var="upload"/>
<c:url value="/resources/web/toolbar/reply.png" var="reply"/>
<c:url value="/resources/web/toolbar/save.png" var="replyall"/>
<c:url value="/resources/web/toolbar/upload.png" var="forward"/>
<c:url value="/resources/web/toolbar/upload.png" var="replydelete"/>
<c:url value="/resources/web/toolbar/done.png" var="done"/>
<c:url value="/resources/web/toolbar/todo.png" var="todo"/>
<c:url value="/resources/web/toolbar/important.png" var="important"/>

<div id="example">
    <div class="box">
        <h4>Info</h4>
        <p>Resize the window and watch how ToolBar's items show or hide according to the available space.</p>
        <p>More information regarding the resizable functionality can be found in the <a href="">Getting Started topic</a>.</p>
        <span id="undo" style="display:none" class="k-button">Click here to open the window.</span>
    </div>
    <div id="window">
        
    	<kendo:toolBar name="toolbar">
		   	<kendo:toolBar-items>
				<kendo:toolBar-item template="<img src='${user}' class='user-image' />" overflow="never"></kendo:toolBar-item>
				<kendo:toolBar-item type="button" text="Send" primary="true" overflow="never"></kendo:toolBar-item>
				<kendo:toolBar-item type="button" text="Discard" overflow="never"></kendo:toolBar-item>
				<kendo:toolBar-item type="separator"></kendo:toolBar-item>
				<kendo:toolBar-item type="splitButton" text="Save" imageUrl="${save}">
					<kendo:toolBar-item-menuButtons>
						<kendo:toolBar-item-menuButton text="Save As" imageUrl="${save}"></kendo:toolBar-item-menuButton>
						<kendo:toolBar-item-menuButton text="Upload to drive" icon="${upload}"></kendo:toolBar-item-menuButton>
					</kendo:toolBar-item-menuButtons>
				</kendo:toolBar-item>
				<kendo:toolBar-item type="splitButton" text="Reply" imageUrl="${reply}">
					<kendo:toolBar-item-menuButtons>
						<kendo:toolBar-item-menuButton text="Reply All" imageUrl="${replyall}"></kendo:toolBar-item-menuButton>
						<kendo:toolBar-item-menuButton text="Forward" icon="${forward}"></kendo:toolBar-item-menuButton>
						<kendo:toolBar-item-menuButton text="Reply & Delete" icon="${replydelete}"></kendo:toolBar-item-menuButton>
					</kendo:toolBar-item-menuButtons>
				</kendo:toolBar-item>
				<kendo:toolBar-item type="separator"></kendo:toolBar-item>
				<kendo:toolBar-item template="<span><label>Contacts:</label><input id='contacts' style='width: 150px;' /></span>" overflow="never"></kendo:toolBar-item>
				<kendo:toolBar-item template="<div><label>Labels:</label><input id='labels' style='width: 150px;' /></div>" overflowTemplate="<span></span>"></kendo:toolBar-item>
				<kendo:toolBar-item type="buttonGroup">
					<kendo:toolBar-item-buttons>
						<kendo:toolBar-item-button text="Done" togglable="true" group="category" imageUrl="${done}"></kendo:toolBar-item-button>
						<kendo:toolBar-item-button text="To Do" togglable="true" group="category" imageUrl="${todo}"></kendo:toolBar-item-button>
						<kendo:toolBar-item-button text="Important" togglable="true" group="category" imageUrl="${important}"></kendo:toolBar-item-button>
					</kendo:toolBar-item-buttons>
				</kendo:toolBar-item>
			</kendo:toolBar-items>
		</kendo:toolBar>
        
        
        <div id="content">
            <div class="demo-section k-header">
                <ul>
                    <li><label>To:</label> <input type="text" class="k-textbox" id="to"/></li>
                    <li><label>Title:</label> <input type="text" class="k-textbox" id="title"/></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $("#window").kendoWindow({
            resizable: true,
            width: 820,
            height: 250,
            minWidth: 410,
            maxWidth: 1200,
            title: "Message",
            close: function() {
                $("#undo").show();
            }
        });

        $("#undo").bind("click", function() {
            $("#window").data("kendoWindow").open();
            $("#undo").hide();
        });

        $("#contacts").kendoDropDownList({
            optionLabel: "Ann Devon",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Ana Trujillo", value: 1 },
                { text: "Antonio Moreno", value: 2 },
                { text: "Christina Berglund", value: 3 },
                { text: "Felipe Izquierdo", value: 4 }
            ]
        });

        $("#labels").kendoDropDownList({
            optionLabel: "Forums",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Follow up", value: 1 },
                { text: "Misc", value: 2 },
                { text: "Priority", value: 3 },
                { text: "Deleted Messages", value: 4 }
            ]
        });

        $("#masked").kendoNumericTextBox();

        $("#toolbar").data("kendoToolBar").resize();
    });
</script>

<style>
    div.k-window-content {
        padding: 0;
    }

    #toolbar {
        border-width: 0 0 1px;
    }
    .user-image {
        margin: 0 .5em;
    }
    #example {
        height: 500px;
    }
    #example .box p {
        padding-bottom: 5px;
    }
    #content .demo-section {
        margin: 0;
        padding: 10px;
        border-width: 0 0 1px 0;
    }
    #content .demo-section label {
        display: inline-block;
        width: 40px;
        text-align: right;
        line-height: 2.5em;
        vertical-align: middle;
    }
    #content .demo-section input {
        width: 80%;
    }
</style>

<demo:footer />