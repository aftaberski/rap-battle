function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
$(document).ready(function (){
  var lyric1 = store.get('lyric1');
  var lyric2 = store.get('lyric2');

  if (lyric1 && lyric2) {
    $('.lyric1').append(store.get('lyric1'));
    $('.lyric2').append(store.get('lyric2'));
  } else if ( lyric1 ) {
    $('.lyric1').append(store.get('lyric1'));
      $('div,pre').mouseup(function (e){
         store.set('lyric2', getSelectionText());
         lyric2 = "<p>" + store.get('lyric2') + "</p>";
         $('.lyric2').append(lyric2);
       })
  } else {
   $('div,pre').mouseup(function (e){
       store.set('lyric1', getSelectionText());
       lyric1 = "<p>" + store.get('lyric1') + "</p>";
       $('.lyric1').append(lyric1);
   })
 }

 $('button.reset').click(function (e){
  e.preventDefault();
  store.clear();
  window.location.href = '/';
 })
});