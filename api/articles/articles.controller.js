const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const articleService = require("./articles.service");

class ArticlesController {
 
  async create(req, res, next) {
    try {
      let data = req.body
      data.user = req.user._id
      const article = await articleService.create(data);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      if(req.user.role != "admin"){
        throw new UnauthorizedError()
      }
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articleService.update(id, data);
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      if(req.user.role != "admin"){
        throw new UnauthorizedError()
      }
      const id = req.params.id;
      await articleService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
