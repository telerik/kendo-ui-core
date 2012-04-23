// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the chart title
    /// </summary>
    public class ChartTitle
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartTitle" /> class.
        /// </summary>
        public ChartTitle()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the title text
        /// </summary>
        public string Text
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title font.
        /// </summary>
        /// <value>
        /// Specify a font in CSS format. For example "16px Arial,Helvetica,sans-serif".
        /// </value>
        public string Font
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title position.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartTitlePosition.Top"/>
        /// </remarks>
        public ChartTitlePosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title text alignment.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartTextAlignment.Center"/>
        /// </remarks>
        public ChartTextAlignment? Align
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the title is visible
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title margin
        /// </summary>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title background color
        /// </summary>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title padding
        /// </summary>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartTitleSerializer(this);
        }
    }
}