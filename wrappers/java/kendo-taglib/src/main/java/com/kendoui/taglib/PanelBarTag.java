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

    public Function getExpand() {
        return (Function)getProperty("expand");
    }

    public void setExpand(String expand) {
        setProperty("expand", new Function(expand));
    }

    public Function getCollapse() {
        return (Function)getProperty("collapse");
    }

    public void setCollapse(String collapse) {
        setProperty("collapse", new Function(collapse));
    }

    public Function getSelect() {
        return (Function)getProperty("select");
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public Function getActivate() {
        return (Function)getProperty("activate");
    }

    public void setActivate(String activate) {
        setProperty("activate", new Function(activate));
    }

    public Function getError() {
        return (Function)getProperty("error");
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public Function getContentLoad() {
        return (Function)getProperty("contentLoad");
    }

    public void setContentLoad(String contentLoad) {
        setProperty("contentLoad", new Function(contentLoad));
    }

    //<< Attributes
}
