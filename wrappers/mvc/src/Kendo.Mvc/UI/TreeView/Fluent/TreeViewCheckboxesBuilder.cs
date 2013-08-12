namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring child TreeView items.
    /// </summary>
    public class TreeViewCheckboxesBuilder
    {
        private readonly TreeViewCheckboxesSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewCheckboxesBuilder"/> class.
        /// </summary>
        /// <param name="settings">The checkbox settings.</param>
        public TreeViewCheckboxesBuilder(TreeViewCheckboxesSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enable/disable rendering of checkboxes in the treeview.
        /// </summary>
        /// <param name="enabled">Whether checkboxes should be rendered.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Checkboxes(config => config
        ///                 .Enabled(true)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TreeViewCheckboxesBuilder Enabled(bool enabled)
        {
            settings.Enabled = enabled;

            return this;
        }

        /// <summary>
        /// Enable/disable checking of child checkboxes in the treeview.
        /// </summary>
        /// <param name="enabled">Whether checking of parent checkboxes should check child checkboxes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Checkboxes(config => config
        ///                 .CheckChildren(true)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TreeViewCheckboxesBuilder CheckChildren(bool checkChildren)
        {
            settings.CheckChildren = checkChildren;

            return this;
        }

        /// <summary>
        /// Client-side template to be used for rendering the items in the treeview.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Checkboxes(config => config
        ///                 .Template("#= data #")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewCheckboxesBuilder Template(string template)
        {
            settings.Template = template;

            return this;
        }

        /// <summary>
        /// Id of the element that holds the client-side template to be used for rendering the items in the treeview.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Checkboxes(config => config
        ///                 .TemplateId("widgetTemplateId")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewCheckboxesBuilder TemplateId(string templateId)
        {
            settings.Template = new ClientHandlerDescriptor { HandlerName = string.Format("$('#{0}').html()", templateId) };

            return this;
        }

        /// <summary>
        /// The name attribute of the checkbox fields. This will correlate to the name of the action method parameter that the nodes are posted to.
        /// </summary>
        /// <param name="name">The string that will be used in the name attribute.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Checkboxes(config => config
        ///                 .Name("checkedNodes")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewCheckboxesBuilder Name(string name)
        {
            settings.Name = name;

            return this;
        }
    }
}