namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}.ServerBinding"/>
    /// </summary>
    public class GridRequestSettingsBuilder : GridRequestSettingsBuilderBase<RequestSettings, GridRequestSettingsBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridRequestSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridRequestSettingsBuilder(RequestSettings settings) : base(settings)
        {
        }
    }
}