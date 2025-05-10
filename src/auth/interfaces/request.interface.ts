import { Request } from "express";
import { UserInterface } from "./user.interface";

export interface RequestInterface extends Request {
    user: UserInterface;
}