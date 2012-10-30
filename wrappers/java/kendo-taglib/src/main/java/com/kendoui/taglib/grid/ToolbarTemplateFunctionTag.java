
package com.kendoui.taglib.grid;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.GridTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTemplateFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {

        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setToolbarTemplate(this);

        return super.doEndTag();
    }
    
    @Override
    public String getBody() {
        return body().trim().replace("#", "\\#");
    }
    
    @Override
    public void initialize() {


        super.initialize();
    }

    @Override
    public void destroy() {
        super.destroy();
    }

    public static String tagName() {
        return "grid-toolbarTemplate";
    }

}
