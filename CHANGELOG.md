# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2021-02-08
### Added
- warning for non-center strokes on shapes (#90)
- initial work to improve debug logging, with timing support
- added a commented out line in example/pubspec.yaml to demonstrate how to use dev/master channel

### Changed
- line height is no longer applied on first line when running in Flutter, to match XD behavior (#84)
- fixed a run time error related to duplicate component names (#78)
- fixed an issue with null color values (#75)
- fixed a run time error related to unsupported transitions or eases (#72)
- fixed an issue with grids containing only identical children (#88)
- fixed for up/down transitions being reversed (#91)
- fixed issue with static sized repeat grids (#97)
- text width padding now accounts for letter spacing

### Removed
- n/a


## [1.0.0] - 2020-07-23
### Added
- layout support (does not include padding or stacks)
- option to export character style assets
- XD version detection at run time, which should allow a lower min version in the marketplace

### Changed
- major refactor of serialization code
- updated transformation model
- multiple optimizations
- finds fonts & unsupported features properly in rich text
- improved handling for nested grids
- better support for more complex grid items
- changed Export Selected Widget's shortcut to Cmd-Shift-Alt-1
- multiple minor bug fixes
- improved handling for artboard backgrounds

### Removed
- object blur support


## [0.1.3] - 2020-06-01
### Added
- n/a

### Changed
- fixed a RTE caused by empty Groups
- made image names a bit more resilient in cases where XD breaks our hashing
- only export a SingleChildScrollView for text fields with overflow in XD
- minor refactoring

### Removed
- n/a


## [0.1.2] - 2020-05-25
### Added
- added robust 'Combine Shapes' feature on Groups
- check for reserved words in widget / param names
- warning for negative grid spacing
- keyboard shortcut for export selected widget (cmd/ctrl-shift-d)
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
- n/a


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