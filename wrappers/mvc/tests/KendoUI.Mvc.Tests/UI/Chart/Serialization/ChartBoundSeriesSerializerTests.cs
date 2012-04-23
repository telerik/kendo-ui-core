namespace KendoUI.Mvc.UI.Tests
{
    using System.Collections;
    using Xunit;

    public abstract class ChartBoundSeriesSerializerTests<TSeries, TModel, TValue>
        : ChartSeriesSerializerBaseTests<TSeries>
        where TSeries : ChartBoundSeries<TModel, TValue>
        where TModel : class
    {
        [Fact]
        public void Should_serialize_data_if_set()
        {
            series.Data = new TModel[] { default(TModel) };
            (GetJson(series)["data"] is IEnumerable).ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_data_if_not_set()
        {
            series.Data = null;
            GetJson(series).ContainsKey("data").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_field_if_member_is_set()
        {
            series.Member = "RepSales";
            GetJson(series)["field"].ShouldEqual("RepSales");
        }

        [Fact]
        public void Should_not_serialize_field_if_member_is_not_set()
        {
            series.Member = null;
            GetJson(series).ContainsKey("field").ShouldBeFalse();
        }
    }
}