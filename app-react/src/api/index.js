import firebase from "firebase";

export function initApi ( config ) {

    const app = firebase.initializeApp(config);

    return app;

}
