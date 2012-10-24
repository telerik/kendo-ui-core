package com.kendoui.taglib;

import static org.junit.Assert.*;
import java.io.IOException;

import javax.servlet.jsp.JspException;
import org.junit.Before;
import org.junit.Test;

import com.kendoui.taglib.TransportTagTestDouble.Assertion;

public class TransportTagTest {
    private TransportTagTestDouble tag;
    private DataSourceTag parent;
    
    @Before
    public void setUp() throws IOException {
        tag = new TransportTagTestDouble();
        parent = new DataSourceTag();
        tag.initialize();
        parent.initialize();
        tag.setParent(parent);        
    }
    
    @Test
    public void defaultParameterMapIsSet() throws IOException, JspException {                
        tag.doStartTag();
        parent.doStartTag();
        
        tag.setAsserts(new Assertion() {            
            @Override
            public void execute() {
                assertNotNull(tag.getParameterMap());
            }
        });
        
        tag.doEndTag();
    }
    
    @Test
    public void customParameterMapIsSet() throws IOException, JspException {                
        tag.doStartTag();
        parent.doStartTag();
        
        tag.setParameterMap("foo");
        
        tag.setAsserts(new Assertion() {            
            @Override
            public void execute() {
                assertEquals("foo", tag.getParameterMap());
            }
        });
        
        tag.doEndTag();  
    }
    
    @Test
    public void defaultParameterMapIfBatchIsEnabled() throws IOException, JspException {                
        tag.doStartTag();
        parent.doStartTag();       
        
        parent.setBatch(true);
        
        tag.setAsserts(new Assertion() {            
            @Override
            public void execute() {
                assertEquals("function(options,type){if(type===\"read\"){return JSON.stringify(options);}else{return JSON.stringify(options.models);}}", tag.getParameterMap());
            }
        });
        
        tag.doEndTag();  
    }
    
    @Test
    public void defaultParameterMapIfBatchIsNotEnabled() throws IOException, JspException {                
        tag.doStartTag();
        parent.doStartTag();
        
        tag.setAsserts(new Assertion() {            
            @Override
            public void execute() {
                assertEquals("function(options,type){return JSON.stringify(options);}", tag.getParameterMap());
            }
        });
        
        tag.doEndTag();  
    }
}
