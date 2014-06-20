namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridTransportConnection"/> options.
    /// </summary>
    public class PivotGridDataSourceTransportConnectionBuilder : IHideObjectMembers
    {
        protected readonly PivotGridTransportConnection connection;

        public PivotGridDataSourceTransportConnectionBuilder(PivotGridTransportConnection connection)
        { 
            this.connection = connection;
        }

        /// <summary>
        /// Sets the catalog.
        /// </summary>
        /// <param name="catalog">The catalog</param>
        public PivotGridDataSourceTransportConnectionBuilder Catalog(string catalog)
        {
            connection.Catalog = catalog;

            return this;
        }

        /// <summary>
        /// Sets the cube.
        /// </summary>
        /// <param name="cube">The cube</param>
        public PivotGridDataSourceTransportConnectionBuilder Cube(string cube)
        {
            connection.Cube = cube;

            return this;
        }
    }
}
