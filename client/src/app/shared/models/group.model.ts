import { UserGroupModel } from "./usergroup.model";

export interface GroupModel {
    groupId: string;
    name: string;
    users: UserGroupModel[];
}