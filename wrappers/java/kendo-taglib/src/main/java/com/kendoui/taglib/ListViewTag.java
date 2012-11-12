
package com.kendoui.taglib;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.kendoui.taglib.listview.*;
import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

@SuppressWarnings("serial")
public class ListViewTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public ListViewTag() {
        super("ListView");
    }

    protected Element<?> pagerHtml() {
        Element<?> html = new Div();
        html.attr("id", getName() + "_pager");
        html.attr("class", "k-pager-wrap");
        
        return html;
    }
    
    @Override
    protected Element<?> createElement() {
        if (isSet("tagName")) {
            return new ListViewElement(getTagName().toLowerCase());
        }
        
        return super.createElement();
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public int doEndTag() throws JspException {
        String template;
        int result;
        JspWriter writer;
        Map<String, Object> pagable;
        
//>> doEndTag
//<< doEndTag

        if (isSet("template")) {
            template = "kendo.template($(\"#" + getTemplate() + "\").html())";
            setProperty("template", new Function(template));
        }
        
        if (isSet("altTemplate")) {
            template = "kendo.template($(\"#" + getAltTemplate() + "\").html())";
            setProperty("altTemplate", new Function(template));
        }
        
        if (isSet("editTemplate")) {
            template = "kendo.template($(\"#" + getEditTemplate() + "\").html())";
            setProperty("editTemplate", new Function(template));
        }
        
        if (isSet("pageable")) {
            if (getProperty("pageable") instanceof HashMap<?, ?>) {
                pagable = (HashMap<String, Object>)getProperty("pageable");
            } 
            else
            {
                pagable = new HashMap<String, Object>();
            }
            
            pagable.put("pagerId", getName() + "_pager");
            setProperty("pageable", pagable);    
            
            result = super.doEndTag();
            
            writer = pageContext.getOut();        
            try {
                pagerHtml().write(writer);
            } catch (IOException exception) {
                throw new JspException(exception);
            }
            
            return result;
        }
        else {
            return super.doEndTag();
        }
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

    public void setPageable(PageableTag value) {
        setProperty("pageable", value);
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

    public boolean getPageable() {
        return (boolean)getProperty("pageable");
    }

    public void setPageable(boolean value) {
        setProperty("pageable", value);
    }

    public String getEditTemplate() {
        return (String)getProperty("editTemplate");
    }

    public void setEditTemplate(String value) {
        setProperty("editTemplate", value);
    }

    public String getAltTemplate() {
        return (String)getProperty("altTemplate");
    }

    public void setAltTemplate(String value) {
        setProperty("altTemplate", value);
    }

    public String getTagName() {
        return (String)getProperty("tagName");
    }

    public void setTagName(String value) {
        setProperty("tagName", value);
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
