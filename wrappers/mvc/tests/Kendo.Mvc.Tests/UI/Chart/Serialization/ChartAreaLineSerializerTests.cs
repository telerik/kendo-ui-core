namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class ChartAreaLineSerializerTests
    {
        private readonly ChartAreaLine line;
        private readonly ChartAreaLineSerializer serializer;

        public ChartAreaLineSerializerTests()
        {
            line = new ChartAreaLine();
            serializer = new ChartAreaLineSerializer(line);
        }

        [Fact]
        public void Should_serialize_style()
        {
            line.Style = ChartAreaStyle.Smooth;
            serializer.Serialize()["style"].ShouldEqual("smooth");
        }

        [Fact]
        public void Should_not_serialize_style_if_not_set()
        {
            serializer.Serialize().ContainsKey("style").ShouldBeFalse();
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