namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Notification.Templates"/>.
    /// </summary>
    public class NotificationTemplateFactory : IHideObjectMembers
    {
        private readonly Notification container;
        private readonly ViewContext viewContext;

        public NotificationTemplateFactory(Notification container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual NotificationTemplateBuilder Add()
        {
            NotificationTemplateSettings item = new NotificationTemplateSettings();

            container.Templates.Add(item);

            return new NotificationTemplateBuilder(item, viewContext);
        }
    }
}