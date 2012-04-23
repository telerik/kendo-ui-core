// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// Defines a generic Chart labels
    /// </summary>
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

        /// <summary>
        /// Gets the axis serializer.
        /// </summary>
        IChartSerializer CreateSerializer();
    }
}