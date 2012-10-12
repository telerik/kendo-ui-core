package com.kendoui.taglib;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.json.Serializable;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport implements Serializable {

    private Map<String,Object> json;

    @Override
    public void setPageContext(PageContext context) {
        initialize();
        
        super.setPageContext(context);
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
        json.put(key, value);
    }

    public Object getProperty(String key) {
        return json.get(key);
    }

    @Override
    public Map<String,Object> properties() {
        return json;
    }

    private static String tagName(Class<?> klass) {
        String className = klass.getSimpleName().replace("Tag", "");

        StringBuilder tagName = new StringBuilder();

        tagName.append("<kendo:")
               .append(Character.toLowerCase(className.charAt(0)))
               .append(className.substring(1))
               .append(">");

        return tagName.toString();
    }

    public Object findParentWithClass(Class<?> klass) throws JspException {
        return findParentWithClass(klass, "");
    }

    public Object findParentWithClass(Class<?> klass, String info) throws JspException {
        Object parent = findAncestorWithClass(this, klass);

        if (parent == null) {
            StringBuilder exception = new StringBuilder();

            exception.append("The ")
                     .append(tagName(getClass()))
                     .append(" tag should be nested in a ");

            if (!info.isEmpty()) {
                exception.append(info)
                         .append(".");
            } else {
                exception.append(tagName(klass))
                         .append(" tag.");
            }

            throw new JspException(exception.toString());
        }

        return parent;
    }
}
