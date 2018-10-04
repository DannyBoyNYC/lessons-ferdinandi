var elem = document.querySelector('#app');
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  
  if (xhr.status >= 200 && xhr.status < 300) {
    var data = (JSON.parse(xhr.responseText));
  } else {
    console.log('The request failed!');
  }

  processFeed(data)
};

var getFeed = function(cat){
  xhr.open('GET', 'https://api.nytimes.com/svc/topstories/v2/'+cat+'.json?api-key=d7d88f32a04d4c6aab4e46735441d0ee');
  xhr.send();
}

var processFeed = function(data){
  console.log(data.results);
  for (i=0; i< 5; i++){
    var article = document.createElement('div');
    article.className = 'feed-item';
    article.innerHTML = `
    <h3>
      <a target="_blank" href="${data.results[i].short_url}">${sanitizeHTML(data.results[i].title)}</a>
    </h3>`;
    var target = document.querySelector('#app');
    target.prepend(article);
  }
}

var sanitizeHTML = function (str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

getFeed('fashion')
// getFeed('food')
// getFeed('travel')