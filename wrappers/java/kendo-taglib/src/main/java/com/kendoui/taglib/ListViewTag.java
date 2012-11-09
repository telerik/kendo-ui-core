
package com.kendoui.taglib;


import com.kendoui.taglib.listview.*;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ListViewTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public ListViewTag() {
        super("ListView");
    }

    
    @Override
    public int doEndTag() throws JspException {
        String template;
//>> doEndTag
//<< doEndTag

        if (isSet("template")) {
            template = "kendo.template($(\"#" + getTemplate() + "\").html())";
            setProperty("template", new Function(template));
        }
        
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
        return "listView";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setEdit(EditFunctionTag value) {
        setEvent("edit", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setEditTemplate(EditTemplateFunctionTag value) {
        setEvent("editTemplate", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getEditTemplate() {
        Function property = ((Function)getProperty("editTemplate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEditTemplate(String value) {
        setProperty("editTemplate", new Function(value));
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public String getSelectable() {
        return (String)getProperty("selectable");
    }

    public void setSelectable(String value) {
        setProperty("selectable", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
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

    public String getEdit() {
        Function property = ((Function)getProperty("edit"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEdit(String value) {
        setProperty("edit", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

//<< Attributes

}
