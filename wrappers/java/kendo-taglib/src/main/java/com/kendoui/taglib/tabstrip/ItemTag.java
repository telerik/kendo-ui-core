
package com.kendoui.taglib.tabstrip;

import java.io.IOException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Div;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

@SuppressWarnings("serial")
public class ItemTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Item parent = (Item)findParentWithClass(Item.class);

        parent.addItem(this);

//<< doEndTag
        
        String html = body();
        
        if (!html.isEmpty()) {
            try {
                JspWriter out = pageContext.getOut();
                
                Div div = new Div();
                
                div.html(html);
                
                div.write(out);
            } catch (IOException exception) {
                throw new JspException(exception);
            }
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

    public static String tagName() {
        return "tabStrip-item";
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

//<< Attributes

}
