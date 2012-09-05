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

    public Function getDragstart() {
        return (Function)getProperty("dragstart");
    }

    public void setDragstart(String dragstart) {
        setProperty("dragstart", new Function(dragstart));
    }

    public Function getDrag() {
        return (Function)getProperty("drag");
    }

    public void setDrag(String drag) {
        setProperty("drag", new Function(drag));
    }

    public Function getDrop() {
        return (Function)getProperty("drop");
    }

    public void setDrop(String drop) {
        setProperty("drop", new Function(drop));
    }

    public Function getDragend() {
        return (Function)getProperty("dragend");
    }

    public void setDragend(String dragend) {
        setProperty("dragend", new Function(dragend));
    }

    public Function getDataBound() {
        return (Function)getProperty("dataBound");
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
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

    //<< Attributes
}