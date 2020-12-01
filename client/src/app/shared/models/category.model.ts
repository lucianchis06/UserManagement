import { UserCategoryModel } from "./usercategory.model";

export interface CategoryModel {
    categoryId: string;
    name: string;
    users: UserCategoryModel[];

    isSelected: boolean;
}