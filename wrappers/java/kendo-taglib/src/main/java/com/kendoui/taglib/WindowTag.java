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

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String activate) {
        setProperty("activate", new Function(activate));
    }

    public String getDeactivate() {
        return ((Function)getProperty("deactivate")).getBody();
    }

    public void setDeactivate(String deactivate) {
        setProperty("deactivate", new Function(deactivate));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public String getRefresh() {
        return ((Function)getProperty("refresh")).getBody();
    }

    public void setRefresh(String refresh) {
        setProperty("refresh", new Function(refresh));
    }

    public String getResize() {
        return ((Function)getProperty("resize")).getBody();
    }

    public void setResize(String resize) {
        setProperty("resize", new Function(resize));
    }

    public String getDragstart() {
        return ((Function)getProperty("dragstart")).getBody();
    }

    public void setDragstart(String dragstart) {
        setProperty("dragstart", new Function(dragstart));
    }

    public String getDragend() {
        return ((Function)getProperty("dragend")).getBody();
    }

    public void setDragend(String dragend) {
        setProperty("dragend", new Function(dragend));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    //<< Attributes
}
