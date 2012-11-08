package com.kendoui.taglib.editor;



import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
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

    public void setExec(ExecFunctionTag value) {
        setEvent("exec", value.getBody());
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getTooltip() {
        return (String)getProperty("tooltip");
    }

    public void setTooltip(String value) {
        setProperty("tooltip", value);
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

//<< Attributes

}
