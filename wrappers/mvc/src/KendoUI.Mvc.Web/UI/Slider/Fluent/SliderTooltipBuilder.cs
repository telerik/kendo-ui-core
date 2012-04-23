// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.Infrastructure;
    using System.Web;

    public class SliderTooltipBuilder : IHideObjectMembers
    {
        private readonly SliderTooltipSettings settings;

        public SliderTooltipBuilder(SliderTooltipSettings settings)
        {
            Guard.IsNotNull(settings, "settings");

            this.settings = settings;
        }

        /// <summary>Gets or sets the format for displaying the value in the tooltip.</summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Slider()
        ///             .Name("Slider")
        ///             .Tooltip(tooltip => tooltip.Format("{0:P"))
        /// %&gt;
        /// </code>
        /// </example>
        public SliderTooltipBuilder Format(string value)
        {
            // Doing the UrlDecode to allow {0} in ActionLink e.g. Html.ActionLink("Index", "Home", new { id = "{0}" })
            settings.Format = HttpUtility.UrlDecode(value);

            return this;
        }

        /// <summary>Display tooltip while drag.</summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Slider()
        ///             .Name("Slider")
        ///             .Tooltip(tooltip => tooltip.Enable(false))
        /// %&gt;
        /// </code>
        /// </example>
        public SliderTooltipBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}