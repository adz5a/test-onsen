"use strict";
const map = require("lodash/fp/map");
const parseXML = DOMParser => xmlString => {

    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");

};


const emptyNode = name => ({
        textContent: "",
        nodeName: name,
        childNodes: []
});

const queryNode = ( doc, nodeName ) => ( doc.querySelector(nodeName) || emptyNode(nodeName) );

const queryAllNodes = ( doc, nodeName ) => ( doc.querySelectorAll(nodeName) || [] );


const textContent = node => node.textContent;


const listPrefixes = parser => ( { baseURL, bucketName }, set = new Set(), prefix = "" ) => {

    const prefixQuery = prefix ?
        "&prefix=" + prefix :
        ""

    return fetch(`${baseURL}/${bucketName}?list-type=2&delimiter=/` + prefixQuery)
        .then( res => res.text() )
        .then(xml => {

            // list prefix and remove 
            // non valid ones : empty
            // or equal to provided prefix
            const document = parser(xml);

            const prefixes = map(
                textContent,
                queryAllNodes(document, "Prefix")
            )
                .map( p => p.trim() )
                .filter( p => {

                    return  ( p.length >= 1 ) && ( p !== prefix ) && !set.has(p);

                } )

            // add all to the accumulator set
            prefixes.forEach( p => set.add(p) );

            // recur if needed
            if ( prefixes.length > 0 ) {

                return Promise.all(prefixes.map(
                    p => listPrefixes(parser)({ 
                        baseURL,
                        bucketName
                    }, 
                        set,
                        p
                    ))
                ).then(() => set);

            } else return set;

        });

}

module.exports = {
    parseXML,
    emptyNode,
    queryNode,
    queryAllNodes,
    listPrefixes
};
