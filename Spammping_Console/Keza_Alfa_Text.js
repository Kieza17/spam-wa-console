// REPO INI UDAH GA FUNGSI LAGI
// KAYAKNYA PIHAK WHATSAPP UDAH UBAH PERSETUJUAN
// KALO MAU PAKE JANGAN ILANGIN NAMA CREATOR!!

// THIS REPO CREATED BY @KIEZA17

// DONT FORGET TO FOLLOW MY GITHUB!

var repeatingSpamFunction = null;
var message = '';

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

document.onclick = function(){
  createSpamButton();
};

function createSpamButton () {
  if(document.getElementById('spamButton') != null)
    return;
  var composeBar = getElementByXpath("//*[@id=\"main\"]/footer/div[1]");
  if(composeBar == null)
    return;
  composeBar.oninput = function(){
    editSpamButton();
  };
  
  var spamButton = document.createElement('button');
  spamButton.setAttribute("id", "spamButton");
  spamButton.innerHTML = 'Spam';
  spamButton.style.fontSize = '100%';
  spamButton.style.padding = '0px 0px 10px 10px';
  composeBar.append(spamButton);
  editSpamButton();
}

function sendMessage () {
  var evt = new Event('input', {
    bubbles: true
  });

  var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
  input.innerHTML = message;
  input.dispatchEvent(evt);

  getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[3]/button").click();
}

function doSpam(element) {
  if(element.innerHTML == 'Spam'){
    var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
    if(input.innerHTML == '' || input.innerHTML == null){
      window.alert('Iseng Amat Dah Lu. wkwkwkk');
      return;
    }
    element.innerHTML = 'Berhenti Spam';
    message = input.innerHTML;
    var interval = parseInt (prompt('Dikit Aja Spam Nya, Minimal:', '500'));
    repeatingSpamFunction = window.setInterval(function(){
      sendMessage();
    }, interval);
  } else {
    element.innerHTML = 'Spam';
    window.clearInterval(repeatingSpamFunction);
  }
  editSpamButton();
}

function editSpamButton(){
  var spamButton = document.getElementById('spamButton');
  var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
  if(input.innerHTML == '' || input.innerHTML == null){
    spamButton.style.cursor = 'not-allowed';
    spamButton.style.color = '#D3D3D3';
    spamButton.onclick = null;
  } else {
    spamButton.style.cursor = 'pointer';
    spamButton.style.color = '#039be5';
    spamButton.onclick = function(){
      doSpam(this);
    };
  }
}
