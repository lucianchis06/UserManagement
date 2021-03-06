import { UserCategoryModel } from "./usercategory.model";

export interface UserModel {
    userId: string;
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
    categories: UserCategoryModel[];
}