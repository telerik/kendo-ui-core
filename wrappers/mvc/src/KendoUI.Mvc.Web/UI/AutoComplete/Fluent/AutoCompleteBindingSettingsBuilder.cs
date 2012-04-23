
namespace KendoUI.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for building <see cref="AutoCompleteBindingSettingsBuilder"/>
    /// </summary>
    public class AutoCompleteBindingSettingsBuilder : DropDownBindingSettingsBuilder<AutoCompleteBindingSettingsBuilder>
    {
        private AutoCompleteBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public AutoCompleteBindingSettingsBuilder(AutoCompleteBindingSettings settings) : base(settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables cache of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home").Cache((bool)ViewData["cache"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Cache method is useful when you need to enable/disable caching based on certain conditions.
        /// Default value is true.
        /// </remarks>
        public AutoCompleteBindingSettingsBuilder Cache(bool value)
        {
            settings.Cache = value;

            return this;
        }

        /// <summary>
        /// Specifies delay of the Ajax/WebServer request.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home").Delay(400);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Delay method is useful when you need to postpone request to the server for some time.
        /// </remarks>
        public AutoCompleteBindingSettingsBuilder Delay(int value)
        {
            settings.Delay = value;

            return this;
        }
    }
}
