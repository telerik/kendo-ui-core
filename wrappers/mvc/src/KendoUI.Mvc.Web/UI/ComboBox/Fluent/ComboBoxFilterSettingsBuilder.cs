// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for building <see cref="ComboBoxFilterSettingsBuilder"/>
    /// </summary>
    public class ComboBoxFilterSettingsBuilder
    {
        private ComboBoxFilterSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="ComboBoxFilterSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public ComboBoxFilterSettingsBuilder(ComboBoxFilterSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables filtering.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filterable(filtering => 
        ///             {
        ///                 filtering.Enabled((bool)ViewData["filtering"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable/disable filtering based on certain conditions.
        /// </remarks>
        public ComboBoxFilterSettingsBuilder Enabled(bool enable)
        {
            Guard.IsNotNull(enable, "enable");

            settings.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Defines filter mode.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filterable(filtering => 
        ///             {
        ///                 filtering.FilterMode(AutoCompleteFilterMode.StartsWith);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxFilterSettingsBuilder FilterMode(AutoCompleteFilterMode filtering)
        {
            Guard.IsNotNull(filtering, "filtering");

            settings.Enabled = true;
            settings.FilterMode = filtering;

            return this;
        }

        /// <summary>
        /// Set minimum chars number needed to start filtering.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .Filterable(filtering => 
        ///             {
        ///                 filtering.MinimumChars(2);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ComboBoxFilterSettingsBuilder MinimumChars(int chars)
        {
            Guard.IsNotNull(chars, "chars");
            Guard.IsNotNegative(chars, "chars");

            settings.Enabled = true;
            settings.MinimumChars = chars;

            return this;
        }
    }
}
