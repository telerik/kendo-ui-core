
package com.kendoui.taglib.sparkline;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.SparklineTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesHoverFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SparklineTag parent = (SparklineTag)findParentWithClass(SparklineTag.class);


        parent.setSeriesHover(this);

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
