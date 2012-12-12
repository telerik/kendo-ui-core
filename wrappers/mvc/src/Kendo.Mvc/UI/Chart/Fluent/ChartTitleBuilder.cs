namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartTitle"/>.
    /// </summary>
    public class ChartTitleBuilder : IHideObjectMembers
    {
        private readonly ChartTitle title;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartTitleBuilder" /> class.
        /// </summary>
        /// <param name="chartTitle">The chart title.</param>
        public ChartTitleBuilder(ChartTitle chartTitle)
        {
            title = chartTitle;
        }

        /// <summary>
        /// Sets the title text
        /// </summary>
        /// <param name="text">The text title.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Text("Chart"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Text(string text)
        {
            title.Text = text;
            return this;
        }

        /// <summary>
        /// Sets the title font
        /// </summary>
        /// <param name="font">The title font (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Font("16px Arial,Helvetica,sans-serif"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Font(string font)
        {
            title.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the title color
        /// </summary>
        /// <param name="color">The title color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Color("#ff0000").Text("Title"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Color(string color)
        {
            title.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the title background color
        /// </summary>
        /// <param name="background">The background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Background("red"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Background(string background)
        {
            title.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the title position
        /// </summary>
        /// <param name="position">The title position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Position(ChartTitlePosition.Bottom))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Position(ChartTitlePosition position)
        {
            title.Position = position;
            return this;
        }

        /// <summary>
        /// Sets the title alignment
        /// </summary>
        /// <param name="align">The title alignment.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Align(ChartTextAlignment.Left))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Align(ChartTextAlignment align)
        {
            title.Align = align;
            return this;
        }

        /// <summary>
        /// Sets the title visibility
        /// </summary>
        /// <param name="visible">The title visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Visible(false))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Visible(bool visible)
        {
            title.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the title margin
        /// </summary>
        /// <param name="top">The title top margin.</param>
        /// <param name="right">The title right margin.</param>
        /// <param name="bottom">The title bottom margin.</param>
        /// <param name="left">The title left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Margin(20))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Margin(int top, int right, int bottom, int left)
        {
            title.Margin.Top = top;
            title.Margin.Right = right;
            title.Margin.Bottom = bottom;
            title.Margin.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the title margin
        /// </summary>
        /// <param name="margin">The title margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Margin(20))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Margin(int margin)
        {
            title.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the title padding
        /// </summary>
        /// <param name="top">The title top padding.</param>
        /// <param name="right">The title right padding.</param>
        /// <param name="bottom">The title bottom padding.</param>
        /// <param name="left">The title left padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Padding(20))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Padding(int top, int right, int bottom, int left)
        {
            title.Padding.Top = top;
            title.Padding.Right = right;
            title.Padding.Bottom = bottom;
            title.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the title padding
        /// </summary>
        /// <param name="padding">The title padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Padding(20))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Padding(int padding)
        {
            title.Padding = new ChartSpacing(padding);
            return this;
        }

        /// <summary>
        /// Sets the title border
        /// </summary>
        /// <param name="width">The title border width.</param>
        /// <param name="color">The title border color.</param>
        /// <param name="dashType">The title dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Title(title => title.Border(1, "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTitleBuilder Border(int width, string color, ChartDashType dashType)
        {
            title.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the plot area border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartTitleBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(title.Border));
            return this;
        }
    }
}