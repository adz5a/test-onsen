import {
    isCordova
} from "./env";


let Router;


if ( isCordova ) {

   Router = require("react-router-dom").HashRouter; 

} else {

   Router = require("react-router-dom").BrowserRouter; 
    
}

export default Router;
