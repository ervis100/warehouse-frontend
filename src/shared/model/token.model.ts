export class Token {
  constructor(
    public accessToken: string,
    public expiredDate: number,
    public refreshToken: string,
    public refreshTokenExp: number,
  ) {
  }

  static getInstance(params: any): Token
  {
    return new Token(
      params.accessToken,
      params.expiredDate,
      params.refreshToken,
      params.refreshTokenExp
    );
  }
}
