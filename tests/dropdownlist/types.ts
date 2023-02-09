type Test = {
    id: number;
    name: string;
    age: number;
}

const $input = $("<input />").kendoDropDownList<Test>({
    dataTextField: 'name',
    dataValueField: 'id',
    template: e=>e.get('age').toString(),
    valueTemplate: e=>e.get('name')
});
const ddl = $input.data<Test>('kendoDropDownList');
if (ddl){
    const dataSource = ddl.dataSource;
    //#region kendo.data.DataSource
    dataSource.filter({logic: 'and', filters: []});
    dataSource.filter({field: 'name', operator: 'contains', value: 'bob'});
    dataSource.sort();
    dataSource.sort({field: 'age', dir: 'asc'});
    dataSource.sort([{field: 'age', dir: 'asc'}, {field: 'name', dir: 'desc'}]);
    const observableArray = dataSource.data();
    const model = dataSource.getByUid('uid');
    //#endregion kendo.data.DataSource
    //#region kendo.data.ObservableArray
    observableArray.toJSON();
    observableArray.forEach(e=>e.get('age') === 2);
    //#endregion kendo.data.ObservableArray
    //#region kendo.data.Model
    model.get('age');
    model.set('name', 'string');
    model.toJSON();
    //#endregion kendo.data.Model
}