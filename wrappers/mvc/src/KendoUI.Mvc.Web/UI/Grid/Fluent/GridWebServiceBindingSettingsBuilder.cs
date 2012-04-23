// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{

    public class GridWebServiceBindingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridClientBindingSettings settings;

        public GridWebServiceBindingSettingsBuilder(GridClientBindingSettings settings)
        {
            this.settings = settings;
        }

        public GridWebServiceBindingSettingsBuilder Select(string webServiceUrl)
        {
            settings.Select.Url = webServiceUrl;

            return this;
        }

        public GridWebServiceBindingSettingsBuilder Insert(string webServiceUrl)
        {
            settings.Insert.Url = webServiceUrl;

            return this;
        }

        public GridWebServiceBindingSettingsBuilder Update(string webServiceUrl)
        {
            settings.Update.Url = webServiceUrl;

            return this;
        }

        public GridWebServiceBindingSettingsBuilder Delete(string webServiceUrl)
        {
            settings.Delete.Url = webServiceUrl;

            return this;
        }

        public GridWebServiceBindingSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Gets or sets the operation mode of the grid. By default the grid will make a request to the 
        /// server when it needs data for paging, sorting, filtering or grouping. If you set the
        /// operation mode to GridOperationMode.Client it will make only one request for all data. Any other
        /// paging, sorting, filtering or grouping will be performed client-side.
        /// </summary>
        public GridWebServiceBindingSettingsBuilder OperationMode(GridOperationMode mode)
        {
            settings.OperationMode = mode;

            return this;
        }
    }
}
