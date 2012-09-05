package com.kendoui.taglib;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.jsp.tagext.BodyContent;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class PanelBarTag extends WidgetTag implements PanelBarItemTagContainer {
    private List<PanelBarItemTag> items;

    public PanelBarTag() {
        super("PanelBar");

        items = new ArrayList<PanelBarItemTag>();
    }

    @Override
    protected Element<?> createElement() {
        Ul element = new Ul();

        BodyContent content = getBodyContent();

        element.html(content.getString());

        return element;
    }

    @Override
    public List<PanelBarItemTag> items() {
        return items;
    }

//>> Attributes

    public String getExpandMode() {
        return (String)getProperty("expandMode");
    }

    public void setExpandMode(String expandMode) {
        setProperty("expandMode", expandMode);
    }

    public String getExpand() {
        return ((Function)getProperty("expand")).getBody();
    }

    public void setExpand(String expand) {
        setProperty("expand", new Function(expand));
    }

    public String getCollapse() {
        return ((Function)getProperty("collapse")).getBody();
    }

    public void setCollapse(String collapse) {
        setProperty("collapse", new Function(collapse));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public String getActivate() {
        return ((Function)getProperty("activate")).getBody();
    }

    public void setActivate(String activate) {
        setProperty("activate", new Function(activate));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String contentLoad) {
        setProperty("contentLoad", new Function(contentLoad));
    }

    //<< Attributes
}
