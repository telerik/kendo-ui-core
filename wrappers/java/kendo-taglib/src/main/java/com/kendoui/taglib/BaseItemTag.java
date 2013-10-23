package com.kendoui.taglib;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.html.Anchor;
import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Img;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Span;
import com.kendoui.taglib.html.Text;
import com.kendoui.taglib.html.Ul;

@SuppressWarnings("serial")
public abstract class BaseItemTag extends BaseTag {
    
    protected List<Map<String,Object>> items;
    
    protected abstract String getUrl();
    protected abstract String getText();
    protected abstract String getSpriteCssClass();
    protected abstract String getImageUrl();
    protected abstract boolean getExpanded();
    protected abstract boolean getEnabled();
    
    @Override
    public void initialize() {
        items = new ArrayList<Map<String,Object>>();
        super.initialize();
    }
    
    @Override
    public void destroy() {
        items = null;
        super.destroy();
    }
    
    protected void renderContents(Element<?> element) {
        Element<?> container = element;
        
        if (getUrl() != null && !getUrl().isEmpty()) {
            element = new Anchor();
            element.attr("href", getUrl());
            addLinkAttributes(element);
            container.append(element);
        }
        
        String spriteCssClass = getSpriteCssClass();
        
        if (spriteCssClass != null && !spriteCssClass.isEmpty()) {
            Span sprite = new Span();
            sprite.attr("class", "k-sprite " + spriteCssClass);
            element.append(sprite);
        }
        
        String imageUrl = getImageUrl();
        
        if (imageUrl != null && imageUrl.isEmpty()) {
            Img image = new Img();
            image.attr("class", "k-image");
            image.attr("alt", "");
            image.attr("src", imageUrl);
            element.append(image);
        }
        
        element.append(new Text(getText()));
        
        String html = body();
        
        if (!html.isEmpty()) {
            appendContent(container, html);
        }
    }
    
    protected void addLinkAttributes(Element<?> element) {
        element.attr("class", "k-link");
    }
    
    protected void addAttributes(Li element) {
        if (this.isSet("expanded") && this.getExpanded()) {
            element.attr("data-expanded", "true");
        }
        
        if (this.isSet("enabled") && this.getEnabled() == false) {
            element.attr("disabled", "disabled");
        }
    }
    
    @Override
    public int doEndTag() throws JspException {
        Li element = new Li();
        
        addAttributes(element);
        
        renderContents(element);

        try {
            element.write(pageContext.getOut());
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }
    
    protected void appendContent(Element<?> element, String html) {
        Element<?> contentElement;

        if (items.size() > 0) {
            contentElement = new Ul();
        } else {
            contentElement = new Div();
        }

        contentElement.html(html);

        element.append(contentElement);
    }
}
