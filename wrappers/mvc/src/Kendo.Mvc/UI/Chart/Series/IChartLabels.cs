namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;

    public interface IChartLabels
    {
        /// <summary>
        /// Gets or sets the label font.
        /// </summary>
        string Font { get; set; }

        /// <summary>
        /// Gets or sets a value indicating if the label is visible
        /// </summary>
        bool? Visible { get; set; }

        /// <summary>
        /// Gets or sets the label background.
        /// </summary>
        string Background { get; set; }

        /// <summary>
        /// Gets or sets the label border.
        /// </summary>
        ChartElementBorder Border { get; set; }

        /// <summary>
        /// Gets or sets the label margin.
        /// </summary>
        ChartSpacing Margin { get; set; }

        /// <summary>
        /// Gets or sets the label padding.
        /// </summary>
        ChartSpacing Padding { get; set; }

        /// <summary>
        /// Gets or sets the label color.
        /// </summary>
        string Color { get; set; }

        /// <summary>
        /// Gets or sets a Function that returns the JavaScript handler for the labels color.
        /// </summary>
        ClientHandlerDescriptor ColorHandler { get; set; }

        /// <summary>
        /// Gets or sets the label format.
        /// </summary>
        string Format { get; set; }

        /// <summary>
        /// Gets or sets the label template.
        /// </summary>
        string Template { get; set; }

        /// <summary>
        /// Gets or sets the label opacity.
        /// </summary>
        double? Opacity { get; set; }

        /// <summary>
        /// Gets or sets the label rotation.
        /// </summary>
        double? Rotation { get; set; }

        IChartSerializer CreateSerializer();
    }
}