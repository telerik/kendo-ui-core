
package com.kendoui.taglib.pivotgrid;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.PivotGridTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DataBindingFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PivotGridTag parent = (PivotGridTag)findParentWithClass(PivotGridTag.class);


        parent.setDataBinding(this);

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
