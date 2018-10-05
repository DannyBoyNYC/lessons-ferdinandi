// https://courses.gomakethings.com/academy/fall-2018/injecting-html-into-the-dom/

var elem = document.querySelector('#app');
// var text = elem.textContent;

var nytapi = 'd7d88f32a04d4c6aab4e46735441d0ee';
var nytDocumentation = 'https://developer.nytimes.com/top_stories_v2.json';
var categories = ['food', 'fashion', 'travel'];
var limit = 3;
var topStories = '';
var storyObj = {};
var storyArray = [];

var processFeed = function (stories) {
  stories.forEach(function (story) {
    // console.log(story);
    var storyEl = document.createElement('div');
    storyEl.className = 'feed-item';
    storyEl.innerHTML = `
    <img style="float:left;" src="${story.multimedia[0].url}" /> 
    <h3>
    <a target="_blank" href="${story.short_url}">${story.title}</a>
    </h3>
    <p>${story.abstract}</p>
    `;
    console.log(storyEl);
    storyArray.push(storyEl);

    elem.prepend(storyEl); // temporatary - build the array first
  })
  console.log(storyArray);
}

var makeRequest = function(url, method) {
  var request = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        resolve(request); // successful
      } else {
        reject({ 
          status: request.status, 
          statusText: request.statusText // failed
        });
      }
    };
    request.open(method || 'GET', url, true);
    request.send();
  });
}


makeRequest('https://api.nytimes.com/svc/topstories/v2/food.json?api-key=' + nytapi)
  .then(function (posts) {
    var data = (JSON.parse(posts.responseText));
    var stories = data.results.slice(0, limit);
    processFeed(stories)
  })
  .catch(function (error) {
    console.log(error);
  });