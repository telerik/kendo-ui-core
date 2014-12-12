namespace Kendo.Mvc.UI
{
    public abstract class ChartLabels : IChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLabels" /> class.
        /// </summary>
        protected ChartLabels()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the label font.
        /// </summary>
        /// <value>
        /// Specify a font in CSS format. For example "12px Arial,Helvetica,sans-serif".
        /// </value>
        public string Font
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the label is visible
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label background.
        /// </summary>
        /// <value>
        /// The label background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label border.
        /// </summary>
        /// <value>
        /// The label border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label margin.
        /// </summary>
        /// <value>
        /// The label margin.
        /// </value>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label padding.
        /// </summary>
        /// <value>
        /// The label padding.
        /// </value>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label color.
        /// </summary>
        /// <value>
        /// The label color.
        /// </value>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a Function that returns the JavaScript handler for the labels color.
        /// </summary>
        /// <value>
        /// The Function.
        /// </value>
        public ClientHandlerDescriptor ColorHandler
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label format.
        /// </summary>
        /// <value>
        /// The label format.
        /// </value>
        public string Format
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label template.
        /// </summary>
        /// <value>
        /// The label template.
        /// </value>
        public string Template
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label opacity.
        /// </summary>
        /// <value>
        /// The label opacity.
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the label rotation.
        /// </summary>
        /// <value>
        /// The label opacity.
        /// </value>
        public double? Rotation
        {
            get;
            set;
        }

        public abstract IChartSerializer CreateSerializer();
    }
}