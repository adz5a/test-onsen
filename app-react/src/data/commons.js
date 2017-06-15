import {
    joinUppercase 
} from "./../commons";
import {
    partial
} from "lodash";

export const ACTIONFACTORY = prefix => partial(joinUppercase, prefix);

const GLOBALACTION = ACTIONFACTORY("global");

export const PROCESSING = GLOBALACTION("procressing");


