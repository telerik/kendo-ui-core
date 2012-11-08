package com.kendoui.taglib;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class AutoCompleteTagTest {
    private AutoCompleteTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new AutoCompleteTag());

        tag.initialize();
        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatedInputElement() throws IOException {
        assertEquals("<input id=\"foo\" name=\"foo\" />", tag.html().outerHtml());         
    }
}