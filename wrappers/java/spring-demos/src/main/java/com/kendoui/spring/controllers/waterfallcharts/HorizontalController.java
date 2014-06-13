package com.kendoui.spring.controllers.waterfallcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.CashFlowData;
import com.kendoui.spring.models.RequestDetail;

@Controller("dataviz-waterfall_chart-horizontal-controller")
@RequestMapping(value="/waterfall-charts/")
public class HorizontalController {
    @RequestMapping(value = "/horizontal", method = RequestMethod.GET)
    public String index(Model model) {
        List<RequestDetail> viewModel = new ArrayList<RequestDetail>();       
        viewModel.add(new RequestDetail("DNS Lookup", 20));
        viewModel.add(new RequestDetail("Connecting", 122));
        viewModel.add(new RequestDetail("Sending", 30));
        viewModel.add(new RequestDetail("Waiting", 421));
        viewModel.add(new RequestDetail("Receiving", 357));
        viewModel.add(new RequestDetail("Total", "total"));

        model.addAttribute("viewModel", viewModel);
     
        return "/waterfall-charts/horizontal";
    }
}
