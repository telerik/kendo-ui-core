package com.kendoui.spring.controllers.qrcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-qrcode-api-controller")
@RequestMapping(value="/qrcode/")
public class ApiController {
    @RequestMapping(value = "api", method = RequestMethod.GET)
    public String index() {
        
        return "/qrcode/api";
    }
}
