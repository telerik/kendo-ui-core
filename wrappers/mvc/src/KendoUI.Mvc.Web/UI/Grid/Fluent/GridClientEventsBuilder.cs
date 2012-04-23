// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}.ClientEvents"/>.
    /// </summary>
    public class GridClientEventsBuilder : IHideObjectMembers
    {
        private readonly GridClientEvents events;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridClientEventsBuilder"/> class.
        /// </summary>
        /// <param name="events">The events.</param>
        public GridClientEventsBuilder(GridClientEvents events)
        {
            this.events = events;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnLoad(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //Load handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnLoad(Action onLoadCodeBlock)
        {
            Guard.IsNotNull(onLoadCodeBlock, "onLoadCodeBlock");

            events.OnLoad.CodeBlock = onLoadCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnLoad(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //Load handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnLoad(Func<object, object> onLoadInlineCodeBlock)
        {
            Guard.IsNotNull(onLoadInlineCodeBlock, "onLoadInlineCodeBlock");

            events.OnLoad.InlineCodeBlock = onLoadInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnLoad client-side event.
        /// </summary>
        /// <param name="onLoadHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnLoad("onLoad"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnLoad(string onLoadHandlerName)
        {
            Guard.IsNotNullOrEmpty(onLoadHandlerName, "onLoadHandlerName");

            events.OnLoad.HandlerName = onLoadHandlerName;

            return this;
        }
        /// <summary>
        /// Defines the inline handler of the OnSubmitChanges client-side event.
        /// </summary>
        /// <param name="onSubmitChangesCodeBlock">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSubmitChanges(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSubmitChanges(Action onSubmitChangesCodeBlock)
        {
            Guard.IsNotNull(onSubmitChangesCodeBlock, "onSubmitChangesCodeBlock");

            events.OnSubmitChanges.CodeBlock = onSubmitChangesCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSubmitChanges client-side event.
        /// </summary>
        /// <param name="onSubmitChangesInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSubmitChanges(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSubmitChanges(Func<object, object> onSubmitChangesInlineCodeBlock)
        {
            Guard.IsNotNull(onSubmitChangesInlineCodeBlock, "onSubmitChangesInlineCodeBlock");

            events.OnSubmitChanges.InlineCodeBlock = onSubmitChangesInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSubmitChanges client-side event.
        /// </summary>
        /// <param name="onSubmitChangesHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnSubmitChanges("onSubmitChanges"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSubmitChanges(string onSubmitChangesHandlerName)
        {
            Guard.IsNotNullOrEmpty(onSubmitChangesHandlerName, "onSubmitChangesHandlerName");

            events.OnSubmitChanges.HandlerName = onSubmitChangesHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnEdit client-side event.
        /// </summary>
        /// <param name="onEditInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnEdit(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnEdit(Action onEditCodeBlock)
        {
            Guard.IsNotNull(onEditCodeBlock, "onEditCodeBlock");

            events.OnEdit.CodeBlock = onEditCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnEdit client-side event.
        /// </summary>
        /// <param name="onEditInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnEdit(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnEdit(Func<object, object> onEditInlineCodeBlock)
        {
            Guard.IsNotNull(onEditInlineCodeBlock, "onEditInlineCodeBlock");

            events.OnEdit.InlineCodeBlock = onEditInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnEdit client-side event.
        /// </summary>
        /// <param name="onEditHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnEdit("onEdit"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnEdit(string onEditHandlerName)
        {
            Guard.IsNotNullOrEmpty(onEditHandlerName, "onEditHandlerName");

            events.OnEdit.HandlerName = onEditHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSave client-side event.
        /// </summary>
        /// <param name="onSaveInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSave(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSave(Action onSaveCodeBlock)
        {
            Guard.IsNotNull(onSaveCodeBlock, "onSaveCodeBlock");

            events.OnSave.CodeBlock = onSaveCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSave client-side event.
        /// </summary>
        /// <param name="onSaveInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSave(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSave(Func<object, object> onSaveInlineCodeBlock)
        {
            Guard.IsNotNull(onSaveInlineCodeBlock, "onSaveInlineCodeBlock");

            events.OnSave.InlineCodeBlock = onSaveInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnSave client-side event.
        /// </summary>
        /// <param name="onSaveHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnSave("onSave"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnSave(string onSaveHandlerName)
        {
            Guard.IsNotNullOrEmpty(onSaveHandlerName, "onSaveHandlerName");

            events.OnSave.HandlerName = onSaveHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDetailViewExpand client-side event.
        /// </summary>
        /// <param name="onDetailViewExpandInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDetailViewExpand(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewExpand(Action onDetailViewExpandCodeBlock)
        {
            Guard.IsNotNull(onDetailViewExpandCodeBlock, "onDetailViewExpandCodeBlock");

            events.OnDetailViewExpand.CodeBlock = onDetailViewExpandCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDetailViewExpand client-side event.
        /// </summary>
        /// <param name="onDetailViewExpandInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDetailViewExpand(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewExpand(Func<object, object> onDetailViewExpandInlineCode)
        {
            Guard.IsNotNull(onDetailViewExpandInlineCode, "onDetailViewExpandInlineCode");

            events.OnDetailViewExpand.InlineCodeBlock = onDetailViewExpandInlineCode;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDetailViewExpand client-side event.
        /// </summary>
        /// <param name="onDetailViewExpandHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnDetailViewExpand("onDetailViewExpand"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewExpand(string onDetailViewExpandHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDetailViewExpandHandlerName, "onDetailViewExpandHandlerName");

            events.OnDetailViewExpand.HandlerName = onDetailViewExpandHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDetailViewCollapse client-side event.
        /// </summary>
        /// <param name="onDetailViewCollapseInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDetailViewCollapse(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewCollapse(Action onDetailViewCollapseCodeBlock)
        {
            Guard.IsNotNull(onDetailViewCollapseCodeBlock, "onDetailViewCollapseCodeBlock");

            events.OnDetailViewCollapse.CodeBlock = onDetailViewCollapseCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnDetailViewCollapse client-side event.
        /// </summary>
        /// <param name="onDetailViewCollapseInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDetailViewCollapse(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewCollapse(Func<object, object> onDetailViewCollapseInlineCodeBlock)
        {
            Guard.IsNotNull(onDetailViewCollapseInlineCodeBlock, "onDetailViewCollapseInlineCodeBlock");

            events.OnDetailViewCollapse.InlineCodeBlock = onDetailViewCollapseInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDetailViewCollapse client-side event.
        /// </summary>
        /// <param name="onDetailViewCollapseHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnDetailViewCollapse("onDetailViewCollapse"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDetailViewCollapse(string onDetailViewCollapseHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDetailViewCollapseHandlerName, "onDetailViewCollapseHandlerName");

            events.OnDetailViewCollapse.HandlerName = onDetailViewCollapseHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSave client-side event.
        /// </summary>
        /// <param name="onDeleteInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSave(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDelete(Action onDeleteCodeBlock)
        {
            Guard.IsNotNull(onDeleteCodeBlock, "onDeleteCodeBlock");

            events.OnDelete.CodeBlock = onDeleteCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnSave client-side event.
        /// </summary>
        /// <param name="onDeleteInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnSave(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //edit handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDelete(Func<object, object> onDeleteInlineCodeBlock)
        {
            Guard.IsNotNull(onDeleteInlineCodeBlock, "onDeleteInlineCodeBlock");

            events.OnDelete.InlineCodeBlock = onDeleteInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDelete client-side event.
        /// </summary>
        /// <param name="onDeleteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnSave("onDelete"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDelete(string onDeleteHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDeleteHandlerName, "onDeleteHandlerName");

            events.OnDelete.HandlerName = onDeleteHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnResize client-side event.
        /// </summary>
        /// <param name="onColumnResizeInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnResize(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnResize(Action onColumnResizeCodeBlock)
        {
            Guard.IsNotNull(onColumnResizeCodeBlock, "onColumnResizeCodeBlock");

            events.OnColumnResize.CodeBlock = onColumnResizeCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnResize client-side event.
        /// </summary>
        /// <param name="onColumnResizeInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnResize(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnResize(Func<object, object> onColumnResizeInlineCodeBlock)
        {
            Guard.IsNotNull(onColumnResizeInlineCodeBlock, "onColumnResizeInlineCodeBlock");

            events.OnColumnResize.InlineCodeBlock = onColumnResizeInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnColumnResize client-side event.
        /// </summary>
        /// <param name="onColumnResizeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnColumnResize("onColumnResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnResize(string onColumnResizeHandlerName)
        {
            Guard.IsNotNullOrEmpty(onColumnResizeHandlerName, "onColumnResizeHandlerName");

            events.OnColumnResize.HandlerName = onColumnResizeHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnReorder client-side event.
        /// </summary>
        /// <param name="onColumnReorderInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnReorder(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnReorder(Action onColumnReorderCodeBlock)
        {
            Guard.IsNotNull(onColumnReorderCodeBlock, "onColumnReorderCodeBlock");

            events.OnColumnReorder.CodeBlock = onColumnReorderCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnReorder client-side event.
        /// </summary>
        /// <param name="onColumnReorderInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnReorder(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnReorder(Func<object, object> onColumnReorderInlineCodeBlock)
        {
            Guard.IsNotNull(onColumnReorderInlineCodeBlock, "onColumnReorderInlineCodeBlock");

            events.OnColumnReorder.InlineCodeBlock = onColumnReorderInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnColumnResize client-side event.
        /// </summary>
        /// <param name="onColumnReorderHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnColumnReorder("onColumnReorder"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnReorder(string onColumnReorderHandlerName)
        {
            Guard.IsNotNullOrEmpty(onColumnReorderHandlerName, "onColumnReorderHandlerName");

            events.OnColumnReorder.HandlerName = onColumnReorderHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnHide client-side event.
        /// </summary>
        /// <param name="onColumnHideInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnHide(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnHide(Action onColumnHideCodeBlock)
        {
            Guard.IsNotNull(onColumnHideCodeBlock, "onColumnHideCodeBlock");

            events.OnColumnHide.CodeBlock = onColumnHideCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnHide client-side event.
        /// </summary>
        /// <param name="onColumnHideInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnHide(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnHide(Func<object, object> onColumnHideInlineCodeBlock)
        {
            Guard.IsNotNull(onColumnHideInlineCodeBlock, "onColumnHideInlineCodeBlock");

            events.OnColumnHide.InlineCodeBlock = onColumnHideInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnColumnHide client-side event.
        /// </summary>
        /// <param name="onColumnHideHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnColumnHide("onColumnHide"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnHide(string onColumnHideHandlerName)
        {
            Guard.IsNotNullOrEmpty(onColumnHideHandlerName, "onColumnHideHandlerName");

            events.OnColumnHide.HandlerName = onColumnHideHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnShow client-side event.
        /// </summary>
        /// <param name="onColumnShowInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnShow(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnShow(Action onColumnShowCodeBlock)
        {
            Guard.IsNotNull(onColumnShowCodeBlock, "onColumnShowCodeBlock");

            events.OnColumnShow.CodeBlock = onColumnShowCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnColumnShow client-side event.
        /// </summary>
        /// <param name="onColumnShowInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnColumnShow(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //event handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnShow(Func<object, object> onColumnShowInlineCodeBlock)
        {
            Guard.IsNotNull(onColumnShowInlineCodeBlock, "onColumnShowInlineCodeBlock");

            events.OnColumnShow.InlineCodeBlock = onColumnShowInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnColumnShow client-side event.
        /// </summary>
        /// <param name="onColumnShowHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnColumnShow("onColumnShow"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnColumnShow(string onColumnShowHandlerName)
        {
            Guard.IsNotNullOrEmpty(onColumnShowHandlerName, "onColumnShowHandlerName");

            events.OnColumnShow.HandlerName = onColumnShowHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnRowSelect client-side event.
        /// </summary>
        /// <param name="onLoadAction">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnRowSelect(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //Error handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowSelect(Action onRowSelectCodeBlock)
        {
            Guard.IsNotNull(onRowSelectCodeBlock, "onRowSelectCodeBlock");

            events.OnRowSelect.CodeBlock = onRowSelectCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnRowSelect client-side event.
        /// </summary>
        /// <param name="onLoadAction">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnRowSelect(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //Error handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowSelect(Func<object, object> onRowSelectInlineCodeBlock)
        {
            Guard.IsNotNull(onRowSelectInlineCodeBlock, "onRowSelectInlineCodeBlock");

            events.OnRowSelect.InlineCodeBlock = onRowSelectInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnRowSelect client-side event.
        /// </summary>
        /// <param name="onRowSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnRowSelect("onRowSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowSelect(string onRowSelectHandlerName)
        {
            Guard.IsNotNullOrEmpty(onRowSelectHandlerName, "onRowSelectHandlerName");

            events.OnRowSelect.HandlerName = onRowSelectHandlerName;

            return this;
        }
        
        [Obsolete("Use OnRowSelect instead")]
        public GridClientEventsBuilder OnRowSelected(string onRowSelectedHandlerName)
        {
            return OnRowSelect(onRowSelectedHandlerName);
        }

        [Obsolete("Use OnRowSelect instead")]
        public GridClientEventsBuilder OnRowSelected(Action onRowSelectedInlineCode)
        {
            return OnRowSelect(onRowSelectedInlineCode);
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event.
        /// </summary>
        /// <param name="onErrorInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnError(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //Error handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnError(Action onErrorCodeBlock)
        {
            Guard.IsNotNull(onErrorCodeBlock, "onErrorCodeBlock");

            events.OnError.CodeBlock = onErrorCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the OnError client-side event.
        /// </summary>
        /// <param name="onErrorInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnError(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //Error handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnError(Func<object, object> onErrorInlineCodeBlock)
        {
            Guard.IsNotNull(onErrorInlineCodeBlock, "onErrorInlineCodeBlock");

            events.OnError.InlineCodeBlock = onErrorInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnError client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnError("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnError(string onErrorHandlerName)
        {
            Guard.IsNotNullOrEmpty(onErrorHandlerName, "onErrorHandlerName");

            events.OnError.HandlerName = onErrorHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnDataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDataBound(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //data bound handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBound(Action onDataBoundCodeBlock)
        {
            Guard.IsNotNull(onDataBoundCodeBlock, "onDataBoundCodeBlock");

            events.OnDataBound.CodeBlock = onDataBoundCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnDataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDataBound(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //data bound handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBound(Func<object, object> onDataBoundInlineCodeBlock)
        {
            Guard.IsNotNull(onDataBoundInlineCodeBlock, "onDataBoundInlineCodeBlock");

            events.OnDataBound.InlineCodeBlock = onDataBoundInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnDataBound("onDataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBound(string onDataBoundHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDataBoundHandlerName, "onDataBoundHandlerName");

            events.OnDataBound.HandlerName = onDataBoundHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnDataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDataBinding(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     //data binding handling code
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBinding(Action onDataBindingCodeBlock)
        {
            Guard.IsNotNull(onDataBindingCodeBlock, "onDataBindingCodeBlock");

            events.OnDataBinding.CodeBlock = onDataBindingCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnDataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnDataBinding(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     //data binding handling code
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBinding(Func<object, object> onDataBindingInlineCodeBlock)
        {
            Guard.IsNotNull(onDataBindingInlineCodeBlock, "onDataBindingInlineCodeBlock");

            events.OnDataBinding.InlineCodeBlock = onDataBindingInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnDataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnDataBinding("onDataBinding"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnDataBinding(string onDataBindingHandlerName)
        {
            Guard.IsNotNullOrEmpty(onDataBindingHandlerName, "onDataBindingHandlerName");

            events.OnDataBinding.HandlerName = onDataBindingHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnRowDataBound client-side event.
        /// </summary>
        /// <param name="onRowDataBoundInlineCode">The action defining the inline handler.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnRowDataBound(() =>
        ///            {
        ///                 %&gt;
        ///                 function(e) {
        ///                     var row = e.row;
        ///                     var dataItem = e.dataItem;
        ///                 }
        ///                 &lt;%
        ///            }))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowDataBound(Action onRowDataBoundCodeBlock)
        {
            Guard.IsNotNull(onRowDataBoundCodeBlock, "onRowDataBoundCodeBlock");

            events.OnRowDataBound.CodeBlock = onRowDataBoundCodeBlock;

            return this;
        }

        /// <summary>
        /// Defines the inline error handler of the OnRowDataBound client-side event.
        /// </summary>
        /// <param name="onRowDataBoundInlineCode">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid(Model)
        ///            .Name("Grid")
        ///            .ClientEvents(events => events.OnRowDataBound(
        ///                 @&lt;text&gt;
        ///                 function(e) {
        ///                     var row = e.row;
        ///                     var dataItem = e.dataItem;
        ///                 }
        ///                 &lt;/text&gt;
        ///            ))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowDataBound(Func<object, object> onRowDataBoundInlineCodeBlock)
        {
            Guard.IsNotNull(onRowDataBoundInlineCodeBlock, "onRowDataBoundInlineCodeBlock");

            events.OnRowDataBound.InlineCodeBlock = onRowDataBoundInlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the OnRowDataBound client-side event.
        /// </summary>
        /// <param name="onRowDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ClientEvents(events => events.OnRowDataBound("onRowDataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public GridClientEventsBuilder OnRowDataBound(string onRowDataBoundHandlerName)
        {
            Guard.IsNotNullOrEmpty(onRowDataBoundHandlerName, "onRowDataBoundHandlerName");

            events.OnRowDataBound.HandlerName = onRowDataBoundHandlerName;

            return this;
        }

        public GridClientEventsBuilder OnCommand(Action onCommandCallback)
        {
            Guard.IsNotNull(onCommandCallback, "onCommandCallback");

            events.OnCommand.CodeBlock = onCommandCallback;

            return this;
        }

        public GridClientEventsBuilder OnCommand(Func<object, object> onCommandInlineCodeBlock)
        {
            Guard.IsNotNull(onCommandInlineCodeBlock, "onCommandInlineCodeBlock");

            events.OnCommand.InlineCodeBlock = onCommandInlineCodeBlock;

            return this;
        }

        public GridClientEventsBuilder OnCommand(string onCommandHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCommandHandlerName, "onCommandHandlerName");

            events.OnCommand.HandlerName = onCommandHandlerName;

            return this;
        }

        public GridClientEventsBuilder OnComplete(Action onCompleteCallback)
        {
            Guard.IsNotNull(onCompleteCallback, "onCompleteCallback");

            events.OnComplete.CodeBlock = onCompleteCallback;

            return this;
        }

        public GridClientEventsBuilder OnComplete(Func<object, object> onCompleteInlineCodeBlock)
        {
            Guard.IsNotNull(onCompleteInlineCodeBlock, "onCompleteInlineCodeBlock");

            events.OnComplete.InlineCodeBlock = onCompleteInlineCodeBlock;

            return this;
        }

        public GridClientEventsBuilder OnComplete(string onCompleteHandlerName)
        {
            Guard.IsNotNullOrEmpty(onCompleteHandlerName, "onCompleteHandlerName");

            events.OnComplete.HandlerName = onCompleteHandlerName;

            return this;
        }
    }
}