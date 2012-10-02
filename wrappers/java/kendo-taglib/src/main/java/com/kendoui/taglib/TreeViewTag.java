
package com.kendoui.taglib;


import com.kendoui.taglib.treeview.*;


import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class TreeViewTag extends WidgetTag /* interfaces */implements Animation, DataBoundWidget/* interfaces */ {

    public TreeViewTag() {
        super("TreeView");
    }

//>> Attributes

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value);
    }

    public String getCheckboxTemplate() {
        return (String)getProperty("checkboxTemplate");
    }

    public void setCheckboxTemplate(String value) {
        setProperty("checkboxTemplate", value);
    }

    public String getDataImageUrlField() {
        return (String)getProperty("dataImageUrlField");
    }

    public void setDataImageUrlField(String value) {
        setProperty("dataImageUrlField", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDataSpriteCssClassField() {
        return (String)getProperty("dataSpriteCssClassField");
    }

    public void setDataSpriteCssClassField(String value) {
        setProperty("dataSpriteCssClassField", value);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String value) {
        setProperty("dataTextField", value);
    }

    public String getDataUrlField() {
        return (String)getProperty("dataUrlField");
    }

    public void setDataUrlField(String value) {
        setProperty("dataUrlField", value);
    }

    public boolean getDragAndDrop() {
        return (boolean)getProperty("dragAndDrop");
    }

    public void setDragAndDrop(boolean value) {
        setProperty("dragAndDrop", value);
    }

    public boolean getLoadOnDemand() {
        return (boolean)getProperty("loadOnDemand");
    }

    public void setLoadOnDemand(boolean value) {
        setProperty("loadOnDemand", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

    public String getCollapse() {
        return ((Function)getProperty("collapse")).getBody();
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getDrag() {
        return ((Function)getProperty("drag")).getBody();
    }

    public void setDrag(String value) {
        setProperty("drag", new Function(value));
    }

    public String getDragend() {
        return ((Function)getProperty("dragend")).getBody();
    }

    public void setDragend(String value) {
        setProperty("dragend", new Function(value));
    }

    public String getDragstart() {
        return ((Function)getProperty("dragstart")).getBody();
    }

    public void setDragstart(String value) {
        setProperty("dragstart", new Function(value));
    }

    public String getDrop() {
        return ((Function)getProperty("drop")).getBody();
    }

    public void setDrop(String value) {
        setProperty("drop", new Function(value));
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
