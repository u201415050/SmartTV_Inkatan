// ANIMATION DOTS
var dots = window.setInterval(function() {
  var wait = document.getElementById('searching');
  if (wait.innerHTML.length > 24)
  {
    wait.innerHTML = 'Buscando dispositivos';
  }
  else
  {wait.innerHTML += '.';
  }
}, 500);
var indexServer = 0;
var isBtnReload = false;

$(document).keydown(function(e) {
  if (listAvaliableServers.length != 0) {
    console.log(e);
    switch (e.keyCode) {
      case 38:
        if (!isBtnReload) {
          ChangeSelect(1);
        }
        break;
      case 37:
        isBtnReload = true;
        ChangeMode(false);
        break;
      case 39:
        isBtnReload = false;
        ChangeMode(true);
        break;
      case 40:
        if (!isBtnReload) {
          ChangeSelect(-1);
        }
        break;
      case 13:
        if (!isBtnReload) {
          entablishConnection(indexServer);
        } else {
          location.reload();
        }

        break;
    }
  }
});
// FOUND SERVER
var indexScroll = 0;

function ChangeMode(toggle) {
  if (toggle) {
    $('#server' + (indexServer)).addClass('Selected');
    $('#btnReload').removeClass('active');
  } else {
    $('#server' + (indexServer)).removeClass('Selected');
    $('#btnReload').addClass('active');
  }
}

function ChangeSelect(value) {
  // alert(1)
  if (value == 1) {
    if (indexServer > 0) {
      $('#server' + (indexServer)).removeClass('Selected');
      $('#server' + (indexServer - 1)).addClass('Selected');
      indexServer = indexServer - 1;
      if (indexServer < indexScroll) {

        // alert(top)
        indexScroll -= 1;
        $('#list').scrollTop($('#server' + (indexServer)).offset().top - $('server0').offset().top);
      }

    }
  } else {
    if (indexServer < listAvaliableServers.length - 1) {
      $('#server' + (indexServer)).removeClass('Selected');
      $('#server' + (indexServer + 1)).addClass('Selected');
      indexServer = indexServer + 1;
      if (indexServer >= indexScroll + 3) {
        // alert($(`#server0`).offset().top)
        indexScroll += 1;
        $('#list').scrollTop($('#server' + (indexServer - 2)).offset().top - $('#server0').offset().top);
      }

    }

  }

}

function found(url, indexElement) {
  clearInterval(dots);
  const listContainer = $('#list');
  $('#searching').remove();
  listContainer.addClass('listServers');
  listContainer.append('<div id="server' + (indexElement) + '" class="itemServer' + (indexElement == 0 ? ' Selected' : '') + '">' + (url) + '</div>');

}

function test(){
  $(location).attr('href', location.href.substr(0, location.href.length - 10) + "inkatan/SelectPlayers/index.html?url=ws://192.168.0.1&ipSelected=6");
}
