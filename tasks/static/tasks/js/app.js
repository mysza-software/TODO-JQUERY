//funkcja dodająca nową pozycję
function dodajPozycje(pozycja, czyZapisywac=true){
	//tworzenie obiektu Li nowej pozycji
	var naszUL = document.getElementById('incomplete-tasks');
	var naszLi = document.createElement("li");
	var naszInput = document.createElement('input');
	var naszLabel = document.createElement('label');
	var naszInputText = document.createElement('input');
	var naszButtonEdit = document.createElement('button');
	var naszButtonDelete =document.createElement('button');

	naszInputText.type = 'text';
	naszInput.type = 'checkbox';
	//wywołanie funkcji wyborCeckBoxa po kliknięciu
	naszInput.onclick = wyborCheckBoxa;
	naszButtonEdit.className = 'edit';
	naszButtonEdit.textContent='Edit';
	//wywołanie funkcji edytuj po kliknięciu na button Edit
	naszButtonEdit.onclick = edytuj;
	naszButtonDelete.className = 'delete';
	naszButtonDelete.textContent='Delete';
	//wywołanie funkcji usun odpowiedzialnej za usunięcie pozycji po kliknięciu na delete
	naszButtonDelete.onclick = usun;
	//nadanie wartosci labelowi
	naszLabel.textContent = pozycja;
	//dodanie utworzonych obiektów do naszegoLi
	naszLi.appendChild(naszInput);
	naszLi.appendChild(naszLabel);
	naszLi.appendChild(naszInputText);
	naszLi.appendChild(naszButtonEdit);
	naszLi.appendChild(naszButtonDelete);
	naszUL.appendChild(naszLi);
	if(czyZapisywac) {
		zapiszZadania();
	}
}
// funkcja która po kliknięciu add dodaje wartość do nowej pozycji
function obslugaKliknieciaAdd() {
	var pozycja = document.getElementById("new-task").value;
	dodajPozycje(pozycja);
	//usuwanie wartosci po dodaniu pozycji
	document.getElementsByTagName("input")[0].value='';
}
	//funkcja dodająca nową completed
	function dodajPozycjaWykonana(pozycja, czyZapisywac=true){
		//tworzenie obiektów Li nowej pozycji
		var naszUL = document.getElementById('completed-tasks');
		var naszLi = document.createElement('li');
		var naszInput = document.createElement('input');
		var naszLabel = document.createElement('label');
		var naszInputText = document.createElement('input');
		var naszButtonEdit = document.createElement('button');
		var naszButtonDelete =document.createElement('button');

		naszInputText.type = 'text';
		naszInput.type = 'checkbox';
		//wywołanie funkcji wyborCeckBoxa po kliknięciu
		naszInput.onclick = wyborCheckBoxa;
		naszButtonEdit.className = 'edit';
		naszButtonEdit.textContent='Edit';
		//wywołanie funkcji edytuj po kliknięciu na button Edit
		naszButtonEdit.onclick = edytuj;
		naszButtonDelete.className = 'delete';
		naszButtonDelete.textContent='Delete';
		//wywołanie funkcji usun odpowiedzialnej za usunięcie pozycji po kliknięciu na delete
		naszButtonDelete.onclick = usun;
		//naszLabel.textContent = pozycja;
		naszLabel.textContent = pozycja;
		//dodanie utworzonych obiektów do naszegoLi
		naszLi.appendChild(naszInput);
		naszLi.appendChild(naszLabel);
		naszLi.appendChild(naszInputText);
		naszLi.appendChild(naszButtonEdit);
		naszLi.appendChild(naszButtonDelete);
		naszUL.appendChild(naszLi);
//zaznaczenie chceckbox w dodanej pozycji completed
	naszInput.checked = true;
	if(czyZapisywac) {
		zapiszZadania();
	}}
	// funkcja która po kliknięciu add dodaje wartość do nowej pozycji
	function zapiszCompleted() {
		var pozycja = document.getElementById("completed-tasks");
		dodajPozycjaWykonana(pozycja);
}
//funkcja wywoływana po wciśnięciu przycisku edytuj
function edytuj(zdarzenie) {
	//przypisanie klasy editMode do edytowanego Li
	zdarzenie.target.parentNode.className = "editMode";
	//stworzenie TABLICY z dziećmi Li
	var dzieciLi = zdarzenie.target.parentNode.children;
	//wyłuskanie stringu znajdującego się w labelu
	var wnetrzeLabela;
	 wnetrzeLabela=zdarzenie.target.parentNode.getElementsByTagName("label")[0].innerHTML;
	// a teraz zmienie innerHTML guzika z edit na ok
	 zdarzenie.target.parentNode.getElementsByClassName('edit')[0].innerHTML="Ok";
	//wywołanie funkcji zakończEdycję po kliknięciu Ok
	zdarzenie.target.parentNode.getElementsByClassName('edit')[0].onclick = zakonczEdycje;
	 //przypisanie wartości labela do inputa typu tekst
	 for (var i = 0; i <dzieciLi.length; i++){
		 if (dzieciLi[i] instanceof HTMLInputElement && dzieciLi[i].type == 'text')
		 {
			 dzieciLi[i].value = wnetrzeLabela;
			  break;
		 }
	 }
}
//funkcja wywoływana po naciśnięciu przycisku OK
function zakonczEdycje (zdarzenie){
		//usunięcie klasy editClass po zakończeniu edycji
		zdarzenie.target.parentNode.className = '';
		//wyłuskanie labela do ktorego bedzie przypisywana nowa wartosc inputa
		 var naszLabel = zdarzenie.target.parentNode.getElementsByTagName("label")[0];
		 //wyłuskanie inputa z ktorego bedzie przypisywana wartosc do labela
		 var naszInput = zdarzenie.target.parentNode.children;
		//funkcja która zmienia innerHTML guzika z ok na edit
		 zdarzenie.target.parentNode.getElementsByClassName('edit')[0].innerHTML = 'Edit';
		//jezeli skonczymy edycje mozemy edytowac ponownie
		zdarzenie.target.parentNode.getElementsByClassName('edit')[0].onclick = edytuj;
		//przypisanie wartości z input do labela
		 for (var i = 0; i <naszInput.length; i++){
		 	if (naszInput[i] instanceof HTMLInputElement && naszInput[i].type == "text")
			{
			  naszLabel.innerHTML = naszInput[i].value;
			  break;
			}
		 }
		 zapiszZadania();
}

//funkcja odpowiedzialna za usuniecie callej pozycji po nacisnieciu delete
function usun(zdarzenie){
	var naszeUl = zdarzenie.target.parentNode.parentNode;
	var naszeLi = zdarzenie.target.parentNode;
	naszeUl.removeChild(naszeLi);
	zapiszZadania();
	}

//funkcja odpowiedzialana za zaznaczenie i odznaczenia pozycji jako zrobiona badz nie zrobiona
function wyborCheckBoxa(zdarzenie){
	var UlZaznaczone = document.getElementById("completed-tasks");
	var UlOdznaczone = document.getElementById("incomplete-tasks");
	//znalezienie inputow ktore ostaly klikniete
	var inputCheckbox = zdarzenie.target;
	//znalezienie li w ktorych znajduja sie input klikniety
	var Li = zdarzenie.target.parentNode;
	//warunki sprawdzajace czy chceckbox jest checked czy nie
		if (inputCheckbox.checked==true) {
			//jestem zaznaczony
			UlZaznaczone.appendChild(Li);
		//	UlOdznaczone.removeChild(Li);
		}
		else if(inputCheckbox.checked==false){
			//jestem odznacziny
			UlOdznaczone.appendChild(Li);
			//UlZaznaczone.removeChild(Li);
		}
		zapiszZadania();
}

//tworzenie zmiennej do której przypisany jest przycisk buttonAdd
	var buttonAdd = document.getElementById("addButton");
//wywołanie funkcji  obsługa klikniecia add po kliknięciu
	//buttonAdd.onclick = obslugaKliknieciaAdd;

//tworzenie tablicy z przyciskami któte mają klasę edit
var guzikiEdytuj = document.getElementsByClassName("edit");
//stworzenie pętli która ma za zadanie wywołanie funkcji edytuj po wcisnięciu przycisku edytuj
for (var index = 0; index < guzikiEdytuj.length; index++) {
	guzikiEdytuj[index].onclick = edytuj;
}

//tworzenie tablicy z przyciskami któte mają klasę delete
var guzikiDelete = document.getElementsByClassName('delete');
//stworzenie pętli która ma za zadanie wywołanie funkcji delete po wcisnięciu przycisku delete
for (var index = 0; index < guzikiDelete.length; index++) {
	guzikiDelete[index].onclick = usun;
}

//wywolanie funkcji wyborCheckBoxa po kliknieciu na kwadracika
var naszInputCheckbox = document.getElementsByTagName("input");
for (var i=0; i<naszInputCheckbox.length; i++)
	if(naszInputCheckbox[i].type==="checkbox"){
		naszInputCheckbox[i].onclick = wyborCheckBoxa;
		}

$("#new-task").keypress(function (zdarzenie) {
		    if(zdarzenie.which === 13) {
					var $newTask = $('input').val();
					dodajPozycje($newTask);
					$('input')[0].value='';
		    }
		});

		//AJAX
		function wyswietlZadania(data,textStatus,jqXHR) {	 //data to dane ktore pobiera json
			for(var i=0;i<data['incomplete'].length; i++) {
				dodajPozycje(data['incomplete'][i],false);
			}
			for(var i=0;i<data['completed'].length; i++) {
				dodajPozycjaWykonana(data['completed'][i],false);
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
					type: "POST",
					dataType:"json",
					data: JSON.stringify(data),
				});
		}

		$.ajax({
			url: "http://127.0.0.1:8000/gettasks",
			type: "GET",
			dataType:"json",
			success: wyswietlZadania,
		});
