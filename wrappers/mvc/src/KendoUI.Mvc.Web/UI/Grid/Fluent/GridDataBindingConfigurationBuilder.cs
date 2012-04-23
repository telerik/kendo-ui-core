// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{


    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}"/> data binding.
    /// </summary>
    public class GridDataBindingConfigurationBuilder : IHideObjectMembers
    {
        private readonly GridDataBindingSettings configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridDataBindingConfigurationBuilder"/> class.
        /// </summary>
        /// <param name="settings">The configuration.</param>
        public GridDataBindingConfigurationBuilder(GridDataBindingSettings configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Use it to configure Server binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Server().Select("FirstLook", "Grid"});
        ///             })
        ///             .Pagealbe()
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridServerBindingSettingsBuilder Server()
        {
            return new GridServerBindingSettingsBuilder(configuration.Server);
        }

        /// <summary>
        /// Use it to configure Ajax binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("_FirstLook", "Grid").Enabled((bool)ViewData["ajax"]);
        ///             })
        ///             .Pagealbe()
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridAjaxBindingSettingsBuilder Ajax()
        {
            configuration.Ajax.Enabled = true;
            
            return new GridAjaxBindingSettingsBuilder(configuration.Ajax);
        }

        /// <summary>
        /// Use it to configure web service binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.WebService().Select("~/Models/Orders.asmx/GetOrders")
        ///             })
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridWebServiceBindingSettingsBuilder WebService()
        {
            configuration.WebService.Enabled = true;

            return new GridWebServiceBindingSettingsBuilder(configuration.WebService);
        }
    }
}
