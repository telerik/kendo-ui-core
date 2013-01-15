namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using System;

    public class ChartNavigatorHintSerializerTests
    {
        private readonly ChartNavigatorHint hint;
        private readonly ChartNavigatorHintSerializer serializer;

        public ChartNavigatorHintSerializerTests()
        {
            hint = new ChartNavigatorHint();
            serializer = new ChartNavigatorHintSerializer(hint);
        }

        [Fact]
        public void Should_serialize_Format()
        {
            hint.Format = "{0}";
            serializer.Serialize()["format"].ShouldEqual("{0}");
        }

        [Fact]
        public void Should_not_serialize_Format_if_not_set()
        {
            serializer.Serialize().ContainsKey("format").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Template()
        {
            hint.Template = "hint";
            serializer.Serialize()["template"].ShouldEqual("hint");
        }

        [Fact]
        public void Should_not_serialize_Template_if_not_set()
        {
            serializer.Serialize().ContainsKey("template").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Visible()
        {
            hint.Visible = true;
            serializer.Serialize().Keys.ShouldContain("visible");
        }

        [Fact]
        public void Should_not_serialize_Visible_if_not_set()
        {
            serializer.Serialize().ContainsKey("visible").ShouldBeFalse();
        }
    }
}