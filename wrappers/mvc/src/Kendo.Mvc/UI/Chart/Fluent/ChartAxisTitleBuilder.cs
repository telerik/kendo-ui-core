namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartAxisTitle"/>.
    /// </summary>
    public class ChartAxisTitleBuilder : IHideObjectMembers
    {
        private readonly ChartAxisTitle title;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisTitleBuilder" /> class.
        /// </summary>
        /// <param name="title">The chart axis title.</param>
        public ChartAxisTitleBuilder(ChartAxisTitle title)
        {
            this.title = title;
        }

        /// <summary>
        /// Sets the axis title text.
        /// </summary>
        /// <param name="text">The text of the axis title.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Text("Axis")
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Text(string text)
        {
            title.Text = text;
            return this;
        }

        /// <summary>
        /// Sets the axis title font.
        /// </summary>
        /// <param name="font">The axis title font (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Font("16px Arial,Helvetica,sans-serif")
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Font(string font)
        {
            title.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the axis title background color.
        /// </summary>
        /// <param name="background">The axis background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Background("red")
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Background(string background)
        {
            title.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the axis title text color.
        /// </summary>
        /// <param name="color">The axis text color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Color("red")
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Color(string color)
        {
            title.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the axis title position.
        /// </summary>
        /// <param name="position">The axis title position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Position(ChartTitlePosition.Center)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Position(ChartAxisTitlePosition position)
        {
            title.Position = position;
            return this;
        }

        /// <summary>
        /// Sets the axis title margin.
        /// </summary>
        /// <param name="top">The axis title top margin.</param>
        /// <param name="right">The axis title right margin.</param>
        /// <param name="bottom">The axis title bottom margin.</param>
        /// <param name="left">The axis title left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Margin(20, 20, 20, 20)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Margin(int top, int right, int bottom, int left)
        {
            title.Margin.Top = top;
            title.Margin.Right = right;
            title.Margin.Bottom = bottom;
            title.Margin.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the axis title margin.
        /// </summary>
        /// <param name="margin">The axis title margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Margin(20)
        ///               );
        ///           )
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Margin(int margin)
        {
            title.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the axis title padding.
        /// </summary>
        /// <param name="top">The axis title top padding.</param>
        /// <param name="right">The axis title right padding.</param>
        /// <param name="bottom">The axis title bottom padding.</param>
        /// <param name="left">The axis title left padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Padding(20, 20, 20, 20)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Padding(int top, int right, int bottom, int left)
        {
            title.Padding.Top = top;
            title.Padding.Right = right;
            title.Padding.Bottom = bottom;
            title.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the axis title padding
        /// </summary>
        /// <param name="padding">The axis title padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Padding(20)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Padding(int padding)
        {
            title.Padding = new ChartSpacing(padding);
            return this;
        }

        /// <summary>
        /// Sets the axis title border
        /// </summary>
        /// <param name="width">The axis title border width.</param>
        /// <param name="color">The axis title border color.</param>
        /// <param name="dashType">The axis title dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Border(1, "#000", ChartDashType.Dot)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTitleBuilder Border(int width, string color, ChartDashType dashType)
        {
            title.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the title border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartAxisTitleBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(title.Border));
            return this;
        }

        /// <summary>
        /// Sets the axis title opacity.
        /// </summary>
        /// <param name="opacity">
        /// The series opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Title(title => title
        ///                   .Opacity(0.5)
        ///               );
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAxisTitleBuilder Opacity(double opacity)
        {
            title.Opacity = opacity;

            return this;
        }
    }
}