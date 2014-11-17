package com.kendoui.spring.controllers.radialgauge;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-radial_gauge-multiple_pointers-controller")
@RequestMapping(value="/radial-gauge/")
public class MultiplePointersController {
    @RequestMapping(value = "/multiple-pointers", method = RequestMethod.GET)
    public String index() {       
        return "/radial-gauge/multiple-pointers";
    }
}
