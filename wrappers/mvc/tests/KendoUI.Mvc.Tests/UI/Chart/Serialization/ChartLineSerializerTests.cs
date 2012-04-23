namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;

    public class ChartLineSerializerTests
    {
        private readonly ChartLine line;
        private readonly ChartLineSerializer serializer;

        public ChartLineSerializerTests()
        {
            line = new ChartLine();
            serializer = new ChartLineSerializer(line);
        }

        [Fact]
        public void Should_serialize_width()
        {
            line.Width = 1;
            serializer.Serialize()["width"].ShouldEqual(1);
        }

        [Fact]
        public void Should_not_serialize_width_if_not_set()
        {
            serializer.Serialize().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_color()
        {
            line.Color = "#f00";
            serializer.Serialize()["color"].ShouldEqual("#f00");
        }

        [Fact]
        public void Should_not_serialize_color_if_not_set()
        {
            serializer.Serialize().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_dashType()
        {
            line.DashType = ChartDashType.Solid;
            serializer.Serialize()["dashType"].ShouldEqual("solid");
        }

        [Fact]
        public void Should_not_serialize_dashType_if_not_set()
        {
            serializer.Serialize().ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_visible()
        {
            line.Visible = false;
            serializer.Serialize()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Should_not_serialize_visible_if_not_set()
        {
            serializer.Serialize().ContainsKey("visible").ShouldBeFalse();
        }
    }
}