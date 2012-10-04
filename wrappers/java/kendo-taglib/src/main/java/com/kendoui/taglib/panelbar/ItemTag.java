
package com.kendoui.taglib.panelbar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Text;
import com.kendoui.taglib.html.Ul;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;

@SuppressWarnings("serial")
public class ItemTag extends BaseTag /* interfaces */implements Items/* interfaces */ {
    
    @Override
    public void setItems(ItemsTag value) {
        items = value.items();
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Item parent = (Item)findParentWithClass(Item.class);

        parent.addItem(this);

//<< doEndTag

        JspWriter out = pageContext.getOut();

        Li element = new Li();

        element.append(new Text(getText()));

        BodyContent bodyContent = getBodyContent();

        if (bodyContent != null) {
            appendBodyContent(element, bodyContent);
        }

        try {
            element.write(out);
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }
    
    private void appendBodyContent(Element<?> element, BodyContent bodyContent) {

        String content = getBodyContent().getString();

        if (!content.isEmpty()) {
            Element<?> contentElement;

            if (items.size() > 0) {
                contentElement = new Ul();
            } else {
                contentElement = new Div();
            }

            contentElement.html(content);

            element.append(contentElement);
        }
    }
    
    private List<Map<String, Object>> items;
    
    @Override
    public void initialize() {
//>> initialize
//<< initialize

        items = new ArrayList<Map<String, Object>>();
        
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy
        items = null;
        super.destroy();
    }

//>> Attributes

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

//<< Attributes

}
