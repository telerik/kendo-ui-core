namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartRangeBarLabelsBuilderTests
    {
        private readonly ChartRangeBarLabels labels;
        private readonly ChartRangeBarLabelsBuilder builder;

        public ChartRangeBarLabelsBuilderTests()
        {
            labels = new ChartRangeBarLabels();
            builder = new ChartRangeBarLabelsBuilder(labels);
        }

        [Fact]
        public void Font_sets_Font()
        {
            builder.Font("Font");
            labels.Font.ShouldEqual("Font");
        }

        [Fact]
        public void Visible_sets_Visible()
        {
            builder.Visible(false);
            labels.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            labels.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Blue");
            labels.Background.ShouldEqual("Blue");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            labels.Margin.Top.ShouldEqual(20);
            labels.Margin.Right.ShouldEqual(20);
            labels.Margin.Bottom.ShouldEqual(20);
            labels.Margin.Left.ShouldEqual(20);

            builder.Margin(1, 2, 3, 4);
            labels.Margin.Top.ShouldEqual(1);
            labels.Margin.Right.ShouldEqual(2);
            labels.Margin.Bottom.ShouldEqual(3);
            labels.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Padding_sets_paddings()
        {
            builder.Padding(20);
            labels.Padding.Top.ShouldEqual(20);
            labels.Padding.Right.ShouldEqual(20);
            labels.Padding.Bottom.ShouldEqual(20);
            labels.Padding.Left.ShouldEqual(20);

            builder.Padding(1, 2, 3, 4);
            labels.Padding.Top.ShouldEqual(1);
            labels.Padding.Right.ShouldEqual(2);
            labels.Padding.Bottom.ShouldEqual(3);
            labels.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            labels.Border.Color.ShouldEqual("red");
            labels.Border.Width.ShouldEqual(1);
            labels.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            labels.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Format_sets_format()
        {
            builder.Format("{0:C}");
            labels.Format.ShouldEqual("{0:C}");
        }

        [Fact]
        public void Template_sets_template()
        {
            builder.Template("<# CustomerID #>");
            labels.Template.ShouldEqual("<# CustomerID #>");
        }

        [Fact]
        public void Opacity_sets_Opacity()
        {
            builder.Opacity(0.5);
            labels.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void From_Visibility_overrides_Default_Visibility()
        {
            builder.Visible(true);

            builder.From(false);

            labels.From.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void To_Visibility_overrides_Default_Visibility()
        {
            builder.Visible(true);

            builder.To(false);

            labels.To.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void From_Configurator_Visibility_overrides_Default_Visibility()
        {
            builder.Visible(true);

            builder.From(f => f.Visible(false));

            labels.From.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void To_Configurator_Visibility_overrides_Default_Visibility()
        {
            builder.Visible(true);

            builder.To(t => t.Visible(false));

            labels.To.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void From_Configurator_Sets_Format()
        {
            builder.From(f => f.Format("{0}"));

            labels.From.Format.ShouldEqual("{0}");
        }

        [Fact]
        public void To_Configurator_Sets_Format()
        {
            builder.To(f => f.Format("{0}"));

            labels.To.Format.ShouldEqual("{0}");
        }

        [Fact]
        public void From_Configurator_Overrides_Default_Format()
        {
            builder.Format("{0}");

            builder.From(f => f.Format("{0:C}"));

            labels.From.Format.ShouldEqual("{0:C}");
        }

        [Fact]
        public void To_Configurator_Overrides_Default_Format()
        {
            builder.Format("{0}");

            builder.To(f => f.Format("{0:C}"));

            labels.To.Format.ShouldEqual("{0:C}");
        }
        
        [Fact]
        public void From_Configurator_Sets_Template()
        {
            builder.From(f => f.Template("from"));

            labels.From.Template.ShouldEqual("from");
        }

        [Fact]
        public void To_Configurator_Sets_Template()
        {
            builder.To(f => f.Template("to"));

            labels.To.Template.ShouldEqual("to");
        }

        [Fact]
        public void From_Configurator_Overrides_Default_Template()
        {
            builder.Template("default");

            builder.From(f => f.Template("from"));

            labels.From.Template.ShouldEqual("from");
        }

        [Fact]
        public void To_Configurator_Overrides_Default_Template()
        {
            builder.Template("default");

            builder.To(f => f.Template("to"));

            labels.To.Template.ShouldEqual("to");
        }

        [Fact]
        public void Common_Template_Applies_As_From_Template()
        {
            builder.Template("default");

            labels.From.Template.ShouldBeNull();
        }

        [Fact]
        public void Common_Template_Applies_As_To_Template()
        {
            builder.Template("default");

            labels.To.Template.ShouldBeNull();
        }

        [Fact]
        public void Common_Template_Applies_As_From_Format()
        {
            builder.Template("default");

            labels.From.Format.ShouldBeNull();
        }

        [Fact]
        public void Common_Template_Applies_As_To_Format()
        {
            builder.Template("default");

            labels.To.Format.ShouldBeNull();
        }
    }
}
