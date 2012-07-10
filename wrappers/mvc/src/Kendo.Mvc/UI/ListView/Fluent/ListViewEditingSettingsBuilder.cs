namespace Kendo.Mvc.UI.Fluent
{    
    /// <summary>
    /// Defines the fluent interface for configuring ListView editing.
    /// </summary>
    public class ListViewEditingSettingsBuilder<T> : IHideObjectMembers
        where T : class
    {
        private readonly ListViewEditingSettings<T> settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="ListViewEditingSettingsBuilder{T}"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public ListViewEditingSettingsBuilder(ListViewEditingSettings<T> settings)
        {
            this.settings = settings;
            this.settings.Enabled = true;
        }

        public ListViewEditingSettingsBuilder<T> Enabled(bool value)
        {
            settings.Enabled = value;
            
            return this;
        }

        /// <summary>
        /// Specify an editor template which to be used.
        /// </summary>
        /// <param name="templateName">name of the editor template</param>
        public ListViewEditingSettingsBuilder<T> TemplateName(string templateName)
        {
            settings.TemplateName = templateName;

            return this;
        }     
    }
}
