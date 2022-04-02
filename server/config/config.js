const mongoose = require("mongoose");

mongoose.set("autoIndex", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

const dbCredencials = {
    user: "HeezQ",
    pass: "Technischools!",
};
const hostDB = `mongodb+srv://${dbCredencials.user}:${dbCredencials.pass}@cluster0.yvidg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = {
    hostDB,
};
