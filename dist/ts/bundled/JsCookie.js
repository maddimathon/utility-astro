// src/ts/classes/JsCookie.ts
var JsCookie = class {
  constructor(name, path, expireDaysOrOpts, dep_defaultValue = null, dep_copyToLocalStorage = false) {
    this.name = name;
    this.path = path;
    const maxAge = 60 * 60 * 24 * 365 * 5;
    this.opts = typeof expireDaysOrOpts !== "object" ? {
      copyToLocalStorage: dep_copyToLocalStorage,
      fallbackValue: dep_defaultValue ?? null,
      expireDays: expireDaysOrOpts ?? null,
      maxAge
    } : {
      copyToLocalStorage: expireDaysOrOpts?.copyToLocalStorage ?? false,
      fallbackValue: expireDaysOrOpts?.fallbackValue ?? null,
      expireDays: expireDaysOrOpts?.expireDays ?? null,
      maxAge: expireDaysOrOpts?.maxAge ?? maxAge
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
        date: d.toUTCString(),
        expireDays
      };
    })() : null;
    const cookie = {
      [this.name]: value,
      expires: expiry?.date?.length ? expiry.date : null,
      "max-age": expiry?.date?.length ? expiry.expireDays <= 0 ? 0 : null : String(this.opts.maxAge),
      path: this.path
    };
    const cookieString = [];
    for (const key in cookie) {
      if (cookie[key] !== null) {
        cookieString.push(`${key}=${cookie[key]}`);
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
