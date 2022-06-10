# Mystery Transaction Bleed Example
This repo is minimum reproducible example for a transaction bleed problem in CockroachDB 22.x

## Run Test
```
yarn && yarn jest
```

## Background
I first encountered this issue when upgrading my cluster to 22.1. Tests that included an export statement were failing
with an error about not being allowed in a multistatement transaction. However, none of these statements
were intentionally being run in a transaction. This issue seems to be limited to prepared statements, and I've been able
to reproduce it consistently.
