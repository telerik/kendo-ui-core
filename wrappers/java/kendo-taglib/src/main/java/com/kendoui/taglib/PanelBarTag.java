
package com.kendoui.taglib;


import com.kendoui.taglib.panelbar.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PanelBarTag extends WidgetWithItemsTag /* interfaces *//* interfaces */ {

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

    public void setActivate(ActivateTag value) {
        setProperty("activate", value.properties());
    }

    public void setCollapse(CollapseTag value) {
        setProperty("collapse", value.properties());
    }

    public void setContentLoad(ContentLoadTag value) {
        setProperty("contentload", value.properties());
    }

    public void setError(ErrorTag value) {
        setProperty("error", value.properties());
    }

    public void setExpand(ExpandTag value) {
        setProperty("expand", value.properties());
    }

    public void setSelect(SelectTag value) {
        setProperty("select", value.properties());
    }

    public void setAnimation(AnimationTag value) {
        setProperty("animation", value.properties());
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public String getExpandMode() {
        return (String)getProperty("expandMode");
    }

    public void setExpandMode(String value) {
        setProperty("expandMode", value);
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String value) {
        setProperty("activate", new Function(value));
    }

    public String getCollapse() {
        return ((Function)getProperty("collapse")).getBody();
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getExpand() {
        return ((Function)getProperty("expand")).getBody();
    }

    public void setExpand(String value) {
        setProperty("expand", new Function(value));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
