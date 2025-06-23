---
title: Changelog
---

# NPM Library Template Changelog

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


## **1.3.0+tmpl** — 2025-06-11

Finally added @maddimathon/build-utilities@0.1.0 !

### Added
- Added @maddimathon/build-utilities@0.1.0 as a dev-dependency
- GitHub pages action to only compile on package release
- Basic scss compiling to css
- Proper scss exports (tested locally)

### Changed
- Updated code-snippet files and contents
- Removed the dist dir from this repo

### Fixed
- Updated @maddimathon/utility-typescript to 2.0.0-beta


## **1.3.0+tmpl** — 2025-06-11

Finally added @maddimathon/build-utilities@0.1.0 !

### Added
- Added @maddimathon/build-utilities@0.1.0 as a dev-dependency
- GitHub pages action to only compile on package release
- Basic scss compiling to css

### Changed
- Updated code-snippet files and contents
- Removed the dist dir from this repo

### Fixed
- Updated @maddimathon/utility-typescript to 2.0.0-beta


## **1.2.2+tmpl** — 2025-05-13

### Changed
- Minor build script improvements

### Fixed
- Corrected vulnerable outdated inherited dependencies -- cross-spawn, lodash,
  minimatch


## **1.2.1+tmpl** — 2025-05-10

### Changed
- Updated README template
- Minor documentation updates
- Updated dependency versions


## **1.2.0+tmpl** — 2025-05-10

### Added
- Now (dev) depending on
  [@maddimathon/utility-typescript](https://github.com/maddimathon/utility-typescript)
  in build scripts
- Added a release build script based on `@maddimathon/utility-typescript`

### Changed
- Switched from `tmpl-[MAJOR].[MINOR].[PATCH]` format to
  `[MAJOR].[MINOR].[PATCH]+tmpl` (complies with SemVer standard)


## **1.1.0+tmpl** — 2025-04-10
- Added Document build stage and scripts
- Better TypeDoc output and theme
- Some script system improvements
- Better code header snippets - especially for TypeDoc modules


## **1.0.0+tmpl** — 2025-04-08

Initial release; everything is new:
- Build scripts (basic, to update later)
- File header code snippets
- GitHub workflow for privately publishing the npm package to github (about to
  be tested)
- ReadMe template
- Unit testing and documentation (typescript)