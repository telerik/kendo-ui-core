
package com.kendoui.taglib.multiselect;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MultiSelectTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MultiSelectTag parent = (MultiSelectTag)findParentWithClass(MultiSelectTag.class);


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
        return "multiSelect-animation";
    }

    public void setClose(com.kendoui.taglib.multiselect.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.multiselect.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
