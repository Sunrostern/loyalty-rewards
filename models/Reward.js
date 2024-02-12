class Reward {
  constructor(id, userId, tokenId, status, createdAt, redeemedAt = null) {
    this.id = id;
    this.userId = userId;
    this.tokenId = tokenId;
    this.status = status; // 'Pending', 'Minted', 'Redeemed', 'Transferred'
    this.createdAt = createdAt;
    this.redeemedAt = redeemedAt;
  }
}

module.exports = Reward;