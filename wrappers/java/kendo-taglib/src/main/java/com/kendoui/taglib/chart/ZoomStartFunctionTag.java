
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ChartTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ZoomStartFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setZoomStart(this);

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
        return "chart-zoomStart";
    }

//<< Attributes

}
