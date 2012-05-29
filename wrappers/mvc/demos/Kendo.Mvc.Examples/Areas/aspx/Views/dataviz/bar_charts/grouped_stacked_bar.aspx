<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("World population by age group and sex")
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series => {
            series
                .Column(new int[] { 1100941, 1139797, 1172929, 1184435, 1184654 })
                .Name("0-19").Stack("Female");
            
            series
                .Column(new int[] { 810169, 883051, 942151, 1001395, 1058439 })
                .Name("20-39").Stack("Female");
            
            series
                .Column(new int[] { 395533, 435485, 499861, 569114, 655066 })
                .Name("40-64").Stack("Female");
            
            series
                .Column(new int[] { 152171, 170262, 191015, 210767, 226956 })
                .Name("65-79").Stack("Female");
            
            series
                .Column(new int[] { 36724, 42939, 46413, 54984, 66029 })
                .Name("80+").Stack("Female");

            series
                .Column(new int[] { 1155600, 1202766, 1244870, 1263637, 1268165 })
                .Name("0-19").Stack("Male");
            
            series
                .Column(new int[] { 844496, 916479, 973694, 1036548, 1099507 })
                .Name("20-39").Stack("Male");
            
            series
                .Column(new int[] { 390590, 430666, 495030, 564169, 646563 })
                .Name("40-64").Stack("Male");
            
            series
                .Column(new int[] { 120614, 138868, 158387, 177078, 192156 })
                .Name("65-79").Stack("Male");
            
            series
                .Column(new int[] { 19442, 23020, 25868, 31462, 39223 })
                .Name("80+").Stack("Male");
        })
        .SeriesColors(
            "#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
            "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"
        )
        .CategoryAxis(axis => axis
            .Categories("1990", "1995", "2000", "2005", "2010")
        )
        .ValueAxis(axis => axis
            .Numeric().Labels(labels => 
                labels.Template("#= kendo.format('{0:N0}', value / 1000) # M")
            )
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= series.stack #s, age #= series.name #")
        )
    %>
</div>
</asp:Content>
