$(document).ready(function() {

//wywolanie funkcji po kliknieciu addButton
$('#addButton').click(klikniecieAdd);

$("#new-task").keypress(function (zdarzenie) {
    if(zdarzenie.which === 13) {
			var $newTask = $('input').val();
			dodajPozycje($newTask);
			$('input')[0].value='';
    }
});

//wywolanie funkcji edytujacej pozycje
$('.edit').click(edytuj);

//wywolanie funkcji delete pozycje
$('.delete').click(Delete);

//wywolanie funkcji checked
$('input[type=checkbox]').click(Checked);

}); // ready HTML

function klikniecieAdd(zdarzenie){
		var $newTask = $('input').val();
		dodajPozycje($newTask);
		$('input')[0].value='';																		//usuwanie wartosci z inputa new task po dodaniu pozycji
}

function zapiszCompleted() {
	var $newTask = $("#completed-tasks");
	dodajPozycjaWykonana($newTask);
}

function dodajPozycje($newTask,czyZapisywac=true){
		var $naszeUL = $("#incomplete-tasks");
		var $naszeLi = $("<li>");
		var $naszInput = $("<input type='checkbox'>");
			//wywplanie funkci Checked dla nowej pozycji
			$naszInput.click(Checked);
		var $naszLabel = $("<label>").text($newTask);
		var $naszInputText =  $("<input type = 'text'>");
		var $naszButtonEdit = $("<button>").addClass("edit").text('Edit');
			//wywolanie funkcji edytuj dla nowej pozycji
			$naszButtonEdit.click(edytuj);
		var $naszButtonDelete = $("<button>").addClass("delete").text('Delete');
			//wywolanie funkci delete dla nowej pozycji
			$naszButtonDelete.click(Delete);

		$naszeLi.append($naszInput);
		$naszeLi.append($naszLabel);
		$naszeLi.append($naszInputText);
		$naszeLi.append($naszButtonEdit);
		$naszeLi.append($naszButtonDelete);
		$naszeUL.append($naszeLi);

		if(czyZapisywac) {
			zapiszZadania();
		}
}

function dodajPozycjeWykonana($newTask,czyZapisywac=true){
		var $naszeUL = $("#completed-tasks");
		var $naszeLi = $("<li>");
		var $naszInput = $("<input type='checkbox'>");
			//zaznaczenie chceckbox w dodanej pozycji completed
			$naszInput.checked = true;
			//wywplanie funkci Checked dla nowej pozycji
			$naszInput.click(Checked);
		var $naszLabel = $("<label>").text($newTask);
		var $naszInputText =  $("<input type = 'text'>");
		var $naszButtonEdit = $("<button>").addClass("edit").text('Edit');
			//wywolanie funkcji edytuj dla nowej pozycji
			$naszButtonEdit.click(edytuj);
		var $naszButtonDelete = $("<button>").addClass("delete").text('Delete');
			//wywolanie funkci delete dla nowej pozycji
			$naszButtonDelete.click(Delete);

		$naszeLi.append($naszInput);
		$naszeLi.append($naszLabel);
		$naszeLi.append($naszInputText);
		$naszeLi.append($naszButtonEdit);
		$naszeLi.append($naszButtonDelete);
		$naszeUL.append($naszeLi);

		if(czyZapisywac) {
				zapiszZadania();
			}
}

function edytuj(){
		//przypisanie klasy do edytowanego edit
		$(this).parent().addClass('editMode');
		// zmiana nazwy przycisku z edit na ok
		$(this).text('Ok');
		//wyłuskanie tekstu z labela
		$label = $(this).parent().children("label").text();
		//wyluskanie wartosci inputa i przypisane text labea
		$(this).parent().children("input")[1].value=$label;
		//zakonczenie funkcji click
		$(this).off("click");
		//wywołanie funkcji zakończEdycję po kliknięciu Ok
		$(this).click(zakonczEdycje);
}
function zakonczEdycje(){
		//pobranie wartosci inputa
		$input = $(this).parent().children("input")[1].value;
		//ustawienie wartosci inputa do labela
		$(this).parent().children("label").text($input);
		//usuniecie klasy edytowanego edit
		$(this).parent().removeClass('editMode');
		// zmiana nazwy przycisku z ok na edit
		$(this).text('Edit');
		//wywołanie funkcji edytuj po kliknięciu Edit
		$(this).click(edytuj);
		zapiszZadania();
}

function Delete(){
		$(this).parent().remove();
	zapiszZadania();
}

function Checked(){
		if ($(this).is(':checked')) {
				var liZaznaczone = $(this).parent();
				$('#completed-tasks').append(liZaznaczone);

		} else {
				var liOdznaczone = $(this).parent();
				$('#incomplete-tasks').append(liOdznaczone);
			}
		zapiszZadania();
}

//ajax
function wyswietlZadania(data,textStatus,jqXHR) {	 //data to dane ktore pobiera json
	for(var i=0;i<data['incomplete'].length; i++) {
		dodajPozycje(data['incomplete'][i],false);
	}
	for(var i=0;i<data['completed'].length; i++) {
		dodajPozycjeWykonana(data['completed'][i],false);
	}
}

function zapiszZadania(){
	var zadaniaNiewykonane = document.getElementById("incomplete-tasks").children;
	var zadaniaWykonane  = document.getElementById("completed-tasks").children;
  var data={"incomplete":[],"completed":[]};
	for(var i=0; i<zadaniaNiewykonane.length; i++) {
		data['incomplete'].push(zadaniaNiewykonane[i].getElementsByTagName('label')[0].innerHTML);
	}
	for(var i=0; i<zadaniaWykonane.length; i++) {
		data['completed'].push(zadaniaWykonane[i].getElementsByTagName('label')[0].innerHTML);
	}

$.ajax({
	url: "http://127.0.0.1:8000/savetasks",
	async: true,
	type: "POST",
	dataType: "json",
	data: JSON.stringify(data),
});
}

$.ajax({
url: "http://127.0.0.1:8000/gettasks",
type: "GET",
dataType:"json",
success: wyswietlZadania
});
