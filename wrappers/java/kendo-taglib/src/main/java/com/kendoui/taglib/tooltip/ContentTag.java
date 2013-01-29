
package com.kendoui.taglib.tooltip;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TooltipTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ContentTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TooltipTag parent = (TooltipTag)findParentWithClass(TooltipTag.class);


        parent.setContent(this);

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
        return "tooltip-content";
    }

    public String getUrl() {
        return (String)getProperty("url");
    }

    public void setUrl(String value) {
        setProperty("url", value);
    }

//<< Attributes

}
