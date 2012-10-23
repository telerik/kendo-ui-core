
package com.kendoui.taglib.treeview;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.TreeViewTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SelectFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeViewTag parent = (TreeViewTag)findParentWithClass(TreeViewTag.class);


        parent.setSelect(this);

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
        return "treeView-select";
    }

//<< Attributes

}
