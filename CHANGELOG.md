# Changelog

## 0.1.12

<!-- generated comparing v0.1.11..master -->

_May 17, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Added a new Autocomplete component, simplify the configuration for creating custom components, improve performance with websocket updates instead of polling.

- &#8203;<!-- 21 -->Fix race condition with initializing the canvas bridge (#2035) @Janpot
- &#8203;<!-- 20 -->Add Autocomplete component (#1427) @bharatkashyap
- &#8203;<!-- 19 -->Upgrade monorepo (#2023) @bharatkashyap
- &#8203;<!-- 18 -->Improve isolation of runtime from editor (#2021) @Janpot
- &#8203;<!-- 17 -->Replace polling for updates with websocket (#2007) @Janpot
- &#8203;<!-- 16 -->Improve and test basic auth implementation (#2022) @Janpot
- &#8203;<!-- 15 -->Reorganize @mui/toolpad-core exports (#2018) @Janpot
- &#8203;<!-- 14 -->version examples instead of using latest (#2030) @Janpot
- &#8203;<!-- 13 -->Add section about page configuration to docs (#1997) @apedroferreira
- &#8203;<!-- 12 -->Add theming to docs (#1993) @apedroferreira
- &#8203;<!-- 11 -->Improve types for onChangeProp (#2002) @Janpot
- &#8203;<!-- 10 -->Remove hideControls and button type (#2017) @Janpot
- &#8203;<!-- 09 -->Correctly set charset for preview html (#2020) @Janpot
- &#8203;<!-- 08 -->Remove unused config (#2008) @Janpot
- &#8203;<!-- 07 -->Make canvas column spacing the same as in the runtime (#2016) @Janpot
- &#8203;<!-- 06 -->Move to zod-to-json-schema (#2003) @Janpot
- &#8203;<!-- 05 -->Deprecate typeDef (#1994) @Janpot
- &#8203;<!-- 04 -->Clean up dead code (#2000) @Janpot
- &#8203;<!-- 03 -->Add jest tests for `create-toolpad-app` (#1965) @bharatkashyap
- &#8203;<!-- 02 -->[docs] Make code the hero (#1992) @bharatkashyap
- &#8203;<!-- 01 -->[docs] Fix 404 link to fix the page (#2009) @oliviertassinari

## 0.1.11

<!-- generated comparing v0.1.10..master -->

_May 10, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Allow setting page parameters in navigation actions, fix overlay grid spacing, add schema reference to docs.

- &#8203;<!-- 11 -->Update references and screenshots (#1987) @apedroferreira
- &#8203;<!-- 10 -->Add Toolpad file schema reference to the docs (#1940) @Janpot
- &#8203;<!-- 09 -->Fix broken preview in vite runtime (#1989) @Janpot
- &#8203;<!-- 08 -->Deps fix (#1985) @Janpot
- &#8203;<!-- 07 -->Fix console.error being called in tests (#1966) @Janpot
- &#8203;<!-- 06 -->Change tests structure to use ESM (#1970) @bharatkashyap
- &#8203;<!-- 05 -->Fix overlay grid spacing (#1947) @apedroferreira
- &#8203;<!-- 04 -->Add page parameters to navigation actions (#1876) @apedroferreira
- &#8203;<!-- 03 -->Separate deps updates for docs in renovatebot (#1980) @Janpot
- &#8203;<!-- 02 -->Isolate next updates (#1979) @Janpot
- &#8203;<!-- 01 -->Pin all dependencies (#1968) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## 0.1.10

<!-- generated comparing v0.1.9..master -->

_May 5, 2023_

A big thanks to the 1 contributors who made this release possible. Here are some highlights ✨:

This is a hotfix to deal with broken dependency upgrade in next.js.

- &#8203;<!-- 2 -->Pin next.js (#1967) @Janpot
- &#8203;<!-- 1 -->Upgrade monorepo (#1964) @Janpot

All contributors of this release in alphabetical order: @Janpot

## 0.1.9

<!-- generated comparing v0.1.8..master -->

_May 3, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Fixing regressions, set new runtime as default.

- &#8203;<!-- 7 -->Fix preview header missing in app preview (#1962) @Janpot
- &#8203;<!-- 6 -->small improvements (#1960) @Janpot
- &#8203;<!-- 5 -->Fix: Wrapping on Text/Link (#1956) @bharatkashyap
- &#8203;<!-- 4 -->Added dog app arcade to quickstart section of docs (#1942) @prakhargupta1
- &#8203;<!-- 3 -->Optimize some docs images (#1946) @apedroferreira
- &#8203;<!-- 2 -->Fix autocomplete after monaco-editor upgrade (#1943) @Janpot
- &#8203;<!-- 1 -->Make vite runtime default (#1938) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @prakhargupta1

## 0.1.8

<!-- generated comparing v0.1.7..master -->

_Apr 26, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Use page name as a routing alias, add a Form component, and replace Next.js API routes with Express under the hood.

- &#8203;<!-- 12 -->Add page name as an alias for routing in the runtime (#1925) @Janpot
- &#8203;<!-- 11 -->Use correct command for opening vscode (#1931) @Janpot
- &#8203;<!-- 10 -->Replace next api routes with express (#1920) @Janpot
- &#8203;<!-- 09 -->Add link to open example in CodeSandbox (#1936) @Janpot
- &#8203;<!-- 08 -->Fix: Local installation needs new resolution (#1932) @bharatkashyap
- &#8203;<!-- 07 -->Fix: Use `nanonid/non-secure` instead of `cuid` (#1912) @bharatkashyap
- &#8203;<!-- 06 -->Form component (#1926) @apedroferreira
- &#8203;<!-- 05 -->Import correct font in vite runtime (#1924) @Janpot
- &#8203;<!-- 04 -->Update CONTRIBUTING.md @apedroferreira
- &#8203;<!-- 03 -->Fix gitignore file creation log message (#1923) @Janpot
- &#8203;<!-- 02 -->Add utils package for generic non-toolpad utilities (#1915) @Janpot
- &#8203;<!-- 01 -->[docs] Polish a bit the docs (#1927) @oliviertassinari

## 0.1.7

<!-- generated comparing v0.1.6..master -->

_Apr 20, 2023_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Tweak the landing page design. Improve `create-toolpad-app` CLI, support node modules in custom code components.

- &#8203;<!-- 14 -->Add folder as argument to `create-toolpad-app` (#1795) @bharatkashyap
- &#8203;<!-- 13 -->Delete page on file system when deleted in UI (#1913) @Janpot
- &#8203;<!-- 12 -->New vite based application runtime (#1881) @Janpot
- &#8203;<!-- 11 -->Fix Windows issues (WIP) (#1910) @apedroferreira
- &#8203;<!-- 10 -->Use npm registry to check for new versions (#1895) @Janpot
- &#8203;<!-- 09 -->Update MUI monorepo (#1883) @apedroferreira
- &#8203;<!-- 08 -->Fix: Remove `default` from `toolpad dev --port` option (#1911) @bharatkashyap
- &#8203;<!-- 07 -->Deprecate `createQuery` and replace with `createFunction` (#1908) @bharatkashyap
- &#8203;<!-- 06 -->Show border on hover in interactive nodes (#1907) @apedroferreira
- &#8203;<!-- 05 -->Fix: Better represent the new direction on landing (#1863) @bharatkashyap
- &#8203;<!-- 04 -->Revert "Form component (#1598)" @apedroferreira
- &#8203;<!-- 03 -->Form component (#1598) @bytasv
- &#8203;<!-- 02 -->Update links on contributing guide (#1893) @Janpot
- &#8203;<!-- 01 -->[website] Landing page design tweaks (#1786) @danilo-leal

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @danilo-leal, @Janpot

## 0.1.6

<!-- generated comparing v0.1.5..master -->

_Apr 13, 2023_

A big thanks to the 1 contributors who made this release possible. Here are some highlights ✨:

Fix regression that applies the wrong theme to the user application when they have dark color scheme.

- &#8203;<!-- 1 -->Fix app theming (#1888) @Janpot

All contributors of this release in alphabetical order: @Janpot

## 0.1.5

<!-- generated comparing v0.1.4..master -->

_Apr 13, 2023_

A big thanks to the 2 contributors who made this release possible. Here are some highlights ✨:

Fix broken CLI due to missing dependency

- &#8203;<!-- 4 -->Add missing extraneous dependencies (#1885) @Janpot
- &#8203;<!-- 3 -->Update playwright to latest (#1884) @Janpot
- &#8203;<!-- 2 -->Small fixes to CLI (#1882) @Janpot
- &#8203;<!-- 1 -->Update release instructions (#1880) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @Janpot

## 0.1.4

<!-- generated comparing v0.1.3..master -->

_Apr 12, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Revamped file system layout, updated docs.

- &#8203;<!-- 8 -->Factor out in-memory toolpad project (#1878) @Janpot
- &#8203;<!-- 7 -->Revamp toolpad file system layout (#1831) @Janpot
- &#8203;<!-- 6 -->Docs-update (#1829) @prakhargupta1
- &#8203;<!-- 5 -->Update README.md @prakhargupta1
- &#8203;<!-- 4 -->Update README.md @prakhargupta1
- &#8203;<!-- 3 -->Refactor: extract custom components loading logic (#1862) @Janpot
- &#8203;<!-- 2 -->Clean dist dirs on rebuild (#1858) @Janpot
- &#8203;<!-- 1 -->[docs] Fix 301 redirections @oliviertassinari

All contributors of this release in alphabetical order: @Janpot, @oliviertassinari, @prakhargupta1

## 0.1.3

<!-- generated comparing v0.1.2..master -->

_Apr 5, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Fixed a regression with the query transformation feature, removed some obsolete code and a few improvements to the editor user experience!

- &#8203;<!-- 4 -->Fix transform regression (#1856) @bharatkashyap
- &#8203;<!-- 3 -->Try replacing tsc with tsup as build tool (#1727) @Janpot
- &#8203;<!-- 2 -->Remove obsolete onDelete datagrid property (#1850) @Janpot
- &#8203;<!-- 1 -->Editor UX fixes (#1844) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## 0.1.2

<!-- generated comparing v0.1.1..master -->

_Mar 31, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Add end-user application navigation! Various fixes.

- &#8203;<!-- 11 -->Add app navigation sidebar (#1819) @apedroferreira
- &#8203;<!-- 10 -->Load queries by name instead of id (#1842) @Janpot
- &#8203;<!-- 09 -->Fix issues around custom datagrid columns (#1840) @Janpot
- &#8203;<!-- 08 -->Fix broken theming (#1834) @apedroferreira
- &#8203;<!-- 07 -->Do Toolpad app migration on startup (#1832) @Janpot
- &#8203;<!-- 06 -->Remove ECS and Recaptcha + move request/response logs to trace level (#1833) @apedroferreira
- &#8203;<!-- 05 -->Remove deprecated scope query (#1827) @apedroferreira
- &#8203;<!-- 04 -->Use worker scoped fixtures for integration tests (#1813) @Janpot
- &#8203;<!-- 03 -->Remove quickjs-emscripten (#1820) @Janpot
- &#8203;<!-- 02 -->Rewrite argument handling in `@mui/toolpad` CLI with `yargs` (#1794) @bharatkashyap
- &#8203;<!-- 01 -->Update CONTRIBUTING.md (Fix typo) (#1826) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## 0.1.1

<!-- generated comparing v0.1.0..master -->

_Mar 28, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Mutate state in event handlers by assigning to properties of page elements. Make binding to DataGrid selection easier with improved typings. Big cleanup of dead code.

- &#8203;<!-- 28 -->Use node name in the canvas HUD (#1818) @Janpot
- &#8203;<!-- 27 -->Allow mutating page state in event handlers (#1807) @Janpot
- &#8203;<!-- 26 -->Improve UX around integration testing (#1808) @Janpot
- &#8203;<!-- 25 -->Disable property control for controlled properties (#1809) @Janpot
- &#8203;<!-- 24 -->Use next.js custom server (#1723) @Janpot
- &#8203;<!-- 23 -->Remove postgres (#1799) @Janpot
- &#8203;<!-- 22 -->Remove example and docker files (#1798) @Janpot
- &#8203;<!-- 21 -->Clean up more obsolete things in the repo (#1797) @Janpot
- &#8203;<!-- 20 -->Fix errors when running the project the first time (#1796) @Janpot
- &#8203;<!-- 19 -->Fix imports from toolpad (#1793) @Janpot
- &#8203;<!-- 18 -->Fix changing tabs closing query editor (#1784) @apedroferreira
- &#8203;<!-- 17 -->Generate .gitignore on dev command (#1705) @apedroferreira
- &#8203;<!-- 16 -->Improve dataGrid.selection types (#1790) @Janpot
- &#8203;<!-- 15 -->Dependency cleanup (#1791) @Janpot
- &#8203;<!-- 14 -->Fixes on the dev pipeline (#1789) @Janpot
- &#8203;<!-- 13 -->Remove Prisma, isolated-vm and dead code (#1787) @Janpot
- &#8203;<!-- 12 -->Update release instructions (#1788) @Janpot
- &#8203;<!-- 11 -->Fix capitalization of elements (#1782) @Janpot
- &#8203;<!-- 10 -->Update moduleresolution for core and components (#1780) @Janpot
- &#8203;<!-- 09 -->Remove the localMode flag (#1768) @Janpot
- &#8203;<!-- 08 -->Convert tests to local mode (#1718) @Janpot
- &#8203;<!-- 07 -->Add docs contributing instructions (#1779) @Janpot
- &#8203;<!-- 06 -->Allow falsy MySQL variable values (#1738) @evankennedy
- &#8203;<!-- 05 -->Add Toolpad to cspell config for the workspace (#1767) @Janpot
- &#8203;<!-- 04 -->Use latest version for examples (#1764) @Janpot
- &#8203;<!-- 03 -->Rename dev13 script to dev (#1766) @Janpot
- &#8203;<!-- 02 -->Small typo fix @prakhargupta1
- &#8203;<!-- 01 -->Docs updates for the new direction (#1743) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @evankennedy, @Janpot, @prakhargupta1

## 0.1.0

<!-- generated comparing v0.0.41..master -->

_Mar 20, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Today we're taking a big step. We're making Toolpad focus much more on integrating with your IDE, while providing the ease of building UI fast with a drag and drop. Read more [here](https://github.com/mui/mui-toolpad/discussions/1748).

- &#8203;<!-- 8 -->Add create-toolpad-app CLI (#1700) @bharatkashyap
- &#8203;<!-- 7 -->Direction 13 (#1651) @Janpot
- &#8203;<!-- 6 -->Fix dragged element corners (#1750) @Janpot
- &#8203;<!-- 5 -->Turn off preview environments (#1697) @Janpot
- &#8203;<!-- 4 -->this don't work @Janpot
- &#8203;<!-- 3 -->build to legacy master @Janpot
- &#8203;<!-- 2 -->add ignore console to test @Janpot
- &#8203;<!-- 1 -->Disable bindings for properties that can be controlled in canvas (#1696) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## 0.0.41

<!-- generated comparing v0.0.40..master -->

_Feb 22, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Add a List component, polish Markdown component, easier access to Page module settings, feedback for mutation queries, and a new option to edit Text component directly in canvas!

- &#8203;<!-- 17 -->Fix binding editor confirm on unsaved changes (#1695) @apedroferreira
- &#8203;<!-- 16 -->Adjust margins for Markdown component (#1690) @Janpot
- &#8203;<!-- 15 -->Remove deprecated waitForNavigation playwright API (#1699) @Janpot
- &#8203;<!-- 14 -->Make text component editable in the canvas (#1694) @Janpot
- &#8203;<!-- 13 -->Hide resizable height prop controls (#1641) @apedroferreira
- &#8203;<!-- 12 -->Move selected node state to page view only (#1679) @apedroferreira
- &#8203;<!-- 11 -->Fix DataGrid number formats for non-numerical values (#1626) @Janpot
- &#8203;<!-- 10 -->Add feedback for mutating queries (#1691) @Janpot
- &#8203;<!-- 09 -->Show confirmation dialog when there are unsaved changes (#1618) @apedroferreira
- &#8203;<!-- 08 -->Fix resizing after drag & drop UI changes (#1639) @apedroferreira
- &#8203;<!-- 07 -->Polish Markdown component (#1477) @bharatkashyap
- &#8203;<!-- 06 -->Confirm unsaved code component changes (#1628) @apedroferreira
- &#8203;<!-- 05 -->Add in page settings option to sidebar to allow for easier access to page module settings (#1672) @scouttyg
- &#8203;<!-- 04 -->Add List component (#1527) @apedroferreira
- &#8203;<!-- 03 -->Fix: Column changes dropped on prop update (#1583) @bharatkashyap
- &#8203;<!-- 02 -->Fix: Disable "Remove" on draft nodes (#1681) @bharatkashyap
- &#8203;<!-- 01 -->Align headers and typography in the theme (#1627) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @scouttyg

## 0.0.40

<!-- generated comparing v0.0.39..master -->

_Feb 15, 2023_

A big thanks to the 1 contributors who made this release possible. Here are some highlights ✨:

- &#8203;<!-- 1 -->Fix HMR issues with the canvas bridge (#1640) @Janpot

All contributors of this release in alphabetical order: @Janpot

## 0.0.39

<!-- generated comparing v0.0.39-alpha.0..master -->

_Feb 8, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Edit option from preview, improved Select component behavior, updated drag & drop UI/UX, improved image columns in Data Grid, add Data Grid documentation.

- &#8203;<!-- 13 -->Improve behavior of image columns (#1637) @Janpot
- &#8203;<!-- 12 -->Add DataGrid docs (#1616) @bytasv
- &#8203;<!-- 11 -->Fix console errors @apedroferreira
- &#8203;<!-- 10 -->Improve drag & drop / canvas UI (#1553) @apedroferreira
- &#8203;<!-- 09 -->Add some new future components (#1631) @Janpot
- &#8203;<!-- 08 -->Fix design issue template (#1636) @bytasv
- &#8203;<!-- 07 -->Add design GH template (#1632) @bytasv
- &#8203;<!-- 06 -->Remove - from select options (#1630) @Janpot
- &#8203;<!-- 05 -->Improve deploy in iframe tests (#1622) @Janpot
- &#8203;<!-- 04 -->disable server code build when not in local mode @Janpot
- &#8203;<!-- 03 -->Remove firefox specific branch in tests (#1620) @Janpot
- &#8203;<!-- 02 -->Add fast edit option from preview (#1603) @bytasv
- &#8203;<!-- 01 -->Be more accepting of select options (#1604) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot

## 0.0.38

<!-- generated comparing v0.0.37..master -->

_Feb 1, 2023_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Improved default template.

- &#8203;<!-- 7 -->Dual build toolpad-core for esm and cjs (#1617) @Janpot
- &#8203;<!-- 6 -->Add new custom GA events to demo (#1588) @apedroferreira
- &#8203;<!-- 5 -->Change default template (#1601) @bytasv
- &#8203;<!-- 4 -->Add MySQL datasource (#1313) @bharatkashyap
- &#8203;<!-- 3 -->Cherrypick some changes from direction 13 branch (#1599) @Janpot
- &#8203;<!-- 2 -->[core] Remove dead code @oliviertassinari
- &#8203;<!-- 1 -->[core] Fix Next.js warning @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## 0.0.37

<!-- generated comparing v0.0.36..master -->

_Jan 25, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Added a new FilePicker component, some changes to page navigation and improvements to JavaScript runtime code.

- &#8203;<!-- 8 -->Fix navigation through DOM views with pages (#1565) @apedroferreira
- &#8203;<!-- 7 -->Add FilePicker component (#1537) @bytasv
- &#8203;<!-- 6 -->Split browser and server js runtimes (#1584) @Janpot
- &#8203;<!-- 5 -->Fix webpack missing exports warnings (#1582) @Janpot
- &#8203;<!-- 4 -->Make applyTransform runtime agnostic (#1585) @Janpot
- &#8203;<!-- 3 -->Recreate yarn.lock (#1577) @Janpot
- &#8203;<!-- 2 -->Upgrade monorepo dependency (#1580) @Janpot
- &#8203;<!-- 1 -->Remove onChangeHandler from Select and TextField (#1576) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot

✨ Done in 1.69s.

## 0.0.36

<!-- generated comparing v0.0.35..master -->

_Jan 18, 2023_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Added Tabs component and new canvas bridge implementation, fixed DatePicker localization, binding to objects, link redirection. Improved code around js evaluation.

- &#8203;<!-- 9 -->Fix DatePicker localization issues (#1575) @Janpot
- &#8203;<!-- 8 -->Avoid resubscribing in useSyncExternalStore on every render (#1554) @Janpot
- &#8203;<!-- 7 -->Rename Tabs main prop (#1568) @bytasv
- &#8203;<!-- 6 -->Add tabs and container components (#1549) @bytasv
- &#8203;<!-- 5 -->Reorganize js evaluation across project (#1548) @Janpot
- &#8203;<!-- 4 -->New canvas bridge implementation (#1550) @Janpot
- &#8203;<!-- 3 -->Fix binding to objects with more than one property (#1542) @Janpot
- &#8203;<!-- 2 -->[core] Add missing need triage label on RFC @oliviertassinari
- &#8203;<!-- 1 -->[docs] Fix link redirection @oliviertassinari

All contributors of this release in alphabetical order: @bytasv, @Janpot, @oliviertassinari

## 0.0.35

<!-- generated comparing v0.0.34..master -->

_Jan 11, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Custom column types, add search to apps overview, add inline tooltips to components and properties, component library tweaks.

- &#8203;<!-- 12 -->Fix templates after dog API changed (#1544) @Janpot
- &#8203;<!-- 11 -->Reorganize shared utils (#1539) @Janpot
- &#8203;<!-- 10 -->Remove obsolete dom reducer actions (#1541) @Janpot
- &#8203;<!-- 09 -->Some component library tweaks (#1526) @Janpot
- &#8203;<!-- 08 -->Pin react-router-dom instead of resolutions (#1519) @Janpot
- &#8203;<!-- 07 -->Update README.md @prakhargupta1
- &#8203;<!-- 06 -->Add inline documentation to components and properties (#1518) @Janpot
- &#8203;<!-- 05 -->Correct types in Datepicker (#1517) @Janpot
- &#8203;<!-- 04 -->Promote previously experimental config (#1515) @Janpot
- &#8203;<!-- 03 -->Add search to the apps overview (#1402) @bharatkashyap
- &#8203;<!-- 02 -->Custom column types (#1462) @bytasv
- &#8203;<!-- 01 -->Restructure installation docs (#1511) @Janpot

All contributors of this release in alphabetical order: @bharatkashyap, @bytasv, @Janpot, @prakhargupta1

## 0.0.34

<!-- generated comparing v0.0.33..master -->

_Jan 4, 2023_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

New Date Picker component, Make switching views part of undo/redo cycle.

- &#8203;<!-- 13 -->Fix dependabot vulnerabilities (#1512) @Janpot
- &#8203;<!-- 12 -->Don't import from dist folders (#1513) @Janpot
- &#8203;<!-- 11 -->Root type check (#1510) @bytasv
- &#8203;<!-- 10 -->Fix function editor save (#1507) @Janpot
- &#8203;<!-- 09 -->Do not rename nodes when migrating Typography components (#1509) @Janpot
- &#8203;<!-- 08 -->Just re-export the prettier config (#1508) @Janpot
- &#8203;<!-- 07 -->Datepicker format handling changes (#1504) @bytasv
- &#8203;<!-- 04 -->Undo/redo through different views (#1417) @apedroferreira
- &#8203;<!-- 03 -->Make sure npm package is splitted out correctly (#1502) @Janpot
- &#8203;<!-- 02 -->Date Picker component (#1499) @bytasv
- &#8203;<!-- 01 -->[core] Remove dead prettier config @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot, @oliviertassinari

## 0.0.33

<!-- generated comparing v0.0.32..master -->

_Dec 28, 2022_

A big thanks to the 2 contributors who made this release possible. Here are some highlights ✨:

Improvements to the scope explorer, and some other bug fixes an improvements.

- &#8203;<!-- 4 -->Fix: Demo reCaptcha v2 fallback does not work (#1485) @bharatkashyap
- &#8203;<!-- 3 -->Group scope variables by function in global scope explorer (#1464) @Janpot
- &#8203;<!-- 2 -->Fix canvas ref timing issues (#1476) @Janpot
- &#8203;<!-- 1 -->Fix flaky rest-basics test (#1481) @Janpot

All contributors of this release in alphabetical order: @bharatkashyap, @Janpot

## 0.0.32

<!-- generated comparing v0.0.31..master -->

_Dec 21, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Added survey for the Toolpad usage, simplified RPC logs, added latest deployment preview in the editor, undo/redo improvements, improved grid columns editor, added visual feedback when query runs, as well as various fixes.

- &#8203;<!-- 12 -->Add survey dialog (#1480) @bytasv
- &#8203;<!-- 11 -->Simplify RPC logs (#1473) @Janpot
- &#8203;<!-- 10 -->Move recaptcha script away from \_app (#1472) @Janpot
- &#8203;<!-- 09 -->Add latest deployment preview in editor (#1423) @bytasv
- &#8203;<!-- 08 -->Single-update undo/redo (#1374) @apedroferreira
- &#8203;<!-- 07 -->Non permanent root redirection (#1468) @oliviertassinari
- &#8203;<!-- 06 -->Fix display of errors during loading of data (#1457) @Janpot
- &#8203;<!-- 05 -->Replace gridcolumns editor dialog with popover (#1455) @Janpot
- &#8203;<!-- 04 -->Fix: Incorrect migration for Text component (#1451) @bharatkashyap
- &#8203;<!-- 03 -->Add formatting options to DataGrid columns (#1449) @Janpot
- &#8203;<!-- 02 -->Add visual feedback when query is running (#1454) @Janpot
- &#8203;<!-- 01 -->[docs] Banner tweaks (#1475) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## 0.0.31

<!-- generated comparing v0.0.30..master -->

_Dec 14, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Add a new Text component that subsumes Typography and Link, and allows support for Markdown. Allow support for dynamic templates, and fix a bug around the default value of components.

- &#8203;<!-- 11 -->Add Text component to merge Typography, Markdown, Link (#1298) @bharatkashyap
- &#8203;<!-- 10 -->Document and cleanup of utility functions (#1442) @Janpot
- &#8203;<!-- 09 -->Revert react-router-dom to 6.3 (#1444) @Janpot
- &#8203;<!-- 08 -->Update README.md @prakhargupta1
- &#8203;<!-- 07 -->Fix yarnlock (#1443) @bytasv
- &#8203;<!-- 06 -->Add roadmap to the docs (#1424) @bytasv
- &#8203;<!-- 05 -->Landing page tweaks (#1433) @bharatkashyap
- &#8203;<!-- 04 -->Fix controlled value reset when default value changes (#1434) @bytasv
- &#8203;<!-- 03 -->Add integration test for default template (#1429) @bharatkashyap
- &#8203;<!-- 02 -->Support dynamic app templates (#1430) @apedroferreira
- &#8203;<!-- 01 -->Fix changelog @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @prakhargupta1

✨ Done in 1.75s.

## 0.0.30

<!-- generated comparing v0.0.29..master -->

_Dec 7, 2022_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Release the demo version, update app duplication UX.

- &#8203;<!-- 13 -->Revert accidental react-router-dom update (#1426) @Janpot
- &#8203;<!-- 12 -->Add demo link to the docs (#1319) @bharatkashyap
- &#8203;<!-- 11 -->Add Demo link to landing page (#1228) @bharatkashyap
- &#8203;<!-- 10 -->Add a Default app template (#1381) @bharatkashyap
- &#8203;<!-- 09 -->Remove stats template (#1418) @apedroferreira
- &#8203;<!-- 08 -->Propose solution for flaky undo test (#1415) @Janpot
- &#8203;<!-- 07 -->Update dependencies (#1403) @Janpot
- &#8203;<!-- 06 -->Move to next.config.mjs (#1404) @Janpot
- &#8203;<!-- 05 -->Add note about missing connections to demo footer (#1406) @apedroferreira
- &#8203;<!-- 04 -->Try out transpilePackages on latest next (#1362) @Janpot
- &#8203;<!-- 03 -->Don't immediately open duplicated apps (#1397) @Janpot
- &#8203;<!-- 02 -->Make sure EditableText updates when underlying string changes (#1400) @Janpot
- &#8203;<!-- 01 -->Undoable/redoable node selection (#1394) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## 0.0.29

<!-- generated comparing v0.0.28..master -->

_Nov 30, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Improved query options in demo, fixed time property in HAR, unified app editor options menus

- &#8203;<!-- 7 -->Undo redo tests (#1308) @bytasv
- &#8203;<!-- 6 -->Hide connections tree in demo (#1393) @apedroferreira
- &#8203;<!-- 5 -->Create apps programmatically in integration tests (#1384) @Janpot
- &#8203;<!-- 4 -->Set connection/query available options in demo (#1323) @apedroferreira
- &#8203;<!-- 3 -->Add some tips about writing highlights in release docs (#1352) @Janpot
- &#8203;<!-- 2 -->Fix time property in HAR (#1383) @Janpot
- &#8203;<!-- 1 -->Unify app editor options menus (#1286) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot

## 0.0.28

<!-- generated comparing v0.0.27..master -->

_Nov 23, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Client-side functions, migration fixes, add sidebar to overview page, support visual captcha as fallback, add "alpha" label to app and landing page, automatic app names in demo.

- &#8203;<!-- 19 -->Fix landing page hydration issue (#1375) @bharatkashyap
- &#8203;<!-- 18 -->Update demo bar copy (#1371) @apedroferreira
- &#8203;<!-- 17 -->Fix overflow for explorer (#1372) @Janpot
- &#8203;<!-- 16 -->Add "alpha" label to app and landing page hero (#1356) @bharatkashyap
- &#8203;<!-- 15 -->Add missing sucrase helper (#1360) @Janpot
- &#8203;<!-- 14 -->Remove demo docker (#1369) @apedroferreira
- &#8203;<!-- 13 -->Remove demo configuration from render.yaml (#1368) @apedroferreira
- &#8203;<!-- 12 -->Move typescript to devDependencies (#1366) @Janpot
- &#8203;<!-- 11 -->Remove sentry debug option (#1361) @Janpot
- &#8203;<!-- 10 -->Fix yarn.lock @Janpot
- &#8203;<!-- 09 -->Upgrade eslint (#1287) @Janpot
- &#8203;<!-- 08 -->Fallback to visible captcha if invisible captcha fails (#1272) @apedroferreira
- &#8203;<!-- 07 -->Refactor overview page (#1357) @Janpot
- &#8203;<!-- 06 -->Fix migration to v3 (#1359) @Janpot
- &#8203;<!-- 05 -->Run functions client side (#1325) @Janpot
- &#8203;<!-- 04 -->Show IP address in log messages (#1350) @apedroferreira
- &#8203;<!-- 03 -->Fix prettier script in CI (#1355) @Janpot
- &#8203;<!-- 02 -->Automatic app names in demo (#1351) @apedroferreira
- &#8203;<!-- 01 -->[core] Group renovate GitHub Action dependency updates (#1341) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @oliviertassinari

## 0.0.27

<!-- generated comparing v0.0.26..master -->

_Nov 16, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Upgraded to Next.js 13, some fixes on undo/redo and also an improvement to the cloud demo which allows continuing work on the latest-used app.

- &#8203;<!-- 24 -->Allow working on latest used app from demo home page (#1304) @apedroferreira
- &#8203;<!-- 23 -->Make sure to show a 404 for non existing apps in the preview (#1344) @Janpot
- &#8203;<!-- 22 -->Make sure code components can run against React in production mode (#1348) @Janpot
- &#8203;<!-- 21 -->Disable baseUrl when ran in browser (#1346) @Janpot
- &#8203;<!-- 20 -->Upgrade to next 13 (#1294) @Janpot
- &#8203;<!-- 19 -->Show self-host bar in demo (#1309) @apedroferreira
- &#8203;<!-- 18 -->Move component compilation serverside (#1332) @Janpot
- &#8203;<!-- 17 -->Remove externalResolver for Sentry (#1343) @Janpot
- &#8203;<!-- 16 -->Convert scripts to ESM (#1307) @Janpot
- &#8203;<!-- 15 -->Add github repository link from landing page (#1342) @bharatkashyap
- &#8203;<!-- 14 -->Fix windows and AZERTY shortcuts for undo redo (#1274) @bytasv
- &#8203;<!-- 13 -->Simplify menu actions (#1281) @oliviertassinari
- &#8203;<!-- 12 -->Fix undo/redo race condition (#1328) @bytasv
- &#8203;<!-- 11 -->Fix hud overlay index (#1329) @bytasv
- &#8203;<!-- 10 -->Reorganize QueryEditor into its own folder (#1322) @Janpot
- &#8203;<!-- 09 -->Upgrade docs to Next.js 13 (#1297) @Janpot
- &#8203;<!-- 08 -->Remove package.json resolutions field (#1316) @Janpot
- &#8203;<!-- 07 -->Show creation dialog as loading while navigating to newly created app (#1317) @Janpot
- &#8203;<!-- 06 -->Change dots to ellipsis (#1314) @Janpot
- &#8203;<!-- 05 -->[core] Show the whole version to make blame easier @oliviertassinari
- &#8203;<!-- 04 -->[core] Pin GitHub Action versions @oliviertassinari
- &#8203;<!-- 03 -->[core] Feedback on branch protection @oliviertassinari
- &#8203;<!-- 02 -->[core] Remove scorecard default permissions @oliviertassinari
- &#8203;<!-- 01 -->[docs] Fix path typo in Fetch docs (#1331) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## 0.0.26

<!-- generated comparing v0.0.25..master -->

_Nov 9, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

A new Link component, undo/redo in the editor, fix UX on renaming elements.

- &#8203;<!-- 24 -->Remove pullRequestPreviewsEnabled from render.yml (#1315) @Janpot
- &#8203;<!-- 23 -->Fix adding parameter with duplicate name (#1282) @Janpot
- &#8203;<!-- 22 -->Make sure to define a \_jsxFilename for custom components (#1306) @Janpot
- &#8203;<!-- 21 -->Upgrade monorepo dependency (#1299) @Janpot
- &#8203;<!-- 20 -->Remove react from the runtime chunk (#1302) @Janpot
- &#8203;<!-- 19 -->Add prefix to custom GA event (#1305) @apedroferreira
- &#8203;<!-- 18 -->Send custom GA event when new app is created (#1285) @apedroferreira
- &#8203;<!-- 17 -->Some tweaks to integration tests while debugging (#1300) @Janpot
- &#8203;<!-- 16 -->schedule @Janpot
- &#8203;<!-- 15 -->Reduce amount of chunks for the runtime (#1301) @Janpot
- &#8203;<!-- 14 -->Update code component name on save (#1283) @Janpot
- &#8203;<!-- 13 -->Add Next.js bundle analyzer (#1276) @Janpot
- &#8203;<!-- 12 -->Small improvements to Datagrid component (#1284) @apedroferreira
- &#8203;<!-- 11 -->Client-side fetch queries (#1252) @Janpot
- &#8203;<!-- 10 -->Add undo & redo functionality (#1225) @bytasv
- &#8203;<!-- 09 -->useEvent: Only check for calls during render in development (#1269) @Janpot
- &#8203;<!-- 08 -->Index pino logs to data stream (#1267) @apedroferreira
- &#8203;<!-- 07 -->Add Link Component (#1234) @bharatkashyap
- &#8203;<!-- 06 -->[core] Fix Scorecard fail Action @oliviertassinari
- &#8203;<!-- 05 -->[core] Try running integration tests against self-hosted httpbin (#1253) @Janpot
- &#8203;<!-- 04 -->[core] Add OSSF Scorecard action (#1295) @oliviertassinari
- &#8203;<!-- 03 -->[core] Remove default access to GitHub action scopes @oliviertassinari
- &#8203;<!-- 02 -->[core] Fix Pinned-Dependencies @oliviertassinari
- &#8203;<!-- 01 -->[docs] Link changelog (#1279) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## 0.0.25

<!-- generated comparing v0.024..master -->

_Nov 2, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Added new Data Grid column types, improved dev mode performance, support for pages, connections and components duplication, updated remaining documentation parts

- &#8203;<!-- 22 -->Fix Elastic Search configuration (#1256) @apedroferreira
- &#8203;<!-- 21 -->Provide accessible locators (#1264) @Janpot
- &#8203;<!-- 20 -->Improve dev mode performance (#1232) @Janpot
- &#8203;<!-- 19 -->Fix app templates tests (#1257) @apedroferreira
- &#8203;<!-- 18 -->Support duplicating queries (#1229) @Janpot
- &#8203;<!-- 17 -->Deploy latest Docker image in demo (#1255) @apedroferreira
- &#8203;<!-- 16 -->App templates tests (#1220) @apedroferreira
- &#8203;<!-- 15 -->Add new column types (#1223) @apedroferreira
- &#8203;<!-- 14 -->Fix node not found error (#1233) @apedroferreira
- &#8203;<!-- 13 -->improve renovatebot @Janpot
- &#8203;<!-- 12 -->Support undefined values in serverside bindings (#1226) @Janpot
- &#8203;<!-- 11 -->Disable making applications public in demo mode (#1212) @apedroferreira
- &#8203;<!-- 10 -->Use link component in app overview (#1218) @Janpot
- &#8203;<!-- 09 -->Support duplicating pages, connection, components (#1210) @Janpot
- &#8203;<!-- 08 -->Part 5: Update building ui docs (#1215) @bytasv
- &#8203;<!-- 07 -->Part 6: Update data binding docs (#1216) @bytasv
- &#8203;<!-- 06 -->[core] Fixes for upcoming eslint upgrade (#1249) @Janpot
- &#8203;<!-- 05 -->[core] Remove unused GitHub Action permission @oliviertassinari
- &#8203;<!-- 04 -->[core] Pin GitHub Action to digests (#1250) @oliviertassinari
- &#8203;<!-- 03 -->[core] Fix permissions in workflow @oliviertassinari
- &#8203;<!-- 02 -->[core] Add clarifying comment in the dev env compose file (#1206) @Janpot
- &#8203;<!-- 01 -->[ui] Add button size property (#1193) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot, @oliviertassinari

## 0.0.24

<!-- generated comparing v0.0.23..master -->

_Oct 26, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Add element duplication, improved Paper component, improved node naming UX, support for server logs, autocomplete for event arguments, update docs screenshots.

- &#8203;<!-- 28 -->Part 4: Update datasource docs (#1205) @bytasv
- &#8203;<!-- 27 -->renovatebot, tweak playwright @Janpot
- &#8203;<!-- 26 -->Add API and datasource logging (#1066) @apedroferreira
- &#8203;<!-- 25 -->fix name @Janpot
- &#8203;<!-- 24 -->Codify the icons exception in eslint (#1211) @Janpot
- &#8203;<!-- 23 -->Improve Paper component (#1031) @apedroferreira
- &#8203;<!-- 22 -->Deploy with keyboard enter (#1188) @bytasv
- &#8203;<!-- 21 -->Part 3: Update connections docs (#1203) @bytasv
- &#8203;<!-- 20 -->Part 1: Update overview + quickstart screenshots (#1200) @bytasv
- &#8203;<!-- 19 -->Use public environment settings for demo (#1191) @apedroferreira
- &#8203;<!-- 18 -->Part 2: Update queries docs (#1202) @bytasv
- &#8203;<!-- 17 -->Fix fetch query preview (#1165) @bytasv
- &#8203;<!-- 16 -->Try fixing renovatebot @Janpot
- &#8203;<!-- 15 -->Add option to DataGrid to hide toolbar (#1187) @Janpot
- &#8203;<!-- 14 -->Use latest version of Toolpad in demo (#1190) @apedroferreira
- &#8203;<!-- 13 -->Remove branch option from database in render.yaml (#1189) @apedroferreira
- &#8203;<!-- 12 -->Implement component duplication logic (#1169) @bytasv
- &#8203;<!-- 11 -->Set up demo with Docker (#1092) @apedroferreira
- &#8203;<!-- 10 -->Add a staleTime to queries (#1167) @Janpot
- &#8203;<!-- 09 -->Add room for post transformations (#1185) @oliviertassinari
- &#8203;<!-- 08 -->Allow typing event arguments for autocomplete (#1180) @Janpot
- &#8203;<!-- 07 -->[core] Fix duplicate CodeQL build @oliviertassinari
- &#8203;<!-- 06 -->[core] query editor, only insert node after the flow (#1207) @Janpot
- &#8203;<!-- 05 -->[core] Relax the restrictions on node naming (#1194) @Janpot
- &#8203;<!-- 04 -->[core] Harden the datasource handler implementation (#1199) @Janpot
- &#8203;<!-- 03 -->[core] Add code scanning via CodeQL (#1197) @oliviertassinari
- &#8203;<!-- 02 -->[ui] Some tweaks to the Monaco editor theme (#1181) @Janpot
- &#8203;<!-- 01 -->[website] Remove LanguageNegotation (#1186) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## 0.0.23

<!-- generated comparing v0.0.22..master -->

_Oct 20, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

A new theme for the UI (with light and dark mode), allowing Toolpad apps to be used in iFrames, UI improvements and bug fixes.

- &#8203;<!-- 25 -->Allow iframes (#1162) @oliviertassinari
- &#8203;<!-- 24 -->Make sure Monaco theme switches correctly (#1179) @Janpot
- &#8203;<!-- 23 -->Replace chevron icons with arrow icons (#1178) @Janpot
- &#8203;<!-- 22 -->Remove false sourceMapReference in next config (#1170) @apedroferreira
- &#8203;<!-- 21 -->Disable queries until dom node has been saved serverside (#1149) @Janpot
- &#8203;<!-- 20 -->Improvements to Sentry and sourcemaps (#1129) @apedroferreira
- &#8203;<!-- 19 -->Enforce the restriction on how icons are imported (#1160) @Janpot
- &#8203;<!-- 18 -->Improve preview feedback in fetch query (#1153) @bytasv
- &#8203;<!-- 17 -->Fix visible horizontal scroll (#1154) @bytasv
- &#8203;<!-- 16 -->Mandate node version for toolpad-app (#1141) @Janpot
- &#8203;<!-- 15 -->Some smoke test for rest datasource (#1147) @Janpot
- &#8203;<!-- 14 -->Change url in function default source to static self hosted file (#1152) @Janpot
- &#8203;<!-- 13 -->Move event handler setup to the bridge (#1097) @Janpot
- &#8203;<!-- 12 -->Try changing @mui/toolpad/index.d.ts to global.d.ts (#1148) @Janpot
- &#8203;<!-- 11 -->Use Map for app template options (#1135) @apedroferreira
- &#8203;<!-- 10 -->[app] Fix manifest 401 loading (#1146) @oliviertassinari
- &#8203;<!-- 09 -->[core] Add CI check that the PR has label (#849) @oliviertassinari
- &#8203;<!-- 08 -->[core] eslint: Disallow enum (#1151) @Janpot
- &#8203;<!-- 07 -->[core] Harden GitHub Actions permissions (#1161) @oliviertassinari
- &#8203;<!-- 06 -->[docs] Add missing redirections @oliviertassinari
- &#8203;<!-- 05 -->[docs] Improve markdownlint (#1159) @oliviertassinari
- &#8203;<!-- 04 -->[docs] Update descriptions that are over 160 characters @oliviertassinari
- &#8203;<!-- 03 -->[runtime] hide queries in the browser (#1155) @Janpot
- &#8203;<!-- 02 -->[ui] Add branding theme to Toolpad app (#988) @bharatkashyap
- &#8203;<!-- 01 -->[ui] New component catalog (#1003) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## v0.0.22

<!-- generated comparing v0.0.21..master -->

_Oct 12, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Improve update notification, fold mutations into queries, support duplicating application, support public applications, rename parameters in queries, add observability for our demo mode.

- &#8203;<!-- 38 -->Fix saving issues (#1142) @Janpot
- &#8203;<!-- 37 -->Add update notification instead of banner (#1128) @bharatkashyap
- &#8203;<!-- 36 -->Fix parameters for fetch queries (#1140) @Janpot
- &#8203;<!-- 35 -->Migrate existing mutations to queries (#1130) @Janpot
- &#8203;<!-- 34 -->Memoize useMenu onMenuClose (#1139) @Janpot
- &#8203;<!-- 33 -->Make sure parameters work in query preview (#1138) @Janpot
- &#8203;<!-- 32 -->Fix a few issues with app DOM migrations (#1133) @Janpot
- &#8203;<!-- 31 -->Update resource class for test_static (#1103) @Janpot
- &#8203;<!-- 30 -->Update renovate.json for playwright @Janpot
- &#8203;<!-- 29 -->remove manager @Janpot
- &#8203;<!-- 28 -->core-js restriction @Janpot
- &#8203;<!-- 27 -->Fix warning on save (#1125) @Janpot
- &#8203;<!-- 26 -->Make queries capable of mutations (#1122) @Janpot
- &#8203;<!-- 25 -->pin node version for more reproducability in the builds (#1119) @Janpot
- &#8203;<!-- 24 -->Allow duplicating apps (#658) @bharatkashyap
- &#8203;<!-- 23 -->Google Analytics improvements (#1090) @apedroferreira
- &#8203;<!-- 22 -->reCAPTCHA improvements (#1087) @apedroferreira
- &#8203;<!-- 21 -->Silence sentry warning (#1102) @Janpot
- &#8203;<!-- 20 -->Update playwright (#1118) @Janpot
- &#8203;<!-- 19 -->Handle appDom versioning (#776) @bharatkashyap
- &#8203;<!-- 18 -->Update renovate.json @Janpot
- &#8203;<!-- 17 -->Revert "[core] Add default data to DataGrid, Image, Select components" (#1106) @Janpot
- &#8203;<!-- 16 -->Update renovate.json @Janpot
- &#8203;<!-- 15 -->New renovatebot schedule (#1099) @Janpot
- &#8203;<!-- 14 -->Try out sharing vscode setup (#782) @Janpot
- &#8203;<!-- 13 -->Allow empty argTypes object in component config (#1088) @Janpot
- &#8203;<!-- 12 -->Alternative fix for 1050 (#1091) @Janpot
- &#8203;<!-- 11 -->Add enableColorScheme to CssBaseline in app theme (#1100) @Janpot
- &#8203;<!-- 10 -->Store next.js cache after the build (#1104) @Janpot
- &#8203;<!-- 09 -->Avoid state update during layout effect in NoSsr (#857) @Janpot
- &#8203;<!-- 08 -->Add a few more cache folders in circleci (#1089) @Janpot
- &#8203;<!-- 07 -->Support public applications (#1009) @Janpot
- &#8203;<!-- 06 -->[app] Select options editor enhancements (#1055) @bharatkashyap
- &#8203;<!-- 05 -->[core] disable react-router-dom update (#1123) @Janpot
- &#8203;<!-- 04 -->[core] Remove jsdoc eslint (#1109) @Janpot
- &#8203;<!-- 03 -->[core] Remove dead dependency @oliviertassinari
- &#8203;<!-- 02 -->[core] Rename query and params to parameters in fetch and function editors (#1096) @bytasv
- &#8203;<!-- 01 -->[core] x10 speedup of yarn install in the CI (#1098) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## v0.0.21

<!-- generated comparing v0.0.20..master -->

_Oct 5, 2022_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Major groundwork to get online demo ready

- &#8203;<!-- 11 -->Attempt to fix render.yaml (#1069) @apedroferreira
- &#8203;<!-- 10 -->Fix component flicker (#1061) @apedroferreira
- &#8203;<!-- 09 -->Add Sentry (#1043) @apedroferreira
- &#8203;<!-- 08 -->Fix moving same row elements into same column (#1060) @apedroferreira
- &#8203;<!-- 07 -->Add Google reCAPTCHA v3 to online demo (#1054) @apedroferreira
- &#8203;<!-- 06 -->Online demo (#1002) @apedroferreira
- &#8203;<!-- 05 -->[core] Fix buildFilter property in render.yml (#1085) @Janpot
- &#8203;<!-- 04 -->[core] We don't build the database @oliviertassinari
- &#8203;<!-- 03 -->[core] Don't build on render for docs changes (#1081) @oliviertassinari
- &#8203;<!-- 02 -->[core] Remove outdated docsearch.js dependency (#1046) @oliviertassinari
- &#8203;<!-- 01 -->[docs] Fix outdated URL @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @Janpot, @oliviertassinari

## v0.0.20

<!-- generated comparing v0.0.19..master -->

_Sep 28, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Add default data to DataGrid, Image and Select components, add optional Google Analytics integration and improve Windows compatibility.

- &#8203;<!-- 4 -->Add Google Analytics (#1049) @apedroferreira
- &#8203;<!-- 3 -->[core] Add default data to DataGrid, Image, Select components (#1048) @bharatkashyap
- &#8203;<!-- 2 -->[core] Improve Windows compatibility (#1042) @oliviertassinari
- &#8203;<!-- 1 -->[Docs] Disable todo pages in docs (#1053) @bytasv

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @oliviertassinari

## v0.0.19

<!-- generated comparing v0.0.18..master -->

_Sep 21, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

A big improvement to the documentation, the ability to use templates to create a new app and the beginning of some UI improvements to the app.

- &#8203;<!-- 14 -->Improve update notifications (#1006) @bharatkashyap
- &#8203;<!-- 13 -->Prebuilt app templates (#926) @apedroferreira
- &#8203;<!-- 12 -->Editor integration tests (#831) @apedroferreira
- &#8203;<!-- 11 -->Header layout towards UI revamp (#986) @Janpot
- &#8203;<!-- 10 -->Add instruction for testing a random commit on master (#1004) @Janpot
- &#8203;<!-- 09 -->Self-document integration test mode (#995) @Janpot
- &#8203;<!-- 08 -->[core] Fix scroll restoration in the docs (#866) @oliviertassinari
- &#8203;<!-- 07 -->[core] Fix markdown format (#889) @oliviertassinari
- &#8203;<!-- 06 -->[Docs] Fix self host url (#1033) @bytasv
- &#8203;<!-- 05 -->[Docs] Documentation docker (#1030) @bytasv
- &#8203;<!-- 04 -->[docs] Link the docs in the README.md (#1012) @oliviertassinari
- &#8203;<!-- 03 -->[docs] Add Building UI documentation (#1011) @bytasv
- &#8203;<!-- 02 -->[docs] Toolpad docs part 1 (#859) @bytasv
- &#8203;<!-- 01 -->[security] Improve the HTTP headers for security (#1013) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## v0.0.18

<!-- generated comparing v0.0.17..master -->

_Sep 14, 2022_

A big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

Fixes and improvements all around, banner prompting to upgrade Toolpad

- &#8203;<!-- 29 -->Make errors visible in the runtime (#985) @Janpot
- &#8203;<!-- 28 -->Put Toolpad user in charge of response parsing (#987) @Janpot
- &#8203;<!-- 27 -->Group a few more packages for renovate (#982) @Janpot
- &#8203;<!-- 26 -->Revert "Make errors visible in the runtime" (#954) @Janpot
- &#8203;<!-- 25 -->Add a DataGrid to preview GoogleSheets response (#952) @bharatkashyap
- &#8203;<!-- 24 -->Fix DataGrid double scroll (#945) @apedroferreira
- &#8203;<!-- 23 -->Editable text component batched fixes (#898) @bharatkashyap
- &#8203;<!-- 22 -->Unify RFC template using core version (#951) @bytasv
- &#8203;<!-- 21 -->Make errors visible in the runtime (#946) @Janpot
- &#8203;<!-- 20 -->Remove editor segment from route (#800) @Janpot
- &#8203;<!-- 19 -->Preserve javascript semantics when dependencies fail (#948) @Janpot
- &#8203;<!-- 18 -->Rename parseError to errorFrom (#944) @Janpot
- &#8203;<!-- 17 -->Fix node and jsdom tests interferring with each other (#939) @Janpot
- &#8203;<!-- 16 -->Add components integration test (#938) @Janpot
- &#8203;<!-- 15 -->Fix naive content-type sniffing implementation (#940) @Janpot
- &#8203;<!-- 14 -->Format function source on save (#942) @Janpot
- &#8203;<!-- 13 -->Allow recreating data grid columns from existing data (#914) @apedroferreira
- &#8203;<!-- 12 -->Port MUI X renovate.json (#933) @Janpot
- &#8203;<!-- 11 -->Run yarn upgrade (#923) @apedroferreira
- &#8203;<!-- 10 -->Try enabling renovate again (#913) @Janpot
- &#8203;<!-- 09 -->Make sure to always assign the overlayroot (#915) @Janpot
- &#8203;<!-- 08 -->Toolpad-app dependencies update (#909) @Janpot
- &#8203;<!-- 07 -->[app] Add an update banner (#839) @bharatkashyap
- &#8203;<!-- 06 -->[core] Add release step for the docs (#890) @oliviertassinari
- &#8203;<!-- 05 -->[docs] Fix capitalization @oliviertassinari
- &#8203;<!-- 04 -->[docs] Fix typo @oliviertassinari
- &#8203;<!-- 03 -->[ui] Toolpad app favicon (#984) @bharatkashyap
- &#8203;<!-- 02 -->[ui] Toolpad logo favicon (#911) @bharatkashyap
- &#8203;<!-- 01 -->[website] Landing Page follow up (#906) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## v0.0.17

<!-- generated comparing v0.0.16..master -->

_Sep 7, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Landing page, configure body and headers in REST datasources, support bindable default values for inputs, improved save state display, minimum and maximum values for number props.

- &#8203;<!-- 20 -->Support DatePicker examples in custom components (#903) @Janpot
- &#8203;<!-- 19 -->Disable binding for layout props (#862) @apedroferreira
- &#8203;<!-- 18 -->Update screen after every render (#896) @Janpot
- &#8203;<!-- 17 -->Rest datasource configure bodies and headers (#721) @Janpot
- &#8203;<!-- 16 -->Use PostgreSQL as displayName instead of Postgres (#894) @Janpot
- &#8203;<!-- 15 -->Upgrade typescript across packages (#897) @Janpot
- &#8203;<!-- 14 -->Allow minimum and maximum value for component number props (#871) @apedroferreira
- &#8203;<!-- 13 -->Fix typo in code (#883) @Janpot
- &#8203;<!-- 12 -->Simplify deploy flow (#875) @Janpot
- &#8203;<!-- 11 -->Add more info to console error detection in integration tests (#881) @Janpot
- &#8203;<!-- 10 -->Force node 16 on render.com (#880) @Janpot
- &#8203;<!-- 09 -->Editor and save state tweaks (#879) @apedroferreira
- &#8203;<!-- 08 -->Be more accepting in postgres error parsing (#877) @Janpot
- &#8203;<!-- 07 -->Support bindable default value for inputs (#838) @Janpot
- &#8203;<!-- 06 -->[core] Update monorepo (#891) @oliviertassinari
- &#8203;<!-- 05 -->[docs] Fix screenshot link in the README (#893) @bharatkashyap
- &#8203;<!-- 04 -->[website] Fix GA events going to development (#899) @bharatkashyap
- &#8203;<!-- 03 -->[website] Improve video poster (#892) @oliviertassinari
- &#8203;<!-- 02 -->[website] Fix logo dimension (#888) @oliviertassinari
- &#8203;<!-- 01 -->[website] Landing page (#809) @bharatkashyap

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @oliviertassinari

## v0.0.16

<!-- generated comparing v0.0.15..master -->

_Aug 31, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Simplify interaction between canvas and editor, new interface to view unsaved changes, improve the flow for creating and editing queries and improve the localStorage hook implementation. Also, some documentation improvements!

- &#8203;<!-- 14 -->Nudge PRs to have linked issues, visual demos (#836) @bharatkashyap
- &#8203;<!-- 13 -->Fix error when rendering empty grid (#872) @Janpot
- &#8203;<!-- 12 -->Hide number of changes in UI, add it in debug logging utility (#861) @apedroferreira
- &#8203;<!-- 11 -->Props panel sections (#855) @apedroferreira
- &#8203;<!-- 10 -->Simplify interaction between canvas and editor (#858) @Janpot
- &#8203;<!-- 09 -->Improved and updated tutorial.md (#865) @VasuDevrani
- &#8203;<!-- 08 -->Only sign in to dockerhub if we intend to push images (#867) @Janpot
- &#8203;<!-- 07 -->Remove baseline overrides from eslintrc (#835) @Janpot
- &#8203;<!-- 06 -->Allow intercepting the console on CanvasHost (#856) @Janpot
- &#8203;<!-- 05 -->Improve drop area design (#854) @apedroferreira
- &#8203;<!-- 04 -->Improve QueryEditor flow (#844) @Janpot
- &#8203;<!-- 03 -->Fix missing jsx key warning (#851) @Janpot
- &#8203;<!-- 02 -->Improve localStorage implementation (#846) @Janpot
- &#8203;<!-- 01 -->Parse numbers as ms from epoch for date/datetime columns (#848) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @VasuDevrani

## v0.0.15

<!-- generated comparing v0.0.14..master -->

_Aug 24, 2022_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

New Postgres datasource, support mutations.

- &#8203;<!-- 15 -->Support mutations as non-idempotent version of queries (#698) @Janpot
- &#8203;<!-- 14 -->Verify that the base image exists in the docker release script (#824) @Janpot
- &#8203;<!-- 13 -->Fix missing key warning (#842) @Janpot
- &#8203;<!-- 12 -->Tweak release instructions (#829) @bytasv
- &#8203;<!-- 11 -->Remove obsolete core lib patch (#801) @Janpot
- &#8203;<!-- 10 -->Debounce code component renderering (#805) @Janpot
- &#8203;<!-- 09 -->Validate the name when creating code components (#802) @Janpot
- &#8203;<!-- 08 -->Create postgres dataSource prototype (#811) @Janpot
- &#8203;<!-- 07 -->Add tooltip to WIP components (#837) @Janpot
- &#8203;<!-- 06 -->Automatically wrap non-layout components in box containers (#804) @apedroferreira
- &#8203;<!-- 05 -->Use short ids for dom nodes (#807) @Janpot
- &#8203;<!-- 04 -->Remove dom duplication (#825) @Janpot
- &#8203;<!-- 03 -->Use prettier CLI + pretty-quick (#823) @Janpot
- &#8203;<!-- 02 -->App renaming integration test (#820) @Janpot
- &#8203;<!-- 01 -->Add hook to ease menu implementation (#821) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot

## v0.0.14

<!-- generated comparing v0.0.13..master -->

_Aug 18, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:
Add app overview list view, allow setting properties in code component debugger, Fix artifacts in the page designer, visual tweaks to the select component options editor.

- &#8203;<!-- 18 -->Add List view for apps as default (#690) @bharatkashyap
- &#8203;<!-- 17 -->Add interface to debug properties for code components (#803) @Janpot
- &#8203;<!-- 16 -->Fix custom component slots (#750) @apedroferreira
- &#8203;<!-- 15 -->Prevent node HUD from getting cut-off (#772) @apedroferreira
- &#8203;<!-- 14 -->Improve JsonView component UX (#797) @Janpot
- &#8203;<!-- 13 -->Fix deleting newly placed components with Backspace key (#771) @apedroferreira
- &#8203;<!-- 12 -->Update/improve release guide (#770) @apedroferreira
- &#8203;<!-- 11 -->Upgrade @mui/\* packages (#785) @Janpot
- &#8203;<!-- 10 -->Use stable version of react-query (#784) @Janpot
- &#8203;<!-- 09 -->Use stable version of monaco-editor (#783) @Janpot
- &#8203;<!-- 08 -->Add tooling to facilitate integration testing (#786) @Janpot
- &#8203;<!-- 07 -->Fix scrollbar when selection options (#788) @oliviertassinari
- &#8203;<!-- 06 -->Make sure the application isn't saved during mounting (#779) @Janpot
- &#8203;<!-- 05 -->Make sure old style references are backwards compatible (#780) @Janpot
- &#8203;<!-- 04 -->Improve handling of React keys in ComponentCatalog (#775) @Janpot
- &#8203;<!-- 03 -->Fix missing key warning (#774) @Janpot
- &#8203;<!-- 02 -->Support default datasources (#691) @Janpot
- &#8203;<!-- 01 -->Put datasource in charge of saving the QueryNode (#764) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @oliviertassinari

## v0.0.13

<!-- generated comparing v0.0.12..master -->

_Aug 10, 2022_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Add user feedback, add network panel to REST datasources, make network panel clearable.

- &#8203;<!-- 19 -->Move google sheets preview inside of datasource (#761) @Janpot
- &#8203;<!-- 18 -->Make sure queries are default enabled (#768) @Janpot
- &#8203;<!-- 17 -->Add AbortController to function runtime (#766) @Janpot
- &#8203;<!-- 16 -->Remove docs aria-label (#716) @Janpot
- &#8203;<!-- 15 -->Add user feedback (#723) @Janpot
- &#8203;<!-- 14 -->Fix function datasource layout issue (#765) @Janpot
- &#8203;<!-- 13 -->Add RFC template (#729) @bytasv
- &#8203;<!-- 12 -->Extract presentational QueryInputPanel component for reuse (#762) @Janpot
- &#8203;<!-- 11 -->Rest datasource: add network inspection (#737) @Janpot
- &#8203;<!-- 10 -->Make network panel clearable (#760) @Janpot
- &#8203;<!-- 09 -->Drag and drop refactor (#730) @apedroferreira
- &#8203;<!-- 08 -->Optimize logic in bindings parsing (#759) @Janpot
- &#8203;<!-- 07 -->Only overwrite the default value when a prop has a binding (#757) @Janpot
- &#8203;<!-- 06 -->Extract Devtools component from function datasource for reuse in fetch (#740) @Janpot
- &#8203;<!-- 05 -->Refactor har generation utilities for reuse (#738) @Janpot
- &#8203;<!-- 04 -->Release script update (#731) @Janpot
- &#8203;<!-- 03 -->Release workflow continuation (#728) @Janpot
- &#8203;<!-- 02 -->Fixes to release action (#727) @Janpot
- &#8203;<!-- 01 -->Add docker tag github action (#726) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bytasv, @Janpot

## v0.0.12

<!-- generated comparing v0.0.11..master -->

_Aug 3, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Allow vertically resizing components, add configuration options to Fetch datasource.

- &#8203;<!-- 8 -->Allow scrolling the page when over the monaco editor (#719) @Janpot
- &#8203;<!-- 7 -->Make DataTable vertically resizeable (#700) @apedroferreira
- &#8203;<!-- 6 -->Fix typo (#715) @oliviertassinari
- &#8203;<!-- 5 -->Make fetch method configurable (#708) @Janpot
- &#8203;<!-- 4 -->Remove some unnecessary component sizing (#710) @Janpot
- &#8203;<!-- 3 -->[core] `NodeReference` type for references to nodes (#720) @bharatkashyap
- &#8203;<!-- 2 -->[core] Remove duplicated file (#714) @oliviertassinari
- &#8203;<!-- 1 -->[core] Prepare automation for support (#612) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @oliviertassinari

## v0.0.11

<!-- generated comparing v0.0.10..master -->

_Jul 29, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Split pane layout for queries, resize components in the visual editor, improve post-request transformation UX.

- &#8203;<!-- 16 -->Satisfy dependabot (#706) @Janpot
- &#8203;<!-- 15 -->Add autocomplete to post-request transform editor (#546) @bharatkashyap
- &#8203;<!-- 14 -->Support async code in event handlers (#697) @Janpot
- &#8203;<!-- 13 -->Fix interferring monaco editor instances (#702) @Janpot
- &#8203;<!-- 12 -->Add bindable enabled property to queries (#696) @Janpot
- &#8203;<!-- 11 -->Fix column sizing when there's not enough space (#699) @apedroferreira
- &#8203;<!-- 10 -->Editor - Resizing elements inside page rows (#645) @apedroferreira
- &#8203;<!-- 09 -->Add default control to BindableEditor (#695) @Janpot
- &#8203;<!-- 08 -->Fixes to query editor layout (#693) @Janpot
- &#8203;<!-- 07 -->Make function runtime fetch implementation more spec-compliant (#668) @Janpot
- &#8203;<!-- 06 -->Fix overflow widgets for monaco (#682) @Janpot
- &#8203;<!-- 05 -->Increase yarn network timeout (#688) @Janpot
- &#8203;<!-- 04 -->Standardize on React invariant library (#683) @Janpot
- &#8203;<!-- 03 -->Tweak update button position and visibility in component editor (#673) @bytasv
- &#8203;<!-- 02 -->Add split panes to connections dialog (#676) @bytasv
- &#8203;<!-- 01 -->Remove obsolete DataGrid license code (#679) @Janpot

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @bytasv, @Janpot

## v0.0.10

<!-- generated comparing v0.0.9..master -->

_Jul 22, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Getting a first version of the docs app working. Fixes to the UI on the application overview, thanks to our new team member @bytasv!

- &#8203;<!-- 5 -->Fix app name overflow (#672) @bytasv
- &#8203;<!-- 4 -->Add fetch polyfills to jest (#669) @Janpot
- &#8203;<!-- 3 -->[docs] Fix Next.js hosting on mui.com (#661) @bharatkashyap
- &#8203;<!-- 2 -->[docs] Lint markdown (#675) @oliviertassinari
- &#8203;<!-- 1 -->[docs] Bootstrap docs/landing page site (#542) @bharatkashyap

All contributors of this release in alphabetical order: @bharatkashyap, @bytasv, @Janpot, @oliviertassinari

## v0.0.9

<!-- generated comparing v0.0.8..master -->

_Jul 14, 2022_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Refine the drag & drop UX, optimize usage of `googleapis`, add new serverless function datasource.

- &#8203;<!-- 16 -->Move the toolpad app out of the components folder (#657) @Janpot
- &#8203;<!-- 15 -->Support serverless Function datasource (#641) @Janpot
- &#8203;<!-- 14 -->Move control of spacing into the datasource QueryEditor (#656) @Janpot
- &#8203;<!-- 13 -->Rework query editor layout (#655) @Janpot
- &#8203;<!-- 12 -->Update usePrivateQuery options to follow useQuery options (#654) @Janpot
- &#8203;<!-- 11 -->Fix Overlay sizing (#543) @Janpot
- &#8203;<!-- 10 -->Make sure Monaco resizes with its container (#653) @Janpot
- &#8203;<!-- 09 -->Fix sizing inside columns (#650) @apedroferreira
- &#8203;<!-- 08 -->Preview query button (#647) @bharatkashyap
- &#8203;<!-- 07 -->Extract canvas logic in top level layout (#644) @Janpot
- &#8203;<!-- 06 -->Replace `googleapis` with individual pacakges (#648) @bharatkashyap
- &#8203;<!-- 05 -->Avoid crash when a query is edited for a non-existing datasource (#640) @Janpot
- &#8203;<!-- 04 -->Fix the list in setup docs (#643) @Janpot
- &#8203;<!-- 03 -->Remove MonacoEditor path property (#639) @Janpot
- &#8203;<!-- 02 -->Bag of tweaks (#637) @Janpot
- &#8203;<!-- 01 -->Fixes and remove unneeded stylings in recent visual editor update (#638) @apedroferreira

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot

## v0.0.8

<!-- generated comparing v0.0.7..master -->

_Jul 6, 2022_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

Improve the drag&drop UX of the visual editor. Add more functionality to the Application overview page. Make the release process more intuitive.

- &#8203;<!-- 33 -->Make sure to only send frontend dom nodes to the browser (#635) @Janpot
- &#8203;<!-- 32 -->Improve visual editor UX (#466) @apedroferreira
- &#8203;<!-- 31 -->Add instructions on configuring a different port in dev mode (#629) @Janpot
- &#8203;<!-- 30 -->Fix expression editor for code actions (#633) @Janpot
- &#8203;<!-- 29 -->Fix height issues with application root element (#634) @Janpot
- &#8203;<!-- 28 -->Hide preview banner on deployed pages (#630) @Janpot
- &#8203;<!-- 27 -->Fix no-restricted-syntax not applying to some files (#632) @Janpot
- &#8203;<!-- 26 -->Make monaco editor work offline (#619) @Janpot
- &#8203;<!-- 25 -->Add missing node-fetch dependency (#627) @Janpot
- &#8203;<!-- 24 -->Dom loader suspense (#625) @Janpot
- &#8203;<!-- 23 -->Use next.config.mjs (#626) @Janpot
- &#8203;<!-- 22 -->Add demo mode (#607) @Janpot
- &#8203;<!-- 21 -->Memoize selectionModel in DataGrid (#616) @Janpot
- &#8203;<!-- 20 -->Use pull tag push strategy to fix released docker images (#623) @Janpot
- &#8203;<!-- 19 -->Migrate to prisma v4 (#622) @Janpot
- &#8203;<!-- 18 -->Upgrade to latest Next.js (#620) @Janpot
- &#8203;<!-- 17 -->reset binding dialog on open (#621) @Janpot
- &#8203;<!-- 16 -->Add banner to the app when running in preview mode (#608) @Janpot
- &#8203;<!-- 15 -->Persist component panel size (#604) @Janpot
- &#8203;<!-- 14 -->Remove some obsolete components (#605) @Janpot
- &#8203;<!-- 13 -->Add screenshot to README (#601) @Janpot
- &#8203;<!-- 12 -->Introduce running actions on events (#565) @Janpot
- &#8203;<!-- 11 -->Enforce yarn for usage with the monorepo (#599) @Janpot
- &#8203;<!-- 10 -->Upgrade dependencies (#600) @Janpot
- &#8203;<!-- 09 -->App card enhancements (#591) @bharatkashyap
- &#8203;<!-- 08 -->Enhance release flow (#583) @Janpot
- &#8203;<!-- 07 -->Expand e2e test to create/delete an app (#597) @Janpot
- &#8203;<!-- 06 -->Remove submit from buttons (#596) @Janpot
- &#8203;<!-- 05 -->Upgrade next.js (#595) @Janpot
- &#8203;<!-- 04 -->Add codeFrame to compiler errors (#593) @Janpot
- &#8203;<!-- 03 -->Get rid of next.js custom server (#452) @Janpot
- &#8203;<!-- 02 -->Fix some type issues coming up with React 18 (#594) @Janpot
- &#8203;<!-- 01 -->[docs] Fix Netlify deploy with a dummy index.html (#606) @oliviertassinari

All contributors of this release in alphabetical order: @apedroferreira, @bharatkashyap, @Janpot, @oliviertassinari

## v0.0.7

<!-- generated comparing v0.0.6..master -->

_Jun 22, 2022_

A big thanks to the 2 contributors who made this release possible. Here are some highlights ✨:

Fixes for Firefox users. Resizable right-hand panel. Improve Google Sheets connection reliability. Support customizing the global scope used in the bindings.

- &#8203;<!-- 13 -->Support customizing global scope of bindings (#588) @Janpot
- &#8203;<!-- 12 -->Make sure the component properties panel overflows correctly (#587) @Janpot
- &#8203;<!-- 11 -->Extract module loading logic from code components in the runtime (#586) @Janpot
- &#8203;<!-- 10 -->Improve validity check for Google Sheets connection (#501) @bharatkashyap
- &#8203;<!-- 09 -->Extract reusable code editor for TS modules (#584) @Janpot
- &#8203;<!-- 08 -->Add Tooltip explaining that a non-deployed app can't be opened (#582) @Janpot
- &#8203;<!-- 07 -->setting editingTitle to false does not blur input (#580) @bharatkashyap
- &#8203;<!-- 06 -->Disable view button on apps that aren't deployed yet (#581) @Janpot
- &#8203;<!-- 05 -->Delete confirmation dialog Doesn't need to be a form (#579) @Janpot
- &#8203;<!-- 04 -->Make component panel resizable (#570) @Janpot
- &#8203;<!-- 03 -->Ask for confirmation when not on master (#563) @Janpot
- &#8203;<!-- 02 -->Fix issue with BindableAttrValues type (#564) @Janpot
- &#8203;<!-- 01 -->Fix dom loading behavior for non-existing apps (#569) @Janpot

All contributors of this release in alphabetical order: @bharatkashyap, @Janpot

## v0.0.6

<!-- generated comparing v0.0.5..master -->

_Jun 15, 2022_

This release serves as an end-to-end test for the release workflow. It contains fixes for bugs that emerged while creating the first releases of toolpad.

- &#8203;<!-- 6 -->Move NodeId to @mui/toolpad-core (#561) @Janpot
- &#8203;<!-- 5 -->Add react as peer dependency to supporting libs (#560) @Janpot
- &#8203;<!-- 4 -->Run linters in CI (#559) @Janpot
- &#8203;<!-- 3 -->Fix image existence check in release script (#558) @Janpot
- &#8203;<!-- 2 -->Support page parameters (#555) @Janpot
- &#8203;<!-- 1 -->Some fixes on the release script (#557) @Janpot

## v0.0.5

Initial release
