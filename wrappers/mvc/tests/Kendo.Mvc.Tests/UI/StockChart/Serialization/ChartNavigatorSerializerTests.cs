namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System;

    public class ChartNavigatorSerializerTests
    {
        private readonly ChartNavigator<OHLCData> navigator;
        private readonly ChartNavigatorSerializer<OHLCData> serializer;

        public ChartNavigatorSerializerTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var viewContext = TestHelper.CreateViewContext();
            navigator = new ChartNavigator<OHLCData>(viewContext, urlGeneratorMock.Object);
            serializer = new ChartNavigatorSerializer<OHLCData>(navigator);
        }

        [Fact]
        public void Should_serialize_AutoBind()
        {
            navigator.AutoBind = true;
            serializer.Serialize()["autoBind"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_AutoBind_if_not_set()
        {
            serializer.Serialize().ContainsKey("autoBind").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_DataSource()
        {
            navigator.DataSource.Transport.Read.Url = "read";
            serializer.Serialize().Keys.ShouldContain("dataSource");
        }

        [Fact]
        public void Should_serialize_DateField()
        {
            navigator.DateField = "date";
            serializer.Serialize()["dateField"].ShouldEqual("date");
        }

        [Fact]
        public void Should_not_serialize_DateField_if_not_set()
        {
            serializer.Serialize().ContainsKey("dateField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Hint_if_visible()
        {
            navigator.Hint.Visible = true;
            serializer.Serialize().Keys.ShouldContain("hint");
        }

        [Fact]
        public void Should_not_serialize_Hint_if_not_visible()
        {
            serializer.Serialize().ContainsKey("hint").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Select()
        {
            navigator.Select.From = DateTime.Now;
            serializer.Serialize().Keys.ShouldContain("select");
        }

        [Fact]
        public void Should_not_serialize_Select_if_not_set()
        {
            serializer.Serialize().ContainsKey("select").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Series()
        {
            navigator.Series.Add(new ChartOHLCSeries<OHLCData, decimal>());
            serializer.Serialize().Keys.ShouldContain("series");
        }

        [Fact]
        public void Should_not_serialize_Series_if_not_set()
        {
            serializer.Serialize().ContainsKey("series").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Visible()
        {
            navigator.Visible = true;
            serializer.Serialize().Keys.ShouldContain("visible");
        }

        [Fact]
        public void Should_not_serialize_Visible_if_not_set()
        {
            serializer.Serialize().ContainsKey("visible").ShouldBeFalse();
        }
    }
}