
package com.kendoui.taglib.map;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.MapTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerHoverFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MapTag parent = (MapTag)findParentWithClass(MapTag.class);


        parent.setMarkerHover(this);

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
