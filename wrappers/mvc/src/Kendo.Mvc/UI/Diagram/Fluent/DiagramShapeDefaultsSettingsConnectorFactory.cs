namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo ShapeDefaults for ASP.NET MVC
    /// </summary>
    public class DiagramShapeDefaultsSettingsConnectorFactory : IHideObjectMembers
    {
        private readonly List<DiagramShapeDefaultsSettingsConnector> container;

        public DiagramShapeDefaultsSettingsConnectorFactory(List<DiagramShapeDefaultsSettingsConnector> container)
        {
            this.container = container;
        }

        public virtual DiagramShapeDefaultsSettingsConnectorBuilder Add()
        {
            var item = new DiagramShapeDefaultsSettingsConnector();

            container.Add(item);

            return new DiagramShapeDefaultsSettingsConnectorBuilder(item);
        }
    }
}

