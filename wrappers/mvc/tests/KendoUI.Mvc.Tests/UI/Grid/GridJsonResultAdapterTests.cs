// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Xunit;

    public class GridJsonResultAdapterTests
    {
        [Fact]
        public void GetDataSource_returns_model_if_it_is_enumerable()
        {
            var model = new object[0];

            var adapter = Json(model);

            adapter.GetDataSource().ShouldBeSameAs(model);
        }

        [Fact]
        public void GetDataSource_returns_null_if_model_is_not_enumerable()
        {
            var adapter = Json(42);

            adapter.GetDataSource().ShouldBeNull();
        }

        [Fact]
        public void GetDataSource_returns_data_property_of_anonymous_object()
        {
            var model = new { data = new object[0] };

            var adapter = Json(model);

            adapter.GetDataSource().ShouldBeSameAs(model.data);
        }

        [Fact]
        public void GetTotal_returns_total_property_of_anonymous_object()
        {
            var model = new { total = 1 };

            var adapter = Json(model);

            adapter.GetTotal().ShouldEqual(model.total);
        }

        [Fact]
        public void GetTotal_returns_zero_if_model_does_not_contain_total()
        {
            var adapter = Json(42);

            adapter.GetTotal().ShouldEqual(0);
        }

        [Fact]
        public void GetModelState_returns_null_if_model_does_not_have_modelState_property()
        {
            var adapter = Json(new { });

            adapter.GetModelState().ShouldBeNull();
        }

        [Fact]
        public void GetModelState_returns_modelState_property_of_model()
        {
            var model = new { modelState = new ModelStateDictionary() };

            var adapter = Json(model);

            adapter.GetModelState().ShouldBeSameAs(model.modelState);
        }

        [Fact]
        public void Should_use_dictionary_model()
        {
            var model = new Dictionary<string, object>
            {
                {"data", new object[0]},
                {"total", 1},
                {"modelState", new ModelStateDictionary() }
            };

            var adapter = Json(model);

            adapter.GetModelState().ShouldBeSameAs(model["modelState"]);
            adapter.GetTotal().ShouldEqual((int)model["total"]);
            adapter.GetDataSource().ShouldBeSameAs(model["data"]);
        }

        private GridJsonResultAdapter Json(object model)
        {
            return new GridJsonResultAdapter(new JsonResult
            {
                Data = model
            });
        }
    }
}
