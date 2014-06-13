package com.kendoui.spring.controllers.waterfallcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.CashFlowData;

@Controller("dataviz-waterfall_chart-local_data-controller")
@RequestMapping(value="/waterfall-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        List<CashFlowData> viewModel = new ArrayList<CashFlowData>();       
        viewModel.add(new CashFlowData("Beginning\nBalance", 50000));
        viewModel.add(new CashFlowData("Jan", 17000));
        viewModel.add(new CashFlowData("Feb", 14000));
        viewModel.add(new CashFlowData("Mar", -12000));
        viewModel.add(new CashFlowData("Q1", "runningTotal"));
        viewModel.add(new CashFlowData("Apr", -22000));
        viewModel.add(new CashFlowData("May", -18000));
        viewModel.add(new CashFlowData("Jun", 10000));
        viewModel.add(new CashFlowData("Q2", "runningTotal"));
        viewModel.add(new CashFlowData("Ending\nBalance", "total"));

        model.addAttribute("viewModel", viewModel);
     
        return "/waterfall-charts/local-data-binding";
    }
}
