package com.kendoui.taglib;

import com.kendoui.taglib.panelbar.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class PanelBarTag extends WidgetTag  /* interfaces */implements Animation, PanelBarItemTagContainer/* interfaces */ {
    private List<Map<String, Object>> items;

    public PanelBarTag() {
        super("PanelBar");
    }
    
    @Override
    public void initialize() {
        items = new ArrayList<Map<String, Object>>();
        
        super.initialize();
    }
    
    @Override
    public void destroy() {
        items = null;
        
        super.destroy();
    }
    
    @Override
    protected Element<?> createElement() {
        Ul element = new Ul();

        BodyContent content = getBodyContent();

        element.html(content.getString());

        return element;
    }

    public List<Map<String, Object>> items() {
        return items;
    }

//>> Attributes

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value.properties());
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
