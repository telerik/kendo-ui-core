namespace Kendo.Mvc.UI.Tests.ColorPicker
{
    using System.IO;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;

    public class ColorPickerSerializationTests
    {
        private readonly ColorPicker colorpicker;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public ColorPickerSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            colorpicker = ColorPickerTestHelper.CreateColorPicker();
            colorpicker.Name = "ColorPicker";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoColorPicker_init()
        {
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#ColorPicker\").kendoColorPicker({});");
        }

        [Fact]
        public void Basic_palette_is_serialized()
        {
            colorpicker.Palette = ColorPickerPalette.Basic;
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"palette\":\"basic\"}");
        }

        [Fact]
        public void WebSafe_palette_is_serialized()
        {
            colorpicker.Palette = ColorPickerPalette.Web;
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"palette\":\"web\"}");
        }
    }
}