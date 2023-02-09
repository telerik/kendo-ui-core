---
title: Bind the Grid to an IndexedDB storage
description: An example demonstrating how to bind the Grid's data to an IndexedDB storage and perform CRUD operations.
type: how-to
page_title: Bind the Grid to an IndexedDb storage - Kendo UI Grid for jQuery
slug: grid-bound-to-indexeddb-storage
tags: grid, crud, editable, indexeddb, edit, client, storage
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.511</td>
 </tr>
</table>

## Description

How can I bind the Grid to the browser's IndexedDB storage and perform CRUD operations with it?

## Solution

Utilize the [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and perform operations on the client storage as demonstrated below:

1. Initialize the database.
1. Optionally, insert some sample data in the database.
1. Configure the Grid.
1. Define the CRUD methods of the DataSource.
1. Initialize the Grid.

```dojo
    <div id="grid"></div>

    <script>
        let db = null;

        $(function () {
            dbInit();
        });

        function gridInit() {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    create: function (options) {
                        let person = options.data;
                        let request = addPerson(person);

                        request.onsuccess = function (event) {
                            options.success([person]);
                        }
                    },
                    read: function (options) {
                        let request = getAllPeople();

                        request.onsuccess = function (event) {
                            let data = event.target.result;
                            options.success(data);
                        };
                    },
                    update: function (options) {
                        let person = options.data;
                        let request = updatePerson(person);

                        request.onsuccess = function (event) {
                            options.success([person]);
                        }
                    },
                    destroy: function (options) {
                        let person = options.data;
                        let request = removePerson(person.id);

                        request.onsuccess = function (event) {
                            options.success([person]);
                        }
                    }
                },
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { type: "string" },
                            name: { type: "string" },
                            networth: { type: "number" },
                            birthDate: { type: "date" }
                        }
                    }
                },
                pageSize: 15
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                columns: [{
                    field: "name",
                    title: "Name",
                    width: 200
                }, {
                    field: "networth",
                    title: "Net Worth",
                    format: "{0:c2}",
                    width: 200
                }, {
                    field: "birthDate",
                    title: "Birth Date",
                    format: "{0:dd/MM/yyyy}",
                    width: 200
                }, {
                    command: ["destroy"],
                    width: 200
                }],
                height: 600,
                filterable: true,
                sortable: true,
                pageable: true,
                editable: true,
                scrollable: true,
                toolbar: ["save", "create"],
            });
        }

        function dbInit() {
            let request = window.indexedDB.open('people_db', 1);

            request.onerror = function () {
                console.log('Database failed to open');
            };

            request.onsuccess = function () {
                console.log('Database opened successfully');

                db = request.result;

                gridInit();
            };

            request.onupgradeneeded = function (e) {
                let database = e.target.result;

                let objectStore = database.createObjectStore('people', { keyPath: 'id' });

                objectStore.createIndex('id', 'id', { unique: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('networth', 'networth', { unique: false });
                objectStore.createIndex('birthDate', 'birthDate', { unique: false });

                objectStore.transaction.oncomplete = function (event) {
                    addInitialData(database);
                }

                console.log('Database setup complete');
            };
        }

        function addInitialData(database) {
            // Add some initial data to the database.
            let data = generateData();

            let objectStore = database.transaction(['people'], 'readwrite').objectStore('people');

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                let request = objectStore.add(element);
            }
        }

        function getAllPeople() {
            let objectStore = db.transaction('people').objectStore('people');
            let request = objectStore.getAll();

            return request;
        }

        function addPerson(person) {
            let objectStore = db.transaction(['people'], 'readwrite').objectStore('people');
            // Create a new unique id for the record before adding it to the database.
            person.id = kendo.guid();
            let request = objectStore.add(person);

            return request;
        }

        function updatePerson(person) {
            let objectStore = db.transaction(['people'], 'readwrite').objectStore('people');
            let request = objectStore.put(person);

            return request;
        }

        function removePerson(personId) {
            let objectStore = db.transaction(['people'], 'readwrite').objectStore('people');
            let request = objectStore.delete(personId);

            return request;
        }

        function generateData() {
            let data = [{
                "id": "dfea5881-e721-4be0-aabc-0f9a6f2a3df1",
                "name": "Eimile",
                "birthDate": "2017-05-23",
                "networth": 6683
            }, {
                "id": "05e4947b-ac41-420e-958c-479af4feaf68",
                "name": "Walden",
                "birthDate": "2020-09-30",
                "networth": 20293
            }, {
                "id": "59d2db9f-4411-4dde-a26c-abba05a5703e",
                "name": "Tessie",
                "birthDate": "2017-06-20",
                "networth": 16263
            }, {
                "id": "1cd4982d-3823-400f-936e-f39191b45fd1",
                "name": "Gilli",
                "birthDate": "2018-04-23",
                "networth": 28746
            }, {
                "id": "2e55f4dc-1eb9-45d9-a306-481c42781c23",
                "name": "Sharity",
                "birthDate": "2020-02-14",
                "networth": 21493
            }, {
                "id": "944b0851-b8db-4551-9ecd-ee0e537225db",
                "name": "Shanta",
                "birthDate": "2019-10-20",
                "networth": 22603
            }, {
                "id": "2a7111e6-278a-4015-a720-48b0376d6caa",
                "name": "Concettina",
                "birthDate": "2018-02-10",
                "networth": 13118
            }, {
                "id": "c5f6720c-a67a-4820-a64a-6784958b3a21",
                "name": "Frederica",
                "birthDate": "2019-01-23",
                "networth": 27718
            }, {
                "id": "8391b205-87d1-47a9-aba2-228c3025f959",
                "name": "Sisely",
                "birthDate": "2021-05-11",
                "networth": 19071
            }, {
                "id": "3c66907c-8670-45dd-b273-97f98cc89d14",
                "name": "Brose",
                "birthDate": "2017-03-10",
                "networth": 29387
            }, {
                "id": "662ca7af-68ea-4893-967a-f9e7a2f3c3a7",
                "name": "Agnes",
                "birthDate": "2020-02-17",
                "networth": 32252
            }, {
                "id": "efb35795-fe32-4408-a0f5-0edc37df9069",
                "name": "Thurstan",
                "birthDate": "2017-06-26",
                "networth": 38887
            }, {
                "id": "9b419c31-04cd-4b02-81fd-e7b03472dbbb",
                "name": "Annmarie",
                "birthDate": "2017-04-02",
                "networth": 35957
            }, {
                "id": "1094f1f2-0175-4dfb-8df6-433991f8f20f",
                "name": "Liliane",
                "birthDate": "2017-11-03",
                "networth": 39276
            }, {
                "id": "97534fec-c4c5-4a77-a071-1e01694d8579",
                "name": "Fredi",
                "birthDate": "2017-04-19",
                "networth": 33414
            }, {
                "id": "bd880b53-5918-42c5-9023-1550f9243f01",
                "name": "Zacharias",
                "birthDate": "2017-07-01",
                "networth": 1218
            }, {
                "id": "3883cf43-708a-4c7e-aba2-58a6573e7e15",
                "name": "Monti",
                "birthDate": "2017-03-15",
                "networth": 34179
            }, {
                "id": "8f6a0a27-bcad-4980-9a8e-0c412137cd1d",
                "name": "Mordecai",
                "birthDate": "2017-10-09",
                "networth": 14063
            }, {
                "id": "e2b23919-2c46-45f3-8edc-c833e1311d4b",
                "name": "Arlana",
                "birthDate": "2020-12-31",
                "networth": 6664
            }, {
                "id": "4d8ae903-aee5-481e-82f4-22688c1fb517",
                "name": "Ilse",
                "birthDate": "2020-12-07",
                "networth": 37363
            }, {
                "id": "f8052f0a-d503-4a99-93a5-a4493677345e",
                "name": "Sayer",
                "birthDate": "2020-06-06",
                "networth": 23118
            }, {
                "id": "b5765af5-2bfe-4bd9-9546-8f96983b65b2",
                "name": "Donal",
                "birthDate": "2020-09-06",
                "networth": 8056
            }, {
                "id": "ca345b1a-e189-4c18-89ac-a85eff6885c1",
                "name": "Linnell",
                "birthDate": "2019-09-21",
                "networth": 6648
            }, {
                "id": "0e299ed9-abc0-4630-a85e-d635dc57e9f3",
                "name": "Chiarra",
                "birthDate": "2017-12-14",
                "networth": 13199
            }, {
                "id": "108e4c54-fbfe-4432-8967-fc05e02157ea",
                "name": "Melisse",
                "birthDate": "2019-04-29",
                "networth": 15673
            }, {
                "id": "32746fc8-f462-4596-9cd6-1667b855a6cb",
                "name": "Vivianne",
                "birthDate": "2018-07-08",
                "networth": 28948
            }, {
                "id": "fbe6c617-d8a3-42eb-bea4-212645b93292",
                "name": "Maribelle",
                "birthDate": "2018-02-14",
                "networth": 38089
            }, {
                "id": "bdfc7faa-73a1-4619-8949-2c452809fe8b",
                "name": "Danny",
                "birthDate": "2017-08-07",
                "networth": 44092
            }, {
                "id": "9d874196-00fd-47d6-b294-a79174cd9f41",
                "name": "Elora",
                "birthDate": "2021-03-31",
                "networth": 24668
            }, {
                "id": "c579e305-aa63-417b-bede-64b30f9c87ea",
                "name": "Krissy",
                "birthDate": "2018-06-28",
                "networth": 42709
            }];

            return data;
        }
    </script>
```
