
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag
        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);

        parent.setTools(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        tools = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> tools;

    public List<Map<String, Object>> tools() {
        return tools;
    }

    public static String tagName() {
        return "editor-tools";
    }

    public void addTool(ToolTag value) {
        tools.add(value.properties());
    }

//<< Attributes

}
