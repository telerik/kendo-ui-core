namespace KendoUI.Mvc.UI.Fluent
{
    using KendoUI.Mvc.Infrastructure;

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
