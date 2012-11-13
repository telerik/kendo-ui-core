namespace Kendo.Mvc.UI
{
    public class ChartPane
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPane" /> class
        /// with the specified name.
        /// </summary>
        /// <param name="name">The unique pane name.</param>
        public ChartPane(string name)
            : this()
        {
            Name = name;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPane" /> class.
        /// </summary>
        public ChartPane()
        {
            Title = new ChartTitle();
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the unique pane name
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pane height in pixels.
        /// </summary>
        public int? Height
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pane title.
        /// </summary>
        public ChartTitle Title
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the pane margin
        /// </summary>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pane background color
        /// </summary>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pane padding
        /// </summary>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pane border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartPaneSerializer(this);
        }
    }
}