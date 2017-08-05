import mongoose from "mongoose"

import expressApp from "./init/expressApp";

mongoose.Promise = global.Promise; // using the native promise

mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
    .then(() => console.log(":-) MongoDB Connected! = "))
    .catch(err => console.error(err));

let { PORT } = process.env;
expressApp.listen(PORT, () => {
    console.log("Listening on ", PORT);
});


