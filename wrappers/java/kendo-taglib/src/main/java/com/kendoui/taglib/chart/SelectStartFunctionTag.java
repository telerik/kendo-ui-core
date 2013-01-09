
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ChartTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SelectStartFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setSelectStart(this);

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
