package com.kendoui.spring.controllers.funnelcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.PieChartsBasicUsageViewModel;

@Controller("dataviz-funnel_charts-home-controller")
@RequestMapping(value="/funnel-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        
        List<PieChartsBasicUsageViewModel> octData = new ArrayList<PieChartsBasicUsageViewModel>();
        octData.add(new PieChartsBasicUsageViewModel("Impressions", 434823,"#0e5a7e"));
        octData.add(new PieChartsBasicUsageViewModel("Clicks", 356854,"#166f99"));
        octData.add(new PieChartsBasicUsageViewModel("Unique Visitors", 280022, "#2185b4"));
        octData.add(new PieChartsBasicUsageViewModel("Downloads", 190374,"#319fd2"));
        octData.add(new PieChartsBasicUsageViewModel("Purchases", 120392,"#3eaee2"));        

        model.addAttribute("octData", octData);
        
        List<PieChartsBasicUsageViewModel> novData = new ArrayList<PieChartsBasicUsageViewModel>();
        novData.add(new PieChartsBasicUsageViewModel("Impressions", 984528,"#0e5a7e"));
        novData.add(new PieChartsBasicUsageViewModel("Clicks", 856287,"#166f99"));
        novData.add(new PieChartsBasicUsageViewModel("Unique Visitors", 643694, "#2185b4"));
        novData.add(new PieChartsBasicUsageViewModel("Downloads", 567843,"#319fd2"));
        novData.add(new PieChartsBasicUsageViewModel("Purchases", 389137,"#3eaee2"));        

        model.addAttribute("novData", novData);
        
        List<PieChartsBasicUsageViewModel> decData = new ArrayList<PieChartsBasicUsageViewModel>();
        decData.add(new PieChartsBasicUsageViewModel("Impressions", 1200528,"#0e5a7e"));
        decData.add(new PieChartsBasicUsageViewModel("Clicks", 989287,"#166f99"));
        decData.add(new PieChartsBasicUsageViewModel("Unique Visitors", 885694, "#2185b4"));
        decData.add(new PieChartsBasicUsageViewModel("Downloads", 788843,"#319fd2"));
        decData.add(new PieChartsBasicUsageViewModel("Purchases", 694137,"#3eaee2"));        

        model.addAttribute("decData", decData);
        
        return "/funnel-charts/index";
    }
}
