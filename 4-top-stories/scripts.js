// https://courses.gomakethings.com/academy/fall-2018/injecting-html-into-the-dom/

var elem = document.querySelector('#app');
var nytapi = 'd7d88f32a04d4c6aab4e46735441d0ee';
var nytDocumentation = 'https://developer.nytimes.com/top_stories_v2.json';
var categories = ['food', 'fashion', 'travel'];
var limit = 3;
var topStories = '';

var xhr = new XMLHttpRequest();

// methods

var sanitizeHTML = function (str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

xhr.onreadystatechange = function () {
  console.log('ran')
  if (xhr.readyState !== 4) return;
  if (xhr.status >= 200 && xhr.status < 300) {
    var data = (JSON.parse(xhr.responseText));
  } else {
    console.log('The request failed!');
  }
  processFeed(data)

};

var getFeed = function(cat){
  xhr.open('GET', 'https://api.nytimes.com/svc/topstories/v2/'+cat+'.json?api-key='+nytapi);
  xhr.send();
  console.log(cat)
}

var processFeed = function (data) {
  
  var stories = data.results.slice(0, limit);
  // console.log(stories);
  // var category = document.createElement('h2');
  stories.forEach(function (story) {
    // console.log(story);
    var storyEl = document.createElement('div');
    storyEl.className = 'feed-item';
    storyEl.innerHTML = `
    <img style="float:left;" src="${story.multimedia[0].url}" /> 
    <h3>
    <a target="_blank" href="${story.short_url}">${sanitizeHTML(story.title)}</a>
    </h3>
    <p>${story.abstract}</p>
    `;
    
    var target = document.querySelector('#app');
    target.prepend(storyEl);
    
  })
  console.log(topStories);
}




categories.forEach(function (category) { 
  getFeed(category);
})

{/* <img src="${story.multimedia[0].url}" />  */ }
{/* <date>${story.published_date}</date> */}