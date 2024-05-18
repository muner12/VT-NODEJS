const Memcached = require("memcached");
const promisify = require("util").promisify;
class MEMCASH {
  constructor() {
    this.memcached = new Memcached("localhost:11211");
    this.setInCache = promisify(this.memcached.set.bind(this.memcached));
    this.getFromCache = promisify(this.memcached.get.bind(this.memcached));
  }
}

module.exports = new MEMCASH();
