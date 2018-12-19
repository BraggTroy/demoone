;var myDB = {
  name: 'test',
  version: 1,
  db: null
};
var request = null;

// 打开数据库，若不存在，则会新建数据库
function openDB(name, version) {
  version = version || 1;
  request = window.indexedDB.open(name, version);
  // 打开失败
  request.onerror = function (e) {
    console.log(e.currentTarget.error.message);
  };
  // 打开成功，将数据库对象放到myDB.db
  request.onsuccess = function (e) {
    myDB.db = e.target.result;
  };


}

// 更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。
/*
table = {
  name: '',
  primaryKey: '',
  index: [
    {name: '', unique: true}, // 索引名， 是否唯一
    {name: '', unique: false}
  ]
}
*/
function createTable(table) {
  table = table || {};
  if (!table.name) return false;
  request.onupgradeneeded = function (e) {
    var db = e.target.result;
    var objectStore = null;
    if (!db.objectStoreNames.contains(table.name)) {
      objectStore = db.createObjectStore(table.name, {keyPath: table.primaryKey});
    }
    // console.log('DB version changed to ' + version);

    if (table.index && Object.prototype.toString.apply(table.index).substr(8, 5) === "Array") {
      table.index.forEach(function (item) {
        // 为表中的列建立索引，没有索引则不可以作为关键词查询
        objectStore.createIndex(item.name, item.name, {unique: item.unique});
      })
    }
  };
}


function addToTable(db, tableName, data) {
  var transaction = db.transaction(tableName, 'readwrite');
  var store = transaction.objectStore(tableName);

  for (let i = 0; i < data.length; i++) {
    store.add(data[i]);
  }

}
