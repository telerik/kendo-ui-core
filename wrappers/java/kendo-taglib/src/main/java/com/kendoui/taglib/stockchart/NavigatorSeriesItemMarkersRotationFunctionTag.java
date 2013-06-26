
package com.kendoui.taglib.stockchart;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorSeriesItemMarkersRotationFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NavigatorSeriesItemMarkersTag parent = (NavigatorSeriesItemMarkersTag)findParentWithClass(NavigatorSeriesItemMarkersTag.class);


        parent.setRotation(this);

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
