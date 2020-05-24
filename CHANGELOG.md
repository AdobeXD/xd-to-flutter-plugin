# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD
### Added
- added robust 'Combine Shapes' feature on Groups
- check for reserved words in widget / param names
- warning for negative grid spacing
- keyboard shortcut for export selected widget (cmd/ctrl-opt-shift-f)
- keyboard shortcut for copy to clipboard (cmd/ctrl-opt-c)
- note in example README that it should use the dev channel of Flutter

### Changed
- extensive refactor/reorganization of code
- fix an issue with the opacity of disabled blurs affecting fill opacity
- minor dart formatting improvements
- fix an error when validating a project with no pubspec
- update example to use correct plugin id
- default widget name prefix from 'XD_' to 'XD'
- fix a RTE when a pagelink pointed to an Artboard with a duplicate name
- will no longer export duplicate SVG strings

### Removed
- shape collapsing across group bounds


## [0.1.1] - 2020-05-14
### Added
- n/a

### Changed
- fixed an issue with warnings about missing fonts in the pubspec.yaml file
- fixed a problem with stroke opacity on shapes

### Removed
- n/a


## [0.1.0] - 2020-05-12
### Added
- initial Early Access release