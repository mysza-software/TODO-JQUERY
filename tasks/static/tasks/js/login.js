//funkcja ukrywająca komunikat
var $komunikat = $('#komunikat')
var $username = $('#username').get(0);
var $password = $('#password').get(0);

$username.onclick = ukryjKomunikat;
$password.onclick = ukryjKomunikat;

function ukryjKomunikat(){
  $komunikat.hide();
}
