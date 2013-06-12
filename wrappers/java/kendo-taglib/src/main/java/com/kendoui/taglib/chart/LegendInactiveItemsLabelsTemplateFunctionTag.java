
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendInactiveItemsLabelsTemplateFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LegendInactiveItemsLabelsTag parent = (LegendInactiveItemsLabelsTag)findParentWithClass(LegendInactiveItemsLabelsTag.class);


        parent.setTemplate(this);

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
