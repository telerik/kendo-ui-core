package com.kendoui.taglib;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;

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

    //<< Attributes
}
