// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using System;
    using System.Web.Routing;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class SplitterPaneBuilderTests
    {
        private readonly SplitterPane pane;
        private readonly SplitterPaneBuilder builder;

        public SplitterPaneBuilderTests()
        {
            pane = new SplitterPane();
            builder = new SplitterPaneBuilder(pane, TestHelper.CreateViewContext());
        }

        [Fact]
        public void Size_should_return_builder()
        {
            builder.Size("200px").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Size_should_set_pane_size_in_px()
        {
            const string size = "101px";
            builder.Size(size);
            Assert.Equal(size, pane.Size);
        }

        [Fact]
        public void Size_should_set_pane_size_in_percent()
        {
            const string size = "101%";
            builder.Size(size);
            Assert.Equal(size, pane.Size);
        }

        [Fact]
        public void Size_should_throw_exception_when_calling_with_invalid_size()
        {
            Assert.Throws<ArgumentException>(() => builder.Size(null));
            Assert.Throws<ArgumentException>(() => builder.Size(""));
            Assert.Throws<ArgumentException>(() => builder.Size("120bars"));
            Assert.Throws<ArgumentException>(() => builder.Size("foo"));
            Assert.Throws<ArgumentException>(() => builder.Size("some120px"));
            Assert.Throws<ArgumentException>(() => builder.Size("12%ish"));
        }

        [Fact]
        public void MinSize_should_return_builder()
        {
            builder.MinSize("200px").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinSize_should_set_pane_size_in_px()
        {
            const string size = "101px";
            builder.MinSize(size);
            Assert.Equal(size, pane.MinSize);
        }

        [Fact]
        public void MinSize_should_set_pane_size_in_percent()
        {
            const string size = "101%";
            builder.MinSize(size);
            Assert.Equal(size, pane.MinSize);
        }

        [Fact]
        public void MinSize_should_throw_exception_when_calling_with_invalid_size()
        {
            Assert.Throws<ArgumentException>(() => builder.MinSize(null));
            Assert.Throws<ArgumentException>(() => builder.MinSize(""));
            Assert.Throws<ArgumentException>(() => builder.MinSize("120bars"));
            Assert.Throws<ArgumentException>(() => builder.MinSize("foo"));
            Assert.Throws<ArgumentException>(() => builder.MinSize("some120px"));
            Assert.Throws<ArgumentException>(() => builder.MinSize("12%ish"));
        }

        [Fact]
        public void MaxSize_should_return_builder()
        {
            builder.MaxSize("200px").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxSize_should_set_pane_size_in_px()
        {
            const string size = "101px";
            builder.MaxSize(size);
            Assert.Equal(size, pane.MaxSize);
        }

        [Fact]
        public void MaxSize_should_set_pane_size_in_percent()
        {
            const string size = "101%";
            builder.MaxSize(size);
            Assert.Equal(size, pane.MaxSize);
        }

        [Fact]
        public void MaxSize_should_throw_exception_when_calling_with_invalid_size()
        {
            Assert.Throws<ArgumentException>(() => builder.MaxSize(null));
            Assert.Throws<ArgumentException>(() => builder.MaxSize(""));
            Assert.Throws<ArgumentException>(() => builder.MaxSize("120bars"));
            Assert.Throws<ArgumentException>(() => builder.MaxSize("foo"));
            Assert.Throws<ArgumentException>(() => builder.MaxSize("some120px"));
            Assert.Throws<ArgumentException>(() => builder.MaxSize("12%ish"));
        }

        [Fact]
        public void HtmlAttributes_should_return_builder()
        {
            builder.HtmlAttributes(new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void HtmlAttributes_should_set_pane_HtmlAttributes()
        {
            builder.HtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", pane.HtmlAttributes["class"]);
        }

        [Fact]
        public void HtmlAttributes_get_cleared_on_set()
        {
            builder.HtmlAttributes(new { @class = "foo" });

            builder.HtmlAttributes(new { @class = "bar" });

            Assert.Equal("bar", pane.HtmlAttributes["class"]);
        }

        [Fact]
        public void Content_with_Action_should_return_builder()
        {
            builder.Content(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_with_Action_sets_pane_template()
        {
            builder.Content(() => { });

            Assert.NotNull(pane.Template.Content);
        }

        [Fact]
        public void Content_with_Func_should_return_builder()
        {
            builder.Content((Func<object, object>)((a) => { return null; })).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_with_Func_sets_pane_template()
        {
            builder.Content((Func<object, object>)((a) => { return null; }));

            Assert.NotNull(pane.Template.InlineTemplate);
        }

        [Fact]
        public void Content_with_string_should_return_builder()
        {
            builder.Content("<p>foo</p>").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_with_string_sets_pane_template()
        {
            const string content = "<p>foo</p>";

            builder.Content(content);

            Assert.Equal(content, pane.Template.Html);
        }

        [Fact]
        public void Scrollable_should_return_builder()
        {
            builder.Scrollable(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Scrollable_should_set_pane_scrollable()
        {
            builder.Scrollable(false);

            Assert.False(pane.Scrollable);
        }

        [Fact]
        public void Resizable_should_return_builder()
        {
            builder.Resizable(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Resizable_should_set_pane_resizability()
        {
            builder.Resizable(false);

            Assert.False(pane.Resizable);
        }

        [Fact]
        public void Collapsed_should_return_builder()
        {
            builder.Collapsed(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Collapsed_should_set_pane_collapsed()
        {
            builder.Collapsed(true);

            Assert.True(pane.Collapsed);
        }

        [Fact]
        public void Collapsible_should_return_builder()
        {
            builder.Collapsible(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Collapsible_should_set_pane_collapsible()
        {
            builder.Collapsible(true);

            Assert.True(pane.Collapsible);
        }

        [Fact]
        public void LoadContentFrom_should_return_builder()
        {
            builder.LoadContentFrom("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void LoadContentFrom_sets_ContentUrl()
        {
            builder.LoadContentFrom("bar");

            Assert.Equal("bar", pane.ContentUrl);
        }
    }
}