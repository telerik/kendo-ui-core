// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Xunit;
    
    public class GridViewResultAdapterTests
    {
        private readonly ViewResultBase viewResult;
        
        public GridViewResultAdapterTests()
        {
            viewResult = new ViewResult();
        }

        [Fact]
        public void GetDataSource_returns_data_of_grid_model()
        {
            var model = new GridModel
            {
                Data = new object[0]
            };

            var adapter = Adapter(() => model);
            
            Assert.Same(model.Data, adapter.GetDataSource());
        }        
        
        [Fact]
        public void GetTotal_returns_total_of_grid_model()
        {
            var model = new GridModel
            {
                Total = 1
            };

            var adapter = Adapter(() => model); 
            
            Assert.Equal(model.Total, adapter.GetTotal());
        }        
        
        [Fact]
        public void GetTotal_returns_zero_if_model_is_not_grid_model()
        {
            var model = 42;

            var adapter = Adapter(() => model); 
            Assert.Equal(0, adapter.GetTotal());
        }
        
        [Fact]
        public void GetDataSource_returns_null_if_model_is_not_grid_model()
        {
            var model = new object[0];

            var adapter = Adapter(() => model);
            
            Assert.Null(adapter.GetDataSource());
        }

        [Fact]
        public void GetModelState_returns_model_state_of_view_data()
        {
            var adapter = new GridViewResultAdapter(viewResult);

            Assert.Same(viewResult.ViewData.ModelState, adapter.GetModelState());
        }

        private GridViewResultAdapter Adapter(Func<object> model)
        {
            viewResult.ViewData.Model = model();

            return new GridViewResultAdapter(viewResult);
        }
    }
}
