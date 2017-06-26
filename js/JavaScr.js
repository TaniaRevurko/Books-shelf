// Initialization
var books = [];  // Массив книг
books[0] = ["http://static.my-shop.ru/product/2/37/362980.jpg", "Web-программирование для всех", "Владимир Дунаев", 2005];
books[1] = ["http://static.my-shop.ru/product/2/7/69424.jpg", "Web-программирование на Java и JavaScript", "Александр Гарнаев", 2016];
books[2] = ["http://static.my-shop.ru/product/2/33/321245.jpg", "Введение в прикладное дискретное программирование: модели и вычислительные алгоритмы", "Анна Иванова ", 2008];
books[3] = ["http://static.my-shop.ru/product/2/45/443036.jpg", "Программирование для мобильных устройств под управлением Windows Mobile", "Александр Климов ", 2009];
var numberElem = 0; // Номер элемента, который редактируется

// Функция добавляющая таблицу на экран
function refresh() {
  var tbl = '<table id="sectionBookTable">';
  for (i = 0; i < books.length; i++) {
    tbl += "<tr>";
		tbl += "<td>";
		tbl += '<img src="' + books[i][0] + '"alt="' + books[i][1] + '"/>';
    tbl += "</td>";
    tbl += "<td>";
    tbl += '<span class="bookName">' + books[i][1] + "</span><br/>";
    tbl += books[i][2] + "<br/>";
    tbl += books[i][3];
    tbl += "</td>";
    tbl += '<td class="list">';
    tbl += "<form>";
    tbl += '<input type="button" value="Редактировать" onclick="showSectionEdit(' + i + ')"/><br/>';
    tbl += '<input type="button" value="Удалить" onclick="deleteRow(' + i + ')"/>';
    tbl += "</form>";
    tbl += "</td>";
    tbl += "</tr>";
  }
  tbl += "</table>";
  document.getElementById("fillTheBooks").innerHTML = tbl;
}

// Функция удаления строки
function deleteRow(bookId) {
  books.splice(bookId, 1);
  refresh();
} 

// Скрывает таблицу с перечнем книг, открывает форму для редактирования + автозаполнение
function showSectionEdit(edit) {
  var ss;
  var sh;
  var editName;
  numberElem = edit;
  document.getElementById("image").value=books[edit][0];
  document.getElementById("name").value=books[edit][1];    
  document.getElementById("author").value=books[edit][2];  
  document.getElementById("year").value=books[edit][3];  
  ss = document.getElementById("sectionEdit");
  ss.style.display = "block";
  sh = document.getElementById("sectionBookTable");
  sh.style.display = "none";
  editName = document.getElementById("editBookName");
  editName.style.display = "block";  
}

// Скрывает таблицу с перечнем книг, открывает форму для добавления новой книги
function showSectionAdd() {
  var ss;
  var sh;
  var editName;
  ss = document.getElementById("sectionEdit");
  ss.style.display = "block";
  sh = document.getElementById("sectionBookTable");
  sh.style.display = "none";
  editName = document.getElementById("editBookName");
  editName.style.display = "none";
  document.forms.addEditForm.reset();  
  numberElem=books.length;
}

// Кнопка отмены
function abolish() {
  var ss2;
  var sh2;
  ss2 = document.getElementById("sectionEdit");
  ss2.style.display = "none";
  sh2 = document.getElementById("sectionBookTable");
  sh2.style.display = "block";
}

// Кнопка сохранить
function saveChanges() {
  if (numberElem < books.length && numberElem >= 0) {
    //Сохранение внесенных изменений (редактирование)
    books[numberElem][0] = document.getElementById("image").value;
    books[numberElem][1] = document.getElementById("name").value;
    books[numberElem][2] = document.getElementById("author").value;
    books[numberElem][3] = document.getElementById("year").value;
    abolish();
    refresh(); 
  } else {
    // Добавление нового элемента в массив
    books.push([document.getElementById("image").value,
                document.getElementById("name").value,               
                document.getElementById("author").value, 
                document.getElementById("year").value]);
  }
  refresh();
  abolish();  
}

// Запрещение ввода года больше 2017, сохранение изменений при добавлении/редактировании
function limit() {
  if (+document.getElementById("year").value > 2017) {
    alert ('Год не может быть больше 2017');
  } else {
    saveChanges();
  }
}