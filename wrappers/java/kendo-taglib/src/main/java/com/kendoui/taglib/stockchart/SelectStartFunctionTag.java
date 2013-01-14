
package com.kendoui.taglib.stockchart;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.StockChartTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SelectStartFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


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
