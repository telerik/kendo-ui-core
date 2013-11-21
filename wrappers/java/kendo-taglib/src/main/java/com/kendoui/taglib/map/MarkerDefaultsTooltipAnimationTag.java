
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerDefaultsTooltipAnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MarkerDefaultsTooltipTag parent = (MarkerDefaultsTooltipTag)findParentWithClass(MarkerDefaultsTooltipTag.class);


        parent.setAnimation(this);

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
        return "map-markerDefaults-tooltip-animation";
    }

    public void setClose(com.kendoui.taglib.map.MarkerDefaultsTooltipAnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.map.MarkerDefaultsTooltipAnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
