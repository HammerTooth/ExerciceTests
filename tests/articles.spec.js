const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const usersService = require("../api/users/users.service");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("tester API articles", () => {
    let token;
    const USER_ID = "6405f47e5d79c3a1d4076c9a";
    const ARTICLE_ID = "64520f671a5bbf18d9d74fb9";
    const MOCK_USER = [
      {
        _id: USER_ID,
        name: "ana",
        email: "nfegeg@gmail.com",
        role: "admin",
        password: "azertyuiop",
      },
    ];
    const MOCK_ARTICLES = [
        {
          _id: ARTICLE_ID,
          title: "titre n°1",
          content: "contenu n°1",
          state: "published"
        //   ,
        //   user: "6405f47e5d79c3a1d4076c9a"
        },
      ];
    const MOCK_DATA_CREATED = {
        title: "titre n°2",
        content: "contenu n°2",
        state: "draft"
        // ,
        // user: "6405f47e5d79c3a1d4076c9a"
    };
    const MOCK_USER_CREATED = {
        name: "test",
        email: "test@test.net",
        password: "azertyuiop",
    };
  
    beforeEach(() => {
      token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
      // mongoose.Query.prototype.find = jest.fn().mockResolvedValue(MOCK_DATA);
      mockingoose(User).toReturn(MOCK_USER, "find");
      mockingoose(Article).toReturn(MOCK_ARTICLES, "find")
      mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
    });

    test("[Users] create Article", async () => {
        const res = await request(app)
          .post("/api/articles")
          .send(MOCK_DATA_CREATED)
          .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
    });

    test("[Users] delete Article", async () => {
        const res = await request(app)
            .delete("/api/articles/64520f671a5bbf18d9d74fb9")
            .set("x-access-token", token);
        expect(res.status).toBe(204);
    });

    test("[Users] modify Article", async () => {
        const res = await request(app)
          .put("/api/articles/" + ARTICLE_ID)
          .send(MOCK_DATA_CREATED)
          .set("x-access-token", token);
          console.log(res)
        expect(res.status).toBe(200);
    });

    afterEach(() => {
    jest.restoreAllMocks();
    });

});