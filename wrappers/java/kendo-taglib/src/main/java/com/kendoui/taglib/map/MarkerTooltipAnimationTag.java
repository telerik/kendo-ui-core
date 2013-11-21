
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerTooltipAnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MarkerTooltipTag parent = (MarkerTooltipTag)findParentWithClass(MarkerTooltipTag.class);


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
        return "map-marker-tooltip-animation";
    }

    public void setClose(com.kendoui.taglib.map.MarkerTooltipAnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.map.MarkerTooltipAnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
