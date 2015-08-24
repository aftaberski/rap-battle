// Get lyrics when user highlights text
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

// Compare the scores of both lyrics
function compareLyrics(lyric1Array, lyric2Array){
    lyric1Score = getScore(lyric1Array);
    lyric2Score = getScore(lyric2Array);
    var lyric1 = store.get('lyric1');
    var lyric2 = store.get('lyric2');
    if (lyric1Score > lyric2Score){
        $('.winner').empty().append(lyric1.artist + " won!");
    } else if (lyric1Score == lyric2Score){
        $('.winner').empty().append(lyric1.artist +" and " + lyric2.artist + "tied!");
    } else {
        $('.winner').empty().append(lyric2.artist +  " won!");
    }
}

// Get the score for each lyric
function getScore(lyric){
    var split_lyric = lyric.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
    var score = 0;
    for (i = 0; i < split_lyric.length; i++){
        if (SWEAR_WORDS.indexOf(split_lyric[i]) > -1){
            score++;
        }
    }
    return score;
}

// DOM stuffzzzzz
$(document).ready(function (){
  var lyric1 = store.get('lyric1');
  var lyric2 = store.get('lyric2');

  if (lyric1 && lyric2) {
    $('.lyric1').append(store.get('lyric1').lyric);
    $('.lyric2').append(store.get('lyric2').lyric);
  } else if ( lyric1 ) {
    $('.lyric1').append(store.get('lyric1').lyric);
      $('div div,pre').mouseup(function (e){
        if (getSelectionText() !== ""){
           store.set('lyric2', {
            lyric: getSelectionText(),
            artist: $('.artist').text(),
            title: $('.song-title').text()
          });
           lyric2 = "<p>" + store.get('lyric2').lyric + "</p>";
           $('.lyric2').append(lyric2);
         }
        });
  } else if (!lyric1 && !lyric2) {
   $('div div,pre').mouseup(function (e){
    if (getSelectionText() !== ""){
      store.set('lyric1', {
        lyric: getSelectionText(),
        artist: $('.artist').text(),
        title: $('.song-title').text()
      });
      lyric1 = "<p>" + store.get('lyric1').lyric + "</p>";
      $('.lyric1').append(lyric1);
    }
   })
 }

 $('button.reset').click(function (e){
  e.preventDefault();
  store.clear();
  window.location.href = '/';
 })

 $('button.get-score').click(function (e){
    e.preventDefault();
    lyric1 = store.get('lyric1').lyric;
    lyric2 = store.get('lyric2').lyric;
    compareLyrics(lyric1, lyric2);
 })
});