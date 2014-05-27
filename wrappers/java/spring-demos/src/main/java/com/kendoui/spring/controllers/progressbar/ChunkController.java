package com.kendoui.spring.controllers.progressbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("progressbar-chunk-controller")
@RequestMapping(value="/progressbar/")
public class ChunkController {
    
    @RequestMapping(value = {"/chunk"}, method = RequestMethod.GET)
    public String index() {       
        return "progressbar/chunk";
    }    
}