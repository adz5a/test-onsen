import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";
import {
    PROCESSING,
    isSafe
} from "data/commons";
import {
    LOAD
} from "./reducer";
import {
    baseURL,
    bucketName
} from "./commons";

const meta = metaData => ({
    ...metaData,
    origin: "middleware"
});
const contentToJSON = content => {

    return reduce(( res, node ) => {

        res[node.nodeName] = node.textContent;
        return res;

    }, {}, content);

};

const parseContents = map( contentNode => contentToJSON(contentNode.childNodes, {}) )

console.log(process.env);

const emptyNode = name => ({
    textContent: "",
    nodeName: name,
    childNodes: []
});

const queryNode = ( doc, node ) => ( doc.querySelector(node) || emptyNode(node) );
const queryAllNodes = ( doc, node ) => ( doc.querySelectorAll(node) || [] );
const parseXML = xmlString => {

    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");

};

const xmlToJSON = doc => {

    const name = queryNode(doc, "Name").textContent;
    const nextContinuationToken = queryNode(doc, "NextContinuationToken").textContent;
    const keyCount = queryNode(doc, "KeyCount").textContent;
    const maxKeys = queryNode(doc, "MaxKeys").textContent;
    const isTruncated = queryNode(doc, "IsTruncated").textContent;
    const contents = queryAllNodes(doc, "Contents");

    return {
        contents: parseContents(contents),
        name,
        nextContinuationToken,
        keyCount,
        maxKeys,
        isTruncated,
    };

}


const getDocument = () => fetch(`${baseURL}/${bucketName}?list-type=2`)
    .then( res => res.text() )
    .then(parseXML);

const loadData = () => getDocument()
    .then(xmlToJSON);


export function middleware ( store ) {

    return next => action => {

        const { type } = action;

        switch ( type ) {

            case LOAD:
                if ( isSafe(action) ) {

                    loadData()
                        .then(
                            data => store.dispatch({
                                type,
                                data,
                                meta: meta()
                            })
                        );
                    return next({
                        type: PROCESSING,
                        data: action,
                        meta: meta()
                    });

                } else {

                    return next(action);

                }

            default:
                return next(action);

        }

    };

}
