package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class TreeViewTag extends WidgetTag {
    public TreeViewTag() {
        super("TreeView");
    }

    //>> Attributes

    public boolean getDragAndDrop() {
        return (boolean)getProperty("dragAndDrop");
    }

    public void setDragAndDrop(boolean dragAndDrop) {
        setProperty("dragAndDrop", dragAndDrop);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getLoadOnDemand() {
        return (boolean)getProperty("loadOnDemand");
    }

    public void setLoadOnDemand(boolean loadOnDemand) {
        setProperty("loadOnDemand", loadOnDemand);
    }

    public String getDragstart() {
        return ((Function)getProperty("dragstart")).getBody();
    }

    public void setDragstart(String dragstart) {
        setProperty("dragstart", new Function(dragstart));
    }

    public String getDrag() {
        return ((Function)getProperty("drag")).getBody();
    }

    public void setDrag(String drag) {
        setProperty("drag", new Function(drag));
    }

    public String getDrop() {
        return ((Function)getProperty("drop")).getBody();
    }

    public void setDrop(String drop) {
        setProperty("drop", new Function(drop));
    }

    public String getDragend() {
        return ((Function)getProperty("dragend")).getBody();
    }

    public void setDragend(String dragend) {
        setProperty("dragend", new Function(dragend));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
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

    //<< Attributes
}