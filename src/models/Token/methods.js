export function toJSON() {
  const token = this.toObject();
  delete token.user;
  delete token._id;
  delete token.createdAt;
  delete token.__v;
  return token;
}

export function isExpired() {
  const token = this;
  return new Date(token.expireDate).getTime() < Date.now();
}
