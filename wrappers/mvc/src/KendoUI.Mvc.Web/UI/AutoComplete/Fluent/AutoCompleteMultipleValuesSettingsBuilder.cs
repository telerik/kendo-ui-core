// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for building <see cref="AutoCompleteMultipleValuesSettingsBuilder"/>
    /// </summary>
    public class AutoCompleteMultipleValuesSettingsBuilder
    {
        private AutoCompleteMultipleValuesSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteMultipleValuesSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public AutoCompleteMultipleValuesSettingsBuilder(AutoCompleteMultipleValuesSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enable or disable autocompleting multiple values into a single field
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Multiple(multi => 
        ///             {
        ///                 multi.Enabled((bool)ViewData["multiple"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteMultipleValuesSettingsBuilder Enabled(bool enable)
        {
            Guard.IsNotNull(enable, "enable");

            settings.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Set multiple values separator.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Multiple(multi => 
        ///             {
        ///                 multi.Separator(", ");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteMultipleValuesSettingsBuilder Separator(string separator)
        {
            Guard.IsNotNullOrEmpty(separator, "separator");

            settings.Enabled = true;
            settings.Separator = separator;

            return this;
        }
    }
}
