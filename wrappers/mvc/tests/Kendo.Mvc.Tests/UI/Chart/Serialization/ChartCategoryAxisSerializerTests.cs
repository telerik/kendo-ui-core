namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Moq;
    using System.Collections;
    using Xunit;
    using System.Collections.Generic;

    public class ChartCategoryAxisSerializerTests
    {
        private readonly Mock<IChartCategoryAxis> axisMock;
        private readonly ChartCategoryAxisSerializer serializer;

        public ChartCategoryAxisSerializerTests()
        {
            axisMock = new Mock<IChartCategoryAxis>();
            serializer = new ChartCategoryAxisSerializer(axisMock.Object);

            axisMock.SetupGet(a => a.MajorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MinorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MajorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.MinorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.Line).Returns(new ChartLine());
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels());
            axisMock.SetupGet(a => a.PlotBands).Returns(new List<ChartPlotBand<int>>());
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle());
            axisMock.SetupGet(a => a.AutoBaseUnitSteps).Returns(new ChartAxisBaseUnitSteps());
            axisMock.SetupGet(a => a.Crosshair).Returns(new ChartAxisCrosshair());
        }

        [Fact]
        public void Should_serialize_categories()
        {
            axisMock.SetupGet(a => a.Categories).Returns(new string[] { "A", "B" });
            (serializer.Serialize()["categories"] is IEnumerable).ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_date_categories_as_strings()
        {
            axisMock.SetupGet(a => a.Type).Returns(ChartCategoryAxisType.Date);
            axisMock.SetupGet(a => a.Categories).Returns(new DateTime[] { DateTime.Parse("2012/01/01"), DateTime.Parse("2012/01/02") });

            AssertCategories("2012/01/01 00:00:00", "2012/01/02 00:00:00");
        }

        [Fact]
        public void Should_serialize_null_date_categories_as_empty_strings()
        {
            axisMock.SetupGet(a => a.Type).Returns(ChartCategoryAxisType.Date);
            axisMock.SetupGet(a => a.Categories).Returns(new DateTime?[] { DateTime.Parse("2012/01/01"), null });

            AssertCategories("2012/01/01 00:00:00", "");
        }

        [Fact]
        public void Should_serialize_field()
        {
            axisMock.SetupGet(a => a.Member).Returns("RepName");
            axisMock.SetupGet(a => a.Categories).Returns((IEnumerable)null);
            serializer.Serialize()["field"].ShouldEqual("RepName");
        }

        [Fact]
        public void Should_not_serialize_field_if_not_set()
        {
            axisMock.SetupGet(a => a.Member).Returns((string)null);
            axisMock.SetupGet(a => a.Categories).Returns((IEnumerable)null);
            serializer.Serialize().ContainsKey("field").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_field_if_has_categories()
        {
            axisMock.SetupGet(a => a.Member).Returns("RepName");
            axisMock.SetupGet(a => a.Categories).Returns(new string[] { "A", "B" });
            serializer.Serialize().ContainsKey("field").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_majorGridLines_if_not_set()
        {
            serializer.Serialize().ContainsKey("majorGridLines").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_majorGridLines_if_set()
        {
            axisMock.SetupGet(a => a.MajorGridLines).Returns(
                new ChartLine(1, "white", ChartDashType.Dot, true)
            );

            serializer.Serialize().ContainsKey("majorGridLines").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_minorGridLines_if_not_set()
        {
            serializer.Serialize().ContainsKey("minorGridLines").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_minorGridLines_if_set()
        {
            axisMock.SetupGet(a => a.MinorGridLines).Returns(
                new ChartLine(1, "white", ChartDashType.Dot, true)
            );

            serializer.Serialize().ContainsKey("minorGridLines").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_labels_if_not_set()
        {
            serializer.Serialize().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_labels_if_set()
        {
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels() { Color = "Red" });

            serializer.Serialize().ContainsKey("labels").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_visible_if_set()
        {
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels() { Visible = false });

            serializer.Serialize().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_PlotBands_if_not_set()
        {
            serializer.Serialize().ContainsKey("plotBands").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_PlotBands_if_set()
        {
            var data = new List<ChartPlotBand<int>>();
            data.Add(new ChartPlotBand<int>() { Color = "red" });
            axisMock.SetupGet(a => a.PlotBands).Returns(data);

            serializer.Serialize().ContainsKey("plotBands").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_Title_if_not_set()
        {
            serializer.Serialize().ContainsKey("title").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Title_if_set()
        {
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle() { Color = "Red" });

            serializer.Serialize().ContainsKey("title").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_Type_if_set()
        {
            axisMock.SetupGet(a => a.Type).Returns(ChartCategoryAxisType.Date);

            serializer.Serialize()["type"].ShouldEqual("Date");
        }

        [Fact]
        public void Should_not_serialize_Type_if_not_set()
        {
            serializer.Serialize().ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_BaseUnit_if_set()
        {
            axisMock.SetupGet(a => a.BaseUnit).Returns(ChartAxisBaseUnit.Years);

            serializer.Serialize()["baseUnit"].ShouldEqual("years");
        }

        [Fact]
        public void Should_not_serialize_BaseUnit_if_not_set()
        {
            serializer.Serialize().ContainsKey("baseUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_BaseUnitStep_if_set()
        {
            axisMock.SetupGet(a => a.BaseUnitStep).Returns(4);

            serializer.Serialize()["baseUnitStep"].ShouldEqual(4);
        }

        [Fact]
        public void Should_serialize_BaseUnitStep_auto_if_set_to_0()
        {
            axisMock.SetupGet(a => a.BaseUnitStep).Returns(0);

            serializer.Serialize()["baseUnitStep"].ShouldEqual("auto");
        }

        [Fact]
        public void Should_not_serialize_BaseUnitStep_if_not_set()
        {
            serializer.Serialize().ContainsKey("baseUnitStep").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_MaxDateGroups_if_set()
        {
            axisMock.SetupGet(a => a.MaxDateGroups).Returns(4);

            serializer.Serialize()["maxDateGroups"].ShouldEqual(4);
        }

        [Fact]
        public void Should_not_serialize_MaxDateGroups_if_not_set()
        {
            serializer.Serialize().ContainsKey("maxDateGroups").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_RoundToBaseUnit()
        {
            axisMock.SetupGet(a => a.RoundToBaseUnit).Returns(false);
            serializer.Serialize()["roundToBaseUnit"].ShouldEqual(false);
        }

        [Fact]
        public void Should_not_serialize_RoundToBaseUnit_if_not_set()
        {
            axisMock.SetupGet(a => a.RoundToBaseUnit).Returns((bool?)null);
            serializer.Serialize().ContainsKey("roundToBaseUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Justified()
        {
            axisMock.SetupGet(a => a.Justified).Returns(false);
            serializer.Serialize()["justified"].ShouldEqual(false);
        }

        [Fact]
        public void Should_not_serialize_Justified_if_not_set()
        {
            axisMock.SetupGet(a => a.Justified).Returns((bool?)null);
            serializer.Serialize().ContainsKey("justified").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_AutoBaseUnitSteps()
        {
            axisMock.SetupGet(a => a.AutoBaseUnitSteps).Returns(new ChartAxisBaseUnitSteps { Hours = new int[] { 1, 2 } });
            ((Dictionary<string, object>)((Dictionary<string, object>)(serializer.Serialize()))["autoBaseUnitSteps"])["hours"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Should_not_serialize_AutoBaseUnitSteps_if_not_set()
        {
            serializer.Serialize().ContainsKey("autoBaseUnitSteps").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Min_if_set()
        {
            axisMock.SetupGet(a => a.Min).Returns(DateTime.Parse("2012/01/01"));

            serializer.Serialize()["min"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_Min_if_not_set()
        {
            serializer.Serialize().ContainsKey("min").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Max_if_set()
        {
            axisMock.SetupGet(a => a.Max).Returns(DateTime.Parse("2012/01/01"));

            serializer.Serialize()["max"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_Max_if_not_set()
        {
            serializer.Serialize().ContainsKey("max").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_AxisCrossingValues()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new double[10]);
            serializer.Serialize()["axisCrossingValue"].ShouldEqual(new double[10]);
        }

        [Fact]
        public void Should_not_serialize_AxisCrossingValue_if_not_set()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new double[] { });
            serializer.Serialize().ContainsKey("axisCrossingValues").ShouldBeFalse();
        }

        private void AssertCategories(params string[] categories)
        {
            var expectedCategories = new Queue<string>(categories);

            var categoryStrings = (IEnumerable<string>)serializer.Serialize()["categories"];
            foreach (string category in categoryStrings)
            {
                category.ShouldEqual(expectedCategories.Dequeue());
            }
        }
    }
}