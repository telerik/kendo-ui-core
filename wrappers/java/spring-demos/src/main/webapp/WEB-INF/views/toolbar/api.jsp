<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <div class="box">
        <div class="box-col">
            <h4>Get selected action</h4>
            <ul class="options">
                <li>
                    <button class="getSelected k-button">Get selected action</button>
                </li>
                <li>
                    Selected: <span id="selectedFromGroup"></span>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Enable / Disable</h4>
            <ul class="options">
                <li>
                    <button class="toggleRepeat k-button">Enable/Disable Repeat</button>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Add / Remove</h4>
            <ul class="options">
                <li>
                    <button class="removeItem k-button">Remove by ID</button>
                    <input type="text" value="#delete" id="forRemoval" class="k-textbox"/> 
                </li>
                <li>
                    <button class="addItem k-button">Add new button</button>
                    <label>Text: <input type="text" value="New Button" id="btnText" class="k-textbox"/></label>
                    <label>ID: <input type="text" value="newButton" id="btnID" class="k-textbox"/></label>
                    <label>Togglable: <input type="checkbox" id="btnTogglable"/></label>
                </li>
                <li>
                    <button class="addSplitButton k-button">Add new SplitButton</button>
                </li> 
                <li>
                    <button class="addButtonGroup k-button">Add new ButtonGroup</button>
                </li>
            </ul>
        </div>
    </div>

    <kendo:toolBar name="toolbar">
	   	<kendo:toolBar-items>
  			<kendo:toolBar-item type="buttonGroup">
				<kendo:toolBar-item-buttons>
					<kendo:toolBar-item-button text="play" id="play" togglable="true" group="player"></kendo:toolBar-item-button>
					<kendo:toolBar-item-button text="pause" id="pause" togglable="true" group="player" selected="true"></kendo:toolBar-item-button>
					<kendo:toolBar-item-button text="stop" id="stop" togglable="true" group="player"></kendo:toolBar-item-button>
				</kendo:toolBar-item-buttons>
			</kendo:toolBar-item>
			<kendo:toolBar-item type="button" text="repeat" id="repeat" togglable="true"></kendo:toolBar-item>
			<kendo:toolBar-item type="splitButton" id="save" text="save">
				<kendo:toolBar-item-menuButtons>
					<kendo:toolBar-item-menuButton text="add to favourites" id="favourites"></kendo:toolBar-item-menuButton>
					<kendo:toolBar-item-menuButton text="listen later" id="later"></kendo:toolBar-item-menuButton>
					<kendo:toolBar-item-menuButton text="download" id="download"></kendo:toolBar-item-menuButton>
				</kendo:toolBar-item-menuButtons>
			</kendo:toolBar-item>
			<kendo:toolBar-item type="button" text="delete" id="delete"></kendo:toolBar-item>
		</kendo:toolBar-items>
	</kendo:toolBar>
    
    <script>
	    $(document).ready(function() {
	        $(".getSelected").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar"),
	                selected;
	
	            selected = toolbar.getSelectedFromGroup("player");
	            $("#selectedFromGroup").text(selected.text());
	        });
	
	        $(".toggleRepeat").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar"),
	                repeatButton = $("#repeat"),
	                isDisabled = repeatButton.hasClass("k-state-disabled");
	
	            toolbar.enable(repeatButton, isDisabled);
	        });
	
	        $(".removeItem").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar"),
	                id = $("#forRemoval").val();
	
	            toolbar.remove(id);
	        });
	
	        $(".addItem").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar"),
	                text = $("#btnText").val(),
	                id = $("#btnID").val(),
	                togglable = $("#btnTogglable").prop("checked");
	
	            toolbar.add({ type: "button", text: text, id: id, togglable: togglable });
	        });
	
	        $(".addSplitButton").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar");
	
	            toolbar.add({
	                type: "splitButton",
	                text: "New SplitButton",
	                menuButtons: [
	                    { text: "Option 1" },
	                    { text: "Option 2" }
	                ]
	            });
	        });
	
	        $(".addButtonGroup").click(function() {
	            var toolbar = $("#toolbar").data("kendoToolBar");
	
	            toolbar.add({
	                type: "buttonGroup",
	                buttons: [
	                    { text: "Left" },
	                    { text: "Middle" },
	                    { text: "Right" }
	                ]
	            });
	        });
	    });
	</script>
	
	<style>
	    #toolbar {
	        margin: 0 auto;
	    }
	    #selectedFromGroup {
	        font-weight: bold;
	        font-color: #000;
	    }
	</style>

<demo:footer />