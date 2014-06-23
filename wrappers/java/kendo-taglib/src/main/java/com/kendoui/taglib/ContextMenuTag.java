
package com.kendoui.taglib;


import com.kendoui.taglib.contextmenu.*;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ContextMenuTag extends WidgetWithItemsTag /* interfaces */implements DataBoundWidget, Items/* interfaces */ {

    public ContextMenuTag() {
        super("ContextMenu");
    }
    
    @Override
    public Element<?> createElement() {
        Ul ul = new Ul();

        ul.html(body());

        return ul;
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
        return "contextMenu";
    }

    public void setAnimation(com.kendoui.taglib.contextmenu.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setItems(ItemsTag value) {

        items = value.items();

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

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getAlignToAnchor() {
        return (boolean)getProperty("alignToAnchor");
    }

    public void setAlignToAnchor(boolean value) {
        setProperty("alignToAnchor", value);
    }

    public boolean getCloseOnClick() {
        return (boolean)getProperty("closeOnClick");
    }

    public void setCloseOnClick(boolean value) {
        setProperty("closeOnClick", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getDirection() {
        return (java.lang.String)getProperty("direction");
    }

    public void setDirection(java.lang.String value) {
        setProperty("direction", value);
    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public float getHoverDelay() {
        return (float)getProperty("hoverDelay");
    }

    public void setHoverDelay(float value) {
        setProperty("hoverDelay", value);
    }

    public java.lang.String getOrientation() {
        return (java.lang.String)getProperty("orientation");
    }

    public void setOrientation(java.lang.String value) {
        setProperty("orientation", value);
    }

    public java.lang.String getPopupCollision() {
        return (java.lang.String)getProperty("popupCollision");
    }

    public void setPopupCollision(java.lang.String value) {
        setProperty("popupCollision", value);
    }

    public java.lang.String getShowOn() {
        return (java.lang.String)getProperty("showOn");
    }

    public void setShowOn(java.lang.String value) {
        setProperty("showOn", value);
    }

    public java.lang.Object getTarget() {
        return (java.lang.Object)getProperty("target");
    }

    public void setTarget(java.lang.Object value) {
        setProperty("target", value);
    }

    public String getActivate() {
        Function property = ((Function)getProperty("activate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setActivate(String value) {
        setProperty("activate", new Function(value));
    }

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getDeactivate() {
        Function property = ((Function)getProperty("deactivate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeactivate(String value) {
        setProperty("deactivate", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
