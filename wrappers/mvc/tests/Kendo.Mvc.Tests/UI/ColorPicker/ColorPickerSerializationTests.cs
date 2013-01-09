namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;
    using System.Collections.Generic;

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
            colorpicker.Palette = ColorPickerPalette.WebSafe;
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"palette\":\"websafe\"}");
        }

        [Fact]
        public void Arbitrary_palette_is_serialized()
        {
            colorpicker.PaletteColors = new List<string>() { "ff0000", "00ff00", "0000ff" };
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"palette\":[\"ff0000\",\"00ff00\",\"0000ff\"]}");
        }

        [Fact]
        public void Opacity_is_serialized()
        {
            colorpicker.Opacity = true;
            colorpicker.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"opacity\":true}");
        }
    }
}