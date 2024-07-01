import {User} from "./user.model";
import {Token} from "./token.model";

export class Auth {
    public constructor(
      public user: User,
      public token: string
    ) {
    }

    static getInstance(params: any): Auth
    {
      return new Auth(
        User.getInstance(params.user),
        params.token
      );
    }
}
