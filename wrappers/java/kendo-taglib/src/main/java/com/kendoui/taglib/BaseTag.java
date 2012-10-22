package com.kendoui.taglib;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.json.Function;
import com.kendoui.taglib.json.Serializable;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport implements Serializable {

    private Map<String,Object> json;

    @Override
    public void setPageContext(PageContext context) {
        initialize();
        
        super.setPageContext(context);
    }
    
    public void setEvent(String name, String body) {
        setProperty(name, new Function(body));
    }
    
    public String body() {
        BodyContent body = getBodyContent();
        
        if (body != null) {
            return body.getString();
        }
        
        return "";
    }
    
    public void initialize() {
        json = new HashMap<String, Object>();
    }
    
    public void destroy() {
        json = null;
    }
    
    @Override
    public int doEndTag() throws JspException {
        destroy();
        
        return super.doEndTag();
    }

    public void setProperty(String key, Object value) {
        if (value instanceof Serializable) {
            value = ((Serializable)value).properties();
        }
        
        json.put(key, value);
    }

    public Object getProperty(String key) {
        return json.get(key);
    }

    @Override
    public Map<String,Object> properties() {
        return json;
    }

    private static String tagName(Class<?> clazz) {
        Method tagName = null;
        try {
            tagName = clazz.getDeclaredMethod("tagName", (Class<?>[])null);
            return "<kendo:" + (String) tagName.invoke(null, (Object[])null) + ">";
                
        } catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            return "";
        }
    }

    public Object findParentWithClass(Class<?> clazz) throws JspException {
        Object parent = getParent();

        if (parent == null || !clazz.isAssignableFrom(parent.getClass())) {
            StringBuilder exception = new StringBuilder();

            String targetTagName = tagName(clazz);
            
            if (targetTagName.isEmpty()) {
                exception.append("The ")
                    .append(tagName(getClass()))
                    .append(" tag should be nested.");
            
            } else {
                exception.append("The ")
                         .append(tagName(getClass()))
                         .append(" tag should be nested in a ")
                         .append(tagName(clazz))
                         .append(" tag.");
            }
        
            throw new JspException(exception.toString());

            
        }

        return parent;
    }
}
