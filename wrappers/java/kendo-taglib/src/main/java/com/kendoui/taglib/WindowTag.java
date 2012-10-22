
package com.kendoui.taglib;


import com.kendoui.taglib.window.*;


import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyContent;

@SuppressWarnings("serial")
public class WindowTag extends WidgetTag /* interfaces *//* interfaces */ {

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
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "window";
    }

    public void setAnimation(AnimationTag value) {
        setProperty("animation", value);
    }

    public void setActivate(ActivateFunctionTag value) {
        setEvent("activate", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setDeactivate(DeactivateFunctionTag value) {
        setEvent("deactivate", value.getBody());
    }

    public void setDragend(DragendFunctionTag value) {
        setEvent("dragend", value.getBody());
    }

    public void setDragstart(DragstartFunctionTag value) {
        setEvent("dragstart", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setRefresh(RefreshFunctionTag value) {
        setEvent("refresh", value.getBody());
    }

    public void setResize(ResizeFunctionTag value) {
        setEvent("resize", value.getBody());
    }

    public Object getActions() {
        return (Object)getProperty("actions");
    }

    public void setActions(Object value) {
        setProperty("actions", value);
    }

    public Object getAppendTo() {
        return (Object)getProperty("appendTo");
    }

    public void setAppendTo(Object value) {
        setProperty("appendTo", value);
    }

    public Object getContent() {
        return (Object)getProperty("content");
    }

    public void setContent(Object value) {
        setProperty("content", value);
    }

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

    public float getMaxHeight() {
        return (float)getProperty("maxHeight");
    }

    public void setMaxHeight(float value) {
        setProperty("maxHeight", value);
    }

    public float getMaxWidth() {
        return (float)getProperty("maxWidth");
    }

    public void setMaxWidth(float value) {
        setProperty("maxWidth", value);
    }

    public float getMinHeight() {
        return (float)getProperty("minHeight");
    }

    public void setMinHeight(float value) {
        setProperty("minHeight", value);
    }

    public float getMinWidth() {
        return (float)getProperty("minWidth");
    }

    public void setMinWidth(float value) {
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
