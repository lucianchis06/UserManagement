import { JwtHelperService } from "@auth0/angular-jwt";

export interface TokenModel {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
}

export class TokenUtil {
          
    public static decode() : TokenModel {
        var token = localStorage.getItem("currentToken");

        const helper = new JwtHelperService();

        var decodedToken: TokenModel = null;
        if (!helper.isTokenExpired(token)) {
          // logged in so return true
          decodedToken = <TokenModel>helper.decodeToken(token);
        }

        return decodedToken;
    }
    
}