const Article = require("./articles.schema");

class ArticlesService {

  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
  async getAll(id) {
    const articles = await Article.find().populate({
      path: "user",
      select: "-password",
      match: { _id: id },
    });
    return articles.filter((article) => article.user);
  }
}

module.exports = new ArticlesService();
