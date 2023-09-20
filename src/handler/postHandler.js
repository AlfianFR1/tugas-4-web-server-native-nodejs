

const https = require('https');

const postHandler = {};

function fetchData(url, callback) {
  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      callback(JSON.parse(data));
    });
  });
}

postHandler.getAllPost = (req, res) => {
  const postDataUrl = 'https://jsonplaceholder.typicode.com/posts';
  fetchData(postDataUrl, (postData) => {
    res.end(JSON.stringify(postData));
  });
};

postHandler.getAllComment=(req, res)=>{
  const commentDataUrl= 'https://jsonplaceholder.typicode.com/comments';
  fetchData(commentDataUrl, (postData)=> {
    res.end(JSON.stringify(postData));
  });
}

postHandler.getAllData = (req, res) => {
  const postDataUrl = 'https://jsonplaceholder.typicode.com/posts';
  const commentDataUrl = 'https://jsonplaceholder.typicode.com/comments';

  fetchData(postDataUrl, (postData) => {
    fetchData(commentDataUrl, (commentData) => {
      const combinedData = postData.map((post) => {
        post.comments = commentData.filter((comment) => comment.postId === post.id);
        return post;
      });

      
      res.end(JSON.stringify(combinedData));
    });
  });
};


module.exports = postHandler;
