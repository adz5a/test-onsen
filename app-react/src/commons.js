import { 
    toUpper,
    map,
} from "lodash";

export function joinUppercase ( ...strings ) {

    return map(strings, toUpper).join("/");

}
