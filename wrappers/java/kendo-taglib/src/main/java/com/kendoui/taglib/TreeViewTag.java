package com.kendoui.taglib;

import com.kendoui.taglib.treeview.*;


import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TreeViewTag extends WidgetWithItemsTag /* interfaces */implements DataBoundWidget, Items/* interfaces */ {

    public TreeViewTag() {
        super("TreeView");
    }

    @Override
    protected Element<?> createElement() {
        Element<?> wrapper;
        
        if (items.isEmpty()) {
            wrapper = new Div();
        } else {
            wrapper = new Ul();
            
            wrapper.html(body());
        }
               
        return wrapper;
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
        return "treeView";
    }

    public void setAnimation(com.kendoui.taglib.treeview.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setCheckboxes(com.kendoui.taglib.treeview.CheckboxesTag value) {
        setProperty("checkboxes", value);
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public void setCollapse(CollapseFunctionTag value) {
        setEvent("collapse", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setDrag(DragFunctionTag value) {
        setEvent("drag", value.getBody());
    }

    public void setDragend(DragendFunctionTag value) {
        setEvent("dragend", value.getBody());
    }

    public void setDragstart(DragstartFunctionTag value) {
        setEvent("dragstart", value.getBody());
    }

    public void setDrop(DropFunctionTag value) {
        setEvent("drop", value.getBody());
    }

    public void setExpand(ExpandFunctionTag value) {
        setEvent("expand", value.getBody());
    }

    public void setNavigate(NavigateFunctionTag value) {
        setEvent("navigate", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getCheckboxes() {
        return (boolean)getProperty("checkboxes");
    }

    public void setCheckboxes(boolean value) {
        setProperty("checkboxes", value);
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
        Function property = ((Function)getProperty("collapse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCollapse(String value) {
        setProperty("collapse", new Function(value));
    }

    public String getDataBound() {
        Function property = ((Function)getProperty("dataBound"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getDrag() {
        Function property = ((Function)getProperty("drag"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDrag(String value) {
        setProperty("drag", new Function(value));
    }

    public String getDragend() {
        Function property = ((Function)getProperty("dragend"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragend(String value) {
        setProperty("dragend", new Function(value));
    }

    public String getDragstart() {
        Function property = ((Function)getProperty("dragstart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragstart(String value) {
        setProperty("dragstart", new Function(value));
    }

    public String getDrop() {
        Function property = ((Function)getProperty("drop"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDrop(String value) {
        setProperty("drop", new Function(value));
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

    public String getNavigate() {
        Function property = ((Function)getProperty("navigate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setNavigate(String value) {
        setProperty("navigate", new Function(value));
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
