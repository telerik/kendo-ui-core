
package com.kendoui.taglib.treemap;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.TreeMapTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemCreatedFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeMapTag parent = (TreeMapTag)findParentWithClass(TreeMapTag.class);


        parent.setItemCreated(this);

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
//<< Attributes

}
