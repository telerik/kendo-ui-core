package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.datasource.TransportTag;

@SuppressWarnings("serial")
public class TransportTagTestDouble extends TransportTag {
    private Assertion asserts;
    
    @Override
    public int doEndTag() throws JspException {        
        return super.doEndTag();
    }
    
    @Override
    public void destroy() {
        asserts.execute();        
        super.destroy();
    }
    
    public Assertion getAsserts() {
        return asserts;
    }

    public void setAsserts(Assertion asserts) {
        this.asserts = asserts;
    }

    public static interface Assertion {
        public void execute();
    }
}
