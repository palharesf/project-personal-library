'use strict';

module.exports = function (app) {

  const bookMap = new Map();

  app.route('/api/books')
    .get(function (req, res){
      const result = [];
      for (let [key, value] of bookMap.entries()) {
        result.push({
          _id: key,
          title: value.title,
          commentcount: value.comments ? value.comments.length : 0
        });
      }
      res.json(result);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if (typeof title === 'undefined' || title === '') {
        res.send('missing required field title');
      } else {
        const _id = new Date().getTime().toString(32);
        bookMap.set(_id, { title });
        res.json({
          _id,
          title
        });
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      if (!bookMap.has(bookid)) {
        return res.send('no book exists');
      }
      const book = bookMap.get(bookid);
      res.json({
        _id: bookid,
        title: book.title,
        comments: book.comments || []
      });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
