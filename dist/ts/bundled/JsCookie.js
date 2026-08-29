// src/ts/classes/JsCookie.ts
var JsCookie = class {
  constructor(name, pathOrOpts, dep_expireDays = null, dep_defaultValue = null, dep_copyToLocalStorage = false) {
    this.name = name;
    const maxAge = 60 * 60 * 24 * 365 * 5;
    this.opts = typeof pathOrOpts !== "object" ? {
      copyToLocalStorage: dep_copyToLocalStorage,
      domain: void 0,
      expireDays: dep_expireDays ?? null,
      fallbackValue: dep_defaultValue ?? null,
      maxAge,
      path: pathOrOpts ?? "/"
    } : {
      copyToLocalStorage: pathOrOpts?.copyToLocalStorage ?? false,
      domain: pathOrOpts?.domain,
      expireDays: pathOrOpts?.expireDays ?? null,
      fallbackValue: pathOrOpts?.fallbackValue ?? null,
      maxAge: pathOrOpts?.maxAge ?? maxAge,
      path: pathOrOpts?.path ?? "/"
    };
  }
  /**
   * Empties the contents of this cookie.
   */
  delete() {
    this.set("", -1);
    if (this.opts.copyToLocalStorage) {
      window.localStorage.removeItem(this.name);
    }
  }
  /**
   * Gets the current value of this cookie.
   */
  get() {
    const decodedCookie = decodeURIComponent(document.cookie).split(";").map((str) => str.trim());
    const cookieRegex = new RegExp(`^${this.name}=`, "g");
    for (const pair of decodedCookie) {
      if (pair.match(cookieRegex) !== null) {
        return pair.replace(cookieRegex, "");
      }
    }
    return this.opts.fallbackValue;
  }
  /**
   * Sets this browser cookie.
   */
  set(value, expireDays = this.opts.expireDays) {
    if (this.opts.copyToLocalStorage) {
      window.localStorage.setItem(this.name, value);
    }
    const expiry = typeof expireDays === "number" ? (() => {
      const d = /* @__PURE__ */ new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1e3);
      return {
        date: d.toISOString(),
        expireDays
      };
    })() : null;
    const cookie = {
      [this.name]: value,
      domain: this.opts.domain ?? null,
      expires: expiry?.date?.length ? expiry.date : null,
      "max-age": expiry?.date?.length ? expiry.expireDays <= 0 ? 0 : null : String(this.opts.maxAge),
      path: this.opts.path
    };
    const cookieString = [];
    for (const key in cookie) {
      const value2 = cookie[key];
      if (value2 !== null && typeof value2 !== "undefined") {
        cookieString.push(`${key}=${value2}`);
      }
    }
    document.cookie = cookieString.join("; ");
  }
};
export {
  JsCookie
};
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
