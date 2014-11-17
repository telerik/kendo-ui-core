package com.kendoui.spring.controllers.pivotgrid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller("pivotgrid-kpi-controller")
@RequestMapping(value="/pivotgrid/")
public class KpiController {
    
    @RequestMapping(value = {"/kpi"}, method = RequestMethod.GET)
    public String kpi() {
        return "pivotgrid/kpi";
    }
    
}

