import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";


/*
 * DOC : http://docs.aws.amazon.com/AmazonS3/latest/API/v2-RESTBucketGET.html
 *
 *
 *
 */


const contentToJSON = content => {

    return reduce(( res, node ) => {

        res[node.nodeName] = node.textContent;
        return res;

    }, {}, content);

};

const parseContents = map( contentNode => contentToJSON(contentNode.childNodes, {}) )

const baseURL = "https://s3.eu-west-2.amazonaws.com";
const bucketName = "imgs-yolo";

const emptyNode = name => ({
    textContent: "",
    nodeName: name,
    childNodes: []
});

const queryNode = ( doc, node ) => ( doc.querySelector(node) || emptyNode(node) );
const queryAllNodes = ( doc, node ) => ( doc.querySelectorAll(node) || [] );

export function middleware ( store ) {



    const getDocument = () => fetch(`${baseURL}/${bucketName}?list-type=2`)
        .then( res => res.text() )
        .then( xml => {

            const parser = new DOMParser();
            const data = parser.parseFromString(xml, "text/xml");
            return data;

        });

    const req = getDocument();
    req.then(console.log);
    req.then( doc => {

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

    })
        .then(console.log);

    return next => action => next(action);

}
