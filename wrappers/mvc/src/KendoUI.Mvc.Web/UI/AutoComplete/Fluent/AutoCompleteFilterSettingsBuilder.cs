// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for building <see cref="AutoCompleteFilterSettingsBuilder"/>
    /// </summary>
    public class AutoCompleteFilterSettingsBuilder
    {
        private AutoCompleteFilterSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteFilterSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public AutoCompleteFilterSettingsBuilder(AutoCompleteFilterSettings settings)
        {
            this.settings = settings;
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
        public AutoCompleteFilterSettingsBuilder FilterMode(AutoCompleteFilterMode filtering)
        {
            Guard.IsNotNull(filtering, "filtering");

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
        public AutoCompleteFilterSettingsBuilder MinimumChars(int chars)
        {
            Guard.IsNotNull(chars, "chars");
            Guard.IsNotNegative(chars, "chars");

            settings.MinimumChars = chars;

            return this;
        }
    }
}
