<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

   	<kendo:toolBar name="toolbar" click="onClick" toggle="onToggle" overflowOpen="onOverflowOpen" overflowClose="onOverflowClose" open="onOpen" close="onClose">
	   	<kendo:toolBar-items>
			<kendo:toolBar-item type="button" id="button1" text="Button 1" click="buttonClickHandler"></kendo:toolBar-item>
			<kendo:toolBar-item type="button" id="button2" text="Button 2" click="buttonClickHandler"></kendo:toolBar-item>
			<kendo:toolBar-item type="separator"></kendo:toolBar-item>
			<kendo:toolBar-item type="button" id="toggle1" text="Toggle 1" togglable="true" toggle="buttonToggleHandler"></kendo:toolBar-item>
			<kendo:toolBar-item type="button" id="toggle2" text="Toggle 2" togglable="true" toggle="buttonToggleHandler"></kendo:toolBar-item>
			<kendo:toolBar-item type="separator"></kendo:toolBar-item>
			<kendo:toolBar-item type="splitButton" id="mainButton" text="Split Button" click="splitButtonClickHandler">
				<kendo:toolBar-item-menuButtons>
					<kendo:toolBar-item-menuButton text="Action 1" id="action1"></kendo:toolBar-item-menuButton>
					<kendo:toolBar-item-menuButton text="Action 2" id="action2"></kendo:toolBar-item-menuButton>
					<kendo:toolBar-item-menuButton text="Action 3" id="action3"></kendo:toolBar-item-menuButton>
				</kendo:toolBar-item-menuButtons>
			</kendo:toolBar-item>
			<kendo:toolBar-item type="separator"></kendo:toolBar-item>
			<kendo:toolBar-item type="buttonGroup">
				<kendo:toolBar-item-buttons>
					<kendo:toolBar-item-button text="Radio 1" id="radio1" togglable="true" group="radio" toggle="buttonToggleHandler "></kendo:toolBar-item-button>
					<kendo:toolBar-item-button text="Radio 2" id="radio2" togglable="true" group="radio" toggle="buttonToggleHandler "></kendo:toolBar-item-button>
					<kendo:toolBar-item-button text="Radio 3" id="radio3" togglable="true" group="radio" toggle="buttonToggleHandler "></kendo:toolBar-item-button>
				</kendo:toolBar-item-buttons>
			</kendo:toolBar-item>
			<kendo:toolBar-item type="button" id="overflowButton" text="Overflow Button" overflow="always"></kendo:toolBar-item>
		</kendo:toolBar-items>
	</kendo:toolBar>

	<div class="box">
	    <h4>Console log</h4>
	    <div class="console"></div>
	</div>

	<script>
	    function buttonClickHandler(e) {
	        kendoConsole.log(e.target.text() + " 'click' event is fired.");
	    }
	
	    function buttonToggleHandler(e) {
	        kendoConsole.log(e.target.text() + " 'toggle' event is fired.");
	    }
	
	    function splitButtonClickHandler(e) {
	        kendoConsole.log("SplitButton event: " + e.id + " is clicked.");
	    }
	
	    function onClick(e) {
	        kendoConsole.log("ToolBar 'click' event is fired for element with id: " + e.id);
	    }
	
	    function onToggle(e) {
	        if(e.group == "radio") {
	            kendoConsole.log("Toolbar 'toggle' event: " + e.id + " button is selected from group: " + e.group);
	        } else {
	            kendoConsole.log("ToolBar 'toggle' event: " + e.id + " button is changed");
	        }
	    }
	
	    function onOverflowOpen(e) {
	        kendoConsole.log("Overflow container open");
	    }
	
	    function onOverflowClose(e) {
	        kendoConsole.log("Overflow container close");
	    }
	
	    function onOpen(e) {
	        kendoConsole.log("SplitButton popup open");
	    }
	
	    function onClose(e) {
	        kendoConsole.log("SplitButton popup close");
	    }
	</script>

<demo:footer />