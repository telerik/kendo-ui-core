
package com.kendoui.taglib.tooltip;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TooltipTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TooltipTag parent = (TooltipTag)findParentWithClass(TooltipTag.class);


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
        return "tooltip-animation";
    }

    public void setClose(com.kendoui.taglib.tooltip.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.tooltip.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
