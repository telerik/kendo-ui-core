
package com.kendoui.taglib.editor;


import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    public List<Map<String, Object>> items;

    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ToolsTag parent = (ToolsTag)findParentWithClass(ToolsTag.class);

        parent.addTool(this);

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
        return "editor-tool";
    }

    public void setItems(ToolItemsTag value) {

        items = value.items();

    }

    public void setExec(ToolExecFunctionTag value) {
        setEvent("exec", value.getBody());
    }

    public String getExec() {
        Function property = ((Function)getProperty("exec"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExec(String value) {
        setProperty("exec", new Function(value));
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.String getTooltip() {
        return (java.lang.String)getProperty("tooltip");
    }

    public void setTooltip(java.lang.String value) {
        setProperty("tooltip", value);
    }

//<< Attributes

}
