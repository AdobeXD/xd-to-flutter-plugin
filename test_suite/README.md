# XD to Flutter Test Suite

The `test_suites.xd` file comprises a _reasonably_ comprehensive collection of tests for most features of the XD to Flutter plugin. It includes working features (in green), unsupported features/scenarios (in red), and known issues (in yellow, with an issue number per the GitHub repo). It also identifies when warnings are generated (black warning icon), or should be but aren't (yellow warning icon).

## Use and Maintenance
The test suite should be updated to cover new scenarios whenever changes are made to the plugin. It should also be run and the output verified prior to committing any updates or publishing a new plugin.

Always ensure the XD plugin debug console is open when testing against the plugin. The UXP Developer Tool does not capture console outputs, so it is very important to verify that the export completed successfully. Otherwise, export may fail silently, but the prior exported code will be left, which may mislead you to believe everything ran successfully.

### Verifying code
In addition to visual verificiation, some tests, such as layout simplification and shape collapsing, should have the generated code verified, especially if changes have been made that would impact them.

## Errors in output
The "dupe params of diff types" Component test will output a `xd_dupe_params_diff_type.dart` file that has errors. It will also generate an error in the panel. This is expected, and you can either delete that file to remove the errors, or it should run fine if you "ignore build errors".