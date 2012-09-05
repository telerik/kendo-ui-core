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

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String title) {
        setProperty("title", title);
    }

    public boolean getModal() {
        return (boolean)getProperty("modal");
    }

    public void setModal(boolean modal) {
        setProperty("modal", modal);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean resizable) {
        setProperty("resizable", resizable);
    }

    public boolean getDraggable() {
        return (boolean)getProperty("draggable");
    }

    public void setDraggable(boolean draggable) {
        setProperty("draggable", draggable);
    }

    public int getMinWidth() {
        return (int)getProperty("minWidth");
    }

    public void setMinWidth(int minWidth) {
        setProperty("minWidth", minWidth);
    }

    public int getMinHeight() {
        return (int)getProperty("minHeight");
    }

    public void setMinHeight(int minHeight) {
        setProperty("minHeight", minHeight);
    }

    public int getMaxWidth() {
        return (int)getProperty("maxWidth");
    }

    public void setMaxWidth(int maxWidth) {
        setProperty("maxWidth", maxWidth);
    }

    public int getMaxHeight() {
        return (int)getProperty("maxHeight");
    }

    public void setMaxHeight(int maxHeight) {
        setProperty("maxHeight", maxHeight);
    }

    public Function getOpen() {
        return (Function)getProperty("open");
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public Function getActivate() {
        return (Function)getProperty("activate");
    }

    public void setActivate(String activate) {
        setProperty("activate", new Function(activate));
    }

    public Function getDeactivate() {
        return (Function)getProperty("deactivate");
    }

    public void setDeactivate(String deactivate) {
        setProperty("deactivate", new Function(deactivate));
    }

    public Function getClose() {
        return (Function)getProperty("close");
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public Function getRefresh() {
        return (Function)getProperty("refresh");
    }

    public void setRefresh(String refresh) {
        setProperty("refresh", new Function(refresh));
    }

    public Function getResize() {
        return (Function)getProperty("resize");
    }

    public void setResize(String resize) {
        setProperty("resize", new Function(resize));
    }

    public Function getDragstart() {
        return (Function)getProperty("dragstart");
    }

    public void setDragstart(String dragstart) {
        setProperty("dragstart", new Function(dragstart));
    }

    public Function getDragend() {
        return (Function)getProperty("dragend");
    }

    public void setDragend(String dragend) {
        setProperty("dragend", new Function(dragend));
    }

    public Function getError() {
        return (Function)getProperty("error");
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    //<< Attributes
}
