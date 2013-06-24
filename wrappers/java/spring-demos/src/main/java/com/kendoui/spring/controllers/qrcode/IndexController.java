package com.kendoui.spring.controllers.qrcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-qrcode-home-controller")
@RequestMapping(value="/dataviz/qrcode/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        
        return "/dataviz/qrcode/index";
    }
}