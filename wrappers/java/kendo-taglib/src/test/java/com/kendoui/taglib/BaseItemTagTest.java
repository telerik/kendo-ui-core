package com.kendoui.taglib;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

import com.kendoui.taglib.html.Li;

public class BaseItemTagTest {
    private BaseItemTagTestDouble tag;

    @Before
    public void setUp() {
        tag = new BaseItemTagTestDouble();
    }

    @Test
    public void spriteCssClassRendersSpanTag() throws IOException {
        tag.spriteCssClass = "foo";
        tag.text = "bar";
        
        Li element = new Li();

        tag.renderContents(element);
        
        assertEquals("<li><span class=\"k-sprite foo\"></span>bar</li>", element.outerHtml());
    }

    @Test
    public void noSpriteCssClassDoesNotRenderSpanTag() throws IOException {
        tag.spriteCssClass = null;
        tag.text = "bar";
        
        Li element = new Li();

        tag.renderContents(element);
        
        assertEquals("<li>bar</li>", element.outerHtml());
    }
}
