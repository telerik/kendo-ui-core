namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class TooltipSerializationTests
    {
        private readonly Tooltip tooltip;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public TooltipSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            tooltip = TooltipTestHelper.CreateTooltip();
            tooltip.Container = "#Tooltip";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoTooltip_init()
        {
            tooltip.Container = "#Tooltip";
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Tooltip\").kendoTooltip({});");
        }

        [Fact]
        public void Sharps_are_escpaed_if_in_client_template()
        {
            tooltip.Container = "#Tooltip";
            output = tooltip.ToClientTemplate().ToHtmlString();            

            output.ShouldContain("jQuery(\"\\#Tooltip\").kendoTooltip({});");
        }

        [Fact]
        public void Sharps_are_escpaed_if_in_client_template_using_template_blocks()
        {
            tooltip.Container = "#foo[#=Tooltip#]";
            output = tooltip.ToClientTemplate().ToHtmlString();

            output.ShouldContain("jQuery(\"\\#foo[#=Tooltip#]\").kendoTooltip({});");
        }

        [Fact]
        public void Filter_is_serialized()
        {
            tooltip.Filter = "foo";
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"filter\":\"foo\"}");
        }

        [Fact]
        public void Filter_with_sharp_is_escaped_when_in_client_template()
        {
            tooltip.Filter = "#foo";
            output = tooltip.ToClientTemplate().ToString();

            output.ShouldContain("{\"filter\":\"\\\\#foo\"}");
        }   

        [Fact]
        public void Position_is_serialized()
        {
            tooltip.Position = TooltipPosition.Top;            
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"position\":\"top\"}");
        }

        [Fact]
        public void Position_is_not_serialized_if_bottom_is_set()
        {
            tooltip.Position = TooltipPosition.Bottom;
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("{\"position\":}");
        } 

        [Fact]
        public void ShowAfter_is_serialized()
        {
            tooltip.ShowAfter = 200;            
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"showAfter\":200}");
        }

        [Fact]
        public void ShowAfter_is_not_serialized_if_not_set()
        {            
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("{\"showAfter\":}");
        }

        [Fact]
        public void Callout_is_serialized()
        {
            tooltip.Callout = false;
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"callout\":false}");
        }

        [Fact]
        public void Callout_is_not_serialized_if_true()
        {
            tooltip.Callout = true;
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("{\"callout\":}");
        }

        [Fact]
        public void AutoHide_is_serialized()
        {
            tooltip.AutoHide = false;
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"autoHide\":false}");
        }

        [Fact]
        public void ShowOn_is_serialized()
        {
            tooltip.ShowOn = TooltipShowOnEvent.Click;
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"showOn\":\"click\"}");
        }
    }    
}