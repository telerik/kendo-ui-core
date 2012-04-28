namespace KendoUI.Mvc.UI.Fluent
{
    public class GridAjaxBindingSettingsBuilder : GridBindingSettingsBuilder<GridAjaxBindingSettingsBuilder>
    {

        private readonly GridClientBindingSettings settings;

        public GridAjaxBindingSettingsBuilder(GridClientBindingSettings settings) : base(settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Gets or sets the operation mode of the grid. By default the grid will make a request to the 
        /// server when it needs data for paging, sorting, filtering or grouping. If you set the
        /// operation mode to GridOperationMode.Client it will make only one request for all data. Any other
        /// paging, sorting, filtering or grouping will be performed client-side.
        /// </summary>
        public GridAjaxBindingSettingsBuilder OperationMode(GridOperationMode mode)
        {
            settings.OperationMode = mode;

            return this;
        }
    }
}