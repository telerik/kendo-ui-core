namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotTransportConnection"/> options.
    /// </summary>
    public class PivotDataSourceTransportConnectionBuilder : IHideObjectMembers
    {
        protected readonly PivotTransportConnection connection;

        public PivotDataSourceTransportConnectionBuilder(PivotTransportConnection connection)
        { 
            this.connection = connection;
        }

        /// <summary>
        /// Sets the catalog.
        /// </summary>
        /// <param name="catalog">The catalog</param>
        public PivotDataSourceTransportConnectionBuilder Catalog(string catalog)
        {
            connection.Catalog = catalog;

            return this;
        }

        /// <summary>
        /// Sets the cube.
        /// </summary>
        /// <param name="cube">The cube</param>
        public PivotDataSourceTransportConnectionBuilder Cube(string cube)
        {
            connection.Cube = cube;

            return this;
        }
    }
}
