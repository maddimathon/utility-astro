---
title: Changelog
---

# Utility Astro Changelog

All notable changes to this project will be documented in this file after/on
each release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to 
[Semantic Versioning](https://semver.org/spec/v2.0.0.html), i.e.:
> Given a version number `MAJOR`.`MINOR`.`PATCH`, increment the:
> - `MAJOR` version when you make incompatible changes
> - `MINOR` version when you add backwards-compatible functionality
> - `PATCH` version when you make backwards-compatible bug fixes


<!--CHANGELOG_NEW-->


## **0.1.0-alpha.8** — 2025-12-02

Very small LoremIpsum content updates.


## **0.1.0-alpha.7** — 2025-12-01

ElementToggle class and Toggle component updates.  New TableOfContents component.

### Misc. Breaking
- ElementToggle constructor properties changed (now requires elements, not just
  container id)

### Added
- Added tag option to Toggle props
- New ElementToggle static methods to construct asynchronously
  (ElementToggle.init() and ElementToggle.new())
- New TableOfContents component
- Added option to set displayHeading to false in Heading props to add
  'unstyled-heading' utility class
- Added tag and headerTag options to Toggle props to change the element tags
- New htmlAttributeString() function for formatting html attributes from objects
- Added toc option to LoremIpsum props to display

### Changed
- Various improvements to the ElementToggle scripts:
    - Opts can now be passed to constructors for better configuration
    - By default or when opts.openWhenTargetted is true — if a toggle block is
      the url's targeted anchor, that toggle will be opened and focus will be
      set to the primary button (with focusVisible, including a fallback for
      poor browser support)

### Fixed
- Icon width display issue in Chrome (scss)


## **0.1.0-alpha.6** — 2025-11-26

Forgot to actually add a backdrop to ToggleNavMenu and fixed lack of
auto-scrolling for the toggle nav menu and website settings in short viewports.


## **0.1.0-alpha.5** — 2025-11-26

### Changed
- Switched styles for settings menu backdrop to styles in the toggle snippet via
  data-toggle-control-backdrop attribute selector
- Updates to the astro toggle menu scss


## **0.1.0-alpha.4** — 2025-11-15

Now actually compiling the scss to dist.


## **0.1.0-alpha.3** — 2025-11-15

### Breaking
- Updated utility-sass to 0.1.0-alpha.5


## **0.1.0-alpha.2** — 2025-10-30

Quick fix to utility-sass notice config.


## **0.1.0-alpha.1** — 2025-10-29

Forgot to include all files.


## **0.1.0-alpha** — 2025-10-29

A quick pre-release converting templates to scss-templater.  Version 0.1.0 won't
progress beyond alpha.