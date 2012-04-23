// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents chart line markers styling
    /// </summary>
    public class ChartMarkers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartMarkers" /> class.
        /// </summary>
        public ChartMarkers()
        {
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the markers size.
        /// </summary>
        public int? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers background.
        /// </summary>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers type.
        /// </summary>
        public ChartMarkerShape? Type
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the markers border.
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
            return new ChartLineMarkersSerializer(this);
        }
    }
}