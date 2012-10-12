package com.kendoui.taglib;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Text;
import com.kendoui.taglib.html.Ul;

@SuppressWarnings("serial")
public abstract class BaseItemTag extends BaseTag {
    
    protected abstract List<?> items();
    protected abstract String getText();
    
    @Override
    public int doEndTag() throws JspException {
        Li element = new Li();

        element.append(new Text(getText()));

        String html = body();

        if (!html.isEmpty()) {
            appendContent(element, html);
        }

        try {
            element.write(pageContext.getOut());
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }
    
    protected void appendContent(Element<?> element, String html) {
        Element<?> contentElement;

        if (items().size() > 0) {
            contentElement = new Ul();
        } else {
            contentElement = new Div();
        }

        contentElement.html(html);

        element.append(contentElement);
    }
}
