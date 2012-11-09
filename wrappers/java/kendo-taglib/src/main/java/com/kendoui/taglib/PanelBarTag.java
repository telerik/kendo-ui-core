
package com.kendoui.taglib;


import com.kendoui.taglib.panelbar.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PanelBarTag extends WidgetWithItemsTag /* interfaces */implements Items/* interfaces */ {

    public PanelBarTag() {
        super("PanelBar");
    }
    
    @Override
    protected Element<?> createElement() {
        Ul element = new Ul();

        element.html(body());

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
        return "panelBar";
    }

    public void setAnimation(AnimationTag value) {
        setProperty("animation", value);
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public void setActivate(ActivateFunctionTag value) {
        setEvent("activate", value.getBody());
    }

    public void setCollapse(CollapseFunctionTag value) {
        setEvent("collapse", value.getBody());
    }

    public void setContentLoad(ContentLoadFunctionTag value) {
        setEvent("contentLoad", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setExpand(ExpandFunctionTag value) {
        setEvent("expand", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getAnimation() {
        return (boolean)getProperty("animation");
    }

    public void setAnimation(boolean value) {
        setProperty("animation", value);
    }

    public String getExpandMode() {
        return (String)getProperty("expandMode");
    }

    public void setExpandMode(String value) {
        setProperty("expandMode", value);
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

    public String getCollapse() {
        Function property = ((Function)getProperty("collapse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getContentLoad() {
        Function property = ((Function)getProperty("contentLoad"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getError() {
        Function property = ((Function)getProperty("error"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getExpand() {
        Function property = ((Function)getProperty("expand"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExpand(String value) {
        setProperty("expand", new Function(value));
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
