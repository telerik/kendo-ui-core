
package com.kendoui.taglib.tabstrip;

import com.kendoui.taglib.tabstrip.ItemTag;
import com.kendoui.taglib.ContentTag;
import com.kendoui.taglib.TabStripTag;
import com.kendoui.taglib.html.Img;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Span;
import com.kendoui.taglib.html.Text;
import com.kendoui.taglib.html.Ul;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

@SuppressWarnings("serial")
public class ItemsTag extends ContentTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {       
        TabStripTag parent = (TabStripTag)findParentWithClass(TabStripTag.class);

        parent.setItems(this);
        
        Ul ul = new Ul();
        StringBuilder contents = new StringBuilder();
        List<String> contentUrls = new ArrayList<String>();
        
        for (Map<String, Object> item : items) {
            Li li = new Li();
            
            addAttributes(li, item);
            renderContents(li, item);
                        
            contents.append(item.get("content"));
            contentUrls.add((String) item.get("contentUrl"));
            
            ul.append(li);
        }

        parent.setProperty("contentUrls", contentUrls);
        
        try {
            JspWriter out = pageContext.getOut();
            
            ul.write(out);
            
            out.write(contents.toString());
            
        } catch (IOException exception) {
            throw new JspException(exception);
        }

        return super.doEndTag();
    }
    
    private void renderContents(Li element, Map<String, Object> item) {
        String spriteCssClass = (String) item.get("spriteCssClass");
        
        if (spriteCssClass != null && spriteCssClass.trim().length() > 0) {
            Span sprite = new Span();
            sprite.attr("class", "k-sprite " + spriteCssClass);
            element.append(sprite);
        }
        
        String imageUrl = (String) item.get("imageUrl");
        
        if (imageUrl != null && imageUrl.trim().length() > 0) {
            Img image = new Img();
            image.attr("class", "k-image");
            image.attr("alt", "");
            image.attr("src", imageUrl);
            element.append(image);
        }

        element.append(new Text((String) item.get("text")));
    }
    
    private void addAttributes(Li element, Map<String, Object> item) {
        if (this.isSet("expanded") && (Boolean) item.get("expanded")) {
            element.attr("data-expanded", "true");
        }
        
        if (this.isSet("enabled") && (Boolean) item.get("enabled") == false) {
            element.attr("disabled", "disabled");
        }
        
        Object selected = item.get("selected");
        
        if (selected != null && (Boolean) selected) {
            element.attr("class", "k-state-active");
        }
    }

    @Override
    public void initialize() {
//>> initialize

        items = new ArrayList<Map<String, Object>>();

//<< initialize
        
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        items = null;

//<< destroy
        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> items;

    public List<Map<String, Object>> items() {
        return items;
    }

    public static String tagName() {
        return "tabStrip-items";
    }

    public void addItem(ItemTag value) {
        items.add(value.properties());
    }

//<< Attributes

}
