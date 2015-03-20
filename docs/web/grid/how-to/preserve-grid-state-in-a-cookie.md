---
title: Preserve Grid state in a cookie
page_title: Preserve Grid state in a cookie
---

# Preserve Grid state in a cookie

This example demonstrates how to preserve the Grid state (filtering/sorting/paging/grouping and selection) in a cookie and restore it when the page is re-visited.

Keep in mind that If you are running the page directly from **the hard-drive** in Chrome (not through web server), Chrome won't save cookies for this page and persistence won't be available.

#### Example:

```html
<div id="grid"></div>
<script>
   var data = [{"Id":1,"FirstName":"Robert","LastName":"Dodsworth","City":"Kirkland","Title":"Web Designer","BirthDate":"1963-07-01T21:00:00.000Z","Age":49},{"Id":2,"FirstName":"Andrew","LastName":"King","City":"London","Title":"Sales Manager","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":3,"FirstName":"Nancy","LastName":"Fuller","City":"Philadelphia","Title":"Technical Support","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":4,"FirstName":"Janet","LastName":"Leverling","City":"Boston","Title":"Web Designer","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":5,"FirstName":"Margaret","LastName":"Callahan","City":"Seattle","Title":"Vice President, Sales","BirthDate":"1963-07-01T21:00:00.000Z","Age":49},{"Id":6,"FirstName":"Anne","LastName":"King","City":"Tacoma","Title":"Technical Support","BirthDate":"1955-03-03T22:00:00.000Z","Age":57},{"Id":7,"FirstName":"Janet","LastName":"Callahan","City":"New York","Title":"Chief Execute Officer","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":8,"FirstName":"Robert","LastName":"Leverling","City":"New York","Title":"Software Developer","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":9,"FirstName":"Margaret","LastName":"Dodsworth","City":"Seattle","Title":"Vice President, Sales","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":10,"FirstName":"Robert","LastName":"Fuller","City":"Philadelphia","Title":"Software Developer","BirthDate":"1960-05-28T21:00:00.000Z","Age":52},{"Id":11,"FirstName":"Margaret","LastName":"Suyama","City":"Seattle","Title":"Chief Techical Officer","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":12,"FirstName":"Nancy","LastName":"Fuller","City":"Tacoma","Title":"Vice President, Sales","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":13,"FirstName":"Michael","LastName":"Suyama","City":"Redmond","Title":"Software Developer","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":14,"FirstName":"Nancy","LastName":"King","City":"Tacoma","Title":"Chief Techical Officer","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":15,"FirstName":"Margaret","LastName":"Dodsworth","City":"Philadelphia","Title":"Web Designer","BirthDate":"1966-01-26T22:00:00.000Z","Age":46},{"Id":16,"FirstName":"Michael","LastName":"Fuller","City":"Philadelphia","Title":"Software Developer","BirthDate":"1966-01-26T22:00:00.000Z","Age":46},{"Id":17,"FirstName":"Robert","LastName":"Buchanan","City":"Boston","Title":"Inside Sales Coordinator","BirthDate":"1960-05-28T21:00:00.000Z","Age":52},{"Id":18,"FirstName":"Michael","LastName":"Fuller","City":"New York","Title":"Sales Manager","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":19,"FirstName":"Nige","LastName":"White","City":"Tacoma","Title":"Chief Techical Officer","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":20,"FirstName":"Steven","LastName":"Davolio","City":"Kirkland","Title":"Accountant","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":21,"FirstName":"Nige","LastName":"Suyama","City":"Boston","Title":"Technical Support","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":22,"FirstName":"Andrew","LastName":"Dodsworth","City":"Boston","Title":"Chief Execute Officer","BirthDate":"1955-03-03T22:00:00.000Z","Age":57},{"Id":23,"FirstName":"Margaret","LastName":"King","City":"Kirkland","Title":"Software Developer","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":24,"FirstName":"Michael","LastName":"Fuller","City":"London","Title":"Technical Support","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":25,"FirstName":"Michael","LastName":"Dodsworth","City":"London","Title":"Accountant","BirthDate":"1937-09-18T21:00:00.000Z","Age":75},{"Id":26,"FirstName":"Janet","LastName":"Peacock","City":"Kirkland","Title":"Sales Representative","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":27,"FirstName":"Anne","LastName":"Dodsworth","City":"Tacoma","Title":"Web Designer","BirthDate":"1966-01-26T22:00:00.000Z","Age":46},{"Id":28,"FirstName":"Andrew","LastName":"Peacock","City":"London","Title":"Software Developer","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":29,"FirstName":"Andrew","LastName":"Buchanan","City":"Redmond","Title":"Accountant","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":30,"FirstName":"Andrew","LastName":"Callahan","City":"New York","Title":"Chief Techical Officer","BirthDate":"1937-09-18T21:00:00.000Z","Age":75},{"Id":31,"FirstName":"Andrew","LastName":"King","City":"Seattle","Title":"Sales Manager","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":32,"FirstName":"Robert","LastName":"Leverling","City":"Kirkland","Title":"Chief Execute Officer","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":33,"FirstName":"Anne","LastName":"Dodsworth","City":"New York","Title":"Sales Representative","BirthDate":"1955-03-03T22:00:00.000Z","Age":57},{"Id":34,"FirstName":"Steven","LastName":"King","City":"New York","Title":"Technical Support","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":35,"FirstName":"Anne","LastName":"Leverling","City":"Redmond","Title":"Web Designer","BirthDate":"1966-03-26T22:00:00.000Z","Age":46},{"Id":36,"FirstName":"Nige","LastName":"Davolio","City":"Kirkland","Title":"Chief Techical Officer","BirthDate":"1963-08-29T21:00:00.000Z","Age":49},{"Id":37,"FirstName":"Nancy","LastName":"Dodsworth","City":"Boston","Title":"Chief Techical Officer","BirthDate":"1963-08-29T21:00:00.000Z","Age":49},{"Id":38,"FirstName":"Laura","LastName":"Leverling","City":"Redmond","Title":"Web Designer","BirthDate":"1955-03-03T22:00:00.000Z","Age":57},{"Id":39,"FirstName":"Steven","LastName":"Dodsworth","City":"Redmond","Title":"Sales Manager","BirthDate":"1937-09-18T21:00:00.000Z","Age":75},{"Id":40,"FirstName":"Andrew","LastName":"Davolio","City":"Seattle","Title":"Sales Manager","BirthDate":"1963-08-29T21:00:00.000Z","Age":49},{"Id":41,"FirstName":"Anne","LastName":"Dodsworth","City":"Seattle","Title":"Vice President, Sales","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":42,"FirstName":"Nancy","LastName":"Callahan","City":"London","Title":"Chief Techical Officer","BirthDate":"1952-02-18T22:00:00.000Z","Age":60},{"Id":43,"FirstName":"Andrew","LastName":"Buchanan","City":"London","Title":"Vice President, Sales","BirthDate":"1966-01-26T22:00:00.000Z","Age":46},{"Id":44,"FirstName":"Michael","LastName":"Fuller","City":"New York","Title":"Accountant","BirthDate":"1963-08-29T21:00:00.000Z","Age":49},{"Id":45,"FirstName":"Nancy","LastName":"Suyama","City":"Tacoma","Title":"Chief Execute Officer","BirthDate":"1963-07-01T21:00:00.000Z","Age":49},{"Id":46,"FirstName":"Laura","LastName":"Leverling","City":"London","Title":"Inside Sales Coordinator","BirthDate":"1960-05-28T21:00:00.000Z","Age":52},{"Id":47,"FirstName":"Robert","LastName":"White","City":"Kirkland","Title":"Vice President, Sales","BirthDate":"1948-12-07T22:00:00.000Z","Age":64},{"Id":48,"FirstName":"Michael","LastName":"Suyama","City":"London","Title":"Sales Representative","BirthDate":"1958-01-08T22:00:00.000Z","Age":54},{"Id":49,"FirstName":"Nige","LastName":"King","City":"Philadelphia","Title":"Software Developer","BirthDate":"1963-08-29T21:00:00.000Z","Age":49},{"Id":50,"FirstName":"Nancy","LastName":"Peacock","City":"Kirkland","Title":"Technical Support","BirthDate":"1963-08-29T21:00:00.000Z","Age":49}];

      $(document).ready(function() {
            var grid = $("#grid").kendoGrid({
                dataSource: {
                    data: data,
                    schema: {
                        model: {
                            id:"Id",
                            fields: {
                                FirstName: { type: "string" },
                                LastName: { type: "string" },
                                City: { type: "string" },
                                Title: { type: "string" },
                                BirthDate: { type: "date" },
                                Age: { type: "number" }
                            }
                        }
                    },
                    pageSize: 10
                },
                autoBind: false,
                sortable: true,
                groupable: true,
                filterable: true,
                selectable: "multiple/rows",
                dataBound: function(e){
                    var grid = this;
                    var dataSource = this.dataSource;

                    var state = kendo.stringify({
                        page: dataSource.page(),
                        pageSize: dataSource.pageSize(),
                        sort: dataSource.sort(),
                        group: dataSource.group(),
                        filter: dataSource.filter()
                    });

                    $.cookie("employeesState",state);
                    if($.cookie('empRows')){
                        $.each(JSON.parse($.cookie('empRows')),function(){
                            var item = dataSource.get(this);
                            var row = grid.tbody.find('[data-uid='+item.uid+']');
                            row.addClass('k-state-selected');
                        })
                    }
                },
                change:function(){
                    var grid = this;
                    var ids = grid.select().map(function(){
                       return grid.dataItem($(this)).Id
                    }).toArray();
                    $.cookie('empRows',JSON.stringify(ids));
                },
                pageable: {
                    input: true,
                    numeric: false
                },
                columns: [
                    {
                        field: "FirstName",
                        title: "First Name",
                        width: 100
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: 100
                    },
                    {
                        field: "City",
                        width: 100
                    },
                    {
                        field: "Title"
                    },
                    {
                        field: "BirthDate",
                        title: "Birth Date",
                        template: '#= kendo.toString(BirthDate,"MM/dd/yyyy") #'
                    },
                    {
                        field: "Age",
                        width: 50
                    }
                ]
            }).data("kendoGrid");

            var state = JSON.parse($.cookie("employeesState"));
            if(state){
                if(state.filter){
                    parseFilterDates(state.filter, grid.dataSource.options.schema.model.fields);
                }
                grid.dataSource.query(state);
            }
            else{
                grid.dataSource.read();
            }
        });



        function parseFilterDates(filter, fields){
            if(filter.filters){
                for(var i = 0; i < filter.filters.length; i++){
                    parseFilterDates(filter.filters[i], fields);
                }
            }
            else{
                if(fields[filter.field].type == "date"){
                    filter.value = kendo.parseDate(filter.value);
                }
            }
        }
<script>
```
