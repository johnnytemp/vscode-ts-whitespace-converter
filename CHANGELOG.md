# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2020-06-11

### Added
- Now only convert the lines of the current text selection(s), if it is not a single empty selection.

### Changed
- Reposition the cursor nicely after the operation.

## [1.1.1] - 2018-07-27

### Fixed
- Fix a minor "incomplete" conversion case for "Spaces to Tabs": if the input contain mixed spaces and tab in, e.g. the first indentation column, extra spaces before a tab is not removed.

## [1.1.0] - 2018-07-22

### Changed
- Optimize "Spaces to Tabs" conversion.

## [1.0.0] - 2018-07-21

### Added
- Add "Tabs to Spaces" and "Spaces to Tabs" conversions.
