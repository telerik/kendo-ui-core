namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using Telerik.Web.Mvc.UI;
    using Xunit;
    using System;

    public class NavigationItemBuilderTests
    {
        NavigationItemTestDouble Item;
        NavigationItemBuilderTestDouble builder;

        public NavigationItemBuilderTests()
        {
            var viewContext = TestHelper.CreateViewContext();

            this.Item = new NavigationItemTestDouble();
            this.builder = new NavigationItemBuilderTestDouble(Item, viewContext);
        }

        [Fact]
        public void ToItem_method_should_not_return_null()
        {
            Assert.NotNull(builder.ToItem());
        }

        [Fact]
        public void HtmlAttributes_should_clear_HtmlAttributes_property_before_merge()
        {
            const string deletedValue = "deleted";
            const string presentValue = "present";

            var dict = new RouteValueDictionary(new { key1 = presentValue });

            Item.HtmlAttributes[deletedValue] = deletedValue;

            builder.HtmlAttributes(dict);

            Assert.Null(Item.HtmlAttributes[deletedValue]);
        }

        [Fact]
        public void HtmlAttributes_sets_the_attributes_of_the_item()
        {
            builder.HtmlAttributes(new { @class = "test" });

            Assert.Equal("test", Item.HtmlAttributes["class"]);
        }

        [Fact]
        public void HtmlAttributes_should_return_PanelBarItemBuilder_object()
        {
            var item = builder.HtmlAttributes(new RouteValueDictionary());
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Text_should_be_set_by_builder()
        {
            const string value = "value";
            builder.Text(value);
            Assert.Equal(value, Item.Text);
        }

        [Fact]
        public void Text_should_return_builder_object()
        {
            const string value = "value";
            var item = builder.Text(value);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Visible_should_be_set_by_builder()
        {
            const bool value = true;
            builder.Visible(value);
            Assert.Equal(value, Item.Visible);
        }

        [Fact]
        public void Visible_should_return_builder_object()
        {
            const bool value = true;
            var item = builder.Visible(value);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Route_method_with_RouteValueDictionary_should_set_RouteName()
        {
            const string routeName = "routeName";
            builder.Route(routeName, new RouteValueDictionary());

            Assert.Equal(routeName, Item.RouteName);
        }

        [Fact]
        public void Route_method_with_RouteValueDictionary_should_set_RouteValues()
        {
            const string routeName = "routeName";
            Item.RouteValues.Clear();

            var routeDictionary = new RouteValueDictionary(new { @class = "test" });
            builder.Route(routeName, routeDictionary);

            Assert.Equal("test", Item.RouteValues["class"]);
        }

        [Fact]
        public void Route_method_with_with_only_route_name_should_set_RouteValues()
        {
            const string routeName = "routeName";

            builder.Route(routeName);

            Assert.Equal(routeName, Item.Text);
        }

        [Fact]
        public void Route_with_RouteValueDictionary_should_set_text_if_it_null_or_empty()
        {
            const string routeName = "routeName";
            builder.Route(routeName, new RouteValueDictionary());

            Assert.Equal(routeName, Item.Text);
        }

        [Fact]
        public void Route_method_with_object_should_set_RouteValues()
        {
            const string routeName = "routeName";

            builder.Route(routeName, new { @class = "test" });

            Assert.Equal("test", Item.RouteValues["class"]);
        }

        [Fact]
        public void Route_with_RouteValueDictionary_should_return_builder_object()
        {
            const string routeName = "routeName";
            var item = builder.Route(routeName, new RouteValueDictionary());

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Route_with_object_should_return_builder_object()
        {
            const string routeName = "routeName";
            var item = builder.Route(routeName, new { @class = "test" });

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_populated_from_MVCT4_templates_should_set_controller_action_and_routevalues() 
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);
            values.Add("id", 1);

            builder.Action(values);

            Assert.Equal(actionName, Item.ActionName);
            Assert.Equal(controllerName, Item.ControllerName);
            Assert.True(Item.RouteValues.ContainsKey("id"));
            Assert.Equal(1, Item.RouteValues["id"]);
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_should_populate_action_and_controller_name_if_no_routeValues_is_presented_in_the_argument_dictionary()
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);

            builder.Action(values);

            Assert.Equal(actionName, Item.ActionName);
            Assert.Equal(controllerName, Item.ControllerName);
            Assert.Equal(0, Item.RouteValues.Count);
        }

        [Fact]
        public void Action_method_with_RouteValueDictionary_should_set_ControllerName_and_ActionName()
        {
            const string controllerName = "Home";
            const string actionName = "Index";
            builder.Action(actionName, controllerName, new RouteValueDictionary());

            Assert.Equal(controllerName, Item.ControllerName);
            Assert.Equal(actionName, Item.ActionName);
        }

        [Fact]
        public void Action_method_with_RouteValueDictionary_should_set_RouteValues()
        {
            Item.RouteValues.Clear();

            const string controllerName = "Home";
            const string actionName = "Index";

            builder.Action(actionName, controllerName, new RouteValueDictionary(new { @class = "test" }));

            Assert.Equal("test", Item.RouteValues["class"]);
        }

        [Fact]
        public void Action_method_with_object_should_set_RouteValues()
        {
            Item.RouteValues.Clear();

            const string controllerName = "Home";
            const string actionName = "Index";

            builder.Action(actionName, controllerName, new { @class = "test" });

            Assert.Equal("test", Item.RouteValues["class"]);
        }

        public void Action_with_RouteValueDictionary_should_set_text_if_it_null_or_empty()
        {
            const string controllerName = "Home";
            const string actionName = "Index";

            builder.Action(actionName, controllerName);

            Assert.Equal(actionName, Item.Text);
        }

        [Fact]
        public void Action_with_RouteValueDictionary_should_return_builder_object()
        {
            const string controllerName = "Home";
            const string actionName = "Index";

            var returnedObject = builder.Action(actionName, controllerName, new RouteValueDictionary());
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedObject);
        }

        [Fact]
        public void Action_with_object_should_return_builder_object()
        {
            const string controllerName = "Home";
            const string actionName = "Index";

            var returnedObject = builder.Action(actionName, controllerName);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedObject);
        }

        [Fact]
        public void Url_should_be_set_by_builder()
        {
            const string url = "URL";
            builder.Url(url);
            Assert.Equal(url, Item.Url);
        }

        [Fact]
        public void Visible_should_returnbuilder_object()
        {
            const string url = "URL";
            var item = builder.Url(url);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Enabled_should_be_set_by_builder()
        {
            const bool enabled = false;
            builder.Enabled(enabled);
            Assert.Equal(enabled, Item.Enabled);
        }

        [Fact]
        public void Enabled_should_returnbuilder_object()
        {
            var item = builder.Enabled(true);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Selected_should_be_set_by_builder()
        {
            const bool selected = true;
            builder.Selected(selected);
            Assert.Equal(selected, Item.Selected);
        }

        [Fact]
        public void Selected_should_returnbuilder_object()
        {
            var item = builder.Selected(true);
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void Item_should_be_initially_enabled()
        {
            Assert.True(Item.Enabled);
        }

        [Fact]
        public void Item_should_not_be_initially_selected()
        {
            Assert.NotNull(Item.Selected);
            Assert.False(Item.Selected);
        }

        [Fact]
        public void ImageUrl_should_set_ImageUrl_property_of_the_item()
        {
            const string value = "test";

            builder.ImageUrl(value);

            Assert.Equal(value, Item.ImageUrl);
        }

        [Fact]
        public void ImageUrl_should_return_builder_object()
        {
            var item = builder.ImageUrl("something");
            Assert.IsType(typeof(NavigationItemBuilderTestDouble), item);
        }

        [Fact]
        public void ImageHtmlAttributes_should_merge_passed_object_to_ImageHtmlAttributes_property_of_item()
        {
            const string value = "test";
            var attr = new { attr = value };

            builder.ImageHtmlAttributes(attr);

            Assert.Equal(value, Item.ImageHtmlAttributes["attr"]);
        }

        [Fact]
        public void LinkHtmlAttributes_should_merged_with_value()
        {
            builder.LinkHtmlAttributes(new { style = "z-index:1" });
            Assert.Equal("z-index:1", Item.LinkHtmlAttributes["style"]);
        }
        [Fact]
        public void ImageHtmlAttributes_should_return_builder_object()
        {
            const string value = "test";
            var attr = new { attr = value };

            var returnedBuilder = builder.ImageHtmlAttributes(attr);

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void SpriteCssClasses_with_params_should_build_string_from_passed_params_and_set_SpriteCssClasses_property() 
        {
            const string appendedClasses = "first second third";
            string[] cssClasses = { "first", "second", "third" };
            builder.SpriteCssClasses(cssClasses);

            Assert.Equal(appendedClasses, Item.SpriteCssClasses);
        }

        [Fact]
        public void SpriteCssClasses_with_params_should_return_builder_object()
        {
            var returnedBuilder = builder.SpriteCssClasses("first", "second", "third");

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void Content_should_set_Content_property_of_item()
        {
            System.Action content = () => { };

            builder.Content(content);

            Assert.Equal(content, Item.Content);
        }

        [Fact]
        public void Content_should_return_TBuilder_object()
        {
            System.Action content = () => { };

            var returnedBuilder = builder.Content(content);

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedBuilder);
        }


        [Fact]
        public void Content_with_string_param_should_set_Content_property_of_item()
        {
            builder.Content("<ul><li>something</li></ul>");

            Assert.NotNull(Item.Html);
        }

        [Fact]
        public void Content_with_string_param_should_return_TBuilder_object()
        {
            var returnedBuilder = builder.Content("<ul><li>something</li></ul>");

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedBuilder);
        }

        [Fact]
        public void ContentHtmlAttributes_should_merge_passed_object_to_ContentHtmlAttributes_property_of_item()
        {
            const string value = "test";
            var attr = new { attr = value };

            builder.ContentHtmlAttributes(attr);

            Assert.Equal(value, Item.ContentHtmlAttributes["attr"]);
        }

        [Fact]
        public void ContentHtmlAttributes_should_return_TBuilder_object()
        {
            const string value = "test";
            var attr = new { attr = value };

            var returnedBuilder = builder.ContentHtmlAttributes(attr);

            Assert.IsType(typeof(NavigationItemBuilderTestDouble), returnedBuilder);
        }
    }

    public class NavigationItemBuilderTestDouble : NavigationItemBuilder<NavigationItemTestDouble, NavigationItemBuilderTestDouble>, IHideObjectMembers
    {
        public NavigationItemBuilderTestDouble(NavigationItemTestDouble Item, ViewContext viewContext)
            : base(Item, viewContext)
        {
        }
    }
}