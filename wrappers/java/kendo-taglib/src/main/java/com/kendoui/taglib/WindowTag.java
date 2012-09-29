package com.kendoui.taglib;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class WindowTag extends WidgetTag {

    public WindowTag() {
        super("Window");
    }

    @Override
    protected Element<?> createElement() {
        Div element = new Div();

        BodyContent content = getBodyContent();

        element.html(content.getString());

        return element;
    }

//>> Attributes

    public boolean getDraggable() {
        return (boolean)getProperty("draggable");
    }

    public void setDraggable(boolean value) {
        setProperty("draggable", value);
    }

    public boolean getIframe() {
        return (boolean)getProperty("iframe");
    }

    public void setIframe(boolean value) {
        setProperty("iframe", value);
    }

    public int getMaxHeight() {
        return (int)getProperty("maxHeight");
    }

    public void setMaxHeight(int value) {
        setProperty("maxHeight", value);
    }

    public int getMaxWidth() {
        return (int)getProperty("maxWidth");
    }

    public void setMaxWidth(int value) {
        setProperty("maxWidth", value);
    }

    public int getMinHeight() {
        return (int)getProperty("minHeight");
    }

    public void setMinHeight(int value) {
        setProperty("minHeight", value);
    }

    public int getMinWidth() {
        return (int)getProperty("minWidth");
    }

    public void setMinWidth(int value) {
        setProperty("minWidth", value);
    }

    public boolean getModal() {
        return (boolean)getProperty("modal");
    }

    public void setModal(boolean value) {
        setProperty("modal", value);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean value) {
        setProperty("resizable", value);
    }

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String value) {
        setProperty("title", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String value) {
        setProperty("activate", new Function(value));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getDeactivate() {
        return ((Function)getProperty("deactivate")).getBody();
    }

    public void setDeactivate(String value) {
        setProperty("deactivate", new Function(value));
    }

    public String getDragend() {
        return ((Function)getProperty("dragend")).getBody();
    }

    public void setDragend(String value) {
        setProperty("dragend", new Function(value));
    }

    public String getDragstart() {
        return ((Function)getProperty("dragstart")).getBody();
    }

    public void setDragstart(String value) {
        setProperty("dragstart", new Function(value));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getRefresh() {
        return ((Function)getProperty("refresh")).getBody();
    }

    public void setRefresh(String value) {
        setProperty("refresh", new Function(value));
    }

    public String getResize() {
        return ((Function)getProperty("resize")).getBody();
    }

    public void setResize(String value) {
        setProperty("resize", new Function(value));
    }

//<< Attributes
}
