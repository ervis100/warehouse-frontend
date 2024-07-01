export class Role {
  constructor(
    public id?: number,
    public name?: string
  ) {
  }

  static getInstance(params: any) {
    return new Role(
      params.id,
      params.name
    );
  }
}
