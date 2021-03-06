const { data } = require("./list.json");

module.exports = {
  prompt: ({ prompter }) =>
    prompter
      .prompt({
        type: "select",
        name: "level",
        message: "Select level",
        choices: ["easy", "medium", "hard", "extreme"],
      })
      .then((answers) =>
        prompter
          .prompt({
            type: "autocomplete",
            name: "title",
            message: "Select title",
            choices: data.filter((item) => item.includes(`-${answers.level}-`)),
          })
          .then((nextAnswers) => Object.assign({}, answers, nextAnswers))
      ),
};
