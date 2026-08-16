// src/ts/classes/ElementToggle.ts
var ElementToggle = class _ElementToggle {
  /* CONSTRUCTOR
   * ====================================================================== */
  /** 
   * Class constructor.
   */
  constructor(elements, partialOpts) {
    this.closingTimeout = null;
    /**
     * @since 0.1.0-beta.0.draft
     */
    this.#activeStateHold = false;
    this.opts = {
      activeTimeoutLength: (partialOpts?.closingTime ?? 1800) / 4,
      closeWhenUntargetted: false,
      closingTime: 1800,
      closingTimeProperty: "--toggle-closing-time",
      debug: false,
      openWhenTargetted: true,
      ...partialOpts
    };
    this.closingTime = this.opts.closingTime;
    this.allButtons = elements.allButtons;
    this.container = elements.container;
    this.content = elements.content;
    this.primaryButton = elements.primaryButton;
    this.attr = {
      active: this.container.dataset["toggleAttrStateActive"] || "data-state-active",
      focus: this.container.dataset["toggleAttrStateFocus"] || "data-state-focus"
    };
    const _containerType = this.container.dataset["toggleContainerType"]?.split(",") ?? [];
    this.isMenu = _containerType.includes("menu");
    this.asModal = this.isMenu || _containerType.includes("modal");
    this.isNav = _containerType.includes("nav") || !this.isMenu && (this.container.role === "navigation" || this.container.tagName.toLowerCase() === "nav");
    if (this.opts.debug) {
      console.debug("new ElementToggle()", {
        id: this.container.id,
        attr: this.attr,
        asModal: this.asModal,
        isMenu: this.isMenu,
        isNav: this.isNav
      });
    }
    this.activeTimeoutLength = Math.min(
      this.closingTime,
      Number.isNaN(this.opts.activeTimeoutLength) ? this.closingTime / 4 : this.opts.activeTimeoutLength
    );
    this.activateButton = this.activateButton.bind(this);
    this.deactivateButton = this.deactivateButton.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.validateButton = this.validateButton.bind(this);
    const _activateButton = this.activateButton;
    const _toggle = this.toggle;
    this.toggleListener = function() {
      _activateButton(this);
      _toggle(this);
    };
    const isCurrentAnchorTarget = this.opts.openWhenTargetted && this.checkUrlTarget(new URL(window.location.href));
    this.defaultIsOpen = this.isOpen || isCurrentAnchorTarget;
    if (!this.container || !this.primaryButton || !this.container.id || !this.content) {
      this.abortConstructor();
      return;
    }
    _ElementToggle.instances.set(this.container.id, this);
    this.setClosingTime();
    if (!isCurrentAnchorTarget) {
      this.primaryButton.removeAttribute(this.attr.focus);
    }
    Promise.all(this.allButtons.map(this.validateButton)).then(
      () => {
        if (this.defaultIsOpen) {
          if (isCurrentAnchorTarget) {
            this.openAsTargetAnchor();
          } else {
            this.open();
          }
        } else {
          this.container.setAttribute("data-toggle-container", "closed");
        }
        if (this.opts.openWhenTargetted) {
          window.addEventListener("hashchange", this.handleHashChange);
        }
      }
    );
  }
  static {
    /**
     * A map of existing successfully-registered instances of this class. Helps
     * to avoid re-initializing the same element or a block with the same id
     * value.
     * 
     * @since 0.1.0-beta.0.draft
     */
    this.instances = /* @__PURE__ */ new Map();
  }
  /**
   * @since 0.1.0-beta.0.draft
   */
  static isToggle(element) {
    return element.id ? _ElementToggle.instances.has(element.id) : false;
  }
  /**
   * Changes some properties and attributes on applicable elements since this
   * is an invalidly configured toggle element.
   * 
   * @since 0.1.0-alpha.7
   */
  static async abortNew(container, allButtons) {
    if (container) {
      container.setAttribute("data-toggle-container", "");
    }
    if (allButtons) {
      allButtons.forEach(
        (button) => {
          button.setAttribute("aria-disabled", "true");
          button.removeAttribute("aria-controls");
          button.removeAttribute("aria-expanded");
        }
      );
    }
  }
  /**
   * Queries the document for toggle containers to set them up as instances of
   * this class.
   *
   * @since 0.1.0-beta.0.draft
   */
  static async run(opts = {}) {
    document.querySelectorAll("[data-toggle-container]").forEach(
      async (con) => {
        if (opts.debug) {
          console.debug("ElementToggle.init()", { con });
        }
        if (con.id) {
          return _ElementToggle.new(con, opts).then(
            (instance) => {
              if (!opts.debug && opts.logResults) {
                const msgs = [
                  `[ElementToggle] new: ${con.id ?? ""}`
                ];
                if (instance) {
                  msgs.push(
                    "\ncontainer: ",
                    instance.container,
                    "\nopts: ",
                    instance.opts
                  );
                } else {
                  msgs.push("construction failed", "\ninstance: ", instance);
                }
                console.info(...msgs);
              }
            }
          );
        }
        if (!opts.debug && opts.logResults) {
          console.info("[ElementToggle] no valid container found");
        }
        return null;
      }
    );
  }
  /**
   * Adds a 'load' event listener that then {@link ElementToggle.run}, querying
   * the document for toggle containers to set them up as instances of this
   * class.
   *
   * @since 0.1.0-alpha.7
   * @since 0.1.0-beta.0.draft — Renamed from init to runOnLoad.
   */
  static async runOnLoad(opts = {}) {
    window.addEventListener("load", () => _ElementToggle.run(opts), { once: true });
  }
  /**
   * Initiates a single instance asynchronously.
   * 
   * @since 0.1.0-alpha.7
   */
  static async new(container, opts = {}) {
    const containerID = container?.id;
    if (!container || !containerID) {
      _ElementToggle.abortNew(container, null);
      if (opts.debug) {
        console.debug("ElementToggle.new() - aborting; no container id", { container });
      }
      return null;
    }
    if (_ElementToggle.instances.has(containerID)) {
      return null;
    }
    const allButtons = document.querySelectorAll(
      `[data-toggle-primary-control=${containerID}], [data-toggle-control=${containerID}]`
    );
    if (!allButtons.length) {
      _ElementToggle.abortNew(container, allButtons);
      if (opts.debug) {
        console.debug("ElementToggle.new() - aborting; no buttons", { container, allButtons });
      }
      return null;
    }
    const primaryButton = document.querySelector(
      `[data-toggle-primary-control=${containerID}]`
    ) ?? allButtons[0];
    if (!primaryButton) {
      _ElementToggle.abortNew(container, allButtons);
      if (opts.debug) {
        console.debug("ElementToggle.new() - aborting; no primary button", { container, primaryButton, allButtons });
      }
      return null;
    }
    const content = container.querySelector(
      `[data-toggle-content=${containerID}]`
    );
    if (!content) {
      _ElementToggle.abortNew(container, allButtons);
      if (opts.debug) {
        console.debug("ElementToggle.new() - aborting; no content element", { container, primaryButton, allButtons, content });
      }
      return null;
    }
    if (opts.debug) {
      console.debug("ElementToggle.new() - constructing", { container, primaryButton, allButtons, content });
    }
    return new _ElementToggle(
      {
        container,
        primaryButton,
        allButtons: Array.from(allButtons),
        content
      },
      opts
    );
  }
  static {
    this.openEvent = null;
  }
  static {
    this.closeEvent = null;
  }
  /** 
   * @param string  A CSS time value to convert to milliseconds.
   */
  static cssTimeToMilliseconds(string) {
    if (typeof string === "number") {
      return string;
    }
    if (string.includes("ms")) {
      return Number(string.replace(/\s*ms\s*$/gi, ""));
    }
    return Number(string.replace(/\s*s\s*$/gi, "")) * 1e3;
  }
  static createCustomEvents() {
    if (this.openEvent === null) {
      _ElementToggle.openEvent = new Event("toggle-open");
    }
    if (this.closeEvent === null) {
      _ElementToggle.closeEvent = new Event("toggle-close");
    }
  }
  /**
   * Whether this container is currently open.
   * 
   * @since 0.1.0-beta.0.draft
   */
  get isOpen() {
    return this.container.getAttribute("data-toggle-container") === "open";
  }
  /**
   * Validates the markup of a button used to toggle this element.
   * 
   * @since 0.1.0-beta.0.draft
   */
  async validateButton(button) {
    const contentID = this.content.id;
    button.addEventListener("click", this.toggleListener);
    if (contentID) {
      if (button.role == "button" || button.tagName.toLowerCase() == "button" || button.tagName.toLowerCase() == "a") {
        button.setAttribute("aria-controls", contentID);
      }
    }
    if (button.getAttribute("aria-controls")) {
      button.removeAttribute("aria-disabled");
      button.setAttribute("aria-expanded", this.isOpen ? "true" : "false");
      if (this.asModal) {
        button.setAttribute("aria-haspopup", "dialog");
        this.content.role = "dialog";
      }
    }
  }
  /**
   * {@inheritDoc ElementToggle.abortNew}
   * 
   * @since 0.1.0-alpha
   */
  abortConstructor() {
    _ElementToggle.abortNew(this.container, this.allButtons);
    window.removeEventListener("hashchange", this.handleHashChange);
    if (this.allButtons) {
      this.allButtons.forEach(
        (button) => button.removeEventListener("click", this.toggleListener)
      );
    }
  }
  /* UTILITIES
   * ====================================================================== */
  /**
   * @since 0.1.0-beta.0.draft
   */
  #activeTimeout;
  #activeStateHold;
  /**
   * Adds the active attribute to the buttons.
   * 
   * @since 0.1.0-beta.0.draft
   */
  activateButton(button) {
    clearTimeout(this.#activeTimeout);
    this.#activeStateHold = true;
    button.setAttribute(this.attr.active, "true");
    this.#activeTimeout = setTimeout(() => {
      this.#activeStateHold = false;
    }, this.activeTimeoutLength);
  }
  /**
   * Clears the related timeout, if any.
   */
  clearTimeout() {
    if (this.closingTimeout !== null) {
      clearTimeout(this.closingTimeout);
    }
    this.deactivateButton();
  }
  /**
   * Checks the current url anchor target and checks if it matches the id of
   * this toggle element.
   *
   * @since 0.1.0-alpha.7
   */
  checkUrlTarget(url) {
    if (!url.hash) {
      return false;
    }
    const hashAsId = url.hash.replace(/^#/gi, "");
    return hashAsId.toLowerCase() === this.container.id.toLowerCase();
  }
  /**
   * @since 0.1.0-beta.0.draft
   */
  #deactiveTimeout;
  /**
   * Removes the active attribute to the buttons.
   * 
   * @since 0.1.0-beta.0.draft
   */
  deactivateButton() {
    clearTimeout(this.#deactiveTimeout);
    if (this.#activeStateHold) {
      this.#deactiveTimeout = setTimeout(this.deactivateButton, 50);
      return;
    }
    this.primaryButton.removeAttribute(this.attr.active);
    this.allButtons.forEach((button) => button.removeAttribute(this.attr.active));
  }
  /**
   * If applicable (by opts), checks if the current url anchor targets
   * this toggle and if so, opens it.
   *
   * @since 0.1.0-alpha.7
   */
  handleHashChange(event) {
    if (!this.opts.openWhenTargetted) {
      return;
    }
    const isNewTarget = this.checkUrlTarget(new URL(event.newURL));
    if (!isNewTarget) {
      this.primaryButton.removeAttribute(this.attr.focus);
    }
    if (isNewTarget) {
      this.openAsTargetAnchor();
    }
    if (!isNewTarget && this.opts.closeWhenUntargetted && this.checkUrlTarget(new URL(event.oldURL)) && this.container.getAttribute("data-toggle-container") === "open") {
      this.close();
    }
  }
  /**
   * Opens the toggle element as if this is the current url anchor target. 
   * Opens regardless of the current `this.opts.openWhenTargetted` value.
   *
   * @since 0.1.0-alpha.7
   */
  openAsTargetAnchor() {
    this.open();
    this.primaryButton.setAttribute(this.attr.focus, "true");
    this.primaryButton.addEventListener(
      "blur",
      () => this.primaryButton.removeAttribute(this.attr.focus),
      { once: true }
    );
    this.primaryButton.focus({
      // @ts-ignore - IDE doesn't register an error but compile does - some tsconfig shenanigans, apparently.
      focusVisible: true
    });
  }
  #focusableContainerChildren;
  /**
   * The methods used as event listeners for trapping focus.
   * 
   * @since 0.1.0-beta.0.draft
   */
  get focusableContainerChildren() {
    if (this.#focusableContainerChildren) {
      return this.#focusableContainerChildren;
    }
    this.#focusableContainerChildren = _ElementToggle.getFocusableChildren(this.container);
    return this.#focusableContainerChildren;
  }
  #focusableContentChildren;
  /**
   * The methods used as event listeners for trapping focus.
   * 
   * @since 0.1.0-beta.0.draft
   */
  get focusableContentChildren() {
    if (this.#focusableContentChildren) {
      return this.#focusableContentChildren;
    }
    this.#focusableContentChildren = _ElementToggle.getFocusableChildren(this.content);
    return this.#focusableContentChildren;
  }
  #focusTrappers;
  /**
   * The methods used as event listeners for trapping focus.
   * 
   * @since 0.1.0-beta.0.draft
   */
  get focusTrappers() {
    if (this.#focusTrappers) {
      return this.#focusTrappers;
    }
    const container = this.container;
    const focusableContainerChildren = this.focusableContainerChildren;
    const primaryButton = this.primaryButton;
    const toggleClose = this.close.bind(this);
    this.#focusTrappers = {
      keydown: function(event) {
        if (event.code === "Escape") {
          toggleClose();
        }
      },
      first: function(event) {
        if (event.relatedTarget && !container.contains(event.relatedTarget)) {
          (focusableContainerChildren.last ?? primaryButton).focus();
        }
      },
      last: function(event) {
        if (event.relatedTarget && !container.contains(event.relatedTarget)) {
          (focusableContainerChildren.first ?? primaryButton).focus();
        }
      },
      any: function(event) {
        if (event.relatedTarget && !container.contains(event.relatedTarget)) {
          (focusableContainerChildren.first ?? primaryButton).focus();
        }
      }
    };
    return this.#focusTrappers;
  }
  /**
   * Sets the closing time property via computed style value.
   * 
   * @since 0.1.0-beta.0.draft
   */
  setClosingTime() {
    const computedClosingTime = getComputedStyle(this.container).getPropertyValue(this.opts.closingTimeProperty);
    this.closingTime = _ElementToggle.cssTimeToMilliseconds(
      computedClosingTime?.length ? computedClosingTime : this.opts.closingTime
    );
  }
  /**
   * Called when the element is toggled open.
   * 
   * @since 0.1.0-beta.0.draft
   */
  trapFocus() {
    if (!this.isOpen) {
      this.untrapFocus();
      return;
    }
    const focusableContainerChildren = this.focusableContainerChildren;
    const focusTrappers = this.focusTrappers;
    document.addEventListener("keydown", focusTrappers.keydown, { capture: true });
    focusableContainerChildren.all.forEach(
      (element) => {
        if (element.isSameNode(focusableContainerChildren.first ?? null)) {
          element.addEventListener("blur", focusTrappers.first);
          return;
        }
        if (element.isSameNode(focusableContainerChildren.last ?? null)) {
          element.addEventListener("blur", focusTrappers.last);
          return;
        }
        element.addEventListener("blur", focusTrappers.any);
      }
    );
  }
  /**
   * Called when the element is toggled closed.
   * 
   * @since 0.1.0-beta.0.draft
   */
  untrapFocus() {
    const focusableContainerChildren = this.focusableContainerChildren;
    const focusTrappers = this.focusTrappers;
    focusableContainerChildren.all.forEach(
      (element) => {
        if (!focusTrappers) {
          return;
        }
        document.removeEventListener("keydown", focusTrappers.keydown, { capture: true });
        element.removeEventListener("blur", focusTrappers.first);
        element.removeEventListener("blur", focusTrappers.last);
        element.removeEventListener("blur", focusTrappers.any);
      }
    );
  }
  /* TOGGLING
   * ====================================================================== */
  /**
   * Toggles the open/close state of the element.
   */
  toggle(button) {
    this.activateButton(button ?? this.primaryButton);
    if (!this.container) {
      return;
    }
    switch (this.container.getAttribute("data-toggle-container")) {
      case "closed":
      case "closing":
        this.clearTimeout();
        this.open();
        break;
      case "open":
      default:
        this.clearTimeout();
        this.close();
        break;
    }
    this.deactivateButton();
  }
  /**
   * Toggles the element open.
   */
  open() {
    if (!this.allButtons || !this.container) {
      this.deactivateButton();
      return;
    }
    this.setClosingTime();
    this.container.setAttribute("data-toggle-container", "open");
    this.allButtons.forEach((button) => {
      if (button.getAttribute("aria-controls")) {
        button.setAttribute("aria-expanded", "true");
      }
    });
    if (this.asModal) {
      this.trapFocus();
      this.content.focus();
    }
    _ElementToggle.createCustomEvents();
    this.container.dispatchEvent(_ElementToggle.openEvent);
    this.deactivateButton();
  }
  /**
   * Toggles the element closed.
   */
  close() {
    if (this.asModal) {
      this.untrapFocus();
    }
    if (!this.container) {
      this.deactivateButton();
      return;
    }
    this.allButtons.forEach((button) => {
      if (button.getAttribute("aria-controls")) {
        button.setAttribute("aria-expanded", "false");
      }
    });
    this.container.setAttribute("data-toggle-container", "closing");
    this.closingTimeout = setTimeout(
      () => {
        this.container.setAttribute("data-toggle-container", "closed");
        _ElementToggle.createCustomEvents();
        this.container.dispatchEvent(_ElementToggle.closeEvent);
      },
      this.closingTime + 50
    );
    this.deactivateButton();
  }
};
((ElementToggle2) => {
  function getFocusableChildren(container) {
    const elements = Array.from(
      container.querySelectorAll(
        `a,
                button,
                input,
                textarea,
                select,
                details,
                iframe,
                embed,
                object,
                summary,
                dialog,
                audio[controls],
                video[controls],
                [contenteditable],
                [tabindex]
              `
      )
    );
    return {
      get all() {
        return elements;
      },
      get keyboardOnly() {
        return this.all.filter(
          (element) => {
            if (element.hasAttribute("disabled") || element.hasAttribute("aria-disabled")) {
              return false;
            }
            if (element.hasAttribute("hidden")) {
              return false;
            }
            if (window.getComputedStyle(element).display === "none") {
              return false;
            }
            if (element.tabIndex <= -1) {
              return false;
            }
            return true;
          }
        );
      },
      get first() {
        return this.keyboardOnly[0];
      },
      get last() {
        return this.keyboardOnly[this.keyboardOnly.length - 1];
      }
    };
  }
  ElementToggle2.getFocusableChildren = getFocusableChildren;
})(ElementToggle || (ElementToggle = {}));
export {
  ElementToggle
};
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
