namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring Pane.
    /// </summary>
    public class ChartPaneBuilder : IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPaneBuilder"/> class.
        /// </summary>
        /// <param name="pane">The phart pane.</param>
        public ChartPaneBuilder(ChartPane pane)
        {
            Pane = pane;
        }

        /// <summary>
        /// Gets or sets the Pane.
        /// </summary>
        /// <value>The Pane.</value>
        public ChartPane Pane
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the title of the pane.
        /// </summary>
        /// <param name="title">The pane title.</param>
        public ChartPaneBuilder Title(string title)
        {
            Pane.Title.Text = title;
            return this;
        }

        /// <summary>
        /// Defines the title of the pane.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public ChartPaneBuilder Title(Action<ChartTitleBuilder> configurator)
        {
            configurator(new ChartTitleBuilder(Pane.Title));

            return this;
        }

        /// <summary>
        /// Sets the height of the pane.
        /// </summary>
        /// <param name="height">The pane height.</param>
        public ChartPaneBuilder Height(int height)
        {
            Pane.Height = height;
            return this;
        }

        /// <summary>
        /// Sets the pane background color
        /// </summary>
        /// <param name="background">The background color.</param>       
        public ChartPaneBuilder Background(string background)
        {
            Pane.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the pane margin
        /// </summary>
        /// <param name="top">The pane top margin.</param>
        /// <param name="right">The pane right margin.</param>
        /// <param name="bottom">The pane bottom margin.</param>
        /// <param name="left">The pane left margin.</param>
        public ChartPaneBuilder Margin(int top, int right, int bottom, int left)
        {
            Pane.Margin.Top = top;
            Pane.Margin.Right = right;
            Pane.Margin.Bottom = bottom;
            Pane.Margin.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the pane margin
        /// </summary>
        /// <param name="margin">The pane margin.</param>   
        public ChartPaneBuilder Margin(int margin)
        {
            Pane.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the pane padding
        /// </summary>
        /// <param name="top">The pane top padding.</param>
        /// <param name="right">The pane right padding.</param>
        /// <param name="bottom">The pane bottom padding.</param>
        /// <param name="left">The pane left padding.</param>
        public ChartPaneBuilder Padding(int top, int right, int bottom, int left)
        {
            Pane.Padding.Top = top;
            Pane.Padding.Right = right;
            Pane.Padding.Bottom = bottom;
            Pane.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the pane padding
        /// </summary>
        /// <param name="padding">The pane padding.</param>      
        public ChartPaneBuilder Padding(int padding)
        {
            Pane.Padding = new ChartSpacing(padding);
            return this;
        }

        /// <summary>
        /// Sets the pane border
        /// </summary>
        /// <param name="width">The pane border width.</param>
        /// <param name="color">The pane border color.</param>
        /// <param name="dashType">The pane dash type.</param>  
        public ChartPaneBuilder Border(int width, string color, ChartDashType dashType)
        {
            Pane.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the pane border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartPaneBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Pane.Border));
            return this;
        }
    }
}