package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class ListViewTag extends WidgetTag {
    public ListViewTag() {
        super("ListView");
    }

    //>> Attributes

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getSelectable() {
        return (boolean)getProperty("selectable");
    }

    public void setSelectable(boolean selectable) {
        setProperty("selectable", selectable);
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean navigatable) {
        setProperty("navigatable", navigatable);
    }

    public String getAltTemplate() {
        return (String)getProperty("altTemplate");
    }

    public void setAltTemplate(String altTemplate) {
        setProperty("altTemplate", altTemplate);
    }

    public String getEditTemplate() {
        return (String)getProperty("editTemplate");
    }

    public void setEditTemplate(String editTemplate) {
        setProperty("editTemplate", editTemplate);
    }

    public Function getChange() {
        return (Function)getProperty("change");
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public Function getDataBinding() {
        return (Function)getProperty("dataBinding");
    }

    public void setDataBinding(String dataBinding) {
        setProperty("dataBinding", new Function(dataBinding));
    }

    public Function getDataBound() {
        return (Function)getProperty("dataBound");
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public Function getEdit() {
        return (Function)getProperty("edit");
    }

    public void setEdit(String edit) {
        setProperty("edit", new Function(edit));
    }

    public Function getRemove() {
        return (Function)getProperty("remove");
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    public Function getSave() {
        return (Function)getProperty("save");
    }

    public void setSave(String save) {
        setProperty("save", new Function(save));
    }

    //<< Attributes
}