export function isExpired() {
  const token = this;
  return new Date(token.expireDate).getTime() < Date.now();
}
