package com.kendoui.taglib;

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

    //<< Attributes
}