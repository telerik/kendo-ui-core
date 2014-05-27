package com.kendoui.spring.controllers.funnelcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


import com.kendoui.spring.models.WebSiteStats;

@Controller("dataviz-funnel_chart-local_data-controller")
@RequestMapping(value="/funnel-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        List<WebSiteStats> dataBefore = new ArrayList<WebSiteStats>();
        dataBefore.add(new WebSiteStats("All Visitors", 23945));
        dataBefore.add(new WebSiteStats("Tried the Demos", 19156));
        dataBefore.add(new WebSiteStats("Downloaded", 13984));
        dataBefore.add(new WebSiteStats("Requested a Quote", 3216));
        dataBefore.add(new WebSiteStats("Purchased", 1673));
        model.addAttribute("dataBefore", dataBefore);
        
        List<WebSiteStats> dataAfter = new ArrayList<WebSiteStats>();
        dataAfter.add(new WebSiteStats("All Visitors", 28536));
        dataAfter.add(new WebSiteStats("Tried the Demos", 26539));
        dataAfter.add(new WebSiteStats("Downloaded", 23088));
        dataAfter.add(new WebSiteStats("Requested a Quote", 13853));
        dataAfter.add(new WebSiteStats("Purchased", 9697));
        model.addAttribute("dataAfter", dataAfter);        
        
        return "/funnel-charts/local-data-binding";
    }
}
