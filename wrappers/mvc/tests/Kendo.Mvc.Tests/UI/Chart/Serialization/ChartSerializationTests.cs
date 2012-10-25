namespace Kendo.Mvc.UI.Tests.Chart
{
    using Moq;
    using System.IO;
    using System.Web.Routing;
    using Kendo.Mvc;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartSerializationTests
    {
        private readonly Chart<SalesData> chart;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public ChartSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            var urlGeneratorMock = new Mock<IUrlGenerator>();
            urlGeneratorMock.Setup(g => g.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>()))
                .Returns<RequestContext, INavigatable>(
                    (context, navigatable) => 
                        navigatable.Url ?? navigatable.ControllerName + "/" + navigatable.ActionName
                );

            chart = ChartTestHelper.CreateChart<SalesData>(urlGeneratorMock.Object);
            chart.Name = "Chart";
        }

        [Fact]
        public void Default_configuration_outputs_empty_tChart_init()
        {
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Chart\").kendoChart({});");
        }

        [Fact]
        public void Title_serialized()
        {
            chart.Title.Text = "Title";
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"title\":{\"text\":\"Title\"}}");
        }

        [Fact]
        public void AutoBind_true_serialized()
        {
            chart.AutoBind = false;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"autoBind\":false}");
        }

        [Fact]
        public void AutoBind_false_serialized()
        {
            chart.AutoBind = true;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"autoBind\":true}");
        }

        [Fact]
        public void AutoBind_default_not_serialized()
        {
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("autoBind");
        }

        [Fact]
        public void Legend_serialized()
        {
            chart.Legend.Visible = false;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"legend\":{\"visible\":false}}");
        }

        [Fact]
        public void OnDataBound_client_side_event_serialized()
        {
            chart.Events["dataBound"] = new ClientHandlerDescriptor() { HandlerName = "dataBoundHandler" };
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"dataBound\":dataBoundHandler}");
        }

        [Fact]
        public void OnSeriesClick_client_side_event_serialized()
        {
            chart.Events["seriesClick"] = new ClientHandlerDescriptor() { HandlerName = "seriesClickHandler" };
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"seriesClick\":seriesClickHandler}");
        }

        [Fact]
        public void Series_should_be_serialized_when_defined()
        {
            chart.Series.Add(new ChartBarSeries<SalesData, decimal>(s => s.RepSales, null));
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"series\":[{\"name\":\"Rep Sales\",\"type\":\"bar\",\"field\":\"RepSales\"}]}");
        }

        [Fact]
        public void SeriesDefaults_should_be_serialized_when_set() 
        {
            chart.SeriesDefaults.Bar.Gap = 4;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"seriesDefaults\":{\"bar\":{\"gap\":4}}}");
        }

        [Fact]
        public void CategoryAxis_should_be_serialized_when_categories_are_defined()
        {
            chart.CategoryAxis.Categories = new string[] { "A" };
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"categoryAxis\":{\"categories\":[\"A\"]}}");
        }

        [Fact]
        public void CategoryAxis_should_be_serialized_when_bound()
        {
            chart.CategoryAxis.Member = "RepName";
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"categoryAxis\":{\"field\":\"RepName\"}}");
        }

        [Fact]
        public void ValueAxis_should_be_serialized()
        {
            var numericAxis = new ChartNumericAxis<SalesData>(chart);
            numericAxis.Min = 1;
            chart.ValueAxes.Add(numericAxis);
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"valueAxis\":[{\"min\":1}]}");
        }

        [Fact]
        public void Multiple_ValueAxes_should_be_serialized()
        {
            chart.ValueAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "sec" });
            chart.ValueAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "tri" });
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"valueAxis\":[{\"name\":\"sec\"},{\"name\":\"tri\"}]}");
        }

        [Fact]
        public void XAxis_should_be_serialized()
        {
            var numericAxis = new ChartNumericAxis<SalesData>(chart);
            numericAxis.Name = "X Axis";
            chart.XAxes.Add(numericAxis);
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"xAxis\":[{\"name\":\"X Axis\"}]}");
        }

        [Fact]
        public void Multiple_XAxis_should_be_serialized()
        {
            chart.XAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "sec" });
            chart.XAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "tri" });
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"xAxis\":[{\"name\":\"sec\"},{\"name\":\"tri\"}]}");
        }

        [Fact]
        public void YAxis_should_be_serialized()
        {
            var numericAxis = new ChartNumericAxis<SalesData>(chart);
            numericAxis.Name = "Y Axis";
            chart.YAxes.Add(numericAxis);
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"yAxis\":[{\"name\":\"Y Axis\"}]}");
        }

        [Fact]
        public void Multiple_YAxis_should_be_serialized()
        {
            chart.YAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "sec" });
            chart.YAxes.Add(new ChartNumericAxis<SalesData>(chart) { Name = "tri" });
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"yAxis\":[{\"name\":\"sec\"},{\"name\":\"tri\"}]}");
        }

        [Fact]
        public void DataBinding_should_be_serialized_when_using_Server_binding()
        {
            chart.Data = new SalesData[] { new SalesData() };
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"data\":[{\"RepName\":null,\"DateString\":null,\"Date\":\"\\/Date(-62135596800000)\\/\",\"TotalSales\":0,\"RepSales\":0,\"Explode\":false,\"VisibleInLegend\":false,\"Color\":null}]");
        }

        [Fact]
        public void DataSource_should_be_serialized_when_using_Ajax_binding()
        {
            chart.DataSource.Transport.Read.Url = "/Action";
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"dataSource\":{\"transport\":{\"read\":{\"url\":\"/Action\",\"type\":\"POST\"}}");
        }

        [Fact]
        public void SeriesColors_should_be_serialized()
        {
            chart.SeriesColors = new string[] { "red", "green", "blue" };
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"seriesColors\":[\"red\",\"green\",\"blue\"]}");
        }

        [Fact]
        public void Tooltip_should_be_serialized()
        {
            chart.Tooltip.Visible = true;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"tooltip\":{\"visible\":true}}");
        }

        [Fact]
        public void Transitions_serialized()
        {
            chart.Transitions = false;
            chart.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"transitions\":false}");
        }
    }
}