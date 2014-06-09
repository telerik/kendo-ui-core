namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the chart labels.
    /// </summary>
    public class ChartLegendLabelsBuilder : IHideObjectMembers
    {
        private readonly ChartLegendLabels labels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLegendLabelsBuilder{TBuilder}" /> class.
        /// </summary>
        /// <param name="legendLabels">The labels configuration.</param>
        public ChartLegendLabelsBuilder(ChartLegendLabels legendLabels)
        {
            labels = legendLabels;
        }

        /// <summary>
        /// Sets the labels font
        /// </summary>
        /// <param name="font">The labels font (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Legend(legend => legend
        ///                 .Labels(labels => labels
        ///                     .Font("14px Arial,Helvetica,sans-serif")
        ///                 )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendLabelsBuilder Font(string font)
        {
            labels.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the labels text color
        /// </summary>
        /// <param name="color">The labels text color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Legend(legend => legend
        ///                 .Labels(labels => labels
        ///                     .Color("Red")
        ///                 )
        ///           )    
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendLabelsBuilder Color(string color)
        {
            labels.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the labels template.
        /// </summary>
        /// <param name="template">The labels template.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Legend(legend => legend
        ///                 .Labels(labels => labels
        ///                     .Template("${TotalSales}")
        ///                 )
        ///           )          
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendLabelsBuilder Template(string template)
        {
            labels.Template = template;
            return this;
        }

        /// <summary>
        /// Sets the labels padding
        /// </summary>
        /// <param name="top">The labels top padding.</param>
        /// <param name="right">The labels right padding.</param>
        /// <param name="bottom">The labels bottom padding.</param>
        /// <param name="left">The labels left padding.</param>     
        public ChartLegendLabelsBuilder Padding(int top, int right, int bottom, int left)
        {
            labels.Padding.Top = top;
            labels.Padding.Right = right;
            labels.Padding.Bottom = bottom;
            labels.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the labels padding
        /// </summary>
        /// <param name="padding">The labels padding.</param>      
        public ChartLegendLabelsBuilder Padding(int padding)
        {
            labels.Padding = new ChartSpacing(padding);
            return this;
        }
    }
}