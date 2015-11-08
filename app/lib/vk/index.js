import {Query,QueryRunner} from './QueryRunner'
import * as adviceDog from './extensions/adviceDog'
import * as groupsAndUsers from './extensions/groupsAndUsers'
import * as wall from './extensions/wall'

/**
 * Universal VK browser interface
 * provides login, logout and call interfaces
 * @class VK
 *
 * @method VK.login
 * @method VK.logout
 * */
export class VK {
    /**
     * VK Constructor
     * @constructs VK
     */
    constructor() { this.queryRunner = new QueryRunner() }

    /** @private */
    get sid() { return this._sid }

    /** @private */
    set sid(val) { this.queryRunner.access_token = this._sid = val }

    /**
     * VK Api request smart wrapper
     * @param {string} method - request method name
     * @param {object=} opts - request opts
     * @param {string=} postfix - optional reducer for "execute" method
     * */
    call(method, opts, postfix) { return this.queryRunner.addQuery(method, opts, postfix) }
}

for (let pkg of [adviceDog, groupsAndUsers, wall]) {
    for (let key of Object.keys(pkg)) {
        VK.prototype[key] = pkg[key]
    }
}
