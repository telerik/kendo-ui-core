package com.kendoui.taglib.html;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class InputTest {
    private Input input;

    @Before
    public void setUp() {
        input = new Input();
    }

    @Test
    public void outerHtmlOutputsInputElement() throws IOException {
        assertEquals("<input />", input.outerHtml());
    }
}
