package com.kendoui.spring.controllers.bubblecharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.BubblePoint;

@Controller("dataviz-bubble_charts-home-controller")
@RequestMapping(value="/bubble-charts/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        List<BubblePoint> bubbleData = new ArrayList<BubblePoint>();
        bubbleData.add(new BubblePoint(-2500, 50000, 500000, "Microsoft"));
        bubbleData.add(new BubblePoint(500, 110000, 7600000, "Starbucks"));
        bubbleData.add(new BubblePoint(7000, 19000, 700000, "Google"));
        bubbleData.add(new BubblePoint(1400, 150000, 700000, "Publix Super Markets"));
        bubbleData.add(new BubblePoint(2400, 30000, 300000, "PricewaterhouseCoopers"));
        bubbleData.add(new BubblePoint(2450, 34000, 90000, "Cisco"));
        bubbleData.add(new BubblePoint(2700, 34000, 400000, "Accenture"));
        bubbleData.add(new BubblePoint(2900, 40000, 450000, "Deloitte"));
        bubbleData.add(new BubblePoint(3000, 55000, 900000, "Whole Foods Market"));
        model.addAttribute("bubbleData", bubbleData);
        
        return "/bubble-charts/index";
    }
}
