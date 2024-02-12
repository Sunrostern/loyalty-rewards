class User {
  constructor(id, walletAddress, email) {
    this.id = id;
    this.walletAddress = walletAddress;
    this.email = email;
    this.rewards = [];
  }
}

module.exports = User;