
package com.kendoui.taglib.tooltip;


import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.TooltipTag;
import com.kendoui.taglib.json.Function;
import com.kendoui.taglib.json.Template;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ContentTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag        
//<< doEndTag

        TooltipTag parent = (TooltipTag)findParentWithClass(TooltipTag.class);

        if (isSet("template")) {
            parent.setContent((Template)getProperty("template"));
        } else if (isSet("urlOptions")) {            
            parent.setContent(getProperty("urlOptions"));   
        } else if (isSet("content")) {            
            parent.setContent((String)getProperty("content"));        
        } else {            
            parent.setContent(this);
        }        
        
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
    
    public static String tagName() {
        return "tooltip-content";
    }

    public String getUrl() {
        return (String)getProperty("url");
    }

    public void setUrl(String value) {
        setProperty("url", value);
    }

    public void setContent(String value) {
        setProperty("content", value);
    }
    
    public void setUrl(ContentAjaxOptionsTag value) {        
        setProperty("urlOptions", value);
    }

    public String getTemplate() {
        Function property = ((Template)getProperty("template"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setTemplate(String value) {
        setProperty("template", new Template(value));
    }
}
