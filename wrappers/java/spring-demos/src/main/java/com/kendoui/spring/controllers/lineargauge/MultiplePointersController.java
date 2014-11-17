package com.kendoui.spring.controllers.lineargauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-linear_gauge-multiple_pointers-controller")
@RequestMapping(value="/linear-gauge/")
public class MultiplePointersController {
    @RequestMapping(value = "/multiple-pointers", method = RequestMethod.GET)
    public String index() {       
        return "/linear-gauge/multiple-pointers";
    }
}
