// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring TreeView drag&amp;drop.
    /// </summary>
    public class TreeViewDragAndDropSettingsBuilder : IHideObjectMembers
    {
        private TreeViewDragAndDropSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewDragAndDropSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public TreeViewDragAndDropSettingsBuilder(TreeViewDragAndDropSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables / disables drag&amp;drop functionality.
        /// </summary>
        /// <param name="value">Whether to enable or to disable the drag&amp;drop.</param>
        public TreeViewDragAndDropSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Allows elements to be dropped on arbitrary HTML elements
        /// </summary>
        /// <param name="selector">jQuery selector that specifies the elements that qualify as drop targets.</param>
        public TreeViewDragAndDropSettingsBuilder DropTargets(string selector)
        {
            settings.DropTargets = selector;

            return this;
        }
    }
}
