let palForm = document.getElementById('palForm');
let text_phrase = document.getElementById('text_phrase');
let errorDiv = document.getElementById('error');
let myOlist = document.getElementById('attempts');
let subLabel = document.getElementById('subLabel');

if (palForm) {
    palForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let phrase = text_phrase.value.trim();
    if (phrase) {
      let re = /[\W]/g;
      phrase = phrase.toLowerCase().replace(re,'');
      let revPhrase = phrase.split('').reverse().join(''); 
      errorDiv.hidden = true;
      subLabel.classList.remove('error');
      let li = document.createElement('li');
      if(phrase.length>0&&phrase===revPhrase){
          li.className = "is-palindrome" ;
      }
      else{
        li.className = "not-palindrome " ; 
      }
      li.innerHTML = text_phrase.value;
      myOlist.appendChild(li);
      palForm.reset();
      text_phrase.focus();
    } else {
        text_phrase.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      subLabel.className = 'error';
      text_phrase.focus();
    }
  });
}