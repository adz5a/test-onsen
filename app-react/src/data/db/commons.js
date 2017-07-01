import {
    ACTIONFACTORY
} from "./../commons";

const ACTION = ACTIONFACTORY("pouch");

export const SAVE = ACTION("save");
export const ADD_TAG = ACTION("add-tag");
export const BULK_SAVE = ACTION("bulk-save");
